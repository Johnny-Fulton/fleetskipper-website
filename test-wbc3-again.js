const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing WBC3 Checker AGAIN with all fixes applied\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  
  console.log('1️⃣  Opening WBC3 checker page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('2️⃣  Filling out the form...');
  
  // Vessel Identity
  await page.fill('input[name="vesselName"]', 'Test Vessel 1');
  
  // Defaults should be correct now:
  // vesselType: 'workboat'
  // category: 'cat6'
  // gmdssSeaArea: 'A1'
  console.log('   Using defaults: vesselType=workboat, category=cat6, gmdssSeaArea=A1');
  
  // Vessel Dimensions
  await page.fill('input[name="lengthOverall"]', '12.5');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '8');
  
  console.log('3️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for navigation or error
  await page.waitForTimeout(3000);
  
  const currentUrl = page.url();
  console.log('   Current URL:', currentUrl);
  
  if (currentUrl.includes('/results')) {
    console.log('\n✅ SUCCESS! Navigated to results page\n');
    
    // Check for results data
    const vesselName = await page.textContent('h1').catch(() => '');
    console.log('   Results heading:', vesselName);
    
    const hasSummary = await page.locator('text=Total Requirements').count();
    console.log('   Summary section found:', hasSummary > 0);
    
    const hasEquipment = await page.locator('text=Equipment Requirements').count();
    console.log('   Equipment section found:', hasEquipment > 0);
    
    console.log('\n🎉 WBC3 Checker is WORKING!\n');
    
  } else {
    // Check for error message
    const errorElement = await page.locator('.bg-red-50').first();
    const hasError = await errorElement.count() > 0;
    
    if (hasError) {
      const errorText = await errorElement.textContent();
      console.log('\n❌ VALIDATION ERROR:');
      console.log('  ', errorText);
      console.log('\nThis error needs to be fixed next.\n');
    } else {
      console.log('\n⚠️  Unknown state - not on results page, no error shown');
    }
  }
  
  console.log('Browser will stay open for 30 seconds for you to inspect...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
