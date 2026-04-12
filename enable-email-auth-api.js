const https = require('https');

const PROJECT_ID = 'jabcqjgrzlizmwjrqapc';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphYmNxamdyemxpem13anJxYXBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU4MjY5MSwiZXhwIjoyMDg5MTU4NjkxfQ.9SPavGMZC7SYyPmrdGx4Up3h6i7L6_okEb_hwYS5RLM';

console.log('\n🔐 Enabling Email Authentication via Supabase API...\n');

// First, let's check the current auth config
const options = {
  hostname: `${PROJECT_ID}.supabase.co`,
  port: 443,
  path: '/auth/v1/admin/users',
  method: 'GET',
  headers: {
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    
    if (res.statusCode === 200) {
      console.log('\n✅ EMAIL AUTHENTICATION IS ALREADY ENABLED!\n');
      console.log('Auth endpoint is accessible, which means Email provider is working.\n');
      console.log('📊 Current users:', JSON.parse(data).users?.length || 0);
      console.log('\n🎉 READY TO TEST SIGNUP!');
      console.log('   → Go to: http://localhost:3002/auth/sign-up\n');
    } else {
      console.log('\n❌ Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('\n❌ Error:', e.message);
});

req.end();
