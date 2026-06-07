# Commodities page — build handoff

This document is for the teammate implementing **`/commodities`**. The Home and Methodology pages are already in place; follow the same patterns so the app stays visually and structurally consistent.

## Route & file location

| Item | Value |
|------|--------|
| **Route** | `/commodities` |
| **Nav label** | Commodities (sidebar, `BarChart3` icon) |
| **Create** | `src/features/commodities/CommoditiesPage.tsx` |
| **Register** | Add a child route in `src/routes.tsx` under `AppShell` |

Do **not** edit `src/features/methodology/` or `src/features/home/` unless coordinating a shared change.

## Page layout (from design)

The Commodities page is the **Home grid without the hero and stats row**.

Top to bottom:

1. **Page header** — reuse `PageHeader` + `GuestChip` from `src/components/` (same as Methodology).
   - Greeting: `Good morning`
   - Title: `Welcome to Food Forecast` (or `Commodities` if design updates — match Figma)
   - Top-right: notification bell + **Anonymous / Guest viewer** chip

2. **Section heading row**
   - Left: title + subtitle (e.g. “All commodities” / “Browse forecasts across monitored markets”)
   - Right: muted count — **`47 items`** in the design (use mock constant for now; wire to API later)

3. **Commodity grid**
   - Map `commodities` from `src/data/commodities.ts`
   - Render `CommodityCard` for each item
   - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
   - `onClick`: no-op or navigate to detail route when that screen exists

**Do not** include on this page:

- Hero banner / `SearchBar`
- Stats row (`StatCard` rising / falling / avg change)

## Data & types

- **List:** `import { commodities } from '../../data/commodities'`
- **Types:** `Commodity`, `Confidence`, etc. in `src/data/types.ts`
- **Images:** local paths in `src/data/images.ts` — use `getCommodityImage(id)` when adding new items
- **Money:** `formatNGN()` from `src/lib/formatters/money.ts` (already used inside `CommodityCard`)

Mock data currently has **8** home-page items; the UI label may show **47** as the full catalog size until the API lands. Keep the label as a separate constant if needed:

```ts
export const TOTAL_COMMODITY_COUNT = 47
```

## Components to reuse (do not rebuild)

| Component | Path | Use |
|-----------|------|-----|
| `CommodityCard` | `src/components/CommodityCard.tsx` | Main grid tile |
| `PageHeader` | `src/components/PageHeader.tsx` | Top greeting + title |
| `GuestChip` | `src/components/GuestChip.tsx` | Anonymous guest pill |
| `CategoryBadge`, `ChangeBadge`, `ConfidenceTag` | inside `CommodityCard` | Already composed |

Import shared UI from `src/components/index.ts` where possible.

## Design system rules

1. **Colors/spacing/radius** — only Tailwind utilities backed by tokens in `src/styles/theme.css` and `src/styles/tokens.css`.
   - Background: `bg-background` (cream `#F8F6F2`)
   - Cards: `bg-surface`, `border-border`, `rounded-card`
   - Primary actions / accents: `bg-brand-green`, `text-brand-green`
   - Muted copy: `text-muted`
   - Headings: `text-foreground`, bold / `font-display` for hero-style titles

2. **No hardcoded hex** in components.

3. **Icons:** `lucide-react`, thin stroke, `size-4`–`size-5`, brand green or foreground as in existing pages.

4. **App shell:** Already handled by `AppShell` — fixed 240px cream sidebar, main content `max-w-6xl mx-auto px-8 py-6`. Pages only render inside `<Outlet />`.

## TypeScript

- Strict mode — **no `any`**
- Function components with typed props
- Presentational components receive data via props; page fetches/maps from `src/data/` for now

## Reference implementations

- **Grid + cards:** `src/features/home/HomePage.tsx` (bottom “At-a-glance market” section)
- **Page header + guest chip:** `src/features/methodology/MethodologyPage.tsx`
- **Routing:** `src/routes.tsx`

## Suggested `routes.tsx` addition

```tsx
import { CommoditiesPage } from './features/commodities/CommoditiesPage'

// inside AppShell children:
{ path: 'commodities', element: <CommoditiesPage /> },
```

## Checklist before opening PR

- [ ] `/commodities` loads inside `AppShell` with active nav pill
- [ ] Grid matches Home card layout (responsive 1 / 2 / 3 columns)
- [ ] Guest chip + header align with Methodology page
- [ ] Item count label matches design copy
- [ ] `npm run build` passes with no TypeScript errors
- [ ] No new hardcoded colors; tokens only

## Out of scope (later prompts)

- Commodity **detail** page / 30-day chart
- Search / forecast submit behavior
- Replacing mock data with API
- White Garri & Brown Beans images (still placeholders in `src/data/images.ts`)

Questions about shared components or tokens — align with the Home/Methodology owner before changing `src/components/` or `src/styles/`.
