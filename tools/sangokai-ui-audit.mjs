import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export async function auditSangokai(page, url) {
    const errors = [];
    const onError = error => errors.push(error.message);
    page.on('pageerror', onError);
    const checks = [];
    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
        await page.evaluate(() => {
            const aquarium = createAquariumRecord('SANGOKAI-Rechner-Test', createAquariumData({ volumeLiters: 100 }));
            appState.aquariums[aquarium.id] = aquarium;
            switchAquarium(aquarium.id);
            selectTab('tools');
            openToolFavorite('sangokai-mengen-und-mischen');
        });
        const card = page.locator('.tool-card-grid > .card[data-tool-id="sangokai-mengen-und-mischen"]');
        const quantity = card.locator('[data-sangokai-submenu="product-quantity"]');
        const dilution = card.locator('[data-sangokai-submenu="working-solution"]');
        assert.equal(await card.locator('.sangokai-submenu').count(), 2);
        assert.equal(await card.locator('#doseTrackerHistory').count(), 0);
        await quantity.locator(':scope > summary').click();
        await page.locator('#sangokaiKhCurrent').fill('7');
        await page.locator('#sangokaiKhTarget').fill('8.5');
        assert.match(await page.locator('#sangokaiKhResult').innerText(), /60 ml/);
        await page.locator('#sangokaiCaCurrent').fill('400');
        await page.locator('#sangokaiCaTarget').fill('420');
        assert.match(await page.locator('#sangokaiCaResult').innerText(), /Ca-1: 50 ml · Ca-2: 50 ml/);
        assert.equal(await page.locator('#sangokaiKhVolume').inputValue(), '100');
        assert.equal(await page.locator('#sangokaiCaVolume').getAttribute('readonly'), '');
        checks.push('SANGOKAI quantity calculator retains its KH and paired Ca calculation');

        await dilution.locator(':scope > summary').click();
        await page.locator('#sangokaiDilutionProduct').selectOption('ca-1');
        assert.match(await page.locator('#sangokaiDilutionResult').innerText(), /1[.\s]?000 ml/);
        assert.match(await page.locator('#sangokaiDilutionResult').innerText(), /4[.\s]?000 ml/);
        await page.locator('#sangokaiDilutionProduct').selectOption('ca-2');
        assert.match(await page.locator('#sangokaiDilutionResult').innerText(), /Ca-2/);
        await page.locator('#sangokaiDilutionProduct').selectOption('kh');
        await page.locator('#sangokaiDilutionVolume').fill('2');
        assert.match(await page.locator('#sangokaiDilutionResult').innerText(), /20 L/);
        await page.locator('#sangokaiDilutionVolume').fill('0.5');
        assert.match(await page.locator('#sangokaiDilutionResult').innerText(), /ganze Gebinde/);
        await page.locator('#sangokaiDilutionVolume').fill('1');
        checks.push('SANGOKAI mixing retains 5-fold Ca dilution and whole KH-package validation');

        for (const width of [319, 390, 768, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            const metrics = await card.evaluate(element => {
                const grid = element.parentElement;
                const visible = node => node.getClientRects().length > 0;
                return { width: innerWidth, documentWidth: document.documentElement.scrollWidth,
                    cardWidth: element.getBoundingClientRect().width, gridWidth: grid.clientWidth,
                    overflowingGrids: [...element.querySelectorAll('.tool-grid')].filter(visible).filter(node => node.scrollWidth > node.clientWidth + 1).length,
                    clippedLabels: [...element.querySelectorAll('label')].filter(visible).filter(node => node.scrollWidth > node.clientWidth + 1).length,
                    invalid: /\b(?:NaN|undefined)\b/.test(element.innerText) };
            });
            assert.equal(metrics.documentWidth <= width + 1, true, JSON.stringify(metrics));
            assert.equal(metrics.cardWidth >= metrics.gridWidth - 40, true, JSON.stringify(metrics));
            assert.equal(metrics.overflowingGrids, 0, JSON.stringify(metrics));
            assert.equal(metrics.clippedLabels, 0, JSON.stringify(metrics));
            assert.equal(metrics.invalid, false, JSON.stringify(metrics));
            for (const submenu of [quantity, dilution]) {
                await submenu.locator(':scope > summary').click();
                assert.equal(await submenu.evaluate(element => element.open), false);
                await submenu.locator(':scope > summary').click();
                assert.equal(await submenu.evaluate(element => element.open), true);
            }
            checks.push({ sangokai: metrics, singleClickSubmenus: true });
        }
        assert.deepEqual(errors, []);
        return checks;
    } finally {
        page.off('pageerror', onError);
    }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const require = createRequire(import.meta.url);
    let chromium;
    for (const candidate of ['playwright', `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`]) {
        try { ({ chromium } = require(candidate)); break; } catch {}
    }
    if (!chromium) throw new Error('Playwright is required.');
    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
        const checks = await auditSangokai(await context.newPage(), process.argv[2] || 'http://127.0.0.1:8202/index.html');
        console.log(JSON.stringify({ ok: true, checks }, null, 2));
    } finally {
        await browser.close();
    }
}
