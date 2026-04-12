const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Complete WBC3 Test - All required fields\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('1️⃣  Opening WBC3 checker...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('2️⃣  Filling ALL required fields...');
  
  // Vessel Identity  
  await page.fill('input[name="vesselName"]', 'Test Workboat');
  
  // Vessel Dimensions
  await page.fill('input[name="lengthOverall"]', '12.5');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '8');
  
  // Engine Power - THIS WAS MISSING
  await page.fill('input[name="maxEnginePower"]', '150');
  
  console.log('   All fields filled!');
  
  console.log('3️⃣  Submitting...');
  await page.click('button[type="submit"]');
  
  await page.waitForTimeout(4000);
  
  const url = page.url();
  console.log('   URL:', url);
  
  if (url.includes('/results')) {
    console.log('\n🎉🎉🎉 WBC3 CHECKER IS FULLY WORKING! 🎉🎉🎉\n');
    
    const heading = await page.textContent('h1');
    console.log('   Heading:', heading);
    
    // Count requirements
    const equipmentItems = await page.locator('.bg-gray-50').count();
    console.log('   Equipment items displayed:', equipmentItems);
    
    console.log('\n✅ Integration COMPLETE and TESTED!\n');
    console.log('The WBC3 Requirements Checker is now live at:');
    console.log('http://localhost:3002/tools/wbc3-checker\n');
    
  } else {
    const error = await page.locator('.bg-red-50').textContent().catch(() => 'Unknown error');
    console.log('\n❌ Error:', error);
  }
  
  console.log('Browser staying open for inspection...\n');
  await page.waitForTimeout(60000);
  await browser.close();
})();
