import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsentBanner } from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: {
    template: '%s - SeaReady SMS',
    default: 'SeaReady SMS - UK Workboat Compliance Platform',
  },
  description: 'Ready-to-use Safety Management System for UK workboats. WBC3 and IWC compliant.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Using system fonts for instant loading - no external requests */}
      </head>
      <body className="text-gray-950 antialiased">
        {/* DEPLOYMENT VERIFICATION: v1.0.0 - Commit d3edd8e - Dec 10 2025 */}
        <CookieConsentBanner />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
