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

const url = process.argv[2] || 'http://127.0.0.1:8202/index.html#tools';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));

try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    const result = await page.evaluate(() => {
        selectTab('tools');
        initToolSection('c-und-r-und-mischen', true);
        const select = document.getElementById('macroRecipeSelect');
        const water = document.getElementById('macroRecipeLiters');
        const macroResult = document.getElementById('macroRecipeResult');
        select.value = 'Hans-Werner Balling KH';
        changeMacroRecipe();
        water.value = '5';
        renderMacroRecipe();
        const khFive = macroResult.textContent;
        water.value = '10';
        renderMacroRecipe();
        const khTen = macroResult.textContent;
        select.value = 'Hans-Werner Balling Ca';
        changeMacroRecipe();
        water.value = '5';
        renderMacroRecipe();
        const caFive = macroResult.textContent;
        water.value = '2.5';
        renderMacroRecipe();
        const caHalf = macroResult.textContent;
        const previousProviders = [...getActiveSupplyProfile().providers];
        const previousFiltersConfigured = getActiveSupplyProfile().filtersConfigured;
        getActiveSupplyProfile().filtersConfigured = true;
        getActiveSupplyProfile().providers = ['own-powder'];
        refreshMacroRecipeOptions();
        const ownPowderOnly = [...select.options].map(option => option.value);
        const macroVisibleWithoutOsci = !isToolHidden('makro-elemente-anmischen');
        getActiveSupplyProfile().providers = previousProviders;
        getActiveSupplyProfile().filtersConfigured = previousFiltersConfigured;
        refreshMacroRecipeOptions();
        select.value = 'Hans-Werner Balling Ca';
        changeMacroRecipe();
        water.value = '2.5';
        renderMacroRecipe();
        saveBallingMixingBatch();
        return {
            khFive: khFive.includes('420 g') && khFive.includes('5 L'),
            khTen: khTen.includes('840 g') && khTen.includes('10 L'),
            caFive: caFive.includes('358 g') && caFive.includes('5 L'),
            caHalf: caHalf.includes('179 g') && caHalf.includes('2,5 L'),
            waterBasisClear: caHalf.includes('nicht das fertige Lösungsvolumen'),
            ownPowderRecipeFilter: ownPowderOnly.length === 2 && ownPowderOnly.every(name => name.startsWith('Hans-Werner')),
            macroVisibleWithoutOsci,
            savedBatch: db.ballingMixingHistory?.[0]?.element === 'Ca'
                && db.ballingMixingHistory[0].waterLiters === 2.5
                && db.ballingMixingHistory[0].powderGrams === 179
        };
    });
    await page.waitForTimeout(500);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    result.persistedAfterReload = await page.evaluate(() => db.ballingMixingHistory?.some(entry =>
        entry.element === 'Ca' && entry.waterLiters === 2.5 && entry.powderGrams === 179
    ) || false);
    page.on('dialog', dialog => dialog.accept());
    result.canRemoveBatch = await page.evaluate(() => {
        const id = db.ballingMixingHistory?.[0]?.id;
        if (!id) return false;
        deleteBallingMixingBatch(id);
        return db.ballingMixingHistory.length === 0;
    });
    const layouts = [];
    for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        layouts.push(await page.evaluate(() => {
            selectTab('tools');
            initToolSection('c-und-r-und-mischen', true);
            document.getElementById('macroRecipeSelect').value = 'Hans-Werner Balling KH';
            changeMacroRecipe();
            return {
                width: innerWidth,
                documentWidth: document.documentElement.scrollWidth,
                waterLabel: document.getElementById('macroRecipeLitersLabel').textContent,
                recipeIsVisible: [...document.getElementById('macroRecipeSelect').options].some(option => option.value === 'Hans-Werner Balling KH')
            };
        }));
    }
    result.layouts = layouts;
    const ok = Object.entries(result).filter(([key]) => key !== 'layouts').every(([, value]) => value === true)
        && layouts.every(item => item.documentWidth <= item.width && item.recipeIsVisible && item.waterLabel.includes('Osmosewasser'))
        && errors.length === 0;
    console.log(JSON.stringify({ ok, result, errors }, null, 2));
    if (!ok) process.exitCode = 1;
} finally {
    await browser.close();
}
