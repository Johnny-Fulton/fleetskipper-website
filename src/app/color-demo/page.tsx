import NavBarSolid from '@/components/navbar-solid'
import { CheckCircleIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function ColorDemoPage() {
  return (
    <div className="bg-white">
      <NavBarSolid />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              Brand Colors Demo
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: '#0E1A2B' }}>
              SeaReady Color Palette
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: '#6B7280' }}>
              This demo page shows how the cyan maritime color scheme looks across different sections.
              All colors below are from the recommended cyan palette.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#sections"
                className="rounded-md px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#c65d00' }}
              >
                Primary CTA Button
              </a>
              <a
                href="#sections"
                className="rounded-md px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0891B2' }}
              >
                Secondary Button
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette Reference */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              Color Reference
            </p>
            <h2 className="mt-2 text-3xl font-bold" style={{ color: '#0E1A2B' }}>
              Brand Color Palette
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cyan Accent */}
            <div className="text-center">
              <div className="h-24 rounded-lg shadow-md" style={{ backgroundColor: '#0891B2' }}></div>
              <p className="mt-3 font-semibold" style={{ color: '#0E1A2B' }}>Cyan Accent</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>#0891B2</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>Eyebrows, accents, stats</p>
            </div>

            {/* Burnt Orange */}
            <div className="text-center">
              <div className="h-24 rounded-lg shadow-md" style={{ backgroundColor: '#c65d00' }}></div>
              <p className="mt-3 font-semibold" style={{ color: '#0E1A2B' }}>Burnt Orange</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>#c65d00</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>Primary CTAs</p>
            </div>

            {/* Dark Charcoal */}
            <div className="text-center">
              <div className="h-24 rounded-lg shadow-md" style={{ backgroundColor: '#0E1A2B' }}></div>
              <p className="mt-3 font-semibold" style={{ color: '#0E1A2B' }}>Dark Charcoal</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>#0E1A2B</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>Headings</p>
            </div>

            {/* Medium Gray */}
            <div className="text-center">
              <div className="h-24 rounded-lg shadow-md border" style={{ backgroundColor: '#6B7280' }}></div>
              <p className="mt-3 font-semibold" style={{ color: '#0E1A2B' }}>Medium Gray</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>#6B7280</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>Body text</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Dark Background */}
      <div id="sections" className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              Dark Background Section
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Statistics & Achievements
            </h2>
            <p className="mt-4 text-lg text-white/80">
              This shows how the cyan accent pops on dark backgrounds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#0891B2' }}>100%</div>
              <p className="text-white font-semibold">Offshore Capable</p>
              <p className="mt-2 text-sm text-white/70">Works without internet connection</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#0891B2' }}>£30</div>
              <p className="text-white font-semibold">Starting Price</p>
              <p className="mt-2 text-sm text-white/70">Per month for 1 vessel</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#0891B2' }}>24/7</div>
              <p className="text-white font-semibold">Always Available</p>
              <p className="mt-2 text-sm text-white/70">Cloud-synced when online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards - White Background */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              White Background Section
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Key Features
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Feature cards with cyan accents and checkmarks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-[#0891B2] transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg mb-6" style={{ backgroundColor: '#0891B2' }}>
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0E1A2B' }}>
                MCA Compliant
              </h3>
              <p className="mb-4" style={{ color: '#6B7280' }}>
                Built to UK Workboat Code Edition 3 standards with full Annex 8 compliance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Audit-ready documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Automatic compliance tracking</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-[#0891B2] transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg mb-6" style={{ backgroundColor: '#0891B2' }}>
                <BoltIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0E1A2B' }}>
                Fast Setup
              </h3>
              <p className="mb-4" style={{ color: '#6B7280' }}>
                Auto-configured for your vessel type in under 30 minutes. No complex setup required.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Pre-loaded templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Intelligent configuration</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-[#0891B2] transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg mb-6" style={{ backgroundColor: '#0891B2' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0E1A2B' }}>
                Offline First
              </h3>
              <p className="mb-4" style={{ color: '#6B7280' }}>
                Works 100% offline at sea. Data syncs automatically when you&apos;re back in port.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>No internet required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Auto-sync when online</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              Pricing Section
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              From £30/month with no hidden fees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 bg-white">
              <div className="mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A2B' }}>Essentials</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold" style={{ color: '#0E1A2B' }}>£30</span>
                  <span className="text-sm" style={{ color: '#6B7280' }}>/month</span>
                </div>
                <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>1 vessel</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>SMS framework</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Offline capable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Email support</span>
                </li>
              </ul>
              <button
                className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0891B2' }}
              >
                Get Started
              </button>
            </div>

            {/* Tier 2 - Featured */}
            <div className="border-2 rounded-2xl p-8 bg-white relative" style={{ borderColor: '#0891B2' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold text-white" style={{ backgroundColor: '#0891B2' }}>
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A2B' }}>Professional</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold" style={{ color: '#0E1A2B' }}>£100</span>
                  <span className="text-sm" style={{ color: '#6B7280' }}>/month</span>
                </div>
                <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>1 vessel</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Everything in Essentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Drill management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Priority support</span>
                </li>
              </ul>
              <button
                className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#c65d00' }}
              >
                Get Started
              </button>
            </div>

            {/* Tier 3 */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 bg-white">
              <div className="mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A2B' }}>Enterprise</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold" style={{ color: '#0E1A2B' }}>£400</span>
                  <span className="text-sm" style={{ color: '#6B7280' }}>/month</span>
                </div>
                <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>1-10 vessels</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>24/7 phone support</span>
                </li>
              </ul>
              <button
                className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0891B2' }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-16" style={{ backgroundColor: '#0891B2' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join hundreds of maritime operators already using SeaReady for compliance
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md px-8 py-3 text-base font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#c65d00' }}
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="rounded-md px-8 py-3 text-base font-semibold border-2 border-white hover:bg-white/10 transition-colors"
                style={{ color: 'white' }}
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#0E1A2B' }}>
            Color Usage Notes
          </h3>
          <div className="space-y-4" style={{ color: '#6B7280' }}>
            <p>
              <strong style={{ color: '#0E1A2B' }}>Cyan (#0891B2):</strong> Used for eyebrows (section labels),
              stats/numbers, checkmarks, icon backgrounds, and secondary buttons. Creates strong maritime association.
            </p>
            <p>
              <strong style={{ color: '#0E1A2B' }}>Burnt Orange (#c65d00):</strong> Reserved for primary CTAs only.
              Creates excellent contrast with cyan and draws attention to action buttons.
            </p>
            <p>
              <strong style={{ color: '#0E1A2B' }}>Dark Charcoal (#0E1A2B):</strong> Used for all headings and
              important text. Provides professional, readable contrast on white backgrounds.
            </p>
            <p>
              <strong style={{ color: '#0E1A2B' }}>Medium Gray (#6B7280):</strong> Body text color. Easy to read
              and professional without being too harsh.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
