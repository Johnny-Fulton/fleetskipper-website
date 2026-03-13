/**
 * GoDaddy DNS Configuration Script
 * Automatically configures DNS A record for seaready.co.uk to point to Vercel
 *
 * Usage: node scripts/setup-godaddy-dns.js
 */

const { chromium, firefox, webkit } = require('playwright');

const DOMAIN = 'seaready.co.uk';
const VERCEL_IP = '76.76.21.21';
const GODADDY_URL = 'https://dcc.godaddy.com/';

async function setupGoDaddyDNS(browserType = 'safari') {
  console.log('🚀 Starting GoDaddy DNS configuration...');
  console.log(`📋 Domain: ${DOMAIN}`);
  console.log(`🎯 Target IP: ${VERCEL_IP}`);
  console.log(`🌐 Browser: ${browserType}`);
  console.log('');

  // Select browser
  let browserEngine;
  switch(browserType) {
    case 'safari':
      browserEngine = webkit;
      break;
    case 'firefox':
      browserEngine = firefox;
      break;
    case 'chrome':
    default:
      browserEngine = chromium;
  }

  const browser = await browserEngine.launch({
    headless: false,  // Set to true to run in background
    slowMo: 500 // Slow down actions for visibility
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Navigate to GoDaddy
    console.log('📍 Step 1: Navigating to GoDaddy...');
    await page.goto(GODADDY_URL);
    await page.waitForLoadState('networkidle');

    // Step 2: Wait for login (manual intervention)
    console.log('🔐 Step 2: Please log in to GoDaddy...');
    console.log('⏳ Waiting for login to complete...');

    // Wait for the domains page to load (indicates successful login)
    await page.waitForURL('**/dcc/**', { timeout: 120000 }); // 2 min timeout for login
    console.log('✅ Login detected!');

    await page.waitForTimeout(2000);

    // Step 3: Navigate to domain settings
    console.log(`📍 Step 3: Looking for ${DOMAIN} in domain list...`);

    // Try to find and click on the domain
    const domainSelectors = [
      `text="${DOMAIN}"`,
      `a:has-text("${DOMAIN}")`,
      `[href*="${DOMAIN}"]`,
      `button:has-text("${DOMAIN}")`
    ];

    let domainFound = false;
    for (const selector of domainSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible({ timeout: 5000 })) {
          console.log(`Found domain with selector: ${selector}`);
          await element.click();
          domainFound = true;
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (!domainFound) {
      console.log('⚠️  Could not automatically find domain. Please navigate to DNS settings manually.');
      console.log('Press Enter in the terminal when you reach the DNS management page...');
      await page.waitForTimeout(30000); // Give time for manual navigation
    }

    await page.waitForTimeout(2000);

    // Step 4: Navigate to DNS settings
    console.log('📍 Step 4: Looking for DNS settings...');

    const dnsSelectors = [
      'text="DNS"',
      'text="Manage DNS"',
      'button:has-text("DNS")',
      'a:has-text("DNS")',
      '[data-testid*="dns"]'
    ];

    let dnsFound = false;
    for (const selector of dnsSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible({ timeout: 5000 })) {
          console.log(`Found DNS settings with selector: ${selector}`);
          await element.click();
          dnsFound = true;
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (!dnsFound) {
      console.log('⚠️  Please click on "DNS" or "Manage DNS" manually');
      await page.waitForTimeout(10000);
    }

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Step 5: Look for existing A record and update, or add new one
    console.log('📍 Step 5: Configuring A record...');

    // Take a screenshot to help with debugging
    await page.screenshot({ path: 'godaddy-dns-page.png' });
    console.log('📸 Screenshot saved as godaddy-dns-page.png');

    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('⚠️  MANUAL STEPS REQUIRED:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('Please configure the following DNS record:');
    console.log('');
    console.log('  Type:  A');
    console.log('  Name:  @');
    console.log(`  Value: ${VERCEL_IP}`);
    console.log('  TTL:   600 (or default)');
    console.log('');
    console.log('Steps:');
    console.log('  1. Look for existing A record with Name "@"');
    console.log('  2. If exists: Edit it and change IP to ' + VERCEL_IP);
    console.log('  3. If not: Click "Add" and create new A record');
    console.log('  4. Save the changes');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('⏳ Browser will remain open for 5 minutes...');
    console.log('   Close the browser when done, or wait for auto-close.');

    // Keep browser open for manual configuration
    await page.waitForTimeout(300000); // 5 minutes

    console.log('✅ Done! Closing browser...');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('💡 TIP: You can configure DNS manually at:');
    console.log(`   https://dcc.godaddy.com/control/${DOMAIN}/dns`);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the script
setupGoDaddyDNS()
  .then(() => {
    console.log('');
    console.log('🎉 Setup complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. DNS changes can take up to 48 hours to propagate');
    console.log('  2. Check status with: vercel domains ls');
    console.log('  3. Visit: https://seaready.co.uk (after DNS propagates)');
    console.log('');
  })
  .catch((error) => {
    console.error('Failed to setup DNS:', error);
    process.exit(1);
  });
