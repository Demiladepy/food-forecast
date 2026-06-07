/** Local image paths served from /public/images */
export const heroMarketImage = '/images/hero-market.png'

export const commodityImages = {
  tomatoes: '/images/tomatoes.png',
  'rice-imported': '/images/rice.png',
  'scotch-bonnet': '/images/scotch-bonnet.png',
  yam: '/images/yam.png',
  onions: '/images/onions.png',
  eggs: '/images/eggs.png',
} as const

/** Placeholders until design assets arrive for these commodities */
export const commodityPlaceholders = {
  'white-garri':
    'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80',
  'brown-beans':
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
} as const

export function getCommodityImage(id: string): string {
  if (id in commodityImages) {
    return commodityImages[id as keyof typeof commodityImages]
  }
  if (id in commodityPlaceholders) {
    return commodityPlaceholders[id as keyof typeof commodityPlaceholders]
  }
  return commodityPlaceholders['white-garri']
}
