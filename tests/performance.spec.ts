import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

test.describe('Performance Tests', () => {
  test('Homepage Lighthouse audit', async ({ page }) => {
    const url = 'https://seaready-website.vercel.app';

    // Navigate to the page
    await page.goto(url);

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    console.log('Running Lighthouse audit on:', url);

    // Launch Chrome and run Lighthouse
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);

    // Get the report scores
    const { lhr } = runnerResult;
    const scores = {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      bestPractices: lhr.categories['best-practices'].score * 100,
      seo: lhr.categories.seo.score * 100,
    };

    // Get LCP metric
    const lcp = lhr.audits['largest-contentful-paint'].numericValue / 1000;
    const fcp = lhr.audits['first-contentful-paint'].numericValue / 1000;

    console.log('\n=== LIGHTHOUSE SCORES ===');
    console.log(`Performance: ${scores.performance}/100`);
    console.log(`Accessibility: ${scores.accessibility}/100`);
    console.log(`Best Practices: ${scores.bestPractices}/100`);
    console.log(`SEO: ${scores.seo}/100`);
    console.log('\n=== CORE WEB VITALS ===');
    console.log(`LCP (Largest Contentful Paint): ${lcp.toFixed(2)}s`);
    console.log(`FCP (First Contentful Paint): ${fcp.toFixed(2)}s`);

    await chrome.kill();

    // Assert performance targets
    expect(scores.performance).toBeGreaterThanOrEqual(90);
    expect(lcp).toBeLessThan(2.5);
  });
});
