const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 COMPREHENSIVE REQUIREMENT SECTIONS DISPLAY TEST\n');
  console.log('============================================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  const results = [];

  // TEST 1: Large vessel with radar, charts, stability booklet, food prep
  console.log('📋 TEST 1: Large tug with ALL equipment (should show ADDITIONAL TRAINING)\n');

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

  // Check all equipment that triggers ADDITIONAL TRAINING
  await page.check('input[name="hasRadar"]');
  await page.check('input[name="hasElectronicCharts"]');
  await page.check('input[name="hasStabilityBooklet"]');
  await page.check('input[name="crewPreparesFood"]');

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
      expected: ['ENGINEERING', 'ADDITIONAL TRAINING'],
      sections: sections1,
      hasEngineering: sections1.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections1.some(s => s.toLowerCase().includes('additional training')),
      hasAdditionalCrew: sections1.some(s => s.toLowerCase().includes('additional crew'))
    });

    console.log('   Sections found:');
    sections1.forEach(s => console.log(`      - ${s}`));
    console.log('');
  } else {
    console.log('   ❌ Failed to redirect to results\n');
  }

  // TEST 2: Small vessel with NO equipment
  console.log('📋 TEST 2: Small workboat with NO equipment (should NOT show ADDITIONAL TRAINING)\n');

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

  // DO NOT check any equipment

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
      expected: ['NO ENGINEERING', 'NO ADDITIONAL TRAINING'],
      sections: sections2,
      hasEngineering: sections2.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections2.some(s => s.toLowerCase().includes('additional training')),
      hasAdditionalCrew: sections2.some(s => s.toLowerCase().includes('additional crew'))
    });

    console.log('   Sections found:');
    sections2.forEach(s => console.log(`      - ${s}`));
    console.log('');
  } else {
    console.log('   ❌ Failed to redirect to results\n');
  }

  // TEST 3: Medium vessel with ONLY radar (should show ADDITIONAL TRAINING)
  console.log('📋 TEST 3: Medium vessel with ONLY radar (should show ADDITIONAL TRAINING)\n');

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

  // Check ONLY radar
  await page.check('input[name="hasRadar"]');

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
      expected: ['ADDITIONAL TRAINING (radar only)'],
      sections: sections3,
      hasEngineering: sections3.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections3.some(s => s.toLowerCase().includes('additional training')),
      hasAdditionalCrew: sections3.some(s => s.toLowerCase().includes('additional crew'))
    });

    console.log('   Sections found:');
    sections3.forEach(s => console.log(`      - ${s}`));
    console.log('');
  } else {
    console.log('   ❌ Failed to redirect to results\n');
  }

  // TEST 4: Large vessel with international voyages (may trigger ADDITIONAL CREW)
  console.log('📋 TEST 4: Large vessel with international voyages\n');

  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'TEST 4 - INTERNATIONAL');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '30');
  await page.fill('input[name="grossTonnage"]', '250');
  await page.fill('input[name="maxPersons"]', '12');
  await page.fill('input[name="crewCount"]', '6');
  await page.selectOption('select[name="category"]', 'cat1');
  await page.check('input[name="internationalVoyages"]');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '2000');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  if (page.url().includes('/results')) {
    await page.waitForTimeout(2000);
    const sections4 = await page.evaluate(() => {
      const h2s = document.querySelectorAll('h2');
      return Array.from(h2s).map(h2 => h2.textContent.trim()).filter(text => text && text !== 'Footer');
    });

    results.push({
      test: 'TEST 4: Large vessel with international voyages',
      expected: ['ENGINEERING', 'ADDITIONAL CREW (possibly)'],
      sections: sections4,
      hasEngineering: sections4.some(s => s.toLowerCase().includes('engineering')),
      hasAdditionalTraining: sections4.some(s => s.toLowerCase().includes('additional training')),
      hasAdditionalCrew: sections4.some(s => s.toLowerCase().includes('additional crew'))
    });

    console.log('   Sections found:');
    sections4.forEach(s => console.log(`      - ${s}`));
    console.log('');
  } else {
    console.log('   ❌ Failed to redirect to results\n');
  }

  // SUMMARY
  console.log('\n============================================================');
  console.log('COMPREHENSIVE TEST RESULTS SUMMARY');
  console.log('============================================================\n');

  results.forEach((result, idx) => {
    console.log(`${idx + 1}. ${result.test}`);
    console.log(`   Engineering: ${result.hasEngineering ? '✅ SHOWN' : '⚪ NOT SHOWN'}`);
    console.log(`   Additional Training: ${result.hasAdditionalTraining ? '✅ SHOWN' : '⚪ NOT SHOWN'}`);
    console.log(`   Additional Crew: ${result.hasAdditionalCrew ? '✅ SHOWN' : '⚪ NOT SHOWN'}`);
    console.log('');
  });

  console.log('============================================================');
  console.log('VERIFICATION:');
  console.log('============================================================\n');

  // Check Test 1
  const test1Pass = results[0].hasEngineering && results[0].hasAdditionalTraining;
  console.log(`Test 1 (All equipment): ${test1Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: Engineering + Additional Training`);
  console.log(`   Got: ${results[0].hasEngineering ? 'Engineering' : 'NO Engineering'}, ${results[0].hasAdditionalTraining ? 'Additional Training' : 'NO Additional Training'}\n`);

  // Check Test 2
  const test2Pass = !results[1].hasEngineering && !results[1].hasAdditionalTraining;
  console.log(`Test 2 (No equipment): ${test2Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: NO Engineering + NO Additional Training`);
  console.log(`   Got: ${results[1].hasEngineering ? 'Engineering' : 'NO Engineering'}, ${results[1].hasAdditionalTraining ? 'Additional Training' : 'NO Additional Training'}\n`);

  // Check Test 3
  const test3Pass = results[2].hasAdditionalTraining;
  console.log(`Test 3 (Radar only): ${test3Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: Additional Training (for radar)`);
  console.log(`   Got: ${results[2].hasAdditionalTraining ? 'Additional Training' : 'NO Additional Training'}\n`);

  // Check Test 4
  const test4Pass = results[3].hasEngineering;
  console.log(`Test 4 (International): ${test4Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Expected: Engineering (high power)`);
  console.log(`   Got: ${results[3].hasEngineering ? 'Engineering' : 'NO Engineering'}\n`);

  const allPass = test1Pass && test2Pass && test3Pass && test4Pass;
  console.log('============================================================');
  console.log(`OVERALL: ${allPass ? '🎉 ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED'}`);
  console.log('============================================================\n');

  console.log('Browser will stay open for 45 seconds for visual review...\n');
  await page.waitForTimeout(45000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
