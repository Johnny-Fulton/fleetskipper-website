import type { Metadata } from 'next'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'WBC3 Compliance Solutions for Workboat Operators | SeaReady',
  description: 'Complete WBC3 compliance solutions: SMS documentation builds, portal management, and Pro App for workboat operations. Contact us for pricing.',
}

export default function WorkboatSolutionsPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/navigation-sunrise-card.jpg"
          alt="Professional UK workboat operating in coastal waters - WBC3 compliance solutions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              WBC3 Compliance Solutions for Workboat Operators
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Three powerful options to achieve full UK Workboat Code compliance - from done-for-you SMS builds to complete operational management
            </p>
          </div>
        </div>
      </div>

      {/* Three Options Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              Choose Your Path
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: '#0E1A2B' }}>
              Three Ways to Achieve WBC3 Compliance
            </p>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Select the solution that fits your needs - or combine them for complete coverage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-fr">

            {/* Option 1: SMS Documentation Build */}
            <div className="flex flex-col rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                  Option 1
                </h3>
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
                  Available Now
                </span>
              </div>

              <h4 className="text-xl font-semibold mb-4" style={{ color: '#0891B2' }}>
                SMS Documentation Build
              </h4>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Complete WBC3 Safety Management System built for your vessel. Includes LITE Portal access for document management.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Custom documents built to your specifications</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>SMS Portal LITE included</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>30 days post-delivery support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>MCA audit-ready documentation</span>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                  Pricing:
                </p>
                <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                  Contact us for access and pricing information
                </p>

                <Link
                  href="/contact"
                  className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#c65d00' }}
                >
                  Get WBC3 Quote
                </Link>
              </div>
            </div>

            {/* Option 2: SMS Portal */}
            <div className="flex flex-col rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                  Option 2
                </h3>
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
                  Available Now
                </span>
              </div>

              <h4 className="text-xl font-semibold mb-4" style={{ color: '#0891B2' }}>
                SMS Portal
              </h4>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Document management portal with three tiers. Manage your SMS, track audits, handle findings, and maintain compliance.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#0E1A2B' }}>LITE</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>View and manage SMS documents, download PDFs</p>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#0E1A2B' }}>STANDARD</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>LITE features + audit tracking, findings management, actions log</p>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#0E1A2B' }}>FLEET</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>STANDARD features + multi-vessel management, fleet-wide reporting</p>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                  Pricing:
                </p>
                <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                  Contact us for access and pricing information
                </p>

                <Link
                  href="/contact"
                  className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Option 3: SMS Pro App */}
            <div className="flex flex-col rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                  Option 3
                </h3>
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
                  Available Now
                </span>
              </div>

              <h4 className="text-xl font-semibold mb-4" style={{ color: '#0891B2' }}>
                SMS Pro App
              </h4>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Complete vessel operations management app. Works 100% offline at sea with intelligent compliance tracking across 12 modules.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>100% offline capability</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Progressive Web App (PWA) accessible from any device</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Drill planner and training tracker</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Equipment register and inspections</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Auto-sync when online</span>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                  Pricing:
                </p>
                <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                  Contact us for access and pricing information
                </p>

                <Link
                  href="/contact"
                  className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Book Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose SeaReady Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Why Workboat Operators Choose SeaReady
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Built specifically for small UK workboat operators who need practical, affordable WBC3 compliance
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <dl className="space-y-6">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Understanding of MCA Requirements</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Deep knowledge of UK MCA regulations and WBC3 compliance requirements for workboat operations
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Experience with Workboat Operations</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Built by mariners who understand the unique challenges of workboat operations and crew requirements
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Quick Turnaround for Audits</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Fast SMS builds and rapid support for audit preparation and MCA inspections
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Practical Solutions That Work at Sea</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Documentation and tools designed for real workboat operations, not just theoretical compliance
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Small Operator Focus</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Designed specifically for 1-10 vessel workboat operators, not corporate fleets with complex requirements
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Direct Support from Maritime Professionals</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Talk directly to qualified mariners who understand workboat operations and can provide practical advice
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Ready to Get WBC3 Compliant?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Get a custom quote for your workboat operation, or book a consultation to discuss your specific needs
            </p>
          </div>

          <div className="mx-auto mt-10 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c65d00' }}
            >
              Get WBC3 Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:opacity-90"
              style={{ color: '#0891B2', border: '2px solid #0891B2' }}
            >
              Book Consultation
            </Link>
          </div>
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
