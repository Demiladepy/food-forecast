import type { Confidence } from '../data/types'
import { cn } from '../lib/utils'

export interface ConfidenceTagProps {
  confidence: Confidence
  className?: string
}

const confidenceLabels: Record<Confidence, string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
}

const dotClasses: Record<Confidence, string> = {
  high: 'bg-confidence-high',
  medium: 'bg-amber',
  low: 'bg-danger',
}

export function ConfidenceTag({ confidence, className }: ConfidenceTagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[11px] text-muted', className)}>
      <span
        className={cn('size-2 shrink-0 rounded-full', dotClasses[confidence])}
        aria-hidden
      />
      {confidenceLabels[confidence]}
    </span>
  )
}
