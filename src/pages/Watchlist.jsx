import { Bookmark, Film } from 'lucide-react'
import { useWatchlist } from '../state/WatchlistContext'
import TitleGrid from '../components/TitleGrid'
import { Link } from 'react-router-dom'

export default function Watchlist() {
  const { watchlist } = useWatchlist()
  return <main className="page-shell">
    <div className="page-heading"><div className="eyebrow"><Bookmark size={14}/> YOUR PERSONAL COLLECTION</div><h1>My <em>watchlist.</em></h1><p>All the stories you’ve saved, together in one place.</p></div>
    {watchlist.length ? <><div className="watchlist-meta">{watchlist.length} saved {watchlist.length === 1 ? 'title' : 'titles'}</div><TitleGrid items={watchlist}/></> :
      <div className="empty-state watch-empty"><Film size={38}/><h3>Your watchlist is waiting</h3><p>Save movies and series using the bookmark icon.</p><Link to="/" className="primary-link">Discover titles <span>↗</span></Link></div>}
  </main>
}