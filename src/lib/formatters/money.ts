const ngnFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** Formats naira like ₦40,000 (no decimals). */
export function formatNGN(amount: number): string {
  return ngnFormatter.format(amount)
}

/** @deprecated Use formatNGN */
export function formatMoney(amount: number): string {
  return formatNGN(amount)
}

export function formatNGNCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`
  }
  if (Math.abs(amount) >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1)}K`
  }
  return formatNGN(amount)
}
