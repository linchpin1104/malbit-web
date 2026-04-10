import { useState } from 'react'
import { ChevronDown, CheckCircle2, Sparkles, Clock, Users } from 'lucide-react'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
} from '../data/words'

export default function WordCard({ entry }) {
  const [expanded, setExpanded] = useState(false)

  const status = entry.status || (entry.confirmed ? 'confirmed' : 'open')
  const isConfirmed = status === 'confirmed'
  const isVoting = status === 'voting'

  const proposals = entry.proposals || []
  const topProposal = proposals[0]
  const maxVotes = Math.max(...proposals.map((p) => p.votes), 1)
  const totalVotes =
    entry.totalVotes ?? proposals.reduce((acc, p) => acc + p.votes, 0)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between px-5 py-4 text-left"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[entry.category]}`}
            >
              {CATEGORY_LABELS[entry.category]}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_COLORS[status]}`}
            >
              {STATUS_LABELS[status]}
            </span>
            {isVoting && entry.voteEnd && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-bold text-orange">
                <Clock className="h-2.5 w-2.5" />
                {entry.voteEnd}
              </span>
            )}
            {entry.isHot && (
              <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-medium text-orange">
                🔥 인기
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-text">
              {entry.word}
            </span>
            {isConfirmed && entry.confirmed && (
              <>
                <span className="text-text-muted">→</span>
                <span className="font-serif text-xl font-bold text-navy">
                  {entry.confirmed}
                </span>
              </>
            )}
            {isVoting && topProposal && (
              <>
                <span className="text-text-muted">→</span>
                <span className="font-serif text-lg text-navy/80">
                  {topProposal.text}…
                </span>
              </>
            )}
          </div>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-text-muted">
            {isConfirmed ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-success" />
                {totalVotes}명 참여로 확정
              </>
            ) : isVoting ? (
              <>
                <Users className="h-3 w-3" />
                {totalVotes}명 투표 중 · 대안 {proposals.length}개
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" />
                대안 {entry.totalProposals ?? proposals.length}개 제안 중
              </>
            )}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-border bg-cream/50 px-5 py-4 text-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              뜻
            </p>
            <p className="mt-1 text-text">{entry.meaning}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              언제부터
            </p>
            <p className="mt-1 text-text">{entry.since}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              왜 문제인가
            </p>
            <p className="mt-1 text-text">{entry.why}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy">
              <Sparkles className="mr-1 inline h-3 w-3" />
              말빛 대안 {isVoting && '(투표 중)'}
            </p>
            <div className="mt-2 space-y-2">
              {proposals.map((p, i) => {
                const isWinner = isConfirmed && p.text === entry.confirmed
                const pct = Math.round((p.votes / maxVotes) * 100)
                return (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-xl border ${
                      isWinner
                        ? 'border-gold bg-gold/10'
                        : 'border-border bg-white'
                    }`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        isWinner ? 'bg-gold/30' : 'bg-navy/5'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                    <div className="relative flex items-center justify-between px-3 py-2">
                      <span
                        className={`text-sm font-medium ${
                          isWinner ? 'text-navy' : 'text-text'
                        }`}
                      >
                        {p.text}
                        {isWinner && ' ✓'}
                      </span>
                      <span className="text-xs font-bold text-text-muted">
                        {p.votes}표
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {!isConfirmed && (
              <button className="mt-3 w-full rounded-xl border-2 border-navy bg-white py-2.5 text-xs font-bold text-navy transition-colors hover:bg-navy hover:text-white">
                {isVoting ? '+ 이 말에 투표하기' : '+ 대안 제안하기'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
