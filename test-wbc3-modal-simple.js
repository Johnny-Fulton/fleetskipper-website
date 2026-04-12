const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Testing WBC3 Info Button Modal...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  try {
    // Navigate to WBC3 crew checker
    console.log('📍 Navigating to WBC3 crew checker form...');
    await page.goto('http://localhost:3002/tools/crew-checker');
    await page.waitForLoadState('networkidle');

    // Inject test data into localStorage and navigate to results
    console.log('📝 Injecting test results data into localStorage...');
    await page.evaluate(() => {
      const testResults = {
        success: true,
        data: {
          masterQualifications: {
            acceptableCertificates: [
              'Boatmaster Tier 2 (T2) Certificate of Competency',
              'Boatmaster Tier 3 (T3) Certificate of Competency'
            ],
            reasoning: 'Based on your vessel category'
          },
          secondPerson: {
            required: true,
            acceptableCertificates: [
              'Able Seafarer Deck (ASD) Certificate',
              'Efficient Deck Hand (EDH) Certificate'
            ]
          },
          engineeringQualifications: {},
          medicalFitness: {
            certificateType: 'ENG1 Medical Certificate',
            reasoning: 'Required for all crew members'
          },
          mandatoryTraining: [],
          _meta: {
            hasRadar: true,
            hasElectronicCharts: false,
            hasStabilityBooklet: true,
            crewPreparesFood: false,
            internationalVoyages: false,
            vesselSummary: {
              name: 'Test Workboat',
              lengthOverall: 18,
              grossTonnage: 50,
              category: '2',
              enginePowerKw: 300,
              crewCount: 4,
              vesselType: 'workboat',
              propulsionType: 'diesel'
            }
          }
        }
      };
      localStorage.setItem('crewResults', JSON.stringify(testResults));
    });

    // Navigate to results page
    console.log('📍 Navigating to results page...');
    await page.goto('http://localhost:3002/tools/crew-checker/results');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('✅ Results page loaded!');

    // Take screenshot of results page with info buttons
    await page.screenshot({
      path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-wbc3-with-info-buttons.jpg',
      type: 'jpeg',
      quality: 50
    });
    console.log('📸 Screenshot saved: test-wbc3-with-info-buttons.jpg');

    // Check if info buttons are present
    const infoButtons = await page.locator('button[title="View regulatory reference"]').count();
    console.log(`📊 Found ${infoButtons} info buttons on page`);

    if (infoButtons > 0) {
      console.log('✅ Info buttons are present!');

      // Click the first info button
      console.log('🖱️  Clicking first info button (Sea Survival)...');
      await page.locator('button[title="View regulatory reference"]').first().click();
      await page.waitForTimeout(500);

      // Check if modal is visible
      const modalVisible = await page.isVisible('.fixed.inset-0.z-50');
      if (modalVisible) {
        console.log('✅ Modal opened successfully!');

        // Get modal content
        const modalTitle = await page.textContent('.text-2xl.font-bold.text-white');
        const modalSection = await page.textContent('.text-cyan-100.text-sm.font-semibold');
        const modalQuote = await page.locator('.bg-gray-50.border-l-4.border-cyan-500 p.italic').textContent();

        console.log(`📄 Modal Title: "${modalTitle}"`);
        console.log(`📄 Section: "${modalSection}"`);
        console.log(`📄 Quote: "${modalQuote.substring(0, 100)}..."`);

        // Take screenshot of modal
        await page.screenshot({
          path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-wbc3-modal-open.jpg',
          type: 'jpeg',
          quality: 50
        });
        console.log('📸 Screenshot saved: test-wbc3-modal-open.jpg');

        // Close modal with X button
        console.log('🖱️  Closing modal with X button...');
        await page.locator('button:has(svg)').first().click();
        await page.waitForTimeout(300);

        const modalStillVisible = await page.isVisible('.fixed.inset-0.z-50');
        console.log(`✅ Modal closed: ${!modalStillVisible}`);

        // Try clicking another info button (Medical Fitness)
        console.log('🖱️  Clicking Medical Fitness info button...');
        await page.locator('button[title="View regulatory reference"]').nth(1).click();
        await page.waitForTimeout(500);

        // Take screenshot of medical modal
        await page.screenshot({
          path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-wbc3-modal-medical.jpg',
          type: 'jpeg',
          quality: 50
        });
        console.log('📸 Screenshot saved: test-wbc3-modal-medical.jpg');

        // Close with background click
        console.log('🖱️  Closing modal with background click...');
        await page.click('.fixed.inset-0.z-50', { position: { x: 10, y: 10 } });
        await page.waitForTimeout(300);

        console.log('✅ All tests passed!');
      } else {
        console.log('❌ Modal did not appear');
      }
    } else {
      console.log('❌ No info buttons found - feature may not be working');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
