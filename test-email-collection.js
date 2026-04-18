// Test script for email collection system
// Run: node test-email-collection.js

const testEmailCollection = async () => {
  console.log('\n🧪 Testing Email Collection System\n')
  console.log('='+ '='.repeat(60))

  // Test 1: API endpoint exists
  console.log('\n1️⃣  Testing API endpoint...')
  try {
    const response = await fetch('http://localhost:3002/api/collect-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test+${Date.now()}@fleetskipper.com`,
        source: 'test-script'
      })
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ API endpoint working')
      console.log('   Response:', data.message)
    } else {
      console.log('❌ API error:', data.error)
    }
  } catch (error) {
    console.log('❌ Failed to connect to API')
    console.log('   Make sure dev server is running: npm run dev')
    console.log('   Error:', error.message)
  }

  // Test 2: Invalid email handling
  console.log('\n2️⃣  Testing email validation...')
  try {
    const response = await fetch('http://localhost:3002/api/collect-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        source: 'test-script'
      })
    })

    const data = await response.json()

    if (!response.ok && data.error) {
      console.log('✅ Email validation working')
      console.log('   Correctly rejected:', data.error)
    } else {
      console.log('❌ Validation not working properly')
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message)
  }

  // Test 3: Duplicate email handling
  console.log('\n3️⃣  Testing duplicate email handling...')
  const testEmail = `duplicate+${Date.now()}@fleetskipper.com`

  try {
    // First submission
    const response1 = await fetch('http://localhost:3002/api/collect-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        source: 'test-script'
      })
    })

    const data1 = await response1.json()
    console.log('   First submission:', data1.message)

    // Second submission (duplicate)
    const response2 = await fetch('http://localhost:3002/api/collect-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        source: 'test-script'
      })
    })

    const data2 = await response2.json()

    if (data2.existing) {
      console.log('✅ Duplicate detection working')
      console.log('   Response:', data2.message)
    } else {
      console.log('⚠️  Duplicate not detected (might need Supabase table)')
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message)
  }

  console.log('\n' + '='.repeat(62))
  console.log('\n📋 Next Steps:\n')
  console.log('1. Run the SQL migration in Supabase:')
  console.log('   File: supabase-leads-table.sql')
  console.log('   Dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT/sql\n')
  console.log('2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local')
  console.log('   (Find it in Supabase > Settings > API)\n')
  console.log('3. Test the WBC3 Checker email gate:')
  console.log('   http://localhost:3002/tools/wbc3-checker\n')
  console.log('4. Check Supabase for collected leads:')
  console.log('   Table: public.leads\n')
}

testEmailCollection().catch(console.error)
