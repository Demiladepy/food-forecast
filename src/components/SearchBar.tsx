import { Search } from 'lucide-react'
import type { FormEvent } from 'react'
import { cn } from '../lib/utils'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  className?: string
  hideButton?: boolean
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search a food (e.g. Yam, Tomatoes, Rice)...',
  className,
  hideButton = false,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex w-full flex-col gap-2 rounded-card bg-surface p-2 shadow-search',
        'sm:flex-row sm:items-center sm:gap-1 sm:rounded-pill sm:p-1.5',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-2 sm:gap-3 sm:pl-3.5">
        <Search
          className="size-[18px] shrink-0 text-muted"
          strokeWidth={2}
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'min-w-0 flex-1 border-0 bg-transparent py-2.5 text-base text-foreground outline-none sm:text-sm',
            'placeholder:text-muted/75',
            'focus:ring-0',
          )}
          aria-label="Search food commodities"
        />
      </div>
      {!hideButton && (
        <button
          type="submit"
          className={cn(
            'min-h-11 w-full shrink-0 rounded-pill bg-brand-green px-7 py-2.5 text-sm font-semibold text-white',
            'transition-colors hover:bg-brand-green-hover active:bg-brand-green-hover',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green',
            'sm:w-auto sm:min-h-0',
          )}
        >
          Forecast
        </button>
      )}
    </form>
  )
}
