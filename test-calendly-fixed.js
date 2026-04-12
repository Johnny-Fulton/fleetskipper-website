const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Listen for console messages to see if CSP error is gone
  page.on('console', msg => {
    if (msg.text().includes('Calendly') || msg.text().includes('CSP')) {
      console.log('BROWSER LOG:', msg.text());
    }
  });
  
  page.on('pageerror', error => console.log('ERROR:', error.message));
  
  console.log('\n🧪 Testing Calendly with FIXED CSP...\n');
  await page.goto('http://localhost:3002/contact', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(5000);
  
  // Check if Calendly iframe loaded successfully
  const calendlyLoaded = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (let iframe of iframes) {
      if (iframe.src.includes('calendly.com')) {
        return true;
      }
    }
    return false;
  });
  
  console.log('\n===== TEST RESULTS =====');
  console.log('✅ Calendly iframe loaded:', calendlyLoaded);
  console.log('\nBrowser will stay open for 30 seconds for visual confirmation...\n');
  
  await page.waitForTimeout(30000);
  await browser.close();
  
  if (calendlyLoaded) {
    console.log('\n🎉 SUCCESS! Calendly is now working!\n');
  } else {
    console.log('\n❌ FAILED: Calendly still not loading\n');
  }
})();
