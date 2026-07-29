-- Make contact_submissions the single home for ALL form submissions.
-- Additive + idempotent: new columns are nullable/defaulted, so the existing
-- contact form keeps working (its rows default to form_type = 'contact').
-- RLS on this table is already deny-by-default (locked to the service role).

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS form_type TEXT NOT NULL DEFAULT 'contact';

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS company TEXT;

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS details JSONB;

CREATE INDEX IF NOT EXISTS contact_submissions_form_type_idx
  ON public.contact_submissions(form_type);
