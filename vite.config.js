import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 로컬 개발 환경에서 Vercel 서버리스 함수(/api/*.js)를 흉내내는 플러그인
function apiDevPlugin(env) {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        try {
          const [pathname] = req.url.split('?')
          const name = pathname.replace(/^\/api\//, '').replace(/\.js$/, '')
          const mod = await server.ssrLoadModule(`/api/${name}.js`)
          // Body 파싱
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const raw = Buffer.concat(chunks).toString('utf8')
          let body = {}
          try {
            body = raw ? JSON.parse(raw) : {}
          } catch {
            body = {}
          }

          const nodeReq = Object.assign(req, { body })
          const nodeRes = Object.assign(res, {
            status(code) {
              this.statusCode = code
              return this
            },
            json(obj) {
              this.setHeader('content-type', 'application/json')
              this.end(JSON.stringify(obj))
              return this
            },
          })

          // 로컬 env 주입 (.env.local 의 ANTHROPIC_API_KEY)
          if (env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY) {
            process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY
          }

          await mod.default(nodeReq, nodeRes)
        } catch (err) {
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'dev middleware error', detail: String(err) }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin(env)],
  }
})
