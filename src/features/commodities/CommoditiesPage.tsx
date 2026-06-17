import { useNavigate } from 'react-router-dom'
import { CommodityCard, GuestChip, PageHeader } from '../../components'
import { commodities } from '../../data/commodities'

const TOTAL_COMMODITY_COUNT = 47

export function CommoditiesPage() {
  const navigate = useNavigate()
  const handleCommodityClick = (id: string) => {
    navigate(`/commodities/${id}`)
  }

  return (
    <div className="page-stack">
      <PageHeader title="Welcome to Food Forecast" action={<GuestChip compact />} />

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              All commodities
            </h2>
            <p className="mt-1 text-sm text-muted">
              Browse forecasts across monitored markets
            </p>
          </div>
          <p className="text-sm font-medium text-muted sm:shrink-0">{TOTAL_COMMODITY_COUNT} items</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {commodities.map((commodity) => (
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
