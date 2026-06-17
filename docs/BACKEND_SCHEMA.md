# Food Forecast API Specifications — V1

This document outlines the API endpoints, request/response formats, and data schemas expected from the backend team for the **Food Forecast (V1)** integration.

---

## 1. Get All Commodities
Loads all monitored commodities immediately on app initialization. The frontend uses this list to populate the dashboard and cards. The list should come pre-sorted by popularity (or view count).

* **Method/URL:** `GET /api/foods`
* **Response Status:** `200 OK`
* **Response Schema (`ApiResponse<Commodity[]>`):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "tomatoes",
        "name": "Tomatoes",
        "category": "VEGETABLES", // Enum: VEGETABLES, GRAINS, TUBERS, LEGUMES, PROTEIN
        "image": "/images/tomatoes.webp",
        "vendor": "Mile 12 Market, Lagos",
        "changePct": 8.5,
        "todayPrice": 40000,
        "unit": "per basket",
        "forecastPrice": 43400
      },
      {
        "id": "rice-imported",
        "name": "Rice (Imported)",
        "category": "GRAINS",
        "image": "/images/rice-imported.webp",
        "vendor": "Daleko Market, Lagos",
        "changePct": -3.1,
        "todayPrice": 78500,
        "unit": "per 50kg bag",
        "forecastPrice": 76852
      }
    ]
  }
  ```

---

## 2. Get Commodity Details & Prediction
Fetches the detailed price analysis, prediction model metrics, and XAI explanations for a single commodity.

* **Method/URL:** `POST /api/predict`
* **Request Body Schema (`PredictFoodSchema`):**
  ```json
  {
    "commodity_id": "tomato-tomato",
    "state": "Lagos",
    "month_num": 1
  }
  ```
* **Response Status:** `200 OK`
* **Response Schema (`ApiResponse<PredictFoodPriceResponse>`):**
  ```json
  {
    "success": true,
    "data": {
      "status": "success",
      "commodity_id": "tomato-tomato",
      "request_echo": {
        "commodity_id": "tomato-tomato",
        "state": "Lagos"
      },
      "forecast_horizon": "1_Month",
      "predicted_price_change_percent": 8.5,
      "xai_explanation": {
        "base_market_trend": 10.21,
        "top_driving_features": [
          {
            "feature": "Off_Season_Tightening",
            "current_value": 1.0,
            "impact_percentage": 5.25,
            "direction": "increase"
          },
          {
            "feature": "General_Inflation_Rate",
            "current_value": 33.2,
            "impact_percentage": 2.86,
            "direction": "increase"
          },
          {
            "feature": "Food_Inflation_Delta_1M",
            "current_value": 1.2,
            "impact_percentage": -1.5,
            "direction": "decrease"
          }
        ]
      }
    }
  }
  ```

---

## 3. Record Popularity (Click Tracking)
Fires a background event update whenever a commodity card is clicked or a detail page is accessed. This allows the backend to dynamically compute and update popularity scores.

* **Method/URL:** `POST /api/foods/:id/click`
* **URL Parameter:** `id` (e.g. `tomatoes`)
* **Request Body:** Empty
* **Response Status:** `200 OK` / `204 No Content`
* **Response Schema:**
  ```json
  {
    "success": true,
    "message": "Click recorded successfully"
  }
  ```

---

## 4. Omissions in V1
* **Confidence Badges:** The V1 UI has completely hidden all confidence rating badges (High/Medium/Low) for visual metrics.
* **Seasonality Cards:** The seasonality details box (`Is this normal for the season?`) is disabled/commented out in the V1 UI.
* **Track Record Cards:** The track record comparison layout (`How we did last time`) is hidden for V1 as this data model is not yet finalized on the backend.

---

## 5. Supported Commodity IDs
The AI prediction engine accepts a case-insensitive `commodity_id` parameter. Here is the reference table of all 31 supported IDs, their mapped entities, and units:

### Standard NBS/Audit Mappings (31 Items)
For standard querying of official National Bureau of Statistics (NBS) commodities:

| `commodity_id` | Food Item | Item Type | Category |
| :--- | :--- | :--- | :--- |
| `beans-brown` | beans | brown | 1000 g |
| `beans-white-black-eye` | beans | white black eye | 1000 g |
| `beef-bone-in` | beef | bone in | 1000 g |
| `beef-boneless` | beef | boneless | 1000 g |
| `bread-sliced` | bread | sliced | 1 loaf |
| `bread-unsliced` | bread | unsliced | 1 loaf |
| `chicken-feet` | chicken | feet | 1000 g |
| `chicken-frozen` | chicken | frozen | 1 unit |
| `chicken-wings` | chicken | wings | 1000 g |
| `eggs-agric-1pcs` | eggs | agric | 1 pcs |
| `eggs-agric-12pcs` | eggs | agric | 12 pcs |
| `fish-catfish-smoked` | fish | catfish smoked | 1000 g |
| `fish-fish` | fish | fish | 1000 g |
| `fish-mudfish` | fish | mudfish | 1000 g |
| `garri-white` | garri | white | 1000 g |
| `garri-yellow` | garri | yellow | 1000 g |
| `milk-evaporated-tin` | milk | evaporated tin | 1 unit |
| `oil-groundnut` | oil | groundnut | 1000 ml |
| `oil-palm` | oil | palm | 1000 ml |
| `oil-vegetable` | oil | vegetable | 1000 ml |
| `potato-irish` | potato | irish | 1000 g |
| `potato-sweet` | potato | sweet | 1000 g |
| `rice-agric` | rice | agric | 1000 g |
| `rice-imported` | rice | imported | 1000 g |
| `rice-local` | rice | local | 1000 g |
| `rice-medium-grained` | rice | medium grained | 1000 g |
| `rice-ofada` | rice | ofada | 1000 g |
| `tomato-tomato` | tomato | tomato | 1000 g |
| `yam-tuber` | yam | tuber | 1000 g |

