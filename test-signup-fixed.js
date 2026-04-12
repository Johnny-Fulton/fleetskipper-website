const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing FleetSkipper Signup with FIXED Environment Variables\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });
  
  console.log('📍 Opening signup page at http://localhost:3002/auth/sign-up\n');
  await page.goto('http://localhost:3002/auth/sign-up', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('============================================');
  console.log('✅ SIGNUP PAGE LOADED WITH NEW CREDENTIALS');
  console.log('============================================\n');
  console.log('🎯 The "Failed to fetch" error should now be FIXED!\n');
  console.log('📝 TEST STEPS:');
  console.log('   1. Fill in Full Name: Test User');
  console.log('   2. Fill in Email: test@fleetskipper.com');
  console.log('   3. Fill in Password: TestPass123!');
  console.log('   4. Confirm Password: TestPass123!');
  console.log('   5. Click "Sign Up"\n');
  console.log('Expected result: You should be redirected to onboarding\n');
  console.log('💡 Browser will stay open for you to test...\n');
  
  // Keep browser open indefinitely
  await new Promise(() => {});
})();
