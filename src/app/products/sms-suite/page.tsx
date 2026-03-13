import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarLight from '@/components/navbar-light'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import {
  Smartphone,
  Monitor,
  CheckCircle,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Users,
  Shield,
  BookOpen,
  Settings,
  BarChart,
  WifiOff,
  Laptop,
  Calendar,
  FileSpreadsheet
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'SeaReady SMS Suite™ - Complete SMS Platform | SeaReady Ltd',
  description: 'Digital safety management platform from deck to office. SeaReady Deck for operations, SeaReady Office for compliance. Built for WBC3 and ISM Code.',
}

export default function SMSSuitePage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarLight />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-8 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20 lg:px-8 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: '#0E1A2B' }}>
              SeaReady SMS Suite™
            </h1>
            <p className="mt-6 text-2xl font-semibold" style={{ color: '#0891B2' }}>
              Complete SMS platform from deck to office
            </p>
            <p className="mt-6 text-xl leading-8 max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
              Digital safety management built by working mariners who understand operational reality. Two complementary applications that work together or independently.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#c65d00' }}
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What is SMS Suite */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>What is SeaReady SMS Suite?</h2>
            <p className="mt-6 text-lg leading-8" style={{ color: '#4B535D' }}>
              SeaReady SMS Suite™ is a digital safety management platform designed for modern vessel operations. Built by working mariners who understand operational reality, the suite consists of two complementary applications that work together or independently.
            </p>
          </div>
        </div>
      </div>

      {/* SeaReady Deck Section */}
      <div className="bg-gradient-to-br from-cyan-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full" style={{ backgroundColor: '#0891B2' }}>
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>SeaReady Deck™</h2>
              </div>
              <p className="text-xl font-semibold mb-4" style={{ color: '#0891B2' }}>
                Record operations. Prove compliance. Even offline.
              </p>
              <p className="text-lg leading-8 mb-8" style={{ color: '#4B535D' }}>
                Record what you&apos;re doing - operational evidence for crew at sea. Simple, fast, works on any device.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Settings className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Maintenance Management</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>107+ pre-configured maintenance items, automatic scheduling, job cards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Crew Management</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Hours of Rest compliance, certifications, training records</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Drills & Exercises</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Log safety drills and training exercises with digital records</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Incident Reporting</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Document incidents, near-misses, and safety observations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <WifiOff className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Works Offline</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>No signal? No problem. Works offline and syncs when you&apos;re back in range</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Laptop className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Works on Any Device</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Desktop, tablet, or phone - works equally well on all devices</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-white shadow-sm">
                <p className="text-sm font-semibold mb-2" style={{ color: '#0891B2' }}>Who Uses Deck:</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>Masters and Chief Officers, Chief Engineers, Operations crew</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center shadow-xl">
                <Smartphone className="w-32 h-32" style={{ color: '#0891B2' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SeaReady Office Section */}
      <div className="bg-gradient-to-br from-teal-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-last lg:order-first relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center shadow-xl">
                <Monitor className="w-32 h-32" style={{ color: '#14b8a6' }} />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full" style={{ backgroundColor: '#14b8a6' }}>
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>SeaReady Office™</h2>
              </div>
              <p className="text-xl font-semibold mb-4" style={{ color: '#14b8a6' }}>Your SMS, always current. Always audit-ready.</p>
              <p className="text-lg leading-8 mb-8" style={{ color: '#4B535D' }}>
                Manage what you should be doing - documentation, policies, and verification. Used onboard by Masters and ashore by DPAs and compliance teams.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Complete Document Library</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>All SMS documents organised by chapter - policies, procedures, checklists, forms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Risk Assessment Viewer</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Transforms Excel risk assessments into clean, professional displays</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Review Tracking</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Dashboard shows what&apos;s due, coming up, or overdue - never miss a review</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardCheck className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Audit Management</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Internal audits, MCA audits, full audit trail and history</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Action Tracking</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Corrective actions, observations, and follow-ups to completion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0E1A2B' }}>Document Version Control</h4>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Track document revisions, change logs, approval history</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-white shadow-sm">
                <p className="text-sm font-semibold mb-2" style={{ color: '#14b8a6' }}>Who Uses Office:</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>Masters (onboard), DPAs and Compliance Officers (ashore), Harbour Masters, Directors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Two Apps */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>Why Two Apps?</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-white p-8 shadow-sm">
              <Smartphone className="w-10 h-10 mb-4" style={{ color: '#0891B2' }} />
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>Deck = The Doing</h3>
              <p className="leading-relaxed" style={{ color: '#4B535D' }}>
                Focuses on <strong>operations</strong> - what&apos;s happening on the vessel today. Record maintenance, drills, defects, and crew hours. Proves you&apos;re following your SMS.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-white p-8 shadow-sm">
              <Monitor className="w-10 h-10 mb-4" style={{ color: '#14b8a6' }} />
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>Office = The Documenting</h3>
              <p className="leading-relaxed" style={{ color: '#4B535D' }}>
                Focuses on <strong>policies and verification</strong> - your SMS documentation, risk assessments, and audit management. Defines what your SMS requires.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-teal-50 text-center">
            <p className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
              Together, they provide complete SMS coverage from operational execution to regulatory compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Flexible Deployment */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>Flexible Deployment</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4" style={{ color: '#0891B2' }} />
              <h3 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>Deck Only</h3>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>For operational management</p>
              <p className="text-xs italic" style={{ color: '#0891B2' }}>Coming December 2025</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm text-center border-2" style={{ borderColor: '#14b8a6' }}>
              <Monitor className="w-12 h-12 mx-auto mb-4" style={{ color: '#14b8a6' }} />
              <h3 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>Office Only</h3>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>For documentation and audits</p>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: '#14b8a6' }}>
                Available Now
              </span>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
              <BarChart className="w-12 h-12 mx-auto mb-4" style={{ color: '#3b82f6' }} />
              <h3 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>Both Together</h3>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>Complete SMS platform</p>
              <p className="text-xs italic" style={{ color: '#6B7280' }}>Office now, Deck Dec 2025</p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: '#6B7280' }}>
            Pricing available for individual apps or bundled suite.
          </p>
        </div>
      </div>

      {/* Built for Maritime Compliance */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>Built for Maritime Compliance</h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>SeaReady SMS Suite™ supports:</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color: '#0891B2' }} />
              <h4 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>WBC3 Edition 3</h4>
              <p className="text-sm" style={{ color: '#6B7280' }}>UK workboats</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <Shield className="w-10 h-10 mx-auto mb-3" style={{ color: '#0891B2' }} />
              <h4 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>ISM Code</h4>
              <p className="text-sm" style={{ color: '#6B7280' }}>Merchant vessels</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#0891B2' }} />
              <h4 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>MCA Requirements</h4>
              <p className="text-sm" style={{ color: '#6B7280' }}>UK audits</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <FileText className="w-10 h-10 mx-auto mb-3" style={{ color: '#0891B2' }} />
              <h4 className="font-bold mb-2" style={{ color: '#0E1A2B' }}>PMSC Standards</h4>
              <p className="text-sm" style={{ color: '#6B7280' }}>Port operations</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/95 mb-4">SeaReady Office is available now for early adopters.</p>
          <p className="text-lg text-white/90 mb-10">Interested in early access pricing?</p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg px-10 py-4 text-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#c65d00', color: 'white' }}
          >
            Request Information
          </Link>

          <p className="mt-6 text-sm text-white/80">
            SeaReady Deck launching December 2025
          </p>
        </div>
      </div>

      {/* Footer with Trademark */}
      <div className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            <em>SeaReady SMS Suite, SeaReady Deck, and SeaReady Office are trademarks of SeaReady Ltd.</em>
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <SiteFooter
        product={copy.footer.product}
        company={copy.footer.company}
        resources={copy.footer.resources}
        legal={copy.footer.legal}
        copyright={copy.footer.copyright}
      />
    </div>
  )
}
