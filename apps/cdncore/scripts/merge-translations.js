#!/usr/bin/env node
/**
 * Merges all html_LANG_HANDLE.html temp files into public/product-descriptions/LANG.json
 * Run any time to persist completed translation work.
 */
const fs = require('fs');
const path = require('path');

const batchDir = path.join(__dirname, '..', 'data', 'product-batches');
const outDir = path.join(__dirname, '..', 'public', 'product-descriptions');

const htmlFiles = fs.readdirSync(batchDir).filter(f => f.startsWith('html_') && f.endsWith('.html'));
if (!htmlFiles.length) {
  console.log('No html_ temp files found.');
  process.exit(0);
}

const byLang = {};
for (const fname of htmlFiles) {
  const m = fname.match(/^html_([a-z]+)_(.+)\.html$/);
  if (!m) continue;
  const [, lang, handle] = m;
  if (!byLang[lang]) byLang[lang] = [];
  byLang[lang].push({ fname, handle });
}

for (const [lang, files] of Object.entries(byLang)) {
  const outPath = path.join(outDir, lang + '.json');
  const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : {};
  let added = 0;
  for (const { fname, handle } of files) {
    existing[handle] = fs.readFileSync(path.join(batchDir, fname), 'utf8');
    fs.unlinkSync(path.join(batchDir, fname));
    added++;
  }
  fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
  console.log(`${lang}: +${added} -> total ${Object.keys(existing).length}/292`);
}
