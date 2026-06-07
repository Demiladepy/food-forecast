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
        'flex items-start justify-between gap-6',
        className,
      )}
    >
      <div className="min-w-0">
        <p className="text-sm text-muted">{greeting}</p>
        <h1 className="font-display mt-0.5 text-[1.65rem] leading-tight text-foreground">
          {title}
        </h1>
      </div>
      {action}
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
      <Icon className={cn('size-[18px] text-brand-green', iconClassName)} strokeWidth={2} aria-hidden />
      <h2 className={cn('text-base font-bold text-foreground', titleClassName)}>{title}</h2>
    </div>
  )
}
