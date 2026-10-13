// Small, product-specific UI vignettes used in the Features section.
// Decorative: each is hidden from assistive tech because the adjacent copy
// carries the meaning.

function Frame({ children, dark = false, className = '' }) {
  return (
    <div aria-hidden="true" className={`relative h-48 overflow-hidden rounded-xl border p-4 ${dark ? 'border-white/10 bg-pine-900 text-paper' : 'border-line bg-paper'} ${className}`}>
      {children}
    </div>
  )
}

function Intake() {
  return (
    <Frame>
      <p className="text-xs font-semibold text-ink">Where will you train?</p>
      <div className="mt-2 flex gap-1.5">
        {['Gym', 'Home', 'Both'].map((o, i) => (
          <span key={o} className={`rounded-full border px-3 py-1 text-xs ${i === 2 ? 'border-ink bg-ink text-paper' : 'border-line bg-white text-ink-2'}`}>{o}</span>
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold text-ink">Days per week</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="relative h-1.5 flex-1 rounded-full bg-line"><span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-moss" /><span className="absolute -top-1 left-[57%] size-3.5 rounded-full border-2 border-white bg-moss shadow" /></span>
        <span className="font-mono text-xs text-moss">4</span>
      </div>
      <div className="mt-4 rounded-lg border border-slipping/30 bg-slipping/10 p-2.5 text-[0.7rem] leading-snug text-ink-2">
        <span className="font-semibold text-ink">Readiness check · </span>Any chest pain, dizziness or a condition a doctor asked you to manage?
      </div>
    </Frame>
  )
}

function Timeline() {
  const phases = [['Foundation', 2, 'bg-moss/30'], ['Build', 4, 'bg-moss/55'], ['Progress', 5, 'bg-moss/80'], ['Review', 2, 'bg-volt']]
  return (
    <Frame>
      <div className="flex justify-between text-[0.65rem] text-ink-3"><span className="font-mono">WEEK 1</span><span className="font-mono">WEEK 13</span></div>
      <div className="mt-2 flex gap-1">
        {phases.map(([name, w, c]) => (
          <div key={name} style={{ flex: w }}>
            <div className={`h-9 rounded-md ${c}`} />
            <p className="mt-1 truncate text-[0.65rem] text-ink-2">{name}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className={`rounded-md border p-1 text-center text-[0.6rem] ${[0, 2, 4, 5].includes(i) ? 'border-moss/30 bg-white text-ink' : 'border-transparent text-ink-3'}`}>
            {d}
            <span className="block truncate text-[0.55rem] text-ink-3">{{ 0: 'Upper', 2: 'Lower', 4: 'Full', 5: 'Walk' }[i] ?? 'Rest'}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Chat() {
  return (
    <Frame dark>
      <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3 py-1.5 text-[0.72rem]">How did Lower Body A feel today?</p>
      <div className="mt-2 flex gap-1">
        {['Too easy', 'Just right', 'Too hard'].map((o, i) => (
          <span key={o} className={`rounded-full border px-2 py-0.5 text-[0.65rem] ${i === 1 ? 'border-volt bg-volt text-ink' : 'border-white/15 text-pine-200'}`}>{o}</span>
        ))}
      </div>
      <p className="ml-auto mt-2 w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-volt px-3 py-1.5 text-[0.72rem] text-ink">Good, but my knee was a bit sore on lunges</p>
      <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-slipping/15 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-slipping">Tagged: pain · knee · lunges</p>
    </Frame>
  )
}

function Diff() {
  return (
    <Frame>
      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-ink-3">Thursday · drafted change</p>
      <div className="mt-2 rounded-lg border border-atrisk/25 bg-atrisk/5 px-2.5 py-1.5 text-[0.72rem] text-ink-2 line-through decoration-atrisk/60">Lower Body A · gym · 55 min</div>
      <div className="mt-1.5 rounded-lg border border-ontrack/30 bg-ontrack/10 px-2.5 py-1.5 text-[0.72rem] font-medium text-ink">Bodyweight Lower · hotel room · 30 min</div>
      <p className="mt-2 text-[0.68rem] text-ink-3">Weekly volume stays within 10% of plan.</p>
      <div className="mt-2 flex gap-1.5">
        <span className="rounded-full bg-ink px-3 py-1 text-[0.65rem] font-semibold text-paper">Approve</span>
        <span className="rounded-full border border-line px-3 py-1 text-[0.65rem] text-ink-2">Edit</span>
      </div>
    </Frame>
  )
}

function Risk() {
  const rows = [['Hana S.', 'At risk', 'bg-atrisk', [3, 2, 2, 1, 1, 0, 0]], ['Chloe A.', 'Slipping', 'bg-slipping', [3, 3, 2, 2, 2, 1, 2]], ['Lucas M.', 'On track', 'bg-ontrack', [2, 3, 3, 3, 2, 3, 3]]]
  return (
    <Frame dark>
      <ul className="flex flex-col gap-2.5">
        {rows.map(([n, s, c, bars]) => (
          <li key={n} className="flex items-center gap-2">
            <span className="w-16 truncate text-[0.72rem]">{n}</span>
            <span className="flex h-6 flex-1 items-end gap-0.5">
              {bars.map((b, i) => <span key={i} className={`flex-1 rounded-sm ${c} opacity-80`} style={{ height: `${(b / 3) * 100 || 8}%` }} />)}
            </span>
            <span className={`w-14 text-right text-[0.62rem] font-semibold ${c.replace('bg-', 'text-')}`}>{s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.68rem] leading-snug text-pine-300">Hana: 6 days without a reply, 1 of last 4 sessions completed.</p>
    </Frame>
  )
}

function Queue() {
  return (
    <Frame>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">Review queue</p>
        <span className="rounded-full bg-ink px-2 text-[0.62rem] font-bold text-volt">5</span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {[['Session swap', 'Daniel O.'], ['Load adjustment', 'Amara N.'], ['Schedule change', 'Priya R.'], ['Re-engagement', 'Tomás H.']].map(([t, n], i) => (
          <li key={t} className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[0.7rem] ${i === 0 ? 'border-moss/40 bg-white' : 'border-line bg-white/60'}`}>
            <span className="font-medium text-ink">{t}</span>
            <span className="text-ink-3">{n}</span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

function Habits() {
  const items = [['Planned meals', 72], ['Water 2L+', 85], ['7h+ sleep', 58], ['8k steps', 64]]
  return (
    <Frame>
      <p className="text-xs font-semibold">This week’s habits</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map(([l, v]) => (
          <li key={l}>
            <div className="flex justify-between text-[0.7rem]"><span className="text-ink-2">{l}</span><span className="font-mono text-ink">{v}%</span></div>
            <div className="mt-1 h-1.5 rounded-full bg-line"><div className="h-full rounded-full bg-moss" style={{ width: `${v}%` }} /></div>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export const featureVisuals = { intake: Intake, timeline: Timeline, chat: Chat, diff: Diff, risk: Risk, queue: Queue, habits: Habits }
