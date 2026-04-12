const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002 with multi-layer gradient...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of multi-layer gradient hero...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-multilayer.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved! Check Desktop for fleetskipper-hero-multilayer.jpg');
  console.log('Browser will stay open for 60 seconds...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
