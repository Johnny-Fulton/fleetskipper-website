const { chromium } = require('playwright');

console.log('\n🔓 Opening Supabase Projects Dashboard (Simple Version)...\n');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  console.log('📍 Navigating to Supabase Projects page...');
  console.log('   URL: https://supabase.com/dashboard/projects\n');

  await page.goto('https://supabase.com/dashboard/projects');

  await page.waitForTimeout(5000);

  console.log('✅ Browser is open!');
  console.log('\n📝 Manual steps:');
  console.log('   1. Log in if needed (you may need to complete MFA)');
  console.log('   2. Look for "FleetSkipper Website" project');
  console.log('   3. Click on it');
  console.log('   4. Go to Project Settings → API');
  console.log('   5. Copy:');
  console.log('      - Project URL');
  console.log('      - anon/public key');
  console.log('      - service_role key');
  console.log('   6. Send them to me\n');

  console.log('💡 Browser will stay open indefinitely...\n');

  // Keep browser open
  await new Promise(() => {});
})();
