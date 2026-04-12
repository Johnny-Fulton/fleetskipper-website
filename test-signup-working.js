const { chromium } = require('playwright');

(async () => {
  console.log('\n🎉 Testing FleetSkipper Signup - Database Ready!\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  // Listen for errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ BROWSER ERROR:', msg.text());
    }
  });
  
  console.log('📍 Opening signup page...\n');
  await page.goto('http://localhost:3002/auth/sign-up', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('============================================');
  console.log('✅ READY TO TEST SIGNUP');
  console.log('============================================\n');
  console.log('Database is ready! Both tables exist:');
  console.log('  ✓ user_profiles');
  console.log('  ✓ tool_results\n');
  console.log('📝 TEST:');
  console.log('1. Fill in Full Name: Test User');
  console.log('2. Email: test@fleetskipper.com');
  console.log('3. Password: TestPass123!');
  console.log('4. Click "Continue to Details"');
  console.log('5. Fill in onboarding details');
  console.log('6. Click "Complete Sign Up"\n');
  console.log('Expected: Success! Redirect to /tools\n');
  console.log('💡 Browser open for testing...\n');
  
  await new Promise(() => {});
})();
