import { chromium, type Page, type Browser } from '@playwright/test';

async function setupDomain() {
  const browser: Browser = await chromium.launch({
    headless: false,
    slowMo: 500  // Slow down by 500ms to see what's happening
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page: Page = await context.newPage();

  console.log('🚀 Starting domain setup process...');
  console.log('First, let\'s go to Vercel to get the DNS records we need...');

  // Step 1: Go to Vercel
  await page.goto('https://vercel.com/login');
  console.log('📍 Please log in to Vercel if needed...');

  // Wait for user to potentially log in
  await page.waitForTimeout(3000);

  // Check if we need to navigate to the project
  const currentUrl = page.url();
  if (!currentUrl.includes('seaready-website')) {
    console.log('🔍 Looking for seaready-website project...');

    // Try to find and click on the project
    try {
      await page.click('text=seaready-website', { timeout: 10000 });
    } catch {
      console.log('ℹ️  Please navigate to your seaready-website project');
      await page.waitForTimeout(5000);
    }
  }

  // Navigate to domains settings
  console.log('⚙️  Going to domain settings...');

  try {
    // Try to click on Settings tab
    await page.click('text=Settings', { timeout: 5000 });
    await page.waitForTimeout(1000);

    // Click on Domains
    await page.click('text=Domains', { timeout: 5000 });
  } catch {
    // Alternative: Try direct navigation
    const projectUrl = page.url();
    if (projectUrl.includes('vercel.com')) {
      await page.goto(`${projectUrl}/settings/domains`);
    }
  }

  console.log('✨ Now on the Domains page');
  console.log('📝 Please type your domain name when prompted');
  console.log('   Example: seaready.co.uk or seaready.com');

  // Wait for user to see the page
  await page.waitForTimeout(3000);

  // Try to find the domain input field
  try {
    const domainInput = await page.locator('input[placeholder*="domain"], input[placeholder*="example.com"], input[type="text"]').first();

    // Focus on the input
    await domainInput.focus();
    console.log('👆 Click on the domain input field and enter your domain');
    console.log('   Then click "Add" or press Enter');

    // Wait for user to add domain
    await page.waitForTimeout(10000);

    console.log('📋 Vercel should now show you the DNS records needed');
    console.log('   Look for either:');
    console.log('   1. Nameservers (ns1.vercel-dns.com, ns2.vercel-dns.com)');
    console.log('   2. A Record (76.76.21.21) and CNAME (cname.vercel-dns.com)');

  } catch (error) {
    console.log('ℹ️  Please add your domain manually in the interface');
  }

  // Keep browser open to see the DNS records
  console.log('\n🔄 Once you see the DNS records from Vercel, press Enter to continue to GoDaddy...');

  // Wait for user confirmation
  await page.waitForTimeout(15000);

  // Step 2: Open GoDaddy in a new tab
  console.log('\n🌐 Opening GoDaddy...');
  const godaddyPage = await context.newPage();
  await godaddyPage.goto('https://www.godaddy.com');

  console.log('📍 Please log in to GoDaddy...');
  console.log('   Once logged in, we\'ll navigate to your domain\'s DNS settings');

  // Wait for login
  await godaddyPage.waitForTimeout(10000);

  // Try to navigate to domains
  try {
    // Look for "My Products" or "Domains" link
    const domainsLink = await godaddyPage.locator('text=/domains?/i, text="My Products"').first();
    await domainsLink.click();

    console.log('📂 Looking for your domains...');
    await godaddyPage.waitForTimeout(3000);

    console.log('🎯 Please click on your domain name to manage it');
    console.log('   Then look for "DNS" or "Manage DNS" button');

  } catch {
    console.log('ℹ️  Please navigate to your domain management page');
    console.log('   Look for: My Products → Domains → [Your Domain] → DNS/Manage DNS');
  }

  await godaddyPage.waitForTimeout(10000);

  console.log('\n📝 DNS Configuration Options:');
  console.log('\n🔧 OPTION 1 - Nameservers (Recommended):');
  console.log('   1. Find "Nameservers" section');
  console.log('   2. Click "Change" or "Edit"');
  console.log('   3. Choose "Custom" or "Enter my own nameservers"');
  console.log('   4. Enter:');
  console.log('      • ns1.vercel-dns.com');
  console.log('      • ns2.vercel-dns.com');
  console.log('   5. Save changes');

  console.log('\n🔧 OPTION 2 - A Record + CNAME:');
  console.log('   1. In DNS Records section:');
  console.log('   2. Edit/Add A Record:');
  console.log('      • Type: A');
  console.log('      • Name: @');
  console.log('      • Value: 76.76.21.21');
  console.log('   3. Edit/Add CNAME Record:');
  console.log('      • Type: CNAME');
  console.log('      • Name: www');
  console.log('      • Value: cname.vercel-dns.com');
  console.log('   4. Save all changes');

  console.log('\n⏱️  DNS propagation takes 1-48 hours (usually 2-4 hours)');
  console.log('✅ Vercel will automatically provision SSL certificate once DNS verifies');

  console.log('\n🎉 Keep both browser tabs open to complete the configuration');
  console.log('   Press Ctrl+C when you\'re done with the setup');

  // Keep browser open
  await page.waitForTimeout(300000); // Wait 5 minutes before auto-closing
}

// Run the setup
setupDomain().catch(console.error);