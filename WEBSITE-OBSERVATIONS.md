# FleetSkipper Website — Observations & Fixes

**Date:** 17 April 2026
**Purpose:** Observations from a review of fleetskipper.com. Items for the web orchestrator to action.

---

## Bugs / Errors

### 1. Contact page title says "Contact SeaReady"

The `<title>` tag on `/contact` reads "Contact SeaReady | Maritime Compliance Experts - FleetSkipper". Should be "Contact FleetSkipper" — leftover from rebranding.

**Fix:** Update the page title/meta on `/contact`.

---

### 2. Services page references MGN 280 instead of WBC3

Two references on `/services`:

- SMS Documentation Builds: *"Complete MGN 280 (M) compliant documentation"*
- SMS Audits & Gap Analysis: *"Gap analysis against MGN 280 requirements"*

MGN 280 is the old code. The site should reference WBC3 (Workboat Code Edition 3) throughout. This undermines credibility if a knowledgeable operator or surveyor reads it.

**Fix:** Replace all MGN 280 references with WBC3 on the services page.

---

## Content to Add

### 3. Blog posts — 5 drafted and ready

Five WBC3 blog posts have been drafted and are ready for publishing:

```
/REGULATION APP/FleetSkipper/website/blog/drafts/
├── wbc3-post-1-what-is-wbc3.md
├── wbc3-post-2-how-to-get-certified.md
├── wbc3-post-3-area-categories.md
├── wbc3-post-4-crew-qualifications.md
├── wbc3-post-5-keeping-certificate-valid.md
```

These are plain-English guides sourced directly from WBC3 Edition 3. Each post includes a source reference section at the bottom citing specific WBC3 sections. No other website currently has practical, accurate WBC3 guidance at this level.

**Action:** Add a blog/resources section to the site and publish these 5 posts. Each should link to the others and end with a soft CTA back to the consultancy or app.

---

### 4. More testimonials needed

Currently one testimonial from Glasgow City Boats. The site would benefit from 2-3 more real, named testimonials with company names. Potential sources:

- Ryan Hack / Mid and East Antrim Borough Council (currently trialling the app)
- Any other clients from SMS consultancy work

**Action:** Collect testimonials as they become available. Named company + real role + specific detail always beats anonymous quotes.

---

### 5. Fishing vessel tools — under-promoted

The FV Crew Requirements Checker (MSN 1871/1872/1873) is on the tools page but not mentioned on the homepage or services page. This is a genuine differentiator — no competitor covers fishing vessel compliance alongside WBC3.

**Action:** Consider adding a line on the homepage that FleetSkipper covers both WBC3 workboats and UK fishing vessels, or adding a second "badge" alongside the WBC3 one.

---

### 6. App screenshots or walkthrough

The homepage says "See the App" but there are no screenshots or video showing the actual interface. A few screenshots of the dashboard, the crew compliance view, and the green/amber/red status system would help visitors understand what they're getting before booking a demo.

**Action:** Add 3-4 app screenshots to the homepage "See It In Action" section, or a short video walkthrough.

---

## Blog Posts — Formatting Improvements

The 5 blog posts are live at `/blog`. Content is accurate and well-written but visually it's all headers, paragraphs, and bullet lists — no visual variety. Needs tables, callout boxes, and better linking between posts.

### 7. BUG — Post 4 table not rendering

**Post 4 (Crew Qualifications)** at `/blog/wbc3-crew-qualifications` has a markdown pipe table (Category vs Minimum Qualification) that renders as raw text with visible `|` characters instead of an HTML table. The markdown-to-HTML rendering doesn't support table syntax.

**Fix:** Either fix the markdown renderer to handle pipe tables, or convert the table to a proper HTML/React table component.

---

### 8. Add proper tables where data is comparative

Two posts need tables instead of long bullet lists:

**Post 3 (Area Categories)** at `/blog/wbc3-area-categories` — the 7 area categories are currently separate H3 headings with description paragraphs. Should be a clean table:

| Category | Operating Area | Conditions |
|---|---|---|
| Cat 0 | Unrestricted | No distance limit |
| Cat 1 | Up to 150nm | Offshore |
| Cat 2 | Up to 60nm | Extended coastal |
| Cat 3 | Up to 20nm | Day and night |
| Cat 4 | Up to 20nm | Daylight only |
| Cat 5 | Within 3nm | Day and night |
| Cat 6 | Within 3nm | Daylight only, favourable weather |

Keep the explanatory text below the table — the table gives the overview, the text gives the detail.

**Post 4 (Crew Qualifications)** — fix the broken Master qualification table (item 7 above), and also add a table for the "at least one vs all crew" breakdown.

---

### 9. Add callout/highlight boxes for key points

Create a reusable callout box component (coloured left border or background, icon optional) and use it for:

- **Post 1:** December 2026 transition deadline — amber/orange callout. This is the most important point in the post.
- **Post 4:** "PB Level 2 is Cat 6 only" — warning callout
- **Post 4:** "PSSR is not a WBC3 requirement" — info callout
- **Post 5:** "Certificate ceases to be valid if examinations are missed" — red/warning callout

Don't overuse — 1-2 per post maximum. They should highlight genuinely important regulatory points, not decorate paragraphs.

---

### 10. Add "key takeaway" summary box at top of each post

After the intro paragraph, before the main content, add a bordered summary box with 2-3 bullet points. Label it "In brief:" or "Key points:". This lets someone scanning get the headline answer without reading the full post.

Example for Post 1:
> **Key points:**
> - WBC3 applies to all UK commercial workboats and pilot boats operating at sea
> - It replaced Workboat Code Edition 2 and MGN 280
> - Existing vessels must transition to WBC3 by December 2026

---

### 11. Add "Read next" links between posts

At the bottom of each post (before the CTA), add a link to the next logical post:

- Post 1 (What is WBC3) → Post 2 (How to get certified)
- Post 2 (How to get certified) → Post 3 (Area categories)
- Post 3 (Area categories) → Post 4 (Crew qualifications)
- Post 4 (Crew qualifications) → Post 5 (Keeping your certificate valid)
- Post 5 (Keeping your certificate valid) → Post 1 (What is WBC3)

Simple format: "**Read next:** [How to Get Your Workboat Certified →](/blog/how-to-get-wbc3-certified)"

---

### 12. Add author and reading time

Each post should show author name and estimated reading time below the title:

"By Jonathan Fulton | 4 min read"

Builds credibility (Master Mariner writing about regulations) and sets expectations on length.

---

### 13. Fix post dates

All 5 posts show **18 Apr 2025**. Should be **2026**.

---

### 14. Do NOT add

- Images mid-article — workboat stock photos between paragraphs add nothing
- Sidebar — single column is correct for readability, especially on mobile
- Comments section — not needed at this stage
- Share buttons — low priority, adds clutter

---

## 🔴 URGENT — Blog Posts Not Updated (3rd Attempt)

Posts 2, 3, and 5 on the live site do NOT match the source drafts. The drafts have been updated with additional plain-English content but the live pages are still showing old text. Previous prompts to update these were not applied correctly.

### INSTRUCTIONS — Read the files, not this description

**Step 1 — Read these 3 draft files (they are the source of truth):**
1. `/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/blog/drafts/wbc3-post-2-how-to-get-certified.md`
2. `/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/blog/drafts/wbc3-post-3-area-categories.md`
3. `/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/blog/drafts/wbc3-post-5-keeping-certificate-valid.md`

**Step 2 — Replace the live blog content with the exact text from each draft:**
- Post 2 draft → `/blog/how-to-get-wbc3-certified`
- Post 3 draft → `/blog/wbc3-area-categories`
- Post 5 draft → `/blog/keeping-wbc3-certificate-valid`

Do NOT paraphrase. Do NOT rewrite. Do NOT summarise. Use the exact text from the draft files.

**Step 3 — Add to ALL 5 blog posts (including posts 1 and 4):**
- Author byline: "By Jonathan Fulton" below the title
- Reading time: estimate based on word count (200 words per minute), display as "X min read" next to author name

### VERIFICATION — Check these phrases exist on the live pages after your changes:

| Post | URL | Must contain |
|------|-----|-------------|
| Post 2 | `/blog/how-to-get-wbc3-certified` | "catches some buyers out" |
| Post 2 | `/blog/how-to-get-wbc3-certified` | "logbook for compliance" |
| Post 3 | `/blog/wbc3-area-categories` | "Cat 3 and Cat 4 cover the same distance" |
| Post 3 | `/blog/wbc3-area-categories` | "Watch out for Powerboat Level 2" |
| Post 5 | `/blog/keeping-wbc3-certificate-valid` | "examiner will walk the vessel" |
| Post 5 | `/blog/keeping-wbc3-certificate-valid` | "cheaper and easier to stay on top" |

If those phrases are NOT on the live pages after your changes, you have not used the draft files correctly. Read the drafts again.

---

## Things That Are Working Well (Don't Change)

- **"Built by a Master Mariner" positioning** — this is the strongest credibility signal on the site and a genuine differentiator. Keep it front and centre.
- **Tone and language** — practical, no hype, speaks directly to operators. Reads like it was written by someone who's been on the boats, not a marketing agency.
- **Free tools** — three working compliance checkers, open to anyone. Builds trust and captures leads.
- **"Book Free Consultation" CTA** — low-friction, appropriate for the stage the business is at.
- **Clean, professional design** — the site looks polished without trying too hard.
- **Consultancy + software positioning** — offering both a service and a product is a stronger value proposition than software-only competitors.

---

## Not Included (Intentional)

- **Pricing** — not publishing prices until the app has been properly trialled and the value is validated by real users. This is the right call at this stage.
- **Feature comparison tables** — not engaging in anonymous competitor comparisons. Let the product and credibility speak for themselves.
