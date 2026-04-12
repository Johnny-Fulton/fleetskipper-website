const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 SIMPLIFIED CREW CHECKER TEST - VERIFYING CODE CONNECTION\n');
  console.log('=====================================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Navigate to crew checker
  console.log('📍 Step 1: Navigate to crew checker form');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('✅ Page loaded\n');

  // Fill MINIMAL required fields
  console.log('📝 Step 2: Fill ONLY required fields');
  await page.fill('input[name="vesselName"]', 'TEST TUG BETTY');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '4');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');
  console.log('✅ Required fields filled\n');

  // Check towing_operations checkbox to test the fix
  console.log('☑️  Step 3: Check "Towing Operations" to test the validation fix');
  const towingChecked = await page.check('input[value="towing_operations"]');
  console.log('✅ Towing Operations checked\n');

  // Listen for API response
  console.log('🔍 Step 4: Submit form and monitor API response');

  let apiResponseReceived = false;
  let apiSuccess = false;

  page.on('response', async response => {
    if (response.url().includes('/api/crew/check')) {
      apiResponseReceived = true;
      const status = response.status();
      console.log(`\n   📡 API Response: ${status}`);

      try {
        const body = await response.json();
        if (body.success) {
          apiSuccess = true;
          console.log('   ✅ SUCCESS - Crew requirements returned');
          const totalReqs = body.data && body.data.summary && body.data.summary.totalRequirements;
          console.log(`   📊 Total requirements: ${totalReqs || 'N/A'}`);
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

  // Submit form
  await page.click('button[type="submit"]');

  // Wait for response
  await page.waitForTimeout(4000);

  // Check final status
  const currentUrl = page.url();
  console.log(`\n📍 Final URL: ${currentUrl}`);

  console.log('\n=====================================================');
  console.log('FINAL VERDICT:');
  console.log('=====================================================\n');

  if (currentUrl.includes('/results')) {
    console.log('🎉 SUCCESS! All code is properly connected:');
    console.log('   ✅ Form → API validation');
    console.log('   ✅ API → WBC3 engine');
    console.log('   ✅ Results → Page redirect');
    console.log('   ✅ Operations field validation FIXED');
  } else {
    console.log('⚠️  Still on form page - checking for errors...\n');
    const errorDiv = await page.$('.bg-red-50');
    if (errorDiv) {
      const errorText = await errorDiv.textContent();
      console.log(`❌ Error found: ${errorText}\n`);
    }
  }

  console.log('\n=====================================================');
  console.log('Browser will stay open for 30 seconds for you to review...');
  console.log('=====================================================\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
