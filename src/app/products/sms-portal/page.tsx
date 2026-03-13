import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'SMS Portal - Document Management & Compliance Tracking | SeaReady',
  description: 'Document management and compliance tracking platform for maritime operators. View-only, editing, and fleet management tiers available. WBC3, ISM, and DSM compliant.',
}

export default function SMSPortalPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/navigation-sunrise-card.jpg"
          alt="Maritime document management and compliance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              SMS Portal
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Document Management & Compliance Tracking
            </p>
            <p className="mt-4 text-lg text-white/85">
              Your Safety Management System in the cloud - accessible from anywhere, secured and backed up
            </p>
          </div>
        </div>
      </div>

      {/* What It Is Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              What It Is
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Your SMS Documentation Platform
            </p>
            <p className="mt-6 text-lg" style={{ color: '#6B7280' }}>
              The SMS Portal is a cloud-based document management and compliance tracking platform. Store, manage, and track all your Safety Management System documentation in one secure location.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <dl className="space-y-4">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Cloud-Based Document Storage</dt>
                  <dd style={{ color: '#6B7280' }}>Access your SMS documents from anywhere with an internet connection</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Version Control & Audit Tracking</dt>
                  <dd style={{ color: '#6B7280' }}>Automatic version history and complete audit trail of all changes</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Compliance Tracking Tools</dt>
                  <dd style={{ color: '#6B7280' }}>Track audits, findings, and corrective actions with built-in trackers</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Secure & Backed Up</dt>
                  <dd style={{ color: '#6B7280' }}>Bank-level encryption with automated backups</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Three Tiers Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Three Tiers to Fit Your Needs
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Choose the tier that matches your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LITE Tier */}
            <div className="rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                LITE
              </h3>
              <p className="mt-2 text-sm font-medium" style={{ color: '#0891B2' }}>
                Best for Owner-Operators
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>View-only access to documents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Download PDF versions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Basic compliance trackers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Perfect for single vessel operations</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold" style={{ color: '#6B7280' }}>Contact us for pricing</p>
              </div>
            </div>

            {/* STANDARD Tier */}
            <div className="rounded-2xl border-2 p-8 bg-white" style={{ borderColor: '#0891B2', boxShadow: '0 4px 6px -1px rgba(8, 145, 178, 0.1)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                  STANDARD
                </h3>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: '#10b981', color: 'white' }}>
                  Most Popular
                </span>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: '#0891B2' }}>
                Best for 1-6 Vessels
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm font-semibold" style={{ color: '#4B535D' }}>Everything in LITE, plus:</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Edit documents in browser</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Full version history</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Audit tracking & findings management</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Corrective action tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>User role management</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold" style={{ color: '#6B7280' }}>Contact us for pricing</p>
              </div>
            </div>

            {/* FLEET Tier */}
            <div className="rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                FLEET
              </h3>
              <p className="mt-2 text-sm font-medium" style={{ color: '#0891B2' }}>
                Best for Multi-Vessel Operations
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm font-semibold" style={{ color: '#4B535D' }}>Everything in STANDARD, plus:</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Separate SMS per vessel</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Fleet-wide dashboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Company-level oversight</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Bulk reporting & exports</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Priority support</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold" style={{ color: '#6B7280' }}>Contact us for pricing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Who It&apos;s For
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              The SMS Portal supports operators across multiple maritime sectors
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <dl className="space-y-4">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Workboat Operators (WBC3)</dt>
                  <dd style={{ color: '#6B7280' }}>UK Workboat Code Edition 3 compliant documentation and tracking</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Merchant Vessels (ISM Code)</dt>
                  <dd style={{ color: '#6B7280' }}>International Safety Management Code compliant systems</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Fishing Vessels (DSM Code)</dt>
                  <dd style={{ color: '#6B7280' }}>Domestic Safety Management Code compliant documentation</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Key Features
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Everything you need for document management and compliance tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                Document Library
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Organized storage for all SMS documents with search and filtering
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                Version Control
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Automatic versioning with complete history of all changes and updates
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                Audit Tracking
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Track internal and external audits with findings management
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                Findings Management
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Log audit findings and track corrective actions to closure
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                User Access Control
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Role-based permissions for different team members
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                Export & Download
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Download PDFs or export data for offline use or sharing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Request a demo or contact our sales team to learn more about the SMS Portal
            </p>
          </div>

          <div className="mx-auto mt-10 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0891B2' }}
            >
              Request Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:opacity-90"
              style={{ color: '#0891B2', border: '2px solid #0891B2' }}
            >
              Contact Sales
            </Link>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: '#6B7280' }}>
            Questions? Email us at <a href="mailto:support@seaready.co.uk" className="font-semibold" style={{ color: '#0891B2' }}>support@seaready.co.uk</a>
          </p>
        </div>
      </section>

      {/* Footer */}
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
