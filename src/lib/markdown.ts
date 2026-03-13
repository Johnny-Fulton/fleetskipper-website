/**
 * Markdown processing utilities for SeaReady blog posts
 *
 * This module provides safe markdown-to-HTML conversion with support for:
 * - Headers (H1-H6)
 * - Paragraphs and line breaks
 * - Lists (ordered and unordered)
 * - Bold and italic text
 * - Links
 * - Code blocks and inline code
 * - Blockquotes
 * - Tables
 * - Images
 */

export interface BlogPostMetadata {
  title: string
  author: string
  role: string
  date: string
  readTime: string
  category: string
  heroImage: string
  cardImage?: string
  excerpt?: string
  tags?: string[]
  relatedPosts?: string[]
}

export interface BlogPost {
  metadata: BlogPostMetadata
  content: string
  slug: string
}

/**
 * Simple markdown to HTML converter
 * For production, consider using libraries like remark/rehype for more features
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Process code blocks first (triple backticks)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang ? ` data-language="${lang}"` : ''
    return `<pre><code${language}>${escapeHtml(code.trim())}</code></pre>`
  })

  // Process inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Process headers (must be at start of line)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Process blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

  // Process bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')

  // Process links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Process images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  // Process unordered lists
  const ulRegex = /((?:^[\*\-\+] .+$\n?)+)/gim
  html = html.replace(ulRegex, (match) => {
    const items = match.split('\n').filter(item => item.trim())
    const listItems = items.map(item => {
      const content = item.replace(/^[\*\-\+] /, '')
      return `<li>${content}</li>`
    }).join('\n')
    return `<ul>\n${listItems}\n</ul>`
  })

  // Process ordered lists
  const olRegex = /((?:^\d+\. .+$\n?)+)/gim
  html = html.replace(olRegex, (match) => {
    const items = match.split('\n').filter(item => item.trim())
    const listItems = items.map(item => {
      const content = item.replace(/^\d+\. /, '')
      return `<li>${content}</li>`
    }).join('\n')
    return `<ol>\n${listItems}\n</ol>`
  })

  // Process tables (GitHub-flavored markdown style)
  html = processMarkdownTables(html)

  // Process paragraphs (any remaining lines not in tags)
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    // Don't wrap if already has HTML tags
    if (trimmed.match(/^<(h[1-6]|ul|ol|li|blockquote|pre|table|tr|td|th)/)) {
      return trimmed
    }
    // Don't wrap single line breaks
    if (trimmed.includes('\n') && !trimmed.match(/<br\s*\/?>/)) {
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
    }
    return `<p>${trimmed}</p>`
  }).join('\n\n')

  return html
}

/**
 * Process markdown tables into HTML
 */
function processMarkdownTables(html: string): string {
  const tableRegex = /^\|(.+)\|\s*\n\|[\s\-:|]+\|\s*\n((?:\|.+\|\s*\n?)+)/gim

  return html.replace(tableRegex, (match, headerRow, bodyRows) => {
    // Process header
    const headers = headerRow.split('|')
      .map((h: string) => h.trim())
      .filter((h: string) => h)
      .map((h: string) => `<th>${h}</th>`)
      .join('')

    // Process body rows
    const rows = bodyRows.trim().split('\n')
      .map((row: string) => {
        const cells = row.split('|')
          .map((c: string) => c.trim())
          .filter((c: string) => c)
          .map((c: string) => `<td>${c}</td>`)
          .join('')
        return `<tr>${cells}</tr>`
      })
      .join('\n')

    return `<table>
<thead>
<tr>${headers}</tr>
</thead>
<tbody>
${rows}
</tbody>
</table>`
  })
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Parse frontmatter from markdown content
 * Expects YAML-style frontmatter between --- delimiters
 */
export function parseFrontmatter(content: string): { metadata: Record<string, string | string[]>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/

  const match = content.match(frontmatterRegex)

  if (!match) {
    return {
      metadata: {},
      content: content
    }
  }

  const [, frontmatterText, markdownContent] = match
  const metadata: Record<string, string | string[]> = {}

  // Parse simple YAML-style key: value pairs
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return

    const key = line.substring(0, colonIndex).trim()
    const value = line.substring(colonIndex + 1).trim()

    // Handle arrays (simple comma-separated values)
    if (value.startsWith('[') && value.endsWith(']')) {
      metadata[key] = value
        .substring(1, value.length - 1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''))
    } else {
      // Remove quotes if present
      metadata[key] = value.replace(/^["']|["']$/g, '')
    }
  })

  return {
    metadata,
    content: markdownContent.trim()
  }
}

/**
 * Calculate estimated reading time based on word count
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax and HTML tags
  const plainText = content
    .replace(/[#*`_\[\]()]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Find the last complete sentence within maxLength
  const truncated = plainText.substring(0, maxLength)
  const lastPeriod = truncated.lastIndexOf('.')
  const lastQuestion = truncated.lastIndexOf('?')
  const lastExclamation = truncated.lastIndexOf('!')

  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation)

  if (lastSentenceEnd > 0) {
    return plainText.substring(0, lastSentenceEnd + 1)
  }

  // If no sentence end found, truncate at last space
  const lastSpace = truncated.lastIndexOf(' ')
  return plainText.substring(0, lastSpace) + '...'
}

/**
 * Validate blog post metadata
 */
export function validateMetadata(metadata: unknown): metadata is BlogPostMetadata {
  if (typeof metadata !== 'object' || metadata === null) return false

  const meta = metadata as Record<string, unknown>
  const required = ['title', 'author', 'role', 'date', 'category', 'heroImage']
  return required.every(field => field in meta && typeof meta[field] === 'string')
}
