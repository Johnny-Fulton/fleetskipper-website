import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { SiteFooter } from '@/components/primitives'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | FleetSkipper Maritime Consultancy',
  description: 'Maritime compliance insights, WBC3 guidance, and industry updates from FleetSkipper experts.',
}

// Simple blog post data - just the essentials
const blogPosts = [
  {
    slug: 'what-is-wbc3',
    title: 'What is WBC3 and Does My Vessel Need It?',
    excerpt: 'A comprehensive guide to the Workboat Code Edition 3, covering what it is, which vessels need it, and the December 2026 transition deadline.',
    date: '2025-04-18',
    category: 'WBC3 Compliance',
    image: '/images/workboats/workboat-01-hero.jpg',
  },
  {
    slug: 'how-to-get-wbc3-certified',
    title: 'How to Get Your Workboat Certified Under WBC3 — Step by Step',
    excerpt: 'A practical step-by-step guide to getting your workboat WBC3 certified, from choosing a Certifying Authority to receiving your certificate.',
    date: '2025-04-18',
    category: 'WBC3 Compliance',
    image: '/images/workboats/tugboat-hero-clean.jpg',
  },
  {
    slug: 'wbc3-area-categories',
    title: 'WBC3 Area Categories Explained — Cat 0 to Cat 6',
    excerpt: 'Understanding WBC3 area categories and how they determine your equipment requirements, crew qualifications, and operational limits.',
    date: '2025-04-18',
    category: 'WBC3 Compliance',
    image: '/images/workboats/navigation-sunrise-large.jpg',
  },
  {
    slug: 'wbc3-crew-qualifications',
    title: 'WBC3 Crew Qualifications — What Your Crew Actually Need',
    excerpt: 'A definitive guide to WBC3 crew qualification requirements, covering mandatory certificates, Master qualifications by category, and common misconceptions.',
    date: '2025-04-18',
    category: 'WBC3 Compliance',
    image: '/images/workboats/crew-operations-large.jpg',
  },
  {
    slug: 'keeping-wbc3-certificate-valid',
    title: 'Keeping Your Workboat Certificate Valid — The WBC3 Examination Cycle',
    excerpt: 'Understanding the WBC3 examination cycle: annual examinations, intermediate out-of-water surveys, and 5-year renewal requirements.',
    date: '2025-04-18',
    category: 'WBC3 Compliance',
    image: '/images/workboats/crew-safety-large.jpg',
  },
  {
    slug: 'pilot-ladder-safety-ukmpa-guide',
    title: 'Pilot Ladder Safety: Why the UKMPA\'s New Interactive Guide Matters',
    excerpt: 'An in-depth look at the UKMPA\'s new interactive pilot ladder guide, the 2025 SOLAS regulation changes, and what operators must do before the 2028 deadline.',
    date: '2025-03-13',
    category: 'Safety & Operations',
    image: '/images/blog/pilot-ladder-hero-final.jpg',
  },
  {
    slug: 'workboat-code-3-sms-guide',
    title: 'Workboat Code Edition 3: SMS Requirements Explained',
    excerpt: 'A comprehensive breakdown of WBC3 Safety Management System requirements, mandatory sections, and practical implementation guidance.',
    date: '2025-03-13',
    category: 'WBC3 Compliance',
    image: '/images/workboats/sunset-workboat-large.jpg',
  },
]

const footerContent = {
  product: {
    heading: 'Services',
    links: ['Consultancy', 'Tools', 'Resources'],
    urls: ['/services', '/tools', '/resources'],
  },
  company: {
    heading: 'Company',
    links: ['About', 'Contact'],
    urls: ['/about', '/contact'],
  },
  resources: {
    heading: 'Resources',
    links: ['Blog', 'WBC3 Checker', 'Crew Checker'],
    urls: ['/blog', '/tools/wbc3-checker', '/tools/crew-checker'],
  },
  legal: {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Service'],
    urls: ['/privacy', '/terms'],
  },
  copyright: '© 2025 FleetSkipper Maritime Consultancy. All rights reserved.',
}

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-teal-600">
              Industry Insights
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              FleetSkipper Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Maritime compliance, WBC3 guidance, and operational insights from industry experts
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white border border-gray-200"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-teal-600">{post.category}</p>
                    <div className="mt-2 block">
                      <h3 className="text-xl font-semibold text-gray-900">
                        <Link href={`/blog/${post.slug}`} className="hover:text-teal-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-base text-gray-600">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <time>
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 hover:gap-2 transition-all"
                    >
                      Read
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Stay Informed</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get the latest maritime compliance updates and industry insights delivered to your inbox.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 mx-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-orange px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter {...footerContent} />
    </div>
  )
}
