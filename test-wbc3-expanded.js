const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 WBC3 EXPANDED FORM TEST\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('1️⃣  Opening WBC3 checker page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  // Take screenshot of the full form
  console.log('2️⃣  Taking screenshot of expanded form...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-expanded-form.jpg',
    type: 'jpeg',
    quality: 50,
    fullPage: false
  });

  // Fill in basic vessel info
  console.log('3️⃣  Filling in basic vessel information...');
  await page.fill('input[name="vesselName"]', 'MV Test Workboat');
  await page.fill('input[name="lengthOverall"]', '12.5');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');

  // Select area of operation
  await page.selectOption('select[name="category"]', 'cat5');

  // Test propulsion configuration dropdown
  console.log('4️⃣  Testing propulsion configuration options...');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.waitForTimeout(500);

  // Fill engine power
  await page.fill('input[name="enginePowerKW"]', '150');

  // Test vessel structure checkboxes
  console.log('5️⃣  Testing vessel structure fields...');
  await page.uncheck('input[name="isOpenBoat"]'); // Uncheck open boat
  await page.check('input[name="hasWheelhouse"]');
  await page.check('input[name="hasAccommodation"]');
  await page.check('input[name="hasSleeping"]');

  // Test galley fields
  console.log('6️⃣  Testing galley & fire risk fields...');
  await page.check('input[name="hasGalley"]');

  // Wait for conditional field to appear
  await page.waitForTimeout(500);

  // Check if galley heat source dropdown appears
  const galleyHeatSourceVisible = await page.isVisible('select[name="galleyHeatSource"]');
  console.log(`   ✓ Galley heat source field is ${galleyHeatSourceVisible ? 'VISIBLE' : 'HIDDEN'} (should be VISIBLE)`);

  if (galleyHeatSourceVisible) {
    await page.selectOption('select[name="galleyHeatSource"]', 'gas');
  }

  await page.check('input[name="hasHeating"]');
  await page.check('input[name="hasLithiumBattery"]');

  // Test life saving equipment
  console.log('7️⃣  Testing life saving equipment fields...');
  await page.selectOption('select[name="lifejacketType"]', 'inflatable');
  await page.selectOption('select[name="waterTemperature"]', 'at_or_below_10c');

  // Scroll down to see submit button
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Take screenshot before submission
  console.log('8️⃣  Taking screenshot before form submission...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-form-filled.jpg',
    type: 'jpeg',
    quality: 50,
    fullPage: false
  });

  // Submit the form
  console.log('9️⃣  Submitting form with comprehensive vessel data...');
  await page.click('button[type="submit"]');

  // Wait for navigation to results page
  await page.waitForURL('**/results', { timeout: 10000 });
  console.log('   ✓ Navigated to results page');

  await page.waitForTimeout(3000);

  // Take screenshot of results
  console.log('🔟 Taking screenshot of results page...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-results-comprehensive.jpg',
    type: 'jpeg',
    quality: 50,
    fullPage: false
  });

  // Extract key results
  const totalRequirements = await page.textContent('body').then(text => {
    const match = text.match(/(\d+)\s+Total Requirements/);
    return match ? parseInt(match[1]) : 0;
  });

  const mandatoryCount = await page.textContent('body').then(text => {
    const match = text.match(/(\d+)\s+Mandatory/);
    return match ? parseInt(match[1]) : 0;
  });

  console.log('\n===== WBC3 TEST RESULTS =====');
  console.log('✅ Form submitted successfully');
  console.log(`✅ Total Requirements: ${totalRequirements}`);
  console.log(`✅ Mandatory Requirements: ${mandatoryCount}`);
  console.log('✅ Screenshots saved to Desktop:');
  console.log('   - wbc3-expanded-form.jpg (initial form)');
  console.log('   - wbc3-form-filled.jpg (filled form)');
  console.log('   - wbc3-results-comprehensive.jpg (results)');
  console.log('\nBrowser will stay open for 30 seconds for manual review...\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
