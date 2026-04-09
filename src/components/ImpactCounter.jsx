export default function ImpactCounter({ total = 247, campaign = 47, chatbot = 132, crew = 68 }) {
  return (
    <div className="rounded-2xl bg-navy-06 px-6 py-5 text-center">
      <p className="text-sm text-text-secondary">지금까지</p>
      <p className="mt-1 font-serif text-3xl font-bold text-navy">
        {total.toLocaleString()}개<span className="text-lg font-normal">의 말이 바뀌었습니다</span>
      </p>
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-orange" />
          캠페인 {campaign}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-navy" />
          챗봇 {chatbot}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-success" />
          크루 {crew}
        </span>
      </div>
    </div>
  )
}
