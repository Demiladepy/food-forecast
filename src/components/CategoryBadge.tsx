import type { CommodityCategory } from '../data/types'
import { cn } from '../lib/utils'

export interface CategoryBadgeProps {
  category: CommodityCategory
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-pill bg-brand-dark/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm',
        className,
      )}
    >
      {category}
    </span>
  )
}
