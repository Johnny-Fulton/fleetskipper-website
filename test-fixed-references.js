const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing clickable WBC3 references after cache clear\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console errors
  let hasImportError = false;
  page.on('console', msg => {
    if (msg.text().includes('XMarkIcon') || msg.text().includes('Attempted import error')) {
      hasImportError = true;
      console.log('❌ IMPORT ERROR STILL EXISTS:', msg.text());
    }
  });
  
  // Step 1: Fill out form
  console.log('Step 1: Opening WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker');
  await page.waitForTimeout(2000);
  
  // Fill in form with minimal vessel data
  await page.fill('input[name="vesselName"]', 'Test Vessel');
  await page.fill('input[name="lengthOverall"]', '15');
  await page.fill('input[name="grossTonnage"]', '50');
  await page.fill('input[name="maxPersons"]', '12');
  
  // Select vessel type
  await page.selectOption('select[name="vesselType"]', 'workboat');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.selectOption('select[name="gmdssSeaArea"]', 'A1');
  
  console.log('Step 2: Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for results page
  await page.waitForURL('**/results');
  await page.waitForTimeout(3000);
  
  console.log('Step 3: Checking for reference badges...');
  
  // Check for reference badges
  const referenceButtons = await page.locator('button:has-text("WBC3")').count();
  const referenceSpans = await page.locator('span:has-text("WBC3")').count();
  
  console.log('\n===== RESULTS =====');
  console.log('Import Error (XMarkIcon):', hasImportError ? '❌ YES' : '✅ NO');
  console.log('Clickable reference badges (buttons):', referenceButtons);
  console.log('Non-clickable reference spans:', referenceSpans);
  console.log('Total references visible:', referenceButtons + referenceSpans);
  
  if (!hasImportError && referenceButtons > 0) {
    console.log('\n✅ SUCCESS! References are now clickable!\n');
    
    // Try clicking one
    console.log('Step 4: Testing modal by clicking first reference...');
    await page.locator('button:has-text("WBC3")').first().click();
    await page.waitForTimeout(1000);
    
    // Check if modal appeared
    const modalVisible = await page.locator('[role="dialog"]').isVisible();
    console.log('Modal opened:', modalVisible ? '✅ YES' : '❌ NO');
    
  } else if (hasImportError) {
    console.log('\n❌ FAILED: Import error still exists\n');
  } else {
    console.log('\n❌ FAILED: No clickable reference badges found\n');
  }
  
  await browser.close();
})();
