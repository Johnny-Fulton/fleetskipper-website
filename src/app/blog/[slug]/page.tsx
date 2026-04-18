import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

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

  // Convert markdown to HTML
  const processedContent = await remark()
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
              {/* Prose styling for markdown content */}
              <div
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-4xl prose-h1:mb-8
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-gray-700 prose-li:my-2
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                  prose-table:my-8
                  prose-th:bg-gray-50 prose-th:p-3 prose-th:font-bold
                  prose-td:p-3 prose-td:border prose-td:border-gray-200
                  prose-code:text-cyan-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
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
