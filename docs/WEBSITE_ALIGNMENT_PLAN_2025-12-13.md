# WEBSITE ALIGNMENT PLAN - Response to Locked Business Strategy
**Date:** 2025-12-13
**From:** Website Orchestrator
**To:** Business Orchestrator & Jonathan
**Re:** Q-2025-12-13-001 Final Business Strategy Implementation

---

## ACKNOWLEDGMENT

I've read and understood the **LOCKED BUSINESS STRATEGY** dated 2025-12-13. This is a comprehensive briefing that significantly updates the website positioning, pricing, and messaging.

**Key Strategic Shifts Understood:**
1. **Three-tier pricing** (Essentials/Professional/Enterprise) vs single £29/mo
2. **Three business pillars** (Software 60% / Services 30% / Training 10%)
3. **Feature-based tiers** (not vessel-type pricing) to avoid perception issues
4. **Year 1 focus:** Essentials tier only (£30-150/mo for WBC3)
5. **Competitive positioning:** Small operators (1-10 vessels) vs enterprise software
6. **Brand positioning:** Already correct ("Maritime Compliance Solutions Built By Mariners")

---

## CURRENT WEBSITE STATUS AUDIT

### ✅ **ALIGNED (Keep As-Is):**

1. **Homepage Hero**
   - Tagline: "Maritime Compliance Solutions Built by Mariners" ✅
   - Broad enough for expansion, specific enough for credibility
   - File: `/src/content/strings.ts`

2. **Mariner Credibility**
   - About page emphasizes Master Mariner/Pilot background ✅
   - "Built by mariners for mariners" messaging throughout ✅
   - File: `/src/app/about/page.tsx`

3. **Two Solution Types Present**
   - SMS Consultancy (Services pillar) ✅
   - Digital App (Software pillar) ✅
   - Files: `/src/app/consultancy/page.tsx`, `/src/app/app/page.tsx`

### ⚠️ **PARTIALLY ALIGNED (Needs Updates):**

1. **Pricing Information**
   - **CURRENT:** Shows "From £29/month per vessel" (single tier)
   - **REQUIRED:** £30-150/month tiered by vessel count (Essentials only Year 1)
   - **IMPACT:** Major pricing mismatch
   - **Files:** `/src/content/app-strings.ts`, `/src/app/app/page.tsx`, homepage

2. **Services Pricing**
   - **CURRENT:** Consultancy page shows vague pricing ("custom quote")
   - **REQUIRED:** Clear £1,500-3,000 range for SMS building
   - **IMPACT:** Transparency missing
   - **Files:** `/src/app/consultancy/page.tsx`, `/src/content/consultancy-strings.ts`

3. **Three Pillars Presentation**
   - **CURRENT:** Shows 2 pillars (Software + Services)
   - **REQUIRED:** 3 pillars (Software + Services + Training)
   - **IMPACT:** Training pillar missing entirely
   - **Files:** Homepage needs Training section

### ❌ **MISSING (Must Add):**

1. **Dedicated Pricing Page**
   - **CURRENT:** `/src/app/pricing/page.tsx` redirects to consultancy
   - **REQUIRED:** Full pricing page with Essentials tier breakdown + "Coming Soon" boxes
   - **IMPACT:** Critical for transparency positioning

2. **Differentiation Section (Homepage)**
   - **CURRENT:** No explicit "Why SeaReady vs enterprise software" section
   - **REQUIRED:** Clear differentiation (small operators, transparent pricing, mariner-built)
   - **IMPACT:** Competitive positioning unclear

3. **"Who Is This For" Section (Homepage)**
   - **CURRENT:** Implicit in messaging but not explicit
   - **REQUIRED:** Clear statement of target market (1-10 vessels, NOT 50+ fleets)
   - **IMPACT:** Helps qualify/disqualify visitors

4. **WBC3 Urgency Banner (Homepage)**
   - **CURRENT:** Only on `/workboat-sms` page
   - **REQUIRED:** Also on homepage (Dec 2026 deadline)
   - **IMPACT:** Urgency missing for primary Year 1 market

5. **Training Section/Page**
   - **CURRENT:** Doesn't exist
   - **REQUIRED:** Downloadable materials section (£50-300 per pack)
   - **IMPACT:** Third business pillar completely missing

---

## IMPLEMENTATION PLAN

### **PHASE 1: CRITICAL PRICING FIXES** (Immediate - 1-2 hours)

**Priority: HIGHEST** - Pricing is currently wrong across the site

#### 1.1 Create Proper Pricing Page
**File:** `/src/app/pricing/page.tsx`
**Action:** Replace redirect with full pricing page

**Structure:**
```
ESSENTIALS TIER (Available Now - Year 1)
├─ 1 vessel: £30/month
├─ 2-3 vessels: £60/month
├─ 4-6 vessels: £100/month
└─ 7-10 vessels: £150/month

Features: SMS framework, equipment tracking, basic crew, docs, risk assessments
Perfect for: Workboat operators (WBC3 compliance)
CTA: "Start Free Trial"

PROFESSIONAL TIER (Coming 2027)
├─ 1 vessel: £100/month
├─ 2-3 vessels: £150/month
└─ [etc...]

Features: Everything in Essentials + drills, incidents, training, HOR
Status: COMING SOON badge
CTA: "Join Waitlist for Professional"

ENTERPRISE TIER (Coming 2028)
├─ 1-10 vessels: £400/month
└─ [etc...]

Features: Everything in Professional + ISM audit, analytics, API
Status: COMING SOON badge
CTA: "Join Waitlist for Enterprise"
```

#### 1.2 Update App Page Pricing
**File:** `/src/content/app-strings.ts`
**Changes:**
- Line 212: `pricing: "From £29/month per vessel"` → `pricing: "From £30/month"`
- Pricing section: Replace 2 tiers with Essentials tier breakdown (£30-150 by vessel count)
- Add note: "Professional (£100-300/mo) and Enterprise (£400-1,200/mo) tiers coming 2027-2028"

#### 1.3 Update Homepage App Section
**File:** `/src/app/page.tsx`
**Changes:**
- Line 369: `From £29/month per vessel` → `From £30/month for 1 vessel`
- Add pricing breakdown: "Scale pricing: 1 vessel (£30), 2-3 (£60), 4-6 (£100), 7-10 (£150)"

#### 1.4 Update Consultancy Pricing
**File:** `/src/app/consultancy/page.tsx` and `/src/content/consultancy-strings.ts`
**Changes:**
- Show transparent range: "£1,500-3,000 for complete SMS build"
- Add conversion note: "After SMS delivered, optional Essentials subscription (£30-150/mo) for annual updates"

---

### **PHASE 2: THREE PILLARS POSITIONING** (2-3 hours)

#### 2.1 Homepage Three Offerings Section
**File:** `/src/app/page.tsx`
**Action:** Add clear 3-column section after hero

**Structure:**
```
THREE WAYS TO GET COMPLIANT

SOFTWARE (60% focus)              SERVICES (30% focus)              TRAINING (10% focus)
────────────────────              ────────────────────              ────────────────────
SMS Pro Essentials                SMS Building                      WBC3 Materials
£30-150/month                     £1,500-3,000 one-time            £50-300 per pack

Manage WBC3 yourself              We build it for you               Downloadable templates
with our software                 in 2-3 weeks                      for crew training

[Start Free Trial]                [Request Quote]                   [Browse Materials]
```

#### 2.2 Create Training/Resources Page
**File:** `/src/app/training/page.tsx` (new)
**Content:**
- Downloadable drill scenarios (£50-100)
- Induction packs (£100-200)
- Risk assessment templates (£50-150)
- Procedure templates (£100-300)
- Clear pricing, instant download CTAs

#### 2.3 Update Navigation
**Files:** `/src/components/navbar-solid.tsx`, `/src/components/navbar-transparent.tsx`
**Changes:**
- Add "Training Materials" to Solutions dropdown
- Order: Workboat SMS (WBC3) → Digital SMS Management → SMS Consultancy → Training Materials

---

### **PHASE 3: COMPETITIVE DIFFERENTIATION** (1-2 hours)

#### 3.1 Add Differentiation Section (Homepage)
**File:** `/src/app/page.tsx`
**Location:** After Three Offerings, before features

**Content:**
```
WHY SEAREADY INSTEAD OF ENTERPRISE SOFTWARE?

✅ Built by a Master Mariner/Pilot - Not a software company, a working mariner
✅ Transparent Pricing - £30-150/month. No "contact us," no hidden costs
✅ Small Operator Focused - Built for 1-10 vessel operators, not corporate fleets
✅ Done-For-You Option - Can't DIY? We build your SMS for £1,500-3,000
✅ Fast Support - Talk to Jonathan (the founder), not a call center

[Not for 50+ vessel fleets? Check out Sea-Flux or SERTICA instead →]
```

#### 3.2 Add "Who Is This For" Section (Homepage)
**File:** `/src/app/page.tsx`
**Location:** After differentiation, before final CTA

**Content:**
```
WHO IS SEAREADY FOR?

PERFECT FOR:
✅ Workboat operators (WBC3 compliance)
✅ Fishing vessels (ISM/DSM compliance)
✅ Small coasters (300-3,000 GT)
✅ Ferry operators (passenger safety)
✅ Any 1-10 vessel operator needing affordable compliance

NOT FOR:
❌ 50+ vessel corporate fleets (you need enterprise software like Sea-Flux)
❌ Operators happy paying £100-200/month per vessel
❌ Large shipping companies with dedicated compliance teams
```

---

### **PHASE 4: WBC3 URGENCY & MESSAGING** (1 hour)

#### 4.1 Add WBC3 Urgency Banner (Homepage)
**File:** `/src/app/page.tsx`
**Location:** Directly after hero section

**Content:**
```
⚠️ UK WORKBOAT OPERATORS: WBC3 COMPLIANCE DEADLINE DECEMBER 2026
12 months to get compliant. We can help - software from £30/mo or SMS building £1,500-3,000.
[Learn about WBC3 compliance →]
```

#### 4.2 Update Messaging Tone
**Files:** Various content files
**Action:** Audit all copy for:
- Mariner-to-mariner voice (direct, honest, practical) ✅
- No corporate jargon ❌ "cutting-edge SaaS platform"
- Peer positioning ✅ "I built this because I needed it"
- Transparency emphasis ✅ Always show prices

---

### **PHASE 5: SEO & META UPDATES** (30 mins)

#### 5.1 Update Page Metadata
**Files:** All page.tsx files
**Changes:**
- Title tags: Include "affordable," "transparent pricing," "small operators"
- Descriptions: Mention £30-150/month range, 1-10 vessels
- Keywords: Add "affordable SMS software," "small vessel compliance," "transparent pricing"

#### 5.2 Add Schema Markup
**Action:** Add pricing schema to pricing page
- Software application schema
- Pricing tiers clearly marked
- Service offerings (SMS building)

---

## ALIGNMENT WITH LOCKED STRATEGY

### **Strategic Goals → Website Implementation:**

| Strategy Goal | Website Implementation | Status |
|---------------|------------------------|--------|
| Year 1: WBC3 focus (5-10 customers, £10-26k) | WBC3 urgency banner, Essentials tier prominently featured | ✅ Planned |
| Three pillars (Software/Services/Training) | Homepage 3-column section, clear CTAs for each | ✅ Planned |
| Affordable positioning (£30-150 vs £100-200) | Transparent pricing page, differentiation section | ✅ Planned |
| Small operator focus (1-10 vessels) | "Who is this for" section explicitly states this | ✅ Planned |
| Mariner credibility | Already strong, maintain throughout updates | ✅ Current |
| Transparent pricing | Every page shows price ranges, no "contact us" | ✅ Planned |
| Done-for-you option | Consultancy priced at £1,500-3,000 clearly shown | ✅ Planned |
| Year 2-3 expansion ready | Professional/Enterprise shown as "Coming Soon" | ✅ Planned |

### **Competitive Positioning → Website:**

| Competitor | Our Differentiator | Where Shown |
|------------|-------------------|-------------|
| Sea-Flux (£100-200/mo, enterprise) | £30-150/mo, small operators | Pricing page, differentiation section |
| SeaLogs (£20-28/mo transparent) | We also transparent + Services pillar | Pricing page, services section |
| SERTICA/Prime (£5-20k consultancy) | £1,500-3,000 consultancy + software option | Consultancy page, homepage |
| All (NZ software companies) | Built by UK Master Mariner/Pilot | Homepage hero, About page, differentiation |

---

## SUCCESS METRICS

**The website succeeds if:**

✅ **2-vessel UK workboat operator** lands on homepage and in 30 seconds understands:
   - This is for small operators like them (not enterprise)
   - Software costs £60/month OR SMS build costs ~£2,000
   - WBC3 deadline approaching, SeaReady can help
   - Built by a mariner, not a software company

✅ **50-vessel fleet operator** lands on homepage and in 30 seconds understands:
   - This is NOT for them (they need enterprise software)
   - But they might refer smaller operators

✅ **Year 2 fishing vessel operator** lands on homepage and understands:
   - Even though WBC3 is featured, this works for ISM/DSM too
   - Professional tier coming 2027 will suit their needs

✅ **Jonathan** can send URL to pilot boat operators and they "get it" immediately

---

## IMPLEMENTATION TIMELINE

### **Week 1 (Immediate):**
- ✅ Phase 1: Critical pricing fixes (all pricing updated to £30-150 tiered)
- ✅ Phase 4: WBC3 urgency banner added to homepage

**Deliverable:** Pricing accurate, urgency messaging live

### **Week 2:**
- ✅ Phase 2: Three pillars positioning (Software/Services/Training sections)
- ✅ Phase 3: Differentiation & "Who is this for" sections

**Deliverable:** Strategic positioning complete

### **Week 3:**
- ✅ Phase 5: SEO/meta updates
- ✅ Training materials page built
- ✅ Final QA and testing

**Deliverable:** Full strategy alignment complete

---

## RISKS & MITIGATIONS

### **Risk 1: Pricing Confusion (Essentials vs Professional)**
**Mitigation:** Very clear "Coming Soon" badges on Professional/Enterprise tiers, FAQ explaining why only Essentials available Year 1

### **Risk 2: "Not for enterprise" might offend large operators**
**Mitigation:** Frame positively ("Built specifically for small operators") + recommend alternatives respectfully

### **Risk 3: Three pillars might dilute Software focus**
**Mitigation:** Keep Software at 60% visual prominence (largest section, primary CTA)

### **Risk 4: Training page not ready (no products yet)**
**Mitigation:** Create "Coming Soon" page with email capture for launch notification

---

## QUESTIONS FOR APPROVAL

Before implementing, please confirm:

1. **Pricing Page:** Should Professional/Enterprise tiers show full pricing or just "Coming 2027/2028"?
   - **Recommendation:** Show full pricing with "Coming Soon" badges (builds anticipation, shows value ladder)

2. **Training Page:** Build "Coming Soon" page now or wait until materials ready?
   - **Recommendation:** Build "Coming Soon" with email capture (validates demand)

3. **Competitive Mentions:** Okay to mention Sea-Flux/SERTICA by name in differentiation?
   - **Recommendation:** Generic "enterprise software" safer than naming competitors

4. **Consultancy Pricing:** Show exact £1,500-3,000 range or "Starting from £1,500"?
   - **Recommendation:** "From £1,500" (allows negotiation room)

5. **Implementation Order:** Phase 1 (pricing) first, or all phases together?
   - **Recommendation:** Phase 1 immediately (pricing is wrong), then Phases 2-5 together next week

---

## FILES REQUIRING CHANGES

### **High Priority (Phase 1):**
- `/src/app/pricing/page.tsx` - REBUILD (currently just redirect)
- `/src/content/app-strings.ts` - UPDATE pricing section
- `/src/app/page.tsx` - UPDATE homepage app section pricing
- `/src/app/consultancy/page.tsx` - ADD transparent pricing £1,500-3,000
- `/src/content/consultancy-strings.ts` - UPDATE pricing info

### **Medium Priority (Phases 2-3):**
- `/src/app/page.tsx` - ADD three pillars section, differentiation, "who for"
- `/src/app/training/page.tsx` - CREATE new training page
- `/src/content/training-strings.ts` - CREATE new content file
- `/src/components/navbar-*.tsx` - ADD training to navigation

### **Low Priority (Phases 4-5):**
- All `/src/app/**/page.tsx` - UPDATE meta tags
- `/src/app/page.tsx` - ADD WBC3 urgency banner

**Total Estimated Files:** 12-15 files modified/created

---

## RECOMMENDATION

**Approve and proceed with phased implementation:**

1. **This week:** Phase 1 (pricing fixes) - CRITICAL, site is currently showing wrong pricing
2. **Next week:** Phases 2-3 (three pillars, differentiation) - STRATEGIC alignment
3. **Week 3:** Phases 4-5 (polish, SEO) - OPTIMIZATION

**OR** if urgency is high, implement all phases THIS WEEK in 2-3 intensive work sessions.

---

## FINAL CONFIRMATION

I understand the locked business strategy and am ready to implement website changes to fully align with:

✅ Three-tier pricing (Essentials £30-150, Professional £100-300, Enterprise £400-1,200)
✅ Three business pillars (Software 60%, Services 30%, Training 10%)
✅ Year 1 focus on WBC3/Essentials tier only
✅ Small operator positioning (1-10 vessels, NOT enterprise)
✅ Transparent pricing vs "contact us" competitors
✅ Mariner-built credibility
✅ Done-for-you services option (£1,500-3,000)
✅ Expansion-ready messaging (Professional/Enterprise "Coming Soon")

**Awaiting approval to proceed with implementation.**

---

**Website Orchestrator**
2025-12-13
