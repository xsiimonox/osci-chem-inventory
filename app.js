const catalog = {
    "C&R Produkte": {
        "Strontiumchlorid (SrCl2)": [100, 1000],
        "Magnesiumsulfat (MgSO4)": [1000, 5000],
        "Magnesiumchlorid (MgCl2)": [1000, 5000],
        "Kaliumbromid (KBr)": [1000, 5000],
        "Calciumchlorid (CaCl2)": [1000, 5000],
        "Kaliumchlorid (KCl)": [1000, 5000],
        "Natriumfluorid (NaF)": [5000],
        "Bor (B)": [1000, 5000],
        "Natriumchlorid (NaCl)": [5000, 10000],
        "Kaliumsulfat (K2SO4)": [1000, 5000],
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

let db = { inventory: {}, stats: {} };

// Initiale Datenbankstruktur aufbauen, falls leer
function initDB() {
    let saved = localStorage.getItem('osci_db');
    if (saved) {
        db = JSON.parse(saved);
    } else {
        for (let cat in catalog) {
            db.inventory[cat] = {};
            for (let item in catalog[cat]) {
                db.inventory[cat][item] = 0;
                db.stats[item] = 0; // Verbrauchte Menge
            }
        }
        saveDB();
    }
}

function saveDB() { localStorage.setItem('osci_db', JSON.stringify(db)); }

// Tabs umschalten
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
    if(tabId === 'lager') renderLager();
    if(tabId === 'statistik') renderStats();
}

function renderLager() {
    const container = document.getElementById('lager');
    container.innerHTML = '';
    
    for (let cat in catalog) {
        let catHtml = `<h2 class="category-title">${cat}</h2>`;
        container.innerHTML += catHtml;
        
        for (let item in catalog[cat]) {
            let stock = db.inventory[cat][item];
            container.innerHTML += `
                <div class="card">
                    <h4>${item} <span class="stock">${stock.toFixed(2)} ml</span></h4>
                    <div class="btn-group">
                        <button class="btn-in" onclick="openModal('${cat}', '${item}', 'in')">Einlagern</button>
                        <button class="btn-out" onclick="openModal('${cat}', '${item}', 'out')">Auslagern</button>
                    </div>
                </div>
            `;
        }
    }
}

function renderStats() {
    const container = document.getElementById('stats-container');
    container.innerHTML = '';
    for (let item in db.stats) {
        if (db.stats[item] > 0) {
            container.innerHTML += `<div class="stat-item"><span>${item}</span> <strong>${db.stats[item].toFixed(2)} ml</strong></div>`;
        }
    }
}

// Modal Logik
let currentAction = {};
function openModal(cat, item, action) {
    currentAction = { cat, item, action };
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.innerText = action === 'in' ? `${item} Einlagern` : `${item} Auslagern`;
    
    let html = '';
    if (action === 'in') {
        let presets = catalog[cat][item];
        html += `<p>Feste Größen wählen:</p><div class="preset-btns">`;
        presets.forEach(p => {
            html += `<button type="button" onclick="document.getElementById('amount').value='${p}'">${p} ml</button>`;
        });
        html += `</div>`;
    }
    
    html += `
        <div class="input-group">
            <label>Oder eigene Menge (ml):</label>
            <input type="number" step="0.1" id="amount" placeholder="z.B. 10.5">
        </div>
        <button class="btn-primary" onclick="executeAction()">Bestätigen</button>
    `;
    
    body.innerHTML = html;
    modal.style.display = 'flex';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

function executeAction() {
    let amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) return alert("Bitte eine gültige Menge eingeben.");
    
    let { cat, item, action } = currentAction;
    
    if (action === 'in') {
        db.inventory[cat][item] += amount;
    } else {
        if (db.inventory[cat][item] - amount < 0) {
            // Spezielle Fluor Logik
            if (item === "Fluor (F)") {
                let nafStock = db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"];
                alert(`Achtung: Fluor (F) Bestand reicht nicht aus!\n\nHinweis: Natriumfluorid (NaF) aus der C&R Serie ist identisch. Davon sind noch ${nafStock} ml auf Lager.`);
                return; // Abbruch
            } else {
                alert("Nicht genügend Bestand auf Lager!");
                return;
            }
        }
        db.inventory[cat][item] -= amount;
        db.stats[item] += amount; // Statistik aktualisieren
    }
    
    saveDB();
    closeModal();
    renderLager();
}

// Import & Export (.txt)
function exportData() {
    let dataStr = JSON.stringify(db, null, 2);
    let blob = new Blob([dataStr], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = `OSCI_Bestand_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
}

function importData() {
    let file = document.getElementById('importFile').files[0];
    if (!file) return alert("Bitte wähle eine .txt Datei aus.");
    
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            db = JSON.parse(e.target.result);
            saveDB();
            alert("Daten erfolgreich importiert!");
            renderLager();
        } catch (err) {
            alert("Fehler beim Lesen der Datei. Ist es die richtige .txt?");
        }
    };
    reader.readAsText(file);
}

// Start
initDB();
renderLager();