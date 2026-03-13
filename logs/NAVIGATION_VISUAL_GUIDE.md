# SeaReady Navigation Visual Guide
**Companion to UX_NAVIGATION_ANALYSIS.md**

---

## CURRENT vs. RECOMMENDED NAVIGATION

### Current Navigation (Inconsistent)

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]        SMS Consultancy | Resources | Pricing    │
│                | About                        [Login →]  │
└─────────────────────────────────────────────────────────┘

PROBLEMS:
❌ "Pricing" links to outdated SaaS page
❌ Resources page has NO navigation at all
❌ Waitlist page is hidden (not in nav)
❌ "SMS Consultancy" is too long for mobile
```

### Recommended Navigation (Consistent)

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]   Consultancy | App Waitlist | Resources | About |      │
│           Contact                        [Request Quote] [Login →]│
└─────────────────────────────────────────────────────────────────┘

IMPROVEMENTS:
✅ Clear product separation (Consultancy vs. App)
✅ Waitlist surfaced (strategic visibility)
✅ Resources accessible from all pages
✅ Prominent CTA button (Request Quote)
✅ Shorter labels (better for mobile)
```

---

## MOBILE NAVIGATION COMPARISON

### Current Mobile (Varies by Page)

```
┌───────────────────┐
│ [Logo]      [≡]  │
└───────────────────┘
    │ (tap menu)
    ▼
┌───────────────────┐
│ SMS Consultancy   │
│ Resources         │
│ Pricing           │ ← Outdated
│ About             │
│ ─────────────     │
│ Login             │
└───────────────────┘

ISSUES:
❌ No waitlist option
❌ No clear CTA
❌ Pricing confusing
```

### Recommended Mobile

```
┌───────────────────┐
│ [Logo]      [≡]  │
└───────────────────┘
    │ (tap menu)
    ▼
┌───────────────────┐
│ Consultancy       │ ← Shortened
│ App Waitlist      │ ← NEW!
│ Resources         │
│ About             │
│ Contact           │
│ ─────────────     │
│ [Request Quote]   │ ← Prominent CTA
│ Login             │
└───────────────────┘

FIXES:
✅ Waitlist accessible
✅ Clear CTA button
✅ Better labels
✅ Consistent across site
```

---

## HOMEPAGE HERO COMPARISON

### Current Hero CTAs

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Build Your WBC3-Compliant SMS                      │
│  Master Mariner-designed SMS in 14 days             │
│                                                     │
│  [Request Quote]  [Learn More]                      │
│   (Consultancy)   (Scroll down)                     │
│                                                     │
└─────────────────────────────────────────────────────┘

ANALYSIS:
✅ Clear primary CTA
❌ "Learn More" just scrolls (weak CTA)
❌ No app mention at all
❌ Single product focus (misses opportunity)
```

### Recommended Hero CTAs

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Build Your WBC3-Compliant SMS                      │
│  Master Mariner-designed SMS in 14 days             │
│                                                     │
│  [Request Quote]  [Preview Digital App →]           │
│   Primary: Orange    Secondary: Ghost/Outline       │
│   (Consultancy)      (App Waitlist)                 │
│                                                     │
└─────────────────────────────────────────────────────┘

IMPROVEMENTS:
✅ Dual-product CTAs
✅ Clear visual hierarchy (solid vs. outline)
✅ App gets early mention
✅ Users have choice
```

---

## USER JOURNEY VISUAL MAPS

### Journey 1: Consultancy Client Path

```
    GOOGLE SEARCH
    "WBC3 SMS help"
          │
          ▼
    ┌─────────┐
    │ HOMEPAGE│  ← Entry point
    └─────────┘
          │
    ┌─────┴──────┐
    │            │
    ▼            ▼
 [Resources] [About Page]
 Download       Check
 WBC3 guide   credentials
    │            │
    └─────┬──────┘
          │
          ▼
   ┌──────────────┐
   │ /consultancy │  ← Decision page
   └──────────────┘
          │
          ▼
   Review pricing tiers
   (Standard/Premium/Comprehensive)
          │
          ▼
   ┌──────────────────┐
   │ REQUEST QUOTE    │  ← CONVERSION!
   │ Form submission  │
   └──────────────────┘
          │
          ▼
   ┌──────────────────┐
   │ /sms-questionnaire│ ← Detailed intake
   └──────────────────┘
          │
          ▼
   SMS BUILD BEGINS
```

### Journey 2: App Waitlist Path

```
    SOCIAL MEDIA SHARE
    "Check out SeaReady app!"
          │
          ▼
    ┌──────────┐
    │ /waitlist│  ← Direct entry
    └──────────┘
          │
          ▼
    Review features:
    • Offline-first
    • Mobile apps
    • Auto compliance
    • £49/month expected
          │
          ▼
    ┌──────────────────┐
    │ JOIN WAITLIST    │  ← CONVERSION!
    │ Form + vessel info│
    └──────────────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
Need NOW?   Wait for app
    │           │
    ▼           ▼
/consultancy  Email
  Quote      nurture
```

### Journey 3: Resource Downloader Path (CURRENTLY BROKEN)

```
    GOOGLE SEARCH
    "WBC3 checklist download"
          │
          ▼
    ┌───────────┐
    │ /resources│  ← Entry point
    └───────────┘
          │
          ▼
    Download WBC3 checklist
    (Email capture)
          │
          ▼
    ❌ STUCK! No navigation
    ❌ Can't explore site
    ❌ Must use back button

    SHOULD BE:
          │
          ▼
    ✅ Nav always visible
    ✅ Can explore: /consultancy or /waitlist
    ✅ "Next Steps" suggestions
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
Need SMS?  Curious about app?
    │           │
    ▼           ▼
/consultancy  /waitlist
```

---

## DUAL-PRODUCT CTA STRATEGY

### Visual Hierarchy Examples

**OPTION 1: Side-by-Side (Equal Weight)**
```
┌───────────────────────────────────────────┐
│                                           │
│  Ready to get compliant?                  │
│                                           │
│  ┌──────────────┐  ┌──────────────┐      │
│  │ Get SMS Now  │  │ Join Waitlist│      │
│  │ Consultancy  │  │  For App     │      │
│  └──────────────┘  └──────────────┘      │
│                                           │
└───────────────────────────────────────────┘

USE CASE: When both products are equally important
CURRENT FIT: Not yet (consultancy is priority)
```

**OPTION 2: Primary/Secondary (Hierarchy)**
```
┌───────────────────────────────────────────┐
│                                           │
│  Build your SMS in 14 days                │
│                                           │
│  ┌────────────────────────┐               │
│  │  Request Quote Today   │  ← Primary    │
│  └────────────────────────┘  (Solid/Big)  │
│                                           │
│  Or preview our upcoming digital platform │
│  [Join App Waitlist →]       ← Secondary  │
│                              (Link/Small) │
│                                           │
└───────────────────────────────────────────┘

USE CASE: One product is priority, other is alternative
CURRENT FIT: ✅ YES (consultancy first, app second)
```

**OPTION 3: Stacked with Context**
```
┌───────────────────────────────────────────┐
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ AVAILABLE NOW                       │  │
│  │ Get your WBC3 SMS built             │  │
│  │ [Request Quote]  £1,500-£2,500      │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ COMING SOON                         │  │
│  │ Digital SMS management platform     │  │
│  │ [Join Waitlist]  £49/month expected │  │
│  └─────────────────────────────────────┘  │
│                                           │
└───────────────────────────────────────────┘

USE CASE: Clear differentiation needed
CURRENT FIT: ✅ GOOD for dedicated CTA sections
```

**RECOMMENDATION: Use Option 2 for hero, Option 3 for mid-page sections**

---

## PAGE-SPECIFIC NAVIGATION STATES

### Homepage
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Consultancy | App Waitlist | Resources | About | │
│        Contact                      [Request Quote] [Login]│
└─────────────────────────────────────────────────────────┘
│
▼ Page content:
• Hero: Consultancy-focused (70%)
• App preview section (30%)
• Both products accessible via nav
```

### Consultancy Page
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] 【Consultancy】| App Waitlist | Resources | About | │
│        Contact                      [Request Quote] [Login]│
└─────────────────────────────────────────────────────────┘
              ↑
        Active state (underline/bold)
│
▼ Page content:
• 100% consultancy content
• Subtle app mention at bottom:
  "Your SMS will migrate to digital platform when app launches"
```

### Waitlist Page
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Consultancy |【App Waitlist】| Resources | About | │
│        Contact                      [Request Quote] [Login]│
└─────────────────────────────────────────────────────────┘
                           ↑
                     Active state
│
▼ Page content:
• 100% app content (features, pricing, waitlist form)
• Clear consultancy alternative CTA:
  "Need SMS now? Get consultancy build while you wait"
```

### Resources Page (CURRENT - BROKEN)
```
┌─────────────────────────────────────────────────────────┐
│  ❌ NO NAVIGATION AT ALL!                               │
└─────────────────────────────────────────────────────────┘
│
▼ Page content:
• Header with title
• Resource cards
• Download forms
• ❌ No way to navigate to other pages
• ❌ Only "Back to home" link at bottom
```

### Resources Page (FIXED)
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Consultancy | App Waitlist |【Resources】| About | │
│        Contact                      [Request Quote] [Login]│
└─────────────────────────────────────────────────────────┘
                                           ↑
                                     Active state
│
▼ Page content:
• Header with title
• Resource cards
• Download forms
• ✅ Full navigation always visible
• ✅ Can explore consultancy or waitlist
• ✅ "Next Steps" section at bottom
```

---

## NAVIGATION EVOLUTION TIMELINE

### PHASE 1: NOW (Pre-Launch)
**Timeline:** Current - Next 2 months

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Consultancy | App Waitlist | Resources | About | │
│        Contact                      [Request Quote] [Login]│
└─────────────────────────────────────────────────────────┘

FOCUS:
• Consultancy: Live product, main revenue
• App Waitlist: Build anticipation, collect signups
• Resources: Support both products

HOMEPAGE SPLIT:
70% Consultancy ████████████████
30% App        ████████
```

### PHASE 2: PRE-LAUNCH (2-4 weeks before)
**Timeline:** ~January 2026

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Consultancy | Features ⭐NEW | Pricing | Resources│
│        | About                  [Start Free Trial] [Login]│
└─────────────────────────────────────────────────────────┘

CHANGES:
• "App Waitlist" → "Features" (app is real now!)
• "Pricing" added (app pricing tiers)
• CTA: "Start Free Trial" (beta access)
• ⭐ "Coming Soon" badge on nav items

HOMEPAGE SPLIT:
50% Consultancy ██████████
50% App        ██████████
```

### PHASE 3: LAUNCH (App goes live)
**Timeline:** ~February 2026

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Platform | Consultancy | Resources | Pricing |   │
│        About                      [Start Free Trial] [Login]│
└─────────────────────────────────────────────────────────┘

CHANGES:
• "Platform" first (app is now primary product)
• "Consultancy" second (still available)
• "Features" removed (merged into Platform)
• CTA: "Start Free Trial" (live signups)

HOMEPAGE SPLIT:
70% App        ████████████████
30% Consultancy ████████
```

### PHASE 4: POST-LAUNCH (App established)
**Timeline:** ~March 2026+

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Features | Pricing | Resources | About | Contact │
│                                  [Start Free Trial] [Login]│
└─────────────────────────────────────────────────────────┘

CHANGES:
• Pure app navigation
• Consultancy: Footer link or pricing page section
• "Platform" → "Features" (clearer for new visitors)

HOMEPAGE SPLIT:
90% App        ██████████████████
10% Consultancy ██

Consultancy mentioned as:
"Need custom SMS build? We still offer consultancy →"
```

---

## INFORMATION ARCHITECTURE DIAGRAM

### Current Site Map
```
seaready.co.uk
│
├─ Homepage
│  ├─ Hero (consultancy)
│  ├─ Problem/solution
│  ├─ How it works
│  ├─ Pricing tiers
│  ├─ Reviews services
│  ├─ Why choose
│  ├─ Resources teaser
│  ├─ App preview (buried)
│  └─ Closing CTA
│
├─ /consultancy ✅
│  ├─ Quote request form
│  └─ Link to questionnaire
│
├─ /waitlist ⚠️ (hidden)
│  ├─ App features
│  ├─ Pricing preview
│  ├─ Waitlist form
│  └─ FAQ
│
├─ /resources ❌ (no nav)
│  ├─ WBC3 checklist
│  ├─ Drill log template
│  └─ Email capture forms
│
├─ /about ✅
│  ├─ Founder story
│  └─ Credentials
│
├─ /contact ✅
│  └─ Contact form
│
├─ /sms-questionnaire ✅
│  ├─ 6-page detailed form
│  └─ Company/vessel info
│
├─ /pricing ❌ (outdated)
│  └─ Old SaaS pricing model
│
└─ /login ✅
   └─ Future app login

LEGEND:
✅ = Working well
⚠️ = Good content, bad visibility
❌ = Needs fixing
```

### Recommended Site Map
```
seaready.co.uk
│
├─ Homepage (consultancy-first, app-secondary)
│  └─ [Same structure, improved CTAs]
│
├─ PRODUCTS
│  │
│  ├─ /consultancy ✅ IN NAV
│  │  ├─ Quote request
│  │  ├─ Pricing tiers
│  │  └─ → /sms-questionnaire
│  │
│  └─ /waitlist ✅ IN NAV (NEW!)
│     ├─ App features
│     ├─ Expected pricing
│     ├─ Waitlist form
│     ├─ FAQ
│     └─ CTA to consultancy
│
├─ RESOURCES ✅ IN NAV (FIXED!)
│  │
│  ├─ /resources (hub)
│  │  ├─ ✅ Navigation added
│  │  ├─ WBC3 checklist
│  │  ├─ Drill log template
│  │  └─ "Next Steps" section
│  │
│  └─ /resources/[articles] (future)
│
├─ COMPANY ✅ IN NAV
│  │
│  ├─ /about
│  │  ├─ Founder story
│  │  ├─ Master Mariner credentials
│  │  └─ Why SeaReady
│  │
│  └─ /contact
│     └─ Contact form
│
└─ UTILITIES
   │
   ├─ /sms-questionnaire
   │  └─ Detailed intake form
   │
   ├─ /pricing → REDIRECT to /consultancy
   │  (or create dual pricing page)
   │
   └─ /login
      └─ Future app login

IMPROVEMENTS:
✅ All pages have consistent navigation
✅ Waitlist is discoverable
✅ Resources always accessible
✅ Clear product separation
✅ Logical hierarchy
```

---

## RESPONSIVE BREAKPOINT EXAMPLES

### Desktop (1280px+)
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [Logo]  Consultancy | App Waitlist | Resources | About |   │
│          Contact               [Request Quote] [Login →]     │
│                                                              │
└──────────────────────────────────────────────────────────────┘

LAYOUT:
• Full horizontal navigation
• All items visible
• CTA button prominent (right-aligned)
• Logo left, nav center, utilities right
```

### Tablet (768px - 1279px)
```
┌────────────────────────────────────────┐
│                                        │
│  [Logo]    Consultancy | App Waitlist │
│            Resources | About | Contact │
│            [Request Quote]    [Login →]│
│                                        │
└────────────────────────────────────────┘

LAYOUT:
• Nav items wrap to 2 rows if needed
• Or reduce font size
• CTA button still visible
• Consider sticky nav on scroll
```

### Mobile (< 768px)
```
┌───────────────────┐
│                   │
│ [Logo]      [≡]  │
│                   │
└───────────────────┘

COLLAPSED NAV
Tap [≡] to open menu:

┌───────────────────┐
│ Consultancy       │
│ App Waitlist      │
│ Resources         │
│ About             │
│ Contact           │
│ ───────────────   │
│ [Request Quote]   │
│ Login             │
└───────────────────┘

LAYOUT:
• Hamburger menu (standard pattern)
• Full-screen overlay
• Stacked vertical list
• CTA button prominent in menu
• Easy thumb access
```

---

## FINAL IMPLEMENTATION CHECKLIST

### Week 1: Critical Fixes

```
┌──────────────────────────────────────────────────────┐
│ ☐ FIX Resources page navigation                     │
│   ├─ Add: import NavbarTransparent                  │
│   ├─ Add: <NavbarTransparent /> component           │
│   └─ Test: Navigation appears, links work           │
│                                                      │
│ ☐ ADD Waitlist to main navigation                   │
│   ├─ Update: navbar-transparent.tsx                 │
│   ├─ Update: navbar.tsx (if used)                   │
│   ├─ Update: navbar-new.tsx (if used)               │
│   └─ Test: All pages show waitlist link             │
│                                                      │
│ ☐ UPDATE Navigation labels                          │
│   ├─ Change: "SMS Consultancy" → "Consultancy"      │
│   ├─ Verify: Mobile menu displays correctly         │
│   └─ Test: All pages consistent                     │
│                                                      │
│ ☐ FIX/REDIRECT Pricing page                         │
│   ├─ Option A: Redirect /pricing → /consultancy     │
│   ├─ Option B: Update with current pricing          │
│   └─ Test: No 404s, no confusion                    │
└──────────────────────────────────────────────────────┘
```

### Week 2: Enhancements

```
┌──────────────────────────────────────────────────────┐
│ ☐ ADD Dual CTAs to homepage hero                    │
│   ├─ Primary: "Request Quote" (solid orange)        │
│   ├─ Secondary: "Preview App" (ghost/outline)       │
│   └─ Test: Both CTAs clickable, hierarchy clear     │
│                                                      │
│ ☐ ENHANCE Resources page                            │
│   ├─ Add: "Next Steps" section                      │
│   ├─ Consider: Sticky navigation                    │
│   └─ Test: User flow to consultancy/waitlist        │
│                                                      │
│ ☐ ADD Cross-product CTAs                            │
│   ├─ Consultancy page: Subtle app mention           │
│   ├─ About page: CTA section at bottom              │
│   └─ Test: CTAs don't distract from main goal       │
└──────────────────────────────────────────────────────┘
```

### Pre-Launch (When app 2-4 weeks out)

```
┌──────────────────────────────────────────────────────┐
│ ☐ CREATE /features page                             │
│   ├─ Migrate: Waitlist content to features          │
│   ├─ Design: Detailed feature deep-dives            │
│   └─ Test: SEO, performance                         │
│                                                      │
│ ☐ UPDATE Navigation structure                       │
│   ├─ Add: "Features" nav item                       │
│   ├─ Add: "Coming Soon" badges                      │
│   └─ Test: User doesn't confuse beta with live      │
│                                                      │
│ ☐ PREPARE Homepage variant                          │
│   ├─ Design: 50/50 consultancy/app split            │
│   ├─ Update: CTAs for beta signup                   │
│   └─ Test: A/B test if possible                     │
└──────────────────────────────────────────────────────┘
```

---

## KEY DESIGN SPECS

### Navigation Bar Specs

```
HEIGHT: 80px (desktop), 64px (mobile)
BACKGROUND:
  - Transparent on hero (homepage)
  - White on other pages
  - Sticky: White with shadow on scroll

LOGO:
  - Height: 56px (desktop), 32px (mobile)
  - Position: Left-aligned, 24px padding

NAV ITEMS:
  - Font: 14px, semibold
  - Spacing: 48px between items
  - Hover: Underline or color change
  - Active: Bold + underline

CTA BUTTON:
  - Background: #c65d00 (brand orange)
  - Text: White, 14px, semibold
  - Padding: 12px 24px
  - Border-radius: 9999px (full rounded)
  - Hover: Opacity 0.9

LOGIN LINK:
  - Font: 14px, semibold
  - Color: Inherit nav text color
  - Arrow: → (right arrow entity)
```

### Mobile Menu Specs

```
TRIGGER:
  - Icon: Hamburger (3 bars)
  - Size: 24px × 24px
  - Touch target: 44px × 44px

OVERLAY:
  - Background: Navy (#4a5f7a)
  - Width: 100% (max 320px on tablet)
  - Animation: Slide from right
  - Duration: 300ms ease-in-out

MENU ITEMS:
  - Font: 16px, semibold
  - Color: White
  - Spacing: 16px vertical padding
  - Touch target: Full width, 48px height
  - Hover/Active: Background white/10

CTA IN MENU:
  - Full-width button
  - Orange background
  - 16px font, semibold
  - 16px vertical padding
  - Prominent position
```

### Color Palette Reference

```
BRAND COLORS:
  Navy:       #4a5f7a  (backgrounds, text)
  Sea Teal:   #14b8a6  (accents, badges)
  Orange:     #c65d00  (primary CTAs)

NEUTRALS:
  Gray 50:    #f9fafb  (light backgrounds)
  Gray 100:   #f3f4f6  (borders, dividers)
  Gray 600:   #4b5563  (body text)
  Gray 900:   #111827  (headings)

SEMANTIC:
  Success:    #10b981  (green)
  Error:      #ef4444  (red)
  Warning:    #f59e0b  (amber)
```

---

**End of Visual Guide**

**Next:** Review with team, prioritize implementation, execute fixes
