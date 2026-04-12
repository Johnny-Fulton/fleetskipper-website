const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002 with 1400px cropped logo...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of logo with full icon...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-logo-1400px.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved as fleetskipper-logo-1400px.jpg');
  console.log('Browser will stay open for 30 seconds...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
