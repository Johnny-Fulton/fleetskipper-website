const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  try {
    await page.goto('http://localhost:3002/app', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({
      path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/app-page-screenshot.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css',
      fullPage: true
    });
    console.log('✅ Screenshot saved to app-page-screenshot.jpg');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
