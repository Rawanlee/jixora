import { Link } from 'react-router'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap'

const variants = {
  primary: 'bg-ink text-paper hover:bg-pine-700 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]',
  volt: 'bg-volt text-ink hover:bg-volt-600',
  outline: 'border border-ink/15 bg-white/60 text-ink hover:border-ink/40 hover:bg-white',
  ghostDark: 'border border-white/15 text-paper hover:border-white/40 hover:bg-white/5',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
}

export function buttonClass({ variant = 'primary', size = 'md', className = '' } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

/** Internal links use the router; mailto/external links fall back to <a>. */
export function ButtonLink({ to, variant, size, className, children, ...rest }) {
  const cls = buttonClass({ variant, size, className })
  if (/^(mailto:|https?:)/.test(to)) {
    return (
      <a href={to} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {children}
    </Link>
  )
}

export function Button({ variant, size, className, children, type = 'button', ...rest }) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  )
}
