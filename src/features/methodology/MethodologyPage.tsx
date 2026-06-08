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
import { GuestChip, IconSectionHeader, PageHeader, SectionLabel } from '../../components'
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
    <div className="page-stack pb-4">
      <PageHeader title="Welcome to Food Forecast" action={<GuestChip compact />} />

      <section className="space-y-3 sm:space-y-4">
        <SectionLabel>How the forecast works</SectionLabel>
        <h2 className="font-display text-[1.45rem] leading-[1.18] tracking-tight text-foreground sm:text-[1.85rem] md:text-[2.35rem]">
          Built so a market trader, a student, and a mother can all{' '}
          <span className="text-brand-green">trust the same number.</span>
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-[15px]">
          {methodologyIntro}
        </p>
      </section>

      <section className="rounded-card border border-border bg-surface-soft p-5 sm:p-6 md:p-8">
        <IconSectionHeader icon={Heart} title="Why we built this" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:mt-5">
          {whyWeBuiltParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="pt-1 text-sm font-bold text-foreground">{whyWeBuiltClosing}</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          How the forecast works
        </h2>
        <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {forecastSteps.map((step) => {
            const Icon = stepIcons[step.id]
            return (
              <article
                key={step.id}
                className="rounded-card border border-border bg-surface p-4 shadow-sm sm:p-5"
              >
                <div className="flex size-9 items-center justify-center rounded-brand bg-accent-muted">
                  <Icon className="size-[18px] text-brand-green" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mt-4 text-sm font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-card border border-border bg-surface-soft p-5 sm:p-6 md:p-8">
        <IconSectionHeader icon={Shield} title="How we earn your trust" />
        <ul className="mt-4 space-y-4 sm:mt-5">
          {trustPoints.map((point) => (
            <li key={point.lead} className="text-sm leading-relaxed text-muted">
              <span className="font-bold text-foreground">{point.lead}</span>{' '}
              {point.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-card bg-brand-green p-5 text-white shadow-sm sm:rounded-hero sm:p-6 md:p-8">
        <div className="flex items-center gap-2.5">
          <Users className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
          <h2 className="text-base font-bold">Who this is for</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:mt-5 md:grid-cols-3">
          {audienceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-card border border-white/10 bg-white/10 p-4 backdrop-blur-sm sm:p-5"
            >
              <h3 className="text-sm font-bold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{card.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/90 sm:mt-6">
          {audienceFooter}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Voices from the market
        </h2>
        <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex h-full flex-col rounded-card border border-border bg-surface p-4 shadow-sm sm:p-5"
            >
              <Quote className="size-5 text-brand-green" strokeWidth={2} aria-hidden />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &quot;{item.quote}&quot;
              </p>
              <div className="mt-4 sm:mt-5">
                <p className="text-sm font-bold text-foreground">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <IconSectionHeader
          icon={Database}
          title="Where the numbers come from"
          titleClassName="text-base sm:text-lg"
        />
        <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {dataSources.map((source) => {
            const Icon = sourceIcons[source.id]
            return (
              <article
                key={source.id}
                className="rounded-card border border-border bg-surface p-4 shadow-sm sm:p-5"
              >
                <div className="flex size-9 items-center justify-center rounded-brand bg-accent-muted">
                  <Icon className="size-[18px] text-brand-green" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mt-4 text-sm font-bold text-foreground">{source.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{source.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section>
        <p className="text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
          Our track record
        </p>
        <div className="mt-3 rounded-card border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
            {trackRecordStats.map((stat) => (
              <div key={stat.label} className="min-w-0 lg:px-6 lg:first:pl-0">
                <p className="text-2xl font-bold leading-none tracking-tight text-foreground sm:text-[1.75rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-2 pt-2 text-center text-xs leading-relaxed text-brand-green sm:text-sm">
        {methodologyFooter}
      </footer>
    </div>
  )
}
