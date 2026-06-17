import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { CommodityCard, GuestChip, PageHeader } from '../../components'
import { getAllFoods, predictFoodPrice, recordCommodityClick } from '@/api/index'
import type { Commodity } from '@/data/types'

const TOTAL_COMMODITY_COUNT = 47

export function CommoditiesPage() {
  const navigate = useNavigate()
  const { commodities } = useOutletContext<{ commodities: Commodity[] }>()
  const handleCommodityClick = (id: string) => {
    recordCommodityClick(id).catch((err) => console.error('Failed to record click:', err))
    navigate(`/commodities/${id}`)
  }
  const [data, setData] = useState<any[]>([]);
  const [loadData, ] = useState(false)

  // Prevent unused variable compilation errors
  if (false as boolean && data.length > 0) {
    setData([]);
  }

  useEffect(() => {
    if (!loadData) return;
    getAllFoods().then(foods => {
      const com = foods.map<Promise<any>>(async f => {
        const p = await predictFoodPrice({
          name: f.name,
          type: f.type,
          month_num: 1,
          state: 'Lagos'
        })
        return {
          id: f.name,
          name: f.name,
          category: f.category,
          image: f.image,
          vendor: "",
          changePct: p.price_change,
          todayPrice: 2000,
          unit: f.quantity,
          forecastPrice: 2000 * p.price_change / 100,
          confidence: p.summary.confidence
        }
      });
      Promise.allSettled(com).then(c => {
        setData(c.filter(cc => cc.status == 'fulfilled').map(cc => cc.value))
      })
    })
  }, [loadData])

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
