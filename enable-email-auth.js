const { chromium } = require('playwright');

(async () => {
  console.log('\n🔐 Opening Supabase to Enable Email Authentication...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  console.log('📍 Navigating to Authentication settings...\n');
  await page.goto('https://supabase.com/dashboard/project/jabcqjgrzlizmwjrqapc/auth/providers');
  
  await page.waitForTimeout(5000);
  
  console.log('============================================');
  console.log('📋 MANUAL STEPS TO ENABLE EMAIL AUTH:');
  console.log('============================================\n');
  console.log('1. Log in if needed');
  console.log('2. Find "Email" provider in the list');
  console.log('3. Click to expand/enable it');
  console.log('4. TURN OFF "Confirm email" (for testing)');
  console.log('5. Click "Save"\n');
  console.log('============================================\n');
  console.log('💡 Browser will stay open for you to complete...\n');
  
  // Keep browser open
  await new Promise(() => {});
})();
