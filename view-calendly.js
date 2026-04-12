const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening contact page with Calendly integration...');
  await page.goto('http://localhost:3002/contact', { waitUntil: 'networkidle' });
  
  // Wait for Calendly widget to load
  await page.waitForTimeout(3000);
  
  console.log('Calendly widget should be visible! Browser will stay open for 60 seconds...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
