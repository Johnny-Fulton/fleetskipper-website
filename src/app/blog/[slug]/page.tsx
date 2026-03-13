import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavbarLight from '@/components/navbar-light'
import { SiteFooter } from '@/components/primitives'
import { BlogPost, BlogPostWrapper } from '@/components/blog/BlogPost'
import { EMPXProductCTA } from '@/components/blog/BlogCTA'
import type { AuthorInfo } from '@/components/blog/BlogAuthor'
import {
  getBlogPost,
  getAllBlogSlugs,
  getRelatedBlogPosts,
  formatBlogPostForPage,
} from '@/lib/blog'

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found | SeaReady Blog',
    }
  }

  return {
    title: `${post.metadata.title} | SeaReady Blog`,
    description: post.metadata.excerpt || post.metadata.title,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      images: [
        {
          url: post.metadata.heroImage,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.excerpt,
      images: [post.metadata.heroImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Format the post content to HTML
  const formattedPost = formatBlogPostForPage(post)

  // Get related posts
  const relatedPostsData = getRelatedBlogPosts(slug, 3)
  const relatedPosts = relatedPostsData.map((rp) => ({
    slug: rp.slug,
    title: rp.metadata.title,
    excerpt: rp.metadata.excerpt || '',
    date: rp.metadata.date,
    category: rp.metadata.category,
  }))

  // Author information
  const author: AuthorInfo = {
    name: post.metadata.author,
    role: post.metadata.role,
    bio: 'The SeaReady team develops maritime software solutions built by mariners, for mariners. Combining decades of seagoing experience with modern technology, we create practical tools that solve real operational challenges in the maritime industry.',
    // Optional: add image, linkedin, email when available
    // image: '/authors/jonathan-fulton.jpg',
    // linkedin: 'https://linkedin.com/in/jonathanfulton',
    // email: 'jonathan@searead.com',
  }

  const footerContent = {
    product: {
      heading: 'Products',
      links: ['eMPX', 'SeaReady App', 'Features', 'Pricing'],
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
    <BlogPostWrapper>
      <div className="bg-white">
        {/* Navbar */}
        <NavbarLight />

        {/* Main Article */}
        <BlogPost
          metadata={formattedPost.metadata}
          content={formattedPost.content}
          author={author}
          relatedPosts={relatedPosts}
        >
          {/* Add product-specific CTA based on category */}
          {(post.metadata.category === 'Port Innovation' ||
            post.metadata.category === 'Pilot Operations') && <EMPXProductCTA />}
        </BlogPost>

        {/* Footer */}
        <SiteFooter {...footerContent} />
      </div>
    </BlogPostWrapper>
  )
}
