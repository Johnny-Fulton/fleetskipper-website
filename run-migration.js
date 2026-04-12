const https = require('https');

const SUPABASE_URL = "https://dvgxcsqhbhstsadcuinj.supabase.co";
const SERVICE_ROLE_KEY = "sbp_b5787ce42521a91ee115409cab314ae81f4fe722";

const migrationSQL = `
-- FleetSkipper Database Setup

-- 1. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  vessel_type TEXT,
  fleet_size TEXT,
  primary_interest TEXT,
  lead_score TEXT DEFAULT 'cold',
  signup_source TEXT,
  last_login_at TIMESTAMP WITH TIME ZONE,
  onboarding_completed BOOLEAN DEFAULT false
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. AUTO-CREATE PROFILE TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, created_at)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. TOOL RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.tool_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tool_type TEXT NOT NULL,
  vessel_data JSONB,
  results JSONB,
  CONSTRAINT tool_type_check CHECK (tool_type IN ('wbc3-checker', 'crew-requirements'))
);

ALTER TABLE public.tool_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own results" ON public.tool_results;
DROP POLICY IF EXISTS "Users can insert own results" ON public.tool_results;
DROP POLICY IF EXISTS "Users can update own results" ON public.tool_results;
DROP POLICY IF EXISTS "Users can delete own results" ON public.tool_results;

CREATE POLICY "Users can view own results" ON public.tool_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON public.tool_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own results" ON public.tool_results FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own results" ON public.tool_results FOR DELETE USING (auth.uid() = user_id);

-- 4. INDEXES
CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_company_idx ON public.user_profiles(company_name);
CREATE INDEX IF NOT EXISTS user_profiles_lead_score_idx ON public.user_profiles(lead_score);
CREATE INDEX IF NOT EXISTS tool_results_user_id_idx ON public.tool_results(user_id);
CREATE INDEX IF NOT EXISTS tool_results_tool_type_idx ON public.tool_results(tool_type);
CREATE INDEX IF NOT EXISTS tool_results_created_at_idx ON public.tool_results(created_at DESC);
`;

const data = JSON.stringify({ query: migrationSQL });

const options = {
  hostname: 'dvgxcsqhbhstsadcuinj.supabase.co',
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': data.length
  }
};

console.log('\n🚀 Running FleetSkipper Database Migration...\n');

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('\n✅ MIGRATION SUCCESSFUL!\n');
      console.log('Created:');
      console.log('  ✓ user_profiles table');
      console.log('  ✓ tool_results table');
      console.log('  ✓ RLS policies');
      console.log('  ✓ Auto-profile trigger');
      console.log('  ✓ Performance indexes\n');
    } else {
      console.log('\n❌ Migration failed');
      console.log('Response:', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('\n❌ Error:', e.message);
});

req.write(data);
req.end();
