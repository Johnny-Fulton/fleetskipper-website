'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { Radio, Settings, Smartphone, Check, BarChart3, Flag } from 'lucide-react'

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        // Redirect to thank-you page
        window.location.href = '/thank-you'
      } else {
        alert(result.message || 'Failed to join waitlist. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to join waitlist. Please email info@fleetskipper.com directly.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      {/* Transparent Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative bg-navy py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/workboats/workboat-14-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/70" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-sea-teal/10 px-3 py-1 text-sm font-medium text-sea-teal ring-1 ring-inset ring-sea-teal/20 backdrop-blur-sm" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' }}>
                Coming Soon
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              SeaReady App: Digital SMS Management
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/90">
              Offline-first SMS management platform for modern workboat operators
            </p>
          </div>
        </div>
      </div>

      {/* Screenshot Preview */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
            <Image
              src="/SMS_Risk.png"
              alt="SeaReady App Preview"
              width={1200}
              height={800}
              className="w-full"
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Early preview of the SeaReady app interface
          </p>
        </div>
      </div>

      {/* Value Props */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              SMS Management, Simplified
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Everything you need to manage your SMS, optimized for life at sea
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Radio className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Works Offline at Sea</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Full functionality without internet. Data syncs automatically when you&apos;re back in range.
                      No more waiting to log drills or incidents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Settings className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pre-Configured for Your Vessel</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      System knows exactly what applies to your vessel type and operations. No generic templates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Smartphone className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Mobile-Optimized for Crew</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Works on phones and tablets. Crew can log drills, defects, and hours of rest from anywhere.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Check className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Automatic Compliance Tracking</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Hours of Rest compliance, certificate expiry alerts, maintenance due dates. All automatic.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <BarChart3 className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">One-Click Reports</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Generate inspection-ready reports instantly. Everything MCA inspectors need in seconds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Flag className="h-8 w-8" style={{ color: '#0891B2' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Built for UK Workboats</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      WBC3 and IWC compliant from day one. Not generic international software adapted for UK.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Contact us for pricing information
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
            <Check className="h-4 w-4" /> Launch special benefits for waitlist members
          </div>
        </div>
      </div>

      {/* Waitlist Form */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Join the Waitlist
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get early access when we launch. Plus exclusive benefits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-900">
                Company (optional)
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
              />
            </div>

            <div>
              <label htmlFor="vessel_count" className="block text-sm font-medium text-gray-900">
                Number of vessels <span className="text-red-500">*</span>
              </label>
              <select
                id="vessel_count"
                name="vessel_count"
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
              >
                <option value="">Select...</option>
                <option value="1">1 vessel</option>
                <option value="2-5">2-5 vessels</option>
                <option value="6-10">6-10 vessels</option>
                <option value="10+">10+ vessels</option>
              </select>
            </div>

            <div>
              <label htmlFor="excited_about" className="block text-sm font-medium text-gray-900">
                What are you most excited about?
              </label>
              <select
                id="excited_about"
                name="excited_about"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
              >
                <option value="Offline capability">Offline capability</option>
                <option value="Mobile access">Mobile access for crew</option>
                <option value="Compliance tracking">Automatic compliance tracking</option>
                <option value="Crew management">Crew & certificate management</option>
                <option value="Everything">Everything!</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-brand-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#c65d00' }}
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 space-y-2">
              <p className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4" style={{ color: '#0891B2' }} /> Early access when we launch
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4" style={{ color: '#0891B2' }} /> Special launch pricing
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4" style={{ color: '#0891B2' }} /> Free migration from current system
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4" style={{ color: '#0891B2' }} /> Priority onboarding
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <dl className="space-y-8">
          <div>
            <dt className="text-lg font-semibold text-gray-900">When will the app launch?</dt>
            <dd className="mt-2 text-gray-600">
              We&apos;re in active development. Waitlist members will get first access when we&apos;re ready to launch.
              We&apos;ll keep you updated on progress.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-semibold text-gray-900">Can I use the app now?</dt>
            <dd className="mt-2 text-gray-600">
              Not yet. But you can get your SMS built via our consultancy service today! When the app launches,
              we&apos;ll help you migrate your SMS into the digital platform.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-semibold text-gray-900">How much will it cost?</dt>
            <dd className="mt-2 text-gray-600">
              Contact us for pricing information. Waitlist members will receive special early access benefits.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-semibold text-gray-900">Will it really work offline?</dt>
            <dd className="mt-2 text-gray-600">
              Yes. Full offline functionality is core to the product. You can log drills, defects, and maintenance
              at sea. Everything syncs automatically when you&apos;re back in range.
            </dd>
          </div>
        </dl>
      </div>

      {/* CTA to Consultancy */}
      <div className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Need SMS Now?
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              Don&apos;t wait for the app. Get your WBC3-compliant SMS built via consultancy today.
            </p>
            <div className="mt-8">
              <Link
                href="/consultancy"
                className="inline-flex rounded-full px-8 py-4 text-base font-semibold text-white shadow-sm ring-2 ring-white hover:bg-white hover:text-navy transition"
              >
                Request Consultancy Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
