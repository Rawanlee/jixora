export function LogoMark({ className = 'size-8', dark = false }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill={dark ? '#182b25' : '#0e1a16'} />
      <path d="M7 16A9 9 0 0 1 16 7" fill="none" stroke="#33564d" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M16 7A9 9 0 1 1 7 16" fill="none" stroke="#d7f94a" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.6" fill="#f5f4ee" />
    </svg>
  )
}

export function Logo({ dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark dark={dark} />
      <span
        className={`font-display text-[1.35rem] font-bold tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}
      >
        JiXora
      </span>
    </span>
  )
}
