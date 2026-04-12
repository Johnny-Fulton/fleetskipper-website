const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening /tools page...');
  await page.goto('http://localhost:3002/tools', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of tools page...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-tools-page.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-tools-page.jpg');
  console.log('Browser will stay open for 30 seconds to review...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
