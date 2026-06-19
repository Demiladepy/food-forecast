interface ApiResponse<T> {
  success: boolean,
  data: T
}

interface FoodResponse {
  id: string;
  name: string;
  type: string;
  common_name: string;
  category: string;
  quantity: string;
  image: string;
}

interface PredictFoodPriceResponse {
  status: string;
  commodity_id: string;
  request_echo: {
    commodity_id: string;
    state: string;
  };
  forecast_horizon: string;
  predicted_price_change_percent: number;
  xai_explanation: {
    base_market_trend: number;
    top_driving_features: {
      feature: string;
      current_value: number;
      impact_percentage: number;
      direction: 'increase' | 'decrease';
    }[];
  };
  summary?: {
    text: string;
  };
  season_remark?: string;
}

interface PredictFoodSchema {
  commodity_id: string;
  state: string;
  month_num: number;
}

interface FeedbackRequest {
  useful: boolean;
}

interface AdminStatsResponse {
  total_views: number;
  helpful_count: number;
  unhelpful_count: number;
  model_version: string;
  last_sync_time: string;
  commodity_stats: AdminCommodityStat[];
}

interface AdminCommodityStat {
  commodity_id: string;
  name: string;
  views: number;
  helpful: number;
  unhelpful: number;
}