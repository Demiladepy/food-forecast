import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './features/home/HomePage'
import { MethodologyPage } from './features/methodology/MethodologyPage'
import { CommoditiesPage } from './features/commodities/CommoditiesPage'
import { CommodityDetailPage } from './features/commodities/CommodityDetailPage'
import { AppShell } from './layouts/AppShell'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'commodities',
        element: <CommoditiesPage />,
      },
      {
        path: 'commodities/:id',
        element: <CommodityDetailPage />,
      },
      {
        path: 'how-it-works',
        element: <MethodologyPage />,
      },
    ],
  },
])
