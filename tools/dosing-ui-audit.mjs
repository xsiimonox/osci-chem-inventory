import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import { auditSangokai } from './sangokai-ui-audit.mjs';

const require = createRequire(import.meta.url);
let chromium;
for (const candidate of ['playwright', `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`]) {
    try { ({ chromium } = require(candidate)); break; } catch {}
}
if (!chromium) throw new Error('Playwright is required.');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://localhost');
        const file = path.resolve(root, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
        if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
        response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
        response.end(await readFile(file));
    } catch { response.writeHead(404); response.end(); }
});
const checks = [];
const errors = [];
const output = path.join(os.tmpdir(), 'reeftools-dosing-audit');
let browser;
try {
    await mkdir(output, { recursive: true });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = process.argv[2] || `http://127.0.0.1:${server.address().port}/index.html`;
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await page.evaluate(() => {
        const legacy = { form: { product: 'kh', targetValue: '7.5', targetDays: '10', maxChangePercent: '10' }, measurements: [
            { id: 'legacy-1', product: 'kh', at: '2026-10-01T12:00:00Z', value: 7, doseMlPerDay: 10 },
            { id: 'legacy-2', product: 'kh', at: '2026-10-05T12:00:00Z', value: 7.2, doseMlPerDay: 10 }
        ] };
        const profile = { filtersConfigured: true, providers: ['osci', 'fauna-marin', 'own-powder'], calculators: { sangokai: { doseTracker: legacy } } };
        const first = createAquariumRecord('Dosis-Testaquarium', createAquariumData({ volumeLiters: 100, supplyProfile: profile }));
        const second = createAquariumRecord('Separates Testaquarium', createAquariumData({ volumeLiters: 250 }));
        appState.aquariums[first.id] = first;
        appState.aquariums[second.id] = second;
        window.dosingFixtureIds = [first.id, second.id];
        switchAquarium(first.id);
        selectTab('tools');
        openToolFavorite('kh-ca-messverlauf-tagesdosis');
    });
    const fixtureIds = await page.evaluate(() => dosingFixtureIds);
    const card = page.locator('.dose-tracker-card');
    assert.equal(await card.isVisible(), true);
    assert.equal(await page.evaluate(() => isToolHidden('sangokai-mengen-und-mischen')), true);
    assert.equal(await page.locator('[data-sangokai-submenu="dose-history"]').count(), 0);
    assert.equal(await page.locator('.dose-history-row').count(), 2);
    assert.equal(await page.evaluate(() => db.supplyProfile.calculators.sangokai.doseTracker === undefined), true);
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.every(entry => entry.solution?.id === 'sangokai-kh')), true);
    assert.equal(await page.evaluate(() => getDoseTrackerState().migratedFromSangokai), true);
    assert.equal(await page.locator('#doseSolution option[value="sangokai-kh"]').count(), 0);
    assert.equal(await page.locator('#doseSolution').inputValue(), '');
    await page.locator('#doseSolution').selectOption('osci-kh-tag');
    assert.match(await page.locator('#doseTrackerResult').innerText(), /Ermittelter Verbrauch/);
    assert.match(await page.locator('#doseTrackerResult').innerText(), /Ältere SANGOKAI/);
    checks.push('Legacy history migrates once; neutral tool works with SANGOKAI disabled');

    await page.locator('#doseIntervalMl').fill('10');
    await page.locator('#doseSaveButton').click();
    assert.equal(await page.locator('.dose-history-row').count(), 2);
    await page.locator('.dose-options > summary').click();
    await page.locator('#doseDate').fill('2026-10-09T12:00');
    await page.locator('#doseValue').fill('7.25');
    await page.locator('#doseSaveButton').click();
    assert.equal(await page.locator('.dose-history-row').count(), 3);
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.at(-1).volumeLiters), 100);
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.at(-1).solution.id), 'osci-kh-tag');
    const savedId = await page.evaluate(() => getDoseTrackerState().measurements.at(-1).id);
    await page.locator('.dose-history-row').first().getByRole('button', { name: /bearbeiten/ }).click();
    assert.equal(await page.locator('#doseSolution').isDisabled(), true);
    await page.locator('#doseValue').fill('7.3');
    await page.locator('#doseSaveButton').click();
    assert.equal(await page.locator('.dose-history-row').count(), 3);
    assert.equal(await page.evaluate(id => getDoseTrackerState().measurements.find(entry => entry.id === id).value, savedId), 7.3);
    await page.locator('.dose-history-row').first().getByRole('button', { name: /löschen/ }).click();
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseTrackerState().measurements.length === 2);
    await page.locator('.dose-history-row').first().getByRole('button', { name: /bearbeiten/ }).click();
    await page.locator('#doseCancelEditButton').click();
    assert.equal(await page.locator('#doseSolution').isDisabled(), false);
    checks.push('Blank fields rejected; add, edit, cancel and confirmed deletion work through actual buttons');

    await page.locator('#doseElement').selectOption('ca');
    assert.equal(await page.locator('option[value="balling-ca-dihydrate"]').count(), 0);
    await page.locator('#doseSolution').selectOption('fauna-ca');
    assert.equal(await page.locator('.dose-history-row').count(), 0);
    await page.locator('#doseTarget').fill('430');
    for (const [at, value] of [['2026-10-01T12:00', '400'], ['2026-10-05T12:00', '402']]) {
        await page.locator('#doseDate').fill(at);
        await page.locator('#doseValue').fill(value);
        await page.locator('#doseIntervalMl').fill('10');
        await page.locator('#doseSaveButton').click();
    }
    await page.locator('#doseMode').selectOption('immediate-stabilize');
    assert.match(await page.locator('#doseTrackerResult').innerText(), /Einmaliger Sofortausgleich/);
    assert.doesNotMatch(await page.locator('#doseTrackerResult').innerText(), /Ca-2/);
    checks.push('Fauna Calcium history and immediate correction are independent from KH and Ca-2');

    const productField = name => page.locator(`#appDialogFields [data-dialog-field="${name}"]`);
    const originalHash = await page.evaluate(() => location.hash);
    await page.locator('#doseAddProductButton').click();
    assert.equal(await page.locator('#appDialog').isVisible(), true);
    await productField('name').fill('Audit Ca-Lösung');
    await productField('referenceMl').fill('10');
    await productField('referenceLiters').fill('100');
    await page.locator('#appDialogConfirm').click();
    assert.equal(await page.locator('#appDialog').isVisible(), true);
    assert.equal(await productField('increase').getAttribute('aria-invalid'), 'true');
    await productField('increase').fill('5');
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseImpactSettings().customPresets.length === 1);
    assert.equal(await page.evaluate(() => location.hash), originalHash);
    assert.equal(await card.isVisible(), true);
    const customId = await page.evaluate(() => getDoseImpactSettings().customPresets.at(-1).id);
    assert.equal(await page.locator(`#doseSolution option[value="${customId}"]`).count(), 1);
    assert.equal(await page.locator(`#majorCorrectionPreset option[value="${customId}"]`).count(), 1);
    assert.equal(await page.locator(`#doseImpactPreset option[value="${customId}"]`).count(), 1);
    assert.equal(await page.locator('#doseSolution').inputValue(), customId);
    await page.locator('#doseSolution').selectOption(customId);
    await page.locator('#doseDate').fill('2026-10-09T12:00');
    await page.locator('#doseValue').fill('403');
    await page.locator('#doseIntervalMl').fill('20');
    await page.locator('#doseSaveButton').click();
    await page.locator('#doseEditProductButton').click();
    assert.equal(await productField('name').inputValue(), 'Audit Ca-Lösung');
    await productField('increase').fill('10');
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseImpactSettings().customPresets[0].increase === 10);
    assert.equal(await page.evaluate(() => getDoseImpactSettings().customPresets.length), 1);
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.at(-1).solution.increase), 5);
    assert.match(await page.locator('#doseTrackerResult').innerText(), /umgerechnet/);
    checks.push('Presets are shared with the correction calculator; editing concentration cannot rewrite historical doses');

    await page.locator('#doseAddProductButton').click();
    await productField('name').fill('Eigenes Calcium 100 mg/ml');
    await productField('method').selectOption('concentration');
    await productField('concentration').fill('100');
    assert.match(await page.locator('.dose-product-preview').innerText(), /1 ml \/ 100 L = \+1 mg\/L/);
    assert.equal(await productField('referenceMl').isDisabled(), true);
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseImpactSettings().customPresets.length === 2);
    assert.equal(await page.evaluate(() => getDoseImpactSettings().customPresets.at(-1).increase), 1);
    await page.locator('#doseAddProductButton').click();
    await productField('name').fill('Eigener Calcium-Pulveransatz');
    await productField('method').selectOption('powder');
    await productField('saltId').selectOption('cacl2-2h2o');
    await productField('powderGrams').fill('367');
    await productField('finalVolumeMl').fill('1000');
    await productField('purityPercent').fill('101');
    await page.locator('#appDialogConfirm').click();
    assert.match(await page.locator('#appDialogError').innerText(), /100 %/);
    assert.equal(await page.evaluate(() => getDoseImpactSettings().customPresets.length), 2);
    await productField('purityPercent').fill('100');
    assert.match(await page.locator('.dose-product-preview').innerText(), /367 g Calciumchlorid-Dihydrat/);
    for (const theme of ['default', 'light']) {
        await page.evaluate(value => applyTheme(value), theme);
        for (const width of [319, 390, 768, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            const layout = await page.locator('#appDialog').evaluate(dialog => {
                const controls = [...dialog.querySelectorAll('#appDialogFields input, #appDialogFields select')].filter(control => !control.disabled);
                const panel = dialog.querySelector('.app-dialog-panel');
                const bounds = panel.getBoundingClientRect();
                return { overflow: panel.scrollWidth > panel.clientWidth + 1,
                    outside: bounds.left < 0 || bounds.right > innerWidth + 1,
                    clipped: controls.some(control => control.getBoundingClientRect().width > control.closest('.form-field').clientWidth + 1),
                    clippedLabels: [...dialog.querySelectorAll('.form-field:not([hidden]) label')].some(label => label.scrollWidth > label.clientWidth + 1),
                    columns: getComputedStyle(dialog.querySelector('#appDialogFields')).gridTemplateColumns.trim().split(' ').length,
                    hiddenFields: [...dialog.querySelectorAll('#appDialogFields .form-field[hidden]')].some(field => getComputedStyle(field).display !== 'none') };
            });
            assert.equal(layout.overflow, false, JSON.stringify(layout));
            assert.equal(layout.outside, false, JSON.stringify(layout));
            assert.equal(layout.clipped, false, JSON.stringify(layout));
            assert.equal(layout.clippedLabels, false, JSON.stringify(layout));
            assert.equal(layout.hiddenFields, false, JSON.stringify(layout));
            assert.equal(layout.columns, width <= 390 ? 1 : 2, JSON.stringify(layout));
            await page.locator('.app-dialog-body').evaluate(body => { body.scrollTop = 0; });
            await page.locator('#appDialog').screenshot({ path: path.join(output, `product-${theme}-${width}.png`), animations: 'disabled' });
        }
    }
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseImpactSettings().customPresets.length === 3);
    const powderId = await page.evaluate(() => getDoseImpactSettings().customPresets.at(-1).id);
    const powderProduct = await page.evaluate(() => getDoseImpactSettings().customPresets.at(-1));
    assert.ok(Math.abs(powderProduct.increase - 367 * 40.078 / 147.014 / 100) < 1e-9);
    assert.equal(powderProduct.configuration.finalVolumeMl, 1000);
    await page.locator('#doseEditProductButton').click();
    assert.equal(await productField('method').inputValue(), 'powder');
    assert.equal(await productField('finalVolumeMl').inputValue(), '1000');
    await productField('finalVolumeMl').fill('2000');
    await page.locator('#appDialogCancel').click();
    assert.equal(await page.evaluate(id => getDoseImpactSettings().customPresets.find(entry => entry.id === id).configuration.finalVolumeMl, powderId), 1000);
    await page.setViewportSize({ width: 390, height: 900 });
    checks.push('Reference, active-concentration and pure-powder products use one shared builder; invalid purity and cancelled edits cannot change data; mobile/desktop dialog layouts pass');

    await page.locator('#doseSolution').selectOption('hans-werner-ca');
    assert.equal(await page.locator('#doseBallingBatchFields').isVisible(), true);
    await page.locator('#doseFinalVolumeMl').fill('5200');
    assert.match(await page.locator('#doseTrackerResult').innerText(), /Hydratform/);
    await page.locator('#doseCalciumSalt').selectOption('dihydrate');
    assert.match(await page.locator('#doseSolutionInfo').innerText(), /mg\/L/);
    await page.locator('#doseDate').fill('2026-10-10T12:00');
    await page.locator('#doseValue').fill('404');
    await page.locator('#doseSaveButton').click();
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.at(-1).solution.finalVolumeMl), 5200);
    checks.push('Hans-Werner Calcium requires real final volume and confirmed hydration; solution is saved with the measurement');

    await page.evaluate(() => updateSupplyProfileSelection('providers', 'sangokai', true));
    await page.evaluate(() => openToolFavorite('kh-ca-messverlauf-tagesdosis'));
    await page.locator('#doseSolution').selectOption('sangokai-ca');
    assert.match(await page.locator('#doseSolutionInfo').innerText(), /Ca-2 mengenidentisch/);
    assert.match(await page.locator('#doseTrackerResult').innerText(), /ml Ca-2/);
    await page.evaluate(() => switchAquarium(dosingFixtureIds[1]));
    await page.evaluate(() => openToolFavorite('kh-ca-messverlauf-tagesdosis'));
    assert.equal(await page.locator('.dose-history-row').count(), 0);
    assert.match(await page.locator('#doseAquariumContext').innerText(), /250 L/);
    assert.equal(await page.locator(`#doseSolution option[value="${customId}"]`).count(), 0);
    await page.locator('#doseAddProductButton').click();
    await productField('name').fill('Eigene KH-Konzentration');
    await productField('method').selectOption('concentration');
    await productField('concentration').fill('0.8925');
    assert.match(await page.locator('.dose-product-preview').innerText(), /\+0,025 °dKH/);
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseImpactSettings().customPresets.length === 1);
    const ownKhId = await page.locator('#doseSolution').inputValue();
    await page.evaluate(() => {
        SUPPLY_PROVIDER_OPTIONS.forEach(([id]) => updateSupplyProfileSelection('providers', id, false));
        openToolFavorite('kh-ca-korrektur');
    });
    assert.equal(await page.locator(`#doseSolution option[value="${ownKhId}"]`).count(), 1);
    await page.locator('#majorCorrectionEditProductButton').click();
    await productField('method').selectOption('powder');
    assert.equal(await productField('saltId').inputValue(), 'nahco3');
    await productField('powderGrams').fill('84.0066');
    await productField('finalVolumeMl').fill('1000');
    assert.match(await page.locator('.dose-product-preview').innerText(), /Natriumhydrogencarbonat/);
    await page.locator('#appDialogConfirm').click();
    await page.waitForFunction(() => getDoseImpactSettings().customPresets[0].configuration.method === 'powder');
    assert.equal(await page.locator('#majorCorrectionPreset').inputValue(), ownKhId);
    assert.ok(Math.abs(await page.evaluate(() => getMajorCorrectionStrengthFromPreset(getMajorCorrectionPreset())) - 1 / 35.7) < 1e-9);
    checks.push('Own KH products remain available with every provider disabled; the correction calculator edits the same product without duplication');
    await page.evaluate(() => switchAquarium(dosingFixtureIds[0]));
    await page.evaluate(() => openToolFavorite('kh-ca-messverlauf-tagesdosis'));
    assert.equal(await page.locator('#doseElement').inputValue(), 'ca');
    assert.equal(await page.locator('#doseTarget').inputValue(), '430');
    const backupCheck = await page.evaluate(() => {
        const payload = buildProjectBackupPayload();
        const source = payload.data.aquariums[dosingFixtureIds[0]].data;
        const restored = createAquariumData(source);
        return JSON.stringify(restored.supplyProfile.calculators.dosing) === JSON.stringify(getDoseTrackerState())
            && JSON.stringify(restored.doseImpactSettings.customPresets) === JSON.stringify(getDoseImpactSettings().customPresets);
    });
    assert.equal(backupCheck, true);
    await page.evaluate(() => flushPendingPersistence('dosing-audit', false));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await page.evaluate(() => { selectTab('tools'); openToolFavorite('kh-ca-messverlauf-tagesdosis'); });
    assert.equal(await page.locator('#doseTarget').inputValue(), '430');
    assert.equal(await page.locator('.dose-history-row').count(), 4);
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.filter(entry => entry.id.startsWith('legacy-')).length), 2);
    assert.equal(await page.evaluate(() => getDoseImpactSettings().customPresets.length), 3);
    checks.push('Aquarium isolation, persistent target/form/history, project backup round-trip and non-repeating migration');

    await page.evaluate(() => {
        const solution = { id: 'balling-ca-dihydrate', name: 'Archivierte Calciumlösung', element: 'Ca', referenceMl: 10, referenceLiters: 100, increase: 10 };
        const dosing = { form: { product: 'ca', solutionId: solution.id }, measurements: [
            { id: 'retired-1', product: 'ca', at: '2026-10-01T12:00:00Z', value: 400, doseMlPerDay: 10, volumeLiters: 100, solution },
            { id: 'retired-2', product: 'ca', at: '2026-10-03T12:00:00Z', value: 398, doseMlPerDay: 10, volumeLiters: 100, solution }
        ] };
        const aquarium = createAquariumRecord('Archiv-Preset-Test', createAquariumData({ volumeLiters: 100,
            supplyProfile: { calculators: { dosing } },
            doseImpactSettings: { selectedPresetId: solution.id, customPresets: [] },
            majorCorrectionSettings: { selectedPresetId: solution.id, tankLiters: 100 }
        }));
        appState.aquariums[aquarium.id] = aquarium;
        switchAquarium(aquarium.id);
        selectTab('tools');
        openToolFavorite('kh-ca-messverlauf-tagesdosis');
    });
    assert.equal(await page.locator('#doseSolution').inputValue(), '');
    assert.equal(await page.locator('#majorCorrectionPreset').inputValue(), '');
    assert.equal(await page.locator('#doseImpactPreset').inputValue(), '');
    assert.equal(await page.locator('option[value="balling-ca-dihydrate"]').count(), 0);
    assert.match(await page.locator('#doseTrackerResult').innerText(), /Bitte eine Lösung auswählen/);
    await page.locator('.dose-history-row').first().getByRole('button', { name: /bearbeiten/ }).click();
    assert.equal(await page.locator('#doseSolution').inputValue(), 'balling-ca-dihydrate');
    assert.equal(await page.locator('#doseSolution').isDisabled(), true);
    await page.locator('#doseValue').fill('399');
    await page.locator('#doseSaveButton').click();
    assert.equal(await page.evaluate(() => getDoseTrackerState().measurements.find(entry => entry.id === 'retired-2').solution.increase), 10);
    assert.equal(await page.locator('#doseSolution').inputValue(), '');
    assert.equal(await page.locator('#doseSaveButton').isEnabled(), true);
    await page.locator('#doseSaveButton').click();
    assert.equal(await page.locator('.dose-history-row').count(), 2);
    checks.push('Removed default preset cannot silently select another solution; archived measurements still edit with their original concentration');
    await page.evaluate(id => { switchAquarium(id); openToolFavorite('kh-ca-messverlauf-tagesdosis'); }, fixtureIds[0]);

    await page.locator('#doseElement').selectOption('kh');
    assert.equal(await page.locator('#doseTarget').inputValue(), '7.5');
    await page.locator('#doseSolution').selectOption('hans-werner-kh');
    await page.locator('#doseFinalVolumeMl').fill('5300');
    assert.match(await page.locator('#doseSolutionInfo').innerText(), /°dKH/);
    await page.locator('#doseSolution').selectOption('osci-kh-tag');
    await page.locator('.dose-options').evaluate(element => { element.open = false; });
    await page.locator('.toast-container').evaluate(element => element.replaceChildren());

    for (const theme of ['default', 'light']) {
        await page.evaluate(value => applyTheme(value), theme);
        for (const width of [319, 390, 768, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            await card.scrollIntoViewIfNeeded();
            const layout = await card.evaluate(element => {
                const visible = node => node.getClientRects().length > 0;
                const inputs = [...element.querySelectorAll('.dose-primary-grid input, .dose-primary-grid select')];
                const labels = [...element.querySelectorAll('.dose-primary-grid label')];
                const rects = inputs.map(input => input.getBoundingClientRect());
                const title = element.querySelector('.tool-title-text');
                return { width: innerWidth, pageWidth: document.documentElement.scrollWidth,
                    fieldCount: inputs.length, clippedLabels: labels.filter(label => label.scrollWidth > label.clientWidth + 1).map(label => label.textContent),
                    clippedTitle: title.scrollWidth > title.clientWidth + 1,
                    saveButtonHeight: element.querySelector('#doseSaveButton').getBoundingClientRect().height,
                    fieldRects: rects.map(rect => ({ x: rect.x, y: rect.y, width: rect.width, height: rect.height })),
                    gridColumns: getComputedStyle(element.querySelector('.dose-primary-grid')).gridTemplateColumns,
                    invalid: /\b(?:NaN|undefined)\b/.test(element.innerText),
                    chartPoints: element.querySelectorAll('.dose-trend-point').length,
                    mobileAligned: rects.every(rect => Math.abs(rect.x - rects[0].x) < 1 && Math.abs(rect.width - rects[0].width) < 1),
                    desktopAligned: Math.abs(rects[0].y - rects[1].y) < 1 && Math.abs(rects[1].y - rects[2].y) < 1,
                    overflow: [...element.querySelectorAll('.dose-fields, .tool-row, .dose-history-row, .dose-options')].filter(visible).filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.className)
                };
            });
            await card.screenshot({ path: path.join(output, `dosing-${theme}-${width}.png`), animations: 'disabled', style: '#appHeader, .mobile-bottom-nav { visibility: hidden !important; }' });
            assert.equal(layout.pageWidth <= width + 1, true, JSON.stringify(layout));
            assert.deepEqual(layout.clippedLabels, [], JSON.stringify(layout));
            assert.equal(layout.clippedTitle, false, JSON.stringify(layout));
            assert.equal(layout.saveButtonHeight <= 50, true, JSON.stringify(layout));
            assert.deepEqual(layout.overflow, [], JSON.stringify(layout));
            assert.equal(layout.fieldCount, 6);
            assert.equal(layout.chartPoints, 2);
            assert.equal(layout.invalid, false);
            if (width <= 390) assert.equal(layout.mobileAligned, true, JSON.stringify(layout));
            if (width === 768) assert.equal(layout.gridColumns.trim().split(' ').length, 2, JSON.stringify(layout));
            if (width === 1440) assert.equal(layout.desktopAligned, true, JSON.stringify(layout));
            checks.push({ theme, ...layout });
        }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.dose-trend-line').evaluate(element => getComputedStyle(element).animationDuration), '0s');
    const sangokaiContext = await browser.newContext({ serviceWorkers: 'block' });
    const sangokaiPage = await sangokaiContext.newPage();
    checks.push(...await auditSangokai(sangokaiPage, url));
    await sangokaiContext.close();

    const offlineContext = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const offlinePage = await offlineContext.newPage();
    offlinePage.on('pageerror', error => errors.push(error.message));
    await offlinePage.goto(url, { waitUntil: 'domcontentloaded' });
    await offlinePage.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await offlinePage.evaluate(async () => {
        const aquarium = createAquariumRecord('Offline-Dosis-Test', createAquariumData({ volumeLiters: 100 }));
        appState.aquariums[aquarium.id] = aquarium;
        switchAquarium(aquarium.id);
        selectTab('tools');
        openToolFavorite('kh-ca-messverlauf-tagesdosis');
        const solution = storeCustomDoseProduct(buildCustomDoseProduct({ name: 'Offline eigene KH-Lösung', element: 'KH', method: 'concentration', concentration: '1.785' }));
        const tracker = getDoseTrackerState();
        tracker.measurements = [
            { id: 'offline-1', product: 'kh', at: '2026-10-01T12:00:00Z', value: 7.5, doseMlPerDay: 10, volumeLiters: 100, solution },
            { id: 'offline-2', product: 'kh', at: '2026-10-03T12:00:00Z', value: 7.3, doseMlPerDay: 10, volumeLiters: 100, solution }
        ];
        saveDB(false);
        initDoseTracker();
        await flushPendingPersistence('offline-dosing-audit', false);
        await navigator.serviceWorker.ready;
    });
    await offlinePage.waitForFunction(async () => {
        if (!navigator.serviceWorker.controller) return false;
        const cacheName = (await caches.keys()).find(name => name.includes('launcher-dosing-products-v2'));
        if (!cacheName) return false;
        const cache = await caches.open(cacheName);
        return Boolean(await cache.match('./assets/js/dosing-calculations.js', { ignoreSearch: true }));
    });
    await offlineContext.setOffline(true);
    await offlinePage.reload({ waitUntil: 'domcontentloaded' });
    await offlinePage.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await offlinePage.evaluate(() => { selectTab('tools'); openToolFavorite('kh-ca-messverlauf-tagesdosis'); });
    assert.equal(await offlinePage.evaluate(() => typeof DosingCalculations.calculateDoseAdjustment), 'function');
    assert.equal(await offlinePage.evaluate(() => typeof DosingCalculations.calculateConcentrationSolution), 'function');
    assert.equal(await offlinePage.evaluate(() => getDoseImpactSettings().customPresets[0].configuration.concentration), 1.785);
    assert.equal(await offlinePage.locator('.dose-history-row').count(), 2);
    assert.match(await offlinePage.locator('#doseTrackerResult').innerText(), /11 ml\/Tag/);
    checks.push('PWA offline reload retains the calculator module, history and calculated daily dose');
    await offlineContext.close();
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ ok: true, checks, errors, screenshots: output }, null, 2));
} finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
}
