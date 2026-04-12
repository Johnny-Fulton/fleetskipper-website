const { chromium } = require('playwright');

(async () => {
  console.log('Testing improved WBC3 equipment checker results...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // First go to the form
  console.log('Step 1: Navigating to WBC3 checker form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Fill in a vessel that will show multiple equipment categories
  console.log('Step 2: Filling vessel details...');
  await page.fill('input[name="vesselName"]', 'TEST VESSEL - EQUIPMENT DISPLAY');
  await page.selectOption('select[name="vesselType"]', 'workboat');
  await page.fill('input[name="lengthOverall"]', '18');
  await page.fill('input[name="grossTonnage"]', '100');
  await page.fill('input[name="maxPersons"]', '12');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.fill('input[name="enginePowerKW"]', '800');
  
  // Submit form
  console.log('Step 3: Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for results page
  await page.waitForTimeout(4000);
  
  if (page.url().includes('/results')) {
    console.log('✅ Successfully navigated to results page!');
    console.log('Browser will stay open for 45 seconds to review the improved layout...');
    await page.waitForTimeout(45000);
  } else {
    console.log('❌ Did not navigate to results page');
    console.log('Current URL:', page.url());
  }
  
  await browser.close();
  console.log('✅ Test complete');
})();
