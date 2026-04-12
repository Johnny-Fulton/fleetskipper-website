const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening localhost:3002 and scrolling to app section...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Scroll to app section
  await page.evaluate(() => {
    const appSection = Array.from(document.querySelectorAll('section')).find(
      section => section.textContent.includes('See It In Action')
    );
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(1500);
  
  console.log('Taking screenshot of logo section...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-logo-section.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-logo-section.jpg');
  console.log('Browser will stay open for 30 seconds...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
