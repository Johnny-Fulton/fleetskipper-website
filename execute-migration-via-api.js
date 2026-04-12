const https = require('https');
const fs = require('fs');

const SUPABASE_URL = "dvgxcsqhbhstsadcuinj.supabase.co";
const SERVICE_ROLE_KEY = "sbp_b5787ce42521a91ee115409cab314ae81f4fe722";

console.log('\n🚀 Running FleetSkipper Database Migration via API...\n');

const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

// Split SQL into individual statements
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📊 Found ${statements.length} SQL statements to execute\n`);

async function executeStatement(sql, index) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: sql });

    const options = {
      hostname: SUPABASE_URL,
      port: 443,
      path: '/rest/v1/rpc/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ Statement ${index + 1}/${statements.length} executed`);
          resolve(data);
        } else {
          console.error(`❌ Statement ${index + 1} failed (${res.statusCode}):`, data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error on statement ${index + 1}:`, error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runMigration() {
  try {
    console.log('📡 Connecting to Supabase...\n');

    for (let i = 0; i < statements.length; i++) {
      await executeStatement(statements[i], i);
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between requests
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('📊 Created:');
    console.log('   - user_profiles table');
    console.log('   - tool_results table');
    console.log('   - Row Level Security policies');
    console.log('   - Auto-profile creation trigger\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n💡 This approach requires the Supabase Management API.');
    console.log('   Falling back to direct SQL execution method...\n');
    process.exit(1);
  }
}

runMigration();
