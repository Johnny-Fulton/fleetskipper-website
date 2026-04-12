const { chromium } = require('playwright');

(async () => {
  console.log('Testing compact card headers...');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  // Submit a vessel that will show Engineering card
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'HEADER SPACING TEST');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '12');
  await page.fill('input[name="crewCount"]', '6');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  if (page.url().includes('/results')) {
    console.log('✅ Navigated to results page');
    console.log('Browser will stay open for 30 seconds...');
    await page.waitForTimeout(30000);
  } else {
    console.log('❌ Failed to navigate to results');
  }

  await browser.close();
  console.log('✅ Test complete');
})();
