const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ 
    viewport: { width: 1024, height: 768 }
  });
  const page = await context.newPage();
  
  console.log('Opening FleetSkipper website...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 15000 });
  
  console.log('Taking screenshot...');
  await page.screenshot({
    path: '/tmp/fleetskipper-real.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved! Browser will stay open...');
  // Keep browser open indefinitely
  await new Promise(() => {});
})();
