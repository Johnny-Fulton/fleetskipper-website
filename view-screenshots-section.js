const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Opening localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Scroll to the new screenshots section
  console.log('Scrolling to "See It In Action" section...');
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const targetHeading = headings.find(h => h.textContent.includes('Real Interface'));
    if (targetHeading) {
      targetHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(2000);
  
  console.log('Taking screenshot of app screenshots section...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-screenshots-section.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved to Desktop as fleetskipper-screenshots-section.jpg');
  console.log('Browser will stay open for 45 seconds for you to review...');
  await page.waitForTimeout(45000);
  
  await browser.close();
})();
