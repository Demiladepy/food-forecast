# Frontend Integration Guide — API Connection

This guide documents how the frontend agent or teammate should connect the UI components to the backend API services.

---

## 1. API Endpoints Reference
The API endpoints have been tested and verified. The frontend uses the Axios instances defined in `src/utils/axios.ts`. 

- **Target Public API Base URL**: `https://food-pricing-api.vercel.app/api/v1/`
- **Environment Variable**: Set `VITE_API_URL=https://food-pricing-api.vercel.app/api/v1/` in `FPP-Frontend/.env`.

---

## 2. API Method Checklist

| API Function (in `src/api/index.ts`) | HTTP Method & Path | Frontend Component / Page | Status |
| :--- | :--- | :--- | :--- |
| `getAllFoods()` | `GET /foods` | `AppShell.tsx` (loads all commodities) | Connected ✅ |
| `recordCommodityClick(id)` | `POST /foods/:id/click` | `CommodityDetailPage.tsx` (on view) | Connected ✅ |
| `logHelpfulnessFeedback(id, useful)` | `POST /foods/:id/feedback` | `CommodityDetailPage.tsx` (feedback buttons) | Connected ✅ |
| `predictFoodPrice(body)` | `POST /predict` | `CommodityDetailPage.tsx` (live XAI & forecasts) | **Needs Dynamic Integration** ⚠️ |
| `getAdminStats()` | `GET /admin/stats` | `AdminConsole.tsx` (admin dashboard) | **Needs Integration** ⚠️ |

---

## 3. Implementation Blueprint: Live Predictions on Detail Page

Currently, the [CommodityDetailPage.tsx](file:///C:/Users/Ebabhi%20Daniel/Websites/FPP-Frontend/src/features/commodities/CommodityDetailPage.tsx) reads static mock details from the layouts context. To show real CatBoost price forecasts and Gemini-powered explanations:

### Recommended Code Structure

Update `CommodityDetailPage.tsx` to fetch the prediction when the page loads:

```tsx
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { predictFoodPrice } from '../../api/index'
import type { PredictFoodPriceResponse } from '../../api.d.ts'

export function CommodityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [liveForecast, setLiveForecast] = useState<PredictFoodPriceResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    
    setIsLoading(true)
    predictFoodPrice({
      commodity_id: id,
      state: 'Lagos', // Can be made dynamic via a dropdown later
      month_num: new Date().getMonth() + 1
    })
      .then((data) => {
        setLiveForecast(data)
      })
      .catch((err) => {
        console.error("Failed to fetch live prediction:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  // Map forecast data to UI variables
  const forecastPercent = liveForecast 
    ? liveForecast.predicted_price_change_percent 
    : commodity.changePct // fallback to database price change
    
  const forecastPrice = liveForecast
    ? commodity.todayPrice * (1 + liveForecast.predicted_price_change_percent / 100)
    : commodity.forecastPrice

  const explanationText = liveForecast?.summary?.text 
    || liveForecast?.season_remark
    || `${commodity.name} is expected to shift by about ${Math.abs(forecastPercent).toFixed(1)}% over the next month.`

  const driversList = liveForecast?.xai_explanation?.top_driving_features || []
  
  // ... Render driversList, explanationText and forecastPrice in the JSX ...
}
```

---

## 4. Implementation Blueprint: Live Admin Dashboard Stats

The Admin page can render live platform usage charts and stats using `getAdminStats()`.

```tsx
import { useEffect, useState } from 'react'
import { getAdminStats } from '@/api/index'

export function AdminConsole() {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null)
  
  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(err => console.error("Failed to fetch admin stats:", err))
  }, [])

  // Render stats.total_views, stats.helpful_count, stats.unhelpful_count, etc.
}
```
