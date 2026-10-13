import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Adds a gentle scroll-reveal to elements marked with [data-reveal].
 * Content is fully visible in the prerendered HTML; the animation is only
 * enabled after hydration, so crawlers and no-JS visitors see everything.
 */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const root = document.documentElement
    root.classList.add('js-reveal')
    const items = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    items.forEach((el) => {
      // Anything already in view on load is revealed immediately.
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) el.classList.add('is-visible')
      else observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])
}
