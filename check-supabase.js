const fetch = require('node-fetch');

const SUPABASE_URL = "https://dvgxcsqhbhstsadcuinj.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Z3hjc3FoYmhzdHNhZGN1aW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NzAyMDEsImV4cCI6MjA4MDQ0NjIwMX0.cOGfdefZZ0rAN2esC2TYdle7-HsK0GeBMS9ubBX2Sk4";

async function checkSupabase() {
  console.log('\n🔍 Checking if Supabase project exists...\n');
  console.log('Project URL:', SUPABASE_URL);
  console.log('Project Ref:', 'dvgxcsqhbhstsadcuinj');
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      }
    });
    
    console.log('\n✅ Project Status:', response.status);
    
    if (response.status === 200) {
      console.log('✅ Project EXISTS and is accessible!');
      console.log('\n📍 Dashboard URL:');
      console.log('   https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj');
    } else if (response.status === 404) {
      console.log('❌ Project NOT FOUND - may need to be created');
    } else {
      console.log('⚠️  Unexpected status:', response.statusText);
    }
  } catch (error) {
    console.log('❌ Error connecting:', error.message);
  }
}

checkSupabase();
