const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 Opening your FleetSkipper Supabase Project...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ 
    viewport: null
  });
  
  const page = await context.newPage();
  
  console.log('📍 Direct URL to your FleetSkipper project:');
  console.log('   https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj\n');
  
  await page.goto('https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj');
  
  console.log('⏳ Waiting for page to load (you may need to login)...\n');
  await page.waitForTimeout(5000);
  
  const url = page.url();
  
  if (url.includes('/sign-in') || url.includes('/login')) {
    console.log('🔐 You need to log in to Supabase first');
    console.log('   After logging in, you\'ll be redirected to your FleetSkipper project\n');
    console.log('   Once you\'re in, go to SQL Editor and run the migration from:');
    console.log('   supabase-migrations.sql\n');
  } else if (url.includes('dvgxcsqhbhstsadcuinj')) {
    console.log('✅ PROJECT FOUND! You should see your FleetSkipper project now.\n');
    console.log('   Next step: Go to SQL Editor and run the database migration\n');
  }
  
  console.log('💡 Browser will stay open for you to access your project...\n');
  
  // Keep browser open indefinitely
  await new Promise(() => {});
})();
