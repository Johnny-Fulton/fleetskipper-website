const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Taking professional FleetSkipper screenshots...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Hero + Navigation
  await page.screenshot({
    path: 'PROFESSIONAL-hero.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Professional hero screenshot');
  
  // Scroll to How We Help section
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: 'PROFESSIONAL-how-we-help.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Professional How We Help screenshot');
  
  // Services page
  await page.goto('http://localhost:3002/services', { waitUntil: 'networkidle' });
  await page.screenshot({
    path: 'PROFESSIONAL-services.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  console.log('✅ Professional Services page screenshot');
  
  await browser.close();
})();
