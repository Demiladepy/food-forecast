import type { ImgHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  fallbackSrc?: string
  alt: string
  eager?: boolean
}

/** WebP with optional PNG fallback via <picture> */
export function OptimizedImage({
  src,
  fallbackSrc,
  alt,
  eager = false,
  className,
  ...props
}: OptimizedImageProps) {
  if (fallbackSrc) {
    return (
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'low'}
          {...props}
        />
      </picture>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'low'}
      {...props}
    />
  )
}
