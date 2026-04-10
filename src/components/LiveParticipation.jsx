import { Link } from 'react-router-dom'
import { Clock, Users, ArrowRight, Flame } from 'lucide-react'
import { WORDS, STATUS_LABELS } from '../data/words'

// 실시간으로 투표/공모가 활발한 말을 골라서 노출
function pickActive() {
  const voting = WORDS.filter((w) => w.status === 'voting').sort(
    (a, b) => (b.totalVotes || 0) - (a.totalVotes || 0),
  )
  const open = WORDS.filter((w) => w.status === 'open').sort(
    (a, b) => (b.totalProposals || 0) - (a.totalProposals || 0),
  )
  return [...voting.slice(0, 3), ...open.slice(0, 2)]
}

export default function LiveParticipation() {
  const items = pickActive()
  const totalVoting = WORDS.filter((w) => w.status === 'voting').length
  const totalOpen = WORDS.filter((w) => w.status === 'open').length

  return (
    <section className="mx-auto max-w-lg px-5 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-orange">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            LIVE
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-navy">
            지금 함께 만드는 말
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            투표 {totalVoting}개 · 공모 {totalOpen}개 진행 중
          </p>
        </div>
        <Flame className="h-6 w-6 text-orange" />
      </div>

      <div className="mt-4 space-y-2.5">
        {items.map((entry) => {
          const isVoting = entry.status === 'voting'
          const top = entry.proposals?.[0]
          return (
            <Link
              key={entry.id}
              to="/dictionary"
              className="block rounded-2xl border border-border bg-white p-4 transition-all hover:border-navy/30 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                        isVoting
                          ? 'border-navy/30 bg-lavender/40 text-navy'
                          : 'border-orange/30 bg-warm/40 text-orange'
                      }`}
                    >
                      {STATUS_LABELS[entry.status]}
                    </span>
                    {isVoting && entry.voteEnd && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange">
                        <Clock className="h-2.5 w-2.5" />
                        {entry.voteEnd}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-serif text-base font-bold text-text line-through decoration-text-muted/40">
                      {entry.word}
                    </span>
                    {top && (
                      <>
                        <span className="text-text-muted">→</span>
                        <span className="truncate font-serif text-base font-bold text-navy">
                          {top.text}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-text-muted">
                    <Users className="h-3 w-3" />
                    {isVoting
                      ? `${entry.totalVotes}명 투표 · 대안 ${entry.proposals.length}개`
                      : `대안 ${entry.totalProposals ?? entry.proposals.length}개 제안 중`}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-text-muted" />
              </div>
            </Link>
          )
        })}
      </div>

      <Link
        to="/dictionary"
        className="mt-4 flex items-center justify-center gap-1 text-xs font-bold text-navy"
      >
        함께 대안 만들기
        <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  )
}
