const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 DIAGNOSTIC TEST: Full User Flow with Data Tracing\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('pageerror', error => console.log('❌ PAGE ERROR:', error.message));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ CONSOLE ERROR:', msg.text());
    }
  });

  console.log('📍 Step 1: Opening WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('📍 Step 2: Filling form like a REAL user...');

  // Fill vessel details
  await page.fill('input[name="vesselName"]', 'Test Workboat');
  await page.selectOption('select[name="vesselType"]', 'workboat');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.fill('input[name="lengthOverall"]', '15');
  await page.fill('input[name="grossTonnage"]', '50');
  await page.fill('input[name="maxPersons"]', '8');

  // Fill propulsion details
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '250');
  await page.selectOption('select[name="driveType"]', 'shaft');

  // Fill vessel characteristics
  await page.check('input[name="hasWheelhouse"]');
  await page.selectOption('select[name="lifejacketType"]', 'foam');
  await page.selectOption('select[name="waterTemperature"]', 'above_10c');
  await page.selectOption('select[name="gmdssSeaArea"]', 'A1');

  console.log('📍 Step 3: Submitting form...');
  await page.click('button[type="submit"]');

  // Wait for navigation to results page
  await page.waitForURL('**/results', { timeout: 5000 });
  await page.waitForTimeout(2000);

  console.log('📍 Step 4: Checking localStorage after submission...');

  const localStorageData = await page.evaluate(() => {
    const resultsKey = localStorage.getItem('wbc3Results');
    const inputKey = localStorage.getItem('wbc3-vessel-input');

    let parsedResults = null;
    let parsedInput = null;

    try {
      parsedResults = resultsKey ? JSON.parse(resultsKey) : null;
    } catch (e) {
      parsedResults = { error: 'Failed to parse results' };
    }

    try {
      parsedInput = inputKey ? JSON.parse(inputKey) : null;
    } catch (e) {
      parsedInput = { error: 'Failed to parse input' };
    }

    return {
      keys: Object.keys(localStorage),
      hasResults: !!resultsKey,
      hasInput: !!inputKey,
      resultsLength: resultsKey ? resultsKey.length : 0,
      equipmentCount: parsedResults?.equipment?.length || 0,
      firstThreeEquipment: parsedResults?.equipment?.slice(0, 3) || []
    };
  });

  console.log('\n===== LOCALSTORAGE ANALYSIS =====');
  console.log('All localStorage keys:', localStorageData.keys);
  console.log('Has wbc3Results:', localStorageData.hasResults);
  console.log('Results data size:', localStorageData.resultsLength, 'bytes');
  console.log('Equipment count in stored data:', localStorageData.equipmentCount);
  console.log('\nFirst 3 equipment items from localStorage:');
  localStorageData.firstThreeEquipment.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.name}`);
    console.log(`     ID: ${item.id}`);
    console.log(`     Reference: ${item.reference || 'NONE'}`);
    console.log(`     Category: ${item.category}`);
  });

  console.log('\n📍 Step 5: Checking what ACTUALLY rendered on page...');

  const pageAnalysis = await page.evaluate(() => {
    // Check if results component loaded
    const pageText = document.body.textContent;
    const hasEquipmentHeading = pageText.includes('Required Equipment') || pageText.includes('Equipment');

    // Count equipment cards/items visible
    const equipmentCards = document.querySelectorAll('[class*="equipment"]');

    // Count all reference badges (both clickable and static)
    const clickableRefs = Array.from(document.querySelectorAll('button')).filter(btn =>
      btn.textContent.includes('📘') && btn.textContent.match(/WBC3/)
    );

    const staticRefs = Array.from(document.querySelectorAll('span')).filter(span =>
      span.textContent.includes('📘') && span.textContent.match(/WBC3/)
    );

    // Get all text mentioning "WBC3" to see if references exist but aren't styled
    const allWBC3Text = Array.from(document.querySelectorAll('*')).filter(el =>
      el.textContent.includes('WBC3') && el.children.length === 0
    ).map(el => el.textContent.trim()).slice(0, 5);

    return {
      hasEquipmentHeading,
      equipmentCardsCount: equipmentCards.length,
      clickableRefsCount: clickableRefs.length,
      staticRefsCount: staticRefs.length,
      totalRefsRendered: clickableRefs.length + staticRefs.length,
      firstClickableRef: clickableRefs[0]?.textContent.trim() || null,
      allWBC3Mentions: allWBC3Text
    };
  });

  console.log('\n===== PAGE RENDERING ANALYSIS =====');
  console.log('Has equipment heading:', pageAnalysis.hasEquipmentHeading);
  console.log('Equipment cards/sections found:', pageAnalysis.equipmentCardsCount);
  console.log('Clickable references (buttons):', pageAnalysis.clickableRefsCount);
  console.log('Static references (spans):', pageAnalysis.staticRefsCount);
  console.log('TOTAL references rendered:', pageAnalysis.totalRefsRendered);

  if (pageAnalysis.allWBC3Mentions.length > 0) {
    console.log('\nAll WBC3 text mentions found on page:');
    pageAnalysis.allWBC3Mentions.forEach(text => console.log('  -', text));
  }

  console.log('\n📍 Step 6: Testing React component state...');

  const reactState = await page.evaluate(() => {
    // Try to access React component state through DOM
    const resultsContainer = document.querySelector('main') || document.querySelector('[class*="results"]');

    return {
      mainElementExists: !!resultsContainer,
      bodyClasses: document.body.className,
      mainClasses: resultsContainer?.className || 'not found'
    };
  });

  console.log('\n===== REACT COMPONENT STATE =====');
  console.log('Main results container exists:', reactState.mainElementExists);
  console.log('Body classes:', reactState.bodyClasses);
  console.log('Main container classes:', reactState.mainClasses);

  console.log('\n📍 Step 7: Checking for JavaScript errors or import issues...');

  const jsErrors = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    return {
      scriptCount: scripts.length,
      hasNextScripts: scripts.some(s => s.src.includes('_next'))
    };
  });

  console.log('Scripts loaded:', jsErrors.scriptCount);
  console.log('Next.js scripts present:', jsErrors.hasNextScripts);

  console.log('\n\n========== DIAGNOSTIC SUMMARY ==========\n');

  if (localStorageData.equipmentCount > 0 && pageAnalysis.totalRefsRendered === 0) {
    console.log('🔴 CRITICAL: Data stored correctly but NOT rendering on page!');
    console.log('   → localStorage has', localStorageData.equipmentCount, 'equipment items');
    console.log('   → Page shows 0 reference badges');
    console.log('   → LIKELY CAUSE: React component not reading from localStorage');
    console.log('   → OR: Conditional rendering logic broken');
  } else if (localStorageData.equipmentCount === 0) {
    console.log('🔴 CRITICAL: No equipment data in localStorage!');
    console.log('   → Form submission may have failed');
    console.log('   → API may not be returning equipment array');
  } else if (pageAnalysis.totalRefsRendered > 0) {
    console.log('✅ SUCCESS: References are rendering!');
    console.log('   → Clickable:', pageAnalysis.clickableRefsCount);
    console.log('   → Static:', pageAnalysis.staticRefsCount);
  }

  console.log('\nBrowser stays open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
})();
