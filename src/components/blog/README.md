# SeaReady Blog Template System

Comprehensive blog template system with markdown support, custom components, and SeaReady brand styling.

## Quick Start

### 1. Create a new blog post

Create a markdown file in `/src/content/blog/` with frontmatter:

```markdown
---
title: Your Post Title
author: Jonathan Fulton
role: Marine Pilot & Founder
date: 2025-01-27
readTime: 5 min read
category: Port Innovation
heroImage: /hero-vessel.jpg
excerpt: A brief excerpt for SEO and previews
tags: [eMPX, Digital Transformation, Port Safety]
relatedPosts: [other-post-slug-1, other-post-slug-2]
---

## Your First Heading

Your content goes here...
```

### 2. Use the blog post page

The page at `/src/app/blog/[slug]/page.tsx` automatically:
- Loads markdown from `/src/content/blog/`
- Converts markdown to HTML
- Applies SeaReady brand styling
- Generates SEO metadata
- Shows related posts
- Includes author bio

## Components

### BlogPost

Main blog post layout component.

```tsx
import { BlogPost } from '@/components/blog/BlogPost'

<BlogPost
  metadata={metadata}
  content={htmlContent}
  author={authorInfo}
  relatedPosts={relatedPosts}
>
  {/* Optional: Add inline CTAs or components */}
  <eMPXProductCTA />
</BlogPost>
```

### BlogCTA

Reusable call-to-action blocks for inline use.

```tsx
import { BlogCTA, eMPXProductCTA, WorkboatSMSProductCTA, ContactCTA } from '@/components/blog/BlogCTA'

// Custom CTA
<BlogCTA
  title="Ready to Modernize?"
  description="Transform your operations..."
  primaryButton={{ text: 'Learn More', href: '/products' }}
  secondaryButton={{ text: 'Contact Us', href: '/contact' }}
  variant="default" // or "compact", "highlight"
/>

// Pre-built CTAs
<EMPXProductCTA />
<WorkboatSMSProductCTA />
<ContactCTA />
```

### BlogLink

Smart link component with internal/external detection.

```tsx
import { BlogLink, InternalLink, ButtonLink, ReferenceLink } from '@/components/blog/BlogLink'

// Auto-detects internal vs external
<BlogLink href="/about">Internal Link</BlogLink>
<BlogLink href="https://example.com">External Link</BlogLink>

// Button-style link
<ButtonLink href="/contact" variant="primary">Contact Us</ButtonLink>

// Reference/citation style
<ReferenceLink href="https://source.com">Source</ReferenceLink>
```

### BlogTable

Styled table components with multiple variants.

```tsx
import { BlogTable, ComparisonTable, DataTable } from '@/components/blog/BlogTable'

// Standard table
<BlogTable
  headers={['Column 1', 'Column 2', 'Column 3']}
  rows={[
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
  ]}
  caption="Optional table caption"
  striped={true}
/>

// Comparison table with feature checks
<ComparisonTable
  headers={['Feature', 'Basic', 'Premium']}
  rows={[
    ['Feature 1', true, true],
    ['Feature 2', false, true],
    ['Feature 3', false, true],
  ]}
  highlightColumn={2} // Highlight the Premium column
/>

// Minimal data table
<DataTable
  headers={['Name', 'Value']}
  rows={[['Item 1', '100'], ['Item 2', '200']]}
/>
```

### BlogAuthor

Author bio and avatar components.

```tsx
import { BlogAuthor, AuthorBioSection, AuthorList } from '@/components/blog/BlogAuthor'

const author = {
  name: 'Jonathan Fulton',
  role: 'Marine Pilot & Founder',
  bio: 'Jonathan is a marine pilot...',
  image: '/authors/jonathan.jpg', // optional
  linkedin: 'https://linkedin.com/in/...', // optional
  email: 'email@example.com', // optional
}

// Compact author display
<BlogAuthor author={author} variant="compact" />

// Full author bio card
<AuthorBioSection author={author} />

// Multiple authors
<AuthorList authors={[author1, author2]} />
```

## Utilities

### Markdown Processing

```tsx
import {
  markdownToHtml,
  parseFrontmatter,
  calculateReadingTime,
  generateExcerpt,
} from '@/lib/markdown'

// Convert markdown to HTML
const html = markdownToHtml(markdownContent)

// Parse frontmatter
const { metadata, content } = parseFrontmatter(markdownWithFrontmatter)

// Calculate reading time
const readTime = calculateReadingTime(content) // "5 min read"

// Generate excerpt
const excerpt = generateExcerpt(content, 160)
```

### Blog Post Loading

```tsx
import {
  getBlogPost,
  getAllBlogPosts,
  getAllBlogSlugs,
  getRelatedBlogPosts,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  searchBlogPosts,
} from '@/lib/blog'

// Get single post
const post = getBlogPost('my-post-slug')

// Get all posts (sorted by date)
const allPosts = getAllBlogPosts()

// Get related posts
const related = getRelatedBlogPosts('my-post-slug', 3)

// Filter by category
const portPosts = getBlogPostsByCategory('Port Innovation')

// Search
const results = searchBlogPosts('master pilot exchange')
```

## Markdown Features

The markdown processor supports:

### Headers
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Text Formatting
```markdown
**bold text**
*italic text*
***bold and italic***
`inline code`
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](/image.jpg)
```

### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Code Blocks
```markdown
```javascript
const example = 'code block'
console.log(example)
```
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

## Styling

### Brand Colors

The blog system uses SeaReady brand colors:

- **Primary Cyan**: `#0891B2` - Links, accents, table headers
- **CTA Orange**: `#c65d00` - Primary CTAs and buttons
- **Navy Headings**: `#0E1A2B` - All headings (H1-H4)
- **Body Text**: `#4B535D` - Main content text

These are available as Tailwind classes:
- `text-primary-cyan`
- `bg-cta-orange`
- `text-navy-900`
- `text-body-text`

### Typography

- **Title**: 3rem (48px) on desktop, 2.25rem (36px) on mobile
- **H2**: 1.875rem (30px) - Major sections
- **H3**: 1.5rem (24px) - Subsections
- **Body**: 1.125rem (18px) - Content
- **Line Height**: 1.8 for body text

### Print Styles

All blog posts include print-friendly styles:
- Optimized font sizes for print
- Link URLs shown in brackets
- Proper page breaks for headings
- Black text for better printing

## SEO Features

Blog posts automatically include:
- Open Graph metadata for social sharing
- Twitter Card metadata
- Proper heading hierarchy
- Semantic HTML structure
- Alt text support for images
- Structured data for articles

## Best Practices

### Writing Content

1. **Use clear headings**: Create a logical hierarchy with H2 and H3
2. **Add excerpts**: Write compelling excerpts for better SEO
3. **Tag appropriately**: Use relevant tags for discoverability
4. **Link related posts**: Manually specify related posts for better navigation
5. **Optimize images**: Use descriptive filenames and alt text

### Component Usage

1. **Add CTAs strategically**: Place CTAs after valuable content sections
2. **Use tables for data**: Present complex data in tables, not paragraphs
3. **Link internally**: Use BlogLink for better internal linking
4. **Include author bio**: Always include author information

### Performance

1. **Optimize images**: Compress hero images to < 200KB
2. **Static generation**: All blog posts are statically generated at build time
3. **Lazy loading**: Images are lazy-loaded by default
4. **Efficient rendering**: Markdown is converted to HTML once at build time

## File Structure

```
src/
├── components/
│   └── blog/
│       ├── BlogPost.tsx        # Main blog post layout
│       ├── BlogCTA.tsx          # CTA components
│       ├── BlogLink.tsx         # Link components
│       ├── BlogTable.tsx        # Table components
│       ├── BlogAuthor.tsx       # Author components
│       └── README.md            # This file
├── content/
│   └── blog/
│       └── *.md                 # Markdown blog posts
├── lib/
│   ├── markdown.ts              # Markdown processing
│   └── blog.ts                  # Blog post loading
└── app/
    └── blog/
        └── [slug]/
            └── page.tsx         # Dynamic blog post page
```

## Migration Guide

To convert existing hardcoded blog posts to markdown:

1. Create a markdown file in `/src/content/blog/`
2. Copy the HTML content
3. Convert to markdown (or keep as HTML - it works!)
4. Add frontmatter with metadata
5. The page will automatically load the new file

## Troubleshooting

**Issue**: Post not found
- Check the filename matches the slug exactly
- Ensure the file is in `/src/content/blog/`
- Verify frontmatter is valid YAML

**Issue**: Styles not applying
- Check Tailwind safelist includes the color classes
- Verify custom colors are in `tailwind.config.ts`
- Clear Next.js cache: `rm -rf .next`

**Issue**: Markdown not rendering
- Check for YAML errors in frontmatter
- Ensure markdown syntax is correct
- Try viewing raw HTML output for debugging

## Support

For questions or issues with the blog template system, contact the development team or refer to the SeaReady documentation.
