const { chromium } = require('playwright');

(async () => {
  console.log('Taking screenshot after navy hero fix...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Wait a moment for the dev server to recompile
  await page.waitForTimeout(2000);
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-fixed.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop: fleetskipper-hero-fixed.jpg');
  
  await browser.close();
})();
