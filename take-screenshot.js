const { chromium } = require('playwright');

(async () => {
  console.log('Taking screenshot of FleetSkipper hero...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-check.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop: fleetskipper-hero-check.jpg');
  
  await browser.close();
})();
