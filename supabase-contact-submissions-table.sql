-- Contact submissions table — captures every FleetSkipper contact form submission
-- Run this in your Supabase SQL Editor before deploying the updated contact route.

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Submission fields (mirrors the contact form)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  vessel_type TEXT,
  services_needed TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL  -- ISO string sent by the client
);

-- Enable RLS (deny-by-default: with RLS on and no policy, anon/authenticated
-- get nothing; the service role still bypasses RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- The route writes with the SERVICE ROLE key, which bypasses RLS entirely,
-- so NO permissive policy is needed. Deny-by-default keeps the public anon
-- key (shipped to the browser) from reading/writing these personal details.
REVOKE ALL ON public.contact_submissions FROM anon, authenticated;

-- Indexes for common access patterns
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON public.contact_submissions(created_at DESC);

-- Done! The contact route will now insert a row here for every valid submission.
