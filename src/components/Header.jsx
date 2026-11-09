import { Link, NavLink } from 'react-router-dom'
import { Clapperboard, Bookmark, Compass } from 'lucide-react'
import { useWatchlist } from '../state/WatchlistContext'

export default function Header() {
  const { watchlist } = useWatchlist()
  return <header className="topbar">
    <Link to="/" className="brand"><span className="brand-icon"><Clapperboard size={21}/></span>cine<span>scope</span></Link>
    <nav>
      <NavLink to="/" end><Compass size={16}/> Discover</NavLink>
      <NavLink to="/watchlist"><Bookmark size={16}/> My Watchlist <b className="count">{watchlist.length}</b></NavLink>
    </nav>
  </header>
}