const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Scroll to app section
  await page.evaluate(() => {
    const appSection = Array.from(document.querySelectorAll('section')).find(
      section => section.textContent.includes('See It In Action')
    );
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(2000);
  
  // Get exact measurements
  const measurements = await page.evaluate(() => {
    const logo = document.querySelector('img[alt="FleetSkipper"]');
    const divider = logo?.nextElementSibling;
    const appText = divider?.nextElementSibling;
    
    if (!logo || !divider || !appText) return null;
    
    const logoRect = logo.getBoundingClientRect();
    const dividerRect = divider.getBoundingClientRect();
    const appTextRect = appText.getBoundingClientRect();
    
    return {
      logoWidth: logoRect.width,
      logoHeight: logoRect.height,
      logoRight: logoRect.right,
      dividerLeft: dividerRect.left,
      dividerRight: dividerRect.right,
      appTextLeft: appTextRect.left,
      gapLogoToDivider: dividerRect.left - logoRect.right,
      gapDividerToApp: appTextRect.left - dividerRect.right
    };
  });
  
  console.log('\n===== LOGO SPACING MEASUREMENTS =====');
  console.log('Logo width:', measurements.logoWidth);
  console.log('Logo height:', measurements.logoHeight);
  console.log('Gap: Logo → |:', measurements.gapLogoToDivider, 'px');
  console.log('Gap: | → app:', measurements.gapDividerToApp, 'px');
  console.log('=====================================\n');
  
  console.log('Taking screenshot...');
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-logo-inspect.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css'
  });
  
  console.log('✅ Screenshot saved! Browser will stay open for 30 seconds...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
