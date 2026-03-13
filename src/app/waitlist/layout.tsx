import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SeaReady App Waitlist | Maritime Compliance Platform',
  description: 'Join the waitlist for SeaReady App. Offline-first digital SMS management for UK vessels. MCA-compliant, WBC3 specialist. Coming soon.',
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
