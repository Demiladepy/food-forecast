import { Bell } from 'lucide-react'
import { cn } from '../lib/utils'

export interface GuestChipProps {
  className?: string
}

export function GuestChip({ className }: GuestChipProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" aria-hidden />
      </button>
      <div className="flex items-center gap-2.5 rounded-pill border border-border bg-surface py-1.5 pr-4 pl-1.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
          A
        </span>
        <div className="text-left leading-tight">
          <p className="text-sm font-semibold text-foreground">Anonymous</p>
          <p className="text-xs text-muted">Guest viewer</p>
        </div>
      </div>
    </div>
  )
}
