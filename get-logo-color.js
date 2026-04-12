const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3002');
  await page.waitForTimeout(2000);
  
  // Take a screenshot of just the logo area
  const logo = await page.locator('img[alt="FleetSkipper"]').first();
  await logo.screenshot({ 
    path: '/Users/jonathanfulton/REGULATION APP/FleetSkipper/website/logo-capture.png'
  });
  
  console.log('Logo screenshot saved to logo-capture.png');
  console.log('Please open this image in a color picker tool to identify the exact blue color of "Skipper"');
  
  await browser.close();
})();
