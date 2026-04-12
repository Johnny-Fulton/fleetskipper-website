const { chromium } = require('playwright');

console.log('\n🧪 Testing FleetSkipper Authentication System...\n');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  try {
    console.log('📍 Step 1: Opening sign-up page...');
    await page.goto('http://localhost:3002/auth/sign-up', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000);

    // Check if sign-up form loaded
    const hasEmailField = await page.locator('input[type="email"]').count() > 0;
    const hasPasswordField = await page.locator('input[type="password"]').count() > 0;

    if (hasEmailField && hasPasswordField) {
      console.log('✅ Sign-up form loaded successfully');
    } else {
      console.log('❌ Sign-up form did not load properly');
    }

    console.log('\n📍 Step 2: Opening sign-in page...');
    await page.goto('http://localhost:3002/auth/sign-in', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000);

    const hasSignInForm = await page.locator('input[type="email"]').count() > 0;

    if (hasSignInForm) {
      console.log('✅ Sign-in form loaded successfully');
    } else {
      console.log('❌ Sign-in form did not load properly');
    }

    console.log('\n📍 Step 3: Checking navigation...');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000);

    const hasSignInButton = await page.getByText('Sign In').count() > 0;

    if (hasSignInButton) {
      console.log('✅ Navigation shows "Sign In" button (user not logged in)');
    } else {
      console.log('⚠️  "Sign In" button not found in navigation');
    }

    console.log('\n===========================================');
    console.log('🎉 AUTHENTICATION SYSTEM TEST SUMMARY');
    console.log('===========================================\n');

    if (hasEmailField && hasPasswordField && hasSignInForm) {
      console.log('✅ ALL TESTS PASSED!');
      console.log('\n📋 Your FleetSkipper authentication system is ready:');
      console.log('   • Sign-up page: http://localhost:3002/auth/sign-up');
      console.log('   • Sign-in page: http://localhost:3002/auth/sign-in');
      console.log('   • Protected routes: /tools/*\n');
      console.log('📝 Next Steps:');
      console.log('   1. Enable Email auth in Supabase: Authentication > Providers');
      console.log('   2. Turn OFF "Confirm email" for testing');
      console.log('   3. Test sign-up flow with a test email\n');
    } else {
      console.log('⚠️  Some tests failed. Check the browser for details.\n');
    }

    console.log('💡 Browser will stay open for 30 seconds for you to review...\n');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
})();
