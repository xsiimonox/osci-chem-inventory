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
    "Anionen": { "Fluor (F)": [100], "Iod (I)": [30, 100], "Selen (Se)": [100], "Vanadium (V)": [30, 100] },
    "Kationen": { "Barium (Ba)": [30, 100], "Chrom (Cr)": [30, 100], "Cobalt (Co)": [1000], "Eisen (Fe)": [100], "Kupfer (Cu)": [30, 100], "Lithium (Li)": [30, 100], "Zink (Zn)": [100], "Mangan (Mn)": [30, 100], "Nickel (Ni)": [1000], "Molybdän (Mo)": [30, 100] }
};

const crOrder = [
    { name: "Natriumchlorid (NaCl)", cat: "C&R Produkte" }, { name: "Magnesiumchlorid (MgCl2)", cat: "C&R Produkte" },
    { name: "Natriumsulfat (Na2SO4)", cat: "C&R Produkte" }, { name: "Magnesiumsulfat (MgSO4)", cat: "C&R Produkte" },
    { name: "Kaliumchlorid (KCl)", cat: "C&R Produkte" }, { name: "Kaliumsulfat (K2SO4)", cat: "C&R Produkte" },
    { name: "Kaliumbromid (KBr)", cat: "C&R Produkte" }, { name: "Strontiumchlorid (SrCl2)", cat: "C&R Produkte" },
    { name: "Calciumchlorid (CaCl2)", cat: "C&R Produkte" }, { name: "Natriumfluorid (NaF)", cat: "C&R Produkte" },
    { name: "Bor (B)", cat: "C&R Produkte" }
];

const mixDefinitions = {
    kationen: ["Cobalt (Co)", "Nickel (Ni)", "Eisen (Fe)", "Mangan (Mn)", "Kupfer (Cu)", "Chrom (Cr)", "Zink (Zn)"],
    anionen: ["Fluor (F)", "Iod (I)", "Vanadium (V)", "Selen (Se)"]
};

const densityFactors = {
    "Strontiumchlorid (SrCl2)": 1.154, "Magnesiumsulfat (MgSO4)": 1.224, "Magnesiumchlorid (MgCl2)": 1.289,
    "Kaliumbromid (KBr)": 1.104, "Calciumchlorid (CaCl2)": 1.399, "Kaliumchlorid (KCl)": 1.112,
    "Natriumfluorid (NaF)": 1.000, "Bor (B)": 0.999, "Natriumchlorid (NaCl)": 1.192,
    "Kaliumsulfat (K2SO4)": 1.067, "Natriumsulfat (Na2SO4)": 1.110, "Barium (Ba)": 1.005,
    "Chrom (Cr)": 1.047, "Cobalt (Co)": 1.000, "Eisen (Fe)": 1.039, "Kupfer (Cu)": 1.024,
    "Mangan (Mn)": 1.234, "Molybdän (Mo)": 1.002, "Nickel (Ni)": 0.999, "Selen (Se)": 1.010,
    "Vanadium (V)": 1.026, "Zink (Zn)": 1.024, "Iod (I)": 1.097, "Fluor (F)": 1.009, "Lithium (Li)": 1.023
};

const containers = { "30ml": 9.3, "100ml": 18.5, "1000ml": 57, "5000ml": 260, "10000ml": 440 };

const DB_KEY = 'osci_db_v5';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now(), theme: 'default' };
let currentAction = {};

// --- INITIALISIERUNG ---
function initDB() {
    try {
        let saved = localStorage.getItem(DB_KEY);
        if (!saved) saved = localStorage.getItem('osci_db_v4');
        if (!saved) saved = localStorage.getItem('osci_db_v3');
        if (saved) {
            let parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') db = parsed;
        }
    } catch (e) { console.error("Fehler beim Laden:", e); }

    if (!db.inventory) db.inventory = {};
    if (!db.stats) db.stats = {};
    if (!db.logs) db.logs = [];
    if (!db.statsStarted) db.statsStarted = Date.now();
    if (!db.theme) db.theme = 'default';
    if (!db.thresholds) db.thresholds = {};

    for (let cat in catalog) {
        if (!db.inventory[cat]) db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            if (db.inventory[cat][item] === undefined) db.inventory[cat][item] = 0;
            if (db.stats[item] === undefined) db.stats[item] = 0;
        }
    }
    
    // Geladenes Design direkt beim Start anwenden
    applyTheme(db.theme, false);
    saveDB();
}

function saveDB() { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e) {} }

// --- UI / MENÜ STEUERUNG ---
function toggleMenu() {
    document.getElementById('main-nav').classList.toggle('open');
    document.getElementById('menu-backdrop').classList.toggle('open');
}

function selectTab(tabId) {
    showTab(tabId);
    document.getElementById('main-nav').classList.remove('open');
    document.getElementById('menu-backdrop').classList.remove('open');
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
    if(tabId === 'trace-export') renderTraceExportInputs();
    if(tabId === 'log') renderLogs();
}

// --- DESIGN / THEME STEUERUNG ---
function applyTheme(themeName, shouldSave = true) {
    // Alle alten Design-Klassen vom Body entfernen
    document.body.classList.remove('theme-girl', 'theme-mint');
    
    if (themeName !== 'default') {
        document.body.classList.add('theme-' + themeName);
    }
    
    db.theme = themeName;
    if (shouldSave) saveDB();
    
    // Dropdown-Auswahl im Menü synchronisieren, falls geladen
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = themeName;
}

// --- AUTOMATISCHES CACHE LEEREN & FORCE UPDATE ---
async function forceUpdateApp() {
    if (confirm("Möchtest du ein App-Update erzwingen? Dabei wird der interne Zwischenspeicher (Cache) geleert und die allerneueste Version geladen. Deine Bestandsdaten bleiben erhalten!")) {
        // 1. Service Worker deregistrieren
        if ('serviceWorker' in navigator) {
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                }
            } catch (err) { console.error("SW-Deregister Fehler:", err); }
        }
        
        // 2. Browser Caches komplett löschen
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                for (let name of cacheNames) {
                    await caches.delete(name);
                }
            } catch (err) { console.error("Cache-Delete Fehler:", err); }
        }
        
        // 3. Einen harten Reload erzwingen
        window.location.reload();
    }
}

// --- NEUE HILFSFUNKTIONEN ---
function getGrams(itemName, mlAmount) {
    let factor = densityFactors[itemName] || 1.0;
    return (mlAmount * factor).toFixed(1);
}

function setThreshold(item) {
    let current = db.thresholds[item] || 0;
    let val = prompt(`Warnschwelle für ${item} (in ml) festlegen:\nFällt der Bestand auf oder unter diesen Wert, wird die Karte rot markiert.\n(Aktuell: ${current} ml)`, current);
    
    if (val !== null) {
        let parsed = parseFloat(val);
        if (!isNaN(parsed) && parsed >= 0) {
            db.thresholds[item] = parsed;
            saveDB();
            filterLager(); // Aktualisiert die UI sofort
        } else {
            alert("Bitte eine gültige Zahl eingeben.");
        }
    }
}

// --- RENDER FUNKTIONEN ---
function renderLager() {
    const container = document.getElementById('lager');
    if (!container) return;

    // Suchfeld einbauen, falls nicht vorhanden
    if (!document.getElementById('searchInput')) {
        container.innerHTML = `
            <input type="text" id="searchInput" class="search-input" placeholder="🔍 Chemikalie suchen..." onkeyup="filterLager()">
            <div id="lager-container"></div>
        `;
    }
    filterLager();
}

function filterLager() {
    const listContainer = document.getElementById('lager-container');
    const searchInput = document.getElementById('searchInput');
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    for (let cat in catalog) {
        let catHTML = `<h2 class="category-title">${cat}</h2>`;
        let hasItems = false;
        
        for (let item in catalog[cat]) {
            if (item.toLowerCase().includes(term)) {
                hasItems = true;
                let stock = db.inventory[cat][item] || 0;
                let stockG = getGrams(item, stock); // Umrechnung in Gramm
                let threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
                
                // Warn-Logik
                let warningClass = (stock <= threshold && threshold > 0) ? 'card-warning' : '';
                let thresholdHint = threshold > 0 ? `<span style="font-size: 0.75rem; color: var(--danger); display: block; margin-top: 4px;">⚠️ Warnschwelle: ${threshold} ml</span>` : '';

                // Kreuz-Check für Fluor/NaF
                let crossHint = "";
                if (item === "Fluor (F)" && stock === 0) {
                    let nafStock = (db.inventory["C&R Produkte"] && db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"]) || 0;
                    crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ NaF prüfen: ${nafStock.toFixed(1)} ml)</span>`;
                } else if (item === "Natriumfluorid (NaF)" && stock === 0) {
                    let fStock = (db.inventory["Anionen"] && db.inventory["Anionen"]["Fluor (F)"]) || 0;
                    crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ Fluor prüfen: ${fStock.toFixed(1)} ml)</span>`;
                }

                catHTML += `
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
                        ${crossHint}
                        ${thresholdHint}
                        <div class="btn-group" style="margin-top: 10px;">
                            <button class="btn-in btn-animated" onclick="openModal('${cat}', '${item}', 'in')">Einlagern</button>
                            <button class="btn-out btn-animated" onclick="openModal('${cat}', '${item}', 'out')">Auslagern</button>
                        </div>
                    </div>
                `;
            }
        }
        if (hasItems) {
            listContainer.innerHTML += catHTML;
        }
    }
}

function renderTraceExportInputs() {
    const katContainer = document.getElementById('kationen-inputs-container');
    const anContainer = document.getElementById('anionen-inputs-container');
    
    if (katContainer) {
        katContainer.innerHTML = mixDefinitions.kationen.map(item => {
            let id = 'mix-kat-' + item.replace(/[^a-zA-Z]/g, '');
            return `
            <div class="trace-grid">
                <label>${item}</label>
                <input type="number" step="0.1" min="0" placeholder="0.0" id="${id}" oninput="calcTraceGrams('${id}', '${item}')">
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span class="unit-label">ml</span>
                    <span id="${id}-g" style="font-size: 0.75rem; color: var(--secondary); font-weight: 600;">0.00 g</span>
                </div>
            </div>
        `}).join('');
    }
    if (anContainer) {
        anContainer.innerHTML = mixDefinitions.anionen.map(item => {
            let id = 'mix-an-' + item.replace(/[^a-zA-Z]/g, '');
            return `
            <div class="trace-grid">
                <label>${item}</label>
                <input type="number" step="0.1" min="0" placeholder="0.0" id="${id}" oninput="calcTraceGrams('${id}', '${item}')">
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span class="unit-label">ml</span>
                    <span id="${id}-g" style="font-size: 0.75rem; color: var(--secondary); font-weight: 600;">0.00 g</span>
                </div>
            </div>
        `}).join('');
    }
}

function calcTraceGrams(inputId, itemName) {
    let inputEl = document.getElementById(inputId);
    let gramEl = document.getElementById(inputId + '-g');
    if (inputEl && gramEl) {
        let ml = parseFloat(inputEl.value) || 0;
        let factor = densityFactors[itemName] || 1.0;
        let g = ml * factor;
        gramEl.innerText = g.toFixed(2) + ' g';
    }
}

function countOutsForElement(itemName) {
    if (!db.logs) return 0;
    return db.logs.filter(log => log.item === itemName && log.action === 'out').length;
}

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

    // Ermittle den absoluten Spitzenreiter für die visuelle Balken-Skalierung
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
            let outCount = countOutsForElement(item);
            
            if (outCount < 2) {
                prognosisText = "Prognose ab 2. Entnahme";
            } else if (perWeek > 0) {
                let weeksLeft = currentStock / perWeek;
                prognosisText = weeksLeft > 52 ? `Reichweite: >1 Jahr` : `Reichweite: ca. ${weeksLeft.toFixed(1)} Wochen`;
            } else {
                prognosisText = "Keine Prognose möglich";
            }

            // Breite des Balkens berechnen (maxConsumed = 100%)
            let widthPct = maxConsumed > 0 ? (totalConsumed / maxConsumed) * 100 : 0;

            content += `
                <div class="stat-block">
                    <h4 style="margin:0 0 5px 0; color: var(--primary); display:flex; justify-content:space-between;">
                        ${item}
                        <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">${getGrams(item, totalConsumed)} g gesamt</span>
                    </h4>
                    <div style="font-size:0.85rem; margin-bottom:5px;">
                        Gesamtverbrauch: <strong>${totalConsumed.toFixed(1)} ml</strong>
                    </div>
                    
                    <div class="visual-bar-bg">
                        <div class="visual-bar-fill" style="width: ${widthPct}%;"></div>
                    </div>

                    <div class="stat-grid" style="margin-top: 10px;">
                        <div>
                            <strong>${perWeek.toFixed(1)} ml</strong><br>
                            <span style="font-size:0.7rem; opacity:0.7;">${getGrams(item, perWeek)} g</span>/Wo
                        </div>
                        <div>
                            <strong>${perMonth.toFixed(1)} ml</strong><br>
                            <span style="font-size:0.7rem; opacity:0.7;">${getGrams(item, perMonth)} g</span>/Mo
                        </div>
                        <div>
                            <strong>${perYear.toFixed(1)} ml</strong><br>
                            <span style="font-size:0.7rem; opacity:0.7;">${getGrams(item, perYear)} g</span>/Jahr
                        </div>
                    </div>
                    <div class="prognose-badge">${prognosisText}</div>
                </div>
            `;
        }
    }
    container.innerHTML = content || '<p class="hint">Noch keine Verbräuche aufgezeichnet.</p>';
}

function findCat(itemName) {
    for (let cat in catalog) { if (catalog[cat][itemName] !== undefined) return cat; }
    return "C&R Produkte";
}

function renderLogs() {
    const container = document.getElementById('log-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (!db.logs || db.logs.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine Aktionen protokolliert.</p>';
        return;
    }
    
    // Kopie erstellen und umdrehen, damit das Neueste oben steht
    let sortedLogs = [...db.logs].reverse();

    let logHTML = sortedLogs.map((log, index) => {
        let originalIndex = db.logs.length - 1 - index; // Wichtig für den "Rückgängig"-Button
        let isOut = log.action === 'out';
        let actionColor = isOut ? 'var(--danger)' : 'var(--success)';
        let sign = isOut ? '-' : '+';
        let actionText = isOut ? 'Ausgelagert' : 'Einlagert';
        
        // Umrechnung in Gramm für das Protokoll
        let gAmount = getGrams(log.item, log.amount);
        
        return `
            <div class="log-item ${log.action}" style="border-left: 4px solid ${actionColor};">
                <div>
                    <div class="log-details"><strong>${log.item}</strong></div>
                    <div class="log-date">${new Date(log.time).toLocaleString()} | ${actionText}</div>
                </div>
                <div style="text-align: right;">
                    <div style="color: ${actionColor}; font-weight: bold;">${sign}${parseFloat(log.amount).toFixed(1)} ml</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${sign}${gAmount} g</div>
                    <button onclick="undoLog(${originalIndex})" style="background:none; border:none; color: var(--text-muted); text-decoration: underline; font-size: 0.75rem; padding:0; margin-top:4px; cursor:pointer;">Rückgängig</button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = logHTML;
}

// --- MODAL & EINGABELOGIK ---
function openModal(cat, item, action) {
    currentAction = { cat, item, action };
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    document.getElementById('modal-title').innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    
    modalBody.innerHTML = `
        <div class="input-group">
            <label>Einheit auswählen:</label>
            <select id="unitSelect" onchange="toggleContainerOptions()" style="width:100%; padding:12px; background:#2c2c2e; color:#fff; border:none; border-radius:10px;">
                <option value="ml">Milliliter (ml)</option>
                <option value="g">Gramm (g)</option>
            </select>
        </div>
        
        <div id="containerSection" style="display:none; margin-top:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px;">
            <label style="display:flex; align-items:center; gap:10px; color:#fff;">
                <input type="checkbox" id="useContainer" onchange="toggleContainerOptions()" style="width:20px; height:20px; margin:0;"> 
                Behälter-Gewicht (Tara) abziehen
            </label>
            <select id="containerSelect" style="display:none; width:100%; padding:12px; background:#1c1c1e; color:#fff; border:1px solid #3a3a3c; border-radius:8px; margin-top:10px;">
                ${Object.keys(containers).map(c => `<option value="${c}">${c} (wiegt ${containers[c]}g)</option>`).join('')}
            </select>
        </div>

        <div class="input-group" style="margin-top:15px;">
            <label>Menge eingeben:</label>
            <input type="number" step="0.01" id="amount" placeholder="Wert eintragen" style="width:100%; padding:12px;">
        </div>
        <button class="btn-primary btn-animated" style="margin-top:10px;" onclick="executeAction()">Buchung ausführen</button>
    `;
    modal.style.display = 'flex';
}

function toggleContainerOptions() {
    const isGram = document.getElementById('unitSelect').value === 'g';
    const isChecked = document.getElementById('useContainer').checked;
    document.getElementById('containerSection').style.display = isGram ? 'block' : 'none';
    document.getElementById('containerSelect').style.display = (isGram && isChecked) ? 'block' : 'none';
}

// Hier wird sichergestellt, dass beim manuellen Öffnen der Einstellungen das Dropdown synchron ist
document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect && db.theme) themeSelect.value = db.theme;
});

function closeModal() { document.getElementById('modal').style.display = 'none'; }

function executeAction() {
    let rawAmount = parseFloat(document.getElementById('amount').value);
    let unit = document.getElementById('unitSelect').value;
    let { cat, item, action } = currentAction;
    
    if (isNaN(rawAmount) || rawAmount <= 0) return alert("Bitte eine gültige Menge eingeben.");
    
    let finalMl = rawAmount;
    
    if (unit === 'g') {
        if (document.getElementById('useContainer').checked) {
            let containerWeight = containers[document.getElementById('containerSelect').value];
            finalMl -= containerWeight;
        }
        let factor = densityFactors[item] || 1.0;
        finalMl = finalMl / factor;
    }

    if (finalMl <= 0) return alert("Fehler: Nach Abzug des Behälters bleibt keine Restmenge übrig.");

    if (action === 'in') {
        db.inventory[cat][item] += finalMl;
        addLog(cat, item, 'in', finalMl);
        saveDB();
        closeModal();
        renderLager();
    } 
    else {
        let stock = db.inventory[cat][item] || 0;
        if (stock - finalMl < 0) {
            if (item === "Fluor (F)") {
                let alt = db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"] || 0;
                alert(`Mangel an Fluor (F)!\nHinweis: Natriumfluorid (NaF) aus der C&R Serie ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            } else if (item === "Natriumfluorid (NaF)") {
                let alt = db.inventory["Anionen"]["Fluor (F)"] || 0;
                alert(`Mangel an Natriumfluorid (NaF)!\nHinweis: Fluor (F) aus den Anionen ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            }
            
            showConflictModal(cat, item, finalMl, stock, () => {
                db.inventory[cat][item] -= finalMl;
                db.stats[item] += finalMl;
                addLog(cat, item, 'out', finalMl);
                saveDB();
                closeModal();
                renderLager();
            });
            return;
        }
        db.inventory[cat][item] -= finalMl;
        db.stats[item] += finalMl;
        addLog(cat, item, 'out', finalMl);
        saveDB();
        closeModal();
        renderLager();
    }
}

function showConflictModal(cat, item, required, current, proceedCallback) {
    const modalBody = document.getElementById('modal-body');
    document.getElementById('modal-title').innerText = "⚠️ Bestands-Warnung";
    let missing = required - current;
    
    modalBody.innerHTML = `
        <div style="background: rgba(255,69,58,0.1); border: 1px solid var(--danger); padding:15px; border-radius:8px; margin-bottom:15px; font-size:0.95rem;">
            Zu wenig Bestand für <strong>${item}</strong>.<br><br>
            Benötigt werden: <span style="color:var(--danger); font-weight:bold;">${required.toFixed(2)} ml</span><br>
            Aktueller Bestand: <span style="color:var(--secondary); font-weight:bold;">${current.toFixed(2)} ml</span><br>
            Es fehlen: <span style="color:var(--danger); font-weight:bold;">${missing.toFixed(2)} ml</span>
        </div>
        <button class="btn-danger btn-animated" id="proceed-conflict-btn">Trotzdem Fortfahren</button>
    `;
    document.getElementById('proceed-conflict-btn').onclick = proceedCallback;
    document.getElementById('modal').style.display = 'flex';
}

function addLog(cat, item, action, amount) {
    if(!db.logs) db.logs = [];
    db.logs.push({ cat, item, action, amount, timestamp: Date.now() });
    if (db.logs.length > 200) db.logs.shift();
}

function undoLog(index) {
    let log = db.logs[index];
    if (!log) return;
    if (log.action === 'in') {
        if ((db.inventory[log.cat][log.item] || 0) - log.amount < 0) {
            if(!confirm("Nicht genug Bestand für Stornierung. Bestand wird negativ. Trotzdem stornieren?")) return;
        }
        db.inventory[log.cat][log.item] -= log.amount;
    } else {
        db.inventory[log.cat][log.item] += log.amount;
        db.stats[log.item] = Math.max(0, (db.stats[log.item] || 0) - log.amount);
    }
    db.logs.splice(index, 1);
    saveDB();
    alert("Aktion erfolgreich rückgängig gemacht!");
    renderLogs();
}

// --- QUEUE & LISTEN VERARBEITUNG ---
function previewCRPaste() {
    const pasteArea = document.getElementById('cr-paste-area');
    const previewContainer = document.getElementById('cr-preview-container');
    const previewList = document.getElementById('cr-preview-list');
    
    if (!pasteArea || !previewContainer || !previewList) return;

    const text = pasteArea.value;
    const matches = text.match(/([\d.]+)\s*ml/g);

    if (!text.trim()) {
        previewContainer.style.display = 'none';
        return;
    }

    if (!matches || matches.length < crOrder.length) {
        previewContainer.style.display = 'block';
        previewList.innerHTML = `<span style="color: var(--danger); font-size: 0.85rem;">Format unvollständig oder ungültig. Bitte ganze Zeile einfügen.</span>`;
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 6px;">';
    for (let i = 0; i < crOrder.length; i++) {
        let amountMl = parseFloat(matches[i].replace(/[^\d.]/g, ''));
        let itemName = crOrder[i].name;
        let factor = densityFactors[itemName] || 1.0;
        let amountG = (amountMl * factor).toFixed(2);
        
        if (amountMl > 0) {
            html += `
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
                    <span style="color: #fff;">${itemName}</span>
                    <span style="text-align: right;">
                        <strong style="color: #fff;">${amountMl.toFixed(2)} ml</strong> 
                        <span style="color: var(--secondary); margin-left: 8px;">(${amountG} g)</span>
                    </span>
                </div>
            `;
        }
    }
    html += '</div>';

    previewList.innerHTML = html;
    previewContainer.style.display = 'block';
}

function processCRPaste() {
    const text = document.getElementById('cr-paste-area').value;
    const matches = text.match(/([\d.]+)\s*ml/g);
    if (!matches || matches.length < crOrder.length) return alert("Fehler: Format ungültig.");
    
    let queue = [];
    for (let i = 0; i < crOrder.length; i++) {
        let amount = parseFloat(matches[i].replace(/[^\d.]/g, ''));
        if (amount > 0) queue.push({ cat: crOrder[i].cat, item: crOrder[i].name, amount });
    }
    executeQueueWithConflictHandling(queue, 0);
}

function auslagernMischung(typ) {
    let prefix = typ === 'kationen' ? 'mix-kat-' : 'mix-an-';
    let catName = typ === 'kationen' ? 'Kationen' : 'Anionen';
    let queue = [];
    
    for (let item of mixDefinitions[typ]) {
        let inputEl = document.getElementById(prefix + item.replace(/[^a-zA-Z]/g, ''));
        let amount = inputEl ? parseFloat(inputEl.value) : 0;
        if (amount > 0) queue.push({ cat: catName, item, amount });
    }
    if (queue.length === 0) return alert("Trage mindestens bei einem Element eine Menge ein.");
    executeQueueWithConflictHandling(queue, 0);
}

function executeQueueWithConflictHandling(queue, index) {
    if (index >= queue.length) {
        saveDB();
        const pasteArea = document.getElementById('cr-paste-area');
        if (pasteArea) {
            pasteArea.value = '';
            previewCRPaste();
        }
        alert("Werte erfolgreich verarbeitet!");
        closeModal();
        showTab('lager');
        return;
    }
    
    let { cat, item, amount } = queue[index];
    let stock = db.inventory[cat][item] || 0;
    
    if (stock - amount < 0) {
        showConflictModal(cat, item, amount, stock, () => {
            db.inventory[cat][item] -= amount;
            db.stats[item] += amount;
            addLog(cat, item, 'out', amount);
            executeQueueWithConflictHandling(queue, index + 1);
        });
    } else {
        db.inventory[cat][item] -= amount;
        db.stats[item] += amount;
        addLog(cat, item, 'out', amount);
        executeQueueWithConflictHandling(queue, index + 1);
    }
}

// --- BACKUP & RESETS ---
function resetStatsSingle() { if(confirm("Statistiken nullen?")) { for(let i in db.stats) db.stats[i]=0; db.statsStarted=Date.now(); saveDB(); renderStats(); alert("Statistiken auf 0 gesetzt."); } }
function resetLogsSingle() { if(confirm("Protokoll löschen?")) { db.logs=[]; saveDB(); renderLogs(); alert("Protokoll gelöscht."); } }
function resetLagerSingle() { if(confirm("Lager nullen?")) { for(let c in db.inventory) for(let i in db.inventory[c]) db.inventory[c][i]=0; saveDB(); renderLager(); alert("Lager ist leer."); } }

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
            if(parsed.inventory) { db = parsed; if(!db.logs) db.logs=[]; saveDB(); applyTheme(db.theme || 'default', false); alert("Backup geladen!"); showTab('lager'); } 
            else alert("Ungültiges Backup-Format.");
        } catch(err) { alert("Fehler beim Lesen der Datei."); }
    };
    reader.readAsText(file);
}

// --- AMBIENT PARTY MODE ---
function togglePartyMode() { document.body.classList.toggle('party-mode'); }

// APP START
initDB();
renderLager();
