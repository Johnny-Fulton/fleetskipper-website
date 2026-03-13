#!/usr/bin/env node
/**
 * Process Workboat Images
 *
 * This script processes authentic workboat photos for the SeaReady website:
 * - Analyzes image dimensions and file sizes
 * - Compresses and optimizes for web delivery
 * - Creates multiple sizes (hero, card, thumbnail)
 * - Organizes into proper directory structure
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'workboat pics');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'workboats');

// Target dimensions for different uses
const SIZES = {
  hero: { width: 1920, height: 1080, quality: 85, suffix: '-hero' },
  large: { width: 1200, height: 800, quality: 85, suffix: '-large' },
  card: { width: 800, height: 600, quality: 80, suffix: '-card' },
  thumbnail: { width: 400, height: 300, quality: 75, suffix: '-thumb' }
};

async function analyzeImage(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = fs.statSync(filePath);

    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      orientation: metadata.width > metadata.height ? 'landscape' : 'portrait',
      aspectRatio: (metadata.width / metadata.height).toFixed(2)
    };
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return null;
  }
}

async function processImage(inputPath, outputBaseName, size) {
  const outputPath = path.join(
    OUTPUT_DIR,
    `${outputBaseName}${size.suffix}.jpg`
  );

  try {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: size.quality, mozjpeg: true })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    return {
      path: outputPath,
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024)
    };
  } catch (error) {
    console.error(`Error processing ${inputPath} to ${outputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚢 SeaReady Workboat Image Processor\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}\n`);
  }

  // Get all image files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.toLowerCase().match(/\.(jpg|jpeg|png)$/))
    .sort();

  console.log(`Found ${files.length} images to process\n`);

  // Analyze all images first
  console.log('📊 Analyzing images...\n');
  const imageData = [];

  for (const file of files) {
    const filePath = path.join(SOURCE_DIR, file);
    const analysis = await analyzeImage(filePath);

    if (analysis) {
      imageData.push({
        filename: file,
        path: filePath,
        ...analysis
      });

      console.log(`${file}:`);
      console.log(`  ${analysis.width}x${analysis.height} (${analysis.orientation})`);
      console.log(`  ${analysis.sizeMB} MB (${analysis.sizeKB} KB)`);
      console.log(`  Aspect ratio: ${analysis.aspectRatio}`);
      console.log('');
    }
  }

  // Summary statistics
  const totalSize = imageData.reduce((sum, img) => sum + img.size, 0);
  const avgSize = totalSize / imageData.length;
  const landscapes = imageData.filter(img => img.orientation === 'landscape').length;
  const portraits = imageData.filter(img => img.orientation === 'portrait').length;

  console.log('\n📈 Summary:');
  console.log(`  Total images: ${imageData.length}`);
  console.log(`  Landscape: ${landscapes}, Portrait: ${portraits}`);
  console.log(`  Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Average size: ${(avgSize / 1024).toFixed(0)} KB`);
  console.log('');

  // Save analysis report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalImages: imageData.length,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      avgSizeKB: (avgSize / 1024).toFixed(0),
      landscape: landscapes,
      portrait: portraits
    },
    images: imageData
  };

  const reportPath = path.join(__dirname, '..', 'logs', 'workboat-images-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Analysis saved to: ${reportPath}\n`);

  console.log('Processing complete! Review the analysis before proceeding with optimization.');
}

main().catch(console.error);
