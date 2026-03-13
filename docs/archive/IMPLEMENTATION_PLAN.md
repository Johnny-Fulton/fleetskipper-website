# SEAREADY WEBSITE REDESIGN - IMPLEMENTATION PLAN
## Phase 1: Consultancy-First MVP

**Created:** 2025-12-02
**Target Launch:** This Week
**Strategy:** 70% Consultancy / 20% Resources / 10% App Preview

---

## 🎯 CORE STRATEGY

### Business Model (Current Phase)
- **Primary Revenue:** Bespoke SMS Consultancy (1-2 clients capacity)
- **Lead Generation:** Free compliance resources
- **Future Revenue:** SaaS app (in production, not ready yet)

### Positioning
- "WBC3-Compliant SMS Built for Your Vessel — In Days, Not Months"
- Built by Master Mariner & Maine Pilot (20+ years sea experience)
- AI-driven SMS generation using proven templates
- 2-3 day turnaround vs 3-6 months traditional consultants

### Primary CTA Everywhere
- **"Request Quote"** → Goes to /consultancy page
- Quote requests sent to: **info@seaready.co.uk**

---

## 📋 PAGES TO BUILD/MODIFY

### 1. HOMEPAGE (Major Redesign)
**File:** `/src/app/page.tsx`

**New Structure:**

#### Section 1: Hero (Above Fold)
```
H1: "WBC3-Compliant SMS Built for Your Vessel — In Days, Not Months"
Subheading: "Bespoke SMS consultancy for UK workboat operators. We build your complete Safety Management System while you focus on operations."

Credibility: "Built by Master Mariner & Maine Pilot • 20+ Years Sea Experience • WBC3 Ed.3 Compliant"

Primary CTA: "Request Quote" → /consultancy
Secondary CTA: "See How It Works" → scroll to #how-it-works

Trust Badges:
- ⚓ Built by Mariners
- ✓ WBC3 Compliant
- 📱 Works Offline (future app)
- 🇬🇧 UK-Specific
```

#### Section 2: Problem/Solution (NEW)
```
Left Side - The Problem:
- "Generic SMS templates don't work for your vessel"
- "Traditional consultants charge £5,000+ and take 3-6 months"
- "MCA inspections are stressful without proper documentation"

Right Side - SeaReady Solution:
- "AI-powered SMS generation using proven templates"
- "£1,500-£2,500 • Delivered in 2-3 days"
- "Ready for certification immediately"
```

#### Section 3: How It Works (Keep existing, reframe)
```
Step 1: "Request a Quote"
- Tell us about your vessel and operations (5 minutes)

Step 2: "We Build Your SMS"
- Our AI generates your custom SMS using proven templates (2-3 days)

Step 3: "Review & Approve"
- You review the documentation, we make any adjustments

Step 4: "Ready for Certification"
- Receive complete SMS package, ready for MCA inspection
```

#### Section 4: Consultancy Pricing (NEW - Replaces old pricing)
```
TIER 1: Essential SMS - "Request Quote"
- Complete WBC3-compliant SMS for 1 vessel
- Core procedure templates populated
- Risk assessments included
- Email support for 30 days

TIER 2: Complete SMS - "Request Quote" [MOST POPULAR]
- Everything in Essential
- Specialized operations (diving, lifting, towing)
- DPA training session (2 hours)
- 90 days support

TIER 3: Fleet SMS - "Contact Us"
- Multiple vessels
- Ongoing SMS management
- Annual review and updates
- Priority support
```

**Note:** Show tiers/features but pricing is "Request Quote" (no amounts displayed)

#### Section 5: Why Choose SeaReady (NEW)
```
Cards/Grid:
1. Built by Master Mariner
   - 20+ years sea experience
   - Understands your world

2. Fast Turnaround
   - 2-3 days, not months
   - AI-powered generation

3. WBC3 Compliant
   - Ready for certification
   - MCA inspection-ready

4. Fair Pricing
   - £1,500-£2,500 range
   - Not £5,000+ traditional consultants
```

#### Section 6: App Preview (NEW - Subtle)
```
Eyebrow: "Coming Soon"
Headline: "Digital SMS Management Platform"
Subtext: "We're building a mobile-first platform to help you manage your SMS day-to-day. Join the waitlist for early access."

[Screenshot from existing site - SMS_Risk.png or app screenshot]

Features:
- ✓ Works offline at sea
- ✓ Pre-configured for your vessel
- ✓ Mobile-optimized for crew
- ✓ Automatic compliance tracking

CTA: "Join Waitlist" → /waitlist
Note: "App subscribers get 50% off consultancy services"
```

#### Section 7: Free Resources (Keep existing structure, enhance copy)
```
Eyebrow: "Free Resources"
Title: "Start Your Compliance Journey"
Subtitle: "Download practical tools to understand WBC3 requirements"

Resources:
1. WBC3 Compliance Checklist (email gate)
2. SMS Planning Guide (email gate)
3. Drill Log Template (direct download)

CTA: "View All Resources" → /resources
```

#### Section 8: Final CTA (Keep existing structure)
```
Eyebrow: "Get Started"
Title: "Ready to Get Your Vessel Certified?"
Subtitle: "Request a quote today. Get your WBC3-compliant SMS in 2-3 days."

Primary CTA: "Request Quote" → /consultancy
Secondary CTA: "Download Free Guide" → /resources
```

---

### 2. CONSULTANCY PAGE (NEW)
**File:** `/src/app/consultancy/page.tsx`

**Purpose:** Quote request form

**Structure:**

```
HEADER:
H1: "Get Your Custom SMS Quote"
Subtitle: "Tell us about your vessel and operations. We'll send you a detailed quote within 24 hours."

FORM SECTIONS:

Section 1: Contact Information
- Name (required)
- Email (required)
- Phone (optional)
- Company name (optional)

Section 2: Vessel Information
- "I need SMS for:" [Dropdown: 1 vessel / 2-3 vessels / 4+ vessels]
- Vessel type [Dropdown: CTV, Survey, Dive Support, Tug, Passenger, General Workboat, Other]
- WBC3 Category (if known) [Dropdown: Cat 0, 1, 2, 3, 4, 5, Not sure]

Section 3: Operations
- "Do you have specialized operations?" [Checkboxes: Diving, Lifting, Towing, Passenger Ops, Other]
- Additional details [Text area - optional]

Section 4: Timeline
- "When do you need SMS delivered?" [Radio: Next 2 weeks / Next month / 1-3 months / Just exploring]

SUBMIT BUTTON: "Request Quote"

WHAT HAPPENS:
- Email sent to info@seaready.co.uk with lead details
- Auto-responder to client: "Thanks! We'll send your quote within 24 hours. Meanwhile, here's our free WBC3 checklist..."
```

**Trust Elements:**
- Security badge: "Your information is secure"
- Response time: "Typical response: Within 24 hours"
- No obligation: "No commitment required"

---

### 3. ABOUT PAGE (NEW)
**File:** `/src/app/about/page.tsx`

**Purpose:** Build credibility

**Structure:**

```
HEADER:
H1: "Built by Mariners, For Mariners"
Subtitle: "Real maritime experience meets modern technology"

CONTENT:

Section 1: Your Story
- Master Mariner & Maine Pilot
- 20+ years sea experience
- Firsthand understanding of compliance challenges
- "I've been through countless MCA inspections. I built SeaReady to make compliance simple for operators like you."

Section 2: Why SeaReady
- "Traditional SMS consultants don't understand the daily reality of vessel operations"
- "Generic templates don't account for your specific vessel type and operations"
- "The compliance burden takes you away from what you do best: operating safely"

Section 3: Our Approach
- Proven templates (RA-approved standards)
- AI-powered customization
- Plain English, no consultant-speak
- Built for UK workboats specifically

Section 4: The Future
- "We're building a digital platform to make daily SMS management effortless"
- "The consultancy gets you certified. The app (coming soon) keeps you compliant."

CTA: "Work With Us" → /consultancy
```

---

### 4. PRICING PAGE (Modify Existing)
**File:** `/src/app/pricing/page.tsx`

**Changes:**

**Remove:** SaaS subscription tiers (£49/mo, £199/mo, Enterprise)

**Add:** Consultancy Service Tiers

```
HEADER:
H1: "SMS Consultancy Pricing"
Subtitle: "One-time builds. No subscriptions. Request a custom quote."

TIER 1: Essential SMS
Features:
- Complete WBC3-compliant SMS for 1 vessel
- Core procedure templates populated
- Risk assessments included
- Equipment registers
- Emergency procedures
- Email support for 30 days
Pricing: "Request Quote"
CTA: "Get Started" → /consultancy

TIER 2: Complete SMS [BADGE: Most Popular]
Features:
- Everything in Essential
- Specialized operations coverage (diving, lifting, towing)
- Extended procedure library
- DPA training session (2 hours)
- 90 days email support
- Revision requests included
Pricing: "Request Quote"
CTA: "Get Started" → /consultancy

TIER 3: Fleet SMS
Features:
- Multiple vessels (2+)
- Ongoing SMS management
- Annual review and updates
- Priority support
- Dedicated account manager
- Custom integrations
Pricing: "Custom Pricing"
CTA: "Contact Us" → /contact

FAQ SECTION:
Q: How long does delivery take?
A: 2-3 days for Essential & Complete. Custom timeline for Fleet.

Q: Is it really WBC3 compliant?
A: Yes. Built on RA-approved templates and WBC3 Ed.3 standards.

Q: What if I need revisions?
A: Included in Complete & Fleet tiers. Essential includes 1 revision.

Q: Can you help with certification?
A: Yes, we guide you through the MCA certification process.

Q: What about the app I've heard about?
A: Coming soon! Join our waitlist at /waitlist
```

**Add at bottom:**
"Digital SMS Management Coming Soon" section with link to /waitlist

---

### 5. CONTACT PAGE (NEW)
**File:** `/src/app/contact/page.tsx`

**Simple structure:**

```
H1: "Get In Touch"

Options:
1. "For SMS Consultancy Quotes" → Use form at /consultancy
2. "General Inquiries" → Form below

FORM:
- Name
- Email
- Subject [Dropdown: General Question / Partnership / Press / Other]
- Message
- Submit: "Send Message"

CONTACT INFO:
- Email: info@seaready.co.uk
- Response time: "We typically respond within 24 hours"

CTA at bottom:
"Need an SMS built? Request a quote instead" → /consultancy
```

---

### 6. WAITLIST PAGE (NEW)
**File:** `/src/app/waitlist/page.tsx`

**Purpose:** Capture app early adopters

```
HEADER:
H1: "SeaReady App: Coming Soon"
Subtitle: "Digital SMS management for modern workboat operators"

HERO IMAGE:
[Use existing screenshot - SMS_Risk.png or app screenshot]
[+ 1-2 "Coming Soon" placeholder graphics]

VALUE PROPS:
- Offline-first (works at sea, syncs automatically)
- Pre-configured for your vessel type
- Mobile-optimized for crew use
- Automatic compliance tracking
- Hours of Rest compliance built-in
- One-click inspection reports

PRICING PREVIEW:
"Expected pricing: Starting at £49/month for single vessel"
"Launch special: 50% off first year for consultancy clients"

WAITLIST FORM:
- Name
- Email
- Company (optional)
- Number of vessels [Dropdown: 1 / 2-5 / 6-10 / 10+]
- "What are you most excited about?" [Dropdown: Offline capability / Mobile access / Compliance tracking / Crew management / Other]
- Submit: "Join Waitlist"

INCENTIVES:
✓ Early access when we launch
✓ 50% off first year
✓ Free migration from your current system
✓ Priority onboarding

FAQ:
Q: When will it launch?
A: We're in active development. Waitlist members get first access.

Q: Can I use it now?
A: Not yet. But you can get your SMS built via consultancy today!

Q: How much will it cost?
A: Starting at £49/month. Waitlist members get 50% off first year.

CTA:
"Need SMS now? Get consultancy quote" → /consultancy
```

---

### 7. RESOURCES PAGE (Enhance Existing)
**File:** `/src/app/resources/page.tsx`

**Keep existing structure, update content:**

```
HEADER:
H1: "Free Compliance Resources"
Subtitle: "Practical tools and guides for UK workboat compliance"

RESOURCES:

1. WBC3 Compliance Checklist [GATED - Email required]
   - Complete requirements for WBC3 compliance
   - Category-specific checklists
   - Inspection preparation guide
   - CTA: "Download Free Checklist"

2. SMS Planning Guide [GATED - Email required]
   - What is SMS and why it matters
   - 5 steps to SMS compliance
   - Common mistakes to avoid
   - DIY vs consultant decision guide
   - CTA: "Get Planning Guide"

3. Drill Log Template [FREE - Direct download]
   - Ready-to-use Excel template
   - WBC3-compliant format
   - Inspector-friendly layout
   - CTA: "Download Template"

4. Maintenance Schedule Template [NEW - FREE]
   - Basic maintenance tracking
   - Equipment categories
   - Schedule recommendations
   - CTA: "Download Template"

BOTTOM CTA:
"Want your SMS built professionally?"
"Get a quote for our consultancy service" → /consultancy
```

---

### 8. NAVIGATION UPDATE
**File:** `/src/components/navbar.tsx` or `/src/components/navbar-transparent.tsx`

**New Navigation:**

```
LEFT SIDE (Logo): SeaReady

CENTER/RIGHT (Links):
- Services [Dropdown]
  - SMS Consultancy
  - App Waitlist
- Resources
- Pricing
- About

CTA BUTTON (Prominent): "Request Quote" → /consultancy
LOGIN (Text link): "Log in" → /login
```

---

### 9. FOOTER UPDATE
**File:** `/src/components/primitives/site-footer.tsx`

**New Footer Structure:**

```
COLUMN 1: Services
- SMS Consultancy
- App Waitlist (Coming Soon)
- Pricing

COLUMN 2: Resources
- Free Downloads
- WBC3 Guide
- Templates
- FAQ

COLUMN 3: Company
- About
- Contact
- Privacy Policy
- Terms of Service

COLUMN 4: Get Started
- Request Quote (CTA)
- Join App Waitlist
- Download Resources

BOTTOM:
Contact: info@seaready.co.uk
Copyright: © 2024 SeaReady. All rights reserved.
Tagline: "Built by mariners, for mariners."
```

---

## 📝 CONTENT FILES TO CREATE/UPDATE

### 1. Create Consultancy Content
**File:** `/src/content/consultancy-strings.ts`

```typescript
export const consultancyContent = {
  hero: {
    h1: "WBC3-Compliant SMS Built for Your Vessel — In Days, Not Months",
    subtitle: "Bespoke SMS consultancy for UK workboat operators. We build your complete Safety Management System while you focus on operations.",
    credibility: "Built by Master Mariner & Maine Pilot • 20+ Years Sea Experience • WBC3 Ed.3 Compliant",
    ctaPrimary: "Request Quote",
    ctaSecondary: "See How It Works",
  },

  problemSolution: {
    problems: [
      "Generic SMS templates don't work for your vessel",
      "Traditional consultants charge £5,000+ and take 3-6 months",
      "MCA inspections are stressful without proper documentation",
    ],
    solutions: [
      "AI-powered SMS generation using proven templates",
      "£1,500-£2,500 • Delivered in 2-3 days",
      "Ready for certification immediately",
    ],
  },

  howItWorks: {
    steps: [
      {
        number: "1",
        title: "Request a Quote",
        description: "Tell us about your vessel and operations (5 minutes)",
      },
      {
        number: "2",
        title: "We Build Your SMS",
        description: "Our AI generates your custom SMS using proven templates (2-3 days)",
      },
      {
        number: "3",
        title: "Review & Approve",
        description: "You review the documentation, we make any adjustments",
      },
      {
        number: "4",
        title: "Ready for Certification",
        description: "Receive complete SMS package, ready for MCA inspection",
      },
    ],
  },

  tiers: [
    {
      name: "Essential SMS",
      features: [
        "Complete WBC3-compliant SMS for 1 vessel",
        "Core procedure templates populated",
        "Risk assessments included",
        "Equipment registers",
        "Emergency procedures",
        "Email support for 30 days",
      ],
      cta: "Request Quote",
      featured: false,
    },
    {
      name: "Complete SMS",
      features: [
        "Everything in Essential",
        "Specialized operations coverage (diving, lifting, towing)",
        "Extended procedure library",
        "DPA training session (2 hours)",
        "90 days email support",
        "Revision requests included",
      ],
      cta: "Request Quote",
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Fleet SMS",
      features: [
        "Multiple vessels (2+)",
        "Ongoing SMS management",
        "Annual review and updates",
        "Priority support",
        "Dedicated account manager",
        "Custom integrations",
      ],
      cta: "Contact Us",
      featured: false,
      pricing: "Custom Pricing",
    },
  ],

  whyChoose: [
    {
      title: "Built by Master Mariner",
      description: "20+ years sea experience. Understands your world.",
      icon: "⚓",
    },
    {
      title: "Fast Turnaround",
      description: "2-3 days, not months. AI-powered generation.",
      icon: "⚡",
    },
    {
      title: "WBC3 Compliant",
      description: "Ready for certification. MCA inspection-ready.",
      icon: "✓",
    },
    {
      title: "Fair Pricing",
      description: "£1,500-£2,500 range. Not £5,000+ traditional consultants.",
      icon: "💰",
    },
  ],
};
```

### 2. Update Main Strings
**File:** `/src/content/strings.ts`

**Changes:**
- Update hero copy to consultancy-first
- Add consultancy pricing tiers
- Update CTAs to "Request Quote"
- Add app preview section
- Update meta descriptions

---

## 🎨 DESIGN ELEMENTS NEEDED

### Images/Assets:
1. ✅ **Existing:** SMS_Risk.png (app screenshot - use in app preview)
2. ⏳ **Create:** "Coming Soon" placeholder graphics for app (2-3 designs)
3. ⏳ **Optional:** Photo of you (Master Mariner credibility)
4. ⏳ **Optional:** Vessel photos (generic workboat imagery)

### Brand Elements:
- ✅ Navy (#4a5f7a) - Primary
- ✅ Burnt Orange (#c65d00) - CTAs
- ✅ Teal (#14b8a6) - Success/checkmarks
- ✅ Use existing hero workboat images

---

## 🔧 TECHNICAL SETUP

### Forms:
**All forms should:**
1. Collect data
2. Send email to: **info@seaready.co.uk**
3. Show success message
4. Auto-responder to user (optional for later)

**Form endpoints needed:**
- `/api/consultancy` - Quote requests
- `/api/contact` - General contact
- `/api/waitlist` - App waitlist signups
- `/api/resources` - Gated resource downloads

**Simple implementation (Phase 1):**
- Use basic form submission
- Server-side API routes send emails
- Success/error handling

**Future enhancement (Phase 2):**
- Integrate email marketing (ConvertKit, Mailchimp)
- Auto-responder sequences
- CRM integration

### Email Templates:

**Quote Request Email (to info@seaready.co.uk):**
```
Subject: New SMS Consultancy Quote Request

Name: [name]
Email: [email]
Phone: [phone]
Company: [company]

Vessel Information:
- Number of vessels: [count]
- Vessel type: [type]
- WBC3 Category: [category]

Operations:
- Specialized ops: [list]

Timeline: [timeline]

Additional Details:
[details]

---
Send quote within 24 hours!
```

**Waitlist Email (to info@seaready.co.uk):**
```
Subject: New App Waitlist Signup

Name: [name]
Email: [email]
Company: [company]
Vessels: [count]
Most excited about: [feature]

---
Add to waitlist & follow up when app launches
```

---

## 📊 SUCCESS METRICS (Week 1)

### Primary Goals:
- ✅ Website deployed with consultancy focus
- ✅ Quote request form working (sends to info@seaready.co.uk)
- ✅ At least 3 resource downloads
- ✅ Clean, professional appearance
- ✅ Mobile-responsive

### Stretch Goals:
- 🎯 1+ quote request submitted
- 🎯 10+ email signups (resources)
- 🎯 5+ app waitlist signups
- 🎯 Share on LinkedIn, get engagement

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Launch:
- [ ] Test all forms (quote, contact, waitlist)
- [ ] Verify emails send to info@seaready.co.uk
- [ ] Check mobile responsiveness
- [ ] Test navigation on all pages
- [ ] Verify all links work
- [ ] Check spelling/grammar
- [ ] Test page load speed
- [ ] Verify brand colors consistent

### Launch Day:
- [ ] Deploy to Vercel (git push origin main)
- [ ] Verify live site works
- [ ] Test forms on production
- [ ] Share on LinkedIn
- [ ] Email personal network
- [ ] Monitor analytics

### Post-Launch (Week 1):
- [ ] Monitor quote requests
- [ ] Respond within 24 hours
- [ ] Track which resources are most popular
- [ ] Note any user feedback
- [ ] Iterate based on data

---

## 📅 BUILD SCHEDULE (Tomorrow)

### Session 1: Homepage (2-3 hours)
1. Update hero section
2. Add problem/solution section
3. Modify how it works
4. Add consultancy pricing
5. Add app preview section

### Session 2: New Pages (2-3 hours)
6. Build /consultancy quote page
7. Build /about page
8. Build /waitlist page
9. Build /contact page

### Session 3: Updates & Polish (1-2 hours)
10. Update /pricing page
11. Update navigation
12. Update footer
13. Test all forms

### Session 4: Deploy (30 mins)
14. Final testing
15. Deploy to production
16. Verify live site
17. Announce launch

**Total Time: 6-9 hours**

---

## 💡 NOTES & DECISIONS

### Key Decisions Made:
1. ✅ **Pricing Display:** Show tiers but "Request Quote" (no amounts)
2. ✅ **Email:** info@seaready.co.uk for all form submissions
3. ✅ **Credentials:** Master Mariner & Maine Pilot, 20+ years experience
4. ✅ **App Screenshots:** Use existing SMS_Risk.png + create placeholders
5. ✅ **Questionnaire:** NOT publicly available - given to clients AFTER quote accepted
6. ✅ **Client Capacity:** 1-2 clients initially

### Questions for User (If Any):
- Do you want phone number displayed publicly?
- Any specific vessel types to emphasize?
- Should we mention AI-powered generation prominently or subtly?
- Any competitive advantages to highlight?

---

## 🔮 FUTURE PHASES

### Phase 2 (Week 2): Lead Generation
- Create WBC3 checklist PDF
- Create SMS planning guide PDF
- Build email nurture sequences
- Add FAQ page
- SEO basics (meta tags, sitemap)

### Phase 3 (Weeks 3-4): App Preview
- Enhanced waitlist page with demo video
- More app screenshots
- Feature comparison table
- Development roadmap
- Beta signup process

### Phase 4 (Month 2+): Optimization
- A/B test headlines
- Add testimonials (from first clients)
- Create case studies
- Blog/content marketing
- LinkedIn lead gen
- Paid ads (if budget)

---

## ✅ READY TO BUILD

**Status:** Plan complete, ready for implementation
**Next Step:** Execute build tomorrow
**Deploy Target:** End of week
**First Goal:** Get 1 consultancy quote request

---

**Notes:**
- Keep it simple for MVP
- Focus on conversion (quote requests)
- Build credibility (maritime experience)
- Position app as future value-add
- Make it easy to contact you

Let's get this launched! 🚢
