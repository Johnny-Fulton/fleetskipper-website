const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 Debugging WBC3 References\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Inject debugging code to check what's happening
  await page.goto('http://localhost:3002/tools/wbc3-checker/results');
  await page.waitForTimeout(2000);
  
  // Run diagnostic in browser context
  const debug = await page.evaluate(() => {
    // Check if functions exist
    const hasModule = typeof window !== 'undefined';
    
    // Try to access localStorage data
    let resultsData = null;
    try {
      const stored = localStorage.getItem('wbc3Results');
      resultsData = stored ? JSON.parse(stored) : null;
    } catch (e) {
      return { error: 'Could not read localStorage', message: e.message };
    }
    
    if (!resultsData) {
      return { error: 'No results in localStorage', hasData: false };
    }
    
    // Count references in the data
    let refCount = 0;
    const refs = [];
    
    if (resultsData.equipment && Array.isArray(resultsData.equipment)) {
      resultsData.equipment.forEach(item => {
        if (item.reference) {
          refCount++;
          refs.push(item.reference);
        }
      });
    }
    
    return {
      hasData: true,
      equipmentCount: resultsData.equipment?.length || 0,
      referenceCount: refCount,
      sampleReferences: refs.slice(0, 5)
    };
  });
  
  console.log('===== DIAGNOSTIC RESULTS =====');
  console.log(JSON.stringify(debug, null, 2));
  
  if (debug.sampleReferences && debug.sampleReferences.length > 0) {
    console.log('\n✅ References exist in data:');
    debug.sampleReferences.forEach(ref => console.log(`  - ${ref}`));
  }
  
  await browser.close();
})();
