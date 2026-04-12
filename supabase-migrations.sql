-- FleetSkipper Database Setup
-- Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj/sql/new

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
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
  last_login_at TIMESTAMP WITH TIME ZONE,
  onboarding_completed BOOLEAN DEFAULT false
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

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

-- ============================================
-- 2. AUTO-CREATE PROFILE ON SIGNUP
-- ============================================

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. TOOL RESULTS STORAGE
-- ============================================

CREATE TABLE IF NOT EXISTS public.tool_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  tool_type TEXT NOT NULL,  -- 'wbc3-checker' | 'crew-requirements'
  vessel_data JSONB,  -- Store full form submission
  results JSONB,  -- Store calculation results

  CONSTRAINT tool_type_check CHECK (tool_type IN ('wbc3-checker', 'crew-requirements'))
);

-- Enable RLS
ALTER TABLE public.tool_results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own results" ON public.tool_results;
DROP POLICY IF EXISTS "Users can insert own results" ON public.tool_results;
DROP POLICY IF EXISTS "Users can update own results" ON public.tool_results;
DROP POLICY IF EXISTS "Users can delete own results" ON public.tool_results;

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

CREATE POLICY "Users can delete own results"
  ON public.tool_results
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 4. INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_company_idx ON public.user_profiles(company_name);
CREATE INDEX IF NOT EXISTS user_profiles_lead_score_idx ON public.user_profiles(lead_score);
CREATE INDEX IF NOT EXISTS tool_results_user_id_idx ON public.tool_results(user_id);
CREATE INDEX IF NOT EXISTS tool_results_tool_type_idx ON public.tool_results(tool_type);
CREATE INDEX IF NOT EXISTS tool_results_created_at_idx ON public.tool_results(created_at DESC);

-- ============================================
-- DONE!
-- ============================================
-- Next steps:
-- 1. Go to Authentication > Providers in Supabase Dashboard
-- 2. Enable "Email" provider
-- 3. Turn OFF "Confirm email" for easier testing
-- 4. Save
