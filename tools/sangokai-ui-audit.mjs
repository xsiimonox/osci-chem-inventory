import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
for (const candidate of [
    'playwright',
    `${process.env.HOME || ''}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`
]) {
    try { ({ chromium } = require(candidate)); break; } catch {}
}
if (!chromium) throw new Error('Playwright is required.');

const url = process.argv[2] || 'http://127.0.0.1:8202/index.html';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));

try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
        selectTab('tools');
        const section = document.querySelector('#tools .tool-section[data-section-id="sangokai-mengen-und-mischen"]');
        if (section) section.open = true;
        initToolSection('sangokai-mengen-und-mischen', true);
        const tracker = getSangokaiDoseTrackerState();
        tracker.measurements = tracker.measurements.filter(entry => !String(entry.id).startsWith('sangokai-ui-audit-'));
        tracker.measurements.push(
            { id: 'sangokai-ui-audit-1', product: 'kh', at: '2026-10-01T12:00:00.000Z', value: 7, doseMlPerDay: 10 },
            { id: 'sangokai-ui-audit-2', product: 'kh', at: '2026-10-05T12:00:00.000Z', value: 7.2, doseMlPerDay: 10 },
            { id: 'sangokai-ui-audit-3', product: 'kh', at: '2026-10-09T12:00:00.000Z', value: 7.25, doseMlPerDay: 10 }
        );
        tracker.forms.kh = { ...(tracker.forms.kh || {}), product: 'kh', value: '', targetValue: '7.5', targetDays: '10', maxChangePercent: '20', mode: 'gradual' };
        tracker.form = tracker.forms.kh;
        initSangokaiDoseTracker();
        delete tracker.defaults.ca;
        tracker.forms.ca = { product: 'ca', value: '', doseMlPerDay: '', at: formatDateTimeLocal() };
        document.getElementById('sangokaiDoseElement').value = 'ca';
        changeSangokaiDoseProduct('ca');
        window.sangokaiDoseDefaultsAudit = {
            targetDays: document.getElementById('sangokaiDoseTargetDays').value,
            maxChangePercent: document.getElementById('sangokaiDoseMaxChange').value
        };
        document.getElementById('sangokaiDoseElement').value = 'kh';
        changeSangokaiDoseProduct('kh');
    });

    const results = [];
    for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const metrics = await page.evaluate(() => {
            const grid = document.querySelector('#tools .tool-section[data-section-id="sangokai-mengen-und-mischen"] .tool-card-grid');
            const card = grid?.querySelector('.tool-compact-card[data-tool-id="sangokai-mengen-und-mischen"]');
            const svg = card?.querySelector('.sangokai-dose-trend svg');
            const points = card?.querySelectorAll('.sangokai-dose-trend-point').length || 0;
            const target = card?.querySelector('.sangokai-dose-target-line');
            const doseFields = card?.querySelectorAll('.sangokai-dose-primary-grid > .input-group');
            const axisFontSize = svg ? getComputedStyle(svg.querySelector('.sangokai-dose-axis-label')).fontSize : '0px';
            const secondRowY = doseFields?.[3]?.getBoundingClientRect().top;
            const modeRowY = doseFields?.[4]?.getBoundingClientRect().top;
            const doseFieldRects = [...(doseFields || [])].map(field => field.getBoundingClientRect());
            return {
                width: innerWidth,
                gridWidth: grid?.clientWidth || 0,
                cardWidth: card?.getBoundingClientRect().width || 0,
                documentWidth: document.documentElement.scrollWidth,
                chartExists: Boolean(svg),
                chartPointCount: points,
                targetLine: Boolean(target),
                primaryFieldCount: card?.querySelectorAll('.sangokai-dose-primary-grid .input-group').length || 0,
                finalFieldColumn: doseFields?.[4] ? getComputedStyle(doseFields[4]).gridColumn : '',
                secondRowAligned: Number.isFinite(secondRowY) && Number.isFinite(modeRowY) && Math.abs(secondRowY - modeRowY) <= 1,
                mobileFieldsAligned: doseFieldRects.length === 5 && doseFieldRects.every(rect => Math.abs(rect.x - doseFieldRects[0].x) < 1 && Math.abs(rect.width - doseFieldRects[0].width) < 1),
                advancedOptionsClosed: card ? !card.querySelector('.sangokai-dose-options')?.open : false,
                axisFontSize: Number.parseFloat(axisFontSize),
                invalidSvg: /NaN|undefined/.test(svg?.outerHTML || '')
            };
        });
        metrics.cardFillsGrid = metrics.cardWidth >= metrics.gridWidth - 40;
        metrics.noPageOverflow = metrics.documentWidth <= metrics.width + 1;
        results.push(metrics);

        const submenu = page.locator('#tools .sangokai-submenu[data-sangokai-submenu="dose-history"]');
        await submenu.evaluate(element => element.querySelector(':scope > summary').click());
        const openedWithOneClick = await submenu.evaluate(element => element.open);
        await submenu.evaluate(element => element.querySelector(':scope > summary').click());
        const closedWithOneClick = !(await submenu.evaluate(element => element.open));
        results[results.length - 1].openedWithOneClick = openedWithOneClick;
        results[results.length - 1].closedWithOneClick = closedWithOneClick;
    }

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reducedMotionDuration = await page.locator('.sangokai-dose-trend-line').evaluate(element => getComputedStyle(element).animationDuration);
    const ok = errors.length === 0
        && results.every(item => item.cardFillsGrid && item.noPageOverflow && item.chartExists && item.chartPointCount === 3 && item.targetLine && item.primaryFieldCount === 5 && item.advancedOptionsClosed && !item.invalidSvg && item.openedWithOneClick && item.closedWithOneClick && (item.width <= 480 ? item.axisFontSize >= 24 : item.axisFontSize < 24))
        && results.filter(item => item.width >= 1400).every(item => item.finalFieldColumn === 'span 3' && item.secondRowAligned)
        && results.filter(item => item.width <= 390).every(item => item.mobileFieldsAligned)
        && (await page.evaluate(() => window.sangokaiDoseDefaultsAudit.targetDays === '10' && window.sangokaiDoseDefaultsAudit.maxChangePercent === '10'))
        && reducedMotionDuration === '0s';
    console.log(JSON.stringify({ ok, results, doseDefaults: await page.evaluate(() => window.sangokaiDoseDefaultsAudit), reducedMotionDuration, errors }, null, 2));
    if (!ok) process.exitCode = 1;
} finally {
    await browser.close();
}
