import { ArrowRight, Sparkles, Check, MessageCircle } from 'lucide-react'
import { ButtonLink } from '../ui/Button.jsx'
import { StatusPill } from '../ui/StatusPill.jsx'

function ProgressRing({ day = 38 }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 84 84" className="size-20" aria-hidden="true">
      <circle cx="42" cy="42" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="7" />
      <circle cx="42" cy="42" r={r} fill="none" stroke="#d7f94a" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - day / 90)} transform="rotate(-90 42 42)" />
      <text x="42" y="40" textAnchor="middle" fontSize="17" fontWeight="700" fill="#f5f4ee" fontFamily="Bricolage Grotesque Variable, sans-serif">{day}</text>
      <text x="42" y="54" textAnchor="middle" fontSize="8.5" fill="#9db3aa" fontFamily="JetBrains Mono, monospace">OF 90</text>
    </svg>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none" aria-label="Illustration of the JiXora member check-in and coach view, using sample data" role="img">
      {/* Coach panel */}
      <div className="dark-surface rounded-[1.4rem] border border-white/10 bg-pine-900 p-4 text-paper shadow-[0_40px_80px_-30px_rgb(8_17_14/0.6)] pb-16 sm:p-5 sm:pb-16">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-pine-300">Coach console · today</p>
          <span className="rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-pine-300">Sample data</span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <ProgressRing />
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold">Daniel Okafor</p>
            <p className="text-xs text-pine-300">Strength Base · Week 6 · Coach Femi</p>
            <div className="mt-2 flex gap-1" aria-hidden="true">
              {[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1].map((d, i) => (
                <span key={i} className={`h-5 w-2 rounded-sm ${d ? 'bg-volt/80' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-volt/25 bg-volt/[0.07] p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-volt">
            <Sparkles className="size-3.5" /> Drafted for your approval
          </p>
          <p className="mt-1 text-sm">Swap Thursday’s gym session for a 30-min bodyweight session.</p>
          <p className="mt-0.5 text-xs text-pine-300">Reason: member is travelling with no gym access.</p>
          <div className="mt-2.5 flex gap-2">
            <span className="inline-flex h-7 items-center gap-1 rounded-full bg-volt px-3 text-xs font-semibold text-ink"><Check className="size-3.5" />Approve</span>
            <span className="inline-flex h-7 items-center rounded-full border border-white/15 px-3 text-xs">Edit</span>
          </div>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {[
            ['Amara Nwosu', 'Slipping', 'Reported knee soreness twice'],
            ['Tomás Herrera', 'At risk', 'No reply to 4 check-ins'],
          ].map(([n, s, r]) => (
            <li key={n} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2">
              <span className="min-w-0 flex-1">
                <span className="block text-sm">{n}</span>
                <span className="block truncate text-[0.7rem] text-pine-300">{r}</span>
              </span>
              <StatusPill status={s} />
            </li>
          ))}
        </ul>
      </div>

      {/* Member phone check-in */}
      <div className="relative -mt-12 ml-auto mr-3 w-[80%] max-w-[19rem] rounded-[1.4rem] border border-line bg-white p-4 shadow-[0_30px_60px_-25px_rgb(13_22_19/0.35)] sm:-mr-4">
        <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-ink-3">
          <MessageCircle className="size-3" /> Member check-in · 07:30
        </p>
        <p className="mt-3 rounded-2xl rounded-tl-sm bg-paper-2 px-3 py-2 text-[0.8rem] leading-snug text-ink">
          Morning Daniel — Lower Body A is planned for Thursday. Still good for the gym?
        </p>
        <p className="ml-auto mt-2 w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-ink px-3 py-2 text-[0.8rem] leading-snug text-paper">
          Travelling Thu–Fri, no gym access.
        </p>
        <p className="mt-2 rounded-2xl rounded-tl-sm bg-paper-2 px-3 py-2 text-[0.8rem] leading-snug text-ink">
          Got it. Your coach is reviewing a hotel-room version for Thursday.
        </p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="product" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 pb-24 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-32 lg:pt-20">
        <div className="flex flex-col items-start gap-7">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-moss/20 bg-moss-50 px-3 py-1 text-xs font-medium text-moss">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-moss" aria-hidden="true" />
            Early access open for coaches, gyms and wellness programs
          </p>
          <h1 id="hero-title" className="animate-rise text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink [animation-delay:60ms] sm:text-6xl lg:text-[4.25rem]">
            Keep every member on plan for all{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">90 days.</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.08em] z-0 h-[0.32em] rounded-sm bg-volt" />
            </span>
          </h1>
          <p className="animate-rise max-w-xl text-lg leading-relaxed text-ink-2 [animation-delay:120ms]">
            JiXora turns each member’s intake into a personalised 90-day training plan, checks in with them every day,
            adapts sessions when life gets in the way and shows your coaches who needs attention — before they quit.
          </p>
          <div className="animate-rise flex w-full flex-col gap-3 [animation-delay:180ms] sm:w-auto sm:flex-row">
            <ButtonLink to="/#early-access" size="lg">
              Request early access <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/#demo" variant="outline" size="lg">
              Explore the coach console
            </ButtonLink>
          </div>
          <p className="text-sm text-ink-3">For personal trainers, studios, gyms and corporate wellness providers.</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
