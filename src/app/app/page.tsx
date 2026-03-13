import type { Metadata } from 'next'
import Link from 'next/link'
import { appContent } from '@/content/app-strings'
import { copy } from '@/content/strings'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import {
  Users,
  Wrench,
  Bell,
  Clock,
  Shield,
  Clipboard,
  WifiOff,
  RefreshCw,
  Smartphone,
  Lock,
  CheckCircle,
  ArrowRight,
  type LucideIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: appContent.meta.title,
  description: appContent.meta.description,
}

export default function AppPage() {
  // Icon mappings for core features
  const featureIcons: Record<string, LucideIcon> = {
    users: Users,
    wrench: Wrench,
    bell: Bell,
    clock: Clock,
    shield: Shield,
    clipboard: Clipboard,
  }

  // Icon mappings for offline features
  const offlineIcons: Record<string, LucideIcon> = {
    'wifi-off': WifiOff,
    refresh: RefreshCw,
    smartphone: Smartphone,
    lock: Lock,
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* HERO - Clean, feature-focused */}
      <div className="relative isolate overflow-hidden" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold" style={{ backgroundColor: '#f59e0b', color: 'white' }}>
                {appContent.hero.badge}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {appContent.hero.h1}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg leading-8 text-white/80">
              {appContent.hero.subtitle}
            </p>

            {/* Credibility */}
            <p className="mt-4 text-sm font-medium" style={{ color: '#0891B2' }}>
              {appContent.hero.credibility}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/waitlist"
                className="rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
                style={{ backgroundColor: '#0891B2' }}
              >
                {appContent.hero.ctaPrimary}
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white ring-2 ring-white hover:bg-white/20 transition-colors"
              >
                {appContent.hero.ctaSecondary}
              </Link>
            </div>

            {/* Proof Point */}
            <p className="mt-8 text-sm text-white/60">
              {appContent.hero.proofPoint}
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20" style={{ width: '800px', height: '800px', background: 'radial-gradient(circle, #0891B2 0%, transparent 70%)' }}></div>
        </div>
      </div>

      {/* CORE FEATURES - 2x3 Grid */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.coreFeatures.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {appContent.coreFeatures.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {appContent.coreFeatures.subtitle}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {appContent.coreFeatures.features.map((feature, index) => {
              const Icon = featureIcons[feature.icon]
              return (
                <div key={index} className="relative bg-white rounded-2xl p-8 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sea-teal/10 to-brand-orange/10">
                      <Icon className="h-7 w-7" color="#0891B2" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0E1A2B' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: '#4B535D' }}>
                        <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* OFFLINE-FIRST - Dark Background */}
      <div className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.offlineFirst.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-white">
              {appContent.offlineFirst.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              {appContent.offlineFirst.subtitle}
            </p>
          </div>

          {/* Offline Features - 4 Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {appContent.offlineFirst.features.map((feature, index) => {
              const Icon = offlineIcons[feature.icon]
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10">
                  <Icon className="h-10 w-10 mb-4" color="#0891B2" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/70">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CUSTOMIZATION - 3 Tiers */}
      <div id="customization" className="py-24" style={{ backgroundColor: '#F0EDEB' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.customization.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {appContent.customization.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {appContent.customization.subtitle}
            </p>
          </div>

          {/* Customization Tiers */}
          <div className="grid gap-8 lg:grid-cols-3">
            {appContent.customization.tiers.map((tier, index) => (
              <div key={index} className="relative bg-white rounded-2xl p-8 shadow-md ring-1 ring-gray-200/50">
                {/* Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                    tier.badge === 'Included in £29/mo'
                      ? 'bg-gradient-to-r from-sea-teal to-blue-500 text-white'
                      : tier.badge === 'Optional Add-On'
                      ? 'bg-gradient-to-r from-brand-orange to-red-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#0E1A2B' }}>
                  {tier.title}
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#c65d00' }}
            >
              {appContent.customization.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* UNIVERSAL COMPLIANCE - Regulations & Vessel Types */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.universalCompliance.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {appContent.universalCompliance.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {appContent.universalCompliance.subtitle}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Regulations */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A2B' }}>
                Regulatory Frameworks
              </h3>
              <div className="space-y-4">
                {appContent.universalCompliance.regulations.map((reg, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-200/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold" style={{ color: '#0E1A2B' }}>{reg.name}</h4>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        reg.status === 'Built-in'
                          ? 'bg-green-100 text-green-800'
                          : reg.status === 'Customizable'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {reg.status}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      {reg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vessel Types */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A2B' }}>
                Works For All Vessel Types
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200/50">
                <ul className="space-y-4">
                  {appContent.universalCompliance.vesselTypes.map((type, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#0891B2' }}></div>
                      <span className="font-medium" style={{ color: '#0E1A2B' }}>{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS - 4 Steps */}
      <div id="how-it-works" className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.howItWorks.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-white">
              {appContent.howItWorks.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              {appContent.howItWorks.subtitle}
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {appContent.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line (hidden on last item) */}
                {index < appContent.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-white/20 -translate-x-1/2"></div>
                )}

                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-white/10">
                  {/* Number Badge */}
                  <div className="mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full font-bold text-white text-xl" style={{ backgroundColor: '#0891B2' }}>
                      {step.number}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-4">
                    {step.description}
                  </p>

                  {/* Timeline */}
                  <p className="text-xs font-semibold" style={{ color: '#0891B2' }}>
                    {step.timeline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#0891B2' }}
            >
              {appContent.howItWorks.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* PRICING - 2 Tiers */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.pricing.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {appContent.pricing.title}
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: '#6B7280' }}>
              {appContent.pricing.subtitle}
            </p>
          </div>

          {/* Early Bird Banner */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center rounded-full px-6 py-3 text-base font-semibold" style={{ backgroundColor: '#f59e0b', color: 'white' }}>
              {appContent.pricing.earlyBird}
            </div>
          </div>

          {/* Pricing Tiers */}
          {/* Note about tiers */}
          {'note' in appContent.pricing && (
            <p className="text-center mb-8 text-base" style={{ color: '#6B7280' }}>
              {appContent.pricing.note}
            </p>
          )}

          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
            {appContent.pricing.tiers.map((tier, index: number) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-lg ${tier.highlight ? 'ring-2' : 'ring-1 ring-gray-200/50'}`} style={tier.highlight ? { borderColor: '#0891B2' } : {}}>
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-bold bg-gradient-to-r from-sea-teal to-blue-500 text-white">
                      Launching Q1 2026
                    </span>
                  </div>
                )}

                {/* Tier Name & Tagline */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#0E1A2B' }}>
                    {tier.name}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: '#0891B2' }}>
                    {tier.tagline}
                  </p>
                </div>

                {/* Vessel Pricing */}
                <div className="mb-6 space-y-2">
                  {tier.vesselPricing.map((pricing, idx: number) => (
                    <div key={idx} className="flex justify-between items-baseline">
                      <span className="text-sm" style={{ color: '#6B7280' }}>{pricing.vessels}:</span>
                      <span className="text-lg font-bold" style={{ color: '#0E1A2B' }}>
                        {pricing.price}
                        <span className="text-xs font-normal ml-1" style={{ color: '#6B7280' }}>
                          /{pricing.period}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm mb-6 pb-6 border-b border-gray-200" style={{ color: '#6B7280' }}>
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: '#4B535D' }}>
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" color="#0891B2" strokeWidth={2} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.cta === 'Join Waitlist' || tier.cta === 'Join Beta Waitlist' ? '/waitlist' : '/contact'}
                  className={`block w-full rounded-xl px-6 py-3 text-center text-base font-semibold transition-all ${
                    tier.highlight
                      ? 'text-white shadow-lg hover:scale-105'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={tier.highlight ? { backgroundColor: '#0891B2', color: 'white' } : { color: '#0E1A2B' }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <p className="mt-8 text-center text-sm" style={{ color: '#6B7280' }}>
            {appContent.pricing.guarantee}
          </p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.testimonials.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-white">
              {appContent.testimonials.title}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {appContent.testimonials.items.map((testimonial, index) => (
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

      {/* FAQ */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              {appContent.faq.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#0E1A2B' }}>
              {appContent.faq.title}
            </h2>
          </div>

          <dl className="space-y-6">
            {appContent.faq.items.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-lg">
                <dt className="text-lg font-bold mb-4" style={{ color: '#0E1A2B' }}>{item.question}</dt>
                <dd className="text-base leading-relaxed" style={{ color: '#6B7280' }}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="py-24" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#0891B2' }}>
              {appContent.finalCta.eyebrow}
            </p>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {appContent.finalCta.title}
            </h2>
            <p className="text-lg text-white/80 mb-10">
              {appContent.finalCta.subtitle}
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {appContent.finalCta.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0891B2' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/waitlist"
                className="w-full sm:w-auto rounded-full px-12 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105"
                style={{ backgroundColor: '#0891B2' }}
              >
                {appContent.finalCta.cta}
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white ring-2 ring-white hover:bg-white/20 transition-colors"
              >
                {appContent.finalCta.secondaryCta}
              </Link>
            </div>

            {/* Note */}
            <p className="text-sm text-white/60 italic max-w-2xl mx-auto">
              {appContent.finalCta.note}
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
