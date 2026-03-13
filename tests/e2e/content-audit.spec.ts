import { test, expect } from '@playwright/test';

test.describe('Content Audit - Homepage', () => {
  test('should capture homepage content for Business Orchestrator review', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://seaready-website.vercel.app');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take full-page screenshot
    await page.screenshot({
      path: 'test-results/homepage-full.png',
      fullPage: true
    });

    // Check for WBC3 urgency banner
    const wbc3Banner = page.locator('text=/WBC3.*Compliance.*Deadline/i');
    const hasBanner = await wbc3Banner.count() > 0;
    console.log('WBC3 Banner Present:', hasBanner);
    if (hasBanner) {
      const bannerText = await wbc3Banner.textContent();
      console.log('Banner Text:', bannerText);
    }

    // Check for "Who We Serve" section
    const whoWeServe = page.locator('text=/Who We Serve/i');
    const hasWhoWeServe = await whoWeServe.count() > 0;
    console.log('Who We Serve Section Present:', hasWhoWeServe);

    // Find bridge section (after Three Pillars, before Our Solutions)
    const bridgeSection = page.locator('text=/detailed look/i');
    const hasBridge = await bridgeSection.count() > 0;
    if (hasBridge) {
      const bridgeText = await bridgeSection.textContent();
      console.log('Bridge Section Text:', bridgeText);
    }

    // Find final CTA section
    const finalCTA = page.locator('text=/Operating a/i').first();
    const hasFinalCTA = await finalCTA.count() > 0;
    if (hasFinalCTA) {
      const ctaHeading = await finalCTA.textContent();
      console.log('Final CTA Heading:', ctaHeading);
    }

    // Get all h2 headings to see page structure
    const h2Headings = await page.locator('h2').allTextContents();
    console.log('All H2 Headings:', h2Headings);
  });
});

test.describe('Content Audit - Workboat SMS Page', () => {
  test('should check if /workboat-sms page exists', async ({ page }) => {
    const response = await page.goto('https://seaready-website.vercel.app/workboat-sms');

    if (response && response.status() === 200) {
      console.log('Workboat SMS Page: EXISTS');
      await page.screenshot({
        path: 'test-results/workboat-sms-full.png',
        fullPage: true
      });

      // Get page content
      const h1 = await page.locator('h1').first().textContent();
      console.log('Workboat SMS H1:', h1);
    } else {
      console.log('Workboat SMS Page: DOES NOT EXIST (Status:', response?.status(), ')');
    }
  });
});
