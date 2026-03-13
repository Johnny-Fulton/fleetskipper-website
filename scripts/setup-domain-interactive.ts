import { chromium, type Page, type Browser } from '@playwright/test';

async function setupDomainInteractive() {
  const browser: Browser = await chromium.launch({
    headless: false,
    slowMo: 100  // Slower actions to see what's happening
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page: Page = await context.newPage();

  console.log('🚀 Starting domain setup process...\n');

  // Step 1: Vercel Setup
  console.log('📍 Step 1: VERCEL - Getting DNS records');
  console.log('=========================================\n');

  await page.goto('https://vercel.com/dashboard');
  console.log('Opening Vercel dashboard...');
  console.log('👉 Please log in if needed\n');

  // Wait for dashboard to load
  await page.waitForTimeout(5000);

  try {
    // Look for the seaready-website project
    console.log('🔍 Looking for seaready-website project...');

    // Try multiple selectors for the project
    const projectSelectors = [
      'text=seaready-website',
      '[href*="seaready-website"]',
      'a:has-text("seaready-website")',
      'div:has-text("seaready-website")'
    ];

    let clicked = false;
    for (const selector of projectSelectors) {
      try {
        await page.click(selector, { timeout: 3000 });
        clicked = true;
        console.log('✅ Found and clicked on seaready-website project');
        break;
      } catch {
        // Try next selector
      }
    }

    if (!clicked) {
      console.log('⚠️  Could not find project automatically');
      console.log('👉 Please click on your seaready-website project manually\n');
      await page.waitForTimeout(10000);
    }

  } catch (error) {
    console.log('ℹ️  Please navigate to your seaready-website project');
  }

  // Wait for project page to load
  await page.waitForTimeout(3000);

  // Navigate to Settings > Domains
  console.log('\n📂 Navigating to Settings > Domains...');

  try {
    // Click Settings tab
    await page.click('a:has-text("Settings"), button:has-text("Settings")', { timeout: 5000 });
    await page.waitForTimeout(2000);

    // Click Domains
    await page.click('a:has-text("Domains"), button:has-text("Domains")', { timeout: 5000 });
    console.log('✅ Now on Domains page\n');
  } catch {
    console.log('⚠️  Could not navigate automatically');
    console.log('👉 Please go to: Settings → Domains\n');
    await page.waitForTimeout(5000);
  }

  // Domain input
  console.log('📝 Domain Configuration');
  console.log('=======================');
  console.log('Enter your domain in the input field');
  console.log('Example: seaready.co.uk or seaready.com');
  console.log('Then click "Add" button\n');

  // Wait for user to add domain
  console.log('⏳ Waiting for you to add your domain...\n');
  await page.waitForTimeout(15000);

  console.log('📋 DNS Records from Vercel:');
  console.log('===========================');
  console.log('Vercel should now show you one of these options:\n');
  console.log('Option 1 - Nameservers:');
  console.log('  • ns1.vercel-dns.com');
  console.log('  • ns2.vercel-dns.com\n');
  console.log('Option 2 - DNS Records:');
  console.log('  • A Record: @ → 76.76.21.21');
  console.log('  • CNAME: www → cname.vercel-dns.com\n');

  console.log('✍️  Please write down or screenshot these DNS records');
  console.log('Press Enter in the terminal when ready to continue to GoDaddy...\n');

  // Wait longer for user to note down records
  await page.waitForTimeout(20000);

  // Step 2: GoDaddy Setup
  console.log('\n📍 Step 2: GODADDY - Configuring DNS');
  console.log('=====================================\n');

  const godaddyPage = await context.newPage();
  await godaddyPage.goto('https://www.godaddy.com/');

  console.log('Opening GoDaddy...');
  console.log('👉 Please log in to your GoDaddy account\n');

  // Wait for login
  await godaddyPage.waitForTimeout(8000);

  // Try to navigate to domains
  console.log('🔍 Looking for domain management...\n');

  try {
    // Try to click on My Products or Domains
    const domainLinks = [
      'text="My Products"',
      'text="Domains"',
      'a:has-text("Manage")',
      'text="Domain Portfolio"'
    ];

    for (const selector of domainLinks) {
      try {
        await godaddyPage.click(selector, { timeout: 3000 });
        console.log('✅ Found domains section');
        break;
      } catch {
        // Try next
      }
    }
  } catch {
    console.log('ℹ️  Please navigate to your domains manually');
  }

  await godaddyPage.waitForTimeout(5000);

  console.log('\n🎯 GoDaddy DNS Setup Instructions');
  console.log('==================================\n');

  console.log('1️⃣  Find your domain in the list');
  console.log('2️⃣  Click on the domain name or "DNS" button');
  console.log('3️⃣  Choose your configuration method:\n');

  console.log('📌 METHOD A - Nameservers (Recommended):');
  console.log('=========================================');
  console.log('1. Look for "Nameservers" section');
  console.log('2. Click "Change" or "Edit"');
  console.log('3. Select "Enter my own nameservers (advanced)"');
  console.log('4. Delete existing nameservers');
  console.log('5. Add these two:');
  console.log('   • ns1.vercel-dns.com');
  console.log('   • ns2.vercel-dns.com');
  console.log('6. Click "Save"\n');

  console.log('📌 METHOD B - DNS Records:');
  console.log('==========================');
  console.log('1. Stay with GoDaddy nameservers');
  console.log('2. In "DNS Records" section:');
  console.log('3. Edit/Add A Record:');
  console.log('   • Type: A');
  console.log('   • Name: @');
  console.log('   • Value: 76.76.21.21');
  console.log('   • TTL: 600 (or default)');
  console.log('4. Edit/Add CNAME Record:');
  console.log('   • Type: CNAME');
  console.log('   • Name: www');
  console.log('   • Value: cname.vercel-dns.com');
  console.log('   • TTL: 600 (or default)');
  console.log('5. Save all changes\n');

  console.log('⏱️  Important Notes:');
  console.log('====================');
  console.log('• DNS propagation: 1-48 hours (typically 2-4 hours)');
  console.log('• SSL certificate: Auto-provisioned once DNS verifies');
  console.log('• Both www and non-www will work');
  console.log('• Email services: Won\'t be affected with Method B\n');

  console.log('🎉 Keep both browser tabs open to complete the configuration');
  console.log('💡 You can verify propagation at: https://dnschecker.org\n');

  // Keep browsers open for manual configuration
  console.log('Browsers will stay open for configuration...');
  console.log('Press Ctrl+C when you\'re done\n');

  // Keep alive
  while (true) {
    await page.waitForTimeout(60000);
  }
}

// Run the setup
setupDomainInteractive().catch(console.error);