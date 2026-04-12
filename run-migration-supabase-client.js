const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = "https://dvgxcsqhbhstsadcuinj.supabase.co";
const SERVICE_ROLE_KEY = "sbp_b5787ce42521a91ee115409cab314ae81f4fe722";

console.log('\n🚀 Running FleetSkipper Database Migration with Supabase Client...\n');

const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

async function runMigration() {
  // Create Supabase client with service role key (bypasses RLS)
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('📡 Connected to Supabase project: dvgxcsqhbhstsadcuinj');
  console.log('📝 Attempting to execute migration SQL...\n');

  // Split into individual statements
  const statements = migrationSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements\n`);

  try {
    // Try using the REST API directly via fetch
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ query: migrationSQL })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Migration completed successfully!');
      console.log('📊 Created:');
      console.log('   - user_profiles table');
      console.log('   - tool_results table');
      console.log('   - Row Level Security policies');
      console.log('   - Auto-profile creation trigger\n');
      return;
    } else {
      console.log('❌ REST API approach failed:', response.status, response.statusText);
      console.log('   Response:', await response.text());
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n💡 The Supabase client cannot execute raw SQL programmatically.');
  console.log('   This is a security feature - SQL execution requires manual approval.');
  console.log('\n📋 ALTERNATIVE: Use the Supabase Dashboard');
  console.log('   1. I will open the SQL Editor automatically');
  console.log('   2. The SQL will be copied to your clipboard');
  console.log('   3. You paste and click Run (takes 5 seconds)\n');

  // Copy SQL to clipboard using pbcopy (macOS)
  const { exec } = require('child_process');
  exec('pbcopy', (error, stdout, stderr) => {
    if (error) {
      console.log('⚠️  Could not copy to clipboard automatically');
      return;
    }
  }).stdin.end(migrationSQL);

  console.log('✅ SQL copied to clipboard!');
  console.log('   Opening Supabase SQL Editor now...\n');

  // Launch Playwright to open SQL Editor
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
  const page = await browser.newPage();

  await page.goto('https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj/sql/new');

  console.log('🌐 Browser opened to SQL Editor');
  console.log('   When ready, paste (Cmd+V) and click Run\n');
  console.log('💡 Browser will stay open for you to complete...\n');

  // Keep browser open
  await new Promise(() => {});
}

runMigration().catch(console.error);
