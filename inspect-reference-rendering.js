const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 Inspecting Reference Badge Rendering\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Setting up test data and navigating to results...');
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
  
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const analysis = await page.evaluate(() => {
    // Check if ReferenceModal is imported/available
    const hasReactRoot = !!document.querySelector('#__next');
    
    // Find all reference-related elements
    const allElements = Array.from(document.querySelectorAll('*'));
    const refElements = allElements.filter(el => 
      el.textContent.includes('WBC3') && el.textContent.includes('16.')
    );
    
    // Check for buttons vs spans
    const refButtons = refElements.filter(el => el.tagName === 'BUTTON');
    const refSpans = refElements.filter(el => el.tagName === 'SPAN');
    
    // Get sample HTML
    const sampleHTML = refElements.slice(0, 3).map(el => ({
      tag: el.tagName,
      classes: el.className,
      text: el.textContent.substring(0, 100),
      hasOnClick: el.onclick !== null || el.getAttribute('onclick') !== null,
      outerHTML: el.outerHTML.substring(0, 200)
    }));
    
    return {
      hasReactRoot,
      totalRefElements: refElements.length,
      refButtons: refButtons.length,
      refSpans: refSpans.length,
      sampleHTML
    };
  });
  
  console.log('\n===== REFERENCE RENDERING ANALYSIS =====');
  console.log('React root exists:', analysis.hasReactRoot);
  console.log('Total elements with WBC3 reference:', analysis.totalRefElements);
  console.log('BUTTON elements:', analysis.refButtons);
  console.log('SPAN elements:', analysis.refSpans);
  console.log('\nSample HTML:');
  console.log(JSON.stringify(analysis.sampleHTML, null, 2));
  
  console.log('\n\nBrowser will stay open for 60 seconds for visual inspection...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
