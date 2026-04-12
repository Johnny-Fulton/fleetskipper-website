# FleetSkipper Domain Setup Guide

## 📋 Overview
This guide will help you connect your custom domain (e.g., `fleetskipper.com`) to your FleetSkipper website hosted on Vercel.

---

## 🎯 Prerequisites

**What You Need:**
1. ✅ A domain name (purchased from registrar like Namecheap, GoDaddy, Google Domains, etc.)
2. ✅ FleetSkipper website code (you have this!)
3. ✅ GitHub account
4. ✅ Vercel account (free tier works!)

**What Domain Should You Use?**
- **fleetskipper.com** (recommended - brand matches)
- **fleetskipper.co.uk** (UK-specific)
- **getfleetskipper.com** (alternative)

---

## 🚀 Step-by-Step Setup

### **Step 1: Deploy to Vercel** (If Not Already Done)

#### Option A: Using Vercel CLI (Fastest)
```bash
# Navigate to your project
cd "/Users/jonathanfulton/REGULATION APP/FleetSkipper/website"

# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? fleetskipper-website
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Using GitHub + Vercel Dashboard (Recommended for Auto-Deploy)

1. **Push to GitHub:**
```bash
cd "/Users/jonathanfulton/REGULATION APP/FleetSkipper/website"

# Initialize git if not done
git init
git add .
git commit -m "Initial FleetSkipper website deployment"

# Create GitHub repo (do this on GitHub.com first)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/fleetskipper-website.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Wait 2-3 minutes for deployment

**You'll get a URL like:** `fleetskipper-website.vercel.app`

---

### **Step 2: Add Custom Domain in Vercel**

1. **Go to Vercel Dashboard:**
   - Navigate to https://vercel.com/dashboard
   - Click on your `fleetskipper-website` project
   - Go to **Settings** → **Domains**

2. **Add Your Domain:**
   - Click "Add Domain"
   - Enter your domain: `fleetskipper.com`
   - Click "Add"

3. **Vercel Will Show DNS Records:**
   You'll see something like:
   ```
   A Record:    @ → 76.76.21.21
   CNAME Record: www → cname.vercel-dns.com
   ```

---

### **Step 3: Configure DNS at Your Domain Registrar**

#### If Using Namecheap:
1. Login to Namecheap account
2. Go to "Domain List" → Click "Manage" on your domain
3. Go to "Advanced DNS" tab
4. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 76.76.21.21 | Automatic |
| CNAME Record | www | cname.vercel-dns.com | Automatic |

5. Delete any conflicting records (old A records or CNAME for @)
6. Save changes

#### If Using GoDaddy:
1. Login to GoDaddy
2. Go to "My Products" → "Domains" → Click your domain
3. Click "DNS" or "Manage DNS"
4. Add records (same as above)

#### If Using Google Domains / Cloudflare:
1. Login to your DNS provider
2. Add the A and CNAME records shown by Vercel
3. Save

**DNS Propagation:** Takes 5 minutes to 48 hours (usually ~30 minutes)

---

### **Step 4: Enable HTTPS (Automatic)**

Vercel automatically provisions SSL certificates via Let's Encrypt. Once DNS propagates:

1. Go back to Vercel dashboard
2. Settings → Domains
3. You should see a ✅ next to your domain
4. HTTPS will be automatically enabled

---

### **Step 5: Redirect www to Root (Optional)**

Most people prefer `fleetskipper.com` over `www.fleetskipper.com`.

**In Vercel:**
1. Settings → Domains
2. Click on `www.fleetskipper.com`
3. Select "Redirect to fleetskipper.com"
4. Save

---

## 🔧 Troubleshooting

### Domain Not Working After 24 Hours?

**Check DNS Propagation:**
```bash
# Check if DNS is propagating
dig fleetskipper.com

# Should show Vercel's IP (76.76.21.21)
```

Or use: https://dnschecker.org

**Common Issues:**

1. **"Domain is not configured correctly"**
   - Double-check A record points to `76.76.21.21`
   - Remove any conflicting DNS records
   - Wait longer (can take up to 48h)

2. **"Invalid configuration"**
   - Make sure you added BOTH A and CNAME records
   - Check for typos in DNS settings

3. **"SSL certificate pending"**
   - Just wait, this is automatic
   - Can take 5-30 minutes after DNS propagates

---

## 📊 Vercel Dashboard Features

Once deployed, you get access to:

✅ **Auto-Deployments** - Every git push auto-deploys  
✅ **Preview URLs** - Every PR gets a preview link  
✅ **Analytics** - Built-in website analytics  
✅ **Edge Network** - Global CDN for fast loading  
✅ **Serverless Functions** - Your API routes work automatically  
✅ **Environment Variables** - Securely store API keys  

---

## 🎯 Recommended Domain Setup

**Primary Domain:** `fleetskipper.com`  
**Redirects:**
- `www.fleetskipper.com` → `fleetskipper.com`
- `fleetskipper.co.uk` → `fleetskipper.com` (optional, if you own it)

**Email:**
- Set up professional email: `hello@fleetskipper.com`
- Use Google Workspace, Zoho, or Forward Email

---

## 💰 Costs

**Domain Registration:**
- £10-15/year (.com domains)
- £8-12/year (.co.uk domains)

**Hosting (Vercel):**
- ✅ FREE for personal/commercial use
- Unlimited bandwidth
- Automatic scaling
- Global CDN included

**Email (Optional):**
- Free: Forward Email, Improvmx
- Paid: Google Workspace (£4.60/user/month), Zoho (£1/user/month)

---

## 🚦 What Happens After Domain Setup?

Your site will be available at:
- ✅ `https://fleetskipper.com` (your custom domain)
- ✅ `https://fleetskipper-website.vercel.app` (Vercel subdomain - still works)

**Automatic Features:**
- ✅ HTTPS/SSL enabled
- ✅ CDN worldwide
- ✅ Auto-deploy on git push
- ✅ 99.99% uptime

---

## 🎉 Next Steps After Domain is Live

1. **Set up Google Analytics** - Track visitors
2. **Submit to Google Search Console** - Get indexed
3. **Add professional email** - hello@fleetskipper.com
4. **Update social media** - Point links to new domain
5. **Business cards** - Print with new domain

---

## 📞 Need Help?

**Vercel Support:**
- Docs: https://vercel.com/docs/concepts/projects/custom-domains
- Email: support@vercel.com
- Discord: https://vercel.com/discord

**DNS Help:**
- Check propagation: https://dnschecker.org
- Test DNS: `dig yourdomain.com`

---

**Created:** 2026-04-05  
**Updated:** 2026-04-05  
**For:** FleetSkipper Website Deployment
