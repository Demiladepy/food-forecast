import { Share2 } from 'lucide-react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { getCommodityImageFallback } from '../data/images'
import type { Commodity } from '../data/types'
import { formatNGN } from '../lib/formatters/money'
import { cn } from '../lib/utils'
import { CategoryBadge } from './CategoryBadge'
import { ChangeBadge } from './ChangeBadge'
import { OptimizedImage } from './OptimizedImage'

export interface CommodityCardProps {
  commodity: Commodity
  onClick?: () => void
  className?: string
}

export function CommodityCard({ commodity, onClick, className }: CommodityCardProps) {
  const handleShareClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <article
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e: KeyboardEvent<HTMLElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className={cn(
        'group cursor-pointer overflow-hidden rounded-card border border-border bg-surface shadow-sm',
        'transition-all duration-200 active:scale-[0.99] sm:hover:-translate-y-1 sm:hover:shadow-elevated',
        className,
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <OptimizedImage
          src={commodity.image}
          fallbackSrc={getCommodityImageFallback(commodity.id)}
          alt={commodity.name}
          className="size-full object-cover transition-transform duration-300 sm:group-hover:scale-[1.02]"
        />
        <CategoryBadge category={commodity.category} className="absolute left-3 top-3" />
        <ChangeBadge changePct={commodity.changePct} className="absolute right-3 top-3" />
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-bold leading-snug text-foreground">{commodity.name}</h3>
        <p className="mt-0.5 text-xs text-muted">{commodity.vendor}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.08em] text-muted uppercase">
              Today
            </p>
            <p className="mt-1 text-lg font-bold leading-tight text-foreground">
              {formatNGN(commodity.todayPrice)}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">{commodity.unit}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-[0.08em] text-muted uppercase">
              In 1 month
            </p>
            <p className="mt-1 text-lg font-bold leading-tight text-foreground">
              {formatNGN(commodity.forecastPrice)}
            </p>
          </div>
        </div>

        <div className="my-3.5 h-px bg-border" />

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 px-2 text-[11px] font-medium text-muted transition-colors hover:text-foreground active:text-foreground sm:min-h-0 sm:min-w-0 sm:px-0"
          >
            <Share2 className="size-3.5" strokeWidth={1.75} aria-hidden />
            Share
          </button>
        </div>
      </div>
    </article>
  )
}
