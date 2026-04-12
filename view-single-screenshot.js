const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002 with SINGLE screenshot + feature points...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Scroll to screenshot section
  console.log('Scrolling to screenshot section...');
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const targetHeading = headings.find(h => h.textContent.includes('Real Interface'));
    if (targetHeading) {
      targetHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of SINGLE FEATURE layout...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-single-feature.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-single-feature.jpg');
  console.log('Browser will stay open for 30 seconds...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
