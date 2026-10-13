import { useEffect } from 'react'
import { CircleCheck } from 'lucide-react'

export function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [toast, onDone])

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      {toast && (
        <p
          key={toast.key}
          className="animate-rise flex items-center gap-2 rounded-full border border-white/10 bg-pine-950 px-4 py-2 text-sm text-paper shadow-lg"
        >
          <CircleCheck className="size-4 text-volt" aria-hidden="true" />
          {toast.message}
        </p>
      )}
    </div>
  )
}
