import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-sm text-moss">Error 404</p>
      <h1 className="max-w-xl text-4xl font-semibold sm:text-5xl">This page skipped its session.</h1>
      <p className="max-w-lg text-lg text-ink-2">The page you’re looking for doesn’t exist or has moved. Head back to the homepage or get in touch.</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/" size="lg">Back to home <ArrowRight className="size-4" aria-hidden="true" /></ButtonLink>
        <ButtonLink to="/#contact" variant="outline" size="lg">Contact us</ButtonLink>
      </div>
    </section>
  )
}
