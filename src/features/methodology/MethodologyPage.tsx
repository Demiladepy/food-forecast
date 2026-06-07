import {
  BarChart3,
  BookOpen,
  Database,
  Heart,
  Lock,
  Quote,
  RefreshCw,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'
import { GuestChip, PageHeader, SectionLabel } from '../../components'
import {
  audienceCards,
  audienceFooter,
  dataSources,
  forecastSteps,
  methodologyFooter,
  methodologyIntro,
  testimonials,
  trackRecordStats,
  trustPoints,
  whyWeBuiltClosing,
  whyWeBuiltParagraphs,
} from '../../data/methodology'
import { cn } from '../../lib/utils'

const stepIcons = {
  collect: BarChart3,
  model: Sparkles,
  explain: BookOpen,
} as const

const sourceIcons = {
  updated: RefreshCw,
  auditable: Lock,
  independent: Shield,
} as const

export function MethodologyPage() {
  return (
    <div className="flex flex-col gap-10 pb-8">
      <PageHeader
        title="Welcome to Food Forecast"
        action={<GuestChip />}
      />

      <section className="flex flex-col gap-4">
        <SectionLabel>How the forecast works</SectionLabel>
        <h2 className="font-display max-w-3xl text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Built so a market trader, a student, and a mother can all{' '}
          <span className="text-brand-green">trust the same number.</span>
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-muted">{methodologyIntro}</p>
      </section>

      <section className="rounded-card border border-border bg-surface p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Heart className="size-5 text-brand-green" aria-hidden />
          <h2 className="text-lg font-bold text-foreground">Why we built this</h2>
        </div>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
          {whyWeBuiltParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="font-bold text-foreground">{whyWeBuiltClosing}</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          How the forecast works
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {forecastSteps.map((step) => {
            const Icon = stepIcons[step.id]
            return (
              <article
                key={step.id}
                className="rounded-card border border-border bg-surface p-5"
              >
                <Icon className="size-5 text-brand-green" aria-hidden />
                <h3 className="mt-4 font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-card border border-border bg-surface p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-brand-green" aria-hidden />
          <h2 className="text-lg font-bold text-foreground">How we earn your trust</h2>
        </div>
        <ul className="mt-5 space-y-4">
          {trustPoints.map((point) => (
            <li key={point.lead} className="text-sm leading-relaxed text-muted">
              <span className="font-bold text-foreground">{point.lead}</span>{' '}
              {point.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-hero bg-brand-green p-6 text-white md:p-8">
        <div className="flex items-center gap-2">
          <Users className="size-5" aria-hidden />
          <h2 className="text-lg font-bold">Who this is for</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-card bg-white/10 p-5 backdrop-blur-sm"
            >
              <h3 className="font-bold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{card.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/90">
          {audienceFooter}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Voices from the market
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-card border border-border bg-surface p-5"
            >
              <Quote className="size-6 text-brand-green" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-muted">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-foreground">{item.name}</p>
              <p className="text-xs text-muted">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Database className="size-5 text-brand-green" aria-hidden />
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Where the numbers come from
          </h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {dataSources.map((source) => {
            const Icon = sourceIcons[source.id]
            return (
              <article
                key={source.id}
                className="rounded-card border border-border bg-surface p-5"
              >
                <Icon className="size-5 text-brand-green" aria-hidden />
                <h3 className="mt-4 font-bold text-foreground">{source.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{source.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section>
        <p className="text-xs font-bold tracking-widest text-muted uppercase">
          Our track record
        </p>
        <div className="mt-4 rounded-card border border-border bg-surface p-6 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trackRecordStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={cn('pt-2 text-center text-sm text-brand-green')}>
        {methodologyFooter}
      </footer>
    </div>
  )
}
