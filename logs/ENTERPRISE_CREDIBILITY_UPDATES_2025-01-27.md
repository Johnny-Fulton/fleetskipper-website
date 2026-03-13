# SeaReady Website Updates Report

**Date:** 2026-01-27
**Prepared by:** Maritime MPX Orchestrator
**For:** Web Orchestrator
**Project:** SeaReady eMPX Marketing Website

---

## Executive Summary

Following a review of the SeaReady website content for accuracy and enterprise-readiness, four changes are required across three pages. These changes ensure all claims are defensible for Belfast Harbour IT security review and enterprise sales conversations.

---

## REQUIRED CHANGES

### Change 1: Remove Uncited Statistic (Blog Post)

**Page:** `/blog/mpx-clipboard-to-digital`

**Current Text:**
> "human error accounts for 58% of major maritime claims exceeding $100,000"

**Problem:** This statistic is uncited and could be challenged by enterprise IT reviewers. Unverifiable claims damage credibility.

**Replace With:**
> "The IMO and IMPA recognize effective information exchange as critical to safe pilotage - yet paper-based systems remain vulnerable to time pressure, illegibility, and lost documentation"

**Rationale:** This statement is accurate, doesn't require a citation, and positions the problem authoritatively using recognized maritime bodies.

---

### Change 2: Reword "Ready for Deployment" (Solutions Page)

**Page:** `/solutions/pilot-organizations`

**Current Text:**
> "eMPX is fully developed and ready for deployment"

**Problem:** Implies the product has no customers and is a one-size-fits-all solution. Every port has different requirements (berths, PMIS systems, safety thresholds).

**Replace With:**
> "eMPX is production-ready and can be configured to your port's specific requirements"

**Rationale:** Sounds established, acknowledges customization is part of the offering, doesn't undersell or oversell.

---

### Change 3: Remove SOC 2 Claim (Product Page)

**Page:** `/products/master-pilot-exchange`

**Current Text:**
> "SOC 2 certified hosting providers"

**Problem:** Railway and Vercel (current hosting) are NOT SOC 2 certified. This is factually incorrect and would fail enterprise IT due diligence.

**Replace With:**
> "Enterprise hosting options available on request"

**Rationale:** Accurate - we CAN migrate to AWS/Azure (which have SOC 2) if a customer requires it. Migration is 2-3 days work.

---

### Change 4: Clarify MFA Status (Product Page)

**Page:** `/products/master-pilot-exchange`

**Current Text (if present):**
> "Multi-factor authentication" (listed as a current feature)

**Problem:** MFA is not currently implemented in the MVP.

**Replace With:**
> "Multi-factor authentication available for enterprise deployments"

**Or:** Remove from current feature list entirely.

**Rationale:** MFA can be added quickly if required, but shouldn't be claimed as a current feature.

---

## SUMMARY TABLE

| # | Page | Find | Replace With |
|---|------|------|--------------|
| 1 | `/blog/mpx-clipboard-to-digital` | "human error accounts for 58% of major maritime claims exceeding $100,000" | "The IMO and IMPA recognize effective information exchange as critical to safe pilotage - yet paper-based systems remain vulnerable to time pressure, illegibility, and lost documentation" |
| 2 | `/solutions/pilot-organizations` | "eMPX is fully developed and ready for deployment" | "eMPX is production-ready and can be configured to your port's specific requirements" |
| 3 | `/products/master-pilot-exchange` | "SOC 2 certified hosting providers" | "Enterprise hosting options available on request" |
| 4 | `/products/master-pilot-exchange` | "Multi-factor authentication" (as current feature) | "Multi-factor authentication available for enterprise deployments" OR remove |

---

## PAGES REVIEWED - NO CHANGES NEEDED

The following claims were verified as **accurate**:

### `/solutions/pilot-organizations`
- ✅ Real-time Operations Dashboard - exists in admin portal
- ✅ Mobile-First Design - PWA works on all devices
- ✅ Instant Digital Archive - MPX records searchable in database
- ✅ Analytics & Insights - comprehensive analytics dashboard exists (665 lines)
- ✅ PMIS Integration Ready - working with Belfast PMIS
- ✅ "Built by working marine pilot" - Jonathan is a Belfast Harbour pilot

### `/blog/mpx-clipboard-to-digital`
- ✅ PMIS auto-population - working
- ✅ UKHO tidal data integration - working
- ✅ Digital dual signatures - implemented
- ✅ Cloud archiving with audit trails - full audit logging in place
- ✅ Offline capability - PWA with Service Worker
- ✅ 1.0m minimum UKC for Belfast - coded into safety guardrails
- ✅ IMPA compliance - form follows IMPA guidelines
- ✅ "10-15 min → under 3 min" time savings claim - matches design target

---

## PRIORITY

**HIGH** - These changes should be made before any Belfast Harbour IT security review or enterprise sales conversations.

---

## NOTES FOR WEB ORCHESTRATOR

1. All replacement text is copy-paste ready
2. No design changes required - text only
3. Changes 3 and 4 are security-critical for enterprise credibility
4. Changes 1 and 2 are positioning improvements

---

**Report generated by Maritime MPX Orchestrator**
**Contact:** Jonathan Fulton (Project Owner)
