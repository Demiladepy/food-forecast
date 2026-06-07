import { Bell } from 'lucide-react'
import { cn } from '../lib/utils'

export interface GuestChipProps {
  className?: string
}

export function GuestChip({ className }: GuestChipProps) {
  return (
    <div className={cn('flex shrink-0 items-center gap-2.5', className)}>
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" strokeWidth={1.75} aria-hidden />
      </button>
      <div className="flex items-center gap-2 rounded-pill border border-border bg-surface py-1 pr-3.5 pl-1">
        <span className="flex size-7 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
          A
        </span>
        <div className="text-left leading-tight">
          <p className="text-xs font-semibold text-foreground">Anonymous</p>
          <p className="text-[11px] text-muted">Guest viewer</p>
        </div>
      </div>
    </div>
  )
}
