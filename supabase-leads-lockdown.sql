-- Lock down PII tables that are readable by the public (anon) key — UK-GDPR fix.
--
-- WHY SAFE: the app writes to these tables with the SERVICE ROLE key, which
-- bypasses RLS entirely. Nothing uses the anon/browser key to read or write them
-- (verified: only src/app/api/collect-email/route.ts touches `leads`, server-side,
-- service-role; src/lib/services/db.ts's leads query is commented-out stub code).
--
-- DO NOT touch user_profiles or tool_results — those already have correct
-- per-user RLS (USING auth.uid() = id/user_id) and are relied on by sign-up.

-- 1) leads — email capture from the site's tools (EmailGate).
--    Remove the permissive policy; deny-by-default; revoke public grants.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads;
REVOKE ALL ON public.leads FROM anon, authenticated;

-- 2) client_submissions — legacy table with explicit anon read/insert policies
--    (supabase-setup.sql). Not referenced by any current code. Lock it down only
--    if it actually exists, so this script never errors on a missing table.
DO $$
BEGIN
  IF to_regclass('public.client_submissions') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.client_submissions ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow public form submissions" ON public.client_submissions';
    EXECUTE 'DROP POLICY IF EXISTS "Allow users to read submissions" ON public.client_submissions';
    EXECUTE 'REVOKE ALL ON public.client_submissions FROM anon, authenticated';
  END IF;
END $$;

-- 3) contact_submissions — contact form PII (name/email/phone/message). Its setup
--    file already locks it down, but re-assert here idempotently (belt-and-braces)
--    so we don't merely assume the earlier run applied. Written server-side with
--    the service role; safe.
DO $$
BEGIN
  IF to_regclass('public.contact_submissions') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY';
    EXECUTE 'REVOKE ALL ON public.contact_submissions FROM anon, authenticated';
  END IF;
END $$;
