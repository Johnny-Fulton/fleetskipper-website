const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 COMPREHENSIVE CREW CHECKER FORM TEST\n');
  console.log('========================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Navigate to crew checker
  console.log('📍 Step 1: Navigate to crew checker form');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('✅ Page loaded\n');

  // Fill form
  console.log('📝 Step 2: Fill ALL form fields');
  await page.fill('input[name="vesselName"]', 'TEST VESSEL MV BETTY');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24.5');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '4');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.check('input[name="internationalVoyages"]');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');
  await page.check('input[name="isOpenBoat"]');
  console.log('✅ Basic fields filled\n');

  // Test operations checkboxes - scroll into view first
  console.log('📋 Step 3: Check all 9 operations');
  await page.evaluate(() => {
    const opsSection = document.querySelector('h2:has-text("Operations & Equipment")');
    if (opsSection) opsSection.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(500);

  const operations = [
    { value: 'towing_operations', label: 'Towing Operations' },
    { value: 'high_speed_ops', label: 'High Speed Operations' },
    { value: 'dangerous_goods', label: 'Dangerous Goods' },
    { value: 'mgo_supply', label: 'Marine Gas Oil' },
    { value: 'pilot_transfer', label: 'Pilot Transfer' },
    { value: 'lifting_operations', label: 'Lifting Operations' },
    { value: 'dive_support', label: 'Dive Support' },
    { value: 'personnel_transfer', label: 'Personnel Transfer' },
    { value: 'patrol_operations', label: 'Patrol Operations' }
  ];

  let checkedCount = 0;
  for (const op of operations) {
    try {
      const checked = await page.check(`//label[contains(., "${op.label}")]/input[@type="checkbox"]`);
      checkedCount++;
      console.log(`   ✓ ${op.label}`);
    } catch (e) {
      console.log(`   ✗ FAILED: ${op.label} - ${e.message}`);
    }
  }
  console.log(`\n✅ Checked ${checkedCount}/${operations.length} operations\n`);

  // Equipment checkboxes
  console.log('⚙️  Step 4: Check equipment fields');
  await page.check('input[name="hasRadar"]');
  await page.check('input[name="hasElectronicCharts"]');
  await page.check('input[name="hasStabilityBooklet"]');
  await page.check('input[name="crewPreparesFood"]');
  await page.check('input[name="operatesAtNight"]');
  await page.fill('input[name="maxSpeed"]', '28');
  console.log('✅ Equipment fields complete\n');

  // Listen for API response
  console.log('🔍 Step 5: Submit form and monitor API response');

  let apiResponseReceived = false;
  page.on('response', async response => {
    if (response.url().includes('/api/crew/check')) {
      apiResponseReceived = true;
      const status = response.status();
      console.log(`\n   📡 API Response: ${status}`);

      try {
        const body = await response.json();
        if (body.success) {
          console.log('   ✅ SUCCESS - Crew requirements returned');
        } else {
          console.log('   ❌ VALIDATION ERRORS:');
          if (body.errors) {
            body.errors.forEach(err => {
              console.log(`      • ${err.field || 'general'}: ${err.message}`);
            });
          }
        }
      } catch (e) {
        console.log(`   ⚠️  Response parse error: ${e.message}`);
      }
    }
  });

  // Scroll to submit button and click
  await page.evaluate(() => {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(500);
  await page.click('button[type="submit"]');

  // Wait for response
  await page.waitForTimeout(4000);

  // Check final status
  const currentUrl = page.url();
  console.log(`\n📍 Final URL: ${currentUrl}`);

  if (currentUrl.includes('/results')) {
    console.log('\n🎉 SUCCESS! Form submitted and redirected to results page\n');
  } else {
    console.log('\n⚠️  Still on form page - checking for errors...\n');
    const errorDiv = await page.$('.bg-red-50');
    if (errorDiv) {
      const errorText = await errorDiv.textContent();
      console.log(`❌ Error found: ${errorText}\n`);
    }
  }

  console.log('========================================');
  console.log('Browser will stay open for 30 seconds...');
  console.log('========================================\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
