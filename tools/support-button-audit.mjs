import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
for (const candidate of ['playwright', `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`]) {
    try { ({ chromium } = require(candidate)); break; } catch {}
}
if (!chromium) throw new Error('Playwright is required.');
const browser = await chromium.launch({ headless: true });
const checks = [], errors = [];
try {
    for (const width of [320,390,768,1440]) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(process.argv[2] || pathToFileURL(resolve('index.html')).href, { waitUntil: 'networkidle' });
        if (width < 1024) await page.locator('.menu-toggle').click();
        await page.waitForTimeout(250);
        const button = page.locator('.nav-support-button');
        const result = await button.evaluate(element => {
            const nav = element.closest('nav'), rect = element.getBoundingClientRect(), style = getComputedStyle(element);
            return {
                firstAction: element.parentElement === nav && element.previousElementSibling.classList.contains('nav-menu-header'),
                aboveLinks: rect.bottom <= nav.querySelector('.nav-links').getBoundingClientRect().top,
                visible: rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0,
                unclipped: element.scrollHeight <= element.clientHeight + 1,
                height: rect.height,
                accentFilled: style.backgroundColor !== 'rgba(0, 0, 0, 0)',
                unique: document.querySelectorAll('.header-support-button').length === 1
            };
        });
        if (Object.values(result).some(value => value === false) || result.height < 56) throw new Error(JSON.stringify({ width, result }));
        if ([390,1440].includes(width)) await page.screenshot({ path: `/tmp/reeftools-support-${width}.png` });
        await button.click();
        await page.waitForFunction(() => document.querySelector('.tab-content.active')?.id === 'einstellungen' && document.getElementById('projectSupportCard')?.getClientRects().length);
        await page.locator('#projectSupportCard .project-support-actions a').first().waitFor({ state: 'visible' });
        if (width < 1024 && await page.locator('#main-nav').evaluate(nav => nav.classList.contains('open'))) throw new Error('Menu did not close.');
        checks.push({ width, ...result, supportOpened: true });
        await page.close();
    }
    console.log(JSON.stringify({ ok: !errors.length, checks, errors }, null, 2));
    if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
