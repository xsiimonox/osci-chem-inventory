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
    "Anionen": {
        "Fluor (F)": [100], "Iod (I)": [30, 100], "Selen (Se)": [100], "Vanadium (V)": [30, 100]
    },
    "Kationen": {
        "Barium (Ba)": [30, 100], "Chrom (Cr)": [30, 100], "Cobalt (Co)": [1000], "Eisen (Fe)": [100],
        "Kupfer (Cu)": [30, 100], "Lithium (Li)": [30, 100], "Zink (Zn)": [100], "Mangan (Mn)": [30, 100],
        "Nickel (Ni)": [1000], "Molybdän (Mo)": [30, 100]
    }
};

// Festgelegte Sortierung für das Auslesen deiner unformatierten C&R Zeile
const crOrder = [
    { name: "Natriumchlorid (NaCl)", cat: "C&R Produkte" },
    { name: "Magnesiumchlorid (MgCl2)", cat: "C&R Produkte" },
    { name: "Natriumsulfat (Na2SO4)", cat: "C&R Produkte" },
    { name: "Magnesiumsulfat (MgSO4)", cat: "C&R Produkte" },
    { name: "Kaliumchlorid (KCl)", cat: "C&R Produkte" },
    { name: "Kaliumsulfat (K2SO4)", cat: "C&R Produkte" },
    { name: "Kaliumbromid (KBr)", cat: "C&R Produkte" },
    { name: "Strontiumchlorid (SrCl2)", cat: "C&R Produkte" },
    { name: "Calciumchlorid (CaCl2)", cat: "C&R Produkte" },
    { name: "Natriumfluorid (NaF)", cat: "C&R Produkte" },
    { name: "Bor (B)", cat: "C&R Produkte" }
];

let db = { inventory: {}, stats: {} };

function initDB() {
    let saved = localStorage.getItem('osci_db_v3');
    if (saved) {
        db = JSON.parse(saved);
    } else {
        for (let cat in catalog) {
            db.inventory[cat] = {};
            for (let item in catalog[cat]) {
                db.inventory[cat][item] = 0;
                db.stats[item] = 0;
            }
        }
        saveDB();
    }
}

function saveDB() { localStorage.setItem('osci_db_v3', JSON.stringify(db)); }

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
        container.innerHTML += `<h2 class="category-title">${cat}</h2>`;
        for (let item in catalog[cat]) {
            let stock = db.inventory[cat][item];
            let crossHint = "";
            
            // Warn-Verweise für das identische Fluor / NaF einblenden
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

function renderStats() {
    const container = document.getElementById('stats-container');
    container.innerHTML = '';
    let content = '';
    for (let item in db.stats) {
        if (db.stats[item] > 0) {
            content += `<div class="stat-item"><span>${item}</span><strong>${db.stats[item].toFixed(1)} ml</strong></div>`;
        }
    }
    container.innerHTML = content || '<p class="hint">Noch keine Verbräuche aufgezeichnet.</p>';
}

let currentAction = {};
function openModal(cat, item, action) {
    currentAction = { cat, item, action };
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    
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
    
    document.getElementById('modal-body').innerHTML = html;
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
            // Logik-Verknüpfung Fluor / NaF bei Mangel
            if (item === "Fluor (F)") {
                let alt = db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"];
                alert(`Mangel an Fluor (F)!\n\nHinweis: Natriumfluorid (NaF) aus der C&R Serie ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            } else if (item === "Natriumfluorid (NaF)") {
                let alt = db.inventory["Anionen"]["Fluor (F)"];
                alert(`Mangel an Natriumfluorid (NaF)!\n\nHinweis: Fluor (F) aus den Anionen ist identisch. Davon sind noch ${alt.toFixed(1)} ml verfügbar.`);
                return;
            } else {
                alert(`Nicht genügend Bestand von ${item} auf Lager.`);
                return;
            }
        }
        db.inventory[cat][item] -= amount;
        db.stats[item] += amount;
    }
    
    saveDB();
    closeModal();
    renderLager();
}

// Automatischer Parser für deine C&R Copy-Paste Textzeilen
function processCRPaste() {
    const text = document.getElementById('cr-paste-area').value;
    // Extrahiert alle Zahlenwerte, die direkt vor einem "ml" stehen
    const matches = text.match(/([\d.]+)\s*ml/g);
    
    if (!matches || matches.length < crOrder.length) {
        return alert("Fehler: Das Format konnte nicht verarbeitet werden oder es fehlen Werte. Bitte kopiere die exakte Zeile hinein.");
    }
    
    let updates = [];
    for (let i = 0; i < crOrder.length; i++) {
        let valStr = matches[i].replace(/[^\d.]/g, '');
        let amount = parseFloat(valStr);
        let item = crOrder[i].name;
        let cat = crOrder[i].cat;
        
        if (amount > 0) {
            if (db.inventory[cat][item] - amount < 0) {
                return alert(`Abbruch: Zu wenig Bestand für ${item}. Benötigt werden ${amount} ml.`);
            }
            updates.push({ cat, item, amount });
        }
    }
    
    updates.forEach(u => {
        db.inventory[u.cat][u.item] -= u.amount;
        db.stats[u.item] += u.amount;
    });
    
    saveDB();
    document.getElementById('cr-paste-area').value = '';
    alert("C&R Werte erfolgreich ausgelesen und vom Bestand abgezogen!");
    showTab('lager');
}

// Mischungen auslagern (zieht gesetzten Wert von allen Gruppenmitgliedern ab)
function auslagernMischung(typ) {
    const amountInput = document.getElementById(`${typ}-amount`);
    let amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) return alert("Bitte eine gültige Menge für die Mischung eingeben.");

    let itemsToDeduct = [];
    if (typ === 'kationen') {
        itemsToDeduct = [
            {cat: "Kationen", item: "Cobalt (Co)"}, {cat: "Kationen", item: "Nickel (Ni)"},
            {cat: "Kationen", item: "Eisen (Fe)"}, {cat: "Kationen", item: "Mangan (Mn)"},
            {cat: "Kationen", item: "Kupfer (Cu)"}, {cat: "Kationen", item: "Chrom (Cr)"},
            {cat: "Kationen", item: "Zink (Zn)"}
        ];
    } else {
        itemsToDeduct = [
            {cat: "Anionen", item: "Fluor (F)"}, {cat: "Anionen", item: "Iod (I)"},
            {cat: "Anionen", item: "Vanadium (V)"}, {cat: "Anionen", item: "Selen (Se)"}
        ];
    }

    // Vorabprüfung auf ausreichenden Bestand
    for (let i of itemsToDeduct) {
        if (db.inventory[i.cat][i.item] - amount < 0) {
            return alert(`Mischung blockiert: Nicht genug Bestand bei "${i.item}"!`);
        }
    }

    // Abzug durchführen
    itemsToDeduct.forEach(i => {
        db.inventory[i.cat][i.item] -= amount;
        db.stats[i.item] += amount;
    });

    saveDB();
    alert(`${typ.toUpperCase()}-Mischung (${amount} ml pro Element) erfolgreich abgezogen!`);
    showTab('lager');
}

// Backup-Funktionen (.txt Im-/Export)
function exportData() {
    let dataStr = JSON.stringify(db, null, 2);
    let blob = new Blob([dataStr], { type: "text/plain" });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `OSCI_Bestand_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
}

function importData() {
    let file = document.getElementById('importFile').files[0];
    if (!file) return alert("Bitte wähle zuerst eine Sicherungsdatei (.txt) aus.");
    
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            db = JSON.parse(e.target.result);
            saveDB();
            alert("Sicherung erfolgreich geladen!");
            showTab('lager');
        } catch (err) {
            alert("Fehler: Ungültiges Dateiformat.");
        }
    };
    reader.readAsText(file);
}

// App starten
initDB();
renderLager();
