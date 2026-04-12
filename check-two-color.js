const { chromium } = require('playwright');

(async () => {
  console.log('Checking two-color title...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.waitForTimeout(2000);
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-two-color.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved: fleetskipper-two-color.jpg');
  await browser.close();
})();
