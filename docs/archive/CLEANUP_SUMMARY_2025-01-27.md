# Website Cleanup Summary - 2025-01-27

## Problem Identified

User reported multiple website directories and confusion about which was the "real" one.

## What Was Found

### 4 Website Directories Total:

1. **✅ PRIMARY (KEEP):** `/REGULATION APP/SeaReady/assistants/website`
   - Active Git repo connected to GitHub
   - Latest commits (7f263fa - today's build fix)
   - Deploys to Vercel automatically
   - **This is the ONE TRUE website codebase**

2. **🗑️ DUPLICATE (ARCHIVED):** `/UK-MARITIME-LIBRARY/05-DOCUMENTATION/seaready-website-new`
   - Out-of-date Git repo (last commit: 566437f from Sept 2024)
   - Had uncommitted changes
   - **Security issue:** Exposed GitHub token in remote URL
   - **Action:** Moved to `_archived_websites/seaready-website-new-backup-20250127`

3. **🗑️ OLD BACKUP (ARCHIVED):** `/UK-MARITIME-LIBRARY/05-DOCUMENTATION/seaready-website`
   - Not a Git repo, just old files
   - **Action:** Moved to `_archived_websites/seaready-website-backup-20250127`

4. **📄 DOCUMENTATION FOLDER (KEEP):** `/Business/04-MARKETING/website`
   - NOT a website codebase
   - Contains planning documents and implementation plans
   - **Action:** No changes needed

---

## Actions Taken

### 1. Archived Old Directories ✅
- Moved `seaready-website` → `_archived_websites/seaready-website-backup-20250127`
- Moved `seaready-website-new` → `_archived_websites/seaready-website-new-backup-20250127`
- Location: `/REGULATION APP/UK-MARITIME-LIBRARY/05-DOCUMENTATION/_archived_websites/`
- These can be deleted after confirming everything works

### 2. Fixed Security Issue ✅
- Duplicate repo had exposed GitHub token in remote URL
- Now archived and isolated from active development
- Token was in format: `https://ghp_xxxxx@github.com/...`

### 3. Created Domain Setup Guide ✅
- New file: `DOMAIN_SETUP_GUIDE.md` in website root
- Complete instructions for configuring seaready.co.uk
- Step-by-step Vercel + DNS setup process

### 4. Updated Documentation ✅
- Updated `/Business/_shared/WEBSITE_INBOX.md` with:
  - Correct primary codebase location
  - Current deployment URL
  - Target domain (seaready.co.uk)
  - Repository URL

---

## Current State (Clean)

### Active Development
- **Location:** `/REGULATION APP/SeaReady/assistants/website`
- **GitHub:** git@github.com:Johnny-Fulton/seaready-website.git
- **Vercel:** seaready-website.vercel.app
- **Latest commit:** 7f263fa (build fix, deployed today)

### Archived (Safe to Delete Later)
- `/UK-MARITIME-LIBRARY/05-DOCUMENTATION/_archived_websites/seaready-website-backup-20250127/`
- `/UK-MARITIME-LIBRARY/05-DOCUMENTATION/_archived_websites/seaready-website-new-backup-20250127/`

### Documentation (Business Folder)
- `/Business/04-MARKETING/website/` - Planning docs (not code)

---

## Next Steps

### Immediate (User Action Required)
1. **Configure seaready.co.uk domain**
   - Follow `DOMAIN_SETUP_GUIDE.md`
   - Add domain in Vercel dashboard
   - Update DNS records at domain registrar
   - Estimated time: 15 minutes setup + 30-60 minutes propagation

### After Domain Works
2. **Update documentation** with seaready.co.uk
3. **Test all pages** on the new domain
4. **Delete archived folders** (after confirming everything works)

### Optional
5. Consider revoking the exposed GitHub token (if it's still active)
   - Go to: https://github.com/settings/tokens
   - Find token starting with `ghp_l1k9Zsos...`
   - Click "Delete"

---

## Summary

**Problem:** Multiple website copies causing confusion
**Solution:** Archived duplicates, kept one primary codebase
**Status:** ✅ Clean - Single source of truth established
**Action Required:** Configure seaready.co.uk domain (see guide)

---

All changes logged to:
- ACTION_REGISTER.md
- WORK_LOG.md
