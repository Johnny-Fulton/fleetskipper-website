const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing if Environment Variables Reach Browser\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3002/auth/sign-up');
  await page.waitForTimeout(2000);
  
  // Check if env vars are defined in the browser
  const envCheck = await page.evaluate(() => {
    return {
      hasSupabaseUrl: typeof process !== 'undefined' && process.env && !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: typeof process !== 'undefined' && process.env && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      url: typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'NOT FOUND',
      key: typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'EXISTS' : 'NOT FOUND'
    };
  });
  
  console.log('\n===== ENVIRONMENT VARIABLE CHECK =====');
  console.log('Has NEXT_PUBLIC_SUPABASE_URL:', envCheck.hasSupabaseUrl);
  console.log('Has NEXT_PUBLIC_SUPABASE_ANON_KEY:', envCheck.hasAnonKey);
  console.log('URL value:', envCheck.url);
  console.log('Key status:', envCheck.key);
  console.log('========================================\n');
  
  if (!envCheck.hasSupabaseUrl || !envCheck.hasAnonKey) {
    console.log('❌ PROBLEM: Environment variables are NOT reaching the browser!');
    console.log('This is why you're getting "Failed to fetch".\n');
    console.log('The Next.js dev server needs to be fully restarted.\n');
  } else {
    console.log('✅ Environment variables ARE reaching the browser.');
    console.log('The problem must be something else.\n');
  }
  
  await page.waitForTimeout(5000);
  await browser.close();
})();
