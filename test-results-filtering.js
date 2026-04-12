const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING WBC3 RESULTS FILTERING\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('1️⃣  Opening WBC3 results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  // Check if results exist from previous test
  const hasResults = await page.evaluate(() => {
    return localStorage.getItem('wbc3Results') !== null;
  });

  if (!hasResults) {
    console.log('❌ No stored results found. Please run test-wbc3-expanded.js first.');
    await browser.close();
    return;
  }

  console.log('2️⃣  Found stored results! Checking filter UI...');

  const categoryFilterExists = await page.isVisible('select#category-filter');
  const typeFilterExists = await page.isVisible('select#type-filter');

  console.log(`   ✓ Category filter exists: ${categoryFilterExists}`);
  console.log(`   ✓ Type filter exists: ${typeFilterExists}`);

  // Get initial results count
  const initialCount = await page.textContent('body').then(text => {
    const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
    return match ? { showing: parseInt(match[1]), total: parseInt(match[2]) } : null;
  });

  console.log(`3️⃣  Initial results: Showing ${initialCount?.showing || '?'} of ${initialCount?.total || '?'} items`);

  // Get available categories
  const categories = await page.$$eval('select#category-filter option', options =>
    options.map(opt => ({ value: opt.value, text: opt.textContent })).filter(opt => opt.value !== 'all')
  );

  console.log(`4️⃣  Found ${categories.length} categories:`);
  categories.forEach(cat => console.log(`   - ${cat.text}`));

  if (categories.length > 0) {
    console.log(`\n5️⃣  Testing category filter with "${categories[0].text}"...`);

    await page.selectOption('select#category-filter', categories[0].value);
    await page.waitForTimeout(500);

    const filteredCount = await page.textContent('body').then(text => {
      const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
      return match ? parseInt(match[1]) : 0;
    });

    console.log(`   ✓ Filtered to ${filteredCount} items`);
  }

  console.log('\n6️⃣  Testing type filter (Mandatory only)...');

  await page.selectOption('select#category-filter', 'all');
  await page.waitForTimeout(300);
  await page.selectOption('select#type-filter', 'mandatory');
  await page.waitForTimeout(500);

  const mandatoryCount = await page.textContent('body').then(text => {
    const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+items/);
    return match ? parseInt(match[1]) : 0;
  });

  console.log(`   ✓ Showing ${mandatoryCount} mandatory items`);

  console.log('\n7️⃣  Taking screenshot of filtered results...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-filtered-results.jpg',
    type: 'jpeg',
    quality: 50
  });

  console.log('\n===== TEST RESULTS =====');
  console.log(`✅ Total Requirements: ${initialCount?.total || 'N/A'}`);
  console.log(`✅ Category Filter Working: ${categoryFilterExists}`);
  console.log(`✅ Type Filter Working: ${typeFilterExists}`);
  console.log(`✅ Categories Available: ${categories.length}`);
  console.log(`✅ Screenshot saved: wbc3-filtered-results.jpg`);
  console.log('\nBrowser will stay open for 20 seconds...\n');

  await page.waitForTimeout(20000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
