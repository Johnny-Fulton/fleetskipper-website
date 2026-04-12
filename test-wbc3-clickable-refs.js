const { chromium } = require('playwright');

(async () => {
  console.log('\n🎯 Testing WBC3 Results Page with Clickable References\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening WBC3 Checker form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('Filling and submitting form...');
  await page.fill('input[name="vesselName"]', 'MV Test Workboat');
  await page.fill('input[name="lengthOverall"]', '12');
  await page.fill('input[name="grossTonnage"]', '15');
  await page.fill('input[name="maxPersons"]', '6');
  await page.fill('input[name="enginePowerKW"]', '100');
  
  await page.click('button[type="submit"]');
  
  // Wait for navigation to results page
  await page.waitForURL('**/results', { timeout: 10000 });
  console.log('✅ Navigated to results page');
  
  await page.waitForTimeout(2000);
  
  // Count reference badges
  const badgeCount = await page.evaluate(() => {
    const clickable = document.querySelectorAll('button[title="Click to view regulation details"]').length;
    const static = document.querySelectorAll('span.font-mono').length;
    return { clickable, static, total: clickable + static };
  });
  
  console.log(`\n📘 Reference Badges:`);
  console.log(`   Clickable (buttons): ${badgeCount.clickable}`);
  console.log(`   Static (spans): ${badgeCount.static}`);
  console.log(`   Total: ${badgeCount.total}\n`);
  
  // Take screenshot
  console.log('Taking screenshot of results page...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-results-WITH-CLICKABLE-REFS.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  // Scroll down to see more equipment
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(1000);
  
  console.log('Taking screenshot of scrolled view...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-results-scrolled.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  // Click one of the reference badges to test modal
  console.log('\n🖱️  Clicking a reference badge to test modal...');
  await page.click('button[title="Click to view regulation details"]');
  
  await page.waitForTimeout(1500);
  
  console.log('Taking screenshot with modal open...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-modal-open.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('\n✅ All screenshots saved to Desktop:');
  console.log('   - wbc3-results-WITH-CLICKABLE-REFS.jpg');
  console.log('   - wbc3-results-scrolled.jpg');
  console.log('   - wbc3-modal-open.jpg\n');
  
  console.log('Browser will stay open for 30 seconds...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
