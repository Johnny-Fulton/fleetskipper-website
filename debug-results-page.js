const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening results page...');
  await page.goto('http://localhost:3002/tools/wbc3-checker/results', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/wbc3-results-current.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('Screenshot saved to Desktop as wbc3-results-current.jpg');
  
  // Check what's in the DOM
  const debugInfo = await page.evaluate(() => {
    // Check if ReferenceModal component exists
    const hasModal = document.querySelector('[role="dialog"]') !== null;
    
    // Check reference badges
    const allBadges = document.querySelectorAll('[class*="font-mono"]');
    const clickableBadges = document.querySelectorAll('button[class*="font-mono"]');
    const staticBadges = document.querySelectorAll('span[class*="font-mono"]');
    
    // Get first few references
    const references = Array.from(allBadges).slice(0, 5).map(el => ({
      text: el.textContent,
      isButton: el.tagName === 'BUTTON',
      classes: el.className
    }));
    
    // Check equipment counts
    const countsText = document.querySelector('.text-white')?.parentElement?.textContent || 'Not found';
    
    return {
      hasModal,
      totalBadges: allBadges.length,
      clickableBadges: clickableBadges.length,
      staticBadges: staticBadges.length,
      references,
      countsVisible: countsText.includes('Mandatory Equipment')
    };
  });
  
  console.log('\n=== DEBUG INFO ===');
  console.log('Modal component loaded:', debugInfo.hasModal);
  console.log('Total reference badges:', debugInfo.totalBadges);
  console.log('Clickable badges (buttons):', debugInfo.clickableBadges);
  console.log('Static badges (spans):', debugInfo.staticBadges);
  console.log('Equipment counts visible:', debugInfo.countsVisible);
  console.log('\nFirst 5 references:');
  debugInfo.references.forEach((ref, i) => {
    console.log(`  ${i+1}. ${ref.text} - ${ref.isButton ? 'CLICKABLE' : 'static'}`);
  });
  
  console.log('\nBrowser will stay open for 60 seconds...\n');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
