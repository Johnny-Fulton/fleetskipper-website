'use client'

import { useState } from 'react'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { ClipboardList, Smartphone } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    console.log('Form submission started') // Debug log

    // Save form reference before async operation (currentTarget becomes null after async)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      // Check if response is OK first
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Parsed result:', result)

      if (result.success) {
        // Redirect to thank-you page
        window.location.href = '/thank-you'
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please email support@seaready.co.uk directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section with Sea Background */}
      <div className="relative overflow-hidden">
        <img
          src="/images/workboats/sunset-workboat.jpg"
          alt="Professional maritime operations at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get In Touch
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/90">
              We&apos;re here to help with your maritime software and compliance needs
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Quick Options */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link
              href="/consultancy"
              className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition"
            >
              <div className="mb-3">
                <ClipboardList className="h-10 w-10" style={{ color: '#0891B2' }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">SMS Consultancy</h3>
              <p className="mt-2 text-sm text-gray-600">
                Request a quote for bespoke SMS build
              </p>
              <p className="mt-4 text-sm font-semibold text-sea-teal">
                Request Quote →
              </p>
            </Link>

            <Link
              href="/waitlist"
              className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition"
            >
              <div className="mb-3">
                <Smartphone className="h-10 w-10" style={{ color: '#0891B2' }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Join App Waitlist</h3>
              <p className="mt-2 text-sm text-gray-600">
                Get early access to the digital platform
              </p>
              <p className="mt-4 text-sm font-semibold text-sea-teal">
                Join Waitlist →
              </p>
            </Link>
          </div>

          {/* General Contact Form */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">General Inquiries</h2>
            <p className="mt-2 text-sm text-gray-600">
              For other questions or support
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`rounded-lg p-4 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                </div>
              )}

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

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                >
                  <option value="SeaReady eMPX™ Quote">SeaReady eMPX™ Quote</option>
                  <option value="SMS Consultancy Quote">SMS Consultancy Quote</option>
                  <option value="SMS Suite Information Request">SMS Suite Information Request</option>
                  <option value="General Question">General Question</option>
                  <option value="Partnership Inquiry">Partnership Inquiry</option>
                  <option value="Press / Media">Press / Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-brand-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#c65d00' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Direct Contact */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900">Email Us Directly</h3>
            <p className="mt-2 text-gray-600">
              <a href="mailto:support@seaready.co.uk" className="font-semibold text-sea-teal hover:underline">
                support@seaready.co.uk
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
