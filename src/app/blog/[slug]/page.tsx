import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import styles from './article.module.css'

// The 5 WBC3 blog posts
const blogPosts = [
  'what-is-wbc3',
  'how-to-get-wbc3-certified',
  'wbc3-area-categories',
  'wbc3-crew-qualifications',
  'keeping-wbc3-certificate-valid',
]

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((slug) => ({
    slug,
  }))
}

// Read and parse markdown file
async function getPostContent(slug: string) {
  const filePath = path.join(process.cwd(), 'src/app/blog', `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')

  // Convert markdown to HTML with GFM support for tables
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(fileContents)
  const contentHtml = processedContent.toString()

  // Extract title (first H1)
  const titleMatch = fileContents.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : slug

  return {
    slug,
    title,
    content: contentHtml,
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostContent(slug)

  if (!post) {
    return {
      title: 'Post Not Found | FleetSkipper Blog',
    }
  }

  return {
    title: `${post.title} | FleetSkipper Blog`,
    description: 'WBC3 compliance guide for UK workboat operators',
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostContent(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />

      <main className="overflow-hidden bg-white">
        {/* Article Content */}
        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Article content with custom styling */}
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Back to Blog Link */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
                >
                  ← Back to Blog
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-cyan-600 to-cyan-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Need Help With WBC3 Compliance?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get expert guidance from a Master Mariner on SMS documentation, audits, and ongoing compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  View Services →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
