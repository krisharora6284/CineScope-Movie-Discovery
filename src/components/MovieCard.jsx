import { Link } from 'react-router-dom'
import { Bookmark, Star } from 'lucide-react'
import { useWatchlist } from '../state/WatchlistContext'
import PosterImage from './PosterImage'

export default function MovieCard({ item }) {
  const { isSaved, toggleWatchlist } = useWatchlist()
  const saved = isSaved(item.id)
  return <article className="movie-card">
    <Link to={`/title/${item.id}`} className="poster-wrap">
      <PosterImage src={item.poster} fallbacks={item.posterFallbacks || []} title={item.title} genre={item.genre} year={item.year} alt={`${item.title} poster`} />
      <span className="poster-type">{item.type}</span>
      {item.rating ? <span className="poster-rating"><Star size={13} fill="currentColor"/> {item.rating}</span> : <span className="poster-rating upcoming-badge">NEW 2026</span>}
    </Link>
    <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={() => toggleWatchlist(item)} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
      <Bookmark size={17} fill={saved ? 'currentColor' : 'none'}/>
    </button>
    <div className="card-info">
      <Link to={`/title/${item.id}`} className="card-title">{item.title}</Link>
      <p>{item.year} <span>•</span> {item.genre}</p>
    </div>
  </article>
}