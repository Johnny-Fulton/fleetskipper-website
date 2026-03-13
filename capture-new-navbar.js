const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Navigate to localhost
  console.log('Loading homepage with new navbar...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Full navbar screenshot
  await page.screenshot({
    path: 'navbar-final-white.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    clip: { x: 0, y: 0, width: 1024, height: 120 }
  });
  
  console.log('✅ New white navbar screenshot captured');
  
  // Full page hero section
  await page.screenshot({
    path: 'homepage-hero-white-navbar.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    clip: { x: 0, y: 0, width: 1024, height: 600 }
  });
  
  console.log('✅ Hero section with white navbar captured');
  
  await browser.close();
  console.log('✅ Screenshots ready!');
})();
