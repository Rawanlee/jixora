import { useId, useState } from 'react'
import { adherenceSeries, programs } from '../../data/demo.js'

const W = 560
const H = 200
const PAD = { l: 34, r: 12, t: 14, b: 26 }
const MIN = 50
const MAX = 100

const x = (i, n) => PAD.l + (i * (W - PAD.l - PAD.r)) / (n - 1)
const y = (v) => PAD.t + ((MAX - v) * (H - PAD.t - PAD.b)) / (MAX - MIN)

export function AdherenceChart() {
  const [cohort, setCohort] = useState('all')
  const [hover, setHover] = useState(null)
  const gradId = useId()
  const series = adherenceSeries[cohort]
  const n = series.length
  const line = series.map((v, i) => `${i ? 'L' : 'M'}${x(i, n).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(n - 1, n)} ${H - PAD.b} L${x(0, n)} ${H - PAD.b} Z`
  const active = hover ?? n - 1

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">Weekly session adherence</p>
          <p className="text-xs text-pine-300">% of planned sessions completed, by program week</p>
        </div>
        <label className="text-xs text-pine-300">
          <span className="sr-only">Cohort</span>
          <select
            value={cohort}
            onChange={(e) => { setCohort(e.target.value); setHover(null) }}
            className="h-8 rounded-lg border border-white/10 bg-pine-850 px-2 text-xs text-paper focus:border-volt/60 focus:outline-none"
          >
            <option value="all">All programs</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Adherence by week for ${cohort === 'all' ? 'all programs' : programs.find((p) => p.id === cohort).name}. Week ${active + 1}: ${series[active]}%.`} onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#d7f94a" stopOpacity="0.28" />
              <stop offset="1" stopColor="#d7f94a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[50, 60, 70, 80, 90, 100].map((v) => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="rgb(255 255 255 / 0.06)" />
              <text x={PAD.l - 8} y={y(v) + 3.5} textAnchor="end" fontSize="10" fill="#9db3aa" fontFamily="JetBrains Mono, monospace">{v}</text>
            </g>
          ))}
          {/* Typical drop-off window */}
          <rect x={x(2, n)} y={PAD.t} width={x(4, n) - x(2, n)} height={H - PAD.t - PAD.b} fill="rgb(236 93 63 / 0.07)" />
          <text x={(x(2, n) + x(4, n)) / 2} y={PAD.t + 12} textAnchor="middle" fontSize="9.5" fill="#ec5d3f" fontFamily="JetBrains Mono, monospace">drop-off window</text>
          <path d={area} fill={`url(#${gradId})`} />
          <path d={line} fill="none" stroke="#d7f94a" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />
          {series.map((v, i) => (
            <g key={i}>
              <rect
                x={x(i, n) - (W - PAD.l - PAD.r) / (n - 1) / 2}
                y={PAD.t}
                width={(W - PAD.l - PAD.r) / (n - 1)}
                height={H - PAD.t - PAD.b}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
              <circle cx={x(i, n)} cy={y(v)} r={active === i ? 4.5 : 2.5} fill={active === i ? '#d7f94a' : '#0e1a16'} stroke="#d7f94a" strokeWidth="1.5" pointerEvents="none" />
              <text x={x(i, n)} y={H - 8} textAnchor="middle" fontSize="9.5" fill={active === i ? '#f5f4ee' : '#9db3aa'} fontFamily="JetBrains Mono, monospace">W{i + 1}</text>
            </g>
          ))}
          <line x1={x(active, n)} x2={x(active, n)} y1={y(series[active]) + 6} y2={H - PAD.b} stroke="rgb(215 249 74 / 0.35)" strokeDasharray="3 3" pointerEvents="none" />
        </svg>
        <div
          className="pointer-events-none absolute top-0 rounded-md border border-white/10 bg-pine-950/95 px-2 py-1 text-[0.7rem]"
          style={{ left: `clamp(0px, calc(${(x(active, n) / W) * 100}% - 44px), calc(100% - 92px))` }}
        >
          <span className="text-pine-300">Week {active + 1}</span>{' '}
          <span className="font-mono font-semibold text-volt">{series[active]}%</span>
        </div>
      </div>
      <div className="flex gap-1" role="group" aria-label="Select week">
        {series.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Week ${i + 1}`}
            aria-pressed={active === i}
            onClick={() => setHover(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${active === i ? 'bg-volt' : 'bg-white/10 hover:bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  )
}
