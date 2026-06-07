export type Trend = 'rising' | 'falling'

export type Confidence = 'high' | 'medium' | 'low'

export type CommodityCategory =
  | 'VEGETABLES'
  | 'GRAINS'
  | 'TUBERS'
  | 'LEGUMES'
  | 'PROTEIN'

export interface Commodity {
  id: string
  name: string
  category: CommodityCategory
  image: string
  market: string
  changePct: number
  todayPrice: number
  unit: string
  forecastPrice: number
  confidence: Confidence
}

export interface MarketSnapshotStats {
  risingCount: number
  fallingCount: number
  avgChangePct: number
}
