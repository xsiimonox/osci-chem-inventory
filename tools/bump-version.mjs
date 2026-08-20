import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nextVersionRaw = process.argv[2] || '';
const nextVersion = nextVersionRaw.startsWith('v') ? nextVersionRaw : `v${nextVersionRaw}`;

if (!/^v\d+\.\d+\.\d+$/.test(nextVersion)) {
  console.error('Usage: node tools/bump-version.mjs 3.2.5');
  process.exit(1);
}

const cacheSuffix = nextVersion.replace(/^v/, '').replace(/\./g, '');
const cachebuster = `${nextVersion.slice(1)}-release`;
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => fs.writeFileSync(path.join(root, file), content);

const htmlFiles = ['index.html', 'anleitung.html', 'privacy.html', 'impressum.html'];
for (const htmlPath of htmlFiles) {
  let html = read(htmlPath);
  html = html
    .replace(/assets\/css\/style\.css\?v=[^"]+/g, `assets/css/style.css?v=${cachebuster}`)
    .replace(/assets\/js\/sangokai-data\.js\?v=[^"]+/g, `assets/js/sangokai-data.js?v=${cachebuster}`)
    .replace(/assets\/js\/lighting-sim\.js\?v=[^"]+/g, `assets/js/lighting-sim.js?v=${cachebuster}`)
    .replace(/assets\/js\/app\.js\?v=[^"]+/g, `assets/js/app.js?v=${cachebuster}`);

  if (htmlPath === 'index.html') {
    html = html.replace(/<span class="version-badge">v\d+\.\d+\.\d+<\/span>/, `<span class="version-badge">${nextVersion}</span>`);
  }

  write(htmlPath, html);
}

const versionJson = JSON.parse(read('version.json'));
versionJson.version = nextVersion;
versionJson.updatedAt = new Date().toISOString();
write('version.json', `${JSON.stringify(versionJson, null, 2)}\n`);

let sw = read('sw.js');
sw = sw.replace(/reef-storage-tools-cache-v\d+-[a-z0-9-]+/i, `reef-storage-tools-cache-v${cacheSuffix}-release`);
write('sw.js', sw);

console.log(`ReefTools version updated to ${nextVersion}`);
