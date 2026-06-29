import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ArrowLeft, Database, Lock, LogOut, ShieldCheck, ThumbsDown, ThumbsUp, MessageSquare } from 'lucide-react'
import { PageHeader, SearchBar, StatCard } from '../../components'
import { getAdminStats } from '../../api/index'
import { cn } from '../../lib/utils'

export function AdminPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminStatsResponse | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(localStorage.getItem('isAdmin') === 'true')
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'commodities' | 'feedback'>('commodities')

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAdmin') === 'true')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) return

    setLoading(true)
    setError(null)
    getAdminStats()
      .then((data) => {
        if (data && typeof data === 'object') {
          setStats(data)
        } else {
          setError('Invalid API response format received.')
        }
      })
      .catch((err) => {
        console.error('Failed to load admin stats', err)
        setError('Unable to fetch admin statistics from the backend server.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setLoading(true)

    // Temporarily set apiKey to password entered so Axios request interceptor uses it
    localStorage.setItem('adminApiKey', password)

    try {
      const data = await getAdminStats()
      if (data && typeof data === 'object') {
        localStorage.setItem('isAdmin', 'true')
        window.dispatchEvent(new Event('storage'))
        setStats(data)
        setIsAuthenticated(true)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      localStorage.removeItem('adminApiKey')
      localStorage.removeItem('isAdmin')
      setAuthError('Authentication failed. Invalid Admin Key.')
      console.error('Admin login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminApiKey')
    window.dispatchEvent(new Event('storage'))
    setIsAuthenticated(false)
    setPassword('')
    setStats(null)
    setError(null)
    navigate('/')
  }

  // Calculate stats
  const totalFeedback = stats ? stats.helpful_count + stats.unhelpful_count : 0
  const helpfulPercent = stats && totalFeedback > 0 ? Math.round((stats.helpful_count / totalFeedback) * 100) : 100

  // Filter commodity stats
  const filteredCommodityStats = stats
    ? stats.commodity_stats.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.commodity_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

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
              Enter your Admin Key below to access the management console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                Admin Key
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted">
                  <Lock className="size-4" />
                </span>
                <input
                  id="apiKey"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Admin Key..."
                  disabled={loading}
                  className="flex min-h-11 w-full rounded-pill border border-border bg-transparent pl-10 pr-4 text-sm outline-none placeholder:text-muted/50 focus:border-brand-green transition-colors disabled:opacity-50"
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
              disabled={loading}
              className="flex min-h-11 w-full items-center justify-center rounded-pill bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover active:bg-brand-green-hover disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
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
          onClick={handleLogout}
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

      {loading && !stats && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm font-medium text-muted">Retrieving system telemetry...</p>
        </div>
      )}

      {error && !stats && (
        <div className="rounded-card border border-danger/20 bg-danger/5 p-6 text-center">
          <p className="text-sm font-semibold text-danger">{error}</p>
          <button
            type="button"
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem('adminApiKey')
              localStorage.removeItem('isAdmin')
            }}
            className="mt-4 inline-flex rounded-pill bg-danger px-4 py-2 text-xs font-semibold text-white hover:bg-danger-hover transition-colors"
          >
            Reset Session & Login Again
          </button>
        </div>
      )}

      {stats && (
        <>
          {/* Overview Stats Grid */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 animate-stagger-1">
            <StatCard
              label="Total Page Clicks"
              value={stats.total_views.toLocaleString()}
              sublabel="total hits registered"
              icon={Activity}
              iconVariant="plain"
              iconClassName="text-foreground"
            />
            <StatCard
              label="Helpful Predictions"
              value={`${stats.helpful_count} / ${totalFeedback}`}
              sublabel={`overall rating: ${helpfulPercent}% positive`}
              icon={ThumbsUp}
              iconVariant="plain"
              iconClassName="text-brand-green"
            />
            <StatCard
              label="User Suggestions"
              value={stats.suggestions ? stats.suggestions.length.toString() : '0'}
              sublabel="custom feedback messages"
              icon={MessageSquare}
              iconVariant="plain"
              iconClassName="text-foreground"
            />
            <StatCard
              label="System Health"
              value={stats.model_version.split('-')[0].toUpperCase()}
              sublabel={`last model refresh: ${formatDateTime(stats.last_sync_time)}`}
              icon={Database}
              iconVariant="boxed"
              iconClassName="text-brand-green"
              iconBgClassName="bg-accent-muted"
            />
          </section>

          {/* Tabs Navigation */}
          <div className="flex border-b border-border mt-6 mb-6 animate-stagger-2">
            <button
              type="button"
              onClick={() => setActiveTab('commodities')}
              className={cn(
                'px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all cursor-pointer',
                activeTab === 'commodities'
                  ? 'border-brand-green text-brand-green'
                  : 'border-transparent text-muted hover:text-foreground'
              )}
            >
              Commodity Metrics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('feedback')}
              className={cn(
                'px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all cursor-pointer',
                activeTab === 'feedback'
                  ? 'border-brand-green text-brand-green'
                  : 'border-transparent text-muted hover:text-foreground'
              )}
            >
              User Suggestions ({stats.suggestions ? stats.suggestions.length : 0})
            </button>
          </div>

          {activeTab === 'commodities' ? (
            /* Main Stats table */
            <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8 animate-stagger-3">
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
          ) : (
            /* User Suggestions Section */
            <section className="rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8 animate-stagger-3">
              <div className="mb-6">
                <h2 className="text-lg font-bold tracking-tight text-foreground">User Suggestions & Support Feedback</h2>
                <p className="mt-1 text-sm text-muted">
                  Viewing messages, suggestions, and support queries sent by users.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left text-sm text-foreground">
                  <thead>
                    <tr className="border-b border-border text-[11px] font-bold tracking-wider text-muted uppercase">
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3 px-4">Helpful?</th>
                      <th className="pb-3 pl-4">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.suggestions && stats.suggestions.length > 0 ? (
                      stats.suggestions.map((suggestion) => (
                        <tr key={suggestion.id} className="border-b border-border/50 hover:bg-surface-soft/40 transition-colors">
                          <td className="py-3.5 pr-4 whitespace-nowrap text-muted text-xs">
                            {formatDateTime(suggestion.created_at)}
                          </td>
                          <td className="py-3.5 px-4">
                            {suggestion.sentiment ? (
                              <span
                                className={cn(
                                  'inline-flex items-center rounded-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                                  suggestion.sentiment === 'just_right'
                                    ? 'bg-confidence-high/10 text-brand-green'
                                    : suggestion.sentiment === 'too_high'
                                    ? 'bg-amber/10 text-amber'
                                    : 'bg-danger/10 text-danger'
                                )}
                              >
                                {suggestion.sentiment === 'just_right' ? '👍 Yes' :
                                 suggestion.sentiment === 'too_high' ? '😐 Somewhat' : '👎 No'}
                              </span>
                            ) : (
                              <span className="text-muted/65">—</span>
                            )}
                          </td>
                          <td className="py-3.5 pl-4 text-xs leading-relaxed text-foreground max-w-sm break-words">
                            {suggestion.message}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-muted">
                          No user suggestions recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
