import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Scrolls to the hash target after route changes, or to the top otherwise. */
export function useScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
}
