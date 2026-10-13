import { MousePointerClick } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { CoachConsole } from '../dashboard/CoachConsole.jsx'
import { ErrorBoundary } from '../ErrorBoundary.jsx'

export function Showcase() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="dark-surface relative overflow-hidden bg-pine-950 py-24 lg:py-32">
      <div className="grid-texture-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            dark
            id="demo-title"
            eyebrow="Product walkthrough"
            title="The coach console, with a sample gym."
            description="Search and filter members, open a member record, send a message, and approve or dismiss the changes JiXora has drafted. Everything here runs in your browser on fictional sample data."
          />
          <p data-reveal className="flex items-center gap-2 text-sm text-pine-300">
            <MousePointerClick className="size-4 text-volt" aria-hidden="true" />
            Try the Review queue and Members tabs
          </p>
        </div>
        <div data-reveal className="mt-12">
          <ErrorBoundary fallback={<p className="rounded-xl border border-white/10 p-8 text-center text-pine-200">The interactive demo could not load. Please refresh the page.</p>}>
            <CoachConsole />
          </ErrorBoundary>
        </div>
        <p className="mt-4 text-center text-xs text-pine-300">
          Sample data: the workspace, members, coaches and figures shown are fictional and do not represent JiXora customers or results.
        </p>
      </div>
    </section>
  )
}
