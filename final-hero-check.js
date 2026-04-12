const { chromium } = require('playwright');

(async () => {
  console.log('Final hero check with teal accent...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.waitForTimeout(2000);
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-final.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Final screenshot: fleetskipper-hero-final.jpg');
  await browser.close();
})();
