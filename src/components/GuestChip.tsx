import { Bell } from 'lucide-react'
import { cn } from '../lib/utils'

export interface GuestChipProps {
  className?: string
  compact?: boolean
}

export function GuestChip({ className, compact = false }: GuestChipProps) {
  return (
    <div className={cn('flex shrink-0 items-center gap-2 sm:gap-2.5', className)}>
      <button
        type="button"
        className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground active:bg-surface-soft sm:size-9"
        aria-label="Notifications"
      >
        <Bell className="size-4" strokeWidth={1.75} aria-hidden />
      </button>
      <div
        className={cn(
          'flex items-center gap-2 rounded-pill border border-border bg-surface py-1 pl-1',
          compact ? 'pr-1 sm:pr-3.5' : 'pr-3.5',
        )}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white sm:size-7">
          A
        </span>
        <div className={cn('text-left leading-tight', compact && 'hidden sm:block')}>
          <p className="text-xs font-semibold text-foreground">Anonymous</p>
          <p className="text-[11px] text-muted">Guest viewer</p>
        </div>
      </div>
    </div>
  )
}
