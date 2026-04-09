import { Thermometer } from 'lucide-react'

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-br from-navy to-navy-light px-5 py-3.5 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <Thermometer className="h-5 w-5" />
      <span className="text-sm font-semibold">나의 양육언어 온도</span>
    </button>
  )
}
