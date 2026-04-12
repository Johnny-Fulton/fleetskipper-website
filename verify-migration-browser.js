const { chromium } = require('playwright');

// GitHub credentials
const GITHUB_EMAIL = 'johnny.fulton@gmail.com';
const GITHUB_PASSWORD = 'AnnieGithub00';

console.log('\n🔍 Verifying Migration in Supabase Dashboard...\n');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  try {
    // Step 1: Go to Table Editor
    console.log('📍 Opening Supabase Table Editor...');
    await page.goto('https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj/editor');

    await page.waitForTimeout(5000);

    // Check if we need to login
    const currentUrl = page.url();
    if (currentUrl.includes('/sign-in') || currentUrl.includes('/login')) {
      console.log('🔐 Logging in with GitHub...');

      const githubButton = page.locator('button:has-text("GitHub"), a:has-text("GitHub"), button:has-text("Continue with GitHub")').first();
      await githubButton.click();

      await page.waitForTimeout(3000);

      const emailField = page.locator('input[name="login"]');
      await emailField.fill(GITHUB_EMAIL);

      const passwordField = page.locator('input[name="password"]');
      await passwordField.fill(GITHUB_PASSWORD);

      const signInButton = page.locator('input[type="submit"][value="Sign in"], button[type="submit"]:has-text("Sign in")').first();
      await signInButton.click();

      await page.waitForTimeout(5000);

      // Wait for redirect back to Table Editor
      await page.waitForURL('**/editor**', { timeout: 60000 });

      console.log('✅ Login successful!\n');
      await page.waitForTimeout(5000);
    }

    // Step 2: Check for tables
    console.log('🔍 Checking for migration tables...\n');

    const pageText = await page.textContent('body');

    const has_user_profiles = pageText.includes('user_profiles');
    const has_tool_results = pageText.includes('tool_results');

    console.log('===========================================');
    console.log('📊 VERIFICATION RESULTS');
    console.log('===========================================\n');

    if (has_user_profiles) {
      console.log('✅ user_profiles table FOUND');
    } else {
      console.log('❌ user_profiles table NOT FOUND');
    }

    if (has_tool_results) {
      console.log('✅ tool_results table FOUND');
    } else {
      console.log('❌ tool_results table NOT FOUND');
    }

    console.log('\n===========================================\n');

    if (has_user_profiles && has_tool_results) {
      console.log('🎉 MIGRATION VERIFIED SUCCESSFULLY!\n');
      console.log('Your FleetSkipper authentication system is ready!');
      console.log('\n📋 Next Steps:');
      console.log('   1. Enable Email authentication in Supabase Dashboard');
      console.log('   2. Navigate to: Authentication → Providers');
      console.log('   3. Enable "Email" provider');
      console.log('   4. Turn OFF "Confirm email" for testing');
      console.log('   5. Save configuration');
      console.log('   6. Test sign-up at http://localhost:3002/auth/sign-up\n');
    } else {
      console.log('⚠️  MIGRATION MAY BE INCOMPLETE\n');
      console.log('The browser is open at the Table Editor.');
      console.log('Please manually check if the tables exist.\n');
    }

    console.log('💡 Browser will stay open for 60 seconds for you to verify...\n');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await browser.close();
    console.log('\n✅ Verification complete.\n');
  }
})();
