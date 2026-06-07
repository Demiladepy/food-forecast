import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './features/home/HomePage'
import { MethodologyPage } from './features/methodology/MethodologyPage'
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
        path: 'how-it-works',
        element: <MethodologyPage />,
      },
    ],
  },
])
