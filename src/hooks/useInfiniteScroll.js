import { useEffect } from 'react'

// Calls loadMore when the last visible area enters the screen.
export default function useInfiniteScroll(targetRef, loadMore, hasMore) {
  useEffect(() => {
    const target = targetRef.current
    if (!target || !hasMore) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore()
    }, { rootMargin: '160px' })
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef, loadMore, hasMore])
}