/**
 * BlogLink Component
 *
 * Smart link component for blog posts that:
 * - Styles internal links differently from external links
 * - Opens external links in new tabs
 * - Adds appropriate visual indicators
 */

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export interface BlogLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showExternalIcon?: boolean
}

/**
 * Determine if a URL is external
 */
function isExternalUrl(url: string): boolean {
  if (url.startsWith('/')) return false
  if (url.startsWith('#')) return false
  if (url.startsWith('mailto:')) return false
  if (url.startsWith('tel:')) return false
  try {
    const urlObj = new URL(url)
    return urlObj.origin !== window.location.origin
  } catch {
    return false
  }
}

export function BlogLink({
  href,
  children,
  className = '',
  showExternalIcon = true,
}: BlogLinkProps) {
  const isExternal = isExternalUrl(href)

  const baseClasses = 'font-medium text-primary-cyan hover:text-cyan-700 underline decoration-cyan-300 hover:decoration-cyan-500 transition-colors'
  const classes = `${baseClasses} ${className}`

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${classes} inline-flex items-center gap-1`}
      >
        {children}
        {showExternalIcon && <ExternalLink className="h-3.5 w-3.5 inline-block" />}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/**
 * Internal link variant - no external icon, optimized for Next.js navigation
 */
export function InternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`font-medium text-primary-cyan hover:text-cyan-700 underline decoration-cyan-300 hover:decoration-cyan-500 transition-colors ${className}`}
    >
      {children}
    </Link>
  )
}

/**
 * Button-style link for CTAs within content
 */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}) {
  const isExternal = isExternalUrl(href)

  const variants = {
    primary: 'bg-cta-orange text-white hover:bg-opacity-90 shadow-sm',
    secondary: 'bg-primary-cyan text-white hover:bg-cyan-600 shadow-sm',
    outline: 'border-2 border-primary-cyan text-primary-cyan hover:bg-cyan-50',
  }

  const classes = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${variants[variant]} ${className}`

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ExternalLink className="h-4 w-4" />
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/**
 * Reference link - styled for footnotes and citations
 */
export function ReferenceLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const isExternal = isExternalUrl(href)

  const classes = `text-sm text-primary-cyan hover:text-cyan-700 underline decoration-dotted decoration-cyan-300 hover:decoration-cyan-500 transition-colors ${className}`

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        title="External reference"
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
