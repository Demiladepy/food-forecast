import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { ArrowLeft, ArrowDown, ArrowUp, Check, ThumbsDown, ThumbsUp } from 'lucide-react'
import { CommodityCard } from '../../components'
import { formatNGN } from '../../lib/formatters/money'
import { getCommodityImageFallback } from '../../data/images'
import { cn } from '../../lib/utils'
import { recordCommodityClick } from '../../api/index'
import type { Commodity } from '../../data/types'

const FEATURE_NAME_MAP: Record<string, string> = {
  Off_Season_Tightening: 'Off-season tightening',
  General_Inflation_Rate: 'General inflation rate',
  Food_Inflation_Delta_1M: 'Food inflation delta (1M)',
  Exchange_Rate_Change_1W: 'Exchange rate change (1W)',
  Price_Change_1Q: 'Price change (1Q)',
  Price_Change_6M: 'Price change (6M)',
  Fuel_Price_Increase: 'Fuel price increase',
  Harvest_Supply_Surplus: 'Harvest supply surplus',
  Transport_Cost_Delta: 'Transport cost delta',
  Processing_Energy_Cost: 'Processing energy cost',
  Cassava_Supply_Tightening: 'Cassava supply tightening',
  Silo_Stock_Releases: 'Silo stock releases',
  Exchange_Rate_Stability: 'Exchange rate stability',
  Storage_Decay_Losses: 'Storage decay losses',
  Poultry_Feed_Cost: 'Poultry feed cost',
  Distribution_Logistics: 'Distribution logistics',
  Consumer_Demand_Shift: 'Consumer demand shift',
}

function formatFeatureName(feature: string): string {
  if (FEATURE_NAME_MAP[feature]) {
    return FEATURE_NAME_MAP[feature]
  }
  return feature.replace(/_/g, ' ')
}

export function CommodityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null)
  const { commodities } = useOutletContext<{ commodities: Commodity[] }>()

  // Reset feedback state when the active commodity changes
  useEffect(() => {
    setFeedbackGiven(null)
    if (id) {
      recordCommodityClick(id).catch((err) => console.error('Failed to record view:', err))
    }
  }, [id])

  const commodity = commodities.find((c) => c.id === id)

  if (!commodity) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold text-foreground">Commodity not found</h2>
        <p className="mt-2 text-muted">The requested commodity details could not be found.</p>
        <Link
          to="/commodities"
          className="mt-6 inline-flex items-center gap-2 rounded-pill bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-hover"
        >
          <ArrowLeft className="size-4" /> Back to Commodities
        </Link>
      </div>
    )
  }

  // Calculate recommendation items (3 random commodities excluding the current one)
  const recommendations = useMemo(() => {
    return commodities
      .filter((c) => c.id !== commodity.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
  }, [commodity.id, commodities])

  // Calculate values
  const hasForecast = !!commodity.forecast
  const forecastPercent = commodity.forecast ? commodity.forecast.predicted_price_change_percent : commodity.changePct
  const forecastPrice = commodity.forecastPrice
  const direction = forecastPercent >= 0 ? 'increase' : 'decrease'

  return (
    <div className="page-stack">
      {/* Back button */}
      <div>
        <Link
          to="/commodities"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-muted hover:text-foreground uppercase transition-colors"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2.5} /> All commodities
        </Link>
      </div>

      {/* Main card panel */}
      <div className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-brand bg-accent-muted overflow-hidden border border-border p-1">
              <img
                src={commodity.image}
                onError={(e) => {
                  e.currentTarget.src = getCommodityImageFallback(commodity.id)
                }}
                alt={commodity.name}
                className="size-full rounded-md object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {commodity.name}
              </h1>
              <p className="text-[11px] font-semibold text-muted tracking-wider uppercase mt-0.5">
                Forecast Horizon: 1 Month
              </p>
            </div>
          </div>
        </div>

        {/* Price transition block */}
        <div className="mt-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          <div className="flex-1 rounded-card border border-border bg-surface-soft p-5">
            <p className="text-[10px] font-bold tracking-wider text-muted uppercase">Today</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatNGN(commodity.todayPrice)}
            </p>
            <p className="mt-0.5 text-xs text-muted">{commodity.unit} — {commodity.vendor}</p>
          </div>

          <div className="flex items-center justify-center shrink-0">
            <span className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted">
              <ArrowLeft className="size-4 rotate-180 hidden md:block" strokeWidth={2.5} />
              <ArrowLeft className="size-4 -rotate-90 md:hidden" strokeWidth={2.5} />
            </span>
          </div>

          <div className="flex-1 rounded-card border border-border bg-surface-soft p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase">In 1 month</p>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-[11px] font-bold',
                  direction === 'increase'
                    ? 'bg-confidence-high/10 text-brand-green'
                    : 'bg-confidence-low/10 text-danger',
                )}
              >
                {direction === 'increase' ? (
                  <ArrowUp className="size-3" strokeWidth={3} />
                ) : (
                  <ArrowDown className="size-3" strokeWidth={3} />
                )}
                {direction === 'increase' ? '+' : ''}
                {forecastPercent.toFixed(1)}%
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatNGN(forecastPrice)}
            </p>
            <p className="mt-0.5 text-xs text-muted">{commodity.unit}</p>
          </div>
        </div>

        {/* Narrative summary text */}
        <div className="mt-8">
          <p className="text-base leading-relaxed text-foreground md:text-lg">
            {commodity.forecast?.summary || `${commodity.name} is expected to ${direction} by about ${Math.abs(forecastPercent).toFixed(1)}% over the next month.`}
          </p>
        </div>
      </div>

      {/* Why this prediction section */}
      {hasForecast && commodity.forecast && (
        <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Why this prediction</h2>
          <p className="mt-1 text-sm text-muted">
            Ordered by how much each factor moves the forecast.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {commodity.forecast.xai_explanation.top_driving_features.map((featureObj) => {
              const isUp = featureObj.direction === 'increase'
              const impactText = `${isUp ? '+' : ''}${featureObj.impact_percentage.toFixed(2)}%`
              
              return (
                <div
                  key={featureObj.feature}
                  className="flex flex-col gap-3 rounded-card border border-border bg-surface-soft p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-brand border text-xs',
                        isUp
                          ? 'border-brand-green/20 bg-confidence-high/10 text-brand-green'
                          : 'border-danger/20 bg-confidence-low/10 text-danger',
                      )}
                    >
                      {isUp ? (
                        <ArrowUp className="size-3.5" strokeWidth={2.5} />
                      ) : (
                        <ArrowDown className="size-3.5" strokeWidth={2.5} />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {formatFeatureName(featureObj.feature)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        Current Value: {featureObj.current_value}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex self-start pl-11 sm:self-center sm:pl-0">
                    <span
                      className={cn(
                        'text-sm font-bold',
                        isUp ? 'text-brand-green' : 'text-danger',
                      )}
                    >
                      Impact: {impactText}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 border-t border-border pt-4 text-xs text-muted">
            Base market trend contributes about{' '}
            <span className="font-semibold text-foreground">
              {commodity.forecast.xai_explanation.base_market_trend.toFixed(2)}%
            </span>.
          </div>
        </section>
      )}

      {/* Seasonality Box (Hidden/Disabled for V1) */}
      {/*
      {hasForecast && commodity.forecast?.seasonality && (
        <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8 flex items-start gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted">
            <Calendar className="size-4 text-brand-green" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-sm font-bold text-foreground">Is this normal for the season?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {commodity.forecast.seasonality.description}
            </p>
          </div>
        </section>
      )}
      */}

      {/* Track Record Box (Hidden for V1) */}
      {/*
      {hasForecast && commodity.forecast?.track_record && (
        <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="size-4 text-brand-green" strokeWidth={2} />
            <h2 className="text-base font-bold text-foreground">How we did last time</h2>
          </div>
          <p className="mt-1 text-xs text-muted">
            Forecast issued {commodity.forecast.track_record.issued_date}.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-border bg-surface-soft p-4 text-center">
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase">We predicted</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                +{commodity.forecast.track_record.predicted_change_percent.toFixed(1)}%
              </p>
            </div>
            
            <div className="rounded-card border border-border bg-surface-soft p-4 text-center">
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase">Actual move</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                +{commodity.forecast.track_record.actual_change_percent.toFixed(1)}%
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {commodity.forecast.track_record.summary}
          </p>
        </section>
      )}
      */}

      {/* Feedback Widget */}
      <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 text-center">
        {feedbackGiven ? (
          <div className="flex flex-col items-center justify-center gap-2 py-3 text-brand-green">
            <Check className="size-6 border border-brand-green rounded-full p-1" strokeWidth={3} />
            <p className="text-sm font-semibold">Thank you for your feedback!</p>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-bold text-foreground">Was this prediction useful?</h3>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setFeedbackGiven('yes')}
                className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-border bg-surface px-5 py-2 text-xs font-semibold text-foreground hover:bg-surface-soft active:bg-surface-soft"
              >
                <ThumbsUp className="size-3.5 text-brand-green" /> Yes
              </button>
              <button
                type="button"
                onClick={() => setFeedbackGiven('no')}
                className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-border bg-surface px-5 py-2 text-xs font-semibold text-foreground hover:bg-surface-soft active:bg-surface-soft"
              >
                <ThumbsDown className="size-3.5 text-danger" /> No
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">
          Other commodities to watch
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <CommodityCard
              key={rec.id}
              commodity={rec}
              onClick={() => {
                navigate(`/commodities/${rec.id}`)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
