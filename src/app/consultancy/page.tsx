'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'

export default function ConsultancyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/consultancy', {
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
        alert(result.message || 'Failed to submit request. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to submit request. Please email support@seaready.co.uk directly.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarTransparent />

      {/* Hero Section with Image */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/workboats/sunset-workboat.jpg"
          alt="UK workboat operations at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get Your Custom SMS Quote
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/95">
              Tell us about your vessel and operations. We&apos;ll send you a detailed quote within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div id="quote-form" className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <p className="mt-2 text-sm text-gray-600">How can we reach you?</p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                  placeholder="+44 7xxx xxxxxx"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-900">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                  placeholder="Your Company Ltd"
                />
              </div>
            </div>
          </div>

          {/* Vessel Information */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900">Vessel Information</h2>
            <p className="mt-2 text-sm text-gray-600">Tell us about your vessel(s)</p>

            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="vessel_count" className="block text-sm font-medium text-gray-900">
                  I need SMS for: <span className="text-red-500">*</span>
                </label>
                <select
                  id="vessel_count"
                  name="vessel_count"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                >
                  <option value="">Select number of vessels...</option>
                  <option value="1">1 vessel</option>
                  <option value="2-3">2-3 vessels</option>
                  <option value="4-10">4-10 vessels</option>
                  <option value="10+">10+ vessels</option>
                </select>
              </div>

              <div>
                <label htmlFor="vessel_type" className="block text-sm font-medium text-gray-900">
                  Vessel Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="vessel_type"
                  name="vessel_type"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                >
                  <option value="">Select vessel type...</option>
                  <option value="CTV">Crew Transfer Vessel (CTV)</option>
                  <option value="Survey">Survey Vessel</option>
                  <option value="Dive Support">Dive Support Vessel</option>
                  <option value="Tug">Tug</option>
                  <option value="Passenger">Passenger Vessel</option>
                  <option value="Pilot">Pilot Boat</option>
                  <option value="General Workboat">General Workboat</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="wbc3_category" className="block text-sm font-medium text-gray-900">
                  WBC3 Category (if known)
                </label>
                <select
                  id="wbc3_category"
                  name="wbc3_category"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                >
                  <option value="">Select category...</option>
                  <option value="Cat 0">Category 0</option>
                  <option value="Cat 1">Category 1</option>
                  <option value="Cat 2">Category 2</option>
                  <option value="Cat 3">Category 3</option>
                  <option value="Cat 4">Category 4</option>
                  <option value="Cat 5">Category 5</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>
            </div>
          </div>

          {/* Operations */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900">Operations</h2>
            <p className="mt-2 text-sm text-gray-600">Do you have any specialized operations?</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="ops_diving"
                    name="ops_diving"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sea-teal focus:ring-sea-teal"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="ops_diving" className="text-sm font-medium text-gray-900">
                    Diving Operations
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="ops_lifting"
                    name="ops_lifting"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sea-teal focus:ring-sea-teal"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="ops_lifting" className="text-sm font-medium text-gray-900">
                    Lifting Operations
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="ops_towing"
                    name="ops_towing"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sea-teal focus:ring-sea-teal"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="ops_towing" className="text-sm font-medium text-gray-900">
                    Towing Operations
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="ops_passenger"
                    name="ops_passenger"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sea-teal focus:ring-sea-teal"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="ops_passenger" className="text-sm font-medium text-gray-900">
                    Passenger Operations
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="additional_details" className="block text-sm font-medium text-gray-900">
                  Additional Details
                </label>
                <textarea
                  id="additional_details"
                  name="additional_details"
                  rows={4}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sea-teal focus:ring-sea-teal sm:text-sm px-4 py-3 border"
                  placeholder="Any other information that would help us prepare your quote..."
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900">Timeline</h2>
            <p className="mt-2 text-sm text-gray-600">When do you need your SMS?</p>

            <div className="mt-6">
              <fieldset>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="timeline_urgent"
                      name="timeline"
                      type="radio"
                      value="Next 2 weeks"
                      className="h-4 w-4 border-gray-300 text-sea-teal focus:ring-sea-teal"
                    />
                    <label htmlFor="timeline_urgent" className="ml-3 block text-sm font-medium text-gray-900">
                      Next 2 weeks (urgent)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="timeline_month"
                      name="timeline"
                      type="radio"
                      value="Next month"
                      defaultChecked
                      className="h-4 w-4 border-gray-300 text-sea-teal focus:ring-sea-teal"
                    />
                    <label htmlFor="timeline_month" className="ml-3 block text-sm font-medium text-gray-900">
                      Within the next month
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="timeline_quarter"
                      name="timeline"
                      type="radio"
                      value="1-3 months"
                      className="h-4 w-4 border-gray-300 text-sea-teal focus:ring-sea-teal"
                    />
                    <label htmlFor="timeline_quarter" className="ml-3 block text-sm font-medium text-gray-900">
                      1-3 months
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="timeline_exploring"
                      name="timeline"
                      type="radio"
                      value="Just exploring"
                      className="h-4 w-4 border-gray-300 text-sea-teal focus:ring-sea-teal"
                    />
                    <label htmlFor="timeline_exploring" className="ml-3 block text-sm font-medium text-gray-900">
                      Just exploring options
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>✓ Your information is secure</p>
                <p>✓ No commitment required</p>
                <p>✓ Response within 24 hours</p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-full bg-brand-orange px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-brand-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#c65d00' }}
              >
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
              </button>
            </div>
          </div>
        </form>

        {/* Trust Elements */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            Questions? Email us at <a href="mailto:support@seaready.co.uk" className="font-semibold text-sea-teal hover:underline">support@seaready.co.uk</a>
          </p>
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
