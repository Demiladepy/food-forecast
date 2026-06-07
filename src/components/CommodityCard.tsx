import { Share2 } from 'lucide-react'
import type { KeyboardEvent, MouseEvent } from 'react'
import type { Commodity } from '../data/types'
import { formatNGN } from '../lib/formatters/money'
import { cn } from '../lib/utils'
import { CategoryBadge } from './CategoryBadge'
import { ChangeBadge } from './ChangeBadge'
import { ConfidenceTag } from './ConfidenceTag'

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
        'cursor-pointer overflow-hidden rounded-card border border-border bg-surface shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated',
        className,
      )}
    >
      <div className="relative h-36">
        <img
          src={commodity.image}
          alt={commodity.name}
          className="size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent" />
        <CategoryBadge category={commodity.category} className="absolute left-3 top-3" />
        <ChangeBadge changePct={commodity.changePct} className="absolute right-3 top-3" />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-foreground">{commodity.name}</h3>
        <p className="mt-0.5 text-sm text-muted">{commodity.market}</p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">Today</p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {formatNGN(commodity.todayPrice)}
            </p>
            <p className="text-xs text-muted">{commodity.unit}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">
              In 4 weeks
            </p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {formatNGN(commodity.forecastPrice)}
            </p>
          </div>
        </div>

        <hr className="my-4 border-border" />

        <div className="flex items-center justify-between">
          <ConfidenceTag confidence={commodity.confidence} />
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            <Share2 className="size-3.5" aria-hidden />
            Share
          </button>
        </div>
      </div>
    </article>
  )
}
