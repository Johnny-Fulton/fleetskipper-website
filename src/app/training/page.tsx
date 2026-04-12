import NavBarSolid from '@/components/navbar-solid'
import { Footer } from '@/components/Footer'
import { trainingContent } from '@/content/training-strings'
import {
  FireIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  LanguageIcon,
  ArrowPathIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const iconMap = {
  FireIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  LanguageIcon,
  ArrowPathIcon,
}

export default function TrainingPage() {
  return (
    <div className="bg-white">
      <NavBarSolid />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-900">
              {trainingContent.hero.badge}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {trainingContent.hero.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {trainingContent.hero.subtitle}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {trainingContent.hero.credibility}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#waitlist"
                className="rounded-md bg-[#c65d00] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#a04e00] transition-colors"
              >
                {trainingContent.hero.ctaPrimary}
              </a>
              <a
                href="#whats-included"
                className="text-base font-semibold leading-6 text-gray-900 hover:text-[#0891B2] transition-colors"
              >
                {trainingContent.hero.ctaSecondary} <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-600">
              {trainingContent.hero.proofPoint}
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-[#0891B2]">
              {trainingContent.comingSoon.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trainingContent.comingSoon.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {trainingContent.comingSoon.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl">
            <div className="space-y-4">
              {trainingContent.comingSoon.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-[#14b8a6]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Waitlist Section */}
      <div id="waitlist" className="bg-[#0891B2] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {trainingContent.comingSoon.emailCapture.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">
              {trainingContent.comingSoon.emailCapture.subtitle}
            </p>
          </div>

          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder={trainingContent.comingSoon.emailCapture.placeholder}
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-[#c65d00] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#a04e00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              {trainingContent.comingSoon.emailCapture.buttonText}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-blue-100">
            {trainingContent.comingSoon.emailCapture.privacyNote}
          </p>
        </div>
      </div>

      {/* What's Included Section */}
      <div id="whats-included" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-[#0891B2]">
              {trainingContent.whatWeOffer.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trainingContent.whatWeOffer.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {trainingContent.whatWeOffer.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {trainingContent.whatWeOffer.categories.map((category) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                return (
                  <div
                    key={category.name}
                    className="relative rounded-2xl border border-gray-200 p-8 hover:border-[#0891B2] transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {IconComponent && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0891B2]">
                          <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-[#c65d00] font-semibold">
                          {category.pricing}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <p className="text-sm text-gray-500 mb-3">Examples:</p>
                    <ul className="space-y-2">
                      {category.examples.slice(0, 3).map((example, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-600">
                          <span className="text-[#14b8a6]">✓</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-gray-500 italic">{category.priceNote}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-[#0891B2]">
              {trainingContent.howItWorks.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trainingContent.howItWorks.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {trainingContent.howItWorks.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {trainingContent.howItWorks.steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0891B2] text-xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-[#0891B2]">
              {trainingContent.pricing.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trainingContent.pricing.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {trainingContent.pricing.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {trainingContent.pricing.priceRanges.map((range, index) => (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-gray-200 p-8 text-center hover:border-[#0891B2] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{range.category}</h3>
                  <p className="mt-4 text-4xl font-bold text-[#0891B2]">{range.price}</p>
                  <p className="mt-4 text-sm text-gray-600">{range.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              {trainingContent.pricing.note}
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose SeaReady */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-[#0891B2]">
              {trainingContent.whyChoose.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trainingContent.whyChoose.title}
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {trainingContent.whyChoose.items.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap]
                return (
                  <div key={item.title} className="flex gap-4">
                    {IconComponent && (
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0891B2]">
                          <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-[#0891B2]">
              {trainingContent.faq.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trainingContent.faq.title}
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <dl className="space-y-8">
              {trainingContent.faq.items.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <dt className="text-lg font-semibold text-gray-900 mb-3">
                    {item.question}
                  </dt>
                  <dd className="text-gray-600">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#0891B2]">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-blue-100">
              {trainingContent.finalCta.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {trainingContent.finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              {trainingContent.finalCta.subtitle}
            </p>

            <div className="mt-8 space-y-3">
              {trainingContent.finalCta.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-white">
                  <svg className="h-5 w-5 text-[#14b8a6]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#waitlist"
                className="rounded-md bg-[#c65d00] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#a04e00] transition-colors"
              >
                {trainingContent.finalCta.cta}
              </a>
            </div>

            <p className="mt-8 text-sm text-blue-100">
              {trainingContent.finalCta.note}{' '}
              <Link href={trainingContent.finalCta.consultancyLink} className="font-semibold text-white hover:text-blue-200 transition-colors">
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
