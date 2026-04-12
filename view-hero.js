const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  console.log('Taking screenshot of new full-width hero...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-fullwidth.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('Screenshot saved to Desktop! Browser will stay open for 60 seconds...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
