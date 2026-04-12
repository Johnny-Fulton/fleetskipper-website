import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Navigating to FV Crew Checker...');
  await page.goto('http://localhost:3002/tools/fishing-vessel/crew-checker');
  await page.waitForLoadState('networkidle');
  
  console.log('Filling form with LARGE vessel (18m RL, 19.5m LOA)...');
  
  // Fill required fields
  await page.fill('input[name="vesselName"]', 'FV Large Test');
  await page.fill('input[name="registeredLength"]', '18');
  await page.fill('input[name="lengthOverall"]', '19.5');
  await page.selectOption('select[name="vesselStructure"]', 'decked');
  await page.fill('input[name="crewCount"]', '6');
  await page.fill('input[name="distanceFromSafeHaven"]', '40');
  await page.selectOption('select[name="engineConfiguration"]', 'inboard');
  await page.check('input[name="engineBelowDeck"]');
  await page.fill('input[name="enginePowerKW"]', '400');
  await page.selectOption('select[name="steeringType"]', 'hydraulic');
  await page.selectOption('select[name="lifejacketType"]', 'foam');
  
  console.log('Submitting form...');
  await page.click('button[type="submit"]');
  
  console.log('Waiting for results page...');
  await page.waitForURL('**/results', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
  
  // Wait for content to render
  await page.waitForSelector('h1:has-text("Your Crew Requirements")', { timeout: 5000 });
  
  // Check if skipper section exists
  const skipperSection = await page.$('h2:has-text("Skipper")');
  
  if (skipperSection) {
    console.log('❌ FAIL: Skipper section found for large vessel (should not exist)');
  } else {
    console.log('✅ PASS: No skipper section for large vessel (correct!)');
  }
  
  // Take screenshot
  await page.screenshot({
    path: '/tmp/fv_large_vessel_results.jpg',
    type: 'jpeg',
    quality: 50
  });
  console.log('Screenshot saved to /tmp/fv_large_vessel_results.jpg');
  
  await browser.close();
  console.log('Test complete!');
})();
