import { Activity, Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommodityCard, GuestChip, OptimizedImage, PageHeader, SearchBar, StatCard } from '../../components'
import { commodities, marketStats } from '../../data/commodities'
import { heroMarketImage, heroMarketImageFallback } from '../../data/images'
import { cn } from '../../lib/utils'

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleCommodityClick = (id: string) => {
    navigate(`/commodities/${id}`)
  }

  const handleSearchSubmit = () => {
    // Search / forecast flow coming later
  }

  return (
    <div className="page-stack">
      <PageHeader title="Welcome to Food Forecast" action={<GuestChip compact />} />

      <section
        className={cn(
          'relative min-h-[21rem] overflow-hidden rounded-card sm:min-h-[23rem] sm:rounded-hero lg:min-h-[25rem]',
        )}
      >
        <OptimizedImage
          src={heroMarketImage}
          fallbackSrc={heroMarketImageFallback}
          alt=""
          eager
          className="absolute inset-0 size-full object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-brand-dark/90 via-brand-dark/65 to-brand-dark/30 sm:from-brand-dark/80 sm:via-brand-dark/50 sm:to-brand-dark/5"
          aria-hidden
        />
        <div className="relative flex min-h-[21rem] flex-col px-5 py-6 sm:min-h-[23rem] sm:px-8 sm:py-8 md:px-10 md:py-10 lg:min-h-[25rem]">
          <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-pill bg-brand-dark/60 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-3.5 sm:text-[11px]">
            <Sparkles className="size-3.5 shrink-0 text-brand-gold" strokeWidth={2} aria-hidden />
            <span className="truncate">Forecasts update across 47 markets</span>
          </span>

          <div className="mt-auto flex w-full flex-col items-start pt-6 sm:max-w-2xl sm:pt-8">
            <h2 className="font-display text-[1.65rem] leading-[1.15] tracking-tight text-white sm:text-[2.15rem] md:text-[2.35rem] lg:text-[2.5rem]">
              Stop guessing. Start
              <br />
              <span className="text-brand-gold">planning your market.</span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:mt-4">
              See where the price of tomatoes, rice, yam and the rest of your basket is heading,
              weeks ahead, with the human reasons behind every move. Free, forever.
            </p>

            <div className="mt-6 w-full sm:mt-8 sm:max-w-[34rem]">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard
          label="Rising"
          value={marketStats.risingCount}
          sublabel="commodities"
          icon={TrendingUp}
          iconVariant="plain"
          iconClassName="text-foreground"
        />
        <StatCard
          label="Falling"
          value={marketStats.fallingCount}
          sublabel="commodities"
          icon={TrendingDown}
          iconVariant="plain"
          iconClassName="text-foreground"
        />
        <StatCard
          label="Avg. Change"
          value={`${marketStats.avgChangePct}%`}
          sublabel="this week"
          icon={Activity}
          iconVariant="boxed"
          iconClassName="text-brand-green"
          iconBgClassName="bg-accent-muted"
        />
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              At-a-glance market
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tap any commodity to see its 30-day forecast
            </p>
          </div>
          <p className="text-sm font-medium text-muted sm:shrink-0">{commodities.length} items</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {commodities.slice(0, 8).map((commodity) => (
             <CommodityCard
               key={commodity.id}
               commodity={commodity}
               onClick={() => handleCommodityClick(commodity.id)}
             />
           ))}
        </div>
      </section>
    </div>
  )
}
