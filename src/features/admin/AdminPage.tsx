import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ArrowLeft, Database, Lock, LogOut, ShieldCheck, ThumbsDown, ThumbsUp, User } from 'lucide-react'
import { PageHeader, SearchBar, StatCard } from '../../components'
import { getAdminStats } from '../../api/index'
import { cn } from '../../lib/utils'

// Predefined fallback mock stats if the backend is not running yet
const FALLBACK_ADMIN_STATS: AdminStatsResponse = {
  total_views: 1842,
  helpful_count: 384,
  unhelpful_count: 52,
  model_version: 'v1.0.4-catboost-uncertainty-V1',
  last_sync_time: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
  commodity_stats: [
    { commodity_id: 'tomato-tomato', name: 'Tomatoes', views: 420, helpful: 95, unhelpful: 8 },
    { commodity_id: 'rice-imported', name: 'Rice (Imported)', views: 382, helpful: 84, unhelpful: 12 },
    { commodity_id: 'yam-tuber', name: 'Yam', views: 294, helpful: 62, unhelpful: 6 },
    { commodity_id: 'garri-white', name: 'White Garri', views: 245, helpful: 48, unhelpful: 10 },
    { commodity_id: 'beans-brown', name: 'Brown Beans', views: 198, helpful: 35, unhelpful: 5 },
    { commodity_id: 'potato-sweet', name: 'Sweet Potato', views: 154, helpful: 29, unhelpful: 4 },
    { commodity_id: 'potato-irish', name: 'Irish Potato', views: 98, helpful: 18, unhelpful: 5 },
    { commodity_id: 'eggs-agric-12pcs', name: 'Agric Eggs (12pcs)', views: 51, helpful: 13, unhelpful: 2 },
  ],
}

export function AdminPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminStatsResponse>(FALLBACK_ADMIN_STATS)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAdmin') === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) return

    getAdminStats()
      .then((data) => {
        if (data && typeof data === 'object') {
          setStats(data)
        }
      })
      .catch((err) => {
        console.warn('Backend API admin stats unavailable. Using fallback preloaded metrics.', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true')
      window.dispatchEvent(new Event('storage'))
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Invalid credentials. Please use "admin" and "admin".')
    }
  }

  const handleLogoutSimulated = () => {
    localStorage.removeItem('isAdmin')
    window.dispatchEvent(new Event('storage'))
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    navigate('/')
  }

  // Calculate stats
  const totalFeedback = stats.helpful_count + stats.unhelpful_count
  const helpfulPercent = totalFeedback > 0 ? Math.round((stats.helpful_count / totalFeedback) * 100) : 100

  // Filter commodity stats
  const filteredCommodityStats = stats.commodity_stats.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.commodity_id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleString('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    } catch {
      return isoString
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-card border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-brand bg-brand-green/10 text-brand-green mb-4">
              <Lock className="size-6" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Admin Console Login</h1>
            <p className="mt-2 text-sm text-muted">
              Enter credentials below to access the Admin Console
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted">
                  <User className="size-4" />
                </span>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="flex min-h-11 w-full rounded-pill border border-border bg-transparent pl-10 pr-4 text-sm outline-none placeholder:text-muted/50 focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted">
                  <Lock className="size-4" />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex min-h-11 w-full rounded-pill border border-border bg-transparent pl-10 pr-4 text-sm outline-none placeholder:text-muted/50 focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs font-semibold text-danger bg-danger/5 rounded-pill px-3.5 py-2">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="flex min-h-11 w-full items-center justify-center rounded-pill bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover active:bg-brand-green-hover"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 rounded-card bg-surface-soft p-4 border border-border/50 text-center">
            <p className="text-xs text-muted">
              Demo Access: <span className="font-bold text-foreground">admin</span> / <span className="font-bold text-foreground">admin</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-stack pb-6">
      {/* Top utility row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-wider text-muted hover:text-foreground uppercase transition-colors"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2.5} /> Exit Admin View
        </button>

        <button
          type="button"
          onClick={handleLogoutSimulated}
          className="inline-flex w-fit items-center gap-2 rounded-pill border border-danger/25 bg-surface px-4 py-2 text-xs font-bold text-danger transition-colors hover:bg-danger/5 active:bg-danger/10"
        >
          <LogOut className="size-3.5" /> Log Out
        </button>
      </div>

      <PageHeader
        title="Admin Management Console"
        action={
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green">
            <ShieldCheck className="size-3.5" /> System Operator
          </span>
        }
      />

      {/* Overview Stats Grid */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard
          label="Total Page Clicks"
          value={loading ? '...' : stats.total_views.toLocaleString()}
          sublabel="total hits registered"
          icon={Activity}
          iconVariant="plain"
          iconClassName="text-foreground"
        />
        <StatCard
          label="Helpful Predictions"
          value={loading ? '...' : `${stats.helpful_count} / ${totalFeedback}`}
          sublabel={`overall rating: ${helpfulPercent}% positive`}
          icon={ThumbsUp}
          iconVariant="plain"
          iconClassName="text-brand-green"
        />
        <StatCard
          label="System Health"
          value={loading ? '...' : stats.model_version.split('-')[0].toUpperCase()}
          sublabel={`last model refresh: ${loading ? '...' : formatDateTime(stats.last_sync_time)}`}
          icon={Database}
          iconVariant="boxed"
          iconClassName="text-brand-green"
          iconBgClassName="bg-accent-muted"
        />
      </section>

      {/* Main Stats table */}
      <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Commodity Performance</h2>
            <p className="mt-1 text-sm text-muted">
              Monitoring views and feedback metrics across popular items.
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter by name..."
              className="shadow-sm! border border-border!"
              hideButton
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-left text-sm text-foreground">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold tracking-wider text-muted uppercase">
                <th className="pb-3 pr-4">Commodity</th>
                <th className="pb-3 px-4 text-right">Views</th>
                <th className="pb-3 px-4 text-right">Useful</th>
                <th className="pb-3 px-4 text-right">Not Useful</th>
                <th className="pb-3 pl-4 text-right">Approval Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommodityStats.map((item) => {
                const totalFeed = item.helpful + item.unhelpful
                const percent = totalFeed > 0 ? Math.round((item.helpful / totalFeed) * 100) : null
                
                return (
                  <tr key={item.commodity_id} className="border-b border-border/50 hover:bg-surface-soft/40 transition-colors">
                    <td className="py-3.5 pr-4">
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="mt-0.5 text-xs text-muted font-mono">{item.commodity_id}</p>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium">{item.views}</td>
                    <td className="py-3.5 px-4 text-right text-brand-green font-medium">
                      <ThumbsUp className="inline size-3.5 mr-1 align-text-bottom" />
                      {item.helpful}
                    </td>
                    <td className="py-3.5 px-4 text-right text-danger font-medium">
                      <ThumbsDown className="inline size-3.5 mr-1 align-text-bottom" />
                      {item.unhelpful}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      {percent !== null ? (
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-bold',
                            percent >= 80
                              ? 'bg-confidence-high/10 text-brand-green'
                              : percent >= 50
                              ? 'bg-amber/10 text-amber'
                              : 'bg-danger/10 text-danger'
                          )}
                        >
                          {percent}%
                        </span>
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
              {filteredCommodityStats.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted">
                    No matching commodities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
