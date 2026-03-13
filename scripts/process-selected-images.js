#!/usr/bin/env node
/**
 * Process Selected Workboat Images
 *
 * Processes the 15 best quality landscape images for the SeaReady website.
 * Creates multiple sizes: hero, large, card, thumbnail
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'Workboat Pics');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'workboats');

// Top 15 high-quality landscape images (selected by resolution + file size)
const SELECTED_IMAGES = [
  { file: 'c1b5135f-08d1-4cc8-8a83-c7cb9522ed18.JPG', name: 'workboat-01' },  // 5120x2789
  { file: '768cb2c5-2153-483d-8577-af4278a92d97.JPG', name: 'workboat-02' },  // 4032x3024, 2.97MB
  { file: 'a2f36527-92ad-4eca-b4c2-40e7ae3d2270.JPG', name: 'workboat-03' },  // 4032x3024, 2.70MB
  { file: '91675872-7291-4fff-893e-06199cca24f9.JPG', name: 'workboat-04' },  // 4032x3024, 1.88MB
  { file: 'c1407034-7948-4830-88ee-0b4965478894.jpg', name: 'workboat-05' },  // 4032x3024, 1.76MB
  { file: 'dd6ece00-dab3-4313-939a-f4bbe505dfcf.jpg', name: 'workboat-06' },  // 4032x3024, 1.69MB
  { file: '150eace2-2fd4-455c-bc39-37f06b7ef480.jpg', name: 'workboat-07' },  // 4032x3024, 1.65MB
  { file: 'fffe6fc9-25c2-4aa2-aabc-1e1e307e97b0.jpg', name: 'workboat-08' },  // 4032x2268, 1.55MB
  { file: '015601b7-3a2e-4482-95af-3032d089dc8d.jpg', name: 'workboat-09' },  // 4032x2268, 1.54MB
  { file: 'f6e3af85-e93a-45ba-8f24-513917e24430.JPG', name: 'workboat-10' },  // 4032x2268, 1.52MB
  { file: '45124968-44ac-4bdb-bdbb-f8043e6b3694.JPG', name: 'workboat-11' },  // 4032x2268, 1.41MB
  { file: '3a8d33f6-4e41-48d5-8b9a-3f917a9884bd.JPG', name: 'workboat-12' },  // 4032x3024, 1.37MB
  { file: '84ba383e-f7a1-45ba-8680-4bf3e7d74bfc.jpg', name: 'workboat-13' },  // 4032x2268, 1.22MB
  { file: '4286b234-6efc-422d-9c32-83689b21555a.jpg', name: 'workboat-14' },  // 4032x2268, 1.17MB
  { file: 'f994ff93-99c0-4573-b7ed-9868e633dd8e.JPG', name: 'workboat-15' },  // 4032x3024, 1.16MB
];

// Output sizes
const SIZES = {
  hero: { width: 1920, height: 1080, quality: 85 },
  large: { width: 1200, height: 800, quality: 85 },
  card: { width: 800, height: 600, quality: 80 },
  thumb: { width: 400, height: 300, quality: 75 }
};

async function processImage(inputPath, baseName) {
  const results = [];

  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputPath = path.join(OUTPUT_DIR, `${baseName}-${sizeName}.jpg`);

    try {
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: config.quality, mozjpeg: true })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      results.push({
        size: sizeName,
        path: outputPath,
        sizeKB: Math.round(stats.size / 1024)
      });

      console.log(`  ✓ ${sizeName}: ${Math.round(stats.size / 1024)}KB`);
    } catch (error) {
      console.error(`  ✗ ${sizeName}: ${error.message}`);
    }
  }

  return results;
}

async function main() {
  console.log('🚢 SeaReady Image Processor - Selected Images\n');
  console.log(`Processing ${SELECTED_IMAGES.length} images into ${Object.keys(SIZES).length} sizes each\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created: ${OUTPUT_DIR}\n`);
  }

  const report = {
    timestamp: new Date().toISOString(),
    images: []
  };

  let totalOutputSize = 0;
  let processed = 0;

  for (const img of SELECTED_IMAGES) {
    const inputPath = path.join(SOURCE_DIR, img.file);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠ Not found: ${img.file}`);
      continue;
    }

    console.log(`[${++processed}/${SELECTED_IMAGES.length}] ${img.file} → ${img.name}`);

    const results = await processImage(inputPath, img.name);

    const imageReport = {
      original: img.file,
      baseName: img.name,
      outputs: results
    };
    report.images.push(imageReport);

    for (const r of results) {
      totalOutputSize += r.sizeKB;
    }

    console.log('');
  }

  // Summary
  console.log('═'.repeat(50));
  console.log(`\n✅ Complete!`);
  console.log(`   Images processed: ${processed}`);
  console.log(`   Files created: ${processed * Object.keys(SIZES).length}`);
  console.log(`   Total size: ${(totalOutputSize / 1024).toFixed(2)} MB`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);

  // Save report
  const reportPath = path.join(__dirname, '..', 'logs', 'image-processing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Report saved: ${reportPath}\n`);

  // Print usage reference
  console.log('Usage in Next.js:');
  console.log('  <Image src="/images/workboats/workboat-01-hero.jpg" ... />');
  console.log('  <Image src="/images/workboats/workboat-01-card.jpg" ... />');
}

main().catch(console.error);
