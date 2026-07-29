-- Lock down PII tables that could be readable by the public (anon) key — UK-GDPR.
-- Every block is guarded by to_regclass so the script NEVER errors on a table that
-- doesn't exist (e.g. `leads` and `client_submissions` may not be present).
--
-- WHY SAFE: all writes to these tables are server-side via the SERVICE ROLE key,
-- which bypasses RLS. Nothing uses the anon/browser key to read them. Does NOT
-- touch user_profiles / tool_results (correct per-user RLS, relied on by auth).

DO $$
BEGIN
  -- leads (tool email capture) — lock down only if it exists
  IF to_regclass('public.leads') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads';
    EXECUTE 'REVOKE ALL ON public.leads FROM anon, authenticated';
  END IF;

  -- client_submissions (legacy table) — lock down only if it exists
  IF to_regclass('public.client_submissions') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.client_submissions ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Allow public form submissions" ON public.client_submissions';
    EXECUTE 'DROP POLICY IF EXISTS "Allow users to read submissions" ON public.client_submissions';
    EXECUTE 'REVOKE ALL ON public.client_submissions FROM anon, authenticated';
  END IF;

  -- contact_submissions — re-assert lockdown (belt-and-braces)
  IF to_regclass('public.contact_submissions') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY';
    EXECUTE 'REVOKE ALL ON public.contact_submissions FROM anon, authenticated';
  END IF;
END $$;
