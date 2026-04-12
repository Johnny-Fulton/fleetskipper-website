const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Performance metrics
  const metrics = {};
  
  // Test Homepage
  console.log('Testing Homepage...');
  const homeStart = Date.now();
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  metrics.homeLoadTime = Date.now() - homeStart;
  
  const homeMetrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: perf.domContentLoadedEventEnd - perf.fetchStart,
      loadComplete: perf.loadEventEnd - perf.fetchStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    };
  });
  metrics.home = homeMetrics;
  
  // Test Tools Page
  console.log('Testing Tools Page...');
  const toolsStart = Date.now();
  await page.goto('http://localhost:3002/tools', { waitUntil: 'networkidle' });
  metrics.toolsLoadTime = Date.now() - toolsStart;
  
  const toolsMetrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: perf.domContentLoadedEventEnd - perf.fetchStart,
      loadComplete: perf.loadEventEnd - perf.fetchStart,
    };
  });
  metrics.tools = toolsMetrics;
  
  // Test WBC3 Checker
  console.log('Testing WBC3 Checker...');
  const wbc3Start = Date.now();
  await page.goto('http://localhost:3002/tools/wbc3-checker', { waitUntil: 'networkidle' });
  metrics.wbc3LoadTime = Date.now() - wbc3Start;
  
  // Get bundle sizes
  console.log('Analyzing bundle sizes...');
  const resources = await page.evaluate(() => {
    return performance.getEntriesByType('resource').map(r => ({
      name: r.name,
      size: r.transferSize,
      type: r.initiatorType
    }));
  });
  
  const totalJS = resources.filter(r => r.name.includes('.js')).reduce((sum, r) => sum + r.size, 0);
  const totalCSS = resources.filter(r => r.name.includes('.css')).reduce((sum, r) => sum + r.size, 0);
  const totalImages = resources.filter(r => r.type === 'img').reduce((sum, r) => sum + r.size, 0);
  
  metrics.bundleSizes = {
    javascript: (totalJS / 1024).toFixed(2) + ' KB',
    css: (totalCSS / 1024).toFixed(2) + ' KB',
    images: (totalImages / 1024).toFixed(2) + ' KB',
    totalTransferred: ((totalJS + totalCSS + totalImages) / 1024).toFixed(2) + ' KB'
  };
  
  console.log('\n=== PERFORMANCE REPORT ===\n');
  console.log(JSON.stringify(metrics, null, 2));
  
  fs.writeFileSync('/tmp/performance-report.json', JSON.stringify(metrics, null, 2));
  
  await browser.close();
  console.log('\n✅ Report saved to /tmp/performance-report.json');
})();
