import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import InlineTemperature from '../components/InlineTemperature'
import WordCard from '../components/WordCard'
import { WORDS, CATEGORY_LABELS } from '../data/words'

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'parent', label: '부모' },
  { key: 'child', label: '아이' },
  { key: 'situation', label: '상황' },
]

export default function MainPage() {
  const [filter, setFilter] = useState('all')

  const filteredWords =
    filter === 'all' ? WORDS : WORDS.filter((w) => w.category === filter)

  // 미리보기 — 6개만 노출하고 더보기로 사전 페이지로 이동
  const previewWords = filteredWords.slice(0, 6)

  return (
    <div className="pb-24">
      {/* A-1. 히어로 섹션 — 30개 단어 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy via-navy-light to-navy px-5 pb-12 pt-14 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(247,215,107,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(247,215,107,0.3) 0%, transparent 50%)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-lg">
          {/* 단어들 */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {WORDS.map((entry) => (
              <span
                key={entry.id}
                className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 font-serif text-[13px] text-white/60 line-through decoration-gold/50 decoration-[1.5px]"
              >
                {entry.word}
              </span>
            ))}
          </div>

          {/* 카피 */}
          <h1 className="text-center font-serif text-[22px] font-bold leading-relaxed text-white">
            생각 없이 가볍게 쓰였던 말,<br />
            <span className="text-gold">진짜 괜찮은 걸까요?</span>
          </h1>

          <p className="mt-4 text-center text-sm leading-relaxed text-white/70">
            매일의 한 마디가 아이의 세상을 만듭니다.<br />
            우리, 다정한 말로 다시 시작해봐요.
          </p>

          <div className="mt-7 flex justify-center">
            <a
              href="#dictionary"
              className="inline-flex items-center gap-1.5 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy transition-transform hover:scale-105 active:scale-95"
            >
              이 말, 바꿔봐요
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* 임팩트 카운터 */}
          <div className="mt-9 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-sm">
            <p className="text-xs text-white/60">지금까지</p>
            <p className="mt-1 font-serif">
              <span className="text-3xl font-bold text-gold">247개</span>
              <span className="ml-1 text-base text-white">의 말이 바뀌었습니다</span>
            </p>
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-white/60">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-orange" />
                캠페인 47
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                챗봇 132
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                크루 68
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 양육 언어 온도 — 인라인 */}
      <InlineTemperature />

      {/* 양육 언어 사전 */}
      <section id="dictionary" className="mx-auto max-w-lg px-5 pt-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Malbit Dictionary
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-navy">양육 언어 사전</h2>
          </div>
          <BookOpen className="h-6 w-6 text-navy" />
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          냉소의 말을 다정한 말로 바꿔가는 살아있는 사전입니다
        </p>

        {/* 카테고리 필터 */}
        <div className="mt-5 flex gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                filter === c.key
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

        {/* 단어 카드 리스트 */}
        <div className="mt-4 space-y-3">
          {previewWords.map((entry) => (
            <WordCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* 더보기 */}
        <Link
          to="/dictionary"
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl border-2 border-navy bg-white py-4 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          전체 {WORDS.length}개 단어 모두 보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
