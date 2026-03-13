/**
 * Blog post loading utilities
 *
 * Handles loading and parsing markdown blog posts from the file system
 */

import fs from 'fs'
import path from 'path'
import {
  parseFrontmatter,
  markdownToHtml,
  calculateReadingTime,
  generateExcerpt,
  validateMetadata,
  type BlogPostMetadata,
  type BlogPost,
} from './markdown'

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

/**
 * Get all blog post slugs
 */
export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_CONTENT_DIR)
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { metadata, content } = parseFrontmatter(fileContents)

    // Validate required metadata
    if (!validateMetadata(metadata)) {
      console.error(`Invalid metadata for post: ${slug}`)
      return null
    }

    // Calculate reading time if not provided
    if (!metadata.readTime) {
      metadata.readTime = calculateReadingTime(content)
    }

    // Generate excerpt if not provided
    if (!metadata.excerpt) {
      metadata.excerpt = generateExcerpt(content)
    }

    return {
      slug,
      metadata: metadata as BlogPostMetadata,
      content,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    })

  return posts
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(
    (post) => post.metadata.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.metadata.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get related blog posts based on tags and category
 */
export function getRelatedBlogPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPost(slug)
  if (!currentPost) return []

  const allPosts = getAllBlogPosts().filter((post) => post.slug !== slug)

  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map((post) => {
    let score = 0

    // Same category gets high score
    if (post.metadata.category === currentPost.metadata.category) {
      score += 10
    }

    // Shared tags
    if (currentPost.metadata.tags && post.metadata.tags) {
      const sharedTags = currentPost.metadata.tags.filter((tag) =>
        post.metadata.tags?.includes(tag)
      )
      score += sharedTags.length * 5
    }

    // Explicit related posts get highest score
    if (currentPost.metadata.relatedPosts?.includes(post.slug)) {
      score += 100
    }

    return { post, score }
  })

  // Sort by score and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts()
  const categories = new Set(posts.map((post) => post.metadata.category))
  return Array.from(categories).sort()
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

/**
 * Search blog posts by query string
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()

  return getAllBlogPosts().filter((post) => {
    const titleMatch = post.metadata.title.toLowerCase().includes(lowercaseQuery)
    const excerptMatch = post.metadata.excerpt?.toLowerCase().includes(lowercaseQuery)
    const contentMatch = post.content.toLowerCase().includes(lowercaseQuery)
    const categoryMatch = post.metadata.category.toLowerCase().includes(lowercaseQuery)
    const tagMatch = post.metadata.tags?.some((tag) =>
      tag.toLowerCase().includes(lowercaseQuery)
    )

    return titleMatch || excerptMatch || contentMatch || categoryMatch || tagMatch
  })
}

/**
 * Process CTA placeholders in content
 */
function processCTAPlaceholders(content: string): string {
  // Replace {cta: workboat} with the actual HTML for the workboat CTA
  const workboatCTA = `
    <div class="my-12 p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
      <div class="max-w-3xl">
        <h3 class="text-2xl font-bold text-navy-900 mb-4">Ready to Modernize Your Safety Management?</h3>
        <p class="text-lg text-body-text mb-6">
          SeaReady SMS is the complete digital solution for UK workboat compliance.
          Built specifically for WBC3 requirements, our platform transforms complex
          regulatory obligations into simple daily tasks.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="/solutions/workboats" class="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-primary-cyan hover:bg-cyan-700 transition-colors">
            Learn More About SeaReady SMS
          </a>
          <a href="/contact" class="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-primary-cyan bg-white border-2 border-primary-cyan hover:bg-cyan-50 transition-colors">
            Request a Demo
          </a>
        </div>
      </div>
    </div>
  `

  const empxCTA = `
    <div class="my-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
      <div class="max-w-3xl">
        <h3 class="text-2xl font-bold text-navy-900 mb-4">Transform Your Pilot Operations</h3>
        <p class="text-lg text-body-text mb-6">
          EMPX brings modern digital efficiency to master-pilot exchanges.
          Designed by a working marine pilot, it eliminates paperwork while
          ensuring full IMPA compliance.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="/products/master-pilot-exchange" class="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-primary-cyan hover:bg-cyan-700 transition-colors">
            Explore EMPX Features
          </a>
          <a href="/contact" class="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-primary-cyan bg-white border-2 border-primary-cyan hover:bg-cyan-50 transition-colors">
            Schedule a Demo
          </a>
        </div>
      </div>
    </div>
  `

  // Replace placeholders with actual HTML
  content = content.replace(/\{cta:\s*workboat\}/gi, workboatCTA)
  content = content.replace(/\{cta:\s*empx\}/gi, empxCTA)

  return content
}

/**
 * Convert blog post to format needed for page rendering
 */
export function formatBlogPostForPage(post: BlogPost) {
  // First convert markdown to HTML
  let htmlContent = markdownToHtml(post.content)

  // Then process CTA placeholders
  htmlContent = processCTAPlaceholders(htmlContent)

  return {
    metadata: post.metadata,
    content: htmlContent,
    slug: post.slug,
  }
}
