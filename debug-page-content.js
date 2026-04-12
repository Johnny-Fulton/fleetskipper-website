const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 Debugging WBC3 Results Page Content\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Setting up test data...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  const testVessel = {
    vesselName: 'Test Workboat',
    vesselType: 'workboat',
    category: 'cat2',
    lengthOverall: 15,
    grossTonnage: 50,
    maxPersons: 8,
    gmdssSeaArea: 'A1',
    propulsionConfiguration: 'diesel_inboard_below',
    enginePowerKW: 250,
    driveType: 'shaft',
    isOpenBoat: false,
    hasWheelhouse: true,
    hasAccommodation: false,
    hasGalley: false,
    lifejacketType: 'foam',
    waterTemperature: 'above_10c',
    operations: ['towing_operations']
  };
  
  await page.evaluate(async (vessel) => {
    const response = await fetch('/api/wbc3/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vessel)
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('wbc3-results', JSON.stringify(data.data));
      localStorage.setItem('wbc3-vessel-input', JSON.stringify(vessel));
    }
  }, testVessel);
  
  console.log('Navigating to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const pageAnalysis = await page.evaluate(() => {
    const results = localStorage.getItem('wbc3-results');
    const parsed = results ? JSON.parse(results) : null;
    
    // Count total items with references
    let itemsWithReferences = 0;
    if (parsed?.equipment) {
      itemsWithReferences += parsed.equipment.filter(item => item.reference).length;
    }
    
    // Get page text sample
    const bodyText = document.body.textContent.substring(0, 500);
    
    // Check if ReferenceModal component exists in DOM
    const hasModal = document.querySelector('[role="dialog"]') !== null;
    
    // Find all elements containing book emoji
    const bookEmojiElements = Array.from(document.querySelectorAll('*')).filter(el => 
      el.textContent.includes('📘')
    );
    
    return {
      hasResults: !!parsed,
      equipmentCount: parsed?.equipment?.length || 0,
      itemsWithReferences,
      bodyTextSample: bodyText,
      hasModal,
      bookEmojiCount: bookEmojiElements.length,
      sampleEquipment: parsed?.equipment?.slice(0, 3).map(item => ({
        name: item.name,
        hasReference: !!item.reference,
        reference: item.reference
      }))
    };
  });
  
  console.log('\n===== PAGE ANALYSIS =====');
  console.log('Has results in localStorage:', pageAnalysis.hasResults);
  console.log('Equipment items:', pageAnalysis.equipmentCount);
  console.log('Items with references:', pageAnalysis.itemsWithReferences);
  console.log('Book emoji elements found:', pageAnalysis.bookEmojiCount);
  console.log('Modal in DOM:', pageAnalysis.hasModal);
  console.log('\nSample equipment items:');
  console.log(JSON.stringify(pageAnalysis.sampleEquipment, null, 2));
  console.log('\nPage text sample:');
  console.log(pageAnalysis.bodyTextSample);
  
  console.log('\nBrowser will stay open for 60 seconds...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
