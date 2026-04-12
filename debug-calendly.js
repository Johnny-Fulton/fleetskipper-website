const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Listen for console messages
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  // Listen for page errors
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  console.log('Opening contact page to debug Calendly...');
  await page.goto('http://localhost:3002/contact', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(5000);
  
  // Check if Calendly iframe exists
  const iframeCount = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    console.log('Found', iframes.length, 'iframes');
    return iframes.length;
  });
  
  console.log('\n===== DEBUG RESULTS =====');
  console.log('Iframes found:', iframeCount);
  
  await page.waitForTimeout(10000);
  await browser.close();
})();
