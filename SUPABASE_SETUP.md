# Supabase Authentication Setup - FleetSkipper

## ✅ What's Been Set Up

### 1. Packages Installed
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Environment Variables (`.env.local`)
```bash
NEXT_PUBLIC_SUPABASE_URL="https://dvgxcsqhbhstsadcuinj.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhb..."  # Your existing key
```

### 3. Files Created

**✅ `/src/lib/supabase/client.ts`** - Browser-side Supabase client
**✅ `/src/lib/supabase/server.ts`** - Server-side Supabase client
**✅ `/src/middleware.ts`** - Auth middleware (protects `/tools` routes)

---

## 📝 Next Steps

### Step 1: Enable Email Auth in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. Configure email settings:
   - **Confirm email**: Optional (recommended OFF for testing)
   - **Secure email change**: ON (recommended)
   - **Email templates**: Customize welcome emails (optional)

### Step 2: Create Database Tables

Run this SQL in your Supabase SQL Editor:

```sql
-- User profiles table (extends auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact info
  full_name TEXT,
  company_name TEXT,
  email TEXT,  -- Synced from auth.users
  phone TEXT,

  -- Marketing data
  vessel_type TEXT,
  fleet_size TEXT,
  primary_interest TEXT,  -- 'wbc3-checker' | 'crew-requirements' | 'both'
  lead_score TEXT DEFAULT 'cold',  -- 'hot' | 'warm' | 'cold'

  -- Metadata
  signup_source TEXT,  -- Which tool they signed up from
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Tool results storage (optional - for saving WBC3/Crew checker results)
CREATE TABLE public.tool_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  tool_type TEXT NOT NULL,  -- 'wbc3-checker' | 'crew-requirements'
  vessel_data JSONB,  -- Store full form submission
  results JSONB,  -- Store calculation results

  CONSTRAINT tool_type_check CHECK (tool_type IN ('wbc3-checker', 'crew-requirements'))
);

-- Enable RLS
ALTER TABLE public.tool_results ENABLE ROW LEVEL SECURITY;

-- Policies for tool_results
CREATE POLICY "Users can view own results"
  ON public.tool_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON public.tool_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own results"
  ON public.tool_results
  FOR UPDATE
  USING (auth.uid() = user_id);
```

### Step 3: Create Auth Pages

You need to create sign-in and sign-up pages. I'll create these next.

**Planned pages:**
- `/auth/sign-in` - Login page
- `/auth/sign-up` - Registration page (with onboarding form)
- `/auth/callback` - OAuth callback handler
- `/auth/sign-out` - Logout action

### Step 4: Update Navigation

Add "Sign In" / "Account" buttons to your navigation bar.

### Step 5: Configure Redirect URLs

In Supabase Dashboard → Authentication → URL Configuration:

**Site URL**: `https://yourdomain.com`
**Redirect URLs**:
- `http://localhost:3002/auth/callback`
- `https://yourdomain.com/auth/callback`

---

##🎯 How It Works Now

### Protected Routes
Any URL starting with `/tools` now requires authentication:
- `/tools` → Redirects to `/auth/sign-in?redirect=/tools`
- `/tools/wbc3-checker` → Redirects to `/auth/sign-in?redirect=/tools/wbc3-checker`
- `/tools/crew-requirements` → Redirects to `/auth/sign-in?redirect=/tools/crew-requirements`

### Middleware
The `middleware.ts` file:
1. Checks if user is authenticated
2. If NOT authenticated + trying to access `/tools` → Redirect to sign-in
3. If authenticated → Allow access
4. Refreshes auth session automatically

---

## 🧪 Testing Plan

1. **Create auth pages** (next step)
2. **Test signup flow**:
   - Visit `/tools`
   - Get redirected to `/auth/sign-up`
   - Fill in onboarding form (name, company, vessel type)
   - Create account
   - Get redirected back to `/tools`
3. **Test login flow**:
   - Sign out
   - Visit `/tools` again
   - Sign in with existing credentials
   - Access tools
4. **Test protected routes**:
   - Try accessing `/tools/wbc3-checker` while logged out
   - Should redirect to sign-in

---

## 📊 Marketing Data Capture

When users sign up, capture:
- Full name
- Company name
- Email (from auth)
- Phone (optional)
- Vessel type
- Fleet size
- Primary interest (which tool)

This data goes into `user_profiles` table and can be:
- Exported to Mailchimp/HubSpot
- Used for lead scoring
- Trigger email automation sequences

---

## 🚀 What's Next?

**Immediate:**
1. Create auth pages (`/auth/sign-in`, `/auth/sign-up`)
2. Add "Sign In" button to nav bar
3. Test the flow end-to-end

**Later:**
4. Set up email automation (welcome series)
5. Integrate with CRM (Mailchimp/HubSpot)
6. Add user dashboard to view saved results
7. Implement "Save Results" feature for tools

---

## 📝 Commands Reference

```bash
# Start dev server
npm run dev

# Check TypeScript
npm run typecheck

# Run tests
npm run test

# Build for production
npm run build
```

---

## 🔗 Useful Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj
- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **Next.js + Supabase**: https://supabase.com/docs/guides/auth/server-side/nextjs

---

**Created**: 2025-01-27
**Status**: ✅ Infrastructure ready | ⏳ Auth pages pending
