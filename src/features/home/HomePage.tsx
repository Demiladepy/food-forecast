import { Activity, Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { CommodityCard, GuestChip, PageHeader, SearchBar, StatCard } from '../../components'
import { commodities, marketStats } from '../../data/commodities'
import { heroMarketImage } from '../../data/images'
import { cn } from '../../lib/utils'

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleCommodityClick = () => {
    // Detail route coming in a later screen
  }

  const handleSearchSubmit = () => {
    // Search / forecast flow coming later
  }

  return (
    <div className="page-stack">
      <PageHeader title="Welcome to Food Forecast" action={<GuestChip />} />

      <section
        className={cn(
          'relative min-h-[25rem] overflow-hidden rounded-hero',
          'bg-cover bg-center',
        )}
        style={{ backgroundImage: `url(${heroMarketImage})` }}
      >
        <div
          className="absolute inset-0 bg-linear-to-r from-brand-dark/80 via-brand-dark/50 to-brand-dark/5"
          aria-hidden
        />
        <div className="relative flex min-h-[25rem] flex-col px-9 py-9 md:px-10 md:py-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-pill bg-brand-dark/60 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            <Sparkles className="size-3.5 shrink-0 text-brand-gold" strokeWidth={2} aria-hidden />
            Forecasts update across 47 markets
          </span>

          <div className="mt-auto flex w-full max-w-2xl flex-col items-start pt-8">
            <h2 className="font-display text-[2.35rem] leading-[1.12] tracking-tight text-white md:text-[2.5rem]">
              Stop guessing. Start
              <br />
              <span className="text-brand-gold">planning your market.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
              See where the price of tomatoes, rice, yam and the rest of your basket is heading —
              weeks ahead, with the human reasons behind every move. Free, forever.
            </p>

            <div className="mt-8 w-full max-w-[34rem]">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
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
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              At-a-glance market
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tap any commodity to see its 30-day forecast
            </p>
          </div>
          <p className="text-sm font-medium text-muted">{commodities.length} items</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {commodities.map((commodity) => (
            <CommodityCard
              key={commodity.id}
              commodity={commodity}
              onClick={handleCommodityClick}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
