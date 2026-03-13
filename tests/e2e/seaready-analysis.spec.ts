import { test, expect } from '@playwright/test';

test('SeaReady homepage analysis', async ({ page }) => {
  await page.goto('https://seaready-website.vercel.app');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Extract hero text
  const heroHeadline = await page.locator('h1').first().textContent();

  // Extract all CTAs in hero area
  const heroCTAs = await page.locator('header, [class*="hero"]').first().locator('a, button').all();
  const ctaInfo = [];
  for (const cta of heroCTAs) {
    const text = await cta.textContent();
    const href = await cta.getAttribute('href');
    if (text && text.trim()) {
      ctaInfo.push({ text: text.trim(), href });
    }
  }

  // Find WBC3 banner
  const pageText = await page.textContent('body');
  const hasWBC3 = pageText?.includes('WBC3') ? 'YES' : 'NO';

  // Extract all h2 headings (main sections)
  const h2Headings = await page.locator('h2').all();
  const sections = [];
  for (const h2 of h2Headings) {
    const text = await h2.textContent();
    if (text) sections.push(text.trim());
  }

  // Check for "Operating a UK Workboat" text
  const hasWorkboatCTA = pageText?.includes('Operating a UK Workboat') ? 'YES' : 'NO';

  // Check for "Who This Is For" or similar
  const hasWhoSection = pageText?.includes('Who We Work With') || pageText?.includes('Who This Is For') ? 'YES' : 'NO';

  console.log('=== SEAREADY HOMEPAGE ANALYSIS ===\n');
  console.log('HERO HEADLINE:', heroHeadline);
  console.log('\nHERO CTAs:');
  ctaInfo.forEach(cta => console.log(`  - "${cta.text}" → ${cta.href || 'button'}`));
  console.log('\nWBC3 BANNER PRESENT:', hasWBC3);
  console.log('\nMAIN SECTIONS (H2):');
  sections.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  console.log('\n"Operating a UK Workboat" CTA:', hasWorkboatCTA);
  console.log('"Who This Is For" Section:', hasWhoSection);
});
