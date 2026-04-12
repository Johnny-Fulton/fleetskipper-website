const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing WBC3 Clickable References (with VALID data)\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('pageerror', error => console.log('❌ PAGE ERROR:', error.message));

  console.log('📍 Step 1: Opening WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('📍 Step 2: Submitting test vessel data via API...');

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

  const apiResponse = await page.evaluate(async (vessel) => {
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

    return data;
  }, testVessel);

  if (!apiResponse.success) {
    console.log('❌ API call failed:', apiResponse.errors);
    await browser.close();
    return;
  }

  console.log('✅ API call successful');

  console.log('📍 Step 3: Navigating to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('📍 Step 4: Checking for clickable reference buttons...');

  const referenceCheck = await page.evaluate(() => {
    const clickableRefs = Array.from(document.querySelectorAll('button')).filter(btn =>
      btn.textContent.includes('📘') && btn.textContent.match(/WBC3/)
    );

    const staticRefs = Array.from(document.querySelectorAll('span')).filter(span =>
      span.textContent.includes('📘') && span.textContent.match(/WBC3/)
    );

    return {
      clickableCount: clickableRefs.length,
      staticCount: staticRefs.length,
      allClickable: clickableRefs.map(btn => btn.textContent.trim()).slice(0, 5)
    };
  });

  console.log('\n===== RESULTS =====');
  console.log('Clickable references (buttons):', referenceCheck.clickableCount);
  console.log('Static references (spans):', referenceCheck.staticCount);

  if (referenceCheck.clickableCount > 0) {
    console.log('\n✅ SUCCESS! Found', referenceCheck.clickableCount, 'clickable references');
    console.log('First 5:', referenceCheck.allClickable.join(', '));

    console.log('\n📍 Step 5: Testing modal popup...');
    await page.click('button:has-text("📘")');
    await page.waitForTimeout(1000);

    const modalVisible = await page.evaluate(() => {
      return document.querySelector('[role="dialog"]') !== null;
    });

    if (modalVisible) {
      console.log('✅ Modal opened successfully!');
      console.log('\n🎉 ALL TESTS PASSED!');
    } else {
      console.log('❌ Modal did not appear');
    }
  } else {
    console.log('\n❌ FAILED: No clickable references found');
  }

  console.log('\nBrowser stays open for 30 seconds...');
  await page.waitForTimeout(30000);
  await browser.close();
})();
