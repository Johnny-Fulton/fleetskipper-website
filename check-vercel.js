const { chromium } = require('playwright');

(async () => {
  console.log('Opening Vercel to check deployments...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Go directly to the project deployments
  console.log('Navigating to Vercel project...');
  await page.goto('https://vercel.com/team-eshisj2fex3c7dbw9rztlvzl/seaready-website');
  
  console.log('Waiting for page to load (15 seconds - you may need to login)...');
  await page.waitForTimeout(15000);
  
  // Try to find deployment info
  const pageText = await page.textContent('body');
  if (pageText.includes('safedeck-rebrand')) {
    console.log('✅ Found safedeck-rebrand deployment!');
  } else {
    console.log('⚠️  safedeck-rebrand not visible yet');
  }
  
  console.log('Browser will stay open for 30 seconds for you to check...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();
