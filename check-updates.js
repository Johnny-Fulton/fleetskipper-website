const { chromium } = require('playwright');

(async () => {
  console.log('Checking hero updates...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.waitForTimeout(2000);
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-updated.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved: fleetskipper-hero-updated.jpg');
  await browser.close();
})();
