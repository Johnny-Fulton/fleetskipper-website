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
              {/* Article content with custom styling */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <style jsx>{`
                .article-content {
                  font-size: 1.125rem;
                  line-height: 1.75;
                  color: #374151;
                }

                .article-content h1 {
                  font-size: 2.5rem;
                  font-weight: 800;
                  color: #111827;
                  margin-bottom: 2rem;
                  line-height: 1.2;
                }

                .article-content h2 {
                  font-size: 1.875rem;
                  font-weight: 700;
                  color: #111827;
                  margin-top: 3rem;
                  margin-bottom: 1rem;
                  line-height: 1.3;
                }

                .article-content h3 {
                  font-size: 1.5rem;
                  font-weight: 600;
                  color: #111827;
                  margin-top: 2rem;
                  margin-bottom: 0.75rem;
                }

                .article-content p {
                  margin-bottom: 1.5rem;
                  line-height: 1.8;
                }

                .article-content ul, .article-content ol {
                  margin: 1.5rem 0;
                  padding-left: 1.5rem;
                }

                .article-content li {
                  margin: 0.5rem 0;
                  line-height: 1.7;
                }

                .article-content ul {
                  list-style-type: disc;
                }

                .article-content ol {
                  list-style-type: decimal;
                }

                .article-content a {
                  color: #0891b2;
                  text-decoration: underline;
                }

                .article-content a:hover {
                  color: #06b6d4;
                }

                .article-content strong {
                  font-weight: 700;
                  color: #111827;
                }

                .article-content img {
                  border-radius: 0.75rem;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                  margin: 2rem 0;
                  width: 100%;
                  height: auto;
                }

                .article-content table {
                  width: 100%;
                  margin: 2rem 0;
                  border-collapse: collapse;
                }

                .article-content th {
                  background-color: #f9fafb;
                  padding: 0.75rem 1rem;
                  text-align: left;
                  font-weight: 700;
                  border: 1px solid #e5e7eb;
                }

                .article-content td {
                  padding: 0.75rem 1rem;
                  border: 1px solid #e5e7eb;
                }

                .article-content hr {
                  margin: 3rem 0;
                  border: none;
                  border-top: 1px solid #e5e7eb;
                }

                .article-content code {
                  background-color: #f3f4f6;
                  color: #0891b2;
                  padding: 0.125rem 0.375rem;
                  border-radius: 0.25rem;
                  font-size: 0.875em;
                  font-family: monospace;
                }
              `}</style>

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
