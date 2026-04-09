import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ThumbsUp, Send } from 'lucide-react'
import ImpactCounter from '../components/ImpactCounter'
import ReframingCard from '../components/ReframingCard'

const CYNICAL_WORDS = [
  '잼민이', '초딩', '헬육아', '급식충',
  '경단녀', '중2병', '짐승', '맘충',
]

const PROPOSALS = [
  { text: '꼬마 시민', votes: 89, rank: 1 },
  { text: '초등 친구', votes: 67, rank: 2 },
  { text: '새싹이', votes: 45, rank: 3 },
  { text: '어린이 시민', votes: 38, rank: 4 },
]

const CHANGED_WORDS = [
  { before: '잼민이', after: '꼬마 시민', count: 234, source: 'campaign', hot: true },
  { before: '헬육아', after: '성장의 여정', count: 187, source: 'campaign', hot: true },
  { before: '맘충', after: null, count: null, source: 'campaign', voting: true, month: '8월' },
]

export default function MainPage() {
  const [proposal, setProposal] = useState('')
  const [votedIdx, setVotedIdx] = useState(null)

  return (
    <div className="pb-24">
      {/* A-1. 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy via-navy-light to-navy px-6 pb-10 pt-16 text-center text-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(247,215,107,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(247,215,107,0.2) 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CYNICAL_WORDS.map((word) => (
              <span
                key={word}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-serif text-base text-white/70 line-through decoration-gold/60"
              >
                {word}
              </span>
            ))}
          </div>
          <h1 className="mt-8 font-serif text-2xl font-bold leading-snug tracking-tight text-white">
            이 말들이<br />
            <span className="text-gold">가벼운 말이 아닙니다.</span>
          </h1>
          <a
            href="#contest"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-transform hover:scale-105 active:scale-95"
          >
            이 말, 바꿔봐요
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="relative mt-8">
          <ImpactCounter />
        </div>
      </section>

      {/* A-2. 이달의 공모 섹션 */}
      <section id="contest" className="mx-auto max-w-lg px-5 pt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-navy">7월 공모</h2>
          <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
            D-12
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-white p-6 text-center">
          <p className="font-serif text-2xl font-bold text-navy">"초딩"을</p>
          <p className="mt-1 font-serif text-lg text-navy">뭘로 바꾸면 좋을까요?</p>
          <p className="mt-3 text-sm text-text-secondary">
            초등학생을 비하하는 이 표현,<br />
            다정한 대안을 함께 만들어주세요
          </p>

          <div className="mt-5 flex gap-2">
            <input
              type="text"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="당신의 대안을 입력해주세요"
              className="flex-1 rounded-xl border border-border bg-cream px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            />
            <button className="flex items-center gap-1 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light">
              <Send className="h-3.5 w-3.5" />
              제안
            </button>
          </div>

          <p className="mt-4 text-xs text-text-muted">156건의 대안이 제안되었습니다</p>
        </div>

        {/* 투표 목록 */}
        <div className="mt-4 space-y-2">
          {PROPOSALS.map((p, i) => (
            <button
              key={i}
              onClick={() => setVotedIdx(i)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                votedIdx === i
                  ? 'border-navy bg-navy-06'
                  : 'border-border bg-white hover:border-navy/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    p.rank === 1
                      ? 'bg-gold text-navy'
                      : 'bg-cream-dark text-text-muted'
                  }`}
                >
                  {p.rank}
                </span>
                <span className="font-medium text-text">{p.text}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">{p.votes}표</span>
                <ThumbsUp
                  className={`h-4 w-4 ${
                    votedIdx === i ? 'text-navy' : 'text-text-muted'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* A-3. 지금까지 바뀐 말들 */}
      <section className="mx-auto max-w-lg px-5 pt-12">
        <h2 className="font-serif text-xl font-bold text-navy">지금까지 바뀐 말들</h2>
        <div className="mt-4 space-y-3">
          {CHANGED_WORDS.map((item, i) =>
            item.voting ? (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-dashed border-orange/40 bg-orange/5 px-5 py-4"
              >
                <div>
                  <span className="font-serif text-base font-medium text-text">{item.before}</span>
                  <span className="mx-2 text-text-muted">→</span>
                  <span className="text-sm text-orange">투표 진행 중</span>
                  <span className="ml-2 rounded-full bg-orange/10 px-2 py-0.5 text-[11px] text-orange">
                    📮 {item.month} 공모
                  </span>
                </div>
                <button className="rounded-lg bg-orange px-3 py-1.5 text-xs font-semibold text-white">
                  참여
                </button>
              </div>
            ) : (
              <ReframingCard
                key={i}
                before={item.before}
                after={item.after}
                source={item.source}
                count={item.count}
              />
            )
          )}
        </div>

        <Link
          to="/dictionary"
          className="mt-6 flex items-center justify-center gap-1 py-3 text-sm font-medium text-navy transition-colors hover:text-navy-light"
        >
          양육 언어 사전 전체 보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
