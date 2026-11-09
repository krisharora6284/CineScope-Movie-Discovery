import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bookmark, Clock3, Star } from 'lucide-react'
import { titles } from '../data/titles'
import { useWatchlist } from '../state/WatchlistContext'
import TitleGrid from '../components/TitleGrid'
import PosterImage from '../components/PosterImage'

export default function Detail() {
  const { id } = useParams()
  const item = titles.find(t => t.id === Number(id))
  const { isSaved, toggleWatchlist } = useWatchlist()
  if (!item) return <main className="page-shell"><div className="empty-state"><h3>Title not found</h3><Link to="/">Back to discover</Link></div></main>
  const similar = titles.filter(t => t.genre === item.genre && t.id !== item.id).slice(0, 4)
  const saved = isSaved(item.id)
  return <main className="detail-page">
    <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to discover</Link>
    <section className="detail-hero" style={{backgroundImage:`linear-gradient(90deg, #10121b 8%, rgba(16,18,27,.92) 42%, rgba(16,18,27,.35)), url(${item.backdrop})`}}>
      <PosterImage className="detail-poster" src={item.poster} fallbacks={item.posterFallbacks || []} title={item.title} genre={item.genre} year={item.year} alt={`${item.title} poster`}/>
      <div className="detail-copy">
        <div className="eyebrow">{item.type.toUpperCase()} <span>•</span> {item.year} <span>•</span> {item.genre.toUpperCase()}</div>
        <h1>{item.title}</h1>
        <div className="detail-stats">{item.rating ? <span className="rating"><Star size={16} fill="currentColor"/> {item.rating} / 10</span> : <span className="rating">2026 release</span>}<span><Clock3 size={16}/> {item.runtime}</span></div>
        <p className="overview">{item.overview}</p>
        <div className="cast"><small>STARRING</small><p>{item.cast.join('  ·  ')}</p></div>
        {item.posterSource && <p className="poster-credit">Poster reference: <a href={item.posterSource} target="_blank" rel="noreferrer">{item.sourceName} ↗</a></p>}
        <button className={`watch-button ${saved?'is-saved':''}`} onClick={() => toggleWatchlist(item)}><Bookmark size={17} fill={saved?'currentColor':'none'}/>{saved?'Saved to watchlist':'Add to watchlist'}</button>
      </div>
    </section>
    <section className="trailer-section"><div className="section-heading"><div><div className="eyebrow">TAKE A LOOK</div><h2>Official <em>trailer.</em></h2></div></div><div className="video-frame"><iframe src={item.trailer} title={`${item.title} trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div></section>
    {similar.length > 0 && <section className="similar-section"><div className="section-heading"><div><div className="eyebrow">MORE LIKE THIS</div><h2>You may also <em>like.</em></h2></div></div><TitleGrid items={similar}/></section>}
  </main>
}