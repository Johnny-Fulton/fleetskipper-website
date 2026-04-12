const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Navigating to WBC3 checker...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  // Fill form
  await page.fill('input[name="vesselName"]', 'Test Vessel');
  await page.fill('input[name="lengthOverall"]', '12');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="enginePowerKW"]', '100');
  
  await page.click('button[type="submit"]');
  
  // Wait for results page
  await page.waitForURL('**/results', { timeout: 10000 });
  
  console.log('\n=== CHECKING PAGE HTML ===\n');
  
  // Check what's actually rendered
  const html = await page.evaluate(() => {
    const equipmentSection = document.querySelector('main');
    return equipmentSection ? equipmentSection.innerHTML.substring(0, 5000) : 'NOT FOUND';
  });
  
  console.log('HTML SNIPPET:', html.substring(0, 2000));
  
  console.log('\n\n=== CHECKING FOR REFERENCE MODAL COMPONENT ===\n');
  
  const hasModal = await page.evaluate(() => {
    return document.querySelector('[role="dialog"]') !== null ||
           document.body.innerHTML.includes('ReferenceModal') ||
           document.body.innerHTML.includes('regulation');
  });
  
  console.log('Modal found:', hasModal);
  
  await page.waitForTimeout(60000);
  await browser.close();
})();
