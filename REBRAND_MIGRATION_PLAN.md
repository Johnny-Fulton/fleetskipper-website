# SafeDeck Maritime Rebrand - Migration Plan

**Project:** SeaReady → SafeDeck Maritime Complete Rebrand
**Branch:** `safedeck-rebrand`
**Status:** IN PROGRESS
**Started:** 2025-01-27
**Target Domain:** safedeckmaritime.com

---

## ⚠️ CRITICAL: WE ARE ON A BRANCH

**NEVER FORGET:** All rebrand work is happening on the `safedeck-rebrand` branch.

- ✅ **Current live site:** `main` branch (seaready-website.vercel.app) - UNTOUCHED
- 🚧 **Rebrand work:** `safedeck-rebrand` branch - PREVIEW ONLY
- 🎯 **Go-live:** Merge `safedeck-rebrand` → `main` when approved

---

## 📋 REBRAND SCOPE

### Company Rebrand:
- **Old:** SeaReady Ltd
- **New:** SafeDeck Maritime

### Product Naming Changes:

| **Old Product Name** | **New Product Name** | **Status** |
|----------------------|----------------------|------------|
| SeaReady SMS Suite | SafeDeckOS Suite | 🔄 Pending |
| SeaReady Deck | SafeDeckOS \| Ops | 🔄 Pending |
| SeaReady Office | SafeDeckOS \| Audit | 🔄 Pending |
| SeaReady eMPX™ | SafeDeckOS \| Pilot | 🔄 Pending |
| SeaReady Consultancy | SafeDeck Consultancy | 🔄 Pending |
| Custom Solutions | SafeDeck Custom Solutions | 🔄 Pending |

### Future Products (not on site yet):
- SafeDeckOS | Port (PMIS for harbours)
- SafeDeckOS | Crew (future crew management)
- SafeDeckOS | Fleet (future fleet dashboard)

---

## 🎨 BRAND ASSETS

### Logos:
- **Source:** `/Users/jonathanfulton/Downloads/SafeDeck Logos/`
- **Files:**
  - `SafeDeck Logo.png` (full color - navy + cyan)
  - `SafeDeck Logo White.png` (white version for dark backgrounds)

### Brand Colors (extracted from logo):
- **Navy Blue:** ~#0E2A47 (logo primary)
- **Cyan/Teal:** ~#3BA5BC (logo accent + "Maritime" text)
- **Black:** For "SafeDeck" text
- **Existing site cyan:** #0891B2 (close to logo - may keep or adjust)

### Design Decision:
- ✅ **Keep existing UI/layout** - minimal design changes needed
- ✅ Logo fits existing maritime aesthetic
- ⚠️ May need minor color adjustments to match logo exactly

---

## 📁 FILES REQUIRING CHANGES

### 1. Brand/Context Files:
- [ ] `CLAUDE_CONTEXT/BRAND_PALETTE.md` - Update colors
- [ ] `CLAUDE_CONTEXT/PRODUCT_FEATURES.md` - Update product names
- [ ] `CLAUDE_CONTEXT/TECH_STACK.md` - Update project description
- [ ] `package.json` - Update project name/description
- [ ] `README.md` - Update project documentation

### 2. Logo/Asset Files:
- [ ] `/public/logo.svg` or `/public/logo.png` - Replace with SafeDeck logo
- [ ] `/public/logo-white.svg` or `/public/logo-white.png` - White version
- [ ] `/public/favicon.ico` - Generate from SafeDeck logo
- [ ] `/public/apple-touch-icon.png` - Generate from SafeDeck logo
- [ ] `/public/og-image.jpg` - Create SafeDeck branded OG image

### 3. Website Pages (ALL):
- [ ] `/src/app/page.tsx` - Homepage
- [ ] `/src/app/products/empx/page.tsx` - Rename to SafeDeckOS | Pilot
- [ ] `/src/app/products/sms-pro-app/page.tsx` - Rename to SafeDeckOS | Ops
- [ ] `/src/app/products/sms-suite/page.tsx` - Rename to SafeDeckOS Suite
- [ ] `/src/app/products/custom-solutions/page.tsx` - SafeDeck Custom Solutions
- [ ] `/src/app/consultancy/page.tsx` - SafeDeck Consultancy
- [ ] `/src/app/about/page.tsx` - Company info
- [ ] `/src/app/contact/page.tsx` - Contact page
- [ ] `/src/app/pricing/page.tsx` - Pricing page (if exists)
- [ ] All other pages in `/src/app/`

### 4. Components:
- [ ] `/src/components/navbar*.tsx` - Logo replacement
- [ ] `/src/components/primitives/SiteFooter.tsx` - Footer branding
- [ ] `/src/content/strings.ts` - All copy strings

### 5. Metadata/SEO:
- [ ] All page metadata (title, description, OG tags)
- [ ] `/src/app/layout.tsx` - Root metadata
- [ ] `/public/robots.txt` - Update domain references
- [ ] `/public/sitemap.xml` - Update domain if exists

---

## ✅ PRE-MERGE QA CHECKLIST

Before merging `safedeck-rebrand` → `main`, ALL must be checked:

### Brand Consistency:
- [ ] No "SeaReady" references anywhere (except old product history notes)
- [ ] All logos replaced with SafeDeck logos
- [ ] Brand colors consistent across all pages
- [ ] Company name = "SafeDeck Maritime" everywhere

### Product Naming:
- [ ] SafeDeckOS Suite (not SMS Suite)
- [ ] SafeDeckOS | Ops (not SeaReady Deck / SMS Pro App)
- [ ] SafeDeckOS | Audit (not SeaReady Office)
- [ ] SafeDeckOS | Pilot (not SeaReady eMPX)
- [ ] SafeDeck Consultancy
- [ ] SafeDeck Custom Solutions

### Technical QA:
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] All images optimized and loading correctly
- [ ] All internal links work
- [ ] No broken image references
- [ ] Favicon displays correctly
- [ ] OG image displays in link previews

### Visual QA (via screenshots):
- [ ] Homepage looks correct
- [ ] All product pages look correct
- [ ] Navigation works on mobile/desktop
- [ ] Footer displays correctly
- [ ] Logo displays correctly in navbar (light/dark variants)
- [ ] All CTAs work and point to correct pages

### SEO/Metadata:
- [ ] All page titles updated
- [ ] All meta descriptions updated
- [ ] All OG tags updated
- [ ] sitemap.xml updated (if exists)
- [ ] robots.txt reviewed

### Content Review:
- [ ] Messaging makes sense with new brand
- [ ] Product descriptions accurate
- [ ] No confusing old/new product references
- [ ] Contact information correct
- [ ] Legal pages reviewed (terms, privacy, etc.)

---

## 🚀 DEPLOYMENT WORKFLOW

### Phase 1: Development (NOW)
1. ✅ Create `safedeck-rebrand` branch
2. 🔄 Make all changes in branch
3. 🔄 Push to GitHub
4. 🔄 Vercel auto-deploys preview URL
5. 🔄 Review at preview URL

### Phase 2: Review & Iterate
1. User reviews preview deployment
2. Identify any issues/tweaks needed
3. Make adjustments in branch
4. Push updates → preview auto-updates
5. Repeat until approved

### Phase 3: Go-Live
1. ✅ Complete full QA checklist above
2. Merge `safedeck-rebrand` → `main`
3. Vercel auto-deploys to production
4. Monitor for issues
5. Set up Cloudflare DNS for safedeckmaritime.com

### Phase 4: Post-Launch
1. Configure safedeckmaritime.com in Cloudflare
2. Point DNS to Vercel
3. Update Vercel domain settings
4. Set up SSL certificate (auto via Vercel)
5. Test live domain
6. Update any external references (social media, etc.)

---

## 📊 CLOUDFLARE DNS SETUP (Phase 4)

**Domain:** safedeckmaritime.com
**Hosting:** Vercel (Next.js site)
**DNS Provider:** Cloudflare

### Steps:
1. In Cloudflare DNS settings for safedeckmaritime.com:
   - Add A record: `@` → `76.76.21.21` (Vercel)
   - Add CNAME record: `www` → `cname.vercel-dns.com`
2. In Vercel project settings:
   - Add custom domain: `safedeckmaritime.com`
   - Add custom domain: `www.safedeckmaritime.com`
3. Wait for SSL certificate (auto-provisioned)
4. Test both URLs

---

## 🔄 BRANCH STATUS TRACKING

**Current Branch:** `safedeck-rebrand`
**Last Updated:** 2025-01-27
**Preview URL:** TBD (after first push)

### Commit Strategy:
- Make atomic commits for each section
- Clear commit messages: "Rebrand: Update homepage to SafeDeck Maritime"
- Push frequently to keep preview updated

### Branch Protection:
- ⚠️ **NEVER commit directly to `main` during rebrand**
- All work goes through `safedeck-rebrand` branch
- Only merge to `main` when 100% approved

---

## 📝 NOTES & DECISIONS

### Design Decisions:
- Keeping existing UI/layout structure
- Existing cyan color (#0891B2) close enough to logo - may keep or adjust slightly
- Logo works perfectly with existing maritime aesthetic

### Product Strategy:
- SafeDeckOS = unified platform brand
- Module naming: | Ops, | Audit, | Pilot, | Port (future)
- Suite = bundled offering (Ops + Audit)
- Consultancy + Custom Solutions = service offerings

### Technical Notes:
- Next.js 15.4.4 (App Router)
- TypeScript
- Tailwind CSS v4
- Current deployment: seaready-website.vercel.app
- Target deployment: safedeckmaritime.com

---

## 🆘 IF THINGS GO WRONG

**Panic Button - Revert Everything:**
```bash
git checkout main
git branch -D safedeck-rebrand
git checkout -b safedeck-rebrand
# Start fresh
```

**Preview broken?**
- Check Vercel dashboard for build logs
- Ensure branch is pushed to GitHub
- Verify package.json scripts work locally

**Lost track of branch?**
```bash
git branch --show-current
# Should show: safedeck-rebrand
```

---

## ✅ COMPLETION CRITERIA

**This rebrand is DONE when:**
1. ✅ All QA checklist items completed
2. ✅ User approves preview deployment
3. ✅ Branch merged to `main`
4. ✅ Live site updated successfully
5. ✅ safedeckmaritime.com DNS configured
6. ✅ SSL certificate active
7. ✅ All old references redirected/updated

**After completion:**
- Archive this plan
- Update logs/ACTION_REGISTER
- Document any lessons learned
- Clean up old branch (optional - can keep for history)

---

**END OF MIGRATION PLAN**
