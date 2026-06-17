export interface MethodologyStep {
  id: 'collect' | 'model' | 'explain'
  title: string
  body: string
}

export interface TrustPoint {
  lead: string
  detail: string
}

export interface AudienceCard {
  title: string
  body: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface DataSourceItem {
  id: 'updated' | 'auditable' | 'independent'
  title: string
  body: string
}

export interface TrackRecordStat {
  value: string
  label: string
}

export const methodologyIntro =
  'Food prices in Nigeria move for reasons that feel invisible until they hit your pocket. Food Forecast turns daily wholesale data from real markets into a 1-month outlook you can plan around, with plain-language explanations for every move.'

export const whyWeBuiltParagraphs = [
  'When fuel, FX, and harvest cycles all pull in different directions, guessing what tomatoes or rice will cost next month is not a budgeting strategy. It is a gamble.',
  'We built this tool so households, small businesses, and anyone reporting on the economy can see the same transparent numbers, updated from markets people actually shop in.',
]

export const whyWeBuiltClosing =
  "We don't trade. We don't sell ads. We don't take commissions. We forecast."

export const forecastSteps: MethodologyStep[] = [
  {
    id: 'collect',
    title: 'We collect',
    body: 'Wholesale prices are gathered daily from 47 monitored markets across Nigeria, including Mile 12, Daleko, Oyingbo, Agege, and other major trading hubs in Lagos and beyond.',
  },
  {
    id: 'model',
    title: 'We model',
    body: 'A gradient-boosted model trained on six years of price history estimates where each commodity is likely to land over the next month.',
  },
  {
    id: 'explain',
    title: 'We explain',
    body: 'Every forecast is broken into human reasons: harvest cycles, diesel costs, FX pressure, security disruptions, and seasonal demand. You see why a number moved, not just that it did.',
  },
]

export const trustPoints: TrustPoint[] = [
  {
    lead: 'Every prediction is tracked.',
    detail:
      'We log what we predicted and what actually happened, so accuracy improves over time and past calls stay visible.',
  },
  {
    lead: 'Every forecast is explained.',
    detail:
      'Price moves are tied to real-world drivers you can verify, not a black box that only shows a percentage.',
  },
  {
    lead: 'No paywall, no ads, no trading.',
    detail:
      'Food Forecast is a non-commercial project built at NitHub, University of Lagos. It is free to use, with no commercial strings attached.',
  },
]

export const audienceCards: AudienceCard[] = [
  {
    title: 'Households',
    body: 'Plan your weekly market trip. Stock up before a spike, hold off before a drop.',
  },
  {
    title: 'Small food businesses',
    body: 'Restaurant owners and caterers who need to price menus one month out without guessing.',
  },
  {
    title: 'Journalists & researchers',
    body: 'A reliable, citable, free source of weekly Nigerian food price intelligence.',
  },
]

export const audienceFooter =
  'If a single family avoids one bad market trip a month because of what they read here, this project will have paid for itself a thousand times over.'

export const testimonials: Testimonial[] = [
  {
    quote:
      'I stopped buying tomatoes in bulk on the wrong week. The forecast told me to wait five days. I saved almost ₦4,000 on one basket.',
    name: 'Mrs. Adunni',
    role: 'Mother of three, Ikorodu',
  },
  {
    quote:
      'I price jollof platters weeks ahead for events. Food Forecast helps me quote clients without eating the margin when rice jumps.',
    name: 'Tunde',
    role: 'Caterer, Lekki',
  },
  {
    quote:
      'When I write about food inflation, I need a source I can cite. The breakdown of why prices move is what makes me trust this.',
    name: 'Ifeoma',
    role: 'Journalist, BusinessDay',
  },
]

export const dataSources: DataSourceItem[] = [
  {
    id: 'updated',
    title: 'Updated weekly',
    body: '47 monitored markets refreshed continuously by a network of vetted local enumerators.',
  },
  {
    id: 'auditable',
    title: 'Auditable',
    body: 'Source prices, model versions, and historical predictions are archived and available on request.',
  },
  {
    id: 'independent',
    title: 'Independent',
    body: 'No commercial partners, no government funding strings. Built and reviewed at NitHub, University of Lagos.',
  },
]

export const trackRecordStats: TrackRecordStat[] = [
  { value: '82%', label: 'Direction accuracy across last 6 months' },
  { value: '±1.4%', label: 'Median magnitude error per cycle' },
  { value: '47', label: 'Markets continuously monitored' },
  { value: '0', label: 'Trades placed by us, ever' },
]

export const methodologyFooter =
  'Free, non-commercial. Built for social good. Built by the team at NitHub, University of Lagos.'
