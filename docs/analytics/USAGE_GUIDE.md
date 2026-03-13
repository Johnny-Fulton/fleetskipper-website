# Analytics Usage Guide

**Last Updated:** 29 January 2026
**Status:** ✅ Fully operational

---

## 🎯 Overview

Your website now has **automated analytics reporting** powered by Google Analytics 4 API. You can ask for analytics reports and get instant data without manually logging into GA4.

---

## ✅ What's Set Up

1. **GA4 Tracking** - Live on https://seaready-website.vercel.app
2. **OAuth API Access** - Automated data pulling via API
3. **Reporting Scripts** - Pre-built report generators
4. **Cross-Orchestrator Integration** - Shared credentials with Business folder

---

## 📊 How to Get Analytics Reports

### Option 1: Ask the Website Orchestrator

Simply ask me in natural language:

**Examples:**
- "How's my website traffic this week?"
- "What are my most popular pages?"
- "Show me this month's analytics"
- "How many demo requests did we get?"
- "Where is my traffic coming from?"

I'll automatically:
1. Pull fresh data from GA4 API
2. Format a beautiful report
3. Highlight key insights

### Option 2: Run the Script Directly

**Weekly Report (Last 7 Days):**
```bash
cd "/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website"
node scripts/analytics-report.js
```

**Custom Date Range:**
```javascript
// Edit scripts/analytics-report.js to change date range
// Default: '7daysAgo' to 'today'
// Options: '30daysAgo', '90daysAgo', 'yesterday', specific dates like '2026-01-01'
```

---

## 📈 What the Reports Show

### Traffic Summary
- **Sessions** - Number of visits to your site
- **Users** - Unique visitors (total and new)
- **Page Views** - Total pages viewed
- **Bounce Rate** - % of single-page sessions
- **Avg Session Duration** - How long people stay

### Top Pages
- Most viewed pages (top 5-10)
- Average time spent on each page
- Shows which content is most engaging

### Traffic Sources
- **Direct** - Typed URL or bookmark
- **Organic Search** - Found via Google/Bing
- **Social** - Facebook, LinkedIn, Twitter, etc.
- **Referral** - Links from other websites
- **Email** - Links from email campaigns

### Conversions
- **Demo Requests** - "Request Demo" button clicks
- **Contact Forms** - Contact form submissions

---

## ⏰ Data Availability

### Real-Time Data
- Available immediately in GA4 dashboard
- Shows current visitors (right now)

### Historical Reports
- **First 24-48 hours:** Data may be incomplete
- **After 48 hours:** Full historical data available
- **Updates:** Every 24 hours (GA4 processes overnight)

**Note:** If you just set up GA4, reports will show zero until:
1. Visitors come to your site (tracking is already working)
2. GA4 processes the data (24-48 hours)

---

## 🔧 Technical Details

### Files Location

**Analytics Script:**
```
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/scripts/analytics-report.js
```

**OAuth Credentials:**
```
/Users/jonathanfulton/Business/credentials/ga4_token.json
```

**Tracking Component:**
```
/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/src/components/analytics/GoogleAnalytics.tsx
```

### Configuration

**Measurement ID:** G-KZDGG8PS36
**Property ID:** 522092000
**Account ID:** 382391631
**OAuth Scope:** `analytics.readonly` (read-only, secure)

### API Package

```json
{
  "@google-analytics/data": "^4.7.0"
}
```

---

## 💡 Usage Examples

### Weekly Check-In

**Every Friday:**
```bash
node scripts/analytics-report.js
```

Or just ask me:
> "Show me this week's website performance"

### Monthly Review

**First of each month:**
> "How did the website perform last month?"

I'll pull 30-day data and highlight:
- Traffic trends (up/down vs previous month)
- Most popular content
- Best traffic sources
- Conversion performance

### Campaign Tracking

**After marketing activity:**
> "Did that LinkedIn post drive traffic?"

I can check traffic sources and spikes.

### Goal Monitoring

**Anytime:**
> "How many demo requests this month?"

I'll pull conversion data instantly.

---

## 🎯 What You Can Track

### Currently Tracking

✅ **Page Views** - Which pages people visit
✅ **User Sessions** - How long they stay
✅ **Traffic Sources** - Where visitors come from
✅ **Geography** - Countries/cities (available in full GA4 reports)
✅ **Devices** - Mobile vs desktop (available in full GA4 reports)
✅ **Demo Requests** - Custom event tracking
✅ **Contact Forms** - Custom event tracking

### Future Enhancements

🔄 **Blog Engagement** - Time on post, shares
🔄 **Pricing Page Views** - Interest indicator
🔄 **Video Views** - When you add videos
🔄 **Downloads** - If you offer PDFs/guides
🔄 **Scroll Depth** - How far people read

---

## 📅 Recommended Schedule

### Daily (5 min) - Optional
- Check for traffic spikes/issues
- Monitor real-time visitors during campaigns

### Weekly (15 min) - Recommended
- Pull weekly report (Friday afternoons)
- Review top pages and traffic sources
- Note any interesting trends

### Monthly (30 min) - Important
- Full monthly review
- Compare to previous month
- Identify growth opportunities
- Plan content strategy

---

## 🚨 Alerts & Monitoring

### When to Check Analytics

**Immediately after:**
- Launching new content/blog posts
- Running marketing campaigns
- Making website changes
- Sending email newsletters
- Social media posts about SeaReady

**Monthly:**
- First week of new month
- Review previous month's performance

**Ad-Hoc:**
- Whenever you're curious!
- Before client meetings (show traffic data)
- For business planning

---

## 🔒 Privacy & Security

### Data Access

- **OAuth credentials:** Read-only access (secure)
- **No PII collected:** GA4 configured for anonymous tracking
- **UK/EU compliant:** Data processed in EU regions
- **Revocable:** Can disable API access anytime

### Who Has Access

- ✅ You (Jonathan) - Full GA4 admin access
- ✅ Website Orchestrator - Read-only API access
- ✅ Business Orchestrator - OAuth credential management

### Credentials Storage

Centralized in `/Business/credentials/` for:
- ✅ Single source of truth
- ✅ Easy rotation if needed
- ✅ Shared across orchestrators
- ✅ Better security management

---

## ❓ Troubleshooting

### Report Shows Zero Traffic

**Possible causes:**
1. **Just set up GA4** - Wait 24-48 hours for data
2. **No recent visitors** - Check GA4 dashboard real-time report
3. **Tracking not deployed** - Verify environment variable in Vercel

**Solution:**
- Visit your live site: https://seaready-website.vercel.app
- Open GA4 dashboard → Reports → Realtime
- You should see yourself as "1 user online"

### Permission Error

**Error message:**
```
PERMISSION_DENIED: User does not have sufficient permissions
```

**Solution:**
- OAuth credentials need "Viewer" access to GA4 property
- Check: https://analytics.google.com → Admin → Property Access Management
- Ensure `support@seaready.co.uk` has Viewer role

### API Rate Limits

**GA4 API Limits:**
- 10 concurrent requests
- 25,000 tokens per hour

**Normal usage:** You'll never hit these limits
**If you do:** Wait 1 hour or reduce query frequency

---

## 🎓 Learning Resources

### Understanding GA4 Metrics

**Sessions:** A visit to your site (can include multiple page views)
**Users:** Unique people who visited (tracked by cookie)
**Bounce Rate:** % who left after viewing one page
**Engagement:** Time spent actively viewing content

### GA4 Dashboard

**If you want to check manually:**
1. Go to https://analytics.google.com
2. Click on "SeaReady Website" property
3. Reports → Engagement → Pages and screens

**But you don't need to!** Just ask me instead.

---

## 📞 Quick Reference

### Get a Report

**Ask me:**
> "Show me this week's analytics"

**Or run:**
```bash
node scripts/analytics-report.js
```

### Check If Tracking Works

**Real-time test:**
1. Visit https://seaready-website.vercel.app
2. Ask me: "Am I being tracked?"
3. I'll check GA4 real-time data

### Verify API Access

**Test command:**
```bash
cd "/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website"
node scripts/analytics-report.js
```

**Expected:** Report with traffic data (or zeros if no traffic yet)
**Error:** Contact Website Orchestrator

---

## ✨ Pro Tips

### 1. Set a Friday Reminder
Check analytics every Friday to:
- See weekly progress
- Plan next week's content
- Celebrate wins (traffic spikes!)

### 2. Compare to Previous Period
When asking for reports, request comparisons:
> "How does this month compare to last month?"

### 3. Track Campaigns
Before launching marketing:
> "Take a baseline snapshot of this week's traffic"

After campaign:
> "Compare this week to last week - did we get a spike?"

### 4. Content Ideas
Use "Top Pages" to see what resonates:
- Most popular pages → Create more similar content
- Least popular → Improve or remove

### 5. Traffic Source Strategy
- **Organic high?** → SEO is working
- **Direct high?** → Brand awareness strong
- **Referral high?** → Partnerships paying off
- **Social high?** → Social media strategy working

---

## 🎯 Success Metrics

### Healthy Website (Monthly)

**Traffic:**
- ✅ 100+ sessions/month (early stage)
- ✅ 500+ sessions/month (growth)
- ✅ 1000+ sessions/month (established)

**Engagement:**
- ✅ Bounce rate <60% (people exploring)
- ✅ Avg session >1 minute (reading content)
- ✅ Pages/session >1.5 (visiting multiple pages)

**Conversions:**
- ✅ 1-2% conversion rate (demo requests/sessions)
- ✅ Growing monthly (more leads over time)

### Red Flags

- 🚨 Bounce rate >80% (people leaving immediately)
- 🚨 Avg session <30 seconds (not engaging)
- 🚨 Traffic dropping month-over-month (investigate why)
- 🚨 Zero conversions (CTA not working)

---

## 🚀 Next Enhancements

**Coming soon:**
- ✅ Automated weekly email reports
- ✅ Traffic spike alerts
- ✅ Monthly executive summaries
- ✅ Conversion funnel analysis
- ✅ A/B test tracking
- ✅ Real-time dashboard integration

**Just ask for any of these and I'll build them!**

---

**Questions?** Just ask the Website Orchestrator anytime!

*Last Updated: 29 January 2026*
*Status: Fully operational and ready to use*
