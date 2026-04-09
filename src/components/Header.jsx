import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Hash, Users } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-decoration-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-navy-light">
            <span className="text-sm font-bold text-gold">말</span>
          </div>
          <span className="font-serif text-lg font-bold text-navy">말빛</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/dictionary"
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive('/dictionary') ? 'bg-navy text-white' : 'text-text-secondary hover:bg-cream-dark'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            사전
          </Link>
          <Link
            to="/feed"
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive('/feed') ? 'bg-navy text-white' : 'text-text-secondary hover:bg-cream-dark'
            }`}
          >
            <Hash className="h-3.5 w-3.5" />
            피드
          </Link>
          <Link
            to="/crew"
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive('/crew') ? 'bg-navy text-white' : 'text-text-secondary hover:bg-cream-dark'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            크루
          </Link>
        </nav>
      </div>
    </header>
  )
}
