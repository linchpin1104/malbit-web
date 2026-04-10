// Vercel Serverless Function: 양육 언어 변환기 (Claude Sonnet)
// POST /api/convert { text: string }
// → { original, alternatives: [{text, reason}], tone }

const SYSTEM_PROMPT = `당신은 "말빛 프로젝트"의 양육 언어 변환기입니다.
사단법인 더나일이 운영하며, 결핍·낙인 중심의 냉소적 양육 언어를
가능성·권리·지원 중심의 다정한 언어로 바꿔주는 역할을 합니다.

변환 원칙:
1. 감성적 비유(지옥, 전쟁, 생존)보다 행정·정책·의료에 가까운 명료한 호칭을 씁니다.
2. 결핍/낙인 프레임을 권리·지원·가능성 프레임으로 전환합니다.
   - 예: 보호종료아동 → 자립준비청년
   - 예: 경력단절여성 → 경력보유여성
   - 예: 정신지체인 → 지적장애인
3. 아이·부모·양육자 누구도 혐오·조롱 대상이 되지 않아야 합니다.
4. 짧고, 실제로 입에 붙는 말로 제안합니다.
5. 대안은 3개를 제시합니다. 각 대안에는 왜 이 표현이 더 나은지 한 문장 근거를 덧붙입니다.
6. 입력이 이미 다정한 말이거나 중립적이라면 그대로 두고, "이미 다정한 표현입니다" 안내를 합니다.

출력 형식: 반드시 아래 JSON 스키마만 반환하고 다른 설명을 덧붙이지 마세요.
{
  "original": "사용자가 입력한 원문",
  "tone": "cynical" | "neutral" | "warm",
  "diagnosis": "왜 이 표현이 냉소/낙인인지 또는 왜 중립/다정한지 한 문장",
  "alternatives": [
    { "text": "대안 1", "reason": "이 대안이 더 나은 이유 한 문장" },
    { "text": "대안 2", "reason": "..." },
    { "text": "대안 3", "reason": "..." }
  ]
}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY 가 설정되지 않았습니다.' })
    return
  }

  const body =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
  const text = (body.text || '').toString().trim()

  if (!text) {
    res.status(400).json({ error: '변환할 문장을 입력해주세요.' })
    return
  }
  if (text.length > 300) {
    res.status(400).json({ error: '300자 이내로 입력해주세요.' })
    return
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 800,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `다음 표현을 변환해주세요. 반드시 지정된 JSON만 출력하세요.\n\n"${text}"`,
          },
        ],
      }),
    })

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text()
      res
        .status(anthropicRes.status)
        .json({ error: 'Anthropic API 호출 실패', detail: errText })
      return
    }

    const data = await anthropicRes.json()
    const raw = data?.content?.[0]?.text || ''

    // JSON 추출 (모델이 ```json ``` 감쌀 수도 있음)
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) {
      res.status(502).json({ error: '모델 응답을 해석할 수 없습니다.', raw })
      return
    }
    const parsed = JSON.parse(match[0])
    res.status(200).json(parsed)
  } catch (err) {
    res.status(500).json({ error: '서버 오류', detail: String(err) })
  }
}
