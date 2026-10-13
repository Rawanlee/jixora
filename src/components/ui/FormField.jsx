const control =
  'w-full rounded-xl border bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-ink-3/70 transition-colors focus:outline-none focus:ring-2 focus:ring-moss/25'

export function FormField({ id, label, error, required, hint, as = 'input', options, className = '', ...props }) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined
  const border = error ? 'border-atrisk focus:border-atrisk' : 'border-line focus:border-moss'
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-atrisk"> *</span> : <span className="font-normal text-ink-3"> (optional)</span>}
      </label>
      {as === 'select' ? (
        <select id={id} name={id} aria-invalid={!!error} aria-describedby={describedBy} required={required} className={`${control} ${border} h-11`} {...props}>
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={id} name={id} aria-invalid={!!error} aria-describedby={describedBy} required={required} rows={4} className={`${control} ${border} py-2.5`} {...props} />
      ) : (
        <input id={id} name={id} aria-invalid={!!error} aria-describedby={describedBy} required={required} className={`${control} ${border} h-11`} {...props} />
      )}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-ink-3">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-xs font-medium text-atrisk">{error}</p>}
    </div>
  )
}
