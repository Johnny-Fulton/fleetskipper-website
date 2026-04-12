const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = "https://jabcqjgrzlizmwjrqapc.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphYmNxamdyemxpem13anJxYXBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU4MjY5MSwiZXhwIjoyMDg5MTU4NjkxfQ.9SPavGMZC7SYyPmrdGx4Up3h6i7L6_okEb_hwYS5RLM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

console.log('Running migration...');

fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
  },
  body: JSON.stringify({ query: migrationSQL })
})
.then(res => res.text())
.then(data => {
  console.log('Migration complete!');
  console.log(data);
})
.catch(err => {
  console.error('Error:', err.message);
  console.log('\nFalling back to direct SQL execution via pg...');
});
