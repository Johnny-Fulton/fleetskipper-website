const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening WBC3 checker page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  // Hard refresh to ensure latest version
  console.log('Hard refreshing page...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Check if the engine power field exists
  const engineFieldExists = await page.locator('input[name="maxEnginePower"]').count() > 0;
  
  console.log('\n===== FIELD CHECK =====');
  console.log('Engine Power field exists:', engineFieldExists);
  
  if (engineFieldExists) {
    console.log('\n✅ Field is now visible! Testing submission...\n');
    
    await page.fill('input[name="vesselName"]', 'Test Workboat');
    await page.fill('input[name="lengthOverall"]', '12.5');
    await page.fill('input[name="grossTonnage"]', '15');
    await page.fill('input[name="maxPersons"]', '8');
    await page.fill('input[name="maxEnginePower"]', '150');
    
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    
    if (page.url().includes('/results')) {
      console.log('\n🎉🎉🎉 SUCCESS! WBC3 CHECKER IS WORKING! 🎉🎉🎉\n');
      const items = await page.locator('.bg-gray-50').count();
      console.log('Equipment items displayed:', items);
    } else {
      console.log('\n❌ Still showing error');
      const error = await page.locator('.bg-red-50').textContent().catch(() => 'Unknown');
      console.log('Error:', error);
    }
  } else {
    console.log('\n⚠️  Field not found yet - page may need more time to recompile');
  }
  
  await page.waitForTimeout(30000);
  await browser.close();
})();
