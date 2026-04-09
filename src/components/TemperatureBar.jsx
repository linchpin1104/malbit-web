export default function TemperatureBar({ value = 42, showLabel = true }) {
  const getMessage = (v) => {
    if (v <= 30) return '차갑지만 괜찮아요. 여기 온 것 자체가 첫걸음이에요'
    if (v <= 50) return '아직 차가운 편이지만, 관심을 갖고 있다는 것 자체가 변화의 시작이에요'
    if (v <= 70) return '점점 따뜻해지고 있어요. 아이가 느끼고 있을 거예요'
    return '이미 다정한 말을 쓰고 계시네요. 그 말이 아이에게 큰 힘이 됩니다'
  }

  return (
    <div className="w-full">
      <div className="mb-2 text-center">
        <span className="font-serif text-5xl font-bold text-navy">{value}°</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${value}%`,
            background: 'linear-gradient(90deg, #3B7BF6 0%, #F7D76B 50%, #FF6B35 100%)',
          }}
        />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-navy shadow-md"
          style={{ left: `${value}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-text-muted">
        <span>차가움</span>
        <span>따뜻함</span>
      </div>
      {showLabel && (
        <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
          {getMessage(value)}
        </p>
      )}
    </div>
  )
}
