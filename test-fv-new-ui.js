const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Testing FV Crew Checker New UI...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  try {
    // Navigate to FV crew checker form
    console.log('📍 Navigating to FV crew checker...');
    await page.goto('http://localhost:3002/tools/fv-crew-checker');
    await page.waitForLoadState('networkidle');

    // Inject test data into localStorage
    console.log('📝 Injecting test FV results data...');
    await page.evaluate(() => {
      const testResults = {
        crewRequirements: [
          {
            id: 'fv.train.doc.sea_survival',
            name: 'Sea Survival Training',
            category: 'training',
            subcategory: 'mandatory_training',
            appliesTo: 'all_crew',
            mandatory: true,
            notes: 'MCA approved sea survival training required for all crew'
          },
          {
            id: 'fv.med.doc.eng1',
            name: 'ENG1 Medical Fitness Certificate',
            category: 'medical',
            subcategory: 'medical_fitness',
            appliesTo: 'all_crew',
            mandatory: true,
            alternativeGroup: 'medical_cert'
          },
          {
            id: 'fv.med.doc.ml5',
            name: 'ML5 Medical Fitness Certificate',
            category: 'medical',
            subcategory: 'medical_fitness',
            appliesTo: 'all_crew',
            mandatory: true,
            alternativeGroup: 'medical_cert',
            notes: 'Alternative to ENG1 for <24m vessels'
          },
          {
            id: 'fv.crew.doc.coc.class2',
            name: 'Deck Officer Class 2 (Fishing Vessel) Certificate of Competency',
            category: 'qualification',
            subcategory: 'skipper_certificate',
            appliesTo: 'skipper',
            mandatory: true,
            notes: 'Mandatory CoC — vessels 16.5m to <24m RL'
          },
          {
            id: 'fv.crew.doc.coc.engineer.class1',
            name: 'Engineer Officer Class 1 (Fishing Vessel) Certificate of Competency',
            category: 'qualification',
            subcategory: 'engineer_certificate',
            appliesTo: 'engineer',
            mandatory: true,
            notes: 'Mandatory — vessels with 750kW+ propulsive power'
          }
        ],
        _meta: {
          msnLabel: 'MSN 1872 (F)',
          msnTier: 'Tier 2 - Vessels 16.5m to <24m RL',
          vesselSummary: {
            registeredLength: 18.5,
            lengthOverall: 19.8,
            enginePowerKW: 850
          }
        }
      };
      localStorage.setItem('fv-crew-check-results', JSON.stringify(testResults));
    });

    // Navigate to results page
    console.log('📍 Navigating to FV results page...');
    await page.goto('http://localhost:3002/tools/fv-crew-checker/results');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('✅ FV Results page loaded!');

    // Take screenshot of results page
    await page.screenshot({
      path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-fv-new-ui-results.jpg',
      type: 'jpeg',
      quality: 50
    });
    console.log('📸 Screenshot saved: test-fv-new-ui-results.jpg');

    // Check if info buttons are present
    const infoButtons = await page.locator('button[title="View regulatory reference"]').count();
    console.log(`📊 Found ${infoButtons} info buttons on page`);

    if (infoButtons > 0) {
      console.log('✅ Info buttons are present!');

      // Click first info button
      console.log('🖱️  Clicking first info button...');
      await page.locator('button[title="View regulatory reference"]').first().click();
      await page.waitForTimeout(500);

      // Check if modal is visible
      const modalVisible = await page.isVisible('.fixed.inset-0.z-50');
      if (modalVisible) {
        console.log('✅ Modal opened successfully!');

        // Take screenshot of modal
        await page.screenshot({
          path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/test-fv-modal-open.jpg',
          type: 'jpeg',
          quality: 50
        });
        console.log('📸 Screenshot saved: test-fv-modal-open.jpg');

        // Close modal
        await page.click('.fixed.inset-0.z-50', { position: { x: 10, y: 10 } });
        await page.waitForTimeout(300);

        console.log('✅ Modal closed');
      } else {
        console.log('❌ Modal did not appear');
      }
    } else {
      console.log('⚠️  No info buttons found');
    }

    console.log('✅ Test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
