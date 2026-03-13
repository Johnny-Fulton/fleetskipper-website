import { test, expect } from '@playwright/test';

test('Full site business/marketing review', async ({ page }) => {
  console.log('\n=== SEAREADY WEBSITE - BUSINESS/MARKETING REVIEW ===\n');

  // === HOMEPAGE ===
  console.log('>>> HOMEPAGE ANALYSIS <<<\n');
  await page.goto('https://seaready-website.vercel.app');
  await page.waitForLoadState('networkidle');

  const bodyText = await page.textContent('body') || '';

  // Hero analysis
  const hero = await page.locator('h1').first().textContent();
  console.log('HERO HEADLINE:', hero);

  // Value proposition
  const hasValueProp = bodyText.includes('affordable') || bodyText.includes('simple') || bodyText.includes('built by mariners');
  console.log('VALUE PROPOSITION CLEAR:', hasValueProp ? 'YES' : 'WEAK');

  // Target market signals
  console.log('\nTARGET MARKET SIGNALS:');
  console.log('  - Mentions "workboat":', bodyText.toLowerCase().split('workboat').length - 1, 'times');
  console.log('  - Mentions "merchant":', bodyText.toLowerCase().split('merchant').length - 1, 'times');
  console.log('  - Mentions "fishing":', bodyText.toLowerCase().split('fishing').length - 1, 'times');
  console.log('  - Mentions "international":', bodyText.toLowerCase().split('international').length - 1, 'times');
  console.log('  - Mentions "ISM":', bodyText.toLowerCase().split('ism').length - 1, 'times');
  console.log('  - Mentions "DSM":', bodyText.toLowerCase().split('dsm').length - 1, 'times');

  // WBC3 dominance
  const wbc3Count = bodyText.toUpperCase().split('WBC3').length - 1;
  console.log('  - WBC3 mentions:', wbc3Count, wbc3Count > 5 ? '(DOMINANT - CORNERING RISK)' : '(Balanced)');

  // Pricing visibility
  console.log('\nPRICING TRANSPARENCY:');
  console.log('  - Shows £ amounts:', bodyText.includes('£') ? 'YES' : 'NO');
  console.log('  - "Contact us" pricing:', bodyText.toLowerCase().includes('contact us for pricing') ? 'YES (BAD)' : 'NO (GOOD)');

  // CTAs
  console.log('\nCALL-TO-ACTION ANALYSIS:');
  const ctaButtons = await page.locator('a[href*="consultancy"], a[href*="waitlist"], a[href*="contact"], a[href*="quote"]').all();
  for (const cta of ctaButtons.slice(0, 5)) {
    const text = await cta.textContent();
    const href = await cta.getAttribute('href');
    if (text?.trim()) {
      console.log(`  - "${text.trim()}" → ${href}`);
    }
  }

  // === PRICING PAGE ===
  console.log('\n>>> PRICING PAGE <<<\n');
  await page.goto('https://seaready-website.vercel.app/pricing');
  await page.waitForLoadState('networkidle');
  const pricingText = await page.textContent('body') || '';

  console.log('ESSENTIALS TIER VISIBLE:', pricingText.includes('Essentials') || pricingText.includes('£30') ? 'YES' : 'NO');
  console.log('PROFESSIONAL TIER:', pricingText.includes('Professional') ? 'YES' : 'NO');
  console.log('ENTERPRISE TIER:', pricingText.includes('Enterprise') ? 'YES' : 'NO');
  console.log('VESSEL COUNT PRICING:', pricingText.includes('vessel') && pricingText.includes('£') ? 'YES' : 'NO');

  // === CONSULTANCY PAGE ===
  console.log('\n>>> SERVICES/CONSULTANCY PAGE <<<\n');
  await page.goto('https://seaready-website.vercel.app/consultancy');
  await page.waitForLoadState('networkidle');
  const consultancyText = await page.textContent('body') || '';

  console.log('SERVICE PRICING VISIBLE:', consultancyText.includes('£1,500') || consultancyText.includes('£1500') ? 'YES' : 'NO');
  console.log('MULTIPLE SERVICE TIERS:', consultancyText.includes('Gap Analysis') && consultancyText.includes('Audit') ? 'YES' : 'NO');
  console.log('CONVERSION PATH CLEAR:', consultancyText.toLowerCase().includes('quote') || consultancyText.toLowerCase().includes('contact') ? 'YES' : 'NO');

  // === ABOUT PAGE ===
  console.log('\n>>> ABOUT PAGE (CREDIBILITY) <<<\n');
  await page.goto('https://seaready-website.vercel.app/about');
  await page.waitForLoadState('networkidle');
  const aboutText = await page.textContent('body') || '';

  console.log('FOUNDER STORY:', aboutText.includes('Jonathan') || aboutText.includes('marine pilot') ? 'YES' : 'NO');
  console.log('MARITIME CREDENTIALS:', aboutText.includes('Master Mariner') || aboutText.includes('20 years') ? 'YES' : 'NO');
  console.log('CREDIBILITY SIGNALS:', aboutText.includes('experience') || aboutText.includes('pilot') ? 'STRONG' : 'WEAK');

  // === OVERALL ASSESSMENT ===
  console.log('\n>>> BUSINESS ASSESSMENT <<<\n');

  const homeText = await page.goto('https://seaready-website.vercel.app').then(() => page.textContent('body')) || '';

  // Market positioning
  const ukOnly = homeText.toLowerCase().includes('uk workboat') && !homeText.toLowerCase().includes('international');
  console.log('MARKET POSITIONING:');
  console.log('  - UK-only language:', ukOnly ? 'YES (CORNERING RISK)' : 'NO');
  console.log('  - Global-ready messaging:', homeText.includes('international') || homeText.includes('global') ? 'YES' : 'NO');

  // Revenue model clarity
  console.log('\nREVENUE MODEL:');
  console.log('  - Services visible:', homeText.includes('SMS') && homeText.includes('£1,500') ? 'YES' : 'NO');
  console.log('  - Software visible:', homeText.includes('£30') || homeText.includes('platform') ? 'YES' : 'NO');
  console.log('  - Training visible:', homeText.includes('training') || homeText.includes('materials') ? 'YES' : 'NO');

  // Competitive differentiation
  console.log('\nDIFFERENTIATION:');
  console.log('  - "Built by mariners":', homeText.includes('built by mariners') || homeText.includes('Built by Mariners') ? 'YES' : 'NO');
  console.log('  - Affordable positioning:', homeText.includes('affordable') || homeText.includes('£30') ? 'YES' : 'NO');
  console.log('  - vs Enterprise software:', homeText.toLowerCase().includes('enterprise') ? 'MENTIONED' : 'NOT MENTIONED');

  console.log('\n=== END REVIEW ===\n');
});
