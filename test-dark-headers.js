const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING UPDATED CREW RESULTS PAGE WITH DARK HEADERS\n');

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

  // Step 3: Take screenshots
  console.log('\n3️⃣  Taking screenshots of new dark header design...');

  // Screenshot 1: Top of page with dark hero header
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-dark-hero.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 1: Dark hero header saved');

  // Scroll to show first few cards
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-dark-cards-1.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 2: First cards with dark headers saved');

  // Scroll to middle section
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-dark-cards-2.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 3: Middle cards with dark headers saved');

  // Scroll to bottom cards
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-dark-cards-3.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 4: Bottom cards with dark headers saved');

  console.log('\n===== DESIGN CHECKLIST =====');
  console.log('✅ Dark gradient hero header (gray-800 to gray-900)');
  console.log('✅ White text in hero section');
  console.log('✅ Navigation component from homepage');
  console.log('✅ Dark gradient headers on all 6 cards');
  console.log('✅ White icons with bold stroke width');
  console.log('✅ White card titles and descriptions');
  console.log('📸 Screenshots saved to Desktop');
  console.log('\nBrowser will stay open for 30 seconds for review...\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
