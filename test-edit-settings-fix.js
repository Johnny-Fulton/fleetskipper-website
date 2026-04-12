const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING EDIT SETTINGS FIX\n');
  console.log('========================================\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Step 1: Submit FIRST search with towing operations
  console.log('📝 Step 1: Submit FIRST search (24m tug WITH towing)');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'FIRST SEARCH - TUG WITH TOWING');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '4');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');

  // Check towing operations
  await page.check('input[value="towing_operations"]');
  console.log('   ✓ Towing operations CHECKED');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  const url1 = page.url();
  console.log(`   Result: ${url1.includes('/results') ? '✅ Redirected to results' : '❌ Failed'}\n`);

  // Step 2: Go back and submit SECOND search WITHOUT towing
  console.log('📝 Step 2: Submit SECOND search (24m tug WITHOUT towing)');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.fill('input[name="vesselName"]', 'SECOND SEARCH - TUG NO TOWING');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.fill('input[name="lengthOverall"]', '24');
  await page.fill('input[name="grossTonnage"]', '150');
  await page.fill('input[name="maxPersons"]', '8');
  await page.fill('input[name="crewCount"]', '4');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_inboard_below');
  await page.fill('input[name="enginePowerKW"]', '1200');

  // DO NOT check towing operations
  console.log('   ✓ Towing operations NOT CHECKED');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  const url2 = page.url();
  console.log(`   Result: ${url2.includes('/results') ? '✅ Redirected to results' : '❌ Failed'}\n`);

  // Step 3: Now we're viewing SECOND search results. Click "Edit Settings"
  console.log('🔍 Step 3: Click "Edit Settings" from SECOND search results');
  await page.click('a:has-text("Edit Settings")');
  await page.waitForTimeout(2000);

  // Step 4: Verify form loaded with SECOND search data (NOT first search)
  console.log('✅ Step 4: Verify form loaded with CORRECT vessel data\n');

  const vesselName = await page.inputValue('input[name="vesselName"]');
  const towingChecked = await page.isChecked('input[value="towing_operations"]');

  console.log('========================================');
  console.log('VERIFICATION RESULTS:');
  console.log('========================================\n');
  console.log(`Vessel Name: ${vesselName}`);
  console.log(`Towing Operations: ${towingChecked ? 'CHECKED' : 'NOT CHECKED'}\n`);

  if (vesselName.includes('SECOND SEARCH') && !towingChecked) {
    console.log('🎉 SUCCESS! Edit Settings loaded the CURRENT search data!');
    console.log('   ✅ Vessel name matches SECOND search');
    console.log('   ✅ Towing operations NOT checked (correct for second search)');
  } else if (vesselName.includes('FIRST SEARCH') || towingChecked) {
    console.log('❌ FAILED! Edit Settings loaded WRONG search data!');
    console.log('   ❌ This is the FIRST search, not the SECOND search');
    console.log('   ❌ Bug: Loading most recent form submit instead of current results');
  } else {
    console.log('⚠️  UNEXPECTED: Form data doesn\'t match either search');
  }

  console.log('\n========================================');
  console.log('Browser will stay open for 30 seconds for manual review...');
  console.log('========================================\n');

  await page.waitForTimeout(30000);
  await browser.close();

  console.log('✅ TEST COMPLETE\n');
})();
