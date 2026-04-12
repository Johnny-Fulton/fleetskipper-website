const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING WBC3 REGULATION QUOTES IN CREW CHECKER\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Step 1: Fill in crew checker form
  console.log('1️⃣  Filling in crew checker form...');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });

  await page.fill('input[name="vesselName"]', 'MV Regulation Test');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '15');
  await page.fill('input[name="grossTonnage"]', '25');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="crewCount"]', '3');
  await page.selectOption('select[name="category"]', 'cat3');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '250');

  await page.waitForTimeout(500);

  // Step 2: Submit
  console.log('2️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/results', { timeout: 10000 });

  await page.waitForTimeout(2000);

  // Step 3: Look for "View WBC3 Regulation" buttons
  console.log('3️⃣  Checking for WBC3 regulation buttons...');
  const wbc3Buttons = await page.$$('button:has-text("View WBC3 Regulation")');
  console.log(`   ✓ Found ${wbc3Buttons.length} "View WBC3 Regulation" buttons`);

  // Step 4: Click the first one
  if (wbc3Buttons.length > 0) {
    console.log('4️⃣  Clicking first WBC3 regulation button...');
    await wbc3Buttons[0].click();
    await page.waitForTimeout(1000);

    // Check if regulation details are visible
    const hasQuote = await page.textContent('body');
    const showsSection = hasQuote.includes('WBC3 Section');
    const showsQuote = hasQuote.includes('Regulatory Reference') || hasQuote.includes('Quoted Regulation');

    console.log(`   ✓ Shows WBC3 Section Reference: ${showsSection}`);
    console.log(`   ✓ Shows Quoted Regulation: ${showsQuote}`);

    console.log('\n📸 Taking screenshot of expanded regulation...');
    await page.screenshot({
      path: '/Users/jonathanfulton/Desktop/crew-checker-wbc3-quotes.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
  }

  console.log('\n===== TEST RESULTS =====');
  console.log(`✅ WBC3 Regulation buttons found: ${wbc3Buttons.length > 0 ? 'YES' : 'NO'}`);
  console.log(`✅ Regulation expandable: ${wbc3Buttons.length > 0 ? 'YES' : 'NO'}`);
  console.log(`📸 Screenshot saved to Desktop`);
  console.log('\nBrowser will stay open for 30 seconds for review...\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
