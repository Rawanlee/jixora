import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '../ui/Logo.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { navLinks } from '../../data/site.js'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent bg-paper/0'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label="JiXora home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink to="/#contact" variant="outline" size="sm">
            Contact
          </ButtonLink>
          <ButtonLink to="/#early-access" size="sm">
            Request early access
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-ink/10 bg-white/70 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
          {[...navLinks, { label: 'Contact', href: '/#contact' }].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-xl font-semibold text-ink hover:bg-ink/5"
            >
              {item.label}
              <ArrowRight className="size-4 text-ink-3" aria-hidden="true" />
            </Link>
          ))}
          <ButtonLink to="/#early-access" size="lg" className="mt-6 w-full">
            Request early access
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
