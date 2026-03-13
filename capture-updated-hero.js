const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  console.log('Loading updated homepage...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Full hero section
  await page.screenshot({
    path: 'hero-updated-spacing.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    clip: { x: 0, y: 0, width: 1024, height: 650 }
  });
  
  console.log('✅ Updated hero screenshot captured');
  
  await browser.close();
})();
