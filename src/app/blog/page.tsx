import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Calendar, ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | FleetSkipper Maritime Consultancy',
  description: 'WBC3 compliance guides, maritime regulations, and operational insights for UK workboat operators.',
}

// The 5 WBC3 blog posts
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
    title: 'How to Get Your Workboat Certified Under WBC3',
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
    title: 'Keeping Your Workboat Certificate Valid',
    excerpt: 'Understanding the WBC3 examination cycle: annual examinations, intermediate out-of-water surveys, and 5-year renewal requirements.',
    date: '2025-04-18',
    category: 'WBC3 Compliance',
    image: '/images/workboats/crew-safety-large.jpg',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navigation />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative mt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
          <div className="absolute inset-0 bg-[url('/images/home-hero-ship.jpg')] opacity-5 bg-cover bg-center" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-sm">Maritime Compliance Guides</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
                FleetSkipper Blog
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                WBC3 compliance guides and maritime operational insights for UK workboat operators
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors leading-tight">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
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
                          className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700 hover:gap-2 transition-all"
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-cyan-600 to-cyan-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Need Help With WBC3 Compliance?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Get expert guidance on SMS documentation, audits, and ongoing compliance support from a Master Mariner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  View Services →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
