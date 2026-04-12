const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening homepage to check new CTA button...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of hero section with "See the App" CTA...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-hero-cta-updated.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-hero-cta-updated.jpg');
  console.log('Browser will stay open for 30 seconds to review...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
