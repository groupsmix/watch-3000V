#!/usr/bin/env node

/**
 * Bulk replaces AFFILIATE_LINK_* placeholders in all markdown files
 * with real affiliate tracking URLs from affiliate-links.json.
 *
 * Usage: node scripts/replace-affiliate-links.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");
const CONTENT_DIR = path.join(__dirname, "..", "content");
const MAPPING_FILE = path.join(__dirname, "affiliate-links.json");

// Load mapping
const rawMapping = JSON.parse(fs.readFileSync(MAPPING_FILE, "utf8"));
// Filter out _meta key
const mapping = Object.fromEntries(
  Object.entries(rawMapping).filter(([k]) => k.startsWith("AFFILIATE_LINK_"))
);

console.log(`Loaded ${Object.keys(mapping).length} affiliate link mappings.`);
if (DRY_RUN) console.log("DRY RUN — no files will be modified.\n");

let totalFiles = 0;
let totalReplacements = 0;
const missingPlaceholders = new Set();

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let fileReplacements = 0;

  // Find all AFFILIATE_LINK_* occurrences
  const matches = content.match(/AFFILIATE_LINK_[A-Z0-9_]+/g);
  if (!matches) return;

  for (const placeholder of matches) {
    const url = mapping[placeholder];
    if (url) {
      content = content.replace(placeholder, url);
      fileReplacements++;
    } else {
      missingPlaceholders.add(placeholder);
    }
  }

  if (fileReplacements > 0) {
    totalFiles++;
    totalReplacements += fileReplacements;
    const rel = path.relative(CONTENT_DIR, filePath);
    console.log(`  ${rel}: ${fileReplacements} replacements`);

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, "utf8");
    }
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith(".md")) {
      processFile(fullPath);
    }
  }
}

console.log("Processing content files...\n");
walkDir(CONTENT_DIR);

console.log(`\nDone! ${totalReplacements} replacements across ${totalFiles} files.`);

if (missingPlaceholders.size > 0) {
  console.log(`\nWARNING: ${missingPlaceholders.size} placeholders not found in mapping:`);
  for (const p of missingPlaceholders) {
    console.log(`  - ${p}`);
  }
}
