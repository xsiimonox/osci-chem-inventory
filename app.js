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

const macroRecipes = {
    'KH-Tag': [
        { label: 'Osmosewasser (RO-Wasser)', amount: 977, unit: 'ml', stock: false },
        { item: 'Natriumhydrogencarbonat', amount: 60.4, unit: 'g' },
        { item: 'Natriumcarbonat', amount: 57, unit: 'g' }
    ],
    'KH-Nacht': [
        { label: 'Osmosewasser (RO-Wasser)', amount: 972.8, unit: 'ml', stock: false },
        { item: 'Natriumcarbonat', amount: 189.0, unit: 'g' }
    ],
    'Calcium': [
        { label: 'Osmosewasser (RO-Wasser)', amount: 384.7, unit: 'ml', stock: false },
        { item: 'Calciumchlorid (CaCl2)', amount: 496.3, unit: 'ml' },
        { item: 'Strontiumchlorid (SrCl2)', amount: 19, unit: 'ml' },
        { item: 'Bor (B)', amount: 100, unit: 'ml' }
    ],
    'Magnesium': [
        { label: 'Osmosewasser (RO-Wasser)', amount: 582.1, unit: 'ml', stock: false },
        { item: 'Magnesiumsulfat (MgSO4)', amount: 228, unit: 'ml' },
        { item: 'Magnesiumchlorid (MgCl2)', amount: 99.5, unit: 'ml' },
        { item: 'Kaliumbromid (KBr)', amount: 10.4, unit: 'ml' },
        { item: 'Kaliumsulfat (K2SO4)', amount: 80, unit: 'ml' }
    ]
};

const seaWaterRecipePer100L = [
    { label: 'Osmosewasser', amount: 86952.2, unit: 'ml', stock: false },
    { item: 'Natriumchlorid (NaCl)', amount: 8998.7, unit: 'ml' },
    { item: 'Magnesiumsulfat (MgSO4)', amount: 1164.4, unit: 'ml' },
    { item: 'Magnesiumchlorid (MgCl2)', amount: 737.8, unit: 'ml' },
    { item: 'Kaliumsulfat (K2SO4)', amount: 929.3, unit: 'ml' },
    { item: 'Kaliumbromid (KBr)', amount: 68.0, unit: 'ml' },
    { item: 'Strontiumchlorid (SrCl2)', amount: 8.2, unit: 'ml' },
    { item: 'Calciumchlorid (CaCl2)', amount: 212.5, unit: 'ml' },
    { item: 'Natriumfluorid (NaF)', amount: 28.9, unit: 'ml' },
    { item: 'Bor (B)', amount: 900.0, unit: 'ml' },
    { item: 'KH Tag', amount: 140.0, unit: 'ml' }
];

const nutritionDoseRules = {
    Nitrat: {
        action: 'erhöht',
        targetLabel: 'NO3 erhöhen um (mg/l):',
        primary: 'Nitrat (NO3)',
        mlPer100L: 1,
        primaryChange: 1.1,
        product: 'Stickstoff (N)'
    },
    Phosphat: {
        action: 'erhöht',
        targetLabel: 'PO4 erhöhen um (mg/l):',
        primary: 'Phosphat (PO4)',
        mlPer100L: 1,
        primaryChange: 0.1,
        product: 'Phosphor (P)'
    },
    Lanthan: {
        action: 'senkt',
        targetLabel: 'PO4 senken um (mg/l):',
        primary: 'Phosphat (PO4)',
        mlPer100L: 1,
        primaryChange: 0.1,
        product: 'Lanthan (La)'
    }
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

const BASE_CATALOG = JSON.parse(JSON.stringify(catalog));
const BASE_DENSITY_FACTORS = { ...densityFactors };
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
const SYNC_SETTINGS_KEY = 'osci_supabase_sync_v1';
const LAST_TAB_KEY = 'osci_last_active_tab';
const DEFAULT_SUPABASE_URL = 'https://ymeszigbnoaoqkwxcbqo.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_4LQDgitTmZeu9tO2Mh8Hew_-EseNuP0';
let appState = null;
let activeWarehouseId = 'main';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now(), theme: 'default' };
let currentAction = {};
let crPdfAdjustments = [];
let supabaseClientPromise = null;
let supabaseClientInstance = null;
let syncPushTimer = null;
let syncIsPulling = false;
const APP_TAB_IDS = ['lager', 'cr-export', 'trace-export', 'statistik', 'log', 'masseneingang', 'nachbestellen', 'tools', 'logbuch', 'einstellungen'];

// --- INITIALISIERUNG ---
function resetCatalogToBase() {
    Object.keys(catalog).forEach(cat => delete catalog[cat]);
    Object.assign(catalog, JSON.parse(JSON.stringify(BASE_CATALOG)));
    Object.keys(densityFactors).forEach(item => delete densityFactors[item]);
    Object.assign(densityFactors, BASE_DENSITY_FACTORS);
}

function createWarehouseId() {
    return 'lager-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}

function createWarehouseData(source = {}) {
    return {
        inventory: source.inventory || {},
        stats: source.stats || {},
        logs: source.logs || [],
        statsStarted: source.statsStarted || Date.now(),
        theme: source.theme || (db && db.theme) || 'default',
        thresholds: source.thresholds || {},
        settings: source.settings || { forecastWeeks: 4 },
        notifications: source.notifications || { enabled: false, lastAlertSignature: '', lastSentAt: 0 },
        alerts: source.alerts || { dismissed: {}, disabled: {} },
        customProducts: source.customProducts || [],
        customContainers: source.customContainers || {},
        hiddenProducts: source.hiddenProducts || {},
        shopLinks: source.shopLinks || {},
        productPresets: source.productPresets || {},
        crSeaWaterPresets: source.crSeaWaterPresets || {},
        favoriteProducts: source.favoriteProducts || {},
        implementationLog: source.implementationLog || source.dosePlanArchive || [],
        logBookCategories: source.logBookCategories || ['Technik', 'Wartung', 'Versorgung', 'Nährstoffkontrolle', 'Wasserwechsel', 'Korallenbesatz', 'Fischbesatz', 'Sonstiges'],
        logBookEntries: source.logBookEntries || [],
        aquariumTodos: source.aquariumTodos || [],
        feedNutrientLog: source.feedNutrientLog || [],
        osmoseTank: source.osmoseTank || { capacityLiters: 50, currentLiters: 50, warnDays: 2, usageLog: [], lastAlertSignature: '', lastAlertAt: 0 },
        traceDraft: source.traceDraft || {},
        testCorrections: source.testCorrections || {},
        majorCorrectionSettings: source.majorCorrectionSettings || { tankLiters: 100, strengths: { KH: 0.05, Ca: 1 } },
        psuCorrectionOffset: source.psuCorrectionOffset || 0,
        warehouseEvents: source.warehouseEvents || [],
        localUpdatedAt: source.localUpdatedAt || null
    };
}

function createWarehouseRecord(name, data = {}) {
    return {
        id: createWarehouseId(),
        name: name || 'Neues Lager',
        createdAt: new Date().toISOString(),
        lastImportAt: null,
        lastExportAt: null,
        data: createWarehouseData(data)
    };
}

function migrateToWarehouseState(parsed) {
    if (parsed && parsed.warehouses && typeof parsed.warehouses === 'object') {
        return parsed;
    }

    const record = {
        id: 'main',
        name: 'Hauptlager',
        createdAt: new Date().toISOString(),
        lastImportAt: null,
        lastExportAt: null,
        data: createWarehouseData(parsed || {})
    };

    return {
        version: 1,
        activeWarehouseId: 'main',
        pendingDeletedRemoteIds: [],
        warehouses: { main: record }
    };
}

function getActiveWarehouse() {
    if (!appState || !appState.warehouses) return null;
    return appState.warehouses[activeWarehouseId] || Object.values(appState.warehouses)[0] || null;
}

function normalizeWarehouseData(data) {
    db = createWarehouseData(data || {});
    if (!db.settings.forecastWeeks) db.settings.forecastWeeks = 4;
    if (!db.notifications) db.notifications = { enabled: false, lastAlertSignature: '', lastSentAt: 0 };
    if (db.notifications.enabled === undefined) db.notifications.enabled = false;
    if (!db.notifications.lastAlertSignature) db.notifications.lastAlertSignature = '';
    if (!db.notifications.lastSentAt) db.notifications.lastSentAt = 0;
    if (!db.alerts) db.alerts = {};
    if (!db.alerts.dismissed) db.alerts.dismissed = {};
    if (!db.alerts.disabled) db.alerts.disabled = {};
    if (!db.customProducts) db.customProducts = [];
    if (!db.customContainers) db.customContainers = {};
    if (!db.hiddenProducts) db.hiddenProducts = {};
    if (!db.shopLinks) db.shopLinks = {};
    if (!db.productPresets) db.productPresets = {};
    if (!db.crSeaWaterPresets) db.crSeaWaterPresets = {};
    if (!db.favoriteProducts) db.favoriteProducts = {};
    if (!db.implementationLog) db.implementationLog = db.dosePlanArchive || [];
    if (!db.logBookCategories) db.logBookCategories = ['Technik', 'Wartung', 'Versorgung', 'Nährstoffkontrolle', 'Wasserwechsel', 'Korallenbesatz', 'Fischbesatz', 'Sonstiges'];
    if (!db.logBookEntries) db.logBookEntries = [];
    if (!db.aquariumTodos) db.aquariumTodos = [];
    if (!db.feedNutrientLog) db.feedNutrientLog = [];
    if (!db.osmoseTank) db.osmoseTank = { capacityLiters: 50, currentLiters: 50, warnDays: 2, usageLog: [], lastAlertSignature: '', lastAlertAt: 0 };
    if (!db.osmoseTank.usageLog) db.osmoseTank.usageLog = [];
    if (!db.traceDraft) db.traceDraft = {};
    if (!db.testCorrections) db.testCorrections = {};
    if (!db.majorCorrectionSettings) db.majorCorrectionSettings = { tankLiters: 100, strengths: { KH: 0.05, Ca: 1 } };
    if (!db.majorCorrectionSettings.strengths) db.majorCorrectionSettings.strengths = { KH: 0.05, Ca: 1 };
    if (db.majorCorrectionSettings.strengths.KH === undefined) db.majorCorrectionSettings.strengths.KH = 0.05;
    if (db.majorCorrectionSettings.strengths.Ca === undefined) db.majorCorrectionSettings.strengths.Ca = 1;
    if (!db.majorCorrectionSettings.tankLiters) db.majorCorrectionSettings.tankLiters = 100;
    if (db.psuCorrectionOffset === undefined) db.psuCorrectionOffset = 0;
    if (db.implementationLogMigrated === undefined) db.implementationLogMigrated = true;
    if (!db.warehouseEvents) db.warehouseEvents = [];
    db.productPresets[OSCI_SHOP_PRESET_NAME] = OSCI_SHOP_PRESET_PRODUCTS;

    resetCatalogToBase();
    applyCustomProductsToCatalog();

    for (let cat in catalog) {
        if (!db.inventory[cat]) db.inventory[cat] = {};
        for (let item in catalog[cat]) {
            if (db.inventory[cat][item] === undefined) db.inventory[cat][item] = 0;
            if (db.stats[item] === undefined) db.stats[item] = 0;
        }
    }

    return db;
}

function applyCustomProductsToCatalog() {
    if (!db.customProducts) db.customProducts = [];

    db.customProducts.forEach(product => {
        if (!product || !product.name || !product.cat) return;
        if (!catalog[product.cat]) catalog[product.cat] = {};
        const productSizes = product.sizeUnit === 'ml'
            ? product.sizes
            : (product.sizesOriginal && product.sizesOriginal.length > 0 ? product.sizesOriginal : product.sizes);
        catalog[product.cat][product.name] = Array.isArray(productSizes) ? productSizes : [];

        const density = parseFloat(product.density);
        if (!isNaN(density) && density > 0) densityFactors[product.name] = density;
    });
}

function initDB() {
    let parsed = null;
    try {
        let saved = localStorage.getItem(DB_KEY);
        if (!saved) saved = localStorage.getItem('osci_db_v4');
        if (!saved) saved = localStorage.getItem('osci_db_v3');
        if (saved) {
            parsed = JSON.parse(saved);
        }
    } catch (e) { console.error("Fehler beim Laden:", e); }

    appState = migrateToWarehouseState(parsed);
    if (!Array.isArray(appState.pendingDeletedRemoteIds)) appState.pendingDeletedRemoteIds = [];
    if (!appState.hiddenSharedOwners || typeof appState.hiddenSharedOwners !== 'object') appState.hiddenSharedOwners = {};
    if (!appState.knownSharedOwners || typeof appState.knownSharedOwners !== 'object') appState.knownSharedOwners = {};
    if (!appState.warehouses || Object.keys(appState.warehouses).length === 0) {
        const record = createWarehouseRecord('Hauptlager');
        record.id = 'main';
        appState.warehouses = { main: record };
    }

    Object.entries(appState.warehouses).forEach(([id, warehouse]) => {
        warehouse.id = id;
        if (!warehouse.name) warehouse.name = 'Lager';
        if (!warehouse.createdAt) warehouse.createdAt = new Date().toISOString();
        if (warehouse.lastImportAt === undefined) warehouse.lastImportAt = null;
        if (warehouse.lastExportAt === undefined) warehouse.lastExportAt = null;
        if (!warehouse.data) warehouse.data = createWarehouseData();
    });

    activeWarehouseId = appState.activeWarehouseId || Object.keys(appState.warehouses)[0];
    if (!appState.warehouses[activeWarehouseId]) activeWarehouseId = Object.keys(appState.warehouses)[0];
    appState.activeWarehouseId = activeWarehouseId;

    const warehouse = getActiveWarehouse();
    warehouse.data = normalizeWarehouseData(warehouse.data);
    
    // Geladenes Design direkt beim Start anwenden
    applyTheme(db.theme, false);
    saveDB(false);
    updateWarehouseUI();
}

function saveDB(markDirty = true) {
    try {
        if (!appState) appState = migrateToWarehouseState(db);
        const warehouse = getActiveWarehouse();
        if (warehouse) {
            if (markDirty) db.localUpdatedAt = new Date().toISOString();
            warehouse.data = db;
            warehouse.localUpdatedAt = db.localUpdatedAt;
        }
        appState.activeWarehouseId = activeWarehouseId;
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        updateWarehouseUI();
        scheduleSupabaseAutoSync();
    } catch(e) {}
}

function addWarehouseEvent(type, text, meta = {}) {
    if (!db.warehouseEvents) db.warehouseEvents = [];
    db.warehouseEvents.unshift({
        type,
        text,
        meta,
        at: new Date().toISOString()
    });
    db.warehouseEvents = db.warehouseEvents.slice(0, 120);
}

function addImplementationLogEntry(type, name, amount, note = '') {
    if (!db.implementationLog) db.implementationLog = [];
    db.implementationLog.unshift({
        type,
        name,
        amount,
        note,
        at: new Date().toISOString()
    });
    db.implementationLog = db.implementationLog.slice(0, 120);
    addWarehouseEvent('doku', `${type}: ${name} umgesetzt`, { amount, note });
    saveDB();
    renderImplementationLog();
}

function isSharedOwnerHidden(email) {
    return Boolean(email && appState && appState.hiddenSharedOwners && appState.hiddenSharedOwners[email]);
}

function setSharedOwnerHidden(email, hidden) {
    if (!email) return;
    if (!appState.hiddenSharedOwners) appState.hiddenSharedOwners = {};
    if (!appState.knownSharedOwners) appState.knownSharedOwners = {};
    appState.knownSharedOwners[email] = true;
    if (hidden) appState.hiddenSharedOwners[email] = true;
    else delete appState.hiddenSharedOwners[email];
    if (hidden && appState.warehouses) {
        Object.values(appState.warehouses).forEach(warehouse => {
            if (warehouse.ownerEmail === email && (warehouse.isShared || warehouse.readOnly)) {
                delete appState.warehouses[warehouse.id];
            }
        });
        if (!appState.warehouses[activeWarehouseId]) {
            activeWarehouseId = Object.keys(appState.warehouses)[0] || 'main';
            appState.activeWarehouseId = activeWarehouseId;
            const active = getActiveWarehouse();
            if (active) db = normalizeWarehouseData(active.data);
        }
    }
    localStorage.setItem(DB_KEY, JSON.stringify(appState));
    updateWarehouseUI();
    renderCurrentWarehouseViews();
    renderSharedOwnerVisibilitySettings();
}

function getSupabaseSettings() {
    try {
        const parsed = JSON.parse(localStorage.getItem(SYNC_SETTINGS_KEY) || '{}');
        const hasAutoSyncSetting = Object.prototype.hasOwnProperty.call(parsed, 'autoSync');
        return {
            url: normalizeSupabaseProjectUrl(parsed.url || DEFAULT_SUPABASE_URL),
            anonKey: parsed.anonKey || DEFAULT_SUPABASE_ANON_KEY,
            autoSync: hasAutoSyncSetting ? parsed.autoSync === true : true
        };
    } catch (e) {
        return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON_KEY, autoSync: true };
    }
}

function storeSupabaseSettings(settings) {
    localStorage.setItem(SYNC_SETTINGS_KEY, JSON.stringify({
        url: normalizeSupabaseProjectUrl(settings.url || DEFAULT_SUPABASE_URL),
        anonKey: settings.anonKey || '',
        autoSync: settings.autoSync === true
    }));
}

function normalizeSupabaseProjectUrl(value) {
    return String(value || '')
        .trim()
        .replace(/\/rest\/v1\/?$/i, '')
        .replace(/\/+$/, '');
}

function updateSyncStatus(message, type = 'info') {
    const el = document.getElementById('supabase-sync-status');
    if (!el) return;
    el.innerText = message;
    el.dataset.type = type;
}

function updateAuthState(user) {
    const el = document.getElementById('supabase-auth-state');
    const activationNote = document.querySelector('.sync-activation-note');
    if (!el) return;
    if (user && user.email) {
        el.innerText = `Eingeloggt als ${user.email}`;
        el.dataset.state = 'in';
        if (activationNote) activationNote.style.display = 'none';
    } else {
        el.innerText = 'Ausgeloggt';
        el.dataset.state = 'out';
        if (activationNote) activationNote.style.display = '';
    }
}

function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    if (button) button.innerText = visible ? 'Anzeigen' : 'Verbergen';
}

async function loadSupabaseClient() {
    if (!supabaseClientPromise) {
        supabaseClientPromise = import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    }
    return supabaseClientPromise;
}

async function getSupabaseClient() {
    const settings = getSupabaseSettings();
    if (!settings.url || !settings.anonKey) {
        throw new Error('Bitte Supabase URL und anon public key speichern.');
    }
    if (supabaseClientInstance) return supabaseClientInstance;
    const { createClient } = await loadSupabaseClient();
    supabaseClientInstance = createClient(settings.url, settings.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true }
    });
    return supabaseClientInstance;
}

async function getSupabaseUser() {
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.getUser();
    if (error) {
        const message = String(error.message || '').toLowerCase();
        if (message.includes('auth session missing') || message.includes('session missing')) {
            return { client, user: null };
        }
        throw error;
    }
    return { client, user: data && data.user ? data.user : null };
}

function getSyncReadyLabel(settings) {
    if (!settings.url || !settings.anonKey) return 'Nicht verbunden: Supabase URL und anon public key fehlen.';
    return settings.autoSync ? 'Supabase bereit · Auto-Sync aktiv' : 'Supabase bereit · Auto-Sync aus';
}

async function renderSupabaseSyncSettings() {
    const settings = getSupabaseSettings();
    const autoEl = document.getElementById('supabaseAutoSync');
    const autoRow = document.getElementById('syncAutoRow');
    if (autoEl) autoEl.checked = settings.autoSync;
    if (autoRow) autoRow.classList.toggle('sync-auto-active', settings.autoSync);

    updateSyncStatus(getSyncReadyLabel(settings), settings.url && settings.anonKey ? 'ok' : 'warn');

    if (settings.url && settings.anonKey) {
        try {
            const { user } = await getSupabaseUser();
            updateAuthState(user);
            if (user) updateSyncStatus(getSyncReadyLabel(settings), 'ok');
            else updateSyncStatus(`${getSyncReadyLabel(settings)} · Bitte einloggen.`, 'warn');
            renderSyncFriendsList();
        } catch (err) {
            updateAuthState(null);
            updateSyncStatus(`Supabase nicht erreichbar: ${err.message}`, 'warn');
        }
    }
}

function saveSupabaseSettings() {
    const existing = getSupabaseSettings();
    const url = existing.url || DEFAULT_SUPABASE_URL;
    const anonKey = existing.anonKey || DEFAULT_SUPABASE_ANON_KEY;
    const autoSync = existing.autoSync === true;
    storeSupabaseSettings({ url, anonKey, autoSync });
    supabaseClientPromise = null;
    supabaseClientInstance = null;
    updateSyncStatus(getSyncReadyLabel({ url, anonKey, autoSync }), url && anonKey ? 'ok' : 'warn');
    if (autoSync) scheduleSupabaseAutoSync();
}

function toggleSupabaseAutoSync(enabled) {
    const settings = getSupabaseSettings();
    storeSupabaseSettings({ ...settings, autoSync: enabled === true });
    const autoRow = document.getElementById('syncAutoRow');
    if (autoRow) autoRow.classList.toggle('sync-auto-active', enabled === true);
    updateSyncStatus(enabled ? 'Auto-Sync aktiviert.' : 'Auto-Sync deaktiviert.', enabled ? 'ok' : 'info');
    if (enabled) scheduleSupabaseAutoSync();
}

async function supabaseSignUp() {
    try {
        saveSupabaseSettings();
        const client = await getSupabaseClient();
        const email = (document.getElementById('supabaseEmail')?.value || '').trim();
        const password = document.getElementById('supabasePassword')?.value || '';
        if (!email || !password) return alert('Bitte E-Mail und Passwort eintragen.');
        const { data, error } = await client.auth.signUp({ email, password });
        if (error) throw error;
        if (data && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            updateSyncStatus('Diese E-Mail ist vermutlich bereits registriert. Bitte einloggen oder Passwort zurücksetzen.', 'warn');
            return;
        }
        updateSyncStatus('Registrierung erstellt. Bitte Account über die Bestätigungs-Mail aktivieren. Schau auch im Spam-Ordner nach.', 'ok');
    } catch (err) {
        const msg = String(err.message || '');
        if (/already|registered|exists/i.test(msg)) {
            updateSyncStatus('Diese E-Mail ist bereits registriert. Bitte einloggen oder Passwort zurücksetzen.', 'warn');
            return;
        }
        alert('Registrierung fehlgeschlagen: ' + err.message);
    }
}

async function supabaseSignIn() {
    try {
        saveSupabaseSettings();
        const client = await getSupabaseClient();
        const email = (document.getElementById('supabaseEmail')?.value || '').trim();
        const password = document.getElementById('supabasePassword')?.value || '';
        if (!email || !password) return alert('Bitte E-Mail und Passwort eintragen.');
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        updateAuthState({ email });
        updateSyncStatus(`Eingeloggt.`, 'ok');
        await syncPullWarehouses(false);
    } catch (err) {
        alert('Login fehlgeschlagen: ' + err.message);
    }
}

async function supabaseSignOut() {
    try {
        const client = await getSupabaseClient();
        await client.auth.signOut();
        updateAuthState(null);
        updateSyncStatus('Ausgeloggt. Lokale Daten bleiben auf diesem Gerät erhalten.', 'info');
    } catch (err) {
        alert('Logout fehlgeschlagen: ' + err.message);
    }
}

async function supabaseResetPassword() {
    try {
        saveSupabaseSettings();
        const client = await getSupabaseClient();
        const email = (document.getElementById('supabaseEmail')?.value || '').trim();
        if (!email) return alert('Bitte E-Mail eintragen.');
        const redirectTo = window.location.origin && window.location.origin !== 'null'
            ? `${window.location.origin}${window.location.pathname}`
            : window.location.href.split('#')[0];
        const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) throw error;
        updateSyncStatus('Passwort-Reset-Mail wurde gesendet. Bitte E-Mail öffnen und dem Link folgen.', 'ok');
    } catch (err) {
        alert('Passwort-Reset fehlgeschlagen: ' + err.message);
    }
}

async function supabaseUpdatePassword() {
    try {
        const password = document.getElementById('newSupabasePassword')?.value || '';
        if (password.length < 6) return alert('Das neue Passwort muss mindestens 6 Zeichen haben.');
        const client = await getSupabaseClient();
        const { error } = await client.auth.updateUser({ password });
        if (error) throw error;
        document.getElementById('newSupabasePassword').value = '';
        const box = document.getElementById('passwordRecoveryBox');
        if (box) box.style.display = 'none';
        updateSyncStatus('Passwort wurde gespeichert. Du kannst dich jetzt einloggen.', 'ok');
    } catch (err) {
        alert('Passwort konnte nicht gespeichert werden: ' + err.message);
    }
}

async function detectSupabasePasswordRecovery() {
    try {
        const client = await getSupabaseClient();
        client.auth.onAuthStateChange((event) => {
            const box = document.getElementById('passwordRecoveryBox');
            if (event === 'PASSWORD_RECOVERY' && box) {
                box.style.display = 'block';
                updateSyncStatus('Passwort-Zurücksetzung erkannt. Bitte neues Passwort speichern.', 'warn');
            }
        });
        if (window.location.hash.includes('type=recovery')) {
            const box = document.getElementById('passwordRecoveryBox');
            if (box) box.style.display = 'block';
        }
    } catch (err) {}
}

function decodeJwtPayload(token) {
    try {
        const payload = token.split('.')[1];
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(atob(normalized).split('').map(char => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(json);
    } catch (err) {
        return null;
    }
}

function renderDiagnosticsResult(rows) {
    const el = document.getElementById('supabase-diagnostics-result');
    if (!el) return;
    el.innerHTML = rows.map(row => `
        <div class="sync-diagnostics-row ${row.ok ? 'ok' : 'warn'}">
            <strong>${escapeHtml(row.label)}</strong>
            <span>${escapeHtml(row.value)}</span>
        </div>
    `).join('');
}

async function runSupabaseDiagnostics() {
    const rows = [];
    const add = (label, value, ok = true) => rows.push({ label, value: String(value), ok });
    try {
        saveSupabaseSettings();
        const settings = getSupabaseSettings();
        add('App URL', window.location.href, !window.location.protocol.startsWith('file'));
        add('Origin', window.location.origin || 'file:// ohne echte Origin', window.location.origin !== 'null');
        add('Supabase URL', settings.url, settings.url === DEFAULT_SUPABASE_URL);
        add('Key vorhanden', settings.anonKey ? 'ja' : 'nein', Boolean(settings.anonKey));

        const client = await getSupabaseClient();
        const { data: sessionData, error: sessionError } = await client.auth.getSession();
        add('Session Fehler', sessionError ? sessionError.message : 'keiner', !sessionError);
        const session = sessionData && sessionData.session ? sessionData.session : null;
        add('Session vorhanden', session ? 'ja' : 'nein', Boolean(session));

        const tokenPayload = session && session.access_token ? decodeJwtPayload(session.access_token) : null;
        add('JWT Rolle', tokenPayload && tokenPayload.role ? tokenPayload.role : '-', tokenPayload && tokenPayload.role === 'authenticated');
        add('JWT E-Mail', tokenPayload && tokenPayload.email ? tokenPayload.email : '-', Boolean(tokenPayload && tokenPayload.email));
        add('JWT Ablauf', tokenPayload && tokenPayload.exp ? new Date(tokenPayload.exp * 1000).toLocaleString('de-DE') : '-', Boolean(tokenPayload && tokenPayload.exp && tokenPayload.exp * 1000 > Date.now()));

        const { data: userData, error: userError } = await client.auth.getUser();
        add('User Fehler', userError ? userError.message : 'keiner', !userError);
        add('User E-Mail', userData && userData.user ? userData.user.email : '-', Boolean(userData && userData.user));

        if (session) {
            const { data: insertedId, error: insertError } = await client.rpc('upsert_warehouse_data', {
                target_warehouse_id: null,
                warehouse_name: 'OSCI Sync Diagnose',
                warehouse_data: { diagnostic: true, createdAt: new Date().toISOString() }
            });
            add('Test-Write upsert_warehouse_data', insertError ? insertError.message : 'ok', !insertError);
            if (!insertError && insertedId) {
                const { error: deleteError } = await client.from('warehouses').delete().eq('id', insertedId);
                add('Test-Cleanup', deleteError ? deleteError.message : 'ok', !deleteError);
            }
        } else {
            add('Test-Write upsert_warehouse_data', 'übersprungen, keine Session', false);
        }
    } catch (err) {
        add('Diagnose Fehler', err.message, false);
    }
    renderDiagnosticsResult(rows);
    const failed = rows.filter(row => !row.ok).length;
    updateSyncStatus(failed ? `Sync Diagnose: ${failed} Auffälligkeit(en).` : 'Sync Diagnose: alles sieht gut aus.', failed ? 'warn' : 'ok');
}

function createRemoteWarehouseId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function scheduleSupabaseAutoSync() {
    if (syncIsPulling) return;
    const settings = getSupabaseSettings();
    if (!settings.autoSync || !settings.url || !settings.anonKey) return;
    clearTimeout(syncPushTimer);
    syncPushTimer = setTimeout(() => {
        syncPushAllWarehouses(false).catch(err => updateSyncStatus('Auto-Sync fehlgeschlagen: ' + err.message, 'warn'));
    }, 1800);
}

function getWarehouseSyncPayload(warehouse) {
    return {
        id: warehouse.remoteId || null,
        name: warehouse.name || 'Lager',
        data: warehouse.data || createWarehouseData(),
        updated_at: new Date().toISOString()
    };
}

function canWriteWarehouse(warehouse) {
    if (!warehouse) return false;
    if (warehouse.readOnly) return false;
    if (warehouse.isShared && warehouse.accessRole !== 'write') return false;
    return true;
}

function queueDeletedWarehouseRemoteId(remoteId) {
    if (!remoteId) return;
    if (!appState.pendingDeletedRemoteIds) appState.pendingDeletedRemoteIds = [];
    if (!appState.pendingDeletedRemoteIds.includes(remoteId)) {
        appState.pendingDeletedRemoteIds.push(remoteId);
    }
}

async function flushDeletedRemoteWarehouses(client) {
    const ids = Array.isArray(appState?.pendingDeletedRemoteIds) ? [...appState.pendingDeletedRemoteIds] : [];
    if (ids.length === 0) return 0;
    let deleted = 0;
    for (const remoteId of ids) {
        const { error } = await client.from('warehouses').delete().eq('id', remoteId);
        if (error) throw error;
        appState.pendingDeletedRemoteIds = (appState.pendingDeletedRemoteIds || []).filter(id => id !== remoteId);
        deleted++;
    }
    return deleted;
}

function isNoWriteAccessError(error) {
    return /no write access for warehouse/i.test(String(error && error.message ? error.message : error || ''));
}

async function syncPushAllWarehouses(showAlert = true) {
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) {
            updateSyncStatus('Bitte zuerst einloggen.', 'warn');
            if (showAlert) alert('Bitte zuerst bei Supabase einloggen.');
            return;
        }
        const { data: sessionData } = await client.auth.getSession();
        if (!sessionData || !sessionData.session) {
            updateSyncStatus('Login-Sitzung fehlt. Bitte ausloggen und neu einloggen.', 'warn');
            if (showAlert) alert('Login-Sitzung fehlt. Bitte ausloggen und neu einloggen.');
            return;
        }
        const warehouses = appState && appState.warehouses ? Object.values(appState.warehouses) : [];
        const deleted = await flushDeletedRemoteWarehouses(client);
        let pushed = 0;
        let skippedReadOnly = 0;
        for (const warehouse of warehouses) {
            if (!canWriteWarehouse(warehouse)) {
                skippedReadOnly++;
                continue;
            }
            if (warehouse.id === activeWarehouseId) warehouse.data = db;
            const payload = getWarehouseSyncPayload(warehouse);
            const { data: savedId, error } = await client.rpc('upsert_warehouse_data', {
                target_warehouse_id: payload.id,
                warehouse_name: payload.name,
                warehouse_data: payload.data
            });
            if (error) {
                if (isNoWriteAccessError(error)) {
                    warehouse.isShared = true;
                    warehouse.accessRole = 'read';
                    warehouse.readOnly = true;
                    skippedReadOnly++;
                    continue;
                }
                throw error;
            }
            if (!warehouse.remoteId && savedId) warehouse.remoteId = savedId;
            warehouse.readOnly = false;
            if (!warehouse.isShared) warehouse.accessRole = 'owner';
            warehouse.lastSyncAt = payload.updated_at;
            pushed++;
        }
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        updateWarehouseUI();
        const skipText = skippedReadOnly ? ` · ${skippedReadOnly} Nur-Lesen-Lager übersprungen` : '';
        const deleteText = deleted ? ` · ${deleted} gelöschte Lager entfernt` : '';
        updateSyncStatus(`Daten Upload abgeschlossen: ${pushed} Lager synchronisiert.${deleteText}${skipText}`, 'ok');
        addWarehouseEvent('cloud', `Daten Upload: ${pushed} Lager synchronisiert${deleted ? `, ${deleted} gelöscht` : ''}`);
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        if (showAlert) alert(`Daten Upload abgeschlossen.\n${pushed} Lager wurden synchronisiert.${deleted ? `\n${deleted} gelöschte Lager wurden auch aus Supabase entfernt.` : ''}${skippedReadOnly ? `\n${skippedReadOnly} Nur-Lesen-Lager wurden übersprungen, weil du dafür keinen Schreibzugriff hast.` : ''}`);
        await renderSyncFriendsList();
    } catch (err) {
        updateSyncStatus('Sync fehlgeschlagen: ' + err.message, 'warn');
        if (showAlert) alert('Sync fehlgeschlagen: ' + err.message);
    }
}

function getLocalWarehouseByRemoteId(remoteId) {
    if (!appState || !appState.warehouses) return null;
    return Object.values(appState.warehouses).find(warehouse => warehouse.remoteId === remoteId);
}

async function syncPullWarehouses(showAlert = true) {
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) {
            updateSyncStatus('Bitte zuerst einloggen.', 'warn');
            if (showAlert) alert('Bitte zuerst bei Supabase einloggen.');
            return;
        }
        const hasRemoteLocalChanges = Object.values(appState?.warehouses || {}).some(warehouse => warehouse.remoteId && canWriteWarehouse(warehouse));
        const hasPendingDeletes = Array.isArray(appState?.pendingDeletedRemoteIds) && appState.pendingDeletedRemoteIds.length > 0;
        if (showAlert && (hasRemoteLocalChanges || hasPendingDeletes)) {
            await syncPushAllWarehouses(false);
        }
        syncIsPulling = true;
        const { data: rows, error } = await client.rpc('list_accessible_warehouses');
        if (error) throw error;
        const sortedRows = (rows || []).slice().sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
        const conflicts = sortedRows.filter(row => {
            const local = getLocalWarehouseByRemoteId(row.id);
            if (!local || !local.remoteId) return false;
            const cloudTime = new Date(row.updated_at || 0).getTime();
            const lastSync = new Date(local.lastSyncAt || 0).getTime();
            const localTime = new Date(local.localUpdatedAt || local.data?.localUpdatedAt || 0).getTime();
            return cloudTime > lastSync && localTime > lastSync;
        });
        if (showAlert && conflicts.length > 0) {
            const names = conflicts.map(row => row.name || 'Lager').join(', ');
            if (!confirm(`Cloud-Konflikt erkannt bei: ${names}\n\nDie Cloud und dieses Gerät wurden seit dem letzten Sync geändert. Daten Download überschreibt den lokalen Stand mit der Cloud-Version. Fortfahren?`)) {
                updateSyncStatus('Daten Download abgebrochen: Cloud-Konflikt erkannt.', 'warn');
                return;
            }
            addWarehouseEvent('conflict', `Cloud-Konflikt bestätigt: ${names}`);
        }
        const returnedRemoteIds = new Set(sortedRows.map(row => row.id));
        if (!appState) appState = migrateToWarehouseState(null);
        if (!appState.warehouses) appState.warehouses = {};
        Object.values(appState.warehouses).forEach(warehouse => {
            if (
                warehouse.remoteId
                && !returnedRemoteIds.has(warehouse.remoteId)
                && (warehouse.isShared || warehouse.readOnly || warehouse.accessRole === 'read' || warehouse.accessRole === 'write')
            ) {
                delete appState.warehouses[warehouse.id];
            }
        });

        let loaded = 0;
        let loadedShared = 0;
        let firstLoadedLocalId = null;
        sortedRows.forEach(row => {
            const existing = getLocalWarehouseByRemoteId(row.id);
            const localId = existing ? existing.id : createWarehouseId();
            const shareRole = row.access_role || (row.owner === user.id ? 'owner' : 'read');
            const isOwner = shareRole === 'owner';
            const isReadOnly = !isOwner && shareRole !== 'write';
            const ownerEmail = row.owner_email || '';
            if (!isOwner && ownerEmail) {
                if (!appState.knownSharedOwners) appState.knownSharedOwners = {};
                appState.knownSharedOwners[ownerEmail] = true;
            }
            const hiddenByOwner = !isOwner && isSharedOwnerHidden(ownerEmail);
            if (hiddenByOwner) {
                if (existing) delete appState.warehouses[existing.id];
                return;
            }
            if (!firstLoadedLocalId) firstLoadedLocalId = localId;
            if (!isOwner) loadedShared++;
            appState.warehouses[localId] = {
                id: localId,
                remoteId: row.id,
                name: row.name || 'Lager',
                ownerId: row.owner || null,
                ownerEmail,
                createdAt: existing?.createdAt || new Date().toISOString(),
                lastImportAt: existing?.lastImportAt || null,
                lastExportAt: existing?.lastExportAt || null,
                lastSyncAt: row.updated_at || new Date().toISOString(),
                isShared: !isOwner,
                accessRole: shareRole,
                readOnly: isReadOnly,
                data: createWarehouseData(row.data || {})
            };
            loaded++;
        });

        if (!appState.warehouses[activeWarehouseId]) {
            activeWarehouseId = Object.keys(appState.warehouses)[0] || 'main';
        }
        const activeBeforePull = appState.warehouses[activeWarehouseId];
        if (firstLoadedLocalId && activeBeforePull && !activeBeforePull.remoteId) {
            activeWarehouseId = firstLoadedLocalId;
        }
        appState.activeWarehouseId = activeWarehouseId;
        const warehouse = getActiveWarehouse();
        if (warehouse) db = normalizeWarehouseData(warehouse.data);
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        const lagerTab = document.getElementById('lager');
        if (lagerTab) lagerTab.innerHTML = '';
        renderCurrentWarehouseViews();
        const sharedText = loadedShared ? ` · ${loadedShared} geteilte Lager` : '';
        updateSyncStatus(`Daten Download abgeschlossen: ${loaded} Lager geladen.${sharedText}`, 'ok');
        addWarehouseEvent('cloud', `Daten Download: ${loaded} Lager geladen${loadedShared ? `, ${loadedShared} geteilt` : ''}`);
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        if (showAlert) alert(`Daten Download abgeschlossen.\n${loaded} Lager wurden geladen.${loadedShared ? `\n${loadedShared} davon sind mit dir geteilt.` : ''}`);
    } catch (err) {
        const message = /list_accessible_warehouses/i.test(String(err.message || ''))
            ? 'Laden fehlgeschlagen: Bitte die aktuelle supabase-sync.sql in Supabase ausführen. Die Funktion list_accessible_warehouses fehlt noch.'
            : 'Laden fehlgeschlagen: ' + err.message;
        updateSyncStatus(message, 'warn');
        if (showAlert) alert(message);
    } finally {
        syncIsPulling = false;
    }
}

async function ensureActiveWarehouseRemote() {
    const warehouse = getActiveWarehouse();
    if (!warehouse) throw new Error('Kein aktives Lager gefunden.');
    if (!warehouse.remoteId) await syncPushAllWarehouses(false);
    if (!warehouse.remoteId) throw new Error('Das aktive Lager konnte nicht synchronisiert werden.');
    return warehouse;
}

async function addReadOnlyFriend() {
    try {
        const email = (document.getElementById('friendEmailInput')?.value || '').trim().toLowerCase();
        const selectedRole = document.getElementById('friendAccessRole')?.value === 'write' ? 'write' : 'read';
        if (!email || !email.includes('@')) return alert('Bitte eine gültige E-Mail-Adresse eintragen.');
        const { client, user } = await getSupabaseUser();
        if (!user) return alert('Bitte zuerst bei Supabase einloggen.');
        const warehouse = await ensureActiveWarehouseRemote();
        if (warehouse.readOnly) return alert('Dieses Lager ist für dich nur lesbar. Du kannst dafür keine Freunde hinzufügen.');
        const { error } = await client.from('warehouse_members').upsert({
            warehouse_id: warehouse.remoteId,
            email,
            role: selectedRole
        }, { onConflict: 'warehouse_id,email' });
        if (error) throw error;
        document.getElementById('friendEmailInput').value = '';
        const roleLabel = selectedRole === 'write' ? 'Lesen & schreiben' : 'Nur lesen';
        addWarehouseEvent('share', `${email} für "${warehouse.name}" freigegeben: ${roleLabel}`);
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        updateSyncStatus(`${email} hat ${roleLabel}-Zugriff auf das Lager "${warehouse.name}".`, 'ok');
        alert(`${email} wurde für "${warehouse.name}" freigegeben.\nZugriff: ${roleLabel}`);
        await renderSyncFriendsList();
    } catch (err) {
        alert('Freund konnte nicht hinzugefügt werden: ' + err.message);
    }
}

async function removeReadOnlyFriend(memberId) {
    if (!confirm('Freund aus der Freigabe entfernen?')) return;
    try {
        const { client } = await getSupabaseUser();
        const { error } = await client.from('warehouse_members').delete().eq('id', memberId);
        if (error) throw error;
        addWarehouseEvent('share', 'Freigabe entfernt');
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        await renderSyncFriendsList();
    } catch (err) {
        alert('Freigabe konnte nicht entfernt werden: ' + err.message);
    }
}

async function updateFriendAccessRole(memberId, role) {
    try {
        const nextRole = role === 'write' ? 'write' : 'read';
        const { client } = await getSupabaseUser();
        const { error } = await client
            .from('warehouse_members')
            .update({ role: nextRole })
            .eq('id', memberId);
        if (error) throw error;
        addWarehouseEvent('share', `Freigabe geändert: ${nextRole === 'write' ? 'Lesen & schreiben' : 'Nur lesen'}`);
        localStorage.setItem(DB_KEY, JSON.stringify(appState));
        updateSyncStatus(`Freigabe aktualisiert: ${nextRole === 'write' ? 'Lesen & schreiben' : 'Nur lesen'}.`, 'ok');
        await renderSyncFriendsList();
    } catch (err) {
        alert('Freigabe konnte nicht geändert werden: ' + err.message);
        await renderSyncFriendsList();
    }
}

async function renderSyncFriendsList() {
    const list = document.getElementById('sync-friends-list');
    if (!list) return;
    const warehouse = getActiveWarehouse();
    if (!warehouse || !warehouse.remoteId) {
        list.innerHTML = '<p class="hint">Freigaben erscheinen, sobald dieses Lager einmal hochgeladen wurde.</p>';
        return;
    }
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) {
            list.innerHTML = '<p class="hint">Logge dich ein, um Freigaben zu sehen.</p>';
            return;
        }
        const { data, error } = await client
            .from('warehouse_members')
            .select('id, email, role, created_at')
            .eq('warehouse_id', warehouse.remoteId)
            .order('created_at', { ascending: true });
        if (error) throw error;
        if (!data || data.length === 0) {
            list.innerHTML = '<p class="hint">Noch keine Freunde für dieses Lager hinzugefügt.</p>';
            return;
        }
        list.innerHTML = data.map(member => `
            <div class="sync-friend-row">
                <div>
                    <strong>${escapeHtml(member.email)}</strong>
                    <small>${member.role === 'read' ? 'Nur lesen' : 'Lesen & schreiben'} · seit ${formatWarehouseDate(member.created_at)}</small>
                </div>
                ${warehouse.readOnly ? '<span class="hint">Freigabe</span>' : `
                    <div class="sync-friend-actions">
                        <select onchange="updateFriendAccessRole('${member.id}', this.value)" aria-label="Zugriff für ${escapeHtml(member.email)} ändern">
                            <option value="read"${member.role === 'read' ? ' selected' : ''}>Nur lesen</option>
                            <option value="write"${member.role === 'write' ? ' selected' : ''}>Lesen & schreiben</option>
                        </select>
                        <button onclick="removeReadOnlyFriend('${member.id}')" class="btn-out btn-animated">Entfernen</button>
                    </div>
                `}
            </div>
        `).join('');
    } catch (err) {
        list.innerHTML = `<p class="hint">Freigaben konnten nicht geladen werden: ${err.message}</p>`;
    }
}

function formatWarehouseDate(value) {
    return value ? new Date(value).toLocaleString('de-DE') : 'noch nie';
}

function sanitizeFileName(value) {
    return String(value || 'Lager').replace(/[^a-z0-9äöüß_-]+/gi, '_').replace(/^_+|_+$/g, '') || 'Lager';
}

function getWarehouseAccessLabel(warehouse) {
    if (!warehouse) return 'Lager';
    const isShared = warehouse.isShared || warehouse.readOnly;
    if (!isShared) return warehouse.remoteId ? 'Eigenes Lager' : 'Eigenes lokales Lager';
    const owner = warehouse.ownerEmail ? ` · von ${warehouse.ownerEmail}` : '';
    return `${warehouse.readOnly ? 'Geteiltes Lager · Nur lesen' : 'Geteiltes Lager · Schreibzugriff'}${owner}`;
}

function getWarehouseOptionLabel(warehouse) {
    const suffix = warehouse.isShared || warehouse.readOnly
        ? `${warehouse.readOnly ? 'Nur lesen' : 'Schreiben'}${warehouse.ownerEmail ? ` · ${warehouse.ownerEmail}` : ''}`
        : (warehouse.remoteId ? 'Eigen' : 'Lokal');
    return `${warehouse.name} (${suffix})`;
}

function updateWarehouseUI() {
    const select = document.getElementById('warehouseSelect');
    const meta = document.getElementById('warehouseMeta');
    const backupInfo = document.getElementById('warehouseBackupInfo');
    const accessBadge = document.getElementById('warehouseAccessBadge');
    const shareHint = document.getElementById('shareActiveWarehouseHint');
    const shareBox = document.getElementById('shareActiveWarehouseBox');
    const warehouses = appState && appState.warehouses ? Object.values(appState.warehouses) : [];
    const active = getActiveWarehouse();

    if (select) {
        const previous = select.value;
        const ownWarehouses = warehouses.filter(warehouse => !(warehouse.isShared || warehouse.readOnly));
        const sharedWarehouses = warehouses.filter(warehouse => warehouse.isShared || warehouse.readOnly);
        const renderOption = warehouse => `<option value="${warehouse.id}">${escapeHtml(getWarehouseOptionLabel(warehouse))}</option>`;
        const groups = [];
        if (ownWarehouses.length) {
            groups.push(`<optgroup label="Eigene Lager">${ownWarehouses.map(renderOption).join('')}</optgroup>`);
        }
        if (sharedWarehouses.length) {
            groups.push(`<optgroup label="Mit mir geteilt">${sharedWarehouses.map(renderOption).join('')}</optgroup>`);
        }
        select.innerHTML = groups.join('');
        select.value = active ? active.id : previous;
    }

    if (active) {
        const isShared = active.isShared || active.readOnly;
        const accessLabel = getWarehouseAccessLabel(active);
        const access = ` · ${accessLabel}`;
        const sync = active.remoteId ? ` · Sync: ${formatWarehouseDate(active.lastSyncAt)}` : '';
        const info = `Import: ${formatWarehouseDate(active.lastImportAt)} · Export: ${formatWarehouseDate(active.lastExportAt)}${sync}${access}`;
        if (meta) meta.innerText = info;
        if (backupInfo) backupInfo.innerText = `Aktuelles Lager: ${active.name} · ${info}`;
        if (accessBadge) {
            accessBadge.innerText = accessLabel;
            accessBadge.dataset.access = !isShared ? 'owner' : (active.readOnly ? 'read' : 'write');
        }
        if (shareHint) {
            shareHint.innerText = active.readOnly
                ? `Du bist in "${active.name}" nur Leser. Du kannst dieses Lager nicht weiter freigeben.`
                : `Freigegeben wird nur das aktuell ausgewählte Lager: "${active.name}".`;
        }
        if (shareBox) {
            shareBox.innerHTML = `
                <strong>${escapeHtml(active.name)}</strong>
                <span>${escapeHtml(accessLabel)}</span>
            `;
            shareBox.dataset.access = !isShared ? 'owner' : (active.readOnly ? 'read' : 'write');
        }
    }
}

function renderCurrentWarehouseViews() {
    renderLager();
    renderStats();
    renderLogs();
    renderCustomProductSettings();
    renderCustomContainers();
    renderProductVisibilitySettings();
    renderSharedOwnerVisibilitySettings();
    renderCloudShareOverview();
    renderWarehouseEventLog();
    renderProductPresets();
    renderShopLinkSettings();
    renderNachbestellen();
    renderSupabaseSyncSettings();
    renderLogBook();
    initBulkProductSelect();
    updateNotificationStatus();
    clearCRPdfImport();
}

function switchWarehouse(id) {
    if (!appState || !appState.warehouses || !appState.warehouses[id] || id === activeWarehouseId) {
        updateWarehouseUI();
        return;
    }

    const current = getActiveWarehouse();
    if (current) current.data = db;
    activeWarehouseId = id;
    appState.activeWarehouseId = id;
    const next = getActiveWarehouse();
    next.data = normalizeWarehouseData(next.data);
    db = next.data;
    applyTheme(db.theme || 'default', false);
    saveDB(false);
    renderCurrentWarehouseViews();
}

function createWarehouse() {
    const name = prompt('Name für das neue Lager:', `Lager ${Object.keys(appState.warehouses || {}).length + 1}`);
    if (!name || !name.trim()) return;
    const record = createWarehouseRecord(name.trim(), { theme: db.theme, settings: { forecastWeeks: (db.settings && db.settings.forecastWeeks) || 4 } });
    appState.warehouses[record.id] = record;
    switchWarehouse(record.id);
}

function renameWarehouse() {
    const warehouse = getActiveWarehouse();
    if (!warehouse) return;
    if (warehouse.isShared || warehouse.readOnly) return alert('Geteilte Lager können lokal nicht umbenannt werden.');
    const name = prompt('Neuer Name für dieses Lager:', warehouse.name);
    if (!name || !name.trim()) return;
    warehouse.name = name.trim();
    saveDB();
}

function deleteWarehouse() {
    const warehouse = getActiveWarehouse();
    if (!warehouse) return;
    if (warehouse.isShared || warehouse.readOnly) return alert('Geteilte Lager können hier nicht gelöscht werden.');
    const ids = Object.keys(appState.warehouses || {});
    if (ids.length <= 1) return alert('Es muss mindestens ein Lager vorhanden bleiben.');
    if (!confirm(`Lager "${warehouse.name}" wirklich löschen? Bestand, Statistik, Protokoll und Einstellungen dieses Lagers werden entfernt.`)) return;
    const deletedWarehouseName = warehouse.name;
    queueDeletedWarehouseRemoteId(warehouse.remoteId);
    delete appState.warehouses[warehouse.id];
    activeWarehouseId = Object.keys(appState.warehouses)[0];
    appState.activeWarehouseId = activeWarehouseId;
    const next = getActiveWarehouse();
    next.data = normalizeWarehouseData(next.data);
    db = next.data;
    addWarehouseEvent('lager', `Lager "${deletedWarehouseName}" gelöscht`);
    applyTheme(db.theme || 'default', false);
    saveDB();
    renderCurrentWarehouseViews();
    syncPushAllWarehouses(false).catch(err => updateSyncStatus('Löschen wird später synchronisiert: ' + err.message, 'warn'));
}

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
    const targetTab = document.getElementById(tabId);
    const targetBtn = document.getElementById('tab-' + tabId);
    if (!targetTab || !targetBtn) tabId = 'lager';

    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-links button').forEach(el => el.classList.remove('active'));
    
    const resolvedTab = document.getElementById(tabId);
    const resolvedBtn = document.getElementById('tab-' + tabId);
    if (resolvedTab && resolvedBtn) {
        // Re-trigger the slide-in animation by briefly removing the class
        resolvedTab.style.animation = 'none';
        resolvedTab.offsetHeight; // Force reflow
        resolvedTab.style.animation = '';
        resolvedTab.classList.add('active');
        resolvedBtn.classList.add('active');
    }
    db.lastTab = tabId;
    try { localStorage.setItem(LAST_TAB_KEY, tabId); } catch(e) {}
    try {
        const nextHash = '#' + encodeURIComponent(tabId);
        if (window.location.hash !== nextHash) history.replaceState(null, '', nextHash);
    } catch(e) {}
    saveDB(false);
    
    if(tabId === 'lager') renderLager();
    if(tabId === 'statistik') renderStats();
    if(tabId === 'trace-export') renderTraceExportInputs();
    if(tabId === 'log') renderLogs();
    if(tabId === 'nachbestellen') renderNachbestellen();
    if(tabId === 'tools') initTools();
    if(tabId === 'logbuch') renderLogBook();
    if(tabId === 'einstellungen') {
        setupSettingsAccordions();
        updateNotificationStatus();
        renderCustomProductSettings();
        renderCustomContainers();
        renderProductVisibilitySettings();
        renderShopLinkSettings();
        renderProductPresets();
        renderSupabaseSyncSettings();
    }
}

function setupSettingsAccordions() {
    const settings = document.getElementById('einstellungen');
    if (!settings) return;

    settings.querySelectorAll(':scope > .card').forEach((card, index) => {
        card.style.display = '';
        const firstChild = card.firstElementChild;
        if (firstChild && firstChild.tagName === 'DETAILS') {
            const existingTitle = card.querySelector('h2, h3');
            if (existingTitle) applySettingsMetadata(card, existingTitle.innerText || '');
            firstChild.open = false;
            return;
        }
        if (card.dataset.settingsAccordion === 'true') return;

        const title = card.querySelector('h2, h3');
        if (!title) return;

        const details = document.createElement('details');
        details.className = 'settings-accordion';
        details.id = 'settings-accordion-' + index;

        const summary = document.createElement('summary');
        summary.className = 'settings-accordion-summary';

        title.parentNode.insertBefore(details, title);
        details.appendChild(summary);
        summary.appendChild(title);

        const hint = document.createElement('span');
        hint.className = 'settings-accordion-hint';
        hint.setAttribute('aria-hidden', 'true');
        summary.appendChild(hint);

        const body = document.createElement('div');
        body.className = 'settings-accordion-body';
        while (details.nextSibling) body.appendChild(details.nextSibling);
        details.appendChild(body);

        card.dataset.settingsAccordion = 'true';
        details.open = false;
        applySettingsMetadata(card, title.innerText || '');
    });

    renderSettingsGroupLabels(settings);

    settings.querySelectorAll('details').forEach(details => {
        details.open = false;
    });
}

function getSettingsMeta(title) {
    const normalized = String(title || '').toLowerCase();
    if (/supabase|sync|freunde/.test(normalized)) return { group: 'Sync', hint: 'Cloud-Sync, Login, Freunde, Rechte', keywords: 'supabase sync cloud login freunde teilen nur lesen schreibzugriff readonly write sicherheit rls' };
    if (/system|backup|bug/.test(normalized)) return { group: 'System', hint: 'Updates, Backup, Fehler melden', keywords: 'system update version backup import export bug fehler melden mail' };
    if (/benachrichtigung/.test(normalized)) return { group: 'Warnungen', hint: 'Warnzeitraum, Push, deaktivierte Warnungen', keywords: 'benachrichtigung warnung push alarm prognose warnzeitraum' };
    if (/eigene behälter|produkte ein/.test(normalized)) return { group: 'Lager', hint: 'Tara, Behälter, Sichtbarkeit', keywords: 'lager behälter tara leergewicht ausblenden einblenden sichtbarkeit produkte' };
    if (/eigene produkte|produkt-presets|shop-links/.test(normalized)) return { group: 'Produkte', hint: 'Eigene Waren, Presets, Shop-Links', keywords: 'produkt eigene waren preset shop link größe dichte stück gramm ml' };
    if (/design|effekte/.test(normalized)) return { group: 'Darstellung', hint: 'Design, Theme, Animationen', keywords: 'design theme farbe badman light girl mint effekt animation disco' };
    if (/reset|löschen/.test(normalized)) return { group: 'Gefahrenzone', hint: 'Daten löschen und zurücksetzen', keywords: 'reset löschen statistik protokoll lagerbestand daten' };
    return { group: 'Weitere', hint: 'Weitere Einstellungen', keywords: normalized };
}

function applySettingsMetadata(card, title) {
    const meta = getSettingsMeta(title);
    card.dataset.settingsGroup = meta.group;
    const summary = card.querySelector('.settings-accordion-summary');
    if (summary && !summary.querySelector('.settings-summary-copy')) {
        const titleEl = summary.querySelector('h2, h3');
        const wrap = document.createElement('span');
        wrap.className = 'settings-summary-copy';
        if (titleEl) {
            summary.insertBefore(wrap, titleEl);
            wrap.appendChild(titleEl);
            const small = document.createElement('small');
            small.innerText = meta.hint;
            wrap.appendChild(small);
        }
    }
}

function renderSettingsGroupLabels(settings) {
    settings.querySelectorAll('.settings-group-label').forEach(label => label.remove());
    const seen = new Set();
    settings.querySelectorAll(':scope > .card').forEach(card => {
        card.style.display = '';
        const group = card.dataset.settingsGroup || 'Weitere';
        if (seen.has(group)) return;
        seen.add(group);
        const label = document.createElement('div');
        label.className = 'settings-group-label';
        label.dataset.settingsGroupLabel = group;
        label.innerHTML = `<span>${group}</span>`;
        settings.insertBefore(label, card);
    });
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
function getCurrentAppVersion() {
    return document.querySelector('.version-badge')?.innerText?.trim() || '';
}

function compareVersionLabels(a, b) {
    const parse = value => String(value || '').replace(/^v/i, '').split('.').map(num => parseInt(num, 10) || 0);
    const left = parse(a);
    const right = parse(b);
    const length = Math.max(left.length, right.length);
    for (let i = 0; i < length; i++) {
        if ((left[i] || 0) > (right[i] || 0)) return 1;
        if ((left[i] || 0) < (right[i] || 0)) return -1;
    }
    return 0;
}

function showUpdateBanner(latestVersion) {
    const banner = document.getElementById('update-banner');
    const text = document.getElementById('update-banner-text');
    if (!banner) return;
    const current = getCurrentAppVersion();
    if (text) text.innerText = latestVersion ? `Installiert: ${current} · Neu: ${latestVersion}` : 'Eine neuere App-Version kann geladen werden.';
    banner.hidden = false;
}

function hideUpdateBanner() {
    const banner = document.getElementById('update-banner');
    if (banner) banner.hidden = true;
}

async function checkForAppUpdate(showIfCurrent = false) {
    try {
        const response = await fetch(`index.html?version-check=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) return;
        const html = await response.text();
        const match = html.match(/class=["']version-badge["'][^>]*>\s*(v[0-9.]+)\s*</i);
        const latest = match ? match[1] : '';
        const current = getCurrentAppVersion();
        if (latest && current && compareVersionLabels(latest, current) > 0) {
            showUpdateBanner(latest);
        } else {
            hideUpdateBanner();
            if (showIfCurrent) showToast('Du nutzt bereits die aktuelle Version.', 'success');
        }
    } catch (err) {
        if (showIfCurrent) showToast('Versionsprüfung gerade nicht möglich.', 'warning');
    }
}

async function forceUpdateApp(ask = true) {
    if (!ask || confirm("Möchtest du ein App-Update erzwingen? Dabei wird der interne Zwischenspeicher (Cache) geleert und die allerneueste Version geladen. Deine Bestandsdaten bleiben erhalten!")) {
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

function getActiveTabId() {
    const activeTab = document.querySelector('.tab-content.active');
    return activeTab ? activeTab.id : 'unbekannt';
}

function sendBugReport() {
    const descriptionEl = document.getElementById('bugReportDescription');
    const stepsEl = document.getElementById('bugReportSteps');
    const description = descriptionEl ? descriptionEl.value.trim() : '';
    const steps = stepsEl ? stepsEl.value.trim() : '';

    if (!description) {
        alert('Bitte beschreibe kurz, welcher Fehler aufgetreten ist.');
        if (descriptionEl) descriptionEl.focus();
        return;
    }

    const appVersion = document.querySelector('.version-badge')?.innerText || 'unbekannt';
    const body = [
        'Bugmeldung OSCI Lager App',
        '',
        'Fehlerbeschreibung:',
        description,
        '',
        'Schritte zum Nachstellen:',
        steps || '-',
        '',
        'Technische Infos:',
        `App-Version: ${appVersion}`,
        `Aktiver Bereich: ${getActiveTabId()}`,
        `Design: ${db.theme || 'default'}`,
        `Party-Modus: ${document.body.classList.contains('party-mode') ? 'aktiv' : 'inaktiv'}`,
        `URL: ${window.location.href}`,
        `Zeitpunkt: ${new Date().toLocaleString('de-DE')}`,
        `Browser: ${navigator.userAgent}`,
        '',
        'Hinweis: Diese Meldung enthält keine Lagerbestände oder Backup-Daten.'
    ].join('\n');

    const subject = `Bugmeldung OSCI Lager App ${appVersion}`;
    window.location.href = `mailto:simon@asbach.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function initCustomCursor() {
    const finePointer = window.matchMedia && window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('customCursorDot');
    if (!finePointer || !cursor || !dot) return;

    document.body.classList.add('custom-cursor-enabled');
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let cursorX = targetX;
    let cursorY = targetY;

    const move = event => {
        targetX = event.clientX;
        targetY = event.clientY;
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
        document.body.classList.add('cursor-visible');
    };

    const animate = () => {
        cursorX += (targetX - cursorX) * 0.34;
        cursorY += (targetY - cursorY) * 0.34;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-visible'));
    document.addEventListener('mouseenter', () => document.body.classList.add('cursor-visible'));
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));
    document.addEventListener('mouseover', event => {
        document.body.classList.toggle('cursor-hover', Boolean(event.target.closest('button, a, input, select, textarea, summary, label, .resource-link-card')));
    });
    requestAnimationFrame(animate);
}

// --- NEUE HILFSFUNKTIONEN ---
function getGrams(itemName, mlAmount) {
    if (getItemUnit(itemName) === 'g') return parseFloat(mlAmount || 0).toFixed(1);
    let factor = densityFactors[itemName] || 1.0;
    return (mlAmount * factor).toFixed(1);
}

function getItemUnit(itemName) {
    const product = (db.customProducts || []).find(entry => entry.name === itemName);
    return product && product.sizeUnit ? product.sizeUnit : 'ml';
}

function getUnitLabel(unit) {
    if (unit === 'st') return 'Stück';
    if (unit === 'g') return 'g';
    return 'ml';
}

function formatItemAmount(itemName, amount, decimals = 1) {
    return `${parseFloat(amount || 0).toFixed(decimals)} ${getUnitLabel(getItemUnit(itemName))}`;
}

function itemUsesPieces(itemName) {
    return getItemUnit(itemName) === 'st';
}

function itemUsesVolume(itemName) {
    return getItemUnit(itemName) === 'ml';
}

function convertInputToStoredAmount(itemName, inputUnit, amount, useTara = false, containerValue = null) {
    let value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return null;

    if (inputUnit === 'g' && useTara) {
        value -= getAllContainers()[containerValue] || 0;
    }

    if (value <= 0) return null;

    const itemUnit = getItemUnit(itemName);
    const factor = densityFactors[itemName] || 1.0;

    if (itemUnit === inputUnit || itemUnit === 'st') return value;
    if (itemUnit === 'ml' && inputUnit === 'g') return value / factor;
    if (itemUnit === 'g' && inputUnit === 'ml') return value * factor;
    return value;
}

function formatConvertedInputPreview(itemName, inputUnit, amount, useTara = false, containerValue = null) {
    const converted = convertInputToStoredAmount(itemName, inputUnit, amount, useTara, containerValue);
    if (converted === null) return '';
    return `≈ ${formatItemAmount(itemName, converted)}`;
}

function getAllContainers() {
    return { ...containers, ...((db && db.customContainers) || {}) };
}

function isProductHidden(itemName) {
    return Boolean(db.hiddenProducts && db.hiddenProducts[itemName]);
}

function setProductHidden(itemName, hidden) {
    if (!db.hiddenProducts) db.hiddenProducts = {};
    if (hidden) db.hiddenProducts[itemName] = true;
    else delete db.hiddenProducts[itemName];
    if (db.notifications) db.notifications.lastAlertSignature = '';
    saveDB();
    renderLager();
    renderProductVisibilitySettings();
    updateNotificationStatus();
    initBulkProductSelect();
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
            if (isProductHidden(item)) continue;
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
    let body = `${first.item}: ${formatItemAmount(first.item, first.stock)}`;

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
        const unitLabel = getUnitLabel(product.sizeUnit);
        const displaySizes = (product.sizesOriginal && product.sizesOriginal.length > 0)
            ? product.sizesOriginal.map(s => s + ' ' + unitLabel).join(', ')
            : (product.sizes || []).map(s => s.toFixed(1) + ' ' + unitLabel).join(', ') || 'keine';
        return `
        <div class="custom-product-row">
            <span>
                <strong>${product.name}</strong>
                <small>${product.cat} · ${displaySizes} · Dichte ${product.density || 1}</small>
            </span>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" onclick="editCustomProduct(${index})">Bearbeiten</button>
                <button type="button" onclick="deleteCustomProduct(${index})">Löschen</button>
            </div>
        </div>
    `;
    }).join('');
}

function toggleCustomProductUnitFields() {
    const sizeUnitEl = document.getElementById('customProductSizeUnit');
    const sizesEl = document.getElementById('customProductSizes');
    const densityEl = document.getElementById('customProductDensity');
    const sizesGroup = document.getElementById('customProductSizesGroup');
    const densityGroup = document.getElementById('customProductDensityGroup');
    const isPieceUnit = sizeUnitEl && sizeUnitEl.value === 'st';

    [sizesEl, densityEl].forEach(input => {
        if (!input) return;
        input.disabled = isPieceUnit;
        if (isPieceUnit) input.value = '';
    });

    [sizesGroup, densityGroup].forEach(group => {
        if (!group) return;
        group.classList.toggle('disabled-field', Boolean(isPieceUnit));
    });
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
    const sizes = sizeUnit === 'st' ? [] : sizesRaw
        .split(',')
        .map(value => parseFloat(value.trim()))
        .filter(value => !isNaN(value) && value > 0);
    const densityRaw = sizeUnit === 'st' ? 1 : (densityEl && densityEl.value ? parseFloat(densityEl.value) : 1);
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

    db.customProducts.push({ name, cat, sizes, sizeUnit, sizesOriginal: sizes, density });
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

function editCustomProduct(index) {
    const product = db.customProducts && db.customProducts[index];
    if (!product) return;

    const name = prompt('Produktname:', product.name);
    if (!name || !name.trim()) return;
    const cat = prompt('Kategorie:', product.cat);
    if (!cat || !cat.trim()) return;
    const unit = prompt('Einheit (ml, g oder st):', product.sizeUnit || 'ml');
    if (!['ml', 'g', 'st'].includes(unit)) return alert('Bitte ml, g oder st eingeben.');
    const currentSizes = (product.sizesOriginal || product.sizes || []).join(', ');
    const sizesRaw = unit === 'st' ? '' : prompt('Behältergrößen, mit Komma getrennt:', currentSizes);
    if (sizesRaw === null) return;
    const densityRaw = unit === 'st' ? '1' : prompt('Dichte:', product.density || 1);
    if (densityRaw === null) return;

    const sizes = unit === 'st' ? [] : sizesRaw
        .split(',')
        .map(value => parseFloat(value.trim()))
        .filter(value => !isNaN(value) && value > 0);
    const density = parseFloat(densityRaw) > 0 ? parseFloat(densityRaw) : 1;
    const oldName = product.name;
    const oldCat = product.cat;

    product.name = name.trim();
    product.cat = cat.trim();
    product.sizeUnit = unit;
    product.sizes = sizes;
    product.sizesOriginal = sizes;
    product.density = density;

    if (oldName !== product.name || oldCat !== product.cat) {
        const oldStock = db.inventory[oldCat] ? db.inventory[oldCat][oldName] : 0;
        if (db.inventory[oldCat]) delete db.inventory[oldCat][oldName];
        if (!db.inventory[product.cat]) db.inventory[product.cat] = {};
        db.inventory[product.cat][product.name] = db.inventory[product.cat][product.name] || oldStock || 0;
        db.stats[product.name] = db.stats[oldName] || db.stats[product.name] || 0;
        if (oldName !== product.name) delete db.stats[oldName];
        if (db.thresholds && db.thresholds[oldName] !== undefined) {
            db.thresholds[product.name] = db.thresholds[oldName];
            delete db.thresholds[oldName];
        }
        if (db.hiddenProducts && db.hiddenProducts[oldName]) {
            db.hiddenProducts[product.name] = true;
            delete db.hiddenProducts[oldName];
        }
        (db.logs || []).forEach(log => {
            if (log.item === oldName) {
                log.item = product.name;
                log.cat = product.cat;
            }
        });
    }

    saveDB();
    normalizeWarehouseData(db);
    renderCustomProductSettings();
    renderProductVisibilitySettings();
    renderLager();
    initBulkProductSelect();
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

function renderCustomContainers() {
    const list = document.getElementById('custom-containers-list');
    if (!list) return;
    const entries = Object.entries(db.customContainers || {});
    if (entries.length === 0) {
        list.innerHTML = '<p class="hint" style="margin-top: 12px;">Noch keine eigenen Behälter angelegt.</p>';
        return;
    }
    list.innerHTML = entries.map(([name, weight]) => `
        <div class="custom-product-row">
            <span><strong>${name}</strong><small>Leergewicht: ${parseFloat(weight).toFixed(1)} g</small></span>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" onclick='editCustomContainer(${jsArg(name)})'>Bearbeiten</button>
                <button type="button" onclick='deleteCustomContainer(${jsArg(name)})'>Löschen</button>
            </div>
        </div>
    `).join('');
}

function addCustomContainer() {
    const nameEl = document.getElementById('customContainerName');
    const weightEl = document.getElementById('customContainerWeight');
    const name = nameEl ? nameEl.value.trim() : '';
    const weight = weightEl ? parseFloat(weightEl.value) : NaN;
    if (!name || isNaN(weight) || weight < 0) return alert('Bitte Behältername und Leergewicht eingeben.');
    if (!db.customContainers) db.customContainers = {};
    db.customContainers[name] = weight;
    saveDB();
    if (nameEl) nameEl.value = '';
    if (weightEl) weightEl.value = '';
    renderCustomContainers();
    initBulkProductSelect();
}

function editCustomContainer(name) {
    if (!db.customContainers || db.customContainers[name] === undefined) return;
    const newName = prompt('Behältername:', name);
    if (!newName || !newName.trim()) return;
    const newWeightRaw = prompt('Leergewicht in g:', db.customContainers[name]);
    if (newWeightRaw === null) return;
    const newWeight = parseFloat(newWeightRaw);
    if (isNaN(newWeight) || newWeight < 0) return alert('Bitte ein gültiges Leergewicht eingeben.');
    if (newName.trim() !== name) delete db.customContainers[name];
    db.customContainers[newName.trim()] = newWeight;
    saveDB();
    renderCustomContainers();
    initBulkProductSelect();
}

function deleteCustomContainer(name) {
    if (!db.customContainers || db.customContainers[name] === undefined) return;
    if (!confirm(`Behälter "${name}" löschen?`)) return;
    delete db.customContainers[name];
    saveDB();
    renderCustomContainers();
    initBulkProductSelect();
}

function renderProductVisibilitySettings() {
    const container = document.getElementById('product-visibility-list');
    if (!container) return;
    let html = '';
    for (let cat in catalog) {
        let rows = '';
        for (let item in catalog[cat]) {
            const hidden = isProductHidden(item);
            rows += `
                <label class="visibility-row">
                    <input type="checkbox" ${hidden ? '' : 'checked'} onchange='setProductHidden(${jsArg(item)}, !this.checked)'>
                    <span>${item}</span>
                    <small>${hidden ? 'ausgeblendet' : 'sichtbar'}</small>
                </label>
            `;
        }
        html += `<div class="visibility-group"><strong>${cat}</strong>${rows}</div>`;
    }
    container.innerHTML = html;
}

function renderSharedOwnerVisibilitySettings() {
    const container = document.getElementById('shared-owner-visibility-list');
    if (!container) return;
    const ownerEmails = [...new Set(
        [
            ...Object.keys(appState?.knownSharedOwners || {}),
            ...Object.values(appState?.warehouses || {})
            .filter(warehouse => (warehouse.isShared || warehouse.readOnly) && warehouse.ownerEmail)
            .map(warehouse => warehouse.ownerEmail)
        ]
    )].sort((a, b) => a.localeCompare(b, 'de'));

    if (ownerEmails.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine geteilten Lager mit Besitzer-Info geladen.</p>';
        return;
    }

    container.innerHTML = ownerEmails.map(email => {
        const visible = !isSharedOwnerHidden(email);
        const count = Object.values(appState.warehouses || {}).filter(warehouse => warehouse.ownerEmail === email).length;
        return `
            <label class="visibility-row">
                <input type="checkbox" ${visible ? 'checked' : ''} onchange='setSharedOwnerHidden(${jsArg(email)}, !this.checked)'>
                <span>${escapeHtml(email)}</span>
                <small>${visible ? 'sichtbar' : 'ausgeblendet'} · ${count} Lager</small>
            </label>
        `;
    }).join('');
}

function renderCloudShareOverview() {
    const container = document.getElementById('cloud-share-overview');
    if (!container) return;
    const own = Object.values(appState?.warehouses || {}).filter(warehouse => !(warehouse.isShared || warehouse.readOnly));
    const shared = Object.values(appState?.warehouses || {}).filter(warehouse => warehouse.isShared || warehouse.readOnly);
    const ownRows = own.map(warehouse => `<div class="overview-row"><span>${escapeHtml(warehouse.name)}</span><small>Eigenes Lager${warehouse.remoteId ? ' · Cloud' : ' · lokal'}</small></div>`).join('');
    const sharedRows = shared.map(warehouse => `<div class="overview-row"><span>${escapeHtml(warehouse.name)}</span><small>${warehouse.readOnly ? 'Nur lesen' : 'Schreibzugriff'} · von ${escapeHtml(warehouse.ownerEmail || 'unbekannt')}</small></div>`).join('');
    container.innerHTML = `
        <div class="overview-group"><strong>Eigene Lager</strong>${ownRows || '<p class="hint">Keine eigenen Lager.</p>'}</div>
        <div class="overview-group"><strong>Mit mir geteilt</strong>${sharedRows || '<p class="hint">Keine geteilten Lager sichtbar.</p>'}</div>
    `;
}

function renderWarehouseEventLog() {
    const container = document.getElementById('warehouse-event-log');
    if (!container) return;
    const events = (db.warehouseEvents || []).slice(0, 20);
    if (events.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine Cloud-, Share- oder Plan-Ereignisse.</p>';
        return;
    }
    container.innerHTML = events.map(event => `
        <div class="overview-row">
            <span>${escapeHtml(event.text)}</span>
            <small>${formatWarehouseDate(event.at)} · ${escapeHtml(event.type || 'Info')}</small>
        </div>
    `).join('');
}

function setThreshold(item) {
    let current = db.thresholds[item] || 0;
    const unitLabel = getUnitLabel(getItemUnit(item));
    let val = prompt(`Warnschwelle für ${item} (in ${unitLabel}) festlegen:\nFällt der Bestand auf oder unter diesen Wert, wird die Karte rot markiert.\n(Aktuell: ${current} ${unitLabel})`, current);
    
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

function isFavoriteProduct(item) {
    return Boolean(db.favoriteProducts && db.favoriteProducts[item]);
}

function toggleFavoriteProduct(item) {
    if (!db.favoriteProducts) db.favoriteProducts = {};
    if (db.favoriteProducts[item]) delete db.favoriteProducts[item];
    else db.favoriteProducts[item] = true;
    saveDB();
    filterLager();
}

function renderProductCard(cat, item) {
    let stock = db.inventory[cat][item] || 0;
    let stockG = getGrams(item, stock);
    let showMassSubline = itemUsesVolume(item);
    let threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
    let reachText = formatWeeksLeft(item);
    let metrics = getUsageMetrics(item);
    let weeksLeft = getWeeksLeft(item);
    let warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;
    let alertsDisabled = db.alerts && db.alerts.disabled && db.alerts.disabled[item];
    let warningClass = (!alertsDisabled && ((stock <= threshold && threshold > 0) || (stock <= 0 && metrics.totalConsumed > 0) || (weeksLeft !== null && weeksLeft <= warningWeeks))) ? 'card-warning' : '';
    let thresholdHint = threshold > 0 ? `<span class="item-hint danger-text">Warnschwelle: ${threshold} ${getUnitLabel(getItemUnit(item))}</span>` : '';
    let disabledHint = alertsDisabled ? `<span class="item-hint">Warnmeldungen deaktiviert</span>` : '';
    let prognosisHint = `<span class="item-hint">Reichweite: ${reachText}</span>`;
    let favorite = isFavoriteProduct(item);
    let crossHint = "";
    if (item === "Fluor (F)" && stock === 0) {
        let nafStock = (db.inventory["C&R Produkte"] && db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"]) || 0;
        crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ NaF prüfen: ${nafStock.toFixed(1)} ml)</span>`;
    } else if (item === "Natriumfluorid (NaF)" && stock === 0) {
        let fStock = (db.inventory["Anionen"] && db.inventory["Anionen"]["Fluor (F)"]) || 0;
        crossHint = `<span class="cross-hint">⚠️ Leer! (Alternativ Fluor prüfen: ${fStock.toFixed(1)} ml)</span>`;
    }
    return `
        <div class="card ${warningClass}">
            <h4>
                <span style="display:flex; align-items:center; gap:8px; min-width:0;">
                    ${warningClass ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--danger);flex-shrink:0;"></span>' : ''}
                    <button class="threshold-btn favorite-btn ${favorite ? 'active' : ''}" onclick='toggleFavoriteProduct(${jsArg(item)})' title="Favorit umschalten">${favorite ? '★' : '☆'}</button>
                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item}</span>
                    <button class="threshold-btn" onclick='setThreshold(${jsArg(item)})' title="Warnschwelle setzen">🔔</button>
                </span>
                <span class="stock" style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span>${formatItemAmount(item, stock)}</span>
                    ${showMassSubline ? `<span style="font-size: 0.7rem; opacity: 0.6; font-weight: normal;">${stockG} g</span>` : ''}
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

    const favoriteRows = [];
    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            if (!isFavoriteProduct(item)) continue;
            if (selectedCategory !== 'all' && selectedCategory !== cat) continue;
            if (!item.toLowerCase().includes(term)) continue;
            favoriteRows.push(renderProductCard(cat, item));
        }
    }
    if (favoriteRows.length > 0) {
        listContainer.innerHTML += `<h2 class="category-title">Favoriten</h2>${favoriteRows.join('')}`;
    }
    
    for (let cat in catalog) {
        if (selectedCategory !== 'all' && selectedCategory !== cat) continue;

        let catHTML = `<h2 class="category-title">${cat}</h2>`;
        let hasItems = false;
        
        for (let item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            if (item.toLowerCase().includes(term)) {
                hasItems = true;
                catHTML += renderProductCard(cat, item);
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
        if (alert.isUnderThreshold) reason = `unter Warnschwelle (${alert.threshold} ${getUnitLabel(getItemUnit(alert.item))})`;
        if (alert.isSoonEmpty && alert.weeksLeft !== null && alert.stock > 0) reason = `leer in ${alert.weeksLeft.toFixed(1)} Wochen`;
        return `
            <div class="alert-row">
                <span><strong>${alert.item}</strong><small>${alert.cat} · ${formatItemAmount(alert.item, alert.stock)}</small></span>
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
    if (!db.traceDraft) db.traceDraft = {};
    
    if (katContainer) {
        katContainer.innerHTML = mixDefinitions.kationen.map(item => {
            let id = 'mix-kat-' + item.replace(/[^a-zA-Z]/g, '');
            const value = db.traceDraft[item] || '';
            return `
            <div class="trace-grid">
                <label>${item}</label>
                <input type="number" step="0.1" min="0" placeholder="0.0" id="${id}" value="${value}" oninput="updateTraceDraft('${id}', ${jsArg(item)})">
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span class="unit-label">ml</span>
                    <span id="${id}-g" style="font-size: 0.75rem; color: var(--secondary); font-weight: 600;">${((parseFloat(value) || 0) * (densityFactors[item] || 1)).toFixed(2)} g</span>
                </div>
            </div>
        `}).join('');
    }
    if (anContainer) {
        anContainer.innerHTML = mixDefinitions.anionen.map(item => {
            let id = 'mix-an-' + item.replace(/[^a-zA-Z]/g, '');
            const value = db.traceDraft[item] || '';
            return `
            <div class="trace-grid">
                <label>${item}</label>
                <input type="number" step="0.1" min="0" placeholder="0.0" id="${id}" value="${value}" oninput="updateTraceDraft('${id}', ${jsArg(item)})">
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span class="unit-label">ml</span>
                    <span id="${id}-g" style="font-size: 0.75rem; color: var(--secondary); font-weight: 600;">${((parseFloat(value) || 0) * (densityFactors[item] || 1)).toFixed(2)} g</span>
                </div>
            </div>
        `}).join('');
    }
    previewReefManagerImport();
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

function updateTraceDraft(inputId, itemName) {
    if (!db.traceDraft) db.traceDraft = {};
    const inputEl = document.getElementById(inputId);
    const value = parseFloat(inputEl?.value);
    if (value > 0) db.traceDraft[itemName] = inputEl.value;
    else delete db.traceDraft[itemName];
    calcTraceGrams(inputId, itemName);
    saveDB(false);
}

const reefManagerSymbolMap = {
    Co: 'Cobalt (Co)',
    Ni: 'Nickel (Ni)',
    Fe: 'Eisen (Fe)',
    Mn: 'Mangan (Mn)',
    Cu: 'Kupfer (Cu)',
    Cr: 'Chrom (Cr)',
    Zn: 'Zink (Zn)',
    F: 'Fluor (F)',
    I: 'Iod (I)',
    Se: 'Selen (Se)',
    V: 'Vanadium (V)'
};

function parseReefManagerExport(text) {
    const rows = [];
    String(text || '').split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!/^(Kation|Anion)\b/i.test(trimmed)) return;
        const normalized = trimmed.replace(/\t/g, ' ');
        const match = normalized.match(/^(Kation|Anion)\s+([^\s]+)\s+([A-Za-z]+)\s+([0-9]+(?:[,.][0-9]+)?)/i);
        if (!match) return;
        const type = match[1].toLowerCase();
        const symbol = match[3];
        const amount = parseFloat(match[4].replace(',', '.'));
        const item = reefManagerSymbolMap[symbol];
        if (item && amount > 0) rows.push({ type, symbol, item, amount });
    });
    return rows;
}

function previewReefManagerImport() {
    const preview = document.getElementById('reef-manager-import-preview');
    if (!preview) return;
    const text = document.getElementById('reef-manager-import-text')?.value || '';
    const rows = parseReefManagerExport(text);
    if (rows.length === 0) {
        preview.innerHTML = 'Noch kein gültiger Reef Manager Export erkannt.';
        return;
    }
    preview.innerHTML = `
        <div class="tool-result">
            ${rows.map(row => `
                <div class="tool-row">
                    <span><strong>${escapeHtml(row.item)}</strong><small>${row.type === 'kation' ? 'Kation' : 'Anion'} · ${escapeHtml(row.symbol)}</small></span>
                    <span>${row.amount.toFixed(2)} ml</span>
                </div>
            `).join('')}
        </div>
    `;
}

function importReefManagerTrace() {
    const text = document.getElementById('reef-manager-import-text')?.value || '';
    const rows = parseReefManagerExport(text);
    if (rows.length === 0) return alert('Keine gültigen Anionen/Kationen-Mengen erkannt.');
    if (!db.traceDraft) db.traceDraft = {};
    rows.forEach(row => {
        db.traceDraft[row.item] = String(row.amount.toFixed(2));
    });
    saveDB(false);
    renderTraceExportInputs();
    showToast(`${rows.length} Reef Manager Wert(e) übernommen`, 'success');
}

function clearReefManagerImport() {
    const area = document.getElementById('reef-manager-import-text');
    if (area) area.value = '';
    previewReefManagerImport();
}

function initTools() {
    const select = document.getElementById('macroRecipeSelect');
    if (select && select.options.length === 0) {
        select.innerHTML = Object.keys(macroRecipes)
            .map(name => `<option value="${name}">${name}</option>`)
            .join('');
    }
    renderMacroRecipe();
    renderNutritionCalculator();
    renderSeaWaterPresetSelect();
    renderSeaWaterMix();
    renderNaclSolutionCalculator();
    syncMajorCorrectionInputsFromSettings(true);
    renderMajorCorrectionCalculator();
    renderConsumptionCalculator();
    renderTestCorrectionTool();
    renderWaterChangeCalculator();
    renderSaltCorrectionCalculator();
    renderFeedNutrientLog();
    renderLightPlanner();
    renderFlowCalculator();
    renderOsmoseTank();
    renderPsuCorrectionSettings();
    renderImplementationLog();
    updateSalinityCalculator();
    updateSimpleSalinityConverter();
}

const majorCorrectionDefaultSettings = { tankLiters: 100, strengths: { KH: 0.05, Ca: 1 } };

function getMajorCorrectionUnit(element) {
    return element === 'KH' ? 'dKH' : 'mg/l';
}

function getMajorCorrectionSettings() {
    if (!db.majorCorrectionSettings) db.majorCorrectionSettings = JSON.parse(JSON.stringify(majorCorrectionDefaultSettings));
    if (!db.majorCorrectionSettings.strengths) db.majorCorrectionSettings.strengths = {};
    ['KH', 'Ca'].forEach(element => {
        if (db.majorCorrectionSettings.strengths[element] === undefined) {
            db.majorCorrectionSettings.strengths[element] = majorCorrectionDefaultSettings.strengths[element];
        }
    });
    if (!db.majorCorrectionSettings.tankLiters) db.majorCorrectionSettings.tankLiters = majorCorrectionDefaultSettings.tankLiters;
    return db.majorCorrectionSettings;
}

function syncMajorCorrectionInputsFromSettings(force = false) {
    const settings = getMajorCorrectionSettings();
    const element = document.getElementById('majorCorrectionElement')?.value || 'KH';
    const litersEl = document.getElementById('majorCorrectionLiters');
    const strengthEl = document.getElementById('majorCorrectionStrength');
    if (litersEl && (force || !litersEl.value)) {
        litersEl.value = settings.tankLiters;
    }
    if (strengthEl && (force || !strengthEl.value)) {
        strengthEl.value = settings.strengths[element];
    }
}

function selectMajorCorrectionElement() {
    syncMajorCorrectionInputsFromSettings(true);
    renderMajorCorrectionCalculator();
}

function saveMajorCorrectionDefaults() {
    const element = document.getElementById('majorCorrectionElement')?.value || 'KH';
    const tankLiters = Math.max(1, parseFloat(document.getElementById('majorCorrectionLiters')?.value) || majorCorrectionDefaultSettings.tankLiters);
    const strength = Math.max(0.0001, parseFloat(document.getElementById('majorCorrectionStrength')?.value) || majorCorrectionDefaultSettings.strengths[element]);
    const settings = getMajorCorrectionSettings();
    settings.tankLiters = tankLiters;
    settings.strengths[element] = strength;
    saveDB();
    renderMajorCorrectionCalculator();
    showToast('Korrektur-Voreinstellung gespeichert', 'success');
}

function resetMajorCorrectionDefaults() {
    if (!confirm('KH/CA Korrektur-Voreinstellungen zurücksetzen?')) return;
    db.majorCorrectionSettings = JSON.parse(JSON.stringify(majorCorrectionDefaultSettings));
    saveDB();
    syncMajorCorrectionInputsFromSettings(true);
    renderMajorCorrectionCalculator();
}

function renderMajorCorrectionCalculator() {
    const result = document.getElementById('majorCorrectionResult');
    if (!result) return;
    syncMajorCorrectionInputsFromSettings();
    const element = document.getElementById('majorCorrectionElement')?.value || 'KH';
    const liters = Math.max(0, parseFloat(document.getElementById('majorCorrectionLiters')?.value) || 0);
    const current = parseFloat(document.getElementById('majorCorrectionCurrent')?.value);
    const target = parseFloat(document.getElementById('majorCorrectionTarget')?.value);
    const strength = Math.max(0, parseFloat(document.getElementById('majorCorrectionStrength')?.value) || 0);
    const days = Math.max(1, parseInt(document.getElementById('majorCorrectionDays')?.value, 10) || 1);
    const unit = getMajorCorrectionUnit(element);
    const label = document.getElementById('majorCorrectionStrengthLabel');
    if (label) label.innerText = `Produktwirkung pro 1 ml / 100 L (${unit}):`;
    if (!liters || Number.isNaN(current) || Number.isNaN(target) || !strength) {
        result.innerHTML = '<p class="hint">Bitte Beckenvolumen, Werte und Produktwirkung eintragen.</p>';
        return;
    }
    const diff = target - current;
    const totalMl = diff > 0 ? (diff / strength) * (liters / 100) : 0;
    const dailyMl = totalMl / days;
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>${element} Änderung</strong><small>${current.toFixed(2)} → ${target.toFixed(2)} ${unit}</small></span>
                <span>${diff >= 0 ? '+' : ''}${diff.toFixed(2)} ${unit}</span>
            </div>
            <div class="tool-row ${diff <= 0 ? 'missing' : ''}">
                <span><strong>Dosiermenge</strong><small>Produktwirkung: ${strength} ${unit} pro 1 ml / 100 L</small></span>
                <span>${diff > 0 ? totalMl.toFixed(2) + ' ml' : 'keine Erhöhung nötig'}</span>
            </div>
            <div class="tool-row">
                <span><strong>Schonend aufteilen</strong><small>${days} Tag(e)</small></span>
                <span>${diff > 0 ? dailyMl.toFixed(2) + ' ml/Tag' : '-'}</span>
            </div>
        </div>
    `;
}

function renderConsumptionCalculator() {
    const result = document.getElementById('consumptionResult');
    if (!result) return;
    const element = document.getElementById('consumptionElement')?.value || 'KH';
    const start = parseFloat(document.getElementById('consumptionStart')?.value);
    const end = parseFloat(document.getElementById('consumptionEnd')?.value);
    const days = Math.max(0, parseFloat(document.getElementById('consumptionDays')?.value) || 0);
    const unit = element === 'KH' ? 'dKH' : 'mg/l';
    if (Number.isNaN(start) || Number.isNaN(end) || !days) {
        result.innerHTML = '<p class="hint">Bitte beide Messwerte und den Zeitraum eintragen.</p>';
        return;
    }
    const change = end - start;
    const daily = change / days;
    const trend = daily < 0 ? 'Verbrauch / Abnahme' : daily > 0 ? 'Anstieg' : 'stabil';
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>${element} ${trend}</strong><small>${start.toFixed(2)} → ${end.toFixed(2)} ${unit} in ${days.toFixed(1)} Tag(en)</small></span>
                <span>${daily.toFixed(3)} ${unit}/Tag</span>
            </div>
            <div class="tool-row">
                <span><strong>Wöchentliche Veränderung</strong><small>Zur groben Planung von Messintervallen und Dosierung.</small></span>
                <span>${(daily * 7).toFixed(3)} ${unit}/Woche</span>
            </div>
        </div>
    `;
}

const testCorrectionMeta = {
    KH: { label: 'KH Alkalinität', unit: 'dKH', defaultValue: 7.5 },
    Ca: { label: 'CA Calcium', unit: 'mg/l', defaultValue: 425 },
    Mg: { label: 'MG Magnesium', unit: 'mg/l', defaultValue: 1350 },
    PO4: { label: 'PO4 Phosphat', unit: 'mg/l', defaultValue: 0.05 },
    NO3: { label: 'NO3 Nitrat', unit: 'mg/l', defaultValue: 5 }
};

function selectTestCorrectionElement() {
    const element = document.getElementById('testCorrectionElement')?.value || 'KH';
    const meta = testCorrectionMeta[element] || testCorrectionMeta.KH;
    ['testCorrectionHome', 'testCorrectionReference', 'testCorrectionMeasured'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = meta.defaultValue;
    });
    renderTestCorrectionTool();
}

function getTestCorrection(element) {
    if (!db.testCorrections) db.testCorrections = {};
    return db.testCorrections[element] || null;
}

function renderTestCorrectionTool() {
    const result = document.getElementById('testCorrectionResult');
    if (!result) return;
    const element = document.getElementById('testCorrectionElement')?.value || 'KH';
    const home = parseFloat(document.getElementById('testCorrectionHome')?.value);
    const reference = parseFloat(document.getElementById('testCorrectionReference')?.value);
    const measured = parseFloat(document.getElementById('testCorrectionMeasured')?.value);
    const saved = getTestCorrection(element);
    const factorPreview = !Number.isNaN(home) && home !== 0 && !Number.isNaN(reference) ? reference / home : null;
    const activeFactor = saved ? saved.factor : factorPreview;
    const meta = testCorrectionMeta[element] || testCorrectionMeta.KH;
    const corrected = activeFactor && !Number.isNaN(measured) ? measured * activeFactor : null;
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>${meta.label}</strong><small>${saved ? `Gespeichert am ${formatWarehouseDate(saved.updatedAt)}` : 'Noch kein Faktor gespeichert'}</small></span>
                <span>${saved ? saved.factor.toFixed(4) : '-'}</span>
            </div>
            <div class="tool-row">
                <span><strong>Neuer Faktor aus Referenz</strong><small>${Number.isFinite(factorPreview) ? `${reference} / ${home}` : 'Heimtest und Referenz eintragen'}</small></span>
                <span>${Number.isFinite(factorPreview) ? factorPreview.toFixed(4) : '-'}</span>
            </div>
            <div class="tool-row">
                <span><strong>Korrigierter Messwert</strong><small>${saved ? 'Mit gespeichertem Faktor berechnet' : 'Vorschau mit neuem Faktor'}</small></span>
                <span>${Number.isFinite(corrected) ? corrected.toFixed(element === 'KH' ? 2 : 3) + ' ' + meta.unit : '-'}</span>
            </div>
        </div>
    `;
}

function saveTestCorrectionFactor() {
    const element = document.getElementById('testCorrectionElement')?.value || 'KH';
    const home = parseFloat(document.getElementById('testCorrectionHome')?.value);
    const reference = parseFloat(document.getElementById('testCorrectionReference')?.value);
    if (!home || Number.isNaN(home) || Number.isNaN(reference)) return alert('Bitte Heimtest-Wert und Referenzwert eintragen.');
    if (!db.testCorrections) db.testCorrections = {};
    db.testCorrections[element] = {
        factor: reference / home,
        home,
        reference,
        updatedAt: new Date().toISOString()
    };
    saveDB();
    renderTestCorrectionTool();
    showToast('Korrekturfaktor gespeichert', 'success');
}

function deleteTestCorrectionFactor() {
    const element = document.getElementById('testCorrectionElement')?.value || 'KH';
    if (!db.testCorrections || !db.testCorrections[element]) return alert('Für diesen Test ist kein Faktor gespeichert.');
    if (!confirm('Korrekturfaktor für diesen Test löschen?')) return;
    delete db.testCorrections[element];
    saveDB();
    renderTestCorrectionTool();
}

function renderWaterChangeCalculator() {
    const result = document.getElementById('waterChangeResult');
    if (!result) return;
    const tank = Math.max(0, parseFloat(document.getElementById('waterChangeTankLiters')?.value) || 0);
    const change = Math.max(0, parseFloat(document.getElementById('waterChangeLiters')?.value) || 0);
    const current = parseFloat(document.getElementById('waterChangeCurrent')?.value);
    const fresh = parseFloat(document.getElementById('waterChangeNew')?.value);
    if (!tank || Number.isNaN(current) || Number.isNaN(fresh)) {
        result.innerHTML = '<p class="hint">Bitte Beckenvolumen und Werte eintragen.</p>';
        return;
    }
    const clampedChange = Math.min(change, tank);
    const ratio = clampedChange / tank;
    const after = current * (1 - ratio) + fresh * ratio;
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Wasserwechsel Anteil</strong><small>${clampedChange.toFixed(1)} L von ${tank.toFixed(1)} L</small></span>
                <span>${(ratio * 100).toFixed(1)} %</span>
            </div>
            <div class="tool-row">
                <span><strong>Erwarteter Wert danach</strong><small>Rechnerisch direkt nach vollständiger Durchmischung.</small></span>
                <span>${after.toFixed(3)}</span>
            </div>
            <div class="tool-row">
                <span><strong>Änderung</strong><small>Von ${current} auf ${after.toFixed(3)}</small></span>
                <span>${(after - current).toFixed(3)}</span>
            </div>
        </div>
    `;
}

function renderSaltCorrectionCalculator() {
    const result = document.getElementById('saltCorrectionResult');
    if (!result) return;
    const liters = Math.max(0, parseFloat(document.getElementById('saltCorrectionLiters')?.value) || 0);
    const current = Math.max(0, parseFloat(document.getElementById('saltCorrectionCurrent')?.value) || 0);
    const target = Math.max(0, parseFloat(document.getElementById('saltCorrectionTarget')?.value) || 0);
    if (!liters || !current || !target) {
        result.innerHTML = '<p class="hint">Bitte Volumen, aktuelle PSU und Ziel-PSU eintragen.</p>';
        return;
    }
    const diff = target - current;
    let action = '';
    if (diff > 0) {
        action = `
            <div class="tool-row">
                <span><strong>Salz ergänzen</strong><small>Näherung: 1 PSU entspricht etwa 1 g Salz pro Liter.</small></span>
                <span>${(diff * liters).toFixed(0)} g</span>
            </div>
        `;
    } else if (diff < 0) {
        const roLiters = liters * (1 - target / current);
        action = `
            <div class="tool-row">
                <span><strong>Mit Osmosewasser senken</strong><small>So viel Beckenwasser entnehmen und durch Osmosewasser ersetzen.</small></span>
                <span>${Math.max(0, roLiters).toFixed(1)} L</span>
            </div>
        `;
    } else {
        action = '<div class="tool-row"><span><strong>Keine Korrektur nötig</strong><small>Aktuelle PSU entspricht Zielwert.</small></span><span>0</span></div>';
    }
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Salzgehalt Änderung</strong><small>${current.toFixed(1)} → ${target.toFixed(1)} PSU</small></span>
                <span>${diff >= 0 ? '+' : ''}${diff.toFixed(1)} PSU</span>
            </div>
            ${action}
        </div>
    `;
}

function renderFeedNutrientLog() {
    const dateEl = document.getElementById('feedLogDate');
    const result = document.getElementById('feedNutrientLogResult');
    if (dateEl && !dateEl.value) dateEl.value = formatDateTimeLocal();
    if (!result) return;
    const entries = (db.feedNutrientLog || []).slice(0, 20);
    if (!entries.length) {
        result.innerHTML = '<p class="hint">Noch keine Futter- oder Nährstoffnotizen gespeichert.</p>';
        return;
    }
    result.innerHTML = `
        <div class="tool-result">
            ${entries.map(entry => `
                <div class="tool-row">
                    <span>
                        <strong>${escapeHtml(entry.food || 'Eintrag')}</strong>
                        <small>${formatWarehouseDate(entry.at)} · ${escapeHtml(entry.amount || '-')} · NO3 ${entry.no3 || '-'} · PO4 ${entry.po4 || '-'}</small>
                        ${entry.note ? `<small>${escapeHtml(entry.note)}</small>` : ''}
                    </span>
                    <button class="btn-out" onclick="deleteFeedNutrientLog('${entry.id}')">Löschen</button>
                </div>
            `).join('')}
        </div>
    `;
}

function saveFeedNutrientLog() {
    if (!db.feedNutrientLog) db.feedNutrientLog = [];
    const food = (document.getElementById('feedLogFood')?.value || '').trim();
    const amount = (document.getElementById('feedLogAmount')?.value || '').trim();
    const note = (document.getElementById('feedLogNote')?.value || '').trim();
    const atValue = document.getElementById('feedLogDate')?.value;
    const no3 = document.getElementById('feedLogNo3')?.value || '';
    const po4 = document.getElementById('feedLogPo4')?.value || '';
    if (!food && !amount && !note && !no3 && !po4) return alert('Bitte Futter, Werte oder eine Notiz eintragen.');
    db.feedNutrientLog.unshift({
        id: createWarehouseId(),
        at: atValue ? new Date(atValue).toISOString() : new Date().toISOString(),
        food,
        amount,
        no3,
        po4,
        note,
        createdAt: new Date().toISOString()
    });
    saveDB();
    ['feedLogFood', 'feedLogAmount', 'feedLogNo3', 'feedLogPo4', 'feedLogNote'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    renderFeedNutrientLog();
}

function deleteFeedNutrientLog(id) {
    if (!confirm('Eintrag löschen?')) return;
    db.feedNutrientLog = (db.feedNutrientLog || []).filter(entry => entry.id !== id);
    saveDB();
    renderFeedNutrientLog();
}

function parseTimeMinutes(value) {
    const [hours, minutes] = String(value || '00:00').split(':').map(num => parseInt(num, 10) || 0);
    return hours * 60 + minutes;
}

function formatDuration(minutes) {
    const safe = Math.max(0, Math.round(minutes));
    const h = Math.floor(safe / 60);
    const m = safe % 60;
    return `${h} h ${String(m).padStart(2, '0')} min`;
}

function renderLightPlanner() {
    const result = document.getElementById('lightPlannerResult');
    if (!result) return;
    const start = parseTimeMinutes(document.getElementById('lightStart')?.value || '10:00');
    let end = parseTimeMinutes(document.getElementById('lightEnd')?.value || '21:00');
    if (end <= start) end += 24 * 60;
    const rampUp = Math.max(0, parseFloat(document.getElementById('lightRampUp')?.value) || 0);
    const rampDown = Math.max(0, parseFloat(document.getElementById('lightRampDown')?.value) || 0);
    const total = end - start;
    const peak = Math.max(0, total - rampUp - rampDown);
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Gesamte Lichtzeit</strong><small>Von Start bis Ende inklusive Rampen.</small></span>
                <span>${formatDuration(total)}</span>
            </div>
            <div class="tool-row">
                <span><strong>Volle Beleuchtung</strong><small>Nach Abzug von Ramp-Up und Ramp-Down.</small></span>
                <span>${formatDuration(peak)}</span>
            </div>
        </div>
    `;
}

function renderFlowCalculator() {
    const result = document.getElementById('flowCalculatorResult');
    if (!result) return;
    const liters = Math.max(0, parseFloat(document.getElementById('flowTankLiters')?.value) || 0);
    const totalFlow = [1, 2, 3, 4].reduce((sum, index) => sum + Math.max(0, parseFloat(document.getElementById(`flowPump${index}`)?.value) || 0), 0);
    const turnover = liters > 0 ? totalFlow / liters : 0;
    let hint = 'Sanft bis mittel';
    if (turnover >= 40) hint = 'Sehr stark, eher SPS-orientiert';
    else if (turnover >= 20) hint = 'Kräftig, für viele Riffbecken passend';
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Gesamtleistung</strong><small>Summe aller eingetragenen Strömungspumpen.</small></span>
                <span>${totalFlow.toFixed(0)} L/h</span>
            </div>
            <div class="tool-row">
                <span><strong>Umsatz pro Stunde</strong><small>${hint}</small></span>
                <span>${turnover.toFixed(1)} x</span>
            </div>
        </div>
    `;
}

function getOsmoseTank() {
    if (!db.osmoseTank) db.osmoseTank = { capacityLiters: 50, currentLiters: 50, warnDays: 2, usageLog: [], lastAlertSignature: '', lastAlertAt: 0 };
    if (!db.osmoseTank.usageLog) db.osmoseTank.usageLog = [];
    return db.osmoseTank;
}

function calculateOsmoseDailyUsage() {
    const tank = getOsmoseTank();
    const entries = (tank.usageLog || []).slice().sort((a, b) => new Date(a.at) - new Date(b.at));
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, entry) => sum + (parseFloat(entry.liters) || 0), 0);
    if (entries.length === 1) return total;
    const first = new Date(entries[0].at).getTime();
    const last = new Date(entries[entries.length - 1].at).getTime();
    const days = Math.max(1, (last - first) / (24 * 60 * 60 * 1000));
    return total / days;
}

function syncOsmoseTankInputs() {
    const tank = getOsmoseTank();
    const capacity = document.getElementById('osmoseTankCapacity');
    const current = document.getElementById('osmoseTankCurrent');
    const warn = document.getElementById('osmoseTankWarnDays');
    if (capacity && !capacity.matches(':focus')) capacity.value = tank.capacityLiters ?? 50;
    if (current && !current.matches(':focus')) current.value = tank.currentLiters ?? tank.capacityLiters ?? 50;
    if (warn && !warn.matches(':focus')) warn.value = tank.warnDays ?? 2;
}

function updateOsmoseTankSettings() {
    const tank = getOsmoseTank();
    const capacity = Math.max(0, parseFloat(document.getElementById('osmoseTankCapacity')?.value) || 0);
    const current = Math.max(0, parseFloat(document.getElementById('osmoseTankCurrent')?.value) || 0);
    const warnDays = Math.max(0, parseInt(document.getElementById('osmoseTankWarnDays')?.value, 10) || 0);
    tank.capacityLiters = capacity;
    tank.currentLiters = Math.min(current, capacity || current);
    tank.warnDays = warnDays;
    saveDB(false);
    renderOsmoseTank(false);
}

function addOsmoseTankUsage() {
    const tank = getOsmoseTank();
    const input = document.getElementById('osmoseTankUsageLiters');
    const liters = Math.max(0, parseFloat(input?.value) || 0);
    if (!liters) return alert('Bitte Verbrauch in Litern eintragen.');
    tank.currentLiters = Math.max(0, (parseFloat(tank.currentLiters) || 0) - liters);
    tank.usageLog.unshift({ id: createWarehouseId(), liters, at: new Date().toISOString() });
    tank.lastAlertSignature = '';
    if (input) input.value = '';
    addWarehouseEvent('osmose', `Osmosewasser verbraucht: ${liters.toFixed(1)} L`);
    saveDB();
    renderOsmoseTank();
    checkOsmoseTankReminder('manual');
}

function fillOsmoseTank() {
    const tank = getOsmoseTank();
    const capacity = Math.max(0, parseFloat(document.getElementById('osmoseTankCapacity')?.value) || tank.capacityLiters || 0);
    if (!capacity) return alert('Bitte zuerst die Tankgröße eintragen.');
    tank.capacityLiters = capacity;
    tank.currentLiters = capacity;
    tank.lastAlertSignature = '';
    addWarehouseEvent('osmose', `Osmosetank gefüllt: ${capacity.toFixed(1)} L`);
    saveDB();
    renderOsmoseTank();
    showToast('Osmosetank als voll gespeichert', 'success');
}

function renderOsmoseTank(updateInputs = true) {
    const result = document.getElementById('osmoseTankResult');
    if (!result) return;
    const tank = getOsmoseTank();
    if (updateInputs) syncOsmoseTankInputs();
    const capacity = parseFloat(tank.capacityLiters) || 0;
    const current = Math.min(parseFloat(tank.currentLiters) || 0, capacity || parseFloat(tank.currentLiters) || 0);
    const daily = calculateOsmoseDailyUsage();
    const daysLeft = daily > 0 ? current / daily : null;
    const fillPercent = capacity > 0 ? Math.max(0, Math.min(100, (current / capacity) * 100)) : 0;
    const warning = daysLeft !== null && daysLeft <= (tank.warnDays || 0);
    const recentRows = (tank.usageLog || []).slice(0, 5).map(entry => `
        <div class="tool-row">
            <span><strong>${formatWarehouseDate(entry.at)}</strong><small>Verbrauch dokumentiert</small></span>
            <span>${(parseFloat(entry.liters) || 0).toFixed(1)} L</span>
        </div>
    `).join('');
    result.innerHTML = `
        <div class="tool-result ${warning ? 'missing' : ''}">
            <div class="tool-row">
                <span><strong>Füllstand</strong><small>${fillPercent.toFixed(0)} % von ${capacity.toFixed(1)} L</small></span>
                <span>${current.toFixed(1)} L</span>
            </div>
            <div class="tool-row">
                <span><strong>Ø Verbrauch</strong><small>Aus deinen dokumentierten Entnahmen berechnet.</small></span>
                <span>${daily > 0 ? daily.toFixed(2) + ' L/Tag' : 'noch keine Daten'}</span>
            </div>
            <div class="tool-row">
                <span><strong>Reicht noch ca.</strong><small>Warnung ab ${tank.warnDays || 0} Tag(en) Restreichweite.</small></span>
                <span>${daysLeft !== null ? daysLeft.toFixed(1) + ' Tage' : 'unbekannt'}</span>
            </div>
            ${recentRows ? `<div style="margin-top:8px;">${recentRows}</div>` : ''}
        </div>
    `;
}

function checkOsmoseTankReminder(trigger = 'auto') {
    if (!db || !db.notifications || !db.notifications.enabled) return;
    const tank = getOsmoseTank();
    const daily = calculateOsmoseDailyUsage();
    if (!daily) return;
    const current = parseFloat(tank.currentLiters) || 0;
    const daysLeft = current / daily;
    if (daysLeft > (tank.warnDays || 0)) return;
    const signature = `${Math.round(current * 10) / 10}:${Math.round(daysLeft * 10) / 10}:${tank.warnDays}`;
    const now = Date.now();
    const pause = trigger === 'manual' ? 0 : 1000 * 60 * 60 * 12;
    if (tank.lastAlertSignature === signature && now - (tank.lastAlertAt || 0) < pause) return;
    const title = 'Osmosetank bald leer';
    const body = `Noch ca. ${current.toFixed(1)} L, reicht etwa ${daysLeft.toFixed(1)} Tag(e).`;
    if (db.notifications.inAppOnly || !supportsNotifications() || Notification.permission !== 'granted') {
        showToast(`${title}: ${body}`, 'warning', 6000);
    } else {
        showLocalNotification(title, body);
    }
    tank.lastAlertSignature = signature;
    tank.lastAlertAt = now;
    saveDB(false);
}

function renderNutritionCalculator() {
    const result = document.getElementById('nutritionResult');
    if (!result) return;
    const element = document.getElementById('nutritionElement')?.value || 'Nitrat';
    const rule = nutritionDoseRules[element] || nutritionDoseRules.Nitrat;
    const label = document.getElementById('nutritionTargetLabel');
    if (label) label.innerText = rule.targetLabel;
    const liters = Math.max(0, parseFloat(document.getElementById('nutritionTankLiters')?.value) || 0);
    const targetChange = Math.max(0, parseFloat(document.getElementById('nutritionIncrease')?.value) || 0);
    const days = Math.max(1, parseInt(document.getElementById('nutritionPlanDays')?.value, 10) || 1);
    if (!liters || !targetChange) {
        result.innerHTML = '<p class="hint">Trage Aquariumgröße und gewünschte Zieländerung ein.</p>';
        return;
    }
    const totalMl = (liters / 100) * (targetChange / rule.primaryChange) * rule.mlPer100L;
    const dailyMl = totalMl / days;
    const resolved = resolveRecipeItem({ item: rule.product });
    const stock = resolved ? ((db.inventory[resolved.cat] && db.inventory[resolved.cat][resolved.item]) || 0) : null;
    const stockHint = resolved ? `Bestand: ${formatItemAmount(resolved.item, stock)}` : 'nicht lagergeführt';
    const missingClass = resolved && stock < totalMl ? ' missing' : '';
    const planRows = Array.from({ length: days }, (_, index) => `
        <label class="dose-plan-row">
            <input type="checkbox">
            <span>Tag ${index + 1}</span>
            <strong>${dailyMl.toFixed(2)} ml</strong>
        </label>
    `).join('');
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row${missingClass}">
                <span><strong>${element}</strong><small>${rule.primary} ${rule.action} um ${targetChange} mg/l · ${stockHint}</small></span>
                <span>${totalMl.toFixed(2)} ml</span>
            </div>
            <div class="tool-row">
                <span><strong>Dosierbasis</strong><small>1 ml pro 100 L ${rule.action} ${rule.primary} um ${rule.primaryChange} mg/l</small></span>
                <span>${dailyMl.toFixed(2)} ml/Tag</span>
            </div>
            <div class="dose-plan">${planRows}</div>
        </div>
        <div class="tool-action-row">
            <button class="btn-danger btn-animated" onclick="bookNutritionDose()">Aus Lager auslagern</button>
        </div>
    `;
}

function bookNutritionDose() {
    const element = document.getElementById('nutritionElement')?.value || 'Nitrat';
    const rule = nutritionDoseRules[element] || nutritionDoseRules.Nitrat;
    const liters = Math.max(0, parseFloat(document.getElementById('nutritionTankLiters')?.value) || 0);
    const targetChange = Math.max(0, parseFloat(document.getElementById('nutritionIncrease')?.value) || 0);
    const totalMl = (liters / 100) * (targetChange / rule.primaryChange) * rule.mlPer100L;
    const resolved = resolveRecipeItem({ item: rule.product });
    if (!resolved) return alert(`${rule.product} ist nicht lagergeführt.`);
    if (!totalMl) return alert('Bitte erst Aquariumgröße und Zieländerung eintragen.');
    if (!confirm(`${totalMl.toFixed(2)} ml ${rule.product} auslagern?`)) return;
    executeQueueWithConflictHandling([{ ...resolved, amount: totalMl }], 0);
}

function getSeaWaterScale() {
    return Math.max(0, parseFloat(document.getElementById('seaWaterLiters')?.value) || 0) / 100;
}

function renderSeaWaterPresetSelect() {
    const select = document.getElementById('seaWaterPresetSelect');
    if (!select) return;
    const presets = db.crSeaWaterPresets || {};
    const names = Object.keys(presets).sort((a, b) => a.localeCompare(b, 'de'));
    select.innerHTML = `<option value="">Preset wählen ...</option>${names.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)} · ${presets[name]} L</option>`).join('')}`;
}

function renderSeaWaterMix() {
    const result = document.getElementById('seaWaterMixResult');
    if (!result) return;
    const liters = Math.max(0, parseFloat(document.getElementById('seaWaterLiters')?.value) || 0);
    const scale = liters / 100;
    if (!liters) {
        result.innerHTML = '<p class="hint">Trage die gewünschte Meerwassermenge ein.</p>';
        return;
    }
    const rows = seaWaterRecipePer100L.map(entry => {
        const amount = entry.amount * scale;
        const resolved = resolveRecipeItem(entry);
        const stock = resolved ? ((db.inventory[resolved.cat] && db.inventory[resolved.cat][resolved.item]) || 0) : null;
        const missing = resolved && stock < amount;
        const density = entry.item ? (densityFactors[entry.item] || 1) : 1;
        const grams = amount * density;
        const amountLabel = `${amount.toFixed(1)} ${entry.unit} · ${grams.toFixed(1)} g`;
        return `
            <div class="tool-row ${missing ? 'missing' : ''}">
                <span>
                    <strong>${entry.item || entry.label}</strong>
                    <small>${resolved ? `Bestand: ${formatItemAmount(resolved.item, stock)} · Dichte ${density.toFixed(3)} g/ml` : 'nicht lagergeführt · ca. 1.000 g/ml'}</small>
                </span>
                <span>${amountLabel}</span>
            </div>
        `;
    }).join('');
    result.innerHTML = `
        <div class="tool-result">${rows}</div>
        <button class="btn-danger btn-animated" onclick="bookSeaWaterMix()">Lagergeführte Zutaten auslagern</button>
    `;
}

function saveSeaWaterPreset() {
    const liters = Math.max(0, parseFloat(document.getElementById('seaWaterLiters')?.value) || 0);
    if (!liters) return alert('Bitte erst eine Meerwassermenge eintragen.');
    const name = prompt('Preset-Name:', `${liters} L Meerwasser`);
    if (!name || !name.trim()) return;
    if (!db.crSeaWaterPresets) db.crSeaWaterPresets = {};
    db.crSeaWaterPresets[name.trim()] = liters;
    saveDB();
    renderSeaWaterPresetSelect();
    alert(`Preset "${name.trim()}" gespeichert.`);
}

function loadSeaWaterPreset(name) {
    if (!name || !db.crSeaWaterPresets || !db.crSeaWaterPresets[name]) return;
    const input = document.getElementById('seaWaterLiters');
    if (input) input.value = db.crSeaWaterPresets[name];
    renderSeaWaterMix();
}

function deleteSeaWaterPreset() {
    const select = document.getElementById('seaWaterPresetSelect');
    const name = select?.value || '';
    if (!name) return alert('Bitte zuerst ein Preset auswählen.');
    if (!confirm(`Preset "${name}" löschen?`)) return;
    delete db.crSeaWaterPresets[name];
    saveDB();
    renderSeaWaterPresetSelect();
    renderSeaWaterMix();
}

function bookSeaWaterMix() {
    const liters = Math.max(0, parseFloat(document.getElementById('seaWaterLiters')?.value) || 0);
    const scale = liters / 100;
    const queue = seaWaterRecipePer100L
        .map(entry => {
            const resolved = resolveRecipeItem(entry);
            if (!resolved) return null;
            const amount = convertInputToStoredAmount(resolved.item, entry.unit, entry.amount * scale);
            return amount > 0 ? { ...resolved, amount } : null;
        })
        .filter(Boolean);
    if (queue.length === 0) return alert('Dieses Rezept enthält keine lagergeführten Zutaten.');
    if (!confirm(`${liters} L Meerwasser anmischen und ${queue.length} lagergeführte Zutat(en) auslagern?`)) return;
    executeQueueWithConflictHandling(queue, 0);
}

function renderNaclSolutionCalculator() {
    const result = document.getElementById('naclSolutionResult');
    if (!result) return;
    const solutionLiters = Math.max(0, parseFloat(document.getElementById('naclSolutionLiters')?.value) || 0);
    const tankLiters = Math.max(0, parseFloat(document.getElementById('naclTankLiters')?.value) || 0);
    const doseMl = Math.max(0, parseFloat(document.getElementById('naclDoseMl')?.value) || 0);
    const targetNa = Math.max(0, parseFloat(document.getElementById('naclTargetNa')?.value) || 0);
    if (!solutionLiters) {
        result.innerHTML = '<p class="hint">Trage ein, wie viele Liter C&amp;R Natriumchlorid Lösung du herstellen möchtest.</p>';
        return;
    }

    const scale = solutionLiters / 10;
    const naclKg = 3.05 * scale;
    const roLiters = 8.86 * scale;
    const naclGramsPerLiter = (naclKg * 1000) / solutionLiters;

    const doseFactor = tankLiters > 0 ? (doseMl / 100) * (100 / tankLiters) : 0;
    const naIncrease = 120 * doseFactor;
    const clIncrease = 185 * doseFactor;
    const doseForTargetNa = tankLiters > 0 && targetNa > 0 ? (targetNa / 120) * (tankLiters / 100) * 100 : 0;
    const targetClIncrease = targetNa > 0 ? targetNa * (185 / 120) : 0;

    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Ansatz für ${solutionLiters.toFixed(1)} L Lösung</strong><small>Basis: 10 L = 3,05 kg NaCl Pulver + 8,86 L Osmosewasser</small></span>
                <span>${naclKg.toFixed(3)} kg NaCl</span>
            </div>
            <div class="tool-row">
                <span><strong>Osmosewasser</strong><small>NaCl langsam einrühren, vollständig lösen lassen.</small></span>
                <span>${roLiters.toFixed(2)} L</span>
            </div>
            <div class="tool-row">
                <span><strong>Konzentration</strong><small>Rechnerisch bezogen auf die fertige Zielmenge.</small></span>
                <span>${naclGramsPerLiter.toFixed(1)} g/L</span>
            </div>
            <div class="tool-row">
                <span><strong>Dosierwirkung</strong><small>${doseMl.toFixed(1)} ml auf ${tankLiters.toFixed(0)} L Aquariumwasser</small></span>
                <span>Na +${naIncrease.toFixed(1)} mg/l · Cl +${clIncrease.toFixed(1)} mg/l</span>
            </div>
            <div class="tool-row">
                <span><strong>Dosis für Ziel-Na</strong><small>Bei +${targetNa.toFixed(1)} mg/l Na steigt Cl rechnerisch um +${targetClIncrease.toFixed(1)} mg/l.</small></span>
                <span>${doseForTargetNa.toFixed(1)} ml</span>
            </div>
        </div>
    `;
}

function resolveRecipeItem(entry) {
    if (!entry.item) return null;
    const cat = findCat(entry.item);
    if (catalog[cat] && catalog[cat][entry.item] !== undefined) return { cat, item: entry.item };
    return null;
}

function renderMacroRecipe() {
    const select = document.getElementById('macroRecipeSelect');
    const litersEl = document.getElementById('macroRecipeLiters');
    const result = document.getElementById('macroRecipeResult');
    if (!select || !litersEl || !result) return;
    const recipe = macroRecipes[select.value] || [];
    const liters = Math.max(0.1, parseFloat(litersEl.value) || 1);
    const rows = recipe.map(entry => {
        const amount = entry.amount * liters;
        const resolved = resolveRecipeItem(entry);
        const stock = resolved ? ((db.inventory[resolved.cat] && db.inventory[resolved.cat][resolved.item]) || 0) : null;
        const missing = resolved && stock < amount;
        return `
            <div class="tool-row ${missing ? 'missing' : ''}">
                <span>
                    <strong>${entry.item || entry.label}</strong>
                    <small>${resolved ? `Bestand: ${formatItemAmount(resolved.item, stock)}` : 'nicht lagergeführt'}</small>
                </span>
                <span>${amount.toFixed(1)} ${entry.unit}</span>
            </div>
        `;
    }).join('');
    result.innerHTML = `
        <div class="tool-result">${rows}</div>
        <button class="btn-danger btn-animated" onclick="bookMacroRecipe()">Lagergeführte Zutaten auslagern</button>
    `;
}

function bookMacroRecipe() {
    const select = document.getElementById('macroRecipeSelect');
    const litersEl = document.getElementById('macroRecipeLiters');
    if (!select || !litersEl) return;
    const liters = Math.max(0.1, parseFloat(litersEl.value) || 1);
    const queue = (macroRecipes[select.value] || [])
        .map(entry => {
            const resolved = resolveRecipeItem(entry);
            if (!resolved) return null;
            const amount = convertInputToStoredAmount(resolved.item, entry.unit, entry.amount * liters);
            return amount > 0 ? { ...resolved, amount } : null;
        })
        .filter(Boolean);
    if (queue.length === 0) return alert('Dieses Rezept enthält keine lagergeführten Zutaten.');
    if (!confirm(`${select.value} für ${liters} L anmischen und ${queue.length} lagergeführte Zutat(en) auslagern?`)) return;
    executeQueueWithConflictHandling(queue, 0);
}

function formatDateTimeLocal(value) {
    const date = value ? new Date(value) : new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function ensureLogBookDefaults() {
    if (!db.logBookCategories) db.logBookCategories = ['Technik', 'Wartung', 'Versorgung', 'Nährstoffkontrolle', 'Wasserwechsel', 'Korallenbesatz', 'Fischbesatz', 'Sonstiges'];
    if (!db.logBookEntries) db.logBookEntries = [];
    if (!db.aquariumTodos) db.aquariumTodos = [];
}

function renderLogBook() {
    ensureLogBookDefaults();
    const categorySelect = document.getElementById('logBookCategory');
    const todoCategory = document.getElementById('todoCategory');
    const dateInput = document.getElementById('logBookDate');
    const dueInput = document.getElementById('todoDueAt');
    const entryCount = document.getElementById('logBookEntryCount');
    const openCount = document.getElementById('todoOpenCount');
    const dueCount = document.getElementById('todoDueCount');
    const options = db.logBookCategories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
    if (categorySelect) categorySelect.innerHTML = options;
    if (todoCategory) todoCategory.innerHTML = options;
    if (dateInput && !dateInput.value) dateInput.value = formatDateTimeLocal();
    if (dueInput && !dueInput.value) dueInput.value = formatDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    const todos = db.aquariumTodos || [];
    const now = Date.now();
    if (entryCount) entryCount.innerText = String((db.logBookEntries || []).length);
    if (openCount) openCount.innerText = String(todos.filter(todo => !todo.done).length);
    if (dueCount) dueCount.innerText = String(todos.filter(todo => !todo.done && todo.dueAt && new Date(todo.dueAt).getTime() <= now).length);
    updateTodoIntervalLabel();
    renderLogBookCategories();
    renderLogBookEntries();
    renderAquariumTodos();
}

function addLogBookCategory() {
    ensureLogBookDefaults();
    const input = document.getElementById('logBookNewCategory');
    const name = (input?.value || '').trim();
    if (!name) return alert('Bitte einen Kategorienamen eintragen.');
    if (db.logBookCategories.includes(name)) return alert('Diese Kategorie existiert bereits.');
    db.logBookCategories.push(name);
    saveDB();
    if (input) input.value = '';
    renderLogBook();
}

function editLogBookCategory(category) {
    const next = prompt('Kategorie umbenennen:', category);
    if (!next || !next.trim() || next.trim() === category) return;
    if (db.logBookCategories.includes(next.trim())) return alert('Diese Kategorie existiert bereits.');
    db.logBookCategories = db.logBookCategories.map(cat => cat === category ? next.trim() : cat);
    (db.logBookEntries || []).forEach(entry => {
        if (entry.category === category) entry.category = next.trim();
    });
    (db.aquariumTodos || []).forEach(todo => {
        if (todo.category === category) todo.category = next.trim();
    });
    saveDB();
    renderLogBook();
}

function deleteLogBookCategory(category) {
    if (!confirm(`Kategorie "${category}" löschen? Bestehende Einträge bleiben erhalten und werden auf Sonstiges gesetzt.`)) return;
    db.logBookCategories = (db.logBookCategories || []).filter(cat => cat !== category);
    if (!db.logBookCategories.includes('Sonstiges')) db.logBookCategories.push('Sonstiges');
    (db.logBookEntries || []).forEach(entry => {
        if (entry.category === category) entry.category = 'Sonstiges';
    });
    (db.aquariumTodos || []).forEach(todo => {
        if (todo.category === category) todo.category = 'Sonstiges';
    });
    saveDB();
    renderLogBook();
}

function renderLogBookCategories() {
    const container = document.getElementById('log-book-category-list');
    if (!container) return;
    container.innerHTML = (db.logBookCategories || []).map(category => `
        <div class="overview-row">
            <span>${escapeHtml(category)}</span>
            <div class="logbook-actions">
                <button onclick='editLogBookCategory(${jsArg(category)})'>Bearbeiten</button>
                <button onclick='deleteLogBookCategory(${jsArg(category)})' class="btn-out">Löschen</button>
            </div>
        </div>
    `).join('');
}

function updateTodoIntervalLabel() {
    const input = document.getElementById('todoInterval');
    const label = document.getElementById('todoIntervalLabel');
    if (!input || !label) return;
    const days = parseInt(input.value || '0', 10);
    label.innerText = days <= 0 ? 'Einmalig' : `Alle ${days} Tag(e)`;
    document.querySelectorAll('#todoIntervalPicker button').forEach(btn => {
        const buttonDays = btn.textContent === 'Einmalig' ? 0 : parseInt(btn.textContent, 10);
        btn.classList.toggle('active', buttonDays === days);
    });
}

function setTodoInterval(value) {
    const input = document.getElementById('todoInterval');
    const custom = document.getElementById('todoIntervalCustom');
    const days = Math.max(0, parseInt(value, 10) || 0);
    if (input) input.value = String(days);
    if (custom && document.activeElement !== custom) custom.value = '';
    updateTodoIntervalLabel();
}

function saveLogBookEntry(editId = null) {
    ensureLogBookDefaults();
    const categoryEl = document.getElementById('logBookCategory');
    const titleEl = document.getElementById('logBookTitle');
    const noteEl = document.getElementById('logBookNote');
    const dateEl = document.getElementById('logBookDate');
    const category = categoryEl?.value || 'Sonstiges';
    const title = (titleEl?.value || '').trim();
    const note = (noteEl?.value || '').trim();
    const at = dateEl?.value ? new Date(dateEl.value).toISOString() : new Date().toISOString();
    if (!title && !note) return alert('Bitte Titel oder Notiz eintragen.');
    if (editId) {
        const entry = db.logBookEntries.find(item => item.id === editId);
        if (!entry) return;
        Object.assign(entry, { category, title, note, at, updatedAt: new Date().toISOString() });
    } else {
        db.logBookEntries.unshift({ id: createWarehouseId(), category, title: title || category, note, at, createdAt: new Date().toISOString() });
    }
    saveDB();
    if (titleEl) titleEl.value = '';
    if (noteEl) noteEl.value = '';
    if (dateEl) dateEl.value = formatDateTimeLocal();
    renderLogBook();
}

function editLogBookEntry(id) {
    const entry = (db.logBookEntries || []).find(item => item.id === id);
    if (!entry) return;
    const title = prompt('Titel:', entry.title || '');
    if (title === null) return;
    const note = prompt('Notiz:', entry.note || '');
    if (note === null) return;
    const category = prompt('Kategorie:', entry.category || 'Sonstiges');
    if (category === null) return;
    entry.title = title.trim() || category.trim() || 'Log';
    entry.note = note.trim();
    entry.category = category.trim() || 'Sonstiges';
    entry.updatedAt = new Date().toISOString();
    if (!db.logBookCategories.includes(entry.category)) db.logBookCategories.push(entry.category);
    saveDB();
    renderLogBook();
}

function deleteLogBookEntry(id) {
    if (!confirm('Log-Eintrag löschen?')) return;
    db.logBookEntries = (db.logBookEntries || []).filter(entry => entry.id !== id);
    saveDB();
    renderLogBook();
}

function renderLogBookEntries() {
    const container = document.getElementById('log-book-list');
    if (!container) return;
    const entries = (db.logBookEntries || []).slice(0, 80);
    if (entries.length === 0) {
        container.innerHTML = '<p class="hint">Noch keine Logbuch-Einträge.</p>';
        return;
    }
    container.innerHTML = entries.map(entry => `
        <div class="logbook-entry">
            <div>
                <strong>${escapeHtml(entry.title || entry.category)}</strong>
                <small>${formatWarehouseDate(entry.at)} · ${escapeHtml(entry.category || 'Sonstiges')}</small>
                ${entry.note ? `<p>${escapeHtml(entry.note)}</p>` : ''}
            </div>
            <div class="logbook-actions">
                <button onclick="editLogBookEntry('${entry.id}')">Bearbeiten</button>
                <button onclick="deleteLogBookEntry('${entry.id}')" class="btn-out">Löschen</button>
            </div>
        </div>
    `).join('');
}

function saveAquariumTodo(editId = null) {
    ensureLogBookDefaults();
    const title = (document.getElementById('todoTitle')?.value || '').trim();
    const category = document.getElementById('todoCategory')?.value || 'Wartung';
    const dueValue = document.getElementById('todoDueAt')?.value;
    const intervalDays = parseInt(document.getElementById('todoInterval')?.value || '0', 10);
    const notifyEnabled = document.getElementById('todoNotifyEnabled')?.checked !== false;
    if (!title) return alert('Bitte eine Aufgabe eintragen.');
    const dueAt = dueValue ? new Date(dueValue).toISOString() : new Date().toISOString();
    if (editId) {
        const todo = db.aquariumTodos.find(item => item.id === editId);
        if (!todo) return;
        Object.assign(todo, { title, category, dueAt, intervalDays, notifyEnabled, done: false, remindedAt: null, updatedAt: new Date().toISOString() });
    } else {
        db.aquariumTodos.unshift({ id: createWarehouseId(), title, category, dueAt, intervalDays, notifyEnabled, done: false, remindedAt: null, lastDoneAt: null, createdAt: new Date().toISOString() });
    }
    saveDB();
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoDueAt').value = formatDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    renderAquariumTodos();
}

function completeAquariumTodo(id) {
    const todo = (db.aquariumTodos || []).find(item => item.id === id);
    if (!todo) return;
    const doneValue = prompt('Wann wurde die Aktion ausgeführt? (YYYY-MM-DD oder leer = jetzt)', new Date().toISOString().slice(0, 10));
    if (doneValue === null) return;
    const doneAt = doneValue.trim() ? new Date(doneValue.trim()).toISOString() : new Date().toISOString();
    todo.lastDoneAt = doneAt;
    if (todo.intervalDays > 0) {
        todo.dueAt = new Date(new Date(doneAt).getTime() + todo.intervalDays * 24 * 60 * 60 * 1000).toISOString();
        todo.done = false;
        todo.remindedAt = null;
    } else {
        todo.done = true;
    }
    addWarehouseEvent('todo', `ToDo erledigt: ${todo.title}`);
    saveDB();
    renderAquariumTodos();
}

function snoozeAquariumTodo(id) {
    const todo = (db.aquariumTodos || []).find(item => item.id === id);
    if (!todo) return;
    const days = prompt('In wie vielen Tagen erneut erinnern?', '1');
    if (days === null) return;
    const parsed = Math.max(1, parseInt(days, 10) || 1);
    todo.dueAt = new Date(Date.now() + parsed * 24 * 60 * 60 * 1000).toISOString();
    todo.remindedAt = null;
    todo.done = false;
    addWarehouseEvent('todo', `ToDo verschoben: ${todo.title} (${parsed} Tag(e))`);
    saveDB();
    renderAquariumTodos();
}

function toggleTodoNotification(id) {
    const todo = (db.aquariumTodos || []).find(item => item.id === id);
    if (!todo) return;
    todo.notifyEnabled = todo.notifyEnabled === false;
    todo.remindedAt = null;
    saveDB();
    renderAquariumTodos();
}

function editAquariumTodo(id) {
    const todo = (db.aquariumTodos || []).find(item => item.id === id);
    if (!todo) return;
    const title = prompt('Aufgabe:', todo.title);
    if (title === null) return;
    const category = prompt('Kategorie:', todo.category || 'Wartung');
    if (category === null) return;
    const due = prompt('Fällig am (YYYY-MM-DD oder leer = unverändert):', todo.dueAt ? new Date(todo.dueAt).toISOString().slice(0, 10) : '');
    if (due === null) return;
    const interval = prompt('Intervall in Tagen (0 = einmalig):', String(todo.intervalDays || 0));
    if (interval === null) return;
    const notification = prompt('Erinnerung aktiv? (ja/nein):', todo.notifyEnabled === false ? 'nein' : 'ja');
    if (notification === null) return;
    todo.title = title.trim() || todo.title;
    todo.category = category.trim() || todo.category;
    if (due.trim()) {
        const nextDue = new Date(due.trim());
        if (!Number.isNaN(nextDue.getTime())) todo.dueAt = nextDue.toISOString();
    }
    todo.intervalDays = Math.max(0, parseInt(interval, 10) || 0);
    todo.notifyEnabled = !/^n(ein)?$/i.test(notification.trim());
    todo.remindedAt = null;
    todo.updatedAt = new Date().toISOString();
    if (!db.logBookCategories.includes(todo.category)) db.logBookCategories.push(todo.category);
    saveDB();
    renderLogBook();
}

function deleteAquariumTodo(id) {
    if (!confirm('ToDo löschen?')) return;
    db.aquariumTodos = (db.aquariumTodos || []).filter(todo => todo.id !== id);
    saveDB();
    renderAquariumTodos();
}

function clearLogBookEntries() {
    if (!confirm('Alle Logbuch-Einträge löschen? Kategorien bleiben erhalten.')) return;
    db.logBookEntries = [];
    saveDB();
    renderLogBook();
    alert('Logbuch ist leer.');
}

function clearAquariumTodos() {
    if (!confirm('Alle ToDos und Erinnerungen löschen?')) return;
    db.aquariumTodos = [];
    saveDB();
    renderLogBook();
    alert('ToDo-Liste ist leer.');
}

function renderAquariumTodos() {
    const container = document.getElementById('aquarium-todo-list');
    if (!container) return;
    const todos = (db.aquariumTodos || []).slice().sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
    if (todos.length === 0) {
        container.innerHTML = '<p class="hint">Keine ToDos geplant.</p>';
        return;
    }
    const now = Date.now();
    container.innerHTML = todos.map(todo => {
        const due = new Date(todo.dueAt).getTime();
        const state = todo.done ? 'done' : (due <= now ? 'due' : 'open');
        const label = todo.done ? 'erledigt' : (due <= now ? 'fällig' : 'geplant');
        const notify = todo.notifyEnabled !== false;
        return `
            <div class="todo-row ${state}">
                <div>
                    <strong>${escapeHtml(todo.title)}</strong>
                    <small>Kategorie: ${escapeHtml(todo.category || 'Wartung')} · Intervall: ${todo.intervalDays ? `alle ${todo.intervalDays} Tage` : 'einmalig'} · ${label} · Erinnerung ${notify ? 'an' : 'aus'}</small>
                    <small>Zuletzt erledigt: ${todo.lastDoneAt ? formatWarehouseDate(todo.lastDoneAt) : 'noch nie'} · Wieder anstehend: ${formatWarehouseDate(todo.dueAt)}</small>
                </div>
                <div class="logbook-actions">
                    <button onclick="completeAquariumTodo('${todo.id}')">Erledigt</button>
                    <button onclick="snoozeAquariumTodo('${todo.id}')">Erinnern in...</button>
                    <button onclick="toggleTodoNotification('${todo.id}')">${notify ? 'Erinnerung aus' : 'Erinnerung an'}</button>
                    <button onclick="editAquariumTodo('${todo.id}')">Bearbeiten</button>
                    <button onclick="deleteAquariumTodo('${todo.id}')" class="btn-out">Löschen</button>
                </div>
            </div>
        `;
    }).join('');
}

function checkTodoReminders() {
    if (!db || !db.aquariumTodos) return;
    const now = Date.now();
    let changed = false;
    db.aquariumTodos.forEach(todo => {
        if (todo.done || !todo.dueAt || todo.notifyEnabled === false) return;
        const due = new Date(todo.dueAt).getTime();
        const reminded = todo.remindedAt ? new Date(todo.remindedAt).getTime() : 0;
        if (due <= now && now - reminded > 6 * 60 * 60 * 1000) {
            showLocalNotification('Aquarium ToDo fällig', `${todo.title} · ${todo.category}`);
            todo.remindedAt = new Date().toISOString();
            changed = true;
        }
    });
    if (changed) saveDB(false);
}

function calculateApproxPsu(density, temp) {
    const densityAt25 = density + (temp - 25) * 0.00030;
    return 35 + ((densityAt25 - 1.0233) / 0.000742);
}

function densityFromApproxPsu(psu) {
    return 1.0233 + ((psu - 35) * 0.000742);
}

function clampNumber(value, min, max, fallback) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}

function updateSalinityCalculator(source = '') {
    const densityEl = document.getElementById('salinityDensity');
    const tempEl = document.getElementById('salinityTemp');
    const densityNumberEl = document.getElementById('salinityDensityNumber');
    const tempNumberEl = document.getElementById('salinityTempNumber');
    const result = document.getElementById('salinityResult');
    if (!densityEl || !tempEl || !result) return;

    const densityMin = parseFloat(densityEl.min) || 1.0150;
    const densityMax = parseFloat(densityEl.max) || 1.0350;
    const tempMin = parseFloat(tempEl.min) || 15;
    const tempMax = parseFloat(tempEl.max) || 32;

    const densitySource = source === 'densityNumber' && densityNumberEl ? densityNumberEl.value : densityEl.value;
    const tempSource = source === 'tempNumber' && tempNumberEl ? tempNumberEl.value : tempEl.value;
    const density = clampNumber(densitySource, densityMin, densityMax, 1.0233);
    const temp = clampNumber(tempSource, tempMin, tempMax, 25);

    densityEl.value = density.toFixed(4);
    tempEl.value = temp.toFixed(1);
    if (densityNumberEl && source !== 'densityNumber') densityNumberEl.value = density.toFixed(4);
    if (tempNumberEl && source !== 'tempNumber') tempNumberEl.value = temp.toFixed(1);

    const offset = parseFloat(db.psuCorrectionOffset) || 0;
    const rawPsu = calculateApproxPsu(density, temp);
    const psu = rawPsu + offset;
    const conductivity = 53.06 * (psu / 35);
    result.innerHTML = `
        <div class="salinity-value">${psu.toFixed(1)} PSU</div>
        <small>Rohwert ${rawPsu.toFixed(1)} PSU${offset ? ` · Korrektur ${offset > 0 ? '+' : ''}${offset.toFixed(1)} PSU` : ''}. Leitfähigkeit ca. ${conductivity.toFixed(2)} mS/cm.</small>
    `;
    renderPsuCorrectionSettings();
}

function updateSimpleSalinityConverter(source = 'psu') {
    const psuInput = document.getElementById('simplePsuInput');
    const densityInput = document.getElementById('simpleDensityInput');
    const result = document.getElementById('simpleSalinityResult');
    if (!psuInput || !densityInput || !result) return;

    let psu = parseFloat(psuInput.value);
    let density = parseFloat(densityInput.value);

    const offset = parseFloat(db.psuCorrectionOffset) || 0;

    if (source === 'psu' && !isNaN(psu)) {
        density = densityFromApproxPsu(psu - offset);
        densityInput.value = density.toFixed(4);
    } else if (source === 'density' && !isNaN(density)) {
        psu = calculateApproxPsu(density, 25) + offset;
        psuInput.value = psu.toFixed(1);
    }

    if (isNaN(psu) && isNaN(density)) {
        result.innerText = '';
        return;
    }

    const densityText = isNaN(density) ? '-' : `${density.toFixed(4)} kg/l`;
    const psuText = isNaN(psu) ? '-' : `${psu.toFixed(1)} PSU`;
    result.innerHTML = `Dichte: <strong>${densityText}</strong><br>Salinität: <strong>${psuText}</strong><br><small>Bei 25 °C Referenz${offset ? ` · PSU-Korrektur ${offset > 0 ? '+' : ''}${offset.toFixed(1)}` : ''}.</small>`;
}

function renderPsuCorrectionSettings() {
    const input = document.getElementById('psuCorrectionOffset');
    const example = document.getElementById('psuCorrectionExample');
    if (!input && !example) return;
    const saved = parseFloat(db.psuCorrectionOffset) || 0;
    if (input && document.activeElement !== input) input.value = saved.toFixed(1);
    const current = input ? (parseFloat(input.value) || 0) : saved;
    if (example) {
        example.value = current ? `35,0 wird ${(35 + current).toFixed(1).replace('.', ',')} PSU` : 'Keine Korrektur';
    }
}

function savePsuCorrectionOffset() {
    const input = document.getElementById('psuCorrectionOffset');
    const value = parseFloat(input?.value) || 0;
    db.psuCorrectionOffset = value;
    saveDB();
    renderPsuCorrectionSettings();
    updateSalinityCalculator();
    updateSimpleSalinityConverter('density');
    showToast('PSU-Korrektur gespeichert', 'success');
}

function deletePsuCorrectionOffset() {
    if (!confirm('PSU-Korrektur löschen?')) return;
    db.psuCorrectionOffset = 0;
    saveDB();
    renderPsuCorrectionSettings();
    updateSalinityCalculator();
    updateSimpleSalinityConverter('density');
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
            let showMassSubline = itemUsesVolume(item);
            
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
                        ${showMassSubline ? `<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">${getGrams(item, totalConsumed)} g gesamt</span>` : ''}
                    </h4>
                    <div style="font-size:0.85rem; margin-bottom:5px;">
                        Gesamtverbrauch: <strong>${formatItemAmount(item, totalConsumed)}</strong>
                    </div>
                    
                    <div class="visual-bar-bg">
                        <div class="visual-bar-fill" style="width: ${widthPct}%;"></div>
                    </div>

                    <div class="stat-grid" style="margin-top: 10px;">
                        <div>
                            <strong>${formatItemAmount(item, perWeek)}</strong><br>
                            ${showMassSubline ? `<span style="font-size:0.7rem; opacity:0.7;">${getGrams(item, perWeek)} g</span>/Wo` : '<span style="font-size:0.7rem; opacity:0.7;">pro Woche</span>'}
                        </div>
                        <div>
                            <strong>${formatItemAmount(item, perMonth)}</strong><br>
                            ${showMassSubline ? `<span style="font-size:0.7rem; opacity:0.7;">${getGrams(item, perMonth)} g</span>/Mo` : '<span style="font-size:0.7rem; opacity:0.7;">pro Monat</span>'}
                        </div>
                        <div>
                            <strong>${formatItemAmount(item, perYear)}</strong><br>
                            ${showMassSubline ? `<span style="font-size:0.7rem; opacity:0.7;">${getGrams(item, perYear)} g</span>/Jahr` : '<span style="font-size:0.7rem; opacity:0.7;">pro Jahr</span>'}
                        </div>
                    </div>
                    <div class="prognose-badge">${prognosisText}</div>
                </div>
            `;
        }
    }
    container.innerHTML = content || '<p class="hint">Noch keine Verbräuche aufgezeichnet.</p>';
}

function exportConsumptionPdf() {
    const warehouse = getActiveWarehouse();
    const rows = [];
    let maxConsumed = 0;
    for (let item in db.stats) {
        if (isProductHidden(item)) continue;
        const consumed = db.stats[item] || 0;
        if (consumed > maxConsumed) maxConsumed = consumed;
    }

    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            const stock = (db.inventory[cat] && db.inventory[cat][item]) || 0;
            const consumed = db.stats[item] || 0;
            const threshold = (db.thresholds && db.thresholds[item]) || 0;
            const weeksLeft = getWeeksLeft(item);
            rows.push({ cat, item, stock, consumed, threshold, weeksLeft });
        }
    }

    const htmlRows = rows
        .sort((a, b) => b.consumed - a.consumed)
        .map(row => {
            const width = maxConsumed > 0 ? Math.max(2, (row.consumed / maxConsumed) * 100) : 2;
            const reorder = row.threshold > 0 && row.stock <= row.threshold;
            return `
                <tr>
                    <td>${row.cat}</td>
                    <td>${row.item}</td>
                    <td>${formatItemAmount(row.item, row.stock)}</td>
                    <td>${formatItemAmount(row.item, row.consumed)}</td>
                    <td><div class="bar"><span style="width:${width}%"></span></div></td>
                    <td>${row.weeksLeft === null ? '-' : row.weeksLeft.toFixed(1) + ' Wochen'}</td>
                    <td class="${reorder ? 'danger' : ''}">${reorder ? 'Nachbestellen' : 'ok'}</td>
                </tr>
            `;
        }).join('');

    const report = window.open('', '_blank');
    if (!report) return alert('Popup wurde blockiert. Bitte Popups für diese App erlauben.');
    report.document.write(`
        <!doctype html>
        <html>
        <head>
            <title>Verbrauchsbericht ${warehouse ? warehouse.name : ''}</title>
            <style>
                body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:28px;color:#111}
                h1{margin:0 0 4px;font-size:24px}
                .meta{color:#666;margin-bottom:22px}
                table{width:100%;border-collapse:collapse;font-size:12px}
                th,td{text-align:left;border-bottom:1px solid #ddd;padding:8px;vertical-align:middle}
                th{background:#f3f5f7}
                .bar{height:9px;background:#e8edf2;border-radius:999px;overflow:hidden;min-width:80px}
                .bar span{display:block;height:100%;background:#2563eb;border-radius:999px}
                .danger{color:#b91c1c;font-weight:700}
                @media print{button{display:none}}
            </style>
        </head>
        <body>
            <button onclick="window.print()">Als PDF sichern / drucken</button>
            <h1>Verbrauchsbericht</h1>
            <div class="meta">${warehouse ? warehouse.name : 'Lager'} · ${new Date().toLocaleString('de-DE')}</div>
            <table>
                <thead><tr><th>Kategorie</th><th>Produkt</th><th>Bestand</th><th>Verbrauch</th><th>Grafik</th><th>Reichweite</th><th>Status</th></tr></thead>
                <tbody>${htmlRows}</tbody>
            </table>
        </body>
        </html>
    `);
    report.document.close();
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
        let showMassSubline = itemUsesVolume(log.item);
        
        return `
            <div class="log-item ${log.action}" style="border-left: 4px solid ${actionColor};">
                <div>
                    <div class="log-details"><strong>${log.item}</strong></div>
                    <div class="log-date">${new Date(getLogTime(log) || Date.now()).toLocaleString()} | ${actionText}</div>
                </div>
                <div style="text-align: right;">
                    <div style="color: ${actionColor}; font-weight: bold;">${sign}${formatItemAmount(log.item, log.amount)}</div>
                    ${showMassSubline ? `<div style="font-size: 0.75rem; color: var(--text-muted);">${sign}${gAmount} g</div>` : ''}
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
    const unitOptions = itemUsesPieces(item)
        ? '<option value="st">Stück</option>'
        : (getItemUnit(item) === 'g'
            ? '<option value="g">Gramm (g)</option><option value="ml">Milliliter (ml)</option>'
            : '<option value="ml">Milliliter (ml)</option><option value="g">Gramm (g)</option>');
    document.getElementById('modal-title').innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    
    modalBody.innerHTML = `
        <div class="input-group">
            <label>Einheit auswählen:</label>
            <select id="unitSelect" onchange="toggleContainerOptions(); updateLiveConversion();" style="width:100%; padding:12px; background:#2c2c2e; color:#fff; border:none; border-radius:10px;">
                ${unitOptions}
            </select>
        </div>
        
        <div id="containerSection" style="display:none; margin-top:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px;">
            <label style="display:flex; align-items:center; gap:10px; color:#fff;">
                <input type="checkbox" id="useContainer" onchange="toggleContainerOptions(); updateLiveConversion();" style="width:20px; height:20px; margin:0;"> 
                Behälter-Gewicht (Tara) abziehen
            </label>
            <select id="containerSelect" onchange="updateLiveConversion();" style="display:none; width:100%; padding:12px; background:#1c1c1e; color:#fff; border:1px solid #3a3a3c; border-radius:8px; margin-top:10px;">
                ${Object.entries(getAllContainers()).map(([c, weight]) => `<option value="${c}">${c} (wiegt ${weight}g)</option>`).join('')}
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
    const useTara = unit === 'g' && document.getElementById('useContainer') && document.getElementById('useContainer').checked;
    const containerValue = document.getElementById('containerSelect') ? document.getElementById('containerSelect').value : null;
    const preview = formatConvertedInputPreview(currentAction.item, unit, rawAmount, useTara, containerValue);

    if (!preview || getItemUnit(currentAction.item) === unit) {
        liveDiv.innerText = '';
    } else {
        liveDiv.innerText = preview;
        liveDiv.style.color = 'var(--secondary)';
    }
}


// Hier wird sichergestellt, dass beim manuellen Öffnen der Einstellungen das Dropdown synchron ist
document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect && db.theme) themeSelect.value = db.theme;
    const forecastSelect = document.getElementById('forecastWeeks');
    if(forecastSelect) forecastSelect.value = String((db.settings && db.settings.forecastWeeks) || 4);
    toggleCustomProductUnitFields();
    initBulkProductSelect();
    detectSupabasePasswordRecovery();
});

function closeModal() { document.getElementById('modal').style.display = 'none'; }

function executeAction() {
    let rawAmount = parseFloat(document.getElementById('amount').value);
    let unit = document.getElementById('unitSelect').value;
    let { cat, item, action } = currentAction;
    
    if (isNaN(rawAmount) || rawAmount <= 0) return alert("Bitte eine gültige Menge eingeben.");
    
    const useTara = unit === 'g' && document.getElementById('useContainer') && document.getElementById('useContainer').checked;
    const containerValue = document.getElementById('containerSelect') ? document.getElementById('containerSelect').value : null;
    let finalMl = convertInputToStoredAmount(item, unit, rawAmount, useTara, containerValue);

    if (finalMl === null || finalMl <= 0) return alert("Fehler: Nach Abzug des Behälters bleibt keine Restmenge übrig.");

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
    const requiredText = formatItemAmount(item, required, 2);
    const currentText = formatItemAmount(item, current, 2);
    const missingText = formatItemAmount(item, missing, 2);
    
    modalBody.innerHTML = `
        <div style="background: rgba(255,69,58,0.1); border: 1px solid var(--danger); padding:15px; border-radius:8px; margin-bottom:15px; font-size:0.95rem;">
            Zu wenig Bestand für <strong>${item}</strong>.<br><br>
            Benötigt werden: <span style="color:var(--danger); font-weight:bold;">${requiredText}</span><br>
            Aktueller Bestand: <span style="color:var(--secondary); font-weight:bold;">${currentText}</span><br>
            Es fehlen: <span style="color:var(--danger); font-weight:bold;">${missingText}</span><br><br>
            <span style="font-size:0.88rem; color: var(--text-muted);">Wenn du trotzdem fortfährst, wird der gesamte Restbestand (${currentText}) ausgelagert. Der Bestand geht <strong>nicht in den Minusbereich</strong>.</span>
        </div>
        <button class="btn-danger btn-animated" id="proceed-conflict-btn">Trotzdem Fortfahren (${currentText} auslagern)</button>
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

function correctCROcrMeasurement(element, value, referenceValue) {
    if (value === null || value === undefined) return value;
    if (element === 'B' && referenceValue !== null && referenceValue !== undefined && referenceValue < 10 && value >= 20 && value < 100 && Number.isInteger(value)) {
        return value / 10;
    }
    return value;
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
        .split(/\bElement\b|\bVorher\b|\bNachh(?:er)?\b|\d+\s*(?:ter|ten|er|\.|te)?\s*Ausgleich/i)[0];
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
    const beforeElementTable = normalizeCRPdfText(blockText).split(/\bElement\b|\bVorher\b|\bNachh(?:er)?\b/i)[0];
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
    const firstValueRowIndex = lines.findIndex(line => /\b(?:Vorher|Nachh(?:er)?)\b/i.test(line));
    if (elementIndex === -1 && firstValueRowIndex === -1) return null;

    const afterHeader = lines
        .slice(elementIndex === -1 ? firstValueRowIndex : elementIndex + 1)
        .join('\n')
        .split(/\d+\s*(?:ter|ten|er|\.|te)?\s*Ausgleich/i)[0]
        .replace(/mg\s*\/\s*[lI1|]?/gi, 'mg/l');
    const rowMatches = [...afterHeader.matchAll(/\b(Vorher|Nachh(?:er)?)\b\s+([\s\S]*?)(?=\b(?:Vorher|Nachh(?:er)?|Aner|Anner|Ausgleich)\b|$)/gi)];

    const parseRow = (rowText, referenceValues = null) => {
        const withoutUnits = String(rowText || '').replace(/mg\s*\/\s*[lI1|]?/gi, ' ');
        const matches = withoutUnits.match(/-?\d+(?:[\.,]\d+)?/g) || [];
        if (matches.length < crElementOrder.length) return null;
        return crElementOrder.reduce((values, element, index) => {
            const parsedValue = parseCRMeasurementToken(matches[index]);
            const referenceValue = referenceValues ? referenceValues[element] : null;
            values[element] = correctCROcrMeasurement(element, parsedValue, referenceValue);
            return values;
        }, {});
    };

    let before = null;
    let after = null;
    rowMatches.forEach(match => {
        const label = match[1].toLowerCase() === 'vorher' ? 'before' : 'after';
        const values = parseRow(match[2], label === 'after' ? before : null);
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

function renderCRElementMobileRows(adjustment) {
    if (!adjustment.elements || (!adjustment.elements.before && !adjustment.elements.after)) return '';
    return crElementOrder.map(element => {
        const beforeValue = adjustment.elements.before && adjustment.elements.before[element] !== null && adjustment.elements.before[element] !== undefined
            ? adjustment.elements.before[element]
            : null;
        const afterValue = adjustment.elements.after && adjustment.elements.after[element] !== null && adjustment.elements.after[element] !== undefined
            ? adjustment.elements.after[element]
            : null;
        return `
            <div class="cr-element-mobile-row">
                <strong>${element}</strong>
                <span>${formatCRMeasurement(beforeValue)} mg/l</span>
                <span>${formatCRMeasurement(afterValue)} mg/l</span>
            </div>
        `;
    }).join('');
}

function renderCRElementValues(adjustment) {
    if (!adjustment.elements || (!adjustment.elements.before && !adjustment.elements.after)) return '';

    const renderCells = values => crElementOrder.map(element => {
        const value = values && values[element] !== null && values[element] !== undefined ? values[element] : null;
        return `<span>${formatCRMeasurement(value)} mg/l</span>`;
    }).join('');

    const headerCells = crElementOrder.map(element => `<span>${element}</span>`).join('');
    return `
        <details class="cr-element-values">
            <summary>
                <span>Vorher/Nachher Werte</span>
                <small>${escapeHtml(adjustment.label)}</small>
            </summary>
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
            <div class="cr-element-mobile-table">
                <div class="cr-element-mobile-row cr-element-mobile-head">
                    <strong>Element</strong>
                    <span>Vorher</span>
                    <span>Nachher</span>
                </div>
                ${renderCRElementMobileRows(adjustment)}
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
        const statusText = hasMissing ? `${summary.missing.length} Mangel` : 'genug Vorrat';
        const statusClass = hasMissing ? 'missing' : 'ready';
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
                        <span class="cr-adjustment-name">${escapeHtml(adjustment.label)}</span>
                        <span class="cr-adjustment-status ${statusClass}">${statusText}</span>
                    </summary>
                    <div class="cr-adjustment-meta">
                        <span>${summary.requiredCount} Position(en)</span>
                        <span>${summary.totalRequired.toFixed(2)} ml gesamt</span>
                    </div>
                    ${renderCRWaterInfo(adjustment)}
                    <div class="cr-adjustment-list">${rows}</div>
                    <button class="${hasMissing ? 'btn-danger' : 'btn-primary'} btn-animated" onclick="exportCRAdjustment(${index})">
                        ${escapeHtml(adjustment.label)} auslagern
                    </button>
                </details>
                ${renderCRElementValues(adjustment)}
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
    const warehouse = getActiveWarehouse();
    const exportedAt = new Date().toISOString();
    if (warehouse) {
        warehouse.data = db;
        warehouse.lastExportAt = exportedAt;
    }
    const payload = {
        type: 'osci_warehouse_backup',
        version: 1,
        warehouseName: warehouse ? warehouse.name : 'Lager',
        exportedAt,
        data: db
    };
    saveDB();

    let blob = new Blob([JSON.stringify(payload, null, 2)], { type: "text/plain" });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `OSCI_${sanitizeFileName(payload.warehouseName)}_${exportedAt.split('T')[0]}.txt`;
    a.click();
}

function importData() {
    let file = document.getElementById('importFile').files[0];
    if (!file) return alert("Bitte wähle eine Datei (.txt) aus.");
    let reader = new FileReader();
    reader.onload = e => {
        try {
            let parsed = JSON.parse(e.target.result);
            const importPayload = parsed && parsed.type === 'osci_warehouse_backup' ? parsed.data : parsed;
            const sourceName = parsed && parsed.warehouseName ? parsed.warehouseName : 'Backup';
            if(importPayload && importPayload.inventory) {
                const warehouse = getActiveWarehouse();
                if (!confirm(`Backup "${sourceName}" in das aktuell ausgewählte Lager "${warehouse.name}" importieren? Dieses Lager wird dadurch ersetzt.`)) return;
                db = normalizeWarehouseData(importPayload);
                warehouse.data = db;
                warehouse.lastImportAt = new Date().toISOString();
                saveDB();
                applyTheme(db.theme || 'default', false);
                renderCurrentWarehouseViews();
                alert(`Backup in "${warehouse.name}" geladen!`);
                selectTab('lager');
                checkAndNotifyStockAlerts();
            } 
            else alert("Ungültiges Backup-Format.");
        } catch(err) { alert("Fehler beim Lesen der Datei."); }
    };
    reader.readAsText(file);
}

function buildWarehouseInventoryShareText() {
    const warehouse = getActiveWarehouse();
    const lines = [
        `Lagerbestand: ${warehouse ? warehouse.name : 'Lager'}`,
        `Stand: ${new Date().toLocaleString('de-DE')}`,
        ''
    ];

    let hasStock = false;
    for (let cat in catalog) {
        const rows = [];
        for (let item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            const stock = db.inventory[cat] && db.inventory[cat][item] ? db.inventory[cat][item] : 0;
            if (stock > 0) rows.push(`- ${item}: ${formatItemAmount(item, stock)}`);
        }
        if (rows.length > 0) {
            hasStock = true;
            lines.push(cat);
            lines.push(...rows);
            lines.push('');
        }
    }

    if (!hasStock) lines.push('Keine Artikel mit Bestand vorhanden.');
    return lines.join('\n').trim();
}

async function shareWarehouseInventory() {
    const warehouse = getActiveWarehouse();
    const text = buildWarehouseInventoryShareText();
    const title = `Lagerbestand ${warehouse ? warehouse.name : ''}`.trim();

    if (navigator.share) {
        try {
            await navigator.share({ title, text });
            return;
        } catch (error) {
            if (error && error.name === 'AbortError') return;
        }
    }

    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
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
            if (isProductHidden(item)) continue;
            let option = document.createElement('option');
            option.value = JSON.stringify({ cat: category, item: item });
            option.innerText = item;
            optGroup.appendChild(option);
        }
        select.appendChild(optGroup);
    }
    
    // Behälter-Dropdown befüllen
    const bulkContainerSelect = document.getElementById('bulkContainerSelect');
    if (bulkContainerSelect) {
        bulkContainerSelect.innerHTML = '';
        const allContainers = getAllContainers();
        for (let c in allContainers) {
            let opt = document.createElement('option');
            opt.value = c;
            opt.innerText = `${c} (wiegt ${allContainers[c]}g)`;
            bulkContainerSelect.appendChild(opt);
        }
    }
    
    // Event Listener für automatischen Wechsel der Schnellauswahl-Buttons
    select.onchange = updateBulkQuickButtons;
}

function updateBulkUnitSelectForProduct(itemName) {
    const unitSelect = document.getElementById('bulkUnitSelect');
    if (!unitSelect) return;
    const itemUnit = getItemUnit(itemName);
    const options = itemUnit === 'st'
        ? [{ value: 'st', label: 'Stück' }]
        : [
            { value: 'ml', label: 'Milliliter (ml)' },
            { value: 'g', label: 'Gramm (g)' }
        ];

    unitSelect.innerHTML = options
        .map(option => `<option value="${option.value}">${option.label}</option>`)
        .join('');
    unitSelect.value = itemUnit === 'g' ? 'g' : options[0].value;
    toggleBulkContainerSection();
}

function updateBulkQuickButtons() {
    const select = document.getElementById('bulkProductSelect');
    const container = document.getElementById('bulkQuickButtonsContainer');
    if (!select || !container) return;
    
    container.innerHTML = '';
    if (!select.value) return;
    
    const product = JSON.parse(select.value);
    updateBulkUnitSelectForProduct(product.item);
    // Hole die definierten Flaschengrößen direkt aus dem catalog-Objekt
    const sizes = catalog[product.cat][product.item] || [];
    const unit = getItemUnit(product.item);
    const unitLabel = getUnitLabel(unit);
    
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
        btn.innerText = `${size} ${unitLabel}`;
        btn.onclick = () => {
            document.getElementById('bulkAmount').value = size;
            document.getElementById('bulkUnitSelect').value = unit;
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
    const taraG = getAllContainers()[selVal];
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
    const useTara = unit === 'g' && document.getElementById('bulkUseTara') && document.getElementById('bulkUseTara').checked;
    const containerVal = document.getElementById('bulkContainerSelect') ? document.getElementById('bulkContainerSelect').value : null;
    let finalMl = convertInputToStoredAmount(product.item, unit, amountRaw, useTara, containerVal);

    if (finalMl === null) {
        const taraG = getAllContainers()[containerVal] || 0;
        return alert(`Fehler: Das Behälter-Gewicht (${taraG} g) ist größer oder gleich der eingegebenen Menge. Bitte prüfe die Eingabe.`);
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
                <span style="color: var(--success); font-weight:600;">+ ${formatItemAmount(entry.item, entry.ml)}</span>
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
            if (isProductHidden(item)) continue;
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

    const suggestedItems = new Set();
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
                const unit = getItemUnit(item);
                const label = unit === 'ml' && s >= 1000 ? (s / 1000) + ' L' : s + ' ' + getUnitLabel(unit);
                const isSelected = idx === 0 ? ' selected' : '';
                return `<button type="button" class="size-select-btn${isSelected}" data-url="${url}" data-item="${item}" onclick="selectShopSize(this)">${label}</button>`;
            }).join(' ');
            const defaultUrl = urlEntries.length > 0 ? urlEntries[0][1] : '';
            const warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;
            const weeksLeft = getWeeksLeft(item);
            const threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
            const isLow = (threshold > 0 && stock <= threshold) || (weeksLeft !== null && weeksLeft <= warningWeeks) || stock <= 0;
            const stockColor = isLow ? 'var(--danger)' : 'var(--success)';
            if (isLow) suggestedItems.add(item);

            catRows += `
                <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); flex-wrap:wrap;">
                    <input type="checkbox" id="${checkId}" data-item="${item}"
                        data-selected-url="${defaultUrl}"
                        onchange="updateShopCartBtn()" style="width:20px; height:20px; flex-shrink:0; cursor:pointer;">
                    <div style="flex:1; min-width:160px;">
                        <strong style="color:var(--text);">${item}</strong><br>
                        <small style="color:${stockColor};">Bestand: ${formatItemAmount(item, stock)}${isLow ? ' ⚠️' : ''}</small>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">${sizeBtns}</div>
                </div>
            `;
        });
        html += `<div style="margin-bottom:20px;"><h3 style="color:var(--secondary); margin-bottom:8px;">${cat}</h3>${catRows}</div>`;
    }

    if (!html) {
        html = '<p class="hint">Keine Shop-Links konfiguriert. Bitte unter Einstellungen &rarr; Shop-Links verwalten die Links einpflegen.</p>';
    } else if (suggestedItems.size > 0) {
        html = `
            <div class="alert-summary" style="margin-bottom:12px;">
                Bestellvorschlag: ${suggestedItems.size} kritische Artikel erkannt.
                <button type="button" onclick="selectSuggestedShopItems()" style="margin-top:8px;">Vorschlag markieren</button>
            </div>
        ` + html;
    }

    container.innerHTML = html;
    updateShopCartBtn();
}

function selectSuggestedShopItems() {
    const warningWeeks = db.settings && db.settings.forecastWeeks ? db.settings.forecastWeeks : 4;
    document.querySelectorAll('#nachbestellen-container input[type=checkbox][data-item]').forEach(cb => {
        const item = cb.dataset.item;
        const cat = findCat(item);
        const stock = (db.inventory[cat] && db.inventory[cat][item]) || 0;
        const threshold = db.thresholds && db.thresholds[item] ? db.thresholds[item] : 0;
        const weeksLeft = getWeeksLeft(item);
        cb.checked = (threshold > 0 && stock <= threshold) || (weeksLeft !== null && weeksLeft <= warningWeeks) || stock <= 0;
    });
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
            if (isProductHidden(item)) continue;
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
                const unit = getItemUnit(item);
                const label = unit === 'ml' && size >= 1000 ? (size / 1000) + ' L' : size ? size + ' ' + getUnitLabel(unit) : 'Größe';
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
            if (isProductHidden(item)) continue;
            const stock = db.inventory[cat][item];
            csv += `"${cat}","${item}",${stock},${getUnitLabel(getItemUnit(item))}\n`;
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
        const tabMap = { '1': 'lager', '2': 'cr-export', '3': 'trace-export', '4': 'statistik', '5': 'log', '6': 'masseneingang', '7': 'nachbestellen', '8': 'tools', '9': 'logbuch' };
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
let startupTab = db.lastTab || 'lager';
try { startupTab = localStorage.getItem(LAST_TAB_KEY) || startupTab; } catch(e) {}
if (window.location.hash) {
    const hashTab = decodeURIComponent(window.location.hash.slice(1));
    if (APP_TAB_IDS.includes(hashTab)) startupTab = hashTab;
}
showTab(startupTab);
updateNotificationStatus();
initCustomCursor();
setTimeout(checkForAppUpdate, 2500);
setInterval(checkForAppUpdate, 30 * 60 * 1000);
setTimeout(() => checkAndNotifyStockAlerts('startup'), 1000);
setTimeout(checkTodoReminders, 1500);
setTimeout(() => checkOsmoseTankReminder('startup'), 2000);
setInterval(checkTodoReminders, 60 * 1000);
setInterval(checkOsmoseTankReminder, 60 * 60 * 1000);

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
    
    const tabs = ['lager', 'cr-export', 'trace-export', 'statistik', 'log', 'masseneingang', 'nachbestellen', 'tools', 'logbuch', 'einstellungen'];
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
            <span class="stock" style="font-size:1.2rem;">${formatItemAmount(item, stock)}</span>
            <span style="color:var(--text-muted); margin-left:8px;">${category}</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:10px;">
                <div style="font-size:0.75rem; color:var(--text-muted);">Warnschwelle</div>
                <div style="font-size:1.2rem; font-weight:600;">${threshold} ${getUnitLabel(getItemUnit(item))}</div>
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
