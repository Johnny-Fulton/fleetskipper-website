/**
 * BlogPost Component
 *
 * Comprehensive blog post layout with:
 * - Proper typography with SeaReady brand colors
 * - Enhanced prose configuration for tables, code blocks, blockquotes
 * - Print-friendly styles
 * - Responsive design
 * - Author bio section
 * - Related posts section
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import type { BlogPostMetadata } from '@/lib/markdown'
import { BlogAuthor, AuthorBioSection, type AuthorInfo } from './BlogAuthor'

export interface BlogPostProps {
  metadata: BlogPostMetadata
  content: string
  author: AuthorInfo
  relatedPosts?: Array<{
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
  }>
  children?: React.ReactNode
}

export function BlogPost({
  metadata,
  content,
  author,
  relatedPosts,
  children,
}: BlogPostProps) {
  return (
    <article className="bg-white">
      {/* Hero Image - positioned directly under navbar */}
      <div className="relative h-[400px] lg:h-[500px] w-full bg-gray-900 -mt-px">
          <Image
            src={metadata.heroImage}
            alt={metadata.title}
            fill
            className="object-cover opacity-80"
            style={{ objectPosition: 'center 30%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-cyan hover:text-cyan-700 hover:gap-3 transition-all mb-8 mt-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-body-text mb-6">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-cyan-50 text-primary-cyan">
            {metadata.category}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={metadata.date}>
              {new Date(metadata.date).toLocaleDateString('en-UK', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{metadata.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="blog-post-title">{metadata.title}</h1>

        {/* Author */}
        <BlogAuthor author={author} className="my-8" />

        {/* Article Content */}
        <div className="blog-post-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {children}
        </div>

        {/* Tags */}
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-body-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <AuthorBioSection author={author} />

        {/* Share Section */}
        <ShareSection title={metadata.title} />
        </div>

        {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPostsSection posts={relatedPosts} />
      )}
    </article>
  )
}

/**
 * Share section component
 */
function ShareSection({ title }: { title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary-cyan hover:text-cyan-700 transition-colors"
      >
        <Share2 className="h-4 w-4" />
        Share this article
      </button>
    </div>
  )
}

/**
 * Related posts section
 */
function RelatedPostsSection({
  posts,
}: {
  posts: Array<{
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
  }>
}) {
  return (
    <section className="bg-gray-50 py-16 mt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-2xl font-bold text-navy-900">Related Articles</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RelatedPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Related post card
 */
function RelatedPostCard({
  post,
}: {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
  }
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary-cyan hover:shadow-lg transition-all"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold bg-cyan-50 text-primary-cyan">
            {post.category}
          </span>
          <span className="text-xs text-body-text">
            {new Date(post.date).toLocaleDateString('en-UK', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-cyan transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-body-text line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  )
}

/**
 * Wrapper component with global blog post styles
 */
export function BlogPostWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        /* Blog Post Typography */
        .blog-post-title {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: #0E1A2B;
          margin-bottom: 2rem;
        }

        @media (min-width: 640px) {
          .blog-post-title {
            font-size: 3rem;
          }
        }

        /* Blog Post Content Styles */
        .blog-post-content {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #4B535D;
        }

        .blog-post-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0891B2;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          letter-spacing: -0.025em;
        }

        .blog-post-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0E1A2B;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .blog-post-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0E1A2B;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .blog-post-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-post-content strong {
          font-weight: 600;
          color: #0E1A2B;
        }

        .blog-post-content em {
          font-style: italic;
        }

        .blog-post-content a {
          color: #0891B2;
          text-decoration: underline;
          text-decoration-color: #a5f3fc;
          transition: all 0.2s;
        }

        .blog-post-content a:hover {
          color: #0e7490;
          text-decoration-color: #0891B2;
        }

        /* Lists */
        .blog-post-content ul,
        .blog-post-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .blog-post-content ul {
          list-style-type: disc;
        }

        .blog-post-content ul ul {
          list-style-type: circle;
        }

        .blog-post-content ol {
          list-style-type: decimal;
        }

        .blog-post-content li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
          color: #4B535D;
        }

        .blog-post-content li::marker {
          color: #0891B2;
        }

        /* Blockquotes */
        .blog-post-content blockquote {
          border-left: 4px solid #0891B2;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4B535D;
          background: #f0fdfa;
          padding: 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .blog-post-content blockquote p {
          margin-bottom: 0;
        }

        /* Code */
        .blog-post-content code {
          background: #f3f4f6;
          color: #c65d00;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: 'Monaco', 'Courier New', monospace;
        }

        .blog-post-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid #334155;
        }

        .blog-post-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: 0.875rem;
          line-height: 1.7;
        }

        /* Tables */
        .blog-post-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.9375rem;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .blog-post-content thead {
          background: #0891B2;
        }

        .blog-post-content th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .blog-post-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .blog-post-content tbody tr {
          background: white;
        }

        .blog-post-content tbody tr:nth-child(even) {
          background: #f9fafb;
        }

        .blog-post-content tbody tr:hover {
          background: #f0fdfa;
        }

        /* Images */
        .blog-post-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2rem auto;
          display: block;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        /* Horizontal Rule */
        .blog-post-content hr {
          border: 0;
          border-top: 2px solid #e5e7eb;
          margin: 3rem 0;
        }

        /* Print Styles */
        @media print {
          .blog-post-content {
            font-size: 12pt;
            line-height: 1.5;
            color: black;
          }

          .blog-post-content h2 {
            font-size: 18pt;
            page-break-after: avoid;
          }

          .blog-post-content h3 {
            font-size: 14pt;
            page-break-after: avoid;
          }

          .blog-post-content a {
            color: black;
            text-decoration: none;
          }

          .blog-post-content a::after {
            content: ' (' attr(href) ')';
            font-size: 10pt;
            color: #666;
          }

          .blog-post-content pre,
          .blog-post-content blockquote {
            page-break-inside: avoid;
            border: 1px solid #ccc;
          }

          .blog-post-content img {
            max-width: 100%;
            page-break-inside: avoid;
          }
        }
      `}</style>
      {children}
    </>
  )
}
