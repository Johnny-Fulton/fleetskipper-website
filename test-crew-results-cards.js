const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING NEW CARD-BASED CREW RESULTS PAGE\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Step 1: Fill in crew checker form
  console.log('1️⃣  Filling in crew checker form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });

  await page.fill('input[name="vesselName"]', 'MV Test Vessel');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '18');
  await page.fill('input[name="grossTonnage"]', '30');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="crewCount"]', '3');
  await page.selectOption('select[name="category"]', 'cat3');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '350');

  // Check equipment boxes
  await page.check('input[name="hasRadar"]');
  await page.check('input[name="hasElectronicCharts"]');

  await page.waitForTimeout(500);

  // Step 2: Submit
  console.log('2️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/results', { timeout: 10000 });

  await page.waitForTimeout(2000);

  // Step 3: Check for new cards
  console.log('3️⃣  Checking for new card-based layout...');
  const cards = await page.$$('[class*="border-l-4"]');
  console.log('   ✓ Found ' + cards.length + ' cards with border-l-4 styling');

  // Check for specific card headers
  const allCrewCard = await page.$('text=ALL CREW');
  const masterCard = await page.$('text=MASTER');
  const additionalCrewCard = await page.$('text=ADDITIONAL CREW');
  const minCoverageCard = await page.$('text=MINIMUM COVERAGE');

  console.log('   ✓ ALL CREW card found: ' + (allCrewCard ? 'YES' : 'NO'));
  console.log('   ✓ MASTER card found: ' + (masterCard ? 'YES' : 'NO'));
  console.log('   ✓ ADDITIONAL CREW card found: ' + (additionalCrewCard ? 'YES' : 'NO'));
  console.log('   ✓ MINIMUM COVERAGE card found: ' + (minCoverageCard ? 'YES' : 'NO'));

  // Check for WBC3 table buttons
  const wbc3TableButtons = await page.$$('button:has-text("View WBC3 Table")');
  console.log('   ✓ WBC3 Table buttons found: ' + wbc3TableButtons.length);

  // Step 4: Take screenshots
  console.log('\n4️⃣  Taking screenshots...');

  // Top of page
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-new-top.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 1: Top of page saved');

  // Scroll to middle
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-new-middle.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 2: Middle section saved');

  // Click a WBC3 table to expand it
  if (wbc3TableButtons.length > 0) {
    console.log('\n5️⃣  Expanding first WBC3 table...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await wbc3TableButtons[0].click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: '/Users/jonathanfulton/Desktop/crew-results-wbc3-expanded.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
    console.log('   ✓ Screenshot 3: WBC3 table expanded saved');
  }

  console.log('\n===== TEST RESULTS =====');
  console.log('✅ Card-based layout: ' + (cards.length >= 4 ? 'YES' : 'NO'));
  console.log('✅ All expected cards found: ' + (allCrewCard && masterCard && additionalCrewCard && minCoverageCard ? 'YES' : 'NO'));
  console.log('✅ WBC3 tables embedded: ' + (wbc3TableButtons.length >= 3 ? 'YES' : 'NO'));
  console.log('📸 Screenshots saved to Desktop');
  console.log('\nBrowser will stay open for 30 seconds for review...\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
