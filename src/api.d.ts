interface ApiResponse<T> {
  success: boolean,
  data: T
}

interface FoodResponse {
  name: string;
  type: string;
  common_name: string;
  category: string;
  quantity: string;
  image: string;
}

interface PredictFoodPriceResponse {
  price_change: number;
  summary: {
    text: string;
    confidence: 'high' | 'moderate' | 'low';
  };
  factors: {
    name: string;
    change: number;
    reason: string;
  }[];
  season_remark: string;
}

interface PredictFoodSchema {
  name: string,
  type: string,
  state: string,
  month_num: number,
};