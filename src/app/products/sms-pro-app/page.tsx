import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'SMS Pro App - Vessel Operations Management | SeaReady',
  description: 'Real-time operational compliance tracking for vessel crews. Dashboard, drills, equipment, crew management, defects, risk assessments, and incidents. Mobile-optimized with offline capability.',
}

export default function SMSProAppPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/crew-operations-card.jpg"
          alt="Vessel operations and crew management"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              SMS Pro App
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Vessel Operations Management
            </p>
            <p className="mt-4 text-lg text-white/85">
              Real-time compliance tracking that works at sea - online or offline
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
              Real-Time Operational Compliance Tracking
            </p>
            <p className="mt-6 text-lg" style={{ color: '#6B7280' }}>
              The SMS Pro App is a mobile-optimized digital platform designed for vessel crews and shore managers. Track drills, manage equipment, monitor crew qualifications, log defects, conduct risk assessments, and report incidents - all in real-time with full offline capability.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#ecfeff', border: '2px solid #0891B2' }}>
              <p className="text-center text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                Works 100% Offline at Sea
              </p>
              <p className="mt-2 text-center" style={{ color: '#6B7280' }}>
                The SMS Pro App syncs automatically when you&apos;re back online. No internet connection required for daily operations.
              </p>
            </div>
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
              Everything vessel crews need for operational compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Dashboard
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Real-time overview of vessel compliance status, upcoming tasks, and overdue items
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Drills
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Plan, schedule, and log safety drills with automatic reminders for upcoming requirements
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Equipment
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Track equipment inventory, maintenance schedules, and inspection records
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Crew
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Manage crew qualifications, certificates, medical fitness, and training records
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Defects
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Log defects, track repairs, and manage corrective actions with photo evidence
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Risk Assessments
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Create and update dynamic risk assessments for operations and activities
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Incidents
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Report and investigate incidents with structured investigation tools
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Biometric Login
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Secure, instant access with Face ID, Touch ID, Windows Hello, or fingerprint - no passwords to remember or share
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Mobile-Optimized
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Designed for phones and tablets - works on iOS, Android, and web browsers
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                  Offline Capability
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Full functionality without internet - automatic sync when connection restored
              </p>
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
              Built for the people who keep vessels operating safely every day
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <dl className="space-y-4">
              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Vessel Crews</dt>
                  <dd style={{ color: '#6B7280' }}>Skippers, engineers, and deck crew managing daily operations</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Shore Managers</dt>
                  <dd style={{ color: '#6B7280' }}>Operations managers overseeing fleet compliance from the office</dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon className="h-6 w-6 flex-none" style={{ color: '#14b8a6' }} />
                <div>
                  <dt className="font-semibold" style={{ color: '#0E1A2B' }}>Fleet Operators</dt>
                  <dd style={{ color: '#6B7280' }}>Multi-vessel operators needing real-time visibility across their fleet</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg p-8 text-center" style={{ backgroundColor: '#ecfeff', border: '2px solid #0891B2' }}>
              <h2 className="text-2xl font-bold" style={{ color: '#0E1A2B' }}>
                Availability
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#4B535D' }}>
                The SMS Pro App is available now. Contact us for access and pricing information.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Contact Us for Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Ready to Transform Your Vessel Operations?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Get in touch to learn more about the SMS Pro App and how it can streamline your compliance tracking
            </p>
          </div>

          <div className="mx-auto mt-10 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0891B2' }}
            >
              Contact Us
            </Link>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: '#6B7280' }}>
            Questions? Email us at <a href="mailto:info@fleetskipper.com" className="font-semibold" style={{ color: '#0891B2' }}>info@fleetskipper.com</a>
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
