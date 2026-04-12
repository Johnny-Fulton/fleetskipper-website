const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING NEW CARD-BASED CREW RESULTS PAGE\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  //  Navigate to results page and inject mock data via localStorage
  console.log('1️⃣  Loading results page with mock data...');
  await page.goto('http://localhost:3002/tools/crew-checker/results', { waitUntil: 'networkidle' });
  
  // Inject mock crew check results into localStorage
  await page.evaluate(() => {
    const mockResults = {
      vesselInfo: {
        name: "MV Test Vessel",
        type: "tug",
        category: 3,
        length: 18,
        grossTonnage: 30,
        enginePowerKW: 350
      },
      masterRequirements: {
        certificateRequired: "Boatmaster License T3 or higher",
        category: 3
      },
      secondPerson: {
        required: true,
        certificateRequired: "No certificate required for Category 3. Owner/operator must consider person experienced and competent."
      },
      engineeringQualifications: {
        required: true,
        qualification: "Approved Engine Course (Part 1) or demonstrated competency"
      },
      trainingRequirements: [
        { name: "Sea Survival", required: "All crew", type: "universal" },
        { name: "Medical Fitness (ENG1)", required: "All crew", type: "universal" },
        { name: "Fire Fighting", required: "Minimum 1 crew member (vessel <15m)", type: "universal" },
        { name: "First Aid", required: "Minimum 1 person", type: "minimum" },
        { name: "Radar Training", required: "Master + crew using radar", type: "conditional" }
      ],
      _meta: {
        hasRadar: true,
        hasElectronicCharts: false,
        hasStabilityBooklet: false,
        crewPreparesFood: false
      }
    };
    localStorage.setItem('crewCheckResults', JSON.stringify(mockResults));
  });

  // Reload to pick up the localStorage data
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Step 2: Check for new cards
  console.log('2️⃣  Checking for new card-based layout...');
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

  // Step 3: Take screenshots
  console.log('\n3️⃣  Taking screenshots...');

  // Top of page
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-new-top.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 1: Top of page saved');

  // Scroll to middle
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-results-new-middle.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('   ✓ Screenshot 2: Middle section saved');

  console.log('\n===== TEST RESULTS =====');
  console.log('✅ Card-based layout: ' + (cards.length >= 4 ? 'YES' : 'NO'));
  console.log('✅ All expected cards found: ' + (allCrewCard && masterCard && additionalCrewCard && minCoverageCard ? 'YES' : 'NO'));
  console.log('📸 Screenshots saved to Desktop');
  console.log('\nBrowser will stay open for 30 seconds for review...\ n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
