import { useState } from 'react'
import { X, Download, Share2, RefreshCw, ArrowRight } from 'lucide-react'
import TemperatureBar from './TemperatureBar'

export default function BottomSheet({ isOpen, onClose }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const handleMeasure = () => {
    if (!input.trim()) return
    setResult({
      temperature: 42,
      original: input,
      reframed: '어떤 맛이 제일 좋아? 같이 골라볼까?',
      message: '아직 차가운 편이지만, 관심을 갖고 있다는 것 자체가 변화의 시작이에요',
    })
  }

  const handleReset = () => {
    setInput('')
    setResult(null)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg animate-slide-up rounded-t-3xl bg-white shadow-2xl">
        <div className="flex justify-center pt-3">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>
        <button onClick={onClose} className="absolute right-4 top-4 text-text-muted hover:text-text">
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 pb-8 pt-4">
          {!result ? (
            <>
              <h3 className="text-center font-serif text-xl font-bold text-navy">
                🌡 나의 양육 언어 온도
              </h3>
              <p className="mt-2 text-center text-sm text-text-secondary">
                평소에 쓰는 말이나<br />힘들었던 상황을 적어주세요
              </p>
              <div className="mt-5">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="예: 오늘 미쳐버릴 뻔했어"
                  className="w-full resize-none rounded-xl border border-border bg-cream px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  rows={3}
                />
                <button
                  onClick={handleMeasure}
                  disabled={!input.trim()}
                  className="mt-3 w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-40"
                >
                  측정하기
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-text-muted">
                카카오톡에서도 측정할 수 있어요 →
              </p>
            </>
          ) : (
            <>
              <div className="mt-2">
                <TemperatureBar value={result.temperature} />
              </div>
              <div className="mt-5 rounded-xl bg-cream p-4">
                <p className="text-xs text-text-muted">💬 당신이 쓴 말:</p>
                <p className="mt-1 text-sm text-text-secondary">"{result.original}"</p>
              </div>
              <div className="mt-3 rounded-xl border border-navy/10 bg-navy-06 p-4">
                <p className="text-xs text-navy-60">💙 이렇게 바꿔보면:</p>
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
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm text-text-muted transition-colors hover:bg-cream-dark"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                다시 측정하기
              </button>
              <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl bg-gold/20 py-3 text-sm font-medium text-navy transition-colors hover:bg-gold/30">
                말빛 크루 12주 함께하기
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
