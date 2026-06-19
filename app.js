// --- DATEN & KONFIGURATION ---
const catalog = {
    "C&R Produkte": {
        "Strontiumchlorid (SrCl2)": [100, 1000], "Magnesiumsulfat (MgSO4)": [1000, 5000],
        "Magnesiumchlorid (MgCl2)": [1000, 5000], "Kaliumbromid (KBr)": [1000, 5000],
        "Calciumchlorid (CaCl2)": [1000, 5000], "Kaliumchlorid (KCl)": [1000, 5000],
        "Natriumfluorid (NaF)": [5000], "Bor (B)": [1000, 5000],
        "Natriumchlorid (NaCl)": [5000, 10000], "Kaliumsulfat (K2SO4)": [1000, 5000],
        "Natriumsulfat (Na2SO4)": [5000]
    },
    "Makro Elements": { "Calcium": [5000], "KH Nacht": [5000], "KH Tag": [10000], "Magnesium": [5000] },
    "Nutrition Elements": { "Kohlenstoff (C)": [1000], "Lanthan (La)": [1000], "Phosphor (P)": [1000], "Stickstoff (N)": [1000] },
    "Anionen": { "Fluor (F)": [1000], "Iod (I)": [1000], "Brom (Br)": [1000], "Vanadium (V)": [1000] }, // <-- HIER HINZUGEFÜGT
    "Kationen": { 
        "Mangan (Mn)": [1000], "Eisen (Fe)": [1000], "Cobalt (Co)": [1000], "Zink (Zn)": [1000], "Kupfer (Cu)": [1000], "Chrom (Cr)": [1000], "Nickel (Ni)": [1000],
        "Molybdän (Mo)": [1000], "Lithium (Li)": [1000], "Barium (Ba)": [1000], "Rubidium (Rb)": [1000], "Bor (B) ": [1000] // <-- HIER ENTFERNT
    }
};

const densities = {
    "Strontiumchlorid (SrCl2)": 1.012, "Magnesiumsulfat (MgSO4)": 1.011, "Magnesiumchlorid (MgCl2)": 1.121,
    "Kaliumbromid (KBr)": 1.045, "Calciumchlorid (CaCl2)": 1.155, "Kaliumchlorid (KCl)": 1.008,
    "Natriumfluorid (NaF)": 1.015, "Bor (B)": 1.005, "Natriumchlorid (NaCl)": 1.189,
    "Kaliumsulfat (K2SO4)": 1.033, "Natriumsulfat (Na2SO4)": 1.085, "Calcium": 1.120,
    "KH Nacht": 1.065, "KH Tag": 1.080, "Magnesium": 1.140, "Fluor (F)": 1.015,
    "Mangan (Mn)": 1.005, "Eisen (Fe)": 1.012, "Cobalt (Co)": 1.002, "Zink (Zn)": 1.008,
    "Kupfer (Cu)": 1.003, "Chrom (Cr)": 1.001, "Nickel (Ni)": 1.002, "Molybdän (Mo)": 1.006,
    "Vanadium (V)": 1.002, "Lithium (Li)": 1.015, "Barium (Ba)": 1.002, "Rubidium (Rb)": 1.003,
    "Bor (B) ": 1.004, "Kohlenstoff (C)": 1.020, "Lanthan (La)": 1.010, "Phosphor (P)": 1.005,
    "Stickstoff (N)": 1.030, "Iod (I)": 1.025, "Brom (Br)": 1.040
};

let db = {
    inventory: {},
    thresholds: {},
    stats: {},
    statsStarted: Date.now(),
    logs: [],
    theme: 'default',
    partyMode: false
};

let currentAction = {};
let bulkCart = [];
let lowStockFilterActive = false; // Steuert den Geringer-Bestand-Filter

function init() {
    let saved = localStorage.getItem('osci_db_v16');
    if (saved) {
        try {
            db = JSON.parse(saved);
            if (!db.thresholds) db.thresholds = {};
            if (!db.stats) db.stats = {};
            if (!db.logs) db.logs = [];
            if (!db.statsStarted) db.statsStarted = Date.now();
        } catch(e) {
            console.error("Fehler beim DB-Laden, erstelle neu.", e);
        }
    }
    
    // Altslasten im Speicher bereinigen (Kationen 1 & 2 entfernen)
    if (db.inventory["Kationen 1"]) delete db.inventory["Kationen 1"];
    if (db.inventory["Kationen 2"]) delete db.inventory["Kationen 2"];
    
    // AUTOMATISCHE MIGRATION FÜR VANADIUM:
    // Falls Vanadium noch fälschlicherweise bei den Kationen liegt, zu Anionen verschieben
    if (db.inventory["Kationen"] && db.inventory["Kationen"]["Vanadium (V)"] !== undefined) {
        if (!db.inventory["Anionen"]) db.inventory["Anionen"] = {};
        db.inventory["Anionen"]["Vanadium (V)"] = db.inventory["Kationen"]["Vanadium (V)"];
        delete db.inventory["Kationen"]["Vanadium (V)"];
    }
    
    // Abgleich mit dem aktuellen Katalog
    for (let cat in catalog) {
        if (!db.inventory[cat]) db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            if (db.inventory[cat][item] === undefined) {
                db.inventory[cat][item] = 0;
            }
            if (db.stats[item] === undefined) {
                db.stats[item] = 0;
            }
        }
    }
    
    saveDB();
    applyTheme(db.theme || 'default', false);
    
    const partyCb = document.getElementById('partyToggle');
    if(partyCb) {
        partyCb.checked = !!db.partyMode;
        togglePartyMode(true);
    }
    
    buildBulkProductSelect();
    renderLager();
}

function saveDB() {
    localStorage.setItem('osci_db_v16', JSON.stringify(db));
}

// --- HILFSFUNKTIONEN ---
function findCat(item) {
    for (let cat in catalog) {
        if (catalog[cat][item] !== undefined) return cat;
    }
    return null;
}

// Grammumrechnung unter Einbeziehung des Catalogs (Sonderfall Bor-Leerzeichen beachten)
function getGrams(item, ml) {
    let density = densities[item] || 1.0;
    return (ml * density).toFixed(1);
}

function getMlFromGrams(item, g) {
    let density = densities[item] || 1.0;
    return g / density;
}

// --- THEMEDESIGN STEUERUNG ---
function applyTheme(themeName, save = true) {
    document.body.removeAttribute('class');
    if (themeName !== 'default') {
        document.body.classList.add('theme-' + themeName);
    }
    if(save) {
        db.theme = themeName;
        saveDB();
    }
    const sel = document.getElementById('themeSelect');
    if(sel) sel.value = themeName;
}

function togglePartyMode(initMode = false) {
    const cb = document.getElementById('partyToggle');
    if(!initMode && cb) {
        db.partyMode = cb.checked;
        saveDB();
    }
    if (db.partyMode) {
        document.body.classList.add('party-active');
    } else {
        document.body.classList.remove('party-active');
    }
}

function forceUpdateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
            }
            window.location.reload(true);
        });
    } else {
        window.location.reload(true);
    }
}

// --- MENÜ & TABS ---
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const backdrop = document.getElementById('menu-backdrop');
    if(nav && backdrop) {
        nav.classList.toggle('open');
        backdrop.classList.toggle('open');
    }
}

function selectTab(tabId) {
    showTab(tabId);
    const nav = document.getElementById('main-nav');
    const backdrop = document.getElementById('menu-backdrop');
    if(nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        backdrop.classList.remove('open');
    }
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-links button').forEach(el => el.classList.remove('active'));
    
    const targetTab = document.getElementById(tabId);
    const targetBtn = document.getElementById('tab-' + tabId);
    if (targetTab && targetBtn) {
        targetTab.classList.add('active');
        targetBtn.classList.add('active');
    }
    
    if(tabId === 'lager') renderLager();
    if(tabId === 'statistik') renderStats();
    if(tabId === 'bestellliste') renderBestellliste();
    if(tabId === 'trace-export') renderTraceExportInputs();
    if(tabId === 'log') renderLogs();
}

// --- LAGER-RENDERER MIT KATEGORIE- FILTER & BESTANDSFILTER ---
function toggleLowStockFilter() {
    lowStockFilterActive = !lowStockFilterActive;
    const btn = document.getElementById('btnLowStockFilter');
    if (btn) {
        if (lowStockFilterActive) {
            // Wenn aktiv: dezenter farbiger Rand und hellere Schrift
            btn.style.borderColor = "var(--primary)";
            btn.style.color = "var(--primary)";
            btn.style.background = "rgba(191, 90, 242, 0.05)";
            btn.innerHTML = "✕ Filter aktiv";
        } else {
            // Wenn inaktiv: Zurück zum Standard-Erscheinungsbild
            btn.style.borderColor = "var(--border)";
            btn.style.color = "var(--text-muted)";
            btn.style.background = "#1c1c1e";
            btn.innerHTML = "⏳ Geringer Bestand";
        }
    }
    filterLager();
}

function renderLager() {
    const listContainer = document.getElementById('lager-container');
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categoryFilterSelect');
    
    const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
    // Holt den ausgewählten Text aus dem Dropdown
    const selectedCategory = categorySelect ? categorySelect.value : '';
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    let daysElapsed = Math.max(1, (Date.now() - db.statsStarted) / (1000 * 60 * 60 * 24));
    
    for (let cat in catalog) {
        // Robuster Kategorie-Filter: Falls eine Kategorie gewählt ist, ignoriere alle anderen
        if (selectedCategory !== "" && cat !== selectedCategory) {
            continue;
        }

        let catHTML = `<h2 class="category-title">${cat}</h2>`;
        let hasItems = false;
        let itemsHTML = '';
        
        for (let item in catalog[cat]) {
            let stock = db.inventory[cat][item] || 0;
            let threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
            
            let isLow = (stock <= threshold && threshold > 0) || stock === 0;

            // Text-Suchfilter prüfen
            if (term && !item.toLowerCase().includes(term)) continue;
            
            // Geringer-Bestand-Filter prüfen
            if (lowStockFilterActive && !isLow) continue;

            hasItems = true;
            let stockG = getGrams(item, stock);
            
            // Live-Prognose ermitteln
            let totalConsumed = db.stats[item] || 0;
            let avgDaily = totalConsumed / daysElapsed;
            let reachText = "Keine Prognose";
            let reachColor = "var(--text-muted)";

            if (stock === 0) {
                reachText = "Leer";
                reachColor = "var(--danger)";
            } else if (totalConsumed > 0 && avgDaily > 0) {
                let reachDays = stock / avgDaily;
                if (reachDays < 28) {
                    reachText = `ca. ${reachDays.toFixed(0)} Tage`;
                    reachColor = "var(--danger)";
                } else if (reachDays > 365) {
                    reachText = ">1 Jahr";
                    reachColor = "var(--success)";
                } else {
                    reachText = `ca. ${(reachDays / 7).toFixed(0)} Woc.`;
                    reachColor = "var(--success)";
                }
            }

            let warningClass = isLow ? 'card-warning' : '';
            let thresholdHint = threshold > 0 ? `<span style="font-size: 0.75rem; color: var(--danger); display: block; margin-top: 4px;">⚠️ Warnschwelle: ${threshold} ml</span>` : '';

            let crossHint = "";
            if (item === "Fluor (F)" && stock === 0) {
                let nafStock = (db.inventory["C&R Produkte"] && db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"]) || 0;
                crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ NaF: ${nafStock.toFixed(1)} ml)</span>`;
            } else if (item === "Natriumfluorid (NaF)" && stock === 0) {
                let fStock = (db.inventory["Anionen"] && db.inventory["Anionen"]["Fluor (F)"]) || 0;
                crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ Fluor: ${fStock.toFixed(1)} ml)</span>`;
            }

            itemsHTML += `
                <div class="card ${warningClass}">
                    <h4>
                        <span style="display:flex; align-items:center; min-width:0;">
                            ${item} 
                            <button class="threshold-btn" onclick="setThreshold('${item}')" title="Warnschwelle setzen">🔔</button>
                        </span>
                        <span class="stock" style="display:flex; flex-direction:column; align-items:flex-end;">
                            <span>${stock.toFixed(1)} ml</span>
                            <span style="font-size: 0.75rem; opacity: 0.8; font-weight: normal;">${stockG} g</span>
                        </span>
                    </h4>
                    <div style="font-size: 0.8rem; font-weight: bold; color: ${reachColor}; margin: 4px 0;">⏳ Vorrat reicht: ${reachText}</div>
                    ${crossHint}
                    ${thresholdHint}
                    <div class="btn-group" style="margin-top: 10px;">
                        <button class="btn-in btn-animated" onclick="openModal('${cat}', '${item}', 'in')">Einlagern</button>
                        <button class="btn-out btn-animated" onclick="openModal('${cat}', '${item}', 'out')">Auslagern</button>
                    </div>
                </div>
            `;
        }
        
        if (hasItems) {
            catHTML += itemsHTML;
            listContainer.appendChild(Object.assign(document.createElement('div'), { innerHTML: catHTML }));
        }
    }
}

// --- WARNSCHWELLEN MODAL ---
function setThreshold(item) {
    let current = db.thresholds[item] || 0;
    let val = prompt(`Warnschwelle für "${item}" in ml festlegen (0 zum Deaktivieren):`, current);
    if (val === null) return;
    let parsed = parseFloat(val);
    if (isNaN(parsed) || parsed < 0) parsed = 0;
    db.thresholds[item] = parsed;
    saveDB();
    renderLager();
}

// --- EINZEL BUCHUNGS MODAL ---
function openModal(cat, item, type) {
    currentAction = { cat, item, type };
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    if(!modal || !title || !body) return;
    
    title.innerText = (type === 'in' ? 'Einlagern: ' : 'Auslagern: ') + item;
    
    let density = densities[item] || 1.0;
    let quickHTML = '';
    if (catalog[cat] && catalog[cat][item]) {
        quickHTML = '<div class="quick-amounts">';
        catalog[cat][item].forEach(amt => {
            let gAmt = (amt * density).toFixed(0);
            quickHTML += `<button onclick="setModalAmount(${amt})">${amt} ml (${gAmt}g)</button>`;
        });
        quickHTML += '</div>';
    }
    
    body.innerHTML = `
        <p style="margin-bottom:10px; font-size:0.9rem; color:var(--text-muted);">Aktueller Bestand: ${(db.inventory[cat][item]||0).toFixed(1)} ml</p>
        ${quickHTML}
        <div class="input-group">
            <label>Einheit wählen:</label>
            <select id="modal-unit" onchange="updateModalCalculations()" style="width:100%; padding:10px; background:#2c2c2e; color:#fff; border:none; border-radius:8px;">
                <option value="ml">Milliliter (ml)</option>
                <option value="g">Gramm (g)</option>
            </select>
        </div>
        <div class="input-group">
            <label>Menge eingeben:</label>
            <input type="number" step="0.01" id="modal-amount" oninput="updateModalCalculations()" placeholder="0.00" style="width:100%; padding:10px; background:#2c2c2e; color:#fff; border:none; border-radius:8px;">
        </div>
        <div id="modal-calc-preview" style="font-size:0.85rem; color:var(--secondary); margin-bottom:15px; font-weight:600;"></div>
        <button class="btn-primary" onclick="confirmModalAction()" style="width:100%; margin-bottom:10px;">Buchung abschließen</button>
    `;
    
    modal.classList.add('open');
    updateModalCalculations();
}

function closeModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.classList.remove('open');
}

function setModalAmount(ml) {
    const unitSel = document.getElementById('modal-unit');
    const amtInp = document.getElementById('modal-amount');
    if(!unitSel || !amtInp) return;
    
    unitSel.value = 'ml';
    amtInp.value = ml;
    updateModalCalculations();
}

function updateModalCalculations() {
    const unit = document.getElementById('modal-unit') ? document.getElementById('modal-unit').value : 'ml';
    const val = document.getElementById('modal-amount') ? parseFloat(document.getElementById('modal-amount').value) : 0;
    const preview = document.getElementById('modal-calc-preview');
    
    if(!preview) return;
    if(!val || isNaN(val) || val <= 0) {
        preview.innerText = '';
        return;
    }
    
    let item = currentAction.item;
    if(unit === 'ml') {
        preview.innerText = `= Entspricht ca. ${getGrams(item, val)} g (Dichte: ${densities[item]||1.0})`;
    } else {
        preview.innerText = `= Entspricht ca. ${getMlFromGrams(item, val).toFixed(1)} ml (Dichte: ${densities[item]||1.0})`;
    }
}

function confirmModalAction() {
    const unit = document.getElementById('modal-unit') ? document.getElementById('modal-unit').value : 'ml';
    const rawVal = document.getElementById('modal-amount') ? parseFloat(document.getElementById('modal-amount').value) : 0;
    
    if(!rawVal || isNaN(rawVal) || rawVal <= 0) return alert("Bitte eine gültige Menge eingeben.");
    
    let ml = unit === 'ml' ? rawVal : getMlFromGrams(currentAction.item, rawVal);
    let cat = currentAction.cat;
    let item = currentAction.item;
    let type = currentAction.type;
    
    let currentStock = db.inventory[cat][item] || 0;
    
    if(type === 'out' && ml > currentStock) {
        if(!confirm(`Achtung: Du möchtest ${ml.toFixed(1)} ml ausbuchen, aber es sind nur noch ${currentStock.toFixed(1)} ml im Lager. Trotzdem buchen?`)) return;
    }
    
    if(type === 'in') {
        db.inventory[cat][item] = currentStock + ml;
    } else {
        db.inventory[cat][item] = Math.max(0, currentStock - ml);
        db.stats[item] = (db.stats[item] || 0) + ml; 
    }
    
    db.logs.unshift({
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        timestamp: Date.now(),
        cat, item, type, ml,
        stockAfter: db.inventory[cat][item]
    });
    
    saveDB();
    closeModal();
    renderLager();
}

// --- C&R AUTO PASTE AUSLAGERUNG ---
function previewCRPaste() {
    const text = document.getElementById('cr-paste-area').value;
    const container = document.getElementById('cr-preview-container');
    const list = document.getElementById('cr-preview-list');
    
    if(!container || !list) return;
    if(!text.trim()) { container.style.display = 'none'; return; }
    
    let matches = parseCRLine(text);
    if(matches.length === 0) {
        list.innerHTML = '<span style="color:var(--danger)">Keine bekannten C&R Chemikalien in diesem Text extrahierbar.</span>';
        container.style.display = 'block';
        return;
    }
    
    list.innerHTML = matches.map(m => `
        <div style="font-size:0.85rem; margin-bottom:4px; display:flex; justify-content:space-between;">
            <span>${m.item}:</span>
            <strong style="color:var(--danger);">${m.ml.toFixed(2)} ml (${getGrams(m.item, m.ml)} g)</strong>
        </div>
    `).join('');
    container.style.display = 'block';
}

function parseCRLine(text) {
    let clean = text.replace(/\s+/g, '');
    let results = [];
    const crList = catalog["C&R Produkte"];
    
    for (let item in crList) {
        let cleanItem = item.replace(/\s+/g, '');
        let idx = clean.indexOf(cleanItem);
        if (idx !== -1) {
            let sub = clean.substring(idx + cleanItem.length);
            let numMatch = sub.match(/^([0-9\.]+)(?=ml|g|$)/);
            if (numMatch) {
                let val = parseFloat(numMatch[1]);
                if (!isNaN(val) && val > 0) {
                    let isGram = sub.substring(numMatch[1].length).startsWith('g');
                    let ml = isGram ? getMlFromGrams(item, val) : val;
                    results.push({ item, ml });
                }
            }
        }
    }
    return results;
}

function processCRPaste() {
    const area = document.getElementById('cr-paste-area');
    if(!area) return;
    let text = area.value;
    let matches = parseCRLine(text);
    
    if(matches.length === 0) return alert("Es wurden keine gültigen Daten zum Abbuchen gefunden.");
    
    if(!confirm(`${matches.length} gefundene C&R Proben automatisch auslagern?`)) return;
    
    let logGroup = [];
    matches.forEach(m => {
        let stock = db.inventory["C&R Produkte"][m.item] || 0;
        db.inventory["C&R Produkte"][m.item] = Math.max(0, stock - m.ml);
        db.stats[m.item] = (db.stats[m.item] || 0) + m.ml;
        
        logGroup.push({
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            cat: "C&R Produkte",
            item: m.item,
            type: "out",
            ml: m.ml,
            stockAfter: db.inventory["C&R Produkte"][m.item]
        });
    });
    
    db.logs = logGroup.concat(db.logs);
    saveDB();
    area.value = '';
    document.getElementById('cr-preview-container').style.display = 'none';
    alert(`${matches.length} Positionen erfolgreich vom Lager abgezogen!`);
    showTab('lager');
}

// --- TRACE MISCHUNGEN (KATIONEN / ANIONEN) ---
function renderTraceExportInputs() {
    const katDiv = document.getElementById('kationen-inputs-container');
    const aniDiv = document.getElementById('anionen-inputs-container');
    
    if(katDiv) {
        // Lädt alle Elemente der neuen zusammengefassten "Kationen"-Gruppe (inklusive Vanadium)
        katDiv.innerHTML = Object.keys(catalog["Kationen"]).map(item => `
            <div class="input-group" style="margin-bottom:10px;">
                <label style="font-size:0.85rem;">${item} (Bestand: ${(db.inventory["Kationen"][item]||0).toFixed(1)} ml)</label>
                <input type="number" step="0.01" class="trace-kat-input" data-item="${item}" placeholder="0.00 ml" style="width:100%; padding:10px; background:#2c2c2e; color:#fff; border:none; border-radius:8px;">
            </div>
        `).join('');
    }
    
    if(aniDiv) {
        aniDiv.innerHTML = Object.keys(catalog["Anionen"]).map(item => `
            <div class="input-group" style="margin-bottom:10px;">
                <label style="font-size:0.85rem;">${item} (Bestand: ${(db.inventory["Anionen"][item]||0).toFixed(1)} ml)</label>
                <input type="number" step="0.01" class="trace-ani-input" data-item="${item}" placeholder="0.00 ml" style="width:100%; padding:10px; background:#2c2c2e; color:#fff; border:none; border-radius:8px;">
            </div>
        `).join('');
    }
}

function auslagernMischung(type) {
    let selector = type === 'kationen' ? '.trace-kat-input' : '.trace-ani-input';
    let inputs = document.querySelectorAll(selector);
    let targets = [];
    
    inputs.forEach(inp => {
        let val = parseFloat(inp.value);
        if(!isNaN(val) && val > 0) {
            targets.push({ item: inp.getAttribute('data-item'), ml: val });
        }
    });
    
    if(targets.length === 0) return alert("Bitte trage für mindestens ein Element Werte ein.");
    
    if(!confirm(`Mischung mit ${targets.length} Elementen jetzt final abbuchen?`)) return;
    
    targets.forEach(t => {
        let cat = findCat(t.item);
        let stock = db.inventory[cat][t.item] || 0;
        db.inventory[cat][t.item] = Math.max(0, stock - t.ml);
        db.stats[t.item] = (db.stats[t.item] || 0) + t.ml;
        
        db.logs.unshift({
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            cat, item: t.item, type: "out", ml: t.ml,
            stockAfter: db.inventory[cat][t.item]
        });
    });
    
    saveDB();
    alert("Mischung erfolgreich abgezogen!");
    showTab('lager');
}

// --- VERBRAUCHSSTATISTIK & PROGNOSE ---
function renderStats() {
    const dateEl = document.getElementById('stats-start-date');
    if (dateEl) dateEl.innerText = "Statistik aufgezeichnet seit: " + new Date(db.statsStarted).toLocaleDateString();
    const container = document.getElementById('stats-container');
    if (!container) return;
    container.innerHTML = '';
    
    let daysElapsed = Math.max(1, (Date.now() - db.statsStarted) / (1000 * 60 * 60 * 24));
    let weeksElapsed = daysElapsed / 7;
    let monthsElapsed = daysElapsed / 30.42;
    let yearsElapsed = daysElapsed / 365;

    let maxConsumed = 0;
    for (let i in db.stats) {
        if (db.stats[i] > maxConsumed) maxConsumed = db.stats[i];
    }

    let content = '';
    for (let item in db.stats) {
        let totalConsumed = db.stats[item] || 0;
        if (totalConsumed > 0) {
            let perWeek = totalConsumed / weeksElapsed;
            let perMonth = totalConsumed / monthsElapsed;
            let perYear = totalConsumed / yearsElapsed;
            
            let currentStock = db.inventory[findCat(item)] ? (db.inventory[findCat(item)][item] || 0) : 0;
            let prognosisText = "";
            let warningStyle = "";
            let avgDaily = totalConsumed / daysElapsed;
            
            if (currentStock === 0) {
                prognosisText = "⚠️ Leer (Sofort bestellen)";
                warningStyle = "color: var(--danger); font-weight: bold;";
            } else if (avgDaily > 0) {
                let reachDays = currentStock / avgDaily;
                if (reachDays < 28) {
                    prognosisText = `⚠️ Reicht ca. ${reachDays.toFixed(0)} Tage (< 4 Wochen!)`;
                    warningStyle = "color: var(--danger); font-weight: bold;";
                } else if (reachDays > 365) {
                    prognosisText = `Reichweite: >1 Jahr`;
                    warningStyle = "color: var(--success);";
                } else {
                    prognosisText = `Reichweite: ca. ${(reachDays / 7).toFixed(1)} Wochen`;
                    warningStyle = "color: var(--success);";
                }
            } else {
                prognosisText = "Keine Prognose möglich";
                warningStyle = "color: var(--text-muted);";
            }

            let widthPct = maxConsumed > 0 ? (totalConsumed / maxConsumed) * 100 : 0;

            content += `
                <div class="stat-block">
                    <h4 style="margin:0 0 5px 0; color: var(--primary); display:flex; justify-content:space-between;">
                        ${item}
                        <span style="${warningStyle} font-size: 0.85rem; font-weight: bold;">${prognosisText}</span>
                    </h4>
                    <div style="font-size:0.85rem; margin-bottom:5px; color: var(--text);">
                        Gesamtverbrauch: <strong>${totalConsumed.toFixed(1)} ml (${getGrams(item, totalConsumed)} g)</strong>
                    </div>
                    
                    <div class="visual-bar-bg">
                        <div class="visual-bar-fill" style="width: ${widthPct}%;"></div>
                    </div>

                    <div class="stat-grid" style="margin-top: 10px;">
                        <div>
                            <strong>${perWeek.toFixed(1)} ml (${getGrams(item, perWeek)} g)</strong><br>
                            <span style="font-size:0.7rem; opacity:0.7;">pro Woche</span>
                        </div>
                        <div>
                            <strong>${perMonth.toFixed(1)} ml (${getGrams(item, perMonth)} g)</strong><br>
                            <span style="font-size:0.7rem; opacity:0.7;">pro Monat</span>
                        </div>
                        <div>
                            <strong>${perYear.toFixed(1)} ml (${getGrams(item, perYear)} g)</strong><br>
                            <span style="font-size:0.7rem; opacity:0.7;">pro Jahr</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    container.innerHTML = content || '<p class="hint">Noch keine Verbräuche aufgezeichnet.</p>';
}

// --- AUTOMATISCHE BESTELLLISTE (4 WOCHEN PROGNOSE) ---
function renderBestellliste() {
    const container = document.getElementById('orderListContainer');
    if (!container) return;

    let daysElapsed = Math.max(1, (Date.now() - db.statsStarted) / (1000 * 60 * 60 * 24));
    let itemsToOrder = [];

    for (let cat in db.inventory) {
        for (let item in db.inventory[cat]) {
            let stock = db.inventory[cat][item] || 0;
            let totalConsumed = db.stats[item] || 0;
            let avgDaily = totalConsumed / daysElapsed;

            if (stock === 0) {
                itemsToOrder.push({ item, cat, stock, reason: "Bestand ist komplett leer!" });
            } 
            else if (totalConsumed > 0 && avgDaily > 0) {
                let reachDays = stock / avgDaily;
                if (reachDays < 28) {
                    itemsToOrder.push({ 
                        item, 
                        cat, 
                        stock, 
                        reason: `Kritischer Vorrat: Reicht voraussichtlich nur noch ${reachDays.toFixed(0)} Tage (< 4 Wochen)` 
                    });
                }
            }
        }
    }

    if (itemsToOrder.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 25px; color: var(--success); font-weight:600; background: rgba(48, 209, 88, 0.05); border-radius:12px; border: 1px solid rgba(48, 209, 88, 0.2);">
                ✓ Alles sicher! Keine Waren laufen in den nächsten 4 Wochen leer.
            </div>`;
        return;
    }

    container.innerHTML = itemsToOrder.map(entry => `
        <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255, 69, 58, 0.05); padding:14px; border-radius:12px; margin-bottom:10px; border: 1px solid rgba(255, 69, 58, 0.25);">
            <div>
                <strong style="color: var(--text); font-size:1rem;">${entry.item}</strong><br>
                <small style="color: var(--text-muted);">${entry.cat} | Bestand: ${entry.stock.toFixed(1)} ml (${getGrams(entry.item, entry.stock)} g)</small>
            </div>
            <div style="text-align: right;">
                <span style="color: var(--danger); font-size:0.85rem; font-weight:700;">⚠️ ${entry.reason}</span>
            </div>
        </div>
    `).join('');
}

// --- LOGS / PROTOKOLL ---
function renderLogs() {
    const container = document.getElementById('log-container');
    if(!container) return;
    
    if(db.logs.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine Aktionen im Protokoll vorhanden.</p>';
        return;
    }
    
    container.innerHTML = db.logs.map(log => {
        let dateStr = new Date(log.timestamp).toLocaleString();
        
        return `
            <div class="log-item" style="border-left: 4px solid ${log.type==='in'?'var(--success)':'var(--danger)'}; padding-left:10px; margin-bottom:12px; background:rgba(255,255,255,0.02); padding:8px 10px; border-radius:0 8px 8px 0; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <span style="font-size:0.75rem; color:var(--text-muted);">${dateStr}</span><br>
                    <strong style="color:${log.type==='in'?'var(--success)':'var(--danger)'};">${log.type==='in'?'＋ EIN':'－ AUS'}</strong>: 
                    <strong>${log.item}</strong> (${log.ml.toFixed(1)} ml / ${getGrams(log.item, log.ml)} g)<br>
                    <small style="color:var(--text-muted);">Danach im System: ${log.stockAfter.toFixed(1)} ml</small>
                </div>
                <button class="btn-out" onclick="revertLog('${log.id}')" style="padding:4px 8px; font-size:0.75rem; max-width:80px; background:rgba(255,255,255,0.05); color:var(--text);">Undo</button>
            </div>
        `;
    }).join('');
}

function revertLog(id) {
    let idx = db.logs.findIndex(l => l.id === id);
    if(idx === -1) return alert("Log-Eintrag nicht gefunden.");
    
    let log = db.logs[idx];
    if(!confirm(`Möchtest du diese Aktion (${log.type==='in'?'Einlagerung':'Auslagerung'} von ${log.item}) wirklich rückgängig machen?`)) return;
    
    let currentStock = db.inventory[log.cat][log.item] || 0;
    
    if (log.type === 'in') {
        db.inventory[log.cat][log.item] = Math.max(0, currentStock - log.ml);
    } else {
        db.inventory[log.cat][log.item] = currentStock + log.ml;
        db.stats[log.item] = Math.max(0, (db.stats[log.item] || 0) - log.ml);
    }
    
    db.logs.splice(idx, 1);
    saveDB();
    alert("Aktion erfolgreich rückgängig gemacht!");
    renderLogs();
}

// --- RESET SYSTEMDATEN ---
function resetStatsSingle() {
    if(confirm("Möchtest du die gesamte Verbrauchs-Statistik wirklich nullen? Der Aufzeichnungs-Startpunkt wird auf JETZT zurückgesetzt.")) {
        for(let i in db.stats) db.stats[i] = 0;
        db.statsStarted = Date.now();
        saveDB();
        renderStats();
        alert("Statistiken zurückgesetzt.");
    }
}

function resetLogsSingle() {
    if(confirm("Möchtest du das gesamte Aktionsprotokoll löschen?")) {
        db.logs = [];
        saveDB();
        renderLogs();
        alert("Protokoll gelöscht.");
    }
}

function resetLagerSingle() {
    if(confirm("ACHTUNG: Möchtest du ALLE Lagerbestände unwiderruflich auf 0.0 ml setzen?")) {
        for(let c in db.inventory) {
            for(let i in db.inventory[c]) {
                db.inventory[c][i] = 0;
            }
        }
        saveDB();
        renderLager();
        alert("Lager wurde geleert.");
    }
}

// --- BACKUP EXPORT / IMPORT ---
function exportData() {
    let blob = new Blob([JSON.stringify(db, null, 2)], { type: "text/plain" });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `OSCI_Backup_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
}

function importData() {
    let file = document.getElementById('importFile').files[0];
    if (!file) return alert("Bitte wähle eine Datei (.txt) aus.");
    let reader = new FileReader();
    reader.onload = e => {
        try {
            let parsed = JSON.parse(e.target.result);
            if(parsed.inventory) {
                db = parsed;
                if(!db.logs) db.logs = [];
                if(!db.thresholds) db.thresholds = {};
                if(!db.stats) db.stats = {};
                saveDB();
                applyTheme(db.theme || 'default', false);
                alert("Backup erfolgreich eingelesen!");
                showTab('lager');
            } else {
                alert("Ungültiges Backup-Format.");
            }
        } catch(err) {
            alert("Fehler beim Parsen des Backups.");
        }
    };
    reader.readAsText(file);
}

// --- MASSENEINGANG (WARENKORB) ---
function buildBulkProductSelect() {
    const sel = document.getElementById('bulkProductSelect');
    if(!sel) return;
    
    let html = '<option value="">-- Bitte wählen --</option>';
    for (let cat in catalog) {
        html += `<optgroup label="${cat}">`;
        for (let item in catalog[cat]) {
            html += `<option value="${item}" data-cat="${cat}">${item}</option>`;
        }
        html += `</optgroup>`;
    }
    sel.innerHTML = html;
    
    sel.onchange = () => {
        const opt = sel.options[sel.selectedIndex];
        if(!opt || !opt.value) {
            document.getElementById('bulkQuickButtonsContainer').innerHTML = '';
            return;
        }
        let item = opt.value;
        let cat = opt.getAttribute('data-cat');
        buildBulkQuickButtons(cat, item);
    };
}

function buildBulkQuickButtons(cat, item) {
    const container = document.getElementById('bulkQuickButtonsContainer');
    if (!container) return;
    
    if (!catalog[cat] || !catalog[cat][item]) {
        container.innerHTML = '';
        return;
    }
    
    let density = densities[item] || 1.0;
    let html = '<div class="quick-amounts" style="margin-bottom:15px;">';
    catalog[cat][item].forEach(amt => {
        let gAmt = (amt * density).toFixed(0);
        html += `<button type="button" onclick="setBulkAmountField(${amt})">${amt} ml (${gAmt}g)</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

function setBulkAmountField(ml) {
    const unitSel = document.getElementById('bulkUnitSelect');
    const amtInp = document.getElementById('bulkAmount');
    if(unitSel && amtInp) {
        unitSel.value = 'ml';
        amtInp.value = ml;
    }
}

function addToBulkCart() {
    const sel = document.getElementById('bulkProductSelect');
    const unitSel = document.getElementById('bulkUnitSelect');
    const amtInp = document.getElementById('bulkAmount');
    
    if(!sel || !unitSel || !amtInp) return;
    
    const opt = sel.options[sel.selectedIndex];
    if (!opt || !opt.value) return alert("Bitte wähle zuerst ein Produkt aus.");
    
    let item = opt.value;
    let cat = opt.getAttribute('data-cat');
    let unit = unitSel.value;
    let val = parseFloat(amtInp.value);
    
    if (isNaN(val) || val <= 0) return alert("Bitte trage eine gültige Menge ein.");
    
    let ml = unit === 'ml' ? val : getMlFromGrams(item, val);
    
    bulkCart.push({ cat, item, ml });
    
    amtInp.value = '';
    renderBulkCartList();
}

function removeFromBulkCart(index) {
    bulkCart.splice(index, 1);
    renderBulkCartList();
}

function renderBulkCartList() {
    const listDiv = document.getElementById('bulkCartList');
    const submitBtn = document.getElementById('btnSubmitBulk');
    if(!listDiv || !submitBtn) return;
    
    if(bulkCart.length === 0) {
        listDiv.innerHTML = 'Der Warenkorb ist leer.';
        submitBtn.style.display = 'none';
        return;
    }
    
    submitBtn.style.display = 'block';
    listDiv.innerHTML = bulkCart.map((entry, index) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255,255,255,0.03); padding:10px; border-radius:8px; margin-bottom:8px; border: 1px solid var(--border);">
            <div>
                <strong style="color: var(--text);">${entry.item}</strong><br>
                <small style="color: var(--text-muted);">${entry.cat} | ca. ${getGrams(entry.item, entry.ml)} g</small>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
                <span style="color: var(--success); font-weight:600;">+ ${entry.ml.toFixed(1)} ml</span>
                <button onclick="removeFromBulkCart(${index})" style="background:none; color:var(--danger); padding:4px 8px; font-size:1.1rem; border:none; cursor:pointer;">✕</button>
            </div>
        </div>
    `).join('');
}

function submitBulkCart() {
    if (bulkCart.length === 0) return;
    if (!confirm(`${bulkCart.length} Positionen jetzt final in das Lager einbuchen?`)) return;
    
    bulkCart.forEach(entry => {
        db.inventory[entry.cat][entry.item] = (db.inventory[entry.cat][entry.item] || 0) + entry.ml;
        
        db.logs.unshift({
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            cat: entry.cat,
            item: entry.item,
            type: "in",
            ml: entry.ml,
            stockAfter: db.inventory[entry.cat][entry.item]
        });
    });
    
    bulkCart = [];
    saveDB();
    renderBulkCartList();
    alert("Gesamter Wareneingang erfolgreich gebucht!");
    showTab('lager');
}

// --- INITIALISIERUNG BEIM LADEN ---
window.onload = init;