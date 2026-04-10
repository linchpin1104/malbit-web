import { useState } from 'react'
import { ChevronDown, CheckCircle2, Sparkles } from 'lucide-react'
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../data/words'

export default function WordCard({ entry }) {
  const [expanded, setExpanded] = useState(false)

  const isConfirmed = !!entry.confirmed

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between px-5 py-4 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[entry.category]}`}>
              {CATEGORY_LABELS[entry.category]}
            </span>
            {entry.isHot && (
              <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-medium text-orange">
                🔥 인기
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-text">{entry.word}</span>
            {isConfirmed && (
              <>
                <span className="text-text-muted">→</span>
                <span className="font-serif text-xl font-bold text-navy">{entry.confirmed}</span>
              </>
            )}
          </div>
          {isConfirmed && entry.votes && (
            <p className="mt-1 text-xs text-text-muted">
              <CheckCircle2 className="mr-1 inline h-3 w-3 text-success" />
              {entry.votes}명 참여로 확정
            </p>
          )}
          {!isConfirmed && (
            <p className="mt-1 text-xs text-text-muted">
              대안 {entry.alternatives.length}개 제안 중
            </p>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-border bg-cream/50 px-5 py-4 text-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">뜻</p>
            <p className="mt-1 text-text">{entry.meaning}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">언제부터</p>
            <p className="mt-1 text-text">{entry.since}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">왜 문제인가</p>
            <p className="mt-1 text-text">{entry.why}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy">
              <Sparkles className="mr-1 inline h-3 w-3" />
              말빛 대안
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.alternatives.map((alt, i) => (
                <span
                  key={i}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isConfirmed && alt === entry.confirmed
                      ? 'bg-gold text-navy'
                      : 'border border-navy/20 bg-white text-navy'
                  }`}
                >
                  {alt}
                  {isConfirmed && alt === entry.confirmed && ' ✓'}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
