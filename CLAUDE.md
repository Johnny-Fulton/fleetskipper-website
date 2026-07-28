# FleetSkipper Product Website — Agent Rulebook

## What this is
The FleetSkipper product marketing website — Next.js 14+, TypeScript, Tailwind CSS 4,
deployed on Vercel. Markets the FleetSkipper compliance app to UK workboat operators.

## Repository
- **Path:** `/Users/jonathanfulton/REGULATION APP/FleetSkipper/website`
- **GitHub:** `Johnny-Fulton/fleetskipper-website`
- **Branch:** `main` (auto-deploys to Vercel)
- **Live:** fleetskipper.com

## Run commands
```bash
npm run dev         # Dev server on localhost:3002
npm run build       # Production build
npm run test        # Playwright E2E tests
npm run lint        # ESLint check
npm run typecheck   # TypeScript check
npm run check:all   # Full check (anchors, hex, typecheck, lint)
```

## Context and brand
Read these FIRST — they define the brand, features, and content guidelines:
- `CLAUDE_CONTEXT/BRAND_PALETTE.md` — colours, typography, spacing
- `CLAUDE_CONTEXT/PRODUCT_FEATURES.md` — what FleetSkipper does
- `CLAUDE_CONTEXT/CONTENT_REFERENCE.md` — tone, messaging, audience
- `CLAUDE_CONTEXT/TECH_STACK.md` — Next.js, TypeScript, Tailwind, etc.

## Local logs (in this repo)
- `logs/ACTION_REGISTER.md` — audit trail of file changes (log every edit here)
- `logs/WORK_LOG.md` — narrative log of sessions and decisions

## Records home (company-level, separate repo)
- **Path:** `/Users/jonathanfulton/opnautic-records/websites/fleetskipper/`
- `inbox.md` — priority flags
- `deploy-log.md` — what shipped, when, rollback refs
- `content-log.md` — content updates
- `reports/` — investigations and audits

**At the START of every session, check `opnautic-records/websites/fleetskipper/inbox.md` for
open flags and raise them with Jonathan before other work.**

## /team integration
This site is served by the `/team` harness. The team roles in
`maritime-shared-infra/team-harness/roles/` include:
- `website-designer.md` — UI components, layouts
- `website-content.md` — copywriting, blog posts
- `website-seo.md` — meta tags, structured data
- `website-analytics.md` — GA4, event tracking
- `website-qa.md` — Playwright, accessibility
- `website-deploy.md` — git, Vercel deploys
- `website-maintenance.md` — cleanup, optimization
- `website-expert-fleetskipper.md` — orientation map for this site

## Housekeeping rule
> **Housekeeping:** File all durable output to the OpNautic records home, never loose/scattered.
> Investigations & reviews → `opnautic-records/websites/fleetskipper/reports/` (dated, plain name).
> Deploy notes → `deploy-log.md`. Content updates → `content-log.md`. Local file changes →
> `logs/ACTION_REGISTER.md`. Secrets never go in any of it.

## Tech stack (quick reference)
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel (auto-deploy on push to `main`)

## Critical rules
1. **Log every file change** to `logs/ACTION_REGISTER.md`.
2. **Follow brand guidelines** in `CLAUDE_CONTEXT/`.
3. **Mobile-first** — responsive design, test at 375px.
4. **Accessible by default** — semantic HTML, aria labels, focus states.
5. **UK English** — harbour not harbor, colour not color.
6. **Never commit secrets** — env vars go in `.env.local` (git-ignored).
7. **Build locally before pushing** — `npm run build` must pass.
