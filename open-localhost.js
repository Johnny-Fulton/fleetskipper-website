const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening localhost:3002...');
  await page.goto('http://localhost:3002');
  
  console.log('Site loaded! Browser will stay open for you to review...');
  console.log('Check: Logo, Homepage, Navigation menu');
  
  // Keep browser open
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
