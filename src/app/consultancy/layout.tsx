import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SMS Consultancy | SeaReady Maritime Compliance',
  description: 'Get a custom quote for WBC3-compliant SMS consultancy. Fast, practical turnaround. Built by maritime experts for UK vessel operators.',
}

export default function ConsultancyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
