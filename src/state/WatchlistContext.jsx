import { createContext, useContext, useEffect, useState } from 'react'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cinescope-watchlist')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cinescope-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  function toggleWatchlist(title) {
    setWatchlist(current =>
      current.some(item => item.id === title.id)
        ? current.filter(item => item.id !== title.id)
        : [...current, title]
    )
  }

  const isSaved = id => watchlist.some(item => item.id === id)
  return <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isSaved }}>
    {children}
  </WatchlistContext.Provider>
}

export function useWatchlist() {
  return useContext(WatchlistContext)
}