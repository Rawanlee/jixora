const styles = {
  'On track': 'bg-ontrack/15 text-ontrack',
  Slipping: 'bg-slipping/15 text-slipping',
  'At risk': 'bg-atrisk/15 text-atrisk',
  Paused: 'bg-paused/20 text-paused',
}

const dots = {
  'On track': 'bg-ontrack',
  Slipping: 'bg-slipping',
  'At risk': 'bg-atrisk',
  Paused: 'bg-paused',
}

export function StatusPill({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap ${
        styles[status] ?? 'bg-white/10 text-pine-200'
      } ${className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dots[status] ?? 'bg-pine-300'}`} />
      {status}
    </span>
  )
}

export function SampleDataTag({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-wider text-pine-300 ${className}`}
    >
      Sample data
    </span>
  )
}
