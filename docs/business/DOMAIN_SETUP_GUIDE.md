# SeaReady Domain Setup Guide
## Configuring seaready.co.uk with Vercel

**Created:** 2025-01-27
**Status:** Action Required
**Goal:** Point seaready.co.uk to your Vercel-hosted website

---

## Current Status

✅ **Website Code:** Deployed to GitHub
✅ **Vercel Hosting:** Active at `seaready-website.vercel.app`
❌ **Custom Domain:** Not yet configured

---

## Step 1: Add Domain in Vercel (5 minutes)

### 1.1 Login to Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Login with your account

### 1.2 Navigate to Your Project
1. Find and click on **"seaready-website"** project
2. Click on **Settings** tab
3. Click on **Domains** in left sidebar

### 1.3 Add Custom Domains
1. In the "Add Domain" field, type: **`seaready.co.uk`**
2. Click **Add**
3. Repeat for: **`www.seaready.co.uk`**

Vercel will show you DNS configuration instructions. Keep this page open for Step 2.

---

## Step 2: Configure DNS at Your Domain Registrar

### Where is seaready.co.uk Registered?

You need to login to wherever you bought the domain. Common UK registrars:
- **Namecheap** (namecheap.com)
- **GoDaddy** (godaddy.com)
- **123 Reg** (123-reg.co.uk)
- **Google Domains** / **Squarespace Domains**
- **Ionos** (ionos.co.uk)

**Don't know?** Search your email for "seaready.co.uk" to find the registration confirmation.

### 2.1 Login to Your Domain Registrar Dashboard

### 2.2 Find DNS Settings
Look for one of these menu items:
- DNS Management
- DNS Settings
- Nameservers
- Advanced DNS
- Manage DNS

### 2.3 Add Vercel DNS Records

Add these **exact records**:

#### Record 1: Root Domain (seaready.co.uk)
```
Type:  A
Name:  @ (or leave blank, or "seaready.co.uk")
Value: 76.76.21.21
TTL:   Automatic (or 3600)
```

#### Record 2: WWW Subdomain (www.seaready.co.uk)
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   Automatic (or 3600)
```

**Important:** If you see existing A or CNAME records for `@` or `www`, **DELETE them first** before adding the new ones.

### 2.4 Save Changes

Click **Save** or **Update** in your registrar's dashboard.

---

## Step 3: Verify Configuration (15-60 minutes)

### DNS Propagation Takes Time
- **Fast:** 15-30 minutes
- **Typical:** 1-2 hours
- **Maximum:** 24-48 hours (rare)

### Check Verification in Vercel
1. Return to Vercel Dashboard → seaready-website → Settings → Domains
2. Wait for verification status to change from "Pending" to "Valid"
3. You may see a refresh button - click it to check status

### Test Your Domain
Once Vercel shows "Valid":
1. Open browser (incognito/private mode recommended)
2. Visit: **http://seaready.co.uk**
3. Visit: **http://www.seaready.co.uk**

Both should redirect to **https://seaready.co.uk** and show your website.

---

## Step 4: Set Primary Domain (Optional but Recommended)

### 4.1 In Vercel Dashboard
1. Go to Settings → Domains
2. Find `seaready.co.uk` in the list
3. Click the **three dots** menu (⋯) next to it
4. Select **"Set as Primary Domain"**

This ensures:
- `www.seaready.co.uk` → redirects to → `seaready.co.uk`
- `seaready-website.vercel.app` → redirects to → `seaready.co.uk`
- All URLs are consistent

---

## Troubleshooting

### Domain Not Resolving After 2 Hours?

**Check DNS Records:**
```bash
# On Mac/Linux terminal:
dig seaready.co.uk
dig www.seaready.co.uk
```

Should show:
- `seaready.co.uk` → `76.76.21.21`
- `www.seaready.co.uk` → `cname.vercel-dns.com`

### Common Issues

#### "Invalid Configuration" in Vercel
- **Cause:** DNS records not set correctly at registrar
- **Fix:** Double-check the A and CNAME records match exactly

#### "Certificate Error" or "Not Secure"
- **Cause:** SSL certificate still provisioning
- **Fix:** Wait 15-30 minutes, Vercel auto-generates SSL certificates

#### Domain Shows Wrong Website
- **Cause:** Old DNS records still cached
- **Fix:** Clear browser cache, try incognito mode, or wait longer

#### "Domain Already Added to Another Project"
- **Cause:** Domain previously configured elsewhere
- **Fix:** Remove domain from old project first, then add to new one

---

## Post-Setup Checklist

Once seaready.co.uk is working:

- [ ] Update Business/_shared/WEBSITE_INBOX.md with new domain
- [ ] Update Google Analytics (if configured) with new domain
- [ ] Update any marketing materials with seaready.co.uk links
- [ ] Test all pages work correctly on the new domain
- [ ] Update contact forms/email notifications if they reference old domain

---

## Support Contacts

**Vercel Support:**
- Help: https://vercel.com/help
- Discord: https://vercel.com/discord

**Domain Registrar:**
- Contact support at your specific registrar
- Have domain name ready: seaready.co.uk

---

## Summary

✅ **Step 1:** Add seaready.co.uk + www.seaready.co.uk in Vercel Dashboard
✅ **Step 2:** Add A record (76.76.21.21) and CNAME record (cname.vercel-dns.com) at domain registrar
✅ **Step 3:** Wait 15-60 minutes for DNS propagation
✅ **Step 4:** Set seaready.co.uk as primary domain in Vercel
✅ **Step 5:** Update all documentation with new domain

**Expected Result:** seaready.co.uk shows your SeaReady website with automatic HTTPS

---

**Questions?** Let me know which step you're stuck on and I can provide more specific guidance.
