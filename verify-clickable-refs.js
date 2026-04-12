const { chromium } = require('playwright');

(async () => {
  console.log('\n🧪 VERIFYING CLICKABLE WBC3 REFERENCES AFTER CACHE CLEAR\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Step 1: Submit form
  console.log('Step 1: Submitting WBC3 form...');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  
  // Fill in minimal form data
  await page.fill('input[name="vesselName"]', 'Test Vessel');
  await page.fill('input[name="lengthOverall"]', '15');
  await page.fill('input[name="grossTonnage"]', '50');
  await page.fill('input[name="maxPersons"]', '12');
  await page.fill('input[name="enginePowerKW"]', '200');
  
  // Select dropdowns
  await page.selectOption('select[name="vesselType"]', 'crew_transfer');
  await page.selectOption('select[name="category"]', 'cat2');
  await page.selectOption('select[name="gmdssSeaArea"]', 'A1');
  await page.selectOption('select[name="propulsionConfiguration"]', 'diesel_fixed');
  
  console.log('Step 2: Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to results
  await page.waitForURL('**/results', { timeout: 5000 });
  await page.waitForTimeout(2000);
  
  console.log('Step 3: Analyzing results page...');
  
  // Count reference badges
  const badgeAnalysis = await page.evaluate(() => {
    const allBadges = Array.from(document.querySelectorAll('.inline-flex.items-center, span.inline-block')).filter(el => {
      return el.textContent.includes('📘') || el.textContent.includes('WBC3') || el.textContent.includes('MARPOL');
    });
    
    const clickableBadges = Array.from(document.querySelectorAll('button.inline-flex')).filter(el => {
      return el.textContent.includes('📘');
    });
    
    const staticBadges = Array.from(document.querySelectorAll('span.inline-block')).filter(el => {
      return el.textContent.includes('📘');
    });
    
    // Get first clickable badge text
    const firstClickable = clickableBadges[0]?.textContent.trim() || 'none';
    
    return {
      total: allBadges.length,
      clickable: clickableBadges.length,
      static: staticBadges.length,
      firstClickableText: firstClickable,
      hasClickHandler: clickableBadges.length > 0
    };
  });
  
  console.log('\n===== RESULTS =====');
  console.log('Total reference badges:', badgeAnalysis.total);
  console.log('Clickable badges (buttons):', badgeAnalysis.clickable);
  console.log('Static badges (spans):', badgeAnalysis.static);
  console.log('First clickable:', badgeAnalysis.firstClickableText);
  console.log('Has click handler:', badgeAnalysis.hasClickHandler);
  
  if (badgeAnalysis.clickable > 0) {
    console.log('\n✅ SUCCESS! Clickable references are now working!');
    
    // Try clicking one
    console.log('\nStep 4: Testing click interaction...');
    await page.click('button.inline-flex');
    await page.waitForTimeout(1000);
    
    // Check if modal opened
    const modalOpen = await page.evaluate(() => {
      return document.querySelector('[role="dialog"]') !== null;
    });
    
    console.log('Modal opened:', modalOpen ? '✅ YES' : '❌ NO');
    
    // Take screenshot with modal open
    console.log('\nTaking screenshot with modal open...');
    await page.screenshot({
      path: '/Users/jonathanfulton/Desktop/wbc3-VERIFIED-CLICKABLE.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
    
    console.log('✅ Screenshot saved to Desktop as wbc3-VERIFIED-CLICKABLE.jpg');
    
  } else {
    console.log('\n❌ FAILED: No clickable badges found!');
    
    // Take screenshot for debugging
    await page.screenshot({
      path: '/Users/jonathanfulton/Desktop/wbc3-STILL-NOT-CLICKABLE.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
  }
  
  console.log('\nBrowser will stay open for 30 seconds for manual inspection...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
  
  console.log('\n' + (badgeAnalysis.clickable > 0 ? '🎉 TEST PASSED!' : '⚠️  TEST FAILED!') + '\n');
})();
