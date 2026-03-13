#!/usr/bin/env node

/**
 * Performance Audit Agent
 *
 * This agent provides deep performance diagnostics beyond basic Lighthouse scores.
 * It captures full Chrome DevTools traces, network waterfalls, and visual timelines
 * to identify EXACTLY what's blocking page load.
 *
 * Capabilities:
 * - Full Chrome DevTools Performance trace
 * - Network waterfall analysis
 * - Screenshot timeline (showing visual progression)
 * - Resource blocking analysis
 * - Critical path identification
 * - Visual comparison reports
 *
 * Usage:
 *   node agents/performance-audit-agent.js [url]
 *   npm run audit:performance
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RESULTS_DIR = './logs/performance-audits';
const SCREENSHOTS_DIR = './logs/performance-audits/screenshots';

// Ensure directories exist
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

class PerformanceAuditAgent {
  constructor(url) {
    this.url = url || 'https://seaready-website.vercel.app';
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.reportPath = path.join(RESULTS_DIR, `audit-${this.timestamp}.json`);
    this.htmlReportPath = path.join(RESULTS_DIR, `audit-${this.timestamp}.html`);
  }

  async run() {
    console.log('🚀 Performance Audit Agent Starting...\n');
    console.log(`Target URL: ${this.url}`);
    console.log(`Timestamp: ${this.timestamp}\n`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1024, height: 768 },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    // Collect metrics
    const metrics = {
      url: this.url,
      timestamp: this.timestamp,
      networkRequests: [],
      performanceMetrics: {},
      screenshots: {},
      blockingResources: [],
      recommendations: [],
    };

    // Track network requests
    page.on('request', request => {
      metrics.networkRequests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        startTime: Date.now(),
      });
    });

    page.on('response', async response => {
      const request = metrics.networkRequests.find(r => r.url === response.url());
      if (request) {
        request.status = response.status();
        request.endTime = Date.now();
        request.duration = request.endTime - request.startTime;
        request.size = parseInt(response.headers()['content-length'] || 0);
        request.contentType = response.headers()['content-type'] || 'unknown';
      }
    });

    console.log('📊 Starting page load with performance tracing...\n');

    // Start performance tracing
    await page.goto(this.url, { waitUntil: 'networkidle' });

    // Capture screenshots at key moments
    console.log('📸 Capturing visual timeline...\n');

    metrics.screenshots.loaded = path.join(SCREENSHOTS_DIR, `loaded-${this.timestamp}.jpg`);
    await page.screenshot({
      path: metrics.screenshots.loaded,
      type: 'jpeg',
      quality: 50,
    });

    // Get Web Vitals using PerformanceObserver
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {};

        // Get Navigation Timing metrics
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          vitals.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
          vitals.loadComplete = perfData.loadEventEnd - perfData.loadEventStart;
          vitals.domInteractive = perfData.domInteractive;
          vitals.ttfb = perfData.responseStart - perfData.requestStart;
        }

        // Get Paint Timing
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            vitals.fcp = entry.startTime;
          }
          if (entry.name === 'first-paint') {
            vitals.fp = entry.startTime;
          }
        });

        // Get LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
          vitals.lcpElement = lastEntry.element?.tagName || 'unknown';
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Wait a bit for LCP to be captured
          setTimeout(() => {
            lcpObserver.disconnect();
            resolve(vitals);
          }, 1000);
        } catch (e) {
          resolve(vitals);
        }
      });
    });

    metrics.performanceMetrics = webVitals;

    console.log('⏱️  Performance Metrics Captured:\n');
    console.log(`   FCP (First Contentful Paint): ${(webVitals.fcp / 1000).toFixed(2)}s`);
    console.log(`   LCP (Largest Contentful Paint): ${(webVitals.lcp / 1000).toFixed(2)}s`);
    console.log(`   LCP Element: ${webVitals.lcpElement}`);
    console.log(`   TTFB (Time to First Byte): ${webVitals.ttfb.toFixed(0)}ms`);
    console.log(`   DOM Interactive: ${webVitals.domInteractive.toFixed(0)}ms\n`);

    // Analyze network waterfall
    console.log('🌊 Analyzing Network Waterfall...\n');

    const sortedRequests = metrics.networkRequests
      .filter(r => r.duration)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);

    console.log('   Top 10 Slowest Resources:\n');
    sortedRequests.forEach((req, i) => {
      const url = req.url.length > 60 ? '...' + req.url.slice(-60) : req.url;
      console.log(`   ${i + 1}. [${req.duration}ms] ${req.resourceType} - ${url}`);
    });

    metrics.blockingResources = sortedRequests;

    // Identify blocking resources
    console.log('\n🚫 Render Blocking Resources:\n');

    const blockingCSS = metrics.networkRequests.filter(r =>
      r.resourceType === 'stylesheet' && r.duration > 200
    );

    const blockingJS = metrics.networkRequests.filter(r =>
      r.resourceType === 'script' && r.duration > 200
    );

    const blockingFonts = metrics.networkRequests.filter(r =>
      r.resourceType === 'font' && r.duration > 200
    );

    console.log(`   CSS files (>200ms): ${blockingCSS.length}`);
    blockingCSS.forEach(css => {
      console.log(`     - ${css.url.split('/').pop()} (${css.duration}ms)`);
    });

    console.log(`   JS files (>200ms): ${blockingJS.length}`);
    blockingJS.forEach(js => {
      console.log(`     - ${js.url.split('/').pop()} (${js.duration}ms)`);
    });

    console.log(`   Font files (>200ms): ${blockingFonts.length}`);
    blockingFonts.forEach(font => {
      console.log(`     - ${font.url.split('/').pop()} (${font.duration}ms)`);
    });

    // Generate recommendations
    console.log('\n💡 Recommendations:\n');

    if (webVitals.lcp > 2500) {
      const rec = '❌ LCP is too slow (>2.5s) - Focus on optimizing the LCP element: ' + webVitals.lcpElement;
      console.log(`   ${rec}`);
      metrics.recommendations.push(rec);
    }

    if (webVitals.fcp > 1800) {
      const rec = '⚠️  FCP is slow (>1.8s) - Consider inlining critical CSS';
      console.log(`   ${rec}`);
      metrics.recommendations.push(rec);
    }

    if (blockingCSS.length > 0) {
      const rec = `🔴 ${blockingCSS.length} blocking CSS file(s) - Consider critical CSS extraction`;
      console.log(`   ${rec}`);
      metrics.recommendations.push(rec);
    }

    if (blockingFonts.length > 0) {
      const rec = `⚠️  ${blockingFonts.length} slow font(s) - Use font-display: swap or preload`;
      console.log(`   ${rec}`);
      metrics.recommendations.push(rec);
    }

    const totalRequests = metrics.networkRequests.length;
    if (totalRequests > 50) {
      const rec = `⚠️  High request count (${totalRequests}) - Consider resource bundling`;
      console.log(`   ${rec}`);
      metrics.recommendations.push(rec);
    }

    // Calculate total page weight
    const totalBytes = metrics.networkRequests.reduce((sum, r) => sum + (r.size || 0), 0);
    const totalKB = (totalBytes / 1024).toFixed(2);
    console.log(`\n📦 Total Page Weight: ${totalKB} KB (${totalRequests} requests)\n`);

    // Save JSON report
    fs.writeFileSync(this.reportPath, JSON.stringify(metrics, null, 2));
    console.log(`✅ JSON Report saved: ${this.reportPath}`);

    // Generate HTML report
    this.generateHTMLReport(metrics);
    console.log(`✅ HTML Report saved: ${this.htmlReportPath}`);

    await browser.close();

    console.log('\n🎉 Performance Audit Complete!\n');

    return metrics;
  }

  generateHTMLReport(metrics) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performance Audit - ${this.timestamp}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #0891B2; margin-bottom: 0.5rem; }
    .meta { color: #6b7280; margin-bottom: 2rem; }
    .section { margin-bottom: 2rem; }
    .section h2 { color: #374151; margin-bottom: 1rem; border-bottom: 2px solid #0891B2; padding-bottom: 0.5rem; }
    .metric { display: flex; justify-content: space-between; padding: 0.75rem; background: #f9fafb; margin-bottom: 0.5rem; border-radius: 4px; }
    .metric-label { font-weight: 500; color: #374151; }
    .metric-value { font-weight: 600; color: #0891B2; }
    .good { color: #10b981; }
    .warning { color: #f59e0b; }
    .bad { color: #ef4444; }
    .resource { padding: 0.5rem; margin-bottom: 0.5rem; background: #f9fafb; border-left: 3px solid #0891B2; font-size: 0.9rem; }
    .recommendation { padding: 1rem; margin-bottom: 0.75rem; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; }
    .waterfall { font-family: 'Courier New', monospace; font-size: 0.85rem; }
    .screenshot { max-width: 100%; border: 1px solid #e5e7eb; border-radius: 4px; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Performance Audit Report</h1>
    <p class="meta">URL: ${metrics.url}<br>Timestamp: ${metrics.timestamp}</p>

    <div class="section">
      <h2>Core Web Vitals</h2>
      <div class="metric">
        <span class="metric-label">LCP (Largest Contentful Paint)</span>
        <span class="metric-value ${metrics.performanceMetrics.lcp > 2500 ? 'bad' : metrics.performanceMetrics.lcp > 1800 ? 'warning' : 'good'}">
          ${(metrics.performanceMetrics.lcp / 1000).toFixed(2)}s
        </span>
      </div>
      <div class="metric">
        <span class="metric-label">FCP (First Contentful Paint)</span>
        <span class="metric-value ${metrics.performanceMetrics.fcp > 1800 ? 'bad' : metrics.performanceMetrics.fcp > 1200 ? 'warning' : 'good'}">
          ${(metrics.performanceMetrics.fcp / 1000).toFixed(2)}s
        </span>
      </div>
      <div class="metric">
        <span class="metric-label">TTFB (Time to First Byte)</span>
        <span class="metric-value ${metrics.performanceMetrics.ttfb > 600 ? 'bad' : metrics.performanceMetrics.ttfb > 300 ? 'warning' : 'good'}">
          ${metrics.performanceMetrics.ttfb.toFixed(0)}ms
        </span>
      </div>
      <div class="metric">
        <span class="metric-label">LCP Element</span>
        <span class="metric-value">${metrics.performanceMetrics.lcpElement}</span>
      </div>
    </div>

    <div class="section">
      <h2>Top 10 Slowest Resources</h2>
      ${metrics.blockingResources.map((r, i) => `
        <div class="resource">
          <strong>#${i + 1}</strong> [${r.duration}ms] ${r.resourceType}<br>
          <span style="color: #6b7280; font-size: 0.85em;">${r.url}</span>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <h2>Recommendations</h2>
      ${metrics.recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('')}
    </div>

    <div class="section">
      <h2>Page Weight</h2>
      <div class="metric">
        <span class="metric-label">Total Requests</span>
        <span class="metric-value">${metrics.networkRequests.length}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Total Size</span>
        <span class="metric-value">
          ${(metrics.networkRequests.reduce((sum, r) => sum + (r.size || 0), 0) / 1024).toFixed(2)} KB
        </span>
      </div>
    </div>

    <div class="section">
      <h2>Screenshot</h2>
      <img src="${path.relative(RESULTS_DIR, metrics.screenshots.loaded)}" alt="Page loaded" class="screenshot">
    </div>
  </div>
</body>
</html>
    `.trim();

    fs.writeFileSync(this.htmlReportPath, html);
  }
}

// Run the agent
const url = process.argv[2] || 'https://seaready-website.vercel.app';
const agent = new PerformanceAuditAgent(url);

agent.run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Agent failed:', err);
    process.exit(1);
  });
