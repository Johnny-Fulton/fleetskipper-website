import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact SeaReady | Maritime Compliance Experts',
  description: 'Contact SeaReady for WBC3 SMS consultancy, MCA compliance questions, or maritime operations support. Built by mariners for vessel operators.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
