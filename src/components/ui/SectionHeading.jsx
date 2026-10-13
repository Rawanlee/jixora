export function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] ${
        dark ? 'text-volt' : 'text-moss'
      }`}
    >
      <span aria-hidden="true" className={`h-px w-6 ${dark ? 'bg-volt/60' : 'bg-moss/50'}`} />
      {children}
    </p>
  )
}

export function SectionHeading({ eyebrow, title, description, dark = false, align = 'left', id, as: Tag = 'h2' }) {
  const centered = align === 'center'
  return (
    <div data-reveal className={`flex max-w-2xl flex-col gap-4 ${centered ? 'mx-auto items-center text-center' : ''}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={`text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`text-base leading-relaxed sm:text-lg ${dark ? 'text-pine-200' : 'text-ink-2'}`}>{description}</p>
      )}
    </div>
  )
}
