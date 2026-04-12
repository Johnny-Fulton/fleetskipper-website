const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002 with new clean image...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Wait a moment for image to load
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of clean hero with optimized gradient...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-clean.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-hero-clean.jpg');
  console.log('Browser will stay open for 60 seconds for you to review...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
