
const catalog = {
    "C&R": ["NaCl", "MgCl2", "Na2SO4", "MgSO4", "KCl", "K2SO4", "KBr", "SrCl2", "CaCl2", "NaF", "Bor (B)"],
    "Kationen": ["Cobalt", "Nickel", "Eisen", "Mangan", "Kupfer", "Chrom", "Zink"],
    "Anionen": ["Fluor (F)", "Iod", "Vanadium", "Selen"]
};

let db = { inventory: {} };

function init() {
    catalog["C&R"].forEach(item => db.inventory[item] = 1000); // Dummy startwert
    renderLager();
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function renderLager() {
    const container = document.getElementById('lager');
    if (!container) return;
    container.innerHTML = '';
    
    // Neuer PDF-Export Button ganz oben im Lager-Tab platziert
    container.innerHTML += `
        <div style="margin-bottom: 15px;">
            <button class="btn-secondary btn-animated" onclick="exportToPDF()" style="width: 100%; font-weight: bold; background: rgba(100, 210, 255, 0.15); border: 1px solid var(--secondary);">
                📄 Bestandsliste als PDF drucken
            </button>
        </div>
    `;
    
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

}

function processCRPaste() {
    const text = document.getElementById('cr-paste-area').value;
    alert("Parsing gestartet für: " + text.substring(0, 20) + "...");
    // Hier Logik für Regex-Extraktion von Werten
}

function auslagernMischung(typ) {
    alert(typ + " wird ausgelagert!");
}

init();
