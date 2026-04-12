# Cloudflare DNS Setup for FleetSkipper

## 🎯 Quick Setup (5 Minutes)

### Step 1: Get Your Domain Name
What domain do you have on Cloudflare?
- `fleetskipper.com`
- `fleetskipper.co.uk`  
- Other?

**For this guide, I'll use `fleetskipper.com` - replace with your actual domain.**

---

### Step 2: Add DNS Records in Cloudflare

1. **Login to Cloudflare**: https://dash.cloudflare.com
2. Click on your domain (`fleetskipper.com`)
3. Go to **DNS** → **Records**
4. Add these 2 records:

#### Record #1: Root Domain (A Record)
```
Type:    A
Name:    @
IPv4:    76.76.21.21
Proxy:   DNS only (⚪ gray cloud)
TTL:     Auto
```

#### Record #2: WWW Subdomain (CNAME)
```
Type:    CNAME
Name:    www
Target:  cname.vercel-dns.com
Proxy:   DNS only (⚪ gray cloud)
TTL:     Auto
```

**CRITICAL: Turn OFF the orange cloud (Proxy) - it MUST be gray (DNS only)**

---

### Step 3: Remove Conflicting Records

Delete any existing:
- Old A records pointing to @
- Old CNAME records for @  
- Parking page redirects
- Cloudflare Page Rules for your domain

---

### Step 4: Add Domain in Vercel

1. Go to https://vercel.com/dashboard
2. Click on `fleetskipper-website` project
3. Go to **Settings** → **Domains**
4. Click "Add Domain"
5. Enter your domain: `fleetskipper.com`
6. Click "Add"

Vercel will verify DNS automatically (takes 30 seconds to 5 minutes)

---

### Step 5: Configure WWW Redirect (Optional)

**In Vercel:**
1. Settings → Domains
2. Click on `www.fleetskipper.com`
3. Select "Redirect to fleetskipper.com"
4. Save

Now `www.fleetskipper.com` → `fleetskipper.com`

---

## ⚠️ Common Cloudflare Issues

### Issue #1: Orange Cloud (Proxy) Enabled
**Problem:** Cloudflare proxy interferes with Vercel SSL
**Solution:** Click the orange cloud to turn it GRAY (DNS only)

### Issue #2: "Domain not configured correctly"
**Problem:** DNS records not set up properly
**Solution:**
- Verify A record: `@` → `76.76.21.21`
- Verify CNAME: `www` → `cname.vercel-dns.com`
- Both must be gray cloud (DNS only)

### Issue #3: SSL/HTTPS Not Working
**Problem:** Cloudflare SSL conflicts with Vercel
**Solution:**
1. Cloudflare Dashboard → SSL/TLS
2. Set to "Full (strict)" mode
3. Wait 5-10 minutes for SSL to provision

---

## 🔍 Verify DNS is Working

### Check DNS Propagation:
```bash
# Check A record
dig fleetskipper.com

# Should show: 76.76.21.21

# Check CNAME
dig www.fleetskipper.com

# Should show: cname.vercel-dns.com
```

Or use: https://dnschecker.org

---

## ⏱️ How Long Does It Take?

- **Cloudflare DNS changes:** 1-5 minutes (very fast!)
- **Global propagation:** 5-30 minutes
- **SSL certificate:** 5-15 minutes (automatic)
- **Total time:** ~10-30 minutes from DNS change to live site

---

## ✅ Success Checklist

- [ ] A record added: @ → 76.76.21.21 (gray cloud)
- [ ] CNAME added: www → cname.vercel-dns.com (gray cloud)
- [ ] Old conflicting records removed
- [ ] Domain added in Vercel dashboard
- [ ] Vercel shows ✅ next to domain
- [ ] `https://fleetskipper.com` loads your site
- [ ] `https://www.fleetskipper.com` redirects to non-www
- [ ] SSL certificate shows "Valid" (green padlock)

---

## 🎉 What You Get

Once configured:
- ✅ `https://fleetskipper.com` - Your custom domain
- ✅ HTTPS/SSL - Automatic & free
- ✅ CDN - Cloudflare + Vercel edge network
- ✅ Auto-deploy - Push to git → site updates
- ✅ 99.99% uptime - Vercel's infrastructure

---

## 📧 Professional Email Setup (Optional)

### Option 1: Cloudflare Email Routing (FREE!)
1. Cloudflare Dashboard → Email → Email Routing
2. Enable Email Routing
3. Add route: `hello@fleetskipper.com` → your personal email
4. Cloudflare adds MX records automatically

### Option 2: Google Workspace (Paid)
1. Google Workspace → Add domain
2. Add MX records to Cloudflare:
   ```
   Priority 1: ASPMX.L.GOOGLE.COM
   Priority 5: ALT1.ASPMX.L.GOOGLE.COM
   Priority 5: ALT2.ASPMX.L.GOOGLE.COM
   ```
3. Cost: £4.60/user/month

---

## 🚨 Need Help?

**Cloudflare Support:**
- Docs: https://developers.cloudflare.com/dns
- Community: https://community.cloudflare.com

**Vercel Support:**
- Docs: https://vercel.com/docs/custom-domains
- Email: support@vercel.com

**Check DNS:**
- https://dnschecker.org
- Command: `dig yourdomain.com`

---

## 📊 Cloudflare Settings Recommendations

### SSL/TLS Settings:
- **SSL/TLS encryption mode:** Full (strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON
- **Minimum TLS Version:** 1.2

### Speed Settings:
- **Auto Minify:** JS, CSS, HTML all ON
- **Brotli:** ON  
- **Early Hints:** ON
- **HTTP/2:** ON (automatic)
- **HTTP/3 (QUIC):** ON

### Security:
- **Security Level:** Medium
- **Bot Fight Mode:** ON
- **Challenge Passage:** 30 minutes

---

**Created:** 2026-04-05  
**For:** FleetSkipper Website + Cloudflare + Vercel
