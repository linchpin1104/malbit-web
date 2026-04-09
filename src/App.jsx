import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
      <FloatingButton onClick={() => setBottomSheetOpen(true)} />
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setBottomSheetOpen(false)} />
    </div>
  )
}
