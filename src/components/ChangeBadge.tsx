import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { cn } from '../lib/utils'

export interface ChangeBadgeProps {
  changePct: number
  className?: string
}

export function ChangeBadge({ changePct, className }: ChangeBadgeProps) {
  const isZero = changePct === 0
  const isRising = changePct > 0
  const Icon = isZero ? Minus : isRising ? TrendingUp : TrendingDown
  const formatted = `${isRising ? '+' : ''}${Number.isInteger(changePct) ? changePct : changePct.toFixed(1)}%`

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-bold text-white',
        isZero ? 'bg-muted' : isRising ? 'bg-increase' : 'bg-decrease',
        className,
      )}
    >
      <Icon className="size-3" strokeWidth={2.5} aria-hidden />
      {formatted}
    </span>
  )
}

