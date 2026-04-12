const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING WBC3 CHECKER - FINAL VERIFICATION\n');
  console.log('All form field fixes applied:');
  console.log('  ✅ vesselType: updated to match schema options');
  console.log('  ✅ category: changed to cat6 format');
  console.log('  ✅ gmdssSeaArea: changed to A1 format');
  console.log('  ✅ propulsionConfiguration: changed to diesel_inboard_below');
  console.log('  ✅ enginePowerKW: fixed field name from maxEnginePower\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Listen for console errors
  page.on('pageerror', error => console.log('❌ PAGE ERROR:', error.message));
  
  console.log('Step 1: Navigate to WBC3 checker...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('Step 2: Fill out form with test vessel data...');
  
  // Fill vessel name
  await page.fill('input[name="vesselName"]', 'Test Workboat');
  
  // vesselType is already set to 'workboat' by default
  
  // category is already set to 'cat6' by default
  
  // Fill dimensions
  await page.fill('input[name="lengthOverall"]', '12.5');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '8');
  
  // Fill engine power (the field we just fixed!)
  await page.fill('input[name="enginePowerKW"]', '150');
  
  console.log('Step 3: Submit form...');
  await page.click('button[type="submit"]');
  
  console.log('Step 4: Waiting for results page or error...');
  
  // Wait up to 10 seconds for either results page or error message
  try {
    await Promise.race([
      page.waitForURL('**/tools/wbc3-checker/results', { timeout: 10000 }),
      page.waitForSelector('.bg-red-50', { timeout: 10000 })
    ]);
  } catch (e) {
    console.log('⏱️  Timeout waiting for response');
  }
  
  await page.waitForTimeout(2000);
  
  // Check what happened
  const currentURL = page.url();
  
  if (currentURL.includes('/results')) {
    console.log('\n✅ SUCCESS! Navigated to results page');
    console.log('URL:', currentURL);
    
    // Check if we got results data
    const hasResults = await page.evaluate(() => {
      const heading = document.querySelector('h1');
      return heading && heading.textContent.includes('WBC3 Requirements');
    });
    
    if (hasResults) {
      console.log('✅ Results page loaded with data');
      
      // Get summary stats
      const stats = await page.evaluate(() => {
        const summaryText = document.body.textContent;
        const totalMatch = summaryText.match(/(\d+)\s+Total Requirements/);
        const mandatoryMatch = summaryText.match(/(\d+)\s+Mandatory/);
        return {
          total: totalMatch ? totalMatch[1] : '?',
          mandatory: mandatoryMatch ? mandatoryMatch[1] : '?'
        };
      });
      
      console.log(`✅ Found ${stats.total} total requirements (${stats.mandatory} mandatory)`);
      
      // Take screenshot
      await page.screenshot({
        path: '/Users/jonathanfulton/Desktop/wbc3-checker-SUCCESS.jpg',
        type: 'jpeg',
        quality: 50,
        scale: 'css'
      });
      console.log('✅ Screenshot saved to Desktop as wbc3-checker-SUCCESS.jpg');
      
      console.log('\n🎉 WBC3 INTEGRATION COMPLETE AND WORKING!\n');
    } else {
      console.log('⚠️  Results page loaded but no data found');
    }
    
  } else {
    // Check for error message
    const errorMessage = await page.textContent('.bg-red-50').catch(() => null);
    
    if (errorMessage) {
      console.log('\n❌ VALIDATION ERROR:');
      console.log(errorMessage);
      
      await page.screenshot({
        path: '/Users/jonathanfulton/Desktop/wbc3-checker-ERROR.jpg',
        type: 'jpeg',
        quality: 50,
        scale: 'css'
      });
      console.log('Screenshot saved to Desktop as wbc3-checker-ERROR.jpg');
    } else {
      console.log('\n⚠️  Unknown state - still on checker page');
    }
  }
  
  console.log('\nBrowser will stay open for 30 seconds for visual inspection...');
  await page.waitForTimeout(30000);
  
  await browser.close();
  
  console.log('\n✅ Test complete!\n');
})();
