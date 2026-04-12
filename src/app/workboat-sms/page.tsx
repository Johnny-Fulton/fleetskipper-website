import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import { workboatContent } from '@/content/workboat-strings'
import {
  Ship,
  Anchor,
  ChartLine,
  Wrench,
  Building2,
  Bolt,
  CheckCircle,
  FileText,
  Banknote,
  Smartphone,
  Wand2,
  FileStack,
  WifiOff,
  Bell,
  Settings,
  type LucideIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: workboatContent.meta.title,
  description: workboatContent.meta.description,
}

export default function WorkboatSMSPage() {
  // Icon mappings for Vessel Types section
  const vesselIcons: Record<number, LucideIcon> = {
    0: Ship,         // Crew Transfer Vessels
    1: ChartLine,    // Survey & Hydrographic
    2: Wrench,       // Dive Support
    3: Anchor,       // Tugs & Pilot Boats
    4: Building2,    // Construction Support
  }

  // Icon mappings for Why Us section
  const whyUsIcons: Record<number, LucideIcon> = {
    0: Anchor,       // Real Maritime Experience
    1: Bolt,         // Fast 2-4 Week Turnaround
    2: CheckCircle,  // WBC3 Ed.3 Compliant
    3: FileText,     // Vessel-Specific Documentation
    4: Banknote,     // Transparent Pricing
    5: Smartphone,   // Digital Future-Ready
  }

  // Icon mappings for Digital SMS features
  const digitalSMSIcons: Record<number, LucideIcon> = {
    0: Wand2,        // WBC3 Setup Wizard
    1: FileStack,    // Pre-loaded WBC3 Templates
    2: WifiOff,      // Offline-First Design
    3: Bell,         // Auto Compliance Tracking
    4: Settings,     // Enterprise Customization
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* HERO - Image Background with Overlay */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/workboat-24-hero.jpg"
          alt="UK workboat operations - WBC3 compliance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-[#c65d00] px-4 py-2 text-sm font-semibold text-white">
                {workboatContent.hero.badge}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {workboatContent.hero.h1}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              {workboatContent.hero.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/consultancy"
                className="rounded-full bg-[#c65d00] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#a84f00] transition-colors"
              >
                {workboatContent.hero.ctaPrimary}
              </Link>
              <a
                href="#how-it-works"
                className="rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white ring-2 ring-white hover:bg-white/20 transition-colors"
              >
                {workboatContent.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* URGENCY BANNER - Moved to bottom of hero */}
      <div className="bg-[#c65d00] py-3">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-white">
            {workboatContent.hero.urgencyBanner}
          </p>
        </div>
      </div>

      {/* VESSEL TYPES */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.vesselTypes.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {workboatContent.vesselTypes.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {workboatContent.vesselTypes.subtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workboatContent.vesselTypes.types.map((type, index) => {
              const Icon = vesselIcons[index]
              return (
                <div key={index} className="flex flex-col items-center text-center bg-white rounded-2xl p-10 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Icon - No Circle, Just Bold Icon */}
                  <Icon className="w-16 h-16 mb-6" color="#0E1A2B" strokeWidth={1.5} />
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0E1A2B' }}>{type.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{type.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* DEADLINE SECTION */}
      <div className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.deadline.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {workboatContent.deadline.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/90">
              {workboatContent.deadline.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {workboatContent.deadline.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold" style={{ color: '#0891B2' }}>{stat.value}</div>
                <div className="mt-2 text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="mx-auto max-w-3xl">
            <ul className="space-y-4">
              {workboatContent.deadline.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0891B2' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/95">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.whyUs.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {workboatContent.whyUs.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {workboatContent.whyUs.subtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workboatContent.whyUs.items.map((item, index) => {
              const Icon = whyUsIcons[index]
              return (
                <div key={index} className="flex flex-col items-center text-center bg-white rounded-2xl p-10 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Icon - No Circle, Just Bold Icon */}
                  <Icon className="w-16 h-16 mb-6" color="#0891B2" strokeWidth={1.5} />
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0E1A2B' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.howItWorks.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {workboatContent.howItWorks.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              {workboatContent.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workboatContent.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full text-white text-xl font-bold mb-6" style={{ backgroundColor: '#c65d00' }}>
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/80 mb-3">{step.description}</p>
                {step.timeline && (
                  <p className="text-xs font-semibold" style={{ color: '#0891B2' }}>⏱️ {step.timeline}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/consultancy"
              className="inline-flex rounded-full px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: '#c65d00' }}
            >
              {workboatContent.howItWorks.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.included.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {workboatContent.included.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {workboatContent.included.subtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {workboatContent.included.packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl p-10 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl">
                {/* Category Header */}
                <div className="mb-8 pb-6 border-b" style={{ borderColor: '#E5E7EB' }}>
                  <h3 className="text-2xl font-bold text-center" style={{ color: '#0E1A2B' }}>{pkg.category}</h3>
                </div>
                {/* Items List */}
                <ul className="space-y-4">
                  {pkg.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0891B2' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm leading-relaxed" style={{ color: '#4B535D' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.testimonials.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-white">
              {workboatContent.testimonials.title}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {workboatContent.testimonials.items.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10">
                {/* Quote */}
                <div className="mb-6">
                  <svg className="w-10 h-10 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#0891B2' }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-white/90 text-base leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/70">{testimonial.company}</p>
                  <p className="text-xs text-white/50 mt-1">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIGITAL SMS - App Block */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.digitalSMS.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {workboatContent.digitalSMS.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {workboatContent.digitalSMS.subtitle}
            </p>
          </div>

          {/* Two-column grid: Tablet mockup (left) + Features (right) */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Tablet Mockup Placeholder */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-md">
                {/* Placeholder for tablet image - user will provide photo */}
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl ring-1 ring-white/10 flex items-center justify-center">
                  <div className="text-center px-6">
                    <Smartphone className="w-16 h-16 mx-auto mb-4 text-white/40" />
                    <p className="text-white/60 text-sm">Tablet mockup image placeholder</p>
                    <p className="text-white/40 text-xs mt-2">Image: Person holding tablet with app screenshot</p>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0891B2]/20 to-[#c65d00]/20 blur-3xl -z-10 opacity-50" />
              </div>
            </div>

            {/* Right: Features Grid (2x2) */}
            <div className="grid gap-6 sm:grid-cols-2">
              {workboatContent.digitalSMS.features.map((feature, index) => {
                const Icon = digitalSMSIcons[index]
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {/* Icon */}
                    <Icon className="w-10 h-10 mb-4" color="#0891B2" strokeWidth={1.5} />

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#0E1A2B' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className="mb-6 space-y-2">
              <p className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
                {workboatContent.digitalSMS.pricing}
              </p>
              <p className="text-sm font-medium" style={{ color: '#0891B2' }}>
                {workboatContent.digitalSMS.earlyBird}
              </p>
            </div>

            <Link
              href={workboatContent.digitalSMS.ctaLink}
              className="inline-flex items-center rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#0891B2' }}
            >
              {workboatContent.digitalSMS.cta}
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <p className="mt-6 text-sm" style={{ color: '#6B7280' }}>
              {workboatContent.digitalSMS.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {workboatContent.faq.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {workboatContent.faq.title}
            </h2>
          </div>

          <dl className="space-y-6">
            {workboatContent.faq.items.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-lg">
                <dt className="text-lg font-bold mb-4" style={{ color: '#0E1A2B' }}>{item.question}</dt>
                <dd className="text-base leading-relaxed" style={{ color: '#4B535D' }}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/sunset-workboat.jpg"
          alt="UK workboat at sunset - ready for WBC3 compliance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#0891B2' }}>
              {workboatContent.finalCta.eyebrow}
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              {workboatContent.finalCta.title}
            </h2>
            <p className="text-xl text-white/95 mb-8">
              {workboatContent.finalCta.subtitle}
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {workboatContent.finalCta.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0891B2' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs - 3-Button Layout */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {/* Primary CTA - Consultancy (Dominant) */}
              <Link
                href="/consultancy"
                className="w-full sm:w-auto rounded-full px-12 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105"
                style={{ backgroundColor: '#c65d00' }}
              >
                {workboatContent.finalCta.cta}
              </Link>

              {/* Secondary CTAs - Side by Side */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/waitlist"
                  className="w-full sm:w-auto rounded-full px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
                  style={{ backgroundColor: '#0891B2' }}
                >
                  Join App Waitlist
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto rounded-full bg-white/10 backdrop-blur-sm px-8 py-3 text-base font-semibold text-white ring-2 ring-white hover:bg-white/20 transition-colors"
                >
                  {workboatContent.finalCta.secondaryCta}
                </Link>
              </div>
            </div>

            {/* Urgency */}
            <p className="text-sm font-semibold" style={{ color: '#0891B2' }}>
              {workboatContent.finalCta.urgency}
            </p>
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
