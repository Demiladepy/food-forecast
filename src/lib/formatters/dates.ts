const dateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-NG', {
  month: 'short',
  year: 'numeric',
})

export function formatDate(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return dateFormatter.format(value)
}

export function formatMonth(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return monthFormatter.format(value)
}
