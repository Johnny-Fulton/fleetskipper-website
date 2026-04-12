const { chromium } = require('playwright');

// GitHub credentials for login
const GITHUB_EMAIL = 'johnny.fulton@gmail.com';
const GITHUB_PASSWORD = 'AnnieGithub00';

console.log('\n🔑 Extracting Supabase Credentials for FleetSkipper Website...\n');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  try {
    // Step 1: Navigate to Supabase Projects Dashboard
    console.log('📍 Step 1: Opening Supabase Dashboard...');
    await page.goto('https://supabase.com/dashboard/projects');
    await page.waitForTimeout(5000);

    // Check if we need to login
    const currentUrl = page.url();
    if (currentUrl.includes('/sign-in') || currentUrl.includes('/login')) {
      console.log('🔐 Step 2: Logging in with GitHub...');

      const githubButton = page.locator('button:has-text("GitHub"), a:has-text("GitHub"), button:has-text("Continue with GitHub")').first();
      await githubButton.click();
      await page.waitForTimeout(3000);

      // GitHub login
      console.log('   Entering GitHub credentials...');
      const emailField = page.locator('input[name="login"]');
      await emailField.fill(GITHUB_EMAIL);

      const passwordField = page.locator('input[name="password"]');
      await passwordField.fill(GITHUB_PASSWORD);

      const signInButton = page.locator('input[type="submit"][value="Sign in"], button[type="submit"]:has-text("Sign in")').first();
      await signInButton.click();
      await page.waitForTimeout(5000);

      // Handle MFA if needed
      const mfaUrl = page.url();
      if (mfaUrl.includes('/sign-in-mfa')) {
        console.log('🔐 MFA detected - please complete in the browser...');
        await page.waitForURL('**/projects**', { timeout: 120000 });
        console.log('✅ MFA completed!\n');
      } else {
        // Wait for redirect to projects page
        await page.waitForURL('**/projects**', { timeout: 60000 });
        console.log('✅ Login successful!\n');
      }

      await page.waitForTimeout(3000);
    } else {
      console.log('✅ Already logged in!\n');
    }

    // Step 2: Find FleetSkipper Website project
    console.log('📍 Step 2: Looking for "FleetSkipper Website" project...');
    await page.waitForTimeout(2000);

    // Get page content to find the project
    const pageContent = await page.content();

    // Try to find the FleetSkipper Website project link
    const projectLink = page.locator('a:has-text("FleetSkipper Website")').first();

    try {
      await projectLink.click({ timeout: 5000 });
      console.log('✅ Found and opened FleetSkipper Website project!\n');
    } catch (e) {
      console.log('⚠️  Could not find "FleetSkipper Website" project automatically.');
      console.log('   Please click on it manually in the browser...\n');
      await page.waitForTimeout(30000);
    }

    await page.waitForTimeout(3000);

    // Step 3: Extract project ID from URL
    const projectUrl = page.url();
    const projectIdMatch = projectUrl.match(/project\/([a-z0-9-]+)/);
    const projectId = projectIdMatch ? projectIdMatch[1] : null;

    if (!projectId) {
      console.log('❌ Could not extract project ID from URL');
      console.log('   Current URL:', projectUrl);
      console.log('   Please navigate to Project Settings → API manually\n');
      await new Promise(() => {});
      return;
    }

    console.log(`📋 Project ID: ${projectId}\n`);

    // Step 4: Navigate to API Settings
    console.log('📍 Step 3: Navigating to API Settings...');
    await page.goto(`https://supabase.com/dashboard/project/${projectId}/settings/api`);
    await page.waitForTimeout(5000);

    // Step 5: Extract credentials
    console.log('🔍 Step 4: Extracting credentials...\n');

    // Try to find the Project URL
    const projectUrlText = await page.textContent('body');
    const urlMatch = projectUrlText.match(/https:\/\/([a-z0-9-]+)\.supabase\.co/);
    const supabaseUrl = urlMatch ? urlMatch[0] : `https://${projectId}.supabase.co`;

    // Try to extract anon key
    let anonKey = null;
    try {
      // Look for the anon key section
      const anonKeyElement = page.locator('code:has-text("eyJ")').first();
      anonKey = await anonKeyElement.textContent();
    } catch (e) {
      console.log('⚠️  Could not auto-extract anon key');
    }

    // Try to extract service_role key
    let serviceRoleKey = null;
    try {
      // Look for service_role key (it's usually the second JWT token)
      const allKeys = await page.locator('code:has-text("eyJ")').allTextContents();
      if (allKeys.length >= 2) {
        serviceRoleKey = allKeys[1];
      }
    } catch (e) {
      console.log('⚠️  Could not auto-extract service_role key');
    }

    // Display results
    console.log('===========================================');
    console.log('🎉 SUPABASE CREDENTIALS EXTRACTED!');
    console.log('===========================================\n');
    console.log(`Project Name: FleetSkipper Website`);
    console.log(`Project ID: ${projectId}`);
    console.log(`Project URL: ${supabaseUrl}`);
    console.log(`\nDashboard: https://supabase.com/dashboard/project/${projectId}`);
    console.log(`API Settings: https://supabase.com/dashboard/project/${projectId}/settings/api\n`);

    if (anonKey) {
      console.log('✅ Anon/Public Key (extracted):');
      console.log(`   ${anonKey}\n`);
    } else {
      console.log('⚠️  Anon/Public Key: Please copy manually from the browser\n');
    }

    if (serviceRoleKey) {
      console.log('✅ Service Role Key (extracted):');
      console.log(`   ${serviceRoleKey}\n`);
    } else {
      console.log('⚠️  Service Role Key: Please copy manually from the browser\n');
    }

    console.log('===========================================\n');
    console.log('📝 Copy these values and send them to me so I can:');
    console.log('   1. Update your .env.local file');
    console.log('   2. Run the database migration');
    console.log('   3. Set up authentication\n');

    console.log('💡 Browser will stay open for 2 minutes for you to verify and copy...\n');
    await page.waitForTimeout(120000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Browser will stay open for manual extraction...\n');
    await new Promise(() => {});
  } finally {
    await browser.close();
    console.log('\n✅ Script complete.\n');
  }
})();
