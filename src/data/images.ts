/** Optimized WebP paths served from /public/images (see scripts/optimize-all-commodities.mjs) */
export const heroMarketImage = '/images/hero-market.webp'

export const commodityImages = {
  'beans-brown': '/images/beans-brown.webp',
  'beans-white-black-eye': '/images/beans-white-black-eye.webp',
  'beef-bone-in': '/images/beef-bone-in.webp',
  'beef-boneless': '/images/beef-boneless.webp',
  'bread-sliced': '/images/bread-sliced.webp',
  'bread-unsliced': '/images/bread-unsliced.webp',
  'chicken-feet': '/images/chicken-feet.webp',
  'chicken-frozen': '/images/chicken-frozen.webp',
  'chicken-wings': '/images/chicken-wings.webp',
  'eggs-agric-1pcs': '/images/eggs-agric-1pcs.webp',
  'eggs-agric-12pcs': '/images/eggs-agric-12pcs.webp',
  'fish-catfish-smoked': '/images/fish-catfish-smoked.webp',
  'fish-fish': '/images/fish-fish.webp',
  'fish-mudfish': '/images/fish-mudfish.webp',
  'garri-white': '/images/garri-white.webp',
  'garri-yellow': '/images/garri-yellow.webp',
  'milk-evaporated-tin': '/images/milk-evaporated-tin.webp',
  'oil-groundnut': '/images/oil-groundnut.webp',
  'oil-palm': '/images/oil-palm.webp',
  'oil-vegetable': '/images/oil-vegetable.webp',
  'potato-irish': '/images/potato-irish.webp',
  'potato-sweet': '/images/potato-sweet.webp',
  'rice-agric': '/images/rice-agric.webp',
  'rice-imported': '/images/rice-imported.webp',
  'rice-local': '/images/rice-local.webp',
  'rice-medium-grained': '/images/rice-medium-grained.webp',
  'rice-ofada': '/images/rice-ofada.webp',
  'tomato-tomato': '/images/tomato-tomato.webp',
  'yam-tuber': '/images/yam-tuber.webp',
} as const

/** PNG fallbacks for older browsers */
export const commodityImageFallbacks = {
  'beans-brown': '/images/beans-brown.png',
  'beans-white-black-eye': '/images/beans-white-black-eye.png',
  'beef-bone-in': '/images/beef-bone-in.png',
  'beef-boneless': '/images/beef-boneless.png',
  'bread-sliced': '/images/bread-sliced.png',
  'bread-unsliced': '/images/bread-unsliced.png',
  'chicken-feet': '/images/chicken-feet.png',
  'chicken-frozen': '/images/chicken-frozen.png',
  'chicken-wings': '/images/chicken-wings.png',
  'eggs-agric-1pcs': '/images/eggs-agric-1pcs.png',
  'eggs-agric-12pcs': '/images/eggs-agric-12pcs.png',
  'fish-catfish-smoked': '/images/fish-catfish-smoked.png',
  'fish-fish': '/images/fish-fish.png',
  'fish-mudfish': '/images/fish-mudfish.png',
  'garri-white': '/images/garri-white.png',
  'garri-yellow': '/images/garri-yellow.png',
  'milk-evaporated-tin': '/images/milk-evaporated-tin.png',
  'oil-groundnut': '/images/oil-groundnut.png',
  'oil-palm': '/images/oil-palm.png',
  'oil-vegetable': '/images/oil-vegetable.png',
  'potato-irish': '/images/potato-irish.png',
  'potato-sweet': '/images/potato-sweet.png',
  'rice-agric': '/images/rice-agric.png',
  'rice-imported': '/images/rice-imported.png',
  'rice-local': '/images/rice-local.png',
  'rice-medium-grained': '/images/rice-medium-grained.png',
  'rice-ofada': '/images/rice-ofada.png',
  'tomato-tomato': '/images/tomato-tomato.png',
  'yam-tuber': '/images/yam-tuber.png',
} as const

export const heroMarketImageFallback = '/images/hero-market.png'

export function getCommodityImage(id: string): string {
  if (id in commodityImages) {
    return commodityImages[id as keyof typeof commodityImages]
  }
  return `/images/${id}.webp`
}

export function getCommodityImageFallback(id: string): string {
  if (id in commodityImageFallbacks) {
    return commodityImageFallbacks[id as keyof typeof commodityImageFallbacks]
  }
  return `/images/${id}.png`
}

