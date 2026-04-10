import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import FloatingButton from './components/FloatingButton'
import BottomSheet from './components/BottomSheet'
import MainPage from './pages/MainPage'
import DictionaryPage from './pages/DictionaryPage'
import FeedPage from './pages/FeedPage'
import CrewPage from './pages/CrewPage'

export default function App() {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false)
  const location = useLocation()
  // 메인 페이지에는 인라인 측정이 있으므로 플로팅 버튼 숨김
  const showFloating = location.pathname !== '/'

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/crew" element={<CrewPage />} />
        </Routes>
      </main>
      {showFloating && <FloatingButton onClick={() => setBottomSheetOpen(true)} />}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setBottomSheetOpen(false)} />
    </div>
  )
}
