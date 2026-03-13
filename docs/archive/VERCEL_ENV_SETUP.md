# Vercel Environment Variables Setup

## ⚠️ CRITICAL: Missing Environment Variables May Be Blocking Deployments

Your local build succeeds because `.env.local` has these variables set. But if they're not in Vercel, deployments will fail silently or serve broken builds.

## Required Environment Variables for Vercel

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://dvgxcsqhbhstsadcuinj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Z3hjc3FoYmhzdHNhZGN1aW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NzAyMDEsImV4cCI6MjA4MDQ0NjIwMX0.cOGfdefZZ0rAN2esC2TYdle7-HsK0GeBMS9ubBX2Sk4
```

## How to Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Click: `seaready-website` project
3. Click: **Settings** tab
4. Click: **Environment Variables** (left sidebar)
5. Add each variable:
   - **Name:** NEXT_PUBLIC_SUPABASE_URL
   - **Value:** https://dvgxcsqhbhstsadcuinj.supabase.co
   - **Environments:** Check all (Production, Preview, Development)
   - Click **Save**

6. Repeat for:
   - **Name:** NEXT_PUBLIC_SUPABASE_ANON_KEY
   - **Value:** (full key above)
   - **Environments:** Check all
   - Click **Save**

## After Adding Environment Variables

**IMPORTANT:** You MUST redeploy for the environment variables to take effect!

1. Go to: **Deployments** tab
2. Click: ⋯ (three dots) next to latest deployment
3. Click: **Redeploy**
4. **Uncheck:** "Use existing Build Cache"
5. Click: **Redeploy**

---

**Created:** 2025-12-10 00:35 GMT
**Priority:** CRITICAL - Required for successful deployments
