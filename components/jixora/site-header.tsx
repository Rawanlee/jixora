import { Button } from '@/components/ui/button'

const links = [
  { href: '#plan', label: 'Your plan' },
  { href: '#follow-up', label: 'Accountability' },
  { href: '#progress', label: 'Progress' },
  { href: '#how-it-works', label: 'How it works' },
]

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="JiXora home">
      <span
        aria-hidden="true"
        className="flex size-7 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground"
      >
        J
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        JiXora
      </span>
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="sm" className="rounded-full px-4">
          <a href="#start">Start my plan</a>
        </Button>
      </div>
    </header>
  )
}
