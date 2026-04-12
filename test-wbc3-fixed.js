const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing WBC3 Checker with FIXED vessel type and category fields\n');
  
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
  
  // Vessel Type should already be 'workboat' by default
  console.log('   Vessel type: workboat (default)');
  
  // Category should already be 'cat6' by default
  console.log('   Category: cat6 (default)');
  
  // Vessel Dimensions
  await page.fill('input[name="lengthOverall"]', '12.5');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '8');
  
  console.log('3️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for either results page or error message
  await page.waitForTimeout(3000);
  
  const currentUrl = page.url();
  console.log('   Current URL:', currentUrl);
  
  if (currentUrl.includes('/results')) {
    console.log('\n✅ SUCCESS! Navigated to results page\n');
    
    // Check if results are displayed
    const vesselName = await page.textContent('h1').catch(() => null);
    console.log('   Results heading:', vesselName);
    
    const hasEquipment = await page.locator('text=Equipment Requirements').count() > 0;
    console.log('   Equipment section found:', hasEquipment);
    
  } else {
    // Check for error message
    const errorElement = await page.locator('.bg-red-50').first();
    const hasError = await errorElement.count() > 0;
    
    if (hasError) {
      const errorText = await errorElement.textContent();
      console.log('\n❌ ERROR displayed on page:');
      console.log('  ', errorText);
    } else {
      console.log('\n⚠️  Unknown state - not on results page, no error shown');
    }
  }
  
  console.log('\nBrowser will stay open for 30 seconds for you to inspect...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
