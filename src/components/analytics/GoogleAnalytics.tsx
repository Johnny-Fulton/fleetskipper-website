/**
 * Google Analytics 4 Component - GDPR/UK PECR Compliant
 *
 * This component loads Google Analytics tracking code with cookie consent.
 * It only loads in production and only after user has given consent.
 *
 * Features:
 * - Respects cookie consent (GDPR/UK PECR compliant)
 * - Google Consent Mode V2 integration
 * - Only loads in production
 * - Automatic page view tracking
 *
 * Setup Instructions:
 * 1. Create a GA4 property at https://analytics.google.com
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add it to your environment variables: NEXT_PUBLIC_GA_MEASUREMENT_ID
 * 4. Deploy to production
 */

'use client'

import Script from 'next/script'
import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hasConsent, setHasConsent] = useState(false)

  // Get GA4 Measurement ID from environment variables
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Only load in production and if measurement ID is configured
  const isProduction = process.env.NODE_ENV === 'production'
  const shouldLoad = isProduction && GA_MEASUREMENT_ID

  // Check for analytics consent
  useEffect(() => {
    if (!shouldLoad) return

    // Check if user has given consent for analytics
    const checkConsent = () => {
      if (typeof window !== 'undefined' && 'CookieConsent' in window) {
        const CookieConsent = (window as typeof window & { CookieConsent: typeof import("vanilla-cookieconsent") }).CookieConsent
        const hasAnalyticsConsent = CookieConsent.acceptedCategory('analytics')
        setHasConsent(hasAnalyticsConsent)
      }
    }

    // Check immediately
    checkConsent()

    // Listen for consent changes
    window.addEventListener('cc:onConsent', checkConsent)
    window.addEventListener('cc:onChange', checkConsent)

    return () => {
      window.removeEventListener('cc:onConsent', checkConsent)
      window.removeEventListener('cc:onChange', checkConsent)
    }
  }, [shouldLoad])

  // Track page views on route change (only if consent given)
  useEffect(() => {
    if (!shouldLoad || !hasConsent) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // gtag is loaded via Script tag
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID, shouldLoad, hasConsent])

  // Don't render anything if not in production, no measurement ID, or no consent
  if (!shouldLoad || !hasConsent) {
    return null
  }

  return (
    <>
      {/* Google Analytics gtag.js script - deferred for performance */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Google Analytics initialization with Consent Mode V2 */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent state (denied) - required by Google Consent Mode V2
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });

            // Update consent to granted (this script only loads if consent given)
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
          `,
        }}
      />
    </>
  )
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}

/**
 * Custom event tracking helper
 *
 * Usage:
 * import { trackEvent } from '@/components/analytics/GoogleAnalytics'
 *
 * trackEvent('demo_request', {
 *   button_location: 'hero',
 *   page: '/pricing'
 * })
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag
    gtag('event', eventName, eventParams)
  }
}

/**
 * Track demo request conversions
 */
export function trackDemoRequest(location: string) {
  trackEvent('demo_request', {
    button_location: location,
    page: window.location.pathname,
  })
}

/**
 * Track contact form submissions
 */
export function trackContactForm(formType: string) {
  trackEvent('contact_form_submit', {
    form_type: formType,
    page: window.location.pathname,
  })
}

/**
 * Track blog post engagement
 */
export function trackBlogEngagement(action: string, postSlug: string) {
  trackEvent('blog_engagement', {
    action, // 'read_more', 'share', 'time_on_page', etc.
    post_slug: postSlug,
  })
}
