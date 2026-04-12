const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('\n🧭 Opening FleetSkipper homepage to view new Sign In button...\n');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(2000);
  
  // Check if Sign In button is visible
  const signInButton = await page.$('text=Sign In');
  if (signInButton) {
    console.log('✅ "Sign In" button is visible in navigation!\n');
  } else {
    console.log('❌ "Sign In" button not found\n');
  }
  
  // Take screenshot of navigation
  await page.screenshot({
    path: '/Users/jonathanfulton/Desktop/fleetskipper-nav-with-signin.jpg',
    type: 'jpeg',
    quality: 50,
    scale: 'css',
    clip: { x: 0, y: 0, width: 1400, height: 100 }
  });
  
  console.log('📸 Screenshot saved to Desktop as fleetskipper-nav-with-signin.jpg\n');
  console.log('Browser will stay open for 30 seconds for you to review...\n');
  
  await page.waitForTimeout(30000);
  await browser.close();
})();
