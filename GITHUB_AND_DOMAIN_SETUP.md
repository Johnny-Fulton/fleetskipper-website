# ✅ GitHub + Domain Setup for FleetSkipper

**Date:** 2026-04-12
**GitHub Repo:** https://github.com/Johnny-Fulton/fleetskipper-website
**Vercel Project:** https://vercel.com/johnnys-projects-f4b60119/website

---

## 🎉 GITHUB SETUP - COMPLETE

✅ **Repository Created:** https://github.com/Johnny-Fulton/fleetskipper-website
✅ **Code Pushed:** All 337 files pushed to main branch
✅ **Deployment Commit:** Includes all Vercel deployment fixes

**Repository is PUBLIC** - Anyone can view the code

---

## 🔗 CONNECT VERCEL TO GITHUB (For Auto-Deploy)

### Step 1: Connect GitHub to Vercel (5 minutes)

1. **Go to Vercel Project:**
   https://vercel.com/johnnys-projects-f4b60119/website

2. **Settings → Git**

3. **Click "Connect Git Repository"**

4. **Select:**
   - Provider: GitHub
   - Repository: Johnny-Fulton/fleetskipper-website
   - Branch: main

5. **Save**

### Step 2: Enable Auto-Deploy

Once connected, Vercel will:
- ✅ Auto-deploy on every `git push` to main
- ✅ Create preview deployments for pull requests
- ✅ Show build status in GitHub commits

**To deploy updates:**
```bash
git add .
git commit -m "Your message"
git push
```

Vercel deploys automatically in 1-2 minutes!

---

##  🌐 DOMAIN SETUP: fleetskipper.com

Now let's get fleetskipper.com pointing to your Vercel deployment!

### Step 1: Configure Cloudflare DNS (5 minutes)

**Login to Cloudflare:** https://dash.cloudflare.com

1. **Select your domain:** fleetskipper.com

2. **Go to:** DNS → Records

3. **Delete any existing A or CNAME records** for @ and www (if they exist)

4. **Add these 2 NEW records:**

```
Record 1:
Type: A
Name: @
Content: 76.76.21.21
Proxy status: DNS only (GRAY cloud ☁️ - NOT orange!)
TTL: Auto

Record 2:
Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy status: DNS only (GRAY cloud ☁️ - NOT orange!)
TTL: Auto
```

**CRITICAL:** The cloud icon must be **GRAY** (DNS only), NOT orange (Proxied)!

If it's orange, Cloudflare will intercept SSL and break Vercel's certificate provisioning.

### Step 2: Add Domain to Vercel (2 minutes)

1. **Go to Vercel Project:**
   https://vercel.com/johnnys-projects-f4b60119/website

2. **Settings → Domains**

3. **Click "Add Domain"**

4. **Enter:** `fleetskipper.com`

5. **Click "Add"**

6. **Repeat for:** `www.fleetskipper.com`

Vercel will:
- Verify DNS records
- Provision FREE SSL certificate (Let's Encrypt)
- Configure redirects (www → apex or vice versa)

### Step 3: Wait for DNS Propagation (10-30 minutes)

- **DNS update:** 5-10 minutes
- **SSL provisioning:** 10-15 minutes
- **Total time:** ~30 minutes

**Check DNS propagation:**
https://dnschecker.org/#A/fleetskipper.com

When you see `76.76.21.21` for most locations, DNS is ready!

---

## ✅ WHEN COMPLETE

Your FleetSkipper website will be live at:

- **https://fleetskipper.com** - Main site
- **https://www.fleetskipper.com** - Redirects to main
- **https://website-hkmovrlli-johnnys-projects-f4b60119.vercel.app** - Vercel URL (still works)

**Benefits:**
✅ **Professional custom domain**
✅ **FREE SSL certificate** (auto-renewed)
✅ **Auto-deploy on git push**
✅ **Global CDN** - Fast worldwide
✅ **99.99% uptime**

---

## 🚀 HOW TO DEPLOY UPDATES

Once connected to GitHub, deploying updates is super easy:

```bash
cd "/Users/jonathanfulton/REGULATION APP/FleetSkipper/website"

# Make your changes to code...

git add .
git commit -m "Describe your changes"
git push

# Vercel automatically deploys in 1-2 minutes!
```

**Check deployment status:**
https://vercel.com/johnnys-projects-f4b60119/website

---

## 🔧 CLOUDFLARE ADDITIONAL SETTINGS (Optional but Recommended)

### SSL/TLS Settings

**Go to:** Cloudflare → SSL/TLS

**Set encryption mode to:** Full (strict)

This ensures end-to-end encryption between Cloudflare and Vercel.

### Redirect www to apex (or vice versa)

**Go to:** Cloudflare → Rules → Page Rules

**Add rule:**
```
URL: www.fleetskipper.com/*
Setting: Forwarding URL
Status: 301 (Permanent Redirect)
Destination: https://fleetskipper.com/$1
```

Or let Vercel handle it (recommended - easier!).

---

## 💰 COSTS

| Item | Cost | Notes |
|------|------|-------|
| Domain (fleetskipper.com) | £10-15/year | You pay registrar |
| GitHub (public repo) | FREE | Unlimited |
| Vercel Hosting | FREE | Hobby plan |
| SSL Certificate | FREE | Auto-renewed |
| CDN Bandwidth | FREE | Unlimited |
| Auto-deploy | FREE | Included |
| Cloudflare DNS | FREE | Basic plan |
| **TOTAL** | **~£10/year** | Just the domain! |

---

## 🆘 TROUBLESHOOTING

### Domain not working after 30 minutes?

**Check 1: Cloudflare DNS**
- Verify both A and CNAME records exist
- Make sure cloud icon is GRAY, not orange
- Check nameservers are pointing to Cloudflare

**Check 2: Vercel Domain Status**
- Go to: Vercel → Settings → Domains
- Should show "Valid Configuration" with green checkmark
- If red X, click for troubleshooting info

**Check 3: DNS Propagation**
- https://dnschecker.org/#A/fleetskipper.com
- Should show 76.76.21.21 globally
- Wait longer if only some locations show it

### SSL Certificate Issues?

**Cloudflare SSL/TLS Mode:**
- Must be set to "Full (strict)" or "Full"
- NOT "Flexible"

**Vercel SSL Status:**
- Vercel → Settings → Domains
- SSL should show "Valid" or "Provisioning"
- Can take 15 minutes to provision

**Force HTTPS:**
- Cloudflare → SSL/TLS → Edge Certificates
- Enable "Always Use HTTPS"

### Vercel Deployment Not Auto-Triggering?

1. Check GitHub connection:
   - Vercel → Settings → Git
   - Should show connected repository

2. Check recent commits:
   - Vercel → Deployments
   - Should see build triggered by git push

3. Re-connect if needed:
   - Disconnect and reconnect GitHub integration

---

## 📚 USEFUL LINKS

**GitHub Repository:**
https://github.com/Johnny-Fulton/fleetskipper-website

**Vercel Project:**
https://vercel.com/johnnys-projects-f4b60119/website

**Vercel Deployments:**
https://vercel.com/johnnys-projects-f4b60119/website/deployments

**Cloudflare Dashboard:**
https://dash.cloudflare.com

**DNS Checker:**
https://dnschecker.org

---

## ✅ SUMMARY

**What's Done:**
✅ GitHub repository created and code pushed
✅ Vercel deployed and live

**What You Need to Do:**
1. Connect Vercel to GitHub (for auto-deploy)
2. Configure Cloudflare DNS (2 records)
3. Add fleetskipper.com to Vercel
4. Wait 30 minutes for DNS/SSL

**Then you're live at fleetskipper.com!** 🎉

---

**Setup by:** Claude (SeaReady Website Orchestrator)
**Date:** 2026-04-12
**Total Time:** ~15 minutes (plus 30 min DNS wait)
