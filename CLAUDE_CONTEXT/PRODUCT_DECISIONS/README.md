# Product Decisions - Single Source of Truth

This folder contains the definitive product information from internal teams.
All website content, marketing materials, and agent instructions should reference these documents.

## Files in This Folder

### 1. SMS_CONSULTANCY_FEATURES.md
**Source**: SMS Consultancy team responses to website questionnaire
**Date**: December 2025
**Contents**:
- Core deliverables (Word docs + Excel tools)
- Compliance coverage (WBC3 only currently)
- Turnaround time (3-4 weeks standard)
- Top 6 features for homepage
- Standalone product opportunities
- Key differentiators vs competitors

**Use Cases**:
- Writing consultancy page copy
- Creating sales materials
- Answering customer questions
- Identifying product expansion opportunities

---

### 2. APP_FEATURES.md
**Source**: App development team responses to website questionnaire
**Date**: December 2025
**Contents**:
- App development status (MVP 85% complete)
- Launch timeline (Beta Q1 2026, Launch Q2 2026)
- Core modules (12 functional modules)
- Pricing structure (£29-79/month per vessel)
- Key differentiators (offline-first, Domain Spine architecture)
- Marketing recommendations

**Use Cases**:
- Writing app waitlist page copy
- Planning beta launch campaign
- Understanding feature roadmap
- Setting pricing expectations

---

### 3. STRATEGIC_POSITIONING.md
**Source**: Strategic discussion with GPT (seaready_positioning.txt)
**Date**: December 2025
**Core Insight**: "You're not selling everything. You're selling the ability to produce what THEY need."

**Contents**:
- Build-on-demand model explanation
- How to expand beyond WBC3 without having everything ready
- Website positioning recommendations
- Service tier structure

**Use Cases**:
- Deciding which services to advertise
- Responding to custom requests (ISM, tugs, offshore, merchant vessels)
- Balancing honesty with opportunity
- Understanding long-term business model

---

## How Claude Agents Should Use These Files

### When Writing Website Copy:
1. **Check SMS_CONSULTANCY_FEATURES.md** for accurate consultancy details
2. **Check APP_FEATURES.md** for accurate app capabilities and timeline
3. **Check STRATEGIC_POSITIONING.md** to understand service expansion model

### When Answering "Can we offer X?":
- **If X = WBC3 workboat service**: YES, check SMS_CONSULTANCY_FEATURES.md for details
- **If X = Digital app**: YES but BETA Q1 2026, check APP_FEATURES.md for timeline
- **If X = ISM Code / Tugs / Offshore / Merchant vessels**: YES via build-on-demand model (see STRATEGIC_POSITIONING.md)
- **If X = Standalone products**: Check SMS_CONSULTANCY_FEATURES.md Section 5 for opportunities

### When Creating Marketing Materials:
- Use differentiators from both SMS_CONSULTANCY_FEATURES.md and APP_FEATURES.md
- Align messaging with STRATEGIC_POSITIONING.md ("we help maritime companies build practical safety systems")
- Be honest about what's ready NOW vs COMING SOON vs BUILD-ON-DEMAND

---

## Update Protocol

**When product features change**:
1. Update the relevant file (SMS_CONSULTANCY_FEATURES.md or APP_FEATURES.md)
2. Document the change with date and reason
3. Check if website copy needs updating
4. Notify all agents working on marketing materials

**When strategic direction changes**:
1. Update STRATEGIC_POSITIONING.md
2. Review all website sections for alignment
3. Update homepage hero/subtitle if needed
4. Adjust service offering descriptions

---

## Quick Reference

**Q: What can we deliver immediately?**
A: WBC3 SMS consultancy (3-4 weeks), Standalone products (Risk Assessment, Training Tracker)

**Q: When will the app launch?**
A: Beta Q1 2026 (January-March), Public launch Q2 2026 (April-June)

**Q: Can we help merchant vessels / ISM Code operators?**
A: YES, via build-on-demand model. We adapt our templates and build custom solutions.

**Q: What's our pricing?**
A:
- SMS Consultancy: £1,500-3,000 (single vessel)
- Standalone Products: £49-199
- App: £29-79/month per vessel (after beta)

**Q: What makes us different?**
A:
- **Consultancy**: Excel-first tools, 2-page docs, actually designed for workboats
- **App**: Offline-first, auto-generates compliance, built for UK workboats specifically
- **Overall**: Built by mariners, AI-powered delivery, honest pricing

---

**Maintained by**: Website Orchestrator Agent
**Last Updated**: December 2025
**Version**: 1.0
