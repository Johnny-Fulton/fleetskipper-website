import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'

export const metadata: Metadata = {
  title: 'About SeaReady | Maritime Software Built by Mariners',
  description: 'Maritime software and compliance solutions from people who actually work at sea. Custom software, consultation, and digital tools for ports, pilots, and vessel operators.',
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* HERO - Simple Photo with White Text Overlay */}
      <div className="relative isolate overflow-hidden">
        <Image
          src="/images/pexels-george-bek-255210-18597927.jpg"
          alt="Merchant vessel at sea - professional maritime operations"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built by Mariners, For Mariners
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Maritime software and compliance solutions from people who actually work at sea
            </p>
          </div>
        </div>
      </div>

      {/* WHO WE ARE */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Left */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0E1A2B]">Who We Are</h2>
              <div className="space-y-4 text-lg leading-8 text-gray-700">
                <p>
                  SeaReady is a maritime software and compliance company founded by a Master Mariner with over 20 years of experience in commercial shipping and marine pilotage.
                </p>
                <p>
                  We&apos;re not consultants who learned from textbooks. We&apos;re working mariners who understand operational reality—from the wheelhouse to the surveyor&apos;s office.
                </p>
              </div>
            </div>

            {/* Photo Right */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[400px]">
              <img
                src="/images/pilot-boat-maritime-experience.jpg"
                alt="Maritime professional at UK port - real operational environment"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="relative z-10 flex items-end h-full p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Real Maritime Experience</h3>
                  <p className="mt-2 text-white/90">Founded by professionals who&apos;ve navigated UK waters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT WE DO - Three Capabilities */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0E1A2B]">What We Do</h2>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              SeaReady delivers practical maritime solutions across three areas
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* 1. Custom Maritime Software */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="mb-6">
                <svg className="w-12 h-12 text-[#0891B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Custom Maritime Software</h3>
              <p className="text-gray-700 mb-4">
                We design and build bespoke software for ports, pilots, and harbour authorities. SeaReady eMPX™ and other custom solutions solve real maritime challenges through pilot exchange systems, vessel analytics, and operational data integration.
              </p>
              <p className="text-sm text-gray-600">
                Our software integrates with existing systems (PMIS, harbour databases, operational platforms) to streamline workflows and improve decision-making.
              </p>
            </div>

            {/* 2. Maritime Compliance Consultation */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="mb-6">
                <svg className="w-12 h-12 text-[#0891B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Maritime Compliance Consultation</h3>
              <p className="text-gray-700 mb-4">
                We help UK vessel operators navigate WBC3 and ISM Code compliance with safety management systems that actually work at sea.
              </p>
              <p className="text-sm text-gray-600">
                Not generic templates. Not fill-in-the-blanks. Custom-built SMS frameworks based on proven maritime practices and regulatory requirements.
              </p>
            </div>

            {/* 3. Digital Compliance Management */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="mb-6">
                <svg className="w-12 h-12 text-[#0891B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Digital Compliance Management</h3>
              <p className="text-gray-700 mb-4">
                SeaReady SMS Suite™ provides complete digital SMS management from deck to office. SeaReady Deck™ for recording vessel operations and SeaReady Office™ for managing SMS documentation and compliance verification.
              </p>
              <p className="text-sm text-gray-600">
                Built specifically for WBC3 Edition 3 and ISM Code compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY WE'RE DIFFERENT - Enhanced with visual elements */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0E1A2B]">Why We&apos;re Different</h2>
            <p className="mt-4 text-lg text-gray-600">
              Real maritime expertise meets sophisticated software development
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {/* Operational Experience */}
            <div className="relative rounded-2xl bg-gradient-to-br from-cyan-50 to-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0891B2] shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Operational Experience</h3>
              <p className="text-gray-700 leading-relaxed">
                Our founder is a working Master Mariner and Marine Pilot. When we build software or advise on compliance, it&apos;s informed by decades of real-world maritime operations, not theoretical consulting.
              </p>
            </div>

            {/* Technical Capability */}
            <div className="relative rounded-2xl bg-gradient-to-br from-teal-50 to-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#14b8a6] shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Technical Capability</h3>
              <p className="text-gray-700 leading-relaxed">
                We don&apos;t just understand maritime operations—we build sophisticated software. From API integrations to real-time data processing, we have the technical depth to deliver solutions that work.
              </p>
            </div>

            {/* Practical Focus */}
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#3b82f6] shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Practical Focus</h3>
              <p className="text-gray-700 leading-relaxed">
                We&apos;ve experienced the challenges you face: MCA inspections, system integrations that &quot;almost work,&quot; compliance documentation that doesn&apos;t match operational reality. Our solutions are built to solve these real problems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHO WE SERVE - Reordered with visual enhancements */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0E1A2B]">Who We Serve</h2>
            <p className="mt-4 text-lg text-gray-600">
              Practical solutions for the maritime industry
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {/* 1. Merchant Vessel Operators - FIRST */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0891B2]/10 to-transparent rounded-bl-full" />
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#0891B2]/10">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Merchant Vessel Operators</h3>
                <p className="text-gray-700 leading-relaxed">
                  ISM Code compliance support and safety management system development.
                </p>
              </div>
            </div>

            {/* 2. Ports & Harbours - SECOND */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#14b8a6]/10 to-transparent rounded-bl-full" />
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#14b8a6]/10">
                    <svg className="w-6 h-6 text-[#14b8a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">Ports & Harbours</h3>
                <p className="text-gray-700 leading-relaxed">
                  Custom software for pilot exchange, harbour analytics, and operational coordination.
                </p>
              </div>
            </div>

            {/* 3. UK Workboat Operators - LAST */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3b82f6]/10 to-transparent rounded-bl-full" />
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#3b82f6]/10">
                    <svg className="w-6 h-6 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0E1A2B] mb-4">UK Workboat Operators</h3>
                <p className="text-gray-700 leading-relaxed">
                  WBC3 Edition 3 compliance guidance and digital SMS tools for the Dec 2026 deadline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOUNDER BIO */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Photo Left */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[500px] lg:order-first">
              <img
                src="/images/founder-photo.jpg"
                alt="Founder - Master Mariner & Marine Pilot"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end h-full p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Our Founder</h3>
                  <p className="mt-2 text-white/95 font-semibold">Master Mariner & Marine Pilot</p>
                </div>
              </div>
            </div>

            {/* Bio Right */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0E1A2B]">Leadership & Experience</h2>
              <div className="space-y-4 text-lg leading-8 text-gray-700">
                <p>
                  With over 20 years in commercial shipping and marine pilotage, our founder established SeaReady to bridge the gap between maritime operations and modern technology.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#0E1A2B]">Qualifications & Experience:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#14b8a6] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Master Mariner (Unlimited)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#14b8a6] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Marine Pilot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#14b8a6] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>20+ years commercial shipping experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#14b8a6] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>WBC3 Edition 3 specialist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#14b8a6] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>ISM Code and safety management expertise</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 pt-4">
                SeaReady was built after years of seeing maritime operators struggle with generic consulting advice and software that doesn&apos;t understand operational reality. Every solution we deliver is informed by real-world experience at sea and in port operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OUR MISSION */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0E1A2B] mb-6">Our Mission</h2>
          <p className="text-xl leading-8 text-gray-700">
            To help maritime operators navigate compliance and operational challenges with practical solutions built by people who understand your world.
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Because the best maritime solutions come from mariners who&apos;ve been there.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/sunset-workboat.jpg"
          alt="Professional maritime operations at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Work With Us
            </h2>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Get maritime solutions built by professionals who understand your world.
            </p>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#c65d00] px-10 py-5 text-lg font-semibold text-white shadow-2xl hover:bg-[#a84f00] transition-colors"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
