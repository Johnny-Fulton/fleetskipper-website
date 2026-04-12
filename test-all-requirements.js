const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 COMPREHENSIVE REQUIREMENTS DISPLAY TEST\n');
  console.log('============================================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  console.log('📝 Submitting vessel with ALL features enabled...\n');
  console.log('   - International voyages: YES');
  console.log('   - High power (1500kW): YES');
  console.log('   - All 9 operations: CHECKED');
  console.log('   - All equipment: CHECKED\n');

  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Fill basic fields
  await page.fill('input[name="vesselName"]', 'COMPREHENSIVE TEST VESSEL');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '12');
  await page.fill('input[name="crewCount"]', '6');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.check('input[name="internationalVoyages"]');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1500');

  // Check all operations
  const operations = [
    'towing_operations',
    'high_speed_ops',
    'dangerous_goods',
    'mgo_supply',
    'pilot_transfer',
    'lifting_operations',
    'dive_support',
    'personnel_transfer',
    'patrol_operations'
  ];

  for (const op of operations) {
    await page.check(`input[value="${op}"]`);
  }

  // Check all equipment
  await page.check('input[name="hasRadar"]');
  await page.check('input[name="hasElectronicCharts"]');
  await page.check('input[name="hasStabilityBooklet"]');
  await page.check('input[name="crewPreparesFood"]');
  await page.check('input[name="operatesAtNight"]');
  await page.fill('input[name="maxSpeed"]', '30');

  // Submit form
  await page.click('button[type="submit"]');
  console.log('⏳ Submitting comprehensive test...\n');
  await page.waitForTimeout(3000);

  if (!page.url().includes('/results')) {
    console.log('❌ Failed to redirect to results page');
    await browser.close();
    return;
  }

  console.log('✅ Redirected to results page\n');
  await page.waitForTimeout(2000);

  // Get ALL h2 headings (card titles)
  const sections = await page.evaluate(() => {
    const h2s = document.querySelectorAll('h2');
    return Array.from(h2s).map(h2 => h2.textContent.trim()).filter(text => text && text !== 'Footer');
  });

  console.log('📊 SECTIONS FOUND ON PAGE:\n');
  console.log('============================================================\n');
  sections.forEach((section, idx) => {
    console.log(`  ${idx + 1}. ${section}`);
  });
  console.log('\n============================================================\n');

  // Check localStorage data to see what API returned
  const apiData = await page.evaluate(() => {
    const data = localStorage.getItem('crewResults');
    if (!data) return null;
    const parsed = JSON.parse(data);
    return {
      success: parsed.success,
      dataKeys: parsed.data ? Object.keys(parsed.data) : [],
      summary: parsed.data ? parsed.data.summary : null,
      categories: parsed.data ? Object.keys(parsed.data).filter(k => k !== 'summary' && k !== '_meta') : []
    };
  });

  console.log('📡 API RESPONSE ANALYSIS:\n');
  console.log('============================================================\n');
  console.log(`Success: ${apiData ? apiData.success : 'N/A'}`);
  console.log(`Total Requirements: ${apiData && apiData.summary ? apiData.summary.totalRequirements : 'N/A'}`);
  console.log(`\nData categories returned by API:`);
  if (apiData && apiData.categories) {
    apiData.categories.forEach((cat, i) => {
      console.log(`   ${i + 1}. ${cat}`);
    });
  }
  console.log('\n============================================================\n');

  // Compare API categories vs displayed sections
  console.log('🔍 DISPLAY CHECK:\n');
  console.log('============================================================\n');

  const expectedCategories = [
    'masterQualifications',
    'secondPerson',
    'engineeringQualifications',
    'mandatoryTraining',
    'medicalFitness',
    'specialOperations',
    'policeBoatManning',
    'singleHanded'
  ];

  for (const category of expectedCategories) {
    const hasData = apiData && apiData.categories && apiData.categories.includes(category);
    const displayed = sections.some(s => {
      const lower = s.toLowerCase();
      return (
        (category === 'masterQualifications' && lower.includes('master')) ||
        (category === 'secondPerson' && lower.includes('additional crew')) ||
        (category === 'engineeringQualifications' && lower.includes('engineering')) ||
        (category === 'mandatoryTraining' && lower.includes('universal')) ||
        (category === 'medicalFitness' && lower.includes('medical')) ||
        (category === 'specialOperations' && lower.includes('special')) ||
        (category === 'policeBoatManning' && lower.includes('police')) ||
        (category === 'singleHanded' && lower.includes('single'))
      );
    });

    const status = hasData && displayed ? '✅ SHOWN' :
                   hasData && !displayed ? '❌ HIDDEN (BUG!)' :
                   !hasData ? '⚪ No data' : '❓ Unknown';

    console.log(`${category.padEnd(30)} ${status}`);
  }

  console.log('\n============================================================\n');
  console.log('Browser will stay open for 60 seconds for visual review...\n');

  await page.waitForTimeout(60000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
