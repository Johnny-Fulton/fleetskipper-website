const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002 with CROPPED logo...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Scroll to the FleetSkipper App section
  await page.evaluate(() => {
    const section = document.querySelector('section');
    if (section) {
      const heading = Array.from(document.querySelectorAll('p')).find(el => el.textContent.includes('See It In Action'));
      if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  console.log('Taking screenshot of CROPPED logo with | app...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-logo-cropped.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-logo-cropped.jpg');
  console.log('Browser will stay open for 30 seconds for you to inspect spacing...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
