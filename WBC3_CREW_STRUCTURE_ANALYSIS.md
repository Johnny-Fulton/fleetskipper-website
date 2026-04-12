# WBC3 Crew Structure Analysis
## For Crew Certificate Checker Tool

**Created:** 2025-01-XX
**Purpose:** Clarify correct crew certification structure based on WBC3 regulations

---

## YOUR QUESTION

> "how do we need to break this up, for eg we hav master, and 2nd person, but surely other crew also need certification"

**You're absolutely right!** The current structure is incomplete. Here's what WBC3 actually requires:

---

## WBC3 CREW STRUCTURE (CORRECT)

### 1. MASTER (Certificate of Competency Required)

**WBC3 Section 28.1.1:**
> "A vessel shall be safely manned, as a minimum, in accordance with the manning and qualifications requirements indicated in Tables A5.1 and A5.2."

**Table A5.1** - Lists all acceptable Master qualifications by Area Category:
- Category 0: Boatmaster T0, Yachtmaster Ocean, or higher STCW certificates
- Category 1: Boatmaster T1, Yachtmaster Offshore, or higher
- Category 2: Boatmaster T2, Yachtmaster Coastal, or higher
- Category 3: Boatmaster T3, Yachtmaster Coastal, or higher
- Category 4, 5, 6: Boatmaster T4, Powerboat Level 2, Day Skipper, or higher

---

### 2. SECOND PERSON (Requirements Vary by Category)

**IMPORTANT:** "Second Person" is NOT always a qualified officer. Requirements vary significantly:

**Categories 3, 4, 5, 6:**
> "second person that vessel owner/operator considers experienced and competent"
- No certificate required
- Just needs to be experienced/competent in owner's judgment

**Category 2:**
> "second person deemed competent by master"
- No certificate required
- Master determines competency

**Category 1:**
> "second person holding at least RYA/MCA Yachtmaster Coastal"
- Certificate IS required

**Category 0:**
> "another person holding at least Yachtmaster Offshore or higher"
- Certificate IS required

---

### 3. ENGINEER (If Required)

**Table A5.2** - Engineering qualifications required based on:
- Engine power (kW)
- Vessel type (Power Vessel W vs SL)
- Area category

**Note 2 (IMPORTANT):**
> "The person holding the engineering requirement may be a crew member listed in Table A7.1."

**Translation:** Engineering can be a **dual role** - the Master or Second Person can also be the Engineer if they hold the engineering qualification.

**Engineering Requirements Examples:**
- **Power Vessel SL** (standard vessel, not towing/cargo/lifting):
  - Categories 3-6: Approved Engine Course (Part 1) or demonstrated competency
  - Categories 0-2: Approved Engine Course (Part 1) or demonstrated competency

- **Power Vessel W** (towing/cargo/lifting operations):
  - <1500 kW: Marine Engine Operators Licence (MEOL) or equivalent
  - 1500-3000 kW: Senior MEOL or Small Vessel Second Engineer CoC
  - >=3000 kW: STCW III/2 Small Vessel Chief Engineer

---

### 4. ALL CREW (YES - EVERYONE ONBOARD!)

**WBC3 Section 28.1.4:**
> "**Anyone employed or engaged in any capacity onboard a vessel** shall complete the required Administration-approved mandatory training courses listed in Table A5.3."

**WBC3 Section 28.1.5:**
> "**Anyone employed or engaged in any capacity onboard a vessel** shall hold a valid medical fitness certificate."

**Translation:** EVERY single person onboard (Master, Second Person, deckhands, engineers, galley crew, etc.) needs:

#### Universal Requirements (ALL CREW):
1. **Sea Survival Training**
   - STCW route: MCA approved Personal Survival Techniques
   - Non-STCW route: RYA Basic Sea Survival

2. **Medical Fitness Certificate**
   - Valid medical certificate
   - Required for everyone

3. **Fire Fighting Training** (varies by vessel size):
   - **Vessels <15m:** Minimum ONE crew member
   - **Vessels 15m+:** **ALL crew members** must complete fire fighting course

4. **First Aid** (minimum coverage):
   - Categories 0-1: Master needs Proficiency in Medical Care, OR another crew member has medical/nursing qualification
   - Categories 2-6: Minimum one person needs Elementary First Aid Certificate

#### Role-Specific Training (as applicable):
5. **Radar Training** - All Masters and crew likely to use radar

6. **Stability Training** - Master (minimum) on vessels with Stability Booklet

7. **Electronic Chart Systems** - All Masters and crew on navigational watch

8. **Catering Training** - All crew engaged in food preparation (Basic Food Hygiene Level 2)

---

## RECOMMENDATION FOR UI REDESIGN

### Current Structure (INCOMPLETE):
- ✅ Master
- ✅ Second Person
- ✅ Engineer
- ❌ Missing: ALL CREW universal requirements

### Proposed Structure (CORRECT):

**Option A: Role-Based Cards (Cleaner)**
```
┌─────────────────────────┐
│   MASTER                │
│   Certificate Required  │
│   - CoC (by category)   │
│   + All crew training   │
└─────────────────────────┘

┌─────────────────────────┐
│   SECOND PERSON         │
│   (varies by category)  │
│   - CoC if Cat 0-1      │
│   - Experienced/comp... │
│   + All crew training   │
└─────────────────────────┘

┌─────────────────────────┐
│   ENGINEER              │
│   (if required)         │
│   - Based on power/type │
│   + All crew training   │
└─────────────────────────┘

┌─────────────────────────┐
│   ALL CREW              │
│   Universal Requirements│
│   - Sea Survival        │
│   - Medical Cert        │
│   - Fire Fighting*      │
│   - First Aid*          │
│   * = conditional       │
└─────────────────────────┘
```

**Option B: Hierarchical (More Accurate to WBC3)**
```
1. OFFICER REQUIREMENTS
   ├─ Master (Certificate of Competency)
   └─ Second Person (varies by category)

2. SPECIALIST REQUIREMENTS
   └─ Engineer (if required based on power/type)

3. UNIVERSAL CREW REQUIREMENTS
   └─ ALL CREW (everyone onboard regardless of role)
      ├─ Sea Survival
      ├─ Medical Certificate
      ├─ Fire Fighting (vessel 15m+)
      └─ First Aid (minimum 1 person)

4. ADDITIONAL TRAINING (as applicable)
   ├─ Radar (if vessel has radar)
   ├─ Stability (if stability booklet required)
   ├─ Electronic Charts (if carried)
   └─ Catering (if crew prepares food)
```

---

## ACTUAL WBC3 TABLES TO DISPLAY

You mentioned "having a copy of any actual tables might be a good idea" - here are the key tables:

### Table A5.1 - Master Qualifications & Deck Manning
- Shows exact certificate requirements for Master by Area Category
- Shows Second Person requirements by Area Category
- Could display as interactive table or formatted list

### Table A5.2 - Engineering Manning Requirements
- Shows engineering qualifications by power/vessel type/category
- Important Note 2 about dual roles
- Could display when engineering requirement is triggered

### Table A5.3 - Mandatory Training Courses
- Lists ALL training requirements with specific course names
- Shows who needs what (all crew vs specific roles)
- Could display as checklist in "All Crew" section

---

## KEY INSIGHTS

1. **"Second Person" is misleading terminology for Categories 3-6** - they don't need a certificate, just experience. Maybe rename to "Second Person / Deck Crew"?

2. **ALL CREW section is critical** - This is what you were missing! Sea Survival and Medical Certificate apply to EVERYONE, not just Master/Second Person.

3. **Fire Fighting is role-dependent on vessel size:**
   - Vessels <15m: Only 1 crew needs it
   - Vessels 15m+: ALL crew need it

4. **First Aid is coverage-based:** You only need 1 qualified person, but it's a key requirement to highlight.

5. **Engineering can be dual role** - Don't assume it's a separate person. Could be Master or Second Person with additional engineering qualification.

---

## NEXT STEPS

**Before we code, let me confirm with you:**

1. **UI Layout:** Do you prefer Option A (role-based cards) or Option B (hierarchical structure)?

2. **"All Crew" Section:** Should this be:
   - A separate card at the bottom (emphasizing "everyone needs this")?
   - Integrated into each role card (showing role-specific + universal requirements)?

3. **WBC3 Tables:** Should we:
   - Display full regulatory tables as expandable sections?
   - Show formatted excerpts within each requirement?
   - Link to PDF/external references?

4. **"Second Person" Naming:** Keep as "Second Person" or rename to something clearer like:
   - "Second Person / Deck Crew"
   - "Additional Manning"
   - "Deck Officer / Crew" (depending on category)

Let me know your preferences and I'll implement the redesign!

---

## SOURCES

All information extracted from:
- `/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/WBC3_REGULATIONS_AGENT_BRIEF.md`
- WBC3 Section 28.1.1 - Manning requirements
- WBC3 Section 28.1.4 - Mandatory training
- WBC3 Section 28.1.5 - Medical certificates
- WBC3 Table A5.1 - Master & Deck Manning
- WBC3 Table A5.2 - Engineering Manning
- WBC3 Table A5.3 - Mandatory Training Courses
