import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(`${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 671, height: 853 } });
const errors = [], checks = {};
page.on('pageerror', error => errors.push(error.message));
try {
    await page.goto(process.argv[2] || 'http://127.0.0.1:8202/index.html', { waitUntil: 'networkidle' });
    await page.evaluate(() => selectTab('lager'));
    const first = page.locator('#lager-container .inventory-card').first();
    checks.collapsedActions = !(await first.locator('.inventory-card-actions').isVisible());
    await first.locator('[data-stock-toggle]').click();
    checks.productOpensActions = await first.locator('.inventory-card-actions').isVisible();
    checks.expandedAccessible = await first.locator('[data-stock-toggle]').getAttribute('aria-expanded') === 'true';
    const name = await first.getAttribute('data-name');
    const cat = await first.getAttribute('data-category');
    await page.locator('#searchInput').fill(name);
    checks.search = await page.locator('#lager-container .inventory-card').count() === 1;
    checks.searchMatchesBookingList = await page.locator('#inventoryBookingProduct option').count() === 2;
    await page.locator('#categoryFilter').selectOption(cat);
    checks.category = await page.locator('#lager-container .inventory-card').count() === 1;
    const product = JSON.stringify([cat, name]);
    await page.locator('#inventoryBookingProduct').selectOption(product);
    await page.locator('[data-book="in"]').click();
    checks.correctProduct = await page.evaluate(([cat, item]) => currentAction.cat === cat && currentAction.item === item && currentAction.action === 'in', [cat, name]);
    const before = await page.evaluate(([cat, item]) => Number(db.inventory[cat]?.[item] || 0), [cat, name]);
    await page.locator('#amount').fill('10');
    await page.locator('#modal .modal-action-submit').click();
    checks.booking = await page.evaluate(([cat, item, before]) => db.inventory[cat][item] === before + 10, [cat, name, before]);
    await page.waitForTimeout(300);
    await page.evaluate(() => persistSequence);
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => selectTab('lager'));
    checks.bookingPersisted = await page.evaluate(([cat, item, before]) => db.inventory[cat][item] === before + 10, [cat, name, before]);
    checks.selectionPersisted = await page.locator('#inventoryBookingProduct').inputValue() === product;
    await page.locator('[data-book="out"]').click();
    checks.correctOutAction = await page.evaluate(() => currentAction.action === 'out');
    await page.evaluate(() => closeModal());
    await page.locator('#inventorySort').selectOption('name');
    checks.alphabetical = await page.evaluate(() => {
        const names = [...document.querySelectorAll('#lager-container .inventory-card')].map(card => card.dataset.name);
        return names.every((name, i) => !i || names[i - 1].localeCompare(name, 'de', { numeric: true }) <= 0);
    });
    await page.reload({ waitUntil: 'networkidle' });
    checks.sortPersisted = await page.locator('#inventorySort').inputValue() === 'name';
    // Deliberately use unequal capacities: amounts alone must not determine fill order.
    await page.evaluate(() => {
        const pref = JSON.parse(localStorage.getItem('reeftools.workspace-ui.v1'));
        pref.capacities = {};
        const cards = [...document.querySelectorAll('#lager-container .inventory-card')].slice(0, 2);
        cards.forEach((card, i) => {
            const { category: cat, name: item } = card.dataset;
            db.inventory[cat][item] = i ? 90 : 50;
            pref.capacities[JSON.stringify([activeWarehouseId || 'default', cat, item])] = i ? 1000 : 100;
        });
        localStorage.setItem('reeftools.workspace-ui.v1', JSON.stringify(pref)); saveDB();
    });
    await page.waitForTimeout(300);
    await page.evaluate(() => persistSequence);
    await page.reload({ waitUntil: 'networkidle' });
    await page.locator('#inventorySort').selectOption('fill-low');
    const low = await page.locator('#lager-container meter').first().getAttribute('max');
    await page.locator('#inventorySort').selectOption('fill-high');
    const high = await page.locator('#lager-container meter').first().getAttribute('max');
    checks.relativeFill = low === '1000' && high === '100';
    checks.noDuplicates = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('#lager-container .inventory-card')];
        return new Set(cards.map(card => JSON.stringify([card.dataset.category, card.dataset.name]))).size === cards.length;
    });
    await page.locator('#searchInput').fill('unbekanntes-produkt-xyz');
    checks.emptySearch = await page.locator('#inventoryBookingProduct option').count() === 1 && !(await page.locator('[data-book="in"]').isVisible());
    await page.locator('#searchInput').fill('');
    await page.locator('#inventoryBookingProduct').selectOption(product);
    checks.readOnly = await page.evaluate(() => {
        const original = window.isWarehouseReadOnlyView;
        window.isWarehouseReadOnlyView = () => true;
        filterLager();
        const protectedControls = [...document.querySelectorAll('#inventoryQuickBooking [data-book], #lager-container .inventory-card-actions button')].every(button => button.disabled);
        window.isWarehouseReadOnlyView = original;
        filterLager();
        return protectedControls;
    });
    for (const width of [320, 390, 671, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.locator('#inventoryBookingProduct').focus();
        checks[`bookingFocus${width}`] = await page.evaluate(() => {
            const select = document.getElementById('inventoryBookingProduct');
            const field = select.closest('.toolbar-field');
            const label = field.querySelector('label');
            const style = getComputedStyle(field), focus = getComputedStyle(select);
            return style.backgroundColor === 'rgba(0, 0, 0, 0)' && select.getBoundingClientRect().height === 44
                && Math.abs(field.getBoundingClientRect().bottom - select.getBoundingClientRect().bottom) < 1
                && label.getBoundingClientRect().height === 16 && parseFloat(focus.outlineWidth) >= 2;
        });
        checks[`toolbarSymmetry${width}`] = await page.evaluate(() => {
            const category = document.getElementById('categoryFilter').getBoundingClientRect();
            const sort = document.getElementById('inventorySort').getBoundingClientRect();
            const search = document.getElementById('searchInput').getBoundingClientRect();
            return Math.abs(category.top - sort.top) < 1 && Math.abs(category.width - sort.width) < 1
                && Math.abs(category.height - sort.height) < 1 && category.height === 44
                && Math.abs(search.left - category.left) < 1 && Math.abs(search.right - sort.right) < 1;
        });
        checks[`layout${width}`] = await page.evaluate(() => [...document.querySelectorAll('#lager button,#lager select,#lager input')].filter(el => el.getClientRects().length).every(el => {
            const rect = el.getBoundingClientRect(); return rect.left >= -1 && rect.right <= innerWidth + 1;
        }));
    }
    await page.setViewportSize({ width: 671, height: 853 });
    await page.locator('#lager-container').scrollIntoViewIfNeeded();
    await page.screenshot({ path: '/tmp/reeftools-compact-inventory.png' });
    const ok = !errors.length && Object.values(checks).every(Boolean);
    console.log(JSON.stringify({ ok, checks, errors }, null, 2));
    if (!ok) process.exitCode = 1;
} finally { await browser.close(); }
