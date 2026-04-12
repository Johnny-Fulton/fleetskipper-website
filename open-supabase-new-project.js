const { chromium } = require('playwright');

(async () => {
  console.log('\n🚀 Opening Supabase to create NEW FleetSkipper Website project...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  console.log('📍 Opening Supabase Projects Dashboard...');
  await page.goto('https://supabase.com/dashboard/projects');
  
  await page.waitForTimeout(8000);
  
  const url = page.url();
  
  if (url.includes('/sign-in-mfa')) {
    console.log('\n🔐 MFA REQUIRED');
    console.log('============================================');
    console.log('You have Multi-Factor Authentication enabled.');
    console.log('Please complete the MFA challenge in the browser.');
    console.log('After MFA, you\'ll see the projects page.');
    console.log('============================================\n');
  } else if (url.includes('/sign-in') || url.includes('/login')) {
    console.log('\n🔐 LOGIN REQUIRED');
    console.log('============================================');
    console.log('Please log in with GitHub.');
    console.log('After login, you\'ll see the projects page.');
    console.log('============================================\n');
  } else if (url.includes('/projects')) {
    console.log('\n✅ PROJECTS PAGE LOADED');
    console.log('============================================');
  }
  
  console.log('\n📝 MANUAL STEPS TO CREATE PROJECT:');
  console.log('============================================');
  console.log('1. Click "New project" button');
  console.log('2. Fill in:');
  console.log('   - Name: FleetSkipper Website');
  console.log('   - Database Password: FleetSkipper2025!WebAuth#Secure');
  console.log('   - Region: Europe (London) or closest UK');
  console.log('3. Click "Create new project"');
  console.log('4. Wait 1-2 minutes for creation');
  console.log('5. Go to Project Settings → API');
  console.log('6. Copy:');
  console.log('   - Project URL');
  console.log('   - anon/public key');
  console.log('   - service_role key');
  console.log('============================================\n');
  console.log('💡 Browser will stay open for you to complete...\n');
  console.log('📄 Full instructions saved to: create-project-manually.md\n');
  
  // Keep browser open indefinitely
  await new Promise(() => {});
})();
