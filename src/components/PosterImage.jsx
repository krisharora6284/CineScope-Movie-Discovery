import { useState } from 'react'

// Tries the primary poster URL and its alternate hosts before showing a fallback.
export default function PosterImage({ src, fallbacks = [], alt, title, genre, year, className = '' }) {
  const sources = [src, ...fallbacks].filter(Boolean)
  const [sourceIndex, setSourceIndex] = useState(0)
  const [failed, setFailed] = useState(sources.length === 0)

  const handleError = () => {
    if (sourceIndex + 1 < sources.length) setSourceIndex(index => index + 1)
    else setFailed(true)
  }

  if (failed) {
    return (
      <div className={`${className} poster-fallback`} role="img" aria-label={alt || `${title} poster`}>
        <span className="fallback-kicker">CINESCOPE</span>
        <span className="fallback-title">{title}</span>
        <span className="fallback-meta">{year || 'FEATURE'} · {genre || 'CINEMA'}</span>
      </div>
    )
  }

  return <img className={className} src={sources[sourceIndex]} alt={alt || `${title} poster`} loading="lazy" onError={handleError} />
}
