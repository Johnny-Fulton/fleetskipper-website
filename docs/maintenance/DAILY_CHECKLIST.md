# Daily Maintenance Checklist

**Purpose:** Quick daily health check (5 minutes)

---

## ☀️ MORNING CHECK (Automated + Manual)

### 1. Site Uptime ✅
- [ ] Verify site is live: https://seaready-website.vercel.app
- [ ] Check custom domain (once configured): https://seaready.co.uk
- [ ] Verify SSL certificate is valid (green padlock)

**If Down:**
- Check Vercel status dashboard
- Review deployment logs
- Execute emergency response protocol (Severity 1)

---

### 2. Error Monitoring 🐛
- [ ] Check Vercel deployment logs for errors
- [ ] Review browser console (no JS errors)
- [ ] Test critical paths:
  - Homepage loads
  - Navigation works
  - Contact form accessible
  - Blog loads

**How to Check:**
```bash
# From project directory
npm run dev
# Open browser, check console for errors
```

---

### 3. Performance Quick Check ⚡
- [ ] Homepage loads in <3 seconds (visual check)
- [ ] No layout shift on page load
- [ ] Images load properly

**Tool:** Just load the site, feel if it's fast

---

### 4. Analytics Glance 📊
- [ ] Log into Google Analytics 4
- [ ] Check real-time users (are people visiting?)
- [ ] Note any unusual traffic spikes/drops

**Dashboard:** https://analytics.google.com

---

## 🔔 ALERT MONITORING

### Automated Alerts (Once Set Up):
- Vercel deployment failures (email)
- GA4 anomaly detection (email)
- Uptime monitoring (future: UptimeRobot)

### Manual Check:
- [ ] Any GitHub notifications?
- [ ] Any Vercel deployment warnings?
- [ ] Any user-reported issues?

---

## 📝 DAILY LOG

**Template:**
```
## [Date] - Daily Check

- Site Status: ✅ / ⚠️ / ❌
- Performance: Fast / Slow / Issues
- Errors: None / [List issues]
- Traffic: Normal / Spike / Drop
- Actions Taken: [Any fixes or notes]
```

**Log Location:** `/logs/daily-checks/YYYY-MM.md`

---

## 🚨 WHEN TO ESCALATE

**Minor Issues (log and monitor):**
- Slow load time (still <5s)
- Minor console warnings
- Small traffic drop (<20%)

**Major Issues (immediate action):**
- Site completely down
- Forms not working
- JavaScript errors preventing navigation
- Security warnings

---

## ⏱️ TIME COMMITMENT

**Normal Day:** 5 minutes
**Issue Day:** 15-30 minutes (depending on severity)

---

## 🎯 SUCCESS CRITERIA

A successful daily check means:
- ✅ Site is live and fast
- ✅ No critical errors
- ✅ Analytics are tracking
- ✅ Everything works as expected

If all ✅, you're done! Move on to weekly/monthly tasks as scheduled.

---

*Last Updated: 29 January 2026*
