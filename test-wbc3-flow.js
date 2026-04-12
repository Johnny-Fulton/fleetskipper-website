const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing WBC3 Requirements Checker - Full Flow\n');
  console.log('='.repeat(60));
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Step 1: Navigate to Tools page
  console.log('\n1️⃣  Navigating to /tools page...');
  await page.goto('http://localhost:3002/tools', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('✅ Tools page loaded');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-test-1-tools-page.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  // Step 2: Click on WBC3 Checker card
  console.log('\n2️⃣  Clicking WBC3 Checker card...');
  await page.click('a[href="/tools/wbc3-checker"]');
  await page.waitForTimeout(2000);
  
  console.log('✅ WBC3 Checker page loaded');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-test-2-questionnaire.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  // Step 3: Fill out the form
  console.log('\n3️⃣  Filling out vessel questionnaire...');
  
  await page.fill('input[name="vesselName"]', 'Test Workboat Alpha');
  await page.selectOption('select[name="vesselType"]', 'tug');
  await page.selectOption('select[name="category"]', '6');
  await page.fill('input[name="lengthOverall"]', '18.5');
  await page.fill('input[name="grossTonnage"]', '45');
  await page.fill('input[name="maxPersons"]', '8');
  await page.selectOption('select[name="gmdssSeaArea"]', 'A1');
  await page.selectOption('select[name="propulsionConfiguration"]', 'twin_screw');
  
  console.log('✅ Form filled with test data');
  await page.waitForTimeout(1000);
  
  // Step 4: Submit the form
  console.log('\n4️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to results page
  await page.waitForURL('**/tools/wbc3-checker/results', { timeout: 10000 });
  await page.waitForTimeout(3000);
  
  console.log('✅ Results page loaded');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-test-3-results.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  // Step 5: Verify results content
  console.log('\n5️⃣  Verifying results content...');
  
  const vesselName = await page.textContent('h1');
  const hasSummary = await page.isVisible('text=Total Requirements');
  const hasEquipment = await page.isVisible('text=Equipment Requirements');
  const hasBookButton = await page.isVisible('text=Book Free Consultation');
  
  console.log('\n===== VERIFICATION =====');
  console.log('Vessel name in title:', vesselName.includes('Test Workboat Alpha') ? '✅' : '❌');
  console.log('Summary stats visible:', hasSummary ? '✅' : '❌');
  console.log('Equipment requirements visible:', hasEquipment ? '✅' : '❌');
  console.log('CTA buttons visible:', hasBookButton ? '✅' : '❌');
  
  // Step 6: Scroll down to see more content
  console.log('\n6️⃣  Scrolling to view full results...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-test-4-results-scrolled.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ FULL FLOW TEST COMPLETE!');
  console.log('\nScreenshots saved to Desktop:');
  console.log('  - wbc3-test-1-tools-page.jpg');
  console.log('  - wbc3-test-2-questionnaire.jpg');
  console.log('  - wbc3-test-3-results.jpg');
  console.log('  - wbc3-test-4-results-scrolled.jpg');
  console.log('\nBrowser will stay open for 30 seconds for manual review...\n');
  
  await page.waitForTimeout(30000);
  await browser.close();
})();
