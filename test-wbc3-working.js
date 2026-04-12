const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing WBC3 Checker with CORRECT vessel types\n');
  console.log('='.repeat(60));
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Navigate to checker
  console.log('\n1️⃣  Opening WBC3 Checker...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Fill form
  console.log('\n2️⃣  Filling out form...');
  await page.fill('input[name="vesselName"]', 'MV Test Workboat');
  await page.selectOption('select[name="vesselType"]', 'workboat');
  await page.selectOption('select[name="category"]', '6');
  await page.fill('input[name="lengthOverall"]', '18.5');
  await page.fill('input[name="grossTonnage"]', '45');
  await page.fill('input[name="maxPersons"]', '8');
  
  console.log('✅ Form filled');
  
  // Submit
  console.log('\n3️⃣  Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for either results or error
  try {
    await page.waitForURL('**/tools/wbc3-checker/results', { timeout: 10000 });
    console.log('✅ Navigated to results page!');
    
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({
      path: '/Users/jonathanfulton/Desktop/wbc3-WORKING-results.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
    
    // Verify content
    const vesselName = await page.textContent('h1');
    const hasSummary = await page.isVisible('text=Total Requirements');
    
    console.log('\n===== SUCCESS! =====');
    console.log('✅ Vessel name in title:', vesselName.includes('MV Test Workboat'));
    console.log('✅ Summary visible:', hasSummary);
    console.log('\n📸 Screenshot saved: wbc3-WORKING-results.jpg');
    
  } catch (e) {
    console.log('❌ Failed to navigate to results');
    console.log('Error:', e.message);
    
    // Check for error message on form
    const errorVisible = await page.isVisible('.bg-red-50');
    if (errorVisible) {
      const errorText = await page.textContent('.bg-red-50');
      console.log('Error message:', errorText);
    }
  }
  
  console.log('\nBrowser will stay open for 30 seconds...\n');
  await page.waitForTimeout(30000);
  await browser.close();
})();
