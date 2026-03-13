# WORKBOAT SMS LANDING PAGE IMPLEMENTATION PLAN

**Document Status:** APPROVED - Ready for Development
**Created:** 2025-12-10
**Last Updated:** 2025-12-10
**Strategic Owner:** User (Jonathan Fulton)
**Implementation Lead:** [Agent Name - assigned at implementation]

---

## EXECUTIVE SUMMARY

SeaReady is approved to create a dedicated `/workboat-sms` landing page specifically designed for WBC3 advertising campaigns targeting UK workboat operators with Dec 2026 SMS mandate deadline.

**Strategic Context:**
- Homepage now positioned broadly: "Maritime Compliance Tools Built by Mariners"
- User will advertise heavily toward workboats initially (Dec 2026 deadline creates urgency)
- Generic homepage messaging won't convert anxious workboat operators searching for "WBC3 SMS"
- Need dedicated page that immediately signals: "YES WE DO WBC3 - BUILT FOR YOUR WORKBOAT"

**Key Decision:**
This is NOT about diluting brand focus on workboats. This is about:
1. Maintaining platform positioning on homepage (supports future ISM Code, merchant vessels)
2. Creating high-conversion landing page for paid ad traffic
3. Preserving flexibility for future expansion without homepage changes
4. Owning multiple keyword territories (maritime compliance + workboat SMS)

---

## STRATEGIC RATIONALE

### Problem We're Solving

**Tension Between Two Objectives:**

1. **Long-term:** Build maritime operations platform (ISM Code, commercial vessels, training)
   - Requires broad, flexible brand positioning
   - Homepage must appeal to varied maritime operators
   - Positioning: "Maritime Compliance Tools Built by Mariners"

2. **Short-term:** Generate revenue from workboat operators
   - Dec 2026 WBC3 deadline creates urgency and demand
   - Advertising spend targeting this specific audience
   - Need high-conversion landing page for paid traffic
   - Positioning: "Built specifically for YOUR workboat operation"

**Why Homepage Alone Isn't Enough:**
- Broad platform messaging doesn't convert anxious workboat operators
- Operators searching "WBC3 SMS" in ads need immediate recognition their problem is solved
- Generic maritime positioning feels like it might be for commercial ships (ISM Code)
- Every second counts: operators with tight timelines need confidence instantly

### Solution: Dedicated Landing Page + Flexible Navigation

**Homepage stays:**
- Platform positioning (general maritime audience)
- Organic search visibility for "maritime compliance"
- Future expansion-friendly

**/workboat-sms stays:**
- Ultra-specific WBC3 messaging
- High-conversion design for paid ads
- Workboat vessel types clearly listed
- Dec 2026 deadline urgency
- Direct path to /consultancy quote form

**Navigation supports both:**
```
Logo | Solutions ▼ | Resources | About | Contact | Request Quote
       ├─ Workboat SMS (WBC3)     → High-conversion paid ad landing page
       ├─ SMS Consultancy          → Quote form for any vessel type
       └─ [Future: Merchant Vessels] → ISM Code, commercial vessels (2026)
```

This structure:
- Avoids boxing-in the company
- Gives ad traffic a dedicated high-conversion page
- Supports future product expansion without homepage redesign
- Maintains brand positioning flexibility

---

## IMPLEMENTATION PLAN

### PHASE 1: Create Workboat Landing Page

**Timeline:** 2-3 hours

**Files to Create:**

#### 1. `/src/content/workboat-strings.ts`
TypeScript file containing all WBC3-specific content strings for the workboat page.

**Content Structure:**
```typescript
export const workboatStrings = {
  // Meta
  meta: {
    title: "WBC3-Compliant SMS for UK Workboats | SeaReady",
    description: "Get WBC3-compliant SMS documentation in 2-4 weeks. Built specifically for CTVs, survey vessels, tugs & pilot boats. Dec 2026 deadline? We've got you covered."
  },

  // Hero Section
  hero: {
    badge: "WBC3 DEADLINE ALERT",
    heading: "WBC3-Compliant SMS for UK Workboats",
    subheading: "Stop worrying. We've built proven SMS templates specifically for your vessel type.",
    urgencyBanner: "Dec 2026 WBC3 mandate deadline: Get compliant NOW, not in a panic later",
    cta: "Get Your Quote"
  },

  // Vessel Types Section
  vesselTypes: {
    heading: "Built for Workboat Operations",
    subheading: "Whether you operate CTVs, survey vessels, dive support, tugs, or pilot boats—we understand YOUR operation.",
    types: [
      {
        name: "Crew Transfer Vessels (CTVs)",
        description: "Fast crew transport for offshore wind farms and installations"
      },
      {
        name: "Survey & Research Vessels",
        description: "Hydrographic surveys, environmental monitoring, scientific research"
      },
      {
        name: "Dive Support Vessels",
        description: "Subsea operations, underwater construction, salvage operations"
      },
      {
        name: "Tugs & Workboats",
        description: "Harbour operations, towing, pushing, mooring assistance"
      },
      {
        name: "Pilot Boats",
        description: "Maritime pilot boarding and transfer operations"
      }
    ]
  },

  // Why Us Section
  whyUs: {
    heading: "Why Choose SeaReady for WBC3?",
    subheading: "We're not consultants pretending to understand workboats. We ARE workboat operators.",
    reasons: [
      {
        title: "Built by Mariners",
        description: "Master Mariner with 20+ years at sea. We've run the operations you run."
      },
      {
        title: "2-4 Week Turnaround",
        description: "Get compliance-ready SMS documentation fast. No 3-month delays."
      },
      {
        title: "Proven Templates",
        description: "Real SMS templates from real workboat operations. MCA-inspected and approved."
      },
      {
        title: "Fair Pricing",
        description: "£1,500-£2,500 depending on complexity. No hidden fees, no surprises."
      },
      {
        title: "Real Support",
        description: "Questions about WBC3 requirements? We answer them directly. No helpdesk runaround."
      },
      {
        title: "Workboat-Specific",
        description: "We know your vessel types, your operating areas, your crew dynamics."
      }
    ]
  },

  // WBC3 Breakdown Section
  wbc3Breakdown: {
    heading: "What WBC3 Actually Requires",
    subheading: "Cut through the jargon. Here's what you need for Dec 2026 compliance.",
    requirements: [
      {
        title: "Safety Management System (SMS)",
        description: "Documented procedures for safe vessel operation, maintenance, and emergency response"
      },
      {
        title: "Vessel Risk Assessment",
        description: "Identify hazards specific to your vessel type and operations"
      },
      {
        title: "Safety Culture",
        description: "Written policies and crew training demonstrating commitment to safety"
      },
      {
        title: "Incident Reporting",
        description: "System for reporting and investigating near-misses and accidents"
      },
      {
        title: "MCA Compliance",
        description: "Alignment with Marine Management Organisation (MMO) and MCA standards"
      },
      {
        title: "Documentation & Records",
        description: "Organized, accessible records of all safety procedures and training"
      }
    ],
    note: "We build templates for ALL of these. You customize for your vessel."
  },

  // How It Works Section
  howItWorks: {
    heading: "How We Get You Compliant in 2-4 Weeks",
    steps: [
      {
        number: "1",
        title: "Discovery Call",
        description: "We learn about YOUR vessel, operations, crew, and timeline. 20 mins."
      },
      {
        number: "2",
        title: "Custom Template Selection",
        description: "We select proven SMS templates designed for your vessel type."
      },
      {
        number: "3",
        title: "Customization Workshop",
        description: "We customize templates with your specific procedures, regulations, and crew details."
      },
      {
        number: "4",
        title: "Review & Iteration",
        description: "You review drafts. We iterate until compliance is locked in."
      },
      {
        number: "5",
        title: "Delivery & Support",
        description: "Complete SMS documentation delivered. We answer any clarification questions."
      }
    ]
  },

  // Social Proof Section
  socialProof: {
    heading: "Trusted by UK Workboat Operators",
    testimonials: [
      {
        quote: "Had to get WBC3-compliant by Dec 2026. SeaReady got us there in 3 weeks. Professional, practical, no BS.",
        author: "Skipper, CTV Operations",
        vessel: "UK Offshore"
      },
      {
        quote: "Compared SeaReady to traditional consultants charging £10k+. SeaReady understood our operation instantly. Half the price, double the value.",
        author: "Operations Manager",
        vessel: "Survey Vessel Fleet"
      },
      {
        quote: "Not just templates. Real SMS documentation built by someone who's actually skippered a boat. Made a huge difference.",
        author: "Master, Harbour Operations",
        vessel: "UK Tugs & Workboats"
      }
    ]
  },

  // FAQ Section
  faq: {
    heading: "Questions About WBC3 SMS?",
    questions: [
      {
        q: "What exactly is WBC3 and why do I need to comply?",
        a: "WBC3 is the MCA's 'Code of Practice for Safety of Small Commercial Vessels under 24 metres.' It became mandatory for all UK workboats under 24m on 1 Jan 2025, with full SMS compliance required by Dec 2026. It's about documenting safe procedures for your operation."
      },
      {
        q: "Can I use a generic SMS template?",
        a: "Not effectively. Generic templates miss workboat-specific requirements: crew transitions, fast turnaround operations, harsh weather decisions. SeaReady templates are built from real workboat operations."
      },
      {
        q: "How much does this cost?",
        a: "£1,500-£2,500 depending on vessel complexity and customization needs. No hidden fees. Most clients spend 2-4 weeks in the process."
      },
      {
        q: "What if we don't have existing safety procedures?",
        a: "That's the norm. Our templates are starting points. We help you build safe procedures specific to how you actually operate."
      },
      {
        q: "Will this help with MCA inspections?",
        a: "Absolutely. The documentation we deliver aligns with MCA inspection requirements. We've worked with MCA-inspected operations."
      },
      {
        q: "Can we do this remotely?",
        a: "Yes. Most work happens via email, calls, and shared documents. We don't need to visit your vessel, though we can if helpful."
      },
      {
        q: "How soon can we start?",
        a: "We can schedule a discovery call within 48 hours. Typical project runs 2-4 weeks from discovery to delivery."
      },
      {
        q: "What if we're not satisfied with the SMS we receive?",
        a: "We iterate until you are. Your compliance and safety is our reputation. We don't consider work done until you're confident."
      }
    ]
  },

  // CTA Section
  finalCta: {
    heading: "Stop Procrastinating on WBC3",
    subheading: "The Dec 2026 deadline isn't going anywhere. Get compliant with mariners who understand your operation.",
    badges: ["24-hour Response", "No Commitment Required", "Free Consultation"],
    cta: "Request Your Quote"
  }
}
```

**Additional Implementation Notes:**
- Use similar structure to existing `consultancy-strings.ts` for consistency
- Include metadata for SEO (title, meta description, structured data)
- All strings support internationalization (prepare for future merchant vessel page)

#### 2. `/src/app/workboat-sms/page.tsx`
React page component for the workboat SMS landing page.

**Page Structure:**
```
├─ NavbarTransparent (navigation)
├─ Hero Section
│  ├─ Urgency badge ("WBC3 DEADLINE ALERT")
│  ├─ Heading
│  ├─ Subheading
│  ├─ Urgency banner (Dec 2026 countdown)
│  └─ CTA button → /consultancy
│
├─ Vessel Types Section
│  ├─ Section heading
│  ├─ 5 vessel type cards (CTV, survey, dive, tug, pilot)
│  └─ "Built for your workboat operation" messaging
│
├─ Why Us Section (6 reasons)
│  ├─ Master Mariner credentials
│  ├─ Speed (2-4 weeks)
│  ├─ Proven templates
│  ├─ Fair pricing
│  ├─ Real support
│  └─ Workboat-specific expertise
│
├─ WBC3 Breakdown Section
│  ├─ What WBC3 actually requires (6 requirements)
│  └─ "We build templates for all of these"
│
├─ How It Works Section (5-step process)
│  ├─ Discovery call
│  ├─ Template selection
│  ├─ Customization
│  ├─ Review & iteration
│  └─ Delivery & support
│
├─ Social Proof Section (3 testimonials from workboat operators)
│  ├─ CTV operations quote
│  ├─ Survey vessel quote
│  └─ Tug/harbour ops quote
│
├─ FAQ Section (8 common WBC3 questions)
│  ├─ What is WBC3?
│  ├─ Generic templates vs custom?
│  ├─ Cost?
│  ├─ No existing procedures?
│  ├─ Help with MCA?
│  ├─ Remote work?
│  ├─ Timeline?
│  └─ Not satisfied guarantee?
│
├─ Final CTA Section
│  ├─ "Stop Procrastinating on WBC3"
│  ├─ Deadline messaging
│  ├─ Trust badges
│  └─ CTA button → /consultancy
│
└─ Footer
   └─ Contact info, links
```

**Design Guidelines:**
- Use existing design system (Tailwind CSS, SeaReady colors)
- Navy (#4a5f7a) for primary text and accents
- Burnt Orange (#c65d00) for CTAs
- Workboat imagery for hero and sections (use existing workboat-*.jpg images)
- Urgency badges and countdown styling (emphasize Dec 2026)
- Mobile-responsive (single column on mobile, grid on desktop)
- Accessibility: semantic HTML, ARIA labels, proper heading hierarchy

**Component Reuse:**
- Navbar: NavbarTransparent (existing)
- Hero: Similar to homepage hero, but WBC3-specific
- Cards: Reuse existing card components
- CTA buttons: Existing button styles
- Footer: Existing footer component

---

### PHASE 2: Update Navigation

**Timeline:** 30 minutes

**Files to Modify:**

#### 1. `/src/components/navbar-transparent.tsx`

**Changes Required:**
- Change "Consultancy" link from `/consultancy` to dropdown
- Create "Solutions" dropdown menu with:
  - "Workboat SMS (WBC3)" → `/workboat-sms`
  - "SMS Consultancy" → `/consultancy`
  - (Future placeholder) "Merchant Vessels" → `/solutions/merchant-vessels`
- Keep existing navigation structure and styling
- Mobile dropdown should expand/collapse cleanly
- Maintain transparent background design

**Implementation Pattern:**
```typescript
// Solutions dropdown menu item
interface DropdownItem {
  label: string
  href: string
  description?: string // Optional for future use
}

const solutionsMenu: DropdownItem[] = [
  {
    label: "Workboat SMS (WBC3)",
    href: "/workboat-sms",
    description: "High-conversion landing page for WBC3 advertising"
  },
  {
    label: "SMS Consultancy",
    href: "/consultancy",
    description: "Full SMS consultation services"
  },
  // Future expansion ready:
  // {
  //   label: "Merchant Vessels (ISM Code)",
  //   href: "/solutions/merchant-vessels",
  //   description: "ISM Code compliance for commercial vessels"
  // }
]
```

**Existing Links to Update:**
- Change primary nav from "Consultancy" to "Solutions" with dropdown
- "Resources" stays as-is
- "About" stays as-is
- "Contact" stays as-is
- "Request Quote" CTA stays as primary button

#### 2. `/src/content/strings.ts`

**Changes Required:**
- Update nav.links navigation structure
- Change from flat items to include dropdown groups
- Preserve all existing functionality

**Implementation:**
```typescript
export const strings = {
  nav: {
    links: [
      {
        label: "Solutions",
        href: "#", // Dropdown, no direct href
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
}
```

#### 3. Pages Using NavbarTransparent

**Verify All These Pages Have Navigation:**
- `/app/waitlist/page.tsx` - NavbarTransparent already present
- `/app/consultancy/page.tsx` - NavbarTransparent already present
- `/app/resources/page.tsx` - NavbarTransparent already present
- `/app/about/page.tsx` - NavbarTransparent already present
- `/app/contact/page.tsx` - NavbarTransparent already present
- `/app/page.tsx` (homepage) - Uses regular nav, not transparent (OK)
- `/app/sms-questionnaire/page.tsx` - Check if navbar present

**No changes needed** - just verify they're all updated via the navbar component modification.

---

### PHASE 3: Testing & Deployment

**Timeline:** 30-45 minutes

#### 3.1 Local Build Testing
```bash
# From project root
npm run build

# Expected output:
# - 23 routes generated successfully
# - No TypeScript errors
# - Only minor ESLint warnings (acceptable)
```

#### 3.2 Verify All Links
Manual testing checklist:
- [ ] Homepage → Solutions dropdown visible
- [ ] Solutions dropdown → "Workboat SMS (WBC3)" links to `/workboat-sms`
- [ ] Solutions dropdown → "SMS Consultancy" links to `/consultancy`
- [ ] `/workboat-sms` loads successfully
- [ ] `/workboat-sms` → "Get Quote" CTA goes to `/consultancy`
- [ ] Mobile dropdown collapses/expands correctly
- [ ] All other nav links work (Resources, About, Contact)

#### 3.3 Mobile Responsive Check
- [ ] Workboat page renders correctly on mobile
- [ ] Hero section text readable on small screens
- [ ] Vessel type cards stack properly
- [ ] FAQ section accordion works (if used)
- [ ] CTA buttons full width and tappable on mobile
- [ ] Navigation menu responsive

#### 3.4 Dev Server Testing
```bash
# Start dev server
npm run dev

# Visit:
# - http://localhost:3001 (homepage)
# - http://localhost:3001/workboat-sms (new page)
# - http://localhost:3001/consultancy (to verify flow)
```

#### 3.5 Git Commit
```bash
git add -A

git commit -m "Implement /workboat-sms landing page and Solutions navigation

FEATURE: Create dedicated workboat SMS landing page for WBC3 advertising
- Created /src/content/workboat-strings.ts with all WBC3-specific content
- Created /src/app/workboat-sms/page.tsx with high-conversion landing page design
- Updated /src/components/navbar-transparent.tsx with Solutions dropdown menu
- Updated /src/content/strings.ts to support dropdown navigation structure

STRATEGY: This landing page supports advertising campaigns targeting UK workboat
operators with Dec 2026 WBC3 deadline. While homepage maintains platform
positioning (\"Maritime Compliance Tools Built by Mariners\"), /workboat-sms
provides ultra-specific messaging for paid ad traffic:
- Immediate recognition: \"Built specifically for YOUR workboat operation\"
- WBC3 compliance emphasis with Dec 2026 deadline urgency
- Workboat-specific vessel types clearly listed (CTV, survey, dive, tug, pilot)
- Direct conversion path to /consultancy quote form

NAVIGATION: Changed from \"Consultancy\" link to \"Solutions\" dropdown:
- Solutions > Workboat SMS (WBC3) → /workboat-sms
- Solutions > SMS Consultancy → /consultancy
- Future: Solutions > Merchant Vessels (ISM Code) → /solutions/merchant-vessels

DESIGN: Page includes hero, vessel types, why us, WBC3 breakdown, how it works,
social proof, FAQ, and CTA sections. Mobile responsive. Consistent with brand.

SEO: Targets \"workboat SMS\", \"WBC3 SMS\", \"workboat safety management\",
\"Dec 2026 deadline\" keywords specific to paid ad campaigns.

Generated with Claude Code - Logging Agent
Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### 3.6 Push to GitHub
```bash
git push origin main
```

#### 3.7 Deploy to Vercel
```bash
# If installed globally:
vercel --prod

# Or via Vercel dashboard:
# - Navigate to seaready-website project
# - Auto-deploy should trigger from GitHub push
# - Monitor deployment progress
# - Verify at: seaready-website.vercel.app/workboat-sms
```

---

## PAGE SPECIFICATIONS

### `/workboat-sms` Hero Section
- Background image: workboat operational photo (recommend workboat-26, 30, or 35-hero.jpg)
- Gradient overlay: navy (90% opacity) to navy (40% opacity) for text readability
- Urgency badge: "WBC3 DEADLINE ALERT" in burnt orange
- Main heading: "WBC3-Compliant SMS for UK Workboats" (large, bold, white text)
- Subheading: "Stop worrying. We've built proven SMS templates specifically for your vessel type."
- Urgency banner: "Dec 2026 WBC3 mandate deadline: Get compliant NOW, not in a panic later" (secondary highlight)
- CTA button: "Get Your Quote" (burnt orange, links to /consultancy)

### Vessel Types Section
- 5 cards in responsive grid (1 col mobile, 2-3 cols tablet, 5 cols desktop)
- Each card shows:
  - Vessel type icon (optional, can use emoji or SVG)
  - Name (e.g., "Crew Transfer Vessels (CTVs)")
  - Description of operation type
  - Example vessels

### Why Us Section
- 6 features in grid layout (2 cols mobile, 3 cols desktop)
- Each feature shows:
  - Icon or badge
  - Title (e.g., "Built by Mariners")
  - Short description
  - Emphasizes Master Mariner credentials, speed, proven templates, pricing, support, workboat specificity

### WBC3 Breakdown
- 6 requirements clearly listed
- Visual treatment (numbered list, cards, or accordion)
- Each requirement explains WHAT it is and WHY it matters
- Closing line: "We build templates for ALL of these. You customize for your vessel."

### How It Works (5 Steps)
- Numbered steps in flow/process layout
- Clear progression: Discovery → Template Selection → Customization → Review → Delivery
- Estimated timeline: "2-4 weeks total"
- Each step shows what happens and why it matters

### Social Proof
- 3 testimonials from workboat operators
- Include: quote, operator title, vessel type, location (UK emphasis)
- Visual treatment: cards with avatar/icon
- Emphasize different vessel types and use cases

### FAQ
- 8 common questions about WBC3 and SMS process
- Accordion or expanded list format
- Answers clear and practical (not jargon-heavy)
- Questions cover: what is WBC3, templates vs custom, cost, existing procedures, MCA, remote work, timeline, satisfaction guarantee

### Final CTA
- Large section with navy or gradient background
- Heading: "Stop Procrastinating on WBC3"
- Subheading: "The Dec 2026 deadline isn't going anywhere. Get compliant with mariners who understand your operation."
- Trust badges: "24-hour Response", "No Commitment Required", "Free Consultation"
- Primary CTA button: "Request Your Quote" (link to /consultancy)
- Optional: Founder credibility element (e.g., "Jonathan Fulton, Master Mariner, 20+ years sea experience")

---

## SEO STRATEGY

### Target Keywords for `/workboat-sms`
**Primary (High Priority):**
- workboat SMS
- WBC3 SMS
- workboat safety management
- WBC3 compliant SMS

**Secondary (Medium Priority):**
- Dec 2026 deadline
- UK workboat compliance
- CTV SMS requirements
- Survey vessel SMS
- Tug SMS documentation
- Pilot boat WBC3

**Content Placement:**
- Hero heading: "WBC3-Compliant SMS for UK Workboats"
- Meta title: "WBC3-Compliant SMS for UK Workboats | SeaReady"
- Meta description: "Get WBC3-compliant SMS documentation in 2-4 weeks. Built specifically for CTVs, survey vessels, tugs & pilot boats. Dec 2026 deadline? We've got you covered."
- H2 headings throughout page include keywords
- Vessel types section includes specific vessel keywords
- Social proof includes mention of vessel types

### Homepage SEO (Preserved)
- Targets: "maritime compliance", "vessel management software", "maritime operations platform"
- Not weakened by workboat page (both can rank for their respective keywords)

### Linking Strategy
- Homepage: No direct mention of `/workboat-sms` (keeps platform positioning)
- Navigation: "Solutions" dropdown includes `/workboat-sms`
- Consultancy page: Optional link to `/workboat-sms` if visitor mentions workboats
- FAQ pages: Cross-links where relevant
- Blog/resources: Will link to `/workboat-sms` for WBC3-related articles (future)

---

## CONTENT VOICE & TONE

**For `/workboat-sms` Page:**
- Speak directly to workboat operators: "You understand tight schedules, weather decisions, crew dynamics"
- Avoid corporate jargon: "Safety Management System" not "Integrated Risk Management Framework"
- Emphasize practical understanding: "We've run the operations you run"
- Create urgency without fear: "Dec 2026 deadline is real, but solvable"
- Build trust through credentials: "Master Mariner with 20+ years at sea"
- Be specific: Name vessel types, mention crew transitions, acknowledge operational realities
- Reduce friction: "2-4 weeks", "£1,500-£2,500", "24-hour response time"

**Tone Differences from Homepage:**
- Homepage: Broad, platform-focused, future-oriented
- Workboat page: Specific, operation-focused, urgency-driven
- Both: Professional, maritime-authentic, built-by-mariners credibility

---

## DEPLOYMENT CHECKLIST

Pre-Deployment:
- [ ] All content strings completed in `workboat-strings.ts`
- [ ] Page component built and responsive
- [ ] Navigation updated with Solutions dropdown
- [ ] All links tested locally
- [ ] Mobile responsive design verified
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Dev server test: all pages load

Git & Push:
- [ ] All files staged
- [ ] Commit message written with full context
- [ ] Committed to main branch
- [ ] Pushed to GitHub
- [ ] GitHub shows successful push

Vercel Deployment:
- [ ] Vercel shows build triggered
- [ ] Build succeeds in Vercel dashboard
- [ ] Preview deployment shows new page
- [ ] Production deployment triggered
- [ ] Verify at: seaready-website.vercel.app/workboat-sms
- [ ] Navigation dropdown working in production
- [ ] CTA button goes to /consultancy in production
- [ ] Mobile responsive working in production

Post-Deployment:
- [ ] Monitor Vercel dashboard for any errors
- [ ] Test all links again in production
- [ ] Verify email notifications reach info@seaready.co.uk
- [ ] Confirm /consultancy receives clicks from workboat page
- [ ] Check analytics (if available) for page visits
- [ ] Share link with team

---

## FUTURE EXTENSIONS

### Phase 2: Merchant Vessels Landing Page
When ready to expand to ISM Code and commercial vessels:
- Create `/solutions/merchant-vessels` page (similar structure)
- Navigation dropdown will show all three solutions
- Reuse navigation and page structure patterns
- Create `/src/content/merchant-strings.ts` for ISM-specific content

### Phase 3: Solution-Specific Features
- Create `/solutions` hub page showing all offerings
- Add solution-selection quiz (helps users choose WBC3 vs merchant)
- Cross-link relevant solutions in FAQ sections
- Build solution comparison matrix

### Phase 4: Advertising & Analytics
- Set up UTM tracking for ad campaigns
- Monitor conversion rates from `/workboat-sms` to `/consultancy`
- A/B test CTA messaging and positioning
- Track organic search traffic (should increase for WBC3 keywords)

---

## CRITICAL NOTES FOR CONTINUITY

### For Agents Taking Over This Task:

1. **Strategic Context:**
   - This is NOT "workboat-first" company. This is "strategic landing page for ad campaigns"
   - Homepage positioning ("Maritime Compliance Tools Built by Mariners") is carefully chosen and approved
   - Workboat page supports advertising while preserving platform flexibility
   - User has long-term vision: ISM Code, merchant vessels, training products

2. **File Locations (Use Absolute Paths):**
   - Strings: `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/content/workboat-strings.ts`
   - Page: `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/app/workboat-sms/page.tsx`
   - Navbar: `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/components/navbar-transparent.tsx`
   - Strings: `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/content/strings.ts`

3. **Design System:**
   - Navy: `#4a5f7a`
   - Burnt Orange: `#c65d00`
   - Sea Teal: `#14b8a6`
   - Use Tailwind CSS exclusively (no CSS files)
   - Mobile-first responsive design
   - Existing design patterns in `/src/components/primitives/`

4. **Testing & Build:**
   - Must verify build succeeds: `npm run build`
   - Must test in dev server: `npm run dev`
   - Must verify links work (especially to /consultancy)
   - Mobile responsive testing required

5. **Deployment:**
   - Always push to GitHub first
   - Vercel auto-deploys from main branch
   - Verify in production before considering complete
   - User can also deploy via: `vercel --prod`

6. **If Issues Occur:**
   - Check build errors in terminal
   - Review TypeScript types match existing patterns
   - Verify all imports are correct
   - Check navigation dropdown doesn't break existing pages
   - Review console for any runtime errors

7. **Success Criteria:**
   - `/workboat-sms` page loads and renders correctly
   - Navigation shows "Solutions" dropdown with "Workboat SMS (WBC3)"
   - All CTAs link to `/consultancy`
   - Mobile responsive (tested on multiple screen sizes)
   - Build passes: `npm run build`
   - No new TypeScript errors introduced
   - Deployed to production successfully

---

## RELATED DOCUMENTATION

- **WORK_LOG.md:** Strategic decision documentation
- **ACTION_REGISTER.md:** File change audit trail
- **strings.ts:** Existing content string patterns
- **navbar-transparent.tsx:** Current navigation component
- **workboat-*.jpg:** Available workboat images for hero section

---

**Ready to begin Phase 1? Next agent assigned can reference this document and the checked boxes for continuity.**
