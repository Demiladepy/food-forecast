import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type StatIconVariant = 'plain' | 'boxed'

export interface StatCardProps {
  label: string
  value: ReactNode
  sublabel: string
  icon: LucideIcon
  iconVariant?: StatIconVariant
  iconClassName?: string
  iconBgClassName?: string
  bordered?: boolean
  className?: string
}

export function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  iconVariant = 'plain',
  iconClassName,
  iconBgClassName = 'bg-accent-muted',
  bordered = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-card bg-surface px-5 py-4',
        bordered && 'border border-border',
        className,
      )}
    >
      {iconVariant === 'boxed' ? (
        <div
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-brand',
            iconBgClassName,
          )}
        >
          <Icon className={cn('size-5', iconClassName)} strokeWidth={2} aria-hidden />
        </div>
      ) : (
        <Icon
          className={cn('size-7 shrink-0 stroke-[1.75]', iconClassName)}
          aria-hidden
        />
      )}
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-0.5 text-[1.75rem] font-bold leading-none tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-1 text-xs text-muted">{sublabel}</p>
      </div>
    </div>
  )
}
