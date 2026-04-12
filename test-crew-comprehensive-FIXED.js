const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 COMPREHENSIVE CREW CHECKER REQUIREMENTS TEST\n');
  console.log('============================================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  const results = [];

  // TEST 1: Large vessel with ALL equipment (should show ADDITIONAL TRAINING)
  console.log('📋 TEST 1: Large tug with ALL equipment\n');

  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'TEST 1 - ALL EQUIPMENT');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '12');
  await page.fill('input[name="crewCount"]', '6');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');

  // Check all equipment using data-testid
  await page.check('[data-testid="hasRadar"]');
  await page.check('[data-testid="hasElectronicCharts"]');
  await page.check('[data-testid="hasStabilityBooklet"]');
  await page.check('[data-testid="crewPreparesFood"]');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  if (page.url().includes('/results')) {
    await page.waitForTimeout(2000);
    const sections1 = await page.evaluate(() => {
      const h2s = document.querySelectorAll('h2');
      return Array.from(h2s).map(h2 => h2.textContent.trim()).filter(text => text && text !== 'Footer');
    });

    results.push({
      test: 'TEST 1: Large vessel with ALL equipment',
      sections: sections1,
      hasEngineering: sections1.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections1.some(s => s.toLowerCase().includes('additional training')),
    });

    console.log('   Sections found:', sections1.length);
    console.log('   Engineering:', results[0].hasEngineering ? '✅' : '❌');
    console.log('   Additional Training:', results[0].hasAdditionalTraining ? '✅' : '❌');
    console.log('');
  }

  // TEST 2: Small vessel with NO equipment
  console.log('📋 TEST 2: Small workboat with NO equipment\n');

  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'TEST 2 - NO EQUIPMENT');
  await page.selectOption('select[name="vesselType"]', 'workboat');
  await page.fill('input[name="lengthOverall"]', '10');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="crewCount"]', '2');
  await page.selectOption('select[name="category"]', 'cat5');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '100');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  if (page.url().includes('/results')) {
    await page.waitForTimeout(2000);
    const sections2 = await page.evaluate(() => {
      const h2s = document.querySelectorAll('h2');
      return Array.from(h2s).map(h2 => h2.textContent.trim()).filter(text => text && text !== 'Footer');
    });

    results.push({
      test: 'TEST 2: Small vessel with NO equipment',
      sections: sections2,
      hasEngineering: sections2.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections2.some(s => s.toLowerCase().includes('additional training')),
    });

    console.log('   Sections found:', sections2.length);
    console.log('   Engineering:', results[1].hasEngineering ? '⚠️  (should be NO)' : '✅ NO');
    console.log('   Additional Training:', results[1].hasAdditionalTraining ? '⚠️  (should be NO)' : '✅ NO');
    console.log('');
  }

  // TEST 3: Medium vessel with ONLY radar
  console.log('📋 TEST 3: Medium vessel with ONLY radar\n');

  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'TEST 3 - ONLY RADAR');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '18');
  await page.fill('input[name="grossTonnage"]', '80');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '3');
  await page.selectOption('select[name="category"]', 'cat3');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '600');

  await page.check('[data-testid="hasRadar"]');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  if (page.url().includes('/results')) {
    await page.waitForTimeout(2000);
    const sections3 = await page.evaluate(() => {
      const h2s = document.querySelectorAll('h2');
      return Array.from(h2s).map(h2 => h2.textContent.trim()).filter(text => text && text !== 'Footer');
    });

    results.push({
      test: 'TEST 3: Medium vessel with ONLY radar',
      sections: sections3,
      hasEngineering: sections3.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections3.some(s => s.toLowerCase().includes('additional training')),
    });

    console.log('   Sections found:', sections3.length);
    console.log('   Engineering:', results[2].hasEngineering ? '⚠️' : '✅ NO');
    console.log('   Additional Training (radar):', results[2].hasAdditionalTraining ? '✅ YES' : '❌ MISSING!');
    console.log('');
  }

  // SUMMARY
  console.log('\n============================================================');
  console.log('COMPREHENSIVE TEST RESULTS SUMMARY');
  console.log('============================================================\n');

  const test1Pass = results[0].hasEngineering && results[0].hasAdditionalTraining;
  const test2Pass = !results[1].hasEngineering && !results[1].hasAdditionalTraining;
  const test3Pass = results[2].hasAdditionalTraining;

  console.log(`Test 1 (All equipment): ${test1Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: Engineering + Additional Training`);
  console.log(`   Got: ${results[0].hasEngineering ? 'Engineering' : 'NO Engineering'}, ${results[0].hasAdditionalTraining ? 'Additional Training' : 'NO Additional Training'}\n`);

  console.log(`Test 2 (No equipment): ${test2Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: NO Engineering + NO Additional Training`);
  console.log(`   Got: ${results[1].hasEngineering ? 'Engineering' : 'NO Engineering'}, ${results[1].hasAdditionalTraining ? 'Additional Training' : 'NO Additional Training'}\n`);

  console.log(`Test 3 (Radar only): ${test3Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: Additional Training (for radar)`);
  console.log(`   Got: ${results[2].hasAdditionalTraining ? 'Additional Training' : 'NO Additional Training'}\n`);

  const allPass = test1Pass && test2Pass && test3Pass;
  console.log('============================================================');
  console.log(`OVERALL: ${allPass ? '🎉 ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED'}`);
  console.log('============================================================\n');

  console.log('Browser will stay open for 30 seconds for visual review...\n');
  await page.waitForTimeout(30000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
