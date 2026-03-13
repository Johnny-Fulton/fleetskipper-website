const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Taking clean screenshots after cache clear...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Hero section
  await page.screenshot({
    path: 'clean-hero.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Clean hero screenshot saved');
  
  // Scroll to "How We Help" section
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: 'clean-app-section.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Clean app section screenshot saved');
  
  await browser.close();
})();
