const { chromium } = require('playwright');

// GitHub credentials for login
const GITHUB_EMAIL = 'johnny.fulton@gmail.com';
const GITHUB_PASSWORD = 'AnnieGithub00';

console.log('\n🚀 Creating NEW Supabase Project for FleetSkipper Website...\n');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  try {
    // Step 1: Navigate to Supabase Dashboard
    console.log('📍 Step 1: Opening Supabase Dashboard...');
    await page.goto('https://supabase.com/dashboard/projects');

    await page.waitForTimeout(5000);

    // Check if we need to login
    const currentUrl = page.url();
    if (currentUrl.includes('/sign-in') || currentUrl.includes('/login')) {
      console.log('🔐 Step 2: Logging in with GitHub...');

      // Click "Continue with GitHub" button
      const githubButton = page.locator('button:has-text("GitHub"), a:has-text("GitHub"), button:has-text("Continue with GitHub")').first();
      await githubButton.click();

      console.log('   Waiting for GitHub login page...');
      await page.waitForTimeout(3000);

      // Fill in GitHub credentials
      console.log('   Entering GitHub email...');
      const emailField = page.locator('input[name="login"]');
      await emailField.fill(GITHUB_EMAIL);

      console.log('   Entering GitHub password...');
      const passwordField = page.locator('input[name="password"]');
      await passwordField.fill(GITHUB_PASSWORD);

      console.log('   Clicking Sign in button...');
      const signInButton = page.locator('input[type="submit"][value="Sign in"], button[type="submit"]:has-text("Sign in")').first();
      await signInButton.click();

      console.log('   Waiting for authentication...');
      await page.waitForTimeout(5000);

      // Wait for redirect back to Supabase projects page
      console.log('   Waiting for redirect to Supabase...');
      await page.waitForURL('**/projects**', { timeout: 60000 });

      console.log('✅ Login successful!\n');
      await page.waitForTimeout(3000);
    } else {
      console.log('✅ Already logged in!\n');
    }

    // Step 2: Click "New Project" button
    console.log('📍 Step 3: Creating new project...');
    console.log('   Looking for "New Project" button...');

    // Try multiple selectors for the New Project button
    const newProjectSelectors = [
      'button:has-text("New project")',
      'a:has-text("New project")',
      'button:has-text("New Project")',
      'a:has-text("New Project")',
      '[data-testid="new-project-button"]'
    ];

    let buttonClicked = false;
    for (const selector of newProjectSelectors) {
      try {
        await page.locator(selector).first().click({ timeout: 3000 });
        console.log('✅ Clicked "New Project" button!');
        buttonClicked = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!buttonClicked) {
      console.log('⚠️  Could not find "New Project" button automatically.');
      console.log('   Please click it manually in the browser that just opened.\n');
      console.log('💡 Browser will stay open for you to complete...\n');
      await new Promise(() => {});
      return;
    }

    await page.waitForTimeout(3000);

    // Step 3: Fill in project details
    console.log('\n📝 Step 4: Filling in project details...');

    // Project name
    console.log('   Setting project name: "FleetSkipper Website"...');
    const projectNameField = page.locator('input[name="name"], input[placeholder*="Project name"], input[id*="project-name"]').first();
    await projectNameField.fill('FleetSkipper Website');
    await page.waitForTimeout(500);

    // Database password - generate a strong one
    const dbPassword = 'FleetSkipper2025!WebAuth#Secure';
    console.log('   Setting database password...');
    const passwordField2 = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]').first();
    await passwordField2.fill(dbPassword);
    await page.waitForTimeout(500);

    // Region - try to select a region (UK/EU preferred)
    console.log('   Selecting region (Europe)...');
    try {
      // Try to find and click region dropdown
      const regionDropdown = page.locator('select, button:has-text("Region"), [role="combobox"]').first();
      await regionDropdown.click({ timeout: 3000 });
      await page.waitForTimeout(1000);

      // Try to select Europe/UK region
      const europeOption = page.locator('option:has-text("Europe"), [role="option"]:has-text("Europe"), [role="option"]:has-text("London")').first();
      await europeOption.click({ timeout: 3000 });
      console.log('   ✅ Selected Europe region');
    } catch (e) {
      console.log('   ⚠️  Could not auto-select region, using default');
    }

    await page.waitForTimeout(1000);

    // Step 4: Click "Create new project" button
    console.log('\n🚀 Step 5: Creating project...');
    const createButtonSelectors = [
      'button:has-text("Create new project")',
      'button:has-text("Create project")',
      'button[type="submit"]:has-text("Create")'
    ];

    let createClicked = false;
    for (const selector of createButtonSelectors) {
      try {
        await page.locator(selector).first().click({ timeout: 3000 });
        console.log('✅ Clicked "Create new project" button!');
        createClicked = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!createClicked) {
      console.log('⚠️  Could not find "Create" button automatically.');
      console.log('   Please click it manually.\n');
    }

    // Step 5: Wait for project creation
    console.log('\n⏳ Step 6: Waiting for project to be created (this may take 1-2 minutes)...');
    console.log('   Supabase is setting up your database, storage, and auth...\n');

    // Wait for redirect to project dashboard
    await page.waitForURL('**/project/**', { timeout: 180000 });

    console.log('✅ Project created successfully!\n');
    await page.waitForTimeout(5000);

    // Step 6: Extract project details
    console.log('📊 Step 7: Extracting project credentials...\n');

    // Get project ID from URL
    const projectUrl = page.url();
    const projectIdMatch = projectUrl.match(/project\/([a-z0-9]+)/);
    const projectId = projectIdMatch ? projectIdMatch[1] : 'UNKNOWN';

    console.log(`   Project ID: ${projectId}`);
    console.log(`   Project URL: https://supabase.com/dashboard/project/${projectId}`);
    console.log(`   Database Password: ${dbPassword}`);

    // Navigate to API settings to get keys
    console.log('\n   Navigating to API settings to get keys...');
    await page.goto(`https://supabase.com/dashboard/project/${projectId}/settings/api`);
    await page.waitForTimeout(5000);

    // Try to extract the project URL and anon key
    const pageContent = await page.content();

    // Look for the project URL
    const urlMatch = pageContent.match(/https:\/\/([a-z0-9]+)\.supabase\.co/);
    const supabaseUrl = urlMatch ? urlMatch[0] : `https://${projectId}.supabase.co`;

    console.log(`\n   Supabase URL: ${supabaseUrl}`);

    console.log('\n===========================================');
    console.log('🎉 NEW SUPABASE PROJECT CREATED!');
    console.log('===========================================\n');
    console.log('📋 Save these credentials:\n');
    console.log(`Project Name: FleetSkipper Website`);
    console.log(`Project ID: ${projectId}`);
    console.log(`Supabase URL: ${supabaseUrl}`);
    console.log(`Database Password: ${dbPassword}`);
    console.log(`\nDashboard: https://supabase.com/dashboard/project/${projectId}`);
    console.log(`API Settings: https://supabase.com/dashboard/project/${projectId}/settings/api`);
    console.log('\n===========================================\n');

    console.log('📝 Next Steps:');
    console.log('   1. Copy the anon/public key from the API settings page (currently open)');
    console.log('   2. Copy the service_role key (scroll down on the page)');
    console.log('   3. Update your .env.local file with these credentials');
    console.log('   4. Run the database migration\n');

    console.log('💡 Browser will stay open for 2 minutes for you to copy the keys...\n');
    await page.waitForTimeout(120000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Browser will stay open so you can complete manually...\n');
    await new Promise(() => {});
  } finally {
    await browser.close();
    console.log('\n✅ Script complete.\n');
  }
})();
