/** Optimized WebP paths served from /public/images (see scripts/optimize-images.mjs) */
export const heroMarketImage = '/images/hero-market.webp'

export const commodityImages = {
  tomatoes: '/images/tomatoes.webp',
  'rice-imported': '/images/rice.webp',
  'scotch-bonnet': '/images/scotch-bonnet.webp',
  yam: '/images/yam.webp',
  'white-garri': '/images/white-garri.webp',
  'brown-beans': '/images/brown-beans.webp',
  onions: '/images/onions.webp',
  eggs: '/images/eggs.webp',
} as const

/** PNG fallbacks for older browsers */
export const commodityImageFallbacks = {
  tomatoes: '/images/tomatoes.png',
  'rice-imported': '/images/rice.png',
  'scotch-bonnet': '/images/scotch-bonnet.png',
  yam: '/images/yam.png',
  'white-garri': '/images/white-garri.png',
  'brown-beans': '/images/brown-beans.png',
  onions: '/images/onions.png',
  eggs: '/images/eggs.png',
} as const

export const heroMarketImageFallback = '/images/hero-market.png'

export function getCommodityImage(id: string): string {
  if (id in commodityImages) {
    return commodityImages[id as keyof typeof commodityImages]
  }
  return commodityImages['white-garri']
}

export function getCommodityImageFallback(id: string): string {
  if (id in commodityImageFallbacks) {
    return commodityImageFallbacks[id as keyof typeof commodityImageFallbacks]
  }
  return commodityImageFallbacks['white-garri']
}
