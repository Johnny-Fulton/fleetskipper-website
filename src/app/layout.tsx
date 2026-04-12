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
        {/* ITC Bauhaus font for FleetSkipper branding (matches logo) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="text-gray-950 antialiased">
        {children}
      </body>
    </html>
  )
}
