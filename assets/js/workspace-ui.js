(function () {
    'use strict';
    const prefKey = 'reeftools.workspace-ui.v1';
    let preferences;
    try { preferences = JSON.parse(localStorage.getItem(prefKey) || '{}'); } catch { preferences = {}; }
    if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) preferences = {};
    const labels = { empty: 'Leer', critical: 'Kritisch', warning: 'Knapp', optimal: 'Ausreichend' };
    const productColorByFormula = {
        B: 'blue', CACL2: 'blue', SRCL2: 'blue',
        KBR: 'violet', KCL: 'violet', K2SO4: 'violet', MGCL2: 'violet', MGSO4: 'violet',
        NACL: 'lilac', NA2SO4: 'lilac', NAF: 'orange'
    };
    const categoryProductColors = {
        'Makro Elements': 'gray',
        Kationen: 'green',
        Anionen: 'orange',
        'Nutrition Elements': 'pale-yellow'
    };
    function productColor(cat, item) {
        const formula = /\(([^)]+)\)/.exec(item)?.[1]?.replace(/\s+/g, '').toUpperCase();
        if (formula && productColorByFormula[formula]) return productColorByFormula[formula];
        const name = item.trim().toLowerCase();
        if (name === 'magnesium') return 'violet';
        if (name === 'calcium') return 'blue';
        if (name === 'kh tag' || name === 'kh nacht') return 'gray';
        return categoryProductColors[cat] || 'neutral';
    }
    function persist() {
        try { localStorage.setItem(prefKey, JSON.stringify(preferences)); return true; }
        catch { showToast('Ansicht konnte nicht lokal gespeichert werden.', 'warning'); return false; }
    }
    function context() { return `${activeWarehouseId || 'default'}:${activeAquariumId || 'default'}`; }
    function capacityKey(cat, item) { return JSON.stringify([activeWarehouseId || 'default', cat, item]); }
    function renderCard(cat, item, warningItems) {
        const stock = Number(db.inventory[cat]?.[item] || 0);
        const threshold = Number(db.thresholds?.[item] || 0);
        const disabled = db.alerts?.disabled?.[item];
        const status = stock <= 0 ? 'empty' : !disabled && threshold > 0 && stock <= threshold
            ? 'critical' : !disabled && warningItems.has(item) ? 'warning' : 'optimal';
        const capacity = Number(preferences.capacities?.[capacityKey(cat, item)] || 0);
        const symbol = /\(([^)]+)\)/.exec(item)?.[1] || ({ Calcium: 'CA', Magnesium: 'MG', 'KH Nacht': 'KH', 'KH Tag': 'KH' }[item] || '');
        const displayName = symbol ? item.replace(/\s*\([^)]+\)\s*$/, '') : item;
        const favoriteMarker = isFavoriteProduct(item) ? '<span class="inventory-favorite-marker" aria-label="Favorit" title="Favorit">★</span>' : '';
        return `<article class="card inventory-card inventory-card--lean" data-name="${escapeHtml(item)}" data-category="${escapeHtml(cat)}" data-stock-status="${status}" data-product-color="${productColor(cat, item)}">
            <button type="button" class="inventory-product-toggle" data-stock-toggle aria-expanded="false" title="${escapeHtml(cat)} · Produkt öffnen"><span class="inventory-product-copy"><span class="inventory-color-mark" aria-hidden="true"></span><strong>${escapeHtml(displayName)}</strong>${symbol ? `<span class="inventory-symbol">${escapeHtml(symbol)}</span>` : ''}${favoriteMarker}</span><span class="inventory-stock-row"><strong class="stock">${formatItemAmount(item, stock)}</strong><span class="stock-status">${labels[status]}</span></span></button>
            <details class="product-history" data-lazy-stock-details><summary aria-label="Aktionen und Details für ${escapeHtml(item)}"><span aria-hidden="true">›</span></summary><div class="inventory-history-body"><div class="btn-group inventory-card-actions">${isWarehouseReadOnlyView() ? '<button type="button" disabled>Nur Ansicht</button>' : `<button type="button" class="btn-primary" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "in")'>Einlagern</button><button type="button" class="btn-secondary" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "out")'>Auslagern</button>`}</div><div data-stock-details></div></div></details>
            ${capacity > 0 ? `<div class="inventory-meter"><meter min="0" max="${capacity}" value="${Math.max(0, Math.min(stock, capacity))}" aria-label="Füllstand ${escapeHtml(item)}">${Math.round(stock / capacity * 100)} %</meter><small>${Math.round(stock / capacity * 100)} % der Kapazität${stock > capacity ? ' · über Kapazität' : ''}</small></div>` : ''}
        </article>`;
    }
    function loadDetails(details) {
        if (!details.open) return;
        const card = details.closest('[data-name]');
        const item = card.dataset.name, cat = card.dataset.category;
        const metrics = getUsageMetrics(item);
        const logs = (db.logs || []).filter(log => log.item === item).slice(-3).reverse();
        details.querySelector('[data-stock-details]').innerHTML = `<dl class="inventory-facts"><div><dt>Reichweite</dt><dd>${formatWeeksLeft(item)}</dd></div><div><dt>Verbrauch / Woche</dt><dd>${metrics.perDay ? formatItemAmount(item, metrics.perDay * 7, 2) : 'Noch keine Daten'}</dd></div><div><dt>Warnlimit</dt><dd>${db.thresholds?.[item] > 0 ? formatItemAmount(item, db.thresholds[item]) : 'Nicht gesetzt'}</dd></div></dl><ul>${logs.map(log => `<li>${log.action === 'out' ? '-' : '+'}${formatItemAmount(item, log.amount)} · ${escapeHtml(formatWarehouseDate(getLogTime(log)))}</li>`).join('') || '<li>Noch keine Buchungen</li>'}</ul><div class="inventory-detail-actions"><button type="button" data-stock-favorite>${isFavoriteProduct(item) ? 'Favorit entfernen' : 'Als Favorit'}</button><button type="button" data-stock-limit>Warnlimit</button><button type="button" data-stock-capacity>Kapazität</button></div>`;
        details.querySelector('[data-stock-favorite]').onclick = () => toggleFavoriteProduct(item);
        details.querySelectorAll('.inventory-detail-actions button').forEach(button => button.classList.add('btn-secondary'));
        details.querySelector('[data-stock-limit]').onclick = () => setThreshold(item);
        details.querySelector('[data-stock-capacity]').onclick = async () => {
            const key = capacityKey(cat, item);
            const value = await appPrompt(`Kapazität für ${item} in ${getUnitLabel(getItemUnit(item))}. Leer lassen zum Entfernen.`, String(preferences.capacities?.[key] || ''), { title: 'Kapazität', label: `Kapazität (${getUnitLabel(getItemUnit(item))})`, confirmText: 'Speichern' });
            if (value === null || value === undefined) return;
            const number = Number(String(value).replace(',', '.'));
            if (String(value).trim() && (!Number.isFinite(number) || number <= 0)) { showToast('Bitte eine positive Kapazität eingeben.', 'warning'); return; }
            preferences.capacities ||= {};
            if (!String(value).trim()) delete preferences.capacities[key]; else preferences.capacities[key] = number;
            persist(); filterLager();
        };
    }
    function mountInventory(root, openKeys = []) {
        mountStockControls(root);
        document.querySelector('#lager .inventory-view-switch')?.remove();
        root.dataset.view = 'list';
        root.querySelectorAll('[data-lazy-stock-details]').forEach(details => {
            const card = details.closest('[data-name]');
            const toggle = card.querySelector('[data-stock-toggle]');
            toggle.onclick = () => { details.open = !details.open; };
            card.onclick = event => {
                if (!event.target.closest('button, details')) details.open = !details.open;
            };
            details.addEventListener('toggle', () => {
                toggle.setAttribute('aria-expanded', String(details.open));
                loadDetails(details);
            });
            details.open = openKeys.includes(JSON.stringify([card.dataset.category, card.dataset.name]));
            toggle.setAttribute('aria-expanded', String(details.open));
            loadDetails(details);
        });
    }
    function mountStockControls(root) {
        let sort = document.getElementById('inventorySort');
        if (!sort) {
            const field = document.createElement('div');
            field.className = 'toolbar-field';
            field.innerHTML = '<label for="inventorySort">Sortierung</label><select id="inventorySort"><option value="category">Kategorie</option><option value="name">Name A–Z</option><option value="fill-low">Füllstand aufsteigend</option><option value="fill-high">Füllstand absteigend</option></select>';
            document.querySelector('#lager .lager-toolbar')?.append(field);
            sort = field.querySelector('select');
            sort.setAttribute('aria-label', 'Lagerbestand sortieren');
            sort.title = 'Füllstand relativ zur hinterlegten Kapazität; Produkte ohne Kapazität zuletzt';
            sort.value = preferences.sort || 'category';
            sort.onchange = () => { preferences.sort = sort.value; persist(); filterLager(); };
        }
        const cards = [...root.querySelectorAll('.inventory-card')];
        if (sort.value !== 'category') {
            const fill = card => {
                const cat = card.dataset.category, item = card.dataset.name;
                const capacity = Number(preferences.capacities?.[capacityKey(cat, item)] || 0);
                return capacity > 0 ? Number(db.inventory[cat]?.[item] || 0) / capacity : null;
            };
            cards.sort((a, b) => {
                const names = a.dataset.name.localeCompare(b.dataset.name, 'de', { numeric: true });
                if (sort.value === 'name') return names;
                const x = fill(a), y = fill(b);
                if (x === null || y === null) return x === y ? names : x === null ? 1 : -1;
                return (sort.value === 'fill-high' ? y - x : x - y) || names;
            });
            root.replaceChildren();
            const grid = document.createElement('div'); grid.className = 'inventory-card-grid';
            grid.append(...cards); root.append(grid);
        }
        let quick = document.getElementById('inventoryQuickBooking');
        if (!quick) {
            quick = document.createElement('details'); quick.id = 'inventoryQuickBooking';
            quick.className = 'inventory-quick-booking';
            quick.innerHTML = '<summary>Produkt buchen</summary><div class="inventory-quick-booking-fields"><div class="toolbar-field"><label for="inventoryBookingProduct">Produkt</label><select id="inventoryBookingProduct"><option value="">Produkt auswählen</option></select></div><button type="button" class="btn-primary" data-book="in">Einlagern</button><button type="button" class="btn-secondary" data-book="out">Auslagern</button></div>';
            document.querySelector('#lager .warehouse-filter-panel')?.append(quick);
            quick.addEventListener('click', event => {
                const button = event.target.closest('[data-book]');
                const value = quick.querySelector('select').value;
                if (!button || !value || isWarehouseReadOnlyView()) return;
                const [cat, item] = JSON.parse(value); openModal(cat, item, button.dataset.book);
            });
            quick.querySelector('select').onchange = () => {
                preferences.bookingProduct = quick.querySelector('select').value; persist();
                quick.querySelectorAll('[data-book]').forEach(button => {
                    button.hidden = !quick.querySelector('select').value;
                    button.disabled = !quick.querySelector('select').value || isWarehouseReadOnlyView();
                });
            };
            quick.querySelector('select').setAttribute('aria-label', 'Produkt für Ein- oder Auslagerung auswählen');
        }
        const products = cards.map(card => ({ cat: card.dataset.category, item: card.dataset.name }));
        products.sort((a, b) => a.item.localeCompare(b.item, 'de'));
        const select = quick.querySelector('select');
        select.innerHTML = '<option value="">Produkt auswählen</option>' + products.map(({ cat, item }) => `<option value="${escapeHtml(JSON.stringify([cat, item]))}">${escapeHtml(item)} · ${escapeHtml(cat)}</option>`).join('');
        select.value = preferences.bookingProduct || '';
        quick.querySelectorAll('[data-book]').forEach(button => {
            button.hidden = !select.value;
            button.disabled = !select.value || isWarehouseReadOnlyView();
        });
    }
    function icpFeedback(rows) {
        const matches = traceCalculatorElements.map(element => getTraceIcpValueFromReport({ values: rows }, element));
        const numeric = matches.filter(row => Number.isFinite(row?.value)).length;
        const recognized = matches.filter(Boolean).length;
        const missing = traceCalculatorElements.filter((_, index) => !matches[index]).map(element => element.symbol);
        const duplicate = traceCalculatorElements.filter(element => rows.filter(row => String(row.symbol || extractIcpSymbol(row.name || '')).toLowerCase() === element.symbol.toLowerCase()).length > 1).map(element => element.symbol);
        return `<div class="icp-match-feedback" role="status" data-stock-status="${numeric === matches.length && !duplicate.length ? 'optimal' : 'warning'}"><strong>${numeric === matches.length && !duplicate.length ? '&#10003; ' : ''}${recognized}/${matches.length} Trace-Elemente erkannt</strong><span>${numeric}/${matches.length} numerisch auswertbar</span>${missing.length ? `<span>Fehlend: ${missing.join(', ')}</span>` : ''}${duplicate.length ? `<span>Doppelt: ${duplicate.join(', ')}</span>` : ''}</div>`;
    }
    function groupNavigation() {
        const nav = document.querySelector('.nav-links');
        if (!nav) return;
        const buttons = [...nav.querySelectorAll('button[id^="tab-"]')];
        let work = nav.querySelector('[data-nav-work]'), utility = nav.querySelector('[data-nav-utility]');
        if (!work) {
            work = document.createElement('div'); work.dataset.navWork = ''; work.className = 'nav-work-group';
            utility = document.createElement('div'); utility.dataset.navUtility = ''; utility.className = 'nav-utility-group';
            work.innerHTML = '<strong class="nav-group-label">Arbeitsbereiche</strong>';
            utility.innerHTML = '<strong class="nav-group-label">Verwaltung & Hilfe</strong>';
            nav.append(work, utility);
        }
        buttons.forEach(button => (['einstellungen', 'log', 'statistik', 'masseneingang', 'nachbestellen'].includes(button.dataset.tab) ? utility : work).append(button));
        if (!utility.querySelector('[data-workspace-export]')) {
            const backup = document.createElement('button'); backup.type = 'button'; backup.dataset.workspaceExport = ''; backup.textContent = 'Projekt exportieren'; backup.onclick = () => exportData();
            utility.append(backup);
        }
        const extras = document.querySelector('.nav-menu-utility');
        if (extras) document.querySelectorAll('.header-demo-button,.header-help-link,.community-project-badge').forEach(element => {
            if (element.parentElement !== extras) extras.append(element);
        });
    }
    function observeChrome() {
        const header = document.getElementById('appHeader');
        if (header && window.ResizeObserver) new ResizeObserver(() => {
            document.documentElement.style.setProperty('--measured-header-height', `${header.getBoundingClientRect().height}px`);
        }).observe(header);
    }
    function wizard(root, panels, name, validate) {
        if (!root || root.dataset.wizardMounted) return;
        root.dataset.wizardMounted = name;
        const bar = document.createElement('nav'); bar.className = 'workspace-step-nav'; bar.setAttribute('aria-label', name);
        const footer = document.createElement('div'); footer.className = 'workspace-step-footer';
        footer.innerHTML = '<p role="alert" class="workspace-step-error"></p><button type="button" class="btn-secondary" data-back>Zurück</button><button type="button" class="btn-primary" data-next>Weiter</button>';
        root.prepend(bar); root.append(footer);
        const error = footer.querySelector('p');
        const stepKey = () => `${name}:${context()}`;
        let step = Math.min(panels.length - 1, Math.max(0, Number(preferences.steps?.[stepKey()] || 0)));
        const buttons = panels.map((panel, index) => {
            const button = document.createElement('button'); button.type = 'button'; button.className = 'btn-secondary'; button.textContent = `${index + 1}. ${panel.label}`;
            button.onclick = () => go(index); bar.append(button); return button;
        });
        function show(focus = false) {
            panels.forEach((panel, index) => { panel.elements.forEach(el => { el.hidden = index !== step; }); buttons[index].setAttribute('aria-current', index === step ? 'step' : 'false'); });
            footer.querySelector('[data-back]').disabled = step === 0;
            footer.querySelector('[data-next]').hidden = step === panels.length - 1;
            if (focus) { buttons[step].focus({ preventScroll: true }); }
        }
        function go(next) {
            if (next > step) {
                for (let index = 0; index < next; index++) {
                    const message = validate(index);
                    if (message) { error.textContent = message; return; }
                }
            }
            error.textContent = ''; step = next;
            preferences.steps ||= {}; preferences.steps[stepKey()] = step; persist(); show(true);
        }
        footer.querySelector('[data-back]').onclick = () => go(Math.max(0, step - 1));
        footer.querySelector('[data-next]').onclick = () => go(Math.min(panels.length - 1, step + 1));
        document.addEventListener('reeftools-context-change', () => { step = Number(preferences.steps?.[stepKey()] || 0); step = Math.min(panels.length - 1, Math.max(0, step)); error.textContent = ''; show(); });
        show();
    }
    function initWizards() {
        const trace = document.querySelector('.trace-calculator-body');
        if (trace && !trace.dataset.wizardMounted) {
            const loadLast = trace.querySelector('[onclick="loadTraceCalculatorFromLast()"]');
            if (loadLast) trace.querySelector('.trace-config-step').append(loadLast);
            wizard(trace, [
            { label: 'Planung', elements: [trace.querySelector('.trace-config-step')] },
            { label: 'ICP', elements: [trace.querySelector('.trace-icp-step')] },
            { label: 'Rezept', elements: [trace.querySelector('.trace-result-step'), trace.querySelector('.trace-calculator-actions')] }
        ], 'Trace', index => {
            if (index === 0) {
                syncTraceCalculatorConfigUi();
                const inputs = [...trace.querySelectorAll('.trace-config-step input')].filter(input => !input.disabled && input.type !== 'checkbox' && input.type !== 'password');
                if (inputs.some(input => !input.checkValidity())) return 'Bitte die markierten Planungswerte prüfen.';
                renderTraceCalculator();
            }
            return '';
            });
        }
        const cr = document.querySelector('.cr-paste-card');
        if (cr && !cr.dataset.wizardMounted) {
            const preview = document.getElementById('cr-preview-container');
            const actions = cr.querySelector(':scope > .workflow-actions:last-child');
            const inputPanel = document.createElement('section');
            [...cr.children].filter(el => el !== preview && el !== actions).forEach(el => inputPanel.append(el));
            cr.prepend(inputPanel);
            // The parser controls its own hidden state; the wizard owns a separate wrapper.
            const previewPanel = document.createElement('section'); preview.before(previewPanel); previewPanel.append(preview);
            const reviewPanel = document.createElement('section');
            reviewPanel.innerHTML = '<h3>Auslagerung bestätigen</h3><div data-cr-final-preview></div>';
            actions.before(reviewPanel); reviewPanel.append(actions);
            wizard(cr, [{ label: 'Rezept', elements: [inputPanel] }, { label: 'Prüfung', elements: [previewPanel] }, { label: 'Auslagern', elements: [reviewPanel] }], 'C&R', () => {
                const rows = parseCRPasteAmounts(document.getElementById('cr-paste-area').value);
                if (rows.length < crOrder.length || !rows.some(row => row.amount > 0)) return 'Bitte ein vollständiges Rezept mit positiven Mengen einfügen.';
                previewCRPaste();
                reviewPanel.querySelector('[data-cr-final-preview]').innerHTML = document.getElementById('cr-preview-list').innerHTML;
                return '';
            });
            const paste = document.getElementById('cr-paste-area');
            const restore = () => {
                paste.value = preferences.drafts?.[context()] || ''; previewCRPaste();
                reviewPanel.querySelector('[data-cr-final-preview]').innerHTML = paste.value.trim() ? document.getElementById('cr-preview-list').innerHTML : '';
            };
            paste.addEventListener('input', () => {
                preferences.drafts ||= {}; preferences.drafts[context()] = paste.value; persist();
            });
            document.addEventListener('reeftools-context-change', restore);
            document.addEventListener('reeftools-cr-complete', () => {
                preferences.drafts ||= {}; delete preferences.drafts[context()];
                preferences.steps ||= {}; preferences.steps[`C&R:${context()}`] = 0;
                persist(); document.dispatchEvent(new Event('reeftools-context-change'));
            });
            restore();
        }
    }
    window.ReefWorkspaceUI = { renderCard, mountInventory, icpFeedback, groupNavigation, initWizards };
    document.addEventListener('DOMContentLoaded', () => { initWizards(); groupNavigation(); observeChrome(); if (document.getElementById('lager-container')) filterLager(); });
}());
