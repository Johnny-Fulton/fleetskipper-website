const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening localhost:3002 with fixed inline styles...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Scroll to solutions
  console.log('Scrolling to solutions...');
  await page.evaluate(() => {
    const section = document.querySelector('section:nth-of-type(2)');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  await page.waitForTimeout(1000);
  
  console.log('Taking screenshot of FIXED solutions cards...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-solutions-FIXED.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved as fleetskipper-solutions-FIXED.jpg');
  console.log('Browser will stay open for 30 seconds...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
