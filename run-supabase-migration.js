const { chromium } = require('playwright');
const fs = require('fs');

const migrationSQL = fs.readFileSync('supabase-migrations.sql', 'utf8');

(async () => {
  console.log('\n🚀 Automating Supabase Database Migration...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  try {
    // Step 1: Navigate to SQL Editor
    console.log('📍 Step 1: Opening Supabase SQL Editor...');
    await page.goto('https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj/sql/new');
    
    // Wait for page to load
    await page.waitForTimeout(8000);
    
    // Check if we need to login
    const currentUrl = page.url();
    if (currentUrl.includes('/sign-in') || currentUrl.includes('/login')) {
      console.log('⚠️  You need to log in to Supabase first.');
      console.log('   Please log in, then the migration will run automatically...\n');
      
      // Wait for navigation to SQL Editor after login
      await page.waitForURL('**/sql/**', { timeout: 120000 });
      console.log('✅ Logged in successfully!');
      await page.waitForTimeout(3000);
    }
    
    console.log('📝 Step 2: Pasting migration SQL into editor...');
    
    // Find the code editor (Monaco Editor or CodeMirror)
    // Try multiple selectors for the SQL editor
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
        
        // Clear existing content
        await page.keyboard.press('Control+A');
        await page.waitForTimeout(200);
        
        // Paste the SQL
        await page.keyboard.type(migrationSQL);
        await page.waitForTimeout(1000);
        
        editorFound = true;
        console.log('✅ SQL pasted into editor successfully!');
        break;
      } catch (e) {
        continue;
      }
    }
    
    if (!editorFound) {
      console.log('⚠️  Could not find SQL editor automatically.');
      console.log('   Copying SQL to clipboard - you can paste manually...\n');
      await page.evaluate((sql) => {
        navigator.clipboard.writeText(sql);
      }, migrationSQL);
      console.log('✅ SQL copied to clipboard! Press Ctrl+V to paste.');
      await page.waitForTimeout(30000);
      return;
    }
    
    console.log('🚀 Step 3: Looking for Run button...');
    
    // Find and click Run button
    const runButtonSelectors = [
      'button:has-text("Run")',
      'button:has-text("Execute")',
      '[data-testid="run-query-button"]',
      'button[type="submit"]'
    ];
    
    let runClicked = false;
    for (const selector of runButtonSelectors) {
      try {
        await page.click(selector, { timeout: 3000 });
        console.log('✅ Clicked Run button!');
        runClicked = true;
        break;
      } catch (e) {
        continue;
      }
    }
    
    if (!runClicked) {
      console.log('⚠️  Could not find Run button automatically.');
      console.log('   Please click the Run button manually.\n');
      await page.waitForTimeout(30000);
      return;
    }
    
    // Wait for query to complete
    console.log('⏳ Waiting for migration to complete...');
    await page.waitForTimeout(5000);
    
    // Check for success/error messages
    const pageText = await page.textContent('body');
    
    if (pageText.includes('Success') || pageText.includes('completed')) {
      console.log('\n✅ MIGRATION COMPLETED SUCCESSFULLY!');
      console.log('\n📊 Created:');
      console.log('   - user_profiles table');
      console.log('   - tool_results table');
      console.log('   - Row Level Security policies');
      console.log('   - Auto-profile creation trigger\n');
    } else if (pageText.includes('error') || pageText.includes('Error')) {
      console.log('\n⚠️  There may have been an error. Please check the Supabase dashboard.\n');
    } else {
      console.log('\n✅ Migration SQL executed. Please verify in the Supabase dashboard.\n');
    }
    
    console.log('💡 Browser will stay open for 30 seconds for you to verify...\n');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('\n❌ Error during migration:', error.message);
    console.log('\n💡 Browser will stay open for you to complete manually...\n');
    await page.waitForTimeout(60000);
  } finally {
    await browser.close();
  }
})();
