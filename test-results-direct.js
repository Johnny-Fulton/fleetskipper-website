const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 Testing clickable references on results page (using localStorage approach)\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console errors about XMarkIcon
  let hasImportError = false;
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('XMarkIcon') || text.includes('Attempted import error')) {
      hasImportError = true;
      console.log('❌ ERROR:', text);
    }
  });
  
  console.log('Step 1: Navigating to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results');
  await page.waitForTimeout(3000);
  
  console.log('Step 2: Checking for reference badges in DOM...');
  
  // Count reference elements
  const buttonCount = await page.locator('button').filter({ hasText: 'WBC3' }).count();
  const spanCount = await page.locator('span').filter({ hasText: 'WBC3' }).count();
  
  console.log('\n===== RESULTS =====');
  console.log('Import error (XMarkIcon):', hasImportError ? '❌ YES - Still broken!' : '✅ NO - Fixed!');
  console.log('Clickable reference badges (buttons):', buttonCount);
  console.log('Non-clickable badges (spans):', spanCount);
  console.log('Total WBC3 references visible:', buttonCount + spanCount);
  
  if (!hasImportError) {
    console.log('\n✅ The import error has been fixed!\n');
  } else {
    console.log('\n❌ Import error STILL EXISTS after cache clear\n');
  }
  
  await browser.close();
})();
