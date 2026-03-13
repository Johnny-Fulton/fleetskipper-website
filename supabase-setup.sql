-- SMS Questionnaire Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create the client_submissions table
CREATE TABLE IF NOT EXISTS client_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),

  -- All form data stored as JSONB
  form_data JSONB NOT NULL,

  -- Optional file uploads
  uploaded_files JSONB DEFAULT '[]'::jsonb,

  -- Processing metadata
  processed_at TIMESTAMPTZ,
  google_drive_link TEXT,

  -- Validation
  CONSTRAINT valid_form_data CHECK (jsonb_typeof(form_data) = 'object')
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_submissions_status ON client_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON client_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE client_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (anyone can submit the form)
CREATE POLICY "Allow public form submissions"
  ON client_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read their own submissions
CREATE POLICY "Allow users to read submissions"
  ON client_submissions
  FOR SELECT
  TO anon
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_submissions_updated_at
  BEFORE UPDATE ON client_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE client_submissions IS 'Stores SMS questionnaire form submissions from clients';
