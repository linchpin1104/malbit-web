import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import WordCard from '../components/WordCard'
import { WORDS } from '../data/words'

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'parent', label: '부모를 향한 말' },
  { key: 'child', label: '아이를 향한 말' },
  { key: 'situation', label: '상황을 표현하는 말' },
]

const SORT_OPTIONS = ['최신순', '확정된 말', '인기순']

export default function DictionaryPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('최신순')
  const [search, setSearch] = useState('')

  let filtered = WORDS.filter((e) => {
    if (activeFilter !== 'all' && e.category !== activeFilter) return false
    if (search && !e.word.includes(search) && !e.meaning.includes(search)) return false
    return true
  })

  if (activeSort === '확정된 말') {
    filtered = filtered.filter((e) => !!e.confirmed)
  } else if (activeSort === '인기순') {
    filtered = [...filtered].sort((a, b) => (b.votes || 0) - (a.votes || 0))
  }

  const confirmedCount = WORDS.filter((w) => !!w.confirmed).length

  return (
    <div className="mx-auto max-w-lg pb-24">
      {/* 헤더 */}
      <div className="bg-gradient-to-b from-navy to-navy-light px-5 pb-7 pt-8 text-white">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gold" />
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">
            Malbit Dictionary
          </p>
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold">양육 언어 사전</h1>
        <p className="mt-1 text-sm text-white/70">
          냉소의 말을 다정한 말로 바꿔가는 살아있는 사전
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <p className="font-serif text-xl font-bold text-gold">{WORDS.length}</p>
            <p className="mt-0.5 text-[11px] text-white/70">등록 단어</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <p className="font-serif text-xl font-bold text-gold">{confirmedCount}</p>
            <p className="mt-0.5 text-[11px] text-white/70">확정된 대안</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <p className="font-serif text-xl font-bold text-gold">247</p>
            <p className="mt-0.5 text-[11px] text-white/70">총 참여</p>
          </div>
        </div>
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

      {/* 카테고리 필터 */}
      <div className="flex gap-1.5 overflow-x-auto px-5 pt-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveFilter(c.key)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === c.key
                ? 'bg-navy text-white'
                : 'border border-border bg-white text-text-secondary hover:border-navy/30'
            }`}
          >
            {c.label}
            <span className="ml-1 text-[10px] opacity-60">
              {c.key === 'all'
                ? WORDS.length
                : WORDS.filter((w) => w.category === c.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <div className="flex items-center justify-end gap-3 px-5 pt-3">
        {SORT_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSort(s)}
            className={`text-xs ${
              activeSort === s ? 'font-bold text-navy' : 'text-text-muted'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 단어 카드 리스트 */}
      <div className="space-y-3 px-5 pt-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white py-12 text-center">
            <p className="text-sm text-text-muted">검색 결과가 없습니다</p>
          </div>
        ) : (
          filtered.map((entry) => <WordCard key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  )
}
