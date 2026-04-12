const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing WBC3 Clickable References\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Listen for console errors
  page.on('pageerror', error => console.log('❌ PAGE ERROR:', error.message));
  
  console.log('📍 Step 1: Opening WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('📍 Step 2: Submitting test vessel data via API...');
  
  const testVessel = {
    vesselName: 'Test Workboat',
    vesselType: 'general_workboat',
    category: 'cat2',
    lengthOverall: 15,
    grossTonnage: 50,
    maxPersons: 8,
    gmdssSeaArea: 'A1',
    propulsionConfiguration: 'diesel_inboard',
    enginePowerKW: 250,
    hasAccommodation: false,
    operations: ['towing']
  };
  
  // Submit via API and store in localStorage like the real form does
  const apiResponse = await page.evaluate(async (vessel) => {
    const response = await fetch('/api/wbc3/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vessel)
    });
    const data = await response.json();
    
    // Store in localStorage like the form does
    if (data.success) {
      localStorage.setItem('wbc3-results', JSON.stringify(data.data));
      localStorage.setItem('wbc3-vessel-input', JSON.stringify(vessel));
    }
    
    return data;
  }, testVessel);
  
  if (!apiResponse.success) {
    console.log('❌ API call failed:', apiResponse.errors);
    await browser.close();
    return;
  }
  
  console.log('✅ API call successful, data stored in localStorage');
  
  console.log('📍 Step 3: Navigating to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('📍 Step 4: Checking for clickable reference buttons...');
  
  const referenceCheck = await page.evaluate(() => {
    // Find all reference buttons (clickable ones have onClick)
    const clickableRefs = Array.from(document.querySelectorAll('button')).filter(btn => 
      btn.textContent.includes('📘') && btn.textContent.match(/WBC3|MARPOL/)
    );
    
    // Find all static reference spans (non-clickable)
    const staticRefs = Array.from(document.querySelectorAll('span')).filter(span => 
      span.textContent.includes('📘') && span.textContent.match(/WBC3|MARPOL/)
    );
    
    return {
      clickableCount: clickableRefs.length,
      staticCount: staticRefs.length,
      firstClickable: clickableRefs[0] ? clickableRefs[0].textContent.trim() : null,
      allClickable: clickableRefs.map(btn => btn.textContent.trim())
    };
  });
  
  console.log('\n===== RESULTS =====');
  console.log('Clickable references (buttons):', referenceCheck.clickableCount);
  console.log('Static references (spans):', referenceCheck.staticCount);
  
  if (referenceCheck.clickableCount > 0) {
    console.log('\n✅ SUCCESS! Found', referenceCheck.clickableCount, 'clickable references:');
    console.log(referenceCheck.allClickable.join(', '));
    
    console.log('\n📍 Step 5: Testing modal popup by clicking first reference...');
    
    // Click the first clickable reference
    await page.click('button:has-text("📘")');
    await page.waitForTimeout(1000);
    
    // Check if modal appeared
    const modalVisible = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]');
      return dialog !== null;
    });
    
    if (modalVisible) {
      console.log('✅ Modal opened successfully!');
      
      // Get modal content
      const modalContent = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const title = dialog.querySelector('h3')?.textContent;
        const body = dialog.textContent.substring(0, 200);
        return { title, preview: body };
      });
      
      console.log('Modal title:', modalContent.title);
      console.log('\n🎉 ALL TESTS PASSED! Clickable references are working perfectly!');
    } else {
      console.log('❌ Modal did not appear after clicking reference');
    }
    
  } else {
    console.log('\n❌ FAILED: No clickable reference buttons found');
    console.log('Found', referenceCheck.staticCount, 'static references instead');
  }
  
  console.log('\nBrowser will stay open for 30 seconds for visual inspection...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
