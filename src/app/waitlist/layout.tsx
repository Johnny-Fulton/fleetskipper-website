import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FleetSkipper App Waitlist | Maritime Compliance Platform',
  description: 'Join the waitlist for FleetSkipper App. Offline-first digital SMS management for UK vessels. Built for the MCA Workboat Code Edition 3 (WBC3). Coming soon.',
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
