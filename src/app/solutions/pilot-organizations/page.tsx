import type { Metadata } from 'next'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Ports & Harbours Solutions | SeaReady',
  description: 'Digital Master/Pilot Exchange (eMPX) and custom port operations software. Built by mariners for pilot organizations, harbour authorities, and port operators.',
}

export default function PilotOrganizationsSolutionsPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/ports.jpg"
          alt="Vessel alongside in port with pilot operations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ports & Harbours Solutions
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Digital Master/Pilot Exchange and custom port operations software built by working mariners
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/products/master-pilot-exchange"
                className="rounded-full px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: '#c65d00' }}
              >
                Explore SeaReady eMPX Platform
              </Link>
              <Link
                href="/contact"
                className="rounded-full px-6 py-3 text-base font-semibold text-white ring-1 ring-white/80 hover:bg-white/20"
              >
                Custom Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Product: SeaReady eMPX */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              Featured Product
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: '#0E1A2B' }}>
              SeaReady eMPX - Digital Master/Pilot Exchange
            </p>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              The modern solution for pilot operations and vessel information exchange
            </p>
          </div>

          {/* SeaReady eMPX Feature Grid */}
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left side - Image */}
              <div className="order-2 lg:order-1 flex justify-center">
                <Image
                  src="/images/empx/manoeuvring_mpx.png"
                  alt="eMPX mobile app showing pilot filling out Master/Pilot Exchange form"
                  width={300}
                  height={600}
                  className="rounded-lg shadow-2xl"
                />
              </div>

              {/* Right side - Features */}
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#0E1A2B' }}>
                  Complete Digital Transformation
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Operations Dashboard</h4>
                      <p className="text-sm text-gray-600">Live view of all pilot jobs, vessel movements, and port activities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Mobile-First Design</h4>
                      <p className="text-sm text-gray-600">Works seamlessly on pilot tablets, phones, and desktop systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Instant Digital Archive</h4>
                      <p className="text-sm text-gray-600">Every MPX form searchable and accessible in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Analytics & Insights</h4>
                      <p className="text-sm text-gray-600">Comprehensive reporting on operations, safety trends, and KPIs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                    <div>
                      <h4 className="font-semibold text-gray-900">PMIS Integration Ready</h4>
                      <p className="text-sm text-gray-600">Seamlessly integrates with your Port Management Information System</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/products/master-pilot-exchange"
                    className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 transition-colors"
                    style={{ backgroundColor: '#0891B2' }}
                  >
                    View Full SeaReady eMPX Features →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              Beyond SeaReady eMPX
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: '#0E1A2B' }}>
              Custom Port & Harbour Solutions
            </p>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              We also develop bespoke software for unique operational challenges
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Additional Pilot Systems */}
            <div className="rounded-2xl border-2 p-8 bg-white" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                Additional Pilot Systems
              </h3>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Beyond SeaReady eMPX, we can build custom extensions and specialized tools for your pilot operations.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Under Keel Clearance (UKC) calculations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Real-time tidal data integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Pilot scheduling and dispatch</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Custom reporting and analytics</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Pilot training and certification tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Incident reporting and investigation</span>
                </div>
              </div>
            </div>

            {/* Port Authority Solutions */}
            <div className="rounded-2xl border-2 p-8 bg-white" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                Port Authority Solutions
              </h3>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Comprehensive software for harbour authorities and port operators to manage complex operations.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Vessel traffic management systems</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Berth allocation and planning</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Port state control coordination</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Legacy system integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Custom workflows and automation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Multi-user access and permissions</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why SeaReady eMPX Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">

            {/* Featured Badge */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: '#0891B2' }}>
                Why SeaReady eMPX
              </span>
            </div>

            <div className="rounded-2xl p-8 lg:p-12" style={{ backgroundColor: '#ecfeff', border: '2px solid #0891B2' }}>
              <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#0E1A2B' }}>
                Built for How Pilots Actually Work
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B535D' }}>
                  SeaReady eMPX was designed by a working marine pilot who understands the real challenges of pilot operations. Every feature addresses actual pain points experienced during vessel exchanges.
                </p>

                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                    The Problem We Solve
                  </h3>
                  <p className="text-base" style={{ color: '#4B535D' }}>
                    Paper MPX forms get wet, torn, and lost. Data entry is duplicated. Historical records are buried in filing cabinets. Safety trends are invisible. SeaReady eMPX digitizes this entire workflow, making it instant, searchable, and analyzable.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                    Expected Benefits
                  </h3>
                  <p className="text-base mb-4" style={{ color: '#4B535D' }}>
                    Based on our design and testing, eMPX should deliver:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-sm" style={{ color: '#4B535D' }}>Faster MPX completion with pre-populated vessel data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-sm" style={{ color: '#4B535D' }}>No more lost or illegible forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-sm" style={{ color: '#4B535D' }}>Instant access to any historical MPX record</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                      <span className="text-sm" style={{ color: '#4B535D' }}>Identify safety patterns and trends over time</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                    Ready for Launch
                  </h3>
                  <p className="text-base mb-4" style={{ color: '#4B535D' }}>
                    eMPX is production-ready and can be configured to your port&apos;s specific requirements. We&apos;re looking for forward-thinking ports and pilot organizations who want to modernize their operations and lead the digital transformation in maritime pilotage.
                  </p>
                  <p className="text-base font-semibold" style={{ color: '#0891B2' }}>
                    Be among the first to transform your pilot operations with SeaReady eMPX.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ports & Harbours Choose SeaReady */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Why Ports & Harbours Choose SeaReady
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Maritime expertise combined with technical excellence to solve complex operational challenges
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <dl className="space-y-6">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Built by a Working Marine Pilot</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Founded by someone who understands pilot operations from the inside - not just a software developer
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Rapid Development and Deployment</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    We deliver working solutions in days or weeks, not months or years
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Technical Problem Solving</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    We excel at solving complex integration challenges that others can&apos;t handle
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Operational Understanding</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Software designed around real pilot workflows and port operations, not theoretical concepts
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Flexible Solutions</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    From our SeaReady eMPX platform to fully custom solutions, we adapt to your needs
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Ongoing Support</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Direct access to the developers who understand your operations
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Related Insights Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Industry Insights
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Practical guidance and compliance updates for maritime professionals
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* eMPX Blog Post Card */}
            <article className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/blog/empx-card.jpg"
                  alt="Electronic Master Pilot Exchange"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#0891B2' }}>
                    Port Innovation
                  </p>
                  <div className="mt-2 block">
                    <h3 className="text-xl font-semibold" style={{ color: '#0E1A2B' }}>
                      <Link href="/blog/mpx-clipboard-to-digital" className="hover:underline">
                        From Paper to Precision - Why Electronic Master Pilot Exchange is the New Standard
                      </Link>
                    </h3>
                    <p className="mt-3 text-base text-gray-600">
                      Electronic Master Pilot Exchange (eMPX) systems transform the critical vessel handover from static paper processes to dynamic, verified data exchange.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>7 min read</span>
                  </div>
                  <Link
                    href="/blog/mpx-clipboard-to-digital"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: '#0891B2' }}
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>

            {/* Pilot Ladder Blog Post Card */}
            <article className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/blog/pilot-ladder-card-final.jpg"
                  alt="Pilot Ladder Safety"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#0891B2' }}>
                    Maritime Safety
                  </p>
                  <div className="mt-2 block">
                    <h3 className="text-xl font-semibold" style={{ color: '#0E1A2B' }}>
                      <Link href="/blog/pilot-ladder-safety-ukmpa-guide" className="hover:underline">
                        Pilot Ladder Safety - Why the UKMPA&apos;s New Interactive Guide Matters
                      </Link>
                    </h3>
                    <p className="mt-3 text-base text-gray-600">
                      Half of all pilot ladder incidents come down to bad rigging. The new UKMPA Interactive Guide shows what compliance actually looks like.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>6 min read</span>
                  </div>
                  <Link
                    href="/blog/pilot-ladder-safety-ukmpa-guide"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: '#0891B2' }}
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-base font-semibold hover:underline"
              style={{ color: '#0891B2' }}
            >
              View All Insights →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Ready to Transform Your Port Operations?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8" style={{ color: '#6B7280' }}>
              Whether you need our SeaReady eMPX platform or a custom solution for your unique challenges, we&apos;re here to help.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/products/master-pilot-exchange"
                className="rounded-full px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: '#c65d00' }}
              >
                Explore SeaReady eMPX
              </Link>
              <Link
                href="/contact"
                className="rounded-full px-6 py-3 text-base font-semibold leading-6 transition-colors"
                style={{ color: '#0891B2' }}
              >
                Discuss Custom Solutions <span aria-hidden="true">→</span>
              </Link>
            </div>
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