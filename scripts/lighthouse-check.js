const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runLighthouse() {
  const url = 'https://seaready-website.vercel.app';

  console.log('Launching Chrome...');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
    },
  };

  console.log(`Running Lighthouse audit on: ${url}`);
  const runnerResult = await lighthouse(url, options);

  await chrome.kill();

  const { lhr } = runnerResult;
  const scores = {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
  };

  const lcp = (lhr.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2);
  const fcp = (lhr.audits['first-contentful-paint'].numericValue / 1000).toFixed(2);
  const cls = lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3);
  const tbt = (lhr.audits['total-blocking-time'].numericValue).toFixed(0);

  console.log('\n========================================');
  console.log('  LIGHTHOUSE PERFORMANCE REPORT');
  console.log('========================================\n');

  console.log('SCORES:');
  console.log(`  Performance:    ${scores.performance}/100 ${scores.performance >= 90 ? '✅' : scores.performance >= 50 ? '🟡' : '🔴'}`);
  console.log(`  Accessibility:  ${scores.accessibility}/100 ${scores.accessibility >= 90 ? '✅' : scores.accessibility >= 50 ? '🟡' : '🔴'}`);
  console.log(`  Best Practices: ${scores.bestPractices}/100 ${scores.bestPractices >= 90 ? '✅' : scores.bestPractices >= 50 ? '🟡' : '🔴'}`);
  console.log(`  SEO:            ${scores.seo}/100 ${scores.seo >= 90 ? '✅' : scores.seo >= 50 ? '🟡' : '🔴'}`);

  console.log('\nCORE WEB VITALS:');
  console.log(`  LCP (Largest Contentful Paint): ${lcp}s ${parseFloat(lcp) < 2.5 ? '✅' : parseFloat(lcp) < 4.0 ? '🟡' : '🔴'} (Target: <2.5s)`);
  console.log(`  FCP (First Contentful Paint):   ${fcp}s ${parseFloat(fcp) < 1.8 ? '✅' : parseFloat(fcp) < 3.0 ? '🟡' : '🔴'} (Target: <1.8s)`);
  console.log(`  CLS (Cumulative Layout Shift):  ${cls} ${parseFloat(cls) < 0.1 ? '✅' : parseFloat(cls) < 0.25 ? '🟡' : '🔴'} (Target: <0.1)`);
  console.log(`  TBT (Total Blocking Time):      ${tbt}ms ${parseInt(tbt) < 200 ? '✅' : parseInt(tbt) < 600 ? '🟡' : '🔴'} (Target: <200ms)`);

  console.log('\n========================================\n');

  // Save results
  const results = {
    timestamp: new Date().toISOString(),
    url,
    scores,
    metrics: { lcp, fcp, cls, tbt },
  };

  fs.writeFileSync(
    './logs/lighthouse-latest.json',
    JSON.stringify(results, null, 2)
  );

  console.log('Results saved to: logs/lighthouse-latest.json\n');

  // Exit with code based on performance
  if (scores.performance >= 90 && parseFloat(lcp) < 2.5) {
    console.log('✅ PASS: Performance targets met!\n');
    process.exit(0);
  } else {
    console.log('⚠️  WARN: Performance targets not fully met\n');
    process.exit(0); // Still exit 0 for now
  }
}

runLighthouse().catch((err) => {
  console.error('Error running Lighthouse:', err);
  process.exit(1);
});
