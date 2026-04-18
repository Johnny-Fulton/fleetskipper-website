-- Add LEADS table for anonymous email collection from tools
-- Run this in your Supabase SQL Editor after the main migration

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact info
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,

  -- Marketing data
  signup_source TEXT,  -- 'wbc3-checker' | 'crew-checker' | 'fv-crew-checker' | 'blog' | 'contact'
  lead_score TEXT DEFAULT 'warm',  -- 'hot' | 'warm' | 'cold'
  vessel_type TEXT,
  fleet_size TEXT,

  -- Engagement tracking
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tool_uses_count INTEGER DEFAULT 1,
  converted_to_user BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL  -- Link if they sign up later
);

-- Enable RLS (but allow inserts from API)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow API to insert leads (service role key)
CREATE POLICY "Service role can manage leads"
  ON public.leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads(email);
CREATE INDEX IF NOT EXISTS leads_signup_source_idx ON public.leads(signup_source);
CREATE INDEX IF NOT EXISTS leads_lead_score_idx ON public.leads(lead_score);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);

-- Function to update last_activity_at
CREATE OR REPLACE FUNCTION update_lead_activity()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_activity_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update activity timestamp
DROP TRIGGER IF EXISTS leads_activity_update ON public.leads;
CREATE TRIGGER leads_activity_update
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_activity();

-- Done! Now leads can be collected without requiring auth.users
