/**
 * GoDaddy DNS Configuration Script (Simplified)
 * Opens Safari to GoDaddy DNS page and keeps it open for manual configuration
 *
 * Usage: node scripts/setup-godaddy-dns-simple.js
 */

const { webkit } = require('playwright');

const DOMAIN = 'seaready.co.uk';
const VERCEL_IP = '76.76.21.21';
const DNS_URL = `https://dcc.godaddy.com/control/${DOMAIN}/dns`;

async function openGoDaddyDNS() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀  GODADDY DNS CONFIGURATION');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📋 Domain: ${DOMAIN}`);
  console.log(`🎯 Target IP: ${VERCEL_IP}`);
  console.log('');

  const browser = await webkit.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🌐 Opening Safari to GoDaddy DNS page...');
  console.log('');

  await page.goto(DNS_URL);

  console.log('═══════════════════════════════════════════════════════════');
  console.log('📝  MANUAL CONFIGURATION STEPS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('1. Log in to GoDaddy (if prompted)');
  console.log('');
  console.log('2. Find or Add an A Record:');
  console.log('   ┌─────────────────────────────────────┐');
  console.log('   │ Type:  A                            │');
  console.log('   │ Name:  @                            │');
  console.log(`   │ Value: ${VERCEL_IP}           │`);
  console.log('   │ TTL:   600 (or default)             │');
  console.log('   └─────────────────────────────────────┘');
  console.log('');
  console.log('3. If an A record with Name "@" EXISTS:');
  console.log('   - Click Edit/Pencil icon');
  console.log(`   - Change IP to: ${VERCEL_IP}`);
  console.log('   - Save');
  console.log('');
  console.log('4. If NO A record with Name "@" exists:');
  console.log('   - Click "Add" or "+ ADD RECORD"');
  console.log('   - Type: A');
  console.log('   - Name: @ (or leave blank)');
  console.log(`   - Value: ${VERCEL_IP}`);
  console.log('   - TTL: 600');
  console.log('   - Save');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('⏳ Browser will stay open for 10 minutes...');
  console.log('   Close the browser when done, or press Ctrl+C to exit.');
  console.log('');

  // Keep browser open for 10 minutes
  await page.waitForTimeout(600000);

  console.log('✅ Closing browser...');
  await browser.close();

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅  NEXT STEPS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('DNS changes can take 5-60 minutes to propagate');
  console.log('');
  console.log('Verify with:');
  console.log('  cd "/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website"');
  console.log('  vercel domains ls');
  console.log('');
  console.log('Check domain:');
  console.log('  https://seaready.co.uk');
  console.log('');
}

openGoDaddyDNS()
  .then(() => {
    console.log('🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
