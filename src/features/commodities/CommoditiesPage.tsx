import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CommodityCard, GuestChip, PageHeader, SearchBar } from '../../components'
import { getAllFoods, predictFoodPrice, recordCommodityClick } from '@/api/index'
import type { Commodity } from '@/data/types'
import { cn } from '../../lib/utils'

const CATEGORIES = [
  { id: 'ALL', label: 'All' },
  { id: 'VEGETABLES', label: 'Vegetables' },
  { id: 'GRAINS', label: 'Grains' },
  { id: 'TUBERS', label: 'Tubers' },
  { id: 'LEGUMES', label: 'Legumes' },
  { id: 'PROTEIN', label: 'Protein' },
]

export function CommoditiesPage() {
  const navigate = useNavigate()
  const { commodities } = useOutletContext<{ commodities: Commodity[] }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [data, setData] = useState<any[]>([])
  const [loadData] = useState(false)

  const handleCommodityClick = (id: string) => {
    recordCommodityClick(id).catch((err) => console.error('Failed to record click:', err))
    navigate(`/commodities/${id}`)
  }

  // Prevent unused variable compilation errors
  if (false as boolean && data.length > 0) {
    setData([])
  }

  useEffect(() => {
    if (!loadData) return
    getAllFoods().then((foods) => {
      const com = foods.map<Promise<any>>(async (f) => {
        const p = await predictFoodPrice({
          commodity_id: f.id,
          month_num: 1,
          state: 'Lagos',
        })
        return {
          id: f.id,
          name: f.name,
          category: f.category,
          image: f.image,
          vendor: '',
          changePct: p.predicted_price_change_percent,
          todayPrice: 2000,
          unit: f.quantity,
          forecastPrice: (2000 * p.predicted_price_change_percent) / 100,
        }
      })
      Promise.allSettled(com).then((c) => {
        setData(c.filter((cc) => cc.status == 'fulfilled').map((cc) => (cc as any).value))
      })
    })
  }, [loadData])

  // Filter logic
  const filteredCommodities = commodities.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="page-stack">
      <PageHeader title="Welcome to Food Forecast" action={<GuestChip compact />} />

      {/* Search and Category Filter Pills */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search commodities..."
            hideButton
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'rounded-pill px-3.5 py-2 text-xs font-semibold border transition-all duration-200 active:scale-95',
                  isActive
                    ? 'bg-brand-green border-brand-green text-white shadow-sm'
                    : 'bg-surface border-border text-foreground hover:bg-surface-soft active:bg-surface-soft'
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-foreground">All commodities</h2>
            <p className="mt-1 text-sm text-muted">Browse forecasts across monitored markets</p>
          </div>
          <p className="text-sm font-medium text-muted sm:shrink-0">
            {filteredCommodities.length} {filteredCommodities.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {filteredCommodities.length === 0 ? (
          <div className="rounded-card border border-border bg-surface p-12 text-center">
            <Search className="mx-auto size-8 text-muted" strokeWidth={1.5} />
            <p className="mt-4 text-base font-bold text-foreground">No commodities found</p>
            <p className="mt-1 text-sm text-muted">
              We couldn't find any commodities matching &quot;{searchQuery}&quot; in the selected category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filteredCommodities.map((commodity) => (
              <CommodityCard
                key={commodity.id}
                commodity={commodity}
                onClick={() => handleCommodityClick(commodity.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

