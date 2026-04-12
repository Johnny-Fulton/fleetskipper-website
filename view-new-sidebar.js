const { chromium } = require('playwright');

(async () => {
  console.log('Testing new sidebar layout with Edit Settings...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Submit a vessel to get to results page
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'SIDEBAR TEST VESSEL');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '12');
  await page.fill('input[name="crewCount"]', '6');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');

  // Check some equipment
  await page.check('[data-testid="hasRadar"]');
  await page.check('[data-testid="hasElectronicCharts"]');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  if (page.url().includes('/results')) {
    console.log('✅ Navigated to results page\n');
    
    await page.waitForTimeout(2000);
    
    console.log('Check the sidebar:');
    console.log('  - Smaller title (text-2xl instead of text-4xl)');
    console.log('  - "Edit Settings" button at bottom of Vessel Details card');
    console.log('  - Click it to expand/collapse settings editor\n');
    
    console.log('Browser will stay open for 60 seconds...\n');
    await page.waitForTimeout(60000);
  } else {
    console.log('❌ Failed to navigate to results\n');
  }

  await browser.close();
  console.log('✅ Test complete\n');
})();
