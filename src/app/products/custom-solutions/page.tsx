import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Custom Maritime Software Solutions | SeaReady',
  description: 'Bespoke maritime software development. Pilot exchange systems, port operations software, fleet management platforms. Fast delivery by maritime professionals.',
}

export default function CustomSolutionsPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/sunset-workboat.jpg"
          alt="Custom maritime software development"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Custom Maritime Software Solutions
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Bespoke software development for maritime operations
            </p>
            <p className="mt-4 text-lg text-white/85">
              When off-the-shelf solutions don&apos;t fit, we build exactly what you need
            </p>
          </div>
        </div>
      </div>

      {/* What We Build Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              What We Build
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Bespoke Maritime Software
            </p>
            <p className="mt-6 text-lg" style={{ color: '#6B7280' }}>
              We develop custom software solutions for maritime organizations with unique operational requirements. From pilot stations to port authorities to fleet operators - if you need software that doesn&apos;t exist, we can build it.
            </p>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Examples of What We Build
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Custom solutions for specialized maritime operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilot Exchange Systems */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                Pilot Exchange Systems
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>MPX integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>PMIS system connectivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>UKC (Under Keel Clearance) calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Real-time vessel tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Automated boarding coordination</span>
                </li>
              </ul>
            </div>

            {/* Port Operations Software */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                Port Operations Software
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Vessel traffic management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Berth allocation systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Tug scheduling & dispatch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Port state control tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Cargo handling coordination</span>
                </li>
              </ul>
            </div>

            {/* Fleet Management */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                Fleet Management
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Custom SMS platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Multi-vessel tracking systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Fleet-wide compliance dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Crew management systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#14b8a6' }} />
                  <span className="text-sm" style={{ color: '#4B535D' }}>Performance analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Our Process
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              From concept to deployment in four clear steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: '#0891B2' }}>
                1
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                Discovery
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                We listen to your requirements and understand your operational challenges
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: '#0891B2' }}>
                2
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                Design
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                We design a solution tailored to your specific needs and workflows
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: '#0891B2' }}>
                3
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                Development
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                We build and test the solution with regular progress updates
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: '#0891B2' }}>
                4
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                Deployment
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                We deploy the solution and provide training and ongoing support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Capability Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg p-8 bg-white shadow-sm border-2" style={{ borderColor: '#0891B2' }}>
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: '#10b981', color: 'white' }}>
                  Proven Capability
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E1A2B' }}>
                Rapid PMIS Integration for Pilot Operations
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: '#0891B2' }}>Challenge</h3>
                  <p style={{ color: '#4B535D' }}>
                    Working pilots needed PMIS integration for their pilot exchange system. Another vendor had been working on the integration for over a year without success.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2" style={{ color: '#0891B2' }}>Solution</h3>
                  <p style={{ color: '#4B535D' }}>
                    SeaReady delivered a working PMIS integration in just 2 days. The system now handles real-time vessel data exchange and automated boarding coordination.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2" style={{ color: '#0891B2' }}>Result</h3>
                  <p style={{ color: '#4B535D' }}>
                    The system is now in daily operational use by working pilots, streamlining vessel boarding operations and improving coordination with port traffic management.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#ecfeff' }}>
                <p className="text-sm font-semibold" style={{ color: '#0e7490' }}>
                  From over a year of vendor delays to operational deployment in 2 days - now in daily use by working pilots.
                </p>
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
              Why Choose SeaReady
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              We bring unique advantages to custom maritime software development
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <dl className="space-y-6">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Maritime Domain Expertise</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Built by a working marine pilot who understands maritime operations from the inside
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Fast Delivery</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    We understand urgency in maritime operations and deliver solutions quickly
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Modern Technology Stack</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    We use proven, modern technologies that are secure, scalable, and maintainable
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Integration Specialists</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Experienced in connecting maritime systems like MPX, PMIS, AIS, and port management platforms
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Ongoing Support</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    We don&apos;t just deliver software - we provide long-term support and maintenance
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-7 w-7 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>Proven Track Record</dt>
                  <dd className="mt-1" style={{ color: '#6B7280' }}>
                    Systems in daily operational use by maritime organizations across the UK
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
              Have a Custom Software Project?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Let&apos;s discuss your requirements and how we can help build the solution you need
            </p>
          </div>

          <div className="mx-auto mt-10 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0891B2' }}
            >
              Request Consultation
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
