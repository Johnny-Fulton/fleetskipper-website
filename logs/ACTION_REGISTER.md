# Action Register - FleetSkipper Website

## 2026-07-30 - Email gate added to tool results pages (crew-checker + wbc3-checker)

### Files Modified
- `src/app/tools/crew-checker/results/page.tsx` — added `hasAccess` state (default false); imported `EmailGate`; results content (main + info modal) wrapped in `{hasAccess && (<>...</>)}`; gate shown when `!hasAccess` with source `"crew-checker-results"` and a teaser count derived from `mandatoryTraining.length + 3 universal reqs`; localStorage key used: `crewResults`
- `src/app/tools/wbc3-checker/results/page.tsx` — same pattern; source `"wbc3-checker-results"`; teaser shows `equipment.length` and mandatory count; localStorage key used: `wbc3Results`

### Summary
Results pages now gate their content behind EmailGate. Users who have already given their email (stored in `localStorage['fleetskipper_user_email']`) pass through automatically via EmailGate's built-in `useEffect` check — zero friction for returning users. New users see the gate dialog with a value-forward message showing a count of requirements found, then get full access once they submit. Captured emails POST to `/api/collect-email` (existing), tagged by source. `npm run build` passes (68 pages, 0 errors).

## 2026-07-29 - Consultancy + waitlist routes: durable Supabase capture + branding fix

### Files Modified
- `src/app/api/consultancy/route.ts` — added Supabase service-role client; INSERT to `contact_submissions` (`form_type:'consultancy'`, all fields, `details` JSONB) before email; success only on durable capture; honest 500 if both DB and email fail; email now best-effort; branding `"SeaReady SMS Consultancy"` → `"FleetSkipper"`
- `src/app/api/waitlist/route.ts` — same treatment: Supabase insert (`form_type:'waitlist'`); durable-first success/failure logic; email best-effort; branding `"SeaReady Waitlist"` → `"FleetSkipper"`

### Summary
Fixes silent lead loss in both routes: previously email-send errors were swallowed and `success:true` returned regardless. Both routes now mirror the gold-standard contact route pattern. Also added a required-field guard (returns 400 if name or email missing) to both routes for parity with the contact route — prevents a direct/scripted POST from failing the NOT-NULL insert and falling to the fake-success email path. `npm run build` passes (68 pages, 0 errors). No deploy — awaiting migration to add `form_type`, `company`, `details` columns.

## 2026-07-29 - Contact form bug fix: durable Supabase capture (Stage 1)

### Files Modified
- `src/app/api/contact/route.ts` — rewired success/failure logic; every submission now inserted into `contact_submissions` before email is attempted; `success: true` only returned when DB insert succeeds; added Supabase service-role client (mirrors collect-email pattern)
- `supabase-contact-submissions-table.sql` — NEW: migration file creating `contact_submissions` table with RLS enabled deny-by-default (no permissive policy) + `REVOKE ALL FROM anon, authenticated`; advisor to run manually in Supabase SQL Editor before deploy

### Summary
Fixes silent data loss: previously the route caught email-send errors and returned `success: true` regardless, losing every submission. Now submissions are durably recorded in Supabase first; email is best-effort. `npm run build` passes (68 pages, 0 errors).

### Security correction (post-review)
Removed a permissive `CREATE POLICY ... FOR ALL USING(true) WITH CHECK(true)` from the SQL — with no `TO` clause it defaulted to PUBLIC, exposing contact PII to the browser-shipped `anon` key. The route uses the service-role key (bypasses RLS), so no policy is needed. Kept `ENABLE ROW LEVEL SECURITY` (deny-by-default) and added a belt-and-braces `REVOKE ALL ... FROM anon, authenticated`.

## 2026-07-28 - Repositioning: App + Consultancy copy edit (branch: reposition/app-plus-consultancy)

### Files Modified
- `src/components/Navigation.tsx` — "Consultancy" nav label → "Services"
- `src/app/waitlist/layout.tsx` — "SeaReady App" → "FleetSkipper App" in metadata
- `src/app/page.tsx` — hero bullets, How We Help card copy, Process Step 2 + 3, metadata, advisory disclaimer
- `src/app/services/page.tsx` — metadata, reordered service blocks (Gap Analysis → Internal Audit → Guided SMS Setup → Ongoing Support), renamed "SMS Documentation Builds" → "Guided SMS Setup", reworded to guided-not-done-for-you, added disclaimer
- `src/app/about/page.tsx` — credential copy throughout: removed "active/currently practising/WBC3 Compliance Specialist/Safety Management Systems Expert", replaced with "Master Mariner and Marine Pilot, ISM/MLC/ISPS Lead Auditor–Trained" factual framing

### Summary
Copy-only repositioning. No new components, sections, layouts, or styles created. `npm run build` passes (68 pages, 0 errors).

## 2026-03-24 - FV Crew Checker UI Redesign - Match WBC3 Style

### Files Modified
- `/src/app/tools/fv-crew-checker/results/page.tsx` - Complete redesign to match WBC3 UI

### Changes
**Redesigned FV crew checker results page to match WBC3's clean UI style:**

**UI Improvements:**
- Replaced cyan gradient headers with dark gray-to-black gradients (`from-gray-800 to-gray-900`)
- Added large green CheckCircle icons from lucide-react (matching WBC3)
- Implemented clean white cards with hover effects and subtle shadows
- Added sticky sidebar with vessel details (matching WBC3 layout)
- Dark hero section with "← Back to Crew Checker" link

**Info Button Modal Feature:**
- Added small 'i' (information) icon buttons next to every requirement name
- Clicking info button opens modal with MSN 1883 (F) regulatory quotes
- Modal displays:
  - Requirement name in cyan gradient header
  - MSN section reference (e.g., "MSN 1883 (F) Section 3.2.1")
  - Full regulatory quote in italicized box
  - "What this means:" plain-English description
  - Close button and click-outside-to-close functionality

**MSN Quote Function:**
Created comprehensive `getMSNQuote()` function with quotes for:
- Sea Survival Training
- ENG1 and ML5 Medical Certificates
- Basic Fire Fighting
- Basic First Aid
- Deck Officer Class 1 & 2 CoCs
- Engineer Officer Class 1 & 2 CoCs

**Alternative Groups:**
- Medical certificates (ENG1 vs ML5) displayed in amber "Choose ONE" box
- If only one item remains in group (e.g., 24m+ vessels with only ENG1), renders as standalone requirement

**Voluntary Badges:**
- Blue "Voluntary" badges for non-mandatory items
- Preserved from previous version

**Role Sections:**
- ALL CREW - Universal Requirements (UserGroupIcon, white on dark header)
- NEW ENTRANTS - Post-2005 Requirements (AcademicCapIcon)
- EXPERIENCED CREW - Pre-2005 Fishermen (DocumentCheckIcon)
- SKIPPER/MASTER - Certificate of Competency (Anchor icon from lucide-react)
- ENGINEER OFFICER - Machinery Qualifications (Wrench icon from lucide-react)

**Technical Implementation:**
- Imports: CheckCircle, Ship, Anchor, Wrench from lucide-react
- Imports: InformationCircleIcon, XMarkIcon from Heroicons
- InfoButton component with click handler
- Modal state management with `selectedInfo`
- Alternative group handling (single item vs. multiple items)
- Responsive grid layout (lg:grid-cols-4 with sidebar)

**Before vs After:**
- **Before:** Cyan gradient headers, expandable "+ More info" sections, smaller icons
- **After:** Dark gradient headers, info button modals, large CheckCircle icons, WBC3-matching style

### Testing
- Tested with Playwright browser automation
- Verified 5 info buttons present on test results page
- Modal opens correctly with MSN 1883 (F) regulatory quotes
- Modal displays section reference and description
- Screenshots captured: `test-fv-new-ui-results.jpg` and `test-fv-modal-open.jpg`
- Alternative groups (ENG1 vs ML5) render correctly in amber box

### User Request
User: "should we redo the fishing vessel version to have the same features but match the UI with the WBC3?"

**Solution:** Complete UI redesign of FV results page to match WBC3's professional, clean card-based layout while preserving FV-specific data structure (MSN tiers, role-based grouping, alternative groups).

---

## 2026-03-24 - WBC3 Crew Checker UI Enhancement - Info Button Feature

### Files Modified
- `/src/app/tools/crew-checker/results/page.tsx` - Added info button modal feature

### Changes
**Added expandable regulatory reference feature to WBC3 crew checker:**
- Added small 'i' (information) icon buttons next to each requirement title
- Clicking info button opens a modal displaying:
  - Requirement name in cyan header
  - WBC3 section reference (e.g., "WBC3 Section 28.1.4")
  - Full regulatory quote in italicized box
  - "What this means:" plain-English description
  - Close button and click-outside-to-close functionality
- Info buttons added to:
  - Sea Survival Training
  - Medical Fitness Certificate
  - Fire Fighting Training
  - First Aid Training
  - Radar Training (conditional)
  - Stability Training (conditional)

### Technical Implementation
- Imported `InformationCircleIcon` and `XMarkIcon` from Heroicons
- Added `infoModal` state to track which modal is open
- Created reusable `InfoButton` component
- Leveraged existing `getWBC3Quote()` function with 10+ pre-written regulatory quotes
- Modal uses fixed overlay with backdrop blur/darken
- Modal prevents background scroll and closes on ESC key or background click

### User Request Context
User feedback: "i think the UI for WBC3 is great but only thing is i like how the FV version has an info button to see exact section and quoted text for that exact certificate, so i wonder if we just had a small 'i' button that opened a modal or something, but like i said i really like the current wbc3 UI and dont want to change it"

**Solution:** Preserved existing WBC3 UI structure completely, added small info buttons that reveal regulatory details on-demand via modal popup.

### Testing
- Tested with Playwright browser automation
- Verified 6 info buttons present on page
- Modal opens correctly with regulatory quote
- Modal displays section reference and description
- Screenshots captured: `test-wbc3-modal-open.jpg` and `test-wbc3-with-info-buttons.jpg`

---

## 2026-03-23 - Fishing Vessel Crew Requirements Checker

### Files Created
- `/src/app/api/fishing-vessel/crew-check/route.ts` - API endpoint that filters FV requirements to crew-only items
- `/src/app/tools/fishing-vessel/crew-checker/page.tsx` - Form page with all required vessel input fields
- `/src/app/tools/fishing-vessel/crew-checker/results/page.tsx` - Results page with role-based grouping

### Files Modified
- `/src/app/tools/page.tsx` - Updated to show "Fishing Vessel Crew Requirements" tool card
- `/src/app/api/fishing-vessel/crew-check/route.ts` - **BUGFIX**: Added vessel size filtering for skipper certificates
- `/src/app/tools/fishing-vessel/crew-checker/results/page.tsx` - Added expandable details and voluntary badges

### Architecture
**One Engine, Multiple Focused Tools:**
- Single regulations engine (`fv-requirements-checker`) returns all 583 regulatory items
- API route filters to crew-only items using `appliesTo` field
- Results organized by role:
  - All Crew Must Have
  - New Entrants (post-2005)
  - Experienced Fishermen (2+ years)
  - Skipper/Master Requirements
- Within each role, grouped by subcategory (Mandatory Training, Medical Fitness, etc.)
- Alternative items (ENG1 vs ML5) displayed with amber "Choose ONE" callout

### Integration
- Uses zero-dependency regulations agent module at `/SeaReady/products/fv-requirements-checker/`
- Follows same form/results pattern as existing WBC3 tools
- Matches FleetSkipper UI styling (cyan accents, rounded cards, gray sections)

### Testing
- API tested with curl - returns 14 crew requirements for test vessel
- Full workflow tested with Playwright - form submission and results display working
- Role-based grouping verified with screenshots
- Alternative groups (medical certificates) displaying correctly

### User Feedback & Iterative Improvements

**Issue 1: Too much legislative detail**
- User: "it's just full of legislation... just lists the actual individual certificates"
- Fix: Implemented expandable "+ More info" sections with clean certificate names prominently displayed
- Regulatory details (reference, notes) now hidden by default and expandable per item

**Issue 2: Voluntary skipper certificates not indicated**
- User: "it doesn't specify that it's voluntary for the skipper's tickets"
- Fix: Added blue "Voluntary" badges for items where `mandatory === false`
- Applied to both standalone items and alternative group items
- Skipper certificates and Seafish ID cards now clearly marked as voluntary/recommended

**Issue 3: CRITICAL BUG - Vessel size filtering for skipper certificates**
- User: "I have just made a new entry and made the length over 16.5 m, but I'm still getting results for under 16.5 m."
- Problem: Skipper certificates labeled "Under 16.5m" were appearing for all fishing vessels regardless of size
- Root cause: Gate expressions in `/fv-requirements-checker/src/data/shared/crew.js` have `"gate": "isFishing"` instead of `"gate": "isFishing & loaLT:16.5"`
- Fix location: Added vessel size filtering in `/src/app/api/fishing-vessel/crew-check/route.ts`
- Fix logic: Exclude `fv.crew.doc.skipper.20mile` and `fv.crew.doc.skipper.beyond20` for vessels with LOA ≥ 16.5m
- Verification: Tested with 18m vessel - skipper section no longer appears (correct)
- Verification: Tested with 12m vessel - skipper certificates still appear (correct)

### Next Steps (Future)
- Equipment Checker (filter to equipment items)
- Maintenance Planner (filter to maintenance items)
- Drill Programme (filter to drill items)
- Full Compliance Suite (paid tool showing all 583 items)

- 2026-07-28 — advisor: homepage 'Two Ways' section — swapped card order so FleetSkipper App leads, SMS Consultancy second (app more dominant, per Jonathan). Copy/order only, no new elements. Branch reposition/app-plus-consultancy.
- 2026-07-28 — advisor: homepage hero CTAs flipped — 'See the App' now primary (filled), 'Book Free Consultation' secondary (outline). App more dominant. Copy/attr only. Branch reposition/app-plus-consultancy.
- 2026-07-28 — advisor: PRE-DEPLOY Opus-review fixes (verdict SHIP WITH FIXES) — (1) about/page.tsx 'ISM/MLC/ISPS Lead Auditor — Trained' → 'Audit-Trained' (drop held-title implication, match line 130); (2) services/page.tsx 'confidence it's inspection-ready' → 'so you walk in prepared' (drop 3rd-party outcome claim); (3) page.tsx App-card 'See Features' href /contact → /app (fix app-first contradiction); (4) Footer.tsx service urls '#consultancy'→'#gap-analysis' + '/services#app'→'/app' (dead/misdirected anchors); (5) contact/page.tsx added id='book-consultation' so every Book Consultation CTA scrolls to the form. Build green (68 pages). Branch → merged to main for prod deploy.
- 2026-07-30 — coder(team): WBC3-tools SAFETY-CRITICAL fix run. Corrected confirmed accuracy defects in Crew Checker + Equipment Checker against verbatim WBC3. RED (8): R1 machinery fire-detection 100kW quote→verbatim 15.6.2.4 (engine already ungated); R2 lifebuoys "at least 1"→min 2/4 per Table 14.1.2; R3 high-speed 25kn→20kn (specialOperations.js, inputSchema.js, crew page.tsx, crew/documentation.js); R4/R5 Boatmaster + Yachtmaster Coastal validForCategories drop Cat 2 (masterQualifications.js); R6 remove Boatmasters from Cat-1 second-person list (secondPerson.js); R7/R8 crew-checker results category labels Cat4=Up to 20nm(daylight)/Cat5=Within 3nm/Cat6=Within 3nm(daylight). ORANGE (9): O1 fixed-fire 16.4 quote→conditional 16.4.1.1; O2 emergency lighting drop invented "3 hours", cite 9.7.1.2; O3 ventilation re-scope to 21.1.3 (no A/C /9+ berthed/long-intl-or-tropical), removed >200/>600nm; O4 garbage placards gated ≥12m; O5 garbage record book +15-persons trigger, ">100GT"; O6 medical quote 28.1.2→verbatim 28.1.5; O7 stability quote→verbatim A5.3 (1-day MCA course); O8 ML5 +65th-birthday cap; O9 ML5 "Cat5-6 only"→up to Cat2/60mi. YELLOW: Y1 16.3.1.3.1→16.3.1.3 verbatim (engine+store+outputSchema comment); Y2 drop "9 litres" fire buckets; Y3 "Table 8.6"→"Table 27.2.3 para 8.6"; Y4 16.2.1.2 wheelhouse→each accommodation space; Y5 thermal-runaway→narrow 3.4.8 ventilation rule; Y6 22.2.3→22.2.2.3; Y7 VHF 17.4.1 verbatim; Y8 police VHF 13.4.2→12.4.2; Y9 GPS 19.7.1.1 self-ref fixed; Y10 battery cert 9.3.2→9.3.1 (+store 9.3.1 added, 9.3.2 retitled Stowage); Y11 police emergency power scoped to nav lights/equipment; Y12 placards >12→≥12; Y16 fuel record drop invented "5 years"; Y17/Y18 A5.3 First Aid + Radar quotes de-truncated; Y19 A5.2 title "Engine Room"→"Engineering". ALREADY-FIXED in tree pre-run: R1/R2/R3 (partial), cyber cites Y13/Y14/Y15 (31.3.3/.5/.6 correct), FV-checker comingSoon:true (commit b691488). LEFT UNVERIFIED (flagged to Jonathan, not touched): Y20 A5.2 Note2 A5.1-vs-A7.1 (source likely OCR-typo), + 5 Section-4 items (police 13.5 clause, ENG1 2yr/MSN1886, oil-sludge/Appendix7, SMS Appendix8, LSA reference-store paraphrase pass). Verify: node re-run 24/24 PASS (crew 10 + equipment 14); npm run build EXIT 0 (68 pages); lint warnings-only (pre-existing). Files: masterQualifications.js, secondPerson.js, specialOperations.js, medicalFitness.js, crew-checker page.tsx + results/page.tsx, inputSchema.js, basic/index.js, crew/documentation.js, electrical/equipment.js, environmental/documentation.js + equipment.js, ffe/equipment.js, gmdss/equipment.js, lsa/equipment.js, machinery/documentation.js, operations/documentation.js, wbc3-references.ts, outputSchema.js. NO deploy — stopped for deploy gate.
