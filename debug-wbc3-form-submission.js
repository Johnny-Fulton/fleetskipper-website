const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 DEBUG: Testing WBC3 Form Submission\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Intercept API requests to see what's being sent
  page.on('request', request => {
    if (request.url().includes('/api/wbc3/check')) {
      console.log('📤 POST Request to /api/wbc3/check');
      console.log('Request Body:', request.postData());
    }
  });
  
  // Intercept API responses to see errors
  page.on('response', async response => {
    if (response.url().includes('/api/wbc3/check')) {
      console.log('\n📥 Response Status:', response.status());
      try {
        const body = await response.json();
        console.log('Response Body:', JSON.stringify(body, null, 2));
      } catch (e) {
        console.log('Could not parse response');
      }
    }
  });
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ BROWSER ERROR:', msg.text());
    }
  });
  
  console.log('Opening WBC3 Checker form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('\nFilling out form with minimal test data...\n');
  
  // Fill basic required fields
  await page.fill('input[name="vesselName"]', 'Test Vessel');
  await page.fill('input[name="lengthOverall"]', '12');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="enginePowerKW"]', '100');
  
  console.log('✅ Filled basic fields');
  await page.waitForTimeout(1000);
  
  console.log('\n📋 Clicking submit button...\n');
  await page.click('button[type="submit"]');
  
  // Wait for response
  await page.waitForTimeout(5000);
  
  console.log('\n✅ Check console output above for API request/response details');
  console.log('Browser will stay open for 30 seconds for review...\n');
  
  await page.waitForTimeout(30000);
  await browser.close();
})();
