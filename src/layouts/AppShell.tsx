import { BarChart3, HelpCircle, Home, RefreshCw, Sprout } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../lib/utils'

interface NavItem {
  to: string
  label: string
  icon: typeof Home
  end?: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/commodities', label: 'Commodities', icon: BarChart3 },
  { to: '/how-it-works', label: 'How the forecast works', icon: HelpCircle },
]

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className="fixed inset-y-0 left-0 z-10 flex w-sidebar flex-col border-r border-border bg-background"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3 px-5 py-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-brand bg-brand-green text-white">
            <Sprout className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">Food Forecast</p>
            <p className="text-xs text-muted">Built for Nigerian markets</p>
          </div>
        </div>

        <p className="px-5 pb-2 text-[10px] font-semibold tracking-widest text-muted uppercase">
          Navigate
        </p>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-pill px-3 py-2.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-brand-green text-white'
                    : 'text-foreground hover:bg-surface',
                )
              }
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="leading-snug">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-card border border-border bg-surface p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-3.5 text-brand-green" aria-hidden />
              <p className="text-xs font-bold text-foreground">Live Data</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Last synced 2 hours ago from 47 monitored markets
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Free, non-commercial. Built for social good — we forecast, we don&apos;t trade.
            </p>
          </div>
        </div>
      </aside>

      <div className="ml-sidebar min-h-screen flex-1 overflow-y-auto bg-background">
        <main className="mx-auto max-w-6xl px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
