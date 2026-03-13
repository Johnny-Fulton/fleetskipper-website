/**
 * GoDaddy DNS Auto-Configuration Script
 * Automatically fills in DNS A record for seaready.co.uk
 *
 * Usage: node scripts/setup-godaddy-dns-auto.js
 */

const { webkit } = require('playwright');

const DOMAIN = 'seaready.co.uk';
const VERCEL_IP = '76.76.21.21';
const DNS_URL = `https://dcc.godaddy.com/control/${DOMAIN}/dns`;

async function autoConfigureGoDaddyDNS() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀  GODADDY DNS AUTO-CONFIGURATION');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📋 Domain: ${DOMAIN}`);
  console.log(`🎯 Target IP: ${VERCEL_IP}`);
  console.log('');

  const browser = await webkit.launch({
    headless: false,
    slowMo: 1000  // Slow down to see what's happening
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to GoDaddy DNS page
    console.log('📍 Step 1: Opening GoDaddy DNS page...');
    await page.goto(DNS_URL, { waitUntil: 'networkidle' });

    // Wait for user to log in if needed
    console.log('');
    console.log('⏳ Waiting for page to load...');
    console.log('   (If you see a login page, please log in now)');
    console.log('');

    // Wait for either login page or DNS management page
    await page.waitForTimeout(10000); // Give 10 seconds for manual login if needed

    // Take a screenshot to see what we're working with
    await page.screenshot({ path: 'godaddy-before.png' });
    console.log('📸 Screenshot saved: godaddy-before.png');

    // Look for common DNS page elements
    console.log('');
    console.log('📍 Step 2: Looking for DNS records...');

    // Try to find the A record with name "@"
    const recordSelectors = [
      'text=Type: A',
      '[data-testid="record-type-A"]',
      'td:has-text("A")',
      '.dns-record:has-text("A")'
    ];

    // Try to find Add button
    const addButtonSelectors = [
      'button:has-text("Add")',
      'button:has-text("ADD")',
      'button:has-text("Add Record")',
      '[data-testid="add-record"]',
      '.add-record',
      'text=Add Record'
    ];

    console.log('🔍 Looking for Add button...');
    let addButtonFound = false;

    for (const selector of addButtonSelectors) {
      try {
        const button = page.locator(selector).first();
        if (await button.isVisible({ timeout: 2000 })) {
          console.log(`✅ Found Add button: ${selector}`);
          console.log('🖱️  Clicking Add button...');
          await button.click();
          addButtonFound = true;
          await page.waitForTimeout(2000);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (!addButtonFound) {
      console.log('⚠️  Could not find Add button automatically');
      console.log('📝 Please click the "Add" or "Add Record" button manually');
      await page.waitForTimeout(5000);
    }

    // Try to fill in the form
    console.log('');
    console.log('📍 Step 3: Filling in DNS record...');

    // Look for Type dropdown/select
    const typeSelectors = [
      'select[name*="type"]',
      'select[id*="type"]',
      '[data-testid*="type"]',
      'select:has-text("Type")'
    ];

    for (const selector of typeSelectors) {
      try {
        const typeField = page.locator(selector).first();
        if (await typeField.isVisible({ timeout: 2000 })) {
          console.log('✅ Found Type field');
          await typeField.selectOption('A');
          console.log('   Set Type to: A');
          break;
        }
      } catch (e) {
        // Try next
      }
    }

    // Look for Name field
    const nameSelectors = [
      'input[name*="name"]',
      'input[name*="host"]',
      'input[id*="name"]',
      'input[placeholder*="name"]',
      'input[placeholder*="@"]'
    ];

    for (const selector of nameSelectors) {
      try {
        const nameField = page.locator(selector).first();
        if (await nameField.isVisible({ timeout: 2000 })) {
          console.log('✅ Found Name field');
          await nameField.clear();
          await nameField.fill('@');
          console.log('   Set Name to: @');
          break;
        }
      } catch (e) {
        // Try next
      }
    }

    // Look for Value/IP field
    const valueSelectors = [
      'input[name*="value"]',
      'input[name*="address"]',
      'input[name*="ip"]',
      'input[id*="value"]',
      'input[placeholder*="address"]',
      'input[type="text"]:not([name*="name"]):not([name*="ttl"])'
    ];

    for (const selector of valueSelectors) {
      try {
        const valueField = page.locator(selector).first();
        if (await valueField.isVisible({ timeout: 2000 })) {
          console.log('✅ Found Value field');
          await valueField.clear();
          await valueField.fill(VERCEL_IP);
          console.log(`   Set Value to: ${VERCEL_IP}`);
          break;
        }
      } catch (e) {
        // Try next
      }
    }

    // Take screenshot of filled form
    await page.screenshot({ path: 'godaddy-filled.png' });
    console.log('📸 Screenshot saved: godaddy-filled.png');

    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('⚠️  PLEASE VERIFY AND SAVE');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('Check that the form shows:');
    console.log(`  Type:  A`);
    console.log(`  Name:  @`);
    console.log(`  Value: ${VERCEL_IP}`);
    console.log('');
    console.log('Then click SAVE or DONE to save the record.');
    console.log('');
    console.log('⏳ Browser will stay open for 5 minutes...');
    console.log('   Close when done, or press Ctrl+C to exit.');
    console.log('');

    // Keep browser open
    await page.waitForTimeout(300000); // 5 minutes

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'godaddy-error.png' });
    console.log('📸 Error screenshot saved: godaddy-error.png');
    throw error;
  } finally {
    console.log('✅ Closing browser...');
    await browser.close();
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅  DONE');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('DNS changes take 5-60 minutes to propagate');
  console.log('');
  console.log('Verify with:');
  console.log('  vercel domains ls');
  console.log('');
}

autoConfigureGoDaddyDNS()
  .then(() => {
    console.log('🎉 Configuration complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error.message);
    process.exit(1);
  });
