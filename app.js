// --- KONFIGURATION & DATEN ---
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

const DB_KEY = 'osci_db_v4';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now() };
let currentAction = {};

// --- INITIALISIERUNG ---
function initDB() {
    let saved = localStorage.getItem(DB_KEY);
    if (saved) db = JSON.parse(saved);
    // Sicherstellen, dass alle Items in db existieren
    for (let cat in catalog) {
        if (!db.inventory[cat]) db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            if (db.inventory[cat][item] === undefined) db.inventory[cat][item] = 0;
            if (db.stats[item] === undefined) db.stats[item] = 0;
        }
    }
    saveDB();
}

function saveDB() { localStorage.setItem(DB_KEY, JSON.stringify(db)); }

// --- UI STEUERUNG ---
function toggleMenu() { document.getElementById('main-nav').classList.toggle('open'); document.getElementById('menu-backdrop').classList.toggle('open'); }
function selectTab(tabId) { showTab(tabId); toggleMenu(); }

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-links button').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
    
    if(tabId === 'lager') renderLager();
    if(tabId === 'statistik') renderStats();
    if(tabId === 'log') renderLogs();
}

// --- MODAL & LOGIK ---
function openModal(cat, item, action) {
    currentAction = { cat, item, action };
    const modalBody = document.getElementById('modal-body');
    document.getElementById('modal-title').innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    
    modalBody.innerHTML = `
        <div class="input-group">
            <label>Einheit:</label>
            <select id="unitSelect" onchange="toggleContainerOptions()" style="width:100%; padding:10px; border-radius:8px;">
                <option value="ml">Milliliter (ml)</option>
                <option value="g">Gramm (g)</option>
            </select>
        </div>
        <div id="containerSection" style="display:none; margin:10px 0;">
            <label><input type="checkbox" id="useContainer" onchange="toggleContainerOptions()"> Behälter abziehen</label>
            <select id="containerSelect" style="display:none; width:100%; margin-top:5px;">
                ${Object.keys(containers).map(c => `<option value="${c}">${c} (${containers[c]}g)</option>`).join('')}
            </select>
        </div>
        <input type="number" step="0.01" id="amount" placeholder="Menge eingeben" style="width:100%; padding:10px; margin-top:10px;">
        <button class="btn-primary" style="margin-top:15px; width:100%;" onclick="executeAction()">Bestätigen</button>
    `;
    document.getElementById('modal').style.display = 'flex';
}

function toggleContainerOptions() {
    const isGram = document.getElementById('unitSelect').value === 'g';
    const isChecked = document.getElementById('useContainer').checked;
    document.getElementById('containerSection').style.display = isGram ? 'block' : 'none';
    document.getElementById('containerSelect').style.display = (isGram && isChecked) ? 'block' : 'none';
}

function executeAction() {
    let rawAmount = parseFloat(document.getElementById('amount').value);
    let unit = document.getElementById('unitSelect').value;
    let { cat, item, action } = currentAction;
    
    let finalMl = rawAmount;
    if (unit === 'g') {
        if (document.getElementById('useContainer').checked) {
            finalMl -= containers[document.getElementById('containerSelect').value];
        }
        finalMl = finalMl / (densityFactors[item] || 1.0);
    }

    if (isNaN(finalMl) || finalMl <= 0) return alert("Ungültige Menge.");

    if (action === 'in') {
        db.inventory[cat][item] += finalMl;
        db.logs.push({ cat, item, action, amount: finalMl, timestamp: Date.now() });
    } else {
        db.inventory[cat][item] -= finalMl;
        db.stats[item] += finalMl;
        db.logs.push({ cat, item, action, amount: finalMl, timestamp: Date.now() });
    }
    saveDB();
    document.getElementById('modal').style.display = 'none';
    renderLager();
}

// --- RESETS & PARTY ---
function resetStatsSingle() { if(confirm("Statistiken nullen?")) { for(let i in db.stats) db.stats[i]=0; saveDB(); renderStats(); } }
function resetLogsSingle() { if(confirm("Protokoll löschen?")) { db.logs=[]; saveDB(); renderLogs(); } }
function resetLagerSingle() { if(confirm("Lager nullen?")) { for(let c in db.inventory) for(let i in db.inventory[c]) db.inventory[c][i]=0; saveDB(); renderLager(); } }
function togglePartyMode() { document.body.classList.toggle('party-mode'); }
function closeModal() { document.getElementById('modal').style.display = 'none'; }

// --- RENDER FUNKTIONEN (Beispiele) ---
function renderLager() { /* Deine bisherige Render-Logik */ }
function renderStats() { /* Deine bisherige Render-Logik */ }
function renderLogs() { /* Deine bisherige Render-Logik */ }

initDB();
renderLager();
