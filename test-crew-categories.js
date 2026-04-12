const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 TESTING CREW CHECKER WBC3 CATEGORIES\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('1️⃣  Opening crew checker form...');
  await page.goto('http://localhost:3002/tools/crew-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check category dropdown text
  console.log('2️⃣  Checking WBC3 category descriptions...');
  const categoryOptions = await page.$$eval('select[name="category"] option', options =>
    options.map(opt => ({ value: opt.value, text: opt.textContent }))
  );

  console.log('\n===== CATEGORY DESCRIPTIONS =====');
  categoryOptions.forEach(opt => {
    if (opt.value) {
      console.log(opt.value + ': ' + opt.text);
    }
  });

  // Verify Category 4 is correct
  const cat4 = categoryOptions.find(opt => opt.value === 'cat4');
  const cat4Includes20nm = cat4 && cat4.text.includes('20nm');
  const cat4IncludesDaylight = cat4 && cat4.text.includes('daylight');
  const cat4Correct = cat4Includes20nm && cat4IncludesDaylight;

  console.log('\n===== VERIFICATION =====');
  console.log('Category 4 description correct: ' + (cat4Correct ? 'YES ✅' : 'NO ❌'));
  console.log('   Expected: "Category 4 — Up to 20nm, daylight only"');
  console.log('   Actual: "' + (cat4 ? cat4.text : 'NOT FOUND') + '"');

  console.log('\n📸 Taking screenshot...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/crew-checker-categories.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });

  console.log('\nBrowser will stay open for 30 seconds for review...\n');
  await page.waitForTimeout(30000);
  await browser.close();

  console.log('🎉 TEST COMPLETE!\n');
})();
