# Homepage Layout Decision Required
**Date:** 2025-12-13
**From:** Website Orchestrator
**To:** Business Orchestrator
**Priority:** Medium
**Status:** ⏳ AWAITING DECISION

---

## Question

We currently have **TWO sections** on the homepage that show our products:

1. **"Three Pillars"** (lines 60-211) - Shows Software, Services, Training
2. **"Our Solutions"** (starts line 213) - Shows SMS Consultancy + SeaReady App (detailed)

**The Issue:** There's overlap/repetition. We're showing Software and Services twice on the same page.

Jonathan asked: *"Is there a clash between those or is it OK to keep them one after the other?"*

---

## Current Homepage Flow

```
1. WBC3 Urgency Banner (NEW - Phase 1)
2. Three Pillars Section (NEW - Phase 2)
   ├─ Software (£30-150/mo, Beta Q1 2026)
   ├─ Services (£1,500+, Available Now)
   └─ Training (£50-300, Coming Q1 2026)
3. Our Solutions Section (OLD - existing)
   ├─ SMS Consultancy (detailed features)
   └─ SeaReady App (detailed features)
4. [Rest of homepage...]
```

---

## Analysis: Pros & Cons

### Option A: Keep Both Sections (Current State)

**PROS:**
- ✅ Three Pillars = Quick menu ("Here's everything we do")
- ✅ Our Solutions = Deep dive (detailed benefits for Software + Services)
- ✅ Shows Training Materials upfront (validates third pillar)
- ✅ Two conversion points (quick decision + informed decision)

**CONS:**
- ❌ Repetition - Showing Software/Services twice
- ❌ Potential confusion - "Wait, didn't I just see this?"
- ❌ Longer page (more scrolling)
- ❌ Inconsistent messaging (light overview → detailed features)

---

### Option B: Remove "Our Solutions", Keep Only "Three Pillars"

**PROS:**
- ✅ No repetition - Clean, clear
- ✅ Shorter homepage (better mobile UX)
- ✅ Forces visitors to click through to dedicated pages
- ✅ Three Pillars gets all the attention

**CONS:**
- ❌ Less detail on homepage (might lose conversions)
- ❌ Loses the "deep dive" for people who want more info before clicking
- ❌ Training gets equal weight to Software/Services (is this accurate to business strategy?)

---

### Option C: Remove "Three Pillars", Keep Only "Our Solutions"

**PROS:**
- ✅ Detailed features right away
- ✅ Focuses on the two main products (Software 60% + Services 30%)
- ✅ Traditional SaaS homepage pattern

**CONS:**
- ❌ Loses Training visibility
- ❌ Misses the "three ways we help" positioning
- ❌ Doesn't validate the Phase 2 strategy we just implemented

---

### Option D: Keep Both BUT Differentiate Clearly

**PROS:**
- ✅ Best of both worlds
- ✅ Clear user journey: "Menu → Details"
- ✅ Works if we rename sections strategically

**CONS:**
- ❌ Still some repetition
- ❌ Requires careful messaging to avoid confusion

**Implementation:**
```markdown
Three Pillars:
- Title: "Three Ways We Help"
- Subtitle: "Choose the solution that fits your needs"
- Message: Quick overview with pricing + CTAs

Our Solutions:
- Rename to: "Deep Dive: Our Flagship Products"
- Subtitle: "Ready to learn more? Here's how we help you stay compliant"
- Message: Detailed features, benefits, differentiation
```

---

## Business Strategy Considerations

### Revenue Weighting
- **Software:** 60% (future revenue, beta Q1 2026)
- **Services:** 30% (current revenue, available now)
- **Training:** 10% (future revenue, coming Q1 2026)

**Question:** Should homepage reflect this weighting?
- If YES → Option C or D (Services gets the spotlight, Training less prominent)
- If NO → Option A or D (Equal weight to all three pillars)

### Conversion Goals
**Primary Goal:** What do we want visitors to do FIRST?
1. Request a consultancy quote (£1,500 one-time) ← **Immediate revenue**
2. Join app waitlist (£30-150/mo future) ← **Future revenue**
3. Join training waitlist (£50-300 future) ← **Smallest revenue**

**If #1 is priority:** Services should be prominently featured (either Three Pillars OR Our Solutions, not both)

**If #2 is priority:** Software should dominate homepage

**If equal priority:** Keep both sections

---

## Competitor Analysis

**What are competitors doing?**
- **Applied Nautical:** Single product showcase (consultancy only)
- **Typical SaaS sites:** 1-2 product sections max
- **Multi-product sites:** Menu/navigation for products, homepage focuses on ONE hero product

**Recommendation based on industry:** Pick ONE section to dominate homepage

---

## User Journey Analysis

**Scenario 1: Visitor needs compliance NOW**
- Current flow: Sees Three Pillars → Clicks "Services" → Sees "Our Solutions" with Services again → Might get confused
- Better flow: Sees Three Pillars → Clicks "Services" → Goes to `/consultancy` page

**Scenario 2: Visitor researching options**
- Current flow: Sees Three Pillars → Scrolls → Sees detailed "Our Solutions" → Good
- Alternative: Sees detailed "Our Solutions" with all 3 products → Better

**Scenario 3: Mobile visitor (50%+ of traffic)**
- Current flow: Too much scrolling through repetitive content
- Better: One concise section

---

## Recommendations (Ranked)

### 🥇 RECOMMENDED: Option D - Keep Both BUT Differentiate

**Why:**
- Serves two types of visitors (quick scanners + detail seekers)
- Validates Phase 2 strategy (Three Pillars positioning)
- Provides depth for high-intent visitors

**Implementation:**
1. Keep "Three Pillars" as-is (quick overview)
2. Rename "Our Solutions" to **"Featured: Our Core Products"**
3. Add bridge text between them:
   ```
   "Want to learn more? Here's a detailed look at our two flagship products..."
   ```
4. Consider adding Training as a 3rd card to "Our Solutions" (make it comprehensive)

**Estimated effort:** 30 minutes (rename section, add bridge text)

---

### 🥈 SECOND CHOICE: Option B - Remove "Our Solutions"

**Why:**
- Cleanest user experience
- Forces clicks to dedicated pages (better tracking)
- Shorter homepage (better mobile)

**Implementation:**
1. Delete "Our Solutions" section entirely
2. Ensure Three Pillars CTAs are strong
3. Add more detail to Three Pillars cards (bridge the gap)

**Estimated effort:** 10 minutes (delete section)

---

### 🥉 THIRD CHOICE: Option A - Keep As-Is

**Why:**
- If it's not broken, don't fix it
- Some repetition is okay if messaging differs

**Implementation:**
- None needed
- Monitor analytics to see if repetition causes drop-off

**Estimated effort:** 0 minutes

---

## Questions for Business Orchestrator

1. **Primary conversion goal:** What's most important right now?
   - [ ] Get consultancy quotes (£1,500 immediate revenue)
   - [ ] Build app waitlist (future revenue)
   - [ ] Equal weight to both

2. **Training visibility:** How important is it to showcase Training on homepage?
   - [ ] Very important (keep equal weight in Three Pillars)
   - [ ] Medium (mention but don't feature)
   - [ ] Low (just link in nav)

3. **User experience priority:**
   - [ ] Quick overview (favor Three Pillars)
   - [ ] Detailed features (favor Our Solutions)
   - [ ] Both (keep both sections)

4. **Page length concern:**
   - [ ] Homepage too long (remove repetition)
   - [ ] Length is fine (keep both)

---

## Recommended Action

**My vote: Option D** - Keep both sections but differentiate them clearly.

**Reasoning:**
- Phase 2 was specifically about Three Pillars positioning → we should keep it
- "Our Solutions" provides depth for high-intent visitors
- Differentiation solves the repetition problem
- Quick fix (30 min)

**Next Steps:**
1. Business Orchestrator reviews this doc
2. Choose an option (A, B, C, or D)
3. Website Orchestrator implements chosen option
4. Test on mobile + desktop
5. Monitor analytics for 1-2 weeks

---

## Additional Context

- **Phase 2 just completed:** Three Pillars section was explicitly requested
- **Brand colors locked in:** Cyan (#0891B2) as primary (matches throughout)
- **WBC3 urgency banner live:** Already driving attention to Services
- **All pages built:** `/app`, `/consultancy`, `/training` ready for traffic

---

**Status:** ✅ RESOLVED - Implemented Option D
**Owner:** Business Orchestrator
**Assignee (Implementation):** Website Orchestrator
**Resolution Date:** 2025-12-13
**Decision:** Keep both sections with bridge text connecting them

---

## RESOLUTION IMPLEMENTED ✅

**User Decision:** Approved Option D (Keep both BUT differentiate)

**Implementation:**
- Added bridge text section between Three Pillars and Our Solutions
- Location: `/src/app/page.tsx` lines 213-223
- Content: "Ready to Learn More?" eyebrow + transitional message
- Brand colors: Cyan #0891B2, Gray #6B7280
- Deployed: Commit 52dff1d, pushed to production

**Result:**
- Clear user journey: Quick overview → Bridge → Detailed features
- Serves both quick scanners and detail seekers
- Eliminates confusion with explicit transition
- Preserves all content from Phase 2

---

*Document created by Website Orchestrator*
*2025-12-13*
*Resolution implemented: 2025-12-13*
