-- Create the `leads` table so the tools' email-gate capture works.
-- Secure from the start: RLS on, deny-by-default, no anon/authenticated grants.
-- The collect-email API route writes here with the SERVICE ROLE key (bypasses RLS).

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  signup_source TEXT,               -- e.g. 'wbc3-checker', 'crew-checker'
  lead_score TEXT DEFAULT 'warm',
  vessel_type TEXT,
  fleet_size TEXT,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tool_uses_count INTEGER DEFAULT 1,
  converted_to_user BOOLEAN DEFAULT FALSE,
  user_id UUID
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.leads FROM anon, authenticated;

CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads(email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);
