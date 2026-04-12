const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening consultancy page...');
  await page.goto('http://localhost:3002/consultancy', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/consultancy-hero-check.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('Screenshot saved to Desktop');
  console.log('Browser will stay open for 10 seconds...');
  
  await page.waitForTimeout(10000);
  await browser.close();
})();
