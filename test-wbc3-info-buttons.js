const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Testing WBC3 Info Buttons...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  try {
    // Navigate to WBC3 crew checker
    console.log('📍 Navigating to WBC3 crew checker...');
    await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });

    // Fill in the form with a test vessel (Category 2, 18m LOA)
    console.log('📝 Filling in vessel details...');
    await page.fill('input[name="vesselName"]', 'Test Workboat');
    await page.fill('input[name="lengthOverall"]', '18');
    await page.fill('input[name="grossTonnage"]', '50');
    await page.selectOption('select[name="areaCategory"]', '2'); // Category 2
    await page.fill('input[name="crewCount"]', '4');
    await page.fill('input[name="enginePowerKw"]', '300');

    // Submit the form
    console.log('✅ Submitting form...');
    await page.click('button[type="submit"]');

    // Wait for results page
    console.log('⏳ Waiting for results...');
    await page.waitForURL('**/tools/crew-checker/results', { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    console.log('✅ Results page loaded!');

    // Check if info buttons are present
    const infoButtons = await page.locator('button[title="View regulatory reference"]').count();
    console.log(`📊 Found ${infoButtons} info buttons`);

    if (infoButtons > 0) {
      console.log('✅ Info buttons are present!');

      // Click the first info button (Sea Survival)
      console.log('🖱️  Clicking first info button...');
      await page.locator('button[title="View regulatory reference"]').first().click();

      // Wait for modal to appear
      await page.waitForTimeout(500);

      // Check if modal is visible
      const modalVisible = await page.isVisible('.fixed.inset-0.z-50');
      if (modalVisible) {
        console.log('✅ Modal opened successfully!');

        // Check modal content
        const modalTitle = await page.textContent('.text-2xl.font-bold.text-white');
        const modalSection = await page.textContent('.text-cyan-100.text-sm.font-semibold');
        console.log(`📄 Modal Title: ${modalTitle}`);
        console.log(`📄 Modal Section: ${modalSection}`);

        // Take screenshot of modal
        await page.screenshot({
          path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-wbc3-modal.jpg',
          type: 'jpeg',
          quality: 50
        });
        console.log('📸 Screenshot saved: test-wbc3-modal.jpg');

        // Close modal
        await page.click('button:has-text("Close")');
        console.log('✅ Modal closed');
      } else {
        console.log('❌ Modal did not appear');
      }
    } else {
      console.log('❌ No info buttons found on page');
    }

    // Take full screenshot of results page
    await page.screenshot({
      path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-wbc3-results.jpg',
      type: 'jpeg',
      quality: 50
    });
    console.log('📸 Screenshot saved: test-wbc3-results.jpg');

    console.log('✅ Test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
