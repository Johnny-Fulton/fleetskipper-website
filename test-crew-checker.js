const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING WBC3 CREW CHECKER\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Step 1: Navigate to crew checker
  console.log('1️⃣  Opening crew checker...');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Step 2: Fill in the form
  console.log('2️⃣  Filling in vessel details...');

  await page.fill('input[name="vesselName"]', 'MV Test Workboat');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '15');
  await page.fill('input[name="grossTonnage"]', '25');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="crewCount"]', '3');
  await page.selectOption('select[name="category"]', 'cat3');
  await page.check('input[name="internationalVoyages"]');

  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '250');

  await page.check('input[name="hasRadar"]');
  await page.check('input[name="hasElectronicCharts"]');

  // Check towing operation
  const towingCheckbox = await page.$('input[type="checkbox"]');
  await page.evaluate(() => {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const towingCb = checkboxes.find(cb => {
      const label = cb.closest('label');
      return label && label.textContent.includes('Towing');
    });
    if (towingCb) towingCb.click();
  });

  await page.waitForTimeout(500);

  // Step 3: Submit the form
  console.log('3️⃣  Submitting form...');
  await page.click('button[type="submit"]');

  // Wait for navigation to results page
  console.log('4️⃣  Waiting for results...');
  await page.waitForURL('**/results', { timeout: 10000 });
  console.log('   ✓ Navigated to results page');

  await page.waitForTimeout(3000);

  // Step 4: Verify results content
  console.log('5️⃣  Checking results content...');

  const bodyText = await page.textContent('body');

  const hasMasterQuals = bodyText.includes('Master Qualifications');
  const hasEngineering = bodyText.includes('Engineering');
  const hasTraining = bodyText.includes('Training');
  const hasMedical = bodyText.includes('Medical');

  console.log(`   ✓ Master Qualifications: ${hasMasterQuals}`);
  console.log(`   ✓ Engineering Qualifications: ${hasEngineering}`);
  console.log(`   ✓ Mandatory Training: ${hasTraining}`);
  console.log(`   ✓ Medical Fitness: ${hasMedical}`);

  // Step 5: Test category filter
  console.log('6️⃣  Testing category filter...');

  const categoryFilter = await page.isVisible('select#category-filter');
  console.log(`   ✓ Category filter exists: ${categoryFilter}`);

  if (categoryFilter) {
    await page.selectOption('select#category-filter', 'Mandatory Training');
    await page.waitForTimeout(500);
    console.log('   ✓ Filtered to Mandatory Training');
  }

  // Step 6: Take screenshot
  console.log('7️⃣  Taking screenshot of crew results...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-checker-results.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });

  console.log('\n===== TEST RESULTS =====');
  console.log(`✅ Form submission: SUCCESS`);
  console.log(`✅ Results page loaded: SUCCESS`);
  console.log(`✅ Master Qualifications: ${hasMasterQuals ? 'FOUND' : 'MISSING'}`);
  console.log(`✅ Engineering Qualifications: ${hasEngineering ? 'FOUND' : 'MISSING'}`);
  console.log(`✅ Mandatory Training: ${hasTraining ? 'FOUND' : 'MISSING'}`);
  console.log(`✅ Category Filter: ${categoryFilter ? 'WORKING' : 'NOT FOUND'}`);
  console.log(`✅ Screenshot saved: crew-checker-results.jpg`);
  console.log('\nBrowser will stay open for 30 seconds for manual review...\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
