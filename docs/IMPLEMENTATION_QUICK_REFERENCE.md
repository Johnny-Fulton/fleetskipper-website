# WORKBOAT SMS LANDING PAGE - IMPLEMENTATION QUICK REFERENCE

**Use this for quick lookup during implementation. See WORKBOAT_LANDING_PAGE_PLAN.md for full details.**

---

## FILE PATHS (All Absolute)

**Create:**
```
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/content/workboat-strings.ts
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/app/workboat-sms/page.tsx
```

**Modify:**
```
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/components/navbar-transparent.tsx
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/content/strings.ts
```

**Reference:**
```
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/docs/WORKBOAT_LANDING_PAGE_PLAN.md
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/docs/STRATEGIC_CONTEXT_2025-12-10.md
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/logs/WORK_LOG.md
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/logs/ACTION_REGISTER.md
```

---

## PHASE 1: CREATE WORKBOAT STRINGS & PAGE

### `/src/content/workboat-strings.ts` Content Sections:
1. `meta` - title, meta description
2. `hero` - badge, heading, subheading, urgency banner, CTA
3. `vesselTypes` - 5 workboat types (CTV, survey, dive, tug, pilot)
4. `whyUs` - 6 reasons (built by mariners, speed, templates, pricing, support, workboat-specific)
5. `wbc3Breakdown` - 6 WBC3 requirements
6. `howItWorks` - 5 steps (discovery, template, customization, review, delivery)
7. `socialProof` - 3 testimonials from workboat operators
8. `faq` - 8 questions about WBC3
9. `finalCta` - final conversion section

### `/src/app/workboat-sms/page.tsx` Component Order:
1. NavbarTransparent (import existing)
2. Hero section
3. Vessel types section
4. Why us section
5. WBC3 breakdown section
6. How it works section
7. Social proof section
8. FAQ section
9. Final CTA section
10. Footer (import existing)

### Design System:
- Colors: Navy `#4a5f7a`, Burnt Orange `#c65d00`, Sea Teal `#14b8a6`
- Font: Existing typography system (Tailwind)
- Imagery: Use existing workboat-*.jpg files from `/public/images/workboats/`
- Layout: Tailwind CSS (no separate CSS files)
- Responsive: Mobile-first, tested on mobile/tablet/desktop

---

## PHASE 2: UPDATE NAVIGATION

### `/src/components/navbar-transparent.tsx` Changes:

**Old Navigation:**
```
Consultancy | Resources | Pricing | About
```

**New Navigation:**
```
Solutions ▼ | Resources | About | Contact
  ├─ Workboat SMS (WBC3)
  └─ SMS Consultancy
```

**Implementation Pattern:**
- Change "Consultancy" from single link to dropdown trigger
- Create dropdown menu with 2 items
- Keep same styling and transparency
- Test dropdown expands/collapses on mobile

### `/src/content/strings.ts` Changes:

**Update nav.links structure:**
```typescript
nav: {
  links: [
    {
      label: "Solutions",
      type: "dropdown",
      items: [
        { label: "Workboat SMS (WBC3)", href: "/workboat-sms" },
        { label: "SMS Consultancy", href: "/consultancy" }
      ]
    },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
}
```

---

## PHASE 3: TEST & DEPLOY

### Build & Test:
```bash
npm run build
# Expected: 23+ routes, no TypeScript errors

npm run dev
# Test: http://localhost:3001/workboat-sms
# Test: Navigation dropdown works
# Test: All CTAs link to /consultancy
```

### Git Commit:
```bash
git add -A

git commit -m "Implement /workboat-sms landing page and Solutions navigation

FEATURE: Create dedicated workboat SMS landing page for WBC3 advertising
- Created /src/content/workboat-strings.ts with WBC3-specific content
- Created /src/app/workboat-sms/page.tsx with landing page design
- Updated navbar with Solutions dropdown menu
- Updated strings.ts for dropdown navigation

STRATEGY: Landing page supports advertising campaigns targeting UK workboat
operators with Dec 2026 WBC3 deadline. Homepage maintains platform positioning.

Generated with Claude Code - [Agent Name]
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Deploy:
```bash
git push origin main
# Vercel auto-deploys from GitHub

# OR deploy directly:
vercel --prod
```

### Verify in Production:
- [ ] Navigate to seaready-website.vercel.app/workboat-sms
- [ ] Solutions dropdown visible and working
- [ ] All links functional
- [ ] Mobile responsive

---

## CONTENT QUICK SUMMARY

| Section | Key Message | CTA |
|---------|-------------|-----|
| Hero | "WBC3-Compliant SMS for UK Workboats" | Get Quote |
| Vessel Types | "Built for YOUR workboat operation" | - |
| Why Us | "Master Mariner, 2-4 weeks, proven templates, fair pricing" | - |
| WBC3 Breakdown | "Here's what you actually need..." | - |
| How It Works | "5 steps to compliance in 2-4 weeks" | - |
| Social Proof | Quotes from CTV, survey, and tug operators | - |
| FAQ | 8 questions about WBC3 and process | - |
| Final CTA | "Stop Procrastinating on WBC3" | Request Quote → /consultancy |

---

## NAVIGATION VERIFICATION

After updating navbar, verify these work:
- [ ] Homepage → Solutions visible
- [ ] Solutions dropdown → "Workboat SMS (WBC3)" → `/workboat-sms`
- [ ] Solutions dropdown → "SMS Consultancy" → `/consultancy`
- [ ] Resources link → `/resources`
- [ ] About link → `/about`
- [ ] Contact link → `/contact`
- [ ] Request Quote button → `/consultancy`
- [ ] Mobile dropdown collapses/expands
- [ ] All pages with NavbarTransparent show new nav

---

## TROUBLESHOOTING

**Build fails with TypeScript error:**
- Check imports match existing pattern
- Verify all types are defined
- Check no missing dependencies

**Navigation dropdown not appearing:**
- Verify NavbarTransparent.tsx updated correctly
- Check strings.ts has dropdown type structure
- Test in fresh browser (clear cache)

**Page not responsive on mobile:**
- Check Tailwind responsive classes (sm:, md:, lg:)
- Test on actual mobile device (not just browser devtools)
- Verify images scale with container

**Links go to wrong place:**
- Verify href paths are correct: `/workboat-sms`, `/consultancy`, etc.
- Check no typos in route paths
- Confirm pages exist where links point

---

## DEPLOYMENT CHECKLIST

**Before Commit:**
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Dev server works: `npm run dev`
- [ ] Page loads at `/workboat-sms`
- [ ] Navigation dropdown works
- [ ] All CTAs link to `/consultancy`
- [ ] Mobile responsive
- [ ] No console errors

**Before Push:**
- [ ] Changes staged: `git add -A`
- [ ] Commit message detailed and clear
- [ ] Committed: `git commit -m "..."`

**Before Deploy:**
- [ ] Pushed: `git push origin main`
- [ ] Check GitHub shows new commit
- [ ] Vercel shows build triggered

**After Deploy:**
- [ ] Vercel build succeeded
- [ ] Live at seaready-website.vercel.app/workboat-sms
- [ ] Navigation works in production
- [ ] Links functional
- [ ] Mobile responsive in production

---

## QUICK LINKS TO REFERENCE DOCS

**Strategic Planning:**
- Strategic Context: `/docs/STRATEGIC_CONTEXT_2025-12-10.md`
- Full Implementation: `/docs/WORKBOAT_LANDING_PAGE_PLAN.md`

**Progress Tracking:**
- Work Log: `/logs/WORK_LOG.md`
- Action Register: `/logs/ACTION_REGISTER.md`

**Existing Code Reference:**
- Navigation component: `/src/components/navbar-transparent.tsx`
- Content strings pattern: `/src/content/strings.ts` or `/src/content/consultancy-strings.ts`
- Page examples: `/src/app/consultancy/page.tsx` or `/src/app/about/page.tsx`
- Images: `/public/images/workboats/`

---

## KEY CONTACTS & INFO

**Project Owner:** Jonathan Fulton
**Project Root:** `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/`
**Dev Server:** `npm run dev` (port 3001)
**Production Build:** `npm run build`
**Deploy Command:** `vercel --prod`
**Live Site:** seaready-website.vercel.app
**Live Page:** seaready-website.vercel.app/workboat-sms

---

**Last Updated:** 2025-12-10
**Status:** Ready for Implementation
**Estimated Time:** 3-4 hours (Phases 1-3)
