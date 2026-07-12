import { chromium } from '/Users/simonasbach/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const chromePath = '/Users/simonasbach/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const result = {
  overviewVisible: 0,
  dashboardTitle: null,
  dashboardTiles: 0,
  coralVisible: 0,
  coralTitle: null,
  coralCardCount: 0,
  savedCoralName: null,
  mobileCoralCards: 0,
  errors: []
};

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath
});

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on('pageerror', err => result.errors.push(String(err)));
  page.on('console', msg => {
    if (msg.type() === 'error') result.errors.push(`console:${msg.text()}`);
  });

  await page.goto('http://127.0.0.1:8122/index.html', { waitUntil: 'networkidle' });
  await page.click('#tab-uebersicht');
  await page.waitForTimeout(700);
  result.overviewVisible = await page.locator('#uebersicht.active').count();
  result.dashboardTitle = await page.locator('#uebersicht .dashboard-hero h2').textContent().catch(() => null);
  result.dashboardTiles = await page.locator('#uebersicht .dashboard-tile').count();

  await page.click('#tab-korallen');
  await page.waitForTimeout(700);
  result.coralVisible = await page.locator('#korallen.active').count();
  result.coralTitle = await page.locator('#korallen .coral-hero-copy h3').textContent().catch(() => null);

  await page.fill('#coralName', 'Testkoralle');
  await page.fill('#coralSpecies', 'Acropora');
  await page.fill('#coralLocation', 'Mitte oben');
  await page.fill('#coralNote', 'Playwright Test');
  await page.click('button:has-text("Koralle speichern")');
  await page.waitForTimeout(700);

  result.coralCardCount = await page.locator('#coralCatalogList .coral-card').count();
  result.savedCoralName = await page.locator('#coralCatalogList .coral-card h4').first().textContent().catch(() => null);

  await page.screenshot({ path: '/tmp/reef-dashboard-coral-desktop.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8122/index.html#korallen', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  result.mobileCoralCards = await page.locator('#coralCatalogList .coral-card').count();
  await page.screenshot({ path: '/tmp/reef-dashboard-coral-mobile.png', fullPage: true });
} finally {
  await browser.close();
}

console.log(JSON.stringify(result, null, 2));
