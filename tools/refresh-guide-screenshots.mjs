import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
let chromium;
for (const name of ['playwright', `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`]) {
    try { ({ chromium } = require(name)); break; } catch {}
}
if (!chromium) throw new Error('Playwright is required.');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const target = process.argv[2] || 'http://127.0.0.1:8202/index.html';
const capture = async (name, locator) => {
    if (locator) await locator.evaluate(element => window.scrollTo({
        top: window.scrollY + element.getBoundingClientRect().top - document.getElementById('appHeader').getBoundingClientRect().height - 16,
        behavior: 'instant'
    }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: fileURLToPath(new URL(`../docs-assets/${name}.png`, import.meta.url)) });
};
try {
    await page.goto(target, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
        const confirm = window.appConfirm;
        window.appConfirm = async () => true;
        try { await loadDemoProfile(); } finally { window.appConfirm = confirm; }
    });
    for (const [tab,name] of [['uebersicht','uebersicht'],['lager','lager'],['logbuch','logbuch'],['korallen','korallen'],['masseneingang','wareneingang']]) {
        await page.evaluate(id => selectTab(id), tab);
        await capture(name);
    }
    await page.evaluate(() => selectTab('trace-export'));
    await page.locator('.trace-calculator-card > summary').click();
    await capture('trace', page.locator('.trace-calculator-card > summary'));
    for (const [id,name] of [['kh-ca-korrektur','tools-dosierung'],['salzgehalt-rechner','tools-salz-adsorber'],['meerwasser-aus-c-und-r-anmischen','tools-mischen']]) {
        await page.evaluate(value => { selectTab('tools'); openToolById(value); }, id);
        await capture(name, page.locator(`#tools .tool-tile-card[data-tool-id="${id}"]`));
    }
    await page.evaluate(() => selectTab('einstellungen'));
    await page.locator('.data-recovery-center-card > .settings-accordion > summary').click();
    const cloud = page.locator('.data-safety-section').filter({ hasText: 'Google Drive Sync' });
    await cloud.locator(':scope > summary').click();
    await capture('einstellungen-cloud', cloud);
    if (errors.length) throw new Error(errors.join('\n'));
    console.log('Updated 10 guide screenshots with isolated demo data.');
} finally { await browser.close(); }
