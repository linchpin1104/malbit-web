import { useState } from 'react'
import {
  Thermometer,
  Download,
  Share2,
  RefreshCw,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import TemperatureBar from './TemperatureBar'

// 키워드 → 의미 있는 리프레임 (API 실패 시 폴백)
// "어떤 말이 들어왔을 때 어떤 말로 바꾸면 좋을지" 매칭
const FALLBACK_RULES = [
  {
    match: /미쳐버릴|돌아버릴|미칠 것 같|돌겠/,
    temperature: 28,
    reframed:
      '오늘 정말 한계까지 갔구나. 잠깐만이라도 숨 돌릴 시간이 필요해.',
    diagnosis: '소진의 솔직한 표현이지만, 자기 비난으로 굳어지면 회복이 어려워져요.',
  },
  {
    match: /헬육아|육아 지옥|육아지옥|생지옥/,
    temperature: 22,
    reframed:
      '지금은 고강도 돌봄기야. 매일이 힘들 수밖에 없는 시기라는 걸 인정해도 괜찮아.',
    diagnosis: '"지옥" 비유는 양육 자체를 고통으로 규정해 잠재적 부모에게도 영향을 줘요.',
  },
  {
    match: /맘충|대디충|급식충|이백충|삼백충/,
    temperature: 12,
    reframed:
      '그냥 양육자, 아이, 학생일 뿐이에요. "충(蟲)"은 사람을 벌레로 만드는 말입니다.',
    diagnosis: '집단 전체에 낙인을 찍는 혐오 표현이에요.',
  },
  {
    match: /애 때문에|아이 때문에|애가 짐|아이가 짐/,
    temperature: 32,
    reframed:
      '"아이 때문에" 보다 "지금은 돌봄을 우선해야 하는 시기야"라고 말해보세요.',
    diagnosis: '아이를 제약의 원인으로 호명하면, 아이도 자신을 짐으로 느낄 수 있어요.',
  },
  {
    match: /낳으면 끝|출산 끝|인생 끝/,
    temperature: 25,
    reframed:
      '아이를 낳는 건 끝이 아니라 새로운 양육 단계의 시작이에요.',
    diagnosis: '"끝"이라는 프레임은 출산 기피의 핵심 서사가 됩니다.',
  },
  {
    match: /노키즈존/,
    temperature: 30,
    reframed:
      '"어린이 동반 가능 공간"이 늘어나야 모두가 편한 사회가 돼요.',
    diagnosis: '아동의 공공공간 이용권을 제한하는 표현이에요.',
  },
  {
    match: /경단녀|경력단절/,
    temperature: 35,
    reframed:
      '"경력보유여성" — 단절이 아니라, 돌봄과 함께 쌓아온 경력입니다.',
    diagnosis: '여성가족부도 이미 「경력보유여성」으로 공식 명칭을 전환했어요.',
  },
  {
    match: /잼민이|초딩.*충|급식충/,
    temperature: 20,
    reframed:
      '"어린이"·"초등학생"이 가장 정확한 호칭이에요.',
    diagnosis: '나이 자체가 비하의 근거가 되는 표현이에요.',
  },
  {
    match: /번아웃|소진|지쳐|힘들어|버겁/,
    temperature: 45,
    reframed:
      '지금 양육자 회복이 필요한 신호예요. 도움을 구하는 건 약점이 아니에요.',
    diagnosis: '소진은 개인 문제가 아니라 돌봄 분담·지원의 구조 문제예요.',
  },
  {
    match: /사랑|예쁘|고마|소중|행복|기특/,
    temperature: 88,
    reframed: '이미 충분히 다정한 말이에요. 그대로 자주 들려주세요.',
    diagnosis: '아이의 존재 자체를 긍정하는 따뜻한 말이에요.',
  },
]

function localFallback(text) {
  for (const rule of FALLBACK_RULES) {
    if (rule.match.test(text)) {
      return {
        original: text,
        temperature: rule.temperature,
        reframed: rule.reframed,
        diagnosis: rule.diagnosis,
      }
    }
  }
  // 매칭 안 되면 중간 온도 + 안내
  return {
    original: text,
    temperature: 55,
    reframed:
      '하루를 솔직하게 표현해주셔서 고마워요. 오늘의 말 중 한 단어만 다정하게 바꿔볼까요?',
    diagnosis:
      '특정 낙인 표현은 보이지 않지만, 자신에게도 다정한 말을 건네보세요.',
  }
}

export default function InlineTemperature() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleMeasure = async () => {
    const text = input.trim()
    if (!text) return
    setLoading(true)
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error('api failed')
      const data = await res.json()
      setResult({
        original: text,
        temperature: data.temperature ?? 50,
        reframed: data.alternatives?.[0]?.text || localFallback(text).reframed,
        diagnosis: data.diagnosis || '',
      })
    } catch {
      // API 실패 시 키워드 기반 폴백
      setResult(localFallback(text))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setInput('')
    setResult(null)
  }

  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto max-w-lg px-5 py-8">
        <div className="flex items-center justify-center gap-2">
          <Thermometer className="h-5 w-5 text-navy" />
          <h2 className="font-serif text-xl font-bold text-navy">
            나의 양육 언어 온도
          </h2>
        </div>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Claude가 발달심리학 관점으로 다정하게 바꿔드려요
        </p>

        {!result ? (
          <div className="mt-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="평소에 쓰는 말이나 힘들었던 상황을 적어주세요&#10;예: 오늘 미쳐버릴 뻔했어"
              className="w-full resize-none rounded-2xl border border-border bg-cream px-4 py-4 text-sm text-text placeholder:text-text-muted focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              rows={4}
            />
            <button
              onClick={handleMeasure}
              disabled={!input.trim() || loading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-sm font-bold text-white transition-colors hover:bg-navy-light disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  측정 중
                </>
              ) : (
                <>
                  온도 측정하기
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="rounded-2xl border border-border bg-cream p-5">
              <TemperatureBar value={result.temperature} />
            </div>

            <div className="mt-3 rounded-xl bg-warm/30 p-4">
              <p className="text-xs font-medium text-text-muted">💬 당신이 쓴 말</p>
              <p className="mt-1 font-serif text-base text-text">
                "{result.original}"
              </p>
            </div>

            {result.diagnosis && (
              <div className="mt-2 rounded-xl border border-orange/20 bg-warm/20 p-4">
                <p className="text-xs font-medium text-orange">🔎 진단</p>
                <p className="mt-1 text-sm text-text">{result.diagnosis}</p>
              </div>
            )}

            <div className="mt-2 rounded-xl border border-navy/10 bg-navy-06 p-4">
              <p className="text-xs font-medium text-navy-60">💙 이렇게 바꿔보면</p>
              <p className="mt-1 font-serif text-base font-medium text-navy">
                "{result.reframed}"
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm text-text-secondary transition-colors hover:bg-cream-dark">
                <Download className="h-4 w-4" />
                카드 저장
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm text-text-secondary transition-colors hover:bg-cream-dark">
                <Share2 className="h-4 w-4" />
                SNS 공유
              </button>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm text-text-muted transition-colors hover:bg-cream-dark"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              다시 측정하기
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
