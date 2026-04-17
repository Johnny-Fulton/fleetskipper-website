import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact FleetSkipper | Maritime Compliance Experts',
  description: 'Contact FleetSkipper for WBC3 SMS consultancy, MCA compliance questions, or maritime operations support. Built by mariners for vessel operators.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
