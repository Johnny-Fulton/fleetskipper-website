"""
SeaReady Website Orchestrator v2.0

Master orchestrator for SeaReady website project.
Coordinates specialist teams for building the marketing website.

CONTEXT LOADED ON STARTUP:
- CLAUDE_CONTEXT/ folder - Brand, features, tech stack
- logs/WORK_LOG.md - Recent narrative log
- logs/ACTION_REGISTER.md - File change audit trail

SPECIALIST TEAMS:
- Content Team (copy, SEO, messaging)
- Blog Team (blog posts, articles, maritime content)
- SEO Team (technical SEO, meta tags, structured data)
- Component Team (React/TypeScript components)
- Page Team (page assembly, routing, layouts)
- Integration Team (APIs, Stripe, forms, analytics)
- Assets Team (images, optimization, media)

QA TEAMS:
- Playwright Team (E2E testing, browser automation, screenshots)
- Accessibility Team (WCAG compliance, screen reader testing)

DEPLOYMENT:
- Deployment Team (Git, GitHub, Vercel)

SUPPORT AGENTS:
- Logging Agent (ACTION_REGISTER.md, WORK_LOG.md)
- Housekeeping Agent (cleanup, unused files, optimization)

How to run:
    cd /Users/jonathanfulton/Maritime-Agents
    ./run_website_agent.sh
"""

from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions, AgentDefinition
from claude_agent_sdk import (
    AssistantMessage,
    UserMessage,
    ResultMessage,
    SystemMessage,
    TextBlock,
    ToolUseBlock,
    ToolResultBlock,
    ThinkingBlock,
)
from rich import print
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.prompt import Prompt
from rich.table import Table
import json
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

# =============================================================================
# Paths - Updated for this project structure
# =============================================================================

WEBSITE_PATH = "/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website"
SRC_PATH = f"{WEBSITE_PATH}/src"
LOGS_PATH = f"{WEBSITE_PATH}/logs"
CONTEXT_PATH = f"{WEBSITE_PATH}/CLAUDE_CONTEXT"

# =============================================================================
# Context Loading
# =============================================================================

def load_file_content(path: str, max_chars: int = None) -> str:
    """Load file content, optionally limiting characters."""
    try:
        with open(path, 'r') as f:
            content = f.read()
            if max_chars:
                return content[:max_chars]
            return content
    except Exception as e:
        return f"[Could not load: {e}]"


def load_last_n_entries(path: str, n: int = 5) -> str:
    """Load last N entries from a log file (entries start with ##)."""
    try:
        with open(path, 'r') as f:
            content = f.read()
        entries = content.split('\n## ')
        if len(entries) > 1:
            recent = entries[-n:]
            return '\n## '.join(recent)
        return content[:2000]
    except Exception as e:
        return f"[Could not load: {e}]"


def load_project_context() -> dict:
    """Load all project context files."""
    context = {
        "brand": load_file_content(f"{CONTEXT_PATH}/BRAND_PALETTE.md"),
        "features": load_file_content(f"{CONTEXT_PATH}/PRODUCT_FEATURES.md"),
        "tech_stack": load_file_content(f"{CONTEXT_PATH}/TECH_STACK.md"),
        "content": load_file_content(f"{CONTEXT_PATH}/CONTENT_REFERENCE.md"),
        "work_log": load_last_n_entries(f"{LOGS_PATH}/WORK_LOG.md", 3),
        "action_register": load_last_n_entries(f"{LOGS_PATH}/ACTION_REGISTER.md", 5),

        # Business folder integration
        "business_integration": load_file_content(f"{WEBSITE_PATH}/BUSINESS_INTEGRATION.md", max_chars=2000),
        "business_inbox": load_file_content("/Users/jonathanfulton/Business/_SHARED/WEBSITE_INBOX.md", max_chars=1000),
    }

    # Check for pending tasks from Business Orchestrator
    if "⏳ PENDING" in context.get("business_inbox", ""):
        print("[yellow]⚠️  You have pending tasks from Business Orchestrator[/yellow]")
        print("[yellow]Check /Business/_SHARED/WEBSITE_INBOX.md[/yellow]\n")

    return context


# =============================================================================
# CLI Helpers
# =============================================================================

def print_rich_message(msg_type: str, message: str, console: Console):
    """Print a message in a panel with styling."""
    styles = {
        "user": {"style": "bold yellow", "title": "You", "border": "yellow"},
        "assistant": {"style": "bold green", "title": "Website Orchestrator", "border": "green"},
        "tool_use": {"style": "bold blue", "title": "Tool Use", "border": "blue"},
        "tool_result": {"style": "bold magenta", "title": "Tool Result", "border": "magenta"},
        "system": {"style": "bold cyan", "title": "System", "border": "cyan"},
    }
    s = styles.get(msg_type, styles["system"])
    panel = Panel(
        Text(message, style=s["style"]),
        title=s["title"],
        border_style=s["border"]
    )
    console.print(panel, end="\n\n")


def format_tool_result(content, max_length: int = 50000) -> str:
    """Format tool result content nicely, with truncation for large results."""
    result = ""
    if isinstance(content, str):
        try:
            parsed = json.loads(content)
            result = json.dumps(parsed, indent=2)
        except json.JSONDecodeError:
            result = content
    elif isinstance(content, list):
        formatted_parts = []
        for item in content:
            if isinstance(item, dict) and "text" in item:
                text_content = item["text"]
                try:
                    parsed_json = json.loads(text_content)
                    formatted_parts.append(json.dumps(parsed_json, indent=2))
                except json.JSONDecodeError:
                    formatted_parts.append(text_content)
            else:
                formatted_parts.append(json.dumps(item, indent=2))
        result = "\n\n".join(formatted_parts)
    else:
        result = json.dumps(content, indent=2)

    # Truncate if too long to prevent buffer issues
    if len(result) > max_length:
        result = result[:max_length] + f"\n\n... [TRUNCATED - {len(result) - max_length} chars omitted]"
    return result


def parse_and_print_message(message, console: Console):
    """Parse and print a message based on its type."""
    if isinstance(message, SystemMessage):
        if hasattr(message, 'subtype') and message.subtype == "compact_boundary":
            print_rich_message("system", "Context compacted", console)
    elif isinstance(message, AssistantMessage):
        for block in message.content:
            if isinstance(block, TextBlock):
                print_rich_message("assistant", block.text, console)
            elif isinstance(block, ToolUseBlock):
                print_rich_message("tool_use", f"Tool: {block.name}", console)
    elif isinstance(message, UserMessage):
        for block in message.content:
            if isinstance(block, ToolResultBlock):
                formatted = format_tool_result(block.content)
                if len(formatted) < 500:
                    print_rich_message("tool_result", formatted, console)
    elif isinstance(message, ResultMessage):
        pass


def get_user_input(console: Console) -> str:
    """Get user input with prompt."""
    user_input = Prompt.ask("\n[bold yellow]You[/bold yellow]", console=console)
    print()
    return user_input


# =============================================================================
# Build System Prompt with Context
# =============================================================================

def build_system_prompt(context: dict) -> str:
    """Build the orchestrator system prompt with loaded context."""

    return f"""You are the SeaReady Website Orchestrator - the master coordinator for building the SeaReady marketing website.

IMPORTANT: You have FULL ACCESS to all project files. Do NOT ask for permission - just read, write, and edit files directly. All permissions are pre-approved.

IMPORTANT: You have FULL PLAYWRIGHT ACCESS. You can:
- Open browsers (chromium, firefox, webkit)
- Navigate to any URL (localhost:3002 for dev, or live site)
- Take screenshots (MUST use JPEG format, quality 50, 1024x768 viewport - CRITICAL)
- Run E2E tests
- Inspect and interact with page elements

You are NOT just a chat assistant - you are a powerful automation tool with real browser capabilities.

CRITICAL SCREENSHOT RULE: Screenshots larger than 500KB will CRASH the orchestrator. Always use:
- Format: JPEG (never PNG)
- Quality: 50 (not higher)
- Viewport: 1024x768 (not larger)
- Scale: 'css' (not device pixels)

# PROJECT OVERVIEW

SeaReady is a maritime compliance company providing:
1. SeaReady App - SaaS platform for workboat operators
2. SeaReady Consultancy - Bespoke SMS builds

This website markets both products to UK workboat operators.

# PROJECT PATHS

- Website root: {WEBSITE_PATH}
- Source code: {SRC_PATH}
- Pages: {SRC_PATH}/app/
- Components: {SRC_PATH}/components/
- Public assets: {WEBSITE_PATH}/public/
- Logs: {LOGS_PATH}/

# BRAND (from CLAUDE_CONTEXT/BRAND_PALETTE.md)

{context['brand'][:1500]}

# PRODUCT FEATURES (from CLAUDE_CONTEXT/PRODUCT_FEATURES.md)

{context['features'][:1500]}

# TECH STACK (from CLAUDE_CONTEXT/TECH_STACK.md)

{context['tech_stack'][:1000]}

# LOGGING SYSTEMS

1. ACTION_REGISTER.md (logs/) - Audit log of file changes
2. WORK_LOG.md (logs/) - Narrative of what/why/decisions

# RECENT WORK

{context['work_log'][:1000]}

# YOUR SPECIALIST TEAMS

CONTENT & MARKETING:
- content-team: Copywriting, messaging, landing page copy
- blog-team: Blog posts, articles, maritime industry content
- seo-team: Technical SEO, meta tags, structured data, sitemap

DEVELOPMENT:
- component-team: React/TypeScript components, Tailwind CSS
- page-team: Page assembly, routing, layouts, App Router
- integration-team: APIs, Stripe payments, contact forms, analytics
- assets-team: Image optimization, media management, public folder

QA & TESTING:
- playwright-team: E2E testing, browser automation, screenshots
- accessibility-team: WCAG 2.1 AA compliance, screen reader testing, keyboard nav

DEPLOYMENT:
- deployment-team: Git commits, GitHub pushes, Vercel monitoring

SUPPORT:
- logging-agent: Logs to ACTION_REGISTER.md and WORK_LOG.md
- housekeeping-agent: Clean unused files, optimize bundle, remove dead code

# DEVELOPMENT COMMANDS

```bash
cd {WEBSITE_PATH}
npm run dev          # Start dev server (localhost:3002)
npm run build        # Production build
npm run lint         # ESLint check
npx playwright test  # Run E2E tests
npx playwright test --headed  # Run tests with visible browser
```

# BROWSER & SCREENSHOT CAPABILITIES

You have FULL Playwright access. You can:
1. **Open browsers**: Launch Chrome/Firefox/Safari via Playwright
2. **Navigate to pages**: Visit localhost:3002 or live site (seaready-website.vercel.app)
3. **Take screenshots**: Capture pages for visual review
4. **Test interactions**: Click, type, verify elements

## TAKING SCREENSHOTS - CRITICAL SIZE LIMITS (WILL CRASH IF IGNORED)

Screenshots MUST be under 500KB or the orchestrator will crash. ALWAYS use these EXACT settings:

```javascript
// MANDATORY screenshot settings - do not change these values
const {{ chromium }} = require('playwright');
(async () => {{
  const browser = await chromium.launch();
  const page = await browser.newPage({{ viewport: {{ width: 1024, height: 768 }} }});
  await page.goto('http://localhost:3002');
  await page.screenshot({{
    path: 'screenshot.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  }});
  await browser.close();
}})();
```

NEVER:
- Use PNG format (too large)
- Use quality above 50
- Use viewport larger than 1024x768
- Use deviceScaleFactor > 1
- Take full-page screenshots

If you need to capture a large page, take multiple small screenshots of sections.

# CRITICAL RULES

1. ALWAYS log file changes to ACTION_REGISTER.md
2. Use TypeScript (.tsx, .ts) - this is a TS project
3. Follow existing patterns in the codebase
4. Test changes before marking complete
5. Target audience: UK workboat operators
6. Brand color: SeaReady blue
7. Deployed at: seaready-website.vercel.app

# BATCH PROCESSING - VERY IMPORTANT

When working with LARGE operations (many files, images, etc.), you MUST:

1. **BATCH SIZE**: Process files in batches of 5-10 at a time, NEVER all at once
2. **WRITE TO FILES**: Write results to log files (JSON/MD) instead of accumulating in conversation
3. **PROGRESSIVE UPDATES**: Complete each batch fully before starting the next
4. **AVOID LARGE RETURNS**: Never return large amounts of data in tool results - summarize instead

Example for image processing:
- DON'T: Process 50 images and return all analysis at once
- DO: Process 5 images, write results to logs/batch_1.json, report "Batch 1 complete", then continue

This prevents JSON buffer overflow errors. If you get "JSON exceeded buffer" errors, you're returning too much data at once.

# YOUR JOB

You coordinate teams to:
1. Understand user requests
2. Route to appropriate specialist team
3. Verify work meets standards
4. Ensure proper logging
5. Report results

# BUSINESS FOLDER INTEGRATION

{context.get('business_integration', '[Business integration not loaded]')[:2000]}

**Your inbox:** /Business/_SHARED/WEBSITE_INBOX.md

{context.get('business_inbox', '[No inbox data]')[:1000] if "⏳ PENDING" in context.get('business_inbox', '') else '[No pending tasks from Business Orchestrator]'}

**When to notify Business Orchestrator:**
- ANY website costs (domains, hosting, email, CDN)
- Major marketing decisions (hosting platform, SEO strategy, content direction)
- Reports and strategies (file to Business/04-MARKETING/website/)
- Website milestones (launch, major updates)

**How to notify:** Post to /Business/_SHARED/WEBSITE_INBOX.md or ask via /Business/_SHARED/NOTICEBOARD.md
"""


# =============================================================================
# Agent Definitions
# =============================================================================

def get_agents() -> dict:
    """Define all specialist agents."""

    base_context = f"""
You are part of the SeaReady website development team.

PROJECT PATH: {WEBSITE_PATH}
SOURCE: {SRC_PATH}
LOGS: {LOGS_PATH}
DEV SERVER: http://localhost:3002
LIVE SITE: https://seaready-website.vercel.app

This is a TypeScript Next.js 14 project (App Router). Use .tsx and .ts files.
Always log changes to ACTION_REGISTER.md.

TARGET AUDIENCE: UK workboat operators (tugs, pilot boats, crew transfer vessels, survey vessels)
BRAND: Professional, trustworthy, maritime-focused. SeaReady blue (#0066CC).

CRITICAL - BATCH PROCESSING:
When processing many files (images, etc.), work in batches of 5-10.
Write results to log files instead of returning large data.
This prevents JSON buffer overflow errors.

CRITICAL - SCREENSHOT SIZE LIMITS:
If you take screenshots, they MUST be small or the orchestrator crashes:
- Format: JPEG only (never PNG)
- Quality: 50 max
- Viewport: 1024x768 max
- Scale: 'css' (not device pixels)
"""

    return {
        # =====================================================================
        # CONTENT & MARKETING TEAMS
        # =====================================================================

        "content-team": AgentDefinition(
            model="sonnet",
            description="Copywriting and messaging specialists for landing pages and marketing copy",
            prompt=base_context + """
You are the CONTENT TEAM - copywriting and messaging specialists.

YOUR EXPERTISE:
- Landing page copy that converts
- Clear, jargon-free language for busy vessel operators
- Trust-building messaging for compliance software
- Strong CTAs that drive demos and sign-ups
- UK English spelling and maritime terminology

KEY MESSAGES TO REINFORCE:
- "Compliance made simple" - stress relief, not more work
- "Built for workboats, not container ships" - right-sized solution
- "Pass your MCA inspection with confidence" - peace of mind
- "From 30 minutes to 3 minutes" - time savings

TONE:
- Professional but approachable
- Confident but not arrogant
- Helpful, like a knowledgeable colleague
- Never salesy or pushy

AUDIENCE PAIN POINTS:
- Overwhelmed by paperwork
- Worried about MCA inspections
- Don't have time for compliance admin
- Using outdated paper systems or generic software
"""
        ),

        "blog-team": AgentDefinition(
            model="sonnet",
            description="Blog content writers specializing in maritime compliance and industry topics",
            prompt=base_context + """
You are the BLOG TEAM - maritime content specialists.

YOUR EXPERTISE:
- Writing engaging blog posts about maritime compliance
- Explaining complex regulations in simple terms
- Creating content that ranks for maritime keywords
- Building SeaReady's authority in the workboat sector

BLOG CATEGORIES:
1. **Compliance Guides** - How to comply with specific regulations (WBC3, MGN, ISM)
2. **Industry News** - MCA updates, regulation changes, industry trends
3. **Best Practices** - Safety management, crew training, maintenance tips
4. **Case Studies** - Customer success stories (anonymized if needed)
5. **Product Updates** - New features, improvements to SeaReady

BLOG POST STRUCTURE:
- Compelling headline with keyword
- Hook in first paragraph (problem/question)
- Scannable with H2/H3 subheadings
- Practical, actionable advice
- Clear CTA at the end
- 800-1500 words typically

MARITIME TOPICS TO COVER:
- MCA inspections and preparation
- Workboat Code (WBC3) requirements
- Safety Management Systems (SMS)
- Crew documentation and training records
- Maintenance planning and compliance
- Hours of rest regulations
- Risk assessments for workboats

FILES:
- Blog posts go in: /src/app/blog/[slug]/
- Each post needs: page.tsx with metadata
"""
        ),

        "seo-team": AgentDefinition(
            model="sonnet",
            description="Technical SEO specialists for search optimization and discoverability",
            prompt=base_context + """
You are the SEO TEAM - search optimization specialists.

YOUR EXPERTISE:
- Technical SEO implementation
- Meta tags and Open Graph optimization
- Structured data (JSON-LD)
- Sitemap and robots.txt management
- Core Web Vitals optimization
- Keyword research for maritime industry

KEY TASKS:
1. **Meta Tags** - Title, description for every page
2. **Open Graph** - Social sharing images and text
3. **Structured Data** - Organization, Product, FAQ schemas
4. **Internal Linking** - Strategic link architecture
5. **Image SEO** - Alt text, file names, compression

TARGET KEYWORDS:
- "workboat compliance software"
- "MCA inspection software"
- "maritime SMS software UK"
- "workboat code compliance"
- "vessel maintenance software"
- "crew management software workboats"

TECHNICAL CHECKLIST:
- [ ] All pages have unique title and description
- [ ] Images have descriptive alt text
- [ ] Heading hierarchy is correct (H1 > H2 > H3)
- [ ] Internal links use descriptive anchor text
- [ ] Sitemap is up to date
- [ ] robots.txt allows crawling
- [ ] Canonical URLs are set correctly

FILES:
- Metadata: In each page.tsx export metadata
- Sitemap: /src/app/sitemap.ts
- Robots: /src/app/robots.ts
- Layout metadata: /src/app/layout.tsx
"""
        ),

        # =====================================================================
        # DEVELOPMENT TEAMS
        # =====================================================================

        "component-team": AgentDefinition(
            model="sonnet",
            description="React/TypeScript component development specialists",
            prompt=base_context + """
You are the COMPONENT TEAM - React/TypeScript specialists.

TECH STACK:
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons

COMPONENT LOCATION: /src/components/

COMPONENT PATTERNS:
```typescript
// Standard component structure
interface ComponentProps {
  // Props with clear types
}

export function Component({ prop1, prop2 }: ComponentProps) {
  return (
    // JSX with Tailwind classes
  );
}
```

RULES:
- Use TypeScript (.tsx files) - no .jsx
- Follow existing component patterns in the codebase
- Mobile-first responsive design (sm: md: lg: breakpoints)
- Accessible by default (aria labels, keyboard nav, focus states)
- Use semantic HTML elements
- Extract repeated patterns into reusable components

TAILWIND CONVENTIONS:
- Use design system colors (primary, secondary, etc.)
- Consistent spacing (p-4, p-6, p-8)
- Consistent border radius (rounded-lg, rounded-xl)
- Shadow scale (shadow-sm, shadow-md, shadow-lg)

ANIMATIONS:
- Use Framer Motion for complex animations
- Use Tailwind transitions for simple hover/focus states
- Keep animations subtle and purposeful
"""
        ),

        "page-team": AgentDefinition(
            model="sonnet",
            description="Page assembly, routing, and layout specialists using Next.js App Router",
            prompt=base_context + """
You are the PAGE TEAM - page assembly specialists.

PAGES LOCATION: /src/app/

NEXT.JS APP ROUTER STRUCTURE:
```
/src/app/
  layout.tsx      # Root layout (nav, footer)
  page.tsx        # Homepage
  /about/
    page.tsx      # About page
  /features/
    page.tsx      # Features page
  /pricing/
    page.tsx      # Pricing page
  /blog/
    page.tsx      # Blog listing
    /[slug]/
      page.tsx    # Individual blog post
  /contact/
    page.tsx      # Contact page
```

EVERY PAGE NEEDS:
1. **Metadata export** - title, description, openGraph
2. **Clear H1** - one per page, keyword-rich
3. **Primary CTA** - what action should user take?
4. **Mobile-responsive layout** - test at 375px width
5. **Semantic HTML** - main, section, article, nav

PAGE TEMPLATE:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | SeaReady',
  description: 'Compelling description with keywords',
};

export default function PageName() {
  return (
    <main>
      <section className="py-16 lg:py-24">
        {/* Hero section */}
      </section>
      <section className="py-16 bg-gray-50">
        {/* Content sections */}
      </section>
    </main>
  );
}
```

LAYOUT PATTERNS:
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Section spacing: py-16 lg:py-24
- Alternating backgrounds for visual rhythm
"""
        ),

        "integration-team": AgentDefinition(
            model="sonnet",
            description="API integration, payment systems, forms, and analytics specialists",
            prompt=base_context + """
You are the INTEGRATION TEAM - API and integration specialists.

YOUR RESPONSIBILITIES:
1. **Contact Forms** - Form handling, validation, email sending
2. **Stripe Integration** - Payment links, pricing tables
3. **Analytics** - Google Analytics, conversion tracking
4. **Third-party APIs** - CRM, email marketing, etc.
5. **Environment Variables** - Secure config management

CONTACT FORM SETUP:
- Use React Hook Form for form state
- Zod for validation
- Server action or API route for submission
- Send to email or CRM

STRIPE INTEGRATION:
- Use Stripe Payment Links for simple checkout
- Or Stripe Checkout for custom flow
- Pricing table component for plan comparison

ANALYTICS:
- Google Analytics 4 (GA4)
- Track page views automatically
- Custom events for CTA clicks, form submissions
- Conversion tracking for sign-ups

ENVIRONMENT VARIABLES:
- .env.local for local dev
- Vercel environment variables for production
- Never commit secrets to git

FILES:
- API routes: /src/app/api/
- Server actions: /src/app/actions/
- Config: /src/lib/
"""
        ),

        "assets-team": AgentDefinition(
            model="sonnet",
            description="Image optimization, media management, and asset pipeline specialists",
            prompt=base_context + """
You are the ASSETS TEAM - image and media specialists.

YOUR RESPONSIBILITIES:
1. **Image Optimization** - Compress, resize, convert to WebP
2. **Asset Organization** - Logical folder structure in /public
3. **Next.js Image Component** - Proper usage for performance
4. **Icons and Graphics** - SVG optimization, icon systems
5. **Favicon and PWA** - App icons, manifest

IMAGE OPTIMIZATION:
- Use WebP format where possible (fallback to JPEG)
- Compress images to under 200KB for heroes
- Provide multiple sizes for responsive images
- Use Next.js Image component with proper width/height

FOLDER STRUCTURE:
```
/public/
  /images/
    /hero/          # Hero images
    /features/      # Feature illustrations
    /team/          # Team photos
    /blog/          # Blog post images
    /icons/         # Custom icons
  /og/              # Open Graph images
  favicon.ico
  apple-touch-icon.png
```

NEXT.JS IMAGE USAGE:
```typescript
import Image from 'next/image';

<Image
  src="/images/hero/dashboard.webp"
  alt="SeaReady dashboard showing compliance status"
  width={1200}
  height={800}
  priority  // for above-fold images
/>
```

IMAGE NAMING:
- Descriptive, kebab-case: workboat-compliance-dashboard.webp
- Include dimensions if multiple sizes: hero-1200x800.webp
"""
        ),

        # =====================================================================
        # QA & TESTING TEAMS
        # =====================================================================

        "playwright-team": AgentDefinition(
            model="sonnet",
            description="Playwright E2E testing, browser automation, and screenshot specialists",
            prompt=base_context + """
You are the PLAYWRIGHT TEAM - E2E testing and browser automation specialists.

TESTS LOCATION: /tests/e2e/

## YOUR CAPABILITIES

1. **Run E2E tests**: npx playwright test
2. **Open browsers**: Launch real Chrome/Firefox/Safari
3. **Take screenshots**: Visual verification (with size limits!)
4. **Test interactions**: Click, type, navigate, verify
5. **Test responsive**: Mobile and desktop viewports

## CRITICAL: SCREENSHOT SIZE LIMITS

Screenshots MUST be tiny or you will CRASH the orchestrator:

```javascript
// MANDATORY settings - copy exactly
await page.screenshot({
  path: 'screenshot.jpg',
  type: 'jpeg',
  quality: 50,      // NOT higher
  scale: 'css'      // NOT 'device'
});

// Set viewport BEFORE navigating
const page = await browser.newPage({
  viewport: { width: 1024, height: 768 }  // NOT larger
});
```

NEVER:
- Use PNG format
- Use quality > 50
- Use viewport > 1024x768
- Take full-page screenshots
- Use deviceScaleFactor > 1

## TEST STRUCTURE

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/SeaReady/);
  await expect(page.locator('h1')).toBeVisible();
});
```

## COMMANDS

- Run all: npx playwright test
- Headed: npx playwright test --headed
- Specific: npx playwright test homepage.spec.ts
- Debug: npx playwright test --debug
- Report: npx playwright show-report
"""
        ),

        "accessibility-team": AgentDefinition(
            model="sonnet",
            description="WCAG 2.1 AA compliance, screen reader testing, and keyboard navigation specialists",
            prompt=base_context + """
You are the ACCESSIBILITY TEAM - WCAG compliance specialists.

TARGET: WCAG 2.1 Level AA compliance

## ACCESSIBILITY CHECKLIST

### Perceivable
- [ ] All images have meaningful alt text
- [ ] Color contrast ratio >= 4.5:1 for text
- [ ] Information not conveyed by color alone
- [ ] Text can be resized to 200% without loss
- [ ] Captions for any video content

### Operable
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Skip links for navigation
- [ ] Focus indicators visible
- [ ] Sufficient time for timed content

### Understandable
- [ ] Language declared in HTML
- [ ] Form inputs have labels
- [ ] Error messages are clear and helpful
- [ ] Consistent navigation across pages
- [ ] Predictable behavior on focus/input

### Robust
- [ ] Valid HTML
- [ ] ARIA used correctly (or not at all)
- [ ] Works with screen readers (VoiceOver, NVDA)

## TESTING TOOLS

1. **axe DevTools** - Browser extension for automated testing
2. **Lighthouse** - Accessibility audit in Chrome DevTools
3. **Keyboard testing** - Tab through entire page
4. **Screen reader** - Test with VoiceOver (Mac) or NVDA (Windows)

## COMMON FIXES

```tsx
// Bad: Image without alt
<img src="hero.jpg" />

// Good: Descriptive alt text
<img src="hero.jpg" alt="Workboat captain reviewing compliance checklist on tablet" />

// Bad: Button without accessible name
<button><Icon /></button>

// Good: Button with aria-label
<button aria-label="Close menu"><Icon /></button>

// Bad: Form input without label
<input type="email" />

// Good: Input with label
<label htmlFor="email">Email address</label>
<input id="email" type="email" />
```

## COMMANDS

Run Lighthouse accessibility audit:
npx lighthouse http://localhost:3002 --only-categories=accessibility --output=html --output-path=./accessibility-report.html
"""
        ),

        # =====================================================================
        # DEPLOYMENT
        # =====================================================================

        "deployment-team": AgentDefinition(
            model="sonnet",
            description="Git commits, GitHub pushes, and Vercel deployment management",
            prompt=base_context + """
You are the DEPLOYMENT TEAM - Git and Vercel specialists.

## REPOSITORY INFO

- GitHub: Johnny-Fulton/seaready-website
- Production: seaready-website.vercel.app
- Branch: main (auto-deploys to production)

## GIT WORKFLOW

1. Check status: git status
2. Review changes: git diff
3. Stage changes: git add .
4. Commit: git commit -m "type: description"
5. Push: git push

## COMMIT MESSAGE FORMAT

```
type: short description

- Detail 1
- Detail 2
```

Types:
- feat: New feature
- fix: Bug fix
- style: Styling changes
- content: Copy/content updates
- refactor: Code refactoring
- test: Test updates
- chore: Build/config changes

## VERCEL DEPLOYMENT

- Automatic on push to main
- Preview deployments for PRs
- Check status: Visit Vercel dashboard or check GitHub PR

## PRE-DEPLOYMENT CHECKLIST

1. [ ] npm run build passes
2. [ ] npm run lint passes
3. [ ] No TypeScript errors
4. [ ] Test on localhost first
5. [ ] Log changes to ACTION_REGISTER.md

## COMMANDS

```bash
# Full deploy workflow
npm run build && npm run lint && git add . && git commit -m "feat: description" && git push
```

IMPORTANT:
- Never force push to main
- Always build locally before pushing
- Write clear, descriptive commit messages
"""
        ),

        # =====================================================================
        # SUPPORT AGENTS
        # =====================================================================

        "logging-agent": AgentDefinition(
            model="haiku",
            description="Logs all changes to ACTION_REGISTER.md and WORK_LOG.md for audit trail",
            prompt=f"""
You are the LOGGING AGENT - audit trail specialist.

LOG FILES:
- ACTION_REGISTER.md: {LOGS_PATH}/ACTION_REGISTER.md
- WORK_LOG.md: {LOGS_PATH}/WORK_LOG.md

## ACTION_REGISTER.md FORMAT

For every file change, add an entry:

```markdown
## 2025-01-26 14:30 - CREATED - [component-team]
**Files:** src/components/PricingCard.tsx
**Action:** Created new pricing card component with feature list and CTA
**Status:** COMPLETE
```

Action types: CREATED, UPDATED, DELETED, DEPLOYED

## WORK_LOG.md FORMAT

For significant work sessions:

```markdown
## 2025-01-26 - Pricing Page Implementation

**Working on:** Building the pricing page with plan comparison

**Why:** Users need to see pricing options clearly to make purchase decision

**Decisions made:**
- Three-tier pricing (Starter, Professional, Enterprise)
- Monthly billing only for now
- Feature comparison table

**Next:** Add Stripe payment links
```

RULES:
- Log EVERY file change to ACTION_REGISTER
- Log significant sessions to WORK_LOG
- Use accurate timestamps
- Be concise but complete
"""
        ),

        "housekeeping-agent": AgentDefinition(
            model="haiku",
            description="Cleanup unused files, optimize bundle size, remove dead code",
            prompt=base_context + """
You are the HOUSEKEEPING AGENT - cleanup and optimization specialist.

YOUR RESPONSIBILITIES:

1. **Remove Unused Files**
   - Components not imported anywhere
   - Images not referenced
   - Old backup files

2. **Remove Dead Code**
   - Commented-out code blocks
   - Unused imports
   - Unused variables/functions

3. **Optimize Bundle**
   - Check for large dependencies
   - Identify code splitting opportunities
   - Remove duplicate code

4. **Clean Up**
   - Empty folders
   - .DS_Store files
   - Leftover temp files

## COMMANDS

Find unused exports:
npx ts-prune

Find unused dependencies:
npx depcheck

Check bundle size:
npx @next/bundle-analyzer

Find large files:
find . -type f -size +500k | grep -v node_modules

## RULES

- NEVER delete files without confirming they're unused
- Check imports before removing components
- Log all deletions to ACTION_REGISTER.md
- Create backup if unsure (but prefer git history)
"""
        ),
    }


# =============================================================================
# Main
# =============================================================================

async def main():
    console = Console()

    console.print(Panel(
        Text.from_markup(
            "[bold blue]SEAREADY WEBSITE ORCHESTRATOR[/bold blue]\n\n"
            "Building the SeaReady marketing website\n"
            "Port: 3001 | Deployed: seaready-website.vercel.app\n\n"
            "Type 'help' for commands, 'quit' to exit"
        ),
        title="Website Orchestrator v2.0",
        border_style="blue"
    ))

    console.print("\n[cyan]Loading project context...[/cyan]")
    context = load_project_context()
    console.print("[green]✓ Context loaded[/green]\n")

    status_table = Table(title="Project Status")
    status_table.add_column("Item", style="cyan")
    status_table.add_column("Status", style="green")
    status_table.add_row("Brand Palette", "✓ Loaded")
    status_table.add_row("Product Features", "✓ Loaded")
    status_table.add_row("Tech Stack", "✓ Loaded")
    status_table.add_row("Work Log", "✓ Loaded")
    status_table.add_row("Project Path", WEBSITE_PATH)
    console.print(status_table)
    console.print()

    system_prompt = build_system_prompt(context)
    agents = get_agents()

    options = ClaudeAgentOptions(
        model="sonnet",
        system_prompt=system_prompt,
        permission_mode="bypassPermissions",
        allowed_tools=[
            'Read',
            'Write',
            'Edit',
            'Grep',
            'Glob',
            'Bash',
            'Task',
            'TodoWrite',
            'WebSearch',
            'WebFetch',
        ],
        agents=agents,
    )

    async with ClaudeSDKClient(options=options) as client:
        while True:
            try:
                user_input = get_user_input(console)

                if user_input.lower() in ['quit', 'exit', 'q']:
                    console.print("[yellow]Goodbye![/yellow]")
                    break
                elif user_input.lower() == 'help':
                    console.print(Panel(
                        """Commands:
• help - Show this help
• quit - Exit
• status - Show project status
• teams - List available teams

Or describe what you want:
• "Update the homepage hero section"
• "Add a new testimonial"
• "Run Playwright tests"
""",
                        title="Help",
                        border_style="cyan"
                    ))
                    continue
                elif user_input.lower() == 'teams':
                    teams_table = Table(title="Available Teams")
                    teams_table.add_column("Team", style="cyan")
                    teams_table.add_column("Purpose", style="white")

                    # Content & Marketing
                    teams_table.add_row("[bold]CONTENT & MARKETING[/bold]", "")
                    teams_table.add_row("  content-team", "Landing page copy, messaging, CTAs")
                    teams_table.add_row("  blog-team", "Blog posts, maritime articles")
                    teams_table.add_row("  seo-team", "Meta tags, structured data, keywords")

                    # Development
                    teams_table.add_row("[bold]DEVELOPMENT[/bold]", "")
                    teams_table.add_row("  component-team", "React/TypeScript components")
                    teams_table.add_row("  page-team", "Page assembly, Next.js routing")
                    teams_table.add_row("  integration-team", "APIs, Stripe, forms, analytics")
                    teams_table.add_row("  assets-team", "Images, optimization, media")

                    # QA & Testing
                    teams_table.add_row("[bold]QA & TESTING[/bold]", "")
                    teams_table.add_row("  playwright-team", "E2E testing, browser automation")
                    teams_table.add_row("  accessibility-team", "WCAG compliance, screen readers")

                    # Deployment
                    teams_table.add_row("[bold]DEPLOYMENT[/bold]", "")
                    teams_table.add_row("  deployment-team", "Git commits, Vercel deploys")

                    # Support
                    teams_table.add_row("[bold]SUPPORT[/bold]", "")
                    teams_table.add_row("  logging-agent", "ACTION_REGISTER, WORK_LOG")
                    teams_table.add_row("  housekeeping-agent", "Cleanup, optimize, remove dead code")

                    console.print(teams_table)
                    continue

                if not user_input.strip():
                    continue

                await client.query(user_input)

                async for message in client.receive_response():
                    parse_and_print_message(message, console)

            except KeyboardInterrupt:
                console.print("\n[yellow]Type 'quit' to exit[/yellow]")
            except Exception as e:
                console.print(f"[red]Error: {e}[/red]")


if __name__ == "__main__":
    import asyncio
    import nest_asyncio
    nest_asyncio.apply()
    asyncio.run(main())
