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
const page = await browser.newPage();
const errors = [], failures = [], checks = [];
page.on('pageerror', error => errors.push(error.message));
const properties = ['backgroundColor','color','borderTopWidth','borderTopStyle','borderTopColor','borderRadius','fontSize','fontWeight','fontFamily','lineHeight','padding','minHeight','textDecorationLine'];
try {
    await page.goto(process.argv[2] || pathToFileURL(resolve('index.html')).href, { waitUntil: 'networkidle' });
    for (const width of [320,390,768,1440]) {
        await page.setViewportSize({ width, height: 900 });
        if (width < 1024) await page.evaluate(() => {
            if (!document.getElementById('main-nav').classList.contains('open')) toggleMenu();
        });
        for (const theme of ['default','light','girl','mint','badman']) {
            await page.evaluate(value => applyTheme(value), theme);
            for (const state of ['normal','hover','focus']) {
                const styles = [];
                for (const selector of ['.header-help-link','.header-demo-button']) {
                    const element = page.locator(selector);
                    await element.scrollIntoViewIfNeeded();
                    await page.mouse.move(0, 0);
                    await page.evaluate(() => document.activeElement?.blur());
                    if (state === 'hover') await element.hover();
                    if (state === 'focus') await element.focus();
                    await page.waitForTimeout(180);
                    styles.push(await element.evaluate((node, properties) => {
                        const style = getComputedStyle(node);
                        return Object.fromEntries(properties.map(name => [name, style[name]]));
                    }, [...properties, ...(state === 'focus' ? ['outlineWidth','outlineColor','outlineOffset'] : [])]));
                }
                const differences = Object.keys(styles[0]).filter(property => styles[0][property] !== styles[1][property]);
                const result = { width, theme, state, differences };
                checks.push(result);
                if (differences.length) failures.push({ ...result, styles });
            }
        }
    }
    const help = await page.locator('.header-help-link').evaluate(element => ({
        href: new URL(element.href).pathname,
        label: element.getAttribute('aria-label'),
        guide: element.dataset.helpPage
    }));
    if (!help.href.endsWith('/anleitung.html') || help.guide !== 'guide' || !help.label) failures.push({ help });
    const appUrl = page.url();
    await page.locator('.header-help-link').click();
    await page.locator('#legalModal.is-open').waitFor({ state: 'visible' });
    const opensGuide = await page.locator('#legalModalFrame').evaluate(frame => new URL(frame.src).pathname.endsWith('/anleitung.html'));
    if (!opensGuide || page.url() !== appUrl) failures.push({ opensGuide, appUrl, currentUrl: page.url() });
    await page.locator('#legalModal .legal-modal-close').click();
    const ok = !errors.length && !failures.length;
    console.log(JSON.stringify({ ok, checks: checks.length, errors, failures, help, opensGuide }, null, 2));
    if (!ok) process.exitCode = 1;
} finally { await browser.close(); }
