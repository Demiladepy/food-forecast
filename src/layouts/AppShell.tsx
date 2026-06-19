import {
  BarChart3,
  HelpCircle,
  Home,
  Menu,
  RefreshCw,
  Sprout,
  X,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { commodities as mockCommodities } from '../data/commodities'
import { getCommodityImage } from '../data/images'
import { getAllFoods } from '../api/index'
import type { Commodity } from '../data/types'
import { getCommodityCategory } from '../utils/categories'


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
  { to: '/admin', label: 'Admin Console', icon: ShieldCheck },
]

interface SidebarContentProps {
  onNavigate?: () => void
  className?: string
}

function SidebarContent({ onNavigate, className }: SidebarContentProps) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center gap-3 px-5 pb-2 pt-7 lg:pt-7">
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
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center gap-2.5 rounded-pill px-3.5 py-2.5 text-[13px] font-semibold transition-colors',
                isActive
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-foreground hover:bg-surface active:bg-surface',
              )
            }
          >
            <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            <span className="leading-snug">{label}</span>
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
              Free, non-commercial. Built for social good. We forecast, we don&apos;t trade.
          </p>
        </div>
      </div>
    </div>
  )
}

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()
  const [commoditiesList, setCommoditiesList] = useState<Commodity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const toTitleCase = (str: string) => {
      return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/\(imported\)/gi, '(Imported)')
        .replace(/\(boneless\)/gi, '(Boneless)')
        .replace(/\(bone-in\)/gi, '(Bone-in)')
        .replace(/\(dozen\)/gi, '(Dozen)')
        .replace(/\(smoked\)/gi, '(Smoked)')
        .replace(/\(agric\)/gi, '(Agric)')
        .replace(/\(local\)/gi, '(Local)')
        .replace(/\(ofada\)/gi, '(Ofada)')
        .replace(/\(medium grained\)/gi, '(Medium Grained)');
    };

    getAllFoods()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => {
            const mockItem = mockCommodities.find((c) => c.id === item.id) as any || {}
            const anyItem = item as any
            const rawName = item.name || mockItem.name || '';
              return {
                ...mockItem,
                ...item,
                name: toTitleCase(rawName),
                image: getCommodityImage(item.id),
                todayPrice: anyItem.todayPrice || mockItem.todayPrice || 0,
                changePct: anyItem.changePct || mockItem.changePct || 0,
                forecastPrice: anyItem.forecastPrice || mockItem.forecastPrice || 0,
                vendor: anyItem.vendor || mockItem.vendor || '',
                category: getCommodityCategory(item.id),
                unit: item.category || item.quantity || (mockItem as any).unit || 'unit',
              }
          })
          setCommoditiesList(mapped as any)
        } else {
          throw new Error("Empty or invalid food list from backend")
        }
      })
      .catch((err) => {
        console.error("Failed to load commodities from backend, using fallback mock data:", err)
        // Optionally fall back to mockCommodities if server is dead
        setCommoditiesList(mockCommodities.map(item => ({
          ...item,
          name: toTitleCase(item.name)
        })) as any)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  return (
    <div className="flex min-h-screen min-h-[100dvh] bg-background">
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-sidebar flex-col border-r border-border bg-background lg:flex"
        aria-label="Main navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          mobileNavOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          className={cn(
            'absolute inset-0 bg-brand-dark/40 transition-opacity duration-300',
            mobileNavOpen ? 'opacity-100' : 'opacity-0',
          )}
          aria-label="Close navigation menu"
          onClick={() => setMobileNavOpen(false)}
        />
        <aside
          className={cn(
            'absolute inset-y-0 left-0 flex w-[min(100%,18.5rem)] flex-col border-r border-border bg-background shadow-elevated transition-transform duration-300 ease-out',
            'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-end px-4 pt-3 lg:hidden">
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full text-foreground active:bg-surface"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <SidebarContent onNavigate={() => setMobileNavOpen(false)} className="-mt-2" />
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-sidebar">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden pt-[max(0.75rem,env(safe-area-inset-top))]">
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-foreground active:bg-surface"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-5" strokeWidth={2} aria-hidden />
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-brand bg-brand-green text-white">
              <Sprout className="size-4" strokeWidth={2} aria-hidden />
            </span>
            <p className="truncate text-sm font-bold text-foreground">Food Forecast</p>
          </div>
          <div className="size-11 shrink-0" aria-hidden />
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-background">
          <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Outlet context={{ commodities: commoditiesList, isLoading }} />
          </main>
        </div>
      </div>
    </div>
  )
}
