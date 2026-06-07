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
        <div className="flex items-center gap-3 px-5 pb-2 pt-7">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-brand bg-brand-green text-white shadow-sm">
            <Sprout className="size-5" strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight text-foreground">Food Forecast</p>
            <p className="text-[11px] leading-tight text-muted">Built for Nigerian markets</p>
          </div>
        </div>

        <p className="px-5 pb-2 pt-4 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
          Navigate
        </p>

        <nav className="flex flex-col gap-0.5 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-pill px-3.5 py-2.5 text-[13px] font-semibold transition-colors',
                  isActive
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-foreground hover:bg-surface',
                )
              }
            >
              {() => (
                <>
                  <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="leading-snug">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4 pt-6">
          <div className="rounded-card border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-3.5 text-brand-green" strokeWidth={2} aria-hidden />
              <p className="text-xs font-bold text-foreground">Live Data</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              Last synced 2 hours ago from 47 monitored markets
            </p>
            <p className="mt-2.5 text-[11px] leading-relaxed text-muted">
              Free, non-commercial. Built for social good — we forecast, we don&apos;t trade.
            </p>
          </div>
        </div>
      </aside>

      <div className="ml-sidebar min-h-screen flex-1 overflow-y-auto bg-background">
        <main className="mx-auto max-w-6xl px-8 py-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
