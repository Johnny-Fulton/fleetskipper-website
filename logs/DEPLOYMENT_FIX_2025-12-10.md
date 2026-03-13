# Vercel Deployment Fix - December 10, 2025

## Problem Identified
Vercel production builds were failing with the error:
```
Error occurred prerendering page "/sms-questionnaire"
Error: supabaseUrl is required.
```

## Root Cause
The SMS questionnaire pages (`/sms-questionnaire` and `/sms-questionnaire/success`) are **client components** but were being **statically generated** at build time. During static generation:
- Next.js tries to prerender the pages
- The Supabase client is instantiated at module import time
- Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are not available during build
- The Supabase `createClient()` function throws an error

Even though the previous fix (commit `2d85e08`) made Supabase optional by checking for env vars, the pages were still trying to be statically generated, causing the import-time error.

## Solution Applied
Added `export const dynamic = 'force-dynamic'` to both pages:
- `src/app/sms-questionnaire/page.tsx`
- `src/app/sms-questionnaire/success/page.tsx`

This tells Next.js to:
- **Skip static generation** for these pages
- **Render them server-side on demand** instead
- Only instantiate Supabase when actually needed (at runtime, not build time)

## Changes Made

### File 1: `/src/app/sms-questionnaire/page.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'

// Force dynamic rendering to avoid build-time Supabase initialization
export const dynamic = 'force-dynamic'
import { useForm } from 'react-hook-form'
// ... rest of imports
```

### File 2: `/src/app/sms-questionnaire/success/page.tsx`
```typescript
'use client'

import { useEffect, useState, Suspense } from 'react'

// Force dynamic rendering to avoid build-time Supabase initialization
export const dynamic = 'force-dynamic'
import { useSearchParams } from 'next/navigation'
// ... rest of imports
```

## Verification

### Local Build Test ✅
```bash
npm run build
```

**Result:**
- ✅ Build succeeded
- ✅ 22/22 pages generated
- ✅ No Supabase errors
- ✅ SMS questionnaire pages marked as dynamic (not static)

### Git Commit
```
Commit: 92698df
Message: Fix Vercel build: Force dynamic rendering for SMS questionnaire pages
```

### Deployment
- ✅ Committed: December 10, 2025
- ✅ Pushed to GitHub: main branch
- ⏳ Vercel deployment: Triggered automatically

## Expected Outcome

After Vercel deployment completes:
1. Build will succeed without Supabase env var errors
2. SMS questionnaire pages will work (rendered server-side)
3. All other pages continue to work normally
4. Site will be fully functional at seaready-website.vercel.app

## Technical Notes

**Why `force-dynamic` works:**
- Next.js App Router tries to statically generate pages by default
- Client components can still be statically generated if they don't depend on runtime data
- The `dynamic = 'force-dynamic'` export tells Next.js: "This page needs runtime data, don't prerender it"
- This prevents the Supabase client from being instantiated during build time

**Alternative solutions considered:**
1. ❌ Add Supabase env vars to Vercel - Would work but requires credentials
2. ❌ Lazy-load Supabase client - Complex refactor, not worth it
3. ✅ Force dynamic rendering - Simple, effective, minimal code change

## Files Modified
- `src/app/sms-questionnaire/page.tsx` - Added dynamic export
- `src/app/sms-questionnaire/success/page.tsx` - Added dynamic export

## Files Created
- `logs/DEPLOYMENT_FIX_2025-12-10.md` - This documentation

## Previous Related Work
- Commit `2d85e08` - Made Supabase env vars optional (partial fix)
- Commit `98a0740` - Navigation restructure work

## Status
- ✅ Code fixed and tested locally
- ✅ Changes committed and pushed
- ⏳ Awaiting Vercel automatic deployment
- 📋 Next: Verify deployment succeeded

---
**Last Updated:** 2025-12-10 (commit 92698df)
**Status:** Deployed to GitHub, waiting for Vercel
