import { Activity, Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { CommodityCard, SearchBar, StatCard } from '../../components'
import { commodities, marketStats } from '../../data/commodities'
import { heroMarketImage } from '../../data/images'
import { cn } from '../../lib/utils'

const HERO_IMAGE = heroMarketImage

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleCommodityClick = () => {
    // Detail route coming in a later screen
  }

  const handleSearchSubmit = () => {
    // Search / forecast flow coming later
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-sm text-muted">Good morning</p>
        <h1 className="font-display mt-1 text-2xl text-foreground">
          Welcome to Food Forecast
        </h1>
      </header>

      <section
        className={cn(
          'relative min-h-[22rem] overflow-hidden rounded-hero',
          'bg-cover bg-center',
        )}
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div
          className="absolute inset-0 bg-linear-to-r from-brand-dark/75 via-brand-dark/45 to-brand-dark/10"
          aria-hidden
        />
        <div className="relative flex min-h-[22rem] flex-col px-10 py-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-pill bg-brand-dark/55 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Sparkles className="size-3.5 shrink-0 text-brand-gold" aria-hidden />
            Forecasts update across 47 markets
          </span>

          <div className="mt-auto flex w-full flex-col items-start pt-6">
            <h2 className="font-display max-w-2xl text-4xl leading-[1.15] tracking-tight text-white">
              Stop guessing. Start
              <br />
              <span className="text-brand-gold">planning your market.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85">
              See where the price of tomatoes, rice, yam and the rest of your basket is heading —
              weeks ahead, with the human reasons behind every move. Free, forever.
            </p>

            <div className="mt-8 w-full max-w-xl">
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
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              At-a-glance market
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tap any commodity to see its 30-day forecast
            </p>
          </div>
          <p className="text-sm text-muted">{commodities.length} items</p>
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
