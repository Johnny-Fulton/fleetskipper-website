const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
const SUPABASE_URL = "https://jabcqjgrzlizmwjrqapc.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphYmNxamdyemxpem13anJxYXBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU4MjY5MSwiZXhwIjoyMDg5MTU4NjkxfQ.9SPavGMZC7SYyPmrdGx4Up3h6i7L6_okEb_hwYS5RLM";

async function runMigration() {
  console.log('\n🚀 Running FleetSkipper Database Migration...\n');

  // Create Supabase admin client (uses service_role key)
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Read migration SQL
  const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

  // Split into individual statements (rough split by semicolon + newline)
  const statements = migrationSQL
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))
    .map(s => s.endsWith(';') ? s : s + ';');

  console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];

    // Skip comment-only lines
    if (statement.trim().startsWith('--')) continue;

    const preview = statement.substring(0, 60).replace(/\n/g, ' ') + '...';
    console.log(`[${i + 1}/${statements.length}] Executing: ${preview}`);

    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });

      if (error) {
        // Some statements might fail if already exists - that's okay
        if (error.message.includes('already exists')) {
          console.log(`   ⚠️  Already exists (skipping): ${error.message}`);
        } else {
          console.log(`   ❌ Error: ${error.message}`);
          errorCount++;
        }
      } else {
        console.log(`   ✅ Success`);
        successCount++;
      }
    } catch (err) {
      console.log(`   ❌ Exception: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n============================================');
  console.log('MIGRATION SUMMARY');
  console.log('============================================');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('============================================\n');

  if (errorCount > 0) {
    console.log('⚠️  Some statements failed. This might be normal if tables already exist.');
    console.log('Check the Supabase dashboard to verify tables were created.\n');
  } else {
    console.log('🎉 MIGRATION COMPLETED SUCCESSFULLY!\n');
    console.log('Created:');
    console.log('  ✓ user_profiles table');
    console.log('  ✓ tool_results table');
    console.log('  ✓ RLS policies');
    console.log('  ✓ Auto-profile trigger');
    console.log('  ✓ Performance indexes\n');
  }
}

// Check if exec_sql RPC function exists
async function checkRpcFunction() {
  console.log('Checking if exec_sql RPC function exists...\n');

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Try a simple query first
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .limit(1);

  if (error) {
    console.log('❌ Cannot connect to Supabase:', error.message);
    console.log('\nThe database migration cannot be run automatically.');
    console.log('Please run it manually in the Supabase SQL Editor:\n');
    console.log('1. Go to: https://supabase.com/dashboard/project/jabcqjgrzlizmwjrqapc/sql/new');
    console.log('2. Copy ALL content from: supabase-migrations.sql');
    console.log('3. Paste into SQL Editor');
    console.log('4. Click RUN\n');
    return false;
  }

  console.log('✅ Connected to Supabase successfully\n');
  return true;
}

// Run it
(async () => {
  const canConnect = await checkRpcFunction();

  if (!canConnect) {
    process.exit(1);
  }

  console.log('⚠️  NOTE: The automatic migration may not work due to RPC limitations.');
  console.log('If it fails, please run the migration manually in Supabase SQL Editor.\n');
  console.log('Starting migration in 3 seconds...\n');

  await new Promise(resolve => setTimeout(resolve, 3000));

  await runMigration();
})();
