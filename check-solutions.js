const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Wait for page to fully load
  await page.waitForTimeout(2000);
  
  // Scroll to solutions section
  console.log('Scrolling to Our Solutions section...');
  await page.evaluate(() => {
    const solutionsSection = document.querySelector('section:nth-of-type(2)');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of solutions section
  console.log('Taking screenshot of solutions cards...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-solutions-section.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-solutions-section.jpg');
  console.log('Browser will stay open for 60 seconds for you to inspect...');
  await page.waitForTimeout(60000);
  
  await browser.close();
})();
