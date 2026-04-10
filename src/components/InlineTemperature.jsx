import { useState } from 'react'
import { Thermometer, Download, Share2, RefreshCw, ArrowRight } from 'lucide-react'
import TemperatureBar from './TemperatureBar'

export default function InlineTemperature() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const handleMeasure = () => {
    if (!input.trim()) return
    setResult({
      temperature: 42,
      original: input,
      reframed: '어떤 맛이 제일 좋아? 같이 골라볼까?',
    })
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
          <h2 className="font-serif text-xl font-bold text-navy">나의 양육 언어 온도</h2>
        </div>
        <p className="mt-2 text-center text-sm text-text-secondary">
          AI가 발달심리학 관점으로 다정하게 바꿔드려요
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
              disabled={!input.trim()}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-sm font-bold text-white transition-colors hover:bg-navy-light disabled:opacity-40"
            >
              온도 측정하기
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="rounded-2xl border border-border bg-cream p-5">
              <TemperatureBar value={result.temperature} />
            </div>

            <div className="mt-3 rounded-xl bg-warm/30 p-4">
              <p className="text-xs font-medium text-text-muted">💬 당신이 쓴 말</p>
              <p className="mt-1 font-serif text-base text-text">"{result.original}"</p>
            </div>
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
