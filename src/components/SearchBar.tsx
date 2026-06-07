import { Search } from 'lucide-react'
import type { FormEvent } from 'react'
import { cn } from '../lib/utils'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search a food (e.g. Yam, Tomatoes, Rice)...',
  className,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex w-full items-center rounded-pill bg-surface p-2 shadow-elevated',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 pl-4">
        <Search
          className="size-5 shrink-0 text-muted"
          strokeWidth={2}
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none',
            'placeholder:text-muted/70',
            'focus:ring-0',
          )}
          aria-label="Search food commodities"
        />
      </div>
      <button
        type="submit"
        className={cn(
          'shrink-0 rounded-pill bg-brand-green px-7 py-2.5 text-sm font-semibold text-white',
          'transition-colors hover:bg-brand-green-hover',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green',
        )}
      >
        Forecast
      </button>
    </form>
  )
}
