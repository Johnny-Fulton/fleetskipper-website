const { chromium } = require('playwright');

(async () => {
  console.log('\n🔬 DEFINITIVE TEST: Clickable WBC3 References\n');
  console.log('This test will submit a REAL form and check the REAL results\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Step 1: Navigate to WBC3 form');
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('Step 2: Fill in vessel data...');
  
  // Fill in text fields
  await page.fill('#vesselName', 'Test Vessel MV Thor');
  await page.fill('#lengthOverall', '18.5');
  await page.fill('#grossTonnage', '65');
  await page.fill('#maxPersons', '12');
  await page.fill('#enginePowerKW', '350');
  
  // Fill in select dropdowns
  await page.selectOption('#vesselType', 'crew_transfer');
  await page.selectOption('#category', 'cat2');
  await page.selectOption('#gmdssSeaArea', 'A1');
  await page.selectOption('#propulsionConfiguration', 'diesel_inboard_below');
  
  console.log('Step 3: Submit form...');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to results
  console.log('Step 4: Waiting for results page...');
  await page.waitForURL('**/results', { timeout: 10000 });
  await page.waitForTimeout(3000);
  
  console.log('Step 5: Analyzing results page...');
  
  const analysis = await page.evaluate(() => {
    // Count all reference badges
    const allButtons = document.querySelectorAll('button');
    const refButtons = Array.from(allButtons).filter(btn => {
      const text = btn.textContent;
      return text && (text.includes('WBC3') || text.includes('MARPOL') || text.includes('📘'));
    });
    
    const allSpans = document.querySelectorAll('span');
    const refSpans = Array.from(allSpans).filter(span => {
      const text = span.textContent;
      return text && (text.includes('WBC3') || text.includes('MARPOL') || text.includes('📘'));
    });
    
    return {
      clickableCount: refButtons.length,
      staticCount: refSpans.length,
      firstClickableText: refButtons[0]?.textContent?.trim() || 'none',
      firstClickableHasOnClick: refButtons[0] && refButtons[0].getAttribute('onclick') !== null,
      sampleButtons: refButtons.slice(0, 3).map(btn => ({
        text: btn.textContent.trim(),
        hasClick: btn.onclick !== null || btn.getAttribute('onclick') !== null,
        className: btn.className
      }))
    };
  });
  
  console.log('\n========== RESULTS ==========');
  console.log('Clickable reference buttons:', analysis.clickableCount);
  console.log('Static reference spans:', analysis.staticCount);
  console.log('First clickable text:', analysis.firstClickableText);
  console.log('\nSample buttons:', JSON.stringify(analysis.sampleButtons, null, 2));
  
  if (analysis.clickableCount > 0) {
    console.log('\n✅ SUCCESS! References ARE clickable!');
    console.log('\nStep 6: Testing click interaction...');
    
    // Click the first reference button
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const refButton = buttons.find(btn => btn.textContent && (btn.textContent.includes('WBC3') || btn.textContent.includes('MARPOL')));
      if (refButton) {
        refButton.click();
        return true;
      }
      return false;
    });
    
    if (clicked) {
      await page.waitForTimeout(1000);
      
      const modalOpen = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        return dialog !== null;
      });
      
      console.log('Modal opened after click:', modalOpen ? '✅ YES' : '❌ NO');
      
      if (modalOpen) {
        console.log('\n📸 Taking screenshot with modal open...');
        await page.screenshot({
          path: '/Users/jonathanfulton/Desktop/WBC3-CLICKABLE-WORKING.jpg',
          type: 'jpeg',
          quality: 50,
          scale: 'css'
        });
        console.log('✅ Screenshot saved to Desktop!');
      }
    }
    
  } else {
    console.log('\n❌ FAILED: No clickable reference buttons found!');
    console.log('This means something is still wrong with the code compilation');
  }
  
  console.log('\nBrowser will stay open for 30 seconds for manual inspection...\n');
  await page.waitForTimeout(30000);
  
  await browser.close();
  
  console.log(analysis.clickableCount > 0 ? '\n🎉 TEST PASSED!\n' : '\n⚠️  TEST FAILED!\n');
})();
