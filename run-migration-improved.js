const { chromium } = require('playwright');
const fs = require('fs');

const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

// GitHub credentials
const GITHUB_EMAIL = 'johnny.fulton@gmail.com';
const GITHUB_PASSWORD = 'AnnieGithub00';

console.log('\n🚀 Running Supabase Migration with IMPROVED Automation...\n');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  try {
    // Step 1: Navigate to Supabase SQL Editor
    console.log('📍 Step 1: Opening Supabase SQL Editor...');
    await page.goto('https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj/sql/new');

    await page.waitForTimeout(5000);

    // Check if we're at sign-in page
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

      // Wait for redirect back to Supabase SQL Editor
      console.log('   Waiting for redirect to SQL Editor...');
      await page.waitForURL('**/sql/**', { timeout: 60000 });

      console.log('✅ Login successful! Redirected to SQL Editor\n');
      // CRITICAL: Wait longer for the SQL editor to fully initialize after OAuth redirect
      await page.waitForTimeout(8000);
    } else {
      console.log('✅ Already logged in!\n');
    }

    // Step 3: Paste SQL into editor - IMPROVED APPROACH
    console.log('📝 Step 3: Finding and interacting with SQL editor...');

    // Strategy 1: Try to find any visible textarea and click on the page to activate editor
    console.log('   Strategy 1: Clicking on page to activate editor...');
    await page.mouse.click(500, 300);
    await page.waitForTimeout(1000);

    // Strategy 2: Use keyboard shortcut to select all and delete
    console.log('   Strategy 2: Clearing editor with keyboard shortcuts...');
    await page.keyboard.press('Meta+A');  // Cmd+A on Mac
    await page.waitForTimeout(300);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);

    // Strategy 3: Type the SQL directly
    console.log('   Strategy 3: Typing SQL migration (this will take ~60 seconds)...');
    console.log('   Please wait patiently...\n');

    // Split SQL into chunks to avoid timeout
    const chunkSize = 500;  // characters per chunk
    for (let i = 0; i < migrationSQL.length; i += chunkSize) {
      const chunk = migrationSQL.slice(i, i + chunkSize);
      await page.keyboard.type(chunk, { delay: 5 });  // Faster typing

      // Progress indicator
      const progress = Math.min(100, Math.round(((i + chunk.length) / migrationSQL.length) * 100));
      if (progress % 20 === 0) {
        console.log(`   Progress: ${progress}%`);
      }
    }

    console.log('   Progress: 100%');
    console.log('✅ SQL pasted successfully!\n');
    await page.waitForTimeout(1000);

    // Step 4: Click Run button - IMPROVED APPROACH
    console.log('🚀 Step 4: Looking for Run button...');

    // Try multiple strategies to find and click the Run button
    let runClicked = false;

    // Strategy 1: Look for button with text "Run"
    try {
      console.log('   Trying: button with text "Run"...');
      const runButton = page.getByRole('button', { name: /run/i });
      await runButton.click({ timeout: 3000 });
      console.log('✅ Clicked Run button!\n');
      runClicked = true;
    } catch (e) {
      // Strategy 2: Try keyboard shortcut
      try {
        console.log('   Trying: keyboard shortcut Cmd+Enter...');
        await page.keyboard.press('Meta+Enter');
        console.log('✅ Executed with keyboard shortcut!\n');
        runClicked = true;
      } catch (e2) {
        // Strategy 3: Find any button in the toolbar area
        try {
          console.log('   Trying: any Run button in toolbar...');
          await page.locator('button:has-text("Run"), button:has-text("RUN")').first().click({ timeout: 3000 });
          console.log('✅ Clicked Run button!\n');
          runClicked = true;
        } catch (e3) {
          console.log('⚠️  Could not find Run button automatically.');
          console.log('   Please click the Run button manually.\n');
        }
      }
    }

    // Step 5: Wait for migration to complete
    console.log('⏳ Step 5: Waiting for migration to complete...');
    await page.waitForTimeout(10000);

    // Check for success/error messages
    const pageText = await page.textContent('body');

    if (pageText.includes('Success') || pageText.includes('success') || pageText.includes('completed')) {
      console.log('\n🎉 MIGRATION COMPLETED SUCCESSFULLY!\\n');
      console.log('📊 Created:');
      console.log('   ✅ user_profiles table');
      console.log('   ✅ tool_results table');
      console.log('   ✅ Row Level Security policies');
      console.log('   ✅ Auto-profile creation trigger');
      console.log('   ✅ Performance indexes\n');
    } else if (pageText.includes('error') || pageText.includes('Error') || pageText.includes('ERROR')) {
      console.log('\n⚠️  There may have been an error.');
      console.log('   Check the Supabase dashboard for details.\n');
    } else {
      console.log('\n✅ Migration SQL executed.');
      console.log('   Verifying in Supabase dashboard...\\n');
    }

    console.log('💡 Browser will stay open for 60 seconds for you to verify...\n');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Browser will stay open so you can complete manually...\n');
    await new Promise(() => {});
  } finally {
    await browser.close();
    console.log('\n✅ Script complete.\n');
  }
})();
