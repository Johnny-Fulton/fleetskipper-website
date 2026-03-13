# SeaReady Website Documentation Index

**Last Updated:** 29 January 2026
**Manager:** SeaReady Website Orchestrator

---

## 🎯 QUICK START

**New to this project?** Start here:
1. Read [README.md](../README.md) - Project overview
2. Review [Business Structure](business/WEBSITE_MANAGEMENT_BUSINESS.md) - How we operate
3. Check [Daily Checklist](maintenance/DAILY_CHECKLIST.md) - Your daily routine

**Need to do something?**
- Daily tasks → [DAILY_CHECKLIST.md](maintenance/DAILY_CHECKLIST.md)
- Weekly tasks → [WEEKLY_TASKS.md](maintenance/WEEKLY_TASKS.md)
- Monthly tasks → [MONTHLY_TASKS.md](maintenance/MONTHLY_TASKS.md)

---

## 📁 DOCUMENTATION STRUCTURE

```
/docs/
├── INDEX.md (you are here)
├── QUICK_REFERENCE.md
├── DOCUMENTATION_INDEX.md (old - archived)
│
├── /business/
│   ├── WEBSITE_MANAGEMENT_BUSINESS.md ⭐ READ FIRST
│   ├── DOMAIN_SETUP_GUIDE.md
│   └── (future: client reports, contracts)
│
├── /maintenance/
│   ├── DAILY_CHECKLIST.md ⭐ DAILY
│   ├── WEEKLY_TASKS.md ⭐ WEEKLY
│   ├── MONTHLY_TASKS.md ⭐ MONTHLY
│   ├── DEPLOY_INSTRUCTIONS.md
│   └── GO_LIVE_CHECKLIST.md
│
├── /performance/
│   └── (lighthouse reports, bundle analysis)
│
├── /seo/
│   └── (SEO strategy, keyword tracking, content calendar)
│
├── /analytics/
│   └── (GA4 setup, monthly reports, conversion tracking)
│
├── /security/
│   └── (security audits, dependency updates)
│
├── /incidents/
│   └── (emergency contacts, incident reports)
│
└── /archive/
    └── (old planning docs, completed projects)
```

---

## 📋 KEY DOCUMENTS BY ROLE

### 🏢 Business Owner (Jonathan)
**READ THESE:**
- [Website Management Business Structure](business/WEBSITE_MANAGEMENT_BUSINESS.md) - What I do for you
- [Monthly Tasks](maintenance/MONTHLY_TASKS.md) - Monthly reports you'll receive
- [Domain Setup Guide](business/DOMAIN_SETUP_GUIDE.md) - Connecting seaready.co.uk

**YOU'LL RECEIVE:**
- Weekly summaries (in `/logs/WORK_LOG.md`)
- Monthly executive reports (in `/docs/analytics/monthly-reports/`)
- Emergency notifications (if critical issues)

---

### 🔧 Website Manager (Orchestrator)
**DAILY:**
- [Daily Checklist](maintenance/DAILY_CHECKLIST.md) - 5-minute health check

**WEEKLY:**
- [Weekly Tasks](maintenance/WEEKLY_TASKS.md) - Performance, analytics, links, security

**MONTHLY:**
- [Monthly Tasks](maintenance/MONTHLY_TASKS.md) - Deep dive audit, strategy, reporting

**REFERENCE:**
- [Business Structure](business/WEBSITE_MANAGEMENT_BUSINESS.md) - My organizational framework
- [Quick Reference](QUICK_REFERENCE.md) - Common commands and paths

---

### 👨‍💻 Developer (Future Team Members)
**SETUP:**
- [README.md](../README.md) - Get started
- [Deploy Instructions](maintenance/DEPLOY_INSTRUCTIONS.md) - How to deploy

**DEVELOPMENT:**
- `/CLAUDE_CONTEXT/` - Brand, features, tech stack
- `/src/` - Source code
- [CHANGELOG.md](../CHANGELOG.md) - Version history

---

## 🗂️ PROJECT FILES ORGANIZATION

### Root Directory (Keep Clean!)
**KEEP:**
- `README.md` - Project overview
- `LICENSE.md` - MIT license
- `CHANGELOG.md` - Version history
- `SECURITY.md` - Security policy
- `BUSINESS_INTEGRATION.md` - Link to Business folder
- `WEBSITE_INBOX.md` - Business Orchestrator inbox

**ARCHIVE EVERYTHING ELSE** to `/docs/archive/`

---

### /logs/ (Active Logging)
- `ACTION_REGISTER.md` - File operation audit trail
- `WORK_LOG.md` - Narrative of work done
- `/daily-checks/` - Daily health check logs (future)
- `/performance/` - Performance test results (future)

---

### /docs/ (All Documentation)
- `/business/` - Business operations
- `/maintenance/` - Checklists and procedures
- `/performance/` - Performance reports
- `/seo/` - SEO strategy and tracking
- `/analytics/` - Analytics reports
- `/security/` - Security audits
- `/incidents/` - Issue tracking
- `/archive/` - Completed/old docs

---

### /scripts/ (Automation)
- `/screenshots/` - Screenshot automation scripts
- `/tests/` - Test automation
- `/deployment/` - Deployment automation

---

### /CLAUDE_CONTEXT/ (AI Context)
Context files for the orchestrator:
- `BRAND_PALETTE.md` - Brand colors and usage
- `PRODUCT_FEATURES.md` - What SeaReady SMS does
- `TECH_STACK.md` - Technical details
- `TARGET_AUDIENCE.md` - Who we're marketing to
- `RECENT_WORK.md` - Recent changes and fixes

---

## 🔍 FINDING THINGS QUICKLY

### "Where is...?"

**Performance data?**
- Current: Run `npx playwright test performance`
- Historical: `/docs/performance/LIGHTHOUSE_REPORTS/`
- Weekly summaries: `/logs/WORK_LOG.md`

**Analytics reports?**
- Live data: https://analytics.google.com
- Monthly reports: `/docs/analytics/monthly-reports/`
- Weekly summaries: `/logs/WORK_LOG.md`

**Work history?**
- Narrative: `/logs/WORK_LOG.md`
- File changes: `/logs/ACTION_REGISTER.md`
- Git history: `git log`

**How to do X?**
- Daily tasks: `/docs/maintenance/DAILY_CHECKLIST.md`
- Weekly tasks: `/docs/maintenance/WEEKLY_TASKS.md`
- Monthly tasks: `/docs/maintenance/MONTHLY_TASKS.md`
- Business processes: `/docs/business/WEBSITE_MANAGEMENT_BUSINESS.md`

**Old project documents?**
- Everything archived: `/docs/archive/`
- Old screenshots: `/docs/archive/screenshots/`

---

## 🚀 COMMON TASKS

### Daily Health Check
```bash
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website
npm run dev
# Visit http://localhost:3002
# Check for errors in console
```

### Run Performance Audit
```bash
npx playwright test performance --headed
```

### Deploy to Production
```bash
git add .
git commit -m "Your message"
git push origin main
# Vercel deploys automatically
```

### Check Analytics
Visit: https://analytics.google.com

### View Logs
```bash
tail -50 logs/WORK_LOG.md
```

---

## 📊 REPORTING SCHEDULE

### Client Receives:
- **Daily:** Automated monitoring (alerts only)
- **Weekly:** Brief summary in chat/email
- **Monthly:** Full executive report PDF
- **Quarterly:** Strategy session

### Reports Location:
- **Weekly:** `/logs/WORK_LOG.md`
- **Monthly:** `/docs/analytics/monthly-reports/YYYY-MM-report.md`
- **Quarterly:** `/docs/business/quarterly-reviews/`

---

## 🆘 EMERGENCY PROCEDURES

### Site Down
1. Check Vercel dashboard: https://vercel.com
2. Review deployment logs
3. Rollback if needed: `vercel rollback`
4. Notify client immediately

### Security Issue
1. Assess severity
2. Apply fix or rollback
3. Run security audit: `npm audit`
4. Document in `/docs/security/incidents/`

### Performance Drop
1. Run Lighthouse audit
2. Check recent deployments
3. Review bundle size
4. Identify and fix issue

---

## 🔗 IMPORTANT LINKS

### Production
- **Live Site:** https://seaready-website.vercel.app
- **Custom Domain:** https://seaready.co.uk (once configured)

### Development
- **GitHub Repo:** https://github.com/Johnny-Fulton/seaready-website
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Local Dev:** http://localhost:3002

### Analytics & Tools
- **Google Analytics:** https://analytics.google.com
- **Google Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev

### Business
- **Business Folder:** `/Users/jonathanfulton/Business/`
- **Inbox:** `/Users/jonathanfulton/Business/_shared/WEBSITE_INBOX.md`
- **Noticeboard:** `/Users/jonathanfulton/Business/_shared/NOTICEBOARD.md`

---

## 📖 READING LIST

**If you have 5 minutes:**
- [Daily Checklist](maintenance/DAILY_CHECKLIST.md)

**If you have 30 minutes:**
- [Website Management Business](business/WEBSITE_MANAGEMENT_BUSINESS.md)

**If you have 2 hours:**
- [Monthly Tasks](maintenance/MONTHLY_TASKS.md)
- [Weekly Tasks](maintenance/WEEKLY_TASKS.md)
- All CLAUDE_CONTEXT files

---

## 🎯 GOALS & METRICS

### 2025 Targets

**Q1 (Jan-Mar):**
- [ ] Site load time <2s
- [ ] Lighthouse score >90
- [ ] GA4 fully configured
- [ ] 5+ blog posts

**Q2 (Apr-Jun):**
- [ ] 1,000+ monthly visitors
- [ ] 10+ demo requests/month
- [ ] Ranking for 3+ keywords

**Q3 (Jul-Sep):**
- [ ] 3,000+ monthly visitors
- [ ] 30+ demo requests/month
- [ ] Top 5 for primary keywords

**Q4 (Oct-Dec):**
- [ ] 5,000+ monthly visitors
- [ ] 50+ demo requests/month
- [ ] Established industry leader

---

## 💡 CONTINUOUS IMPROVEMENT

This documentation is living and breathing. As we:
- Learn new things
- Discover better processes
- Hit new milestones
- Face new challenges

We update these docs to reflect our evolved understanding.

**Last major update:** 29 January 2026 - Initial business structure created

---

## ✅ NEXT STEPS

**For Jonathan:**
1. Review [Website Management Business](business/WEBSITE_MANAGEMENT_BUSINESS.md)
2. Approve the approach
3. Let me run the first performance audit
4. Set up Google Analytics 4

**For Orchestrator:**
1. ✅ Create business structure (DONE)
2. ✅ Organize documentation (DONE)
3. ⏳ Run performance audit (NEXT)
4. ⏳ Install GA4 tracking (NEXT)

---

*This documentation system is designed to scale with the business. As we grow, so does our knowledge base.*
