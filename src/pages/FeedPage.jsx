import { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'

const FILTERS = ['전체', '크루만', '일반', '간증']

const POSTS = [
  {
    nickname: '하늘맘',
    handle: '@sky_mom',
    platform: 'IG',
    time: '2시간 전',
    body: '아이가 "싫어!"라고 소리칠 때 예전엔 "왜 맨날 이래"라고 했는데, 오늘은 "지금 기분이 안 좋구나"라고 말했어요. 아이가 잠깐 멈추더니 "엄마, 나 지금 슬퍼"라고 했어요.',
    tags: ['#매일빛으로', '#말빛크루'],
    likes: 47,
    comments: 12,
    isCrew: true,
  },
  {
    nickname: '다정한아빠',
    handle: '@kind_dad_j',
    platform: 'TH',
    time: '5시간 전',
    body: '아들이 숙제를 안 하길래 "또 안 했어?"라고 하려다가, "언제 하면 좋을까? 같이 정해볼까?"라고 바꿔 말했더니 오히려 스스로 앉더라고요. 말 하나 바꿨을 뿐인데.',
    tags: ['#매일빛으로', '#말빛크루', '#더나일크루'],
    likes: 35,
    comments: 8,
    isCrew: true,
  },
  {
    nickname: '소소한하루',
    handle: '@daily_small',
    platform: 'IG',
    time: '8시간 전',
    body: '양육언어지도에서 온도 측정해봤는데 38도... 충격이었어요. 그런데 "관심을 갖고 있다는 것 자체가 변화의 시작"이라는 말에 위로를 받았습니다.',
    tags: ['#매일빛으로', '#양육언어온도'],
    likes: 23,
    comments: 5,
    isCrew: false,
  },
  {
    nickname: '김다정 가족',
    handle: '@dajeong_fam',
    platform: 'IG',
    time: '1일 전',
    body: '12주가 끝났습니다. 처음엔 "또 시작이야"가 입버릇이었는데, 이제는 "오늘도 새롭게 시작이네"라고 말하게 됐어요. 남편이 먼저 "우리 진짜 많이 바뀌었다"라고 하더라고요.',
    tags: ['#매일빛으로', '#말빛크루', '#12주간증'],
    likes: 128,
    comments: 34,
    isCrew: true,
    isTestimony: true,
  },
]

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState('전체')

  const filtered = POSTS.filter((p) => {
    if (activeFilter === '크루만') return p.isCrew
    if (activeFilter === '일반') return !p.isCrew
    if (activeFilter === '간증') return p.isTestimony
    return true
  })

  const crewCount = POSTS.filter((p) => p.isCrew).length
  const generalCount = POSTS.filter((p) => !p.isCrew).length

  return (
    <div className="mx-auto max-w-lg pb-24">
      <div className="px-5 pt-6">
        <h1 className="font-serif text-2xl font-bold text-navy">#매일빛으로</h1>
        <p className="mt-1 text-sm text-text-secondary">지금 이 순간도 말이 바뀌고 있어요</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
          <span>{POSTS.length}건</span>
          <span>크루 {crewCount}가족</span>
          <span>일반 {generalCount}명</span>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-1.5 px-5 pt-4">
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

      {/* 게시글 */}
      <div className="mt-4 space-y-3 px-5">
        {filtered.map((post, i) => (
          <article
            key={i}
            className={`rounded-2xl border bg-white p-5 ${
              post.isTestimony ? 'border-gold' : 'border-border'
            }`}
          >
            {post.isTestimony && (
              <span className="mb-2 inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] font-semibold text-navy">
                12주 간증
              </span>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light text-xs font-bold text-white">
                  {post.nickname[0]}
                </div>
                <div>
                  <span className="text-sm font-medium text-text">{post.nickname}</span>
                  <span className="ml-1.5 text-xs text-text-muted">{post.handle}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                    post.platform === 'IG'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-black text-white'
                  }`}
                >
                  {post.platform}
                </span>
                <span className="text-[11px] text-text-muted">{post.time}</span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-text">{post.body}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-navy-60">{tag}</span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Heart className="h-3.5 w-3.5" /> {post.likes}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
