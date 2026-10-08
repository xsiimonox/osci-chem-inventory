import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(`${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const checks = {};
try {
    await page.goto(process.argv[2] || 'http://127.0.0.1:8202/index.html', { waitUntil: 'networkidle' });
    await page.evaluate(() => selectTab('lager'));
    checks.inventory = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('#lager-container .inventory-card')];
        return {
            count: cards.length,
            lazy: cards.every(card => card.querySelector('[data-stock-details]')?.childElementCount === 0),
            unique: new Set(cards.map(card => JSON.stringify([card.dataset.category, card.dataset.name]))).size === cards.length,
            nav: [...document.querySelectorAll('.mobile-bottom-nav [data-tab]')].map(el => el.dataset.tab)
        };
    });
    checks.favoriteUnique = await page.evaluate(() => {
        const name = document.querySelector('#lager-container .inventory-card').dataset.name;
        toggleFavoriteProduct(name);
        const count = document.querySelectorAll('#lager-container .inventory-card').length;
        toggleFavoriteProduct(name);
        return count === 33;
    });
    checks.listDefault = await page.locator('#lager-container').getAttribute('data-view') === 'list'
        && await page.locator('#lager .inventory-view-switch').count() === 0;
    await page.locator('#lager-container [data-stock-toggle]').first().click();
    checks.productDetails = await page.locator('#lager-container details[open]').count() === 1
        && await page.locator('#lager-container .inventory-card-actions').first().isVisible();
    await page.reload({ waitUntil: 'networkidle' });
    checks.productDetailsStartClosed = await page.locator('#lager-container details[open]').count() === 0;
    await page.locator('#lager-container .product-history summary').first().click();
    await page.evaluate(() => { window.originalAuditPrompt = window.appPrompt; window.appPrompt = async () => '200'; });
    await page.locator('#lager-container [data-stock-capacity]').first().click();
    await page.evaluate(() => { window.appPrompt = window.originalAuditPrompt; });
    await page.reload({ waitUntil: 'networkidle' });
    checks.capacityPersisted = await page.locator('#lager-container meter').count() === 1;
    checks.icp = await page.evaluate(() => {
        const rows = traceCalculatorElements.map(element => ({ name: element.item, symbol: element.symbol, value: 1 }));
        return { full: ReefWorkspaceUI.icpFeedback(rows).includes('11/11 Trace-Elemente erkannt'), partial: ReefWorkspaceUI.icpFeedback(rows.slice(0, 8)).includes('8/11 Trace-Elemente erkannt'), duplicate: ReefWorkspaceUI.icpFeedback([...rows, rows[0]]).includes('Doppelt:') };
    });
    await page.evaluate(() => selectTab('trace-export'));
    await page.locator('.trace-calculator-card > summary').click();
    checks.traceFirst = await page.locator('.trace-config-step').isVisible() && !(await page.locator('.trace-icp-step').isVisible());
    await page.locator('.trace-calculator-body [data-next]').click();
    checks.traceSecond = await page.locator('.trace-icp-step').isVisible();
    await page.locator('.trace-calculator-body [data-next]').click();
    checks.traceThird = await page.locator('.trace-result-step').isVisible() && await page.locator('.trace-calculator-actions').isVisible();
    await page.reload({ waitUntil: 'networkidle' });
    checks.traceStepPersisted = await page.locator('.trace-calculator-body .workspace-step-nav button[aria-current="step"]').textContent() === '3. Rezept';
    await page.evaluate(() => selectTab('cr-export'));
    await page.locator('.cr-paste-card [data-next]').click();
    checks.invalidBlocked = await page.locator('.cr-paste-card .workspace-step-error').textContent() !== '';
    const source = await page.evaluate(() => crOrder.map(() => '1 ml').join(' '));
    await page.locator('#cr-paste-area').fill(source);
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => selectTab('cr-export'));
    checks.draftPersisted = await page.locator('#cr-paste-area').inputValue() === source;
    await page.locator('.cr-paste-card [data-next]').click();
    checks.crPreview = await page.locator('#cr-preview-container').isVisible();
    await page.locator('.cr-paste-card [data-next]').click();
    checks.crConfirm = await page.locator('.cr-paste-card .booking-action').isVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => selectTab('cr-export'));
    checks.crReviewPersisted = await page.locator('[data-cr-final-preview] .cr-preview-row').count() === 11;
    await page.evaluate(() => {
        crOrder.forEach(row => { db.inventory[row.cat][row.name] = 100; });
        window.alert = () => {};
    });
    await page.locator('.cr-paste-card .booking-action').click();
    await page.waitForFunction(() => document.getElementById('cr-paste-area').value === '');
    checks.booking = await page.evaluate(() => ({ correct: crOrder.every(row => db.inventory[row.cat][row.name] === 99), cleared: document.getElementById('cr-paste-area').value === '' }));
    await page.reload({ waitUntil: 'networkidle' });
    checks.bookingPersisted = await page.evaluate(() => crOrder.every(row => db.inventory[row.cat][row.name] === 99));
    for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => selectTab('lager'));
        checks[`layout${width}`] = await page.evaluate(() => [...document.querySelectorAll('#lager .inventory-card, #lager .inventory-card-actions button')].every(el => { const r = el.getBoundingClientRect(); return r.right <= innerWidth + 1 && r.left >= -1; }));
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1200);
    await page.locator('#lager-container .inventory-card').first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: '/tmp/reeftools-inventory-mobile.png', fullPage: false });
    await page.evaluate(() => selectTab('trace-export'));
    await page.locator('.trace-calculator-card > summary').click();
    await page.waitForTimeout(1200);
    await page.locator('.trace-calculator-body .workspace-step-nav').scrollIntoViewIfNeeded();
    await page.screenshot({ path: '/tmp/reeftools-trace-mobile.png', fullPage: false });
    const ok = errors.length === 0 && checks.inventory.count > 0 && checks.inventory.lazy && checks.inventory.unique && checks.inventory.nav.join(',') === 'lager,trace-export,icp,tools,mehr' && Object.entries(checks).every(([key, value]) => typeof value !== 'boolean' || value) && Object.values(checks.icp).every(Boolean) && Object.values(checks.booking).every(Boolean);
    console.log(JSON.stringify({ ok, checks, errors }, null, 2));
    if (!ok) process.exitCode = 1;
} finally { await browser.close(); }
