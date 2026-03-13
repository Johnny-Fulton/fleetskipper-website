# SeaReady Website - Performance Agents

This directory contains specialized agents for monitoring, optimizing, and maintaining website performance.

## 🤖 Available Agents

### 1. Performance Audit Agent (`performance-audit-agent.js`)

**Purpose:** Deep performance diagnostics with Chrome DevTools traces

**What it does:**
- Captures full network waterfall
- Identifies render-blocking resources
- Analyzes Web Vitals (FCP, LCP, TTFB)
- Screenshots visual timeline
- Generates HTML + JSON reports

**Usage:**
```bash
npm run audit:performance
# or
node agents/performance-audit-agent.js [url]
```

**Output:**
- `logs/performance-audits/audit-[timestamp].json` - Raw data
- `logs/performance-audits/audit-[timestamp].html` - Visual report
- `logs/performance-audits/screenshots/` - Timeline screenshots

**When to use:**
- After major code changes
- When LCP/FCP metrics regress
- To identify blocking resources
- Before performance optimization work

---

### 2. Image Optimization Agent (`image-optimization-agent.js`)

**Purpose:** Batch image compression and optimization

**What it does:**
- Scans all images in public/images/
- Identifies oversized images (>200KB)
- Compresses images using Sharp
- Generates before/after reports
- Safe mode: creates backups before compression

**Usage:**
```bash
npm run optimize:images
# or
node agents/image-optimization-agent.js
```

**Output:**
- Compressed images (in-place or backup mode)
- `logs/image-optimization-[timestamp].json` - Report

**When to use:**
- After adding new images
- When page weight is too high
- Monthly maintenance runs

---

### 3. Continuous Monitoring Agent (`monitoring-agent.js`)

**Purpose:** Track performance trends over time

**What it does:**
- Runs Lighthouse daily/weekly
- Tracks metric history
- Detects performance regressions
- Sends alerts when metrics degrade

**Usage:**
```bash
npm run monitor:performance
# or setup cron job
```

**Output:**
- `logs/monitoring/trends.json` - Historical data
- `logs/monitoring/alerts.json` - Regression alerts

**When to use:**
- Setup as cron job (daily)
- After deployment to production
- For monthly performance reports

---

## 🚀 Quick Start

1. **Run initial audit:**
   ```bash
   npm run audit:performance
   ```

2. **Optimize images:**
   ```bash
   npm run optimize:images
   ```

3. **Check results:**
   Open `logs/performance-audits/audit-[latest].html` in browser

---

## 📊 Understanding Reports

### Performance Audit Report

**Good scores:**
- FCP: <1.8s ✅
- LCP: <2.5s ✅
- TTFB: <600ms ✅

**Warning scores:**
- FCP: 1.8s-3.0s ⚠️
- LCP: 2.5s-4.0s ⚠️
- TTFB: 600ms-1200ms ⚠️

**Poor scores:**
- FCP: >3.0s ❌
- LCP: >4.0s ❌
- TTFB: >1200ms ❌

### Common Issues & Fixes

**Issue: LCP >2.5s**
- Check LCP element (usually hero image)
- Optimize image size/format
- Add `priority` flag to Next.js Image
- Preload critical resources

**Issue: High JS blocking time**
- Defer non-critical JavaScript
- Code-split large bundles
- Use dynamic imports

**Issue: Slow fonts**
- Use `font-display: swap`
- Preconnect to font CDN
- Consider system fonts

---

## 🔧 Configuration

Edit agent settings in each file:

```javascript
// performance-audit-agent.js
const RESULTS_DIR = './logs/performance-audits';

// image-optimization-agent.js
const MAX_IMAGE_SIZE = 200 * 1024; // 200KB
const TARGET_QUALITY = 75;
```

---

## 📈 Integration with CI/CD

Add to GitHub Actions:

```yaml
name: Performance Audit
on: [push]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run audit:performance
      - uses: actions/upload-artifact@v2
        with:
          name: performance-report
          path: logs/performance-audits/
```

---

## 🛠️ Development

To create a new agent:

1. Create `agents/your-agent.js`
2. Add npm script to `package.json`
3. Document in this README
4. Add to `.gitignore` if needed

---

## 📝 License

These agents are part of the SeaReady project.

---

**Last Updated:** 2026-01-30
**Maintained by:** Website Orchestrator
