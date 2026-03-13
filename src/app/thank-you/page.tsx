import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | SafeDeck Maritime',
  description: 'Thank you for contacting SafeDeck Maritime. We\'ll be in touch within 24 hours.',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavbarTransparent />

      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thank You!
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your message has been received successfully. We&apos;ll review your request and get back to you within 24 hours.
          </p>

          {/* What Happens Next */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-cyan-600">1</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong className="font-semibold text-gray-900">We review your request</strong>
                    <br />
                    <span className="text-sm">Our team will carefully review your requirements and vessel details.</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-cyan-600">2</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong className="font-semibold text-gray-900">We&apos;ll contact you</strong>
                    <br />
                    <span className="text-sm">You&apos;ll receive a response via email within 24 hours (typically much sooner).</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-cyan-600">3</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong className="font-semibold text-gray-900">We help you get compliant</strong>
                    <br />
                    <span className="text-sm">Whether you need a bespoke SMS build or our digital platform, we&apos;ll find the right solution.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Return to Home
            </Link>
            <Link
              href="/products/sms-suite"
              className="rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Learn More About Our Services
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              Need to reach us urgently?
            </p>
            <p className="mt-2">
              <a
                href="mailto:support@seaready.co.uk"
                className="text-cyan-600 hover:text-cyan-700 font-semibold"
              >
                support@seaready.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
