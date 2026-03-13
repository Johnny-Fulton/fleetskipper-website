const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Taking screenshots after color fix...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Hero section - should now show dark blue gradient
  await page.screenshot({
    path: 'FIXED-hero.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Fixed hero screenshot saved');
  
  // Scroll to "How We Help" section (FleetSkipper App)
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: 'FIXED-app-section.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Fixed app section screenshot saved');
  
  // Scroll further to see more sections
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: 'FIXED-credibility.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Fixed credibility section screenshot saved');
  
  await browser.close();
})();
