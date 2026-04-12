const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Opening FleetSkipper Signup Page for Testing...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  console.log('📍 Navigating to signup page...\n');
  await page.goto('http://localhost:3002/auth/sign-up', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('============================================');
  console.log('✅ SIGNUP PAGE LOADED!');
  console.log('============================================\n');
  console.log('📝 TEST THE SIGNUP FLOW:');
  console.log('1. Enter your email: test@example.com');
  console.log('2. Enter a password: TestPassword123!');
  console.log('3. Click "Sign Up"');
  console.log('4. Check if you get redirected\n');
  console.log('💡 Browser will stay open for testing...\n');
  
  // Keep browser open
  await new Promise(() => {});
})();
