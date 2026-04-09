import { Share2 } from 'lucide-react'

export default function ReframingCard({ before, after, temperature, source, count, showShare = true }) {
  const sourceBadge = {
    campaign: { label: '캠페인', bg: 'bg-orange/10 text-orange' },
    chatbot: { label: '챗봇', bg: 'bg-navy/10 text-navy' },
    crew: { label: '크루', bg: 'bg-success/10 text-success' },
  }

  const badge = sourceBadge[source] || sourceBadge.chatbot

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="bg-warm/30 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Before</p>
        <p className="mt-1 font-serif text-lg text-text">"{before}"</p>
        {temperature && (
          <span className="mt-2 inline-block text-sm text-text-muted">🌡 {temperature}°</span>
        )}
      </div>
      <div className="flex items-center justify-center py-1">
        <span className="text-xl text-gold">↓</span>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">After</p>
        <p className="mt-1 font-serif text-lg font-medium text-navy">"{after}"</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badge.bg}`}>
              {badge.label}
            </span>
            {count && <span className="text-xs text-text-muted">{count}명 참여</span>}
          </div>
          {showShare && (
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-text-muted transition-colors hover:bg-cream-dark">
              <Share2 className="h-3.5 w-3.5" />
              공유
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
