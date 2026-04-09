import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Lock, Circle, TrendingUp } from 'lucide-react'
import TemperatureBar from '../components/TemperatureBar'

const MISSIONS = [
  { week: 1, title: '가족 냉소 표현 점검', status: 'done' },
  { week: 2, title: '아이들과 말 보드 만들기', status: 'done' },
  { week: 3, title: '리프레이밍 실천', status: 'done' },
  { week: 4, title: '가족 편지 쓰기', status: 'done' },
  { week: 5, title: '아이 감정 읽기', status: 'done' },
  { week: 6, title: '사전에 기여하기', status: 'done' },
  { week: 7, title: '양육 서사 다시 쓰기', status: 'current' },
  { week: 8, title: '중간 돌아보기', status: 'locked' },
  { week: 9, title: '가족 관계 변화 나누기', status: 'locked' },
  { week: 10, title: '다른 크루에게 선물하기', status: 'locked' },
  { week: 11, title: '나의 말빛 이야기 정리', status: 'locked' },
  { week: 12, title: '우리 가족의 변화 간증', status: 'locked' },
]

const TEMP_DATA = [
  { week: 1, value: 32 },
  { week: 2, value: 38 },
  { week: 3, value: 41 },
  { week: 4, value: 45 },
  { week: 5, value: 52 },
  { week: 6, value: 58 },
  { week: 7, value: 61 },
]

export default function CrewPage() {
  const currentTemp = 61
  const startTemp = 32
  const increase = currentTemp - startTemp
  const doneCount = MISSIONS.filter((m) => m.status === 'done').length

  return (
    <div className="mx-auto max-w-lg pb-24">
      {/* 프로필 */}
      <div className="bg-gradient-to-b from-navy to-navy-light px-5 pb-6 pt-8 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-navy">
            김
          </div>
          <div>
            <h1 className="text-lg font-bold">김다정 가족</h1>
            <p className="text-sm text-white/70">말빛 크루 1기 · 7주차</p>
          </div>
        </div>
      </div>

      {/* 온도 카드 */}
      <div className="px-5 pt-5">
        <div className="rounded-2xl border border-border bg-white p-5">
          <TemperatureBar value={currentTemp} showLabel={false} />
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success font-medium">↑{increase}° 상승</span>
            <span className="text-text-muted">· 1주차 {startTemp}° → 현재 {currentTemp}°</span>
          </div>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-3 px-5 pt-4">
        <div className="rounded-xl bg-navy-06 p-4 text-center">
          <p className="text-2xl font-bold text-navy">{doneCount}/12</p>
          <p className="mt-1 text-xs text-text-muted">완료 미션</p>
        </div>
        <div className="rounded-xl bg-navy-06 p-4 text-center">
          <p className="text-2xl font-bold text-navy">23개</p>
          <p className="mt-1 text-xs text-text-muted">리프레이밍</p>
        </div>
        <div className="rounded-xl bg-navy-06 p-4 text-center">
          <p className="text-2xl font-bold text-navy">4주</p>
          <p className="mt-1 text-xs text-text-muted">완주까지</p>
        </div>
      </div>

      {/* 이번 주 미션 */}
      <div className="px-5 pt-6">
        <h2 className="font-serif text-lg font-bold text-navy">이번 주 미션</h2>
        <div className="mt-3 rounded-2xl border-2 border-navy bg-navy-06 p-5">
          <p className="text-sm text-text-muted">Week 7</p>
          <p className="mt-1 font-serif text-lg font-bold text-navy">나의 양육 서사 다시 쓰기</p>
          <p className="mt-2 text-sm text-text-secondary">
            "전쟁" 대신 "여정"으로 내 이야기를 다시 써보세요
          </p>
          <button className="mt-4 w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light">
            미션 참여하기
          </button>
        </div>
      </div>

      {/* 미션 히스토리 */}
      <div className="px-5 pt-8">
        <h2 className="font-serif text-lg font-bold text-navy">미션 히스토리</h2>
        <div className="mt-1 mb-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-navy to-gold"
              style={{ width: `${(doneCount / 12) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-text-muted">{doneCount}/12 완료</p>
        </div>

        <div className="space-y-1">
          {MISSIONS.map((m) => (
            <div
              key={m.week}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 ${
                m.status === 'current' ? 'bg-navy-06 border border-navy/20' : ''
              }`}
            >
              {m.status === 'done' && <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />}
              {m.status === 'current' && <Circle className="h-5 w-5 shrink-0 text-navy" />}
              {m.status === 'locked' && <Lock className="h-5 w-5 shrink-0 text-text-muted/40" />}
              <div className="flex-1">
                <span className={`text-sm ${m.status === 'locked' ? 'text-text-muted/50' : 'text-text'}`}>
                  W{m.week}: {m.title}
                </span>
              </div>
              {m.status === 'current' && (
                <span className="text-xs font-medium text-navy">← 진행 중</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-cream-dark p-3 text-center text-xs text-text-muted">
          완주 기준: 10주 이상 인증 · 현재: <span className="font-medium text-success">정상 진행 중 ✓</span>
        </div>
      </div>

      {/* 온도 변화 그래프 */}
      <div className="px-5 pt-8">
        <h2 className="font-serif text-lg font-bold text-navy">나의 양육 언어 온도 변화</h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-5">
          <div className="relative h-48">
            <svg viewBox="0 0 300 160" className="h-full w-full">
              {/* 그리드 라인 */}
              {[30, 40, 50, 60, 70].map((v, i) => (
                <g key={v}>
                  <line
                    x1="30" y1={140 - (v - 25) * 2.8}
                    x2="280" y2={140 - (v - 25) * 2.8}
                    stroke="#E8E8E3" strokeWidth="0.5"
                  />
                  <text x="5" y={144 - (v - 25) * 2.8} fill="#9B9B93" fontSize="10">{v}</text>
                </g>
              ))}
              {/* 라인 */}
              <polyline
                points={TEMP_DATA.map((d, i) => `${45 + i * 38},${140 - (d.value - 25) * 2.8}`).join(' ')}
                fill="none"
                stroke="#1B2A4A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* 포인트 */}
              {TEMP_DATA.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={45 + i * 38}
                    cy={140 - (d.value - 25) * 2.8}
                    r="4"
                    fill="#1B2A4A"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={45 + i * 38}
                    y={132 - (d.value - 25) * 2.8}
                    fill="#1B2A4A"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {d.value}°
                  </text>
                  <text
                    x={45 + i * 38}
                    y="155"
                    fill="#9B9B93"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {d.week}주
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-2 space-y-1 text-xs text-text-muted">
            <p>📊 <span className="text-navy font-medium">3주차 +5°</span> : 리프레이밍 실천 시작</p>
            <p>📊 <span className="text-navy font-medium">5주차 +7°</span> : 아이 감정 읽기 미션</p>
          </div>
        </div>
      </div>
    </div>
  )
}
