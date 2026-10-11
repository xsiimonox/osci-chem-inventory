import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
const prefKey = 'reeftools.workspace-ui.v1';
const sourceContextId = 'main:aq-backup-test';
const capacityKey = JSON.stringify(['main', 'Makro Elements', 'KH Tag']);
const draft = 'NaCl 1 ml MgCl2 2 ml Na2SO4 3 ml MgSO4 4 ml KCl 5 ml K2SO4 6 ml KBr 7 ml SrCl2 8 ml CaCl2 9 ml NaF 10 ml Bor 11 ml';
const legacyPreferences = { capacities: { [capacityKey]: 719.123987 }, sort: 'name',
    bookingProduct: JSON.stringify(['Makro Elements', 'KH Tag']),
    drafts: { [sourceContextId]: draft }, steps: { [`C&R:${sourceContextId}`]: 1 } };
let browser;

async function boot(page, url) {
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
}
async function stored(page) {
    return page.evaluate(async () => (await idbGet(APP_STORAGE_STATE_STORE, APP_STORAGE_STATE_KEY)).payload);
}
async function cloudRestore(page, payload) {
    // Exercise the real restore path with an isolated transport, never a user's account.
    return page.evaluate(async payload => {
        findGoogleDriveBackupFileId = async () => 'audit-backup-file';
        googleDriveFetch = async () => new Response(JSON.stringify(payload), { status: 200 });
        await restoreProjectBackupFromGoogleDrive();
        return { valid: validateProjectBackupPayload(payload).ok, state: prepareAppStateForStorage() };
    }, payload);
}
async function fillTool(page, id, value) {
    await page.locator(`#${id}`).fill(value);
}

try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}/index.html`;
    browser = await chromium.launch({ headless: true });
    const source = await browser.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
    await source.addInitScript(({ key, preferences }) => {
        if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(preferences));
    }, { key: prefKey, preferences: legacyPreferences });
    const page = await source.newPage();
    await boot(page, url);
    assert.equal(JSON.parse((await stored(page)).portablePreferences.localSettings[prefKey]).capacities[capacityKey], 719.123987);
    checks.push('Existing LocalStorage capacities, sort order, parser drafts and wizard steps migrate to IndexedDB');
    await page.evaluate(() => selectTab('lager'));
    await page.locator('#inventorySort').selectOption('fill-low');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await page.evaluate(() => selectTab('lager'));
    assert.equal(await page.locator('#inventorySort').inputValue(), 'fill-low');
    checks.push('An immediate reload retains an inventory preference before the debounce delay elapses');

    await page.evaluate(() => {
        const fixture = createDemoWarehouseData('Backup Testlager', 'main');
        const aquarium = createAquariumRecord('Backup Testaquarium', createDemoAquariumData());
        aquarium.id = 'aq-backup-test';
        aquarium.data.volumeLiters = 770;
        appState.warehouses.main.data = createPersistableWarehouseData(fixture);
        appState.aquariums = { [aquarium.id]: aquarium };
        appState.activeAquariumId = activeAquariumId = aquarium.id;
        normalizeWarehouseData(fixture);
        overlayActiveAquariumData();
        const photo = document.createElement('canvas');
        photo.width = photo.height = 2;
        photo.getContext('2d').fillRect(0, 0, 2, 2);
        db.coralCatalog[0].photoGallery = [photo.toDataURL('image/png')];
        db.logs[0].mixingDone = true;
        document.dispatchEvent(new Event('reeftools-context-change'));
        db.ballingMixingHistory = [{ id: 'backup-mix', element: 'KH', waterLiters: 5, powderGrams: 420, at: '2026-10-01T12:00:00Z' }];
        const solution = storeCustomDoseProduct(buildCustomDoseProduct({ name: 'Backup KH', element: 'KH', method: 'reference', referenceMl: 10, referenceLiters: 100, increase: 1 }));
        getDoseTrackerState().measurements = [
            { id: 'backup-dose-1', product: 'kh', at: '2026-10-01T12:00:00Z', value: 7.5, doseMlPerDay: 10, volumeLiters: 770, solution },
            { id: 'backup-dose-2', product: 'kh', at: '2026-10-03T12:00:00Z', value: 7.3, doseMlPerDay: 10, volumeLiters: 770, solution }
        ];
        saveDB(false);
        renderCurrentWarehouseViews();
        selectTab('tools');
        openToolFavorite('phytocoral-loeffel-generator');
    });
    await page.evaluate(() => selectTab('lager'));
    await page.locator('#inventorySort').selectOption('name');
    const kh = page.locator('.inventory-card[data-name="KH Tag"]');
    await kh.locator('[data-stock-toggle]').click();
    await kh.locator('[data-stock-capacity]').click();
    await page.locator('#appDialogField0').fill('900');
    await page.locator('#appDialogConfirm').click();
    await page.waitForTimeout(650);
    assert.equal(JSON.parse((await stored(page)).portablePreferences.localSettings[prefKey]).capacities[capacityKey], 900);
    checks.push('Changing capacity through its actual dialog immediately schedules project persistence');
    await page.evaluate(() => { selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator'); });
    await fillTool(page, 'phytoScoopLiters', '770');
    await fillTool(page, 'phytoScoopHandleLength', '23');
    await fillTool(page, 'phytoHolderCount', '3');
    await page.evaluate(() => openToolFavorite('fluessigkeits-messloeffel-generator'));
    await fillTool(page, 'liquidScoopMl', '7.5');
    await fillTool(page, 'liquidScoopHandleLength', '80');
    await fillTool(page, 'liquidScoopName', 'Backup Kalkwasser');
    await page.evaluate(() => openToolFavorite('balling-pulver-rechner'));
    await page.locator('#ballingCalcMode').selectOption('solution');
    await fillTool(page, 'ballingCalcStockGrams', '420');
    await fillTool(page, 'ballingCalcStockMl', '5300');
    const ballingResult = await page.locator('#ballingPowderResult').innerText();
    await page.evaluate(() => {
        selectTab('icp');
        document.querySelector('.icp-import-card').closest('details')?.setAttribute('open', '');
        document.getElementById('icpReportName').value = 'Unfinished analysis';
        document.getElementById('icpReportDate').value = '2026-10-02';
        document.getElementById('icpImportText').value = 'KH 7.5';
        document.getElementById('icpImportText').dispatchEvent(new Event('input', { bubbles: true }));
        setLogbookFeatureVisible('osmoseTank', false);
        toggleMenuTabVisibility('statistik', true);
        saveMenuOrder(['uebersicht', 'icp', 'lager', 'tools', 'logbuch']);
        saveMobileQuickTabs(['uebersicht', 'icp', 'tools', 'lager']);
        document.getElementById('customPrimaryColor').value = '#119944';
        document.getElementById('customSecondaryColor').value = '#cc7755';
        updateCustomThemeColors();
        toggleGoogleDriveAutoSync(true);
        setGoogleDriveReconnectReminder(false);
        storeGoogleDriveSyncSettings({ fileId: 'source-private-file', connectedEmail: 'source-private@example.test' });
        googleDriveAccessToken = 'SECRET_OAUTH_DO_NOT_BACK_UP';
        googleDriveTokenExpiresAt = 0;
    });
    await page.waitForTimeout(650);
    const saved = await stored(page);
    assert.equal(saved.portablePreferences.toolDrafts[sourceContextId].phytoScoopHandleLength.value, '23');
    assert.equal(saved.portablePreferences.toolDrafts[sourceContextId].liquidScoopName.value, 'Backup Kalkwasser');
    assert.equal(saved.portablePreferences.localSettings.reeftools_hidden_logbook_features_v1, '["osmoseTank"]');
    checks.push('Input and preference changes autosave without pressing Export or a calculator Save button');

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await page.evaluate(() => { selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator'); });
    assert.equal(await page.locator('#phytoScoopHandleLength').inputValue(), '23');
    assert.equal(await page.locator('#phytoHolderCount').inputValue(), '3');
    await page.evaluate(() => { selectTab('cr-export'); });
    assert.equal(await page.locator('#cr-paste-area').inputValue(), draft);
    checks.push('PhytoDose configuration and the C&R recipe draft survive a full reload');

    const payload = await page.evaluate(() => buildProjectBackupPayload());
    assert.equal(payload.version, 3);
    assert.doesNotMatch(JSON.stringify(payload), /SECRET_OAUTH_DO_NOT_BACK_UP|source-private-file|source-private@example/);
    const data = payload.data;
    assert.equal(data.aquariums['aq-backup-test'].data.supplyProfile.calculators.dosing.measurements.length, 2);
    assert.ok(data.aquariums['aq-backup-test'].data.icpReports.length > 0);
    assert.ok(data.aquariums['aq-backup-test'].data.coralCatalog.length > 0);
    assert.equal(data.warehouses.main.data.ballingMixingHistory[0].id, 'backup-mix');
    checks.push('The project backup includes existing records, custom concentrations and tool drafts, without account credentials');

    const target = await browser.newContext({ viewport: { width: 1440, height: 950 }, serviceWorkers: 'block' });
    const receiver = await target.newPage();
    await boot(receiver, url);
    await receiver.evaluate(() => {
        localStorage.setItem('reeftools.workspace-ui.v1', JSON.stringify({ sort: 'fill-high' }));
        storeCustomThemeColors({ primary: '#aa4455', secondary: '#4477aa' });
        storeGoogleDriveSyncSettings({ connectedEmail: 'target-account@example.test' });
        localStorage.setItem('reeftools_trace_icp_assignments_v1', JSON.stringify({
            'aq-backup-test': { 'demo-icp-001': 'demo-trace-calc-001' }
        }));
        localStorage.setItem('reef-tools-pending-trace-icp-assignment', JSON.stringify({
            aquariumId: 'aq-backup-test', reportId: 'demo-icp-001', entryId: 'demo-trace-calc-001', at: Date.now()
        }));
        selectTab('tools'); openToolFavorite('kh-ca-messverlauf-tagesdosis');
    });
    assert.equal((await cloudRestore(receiver, payload)).valid, true);
    const restored = await stored(receiver);
    assert.deepEqual(restored.portablePreferences, payload.data.portablePreferences);
    assert.deepEqual(restored.aquariums['aq-backup-test'].data.supplyProfile.calculators.dosing.measurements, data.aquariums['aq-backup-test'].data.supplyProfile.calculators.dosing.measurements);
    assert.deepEqual(restored.aquariums['aq-backup-test'].data.doseImpactSettings.customPresets, data.aquariums['aq-backup-test'].data.doseImpactSettings.customPresets);
    for (const key of ['icpReports', 'measurementEntries', 'logBookEntries', 'aquariumTodos', 'coralCatalog', 'traceCalculator', 'equipmentList']) {
        assert.deepEqual(restored.aquariums['aq-backup-test'].data[key], data.aquariums['aq-backup-test'].data[key], key);
    }
    for (const key of ['inventory', 'logs', 'stats', 'favorites', 'ballingMixingHistory']) {
        assert.deepEqual(restored.warehouses.main.data[key], data.warehouses.main.data[key], key);
    }
    assert.equal(await receiver.evaluate(() => getGoogleDriveSyncSettings().connectedEmail), 'target-account@example.test');
    assert.equal(await receiver.evaluate(() => isLogbookFeatureVisible('osmoseTank')), false);
    assert.equal(await receiver.evaluate(() => isMenuTabHidden('statistik')), true);
    assert.deepEqual(await receiver.evaluate(() => getCustomThemeColors()), { primary: '#119944', secondary: '#cc7755' });
    assert.deepEqual(await receiver.evaluate(() => getMobileQuickTabs()), ['uebersicht', 'icp', 'tools', 'lager']);
    assert.equal(await receiver.locator('.dose-history-row').count(), 2, JSON.stringify(await receiver.evaluate(() => ({
        form: getDoseTrackerState().form,
        history: getDoseTrackerState().measurements.map(entry => entry.product),
        sections: [...document.querySelectorAll('#tools .tool-section[open]')].map(section => section.dataset.sectionId),
        initialized: [...initializedToolSections],
        pending: portablePreferencesNeedRefresh,
        result: document.getElementById('doseTrackerHistory')?.innerText
    }))));
    assert.equal(await receiver.locator('#doseSolution').inputValue(), data.aquariums['aq-backup-test'].data.supplyProfile.calculators.dosing.form.solutionId);
    await receiver.evaluate(() => { selectTab('lager'); });
    assert.equal(await receiver.locator('#inventorySort').inputValue(), 'name');
    await receiver.evaluate(() => { selectTab('cr-export'); });
    assert.equal(await receiver.locator('#cr-paste-area').inputValue(), draft);
    await receiver.evaluate(() => { selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator'); });
    assert.equal(await receiver.locator('#phytoScoopLiters').inputValue(), '770');
    assert.equal(await receiver.locator('#phytoScoopHandleLength').inputValue(), '23');
    await receiver.evaluate(() => openToolFavorite('fluessigkeits-messloeffel-generator'));
    assert.equal(await receiver.locator('#liquidScoopMl').inputValue(), '7.5');
    assert.equal(await receiver.locator('#liquidScoopHandleLength').inputValue(), '80');
    assert.equal(await receiver.locator('#liquidScoopName').inputValue(), 'Backup Kalkwasser');
    assert.match(await receiver.locator('#liquidScoopResult').innerText(), /7[.,]5/);
    await receiver.evaluate(() => openToolFavorite('balling-pulver-rechner'));
    assert.equal(await receiver.locator('#ballingCalcMode').inputValue(), 'solution');
    assert.equal(await receiver.locator('#ballingCalcStockGrams').inputValue(), '420');
    assert.equal(await receiver.locator('#ballingCalcStockMl').inputValue(), '5300');
    assert.equal(await receiver.locator('#ballingPowderResult').innerText(), ballingResult);
    checks.push('Cloud restore on an empty second device reproduces records, menu choices, inventory settings and recalculated tools');

    await receiver.reload({ waitUntil: 'domcontentloaded' });
    await receiver.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    await receiver.evaluate(() => { selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator'); });
    assert.equal(await receiver.locator('#phytoScoopHandleLength').inputValue(), '23');
    assert.deepEqual((await stored(receiver)).portablePreferences, data.portablePreferences);
    checks.push('Transferred preferences remain in IndexedDB after reloading the second device');

    const defaultColors = structuredClone(payload);
    defaultColors.data.portablePreferences.localSettings.reeftools_custom_theme_colors_v1 = null;
    delete defaultColors.data.warehouses.main.data.settings.customPrimaryColor;
    delete defaultColors.data.warehouses.main.data.settings.customSecondaryColor;
    await cloudRestore(receiver, defaultColors);
    assert.deepEqual(await receiver.evaluate(() => getCustomThemeColors()), { primary: '', secondary: '' });
    await cloudRestore(receiver, payload);
    checks.push('Custom design colors transfer, and a backup using default colors clears old recipient colors');

    await receiver.evaluate(() => {
        const other = createAquariumRecord('Independent calculator', { volumeLiters: 100 });
        other.id = 'aq-second'; appState.aquariums[other.id] = other; switchAquarium(other.id);
        selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator');
    });
    assert.equal(await receiver.locator('#phytoScoopHandleLength').inputValue(), '50');
    await fillTool(receiver, 'phytoScoopHandleLength', '31');
    await receiver.evaluate(() => switchAquarium('aq-backup-test'));
    assert.equal(await receiver.locator('#phytoScoopHandleLength').inputValue(), '23');
    await receiver.evaluate(() => switchAquarium('aq-second'));
    assert.equal(await receiver.locator('#phytoScoopHandleLength').inputValue(), '31');
    checks.push('Calculator drafts remain isolated when switching aquariums');

    await cloudRestore(receiver, payload);
    await receiver.evaluate(async () => {
        const oldFind = findGoogleDriveBackupFileId, oldFetch = googleDriveFetch;
        findGoogleDriveBackupFileId = async () => '';
        isGoogleDriveConfigured = () => true;
        googleDriveFetch = async (url, options) => {
            window.auditUpload = { url, method: options.method, body: options.body };
            return new Response(JSON.stringify({ id: 'audit-upload' }), { status: 200 });
        };
        try { await uploadProjectBackupToGoogleDrive('manual'); }
        finally { findGoogleDriveBackupFileId = oldFind; googleDriveFetch = oldFetch; }
    });
    const upload = await receiver.evaluate(() => window.auditUpload);
    assert.equal(upload.method, 'POST');
    assert.match(upload.body, /portablePreferences/);
    assert.match(upload.body, /Backup Kalkwasser/);
    assert.doesNotMatch(upload.body, /source-private|target-account@example|SECRET_OAUTH/);
    checks.push('The real Google Drive multipart upload path carries the complete portable project');

    await receiver.evaluate(() => {
        findGoogleDriveBackupFileId = async () => '';
        googleDriveFetch = async (url, options) => {
            if (url.includes('/upload/')) window.auditAutoUpload = options.body;
            return new Response(JSON.stringify({ id: 'audit-auto-upload' }), { status: 200 });
        };
        googleDriveAccessToken = 'AUDIT_TOKEN_NOT_A_REAL_ACCOUNT';
        googleDriveTokenExpiresAt = Date.now() + 3600000;
        selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator');
    });
    await fillTool(receiver, 'phytoScoopHandleLength', '42');
    await receiver.waitForFunction(() => Boolean(window.auditAutoUpload), null, { timeout: 10000 });
    assert.match(await receiver.evaluate(() => window.auditAutoUpload), /"phytoScoopHandleLength":\{"value":"42"/);
    assert.doesNotMatch(await receiver.evaluate(() => window.auditAutoUpload), /AUDIT_TOKEN_NOT_A_REAL_ACCOUNT/);
    checks.push('A calculator input triggers the real automatic cloud-upload scheduler when connected and enabled');

    const autoSyncOff = structuredClone(payload);
    autoSyncOff.data.portablePreferences.cloudSettings.autoSync = false;
    await receiver.evaluate(() => {
        window.auditOriginalUpload = uploadProjectBackupToGoogleDrive;
        uploadProjectBackupToGoogleDrive = async trigger => { window.auditUnexpectedUpload = trigger; };
        scheduleGoogleDriveAutoSync();
    });
    await cloudRestore(receiver, autoSyncOff);
    await receiver.waitForTimeout(3000);
    assert.equal(await receiver.evaluate(() => window.auditUnexpectedUpload || null), null);
    assert.equal(await receiver.evaluate(() => getGoogleDriveSyncSettings().autoSync), false);
    checks.push('Restoring disabled Auto-Sync cancels a previously scheduled upload');
    await receiver.evaluate(() => {
        uploadProjectBackupToGoogleDrive = window.auditOriginalUpload;
        googleDriveAccessToken = ''; googleDriveTokenExpiresAt = 0;
        clearTimeout(googleDriveSyncTimer); clearTimeout(googleDriveRemoteWatchTimer);
    });

    const legacy = structuredClone(payload);
    legacy.version = 2;
    delete legacy.data.portablePreferences;
    await receiver.evaluate(() => saveMobileQuickTabs(['lager', 'tools', 'icp', 'logbuch']));
    await cloudRestore(receiver, legacy);
    assert.deepEqual(await receiver.evaluate(() => getMobileQuickTabs()), ['lager', 'tools', 'icp', 'logbuch']);
    checks.push('Older version-2 backups remain readable and do not erase existing browser preferences');

    const noAquarium = structuredClone(payload);
    noAquarium.activeAquariumId = null;
    noAquarium.data.activeAquariumId = null;
    noAquarium.data.aquariums = {};
    await cloudRestore(receiver, noAquarium);
    assert.deepEqual(await receiver.evaluate(() => Object.keys(appState.aquariums)), []);
    await receiver.evaluate(() => { selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator'); });
    await fillTool(receiver, 'phytoScoopHandleLength', '12');
    await receiver.evaluate(() => flushPendingPersistence('audit-no-aquarium', false));
    const emptyPayload = await receiver.evaluate(() => buildProjectBackupPayload());
    assert.equal(emptyPayload.data.portablePreferences.toolDrafts['main:no-aquarium'].phytoScoopHandleLength.value, '12');
    await cloudRestore(receiver, emptyPayload);
    assert.equal(await receiver.locator('#phytoScoopHandleLength').inputValue(), '12');
    checks.push('A device transfer supports zero aquariums and still retains standalone calculator inputs');

    await cloudRestore(receiver, payload);
    await receiver.evaluate(async () => {
        await createManualRecoveryPoint();
        window.auditSnapshot = (await idbGetAllSnapshots()).find(snapshot => snapshot.reason === 'manual-snapshot').id;
        saveMobileQuickTabs(['lager', 'tools', 'logbuch', 'icp']);
        await flushPendingPersistence('audit-changed-prefs', false);
        await restoreLocalSnapshot(window.auditSnapshot, false);
    });
    assert.deepEqual(await receiver.evaluate(() => getMobileQuickTabs()), ['uebersicht', 'icp', 'tools', 'lager']);
    checks.push('Local recovery points restore portable preferences as well as project data');

    await receiver.evaluate(() => {
        const original = idbPut;
        idbPut = (store, key, value) => key === APP_STORAGE_STATE_KEY ? new Promise(() => {}) : original(store, key, value);
        saveMobileQuickTabs(['icp', 'lager', 'logbuch', 'tools']);
        persistBeforePageSuspends('audit-suspended-write');
    });
    await receiver.reload({ waitUntil: 'domcontentloaded' });
    await receiver.waitForFunction(() => typeof appBootstrapComplete !== 'undefined' && appBootstrapComplete);
    assert.deepEqual(await receiver.evaluate(() => getMobileQuickTabs()), ['icp', 'lager', 'logbuch', 'tools']);
    checks.push('A newer synchronous recovery copy wins when browser suspension interrupts an IndexedDB write');

    receiver.on('dialog', dialog => dialog.accept());
    await receiver.locator('#importFile').setInputFiles({ name: 'device-transfer.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(payload)) });
    await receiver.evaluate(() => { saveMobileQuickTabs(['lager', 'tools', 'logbuch', 'icp']); setDemoProfileActive(true); importData(); });
    await receiver.waitForFunction(() => getMobileQuickTabs()[0] === 'uebersicht');
    assert.deepEqual(await receiver.evaluate(() => getMobileQuickTabs()), ['uebersicht', 'icp', 'tools', 'lager']);
    await receiver.evaluate(() => clearIcpImportForm());
    assert.equal(await receiver.evaluate(() => isDemoProfileActive()), false);
    await receiver.evaluate(() => flushPendingPersistence('audit-cleared-icp-draft', false));
    assert.equal((await stored(receiver)).portablePreferences.toolDrafts[sourceContextId].icpImportText, undefined);
    checks.push('Project-file imports restore preferences, and clearing the ICP import removes its saved draft');

    for (const width of [319, 390, 768, 1440]) {
        await receiver.setViewportSize({ width, height: 950 });
        await receiver.evaluate(() => { selectTab('tools'); openToolFavorite('phytocoral-loeffel-generator'); });
        assert.equal(await receiver.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `layout width ${width}`);
    }
    checks.push('Restored calculator views fit narrow phones, tablets and desktop');
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ ok: true, checks, errors }, null, 2));
} finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
}
