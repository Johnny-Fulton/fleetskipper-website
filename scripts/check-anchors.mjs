#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const cfgPath = path.join(root, "ops/ANCHORS.yml");

// Check if config exists
if (!fs.existsSync(cfgPath)) {
  console.error("❌ Missing ops/ANCHORS.yml");
  process.exit(1);
}

// Parse YAML config
async function loadConfig() {
  try {
    const yaml = (await import("yaml")).default;
    return yaml.parse(fs.readFileSync(cfgPath, "utf8"));
  } catch (e) {
    console.error("❌ Failed to parse ANCHORS.yml:", e.message);
    process.exit(1);
  }
}

// Get changed files (staged for commit or all uncommitted)
function getChangedFiles() {
  try {
    // Try staged files first
    const staged = execSync("git diff --cached --name-only", { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
    
    if (staged.length > 0) return staged;
    
    // If no staged files, get all modified files
    const modified = execSync("git diff --name-only", { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
    
    const untracked = execSync("git ls-files --others --exclude-standard", { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
    
    return [...modified, ...untracked];
  } catch (e) {
    // Not in a git repo or no changes
    return [];
  }
}

// Convert glob pattern to regex
function globToRegex(glob) {
  return glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, ".*")
    .replace(/\*/g, "[^/]*");
}

// Main check function
async function runChecks() {
  const cfg = await loadConfig();
  const changed = getChangedFiles();
  
  console.log(`\n🔍 Checking ${changed.length} changed files against Web Anchor Mode rules...\n`);
  
  let errors = [];
  
  // 1) Check top-level directories
  if (cfg.allow_top_level) {
    const allow = new Set(cfg.allow_top_level);
    const badToplevel = [...new Set(
      changed
        .map(f => f.split("/")[0])
        .filter(t => t && !t.startsWith(".") && !allow.has(t))
    )];
    
    if (badToplevel.length > 0) {
      errors.push(`New/modified files in disallowed top-level folders: ${badToplevel.join(", ")}`);
    }
  }
  
  // 2) Check required files exist
  if (cfg.must_exist) {
    for (const p of cfg.must_exist) {
      const fullPath = path.join(root, p);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Required anchor file missing: ${p}`);
      }
    }
  }
  
  // 3) Check triggers require targets
  if (cfg.must_update_on_feature && changed.length > 0) {
    for (const rule of cfg.must_update_on_feature) {
      const triggerHit = changed.some(f =>
        rule.triggers.some(glob => new RegExp(globToRegex(glob)).test(f))
      );
      
      if (triggerHit) {
        const missingTargets = rule.targets.filter(t => 
          !changed.includes(t) && !changed.includes(t.replace("src/", ""))
        );
        
        if (missingTargets.length > 0) {
          errors.push(`Rule "${rule.name}" triggered but missing updates to: ${missingTargets.join(", ")}`);
        }
      }
    }
  }
  
  // 4) Check forbidden patterns
  if (cfg.forbid_raw_patterns && changed.length > 0) {
    for (const rule of cfg.forbid_raw_patterns) {
      // Handle both string patterns and object patterns with ignore lists
      const pattern = typeof rule === 'string' ? rule : rule.pattern;
      const ignoreFiles = typeof rule === 'object' ? rule.ignore || [] : [];
      const re = new RegExp(pattern, "gm");
      
      for (const f of changed) {
        // Only check code files, not documentation
        if (!/\.(ts|tsx|js|jsx|css)$/.test(f)) continue;
        
        // Skip documentation and config files
        if (f.includes("CLAUDE_GATE") || f.includes("WEB_ANCHOR_MODE") || 
            f.includes("ANCHORS.yml") || f.includes("README")) continue;
        
        // Skip files in the ignore list for this pattern
        const shouldIgnore = ignoreFiles.some(ignorePath => 
          f.includes(ignorePath) || f.endsWith(ignorePath)
        );
        if (shouldIgnore) continue;
        
        const fullPath = path.join(root, f);
        if (!fs.existsSync(fullPath)) continue;
        
        const text = fs.readFileSync(fullPath, "utf8");
        const matches = text.match(re);
        
        if (matches) {
          // Use custom message if provided, otherwise generate default message
          const message = typeof rule === 'object' && rule.message ? rule.message : null;
          
          if (message) {
            errors.push(`${message} Found in ${f}: ${matches[0]}`);
          } else if (pattern.includes("#[0-9a-fA-F]")) {
            errors.push(`Forbidden hex color found in ${f}: ${matches[0]}`);
          } else if (pattern.includes("console")) {
            errors.push(`console.log found in ${f} - remove for production`);
          } else {
            errors.push(`Forbidden pattern "${pattern}" found in ${f}`);
          }
        }
      }
    }
  }
  
  // 5) Check barrel exports
  if (cfg.require_barrel_exports) {
    for (const r of cfg.require_barrel_exports) {
      const dir = path.join(root, r.dir);
      const barrel = path.join(root, r.barrel);
      
      if (!fs.existsSync(dir)) continue;
      if (!fs.existsSync(barrel)) {
        errors.push(`Barrel file missing: ${r.barrel}`);
        continue;
      }
      
      const files = fs.readdirSync(dir).filter(f => 
        (f.endsWith(".tsx") || f.endsWith(".ts")) && f !== "index.ts" && f !== "index.tsx"
      );
      
      const barrelTxt = fs.readFileSync(barrel, "utf8");
      
      for (const f of files) {
        const name = path.basename(f, path.extname(f));
        const exportPattern = new RegExp(`export.*from.*['"]\\.\\/${name}['"]`);
        
        if (!exportPattern.test(barrelTxt)) {
          errors.push(`Barrel ${r.barrel} missing export for: ${name}`);
        }
      }
    }
  }
  
  // 6) Check file size limits
  if (cfg.max_file_lines && changed.length > 0) {
    for (const f of changed) {
      const fullPath = path.join(root, f);
      if (!fs.existsSync(fullPath)) continue;
      
      const lines = fs.readFileSync(fullPath, "utf8").split("\n").length;
      
      if (f.includes("/components/") && lines > cfg.max_file_lines.components) {
        errors.push(`Component file too large: ${f} has ${lines} lines (max: ${cfg.max_file_lines.components})`);
      } else if (f.includes("/app/") && f.endsWith("page.tsx") && lines > cfg.max_file_lines.pages) {
        errors.push(`Page file too large: ${f} has ${lines} lines (max: ${cfg.max_file_lines.pages})`);
      } else if (f.includes("/services/") && lines > cfg.max_file_lines.services) {
        errors.push(`Service file too large: ${f} has ${lines} lines (max: ${cfg.max_file_lines.services})`);
      }
    }
  }
  
  // Report results
  if (errors.length > 0) {
    console.error("❌ Web Anchor Mode violations found:\n");
    errors.forEach(e => console.error(`  • ${e}`));
    console.error("\n📖 See WEB_ANCHOR_MODE.md for patterns and ops/ANCHORS.yml for rules\n");
    process.exit(1);
  }
  
  console.log("✅ All Web Anchor Mode checks passed!\n");
  console.log("  • No raw hex colors");
  console.log("  • Required files exist");
  console.log("  • Barrel exports complete");
  console.log("  • File sizes within limits");
  console.log("  • No forbidden patterns\n");
}

// Run checks
runChecks().catch(e => {
  console.error("❌ Check failed:", e.message);
  process.exit(1);
});