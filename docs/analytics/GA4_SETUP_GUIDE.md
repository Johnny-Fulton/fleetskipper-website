# Google Analytics 4 Setup Guide

**Created:** 29 January 2026
**Status:** Code installed, awaiting GA4 account setup
**Time Required:** 15-20 minutes

---

## 🎯 What You'll Get

Once set up, you'll be able to track:
- **Page views** - Which pages people visit
- **User sessions** - How long they stay, how many pages they view
- **Traffic sources** - Where visitors come from (Google, direct, social, etc.)
- **Geographic data** - Countries, cities where your visitors are
- **Device info** - Mobile vs desktop, browsers, screen sizes
- **Conversions** - Demo requests, contact form submissions
- **User behavior** - Navigation patterns, engagement

---

## ✅ What's Already Done

I've already installed the GA4 tracking code in your website:
- ✅ Created `GoogleAnalytics.tsx` component
- ✅ Integrated into your Next.js app
- ✅ Configured to only track production traffic (not dev)
- ✅ Added custom event tracking helpers
- ✅ Set up automatic page view tracking

**The code is live and ready** - it just needs your GA4 Measurement ID to start working.

---

## 📋 Step-by-Step Setup

### Step 1: Create Google Analytics 4 Account (5 min)

1. **Go to Google Analytics:**
   - Visit: https://analytics.google.com
   - Sign in with your Google account (or create one)

2. **Click "Start measuring"** or "Admin" (bottom left)

3. **Create an Account:**
   - Account name: `SeaReady` or `SeaReady SMS`
   - Check the boxes you're comfortable with
   - Click "Next"

4. **Create a Property:**
   - Property name: `SeaReady Website`
   - Time zone: `United Kingdom`
   - Currency: `Pound Sterling (£)`
   - Click "Next"

5. **About your business:**
   - Industry: `Marine & Shipping` or `Technology`
   - Business size: `Small` (1-10 employees)
   - How you plan to use GA: Check `Measure website` and `Measure customer engagement`
   - Click "Create"

6. **Accept Terms of Service:**
   - Select `United Kingdom`
   - Accept the terms
   - Click "I accept"

---

### Step 2: Set Up Data Stream (3 min)

1. **Choose platform:** Click `Web`

2. **Set up web stream:**
   - Website URL: `https://seaready-website.vercel.app` (or `https://seaready.co.uk` if domain is configured)
   - Stream name: `SeaReady Website - Production`
   - ✅ Check **"Enhanced measurement"** (this tracks scrolls, outbound clicks, site search, video engagement, file downloads automatically)

3. **Click "Create stream"**

4. **IMPORTANT - Copy your Measurement ID:**
   - You'll see a screen showing your stream details
   - Look for **"Measurement ID"** - it looks like: `G-XXXXXXXXXX`
   - **COPY THIS ID** - you'll need it in Step 3

---

### Step 3: Add Measurement ID to Vercel (5 min)

Now we need to add your Measurement ID to your Vercel environment variables:

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Find your `seaready-website` project
   - Click on it

2. **Go to Settings:**
   - Click "Settings" tab at the top

3. **Add Environment Variable:**
   - Click "Environment Variables" in the left sidebar
   - Click "Add New"

4. **Add the variable:**
   - **Key:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** Your Measurement ID (e.g., `G-ABC123XYZ`)
   - **Environments:** Check all three: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

5. **Redeploy your site:**
   - Go to "Deployments" tab
   - Find the latest deployment
   - Click the three dots "..." menu
   - Click "Redeploy"
   - Wait 2-3 minutes for deployment to complete

---

### Step 4: Verify It's Working (5 min)

1. **Visit your live site:**
   - Go to https://seaready-website.vercel.app
   - Click through 2-3 pages

2. **Check GA4 Real-Time:**
   - Go back to Google Analytics
   - Click "Reports" in the left sidebar
   - Click "Realtime"
   - You should see **1 user** (you!) viewing the site

3. **If you see yourself:**
   - ✅ **SUCCESS!** GA4 is working!
   - It will now track all visitors automatically

4. **If you don't see yourself:**
   - Wait 60 seconds and refresh
   - Still nothing? Check the troubleshooting section below

---

## 🎉 What Happens Next

### First 24 Hours:
- GA4 will start collecting data immediately
- You'll see real-time visitors in the Realtime report

### After 24-48 Hours:
- Full reports will populate
- You'll see traffic sources, popular pages, user demographics
- I can start pulling weekly analytics reports for you

### Weekly:
- I'll check your analytics and summarize key metrics
- Report on: visitors, popular pages, traffic sources, conversions

### Monthly:
- Full executive report with insights and recommendations
- Trend analysis and growth opportunities

---

## 📊 Key Reports to Watch

Once data is flowing, here are the most useful reports:

### 1. **Realtime Report**
**Location:** Reports > Realtime
**Shows:** Who's on your site right now
**Use:** Quick health check, verify tracking works

### 2. **Acquisition Overview**
**Location:** Reports > Acquisition > Overview
**Shows:** Where visitors come from (Google, social, direct, etc.)
**Use:** Understand which marketing channels work

### 3. **Engagement > Pages and Screens**
**Location:** Reports > Engagement > Pages and screens
**Shows:** Most viewed pages, time on page, bounce rate
**Use:** Identify popular content, pages needing improvement

### 4. **User Attributes > Demographics**
**Location:** Reports > User > Demographics
**Shows:** Age, gender, location of your visitors
**Use:** Confirm you're reaching the right audience

### 5. **Conversions**
**Location:** Reports > Conversions
**Shows:** Goal completions (once we set up goals)
**Use:** Track demo requests, contact form submissions

---

## 🎯 Setting Up Conversions (Optional - 10 min)

To track demo requests and contact forms as conversions:

1. **Go to Admin > Events:**
   - Click "Admin" (bottom left)
   - Under "Data display" column, click "Events"

2. **Mark events as conversions:**
   - Look for these events (they'll appear once triggered):
     - `demo_request`
     - `contact_form_submit`
   - Toggle them to "Mark as conversion"

3. **These events will auto-fire when:**
   - Someone clicks a "Request Demo" button
   - Someone submits the contact form

**Note:** Events only appear in the list after they've been triggered at least once.

---

## 🔧 Troubleshooting

### Problem: Not seeing data in GA4

**Check 1: Measurement ID is correct**
- Go to Vercel > Settings > Environment Variables
- Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` matches your GA4 Measurement ID exactly

**Check 2: Site was redeployed**
- After adding the environment variable, you MUST redeploy
- Go to Vercel > Deployments > Click "..." > Redeploy

**Check 3: You're viewing the live site**
- GA4 only tracks production (https://seaready-website.vercel.app)
- It does NOT track localhost:3002 (by design)

**Check 4: Browser extensions**
- Some ad blockers block GA4
- Try in Incognito/Private mode
- Or temporarily disable ad blockers

**Check 5: Wait a bit**
- GA4 can take 5-10 minutes to show up first time
- Be patient, refresh the Realtime report

---

### Problem: Seeing "Not set" or "(none)" in reports

**This is normal for the first 24-48 hours** while GA4 collects enough data. As traffic comes in, these will be replaced with real data.

---

### Problem: No events showing up

**Events only appear after they've been triggered:**
1. Visit your live site
2. Click "Request a Demo" button
3. Submit contact form
4. Wait 5 minutes
5. Check Admin > Events in GA4

---

## 📱 GA4 Mobile App (Optional)

You can monitor your site on the go:

1. **Download the app:**
   - iOS: Search "Google Analytics" in App Store
   - Android: Search "Google Analytics" in Play Store

2. **Sign in** with your Google account

3. **View reports:**
   - Realtime visitors
   - Daily summaries
   - Notifications for traffic spikes

---

## 🔒 Privacy & GDPR Compliance

**Good news:** Basic GA4 setup is GDPR-compliant for your use case because:
- You're tracking anonymous usage (not personal data)
- You're not using GA4 for advertising
- You're a B2B business (not consumer)

**If you want to be extra safe:**
- Add a Privacy Policy page to your website
- Mention that you use Google Analytics
- Link to it in your footer

**Cookie consent banner:**
- Not strictly required for UK B2B sites
- But you can add one if you prefer (using tools like CookieYes)

---

## 💡 Pro Tips

### Tip 1: Check Weekly
Set a reminder to check GA4 every Friday:
- Quick glance at the week's traffic
- Note any interesting trends
- Ask me for a summary if you prefer

### Tip 2: Set Up Email Reports
GA4 can email you weekly summaries:
1. Go to any report
2. Click "Share" icon (top right)
3. Click "Schedule email"
4. Set frequency (weekly recommended)

### Tip 3: Connect Google Search Console
Once your domain is set up:
1. Verify site in Google Search Console
2. Link GSC to GA4 in Admin > Product links
3. See search queries that brought visitors to your site

### Tip 4: Track Goals
Ask yourself: "What action do I want visitors to take?"
- Request a demo
- Contact you
- Download a guide
- Sign up for newsletter

Then set these as conversion events in GA4.

---

## 📞 Need Help?

**For setup issues:**
- Google Analytics Help: https://support.google.com/analytics
- GA4 Setup Wizard: https://analytics.google.com/analytics/academy/

**Or just ask me:**
- I can review your setup
- Pull reports for you
- Explain any metrics
- Suggest optimizations based on data

---

## ✅ Setup Checklist

Use this to track your progress:

- [ ] Created Google Analytics 4 account
- [ ] Created property for SeaReady Website
- [ ] Set up web data stream
- [ ] Copied Measurement ID
- [ ] Added `NEXT_PUBLIC_GA_MEASUREMENT_ID` to Vercel
- [ ] Redeployed site on Vercel
- [ ] Visited live site and saw myself in Realtime report
- [ ] (Optional) Set up conversion events
- [ ] (Optional) Downloaded GA4 mobile app
- [ ] (Optional) Set up weekly email reports

---

## 🎯 Success Criteria

You'll know everything is working when:
1. ✅ You can see yourself in Realtime report
2. ✅ Page views are being recorded
3. ✅ Traffic sources are showing up
4. ✅ After 24 hours, you see data in main reports

---

## 📈 What To Track (KPIs)

### Weekly Check:
- **Users:** How many people visited?
- **Sessions:** How many visits total?
- **Bounce Rate:** Are people staying or leaving immediately?
- **Top Pages:** Which pages are most popular?

### Monthly Review:
- **Growth:** Traffic up or down vs last month?
- **Conversions:** Demo requests, contact forms
- **Traffic Sources:** Where are visitors coming from?
- **User Location:** Mostly UK traffic? (Should be!)

---

**Need the Measurement ID?**
It's in GA4 under: Admin > Data Streams > [Your stream] > Measurement ID

**Ready to add it to Vercel?**
1. Copy the ID
2. Go to Vercel > Settings > Environment Variables
3. Add as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Redeploy

---

*Last Updated: 29 January 2026*
*Status: Tracking code installed, awaiting account setup*
