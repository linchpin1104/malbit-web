import { useState } from 'react'
import { Sparkles, Loader2, ArrowRight, RefreshCw, Wand2 } from 'lucide-react'

const TONE_META = {
  cynical: {
    label: '냉소·낙인',
    className: 'bg-orange/10 text-orange border-orange/30',
  },
  neutral: {
    label: '중립',
    className: 'bg-navy/10 text-navy border-navy/30',
  },
  warm: {
    label: '이미 다정한 말',
    className: 'bg-success/10 text-success border-success/30',
  },
}

const SAMPLES = ['헬육아', '맘충', '아이 낳으면 끝', '노키즈존', '워킹맘 죄책감']

export default function LanguageConverter() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleConvert(override) {
    const input = (override ?? text).trim()
    if (!input) return
    setText(input)
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || '변환에 실패했습니다.')
      }
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setText('')
    setResult(null)
    setError(null)
  }

  const tone = result?.tone && TONE_META[result.tone]

  return (
    <section className="mx-auto max-w-lg px-5 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-navy">
            <Wand2 className="h-3 w-3" />
            Malbit Converter · Claude Sonnet
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-navy">
            양육 언어 변환기
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            내가 쓰는 말을 입력하면, Claude가 다정한 말로 바꿔드려요.
          </p>
        </div>
        <Sparkles className="h-6 w-6 text-gold" />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-white p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="예: 오늘도 헬육아였다..."
          rows={3}
          maxLength={300}
          className="w-full resize-none rounded-xl border border-border bg-cream/40 p-3 text-sm text-text placeholder:text-text-muted focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] text-text-muted">{text.length}/300</span>
          <div className="flex gap-2">
            {result && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-2 text-xs font-bold text-text-secondary"
              >
                <RefreshCw className="h-3 w-3" />
                다시
              </button>
            )}
            <button
              onClick={() => handleConvert()}
              disabled={loading || !text.trim()}
              className="inline-flex items-center gap-1 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  변환 중
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" />
                  다정한 말로 바꾸기
                </>
              )}
            </button>
          </div>
        </div>

        {!result && !loading && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SAMPLES.map((s) => (
              <button
                key={s}
                onClick={() => handleConvert(s)}
                className="rounded-full border border-border bg-cream/60 px-3 py-1 text-[11px] text-text-secondary transition-colors hover:border-navy/30 hover:text-navy"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-danger/30 bg-danger/5 p-3 text-xs text-danger">
          {error}
          <p className="mt-1 text-[10px] text-danger/70">
            ANTHROPIC_API_KEY 환경변수가 설정되어 있는지 확인해주세요.
          </p>
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-3 rounded-2xl border border-navy/20 bg-gradient-to-b from-cream to-white p-5">
          {tone && (
            <span
              className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${tone.className}`}
            >
              {tone.label}
            </span>
          )}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              진단
            </p>
            <p className="mt-1 text-sm text-text">{result.diagnosis}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy">
              <Sparkles className="mr-1 inline h-3 w-3" />
              말빛 대안
            </p>
            <div className="mt-2 space-y-2">
              {result.alternatives?.map((alt, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy/15 bg-white p-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-[10px] text-navy">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-serif text-base font-bold text-navy">
                        {alt.text}
                      </p>
                      <p className="mt-1 flex items-start gap-1 text-xs text-text-secondary">
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-text-muted" />
                        {alt.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
