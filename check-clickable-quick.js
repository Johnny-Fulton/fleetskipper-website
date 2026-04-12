const { chromium } = require('playwright');

(async () => {
  console.log('\n🔍 QUICK CHECK: Are references clickable after cache clear?\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Step 1: Going directly to results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check what's on the page
  const pageAnalysis = await page.evaluate(() => {
    const body = document.body.textContent;
    const hasNoResults = body.includes('No Results Found') || body.includes('No results');
    
    // Look for ANY reference badge pattern
    const allButtons = Array.from(document.querySelectorAll('button'));
    const refButtons = allButtons.filter(btn => {
      const text = btn.textContent || '';
      return text.includes('WBC3') || text.includes('MARPOL') || text.includes('📘');
    });
    
    const allSpans = Array.from(document.querySelectorAll('span'));
    const refSpans = allSpans.filter(span => {
      const text = span.textContent || '';
      return text.includes('WBC3') || text.includes('MARPOL') || text.includes('📘');
    });
    
    return {
      hasNoResults,
      clickableRefs: refButtons.length,
      staticRefs: refSpans.length,
      firstClickable: refButtons[0]?.textContent || 'none',
      pageHasContent: body.length > 100
    };
  });
  
  console.log('\n===== ANALYSIS =====');
  console.log('Has results:', !pageAnalysis.hasNoResults);
  console.log('Clickable references (buttons):', pageAnalysis.clickableRefs);
  console.log('Static references (spans):', pageAnalysis.staticRefs);  
  console.log('First clickable:', pageAnalysis.firstClickable);
  
  if (pageAnalysis.hasNoResults) {
    console.log('\n⚠️  No results found - localStorage likely empty');
    console.log('   User needs to submit the form first');
  } else if (pageAnalysis.clickableRefs > 0) {
    console.log('\n✅ SUCCESS! References ARE clickable!');
    
    // Try clicking one
    console.log('\nStep 2: Testing click...');
    const clicked = await page.evaluate(() => {
      const refButtons = Array.from(document.querySelectorAll('button')).filter(btn => {
        return btn.textContent.includes('WBC3') || btn.textContent.includes('MARPOL');
      });
      if (refButtons[0]) {
        refButtons[0].click();
        return true;
      }
      return false;
    });
    
    if (clicked) {
      await page.waitForTimeout(1000);
      
      const modalVisible = await page.evaluate(() => {
        return document.querySelector('[role="dialog"]') !== null;
      });
      
      console.log('Modal opened:', modalVisible ? '✅ YES' : '❌ NO');
      
      if (modalVisible) {
        await page.screenshot({
          path: '/Users/jonathanfulton/Desktop/wbc3-WORKING-AFTER-CACHE-CLEAR.jpg',
          type: 'jpeg',
          quality: 50,
          scale: 'css'
        });
        console.log('\n📸 Screenshot saved with modal open!');
      }
    }
    
  } else if (pageAnalysis.staticRefs > 0) {
    console.log('\n❌ References exist but are NOT clickable');
    console.log('   This means the code changes didn\'t take effect');
  } else {
    console.log('\n❓ No reference badges found at all');
  }
  
  console.log('\nBrowser will stay open for 20 seconds...\n');
  await page.waitForTimeout(20000);
  
  await browser.close();
})();
