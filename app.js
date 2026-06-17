// [catalog, crOrder und mixDefinitions bleiben identisch]
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
    "Anionen": {
        "Fluor (F)": [100], "Iod (I)": [30, 100], "Selen (Se)": [100], "Vanadium (V)": [30, 100]
    },
    "Kationen": {
        "Barium (Ba)": [30, 100], "Chrom (Cr)": [30, 100], "Cobalt (Co)": [1000], "Eisen (Fe)": [100],
        "Kupfer (Cu)": [30, 100], "Lithium (Li)": [30, 100], "Zink (Zn)": [100], "Mangan (Mn)": [30, 100],
        "Nickel (Ni)": [1000], "Molybdän (Mo)": [30, 100]
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
    anionen: ["Fluor (F)", "Iod (I)", "Vanadium (V)", "Selen (Se)"]
};

const DB_KEY = 'osci_db_v4';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now() };

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
    if(nav && backdrop) {
        nav.classList.remove('open');
        backdrop.classList.remove('open');
    }
}

function initDB() {
    try {
        let saved = localStorage.getItem(DB_KEY);
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

    for (let cat in catalog) {
        if (!db.inventory[cat]) db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            if (db.inventory[cat][item] === undefined) db.inventory[cat][item] = 0;
            if (db.stats[item] === undefined) db.stats[item] = 0;
        }
    }
    saveDB();
}

function saveDB() { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e) { console.error(e); } }

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
                let fStock = (db.inventory["Anionen"] && db.inventory["Anionen"]["Fluor (F)"]) || 0;
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
            let currentStock = findCurrentStock(item);
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
                    <div class="stat-grid" style="margin-top:2px;">
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

function findCurrentStock(itemName) {
    for (let cat in catalog) {
        if (db.inventory[cat] && db.inventory[cat][itemName] !== undefined) return db.inventory[cat][itemName];
    }
    return 0;
}

// --- DIE DREI NEUEN ISOLIERTEN RESET-FUNKTIONEN ---

// 1. Nur Statistiken resetten
function resetStatsSingle() {
    if (confirm("Möchtest du die Verbrauchsstatistiken wirklich zurücksetzen?\nDer aktuelle Lagerbestand und das Protokoll bleiben erhalten!")) {
        for (let item in db.stats) db.stats[item] = 0;
        db.statsStarted = Date.now();
        saveDB();
        renderStats();
        alert("Statistiken wurden zurückgesetzt.");
    }
}

// 2. Nur Protokoll löschen
function resetLogsSingle() {
    if (confirm("Möchtest du das gesamte Aktionsprotokoll unwiderruflich löschen?\nDer aktuelle Lagerbestand und die Statistiken bleiben erhalten!")) {
        db.logs = [];
        saveDB();
        if(document.getElementById('log').classList.contains('active')) renderLogs();
        alert("Aktionsprotokoll wurde geleert.");
    }
}

// 3. Nur Lagerbestand nullen
function resetLagerSingle() {
    if (confirm("🚨 ACHTUNG!\nMöchtest du wirklich alle aktuellen Lagerbestände auf 0 ml zurücksetzen?\nDeine Statistiken und das Protokoll bleiben erhalten!")) {
        for (let cat in catalog) {
            for (let item in catalog[cat]) {
                db.inventory[cat][item] = 0;
            }
        }
        saveDB();
        if(document.getElementById('lager').classList.contains('active')) renderLager();
        alert("Alle Bestände wurden auf 0 ml gesetzt.");
    }
}

// --------------------------------------------------

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

let currentAction = {};
function openModal(cat, item, action) {
    currentAction = { cat, item, action };
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if(!modal || !modalTitle || !modalBody) return;
    
    modalTitle.innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    let html = '';
    if (action === 'in') {
        html += `<p class="hint">Standardgebinde wählen:</p><div class="preset-btns">`;
        catalog[cat][item].forEach(p => {
            html += `<button onclick="document.getElementById('amount').value='${p}'">${p} ml</button>`;
        });
        html += `</div>`;
    }
    html += `
        <div class="input-group">
            <label>Menge eingeben (ml):</label>
            <input type="number" step="0.01" id="amount" placeholder="z.B. 12.5" autofocus>
        </div>
        <button class="btn-primary btn-animated" onclick="executeAction()">Bestätigen</button>
    `;
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

function closeModal() { 
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none'; 
}

function executeAction() {
    let amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) return alert("Bitte eine gültige Menge eingeben.");
    let { cat, item, action } = currentAction;
    
    if (action === 'in') {
        db.inventory[cat][item] += amount;
        addLog(cat, item, 'in', amount);
    } else {
        let stock = db.inventory[cat][item] || 0;
        if (stock - amount < 0) {
            if (item === "Fluor (F)") {
                let alt = db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"] || 0;
                alert(`Mangel an Fluor (F)!\n\nHinweis: Natriumfluorid (NaF) aus der C&R Serie ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            } else if (item === "Natriumfluorid (NaF)") {
                let alt = db.inventory["Anionen"]["Fluor (F)"] || 0;
                alert(`Mangel an Natriumfluorid (NaF)!\n\nHinweis: Fluor (F) aus den Anionen ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            }
            showConflictModal(cat, item, amount, stock, () => {
                db.inventory[cat][item] -= amount;
                db.stats[item] += amount;
                addLog(cat, item, 'out', amount);
                saveDB();
                closeModal();
                renderLager();
            });
            return;
        }
        db.inventory[cat][item] -= amount;
        db.stats[item] += amount;
        addLog(cat, item, 'out', amount);
    }
    saveDB();
    closeModal();
    renderLager();
}

function showConflictModal(cat, item, required, current, proceedCallback) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    if(!modal || !modalBody || !modalTitle) return;
    
    let missing = required - current;
    modalTitle.innerText = "⚠️ Bestands-Warnung";
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
    modal.style.display = 'flex';
}

function processCRPaste() {
    const text = document.getElementById('cr-paste-area').value;
    const matches = text.match(/([\d.]+)\s*ml/g);
    if (!matches || matches.length < crOrder.length) {
        return alert("Fehler: Das Format konnte nicht verarbeitet werden. Bitte kopiere die exakte Zeile hinein.");
    }
    let queue = [];
    for (let i = 0; i < crOrder.length; i++) {
        let valStr = matches[i].replace(/[^\d.]/g, '');
        let amount = parseFloat(valStr);
        let item = crOrder[i].name;
        let cat = crOrder[i].cat;
        if (amount > 0) queue.push({ cat, item, amount });
    }
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

function auslagernMischung(typ) {
    let prefix = typ === 'kationen' ? 'mix-kat-' : 'mix-an-';
    let catName = typ === 'kationen' ? 'Kationen' : 'Anionen';
    let elements = mixDefinitions[typ];
    let queue = [];
    for (let item of elements) {
        let inputId = prefix + item.replace(/[^a-zA-Z]/g, '');
        let inputEl = document.getElementById(inputId);
        let amount = inputEl ? parseFloat(inputEl.value) : 0;
        if (amount > 0) queue.push({ cat: catName, item, amount });
    }
    if (queue.length === 0) return alert("Bitte trage bei mindestens einem Element eine Menge ein.");
    executeQueueWithConflictHandling(queue, 0);
}

function exportData() {
    let dataStr = JSON.stringify(db, null, 2);
    let blob = new Blob([dataStr], { type: "text/plain" });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `OSCI_Full_Backup_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
}

function importData() {
    let fileInput = document.getElementById('importFile');
    let file = fileInput ? fileInput.files[0] : null;
    if (!file) return alert("Bitte wähle zuerst eine Sicherungsdatei (.txt) aus.");
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let parsed = JSON.parse(e.target.result);
            if(parsed.inventory && parsed.stats) {
                db = parsed;
                if(!db.logs) db.logs = [];
                saveDB();
                alert("Komplettsicherung erfolgreich eingelesen!");
                showTab('lager');
            } else { alert("Fehler: Backup-Datei ungültig."); }
        } catch (err) { alert("Fehler: Ungültiges Dateiformat."); }
    };
    reader.readAsText(file);
}

initDB();
renderLager();

// Funktion für den verrückten Disko-Modus
function togglePartyMode() {
    const isChecked = document.getElementById('partyToggle').checked;
    if (isChecked) {
        document.body.classList.add('party-mode');
        // Kleiner Soundeffekt-Spaß (optional, falls der Browser es erlaubt)
        alert("🚨 WARNUNG: Extrem verrückter Ambientlight-Modus aktiviert! 🕺💃");
    } else {
        document.body.classList.remove('party-mode');
    }
}
