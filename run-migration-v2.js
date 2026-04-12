const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://dvgxcsqhbhstsadcuinj.supabase.co";
const SERVICE_ROLE_KEY = "sbp_b5787ce42521a91ee115409cab314ae81f4fe722";

// Read the migration SQL file
const fs = require('fs');
const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

console.log('\n🚀 Running FleetSkipper Database Migration...\n');

async function runMigration() {
  // Create Supabase client with service role key (bypasses RLS)
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  console.log('📡 Connected to Supabase project: dvgxcsqhbhstsadcuinj');
  console.log('📝 Executing migration SQL...\n');

  try {
    // Execute the migration using raw SQL via RPC
    const { data, error } = await supabase.rpc('exec', {
      sql: migrationSQL
    });

    if (error) {
      console.error('❌ Migration failed:', error.message);
      console.log('\n💡 The Supabase client can\'t execute arbitrary SQL via RPC.');
      console.log('   You need to run the migration manually in the Supabase Dashboard.\n');
      console.log('📋 MANUAL STEPS:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj');
      console.log('   2. Click "SQL Editor" in left sidebar');
      console.log('   3. Click "New query"');
      console.log('   4. Copy/paste contents of supabase-migrations.sql');
      console.log('   5. Click "Run"\n');
      process.exit(1);
    }

    console.log('✅ Migration completed successfully!');
    console.log('📊 Created:');
    console.log('   - user_profiles table');
    console.log('   - tool_results table');
    console.log('   - Row Level Security policies');
    console.log('   - Auto-profile creation trigger\n');

    // Verify tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (tablesError) {
      console.warn('⚠️  Warning: Could not verify tables:', tablesError.message);
    } else {
      console.log('✅ Verification: user_profiles table is accessible\n');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\n💡 This error means we can\'t run SQL programmatically.');
    console.log('   Please run the migration manually in Supabase Dashboard.\n');
    process.exit(1);
  }
}

runMigration();
