#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

console.log('🔍 Checking for raw hex colors...\n');

try {
  // Check for hex colors in TypeScript/React files, excluding certain files
  const cmd = `grep -r '\\[#[0-9A-Fa-f]\\{3,6\\}\\]' src/ --include='*.tsx' --include='*.ts' --exclude-dir=node_modules --exclude-dir=.next || true`;
  
  const out = execSync(cmd, { encoding: 'utf-8' });
  
  if (out.trim()) {
    console.error('❌ Raw hex colors found! Use tokens from tailwind.config.ts instead:\n');
    console.error('Token mapping:');
    console.error('  #0E1A2B → navy');
    console.error('  #13263F → navy-light'); 
    console.error('  #0891B2 → sea-teal');
    console.error('  #F97316 → brand-orange');
    console.error('  #0B132B → ink\n');
    console.error('Found in:');
    console.error(out);
    process.exit(1);
  }
  
  console.log('✅ No raw hex colors found! All colors use design tokens.\n');
} catch (error) {
  console.error('Error running hex check:', error.message);
  process.exit(1);
}