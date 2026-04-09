import { useState } from 'react'
import { Search } from 'lucide-react'
import ImpactCounter from '../components/ImpactCounter'
import ReframingCard from '../components/ReframingCard'

const FILTERS = ['전체', '캠페인', '챗봇', '크루']
const SORT_OPTIONS = ['인기순', '최신순']

const ENTRIES = [
  { before: '잼민이', after: '꼬마 시민', source: 'campaign', count: 234, temperature: null },
  { before: '왜 맨날 이래', after: '요즘 힘든 일이 있나 보다', source: 'chatbot', count: null, temperature: 45 },
  { before: '헬육아', after: '성장의 여정', source: 'campaign', count: 187, temperature: null },
  { before: '오늘 미쳐버릴 뻔했어', after: '오늘 정말 많이 애쓴 하루였다', source: 'chatbot', count: null, temperature: 38 },
  { before: '또 징징거려', after: '감정을 표현하고 있구나', source: 'crew', count: 92, temperature: 52 },
  { before: '넌 왜 맨날 안 들어', after: '다시 한번 같이 해볼까?', source: 'crew', count: 67, temperature: 48 },
  { before: '급식충', after: '학생 친구', source: 'campaign', count: 156, temperature: null },
  { before: '경단녀', after: '돌봄 전환기', source: 'campaign', count: 134, temperature: null },
]

export default function DictionaryPage() {
  const [activeFilter, setActiveFilter] = useState('전체')
  const [activeSort, setActiveSort] = useState('인기순')
  const [search, setSearch] = useState('')

  const filterMap = { '캠페인': 'campaign', '챗봇': 'chatbot', '크루': 'crew' }

  const filtered = ENTRIES.filter((e) => {
    if (activeFilter !== '전체' && e.source !== filterMap[activeFilter]) return false
    if (search && !e.before.includes(search) && !e.after.includes(search)) return false
    return true
  })

  return (
    <div className="mx-auto max-w-lg pb-24">
      <div className="px-5 pt-6">
        <h1 className="font-serif text-2xl font-bold text-navy">양육 언어 사전</h1>
        <p className="mt-1 text-sm text-text-secondary">세 경로의 결과물이 모이는 곳</p>
      </div>

      <div className="px-5 pt-5">
        <ImpactCounter />
      </div>

      {/* 검색 */}
      <div className="px-5 pt-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="바꾸고 싶은 말 검색"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          />
        </div>
      </div>

      {/* 필터 + 정렬 */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-navy text-white'
                  : 'bg-cream-dark text-text-secondary hover:bg-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {SORT_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSort(s)}
              className={`text-xs ${activeSort === s ? 'font-semibold text-navy' : 'text-text-muted'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 항목 리스트 */}
      <div className="space-y-3 px-5 pt-4">
        {filtered.map((entry, i) => (
          <ReframingCard
            key={i}
            before={entry.before}
            after={entry.after}
            temperature={entry.temperature}
            source={entry.source}
            count={entry.count}
          />
        ))}
      </div>
    </div>
  )
}
