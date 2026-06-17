
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
// --- PDF EXPORT FUNKTION ---
async function exportToPDF() {
    if (!window.jspdf) return alert("PDF-Bibliothek lädt noch. Bitte kurz warten oder Seite neu laden.");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titel & Dokumenten-Kopf
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("OSCI Motion - Aktuelle Bestände", 14, 20);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generiert am: ${new Date().toLocaleString('de-DE')}`, 14, 27);
    doc.line(14, 30, 195, 30); // Horizontale Trennlinie

    let y = 40;

    // Tabellenkopf
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Chemikalie / Element", 15, y);
    doc.text("Volumen (ml)", 125, y);
    doc.text("Gewicht (g)", 165, y);
    doc.line(14, y + 2, 195, y + 2);
    y += 10;

    for (let cat in catalog) {
        // Kategorie-Titel
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(191, 90, 242); // OSCI Primary Color Lila
        doc.text(cat.toUpperCase(), 14, y);
        y += 7;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);

        for (let item in catalog[cat]) {
            let ml = db.inventory[cat][item] || 0;
            let factor = densityFactors[item] || 1.0;
            let gram = ml * factor;

            // Zeile schreiben
            doc.text(item, 18, y);
            doc.text(`${ml.toFixed(1)} ml`, 125, y);
            doc.text(`${gram.toFixed(1)} g`, 165, y);
            y += 6.5;

            // Automatischer Seitenumbruch bei langen Listen
            if (y > 275) {
                doc.addPage();
                y = 20;
            }
        }
        y += 4; // Abstand nach Kategorie
    }

    // PDF speichern
    doc.save(`OSCI_Lagerbestand_${new Date().toISOString().split('T')[0]}.pdf`);
}

init();
