
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
    container.innerHTML = Object.entries(db.inventory).map(([k,v]) => `<div class='card'>${k}: ${v} ml</div>`).join('');
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
