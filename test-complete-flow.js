const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 COMPLETE END-TO-END TEST OF CLICKABLE REFERENCES\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Step 1: Go to form
  console.log('Step 1: Opening WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker');
  await page.waitForTimeout(2000);
  
  // Step 2: Fill form with simple data
  console.log('Step 2: Filling form...');
  await page.fill('input[name="vesselName"]', 'Test Vessel');
  await page.fill('input[name="lengthOverall"]', '20');
  await page.fill('input[name="grossTonnage"]', '100');
  await page.fill('input[name="maxPersons"]', '12');
  
  // Step 3: Submit
  console.log('Step 3: Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for results page
  await page.waitForTimeout(5000);
  
  console.log('Step 4: Checking results page...');
  
  // Count reference elements
  const buttonCount = await page.locator('button').filter({ hasText: '📘' }).count();
  const totalRefs = await page.locator('text=/📘/').count();
  
  console.log('\n===== RESULTS =====');
  console.log('Total reference badges visible:', totalRefs);
  console.log('Clickable reference buttons:', buttonCount);
  
  if (buttonCount > 0) {
    console.log('\n✅ FOUND CLICKABLE REFERENCES! Testing click...\n');
    
    // Click the first one
    const firstButton = page.locator('button').filter({ hasText: '📘' }).first();
    const refText = await firstButton.textContent();
    console.log('Clicking reference:', refText.trim());
    
    await firstButton.click();
    await page.waitForTimeout(1000);
    
    // Check if modal appeared
    const modalVisible = await page.locator('[role="dialog"]').isVisible();
    console.log('Modal appeared:', modalVisible ? '✅ YES' : '❌ NO');
    
    if (modalVisible) {
      const modalTitle = await page.locator('[role="dialog"] h2, [role="dialog"] [class*="Title"]').first().textContent();
      console.log('Modal title:', modalTitle);
      console.log('\n🎉 SUCCESS! Clickable references are WORKING!\n');
    }
  } else {
    console.log('\n❌ NO CLICKABLE REFERENCES FOUND\n');
    
    // Debug: Check what's actually on the page
    const pageText = await page.locator('body').textContent();
    console.log('Page contains "WBC3":', pageText.includes('WBC3'));
    console.log('Page contains "Equipment":', pageText.includes('Equipment'));
  }
  
  console.log('\nBrowser will stay open for 30 seconds for you to inspect...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
