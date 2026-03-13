/**
 * BlogAuthor Component
 *
 * Author bio card for blog posts, featuring:
 * - Author photo or initials
 * - Name, role, and bio
 * - Social media links
 * - Optional compact variant for inline use
 */

import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Mail, User } from 'lucide-react'

export interface AuthorInfo {
  name: string
  role: string
  bio?: string
  image?: string
  linkedin?: string
  email?: string
  website?: string
}

export interface BlogAuthorProps {
  author: AuthorInfo
  variant?: 'default' | 'compact' | 'card'
  className?: string
}

export function BlogAuthor({
  author,
  variant = 'default',
  className = '',
}: BlogAuthorProps) {
  // Check if author has an image - only show avatar if image exists
  const showAvatar = !!author.image

  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${showAvatar ? 'gap-4' : ''} ${className}`}>
        {showAvatar && <AuthorAvatar author={author} size="sm" />}
        <div>
          <p className="font-semibold text-navy-900">{author.name}</p>
          <p className="text-sm text-body-text">{author.role}</p>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`rounded-xl bg-gray-50 p-6 border border-gray-200 ${className}`}>
        <div className={`flex items-start ${showAvatar ? 'gap-4' : ''}`}>
          {showAvatar && <AuthorAvatar author={author} size="lg" />}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-navy-900 mb-1">{author.name}</h3>
            <p className="text-sm font-medium text-primary-cyan mb-3">{author.role}</p>
            {author.bio && (
              <p className="text-sm text-body-text leading-relaxed mb-4">{author.bio}</p>
            )}
            <AuthorSocialLinks author={author} />
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`flex items-center ${showAvatar ? 'gap-4' : ''} pb-8 border-b border-gray-200 ${className}`}>
      {showAvatar && <AuthorAvatar author={author} size="md" />}
      <div>
        <p className="font-semibold text-navy-900">{author.name}</p>
        <p className="text-sm text-body-text">{author.role}</p>
      </div>
    </div>
  )
}

/**
 * Author avatar with fallback to initials
 */
function AuthorAvatar({
  author,
  size = 'md',
}: {
  author: AuthorInfo
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }

  if (author.image) {
    return (
      <div className={`${sizes[size]} relative rounded-full overflow-hidden`}>
        <Image
          src={author.image}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  // Fallback to initials
  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`${sizes[size]} flex items-center justify-center rounded-full bg-primary-cyan`}
    >
      <span className={`${textSizes[size]} font-semibold text-white`}>
        {initials}
      </span>
    </div>
  )
}

/**
 * Social media links for author
 */
function AuthorSocialLinks({ author }: { author: AuthorInfo }) {
  const links = []

  if (author.linkedin) {
    links.push({
      href: author.linkedin,
      icon: Linkedin,
      label: 'LinkedIn',
    })
  }

  if (author.email) {
    links.push({
      href: `mailto:${author.email}`,
      icon: Mail,
      label: 'Email',
    })
  }

  if (links.length === 0) return null

  return (
    <div className="flex items-center gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-300 text-body-text hover:border-primary-cyan hover:text-primary-cyan transition-colors"
          aria-label={link.label}
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}

/**
 * Author bio section for end of post
 */
export function AuthorBioSection({
  author,
  className = '',
}: {
  author: AuthorInfo
  className?: string
}) {
  return (
    <section className={`mt-16 pt-8 border-t border-gray-200 ${className}`}>
      <h3 className="text-lg font-bold text-navy-900 mb-6">About the Author</h3>
      <BlogAuthor author={author} variant="card" />
    </section>
  )
}

/**
 * Multiple authors variant
 */
export function AuthorList({
  authors,
  className = '',
}: {
  authors: AuthorInfo[]
  className?: string
}) {
  if (authors.length === 0) return null

  if (authors.length === 1) {
    return <BlogAuthor author={authors[0]} className={className} />
  }

  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`}>
      {authors.map((author, index) => (
        <div key={index} className="flex items-center gap-3">
          <AuthorAvatar author={author} size="sm" />
          <div>
            <p className="text-sm font-semibold text-navy-900">{author.name}</p>
            <p className="text-xs text-body-text">{author.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
