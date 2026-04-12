const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 COMPREHENSIVE CREW CHECKER TEST - ENGINEERING REQUIREMENTS\n');
  console.log('=============================================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  // Test Scenario 1: Large vessel with high power - SHOULD show engineering requirements
  console.log('📋 TEST 1: Large tug with 1200kW (should require engineering certificate)\n');

  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Fill form for large vessel
  await page.fill('input[name="vesselName"]', 'TEST TUG LARGE - 1200kW');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '4');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200'); // High power - should require engineering cert

  console.log('✅ Form filled with 1200kW engine power\n');

  // Submit and wait for results
  await page.click('button[type="submit"]');
  console.log('⏳ Submitting form...\n');
  await page.waitForTimeout(3000);

  // Check if we're on results page
  const url1 = page.url();
  if (!url1.includes('/results')) {
    console.log('❌ FAILED: Did not redirect to results page');
    console.log(`Current URL: ${url1}\n`);

    // Check for errors
    const errorDiv = await page.$('.bg-red-50');
    if (errorDiv) {
      const errorText = await errorDiv.textContent();
      console.log(`Error found: ${errorText}\n`);
    }
  } else {
    console.log('✅ Redirected to results page\n');

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Check for Engineering section
    const engineeringSection = await page.$('h2:has-text("Engineering Requirements")');

    if (engineeringSection) {
      console.log('🎉 SUCCESS: Engineering Requirements section FOUND!\n');

      // Get the engineering requirements text
      const engineeringContent = await page.evaluate(() => {
        const section = document.querySelector('h2:has-text("Engineering Requirements")');
        if (section) {
          const parent = section.closest('div');
          return parent ? parent.textContent : '';
        }
        return '';
      });

      console.log('Engineering Section Content:');
      console.log('----------------------------');
      console.log(engineeringContent.substring(0, 500));
      console.log('...\n');

    } else {
      console.log('❌ FAILED: Engineering Requirements section NOT FOUND!\n');

      // Let's check what sections ARE present
      console.log('Sections found on page:');
      const sections = await page.evaluate(() => {
        const h2s = document.querySelectorAll('h2');
        return Array.from(h2s).map(h2 => h2.textContent);
      });
      sections.forEach(section => console.log(`  - ${section}`));
      console.log('');
    }

    // Check the raw localStorage data
    const resultsData = await page.evaluate(() => {
      const data = localStorage.getItem('crewResults');
      return data ? JSON.parse(data) : null;
    });

    console.log('Raw API Response Summary:');
    console.log('-------------------------');
    if (resultsData && resultsData.data) {
      console.log(`Total Requirements: ${resultsData.data.summary?.totalRequirements || 'N/A'}`);
      console.log(`Categories: ${Object.keys(resultsData.data.requirements || {}).join(', ')}\n`);

      // Check if engineering requirements exist in data
      if (resultsData.data.requirements) {
        const engReqs = resultsData.data.requirements['Engineering Qualifications'] ||
                       resultsData.data.requirements['Engineering'] ||
                       resultsData.data.requirements['Engineer'];

        if (engReqs && engReqs.length > 0) {
          console.log(`✅ Engineering requirements in API data: ${engReqs.length} items`);
          console.log('Engineering items:');
          engReqs.forEach(req => {
            console.log(`  - ${req.name} (${req.appliesTo})`);
          });
          console.log('');
        } else {
          console.log('❌ No engineering requirements in API data!\n');
        }
      }
    }
  }

  console.log('\n=============================================================');
  console.log('TEST 2: Small vessel with low power (should NOT require engineering)\n');

  // Go back to form
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Fill form for small vessel
  await page.fill('input[name="vesselName"]', 'TEST SMALL - 100kW');
  await page.selectOption('select[name="vesselType"]', 'workboat');
  await page.fill('input[name="lengthOverall"]', '10');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="crewCount"]', '2');
  await page.selectOption('select[name="category"]', 'cat5');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '100'); // Low power - should NOT require engineering cert

  console.log('✅ Form filled with 100kW engine power\n');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  const url2 = page.url();
  if (url2.includes('/results')) {
    console.log('✅ Redirected to results page\n');
    await page.waitForTimeout(2000);

    const engineeringSection2 = await page.$('h2:has-text("Engineering Requirements")');

    if (engineeringSection2) {
      console.log('⚠️  Engineering Requirements section found (may be acceptable if shows "none required")\n');
    } else {
      console.log('✅ Engineering Requirements section correctly NOT shown for low-power vessel\n');
    }
  }

  console.log('\n=============================================================');
  console.log('FINAL SUMMARY:');
  console.log('=============================================================\n');
  console.log('Test 1: 1200kW vessel SHOULD show engineering requirements');
  console.log('Test 2: 100kW vessel should NOT show engineering requirements');
  console.log('\nBrowser will stay open for 60 seconds for manual review...\n');

  await page.waitForTimeout(60000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
