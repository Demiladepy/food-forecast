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
    "name": "Tomatoes",
    "type": "vegetable",
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
      "price_change": 8.5,
      "summary": {
        "text": "Tomatoes are likely to climb about 8.5% over the next month as off-season tightening limits supply from the north.",
        "confidence": "high" // "high" | "moderate" | "low" (optional/ignored in V1 UI but matches API contract)
      },
      "factors": [
        {
          "name": "Off_Season_Tightening",
          "change": 5.25,
          "reason": "increase" // "increase" | "decrease"
        },
        {
          "name": "General_Inflation_Rate",
          "change": 2.86,
          "reason": "increase"
        },
        {
          "name": "Food_Inflation_Delta_1M",
          "change": -1.5,
          "reason": "decrease"
        }
      ],
      "season_remark": "Tomatoes typically rise between April and July when northern dry-season harvests run out."
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
