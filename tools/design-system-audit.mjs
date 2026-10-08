import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
let chromium;
for (const name of ['playwright', `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`]) {
    try { ({ chromium } = require(name)); break; } catch {}
}
if (!chromium) throw new Error('Playwright is required.');
const url = process.argv[2] || 'http://127.0.0.1:8202/index.html';
const output = process.env.DESIGN_AUDIT_OUTPUT || '/tmp/reeftools-design-audit';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [], failures = [], checks = [];
page.on('pageerror', error => errors.push(error.message));
const tabs = ['uebersicht','lager','cr-export','trace-export','tools','logbuch','icp','statistik','log','korallen','masseneingang','nachbestellen','einstellungen'];
function inspectView(selector = '.tab-content.active') {
    const root = document.querySelector(selector);
    const visible = element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
    const scroller = element => {
        for (let node = element.parentElement; node && node !== root; node = node.parentElement) {
            if (['auto','scroll'].includes(getComputedStyle(node).overflowX)) return true;
        }
        return false;
    };
    const label = element => `${element.tagName}#${element.id}.${element.className}`;
    const overflow = [...root.querySelectorAll('button,input,select,textarea,h2,h3')].filter(visible).filter(element => {
        const rect = element.getBoundingClientRect();
        return !scroller(element) && (rect.left < -1 || rect.right > innerWidth + 1);
    }).map(label);
    const controls = [...root.querySelectorAll('button:not([class*="backdrop"]),input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]),select,textarea')].filter(visible);
    const radii = [...new Set(controls.map(element => getComputedStyle(element).borderTopLeftRadius))];
    const inconsistent = controls.filter(element => getComputedStyle(element).borderTopLeftRadius !== '8px').map(label);
    const clipped = controls.filter(element => element.tagName === 'BUTTON' && ['hidden','clip'].includes(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight + 2).map(label);
    const shifted = [...root.querySelectorAll('.cr-routine-option,.trace-osci-workflow-step,.trace-history-status-action,.measurement-list-button,.icp-value-row,.global-search-result')].filter(visible).filter(element => {
        const style = getComputedStyle(element);
        return style.justifyContent === 'center' || ['left','start'].includes(style.textAlign) === false;
    }).map(label);
    const choiceInsets = [...root.querySelectorAll('.cr-routine-option,.trace-osci-workflow-step')].filter(visible).filter(element => {
        const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
        const expected = rect.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft);
        return [...element.children].some(child => Math.abs(child.getBoundingClientRect().left - expected) > 1);
    }).map(label);
    const parentOverflow = controls.filter(element => {
        if (scroller(element) || ['absolute','fixed'].includes(getComputedStyle(element).position)) return false;
        const parent = element.parentElement, rect = element.getBoundingClientRect(), bounds = parent.getBoundingClientRect();
        if (!bounds.width || getComputedStyle(parent).display === 'contents') return false;
        return rect.left < bounds.left - 1 || rect.right > bounds.right + 1;
    }).map(label);
    const summaries = [...root.querySelectorAll('details > summary')].filter(visible).filter(element => !element.closest('.product-history[data-lazy-stock-details]'));
    const unframedHeadings = summaries.filter(element => {
        const style = getComputedStyle(element);
        return style.borderTopLeftRadius !== '8px' || ['Top','Right','Bottom','Left'].some(side => parseFloat(style[`border${side}Width`]) < 1) || style.backgroundColor === 'rgba(0, 0, 0, 0)';
    }).map(label);
    const items = [...root.querySelectorAll('.inventory-card:not(.inventory-card--lean),.tool-tile-card,.icp-report-card,.coral-card,.global-search-result,.modal-content,.app-dialog-panel')].filter(visible);
    const unframedItems = items.filter(element => {
        const style = getComputedStyle(element);
        return style.borderTopLeftRadius !== '8px' || ['Top','Right','Bottom','Left'].some(side => parseFloat(style[`border${side}Width`]) < 1);
    }).map(label);
    return { id: root.id, width: innerWidth, overflow, radii, inconsistent, clipped, shifted, choiceInsets, parentOverflow, unframedHeadings, unframedItems, headingCount: summaries.length, itemCount: items.length, controlCount: controls.length, documentWidth: document.documentElement.scrollWidth };
}
function record(result, phase) {
    result.phase = phase;
    checks.push(result);
    if (result.overflow.length || result.inconsistent.length || result.clipped.length || result.shifted.length || result.choiceInsets.length || result.parentOverflow.length || result.unframedHeadings.length || result.unframedItems.length || result.documentWidth > result.width + 1) failures.push(result);
}
try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
        const confirm = window.appConfirm;
        window.appConfirm = async () => true;
        try { await loadDemoProfile(); } finally { window.appConfirm = confirm; }
    });
    await page.waitForTimeout(600);
    for (const width of [320, 390, 671, 768, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        for (const tab of tabs) {
            await page.evaluate(id => selectTab(id), tab);
            await page.waitForTimeout(300);
            record(await page.evaluate(inspectView), 'initial');
            if ([390,1440].includes(width)) await page.screenshot({ path: `${output}/${tab}-${width}.png` });
            await page.evaluate(() => document.querySelectorAll('.tab-content.active details').forEach(detail => { detail.open = true; }));
            if (tab === 'tools') await page.evaluate(() => document.querySelectorAll('#tools .tool-tile-collapsed').forEach(card => toggleToolTile(card, { updateHash: false })));
            await page.waitForTimeout(250);
            record(await page.evaluate(inspectView), 'expanded');
            if (width === 390 && ['einstellungen','tools','icp','trace-export'].includes(tab)) await page.screenshot({ path: `${output}/${tab}-expanded-${width}.png` });
            await page.evaluate(() => document.querySelectorAll('.tab-content.active details').forEach(detail => { detail.open = false; }));
        }
    }
    for (const theme of ['default','light','girl','mint','badman']) {
        await page.evaluate(value => { applyTheme(value); selectTab('einstellungen'); }, theme);
        await page.waitForTimeout(400);
        for (const width of [390,1440]) {
            await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
            await page.screenshot({ path: `${output}/settings-${theme}-${width}.png` });
        }
        const colors = await page.evaluate(() => {
            const style = getComputedStyle(document.body);
            return { background: style.backgroundColor, accent: style.getPropertyValue('--accent').trim(), text: style.color };
        });
        checks.push({ theme, colors });
    }
    await page.evaluate(() => { applyTheme('default'); selectTab('trace-export'); });
    await page.evaluate(() => {
        const probe = document.createElement('button');
        probe.id = 'designContrastProbe';
        probe.className = 'btn-primary';
        probe.textContent = 'Kontrast';
        Object.assign(probe.style, { position: 'fixed', top: '100px', left: '20px', zIndex: '2147483647' });
        document.body.append(probe);
    });
    const contrastProbe = page.locator('#designContrastProbe');
    const contrastPalettes = [
        ...['default','light','girl','mint','badman'].map(theme => ({ theme })),
        ...['#777777','#808080','#000000','#ffffff','#ffcc00','#0000ff','#8e3a58'].map(primary => ({ theme: 'default', primary }))
    ];
    for (const palette of contrastPalettes) {
        await page.evaluate(({ theme, primary }) => {
            [document.documentElement, document.body].forEach(ReefTheme.clearColors);
            applyTheme(theme);
            if (primary) [document.documentElement, document.body].forEach(element => ReefTheme.setColors(element, { primary }));
        }, palette);
        for (const state of ['normal','hover','pressed']) {
            if (state !== 'normal') await contrastProbe.hover(); else await page.mouse.move(0, 0);
            if (state === 'pressed') await page.mouse.down();
            await page.waitForTimeout(200);
            const result = await contrastProbe.evaluate(element => {
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = 1;
                const ctx = canvas.getContext('2d');
                const luminance = color => {
                    ctx.fillStyle = color;
                    ctx.fillRect(0, 0, 1, 1);
                    const values = [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3).map(channel => {
                        const value = channel / 255;
                        return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
                    });
                    return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
                };
                const style = getComputedStyle(element);
                const bg = luminance(style.backgroundColor), text = luminance(style.color);
                return { ratio: (Math.max(bg, text) + .05) / (Math.min(bg, text) + .05), background: style.backgroundColor, text: style.color };
            });
            checks.push({ contrast: true, ...palette, state, ...result });
            if (result.ratio < 4.5) failures.push({ contrast: true, ...palette, state, ...result });
            if (state === 'pressed') await page.mouse.up();
        }
    }
    await page.evaluate(() => {
        document.getElementById('designContrastProbe').remove();
        [document.documentElement, document.body].forEach(ReefTheme.clearColors);
        applyTheme('default');
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.trace-history-block > summary').click();
    const assignment = page.locator('.trace-history-status').first();
    if (await assignment.count()) {
        await assignment.click();
        await page.screenshot({ path: `${output}/assignment-dialog-390.png` });
        await page.locator('#appDialogCancel').click();
    }
    for (const width of [320,390,1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => openGlobalSearch());
        const search = await page.evaluate(inspectView, '#globalSearchDialog');
        record(search, 'search-dialog');
        await page.screenshot({ path: `${output}/search-dialog-${width}.png` });
        await page.locator('.global-search-close').click();
        await page.evaluate(() => {
            const card = document.querySelector('#lager-container .inventory-card');
            openModal(card.dataset.category, card.dataset.name, 'in');
        });
        await page.screenshot({ path: `${output}/stock-dialog-${width}.png` });
        record(await page.evaluate(inspectView, '#modal'), 'stock-dialog');
        await page.evaluate(() => closeModal());
    }
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));
    await page.context().setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const offline = await page.evaluate(() => ({
        offline: true,
        background: getComputedStyle(document.body).backgroundColor,
        accent: getComputedStyle(document.body).getPropertyValue('--accent').trim(),
        version: document.querySelector('.version-badge')?.textContent,
        stylesheet: [...document.styleSheets].some(sheet => sheet.href?.includes('design-system.css'))
    }));
    checks.push(offline);
    if (!offline.stylesheet || offline.background !== 'rgb(16, 23, 25)') failures.push(offline);
    await page.context().setOffline(false);
    const fresh = await browser.newContext();
    try {
        const firstLoad = await fresh.newPage();
        firstLoad.on('pageerror', error => errors.push(error.message));
        await firstLoad.goto(url, { waitUntil: 'networkidle' });
        await firstLoad.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));
        await fresh.setOffline(true);
        await firstLoad.reload({ waitUntil: 'domcontentloaded' });
        await firstLoad.waitForTimeout(400);
        const firstOffline = await firstLoad.evaluate(() => ({
            firstInstallOffline: true,
            moduleLoaded: Boolean(window.ReefTheme),
            appLoaded: typeof selectTab === 'function',
            background: getComputedStyle(document.body).backgroundColor
        }));
        checks.push(firstOffline);
        if (!firstOffline.moduleLoaded || !firstOffline.appLoaded || firstOffline.background !== 'rgb(16, 23, 25)') failures.push(firstOffline);
        for (const width of [320,671,1440]) {
            await firstLoad.setViewportSize({ width, height: 900 });
            for (const id of ['tools','icp']) {
                await firstLoad.evaluate(id => selectTab(id), id);
                await firstLoad.waitForTimeout(250);
                record(await firstLoad.evaluate(inspectView), 'empty-profile');
                await firstLoad.screenshot({ path: `${output}/empty-${id}-${width}.png` });
            }
        }
    } finally { await fresh.close(); }
    const styledUrl = await page.evaluate(() => ReefTheme.pageUrl('privacy.html', 'light', { primary: '#8e3a58', secondary: '#316e80' }, true));
    await page.goto(styledUrl, { waitUntil: 'networkidle' });
    const linkedTheme = await page.evaluate(() => ({
        linkedTheme: true,
        accent: getComputedStyle(document.body).getPropertyValue('--accent').trim(),
        background: getComputedStyle(document.body).backgroundColor,
        embedded: document.documentElement.classList.contains('legal-embedded'),
        nextAccent: new URL(document.querySelector('.legal-links a[href*="impressum.html"]').href).searchParams.get('primary')
    }));
    checks.push(linkedTheme);
    if (linkedTheme.accent !== '#8e3a58' || linkedTheme.nextAccent !== '#8e3a58' || !linkedTheme.embedded) failures.push(linkedTheme);
    for (const file of ['anleitung.html','privacy.html','impressum.html','wave/demo.html']) {
        await page.goto(new URL(file, url).href, { waitUntil: 'networkidle' });
        for (const width of [390,1440]) {
            await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
            await page.screenshot({ path: `${output}/${file.replaceAll('/', '-').replace('.html','')}-${width}.png` });
            const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
            if (scroll > width + 1) failures.push({ file, width, scroll });
        }
    }
    const report = { ok: !errors.length && !failures.length, errors, failures, checks, output };
    await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ ok: report.ok, errors, failures, views: checks.length, output }, null, 2));
    if (!report.ok) process.exitCode = 1;
} finally { await browser.close(); }
