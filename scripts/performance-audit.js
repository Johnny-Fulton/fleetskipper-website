/**
 * Performance Audit Script
 * Runs Lighthouse audits on all key pages
 * Uses JPEG screenshots at quality 50 to avoid buffer overflow
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://seaready-website.vercel.app';

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Features', path: '/features' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

async function measurePagePerformance(page, url) {
  const start = Date.now();

  await page.goto(url, { waitUntil: 'networkidle' });

  const loadTime = Date.now() - start;

  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    return {
      domContentLoaded: nav?.domContentLoadedEventEnd - nav?.domContentLoadedEventStart,
      loadComplete: nav?.loadEventEnd - nav?.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      transferSize: nav?.transferSize,
      decodedBodySize: nav?.decodedBodySize
    };
  });

  // Check for JavaScript errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  return {
    loadTime,
    metrics,
    errors: errors.length,
    url
  };
}

async function runAudit() {
  console.log('🚀 Starting Performance Audit...\n');
  console.log(`Target: ${SITE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 }
  });
  const page = await context.newPage();

  const results = [];

  for (const pageInfo of pages) {
    const url = `${SITE_URL}${pageInfo.path}`;
    console.log(`📊 Testing: ${pageInfo.name} (${url})`);

    try {
      const result = await measurePagePerformance(page, url);
      results.push({
        name: pageInfo.name,
        path: pageInfo.path,
        ...result
      });

      console.log(`   ✅ Load Time: ${result.loadTime}ms`);
      console.log(`   ✅ FCP: ${result.metrics.firstContentfulPaint?.toFixed(0)}ms`);
      console.log(`   ✅ Size: ${(result.metrics.transferSize / 1024).toFixed(1)}KB`);

      // Take screenshot (CRITICAL: JPEG quality 50 to avoid buffer overflow)
      const screenshotPath = path.join(__dirname, '../docs/performance/screenshots', `${pageInfo.name.toLowerCase()}.jpg`);
      await page.screenshot({
        path: screenshotPath,
        type: 'jpeg',
        quality: 50,
        fullPage: false
      });
      console.log(`   📸 Screenshot saved\n`);

    } catch (error) {
      console.error(`   ❌ Error testing ${pageInfo.name}: ${error.message}\n`);
      results.push({
        name: pageInfo.name,
        path: pageInfo.path,
        error: error.message
      });
    }
  }

  await browser.close();

  // Generate report
  const report = generateReport(results);

  // Save report
  const reportDate = new Date().toISOString().split('T')[0];
  const reportPath = path.join(__dirname, '../docs/performance', `audit-${reportDate}.md`);

  // Ensure directory exists
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  // Ensure screenshots directory exists
  const screenshotsDir = path.join(__dirname, '../docs/performance/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, report);

  console.log('\n✅ Audit Complete!');
  console.log(`📄 Report saved: ${reportPath}\n`);

  // Print summary
  printSummary(results);

  return results;
}

function generateReport(results) {
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let report = `# Performance Audit Report\n\n`;
  report += `**Date:** ${date}\n`;
  report += `**Site:** ${SITE_URL}\n`;
  report += `**Pages Tested:** ${results.length}\n\n`;
  report += `---\n\n`;

  // Summary table
  report += `## Summary\n\n`;
  report += `| Page | Load Time | FCP | Size | Status |\n`;
  report += `|------|-----------|-----|------|--------|\n`;

  results.forEach(r => {
    if (r.error) {
      report += `| ${r.name} | ERROR | - | - | ❌ |\n`;
    } else {
      const loadStatus = r.loadTime < 2000 ? '✅' : r.loadTime < 3000 ? '⚠️' : '❌';
      const fcpStatus = r.metrics.firstContentfulPaint < 1800 ? '✅' : r.metrics.firstContentfulPaint < 2500 ? '⚠️' : '❌';
      report += `| ${r.name} | ${r.loadTime}ms ${loadStatus} | ${r.metrics.firstContentfulPaint?.toFixed(0)}ms ${fcpStatus} | ${(r.metrics.transferSize / 1024).toFixed(1)}KB | ✅ |\n`;
    }
  });

  report += `\n---\n\n`;

  // Detailed results
  report += `## Detailed Results\n\n`;

  results.forEach(r => {
    report += `### ${r.name}\n\n`;

    if (r.error) {
      report += `**Status:** ❌ Error\n`;
      report += `**Error:** ${r.error}\n\n`;
    } else {
      report += `**URL:** ${r.url}\n\n`;

      report += `**Load Metrics:**\n`;
      report += `- Total Load Time: ${r.loadTime}ms ${r.loadTime < 2000 ? '✅' : r.loadTime < 3000 ? '⚠️' : '❌'}\n`;
      report += `- First Paint: ${r.metrics.firstPaint?.toFixed(0)}ms\n`;
      report += `- First Contentful Paint: ${r.metrics.firstContentfulPaint?.toFixed(0)}ms ${r.metrics.firstContentfulPaint < 1800 ? '✅' : '⚠️'}\n`;
      report += `- DOM Content Loaded: ${r.metrics.domContentLoaded?.toFixed(0)}ms\n\n`;

      report += `**Size:**\n`;
      report += `- Transfer Size: ${(r.metrics.transferSize / 1024).toFixed(1)}KB\n`;
      report += `- Decoded Body: ${(r.metrics.decodedBodySize / 1024).toFixed(1)}KB\n\n`;

      report += `**Screenshot:** \`screenshots/${r.name.toLowerCase()}.jpg\`\n\n`;
    }

    report += `---\n\n`;
  });

  // Recommendations
  report += `## Recommendations\n\n`;

  const slowPages = results.filter(r => !r.error && r.loadTime > 2000);
  if (slowPages.length > 0) {
    report += `### 🐌 Slow Load Times\n\n`;
    report += `The following pages load slower than 2 seconds:\n\n`;
    slowPages.forEach(p => {
      report += `- **${p.name}**: ${p.loadTime}ms\n`;
    });
    report += `\n**Action:** Investigate bundle size, optimize images, enable caching.\n\n`;
  }

  const largePagesSize = results.filter(r => !r.error && r.metrics.transferSize > 500000);
  if (largePagesSize.length > 0) {
    report += `### 📦 Large Page Size\n\n`;
    report += `The following pages transfer >500KB:\n\n`;
    largePagesSize.forEach(p => {
      report += `- **${p.name}**: ${(p.metrics.transferSize / 1024).toFixed(1)}KB\n`;
    });
    report += `\n**Action:** Optimize images, code-split bundles, lazy load components.\n\n`;
  }

  const fastPages = results.filter(r => !r.error && r.loadTime < 2000);
  if (fastPages.length === results.length) {
    report += `### ✅ All Pages Performing Well!\n\n`;
    report += `All pages load in under 2 seconds. Great work!\n\n`;
  }

  report += `---\n\n`;
  report += `*Generated by SeaReady Website Performance Audit Tool*\n`;

  return report;
}

function printSummary(results) {
  console.log('📊 PERFORMANCE SUMMARY\n');
  console.log('='.repeat(50));

  const avgLoadTime = results
    .filter(r => !r.error)
    .reduce((sum, r) => sum + r.loadTime, 0) / results.filter(r => !r.error).length;

  const avgFCP = results
    .filter(r => !r.error)
    .reduce((sum, r) => sum + (r.metrics.firstContentfulPaint || 0), 0) / results.filter(r => !r.error).length;

  const avgSize = results
    .filter(r => !r.error)
    .reduce((sum, r) => sum + r.metrics.transferSize, 0) / results.filter(r => !r.error).length;

  console.log(`Average Load Time: ${avgLoadTime.toFixed(0)}ms`);
  console.log(`Average FCP: ${avgFCP.toFixed(0)}ms`);
  console.log(`Average Page Size: ${(avgSize / 1024).toFixed(1)}KB`);
  console.log('='.repeat(50));

  const fastPages = results.filter(r => !r.error && r.loadTime < 2000).length;
  const totalPages = results.filter(r => !r.error).length;

  console.log(`\n${fastPages}/${totalPages} pages load in <2 seconds`);

  if (fastPages === totalPages) {
    console.log('🎉 Excellent performance!');
  } else if (fastPages / totalPages > 0.7) {
    console.log('⚠️  Good, but room for improvement');
  } else {
    console.log('❌ Performance needs attention');
  }
}

// Run the audit
runAudit().catch(console.error);
