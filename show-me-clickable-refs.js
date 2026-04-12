const { chromium } = require('playwright');

(async () => {
  console.log('\n🚀 Opening browser to SHOW YOU the clickable references!\n');

  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('📍 Step 1: Going to WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('📍 Step 2: Submitting test vessel data...');

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
    operations: []
  };

  await page.evaluate(async (vessel) => {
    const response = await fetch('/api/wbc3/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vessel)
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('wbc3Results', JSON.stringify(data.data));
      localStorage.setItem('wbc3-vessel-input', JSON.stringify(vessel));
    }
  }, testVessel);

  console.log('📍 Step 3: Navigating to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('\n✅ BROWSER IS NOW OPEN!\n');
  console.log('👀 LOOK FOR:');
  console.log('   - Small badges with 📘 icon and "WBC3" text');
  console.log('   - Some are CYAN and CLICKABLE (hover shows pointer cursor)');
  console.log('   - Click any cyan badge to see the regulation modal popup!\n');
  console.log('🔍 Scrolling to show you the first clickable reference...\n');

  // Find and scroll to first clickable reference
  await page.evaluate(() => {
    const firstClickable = document.querySelector('button[class*="bg-cyan"]');
    if (firstClickable) {
      firstClickable.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight it temporarily
      firstClickable.style.outline = '3px solid red';
      firstClickable.style.outlineOffset = '2px';
      setTimeout(() => {
        firstClickable.style.outline = '';
        firstClickable.style.outlineOffset = '';
      }, 5000);
    }
  });

  await page.waitForTimeout(3000);

  console.log('🎯 I\'ve highlighted the first clickable reference with a RED OUTLINE!');
  console.log('💡 Click it to see the regulation details modal!\n');
  console.log('⏳ Browser will stay open for you to explore...\n');

  // Keep browser open until user closes it
  await new Promise(() => {});
})();
