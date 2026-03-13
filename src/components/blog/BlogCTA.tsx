/**
 * BlogCTA Component
 *
 * Reusable call-to-action block for inline use within blog posts.
 * Supports different variants and layouts.
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export interface BlogCTAProps {
  title: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  variant?: 'default' | 'compact' | 'highlight'
  className?: string
}

export function BlogCTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
  className = '',
}: BlogCTAProps) {
  const variants = {
    default: 'bg-cyan-50 border-2 border-cyan-100',
    compact: 'bg-gray-50 border-l-4 border-cyan-500',
    highlight: 'bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200',
  }

  const padding = variant === 'compact' ? 'p-6' : 'p-8'

  return (
    <div className={`rounded-2xl ${variants[variant]} ${padding} ${className} my-8`}>
      <h3 className="text-xl font-bold mb-3 text-navy-900">{title}</h3>
      <p className="mb-6 text-body-text leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-4">
        <Link
          href={primaryButton.href}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-cta-orange shadow-sm hover:bg-opacity-90 transition-all"
        >
          {primaryButton.text}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondaryButton && (
          <Link
            href={secondaryButton.href}
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-cyan px-6 py-3 text-sm font-semibold text-primary-cyan hover:bg-cyan-50 transition-all"
          >
            {secondaryButton.text}
          </Link>
        )}
      </div>
    </div>
  )
}

/**
 * Predefined CTA variants for common use cases
 */

export function EMPXProductCTA({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 p-8 my-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left 2/3 - Text content */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-4 text-navy-900">
            Ready to Modernize Your Pilot Operations?
          </h3>
          <p className="mb-6 text-body-text leading-relaxed text-lg">
            SeaReady eMPX is the digital Master/Pilot Exchange platform designed by pilots, for pilots. Transform your MPX process with a solution that understands your operational reality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products/master-pilot-exchange"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-cta-orange shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all"
            >
              Learn About SeaReady eMPX
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-cyan px-6 py-3 text-sm font-semibold text-primary-cyan hover:bg-cyan-50 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right 1/3 - Phone mockup */}
        <div className="lg:col-span-1 hidden lg:flex justify-center items-center">
          <div
            className="relative"
            style={{
              transform: 'rotate(-5deg)',
            }}
          >
            <Image
              src="/images/empx/phone-hero-jobs.png"
              alt="SeaReady eMPX jobs dashboard showing active pilot operations"
              width={280}
              height={560}
              className="w-full max-w-[280px]"
              style={{
                filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.25))',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function WorkboatSMSProductCTA({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 p-8 my-8 ${className}`}>
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold mb-4 text-navy-900">
          Stay Ahead of Your Next Audit
        </h3>
        <p className="mb-6 text-body-text leading-relaxed text-lg">
          SeaReady SMS is the complete digital Safety Management System for workboats. Meet WBC3 requirements with confidence and stay audit-ready every day.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/products/workboat-sms"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-cta-orange shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all"
          >
            Explore SeaReady SMS
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-cyan px-6 py-3 text-sm font-semibold text-primary-cyan hover:bg-cyan-50 transition-all"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ContactCTA({ className }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-gray-50 border-l-4 border-primary-cyan p-6 my-8 ${className}`}>
      <div className="max-w-2xl">
        <h3 className="text-xl font-bold mb-3 text-navy-900">Have Questions?</h3>
        <p className="mb-4 text-body-text leading-relaxed">
          Our team is here to help you understand how SeaReady can transform your maritime operations.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-cta-orange shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all"
        >
          Get in Touch
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
