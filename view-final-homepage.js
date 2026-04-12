const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002 to view final polished homepage...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Wait for everything to load
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of final homepage...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-homepage-final.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    fullPage: false
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-homepage-final.jpg');
  console.log('Browser will stay open for 45 seconds for you to review...');
  await page.waitForTimeout(45000);
  
  await browser.close();
})();
