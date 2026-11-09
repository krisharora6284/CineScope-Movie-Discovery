import { useCallback, useMemo, useRef, useState } from 'react'
import { Search, SlidersHorizontal, Sparkles, TrendingUp, Film } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { titles, genres } from '../data/titles'
import useDebounce from '../hooks/useDebounce'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import TitleGrid from '../components/TitleGrid'
import PosterImage from '../components/PosterImage'

export default function Home() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') || '')
  const [genre, setGenre] = useState(params.get('genre') || 'All')
  const [type, setType] = useState(params.get('type') || 'All')
  const [sort, setSort] = useState('popular')
  const [visibleCount, setVisibleCount] = useState(8)
  const debouncedSearch = useDebounce(search)
  const sentinelRef = useRef(null)

  const filtered = useMemo(() => {
    let result = titles.filter(item =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (genre === 'All' || item.genre === genre) &&
      (type === 'All' || item.type === type)
    )
    if (sort === 'rating') result = [...result].sort((a,b) => b.rating-a.rating)
    if (sort === 'year') result = [...result].sort((a,b) => b.year-a.year)
    return result
  }, [debouncedSearch, genre, type, sort])

  const loadMore = useCallback(() => setVisibleCount(count => Math.min(count + 4, filtered.length)), [filtered.length])
  useInfiniteScroll(sentinelRef, loadMore, visibleCount < filtered.length)
  const shown = filtered.slice(0, visibleCount)

  function updateGenre(value) {
    setGenre(value); setVisibleCount(8)
    const next = new URLSearchParams(params)
    value === 'All' ? next.delete('genre') : next.set('genre', value)
    setParams(next, { replace: true })
  }
  function updateSearch(value) {
    setSearch(value); setVisibleCount(8)
    const next = new URLSearchParams(params)
    value ? next.set('q', value) : next.delete('q')
    setParams(next, { replace: true })
  }

  return <main>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={14}/> YOUR NEXT WATCH STARTS HERE</div>
        <h1>Stories worth<br/><em>staying in for.</em></h1>
        <p>Explore movies and series picked for every mood. Save the ones you love and build your personal watchlist.</p>
        <a href="#discover" className="primary-link">Explore titles <span>↗</span></a>
      </div>
      <div className="hero-art">
        <div className="hero-glow"></div>
        <PosterImage className="hero-poster poster-one" src={titles[0].poster} title={titles[0].title} genre={titles[0].genre} year={titles[0].year} alt="Featured movie poster"/>
        <PosterImage className="hero-poster poster-two" src={titles[2].poster} title={titles[2].title} genre={titles[2].genre} year={titles[2].year} alt="Featured movie poster"/>
        <PosterImage className="hero-poster poster-three" src={titles[6].poster} title={titles[6].title} genre={titles[6].genre} year={titles[6].year} alt="Featured movie poster"/>
        <div className="floating-note"><span>✦</span><div><b>Tonight's pick</b><small>Discover something great</small></div></div>
      </div>
    </section>

    <section id="discover" className="catalog-section">
      <div className="section-heading">
        <div><div className="eyebrow"><TrendingUp size={14}/> THE COLLECTION</div><h2>Find your <em>next favourite.</em></h2></div>
        <span className="results-count">{filtered.length} titles to explore</span>
      </div>
      <div className="toolbar">
        <label className="search-box"><Search size={18}/><input value={search} onChange={e => updateSearch(e.target.value)} placeholder="Search movies or series..."/>{search && <button onClick={() => updateSearch('')}>×</button>}</label>
        <label className="select-wrap"><SlidersHorizontal size={16}/><select value={sort} onChange={e => setSort(e.target.value)}><option value="popular">Sort: Popular</option><option value="rating">Top rated</option><option value="year">Newest first</option></select></label>
      </div>
      <div className="filters">
        <div className="filter-group">{['All','Movie','Series'].map(v => <button key={v} className={`chip ${type===v?'active':''}`} onClick={() => {setType(v);setVisibleCount(8); const p=new URLSearchParams(params);v==='All'?p.delete('type'):p.set('type',v);setParams(p,{replace:true})}}>{v==='All'?'All titles':v==='Movie'?'Movies':'Web series'}</button>)}</div>
        <div className="genre-group">{genres.map(g => <button key={g} className={`genre-chip ${genre===g?'chosen':''}`} onClick={() => updateGenre(g)}>{g}</button>)}</div>
      </div>
      {shown.length ? <TitleGrid items={shown}/> : <div className="empty-state"><Film size={34}/><h3>No titles found</h3><p>Try another title or change your filters.</p><button className="text-button" onClick={() => {updateSearch('');updateGenre('All');setType('All')}}>Clear all filters</button></div>}
      <div ref={sentinelRef} className="load-sentinel">{visibleCount < filtered.length ? 'Loading more titles…' : filtered.length ? 'You’re all caught up ✨' : ''}</div>
    </section>
    <section className="team-showcase">
      <div className="team-intro">
        <div className="eyebrow"><Sparkles size={14}/> THE PEOPLE BEHIND THE PROJECT</div>
        <h2>Four minds. <em>One screen.</em></h2>
        <p>CineScope is a collaborative movie and series discovery experience, planned, designed and developed as a team project.</p>
      </div>
      <div className="team-grid">
        <article className="team-card"><span>01</span><h3>Krish</h3><p>Project planning & research</p></article>
        <article className="team-card"><span>02</span><h3>Agastya</h3><p>UI design & frontend layout</p></article>
        <article className="team-card"><span>03</span><h3>Hardik</h3><p>React components & functionality</p></article>
        <article className="team-card"><span>04</span><h3>Nehal</h3><p>Testing, content & documentation</p></article>
      </div>
      <div className="project-note"><b>PROJECT HIGHLIGHTS</b><span>12 curated titles</span><span>Live search & filters</span><span>Personal watchlist</span><span>Responsive design</span></div>
    </section>
  </main>
}