const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Go to GitHub repo
  await page.goto('https://github.com/Johnny-Fulton/seaready-website/tree/safedeck-rebrand');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Check for Vercel deployment status
  const deploymentInfo = await page.evaluate(() => {
    // Look for deployment status badges
    const statusElements = document.querySelectorAll('[data-testid="check-status-label"], .Status-label, .commit-build-statuses');
    return Array.from(statusElements).map(el => el.textContent).join(' | ');
  });
  
  console.log('Deployment status:', deploymentInfo);
  
  // Wait for user to see
  await page.waitForTimeout(10000);
  
  await browser.close();
})();
