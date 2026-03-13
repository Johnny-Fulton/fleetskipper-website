# Weekly Maintenance Tasks

**Purpose:** Keep site healthy and performing well
**Time Commitment:** 30-45 minutes per week
**Best Day:** Friday afternoon (end of week review)

---

## 🔍 WEEK AT A GLANCE

| Task | Priority | Time | Tools |
|------|----------|------|-------|
| Performance Audit | HIGH | 10 min | Lighthouse |
| Analytics Review | HIGH | 10 min | GA4 |
| Content Check | MEDIUM | 5 min | Manual |
| Link Check | MEDIUM | 5 min | Playwright |
| Security Scan | HIGH | 5 min | npm audit |
| Backup Verify | LOW | 5 min | Git |

---

## ⚡ TASK 1: PERFORMANCE AUDIT (10 min)

### Run Lighthouse Audit
```bash
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website
npx playwright test performance --headed
```

### Check These Scores (Target: 90+):
- [ ] Performance: ___
- [ ] Accessibility: ___
- [ ] Best Practices: ___
- [ ] SEO: ___

### Core Web Vitals:
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1

### Action Items:
- If score drops >5 points: Investigate why
- If score <85: Add to optimization backlog
- If score <70: Priority fix this week

**Log to:** `/docs/performance/LIGHTHOUSE_REPORTS/YYYY-MM-DD.md`

---

## 📊 TASK 2: ANALYTICS REVIEW (10 min)

### Open GA4 Dashboard
https://analytics.google.com

### Check These Metrics (vs. last week):
- [ ] **Sessions:** ___ (↑/↓ __%)
- [ ] **Users:** ___ (↑/↓ __%)
- [ ] **Bounce Rate:** ___% (target: <50%)
- [ ] **Avg Session Duration:** ___ (target: >2 min)
- [ ] **Demo Requests:** ___ (main conversion)

### Top Pages This Week:
1. ___
2. ___
3. ___

### Traffic Sources:
- Direct: ___%
- Organic Search: ___%
- Referral: ___%
- Social: ___%

### Questions to Ask:
- Which page is driving most demo requests?
- Where are users dropping off?
- Any unusual traffic spikes/sources?

**Log to:** `/docs/analytics/weekly-summaries/YYYY-MM-DD.md`

---

## 📝 TASK 3: CONTENT CHECK (5 min)

### Review All Pages:
- [ ] Homepage - any outdated info?
- [ ] Pricing - still accurate?
- [ ] Features - complete and current?
- [ ] Blog posts - any updates needed?
- [ ] Contact info - correct?

### Check for:
- ❌ Broken images
- ❌ Typos or grammar issues
- ❌ Outdated dates or info
- ❌ Placeholder text (Lorem ipsum)

### Content Quality:
- [ ] Reflects current product features
- [ ] CTAs are clear and working
- [ ] Brand voice is consistent

**Action:** Note any issues in backlog

---

## 🔗 TASK 4: BROKEN LINK CHECK (5 min)

### Run Link Checker
```bash
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website
npx playwright test links
```

### Manual Spot Check:
- [ ] Navigation menu links work
- [ ] Footer links work
- [ ] Blog internal links work
- [ ] External links (if any) still valid

### Fix Priority:
- **Critical:** Nav/footer links (fix immediately)
- **High:** Homepage/key landing pages
- **Medium:** Blog posts
- **Low:** Archive content

**Log to:** `/docs/maintenance/link-check-YYYY-MM-DD.txt`

---

## 🔒 TASK 5: SECURITY SCAN (5 min)

### Check Dependencies
```bash
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website
npm audit
```

### Review Output:
- [ ] **Critical:** 0 (must fix immediately)
- [ ] **High:** 0 (fix this week)
- [ ] **Moderate:** Note and schedule
- [ ] **Low:** Monitor

### Update Dependencies (if safe):
```bash
npm update
npm audit fix
```

### Verify No Breaking Changes:
```bash
npm run dev
# Test site manually
```

**Log to:** `/docs/security/audit-YYYY-MM-DD.md`

---

## 💾 TASK 6: BACKUP VERIFICATION (5 min)

### Verify Git Backup
```bash
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website
git status
git log --oneline -5
```

### Check:
- [ ] All recent changes committed
- [ ] Pushed to GitHub
- [ ] No uncommitted work files

### Verify Vercel Backup:
- [ ] Log into Vercel dashboard
- [ ] Confirm deployments are being saved
- [ ] Previous versions accessible for rollback

**Note:** Vercel keeps deployment history automatically

---

## 📧 TASK 7: WEEKLY SUMMARY (5 min)

### Write Brief Summary

**Template:**
```
## Weekly Summary - [Week of DATE]

### Performance:
- Lighthouse scores: [All 90+] / [Issues]
- Page speed: [Fast] / [Needs improvement]

### Analytics:
- Sessions this week: ___
- Demo requests: ___
- Top page: ___
- Trend: [↑ Growing] / [→ Stable] / [↓ Declining]

### Issues Found:
- [List any issues discovered]
- [Actions taken or planned]

### Next Week Priority:
- [Top 1-3 priorities]

### Status: ✅ All Good / ⚠️ Minor Issues / ❌ Needs Attention
```

**Post to:** `/logs/WORK_LOG.md`

---

## 🎯 WEEKLY GOALS TRACKER

### This Week's Achievements:
- [ ] Goal 1: ___
- [ ] Goal 2: ___
- [ ] Goal 3: ___

### Next Week's Priorities:
- [ ] Priority 1: ___
- [ ] Priority 2: ___
- [ ] Priority 3: ___

---

## 🚨 ESCALATION CRITERIA

**When to Spend Extra Time:**
- Performance score drops >10 points
- Traffic drops >30% without explanation
- Critical/High security vulnerabilities found
- Multiple broken links on key pages
- User-reported issues

**When to Move On:**
- All scores green (90+)
- Analytics trending normally
- No security issues
- All links working
- No major content issues

---

## ⏭️ NEXT STEPS

After completing weekly tasks:
- Update todo list for next week
- Flag any items for monthly review
- Schedule any needed fixes
- Feel accomplished! 🎉

---

*Last Updated: 29 January 2026*
