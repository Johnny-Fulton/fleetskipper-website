import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsentBanner } from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: {
    template: '%s - FleetSkipper',
    default: 'FleetSkipper - WBC3 Compliance Made Simple for Workboat Operators',
  },
  description: 'Expert SMS documentation and digital tools for UK workboat operators. Built by a Master Mariner for working skippers. WBC3 compliance made simple.',
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
        {children}
      </body>
    </html>
  )
}
