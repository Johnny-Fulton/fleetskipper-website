const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING WBC3 CATEGORY FILTERING\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Step 1: Navigate to WBC3 checker
  console.log('1️⃣  Opening WBC3 checker...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Step 2: Fill in the comprehensive form
  console.log('2️⃣  Filling in vessel details...');

  await page.fill('input[name="vesselName"]', 'MV Test Vessel');
  await page.fill('input[name="lengthOverall"]', '12.5');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');
  await page.selectOption('select[name="category"]', 'cat5');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '150');
  await page.check('input[name="hasWheelhouse"]');
  await page.check('input[name="hasAccommodation"]');
  await page.check('input[name="hasGalley"]');
  await page.waitForTimeout(500);
  await page.selectOption('select[name="galleyHeatSource"]', 'gas');
  await page.selectOption('select[name="lifejacketType"]', 'inflatable');
  await page.selectOption('select[name="waterTemperature"]', 'at_or_below_10c');
  await page.selectOption('select[name="gmdssSeaArea"]', 'A1');

  // Step 3: Submit the form
  console.log('3️⃣  Submitting form...');
  await page.click('button[type="submit"]');

  // Wait for navigation to results page
  await page.waitForURL('**/results', { timeout: 10000 });
  console.log('   ✓ Navigated to results page');

  await page.waitForTimeout(3000);

  // Step 4: Check filtering UI exists
  console.log('4️⃣  Checking filter UI...');

  const categoryFilterExists = await page.isVisible('select#category-filter');
  const typeFilterExists = await page.isVisible('select#type-filter');

  console.log(`   ✓ Category filter exists: ${categoryFilterExists}`);
  console.log(`   ✓ Type filter exists: ${typeFilterExists}`);

  // Step 5: Get initial results count
  const initialCount = await page.textContent('body').then(text => {
    const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
    return match ? { showing: parseInt(match[1]), total: parseInt(match[2]) } : null;
  });

  console.log(`   ✓ Initial results: Showing ${initialCount?.showing} of ${initialCount?.total} items`);

  // Step 6: Test category filtering
  console.log('5️⃣  Testing category filter...');

  // Get available categories
  const categories = await page.$$eval('select#category-filter option', options =>
    options.map(opt => ({ value: opt.value, text: opt.textContent })).filter(opt => opt.value !== 'all')
  );

  console.log(`   ✓ Found ${categories.length} categories:`, categories.map(c => c.text).join(', '));

  if (categories.length > 0) {
    // Select first category
    await page.selectOption('select#category-filter', categories[0].value);
    await page.waitForTimeout(500);

    const filteredCount = await page.textContent('body').then(text => {
      const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
      return match ? parseInt(match[1]) : 0;
    });

    console.log(`   ✓ After filtering by "${categories[0].text}": Showing ${filteredCount} items`);
  }

  // Step 7: Test type filter (Mandatory only)
  console.log('6️⃣  Testing type filter (Mandatory only)...');

  await page.selectOption('select#category-filter', 'all'); // Reset category
  await page.waitForTimeout(300);
  await page.selectOption('select#type-filter', 'mandatory');
  await page.waitForTimeout(500);

  const mandatoryCount = await page.textContent('body').then(text => {
    const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
    return match ? parseInt(match[1]) : 0;
  });

  console.log(`   ✓ Mandatory items only: ${mandatoryCount}`);

  // Step 8: Test combined filtering
  console.log('7️⃣  Testing combined filtering (Category + Mandatory)...');

  if (categories.length > 0) {
    await page.selectOption('select#category-filter', categories[0].value);
    await page.waitForTimeout(500);

    const combinedCount = await page.textContent('body').then(text => {
      const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
      return match ? parseInt(match[1]) : 0;
    });

    console.log(`   ✓ Combined filter ("${categories[0].text}" + Mandatory): ${combinedCount} items`);
  }

  // Step 9: Take screenshot
  console.log('8️⃣  Taking screenshot of filtered results...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-filtered-results.jpg',
    type: 'jpeg',
    quality: 50
  });

  console.log('\n===== TEST RESULTS =====');
  console.log(`✅ Total Requirements: ${initialCount?.total}`);
  console.log(`✅ Filter UI Working: ${categoryFilterExists && typeFilterExists}`);
  console.log(`✅ Categories Available: ${categories.length}`);
  console.log(`✅ Screenshot saved: wbc3-filtered-results.jpg`);
  console.log('\nBrowser will stay open for 20 seconds for manual review...\n');

  await page.waitForTimeout(20000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
