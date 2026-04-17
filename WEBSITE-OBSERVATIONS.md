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
