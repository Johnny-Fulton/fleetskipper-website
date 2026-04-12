const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 DIAGNOSTIC: Results Page Data Loading\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('pageerror', error => console.log('❌ PAGE ERROR:', error.message));
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      console.log(`CONSOLE ${type.toUpperCase()}:`, msg.text());
    }
  });

  console.log('📍 Step 1: Opening form page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('📍 Step 2: Submitting via API and storing to localStorage...');

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
      // Store EXACTLY like the form does (line 123 of page.tsx)
      localStorage.setItem('wbc3Results', JSON.stringify(data.data));
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
  console.log('Equipment items returned:', apiResponse.data.equipment?.length || 0);

  // Show sample equipment with references
  if (apiResponse.data.equipment && apiResponse.data.equipment.length > 0) {
    console.log('\nSample equipment from API:');
    apiResponse.data.equipment.slice(0, 3).forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.name}`);
      console.log(`     Reference: ${item.reference || 'NONE'}`);
    });
  }

  console.log('\n📍 Step 3: Checking localStorage BEFORE navigating to results page...');

  const localStorageCheck1 = await page.evaluate(() => {
    const stored = localStorage.getItem('wbc3Results');
    if (!stored) return { exists: false };

    const parsed = JSON.parse(stored);
    return {
      exists: true,
      size: stored.length,
      equipmentCount: parsed.equipment?.length || 0,
      firstEquipment: parsed.equipment?.[0] || null
    };
  });

  console.log('localStorage before navigation:');
  console.log('  Exists:', localStorageCheck1.exists);
  console.log('  Size:', localStorageCheck1.size, 'bytes');
  console.log('  Equipment count:', localStorageCheck1.equipmentCount);
  if (localStorageCheck1.firstEquipment) {
    console.log('  First item:', localStorageCheck1.firstEquipment.name);
    console.log('  First item reference:', localStorageCheck1.firstEquipment.reference || 'NONE');
  }

  console.log('\n📍 Step 4: Navigating to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  console.log('\n📍 Step 5: Checking localStorage AFTER navigating to results page...');

  const localStorageCheck2 = await page.evaluate(() => {
    const stored = localStorage.getItem('wbc3Results');
    if (!stored) return { exists: false };

    const parsed = JSON.parse(stored);
    return {
      exists: true,
      size: stored.length,
      equipmentCount: parsed.equipment?.length || 0,
      hasEquipment: !!parsed.equipment
    };
  });

  console.log('localStorage after navigation:');
  console.log('  Exists:', localStorageCheck2.exists);
  console.log('  Equipment count:', localStorageCheck2.equipmentCount);

  console.log('\n📍 Step 6: Checking what React component sees...');

  const reactStateCheck = await page.evaluate(() => {
    // Check the actual page content
    const bodyText = document.body.textContent || '';

    // Try to find equipment section
    const hasEquipmentHeading = bodyText.includes('Required Equipment') || bodyText.includes('Equipment');

    // Count actual equipment items rendered
    const equipmentItems = document.querySelectorAll('[class*="equipment"]');

    // Count reference badges
    const allButtons = Array.from(document.querySelectorAll('button'));
    const refButtons = allButtons.filter(btn =>
      btn.textContent.includes('📘') && btn.textContent.match(/WBC3/)
    );

    const allSpans = Array.from(document.querySelectorAll('span'));
    const refSpans = allSpans.filter(span =>
      span.textContent.includes('📘') && span.textContent.match(/WBC3/)
    );

    // Check if there's any error message
    const hasError = bodyText.includes('Error') || bodyText.includes('error');
    const hasNoData = bodyText.includes('No data') || bodyText.includes('Please fill');

    return {
      hasEquipmentHeading,
      equipmentItemsCount: equipmentItems.length,
      clickableRefs: refButtons.length,
      staticRefs: refSpans.length,
      totalRefs: refButtons.length + refSpans.length,
      hasError,
      hasNoData,
      sampleRefButton: refButtons[0]?.textContent?.trim() || null,
      sampleRefSpan: refSpans[0]?.textContent?.trim() || null
    };
  });

  console.log('\n===== REACT COMPONENT STATE =====');
  console.log('Has equipment heading:', reactStateCheck.hasEquipmentHeading);
  console.log('Equipment items rendered:', reactStateCheck.equipmentItemsCount);
  console.log('Clickable references (buttons):', reactStateCheck.clickableRefs);
  console.log('Static references (spans):', reactStateCheck.staticRefs);
  console.log('TOTAL references:', reactStateCheck.totalRefs);
  console.log('Has error message:', reactStateCheck.hasError);
  console.log('Has "no data" message:', reactStateCheck.hasNoData);

  if (reactStateCheck.sampleRefButton) {
    console.log('Sample clickable ref:', reactStateCheck.sampleRefButton);
  }
  if (reactStateCheck.sampleRefSpan) {
    console.log('Sample static ref:', reactStateCheck.sampleRefSpan);
  }

  console.log('\n========== DIAGNOSTIC SUMMARY ==========\n');

  if (!localStorageCheck1.exists) {
    console.log('🔴 CRITICAL: Data never stored to localStorage!');
    console.log('   → API call succeeded but localStorage.setItem() failed');
  } else if (!localStorageCheck2.exists) {
    console.log('🔴 CRITICAL: Data disappeared after navigation!');
    console.log('   → localStorage cleared between pages');
  } else if (localStorageCheck2.equipmentCount === 0) {
    console.log('🔴 CRITICAL: Equipment array empty in localStorage!');
    console.log('   → API returned data but equipment array is empty');
  } else if (reactStateCheck.totalRefs === 0) {
    console.log('🔴 CRITICAL: Data in localStorage but NOT rendering!');
    console.log('   → localStorage has', localStorageCheck2.equipmentCount, 'items');
    console.log('   → Page shows 0 reference badges');
    console.log('   → LIKELY CAUSE: React useEffect not loading from localStorage');
    console.log('   → OR: Conditional rendering blocking all badges');
  } else if (reactStateCheck.clickableRefs === 0 && reactStateCheck.staticRefs > 0) {
    console.log('⚠️  WARNING: References rendering as STATIC only!');
    console.log('   →', reactStateCheck.staticRefs, 'static references (non-clickable)');
    console.log('   → 0 clickable references');
    console.log('   → CAUSE: hasReferenceData() returning false for all refs');
  } else if (reactStateCheck.clickableRefs > 0) {
    console.log('✅ SUCCESS: Clickable references are working!');
    console.log('   →', reactStateCheck.clickableRefs, 'clickable');
    console.log('   →', reactStateCheck.staticRefs, 'static');
  }

  console.log('\nBrowser stays open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
})();
