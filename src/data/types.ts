export type Trend = 'rising' | 'falling'

export type Confidence = 'high' | 'medium' | 'low'

export type CommodityCategory =
  | 'VEGETABLES'
  | 'GRAINS'
  | 'TUBERS'
  | 'LEGUMES'
  | 'PROTEIN'

export interface PredictionFeature {
  feature: string
  current_value: number
  impact_percentage: number
  direction: 'increase' | 'decrease'
}

export interface XAIExplanation {
  base_market_trend: number
  top_driving_features: PredictionFeature[]
}

export interface SeasonalityDetails {
  is_normal: boolean
  description: string
}

export interface HistoricalTrackRecord {
  issued_date: string
  predicted_change_percent: number
  actual_change_percent: number
  summary: string
}

export interface ForecastDetails {
  predicted_price_change_percent: number
  forecast_horizon: string
  summary: string
  xai_explanation: XAIExplanation
  seasonality: SeasonalityDetails
  track_record: HistoricalTrackRecord
}

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
  forecast?: ForecastDetails
}

export interface MarketSnapshotStats {
  risingCount: number
  fallingCount: number
  avgChangePct: number
}
