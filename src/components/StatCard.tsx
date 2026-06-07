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
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-card border border-border bg-surface p-5',
        className,
      )}
    >
      {iconVariant === 'boxed' ? (
        <div
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-brand',
            iconBgClassName,
          )}
        >
          <Icon className={cn('size-5', iconClassName)} aria-hidden />
        </div>
      ) : (
        <Icon
          className={cn('size-8 shrink-0 stroke-[1.75]', iconClassName)}
          aria-hidden
        />
      )}
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <p className="mt-0.5 text-3xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-0.5 text-sm text-muted">{sublabel}</p>
      </div>
    </div>
  )
}
