const { chromium } = require('playwright');

(async () => {
  console.log('\n🎨 TESTING FINAL CREW RESULTS PAGE - BOTH FIXES APPLIED\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  // Step 1: Fill in crew checker form
  console.log('1️⃣  Navigating to crew checker...');
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

  await page.check('input[name="hasRadar"]');
  await page.check('input[name="hasElectronicCharts"]');

  await page.waitForTimeout(500);

  // Step 2: Submit
  console.log('2️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/results', { timeout: 10000 });

  await page.waitForTimeout(2000);

  // Step 3: Check hero section (should NOT overlap with nav)
  console.log('3️⃣  Checking hero section visibility...');
  const heroVisible = await page.evaluate(() => {
    const hero = document.querySelector('h1');
    if (!hero) return false;
    const rect = hero.getBoundingClientRect();
    // Hero should be visible (not covered by fixed nav at top)
    return rect.top > 60; // Should be below nav bar
  });
  console.log('   ✓ Hero title visible below nav:', heroVisible ? 'YES ✅' : 'NO ❌');

  // Step 4: Scroll to CTA card
  console.log('4️⃣  Scrolling to CTA card at bottom...');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1000);

  // Step 5: Check CTA card styling
  const ctaCardCheck = await page.evaluate(() => {
    const ctaSection = document.querySelector('div.bg-gradient-to-br');
    if (!ctaSection) return { found: false };
    
    const hasGradient = ctaSection.className.includes('from-teal');
    const orangeButton = ctaSection.querySelector('a[href="/contact"]');
    const whiteButton = ctaSection.querySelector('a[href="/tools/crew-checker"]');
    
    return {
      found: true,
      hasGradient,
      hasOrangeButton: !!orangeButton,
      hasWhiteButton: !!whiteButton
    };
  });

  console.log('   ✓ CTA card found:', ctaCardCheck.found ? 'YES ✅' : 'NO ❌');
  console.log('   ✓ Teal gradient background:', ctaCardCheck.hasGradient ? 'YES ✅' : 'NO ❌');
  console.log('   ✓ Orange "Get Expert Guidance" button:', ctaCardCheck.hasOrangeButton ? 'YES ✅' : 'NO ❌');
  console.log('   ✓ White "Start Over" button:', ctaCardCheck.hasWhiteButton ? 'YES ✅' : 'NO ❌');

  // Step 6: Take screenshots
  console.log('\n5️⃣  Taking screenshots...');

  // Scroll to top to see hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-FINAL-hero.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 1: Hero section saved');

  // Scroll to CTA
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-FINAL-cta.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 2: CTA card saved');

  console.log('\n===== FINAL TEST RESULTS =====');
  console.log('✅ Hero no longer hidden by nav:', heroVisible ? 'FIXED' : 'STILL BROKEN');
  console.log('✅ CTA card is prominent:', (ctaCardCheck.found && ctaCardCheck.hasGradient) ? 'FIXED' : 'STILL BROKEN');
  console.log('✅ CTA buttons visible:', (ctaCardCheck.hasOrangeButton && ctaCardCheck.hasWhiteButton) ? 'YES' : 'NO');
  console.log('📸 Screenshots saved to Desktop');
  console.log('\nBrowser will stay open for 30 seconds for review...\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
