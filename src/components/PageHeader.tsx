import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface PageHeaderProps {
  greeting?: string
  title: string
  action?: ReactNode
  className?: string
}

export function PageHeader({
  greeting = 'Good morning',
  title,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">{greeting}</p>
        <h1 className="font-display mt-0.5 text-xl leading-tight text-foreground sm:text-[1.65rem]">
          {title}
        </h1>
      </div>
      {action ? (
        <div className="flex shrink-0 justify-end sm:justify-start">{action}</div>
      ) : null}
    </header>
  )
}

export interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-[11px] font-bold tracking-[0.14em] text-brand-green uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}

export interface IconSectionHeaderProps {
  icon: LucideIcon
  title: string
  className?: string
  iconClassName?: string
  titleClassName?: string
}

export function IconSectionHeader({
  icon: Icon,
  title,
  className,
  iconClassName,
  titleClassName,
}: IconSectionHeaderProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Icon
        className={cn('size-[18px] shrink-0 text-brand-green', iconClassName)}
        strokeWidth={2}
        aria-hidden
      />
      <h2 className={cn('text-base font-bold text-foreground', titleClassName)}>{title}</h2>
    </div>
  )
}
