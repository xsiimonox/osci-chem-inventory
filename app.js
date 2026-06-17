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

let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now() };

function initDB() {
    let saved = localStorage.getItem('osci_db_v4');
    if (saved) {
        db = JSON.parse(saved);
        if(!db.logs) db.logs = [];
        if(!db.statsStarted) db.statsStarted = Date.now();
    } else {
        clearAllDataStructure();
    }
}

function clearAllDataStructure() {
    db.inventory = {}; db.stats = {}; db.logs = []; db.statsStarted = Date.now();
    for (let cat in catalog) {
        db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            db.inventory[cat][item] = 0;
            db.stats[item] = 0;
        }
    }
    saveDB();
}

function saveDB() { localStorage.setItem('osci_db_v4', JSON.stringify(db)); }

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
    if(tabId === 'lager') renderLager();
    if(tabId === 'statistik') renderStats();
    if(tabId === 'trace-export') renderTraceExportInputs();
    if(tabId === 'log') renderLogs();
}

function renderLager() {
    const container = document.getElementById('lager');
    container.innerHTML = '';
    for (let cat in catalog) {
        container.innerHTML += `<h2 class="category-title">${cat}</h2>`;
        for (let item in catalog[cat]) {
            let stock = db.inventory[cat][item];
            let crossHint = "";
            if (item === "Fluor (F)" && stock === 0) {
                let nafStock = db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"];
                crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ NaF prüfen: ${nafStock.toFixed(1)} ml)</span>`;
            } else if (item === "Natriumfluorid (NaF)" && stock === 0) {
                let fStock = db.inventory["Anionen"]["Fluor (F)"];
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
    katContainer.innerHTML = mixDefinitions.kationen.map(item => `
        <div class="trace-grid">
            <label>${item}</label>
            <input type="number" step="0.1" min="0" value="0" id="mix-kat-${item.replace(/[^a-zA-Z]/g, '')}">
            <span class="unit-label">ml</span>
        </div>
    `).join('');
    anContainer.innerHTML = mixDefinitions.anionen.map(item => `
        <div class="trace-grid">
            <label>${item}</label>
            <input type="number" step="0.1" min="0" value="0" id="mix-an-${item.replace(/[^a-zA-Z]/g, '')}">
            <span class="unit-label">ml</span>
        </div>
    `).join('');
}

function renderStats() {
    document.getElementById('stats-start-date').innerText = "Statistik aufgezeichnet seit: " + new Date(db.statsStarted).toLocaleDateString();
    const container = document.getElementById('stats-container');
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
            
            // Reichweiten-Prognose (Feature)
            let currentStock = findCurrentStock(item);
            let prognosisText = "Keine Prognose möglich";
            if (perWeek > 0) {
                let weeksLeft = currentStock / perWeek;
                prognosisText = weeksLeft > 52 ? `Reichweite: >1 Jahr` : `Reichweite: ca. ${weeksLeft.toFixed(1)} Wochen`;
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

function findCurrentStock(itemName) {
    for (let cat in catalog) {
        if (catalog[cat][itemName] !== undefined) return db.inventory[cat][itemName];
    }
    return 0;
}

function resetStats() {
    if (confirm("Möchtest du die Verbrauchsstatistiken wirklich zurücksetzen? Der aktuelle Lagerbestand bleibt erhalten.")) {
        for (let item in db.stats) db.stats[item] = 0;
        db.statsStarted = Date.now();
        saveDB();
        renderStats();
    }
}

// Protokollierung rendern
function renderLogs() {
    const container = document.getElementById('log-container');
    container.innerHTML = '';
    if (!db.logs || db.logs.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine Aktionen protokolliert.</p>';
        return;
    }
    
    // Die neuesten Aktionen ganz oben anzeigen
    let logHTML = db.logs.map((log, index) => `
        <div class="log-item ${log.action}">
            <div class="log-details">
                <strong>${log.item}</strong><br>
                <span>${log.action === 'in' ? 'Eingelagert' : 'Ausgelagert'}: ${log.amount.toFixed(2)} ml</span><br>
                <span class="log-date">${new Date(log.timestamp
