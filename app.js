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

const crPdfAliases = {
    "Natriumchlorid (NaCl)": ["NaCl", "Natriumchlorid"],
    "Magnesiumchlorid (MgCl2)": ["MgCl2", "Magnesiumchlorid"],
    "Natriumsulfat (Na2SO4)": ["Na2SO4", "Natriumsulfat"],
    "Magnesiumsulfat (MgSO4)": ["MgSO4", "Magnesiumsulfat"],
    "Kaliumchlorid (KCl)": ["KCl", "KCL", "Kaliumchlorid"],
    "Kaliumsulfat (K2SO4)": ["K2SO4", "Kaliumsulfat"],
    "Kaliumbromid (KBr)": ["KBr", "Kaliumbromid"],
    "Strontiumchlorid (SrCl2)": ["SrCl2", "Strontiumchlorid"],
    "Calciumchlorid (CaCl2)": ["CaCl2", "Calciumchlorid"],
    "Natriumfluorid (NaF)": ["NaF", "Natriumfluorid"],
    "Bor (B)": ["Bor (B)", "Bor"]
};

const crElementOrder = ["Na", "Mg", "Ca", "K", "Sr", "F", "Cl", "S", "Br", "B"];

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

// --- OSCI SHOP BUILT-IN PRODUCT PRESET ---
// This preset is always available and cannot be permanently deleted.
// It represents the full OSCI Motion product portfolio that maps to shopLinksPreset.
const OSCI_SHOP_PRESET_NAME = 'OSCI Motion Shop (Standard)';
const OSCI_SHOP_PRESET_PRODUCTS = [
    // C&R Produkte
    { name: 'Natriumchlorid (NaCl)',    cat: 'C&R Produkte', sizes: [5000, 10000], sizeUnit: 'ml', sizesOriginal: [5000, 10000], density: 1.192 },
    { name: 'Magnesiumchlorid (MgCl2)', cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 1.289 },
    { name: 'Natriumsulfat (Na2SO4)',   cat: 'C&R Produkte', sizes: [5000],        sizeUnit: 'ml', sizesOriginal: [5000],        density: 1.110 },
    { name: 'Magnesiumsulfat (MgSO4)',  cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 1.224 },
    { name: 'Kaliumchlorid (KCl)',      cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 1.112 },
    { name: 'Kaliumsulfat (K2SO4)',     cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 1.067 },
    { name: 'Kaliumbromid (KBr)',       cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 1.104 },
    { name: 'Strontiumchlorid (SrCl2)', cat: 'C&R Produkte', sizes: [100, 1000],   sizeUnit: 'ml', sizesOriginal: [100, 1000],   density: 1.154 },
    { name: 'Calciumchlorid (CaCl2)',   cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 1.399 },
    { name: 'Natriumfluorid (NaF)',     cat: 'C&R Produkte', sizes: [5000],        sizeUnit: 'ml', sizesOriginal: [5000],        density: 1.000 },
    { name: 'Bor (B)',                  cat: 'C&R Produkte', sizes: [1000, 5000],  sizeUnit: 'ml', sizesOriginal: [1000, 5000],  density: 0.999 },
    // Makro Elements
    { name: 'Calcium',   cat: 'Makro Elements', sizes: [5000],  sizeUnit: 'ml', sizesOriginal: [5000],  density: 1.0 },
    { name: 'KH Nacht',  cat: 'Makro Elements', sizes: [5000],  sizeUnit: 'ml', sizesOriginal: [5000],  density: 1.0 },
    { name: 'KH Tag',    cat: 'Makro Elements', sizes: [10000], sizeUnit: 'ml', sizesOriginal: [10000], density: 1.0 },
    { name: 'Magnesium', cat: 'Makro Elements', sizes: [5000],  sizeUnit: 'ml', sizesOriginal: [5000],  density: 1.0 },
    // Nutrition Elements
    { name: 'Kohlenstoff (C)', cat: 'Nutrition Elements', sizes: [1000], sizeUnit: 'ml', sizesOriginal: [1000], density: 1.0 },
    { name: 'Lanthan (La)',    cat: 'Nutrition Elements', sizes: [1000], sizeUnit: 'ml', sizesOriginal: [1000], density: 1.0 },
    { name: 'Phosphor (P)',    cat: 'Nutrition Elements', sizes: [1000], sizeUnit: 'ml', sizesOriginal: [1000], density: 1.0 },
    { name: 'Stickstoff (N)', cat: 'Nutrition Elements', sizes: [1000], sizeUnit: 'ml', sizesOriginal: [1000], density: 1.0 },
    // Anionen
    { name: 'Fluor (F)',    cat: 'Anionen', sizes: [100],      sizeUnit: 'ml', sizesOriginal: [100],      density: 1.009 },
    { name: 'Iod (I)',      cat: 'Anionen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.097 },
    { name: 'Selen (Se)',   cat: 'Anionen', sizes: [100],      sizeUnit: 'ml', sizesOriginal: [100],      density: 1.010 },
    { name: 'Vanadium (V)', cat: 'Anionen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.026 },
    // Kationen
    { name: 'Barium (Ba)',     cat: 'Kationen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.005 },
    { name: 'Chrom (Cr)',      cat: 'Kationen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.047 },
    { name: 'Cobalt (Co)',     cat: 'Kationen', sizes: [1000],     sizeUnit: 'ml', sizesOriginal: [1000],     density: 1.000 },
    { name: 'Eisen (Fe)',      cat: 'Kationen', sizes: [100],      sizeUnit: 'ml', sizesOriginal: [100],      density: 1.039 },
    { name: 'Kupfer (Cu)',     cat: 'Kationen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.024 },
    { name: 'Lithium (Li)',    cat: 'Kationen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.023 },
    { name: 'Zink (Zn)',       cat: 'Kationen', sizes: [100],      sizeUnit: 'ml', sizesOriginal: [100],      density: 1.024 },
    { name: 'Mangan (Mn)',     cat: 'Kationen', sizes: [30, 100],  sizeUnit: 'ml', sizesOriginal: [30, 100],  density: 1.234 },
    { name: 'Nickel (Ni)',     cat: 'Kationen', sizes: [1000],     sizeUnit: 'ml', sizesOriginal: [1000],     density: 0.999 },
    { name: 'Molybd\u00e4n (Mo)', cat: 'Kationen', sizes: [30, 100], sizeUnit: 'ml', sizesOriginal: [30, 100], density: 1.002 },
];

// Format: { itemName: { sizeMl: fullUrl, ... } }
// Sizes: 30, 100, 1000, 5000, 10000
const BASE = 'https://osci-motion.de/product/';
const shopLinksPreset = {
    // C&R Produkte
    "Natriumchlorid (NaCl)":    { 5000: BASE+'custom-repair-elements-natriumchlorid/?attribute_volumen=5+Liter',    10000: BASE+'custom-repair-elements-natriumchlorid/?attribute_volumen=10+Liter' },
    "Magnesiumchlorid (MgCl2)": { 1000: BASE+'custom-repair-elements-magnesiumchlorid/?attribute_volumen=1+Liter',  5000: BASE+'custom-repair-elements-magnesiumchlorid/?attribute_volumen=5+Liter' },
    "Natriumsulfat (Na2SO4)":   { 5000: BASE+'custom-repair-elements-natriumsulfat/?attribute_volumen=5+Liter' },
    "Magnesiumsulfat (MgSO4)":  { 1000: BASE+'custom-repair-elements-magnesiumsulfat/?attribute_volumen=1+Liter',  5000: BASE+'custom-repair-elements-magnesiumsulfat/?attribute_volumen=5+Liter' },
    "Kaliumchlorid (KCl)":      { 1000: BASE+'custom-repair-elements-kaliumchlorid/?attribute_volumen=1+Liter',    5000: BASE+'custom-repair-elements-kaliumchlorid/?attribute_volumen=5+Liter' },
    "Kaliumsulfat (K2SO4)":     { 1000: BASE+'custom-repair-elements-kaliumsulfat/?attribute_volumen=1+Liter',     5000: BASE+'custom-repair-elements-kaliumsulfat/?attribute_volumen=5+Liter' },
    "Kaliumbromid (KBr)":       { 1000: BASE+'custom-repair-elements-kaliumbromid/?attribute_volumen=1+Liter',     5000: BASE+'custom-repair-elements-kaliumbromid/?attribute_volumen=5+Liter' },
    "Strontiumchlorid (SrCl2)": { 100:  BASE+'custom-repair-elements-strontiumchlorid-2/?attribute_volumen=100ml',  1000: BASE+'custom-repair-elements-strontiumchlorid-2/?attribute_volumen=1+Liter' },
    "Calciumchlorid (CaCl2)":   { 1000: BASE+'custom-repair-elements-calciumchlorid/?attribute_volumen=1+Liter',   5000: BASE+'custom-repair-elements-calciumchlorid/?attribute_volumen=5+Liter' },
    "Natriumfluorid (NaF)":     { 5000: BASE+'custom-repair-elements-natriumfluorid/?attribute_volumen=5+Liter' },
    "Bor (B)":                  { 1000: BASE+'custom-repair-elements-bor/?attribute_volumen=1+Liter',              5000: BASE+'custom-repair-elements-bor/?attribute_volumen=5+Liter' },
    // Makro Elements
    "Calcium":   { 5000: BASE+'makro-elements-calcium/?attribute_volumen=5+Liter' },
    "KH Nacht":  { 5000: BASE+'makro-elements-kh-nacht/?attribute_volumen=5+Liter' },
    "KH Tag":    { 10000: BASE+'makro-elements-kh-tag/?attribute_volumen=10+Liter' },
    "Magnesium": { 5000: BASE+'makro-elements-magnesium/?attribute_volumen=5+Liter' },
    // Nutrition Elements
    "Kohlenstoff (C)": { 1000: BASE+'nutrition-elements-kohlenstoff/?attribute_volumen=1+Liter' },
    "Lanthan (La)":    { 1000: BASE+'nutrition-elements-lanthan/?attribute_volumen=1+Liter' },
    "Phosphor (P)":    { 1000: BASE+'nutrition-elements-phosphat/?attribute_volumen=1+Liter' },
    "Stickstoff (N)":  { 1000: BASE+'nutrition-elements-stickstoff/?attribute_volumen=1+Liter' },
    // Anionen
    "Fluor (F)":    { 100: BASE+'trace-elements-flour/?attribute_volumen=1000+ml' },
    "Iod (I)":      { 30: BASE+'trace-elements-iod/?attribute_volumen=30ml',   100: BASE+'trace-elements-iod/?attribute_volumen=100ml' },
    "Selen (Se)":   { 100: BASE+'trace-elements-selen/?attribute_volumen=100ml' },
    "Vanadium (V)": { 30: BASE+'trace-elements-vanadium/?attribute_volumen=30ml', 100: BASE+'trace-elements-vanadium/?attribute_volumen=100ml' },
    // Kationen
    "Barium (Ba)":   { 30: BASE+'trace-elements-barium/?attribute_volumen=30ml',   100: BASE+'trace-elements-barium/?attribute_volumen=100ml' },
    "Chrom (Cr)":    { 30: BASE+'trace-elements-chrom/?attribute_volumen=30ml',    100: BASE+'trace-elements-chrom/?attribute_volumen=100ml' },
    "Cobalt (Co)":   { 1000: BASE+'trace-elements-cobalt/?attribute_volumen=1+Liter' },
    "Eisen (Fe)":    { 100: BASE+'trace-elements-eisen/?attribute_volumen=100ml' },
    "Kupfer (Cu)":   { 30: BASE+'trace-elements-kupfer/?attribute_volumen=30ml',   100: BASE+'trace-elements-kupfer/?attribute_volumen=100ml' },
    "Lithium (Li)":  { 30: BASE+'trace-elements-lithium/?attribute_volumen=30ml',  100: BASE+'trace-elements-lithium/?attribute_volumen=100ml' },
    "Zink (Zn)":     { 100: BASE+'trace-elements-zink/?attribute_volumen=100ml' },
    "Mangan (Mn)":   { 30: BASE+'trace-elements-mangan/?attribute_volumen=30ml',   100: BASE+'trace-elements-mangan/?attribute_volumen=100ml' },
    "Nickel (Ni)":   { 1000: BASE+'trace-elements-nickel/?attribute_volumen=1+Liter' },
    "Molybd\u00e4n (Mo)": { 30: BASE+'trace-elements-molybdaen/?attribute_volumen=30ml', 100: BASE+'trace-elements-molybdaen/?attribute_volumen=100ml' },
};

// Returns the URL map {sizeMl: url} for an item (db overrides preset)
function getShopUrlMap(itemName) {
    const fromDb = db.shopLinks && db.shopLinks[itemName];
    const fromPreset = shopLinksPreset[itemName];
    // Merge: db overrides preset per size
    if (fromDb && typeof fromDb === 'object' && !fromDb.slug) {
        if (fromPreset) return Object.assign({}, fromPreset, fromDb);
        return fromDb;
    }
    // Legacy slug format migration
    if (fromDb && (typeof fromDb === 'string' || fromDb.slug)) return fromPreset || null;
    return fromPreset || null;
}

// Legacy compat shim
function getShopSlug(itemName) {
    const map = getShopUrlMap(itemName);
    return map ? true : null; // just used for existence check in old code
}

function buildShopUrl(slug, sizeMl) {
    // Legacy shim – not used in new code but kept for safety
    const sizeMap = { 30: "30ml", 100: "100ml", 1000: "1+Liter", 5000: "5+Liter", 10000: "10+Liter" };
    const vol = sizeMap[sizeMl] || sizeMl + "+ml";
    return `https://osci-motion.de/product/${slug}/?attribute_volumen=${vol}`;
}

const DB_KEY = 'osci_db_v5';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now(), theme: 'default' };
let currentAction = {};
let crPdfAdjustments = [];

// --- INITIALISIERUNG ---
function applyCustomProductsToCatalog() {
    if (!db.customProducts) db.customProducts = [];

    db.customProducts.forEach(product => {
        if (!product || !product.name || !product.cat) return;
        if (!catalog[product.cat]) catalog[product.cat] = {};
        catalog[product.cat][product.name] = Array.isArray(product.sizes) ? product.sizes : [];

        const density = parseFloat(product.density);
        if (!isNaN(density) && density > 0) densityFactors[product.name] = density;
    });
}

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
    if (!db.settings) db.settings = {};
    if (!db.settings.forecastWeeks) db.settings.forecastWeeks = 4;
    if (!db.notifications) db.notifications = {};
    if (db.notifications.enabled === undefined) db.notifications.enabled = false;
    if (!db.notifications.lastAlertSignature) db.notifications.lastAlertSignature = '';
    if (!db.notifications.lastSentAt) db.notifications.lastSentAt = 0;
    if (!db.alerts) db.alerts = {};
    if (!db.alerts.dismissed) db.alerts.dismissed = {};
    if (!db.alerts.disabled) db.alerts.disabled = {};
    if (!db.customProducts) db.customProducts = [];
    if (!db.shopLinks) db.shopLinks = {};
    if (!db.productPresets) db.productPresets = {};
    // Always ensure the built-in OSCI preset is present (injected fresh, non-destructive)
    db.productPresets[OSCI_SHOP_PRESET_NAME] = OSCI_SHOP_PRESET_PRODUCTS;

    applyCustomProductsToCatalog();

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

function jsArg(value) {
    return JSON.stringify(value).replace(/'/g, "\\u0027");
}

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
        // Re-trigger the slide-in animation by briefly removing the class
        targetTab.style.animation = 'none';
        targetTab.offsetHeight; // Force reflow
        targetTab.style.animation = '';
        targetTab.classList.add('active');
        targetBtn.classList.add('active');
    }
    
    if(tabId === 'lager') renderLager();
    if(tabId === 'statistik') renderStats();
    if(tabId === 'trace-export') renderTraceExportInputs();
    if(tabId === 'log') renderLogs();
    if(tabId === 'nachbestellen') renderNachbestellen();
    if(tabId === 'einstellungen') {
        updateNotificationStatus();
        renderCustomProductSettings();
        renderShopLinkSettings();
        renderProductPresets();
        // Wire up collapsible toggle hints
        setTimeout(() => {
            const det = document.getElementById('shop-links-details');
            const hint = document.getElementById('shop-links-toggle-hint');
            if (det && hint) {
                det.addEventListener('toggle', () => {
                    hint.innerText = det.open ? 'zuklappen' : 'aufklappen';
                }, { once: false });
            }
            const det2 = document.getElementById('product-presets-details');
            const hint2 = document.getElementById('product-presets-toggle-hint');
            if (det2 && hint2) {
                det2.addEventListener('toggle', () => {
                    hint2.innerText = det2.open ? 'zuklappen' : 'aufklappen';
                }, { once: false });
            }
        }, 0);
    }
}

// --- DESIGN / THEME STEUERUNG ---
function applyTheme(themeName, shouldSave = true) {
    // Alle alten Design-Klassen vom Body entfernen
    document.body.classList.remove('theme-girl', 'theme-mint', 'theme-badman', 'theme-light');
    
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

function getLogTime(log) {
    return log.timestamp || log.time || null;
}

function getStock(itemName) {
    const cat = findCat(itemName);
    return db.inventory[cat] ? (db.inventory[cat][itemName] || 0) : 0;
}

function getUsageMetrics(itemName) {
    const now = Date.now();
    const outLogs = (db.logs || [])
        .filter(log => log.item === itemName && log.action === 'out')
        .map(log => ({ ...log, timeValue: getLogTime(log) }))
        .filter(log => log.timeValue)
        .sort((a, b) => a.timeValue - b.timeValue);

    const totalConsumed = db.stats[itemName] || 0;
    const started = db.statsStarted || now;
    const daysSinceStart = Math.max(1, (now - started) / (1000 * 60 * 60 * 24));

    if (outLogs.length >= 2) {
        const first = outLogs[0].timeValue;
        const daysCovered = Math.max(1, (now - first) / (1000 * 60 * 60 * 24));
        const consumedFromLogs = outLogs.reduce((sum, log) => sum + (parseFloat(log.amount) || 0), 0);
        return {
            outCount: outLogs.length,
            totalConsumed,
            perDay: consumedFromLogs / daysCovered,
            confidence: 'good'
        };
    }

    return {
        outCount: outLogs.length,
        totalConsumed,
        perDay: totalConsumed > 0 ? totalConsumed / daysSinceStart : 0,
        confidence: outLogs.length > 0 ? 'low' : 'none'
    };
}

function getWeeksLeft(itemName) {
    const metrics = getUsageMetrics(itemName);
    const stock = getStock(itemName);
    if (stock <= 0) return 0;
    if (metrics.perDay <= 0) return null;
    return stock / (metrics.perDay * 7);
}

function formatWeeksLeft(itemName) {
    const weeksLeft = getWeeksLeft(itemName);
    if (weeksLeft === null) return 'Keine Prognose';
    if (weeksLeft === 0) return 'Leer';
    if (weeksLeft > 52) return '>1 Jahr';
    return `ca. ${weeksLeft.toFixed(1)} Wochen`;
}

function getStockAlerts() {
    const warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;
    const alerts = [];

    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            if (db.alerts && db.alerts.disabled && db.alerts.disabled[item]) continue;

            const stock = db.inventory[cat][item] || 0;
            const threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
            const metrics = getUsageMetrics(item);
            const weeksLeft = getWeeksLeft(item);
            const isUnderThreshold = threshold > 0 && stock <= threshold;
            const isSoonEmpty = weeksLeft !== null && weeksLeft <= warningWeeks;
            const isRelevantEmpty = stock <= 0 && (threshold > 0 || metrics.totalConsumed > 0);

            if (isUnderThreshold || isSoonEmpty || isRelevantEmpty) {
                const alert = { cat, item, stock, threshold, weeksLeft, isUnderThreshold, isSoonEmpty };
                alert.stateKey = getItemAlertStateKey(alert);
                if (db.alerts && db.alerts.dismissed && db.alerts.dismissed[item] === alert.stateKey) continue;
                alerts.push(alert);
            }
        }
    }

    return alerts.sort((a, b) => {
        const aWeeks = a.weeksLeft === null ? 9999 : a.weeksLeft;
        const bWeeks = b.weeksLeft === null ? 9999 : b.weeksLeft;
        return aWeeks - bWeeks;
    });
}

function getItemAlertStateKey(alert) {
    const stockPart = Math.round((alert.stock || 0) * 10) / 10;
    const weekPart = alert.weeksLeft === null ? 'x' : Math.round(alert.weeksLeft * 10) / 10;
    const thresholdPart = alert.threshold || 0;
    return `${stockPart}:${weekPart}:${thresholdPart}:${alert.isUnderThreshold ? 1 : 0}:${alert.isSoonEmpty ? 1 : 0}`;
}

function dismissStockAlert(itemName, stateKey) {
    if (!db.alerts) db.alerts = {};
    if (!db.alerts.dismissed) db.alerts.dismissed = {};
    db.alerts.dismissed[itemName] = stateKey || '';
    if (db.notifications) db.notifications.lastAlertSignature = '';
    saveDB();
    filterLager();
    updateNotificationStatus();
}

function disableStockAlert(itemName) {
    if (!confirm(`Warnmeldungen für ${itemName} deaktivieren?`)) return;
    if (!db.alerts) db.alerts = {};
    if (!db.alerts.disabled) db.alerts.disabled = {};
    db.alerts.disabled[itemName] = true;
    if (db.notifications) db.notifications.lastAlertSignature = '';
    saveDB();
    filterLager();
    updateNotificationStatus();
}

function enableStockAlert(itemName) {
    if (db.alerts && db.alerts.disabled) delete db.alerts.disabled[itemName];
    if (db.alerts && db.alerts.dismissed) delete db.alerts.dismissed[itemName];
    if (db.notifications) db.notifications.lastAlertSignature = '';
    saveDB();
    filterLager();
    updateNotificationStatus();
}

function updateForecastWindow(value) {
    const weeks = parseInt(value, 10);
    if (!isNaN(weeks) && weeks > 0 && weeks <= 52) {
        db.settings.forecastWeeks = weeks;
        saveDB();
        filterLager();
        renderStats();
        checkAndNotifyStockAlerts('manual');
    }
}

function supportsNotifications() {
    return 'Notification' in window;
}

function isIOSSafari() {
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    return { isIOS, isSafari: isIOS && isSafari, isStandalone };
}

function getNotificationPermissionText() {
    if (!supportsNotifications()) return 'Nicht unterstützt';
    if (Notification.permission === 'granted') return 'Erlaubt';
    if (Notification.permission === 'denied') return 'Blockiert';
    return 'Noch nicht gefragt';
}

function updateNotificationStatus() {
    const el = document.getElementById('notification-status');
    const disabledEl = document.getElementById('disabled-alert-products');
    if (!el && !disabledEl) return;

    const enabled = db.notifications && db.notifications.enabled;
    const inAppOnly = db.notifications && db.notifications.inAppOnly;
    const permission = getNotificationPermissionText();
    const alerts = getStockAlerts();
    let detail = enabled ? 'Aktiv' : 'Aus';

    if (enabled && inAppOnly) {
        if (el) el.innerHTML = `Status: Aktiv (In-App) · Aktuelle Warnungen: ${alerts.length}`;
        renderDisabledAlertProducts(disabledEl);
        return;
    }

    if (!supportsNotifications()) {
        if (el) el.innerHTML = 'Benachrichtigungen werden von diesem Browser nicht unterstützt.';
        renderDisabledAlertProducts(disabledEl);
        return;
    }

    if (Notification.permission === 'denied') {
        if (el) el.innerHTML = 'Status: Blockiert. Bitte in den Browser- oder Handy-Einstellungen wieder erlauben.';
        renderDisabledAlertProducts(disabledEl);
        return;
    }

    if (el) el.innerHTML = `Status: ${detail} · Erlaubnis: ${permission} · Aktuelle Warnungen: ${alerts.length}`;
    renderDisabledAlertProducts(disabledEl);
}

function renderDisabledAlertProducts(container) {
    if (!container) return;
    const disabled = Object.keys((db.alerts && db.alerts.disabled) || {});

    if (disabled.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="disabled-alert-title">Deaktivierte Produktwarnungen:</div>
        ${disabled.map(item => `
            <div class="disabled-alert-row">
                <span>${item}</span>
                <button type="button" onclick='enableStockAlert(${jsArg(item)})'>Wieder aktivieren</button>
            </div>
        `).join('')}
    `;
}

async function enableStockNotifications() {
    const ios = isIOSSafari();
    
    // iOS Safari: In-App Benachrichtigungen aktivieren
    if (ios.isIOS && !supportsNotifications()) {
        if (ios.isSafari && !ios.isStandalone) {
            alert("📱 iOS Safari unterstützt keine Push-Benachrichtigungen.\n\nSo geht's:\n1. Tippe auf das Teilen-Symbol (□↑)\n2. Wähle 'Zum Home-Bildschirm'\n3. Öffne die App vom Home-Bildschirm\n\nDann werden Benachrichtigungen unterstützt.\n\nAlternativ: In-App-Warnungen werden automatisch als Toast-Meldungen angezeigt.");
        } else {
            alert("📱 Auf diesem Gerät werden Push-Benachrichtigungen aktiviert, sobald die App offen ist.\nIn-App-Warnungen werden als Toast-Meldungen angezeigt.");
        }
        // Aktiviere In-App Benachrichtigungen als Fallback
        db.notifications.enabled = true;
        db.notifications.inAppOnly = true;
        db.notifications.lastAlertSignature = '';
        db.notifications.lastSentAt = 0;
        saveDB();
        updateNotificationStatus();
        showToast('In-App Benachrichtigungen aktiviert', 'success');
        checkAndNotifyStockAlerts('manual');
        return;
    }

    if (!supportsNotifications()) {
        alert("Dieses Gerät oder dieser Browser unterstützt lokale Benachrichtigungen leider nicht.\n\nIn-App-Warnungen werden als Toast-Meldungen angezeigt.");
        db.notifications.enabled = true;
        db.notifications.inAppOnly = true;
        db.notifications.lastAlertSignature = '';
        saveDB();
        updateNotificationStatus();
        return;
    }

    let permission = Notification.permission;
    if (permission === 'default') {
        permission = await Notification.requestPermission();
    }

    if (permission !== 'granted') {
        db.notifications.enabled = false;
        saveDB();
        updateNotificationStatus();
        alert("Benachrichtigungen wurden nicht erlaubt.");
        return;
    }

    db.notifications.enabled = true;
    db.notifications.inAppOnly = false;
    db.notifications.lastAlertSignature = '';
    db.notifications.lastSentAt = 0;
    saveDB();
    updateNotificationStatus();
    showLocalNotification("OSCI Lager", "Benachrichtigungen sind aktiviert.");
    checkAndNotifyStockAlerts('manual');
}

function getAlertSignature(alerts) {
    return alerts
        .map(alert => `${alert.cat}:${alert.item}:${Math.round(alert.stock * 10) / 10}:${alert.weeksLeft === null ? 'x' : Math.round(alert.weeksLeft * 10) / 10}`)
        .join('|');
}

function buildAlertNotification(alerts) {
    const count = alerts.length;
    const first = alerts[0];
    let body = `${first.item}: ${first.stock.toFixed(1)} ml`;

    if (first.weeksLeft !== null && first.stock > 0) {
        body += `, leer in ca. ${first.weeksLeft.toFixed(1)} Wochen`;
    } else if (first.stock <= 0) {
        body += ', Bestand leer';
    }

    if (count > 1) body += ` · plus ${count - 1} weitere Warnung(en)`;
    return {
        title: `OSCI Lager: ${count} Bestandswarnung${count === 1 ? '' : 'en'}`,
        body
    };
}

async function showLocalNotification(title, body) {
    if (!supportsNotifications() || Notification.permission !== 'granted') return;

    const options = {
        body,
        icon: 'icon.png',
        badge: 'icon.png',
        tag: 'osci-stock-alert',
        renotify: true
    };

    try {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            if (registration && registration.showNotification) {
                registration.showNotification(title, options);
                return;
            }
        }
    } catch (e) {
        console.warn("Service-Worker-Benachrichtigung nicht verfügbar:", e);
    }

    try {
        new Notification(title, options);
    } catch (e) {
        console.warn("Lokale Benachrichtigung nicht verfügbar:", e);
    }
}

function checkAndNotifyStockAlerts(trigger = 'auto') {
    if (!db.notifications || !db.notifications.enabled) return;

    const alerts = getStockAlerts();
    if (alerts.length === 0) {
        db.notifications.lastAlertSignature = '';
        saveDB();
        updateNotificationStatus();
        return;
    }

    const signature = getAlertSignature(alerts);
    const now = Date.now();
    const minimumPauseMs = trigger === 'manual' ? 0 : 1000 * 60 * 60 * 12;
    const alreadySent = db.notifications.lastAlertSignature === signature;
    const recentlySent = now - (db.notifications.lastSentAt || 0) < minimumPauseMs;

    if (alreadySent && recentlySent) {
        updateNotificationStatus();
        return;
    }

    const notification = buildAlertNotification(alerts);
    
    // In-App Fallback (iOS etc.)
    if (db.notifications.inAppOnly || !supportsNotifications() || Notification.permission !== 'granted') {
        showToast(`⚠️ ${notification.title}`, 'warning', 6000);
    } else {
        showLocalNotification(notification.title, notification.body);
    }
    
    db.notifications.lastAlertSignature = signature;
    db.notifications.lastSentAt = now;
    saveDB();
    updateNotificationStatus();
}

function sendTestNotification() {
    if (db.notifications && db.notifications.inAppOnly) {
        showToast('⚠️ OSCI Lager Test: Die In-App Benachrichtigung funktioniert.', 'warning', 4000);
        return;
    }
    
    if (!supportsNotifications()) {
        alert("Dieses Gerät oder dieser Browser unterstützt lokale Benachrichtigungen leider nicht.\n\nIn-App-Warnungen werden als Toast-Meldungen angezeigt.");
        return;
    }

    if (Notification.permission !== 'granted') {
        alert("Bitte Benachrichtigungen zuerst aktivieren.");
        return;
    }

    showLocalNotification("OSCI Lager Test", "Die lokale Benachrichtigung funktioniert.");
}

function renderCustomProductSettings() {
    const categorySelect = document.getElementById('customProductCategory');
    const list = document.getElementById('custom-products-list');

    if (categorySelect) {
        const currentValue = categorySelect.value;
        categorySelect.innerHTML = Object.keys(catalog)
            .map(cat => `<option value="${cat}">${cat}</option>`)
            .join('');
        if (currentValue && catalog[currentValue]) categorySelect.value = currentValue;
    }

    if (!list) return;
    if (!db.customProducts || db.customProducts.length === 0) {
        list.innerHTML = '<p class="hint" style="margin-top: 12px;">Noch keine eigenen Produkte angelegt.</p>';
        return;
    }

    list.innerHTML = db.customProducts.map((product, index) => {
        const unitLabel = product.sizeUnit === 'g' ? 'g' : 'ml';
        const displaySizes = (product.sizesOriginal && product.sizesOriginal.length > 0)
            ? product.sizesOriginal.map(s => s + ' ' + unitLabel).join(', ')
            : (product.sizes || []).map(s => s.toFixed(1) + ' ml').join(', ') || 'keine';
        return `
        <div class="custom-product-row">
            <span>
                <strong>${product.name}</strong>
                <small>${product.cat} · ${displaySizes} · Dichte ${product.density || 1}</small>
            </span>
            <button type="button" onclick="deleteCustomProduct(${index})">Löschen</button>
        </div>
    `;
    }).join('');
}

function addCustomProduct() {
    const nameEl = document.getElementById('customProductName');
    const catEl = document.getElementById('customProductCategory');
    const newCatEl = document.getElementById('customProductNewCategory');
    const sizesEl = document.getElementById('customProductSizes');
    const densityEl = document.getElementById('customProductDensity');
    const sizeUnitEl = document.getElementById('customProductSizeUnit');

    const name = nameEl ? nameEl.value.trim() : '';
    const newCat = newCatEl ? newCatEl.value.trim() : '';
    const cat = newCat || (catEl ? catEl.value : '');
    const sizesRaw = sizesEl ? sizesEl.value : '';
    const sizeUnit = sizeUnitEl ? sizeUnitEl.value : 'ml';
    const sizes = sizesRaw
        .split(',')
        .map(value => parseFloat(value.trim()))
        .filter(value => !isNaN(value) && value > 0);
    const densityRaw = densityEl && densityEl.value ? parseFloat(densityEl.value) : 1;
    const density = (!isNaN(densityRaw) && densityRaw > 0) ? densityRaw : 1;

    if (!name || !cat) {
        alert("Bitte Produktname und Kategorie ausfüllen.");
        return;
    }

    if (catalogHasItem(name) && !(db.customProducts || []).some(product => product.name === name)) {
        alert("Dieses Produkt existiert bereits im Standard-Katalog.");
        return;
    }

    if ((db.customProducts || []).some(product => product.name === name)) {
        alert("Dieses eigene Produkt existiert bereits.");
        return;
    }

    // Convert sizes to ml if entered in grams
    let sizesInMl = sizes;
    if (sizeUnit === 'g') {
        sizesInMl = sizes.map(s => s / density);
    }

    db.customProducts.push({ name, cat, sizes: sizesInMl, sizeUnit, sizesOriginal: sizes, density });
    applyCustomProductsToCatalog();

    if (!db.inventory[cat]) db.inventory[cat] = {};
    db.inventory[cat][name] = db.inventory[cat][name] || 0;
    db.stats[name] = db.stats[name] || 0;
    densityFactors[name] = density;
    saveDB();

    if (nameEl) nameEl.value = '';
    if (newCatEl) newCatEl.value = '';
    if (sizesEl) sizesEl.value = '';
    if (densityEl) densityEl.value = '';

    renderCustomProductSettings();
    renderLager();
    initBulkProductSelect();
    alert("Produkt wurde angelegt.");
}

function deleteCustomProduct(index) {
    const product = db.customProducts && db.customProducts[index];
    if (!product) return;
    if (!confirm(`${product.name} wirklich löschen? Bestehende Lager- und Statistikdaten für dieses Produkt werden entfernt.`)) return;

    db.customProducts.splice(index, 1);
    if (db.inventory[product.cat]) delete db.inventory[product.cat][product.name];
    if (db.stats) delete db.stats[product.name];
    if (db.thresholds) delete db.thresholds[product.name];
    if (db.alerts && db.alerts.dismissed) delete db.alerts.dismissed[product.name];
    if (db.alerts && db.alerts.disabled) delete db.alerts.disabled[product.name];
    delete densityFactors[product.name];
    saveDB();

    window.location.reload();
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
            checkAndNotifyStockAlerts('manual');
        } else {
            alert("Bitte eine gültige Zahl eingeben.");
        }
    }
}

// --- RENDER FUNKTIONEN ---
function renderLager() {
    const container = document.getElementById('lager');
    if (!container) return;

    // Such- und Filterfeld einbauen, falls nicht vorhanden
    if (!document.getElementById('searchInput')) {
        const categoryOptions = Object.keys(catalog)
            .map(cat => `<option value="${cat}">${cat}</option>`)
            .join('');
        container.innerHTML = `
            <div class="lager-toolbar">
                <div class="toolbar-field">
                    <span class="toolbar-icon">🔍</span>
                    <input type="text" id="searchInput" class="search-input" placeholder="Chemikalie suchen..." oninput="filterLager()">
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-field">
                    <span class="toolbar-icon">📂</span>
                    <select id="categoryFilter" class="filter-select" onchange="filterLager()">
                        <option value="all">Alle Kategorien</option>
                        ${categoryOptions}
                    </select>
                </div>
            </div>
            <div id="stock-alerts"></div>
            <div id="lager-container"></div>
        `;
    }
    filterLager();
}

function filterLager() {
    const listContainer = document.getElementById('lager-container');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const alertsContainer = document.getElementById('stock-alerts');
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    renderStockAlerts(alertsContainer);
    
    for (let cat in catalog) {
        if (selectedCategory !== 'all' && selectedCategory !== cat) continue;

        let catHTML = `<h2 class="category-title">${cat}</h2>`;
        let hasItems = false;
        
        for (let item in catalog[cat]) {
            if (item.toLowerCase().includes(term)) {
                hasItems = true;
                let stock = db.inventory[cat][item] || 0;
                let stockG = getGrams(item, stock); // Umrechnung in Gramm
                let threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
                let reachText = formatWeeksLeft(item);
                let metrics = getUsageMetrics(item);
                
                // Warn-Logik
                let weeksLeft = getWeeksLeft(item);
                let warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;
                let alertsDisabled = db.alerts && db.alerts.disabled && db.alerts.disabled[item];
                let warningClass = (!alertsDisabled && ((stock <= threshold && threshold > 0) || (stock <= 0 && metrics.totalConsumed > 0) || (weeksLeft !== null && weeksLeft <= warningWeeks))) ? 'card-warning' : '';
                let thresholdHint = threshold > 0 ? `<span class="item-hint danger-text">Warnschwelle: ${threshold} ml</span>` : '';
                let disabledHint = alertsDisabled ? `<span class="item-hint">Warnmeldungen deaktiviert</span>` : '';
                let prognosisHint = `<span class="item-hint">Reichweite: ${reachText}</span>`;

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
                            <span style="display:flex; align-items:center; gap:8px; min-width:0;">
                                ${warningClass ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--danger);flex-shrink:0;"></span>' : ''}
                                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item}</span>
                                <button class="threshold-btn" onclick='setThreshold(${jsArg(item)})' title="Warnschwelle setzen">🔔</button>
                            </span>
                            <span class="stock" style="display:flex; flex-direction:column; align-items:flex-end;">
                                <span>${stock.toFixed(1)} ml</span>
                                <span style="font-size: 0.7rem; opacity: 0.6; font-weight: normal;">${stockG} g</span>
                            </span>
                        </h4>
                        ${crossHint}
                        ${prognosisHint}
                        ${thresholdHint}
                        ${disabledHint}
                        <div class="btn-group" style="margin-top: 10px;">
                            <button class="btn-in btn-animated" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "in")'>Einlagern</button>
                            <button class="btn-out btn-animated" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "out")'>Auslagern</button>
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

function renderStockAlerts(container) {
    if (!container) return;
    const alerts = getStockAlerts();
    const warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;

    if (alerts.length === 0) {
        container.innerHTML = `
            <div class="alert-summary success">
                Keine kritischen Artikel im gewählten Warnzeitraum von ${warningWeeks} Wochen.
            </div>
        `;
        return;
    }

    const rows = alerts.map(alert => {
        let reason = 'Bestand leer';
        if (alert.isUnderThreshold) reason = `unter Warnschwelle (${alert.threshold} ml)`;
        if (alert.isSoonEmpty && alert.weeksLeft !== null && alert.stock > 0) reason = `leer in ${alert.weeksLeft.toFixed(1)} Wochen`;
        return `
            <div class="alert-row">
                <span><strong>${alert.item}</strong><small>${alert.cat} · ${alert.stock.toFixed(1)} ml</small></span>
                <span class="alert-reason">${reason}</span>
                <div class="alert-actions">
                    <button type="button" onclick='dismissStockAlert(${jsArg(alert.item)}, ${jsArg(alert.stateKey)})'>Quittieren</button>
                    <button type="button" onclick='disableStockAlert(${jsArg(alert.item)})'>Deaktivieren</button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <details class="alert-summary" ${alerts.length <= 3 ? 'open' : ''}>
            <summary class="alert-title">
                <span>Bestandswarnungen (${alerts.length})</span>
                <span class="alert-summary-hint">anzeigen</span>
            </summary>
            ${rows}
        </details>
    `;
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
            
            let currentStock = getStock(item);
            let prognosisText = "";
            let metrics = getUsageMetrics(item);
            let outCount = metrics.outCount;
            
            if (outCount < 2) {
                prognosisText = "Prognose ab 2. Entnahme";
            } else if (metrics.perDay > 0) {
                let weeksLeft = currentStock / (metrics.perDay * 7);
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

function catalogHasItem(itemName) {
    for (let cat in catalog) {
        if (catalog[cat][itemName] !== undefined) return true;
    }
    return false;
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
        let actionText = isOut ? 'Ausgelagert' : 'Eingelagert';
        
        // Umrechnung in Gramm für das Protokoll
        let gAmount = getGrams(log.item, log.amount);
        
        return `
            <div class="log-item ${log.action}" style="border-left: 4px solid ${actionColor};">
                <div>
                    <div class="log-details"><strong>${log.item}</strong></div>
                    <div class="log-date">${new Date(getLogTime(log) || Date.now()).toLocaleString()} | ${actionText}</div>
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
            <select id="unitSelect" onchange="toggleContainerOptions(); updateLiveConversion();" style="width:100%; padding:12px; background:#2c2c2e; color:#fff; border:none; border-radius:10px;">
                <option value="ml">Milliliter (ml)</option>
                <option value="g">Gramm (g)</option>
            </select>
        </div>
        
        <div id="containerSection" style="display:none; margin-top:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px;">
            <label style="display:flex; align-items:center; gap:10px; color:#fff;">
                <input type="checkbox" id="useContainer" onchange="toggleContainerOptions(); updateLiveConversion();" style="width:20px; height:20px; margin:0;"> 
                Behälter-Gewicht (Tara) abziehen
            </label>
            <select id="containerSelect" onchange="updateLiveConversion();" style="display:none; width:100%; padding:12px; background:#1c1c1e; color:#fff; border:1px solid #3a3a3c; border-radius:8px; margin-top:10px;">
                ${Object.keys(containers).map(c => `<option value="${c}">${c} (wiegt ${containers[c]}g)</option>`).join('')}
            </select>
        </div>

        <div class="input-group" style="margin-top:15px;">
            <label>Menge eingeben:</label>
            <input type="number" step="0.01" id="amount" placeholder="Wert eintragen" oninput="updateLiveConversion()" style="width:100%; padding:12px;">
            <div id="liveConversion" style="margin-top: 8px; font-size: 0.9rem; color: var(--secondary); font-weight: 600; text-align: center; height: 1.2rem;"></div>
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

function updateLiveConversion() {
    const amountInput = document.getElementById('amount');
    const liveDiv = document.getElementById('liveConversion');
    if (!amountInput || !liveDiv) return;

    let rawAmount = parseFloat(amountInput.value);
    if (isNaN(rawAmount) || rawAmount <= 0) {
        liveDiv.innerText = '';
        return;
    }

    let unit = document.getElementById('unitSelect').value;
    let factor = densityFactors[currentAction.item] || 1.0;

    if (unit === 'ml') {
        let finalG = rawAmount * factor;
        liveDiv.innerText = `≈ ${finalG.toFixed(1)} g`;
    } else if (unit === 'g') {
        let netG = rawAmount;
        if (document.getElementById('useContainer').checked) {
            let containerWeight = containers[document.getElementById('containerSelect').value];
            netG -= containerWeight;
        }
        if (netG < 0) {
            liveDiv.innerText = `⚠️ Behälter ist schwerer als Eingabe!`;
            liveDiv.style.color = 'var(--danger)';
        } else {
            let finalMl = netG / factor;
            liveDiv.innerText = `≈ ${finalMl.toFixed(1)} ml`;
            liveDiv.style.color = 'var(--secondary)';
        }
    }
}


// Hier wird sichergestellt, dass beim manuellen Öffnen der Einstellungen das Dropdown synchron ist
document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect && db.theme) themeSelect.value = db.theme;
    const forecastSelect = document.getElementById('forecastWeeks');
    if(forecastSelect) forecastSelect.value = String((db.settings && db.settings.forecastWeeks) || 4);
    initBulkProductSelect();
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
                checkAndNotifyStockAlerts();
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
                db.inventory[cat][item] = 0;
                db.stats[item] += stock;
                addLog(cat, item, 'out', stock);
                saveDB();
                closeModal();
                renderLager();
                checkAndNotifyStockAlerts();
            });
            return;
        }
        db.inventory[cat][item] -= finalMl;
        db.stats[item] += finalMl;
        addLog(cat, item, 'out', finalMl);
        saveDB();
        closeModal();
        renderLager();
        checkAndNotifyStockAlerts();
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
            Es fehlen: <span style="color:var(--danger); font-weight:bold;">${missing.toFixed(2)} ml</span><br><br>
            <span style="font-size:0.88rem; color: var(--text-muted);">Wenn du trotzdem fortfährst, wird der gesamte Restbestand (${current.toFixed(2)} ml) ausgelagert. Der Bestand geht <strong>nicht in den Minusbereich</strong>.</span>
        </div>
        <button class="btn-danger btn-animated" id="proceed-conflict-btn">Trotzdem Fortfahren (${current.toFixed(2)} ml auslagern)</button>
    `;
    document.getElementById('proceed-conflict-btn').onclick = proceedCallback;
    document.getElementById('modal').style.display = 'flex';
}

function addLog(cat, item, action, amount) {
    if(!db.logs) db.logs = [];
    const now = Date.now();
    db.logs.push({ cat, item, action, amount, timestamp: now, time: now });
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
        let cat = crOrder[i].cat;
        let currentStock = (db.inventory[cat] && db.inventory[cat][itemName]) || 0;
        
        if (amountMl > 0) {
            let stockWarning = '';
            if (currentStock < amountMl) {
                let missing = (amountMl - currentStock).toFixed(2);
                stockWarning = `<span style="color: var(--danger); font-size: 0.8rem; margin-left: 8px;">⚠️ Fehlt: ${missing} ml (Bestand: ${currentStock.toFixed(1)} ml)</span>`;
            }
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px; flex-wrap: wrap; gap: 4px;">
                    <span style="color: #fff;">${itemName}${stockWarning}</span>
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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeCRPdfText(text) {
    return String(text || '')
        .replace(/\u00a0/g, ' ')
        .replace(/\r/g, '\n')
        .replace(/\b[Il|]ter\s+Ausgleich/gi, '1ter Ausgleich')
        .replace(/\bZter\s+Ausgleich/gi, '2ter Ausgleich')
        .replace(/\bSter\s+Ausgleich/gi, '3ter Ausgleich')
        .replace(/\bAter\s+Ausgleich/gi, '4ter Ausgleich')
        .replace(/\b[oO0]\s*m[l1i]\b/g, '0 ml')
        .replace(/\b[oO0]m[l1i]\b/g, '0 ml')
        .replace(/(\d+(?:[\.,]\d+)?)\s*m[i1]\b/gi, '$1 ml')
        .replace(/(\d+(?:[\.,]\d+)?)ml\b/gi, '$1 ml')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n');
}

function getAdjustmentLabel(number, fallbackIndex) {
    const value = number || fallbackIndex + 1;
    return `${value}. Ausgleich`;
}

function getAliasAmount(blockText, aliases) {
    const sortedAliases = [...aliases].sort((a, b) => b.length - a.length);
    for (let alias of sortedAliases) {
        const aliasPattern = escapeRegExp(alias).replace(/\\ /g, '\\s+');
        const pattern = new RegExp(`(?:^|[^A-Za-z0-9])${aliasPattern}(?:\\s*\\([^\\)]*\\))?\\s*[:=-]?\\s*(-?\\d+(?:[\\.,]\\d+)?)\\s*ml`, 'i');
        const match = blockText.match(pattern);
        if (match) {
            const amount = parseFloat(match[1].replace(',', '.'));
            return isNaN(amount) ? 0 : amount;
        }
    }
    return null;
}

function parseCRAmountToken(token) {
    const normalized = String(token || '')
        .replace(/,/g, '.')
        .replace(/[oO]/g, '0')
        .replace(/[^\d.-]/g, '');
    const amount = parseFloat(normalized);
    return isNaN(amount) ? 0 : amount;
}

function parseCRMeasurementToken(token) {
    const normalized = String(token || '')
        .replace(/,/g, '.')
        .replace(/[oO]/g, '0')
        .replace(/[^\d.-]/g, '');
    const amount = parseFloat(normalized);
    return isNaN(amount) ? null : amount;
}

function normalizeCRHeaderLine(line) {
    return String(line || '')
        .toLowerCase()
        .replace(/[|il]/g, '1')
        .replace(/[o]/g, '0')
        .replace(/[s]/g, '5')
        .replace(/\s+/g, '');
}

function lineLooksLikeCRHeader(line) {
    const normalized = normalizeCRHeaderLine(line);
    const checks = [
        /nac[1l]/.test(normalized),
        /mgc[1l]2/.test(normalized) || /mgc[1l]/.test(normalized),
        /na2[5s]0?4/.test(normalized),
        /mg[5s]0?4/.test(normalized),
        /kc[1l]/.test(normalized),
        /k2[5s]0?4|k2504/.test(normalized),
        /kbr/.test(normalized),
        /src[1l]2/.test(normalized) || /src[1l]/.test(normalized),
        /cac[1l]2/.test(normalized) || /cac[1l]/.test(normalized),
        /naf/.test(normalized),
        /b0r|bor/.test(normalized)
    ];
    return checks.filter(Boolean).length >= 7;
}

function findCRTableHeaderIndex(lines) {
    return lines.findIndex(lineLooksLikeCRHeader);
}

function parseSequentialCRTable(blockText, label) {
    const lines = normalizeCRPdfText(blockText)
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
    let headerIndex = findCRTableHeaderIndex(lines);
    if (headerIndex === -1) {
        headerIndex = lines.findIndex((line, index) => {
            const combined = [line, lines[index + 1], lines[index + 2]].filter(Boolean).join(' ');
            return lineLooksLikeCRHeader(combined);
        });
    }
    if (headerIndex === -1) return null;

    const afterHeader = lines
        .slice(headerIndex + 1)
        .join('\n')
        .split(/\bElement\b|\bVorher\b|\bNachher\b|\d+\s*(?:ter|ten|er|\.|te)?\s*Ausgleich/i)[0];
    const amountMatches = afterHeader.match(/(?:-?\d+(?:[\.,]\d+)?|[oO0])\s*m[l1i]\b/gi) || [];

    if (amountMatches.length < crOrder.length) return null;

    return {
        label,
        entries: crOrder.map((item, index) => ({
            cat: item.cat,
            item: item.name,
            amount: parseCRAmountToken(amountMatches[index])
        }))
    };
}

function parseSequentialCRAmountsWithoutHeader(blockText, label) {
    const beforeElementTable = normalizeCRPdfText(blockText).split(/\bElement\b|\bVorher\b|\bNachher\b/i)[0];
    const amountMatches = beforeElementTable.match(/(?:-?\d+(?:[\.,]\d+)?|[oO0])\s*m[l1i]\b/gi) || [];
    if (amountMatches.length < crOrder.length) return null;

    return {
        label,
        entries: crOrder.map((item, index) => ({
            cat: item.cat,
            item: item.name,
            amount: parseCRAmountToken(amountMatches[index])
        }))
    };
}

function parseCRWaterValues(blockText) {
    const entnahmeMatch = blockText.match(/Wassermenge\s+Entnahme\s*=\s*(\d+(?:[\.,]\d+)?)\s*Liter/i);
    const zugabeMatch = blockText.match(/Reinstwasser\s+Zugabe\s*=\s*(\d+(?:[\.,]\d+)?)\s*Liter/i);
    return {
        entnahme: entnahmeMatch ? parseFloat(entnahmeMatch[1].replace(',', '.')) : null,
        zugabe: zugabeMatch ? parseFloat(zugabeMatch[1].replace(',', '.')) : null
    };
}

function parseCRElementTable(blockText) {
    const lines = normalizeCRPdfText(blockText)
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
    const elementIndex = lines.findIndex(line => {
        const normalized = line.toLowerCase().replace(/\s+/g, '');
        return normalized.includes('element') && normalized.includes('na') && normalized.includes('mg') && normalized.includes('br');
    });
    if (elementIndex === -1) return null;

    const afterHeader = lines
        .slice(elementIndex + 1)
        .join('\n')
        .split(/\d+\s*(?:ter|ten|er|\.|te)?\s*Ausgleich/i)[0]
        .replace(/mg\s*\/\s*[lI1|]?/gi, 'mg/l');
    const rowMatches = [...afterHeader.matchAll(/(?:Vorher|Nachher)\s+([\s\S]*?)(?=(?:Vorher|Nachher)\b|$)/gi)];

    const parseRow = rowText => {
        const withoutUnits = String(rowText || '').replace(/mg\s*\/\s*[lI1|]?/gi, ' ');
        const matches = withoutUnits.match(/-?\d+(?:[\.,]\d+)?/g) || [];
        if (matches.length < crElementOrder.length) return null;
        return crElementOrder.reduce((values, element, index) => {
            values[element] = parseCRMeasurementToken(matches[index]);
            return values;
        }, {});
    };

    let before = null;
    let after = null;
    rowMatches.forEach(match => {
        const label = match[0].trim().toLowerCase().startsWith('vorher') ? 'before' : 'after';
        const values = parseRow(match[1]);
        if (label === 'before') before = values;
        if (label === 'after') after = values;
    });

    if (!before && !after) return null;
    return { before, after };
}

function parseCRAdjustmentBlock(label, blockText) {
    const tableAdjustment = parseSequentialCRTable(blockText, label) || parseSequentialCRAmountsWithoutHeader(blockText, label);
    const water = parseCRWaterValues(blockText);
    const elements = parseCRElementTable(blockText);
    if (tableAdjustment) return { ...tableAdjustment, water, elements };

    const entries = [];
    let matchedByAlias = false;

    crOrder.forEach(item => {
        const amount = getAliasAmount(blockText, crPdfAliases[item.name] || [item.name]);
        if (amount !== null) matchedByAlias = true;
        entries.push({
            cat: item.cat,
            item: item.name,
            amount: amount !== null ? amount : 0
        });
    });

    if (!matchedByAlias) {
        const amountMatches = blockText.match(/-?\d+(?:[\.,]\d+)?\s*ml/gi) || [];
        if (amountMatches.length >= crOrder.length) {
            return {
                label,
                water,
                elements,
                entries: crOrder.map((item, index) => ({
                    cat: item.cat,
                    item: item.name,
                    amount: parseFloat(amountMatches[index].replace(/[^\d,.-]/g, '').replace(',', '.')) || 0
                }))
            };
        }
    }

    return { label, water, elements, entries };
}

function parseCRAdjustmentsFromText(rawText) {
    const text = normalizeCRPdfText(rawText);
    if (!text.trim()) return [];

    const markerRegex = /(?:^|\s)(\d+)\s*(?:ter|ten|er|\.|te)?\s*Ausgleich\s*:*/gi;
    const markers = [];
    let match;
    while ((match = markerRegex.exec(text)) !== null) {
        markers.push({
            number: match[1],
            start: match.index,
            contentStart: markerRegex.lastIndex
        });
    }

    if (markers.length === 0) {
        return [parseCRAdjustmentBlock('Ausgleich', text)].filter(adjustment =>
            adjustment.entries.some(entry => entry.amount > 0)
        );
    }

    return markers.map((marker, index) => {
        const nextMarker = markers[index + 1];
        const block = text.slice(marker.contentStart, nextMarker ? nextMarker.start : text.length);
        return parseCRAdjustmentBlock(getAdjustmentLabel(marker.number, index), block);
    }).filter(adjustment => adjustment.entries.some(entry => entry.amount > 0));
}

function getCRAdjustmentSummary(adjustment) {
    const missing = [];
    let requiredCount = 0;
    let totalRequired = 0;

    adjustment.entries.forEach(entry => {
        if (entry.amount <= 0) return;
        requiredCount++;
        totalRequired += entry.amount;
        const stock = (db.inventory[entry.cat] && db.inventory[entry.cat][entry.item]) || 0;
        if (stock < entry.amount) {
            missing.push({
                item: entry.item,
                amount: entry.amount,
                stock,
                missing: entry.amount - stock
            });
        }
    });

    return { missing, requiredCount, totalRequired };
}

function renderCRWaterInfo(adjustment) {
    if (!adjustment.water || (adjustment.water.entnahme === null && adjustment.water.zugabe === null)) return '';
    const entnahme = adjustment.water.entnahme !== null ? `${adjustment.water.entnahme.toFixed(2)} L` : '-';
    const zugabe = adjustment.water.zugabe !== null ? `${adjustment.water.zugabe.toFixed(2)} L` : '-';
    return `
        <div class="cr-water-info">
            <span>Entnahme: <strong>${entnahme}</strong></span>
            <span>Reinstwasser: <strong>${zugabe}</strong></span>
        </div>
    `;
}

function formatCRMeasurement(value) {
    if (value === null || value === undefined) return '-';
    if (Math.abs(value) >= 100) return value.toFixed(0);
    if (Math.abs(value) >= 10) return value.toFixed(1);
    return value.toFixed(2);
}

function renderCRElementMobileCards(adjustment) {
    if (!adjustment.elements || (!adjustment.elements.before && !adjustment.elements.after)) return '';
    return crElementOrder.map(element => {
        const beforeValue = adjustment.elements.before && adjustment.elements.before[element] !== null && adjustment.elements.before[element] !== undefined
            ? adjustment.elements.before[element]
            : null;
        const afterValue = adjustment.elements.after && adjustment.elements.after[element] !== null && adjustment.elements.after[element] !== undefined
            ? adjustment.elements.after[element]
            : null;
        return `
            <div class="cr-element-mobile-card">
                <strong>${element}</strong>
                <span>Vorher: ${formatCRMeasurement(beforeValue)} mg/l</span>
                <span>Nachher: ${formatCRMeasurement(afterValue)} mg/l</span>
            </div>
        `;
    }).join('');
}

function renderCRMobileElementPanel(adjustment) {
    const cards = renderCRElementMobileCards(adjustment);
    if (!cards) return '';
    return `
        <details class="cr-mobile-values-panel" open>
            <summary>Vorher/Nachher Werte</summary>
            <div class="cr-element-mobile-grid">
                ${cards}
            </div>
        </details>
    `;
}

function renderCRElementValues(adjustment) {
    if (!adjustment.elements || (!adjustment.elements.before && !adjustment.elements.after)) return '';

    const renderCells = values => crElementOrder.map(element => {
        const value = values && values[element] !== null && values[element] !== undefined ? values[element] : null;
        return `<span>${formatCRMeasurement(value)} mg/l</span>`;
    }).join('');

    const headerCells = crElementOrder.map(element => `<span>${element}</span>`).join('');
    return `
        <details class="cr-element-values" open>
            <summary>Vorher/Nachher Werte</summary>
            <div class="cr-element-table">
                <div class="cr-element-grid cr-element-header">
                    <span></span>
                    ${headerCells}
                </div>
                ${adjustment.elements.before ? `
                    <div class="cr-element-grid">
                        <strong>Vorher</strong>
                        ${renderCells(adjustment.elements.before)}
                    </div>
                ` : ''}
                ${adjustment.elements.after ? `
                    <div class="cr-element-grid">
                        <strong>Nachher</strong>
                        ${renderCells(adjustment.elements.after)}
                    </div>
                ` : ''}
            </div>
            <div class="cr-element-mobile-grid">
                ${renderCRElementMobileCards(adjustment)}
            </div>
        </details>
    `;
}

function renderCRPdfAdjustments() {
    const results = document.getElementById('cr-pdf-results');
    const status = document.getElementById('cr-pdf-status');
    if (!results) return;

    if (!crPdfAdjustments || crPdfAdjustments.length === 0) {
        results.innerHTML = '';
        if (status) status.innerText = 'Keine Ausgleiche erkannt. Prüfe, ob die PDF Text enthält oder füge den Text manuell ein.';
        return;
    }

    if (status) status.innerText = `${crPdfAdjustments.length} Ausgleich(e) erkannt.`;

    results.innerHTML = crPdfAdjustments.map((adjustment, index) => {
        const summary = getCRAdjustmentSummary(adjustment);
        const hasMissing = summary.missing.length > 0;
        const rows = adjustment.entries.map(entry => {
            const stock = (db.inventory[entry.cat] && db.inventory[entry.cat][entry.item]) || 0;
            const isNeeded = entry.amount > 0;
            const isMissing = isNeeded && stock < entry.amount;
            const amountG = entry.amount * (densityFactors[entry.item] || 1.0);
            return `
                <div class="cr-adjustment-row ${isMissing ? 'missing' : ''} ${!isNeeded ? 'empty' : ''}">
                    <div>
                        <strong>${escapeHtml(entry.item)}</strong>
                        <small>Bestand: ${stock.toFixed(1)} ml</small>
                    </div>
                    <div class="cr-adjustment-amount">
                        <strong>${entry.amount.toFixed(2)} ml</strong>
                        <small>${amountG.toFixed(2)} g${isMissing ? ` · fehlt ${(entry.amount - stock).toFixed(2)} ml` : ''}</small>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="cr-adjustment-wrap">
                <details class="cr-adjustment-card ${hasMissing ? 'has-missing' : 'is-ready'}">
                    <summary class="cr-adjustment-title">
                        <span>${escapeHtml(adjustment.label)}</span>
                        <span>${hasMissing ? `${summary.missing.length} Mangel` : 'genug Vorrat'}</span>
                    </summary>
                    <div class="cr-adjustment-meta">
                        ${summary.requiredCount} Position(en) · ${summary.totalRequired.toFixed(2)} ml gesamt
                    </div>
                    ${renderCRWaterInfo(adjustment)}
                    <div class="cr-adjustment-list">${rows}</div>
                    ${renderCRElementValues(adjustment)}
                    <button class="${hasMissing ? 'btn-danger' : 'btn-primary'} btn-animated" onclick="exportCRAdjustment(${index})">
                        ${escapeHtml(adjustment.label)} auslagern
                    </button>
                </details>
                ${renderCRMobileElementPanel(adjustment)}
            </div>
        `;
    }).join('');
}

function parseCRPdfText(text) {
    crPdfAdjustments = parseCRAdjustmentsFromText(text);
    renderCRPdfAdjustments();
}

function parseCRPdfTextFromTextarea() {
    const textarea = document.getElementById('cr-pdf-text');
    parseCRPdfText(textarea ? textarea.value : '');
}

function setCRPdfStatus(message) {
    const status = document.getElementById('cr-pdf-status');
    if (status) status.innerText = message;
}

function getExtractedPdfTextScore(text) {
    const normalized = normalizeCRPdfText(text);
    const hasAdjustment = /\d+\s*(?:ter|ten|er|\.|te)?\s*Ausgleich/i.test(normalized);
    const knownTokens = crOrder.reduce((count, entry) => {
        const aliases = crPdfAliases[entry.name] || [entry.name];
        return count + (aliases.some(alias => normalized.toLowerCase().includes(alias.toLowerCase())) ? 1 : 0);
    }, 0);
    const mlCount = (normalized.match(/\d+(?:[\.,]\d+)?\s*ml/gi) || []).length;
    return { hasAdjustment, knownTokens, mlCount };
}

function shouldRunCRPdfOcr(text) {
    const score = getExtractedPdfTextScore(text);
    return !text.trim() || !score.hasAdjustment || score.knownTokens < 5 || score.mlCount < crOrder.length;
}

async function renderPdfPageToCanvas(page, scale = 2.2) {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas;
}

async function extractCRPdfTextWithOcr(pdf) {
    if (!window.Tesseract || !Tesseract.recognize) {
        throw new Error('Tesseract.js ist nicht geladen.');
    }

    const pages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        setCRPdfStatus(`OCR läuft: Seite ${pageNumber} von ${pdf.numPages} ...`);
        const page = await pdf.getPage(pageNumber);
        const canvas = await renderPdfPageToCanvas(page);
        const result = await Tesseract.recognize(canvas, 'deu+eng', {
            logger: progress => {
                if (!progress || progress.status !== 'recognizing text') return;
                const pct = Math.round((progress.progress || 0) * 100);
                setCRPdfStatus(`OCR läuft: Seite ${pageNumber} von ${pdf.numPages} (${pct}%)`);
            }
        });
        pages.push(result && result.data && result.data.text ? result.data.text : '');
        canvas.width = 0;
        canvas.height = 0;
    }
    return pages.join('\n\n');
}

async function importCRPdfFile(file) {
    const status = document.getElementById('cr-pdf-status');
    const textarea = document.getElementById('cr-pdf-text');
    if (!file) return;
    if (!window.pdfjsLib) {
        if (status) status.innerText = 'PDF.js konnte nicht geladen werden. Bitte online öffnen oder PDF-Text einfügen.';
        return;
    }

    try {
        if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        if (status) status.innerText = `Lese "${file.name}" ...`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pages = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            pages.push(pageText);
        }

        let text = pages.join('\n\n');
        let usedOcr = false;

        if (shouldRunCRPdfOcr(text)) {
            setCRPdfStatus('Kein lesbarer PDF-Text gefunden. Starte OCR ...');
            text = await extractCRPdfTextWithOcr(pdf);
            usedOcr = true;
        }

        if (textarea) textarea.value = text;
        parseCRPdfText(text);

        if (crPdfAdjustments.length > 0) {
            setCRPdfStatus(`${crPdfAdjustments.length} Ausgleich(e) erkannt${usedOcr ? ' per OCR' : ''}.`);
        } else if (usedOcr) {
            setCRPdfStatus('OCR abgeschlossen, aber keine Ausgleiche erkannt. Prüfe den erkannten Text im Feld.');
        }
    } catch (error) {
        console.error('PDF Import Fehler:', error);
        if (status) status.innerText = 'PDF konnte nicht gelesen werden. Bitte Text aus der PDF kopieren und einfügen.';
    }
}

function clearCRPdfImport() {
    crPdfAdjustments = [];
    const fileInput = document.getElementById('cr-pdf-file');
    const textarea = document.getElementById('cr-pdf-text');
    const status = document.getElementById('cr-pdf-status');
    const results = document.getElementById('cr-pdf-results');
    if (fileInput) fileInput.value = '';
    if (textarea) textarea.value = '';
    if (status) status.innerText = 'Noch keine PDF geladen.';
    if (results) results.innerHTML = '';
}

function exportCRAdjustment(index) {
    const adjustment = crPdfAdjustments[index];
    if (!adjustment) return;

    const queue = adjustment.entries
        .filter(entry => entry.amount > 0)
        .map(entry => ({ cat: entry.cat, item: entry.item, amount: entry.amount }));

    if (queue.length === 0) return alert('Dieser Ausgleich enthält keine Mengen zum Auslagern.');

    const summary = getCRAdjustmentSummary(adjustment);
    let message = `${adjustment.label} jetzt auslagern?\n\n${queue.length} Position(en), ${summary.totalRequired.toFixed(2)} ml gesamt.`;
    if (summary.missing.length > 0) {
        message += `\n\nAchtung: Bei ${summary.missing.length} Position(en) reicht der Vorrat nicht. Die App fragt beim Auslagern einzeln nach.`;
    }
    if (!confirm(message)) return;

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
        checkAndNotifyStockAlerts();
        return;
    }
    
    let { cat, item, amount } = queue[index];
    let stock = db.inventory[cat][item] || 0;
    
    if (stock - amount < 0) {
        showConflictModal(cat, item, amount, stock, () => {
            db.inventory[cat][item] = 0;
            db.stats[item] += stock;
            addLog(cat, item, 'out', stock);
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
function resetStatsSingle() { if(confirm("Statistiken nullen?")) { for(let i in db.stats) db.stats[i]=0; db.statsStarted=Date.now(); if (db.notifications) db.notifications.lastAlertSignature = ''; saveDB(); renderStats(); updateNotificationStatus(); alert("Statistiken auf 0 gesetzt."); } }
function resetLogsSingle() { if(confirm("Protokoll löschen?")) { db.logs=[]; if (db.notifications) db.notifications.lastAlertSignature = ''; saveDB(); renderLogs(); updateNotificationStatus(); alert("Protokoll gelöscht."); } }
function resetLagerSingle() { if(confirm("Lager nullen?")) { for(let c in db.inventory) for(let i in db.inventory[c]) db.inventory[c][i]=0; if (db.notifications) db.notifications.lastAlertSignature = ''; saveDB(); renderLager(); updateNotificationStatus(); alert("Lager ist leer."); } }

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
            if(parsed.inventory) {
                db = parsed;
                if(!db.logs) db.logs=[];
                if(!db.settings) db.settings = {};
                if(!db.settings.forecastWeeks) db.settings.forecastWeeks = 4;
                if(!db.notifications) db.notifications = { enabled: false, lastAlertSignature: '', lastSentAt: 0 };
                if(!db.alerts) db.alerts = { dismissed: {}, disabled: {} };
                if(!db.alerts.dismissed) db.alerts.dismissed = {};
                if(!db.alerts.disabled) db.alerts.disabled = {};
                if(!db.customProducts) db.customProducts = [];
                if(!db.shopLinks) db.shopLinks = {};
                if(!db.productPresets) db.productPresets = {};
                applyCustomProductsToCatalog();
                saveDB();
                applyTheme(db.theme || 'default', false);
                updateNotificationStatus();
                alert("Backup geladen!");
                showTab('lager');
                checkAndNotifyStockAlerts();
            } 
            else alert("Ungültiges Backup-Format.");
        } catch(err) { alert("Fehler beim Lesen der Datei."); }
    };
    reader.readAsText(file);
}

// --- AMBIENT PARTY MODE ---
function togglePartyMode() { document.body.classList.toggle('party-mode'); }


// --- MASSEN-EINGANG (WARENKORB SYSTEM MIT DYNAMISCHER SCHNELLAUSWAHL) ---
let bulkCart = [];

function initBulkProductSelect() {
    const select = document.getElementById('bulkProductSelect');
    if (!select) return;
    
    select.innerHTML = '';
    
    // Leere Option als Standard
    let defaultOpt = document.createElement('option');
    defaultOpt.value = "";
    defaultOpt.innerText = "-- Produkt wählen --";
    select.appendChild(defaultOpt);
    
    for (let category in catalog) {
        let optGroup = document.createElement('optgroup');
        optGroup.label = category;
        
        for (let item in catalog[category]) {
            let option = document.createElement('option');
            option.value = JSON.stringify({ cat: category, item: item });
            option.innerText = item;
            optGroup.appendChild(option);
        }
        select.appendChild(optGroup);
    }
    
    // Behälter-Dropdown befüllen
    const bulkContainerSelect = document.getElementById('bulkContainerSelect');
    if (bulkContainerSelect && bulkContainerSelect.options.length === 0) {
        for (let c in containers) {
            let opt = document.createElement('option');
            opt.value = c;
            opt.innerText = `${c} (wiegt ${containers[c]}g)`;
            bulkContainerSelect.appendChild(opt);
        }
    }
    
    // Event Listener für automatischen Wechsel der Schnellauswahl-Buttons
    select.onchange = updateBulkQuickButtons;
}

function updateBulkQuickButtons() {
    const select = document.getElementById('bulkProductSelect');
    const container = document.getElementById('bulkQuickButtonsContainer');
    if (!select || !container) return;
    
    container.innerHTML = '';
    if (!select.value) return;
    
    const product = JSON.parse(select.value);
    // Hole die definierten Flaschengrößen direkt aus dem catalog-Objekt
    const sizes = catalog[product.cat][product.item] || [];
    
    if (sizes.length === 0) return;
    
    let label = document.createElement('label');
    label.innerText = "Schnellauswahl Behältergröße:";
    label.style.display = "block";
    label.style.marginBottom = "5px";
    label.style.fontSize = "0.85rem";
    label.style.color = "var(--text-muted)";
    container.appendChild(label);
    
    let btnGroup = document.createElement('div');
    btnGroup.style.display = "flex";
    btnGroup.style.gap = "10px";
    btnGroup.style.flexWrap = "wrap";
    btnGroup.style.marginBottom = "15px";
    
    sizes.forEach(size => {
        let btn = document.createElement('button');
        btn.className = "btn-secondary";
        btn.type = "button";
        btn.style.padding = "8px 12px";
        btn.style.fontSize = "0.85rem";
        btn.style.borderRadius = "8px";
        btn.innerText = `${size} ml`;
        btn.onclick = () => {
            document.getElementById('bulkAmount').value = size;
            document.getElementById('bulkUnitSelect').value = 'ml';
            toggleBulkContainerSection();
        };
        btnGroup.appendChild(btn);
    });
    
    container.appendChild(btnGroup);
}

function toggleBulkContainerSection() {
    const unit = document.getElementById('bulkUnitSelect').value;
    const section = document.getElementById('bulkContainerSection');
    if (!section) return;
    section.style.display = unit === 'g' ? 'block' : 'none';
    if (unit !== 'g') {
        const cb = document.getElementById('bulkUseTara');
        if (cb) cb.checked = false;
        const sel = document.getElementById('bulkContainerSelect');
        if (sel) sel.style.display = 'none';
    }
    updateBulkTaraPreview();
}

function toggleBulkTaraSelect() {
    const isChecked = document.getElementById('bulkUseTara').checked;
    const sel = document.getElementById('bulkContainerSelect');
    if (sel) sel.style.display = isChecked ? 'block' : 'none';
    updateBulkTaraPreview();
}

function updateBulkTaraPreview() {
    const preview = document.getElementById('bulkTaraPreview');
    if (!preview) return;
    const useTaraEl = document.getElementById('bulkUseTara');
    const isChecked = useTaraEl && useTaraEl.checked;
    if (!isChecked) { preview.innerText = ''; return; }
    const selVal = document.getElementById('bulkContainerSelect').value;
    const taraG = containers[selVal];
    if (taraG === undefined) return;
    const amountRaw = parseFloat(document.getElementById('bulkAmount').value);
    if (!isNaN(amountRaw) && amountRaw > 0) {
        const netG = amountRaw - taraG;
        if (netG <= 0) {
            preview.innerHTML = `<span style="color:var(--danger)">⚠️ Tara (${taraG} g) ist größer oder gleich der Eingabe!</span>`;
        } else {
            preview.innerHTML = `Tara: −${taraG} g &rarr; Netto: <strong style="color:var(--success);">${netG.toFixed(1)} g</strong>`;
        }
    } else {
        preview.innerText = `Tara: ${taraG} g werden abgezogen.`;
    }
}

function addToBulkCart() {
    const productDataRaw = document.getElementById('bulkProductSelect').value;
    const unit = document.getElementById('bulkUnitSelect').value;
    const amountRaw = parseFloat(document.getElementById('bulkAmount').value);
    
    if (!productDataRaw || isNaN(amountRaw) || amountRaw <= 0) {
        return alert("Bitte ein Produkt und eine gültige Menge auswählen.");
    }
    
    const product = JSON.parse(productDataRaw);
    let finalMl = amountRaw;
    
    if (unit === 'g') {
        let netG = amountRaw;
        const useTara = document.getElementById('bulkUseTara') && document.getElementById('bulkUseTara').checked;
        if (useTara) {
            const containerVal = document.getElementById('bulkContainerSelect').value;
            const taraG = containers[containerVal] || 0;
            netG -= taraG;
            if (netG <= 0) {
                return alert(`Fehler: Das Behälter-Gewicht (${taraG} g) ist größer oder gleich der eingegebenen Menge. Bitte prüfe die Eingabe.`);
            }
        }
        let factor = densityFactors[product.item] || 1.0;
        finalMl = netG / factor;
    }
    
    let existingIndex = bulkCart.findIndex(c => c.cat === product.cat && c.item === product.item);
    if (existingIndex > -1) {
        bulkCart[existingIndex].ml += finalMl;
    } else {
        bulkCart.push({
            cat: product.cat,
            item: product.item,
            ml: finalMl
        });
    }
    
    document.getElementById('bulkAmount').value = '';
    renderBulkCart();
}

function removeFromBulkCart(index) {
    bulkCart.splice(index, 1);
    renderBulkCart();
}

function renderBulkCart() {
    const listDiv = document.getElementById('bulkCartList');
    const submitBtn = document.getElementById('btnSubmitBulk');
    
    if (bulkCart.length === 0) {
        listDiv.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">Der Warenkorb ist leer.</span>';
        submitBtn.style.display = 'none';
        return;
    }
    
    submitBtn.style.display = 'block';
    listDiv.innerHTML = bulkCart.map((entry, index) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255,255,255,0.03); padding:10px; border-radius:8px; margin-bottom:8px; border: 1px solid var(--border);">
            <div>
                <strong style="color: var(--text);">${entry.item}</strong><br>
                <small style="color: var(--text-muted);">${entry.cat}</small>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
                <span style="color: var(--success); font-weight:600;">+ ${entry.ml.toFixed(1)} ml</span>
                <button onclick="removeFromBulkCart(${index})" style="background:none; color:var(--danger); padding:4px 8px; font-size:1.1rem; border:none; cursor:pointer;">✕</button>
            </div>
        </div>
    `).join('');
}

function submitBulkCart() {
    if (bulkCart.length === 0) return;
    
    if (!confirm(`${bulkCart.length} Positionen jetzt final in das Lager einbuchen?`)) return;
    
    bulkCart.forEach(entry => {
        db.inventory[entry.cat][entry.item] = (db.inventory[entry.cat][entry.item] || 0) + entry.ml;
        addLog(entry.cat, entry.item, 'in', entry.ml);
    });
    
    saveDB();
    bulkCart = [];
    renderBulkCart();
    renderLager();
    checkAndNotifyStockAlerts();
    
    alert("Massen-Wareneingang erfolgreich verbucht!");
    showTab('lager');
}

// --- NACHBESTELLEN & SHOP-LINKS ---

function renderNachbestellen() {
    const container = document.getElementById('nachbestellen-container');
    if (!container) return;

    // Build a combined product list: catalog + custom products
    const allItems = [];
    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            allItems.push({ cat, item, sizes: catalog[cat][item] || [] });
        }
    }

    // Group by category
    const byCat = {};
    allItems.forEach(({ cat, item, sizes }) => {
        const urlMap = getShopUrlMap(item);
        // Include item if it has any URL configured (preset or custom db entry)
        const hasAnyUrl = urlMap && Object.keys(urlMap).length > 0;
        // Also include items that have a custom db entry even if not in preset
        const hasDbEntry = db.shopLinks && db.shopLinks[item] && Object.keys(db.shopLinks[item]).length > 0;
        if (!hasAnyUrl && !hasDbEntry) return;
        if (!byCat[cat]) byCat[cat] = [];
        byCat[cat].push({ item, sizes, urlMap: urlMap || {} });
    });

    let html = '';
    for (let cat in byCat) {
        let catRows = '';
        byCat[cat].forEach(({ item, sizes, urlMap }) => {
            const stock = (db.inventory[cat] && db.inventory[cat][item]) || 0;
            const checkId = 'shopcheck-' + item.replace(/[^a-zA-Z0-9]/g, '');

            // Build size selection buttons — pre-select URL, no direct shop link
            const urlEntries = Object.entries(urlMap);
            const sizeBtns = urlEntries.map(([sizeMl, url], idx) => {
                const s = Number(sizeMl);
                const label = s >= 1000 ? (s / 1000) + ' L' : s + ' ml';
                const isSelected = idx === 0 ? ' selected' : '';
                return `<button type="button" class="size-select-btn${isSelected}" data-url="${url}" data-item="${item}" onclick="selectShopSize(this)">${label}</button>`;
            }).join(' ');
            const defaultUrl = urlEntries.length > 0 ? urlEntries[0][1] : '';
            const warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;
            const weeksLeft = getWeeksLeft(item);
            const threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
            const isLow = (threshold > 0 && stock <= threshold) || (weeksLeft !== null && weeksLeft <= warningWeeks) || stock <= 0;
            const stockColor = isLow ? 'var(--danger)' : 'var(--success)';

            catRows += `
                <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); flex-wrap:wrap;">
                    <input type="checkbox" id="${checkId}" data-item="${item}"
                        data-selected-url="${defaultUrl}"
                        onchange="updateShopCartBtn()" style="width:20px; height:20px; flex-shrink:0; cursor:pointer;">
                    <div style="flex:1; min-width:160px;">
                        <strong style="color:var(--text);">${item}</strong><br>
                        <small style="color:${stockColor};">Bestand: ${stock.toFixed(1)} ml${isLow ? ' ⚠️' : ''}</small>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">${sizeBtns}</div>
                </div>
            `;
        });
        html += `<div style="margin-bottom:20px;"><h3 style="color:var(--secondary); margin-bottom:8px;">${cat}</h3>${catRows}</div>`;
    }

    if (!html) {
        html = '<p class="hint">Keine Shop-Links konfiguriert. Bitte unter Einstellungen &rarr; Shop-Links verwalten die Links einpflegen.</p>';
    }

    container.innerHTML = html;
    updateShopCartBtn();
}

function updateShopCartBtn() {
    const btn = document.getElementById('btnOpenShopCart');
    if (!btn) return;
    const checked = document.querySelectorAll('#nachbestellen-container input[type=checkbox]:checked');
    btn.style.display = checked.length > 0 ? 'inline-block' : 'none';
    btn.innerText = `Alle ${checked.length} markierten im Shop öffnen`;
}

function selectAllShopItems(select) {
    document.querySelectorAll('#nachbestellen-container input[type=checkbox]').forEach(cb => {
        cb.checked = select;
    });
    updateShopCartBtn();
}

function openShopLink(item, sizeMl) {
    const urlMap = getShopUrlMap(item);
    if (!urlMap || !urlMap[sizeMl]) return alert(`Kein Shop-Link für ${item} (${sizeMl} ml) hinterlegt.`);
    window.open(urlMap[sizeMl], '_blank');
}

// Größe auswählen — setzt die URL für das Produkt, ohne den Shop direkt zu öffnen
function selectShopSize(btn) {
    const item = btn.dataset.item;
    const url = btn.dataset.url;
    // Alle Buttons desselben Produkts deselektieren
    document.querySelectorAll(`.size-select-btn[data-item="${item}"]`).forEach(b => b.classList.remove('selected'));
    // Diesen Button selektieren
    btn.classList.add('selected');
    // URL im zugehörigen Checkbox-Datensatz aktualisieren
    const row = btn.closest('div[style*="align-items:center"]');
    if (row) {
        const cb = row.querySelector('input[type=checkbox]');
        if (cb) cb.dataset.selectedUrl = url;
    }
}

function openShopCart() {
    const checked = document.querySelectorAll('#nachbestellen-container input[type=checkbox]:checked');
    if (checked.length === 0) return;

    let urls = [];
    checked.forEach(cb => {
        const selectedUrl = cb.dataset.selectedUrl;
        if (selectedUrl) urls.push(selectedUrl);
    });

    if (urls.length === 0) return;
    if (urls.length > 5) {
        if (!confirm(`Es werden ${urls.length} Browser-Tabs geöffnet. Fortfahren?`)) return;
    }
    urls.forEach(url => window.open(url, '_blank'));
}

// --- SHOP-LINK EINSTELLUNGEN ---

function renderShopLinkSettings() {
    const container = document.getElementById('shop-links-settings-list');
    if (!container) return;

    // Build combined item list: catalog + custom products
    const allItems = [];
    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            allItems.push({ cat, item, sizes: catalog[cat][item] || [] });
        }
    }

    // Group by category
    const byCat = {};
    allItems.forEach(({ cat, item, sizes }) => {
        if (!byCat[cat]) byCat[cat] = [];
        byCat[cat].push({ item, sizes });
    });

    let html = '';
    for (let cat in byCat) {
        html += `<div style="margin-bottom:20px;"><strong style="color:var(--secondary); font-size:0.95rem; display:block; margin-bottom:8px; padding-bottom:4px; border-bottom:1px solid var(--border);">${cat}</strong>`;
        byCat[cat].forEach(({ item, sizes }) => {
            const urlMap = getShopUrlMap(item) || {};
            const dbEntry = (db.shopLinks && db.shopLinks[item]) || {};
            const safeId = item.replace(/[^a-zA-Z0-9]/g, '');

            // Determine which sizes to show: union of catalog sizes + any sizes that have a URL
            const allSizes = new Set([
                ...sizes.map(Number),
                ...Object.keys(urlMap).map(Number),
                ...Object.keys(dbEntry).map(Number)
            ]);
            if (allSizes.size === 0) {
                // No catalog sizes defined — show one free-form row
                allSizes.add('');
            }

            const sizeRows = [...allSizes].sort((a, b) => a - b).map(size => {
                const currentUrl = dbEntry[size] || urlMap[size] || '';
                const label = size >= 1000 ? (size / 1000) + ' L' : size ? size + ' ml' : 'Größe';
                const inputId = `shopurl-${safeId}-${size}`;
                return `
                    <div style="display:flex; align-items:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                        <span style="min-width:50px; font-size:0.8rem; color:var(--text-muted); flex-shrink:0;">${label}</span>
                        <input type="text" id="${inputId}" data-item="${item}" data-size="${size}"
                            value="${currentUrl}" placeholder="https://osci-motion.de/product/..."
                            style="flex:1; min-width:200px; padding:6px 10px; background:#2c2c2e; color:#fff; border:1px solid var(--border); border-radius:8px; font-size:0.8rem;">
                        ${currentUrl ? `<a href="${currentUrl}" target="_blank" rel="noopener" title="Testen" style="color:var(--secondary); font-size:0.9rem; flex-shrink:0;">↗</a>` : ''}
                    </div>`;
            }).join('');

            html += `
                <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04);">
                    <div style="font-size:0.85rem; color:var(--text); font-weight:600; margin-bottom:2px;">${item}</div>
                    ${sizeRows}
                </div>`;
        });
        html += '</div>';
    }

    container.innerHTML = html || '<p class="hint">Keine Produkte im Katalog.</p>';
}

function saveShopLinks() {
    if (!db.shopLinks) db.shopLinks = {};
    document.querySelectorAll('#shop-links-settings-list input[data-item]').forEach(input => {
        const item = input.dataset.item;
        const size = input.dataset.size;
        const val = input.value.trim();
        if (!db.shopLinks[item]) db.shopLinks[item] = {};
        if (val) {
            db.shopLinks[item][size] = val;
        } else {
            delete db.shopLinks[item][size];
        }
        if (Object.keys(db.shopLinks[item]).length === 0) delete db.shopLinks[item];
    });
    saveDB();
    renderShopLinkSettings();
    alert('Shop-Links gespeichert!');
}

function resetShopLinksToPreset() {
    if (!confirm('Alle eigenen Shop-Link-Änderungen zurücksetzen? Das Preset wird wiederhergestellt.')) return;
    db.shopLinks = {};
    saveDB();
    renderShopLinkSettings();
    alert('Preset wiederhergestellt.');
}

// --- PRODUKT-PRESETS ---

function saveProductPreset() {
    const nameEl = document.getElementById('presetNameInput');
    const name = nameEl ? nameEl.value.trim() : '';
    if (!name) return alert('Bitte einen Preset-Namen eingeben.');
    if (!db.customProducts || db.customProducts.length === 0) return alert('Keine eigenen Produkte vorhanden zum Speichern.');

    if (!db.productPresets) db.productPresets = {};
    if (db.productPresets[name]) {
        if (!confirm(`Preset "${name}" existiert bereits. Überschreiben?`)) return;
    }
    db.productPresets[name] = JSON.parse(JSON.stringify(db.customProducts));
    saveDB();
    if (nameEl) nameEl.value = '';
    renderProductPresets();
    alert(`Preset "${name}" mit ${db.customProducts.length} Produkt(en) gespeichert.`);
}

function loadProductPreset(name) {
    const preset = db.productPresets && db.productPresets[name];
    if (!preset) return;
    if (!confirm(`Preset "${name}" laden? Dies überschreibt alle aktuellen eigenen Produkte (${(db.customProducts || []).length} Stk).`)) return;

    // Remove current custom products from catalog
    (db.customProducts || []).forEach(p => {
        if (db.inventory[p.cat]) delete db.inventory[p.cat][p.name];
        delete densityFactors[p.name];
    });

    db.customProducts = JSON.parse(JSON.stringify(preset));
    applyCustomProductsToCatalog();

    // Ensure inventory entries exist
    db.customProducts.forEach(p => {
        if (!db.inventory[p.cat]) db.inventory[p.cat] = {};
        if (db.inventory[p.cat][p.name] === undefined) db.inventory[p.cat][p.name] = 0;
        if (db.stats[p.name] === undefined) db.stats[p.name] = 0;
    });
    saveDB();
    renderCustomProductSettings();
    renderProductPresets();
    renderLager();
    initBulkProductSelect();
    alert(`Preset "${name}" geladen.`);
}

function deleteProductPreset(name) {
    if (name === OSCI_SHOP_PRESET_NAME) return alert('Das Standard-Preset kann nicht gelöscht werden.');
    if (!confirm(`Preset "${name}" wirklich löschen?`)) return;
    if (db.productPresets) delete db.productPresets[name];
    saveDB();
    renderProductPresets();
}

function renderProductPresets() {
    const container = document.getElementById('product-presets-list');
    if (!container) return;

    const presets = db.productPresets || {};
    const names = Object.keys(presets);

    if (names.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine Presets gespeichert.</p>';
        return;
    }

    // Sort: built-in first, then user presets alphabetically
    const sorted = [OSCI_SHOP_PRESET_NAME, ...names.filter(n => n !== OSCI_SHOP_PRESET_NAME).sort()];

    container.innerHTML = sorted.filter(name => presets[name]).map(name => {
        const isBuiltIn = name === OSCI_SHOP_PRESET_NAME;
        const count = (presets[name] || []).length;
        const items = (presets[name] || []).map(p => p.name).join(', ');
        const badge = isBuiltIn
            ? `<span style="font-size:0.7rem; background:rgba(100,210,255,0.15); color:var(--secondary); border:1px solid var(--secondary); border-radius:12px; padding:2px 8px; margin-left:8px; vertical-align:middle;">Standard</span>`
            : '';
        const actionBtn = isBuiltIn
            ? `<button type="button" onclick='loadProductPreset(${jsArg(name)})' class="btn-secondary btn-animated" style="padding:6px 12px; font-size:0.8rem;">Laden</button>`
            : `<button type="button" onclick='loadProductPreset(${jsArg(name)})' class="btn-secondary btn-animated" style="padding:6px 12px; font-size:0.8rem;">Laden</button>
               <button type="button" onclick='deleteProductPreset(${jsArg(name)})' style="background:none; color:var(--danger); border:1px solid var(--danger); border-radius:8px; padding:6px 12px; font-size:0.8rem; cursor:pointer;">Löschen</button>`;

        return `
            <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:10px; background:${isBuiltIn ? 'rgba(100,210,255,0.04)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${isBuiltIn ? 'var(--secondary)' : 'var(--border)'}; border-radius:10px; margin-bottom:8px; flex-wrap:wrap;">
                <div style="flex:1; min-width:0;">
                    <strong style="color:var(--text);">${name}${badge}</strong>
                    <small style="display:block; color:var(--text-muted); margin-top:2px;">${count} Produkt(e): ${items}</small>
                </div>
                <div style="display:flex; gap:8px; flex-shrink:0;">
                    ${actionBtn}
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// 🍞 TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.classList.add('removing'); setTimeout(() => this.parentElement.remove(), 300);">&times;</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==========================================================================
// 📭 EMPTY STATE HELPER
// ==========================================================================
function createEmptyState(icon, title, text) {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">${icon}</div>
            <div class="empty-state-title">${title}</div>
            <div class="empty-state-text">${text}</div>
        </div>
    `;
}

// ==========================================================================
// 💀 SKELETON LOADING HELPER
// ==========================================================================
function createSkeletonCards(count = 3) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `
            <div class="skeleton skeleton-card"></div>
            <div class="skeleton skeleton-line medium"></div>
            <div class="skeleton skeleton-line short"></div>
        `;
    }
    return html;
}

// ==========================================================================
// 🎯 FLOATING ACTION BUTTON (FAB)
// ==========================================================================
let fabOpen = false;
function toggleFab() {
    fabOpen = !fabOpen;
    const menu = document.getElementById('fab-menu');
    const fab = document.getElementById('fab-main');
    if (menu) menu.classList.toggle('open', fabOpen);
    if (fab) fab.style.transform = fabOpen ? 'rotate(45deg)' : '';
}

function fabAddProduct() {
    toggleFab();
    selectTab('einstellungen');
    setTimeout(() => {
        const nameInput = document.getElementById('customProductName');
        if (nameInput) {
            nameInput.focus();
            nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 300);
}

function fabQuickStock() {
    toggleFab();
    selectTab('lager');
    showToast('Schnellbuchung bereit - wähle ein Produkt aus', 'info');
}

function fabExport() {
    toggleFab();
    exportData();
}

// ==========================================================================
// 📊 STATISTIC CHARTS
// ==========================================================================
function renderStatChart(containerId, data) {
    if (!data || data.length === 0) {
        return '<div class="chart-container">' + createEmptyState('📊', 'Keine Daten', 'Noch keine Verbrauchsdaten vorhanden.') + '</div>';
    }
    const maxVal = Math.max(...data.map(d => d.value), 1);
    const bars = data.map(d => {
        const height = (d.value / maxVal) * 100;
        return `
            <div class="chart-bar" style="height: ${height}%;">
                <span class="chart-bar-value">${d.value.toFixed(1)}</span>
                <span class="chart-bar-label">${d.label}</span>
            </div>
        `;
    }).join('');
    return `
        <div class="chart-container">
            <div class="chart-bar-group">${bars}</div>
        </div>
    `;
}

// ==========================================================================
// ↩️ UNDO SYSTEM
// ==========================================================================
let undoStack = [];
function pushUndoAction(action) {
    undoStack.push({ ...action, timestamp: Date.now() });
    if (undoStack.length > 10) undoStack.shift();
}

function showUndoToast(message, undoCallback) {
    const undoId = 'undo-' + Date.now();
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast info';
    toast.id = undoId;
    toast.innerHTML = `
        <span class="toast-icon">↩️</span>
        <span class="toast-message">${message}</span>
        <button onclick="executeUndo(); this.parentElement.classList.add('removing'); setTimeout(() => this.parentElement.remove(), 300);">Rückgängig</button>
    `;
    container.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        const el = document.getElementById(undoId);
        if (el) {
            el.classList.add('removing');
            setTimeout(() => el.remove(), 300);
        }
    }, 5000);
}

function executeUndo() {
    if (undoStack.length === 0) {
        showToast('Nichts zum Rückgängig machen', 'warning');
        return;
    }
    const action = undoStack.pop();
    if (action && action.undo) {
        action.undo();
        showToast('Aktion rückgängig gemacht', 'success');
        renderLager();
    }
}

// ==========================================================================
// ☀️ LIGHT MODE TOGGLE
// ==========================================================================
function toggleLightMode() {
    const isLight = document.body.classList.toggle('theme-light');
    db.lightMode = isLight;
    saveDB();
    showToast(isLight ? 'Light Mode aktiviert' : 'Dark Mode aktiviert', 'info');
}

// ==========================================================================
// 📤 CSV EXPORT
// ==========================================================================
function exportToCSV() {
    let csv = 'Kategorie,Produkt,Bestand,Einheit\n';
    for (let cat in db.inventory) {
        for (let item in db.inventory[cat]) {
            const stock = db.inventory[cat][item];
            csv += `"${cat}","${item}",${stock},ml\n`;
        }
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `osci-motion-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('CSV exportiert!', 'success');
}

// ==========================================================================
// ⌨️ KEYBOARD SHORTCUTS
// ==========================================================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S = Save/Export
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportData();
        showToast('Backup gespeichert', 'success');
    }
    // Ctrl/Cmd + F = Focus Search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        selectTab('lager');
        setTimeout(() => {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.focus();
        }, 200);
    }
    // Number keys 1-8 for tabs (when not in input)
    if (!e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const tabMap = { '1': 'lager', '2': 'cr-export', '3': 'trace-export', '4': 'statistik', '5': 'log', '6': 'masseneingang', '7': 'nachbestellen', '8': 'einstellungen' };
        if (tabMap[e.key]) {
            selectTab(tabMap[e.key]);
        }
    }
    // Ctrl + Z = Undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        // Only if not in an input
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            executeUndo();
        }
    }
});

// APP START
initDB();
renderLager();
updateNotificationStatus();
setTimeout(() => checkAndNotifyStockAlerts('startup'), 1000);

// Initialize Light Mode if saved
if (db.lightMode) {
    document.body.classList.add('theme-light');
}

// Ripple Effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple to all buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn-primary, .btn-secondary');
    if (btn) createRipple(e, btn);
});

// Confetti System
function launchConfetti(count = 50) {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        if (Math.random() > 0.5) {
            piece.style.borderRadius = '50%';
        }
        container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 4000);
}

// Animated Counter
function animateCounter(element, targetValue, duration = 1000) {
    const startValue = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const currentValue = startValue + (targetValue - startValue) * eased;
        element.textContent = currentValue.toFixed(1);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

// Pull to Refresh
let pullStartY = 0;
let pullDistance = 0;
let isPulling = false;

document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
        pullStartY = e.touches[0].clientY;
        isPulling = true;
    }
});

document.addEventListener('touchmove', (e) => {
    if (!isPulling) return;
    pullDistance = e.touches[0].clientY - pullStartY;
    if (pullDistance > 0 && pullDistance < 150) {
        document.body.style.transform = `translateY(${pullDistance * 0.3}px)`;
    }
});

document.addEventListener('touchend', () => {
    if (pullDistance > 80) {
        triggerRefresh();
    }
    document.body.style.transform = '';
    isPulling = false;
    pullDistance = 0;
});

function triggerRefresh() {
    showToast('Aktualisiere...', 'info', 2000);
    hapticFeedback();
    renderLager();
    setTimeout(() => showToast('Aktualisiert!', 'success'), 500);
}

// Swipe Gestures for Tab Navigation
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchStartTime = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartTime = Date.now();
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function getTabLabel(tabId) {
    const btn = document.getElementById('tab-' + tabId);
    return btn ? btn.innerText.trim() : tabId;
}

function showSwipeIndicator(direction, targetTabId) {
    let indicator = document.getElementById('swipe-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'swipe-indicator';
        indicator.className = 'swipe-indicator';
        document.body.appendChild(indicator);
    }

    indicator.className = `swipe-indicator ${direction === 'next' ? 'next' : 'prev'}`;
    indicator.innerHTML = `
        <span class="swipe-indicator-arrow">${direction === 'next' ? '→' : '←'}</span>
        <span>${getTabLabel(targetTabId)}</span>
    `;
    indicator.classList.remove('show');
    indicator.offsetHeight;
    indicator.classList.add('show');
    setTimeout(() => indicator.classList.remove('show'), 700);
}

function handleSwipe() {
    if (window.innerWidth >= 768) return;

    const swipeThreshold = Math.max(120, window.innerWidth * 0.32);
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const elapsed = Date.now() - touchStartTime;
    const isMostlyHorizontal = Math.abs(diffX) > Math.abs(diffY) * 1.8;
    const isIntentional = Math.abs(diffX) >= swipeThreshold && elapsed <= 900;
    
    if (!isMostlyHorizontal || !isIntentional) return;
    
    const tabs = ['lager', 'cr-export', 'trace-export', 'statistik', 'log', 'masseneingang', 'nachbestellen', 'einstellungen'];
    const currentTab = document.querySelector('.tab-content.active')?.id;
    const currentIndex = tabs.indexOf(currentTab);
    
    if (diffX > 0 && currentIndex < tabs.length - 1) {
        // Swipe left = next tab
        const targetTab = tabs[currentIndex + 1];
        showSwipeIndicator('next', targetTab);
        selectTab(targetTab);
        hapticFeedback();
    } else if (diffX < 0 && currentIndex > 0) {
        // Swipe right = previous tab
        const targetTab = tabs[currentIndex - 1];
        showSwipeIndicator('prev', targetTab);
        selectTab(targetTab);
        hapticFeedback();
    }
}

// Haptic Feedback
function hapticFeedback(pattern = [10]) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
    // Visual feedback fallback
    document.body.classList.add('haptic-flash');
    setTimeout(() => document.body.classList.remove('haptic-flash'), 150);
}

// Remember Last Tab on tab change
const originalShowTab = showTab;
showTab = function(tabId) {
    originalShowTab(tabId);
    db.lastTab = tabId;
    saveDB();
};

// Remember Last Tab
if (db.lastTab) {
    setTimeout(() => selectTab(db.lastTab), 100);
}

// Quick Preview Modal
function showQuickPreview(item, category) {
    const stock = (db.inventory[category] && db.inventory[category][item]) || 0;
    const threshold = db.thresholds?.[item] || 0;
    const weeksLeft = getWeeksLeft(item);
    
    let existingBackdrop = document.querySelector('.quick-preview-backdrop');
    let existingPreview = document.querySelector('.quick-preview');
    if (existingBackdrop) existingBackdrop.remove();
    if (existingPreview) existingPreview.remove();
    
    const backdrop = document.createElement('div');
    backdrop.className = 'quick-preview-backdrop';
    backdrop.onclick = () => closeQuickPreview();
    
    const preview = document.createElement('div');
    preview.className = 'quick-preview';
    preview.innerHTML = `
        <div class="quick-preview-header">
            <h3 style="margin:0;">${item}</h3>
            <button class="quick-preview-close" onclick="closeQuickPreview()">&times;</button>
        </div>
        <div style="margin-bottom:16px;">
            <span class="stock" style="font-size:1.2rem;">${stock.toFixed(1)} ml</span>
            <span style="color:var(--text-muted); margin-left:8px;">${category}</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:10px;">
                <div style="font-size:0.75rem; color:var(--text-muted);">Warnschwelle</div>
                <div style="font-size:1.2rem; font-weight:600;">${threshold} ml</div>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:10px;">
                <div style="font-size:0.75rem; color:var(--text-muted);">Reichweite</div>
                <div style="font-size:1.2rem; font-weight:600;">${weeksLeft !== null ? weeksLeft + ' Wochen' : '—'}</div>
            </div>
        </div>
        <div style="margin-top:16px; display:flex; gap:10px;">
            <button class="btn-in btn-animated" style="flex:1;" onclick="closeQuickPreview(); openModalForItem('${item}', '${category}', 'in');">+ Einlagern</button>
            <button class="btn-out btn-animated" style="flex:1;" onclick="closeQuickPreview(); openModalForItem('${item}', '${category}', 'out');">- Auslagern</button>
        </div>
    `;
    
    document.body.appendChild(backdrop);
    document.body.appendChild(preview);
    setTimeout(() => {
        backdrop.classList.add('active');
        preview.classList.add('active');
    }, 10);
    hapticFeedback([5]);
}

function closeQuickPreview() {
    const backdrop = document.querySelector('.quick-preview-backdrop');
    const preview = document.querySelector('.quick-preview');
    if (backdrop) backdrop.classList.remove('active');
    if (preview) preview.classList.remove('active');
    setTimeout(() => {
        if (backdrop) backdrop.remove();
        if (preview) preview.remove();
    }, 300);
}

// Auto-Dark Mode Detection
if (!db.theme || db.theme === 'default') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        if (!db.lightMode) {
            // Optional: auto-enable light mode
            // document.body.classList.add('theme-light');
        }
    }
}
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (db.theme === 'default' && !db.lightMode) {
        // Could auto-switch here
    }
});

// Enhance showToast with confetti on success
const originalShowToast = showToast;
showToast = function(message, type = 'info', duration = 4000) {
    originalShowToast(message, type, duration);
    if (type === 'success' && message.includes('erfolgreich')) {
        launchConfetti(30);
        hapticFeedback([10, 50, 10]);
    }
};

console.log('✨ Premium Features loaded: Confetti, Swipe, Haptic, Ripple');
