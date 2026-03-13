// app/pricing/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import NavBarSolid from '@/components/navbar-solid'
import { CheckCircle, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | SeaReady SMS - Transparent Pricing from £30/month',
  description: 'Simple, transparent pricing for maritime compliance software. Essentials tier from £30/month for small operators. Professional and Enterprise tiers coming 2027-2028.',
  keywords: 'SMS software pricing, maritime compliance cost, affordable workboat compliance, transparent pricing',
}

export default function PricingPage() {
  return (
    <div className="bg-white">
      <NavBarSolid />

      {/* Hero */}
      <div className="py-24 sm:py-32" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              Transparent Pricing
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              From £30/month — Scale as You Grow
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              No hidden fees. No per-user charges. Just straightforward pricing based on your fleet size.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Note */}
          <p className="text-center mb-12 text-base" style={{ color: '#6B7280' }}>
            <strong>Year 1 Launch:</strong> Essentials tier available Q1 2026 for WBC3 workboat operators.
            Professional and Enterprise tiers coming 2027-2028.
          </p>

          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
            {/* ESSENTIALS TIER - Available Q1 2026 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg ring-2" style={{ borderColor: '#0891B2' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-bold text-white" style={{ backgroundColor: '#0891B2' }}>
                  Launching Q1 2026
                </span>
              </div>

              {/* Tier Name & Tagline */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1" style={{ color: '#0E1A2B' }}>
                  Essentials
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#0891B2' }}>
                  Available Q1 2026
                </p>
              </div>

              {/* Vessel Pricing */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: '#6B7280' }}>1 vessel:</span>
                  <span className="text-lg font-bold" style={{ color: '#0E1A2B' }}>
                    £30<span className="text-xs font-normal ml-1" style={{ color: '#6B7280' }}>/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: '#6B7280' }}>2-3 vessels:</span>
                  <span className="text-lg font-bold" style={{ color: '#0E1A2B' }}>
                    £60<span className="text-xs font-normal ml-1" style={{ color: '#6B7280' }}>/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: '#6B7280' }}>4-6 vessels:</span>
                  <span className="text-lg font-bold" style={{ color: '#0E1A2B' }}>
                    £100<span className="text-xs font-normal ml-1" style={{ color: '#6B7280' }}>/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: '#6B7280' }}>7-10 vessels:</span>
                  <span className="text-lg font-bold" style={{ color: '#0E1A2B' }}>
                    £150<span className="text-xs font-normal ml-1" style={{ color: '#6B7280' }}>/month</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm mb-6 pb-6 border-b border-gray-200" style={{ color: '#6B7280' }}>
                Perfect for workboat operators needing WBC3 compliance
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>SMS framework & document library</span>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>Equipment tracking & maintenance</span>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>Basic crew management</span>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>Risk assessments</span>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>Offline-first mobile & web apps</span>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>Self-service customization</span>
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                  <span>Email support</span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/waitlist"
                className="block w-full rounded-xl px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
                style={{ backgroundColor: '#0891B2' }}
              >
                Join Beta Waitlist
              </Link>

              {/* Early Bird */}
              <p className="mt-4 text-center text-xs flex items-center justify-center gap-1" style={{ color: '#0891B2' }}>
                <Gift className="h-4 w-4" /> Beta waitlist members get 50% off first year
              </p>
            </div>

            {/* PROFESSIONAL TIER - Coming 2027 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg ring-1 ring-gray-200/50 opacity-75">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-bold bg-gray-400 text-white">
                  Coming 2027
                </span>
              </div>

              {/* Tier Name & Tagline */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1" style={{ color: '#0E1A2B' }}>
                  Professional
                </h3>
                <p className="text-sm font-semibold text-gray-500">
                  Coming 2027
                </p>
              </div>

              {/* Vessel Pricing */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">1 vessel:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £100<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">2-3 vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £150<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">4-6 vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £200<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">7-10 vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £300<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm mb-6 pb-6 border-b border-gray-200 text-gray-600">
                For fishing vessels, small coasters, and ferry operators (ISM/DSM compliance)
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Everything in Essentials, plus:</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Drill planning & management</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Incident reporting</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Hours of Rest tracking</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Training matrix</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Maintenance forecasting</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Priority support</span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/waitlist"
                className="block w-full rounded-xl px-6 py-3 text-center text-base font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
                style={{ color: '#0E1A2B' }}
              >
                Join Waitlist
              </Link>
            </div>

            {/* ENTERPRISE TIER - Coming 2028 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg ring-1 ring-gray-200/50 opacity-75">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-bold bg-gray-400 text-white">
                  Coming 2028
                </span>
              </div>

              {/* Tier Name & Tagline */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1" style={{ color: '#0E1A2B' }}>
                  Enterprise
                </h3>
                <p className="text-sm font-semibold text-gray-500">
                  Coming 2028
                </p>
              </div>

              {/* Vessel Pricing */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">1-10 vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £400<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">11-25 vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £800<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">26-50 vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    £1,200<span className="text-xs font-normal ml-1 text-gray-500">/month</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">50+ vessels:</span>
                  <span className="text-lg font-bold text-gray-700">
                    Custom<span className="text-xs font-normal ml-1 text-gray-500">pricing</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm mb-6 pb-6 border-b border-gray-200 text-gray-600">
                For merchant vessels and 10+ vessel fleets
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Everything in Professional, plus:</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>ISM audit preparation</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>White-label options</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" strokeWidth={2} />
                  <span>24/7 phone support</span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/waitlist"
                className="block w-full rounded-xl px-6 py-3 text-center text-base font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
                style={{ color: '#0E1A2B' }}
              >
                Join Waitlist
              </Link>
            </div>
          </div>

          {/* Guarantee */}
          <p className="mt-12 text-center text-sm" style={{ color: '#6B7280' }}>
            Cancel anytime. No long-term contracts.
          </p>
        </div>
      </div>

      {/* Need It Now Section */}
      <div className="py-24" style={{ backgroundColor: '#F0EDEB' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Need Compliance NOW?
            </h2>
            <p className="mt-6 text-lg leading-8" style={{ color: '#6B7280' }}>
              Can&apos;t wait for the app? Get your SMS built today with our consultancy service.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/consultancy"
                className="rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
                style={{ backgroundColor: '#c65d00' }}
              >
                SMS Consultancy (from £1,500)
              </Link>
            </div>
            <p className="mt-6 text-sm" style={{ color: '#6B7280' }}>
              Get your SMS built now → Transition to the digital app when it launches Q1 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
