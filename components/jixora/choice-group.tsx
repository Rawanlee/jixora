'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ChoiceGroup({
  label,
  options,
  defaultValue,
  size = 'md',
  onChange,
}: {
  label: string
  options: string[]
  defaultValue?: string
  size?: 'sm' | 'md'
  onChange?: (value: string) => void
}) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue)

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selected === option
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              setSelected(option)
              onChange?.(option)
            }}
            className={cn(
              'rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-secondary text-secondary-foreground hover:border-foreground/30',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
