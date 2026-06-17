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
    "Makro Elements": { 
        "Calcium": [5000], "KH Nacht": [5000], "KH Tag": [10000], "Magnesium": [5000] 
    },
    "Nutrition Elements": { 
        "Kohlenstoff (C)": [1000], "Lanthan (La)": [1000], "Phosphor (P)": [1000], "Stickstoff (N)": [1000] 
    },
    "Trace Elements": { 
        "Barium (Ba)": [30, 100], "Chrom (Cr)": [30, 100], "Cobalt (Co)": [1000], "Eisen (Fe)": [100], 
        "Kupfer (Cu)": [30, 100], "Lithium (Li)": [30, 100], "Zink (Zn)": [100], "Mangan (Mn)": [30, 100], 
        "Nickel (Ni)": [1000], "Molybdän (Mo)": [30, 100], "Fluor (F)": [100], "Iod": [30, 100], 
        "Selen": [100], "Vanadium": [30, 100] 
    }
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
    anionen: ["Fluor (F)", "Iod", "Vanadium", "Selen"]
};

const densityFactors = {
    "Strontiumchlorid (SrCl2)": 1.154, "Magnesiumsulfat (MgSO4)": 1.224, "Magnesiumchlorid (MgCl2)": 1.289,
    "Kaliumbromid (KBr)": 1.104, "Calciumchlorid (CaCl2)": 1.399, "Kaliumchlorid (KCl)": 1.112,
    "Natriumfluorid (NaF)": 1.000, "Bor (B)": 0.999, "Natriumchlorid (NaCl)": 1.192,
    "Kaliumsulfat (K2SO4)": 1.067, "Natriumsulfat (Na2SO4)": 1.110, "Barium (Ba)": 1.005,
    "Chrom (Cr)": 1.047, "Cobalt (Co)": 1.000, "Eisen (Fe)": 1.039, "Kupfer (Cu)": 1.024,
    "Mangan (Mn)": 1.234, "Molybdän (Mo)": 1.002, "Nickel (Ni)": 0.999, "Selen": 1.010,
    "Vanadium": 1.026, "Zink (Zn)": 1.024, "Iod": 1.097, "Fluor (F)": 1.009, "Lithium (Li)": 1.023
};

const containers = { "30ml": 9.3, "100ml": 18.5, "1000ml": 57, "5000ml": 260, "10000ml": 440 };

const DB_KEY = 'osci_db_v5_2';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now() };
let currentAction = {};

// --- INITIALISIERUNG ---
function initDB() {
    try {
        let saved = localStorage.getItem(DB_KEY) || localStorage.getItem('osci_db_v5_1') || localStorage.getItem('osci_db_v5') || localStorage.getItem('osci_db_v4');
        if (saved) {
            let parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
                db = parsed;
            }
        }
    } catch (e) { 
        console.error("Fehler beim Laden der Datenbank:", e); 
    }

    if (!db.inventory) db.inventory = {};
    if (!db.stats) db.stats = {};
    if (!db.logs) db.logs = [];
    if (!db.statsStarted) db.statsStarted = Date.now();

    for (let cat in catalog) {
        if (!db.inventory[cat]) db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            if (db.inventory[cat][item] === undefined) db.inventory[cat][item] = 0;
            if (db.stats[item] === undefined) db.stats[item] = 0;
        }
    }
    saveDB();
}

function saveDB() { 
    try { 
        localStorage.setItem(DB_KEY, JSON.stringify(db)); 
    } catch(e) {
        console.error("Speichern fehlgeschlagen:", e);
    } 
}

// --- UI / MENÜ STEUERUNG ---
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const backdrop = document.getElementById('menu-backdrop');
    if (nav && backdrop) {
        nav.classList.toggle('open');
        backdrop.classList.toggle('open');
    }
}

function selectTab(tabId) {
    showTab(tabId);
    const nav = document.getElementById('main-nav');
    const backdrop = document.getElementById('menu-backdrop');
    if (nav && backdrop) {
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
    if(tabId === 'trace-export') renderTraceExportInputs();
    if(tabId === 'log') renderLogs();
}

// --- RENDER FUNKTIONEN ---
function renderLager() {
    const container = document.getElementById('lager');
    if (!container) return;
    container.innerHTML = '';
    
    for (let cat in catalog) {
        container.innerHTML += `<h2 class="category-title">${cat}</h2>`;
        for (let item in catalog[cat]) {
            let stock = db.inventory[cat][item] || 0;
            let crossHint = "";
            if (item === "Fluor (F)" && stock === 0) {
                let nafStock = (db.inventory["C&R Produkte"] && db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"]) || 0;
                crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ NaF prüfen: ${nafStock.toFixed(1)} ml)</span>`;
            } else if (item === "Natriumfluorid (NaF)" && stock === 0) {
                let fStock = (db.inventory["Trace Elements"] && db.inventory["Trace Elements"]["Fluor (F)"]) || 0;
                crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ Fluor prüfen: ${fStock.toFixed(1)} ml)</span>`;
            }
            container.innerHTML += `
                <div class="card">
                    <h4><span>${item}</span> <span class="stock">${stock.toFixed(1)} ml</span></h4>
                    ${crossHint}
                    <div class="btn-group">
                        <button class="btn-in btn-animated" onclick="openModal('${cat}', '${item}', 'in')">Einlagern</button>
                        <button class="btn-out btn-animated" onclick="openModal('${cat}', '${item}', 'out')">Auslagern</button>
                    </div>
                </div>
            `;
        }
    }
}

function renderTraceExportInputs() {
    const katContainer = document.getElementById('kationen-inputs-container');
    const anContainer = document.getElementById('anionen-inputs-container');
    if (katContainer) {
        katContainer.innerHTML = mixDefinitions.kationen.map(item => `
            <div class="trace-grid">
                <label>${item}</label>
                <input type="number" step="0.1" min="0" value="0" id="mix-kat-${item.replace(/[^a-zA-Z]/g, '')}">
                <span class="unit-label">ml</span>
            </div>
        `).join('');
    }
    if (anContainer) {
        anContainer.innerHTML = mixDefinitions.anionen.map(item => `
            <div class="trace-grid">
                <label>${item}</label>
                <input type="number" step="0.1" min="0" value="0" id="mix-an-${item.replace(/[^a-zA-Z]/g, '')}">
                <span class="unit-label">ml</span>
            </div>
        `).join('');
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

    let content = '';
    for (let item in db.stats) {
        let totalConsumed = db.stats[item] || 0;
        if (totalConsumed > 0) {
            let perWeek = totalConsumed / weeksElapsed;
            let perMonth = totalConsumed / monthsElapsed;
            let perYear = totalConsumed / yearsElapsed;
            
            let currentStock = db.inventory[findCat(item)][item] || 0;
            let prognosisText = "";
            let outCount = countOutsForElement(item);
            
            if (outCount < 2) {
                prognosisText = "Prognose ab der 2. Entnahme verfügbar";
            } else if (perWeek > 0) {
                let weeksLeft = currentStock / perWeek;
                prognosisText = weeksLeft > 52 ? `Reichweite: >1 Jahr` : `Reichweite: ca. ${weeksLeft.toFixed(1)} Wochen`;
            } else {
                prognosisText = "Keine Prognose möglich";
            }

            content += `
                <div class="stat-block">
                    <h4 style="margin:0 0 5px 0; color: var(--primary);">${item}</h4>
                    <div style="font-size:0.85rem; margin-bottom:5px;">Gesamtverbrauch: <strong>${totalConsumed.toFixed(1)} ml</strong></div>
                    <div class="stat-grid">
                        <div><strong>${perWeek.toFixed(1)} ml</strong>/Woche</div>
                        <div><strong>${perMonth.toFixed(1)} ml</strong>/Monat</div>
                        <div><strong>${perYear.toFixed(1)} ml</strong>/Jahr</div>
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
    
    let logHTML = db.logs.map((log, index) => `
        <div class="log-item ${log.action}">
            <div class="log-details">
                <strong>${log.item}</strong><br>
                <span>${log.action === 'in' ? 'Eingelagert' : 'Ausgelagert'}: ${(log.amount || 0).toFixed(2)} ml</span><br>
                <span class="log-date">${new Date(log.timestamp).toLocaleString()}</span>
            </div>
            <button class="btn-out" style="padding:5px 10px; font-size:0.8rem; max-width:140px;" onclick="undoLog(${index})">Rückgängig</button>
        </div>
    `).reverse().join('');
    container.innerHTML = logHTML;
}

// --- MODAL & EINGABELOGIK ---
function openModal(cat, item, action) {
    currentAction = { cat, item, action };
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;
    
    document.getElementById('modal-title').innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    
    // Dynamische Gebinde-Auswahl (Nur beim Einlagern sichtbar)
    let presetButtonsHTML = '';
    if (action === 'in' && catalog[cat] && catalog[cat][item]) {
        const sizes = catalog[cat][item];
        presetButtonsHTML = `
            <div style="margin-bottom: 15px;">
                <label style="display:block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">Schnellauswahl Gebinde:</label>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    ${sizes.map(size => `
                        <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.85rem; min-width:70px;" 
                                onclick="document.getElementById('amount').value = ${size}; document.getElementById('unitSelect').value = 'ml'; toggleContainerOptions();">
                            ${size} ml
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        ${presetButtonsHTML}
        
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
        <button class="btn-primary btn-animated" style="margin-top:15px;" onclick="executeAction()">Buchung ausführen</button>
    `;
    modal.style.display = 'flex';
}

function toggleContainerOptions() {
    const unitSel = document.getElementById('unitSelect');
    const useCont = document.getElementById('useContainer');
    const contSec = document.getElementById('containerSection');
    const contSel = document.getElementById('containerSelect');
    
    if(!unitSel || !contSec || !contSel || !useCont) return;

    const isGram = unitSel.value === 'g';
    const isChecked = useCont.checked;
    
    contSec.style.display = isGram ? 'block' : 'none';
    contSel.style.display = (isGram && isChecked) ? 'block' : 'none';
}

function closeModal() { 
    const modal = document.getElementById('modal');
    if(modal) modal.style.display = 'none'; 
}

function executeAction() {
    const amountInput = document.getElementById('amount');
    const unitSel = document.getElementById('unitSelect');
    if(!amountInput || !unitSel) return;

    let rawAmount = parseFloat(amountInput.value);
    let unit = unitSel.value;
    let { cat, item, action } = currentAction;
    
    if (isNaN(rawAmount) || rawAmount <= 0) return alert("Bitte eine gültige Menge eingeben.");
    
    let finalMl = rawAmount;
    
    // Umrechnung wenn in Gramm gewogen wurde
    if (unit === 'g') {
        const useCont = document.getElementById('useContainer');
        const contSel = document.getElementById('containerSelect');
        if (useCont && useCont.checked && contSel) {
            let containerWeight = containers[contSel.value] || 0;
            finalMl -= containerWeight;
        }
        let factor = densityFactors[item] || 1.0;
        finalMl = finalMl / factor;
    }

    if (finalMl <= 0) return alert("Fehler: Nach Abzug des Behälters bleibt keine Restmenge übrig.");

    // Einlagern
    if (action === 'in') {
        db.inventory[cat][item] += finalMl;
        addLog(cat, item, 'in', finalMl);
        saveDB();
        closeModal();
        renderLager();
    } 
    // Auslagern
    else {
        let stock = db.inventory[cat][item] || 0;
        if (stock - finalMl < 0) {
            if (item === "Fluor (F)") {
                let alt = db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"] || 0;
                alert(`Mangel an Fluor (F)!\nHinweis: Natriumfluorid (NaF) aus der C&R Serie ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            } else if (item === "Natriumfluorid (NaF)") {
                let alt = db.inventory["Trace Elements"]["Fluor (F)"] || 0;
                alert(`Mangel an Natriumfluorid (NaF)!\nHinweis: Fluor (F) aus den Trace Elements ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
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
    const modalTitle = document.getElementById('modal-title');
    const modal = document.getElementById('modal');
    if(!modalBody || !modalTitle || !modal) return;

    modalTitle.innerText = "⚠️ Bestands-Warnung";
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
    
    const btn = document.getElementById('proceed-conflict-btn');
    if(btn) btn.onclick = proceedCallback;
    modal.style.display = 'flex';
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

// --- BATCH VERARBEITUNG & MISCHUNGEN ---
function processCRPaste() {
    const pasteArea = document.getElementById('cr-paste-area');
    if(!pasteArea) return;
    const text = pasteArea.value;
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
    let queue = [];
    
    for (let item of mixDefinitions[typ]) {
        let inputEl = document.getElementById(prefix + item.replace(/[^a-zA-Z]/g, ''));
        let amount = inputEl ? parseFloat(inputEl.value) : 0;
        if (amount > 0) queue.push({ cat: "Trace Elements", item, amount });
    }
    if (queue.length === 0) return alert("Trage mindestens bei einem Element eine Menge ein.");
    executeQueueWithConflictHandling(queue, 0);
}

function executeQueueWithConflictHandling(queue, index) {
    if (index >= queue.length) {
        saveDB();
        const pasteArea = document.getElementById('cr-paste-area');
        if (pasteArea) pasteArea.value = '';
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

// --- BACKUP & DATA RESETS ---
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
    const fileInput = document.getElementById('importFile');
    if(!fileInput) return;
    let file = fileInput.files[0];
    if (!file) return alert("Bitte wähle eine Datei (.txt) aus.");
    let reader = new FileReader();
    reader.onload = e => {
        try {
            let parsed = JSON.parse(e.target.result);
            if(parsed.inventory) { db = parsed; if(!db.logs) db.logs=[]; saveDB(); alert("Backup geladen!"); showTab('lager'); } 
            else alert("Ungültiges Backup-Format.");
        } catch(err) { alert("Fehler beim Lesen der Datei."); }
    };
    reader.readAsText(file);
}

// --- AMBIENT PARTY MODE ---
function togglePartyMode() { document.body.classList.toggle('party-mode'); }

// APP-START TRIGGER
window.addEventListener('DOMContentLoaded', () => {
    initDB();
    renderLager();
});

// --- PDF EXPORT FUNKTION ---
async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titel
    doc.setFontSize(18);
    doc.text("Aktueller Bestand - OSCI Lager", 14, 20);
    doc.setFontSize(10);
    doc.text(`Stand: ${new Date().toLocaleString()}`, 14, 28);

    // Tabellen-Header
    let y = 40;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Kategorie / Element", 14, y);
    doc.text("Menge (ml)", 120, y);
    doc.text("Menge (g)", 160, y);
    doc.line(14, y + 2, 195, y + 2); // Trennlinie

    y += 10;
    doc.setFont(undefined, 'normal');

    // Daten aus der Datenbank rendern
    for (let cat in catalog) {
        // Kategorie-Überschrift in PDF
        doc.setFont(undefined, 'bold');
        doc.text(cat, 14, y);
        y += 7;
        doc.setFont(undefined, 'normal');

        for (let item in catalog[cat]) {
            let ml = db.inventory[cat][item] || 0;
            let factor = densityFactors[item] || 1.0;
            let gram = (ml * factor).toFixed(1);

            doc.text(item, 20, y);
            doc.text(ml.toFixed(1), 120, y);
            doc.text(gram, 160, y);
            y += 7;

            // Neue Seite, wenn Platz am Ende erreicht
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        }
        y += 5;
    }

    doc.save(`Lagerbestand_${new Date().toISOString().split('T')[0]}.pdf`);
}
