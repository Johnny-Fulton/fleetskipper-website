import type { Metadata } from 'next'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ISM Code Compliance for Small Merchant Operators | SeaReady',
  description: 'ISM Code compliance tools for small merchant vessel operators. SMS Portal and Pro App for operational compliance tracking. Contact us for pricing.',
}

export default function MerchantVesselSolutionsPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/merchant-vessel-hero.jpg"
          alt="Small merchant vessel operations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              ISM Code Compliance for Small Merchant Operators
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Powerful tools to manage and maintain your ISM Code compliance - designed for small merchant vessel operators
            </p>
          </div>
        </div>
      </div>

      {/* Important Note Section */}
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-start gap-3">
            <svg className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Important Note About ISM SMS Documentation
              </p>
              <p className="mt-1 text-sm text-amber-800">
                We don&apos;t currently build ISM SMS documentation from scratch, but we provide the tools to manage what you have. Our Portal and Pro App help you maintain operational compliance, track audits, and manage your existing SMS effectively.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Solutions Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              Manage Your Compliance
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: '#0E1A2B' }}>
              Two Tools for ISM Code Operations
            </p>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Powerful software to help you maintain and improve your existing SMS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto auto-rows-fr">

            {/* SMS Portal for Merchant Vessels */}
            <div className="flex flex-col rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                  SMS Portal
                </h3>
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
                  Available Now
                </span>
              </div>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Document management portal for your existing ISM SMS. Available in STANDARD and FLEET tiers for small merchant operators.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#0E1A2B' }}>STANDARD TIER</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Document library management</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Audit tracking and history</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Findings management</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Corrective actions log</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#0E1A2B' }}>FLEET TIER</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>All STANDARD features</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Multi-vessel management</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Fleet-wide reporting</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>Cross-vessel analytics</span>
                    </div>
                  </div>
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
                  Request Quote
                </Link>
              </div>
            </div>

            {/* SMS Pro App */}
            <div className="flex flex-col rounded-2xl border-2 p-8 bg-white hover:border-[#0891B2] transition-colors" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                  SMS Pro App
                </h3>
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
                  Available Now
                </span>
              </div>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Operational compliance tracking app that works 100% offline at sea. Perfect for day-to-day ISM Code operations.
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
                  <span className="text-sm" style={{ color: '#4B535D' }}>Drill planning and execution</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Training and certification tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Equipment register and inspections</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Maintenance scheduling</span>
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
                  Request Quote
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Small Merchant Operators Choose SeaReady */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Why Small Merchant Operators Choose SeaReady
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Purpose-built tools for operators who need practical compliance solutions without enterprise complexity
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <dl className="space-y-6">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Built for Small Operators</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Designed specifically for 1-10 vessel operations, not massive corporate fleets
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Offline-First Design</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Pro App works 100% offline - because we know internet at sea is unreliable
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Practical and Usable</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Tools that your crew can actually use every day, not just for audits
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Maritime Expertise</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Built by a working marine pilot who understands the realities of vessel operations
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>No Enterprise Bloat</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Simple, focused tools without the complexity and cost of enterprise software
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Direct Support</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Talk directly to the founder, not a call center. Get answers from someone who knows your challenges.
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
              Ready to Streamline Your ISM Compliance?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Get a quote for Portal access or Pro App subscription, or book a consultation to discuss your needs
            </p>
          </div>

          <div className="mx-auto mt-10 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c65d00' }}
            >
              Request Quote
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
