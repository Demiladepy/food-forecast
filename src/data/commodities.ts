import { commodityImages, getCommodityImage } from './images'
import type { Commodity, MarketSnapshotStats } from './types'

export const commodities: Commodity[] = [
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    category: 'VEGETABLES',
    image: commodityImages.tomatoes,
    vendor: 'Mile 12 Market, Lagos',
    changePct: 8.5,
    todayPrice: 40_000,
    unit: 'per basket',
    forecastPrice: 43_400,
    confidence: 'high',
    forecast: {
      predicted_price_change_percent: 8.5,
      forecast_horizon: '1_Month',
      summary: 'Tomatoes are likely to climb about 8.5% over the next month as off-season tightening limits supply from the north.',
      xai_explanation: {
        base_market_trend: 10.21,
        top_driving_features: [
          {
            feature: 'Off_Season_Tightening',
            current_value: 1.0,
            impact_percentage: 5.25,
            direction: 'increase'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 2.86,
            direction: 'increase'
          },
          {
            feature: 'Food_Inflation_Delta_1M',
            current_value: 1.2,
            impact_percentage: -1.50,
            direction: 'decrease'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Tomatoes typically rise between April and July when northern dry-season harvests run out before new harvests from the south and middle belt arrive.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: 7.2,
        actual_change_percent: 8.1,
        summary: 'Last cycle we predicted a 7.2% rise, prices actually rose 8.1%. Direction was right, magnitude was very close.'
      }
    }
  },
  {
    id: 'rice-imported',
    name: 'Rice (Imported)',
    category: 'GRAINS',
    image: commodityImages['rice-imported'],
    vendor: 'Daleko Market, Lagos',
    changePct: -3.1,
    todayPrice: 78_500,
    unit: 'per 50kg bag',
    forecastPrice: 76_852,
    confidence: 'high',
    forecast: {
      predicted_price_change_percent: -3.1,
      forecast_horizon: '1_Month',
      summary: 'Imported Rice prices are expected to drop slightly by 3.1% as foreign exchange rate pressures stabilize and local substitutes increase.',
      xai_explanation: {
        base_market_trend: -4.5,
        top_driving_features: [
          {
            feature: 'Exchange_Rate_Change_1W',
            current_value: 1.5,
            impact_percentage: 2.04,
            direction: 'increase'
          },
          {
            feature: 'Food_Inflation_Delta_1M',
            current_value: 1.1,
            impact_percentage: -1.2,
            direction: 'decrease'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 0.6,
            direction: 'increase'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Imported rice prices are less seasonal but heavily dependent on currency fluctuations and custom tariff changes at the ports.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: -2.5,
        actual_change_percent: -3.0,
        summary: 'We predicted a 2.5% decrease, and it fell by 3.0%. The prediction captured the exchange rate stabilization trend well.'
      }
    }
  },
  {
    id: 'scotch-bonnet',
    name: 'Scotch Bonnet',
    category: 'VEGETABLES',
    image: commodityImages['scotch-bonnet'],
    vendor: 'Mile 12 Market, Lagos',
    changePct: 12.3,
    todayPrice: 32_000,
    unit: 'per basket',
    forecastPrice: 35_936,
    confidence: 'medium',
    forecast: {
      predicted_price_change_percent: 12.3,
      forecast_horizon: '1_Month',
      summary: 'Scotch bonnet prices are forecasted to increase by 12.3% due to high transport costs and local distribution challenges at the depots.',
      xai_explanation: {
        base_market_trend: 8.5,
        top_driving_features: [
          {
            feature: 'Fuel_Price_Increase',
            current_value: 850,
            impact_percentage: 3.2,
            direction: 'increase'
          },
          {
            feature: 'Price_Change_1Q',
            current_value: 12,
            impact_percentage: 1.5,
            direction: 'increase'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 0.9,
            direction: 'increase'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Pepper varieties experience significant price volatility during the onset of the rainy season when picking and transport become difficult.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: 10.0,
        actual_change_percent: 11.2,
        summary: 'Our prediction of a 10% rise was close to the actual 11.2% rise, tracking transport hikes effectively.'
      }
    }
  },
  {
    id: 'yam',
    name: 'Yam',
    category: 'TUBERS',
    image: commodityImages.yam,
    vendor: 'Mile 12 Market, Lagos',
    changePct: -10.0,
    todayPrice: 4_500,
    unit: 'per tuber',
    forecastPrice: 4_050,
    confidence: 'high',
    forecast: {
      predicted_price_change_percent: -10.0,
      forecast_horizon: '1_Month',
      summary: 'Yam prices are expected to drop by 10.0% as the harvest season begins, bringing fresh stock to urban markets.',
      xai_explanation: {
        base_market_trend: -15.5,
        top_driving_features: [
          {
            feature: 'Harvest_Supply_Surplus',
            current_value: 2.5,
            impact_percentage: -6.5,
            direction: 'decrease'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 3.5,
            direction: 'increase'
          },
          {
            feature: 'Transport_Cost_Delta',
            current_value: 10,
            impact_percentage: 2.0,
            direction: 'increase'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Yams follow a strong seasonal trend where prices peak in June/July before fresh yam harvest starts arriving in August/September.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: -8.5,
        actual_change_percent: -9.2,
        summary: 'Last month\'s predicted drop of 8.5% was followed by an actual drop of 9.2% as new season harvests started hitting markets.'
      }
    }
  },
  {
    id: 'white-garri',
    name: 'White Garri',
    category: 'GRAINS',
    image: commodityImages['white-garri'],
    vendor: 'Oyingbo Market, Lagos',
    changePct: 3.2,
    todayPrice: 18_200,
    unit: 'per 25kg',
    forecastPrice: 18_782,
    confidence: 'high',
    forecast: {
      predicted_price_change_percent: 3.2,
      forecast_horizon: '1_Month',
      summary: 'White Garri prices will rise slightly by 3.2% as processing costs for cassava tubers remain high due to fuel and labor expenses.',
      xai_explanation: {
        base_market_trend: 1.5,
        top_driving_features: [
          {
            feature: 'Processing_Energy_Cost',
            current_value: 5.0,
            impact_percentage: 1.2,
            direction: 'increase'
          },
          {
            feature: 'Cassava_Supply_Tightening',
            current_value: 1.2,
            impact_percentage: 1.0,
            direction: 'increase'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 0.5,
            direction: 'increase'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Garri is stable year-round but shows minor price increases during planting season when farmers reduce harvesting frequency.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: 4.0,
        actual_change_percent: 3.8,
        summary: 'We predicted a 4.0% rise, prices rose 3.8%. Our model successfully accounted for the processing fuel inflation.'
      }
    }
  },
  {
    id: 'brown-beans',
    name: 'Brown Beans',
    category: 'LEGUMES',
    image: commodityImages['brown-beans'],
    vendor: 'Mile 12 Market, Lagos',
    changePct: -4.6,
    todayPrice: 2_400,
    unit: 'per mudu',
    forecastPrice: 2_290,
    confidence: 'high',
    forecast: {
      predicted_price_change_percent: -4.6,
      forecast_horizon: '1_Month',
      summary: 'Brown Beans are expected to experience a 4.6% decrease as warehouse releases and grain stocks from northern silos satisfy current demand.',
      xai_explanation: {
        base_market_trend: -6.2,
        top_driving_features: [
          {
            feature: 'Silo_Stock_Releases',
            current_value: 3.0,
            impact_percentage: -2.5,
            direction: 'decrease'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 1.2,
            direction: 'increase'
          },
          {
            feature: 'Exchange_Rate_Stability',
            current_value: 0.5,
            impact_percentage: -0.9,
            direction: 'decrease'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Beans prices stabilize after the main dry-season harvest in the north, showing moderate price relief until the hunger gap begins.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: -5.0,
        actual_change_percent: -4.8,
        summary: 'Our predicted 5% drop was matched by a 4.8% drop, validating our estimates of storage releases.'
      }
    }
  },
  {
    id: 'onions',
    name: 'Onions',
    category: 'VEGETABLES',
    image: commodityImages.onions,
    vendor: 'Mile 12 Market, Lagos',
    changePct: 15.7,
    todayPrice: 95_000,
    unit: 'per bag',
    forecastPrice: 109_915,
    confidence: 'low',
    forecast: {
      predicted_price_change_percent: 15.7,
      forecast_horizon: '1_Month',
      summary: 'Onion prices are expected to jump significantly by 15.7% due to seasonal off-season scarcity and decay losses in traditional storage structures.',
      xai_explanation: {
        base_market_trend: 12.5,
        top_driving_features: [
          {
            feature: 'Storage_Decay_Losses',
            current_value: 4.0,
            impact_percentage: 4.2,
            direction: 'increase'
          },
          {
            feature: 'Fuel_Price_Increase',
            current_value: 850,
            impact_percentage: 2.0,
            direction: 'increase'
          },
          {
            feature: 'General_Inflation_Rate',
            current_value: 33.2,
            impact_percentage: 1.0,
            direction: 'increase'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Onions are highly seasonal. Prices soar during the rainy season (July-November) because wet weather causes high storage spoilage.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: 12.0,
        actual_change_percent: 13.5,
        summary: 'We predicted a 12.0% rise, prices rose 13.5%. The model correctly anticipated high storage spoilage rates.'
      }
    }
  },
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'PROTEIN',
    image: commodityImages.eggs,
    vendor: 'Agege Market, Lagos',
    changePct: 1.8,
    todayPrice: 5_800,
    unit: 'per crate',
    forecastPrice: 5_904,
    confidence: 'high',
    forecast: {
      predicted_price_change_percent: 1.8,
      forecast_horizon: '1_Month',
      summary: 'Egg prices will remain relatively stable, climbing just 1.8% as high poultry feed costs are offset by steady production rates.',
      xai_explanation: {
        base_market_trend: 0.5,
        top_driving_features: [
          {
            feature: 'Poultry_Feed_Cost',
            current_value: 1.2,
            impact_percentage: 1.5,
            direction: 'increase'
          },
          {
            feature: 'Distribution_Logistics',
            current_value: 1.1,
            impact_percentage: 0.8,
            direction: 'increase'
          },
          {
            feature: 'Consumer_Demand_Shift',
            current_value: -0.5,
            impact_percentage: -1.0,
            direction: 'decrease'
          }
        ]
      },
      seasonality: {
        is_normal: true,
        description: 'Eggs have very low seasonal variation, but prices are heavily tied to raw poultry feed ingredient imports like maize and soy.'
      },
      track_record: {
        issued_date: '1 April 2026',
        predicted_change_percent: 2.0,
        actual_change_percent: 2.2,
        summary: 'Predicted 2.0% increase, actual increase 2.2%. Stable production matched our forecast guidelines.'
      }
    }
  }
]

export { getCommodityImage }

export const marketStats: MarketSnapshotStats = {
  risingCount: commodities.filter((c) => c.changePct >= 0).length,
  fallingCount: commodities.filter((c) => c.changePct < 0).length,
  avgChangePct: 3.1,
}
