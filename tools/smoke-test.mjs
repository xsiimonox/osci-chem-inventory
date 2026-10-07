import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

let chromium;
const playwrightCandidates = [
  'playwright',
  `${process.env.HOME || ''}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`
].filter(Boolean);

for (const candidate of playwrightCandidates) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch (error) {}
}

if (!chromium) {
  console.error('Playwright ist nicht installiert. Installiere es lokal mit: npm i -D playwright');
  process.exit(1);
}

const targetUrl = process.argv[2] || 'http://127.0.0.1:8202/index.html#uebersicht';
const desktopMode = process.argv[3] === 'desktop';
const tabs = [
  'uebersicht',
  'lager',
  'cr-export',
  'trace-export',
  'tools',
  'logbuch',
  'icp',
  'statistik',
  'log',
  'korallen',
  'masseneingang',
  'nachbestellen',
  'einstellungen'
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: desktopMode ? { width: 1440, height: 1000 } : { width: 390, height: 844 },
  isMobile: !desktopMode
});
const errors = [];
const failedRequests = [];

page.on('pageerror', error => errors.push(error.message));
page.on('requestfailed', request => failedRequests.push(request.url()));

await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);

const results = [];
for (const tab of tabs) {
  const hidden = await page.evaluate(tabId => {
    const button = document.getElementById(`tab-${tabId}`);
    return !button || button.hidden || getComputedStyle(button).display === 'none';
  }, tab);
  await page.evaluate(tabId => selectTab(tabId), tab);
  await page.waitForTimeout(150);
  const active = await page.evaluate(() => document.querySelector('.tab-content.active')?.id || '');
  const width = await page.evaluate(() => ({
    inner: window.innerWidth,
    scroll: document.documentElement.scrollWidth
  }));
  const diagnostics = await page.evaluate(tabId => {
    const activeRoot = document.getElementById(tabId);
    const text = activeRoot?.innerText || '';
    const duplicateIds = Array.from(document.querySelectorAll('[id]'))
      .map(node => node.id)
      .filter((id, index, ids) => id && ids.indexOf(id) !== index);
    const brokenImages = Array.from(activeRoot?.querySelectorAll('img') || [])
      .filter(image => image.complete && image.naturalWidth === 0)
      .map(image => image.currentSrc || image.src);
    const isInsideHorizontalScroller = control => {
      let parent = control.parentElement;
      while (parent && parent !== activeRoot) {
        const style = getComputedStyle(parent);
        if (['auto', 'scroll'].includes(style.overflowX) && parent.scrollWidth > parent.clientWidth + 2) return true;
        parent = parent.parentElement;
      }
      return false;
    };
    const overflowingControls = Array.from(activeRoot?.querySelectorAll('input, select, textarea, button') || [])
      .filter(control => control.getBoundingClientRect().right > window.innerWidth + 2 && !isInsideHorizontalScroller(control))
      .map(control => control.id || control.textContent?.trim().slice(0, 40) || control.tagName);
    return {
      invalidContent: /\b(?:undefined|NaN)\b/.test(text),
      duplicateIds: [...new Set(duplicateIds)],
      brokenImages,
      overflowingControls
    };
  }, tab);
  results.push({
    tab,
    active,
    hidden,
    ok: hidden ? active !== tab : active === tab,
    horizontalOverflow: width.scroll > width.inner + 2,
    ...diagnostics
  });
}

const storageHealth = await page.evaluate(async () => {
  if (typeof runStorageHealthCheck !== 'function') return null;
  return await runStorageHealthCheck(false);
});
const persisted = await page.evaluate(async () => {
  if (typeof flushPendingPersistence !== 'function') return null;
  return await flushPendingPersistence('smoke-test', false);
});

await browser.close();

const failedTabs = results.filter(result => !result.ok
  || result.horizontalOverflow
  || result.invalidContent
  || result.duplicateIds.length
  || result.brokenImages.length
  || result.overflowingControls.length);
const ok = failedTabs.length === 0 && errors.length === 0 && failedRequests.length === 0 && persisted === true && storageHealth?.ok === true;
console.log(JSON.stringify({
  ok,
  targetUrl,
  viewport: desktopMode ? 'desktop' : 'mobile',
  failedTabs,
  persisted,
  storageHealth,
  errors,
  failedRequests: failedRequests.slice(0, 10)
}, null, 2));

process.exit(ok ? 0 : 1);
