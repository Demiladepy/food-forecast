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
    <header className={cn('flex flex-wrap items-start justify-between gap-4', className)}>
      <div>
        <p className="text-sm text-muted">{greeting}</p>
        <h1 className="font-display mt-1 text-2xl text-foreground">{title}</h1>
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
        'text-xs font-bold tracking-widest text-brand-green uppercase',
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
}

export function IconSectionHeader({
  icon: Icon,
  title,
  className,
  iconClassName,
}: IconSectionHeaderProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Icon className={cn('size-5 text-brand-green', iconClassName)} aria-hidden />
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
  )
}
