# SeaReady Website - Quick Reference

**Updated:** 2025-01-27

---

## 🎯 Current Status

✅ **Build fixed** - Deployment blocker resolved (7f263fa)
✅ **Duplicates cleaned** - Single codebase established
⏳ **Domain setup** - Needs user action (see guide below)

---

## 📂 Primary Codebase (THE ONE TRUE SOURCE)

**Location:** `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website`

**GitHub:** git@github.com:Johnny-Fulton/seaready-website.git

**Current URL:** https://seaready-website.vercel.app

**Target URL:** https://seaready.co.uk (not yet configured)

---

## 🚀 Quick Commands

```bash
# Navigate to website
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website

# Start dev server (runs on port 3002)
npm run dev

# Build for production
npm run build

# Check git status
git status

# View recent commits
git log --oneline -10
```

---

## 🌐 Domain Setup (ACTION REQUIRED)

Your website needs to use **seaready.co.uk** instead of the Vercel subdomain.

### Quick Steps:
1. **Read full guide:** Open `DOMAIN_SETUP_GUIDE.md`
2. **Vercel:** Add seaready.co.uk + www.seaready.co.uk in dashboard
3. **DNS:** Add A record (76.76.21.21) and CNAME record (cname.vercel-dns.com)
4. **Wait:** 15-60 minutes for DNS propagation
5. **Test:** Visit seaready.co.uk

**Estimated time:** 15 minutes setup + 30-60 minutes waiting

---

## 📁 What Got Cleaned Up

### Archived (can delete later):
- `/UK-MARITIME-LIBRARY/05-DOCUMENTATION/_archived_websites/seaready-website-backup-20250127/`
- `/UK-MARITIME-LIBRARY/05-DOCUMENTATION/_archived_websites/seaready-website-new-backup-20250127/`

### Kept:
- `/Business/04-MARKETING/website/` - Planning docs (not code)

---

## 🔒 Security Note

The duplicate repo had an exposed GitHub token. It's now archived, but you should:
1. Go to: https://github.com/settings/tokens
2. Find token starting with `ghp_l1k9Zsos...`
3. Click "Delete"

---

## 📝 Recent Changes (Last 3 Commits)

```
7f263fa - Fix React component naming error (2025-01-27)
2affead - Major website updates: eMPX branding (2025-01-27)
9c0f5f7 - Update MPX blog with correct content (2025-01-26)
```

---

## 📖 Documentation Files

- **DOMAIN_SETUP_GUIDE.md** - How to configure seaready.co.uk
- **CLEANUP_SUMMARY_2025-01-27.md** - What was cleaned up and why
- **logs/WORK_LOG.md** - Narrative of all work done
- **logs/ACTION_REGISTER.md** - Audit trail of file changes

---

## 🆘 If Something Goes Wrong

**Build failing?**
```bash
npm run build
# Read the error message carefully
# Check logs/WORK_LOG.md for recent changes
```

**Wrong directory?**
```bash
# Always work from:
cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website
```

**Deploy not working?**
- Check Vercel dashboard: https://vercel.com/dashboard
- View deployment logs
- Ensure GitHub push succeeded: `git log --oneline -1`

---

## ✅ Next Steps

1. Configure seaready.co.uk domain (see DOMAIN_SETUP_GUIDE.md)
2. Test all pages work on new domain
3. Delete archived folders after confirming domain works
4. Revoke exposed GitHub token (optional but recommended)

---

**Questions?** Check DOMAIN_SETUP_GUIDE.md or ask for help.
