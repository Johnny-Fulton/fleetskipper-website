import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import NavbarLight from '@/components/navbar-light'
import { SiteFooter } from '@/components/primitives'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'SeaReady Blog | Maritime Industry Insights',
  description: 'Industry insights, compliance updates, and maritime technology perspectives from SeaReady experts.',
}

export default function BlogPage() {
  // Load blog posts from markdown files
  const allPosts = getAllBlogPosts()

  // Format posts for display
  const blogPosts = allPosts.map(post => ({
    slug: post.slug,
    title: post.metadata.title,
    excerpt: post.metadata.excerpt || '',
    author: post.metadata.author,
    role: post.metadata.role,
    date: post.metadata.date,
    readTime: post.metadata.readTime,
    category: post.metadata.category,
    featured: post.slug === 'mpx-clipboard-to-digital', // Featured post
    image: post.metadata.cardImage || post.metadata.heroImage, // Use cardImage for cards
    heroImage: post.metadata.heroImage,
  }))

  const footerContent = {
    product: {
      heading: 'Products',
      links: ['SeaReady eMPX', 'SeaReady App', 'Features', 'Pricing'],
    },
    company: {
      heading: 'Company',
      links: ['About', 'Contact'],
    },
    resources: {
      heading: 'Resources',
      links: ['Blog', 'Case Studies'],
      urls: ['/blog', '/case-studies'],
    },
    legal: {
      heading: 'Legal',
      links: ['Privacy Policy', 'Terms of Service'],
      urls: ['/privacy', '/terms'],
    },
    copyright: '© 2024 SeaReady. All rights reserved.',
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarLight />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0891B2' }}>
              Industry Insights
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: '#0E1A2B' }}>
              SeaReady Blog
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: '#4B535D' }}>
              Maritime compliance, technology, and operational insights from industry experts
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.slug} className="mb-16">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: '#0891B2' }}>
                    Featured
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={post.image || post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Featured Content */}
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="font-medium" style={{ color: '#0891B2' }}>{post.category}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time>{new Date(post.date).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B535D' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold" style={{ color: '#0E1A2B' }}>{post.author}</p>
                        <p className="text-sm text-gray-600">{post.role}</p>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                        style={{ color: '#0891B2' }}
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.filter(post => !post.featured).map(post => (
              <article key={post.slug} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#0891B2' }}>
                      {post.category}
                    </p>
                    <div className="mt-2 block">
                      <h3 className="text-xl font-semibold" style={{ color: '#0E1A2B' }}>
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-base text-gray-600">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <time>{new Date(post.date).toLocaleDateString('en-UK', { day: 'numeric', month: 'short' })}</time>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold hover:underline"
                      style={{ color: '#0891B2' }}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message (when only 1 post) */}
          {blogPosts.length === 1 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-gray-50 p-12">
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#0E1A2B' }}>More Insights Coming Soon</h3>
                  <p className="text-sm text-gray-600">We&apos;re working on more industry insights and compliance guides.</p>
                  <p className="text-sm text-gray-600 mt-1">Check back regularly or subscribe to our newsletter.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold" style={{ color: '#0E1A2B' }}>Stay Informed</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get the latest maritime compliance updates and industry insights delivered to your inbox.
            </p>
            <form className="mt-8 flex gap-4 mx-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm focus:border-cyan-600 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-full px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: '#c65d00' }}
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