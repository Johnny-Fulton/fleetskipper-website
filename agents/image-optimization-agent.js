#!/usr/bin/env node

/**
 * Image Optimization Agent
 *
 * This agent automatically scans and optimizes all images in the project.
 * It identifies oversized images, compresses them safely, and generates reports.
 *
 * Features:
 * - Recursive scanning of public/images/
 * - Smart compression (preserves quality while reducing size)
 * - Backup mode (saves originals before compression)
 * - Batch processing with progress tracking
 * - Detailed before/after reports
 *
 * Usage:
 *   npm run optimize:images
 *   node agents/image-optimization-agent.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = './public/images';
const BACKUP_DIR = './public/images/.backups';
const LOGS_DIR = './logs/image-optimization';
const MAX_SIZE_KB = 200; // Flag images larger than this
const TARGET_QUALITY = 75; // JPEG quality for compression
const BACKUP_MODE = true; // Set to false to skip backups

class ImageOptimizationAgent {
  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.report = {
      timestamp: this.timestamp,
      totalImages: 0,
      optimizedImages: 0,
      totalSavings: 0,
      images: [],
    };

    // Ensure directories exist
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }
    if (BACKUP_MODE && !fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
  }

  async run() {
    console.log('🖼️  Image Optimization Agent Starting...\n');
    console.log(`Scanning directory: ${IMAGES_DIR}`);
    console.log(`Backup mode: ${BACKUP_MODE ? 'ENABLED' : 'DISABLED'}`);
    console.log(`Max size threshold: ${MAX_SIZE_KB}KB\n`);

    // Find all images
    const images = this.findImages(IMAGES_DIR);
    this.report.totalImages = images.length;

    console.log(`Found ${images.length} images\n`);

    // Analyze and optimize
    for (let i = 0; i < images.length; i++) {
      const imagePath = images[i];
      await this.processImage(imagePath, i + 1, images.length);
    }

    // Generate report
    this.generateReport();

    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total images scanned: ${this.report.totalImages}`);
    console.log(`Images optimized: ${this.report.optimizedImages}`);
    console.log(`Total savings: ${(this.report.totalSavings / 1024).toFixed(2)} KB`);
    console.log(`Report saved: ${path.join(LOGS_DIR, `report-${this.timestamp}.json`)}`);
    console.log('='.repeat(60) + '\n');

    if (BACKUP_MODE && this.report.optimizedImages > 0) {
      console.log(`⚠️  Backups saved to: ${BACKUP_DIR}`);
      console.log(`To restore, copy files back from backups folder\n`);
    }
  }

  findImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip backup directory
        if (!filePath.includes('.backups')) {
          this.findImages(filePath, fileList);
        }
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        fileList.push(filePath);
      }
    });

    return fileList;
  }

  async processImage(imagePath, current, total) {
    const stats = fs.statSync(imagePath);
    const sizeKB = stats.size / 1024;
    const filename = path.basename(imagePath);

    process.stdout.write(`[${current}/${total}] ${filename.padEnd(40)} `);

    const imageData = {
      path: imagePath,
      filename,
      sizeBefore: stats.size,
      sizeAfter: stats.size,
      optimized: false,
      savings: 0,
    };

    // Only optimize if over threshold
    if (sizeKB > MAX_SIZE_KB) {
      try {
        // Backup original
        if (BACKUP_MODE) {
          const backupPath = path.join(BACKUP_DIR, filename);
          fs.copyFileSync(imagePath, backupPath);
        }

        // Get image metadata
        const metadata = await sharp(imagePath).metadata();

        // Compress image
        const outputPath = imagePath + '.tmp';

        if (metadata.format === 'png') {
          // PNG optimization
          await sharp(imagePath)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(outputPath);
        } else {
          // JPEG optimization
          await sharp(imagePath)
            .jpeg({ quality: TARGET_QUALITY, progressive: true, mozjpeg: true })
            .toFile(outputPath);
        }

        const newStats = fs.statSync(outputPath);
        const newSizeKB = newStats.size / 1024;
        const savings = stats.size - newStats.size;
        const savingsPercent = ((savings / stats.size) * 100).toFixed(1);

        // Only replace if we achieved meaningful savings (>10%)
        if (savings > stats.size * 0.1) {
          fs.renameSync(outputPath, imagePath);

          imageData.sizeAfter = newStats.size;
          imageData.optimized = true;
          imageData.savings = savings;

          this.report.optimizedImages++;
          this.report.totalSavings += savings;

          console.log(`${sizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB (-${savingsPercent}%) ✅`);
        } else {
          // No significant savings, keep original
          fs.unlinkSync(outputPath);
          console.log(`${sizeKB.toFixed(0)}KB (no optimization needed) ⏭️`);
        }
      } catch (error) {
        console.log(`ERROR: ${error.message} ❌`);
      }
    } else {
      console.log(`${sizeKB.toFixed(0)}KB ✓`);
    }

    this.report.images.push(imageData);
  }

  generateReport() {
    const reportPath = path.join(LOGS_DIR, `report-${this.timestamp}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));

    // Also generate a summary HTML
    const htmlPath = path.join(LOGS_DIR, `report-${this.timestamp}.html`);
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Image Optimization Report - ${this.timestamp}</title>
  <style>
    body { font-family: system-ui; padding: 2rem; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; }
    h1 { color: #0891B2; }
    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; }
    .stat { padding: 1rem; background: #f9fafb; border-left: 4px solid #0891B2; }
    .stat-value { font-size: 2rem; font-weight: bold; color: #0891B2; }
    .stat-label { color: #6b7280; font-size: 0.9rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
    th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
    .optimized { color: #10b981; }
    .skipped { color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Image Optimization Report</h1>
    <p>Generated: ${this.timestamp}</p>

    <div class="summary">
      <div class="stat">
        <div class="stat-value">${this.report.totalImages}</div>
        <div class="stat-label">Total Images Scanned</div>
      </div>
      <div class="stat">
        <div class="stat-value">${this.report.optimizedImages}</div>
        <div class="stat-label">Images Optimized</div>
      </div>
      <div class="stat">
        <div class="stat-value">${(this.report.totalSavings / 1024).toFixed(0)} KB</div>
        <div class="stat-label">Total Savings</div>
      </div>
    </div>

    <h2>Optimized Images</h2>
    <table>
      <thead>
        <tr>
          <th>File</th>
          <th>Before</th>
          <th>After</th>
          <th>Savings</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${this.report.images
          .filter(img => img.optimized)
          .map(img => `
            <tr>
              <td>${img.filename}</td>
              <td>${(img.sizeBefore / 1024).toFixed(1)} KB</td>
              <td>${(img.sizeAfter / 1024).toFixed(1)} KB</td>
              <td>${((img.savings / img.sizeBefore) * 100).toFixed(1)}%</td>
              <td class="optimized">✅ Optimized</td>
            </tr>
          `).join('')}
      </tbody>
    </table>

    ${BACKUP_MODE ? `
      <div style="margin-top: 2rem; padding: 1rem; background: #fef3c7; border-left: 4px solid #f59e0b;">
        <strong>⚠️  Backup Mode Enabled</strong><br>
        Original images saved to: <code>${BACKUP_DIR}</code><br>
        To restore, copy files back from the backups folder.
      </div>
    ` : ''}
  </div>
</body>
</html>
    `.trim();

    fs.writeFileSync(htmlPath, html);
    console.log(`\n✅ HTML Report: ${htmlPath}`);
  }
}

// Run the agent
const agent = new ImageOptimizationAgent();
agent.run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Agent failed:', err);
    process.exit(1);
  });
