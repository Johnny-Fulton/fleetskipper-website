import {
  SiteFooter
} from '@/components/primitives'
import NavbarTransparent from '@/components/navbar-transparent'
import { copy } from '@/content/strings'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle,
  FileText,
  Server,
  Wrench
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'SafeDeck Maritime - Maritime Safety Solutions Built by Mariners',
  description: 'SafeDeck Maritime provides maritime safety management systems, compliance software, and custom maritime solutions for vessels and harbour operations.',
  openGraph: {
    title: 'SafeDeck Maritime - Maritime Safety Solutions Built by Mariners',
    description: 'Professional SMS, compliance software, and custom maritime solutions. Built by mariners for ports, pilots, and vessel operators.',
    url: 'https://seaready.co.uk',
    siteName: 'SafeDeck Maritime',
    images: [
      {
        url: 'https://seaready-website.vercel.app/images/home-hero-ship.jpg',
        width: 1200,
        height: 630,
        alt: 'Commercial vessel at sea - SeaReady maritime solutions',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeDeck Maritime - Maritime Safety Solutions Built by Mariners',
    description: 'Professional SMS, compliance software, and custom maritime solutions for the maritime industry.',
    images: ['https://seaready-website.vercel.app/images/home-hero-ship.jpg'],
  },
}

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative isolate min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/home-hero-ship.jpg"
          alt="Commercial vessel at sea"
          fill
          priority
          className="object-cover object-[right_center]"
          sizes="100vw"
          quality={75}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/30" />

        {/* Navigation */}
        <NavbarTransparent />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-44 pb-24 sm:pt-52 sm:pb-32 lg:px-8 lg:pt-60 lg:pb-48">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Maritime Solutions Built by Mariners
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              Professional safety management solutions for the maritime industry.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="#offerings"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#0891B2' }}
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: '2px solid white' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
      {/* EMPX FEATURED SECTION */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#f9fafb' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Featured Solution Heading */}
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#0891B2' }}>
              Featured Solution
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Device Mockup */}
            <div className="order-1 lg:order-1 flex justify-center lg:justify-end">
              <div className="w-4/5 lg:w-3/4 relative">
                <Image
                  src="/images/empx/tablet-mockup.png"
                  alt="SeaReady eMPX Master/Pilot Exchange on tablet showing digital signatures"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto"
                  style={{
                    filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))'
                  }}
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-2 lg:order-2">
              {/* Product Name */}
              <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0E1A2B' }}>
                SafeDeckOS | Pilot
              </h3>

              {/* Tagline */}
              <p className="text-xl mb-6" style={{ color: '#6B7280' }}>
                Electronic Master Pilot Exchange
              </p>

              {/* Description */}
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#4B535D' }}>
                Digital pilot exchange with direct PMIS integration.
              </p>

              {/* Feature Bullets */}
              <dl className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <dt className="text-base" style={{ color: '#4B535D' }}>Integrates directly with harbour PMIS systems</dt>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <dt className="text-base" style={{ color: '#4B535D' }}>Digital Master Pilot Exchange (replaces paper)</dt>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <dt className="text-base" style={{ color: '#4B535D' }}>Analytics and reporting</dt>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                  <dt className="text-base" style={{ color: '#4B535D' }}>Audit trail of all exchanges</dt>
                </div>
              </dl>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Request Consultation
                </Link>
                <Link
                  href="/products/empx"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:bg-cyan-50"
                  style={{ color: '#0891B2', border: '2px solid #0891B2' }}
                >
                  Find Out More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CORE OFFERINGS SECTION */}
      <section id="offerings" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              What We Offer
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: '#0E1A2B' }}>
              Three Core Maritime Solutions
            </p>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Professional maritime services tailored to your operational needs
            </p>
          </div>

          {/* Three Offerings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">

            {/* 1. Custom Maritime Software - MOVED TO FIRST */}
            <div className="rounded-2xl border-2 p-8 hover:border-[#0891B2] transition-colors flex flex-col" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-center mb-6">
                <Wrench className="h-20 w-20" style={{ color: '#0891B2', strokeWidth: 1.5 }} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: '#0E1A2B', minHeight: '56px' }}>
                Maritime Software<br />
                for Ports & Pilots
              </h3>
              <div className="mb-6" style={{ height: '144px' }}>
                <p className="text-base" style={{ color: '#6B7280' }}>
                  Custom maritime software including SafeDeckOS | Pilot (Electronic Master/Pilot Exchange) for harbour authorities and pilot organisations. Supporting PMSC compliance and Marine Safety Management Systems (MSMS).
                </p>
              </div>
              <div className="p-3 rounded-lg mb-6" style={{ backgroundColor: '#f0fdfa', minHeight: '84px' }}>
                <p className="text-xs font-semibold" style={{ color: '#0E1A2B' }}>For:</p>
                <p className="text-sm" style={{ color: '#4B535D' }}>Harbour authorities, pilot organizations, port operators</p>
              </div>
              <div className="mt-auto">
                <Link
                  href="/products/empx"
                  className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Request Consultation
                </Link>
              </div>
            </div>

            {/* 2. SMS Documentation Service */}
            <div className="rounded-2xl border-2 p-8 hover:border-[#0891B2] transition-colors flex flex-col" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-center mb-6">
                <FileText className="h-20 w-20" style={{ color: '#0891B2', strokeWidth: 1.5 }} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: '#0E1A2B', minHeight: '56px' }}>
                Maritime Compliance<br />
                Consultation
              </h3>
              <div className="mb-6" style={{ height: '144px' }}>
                <p className="text-base" style={{ color: '#6B7280' }}>
                  SMS consultation for ISM/WBC3 compliance. Development of complete documentation, gap analysis and audit preparation.
                </p>
              </div>
              <div className="p-3 rounded-lg mb-6" style={{ backgroundColor: '#f0fdfa', minHeight: '84px' }}>
                <p className="text-xs font-semibold" style={{ color: '#0E1A2B' }}>For:</p>
                <p className="text-sm" style={{ color: '#4B535D' }}>Workboat and merchant vessel operators who need SMS built</p>
              </div>
              <div className="mt-auto">
                <Link
                  href="/consultancy"
                  className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Get Quote
                </Link>
              </div>
            </div>

            {/* 3. SMS Management Systems */}
            <div className="rounded-2xl border-2 p-8 hover:border-[#0891B2] transition-colors flex flex-col" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center justify-center mb-6">
                <Server className="h-20 w-20" style={{ color: '#0891B2', strokeWidth: 1.5 }} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: '#0E1A2B', minHeight: '56px' }}>
                Digital SMS Management<br />
                from Deck to Office
              </h3>
              <div className="mb-6" style={{ height: '144px' }}>
                <p className="text-base" style={{ color: '#6B7280' }}>
                  SafeDeckOS Suite provides complete digital SMS management. SafeDeckOS | Ops for recording vessel operations and SafeDeckOS | Audit for managing documentation and compliance verification. From deck to office - operations and policies together.
                </p>
              </div>
              <div className="p-3 rounded-lg mb-6" style={{ backgroundColor: '#f0fdfa', minHeight: '84px' }}>
                <p className="text-xs font-semibold" style={{ color: '#0E1A2B' }}>For:</p>
                <p className="text-sm" style={{ color: '#4B535D' }}>Vessel operators managing their own safety systems</p>
              </div>
              <div className="mt-auto">
                <Link
                  href="/products/sms-suite"
                  className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-gray-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-6 text-white">
              Built By Mariners, For Mariners
            </h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-center text-lg leading-relaxed text-gray-300">
                Founded by a Master Mariner and working Marine Pilot with 20+ years maritime experience.
              </p>
              <p className="text-center text-sm mt-4 text-gray-400">
                SafeDeck Maritime, Office 1581, 92 Castle Street, Belfast, BT1 1HE
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#0891B2' }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Who We Work With
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              SafeDeck supports vessel operators across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Merchant Vessels - Top Row */}
            <div className="rounded-xl p-6 border-2 hover:border-[#0891B2] transition-all duration-200 hover:shadow-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 flex-none mt-1" style={{ color: '#0891B2' }} />
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#0E1A2B' }}>Merchant Vessels</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>ISM Code compliance</p>
                </div>
              </div>
            </div>

            {/* Pilot Organisations - Top Row */}
            <div className="rounded-xl p-6 border-2 hover:border-[#0891B2] transition-all duration-200 hover:shadow-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 flex-none mt-1" style={{ color: '#0891B2' }} />
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#0E1A2B' }}>Pilot Organisations</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Custom pilot exchange and operational systems</p>
                </div>
              </div>
            </div>

            {/* Harbour Authorities - Top Row */}
            <div className="rounded-xl p-6 border-2 hover:border-[#0891B2] transition-all duration-200 hover:shadow-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 flex-none mt-1" style={{ color: '#0891B2' }} />
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#0E1A2B' }}>Harbour Authorities</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>PMSC-compliant marine safety systems</p>
                </div>
              </div>
            </div>

            {/* Workboats - Bottom Row */}
            <div className="rounded-xl p-6 border-2 hover:border-[#0891B2] transition-all duration-200 hover:shadow-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 flex-none mt-1" style={{ color: '#0891B2' }} />
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#0E1A2B' }}>Workboats</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>WBC3 compliance and safety management systems</p>
                </div>
              </div>
            </div>

            {/* Fishing Vessels - Bottom Row */}
            <div className="rounded-xl p-6 border-2 hover:border-[#0891B2] transition-all duration-200 hover:shadow-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 flex-none mt-1" style={{ color: '#0891B2' }} />
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#0E1A2B' }}>Fishing Vessels</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Commercial fishing safety management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SEAREADY */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Why Choose SafeDeck Maritime?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Maritime expertise combined with practical technology solutions
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <dl className="space-y-6">
              <div className="flex gap-x-4">
                <CheckCircle className="h-7 w-7 flex-none" style={{ color: '#0891B2' }} />
                <div>
                  <dt className="text-lg font-semibold text-white">Built by a working Master Mariner</dt>
                  <dd className="mt-1 text-gray-300">
                    Solutions built by a mariner who understands your operations
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircle className="h-7 w-7 flex-none" style={{ color: '#0891B2' }} />
                <div>
                  <dt className="text-lg font-semibold text-white">Real Maritime Experience</dt>
                  <dd className="mt-1 text-gray-300">
                    20+ years in maritime operations, safety management, and compliance
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircle className="h-7 w-7 flex-none" style={{ color: '#0891B2' }} />
                <div>
                  <dt className="text-lg font-semibold text-white">Practical Solutions</dt>
                  <dd className="mt-1 text-gray-300">
                    Tools designed for real operations, not theoretical compliance
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircle className="h-7 w-7 flex-none" style={{ color: '#0891B2' }} />
                <div>
                  <dt className="text-lg font-semibold text-white">Fast, Personal Support</dt>
                  <dd className="mt-1 text-gray-300">
                    Direct access to maritime experts who understand your operations
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW SECTION */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              {copy.blogTeaser.eyebrow}
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight" style={{ color: '#0E1A2B' }}>
              {copy.blogTeaser.title}
            </p>
            <p className="mt-6 text-lg" style={{ color: '#6B7280' }}>
              {copy.blogTeaser.sub}
            </p>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.blogTeaser.articles.map((article, idx) => (
              <Link
                key={idx}
                href={article.href}
                className="group flex flex-col overflow-hidden rounded-xl transition-all duration-200 hover:-translate-y-1"
                style={{ border: '1px solid #D3D5D6', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
              >
                {/* Article Image */}
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 p-6 bg-white">
                  {/* Category & Read Time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold" style={{ color: '#0891B2' }}>
                      {article.category}
                    </span>
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>•</span>
                    <span className="text-xs" style={{ color: '#6B7280' }}>
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-sea-teal transition-colors" style={{ color: '#0E1A2B' }}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: '#6B7280' }}>
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#0891B2' }}>
                    Read Article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-12 text-center">
            <Link
              href={copy.blogTeaser.ctaHref}
              className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: '#0891B2',
                border: '2px solid #0891B2'
              }}
            >
              {copy.blogTeaser.cta}
            </Link>
          </div>

        </div>
      </section>

      {/* CLOSING CTA SECTION */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#0E1A2B' }}>
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Whether you need a complete SMS build, digital compliance tools, or custom maritime software solutions, we&apos;re here to help.
            </p>
          </div>

          <div className="mx-auto mt-10 flex justify-center gap-4">
            <Link
              href="#offerings"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0891B2' }}
            >
              Explore Solutions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:opacity-90"
              style={{ color: '#0891B2', border: '2px solid #0891B2' }}
            >
              Contact Us
            </Link>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: '#6B7280' }}>
            Whether you&apos;re facing WBC3, ISM Code, or flag state compliance requirements - we&apos;re here to help.
          </p>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <SiteFooter
        product={copy.footer.product}
        company={copy.footer.company}
        resources={copy.footer.resources}
        legal={copy.footer.legal}
        copyright={copy.footer.copyright}
      />
    </>
  )
}
