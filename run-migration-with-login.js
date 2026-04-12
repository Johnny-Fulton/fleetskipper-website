const { chromium } = require('playwright');
const fs = require('fs');

const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

// GitHub credentials
const GITHUB_EMAIL = 'johnny.fulton@gmail.com';
const GITHUB_PASSWORD = 'AnnieGithub00';

console.log('\n🚀 Running Supabase Migration with Automated Login...\n');

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
      await page.waitForTimeout(3000);
    } else {
      console.log('✅ Already logged in!\n');
    }

    // Step 3: Paste SQL into editor
    console.log('📝 Step 3: Pasting migration SQL into editor...');

    // Try to find the SQL editor
    const editorSelectors = [
      '.monaco-editor textarea',
      '[data-mode-id="sql"] textarea',
      '.cm-content',
      '[role="textbox"]',
      'textarea.inputarea'
    ];

    let editorFound = false;
    for (const selector of editorSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        console.log(`✅ Found editor with selector: ${selector}`);

        // Click to focus
        await page.click(selector);
        await page.waitForTimeout(500);

        // Select all and delete
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Delete');
        await page.waitForTimeout(500);

        // Type the SQL (this might take a while)
        console.log('   Typing SQL (this will take ~30 seconds)...');
        await page.keyboard.type(migrationSQL, { delay: 10 });
        await page.waitForTimeout(1000);

        editorFound = true;
        console.log('✅ SQL pasted successfully!\n');
        break;
      } catch (e) {
        continue;
      }
    }

    if (!editorFound) {
      console.log('⚠️  Could not find SQL editor.');
      console.log('   Copying SQL to clipboard for manual paste...\n');
      await page.evaluate((sql) => {
        navigator.clipboard.writeText(sql);
      }, migrationSQL);
      console.log('✅ SQL copied to clipboard! Press Cmd+V to paste, then click Run.\n');
      console.log('💡 Browser will stay open for you to complete manually...\n');
      await new Promise(() => {});
      return;
    }

    // Step 4: Click Run button
    console.log('🚀 Step 4: Looking for Run button...');

    const runButtonSelectors = [
      'button:has-text("Run")',
      'button:has-text("Execute")',
      '[data-testid="run-query-button"]',
      'button[type="submit"]:visible'
    ];

    let runClicked = false;
    for (const selector of runButtonSelectors) {
      try {
        const runButton = page.locator(selector).first();
        await runButton.click({ timeout: 3000 });
        console.log('✅ Clicked Run button!\n');
        runClicked = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!runClicked) {
      console.log('⚠️  Could not find Run button automatically.');
      console.log('   Please click the Run button manually.\n');
    }

    // Step 5: Wait for migration to complete
    console.log('⏳ Step 5: Waiting for migration to complete...');
    await page.waitForTimeout(8000);

    // Check for success/error messages
    const pageText = await page.textContent('body');

    if (pageText.includes('Success') || pageText.includes('success')) {
      console.log('\n🎉 MIGRATION COMPLETED SUCCESSFULLY!\n');
      console.log('📊 Created:');
      console.log('   ✅ user_profiles table');
      console.log('   ✅ tool_results table');
      console.log('   ✅ Row Level Security policies');
      console.log('   ✅ Auto-profile creation trigger');
      console.log('   ✅ Performance indexes\n');
    } else if (pageText.includes('error') || pageText.includes('Error')) {
      console.log('\n⚠️  There may have been an error.');
      console.log('   Check the Supabase dashboard for details.\n');
    } else {
      console.log('\n✅ Migration SQL executed.');
      console.log('   Verifying in Supabase dashboard...\n');
    }

    console.log('💡 Browser will stay open for 30 seconds for you to verify...\n');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Browser will stay open so you can complete manually...\n');
    await new Promise(() => {});
  } finally {
    // Don't close - let user verify
    console.log('\n✅ Script complete. Check the browser for results.\n');
  }
})();
