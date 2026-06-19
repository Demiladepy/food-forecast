import type { CommodityCategory } from '../data/types'

export function getCommodityCategory(id: string): CommodityCategory {
  const normalizedId = id.toLowerCase()
  if (
    normalizedId.includes('tomato') ||
    normalizedId.includes('onion') ||
    normalizedId.includes('pepper') ||
    normalizedId.includes('bonnet')
  ) {
    return 'VEGETABLES'
  }
  if (
    normalizedId.includes('rice') ||
    normalizedId.includes('garri') ||
    normalizedId.includes('maize')
  ) {
    return 'GRAINS'
  }
  if (
    normalizedId.includes('yam') ||
    normalizedId.includes('potato') ||
    normalizedId.includes('cassava')
  ) {
    return 'TUBERS'
  }
  if (
    normalizedId.includes('beans') ||
    normalizedId.includes('cowpea')
  ) {
    return 'LEGUMES'
  }
  if (
    normalizedId.includes('egg') ||
    normalizedId.includes('meat') ||
    normalizedId.includes('fish') ||
    normalizedId.includes('poultry')
  ) {
    return 'PROTEIN'
  }
  return 'GRAINS' // default fallback
}
