/** Optimized WebP paths served from /public/images (see scripts/optimize-images.mjs) */
export const heroMarketImage = '/images/hero-market.webp'

export const commodityImages = {
  'tomato-tomato': '/images/tomatoes.webp',
  'rice-imported': '/images/rice.webp',
  'potato-sweet': '/images/scotch-bonnet.webp',
  'yam-tuber': '/images/yam.webp',
  'garri-white': '/images/white-garri.webp',
  'beans-brown': '/images/brown-beans.webp',
  'potato-irish': '/images/onions.webp',
  'eggs-agric-12pcs': '/images/eggs.webp',
} as const

/** PNG fallbacks for older browsers */
export const commodityImageFallbacks = {
  'tomato-tomato': '/images/tomatoes.png',
  'rice-imported': '/images/rice.png',
  'potato-sweet': '/images/scotch-bonnet.png',
  'yam-tuber': '/images/yam.png',
  'garri-white': '/images/white-garri.png',
  'beans-brown': '/images/brown-beans.png',
  'potato-irish': '/images/onions.png',
  'eggs-agric-12pcs': '/images/eggs.png',
} as const

export const heroMarketImageFallback = '/images/hero-market.png'

export function getCommodityImage(id: string): string {
  if (id in commodityImages) {
    return commodityImages[id as keyof typeof commodityImages]
  }
  return commodityImages['garri-white']
}

export function getCommodityImageFallback(id: string): string {
  if (id in commodityImageFallbacks) {
    return commodityImageFallbacks[id as keyof typeof commodityImageFallbacks]
  }
  return commodityImageFallbacks['garri-white']
}
