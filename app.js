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

const traceCalculatorElements = [
    { item: "Cobalt (Co)", symbol: "Co", group: "kationen", unit: "µg/l", min: 0.3, optimal: 1.0, max: 2.5, normal: 30, weak: 15 },
    { item: "Nickel (Ni)", symbol: "Ni", group: "kationen", unit: "µg/l", min: 0.5, optimal: 4.0, max: 6, normal: 15, weak: 7.5 },
    { item: "Eisen (Fe)", symbol: "Fe", group: "kationen", unit: "µg/l", min: 0, optimal: 1.0, max: 2.5, normal: 4, weak: 2 },
    { item: "Mangan (Mn)", symbol: "Mn", group: "kationen", unit: "µg/l", min: 0.25, optimal: 0.5, max: 1, normal: 0.5, weak: 0.3 },
    { item: "Kupfer (Cu)", symbol: "Cu", group: "kationen", unit: "µg/l", min: 1, optimal: 4, max: 6, normal: 1, weak: 0.5 },
    { item: "Chrom (Cr)", symbol: "Cr", group: "kationen", unit: "µg/l", min: 0.5, optimal: 1, max: 2.5, normal: 0.4, weak: 0.2 },
    { item: "Zink (Zn)", symbol: "Zn", group: "kationen", unit: "µg/l", min: 2, optimal: 4, max: 8, normal: 2, weak: 1 },
    { item: "Fluor (F)", symbol: "F", group: "anionen", unit: "mg/l", min: 1, optimal: 1.3, max: 1.8, normal: 90, weak: 45 },
    { item: "Iod (I)", symbol: "I", group: "anionen", unit: "µg/l", min: 50, optimal: 65, max: 90, normal: 1.2, weak: 0.9 },
    { item: "Vanadium (V)", symbol: "V", group: "anionen", unit: "µg/l", min: 1, optimal: 4.5, max: 8, normal: 0.8, weak: 0.4 },
    { item: "Selen (Se)", symbol: "Se", group: "anionen", unit: "µg/l", min: 1.5, optimal: 3.5, max: 8, normal: 1.5, weak: 0.8 }
];

const traceCalculatorIntervalRules = {
    monthly: { label: '4 Wochen oder mehr', adjustmentLabel: '4 Wochen oder mehr', days: 40, maxDoseChange: 0.10 },
    biweekly: { label: '2 Wochen', adjustmentLabel: '2 Wochen', days: 20, maxDoseChange: 0.20 },
    weekly: { label: '1 Woche', adjustmentLabel: '1 Woche', days: 10, maxDoseChange: 0.30 }
};

const traceCalculatorBase = { liters: 500, days: 40, volumeMl: 200, dailyDoseMl: 5 };

// Single source of truth for both the calculation and its in-app explanation.
const traceCalculatorRules = {
    roundingMl: 0.01,
    targetLabel: 'Exakter Optimalwert',
    historyDistanceTolerance: 0.05,
    osmoseDensityGPerMl: 1
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

const customCrElementDefinitions = [
    { key: 'Na', label: 'Na', unit: 'mg/l', target: 10800 },
    { key: 'Mg', label: 'Mg', unit: 'mg/l', target: 1320 },
    { key: 'Ca', label: 'Ca', unit: 'mg/l', target: 424 },
    { key: 'K', label: 'K', unit: 'mg/l', target: 405 },
    { key: 'Sr', label: 'Sr', unit: 'mg/l', target: 8.2 },
    { key: 'F', label: 'F', unit: 'mg/l', target: 1.3 },
    { key: 'Cl', label: 'Cl', unit: 'mg/l', target: 19558 },
    { key: 'S', label: 'S', unit: 'mg/l', target: 920 },
    { key: 'Br', label: 'Br', unit: 'mg/l', target: 68.0 },
    { key: 'B', label: 'B', unit: 'mg/l', target: 4.5 }
];

const customCrOptimalTargets = customCrElementDefinitions.reduce((acc, entry) => {
    acc[entry.key] = entry.target;
    return acc;
}, {});

const customCrExampleState = {
    tankLiters: 770,
    currentPsu: 34.0,
    targetPsu: 34.5,
    current: {
        Na: 10766,
        Mg: 1343,
        Ca: 422,
        K: 412,
        Sr: 8.3,
        F: 1.67,
        Cl: 19328,
        S: 898,
        Br: 67.8,
        B: 4.67
    },
    target: {
        Na: 10800,
        Mg: 1320,
        Ca: 425,
        K: 405,
        Sr: 8.2,
        F: 1.59,
        Cl: 19500,
        S: 920,
        Br: 68,
        B: 4.5
    }
};

const customCrProducts = [
    { item: 'Natriumchlorid (NaCl)', key: 'NaCl', doseMlPer100L: 100, increaseMgL: { Na: 120, Cl: 185 }, psuRisePerMlPer100L: 0.00305, note: '100 ml / 100 L' },
    { item: 'Magnesiumchlorid (MgCl2)', key: 'MgCl2', doseMlPer100L: 10, increaseMgL: { Mg: 10, Cl: 29.2 }, psuRisePerMlPer100L: 0.00392, note: '10 ml / 100 L' },
    { item: 'Natriumsulfat (Na2SO4)', key: 'Na2SO4', doseMlPer100L: 50, increaseMgL: { Na: 21.5, S: 15 }, psuRisePerMlPer100L: 0.00073, note: '50 ml / 100 L' },
    { item: 'Magnesiumsulfat (MgSO4)', key: 'MgSO4', doseMlPer100L: 20, increaseMgL: { Mg: 10, S: 13.2 }, psuRisePerMlPer100L: 0.00116, note: '20 ml / 100 L' },
    { item: 'Kaliumchlorid (KCl)', key: 'KCl', doseMlPer100L: 10, increaseMgL: { K: 10, Cl: 9.1 }, psuRisePerMlPer100L: 0.00191, note: '10 ml / 100 L' },
    { item: 'Kaliumsulfat (K2SO4)', key: 'K2SO4', doseMlPer100L: 25, increaseMgL: { K: 10, S: 4.1 }, psuRisePerMlPer100L: 0.00056, note: '25 ml / 100 L' },
    { item: 'Kaliumbromid (KBr)', key: 'KBr', doseMlPer100L: 1, increaseMgL: { K: 0.5, Br: 1.0 }, psuRisePerMlPer100L: 0.00150, note: '1 ml / 100 L' },
    { item: 'Strontiumchlorid (SrCl2)', key: 'SrCl2', doseMlPer100L: 1, increaseMgL: { Sr: 1.0, Cl: 0.8 }, psuRisePerMlPer100L: 0.00180, note: '1 ml / 100 L' },
    { item: 'Calciumchlorid (CaCl2)', key: 'CaCl2', doseMlPer100L: 5, increaseMgL: { Ca: 10, Cl: 17.7 }, psuRisePerMlPer100L: 0.00554, note: '5 ml / 100 L' },
    { item: 'Natriumfluorid (NaF)', key: 'NaF', doseMlPer100L: 10, increaseMgL: { F: 0.45, Na: 0.55 }, psuRisePerMlPer100L: 0.00010, note: '10 ml / 100 L' },
    { item: 'Bor (B)', key: 'B', doseMlPer100L: 20, increaseMgL: { B: 0.1 }, psuRisePerMlPer100L: 0.00003, note: '20 ml / 100 L' }
];

const customCrProxyReferencePsu = 34.5;
const customCrProxyReferenceSum = customCrElementDefinitions
    .reduce((sum, entry) => sum + (customCrOptimalTargets[entry.key] || 0), 0);

const customCrDefaultStepLimits = {
    Na: { up: 300, down: 300 },
    Mg: { up: 100, down: 100 },
    Ca: { up: 20, down: 20 },
    K: { up: 20, down: 20 },
    Sr: { up: 2, down: 2 },
    F: { up: 0.1, down: 0.1 },
    Cl: { up: 500, down: 500 },
    S: { up: 50, down: 50 },
    Br: { up: 10, down: 10 },
    B: { up: 1, down: 1 },
    PSU: { up: 1, down: 1 }
};

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
    },
    Kohlenstoff: {
        action: 'unterstützt die biologische Nährstoffreduktion',
        targetLabel: 'Startdosierung (ml pro 100 L):',
        primary: 'Kohlenstoffversorgung',
        mlPer100L: 1,
        primaryChange: 1,
        product: 'Kohlenstoff (C)',
        isDirectDose: true,
        recommendedMin: 0.2,
        recommendedMax: 2.0,
        startMin: 0.1,
        startMax: 0.25
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
const measurementUiState = { selectedEntryId: null, editingEntryId: null };
const logBookUiState = { editingEntryId: null };
const coralUiState = { editingId: null, pendingPhotos: [], selectedId: null, photosCleared: false };
const CORAL_STATUS_OPTIONS = [
    { value: 'neuzugang', label: 'Neuzugang' },
    { value: 'bestand', label: 'Bestandskoralle' },
    { value: 'ableger', label: 'Ableger' }
];
const AQUARIUM_FIELD_KEYS = [
    'implementationLog',
    'logBookCategories',
    'logBookEntries',
    'aquariumTodos',
    'dosingContainers',
    'measurementTypes',
    'measurementEntries',
    'feedNutrientLog',
    'osmoseTank',
    'traceDraft',
    'traceCalculator',
    'testCorrections',
    'majorCorrectionSettings',
    'psuCorrectionOffset',
    'toolSettings',
    'crSeaWaterPresets',
    'customSeaTracePresets',
    'dashboardSettings',
    'coralCatalog',
    'coralTransfers'
];
const WAREHOUSE_WRITE_TAB_IDS = new Set(['cr-export', 'trace-export', 'statistik', 'log', 'masseneingang', 'nachbestellen']);

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
const GOOGLE_DRIVE_SETTINGS_KEY = 'osci_google_drive_sync_v1';
const APP_STORAGE_DB_NAME = 'osci_motion_secure_store_v1';
const APP_STORAGE_DB_VERSION = 1;
const APP_STORAGE_STATE_STORE = 'state';
const APP_STORAGE_SNAPSHOT_STORE = 'snapshots';
const APP_STORAGE_STATE_KEY = 'app_state';
const APP_STORAGE_META_KEY = 'app_meta';
const APP_STORAGE_MAX_SNAPSHOTS = 18;
const LEGACY_DB_KEYS = [DB_KEY, 'osci_db_v4', 'osci_db_v3'];
const GOOGLE_DRIVE_CLIENT_ID = '416154582322-d4rha9hb68jo0j5allgp50e0r48p3efn.apps.googleusercontent.com';
const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const GOOGLE_DRIVE_FILE_NAME = 'osci-motion-project-backup.json';
const DEFAULT_SUPABASE_URL = 'https://ymeszigbnoaoqkwxcbqo.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_4LQDgitTmZeu9tO2Mh8Hew_-EseNuP0';
const COMMUNITY_MAP_DEFAULT_CENTER = { lat: 51.2, lng: 10.45 };
const COMMUNITY_MAP_GRID_STEP = 0.1;
let appState = null;
let activeWarehouseId = 'main';
let activeAquariumId = 'aquarium-main';
let db = { inventory: {}, stats: {}, logs: [], statsStarted: Date.now(), theme: 'default' };
let currentAction = {};
let crPdfAdjustments = [];
let supabaseClientPromise = null;
let supabaseClientInstance = null;
let syncPushTimer = null;
let syncIsPulling = false;
let startupSyncAttempted = false;
let communityMapLoading = false;
let otpCooldownUntil = 0;
let otpCooldownTimer = null;
let appStoragePromise = null;
let pendingPersistTimer = null;
let persistSequence = Promise.resolve();
let latestPersistAt = null;
let latestSnapshotAt = null;
let appBootstrapComplete = false;
let googleIdentityScriptPromise = null;
let googleDriveTokenClient = null;
let googleDriveAccessToken = '';
let googleDriveTokenExpiresAt = 0;
let googleDriveSyncTimer = null;
let googleDriveRemoteWatchTimer = null;
const googleDriveMonitorState = {
    checking: false,
    busyAction: '',
    lastCheckedAt: null,
    remoteModifiedAt: null,
    newerRemote: false,
    message: ''
};
const APP_TAB_IDS = ['uebersicht', 'lager', 'cr-export', 'trace-export', 'tools', 'logbuch', 'statistik', 'log', 'korallen', 'masseneingang', 'nachbestellen', 'einstellungen'];
const CR_PDF_IMPORT_ENABLED = false;
const CR_PDF_MAINTENANCE_MESSAGE = 'PDF-Import wegen Wartungsarbeiten deaktiviert.';
const CLOUD_SYNC_ENABLED = false;
const CLOUD_SYNC_MAINTENANCE_MESSAGE = 'Cloud Login & Share ist wegen Wartungsarbeiten voruebergehend deaktiviert.';
const DEFAULT_MENU_ORDER = ['uebersicht', 'lager', 'cr-export', 'trace-export', 'tools', 'logbuch', 'statistik', 'log', 'korallen', 'masseneingang', 'nachbestellen', 'einstellungen'];
const MENU_ORDER_KEY = 'osci_menu_order_v1';
const MOBILE_QUICK_TABS_KEY = 'osci_mobile_quick_tabs_v1';
const HIDDEN_MENU_TABS_KEY = 'osci_hidden_menu_tabs_v1';
const TAB_LABELS = {
    uebersicht: 'Übersicht',
    lager: 'Lager',
    'cr-export': 'C&R',
    'trace-export': 'Trace',
    tools: 'Tools',
    logbuch: 'Logbuch',
    korallen: 'Korallen',
    statistik: 'Statistik',
    log: 'Protokoll',
    masseneingang: 'Wareneingang',
    nachbestellen: 'Nachbestellen',
    einstellungen: 'Einstellungen'
};
const TAB_ICONS = {
    uebersicht: '<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-7h6v7"></path>',
    lager: '<path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z"></path><path d="M4 7.5V16l8 5 8-5V7.5"></path><path d="M12 12v9"></path>',
    'cr-export': '<path d="M9 3h6"></path><path d="M10 3v5l-5.5 9.5A2.3 2.3 0 0 0 6.5 21h11a2.3 2.3 0 0 0 2-3.5L14 8V3"></path><path d="M7.5 16h9"></path>',
    'trace-export': '<path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z"></path><path d="M9 15.5a3.2 3.2 0 0 0 3 2"></path>',
    tools: '<path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5L20 16.4a2.1 2.1 0 1 1-3 3l-7.7-7.7"></path>',
    logbuch: '<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v18H7.5A2.5 2.5 0 0 0 5 22V4.5Z"></path><path d="M5 18h15"></path><path d="m9 10 2 2 4-4"></path>',
    korallen: '<path d="M12 21V10"></path><path d="M12 14 7 9"></path><path d="M12 16l5-5"></path><path d="M7 9V5"></path><path d="M7 9H3"></path><path d="M17 11V6"></path><path d="M17 11h4"></path><path d="M12 10 9 7"></path><path d="M12 10l3-4"></path>',
    statistik: '<path d="M4 20V10"></path><path d="M10 20V4"></path><path d="M16 20v-7"></path><path d="M22 20H2"></path>',
    log: '<path d="M8 6h12"></path><path d="M8 12h12"></path><path d="M8 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>',
    masseneingang: '<path d="M4 13v8h16v-8"></path><path d="M12 3v13"></path><path d="m7 11 5 5 5-5"></path>',
    nachbestellen: '<circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle><path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"></path>',
    einstellungen: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"></path>'
};

function getTabIconMarkup(tabId) {
    const paths = TAB_ICONS[tabId] || '<circle cx="12" cy="12" r="2"></circle>';
    return `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

function getMoreIconMarkup() {
    return '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>';
}

function normalizeMenuOrder(order) {
    const valid = Array.isArray(order) ? order.filter(id => DEFAULT_MENU_ORDER.includes(id)) : [];
    const normalized = [...valid, ...DEFAULT_MENU_ORDER.filter(id => !valid.includes(id))];
    const korallenIndex = normalized.indexOf('korallen');
    const overviewIndex = normalized.indexOf('uebersicht');
    const logIndex = normalized.indexOf('log');
    if (korallenIndex >= 0 && logIndex >= 0 && korallenIndex === overviewIndex + 1) {
        normalized.splice(korallenIndex, 1);
        const nextLogIndex = normalized.indexOf('log');
        normalized.splice(nextLogIndex + 1, 0, 'korallen');
    }
    return normalized;
}

const ALWAYS_VISIBLE_TABS = new Set(['einstellungen']);
const communityUiState = {
    selectedProfileId: null
};
const CUSTOM_CR_UNLOCK_KEY = 'osci-custom-cr-unlocked';
const CUSTOM_CR_PASSWORD = 'OSCI';

function ensureCloudSyncEnabled(actionLabel = 'Cloud Login & Share') {
    if (CLOUD_SYNC_ENABLED) return true;
    updateSyncStatus(CLOUD_SYNC_MAINTENANCE_MESSAGE, 'warn');
    return false;
}

function deepClone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function canUseIndexedDb() {
    return typeof window !== 'undefined' && 'indexedDB' in window;
}

function openAppStorage() {
    if (!canUseIndexedDb()) return Promise.resolve(null);
    if (!appStoragePromise) {
        appStoragePromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(APP_STORAGE_DB_NAME, APP_STORAGE_DB_VERSION);
            request.onupgradeneeded = () => {
                const idb = request.result;
                if (!idb.objectStoreNames.contains(APP_STORAGE_STATE_STORE)) {
                    idb.createObjectStore(APP_STORAGE_STATE_STORE);
                }
                if (!idb.objectStoreNames.contains(APP_STORAGE_SNAPSHOT_STORE)) {
                    const snapshotStore = idb.createObjectStore(APP_STORAGE_SNAPSHOT_STORE, { keyPath: 'id' });
                    snapshotStore.createIndex('createdAt', 'createdAt', { unique: false });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error || new Error('IndexedDB konnte nicht geöffnet werden.'));
        }).catch(err => {
            console.error('IndexedDB init failed:', err);
            return null;
        });
    }
    return appStoragePromise;
}

async function idbGet(storeName, key) {
    const idb = await openAppStorage();
    if (!idb) return null;
    return new Promise((resolve, reject) => {
        const tx = idb.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error || new Error(`IndexedDB get failed for ${storeName}`));
    }).catch(err => {
        console.error(err);
        return null;
    });
}

async function idbPut(storeName, key, value) {
    const idb = await openAppStorage();
    if (!idb) return false;
    return new Promise((resolve, reject) => {
        const tx = idb.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = key === undefined ? store.put(value) : store.put(value, key);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error || new Error(`IndexedDB put failed for ${storeName}`));
    }).catch(err => {
        console.error(err);
        return false;
    });
}

async function idbDelete(storeName, key) {
    const idb = await openAppStorage();
    if (!idb) return false;
    return new Promise((resolve, reject) => {
        const tx = idb.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error || new Error(`IndexedDB delete failed for ${storeName}`));
    }).catch(err => {
        console.error(err);
        return false;
    });
}

async function idbGetAllSnapshots() {
    const idb = await openAppStorage();
    if (!idb) return [];
    return new Promise((resolve, reject) => {
        const tx = idb.transaction(APP_STORAGE_SNAPSHOT_STORE, 'readonly');
        const store = tx.objectStore(APP_STORAGE_SNAPSHOT_STORE);
        const request = store.getAll();
        request.onsuccess = () => resolve(Array.isArray(request.result) ? request.result : []);
        request.onerror = () => reject(request.error || new Error('IndexedDB getAll snapshots failed.'));
    }).catch(err => {
        console.error(err);
        return [];
    });
}

async function removeLegacyLocalDbCopies() {
    LEGACY_DB_KEYS.forEach(key => {
        try { localStorage.removeItem(key); } catch (err) {}
    });
}

async function loadPersistedAppState() {
    const indexedValue = await idbGet(APP_STORAGE_STATE_STORE, APP_STORAGE_STATE_KEY);
    if (indexedValue && typeof indexedValue === 'object') {
        latestPersistAt = indexedValue.savedAt || indexedValue.updatedAt || null;
        return indexedValue.payload || null;
    }
    let parsed = null;
    for (const key of LEGACY_DB_KEYS) {
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                parsed = JSON.parse(saved);
                break;
            }
        } catch (e) {
            console.error('Legacy storage load failed:', e);
        }
    }
    return parsed;
}

async function trimStoredSnapshots() {
    const snapshots = await idbGetAllSnapshots();
    if (snapshots.length <= APP_STORAGE_MAX_SNAPSHOTS) return;
    const sorted = snapshots.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const toDelete = sorted.slice(APP_STORAGE_MAX_SNAPSHOTS);
    for (const entry of toDelete) {
        await idbDelete(APP_STORAGE_SNAPSHOT_STORE, entry.id);
    }
}

async function getAppStorageMeta() {
    return await idbGet(APP_STORAGE_STATE_STORE, APP_STORAGE_META_KEY);
}

async function getLatestStoredSnapshot() {
    const snapshots = await idbGetAllSnapshots();
    if (!snapshots.length) return null;
    return snapshots.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0];
}

function getSnapshotReasonLabel(reason = '') {
    const value = String(reason || '').toLowerCase();
    if (value === 'manual-snapshot') return 'Manuell erstellt';
    if (value === 'restore-snapshot') return 'Nach Wiederherstellung';
    if (value === 'google-drive-restore') return 'Cloud geladen';
    if (value === 'import-project') return 'Projekt importiert';
    if (value === 'init-load') return 'Beim Laden gespeichert';
    if (value.startsWith('save')) return 'Automatische Sicherung';
    if (value === 'init-empty') return 'Erststart';
    return reason ? reason : 'Sicherungspunkt';
}

function getSnapshotRelativeLabel(createdAt) {
    if (!createdAt) return '';
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const diffHours = diffMs / (60 * 60 * 1000);
    if (diffHours < 24) return 'Heute';
    if (diffHours < 48) return 'Gestern';
    if (diffHours < (24 * 7)) return 'Diese Woche';
    if (diffHours < (24 * 14)) return 'Letzte Woche';
    return 'Älter';
}

function getSnapshotWarehouseLabel(snapshot) {
    const payload = snapshot?.payload;
    const activeId = payload?.activeWarehouseId || '';
    const warehouse = activeId && payload?.warehouses ? payload.warehouses[activeId] : null;
    return warehouse?.name || payload?.warehouseName || 'Projektstand';
}

async function persistAppStateNow(reason = 'autosave', createSnapshot = false) {
    if (!appState) return false;
    const payload = deepClone(appState);
    const savedAt = new Date().toISOString();
    latestPersistAt = savedAt;
    const stateRecord = {
        key: APP_STORAGE_STATE_KEY,
        savedAt,
        reason,
        payload
    };
    const ok = await idbPut(APP_STORAGE_STATE_STORE, APP_STORAGE_STATE_KEY, stateRecord);
    if (!ok) return false;
    await idbPut(APP_STORAGE_STATE_STORE, APP_STORAGE_META_KEY, {
        key: APP_STORAGE_META_KEY,
        lastSavedAt: savedAt,
        lastSnapshotAt: latestSnapshotAt || null,
        schema: APP_STORAGE_DB_VERSION
    });
    if (createSnapshot) {
        const snapshot = {
            id: `snapshot-${savedAt}`,
            createdAt: savedAt,
            reason,
            payload
        };
        const snapshotOk = await idbPut(APP_STORAGE_SNAPSHOT_STORE, undefined, snapshot);
        if (snapshotOk) latestSnapshotAt = savedAt;
        await trimStoredSnapshots();
    }
    renderStorageSecurityStatus();
    return true;
}

function queuePersistAppState(reason = 'autosave', createSnapshot = false) {
    if (!appBootstrapComplete) return;
    clearTimeout(pendingPersistTimer);
    pendingPersistTimer = setTimeout(() => {
        persistSequence = persistSequence.then(() => persistAppStateNow(reason, createSnapshot)).catch(err => {
            console.error('Persist queue failed:', err);
        });
    }, 220);
}

async function flushPendingPersistence(reason = 'flush', createSnapshot = false) {
    clearTimeout(pendingPersistTimer);
    pendingPersistTimer = null;
    await persistSequence.catch(() => {});
    await persistAppStateNow(reason, createSnapshot);
}

function getGoogleDriveSyncSettings() {
    try {
        const parsed = JSON.parse(localStorage.getItem(GOOGLE_DRIVE_SETTINGS_KEY) || '{}');
        return {
            autoSync: parsed.autoSync === true,
            fileId: parsed.fileId || '',
            lastSyncAt: parsed.lastSyncAt || null,
            lastRestoreAt: parsed.lastRestoreAt || null,
            connectedEmail: parsed.connectedEmail || '',
            remindReconnect: parsed.remindReconnect !== false,
            lastPromptAt: parsed.lastPromptAt || null
        };
    } catch (err) {
        return { autoSync: false, fileId: '', lastSyncAt: null, lastRestoreAt: null, connectedEmail: '', remindReconnect: true, lastPromptAt: null };
    }
}

function storeGoogleDriveSyncSettings(settings) {
    const current = getGoogleDriveSyncSettings();
    localStorage.setItem(GOOGLE_DRIVE_SETTINGS_KEY, JSON.stringify({
        ...current,
        ...settings
    }));
}

function isGoogleDriveConfigured() {
    return typeof GOOGLE_DRIVE_CLIENT_ID === 'string' && GOOGLE_DRIVE_CLIENT_ID.trim().length > 0;
}

function hasValidGoogleDriveToken() {
    return !!googleDriveAccessToken && googleDriveTokenExpiresAt > Date.now() + 60_000;
}

function getGoogleDriveSyncStatusMessage() {
    if (!isGoogleDriveConfigured()) {
        return 'Noch nicht eingerichtet: Es fehlt aktuell die Google OAuth Client ID der App.';
    }
    const settings = getGoogleDriveSyncSettings();
    if (!settings.connectedEmail && !hasValidGoogleDriveToken()) return 'Bereit zur Einrichtung. Nutzer verbinden später nur ihr eigenes Google-Konto.';
    if (hasValidGoogleDriveToken()) {
        return settings.autoSync
            ? `Google Drive verbunden · Auto-Sync bereit`
            : `Google Drive verbunden · Auto-Sync aus`;
    }
    return settings.connectedEmail
        ? `Verbunden mit ${settings.connectedEmail} · Bitte Verbindung für diese Sitzung erneuern`
        : 'Verbindung fuer diese Sitzung abgelaufen. Bitte erneut mit Google Drive verbinden.';
}

function getLatestLocalProjectUpdateAt() {
    const warehouses = Object.values(appState?.warehouses || {});
    return warehouses.reduce((latest, warehouse) => {
        const current = new Date(warehouse?.localUpdatedAt || warehouse?.data?.localUpdatedAt || 0).getTime();
        return Math.max(latest, Number.isFinite(current) ? current : 0);
    }, 0);
}

function hasPendingGoogleDriveLocalChanges() {
    const settings = getGoogleDriveSyncSettings();
    const lastCloudSync = new Date(settings.lastSyncAt || 0).getTime();
    return getLatestLocalProjectUpdateAt() > lastCloudSync;
}

function openGoogleDriveSyncSettings() {
    closeCloudQuickSyncMenu();
    selectTab('einstellungen');
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelector('.google-drive-sync-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
    });
}

function openProjectSupportSettings() {
    closeCloudQuickSyncMenu();
    selectTab('einstellungen');
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.getElementById('projectSupportCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
    });
}

function renderGoogleDriveHeaderStatus() {
    const indicator = document.getElementById('googleDriveHeaderStatus');
    if (!indicator) return;
    const settings = getGoogleDriveSyncSettings();
    const connected = hasValidGoogleDriveToken();
    const knownAccount = settings.connectedEmail || '';
    const autoSync = settings.autoSync === true;
    let subtitle = knownAccount ? `offline · ${knownAccount}` : 'offline';
    indicator.classList.remove('is-connected', 'is-warning');
    if (connected) {
        subtitle = autoSync ? 'online · Auto-Sync aktiv' : 'online · manuell';
        indicator.classList.add('is-connected');
    } else if (knownAccount) {
        subtitle = `offline · ${knownAccount}`;
        indicator.classList.add('is-warning');
    }
    if (googleDriveMonitorState.newerRemote) {
        subtitle = hasPendingGoogleDriveLocalChanges()
            ? 'online · neuerer Cloud-Stand'
            : 'online · Cloud-Update bereit';
        indicator.classList.add('is-warning');
    }
    indicator.innerHTML = `
        <span class="header-sync-dot" aria-hidden="true"></span>
        <span class="header-sync-copy">
            <strong>Cloud Status</strong>
            <small>${escapeHtml(subtitle)}</small>
        </span>
    `;
}

function shouldPromptGoogleDriveReconnect() {
    const settings = getGoogleDriveSyncSettings();
    if (settings.remindReconnect === false) return false;
    const lastPromptAt = new Date(settings.lastPromptAt || 0).getTime();
    return !lastPromptAt || (Date.now() - lastPromptAt) > (15 * 60 * 1000);
}

function setGoogleDriveReconnectReminder(enabled) {
    storeGoogleDriveSyncSettings({
        remindReconnect: enabled !== false,
        lastPromptAt: enabled === false ? new Date().toISOString() : null
    });
    renderGoogleDriveSyncCard(enabled === false ? 'Automatische Login-Erinnerung deaktiviert.' : 'Automatische Login-Erinnerung aktiviert.');
}

function showGoogleDriveReconnectPrompt(reason = '') {
    if (!shouldPromptGoogleDriveReconnect()) return;
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    if (!modal || !title || !body) return;
    storeGoogleDriveSyncSettings({ lastPromptAt: new Date().toISOString() });
    title.innerText = 'Cloud Login nötig';
    body.innerHTML = `
        <div class="cloud-login-prompt">
            <p>${escapeHtml(reason || 'Die Cloud ist gerade offline. Bitte verbinde dein Google-Konto erneut, damit Synchronisierung und Cloud-Backup wieder funktionieren.')}</p>
            <div class="btn-group" style="flex-wrap:wrap; margin-top:12px;">
                <button class="btn-primary btn-animated" onclick="reconnectGoogleDriveFromPrompt()">Jetzt einloggen</button>
                <button class="btn-secondary btn-animated" onclick="closeModal()">Später</button>
                <button class="btn-out btn-animated" onclick="disableGoogleDriveReconnectPrompt()">Nie wieder erinnern</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

async function reconnectGoogleDriveFromPrompt() {
    closeModal();
    await ensureGoogleDriveOnline({ interactive: true, showPrompt: true, reason: 'Cloud Status' });
}

function disableGoogleDriveReconnectPrompt() {
    setGoogleDriveReconnectReminder(false);
    closeModal();
    showToast('Automatische Cloud-Login-Erinnerung deaktiviert', 'info', 2600);
}

async function ensureGoogleDriveOnline({ interactive = false, showPrompt = false, reason = '' } = {}) {
    const settings = getGoogleDriveSyncSettings();
    if (hasValidGoogleDriveToken()) return true;
    if (!isGoogleDriveConfigured()) return false;
    if (settings.connectedEmail || settings.autoSync) {
        const restored = await tryRestoreGoogleDriveSession();
        if (restored || hasValidGoogleDriveToken()) return true;
    }
    if (interactive) {
        try {
            await requestGoogleDriveAccessToken(true);
            renderGoogleDriveSyncCard('Google Drive Verbindung wiederhergestellt.');
            scheduleGoogleDriveRemoteWatch(2500);
            return true;
        } catch (err) {
            renderGoogleDriveSyncCard(`Verbindung fehlgeschlagen: ${err.message}`);
        }
    }
    if (showPrompt) {
        showGoogleDriveReconnectPrompt(reason || 'Cloud-Sync ist momentan offline. Bitte melde dich erneut an.');
    }
    return false;
}

async function refreshGoogleDrivePresence(showPrompt = false) {
    const settings = getGoogleDriveSyncSettings();
    if (!isGoogleDriveConfigured() || (!settings.connectedEmail && !settings.autoSync)) return false;
    if (hasValidGoogleDriveToken()) return true;
    return ensureGoogleDriveOnline({
        interactive: false,
        showPrompt,
        reason: 'Die Cloud ist aktuell offline. Bitte melde dich erneut an, damit Synchronisierung und Wiederherstellung wieder funktionieren.'
    });
}

async function toggleCloudQuickSyncMenu(forceOpen = null) {
    const menu = document.getElementById('cloudQuickSyncMenu');
    const button = document.getElementById('cloudQuickSyncButton');
    if (!menu || !button) return;
    const willOpen = forceOpen === null ? menu.hidden : !!forceOpen;
    if (willOpen && !hasValidGoogleDriveToken()) {
        const online = await ensureGoogleDriveOnline({
            interactive: true,
            showPrompt: true,
            reason: 'Für den Schnell-Sync ist eine aktive Cloud-Verbindung nötig.'
        });
        if (!online) {
            menu.hidden = true;
            button.classList.remove('is-active');
            button.setAttribute('aria-expanded', 'false');
            return;
        }
    }
    menu.hidden = !willOpen;
    button.classList.toggle('is-active', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
}

function closeCloudQuickSyncMenu() {
    const menu = document.getElementById('cloudQuickSyncMenu');
    const button = document.getElementById('cloudQuickSyncButton');
    if (menu) menu.hidden = true;
    if (button) {
        button.classList.remove('is-active');
        button.setAttribute('aria-expanded', 'false');
    }
}

async function runCloudQuickAction(action) {
    closeCloudQuickSyncMenu();
    switch (action) {
        case 'download':
            if (!await ensureGoogleDriveOnline({ interactive: true, showPrompt: true, reason: 'Zum Download braucht die App eine aktive Cloud-Verbindung.' })) return;
            await restoreProjectFromGoogleDriveNow();
            break;
        case 'upload':
            if (!await ensureGoogleDriveOnline({ interactive: true, showPrompt: true, reason: 'Zum Upload braucht die App eine aktive Cloud-Verbindung.' })) return;
            await syncProjectToGoogleDriveNow();
            break;
        case 'settings':
            openGoogleDriveSyncSettings();
            break;
        default:
            break;
    }
}

function ensureGoogleIdentityScript() {
    if (!isGoogleDriveConfigured()) return Promise.resolve(false);
    if (window.google?.accounts?.oauth2) return Promise.resolve(true);
    if (!googleIdentityScriptPromise) {
        googleIdentityScriptPromise = new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-google-identity="true"]');
            if (existing) {
                existing.addEventListener('load', () => resolve(true), { once: true });
                existing.addEventListener('error', () => reject(new Error('Google Identity Script konnte nicht geladen werden.')), { once: true });
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.dataset.googleIdentity = 'true';
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error('Google Identity Script konnte nicht geladen werden.'));
            document.head.appendChild(script);
        }).catch(err => {
            console.error(err);
            return false;
        });
    }
    return googleIdentityScriptPromise;
}

async function ensureGoogleDriveTokenClient() {
    if (!isGoogleDriveConfigured()) throw new Error('Google Drive Sync ist noch nicht eingerichtet. Es fehlt die Google OAuth Client ID.');
    const ready = await ensureGoogleIdentityScript();
    if (!ready || !window.google?.accounts?.oauth2) throw new Error('Google Identity Services sind nicht verfügbar.');
    if (!googleDriveTokenClient) {
        googleDriveTokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_DRIVE_CLIENT_ID,
            scope: GOOGLE_DRIVE_SCOPE,
            callback: () => {}
        });
    }
    return googleDriveTokenClient;
}

async function fetchGoogleUserEmail(accessToken) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) return '';
    const profile = await response.json();
    return profile?.email || '';
}

async function requestGoogleDriveAccessToken(interactive = true) {
    if (hasValidGoogleDriveToken()) return googleDriveAccessToken;
    const client = await ensureGoogleDriveTokenClient();
    return new Promise((resolve, reject) => {
        client.callback = async response => {
            if (!response || response.error) {
                reject(new Error(response?.error_description || response?.error || 'Google OAuth fehlgeschlagen.'));
                return;
            }
            googleDriveAccessToken = response.access_token || '';
            googleDriveTokenExpiresAt = Date.now() + ((response.expires_in || 0) * 1000);
            const email = await fetchGoogleUserEmail(googleDriveAccessToken);
            if (email) storeGoogleDriveSyncSettings({ connectedEmail: email });
            renderGoogleDriveSyncCard();
            resolve(googleDriveAccessToken);
        };
        client.error_callback = error => {
            reject(new Error(error?.message || 'Google OAuth abgebrochen.'));
        };
        client.requestAccessToken({ prompt: interactive ? 'consent' : 'none' });
    });
}

async function googleDriveFetch(url, options = {}) {
    const token = hasValidGoogleDriveToken() ? googleDriveAccessToken : await requestGoogleDriveAccessToken(false);
    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Google Drive Fehler ${response.status}: ${text || response.statusText}`);
    }
    return response;
}

function buildProjectBackupPayload() {
    const exportedAt = new Date().toISOString();
    const warehouse = getActiveWarehouse();
    syncActiveAquariumDataFromDb(false);
    if (warehouse) warehouse.lastExportAt = exportedAt;
    return {
        type: 'osci_project_backup',
        version: 2,
        app: 'OSCI Motion',
        schema: APP_STORAGE_DB_VERSION,
        activeWarehouseId,
        activeAquariumId,
        warehouseName: warehouse ? warehouse.name : 'Lager',
        exportedAt,
        data: deepClone(appState)
    };
}

async function findGoogleDriveBackupFileId() {
    const metadata = await fetchGoogleDriveBackupMetadata();
    return metadata?.id || '';
}

async function fetchGoogleDriveBackupMetadata() {
    const settings = getGoogleDriveSyncSettings();
    if (settings.fileId) {
        try {
            const response = await googleDriveFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(settings.fileId)}?fields=id,name,modifiedTime`);
            const json = await response.json();
            if (json?.id) return json;
        } catch (err) {}
    }
    const query = encodeURIComponent(`name='${GOOGLE_DRIVE_FILE_NAME.replace(/'/g, "\\'")}' and trashed=false`);
    const response = await googleDriveFetch(`https://www.googleapis.com/drive/v3/files?q=${query}&spaces=appDataFolder&fields=files(id,name,modifiedTime)`);
    const json = await response.json();
    const file = json?.files?.[0] || null;
    if (file?.id) storeGoogleDriveSyncSettings({ fileId: file.id });
    return file;
}

function buildGoogleDriveMultipartBody(metadata, content) {
    const boundary = `osci-boundary-${Date.now().toString(36)}`;
    const body = [
        `--${boundary}`,
        'Content-Type: application/json; charset=UTF-8',
        '',
        JSON.stringify(metadata),
        `--${boundary}`,
        'Content-Type: application/json; charset=UTF-8',
        '',
        JSON.stringify(content),
        `--${boundary}--`
    ].join('\r\n');
    return { boundary, body };
}

async function uploadProjectBackupToGoogleDrive(trigger = 'manual') {
    if (!isGoogleDriveConfigured()) throw new Error('Google Drive Sync ist noch nicht eingerichtet.');
    const payload = buildProjectBackupPayload();
    const fileId = await findGoogleDriveBackupFileId();
    const metadata = fileId ? { modifiedTime: new Date().toISOString() } : { name: GOOGLE_DRIVE_FILE_NAME, parents: ['appDataFolder'] };
    const { boundary, body } = buildGoogleDriveMultipartBody(metadata, payload);
    const method = fileId ? 'PATCH' : 'POST';
    const url = fileId
        ? `https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(fileId)}?uploadType=multipart`
        : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
    const response = await googleDriveFetch(url, {
        method,
        headers: {
            'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body
    });
    const saved = await response.json();
    const lastSyncAt = new Date().toISOString();
    storeGoogleDriveSyncSettings({
        fileId: saved.id || fileId || '',
        lastSyncAt
    });
    googleDriveMonitorState.remoteModifiedAt = lastSyncAt;
    googleDriveMonitorState.newerRemote = false;
    googleDriveMonitorState.lastCheckedAt = lastSyncAt;
    googleDriveMonitorState.message = trigger === 'autosync'
        ? 'Automatisch in Google Drive aktualisiert.'
        : 'Cloud-Stand erfolgreich aktualisiert.';
    renderGoogleDriveSyncCard();
    return { saved, lastSyncAt, trigger };
}

async function restoreProjectBackupFromGoogleDrive() {
    const fileId = await findGoogleDriveBackupFileId();
    if (!fileId) throw new Error('In deiner Google Cloud wurde noch kein OSCI Backup gefunden.');
    const response = await googleDriveFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`);
    const parsed = await response.json();
    if (!parsed || parsed.type !== 'osci_project_backup' || !parsed.data) {
        throw new Error('Die Google-Backup-Datei hat kein gültiges OSCI Projektformat.');
    }
    appState = migrateToWarehouseState(parsed.data);
    activeWarehouseId = parsed.activeWarehouseId || appState.activeWarehouseId || Object.keys(appState.warehouses || {})[0] || 'main';
    activeAquariumId = parsed.activeAquariumId || appState.activeAquariumId || Object.keys(appState.aquariums || {})[0] || 'aquarium-main';
    appState.activeWarehouseId = activeWarehouseId;
    appState.activeAquariumId = activeAquariumId;
    const active = getActiveWarehouse();
    if (active) db = normalizeWarehouseData(active.data);
    overlayActiveAquariumData();
    await persistAppStateNow('google-drive-restore', true);
    applyTheme(db.theme || 'default', false);
    renderCurrentWarehouseViews();
    const restoredAt = new Date().toISOString();
    storeGoogleDriveSyncSettings({ lastRestoreAt: restoredAt, fileId, lastSyncAt: parsed.exportedAt || restoredAt });
    googleDriveMonitorState.remoteModifiedAt = parsed.exportedAt || restoredAt;
    googleDriveMonitorState.newerRemote = false;
    googleDriveMonitorState.lastCheckedAt = restoredAt;
    googleDriveMonitorState.message = 'Cloud-Stand auf dieses Geraet geladen.';
    renderGoogleDriveSyncCard();
}

function scheduleGoogleDriveAutoSync() {
    const settings = getGoogleDriveSyncSettings();
    if (!settings.autoSync || !hasValidGoogleDriveToken()) return;
    clearTimeout(googleDriveSyncTimer);
    googleDriveSyncTimer = setTimeout(() => {
        uploadProjectBackupToGoogleDrive('autosync')
            .then(() => showToast('Google Drive Sync aktualisiert', 'success', 1800))
            .catch(err => {
                console.error(err);
                renderGoogleDriveSyncCard(`Auto-Sync pausiert: ${err.message}`);
            });
    }, 2600);
}

function scheduleGoogleDriveRemoteWatch(delay = 6000) {
    clearTimeout(googleDriveRemoteWatchTimer);
    const settings = getGoogleDriveSyncSettings();
    if (!settings.autoSync || (!hasValidGoogleDriveToken() && !settings.connectedEmail)) return;
    googleDriveRemoteWatchTimer = setTimeout(() => {
        checkGoogleDriveRemoteChanges({ silent: true, autoRestore: true }).catch(() => {});
    }, Math.max(1500, delay));
}

async function checkGoogleDriveRemoteChanges({ silent = false, autoRestore = false } = {}) {
    const settings = getGoogleDriveSyncSettings();
    if (!isGoogleDriveConfigured() || (!settings.connectedEmail && !hasValidGoogleDriveToken())) return false;
    googleDriveMonitorState.checking = true;
    googleDriveMonitorState.message = 'Pruefe Google Drive auf neueren Stand ...';
    renderGoogleDriveSyncCard();
    try {
        if (!hasValidGoogleDriveToken()) {
            const restored = await tryRestoreGoogleDriveSession();
            if (!restored) throw new Error('Google Sitzung muss fuer diese Sitzung erneut verbunden werden.');
        }
        const metadata = await fetchGoogleDriveBackupMetadata();
        googleDriveMonitorState.lastCheckedAt = new Date().toISOString();
        if (!metadata?.id) {
            googleDriveMonitorState.remoteModifiedAt = null;
            googleDriveMonitorState.newerRemote = false;
            googleDriveMonitorState.message = 'Noch kein Cloud-Backup gefunden.';
            renderGoogleDriveSyncCard();
            scheduleGoogleDriveRemoteWatch(5 * 60 * 1000);
            return false;
        }
        const remoteModifiedAt = metadata.modifiedTime || null;
        const remoteTime = new Date(remoteModifiedAt || 0).getTime();
        const localReference = Math.max(
            new Date(settings.lastRestoreAt || 0).getTime(),
            new Date(settings.lastSyncAt || 0).getTime()
        );
        const newerRemote = remoteTime > localReference + 1000;
        googleDriveMonitorState.remoteModifiedAt = remoteModifiedAt;
        googleDriveMonitorState.newerRemote = newerRemote;
        if (newerRemote) {
            if (autoRestore && !hasPendingGoogleDriveLocalChanges()) {
                await restoreProjectBackupFromGoogleDrive();
                showToast('Neuerer Cloud-Stand automatisch geladen', 'success', 2600);
                googleDriveMonitorState.message = 'Neuerer Cloud-Stand automatisch geladen.';
            } else {
                googleDriveMonitorState.message = hasPendingGoogleDriveLocalChanges()
                    ? 'In der Cloud liegt ein neuerer Stand. Erst lokale Aenderungen sichern oder manuell laden.'
                    : 'In der Cloud liegt ein neuerer Stand zum Laden bereit.';
                if (!silent) showToast('Neuerer Cloud-Stand erkannt', 'info', 2600);
            }
        } else {
            googleDriveMonitorState.message = 'Cloud und dieses Geraet sind auf demselben Stand.';
        }
        renderGoogleDriveSyncCard();
        scheduleGoogleDriveRemoteWatch(5 * 60 * 1000);
        return newerRemote;
    } catch (err) {
        googleDriveMonitorState.message = `Cloud-Pruefung pausiert: ${err.message}`;
        renderGoogleDriveSyncCard();
        scheduleGoogleDriveRemoteWatch(8 * 60 * 1000);
        if (!silent) await appAlert('Google Drive Prüfung fehlgeschlagen: ' + err.message, {
            title: 'Cloud-Prüfung nicht möglich',
            type: 'warning'
        });
        return false;
    } finally {
        googleDriveMonitorState.checking = false;
        renderGoogleDriveSyncCard();
    }
}

async function connectGoogleDriveSync() {
    try {
        const connected = await ensureGoogleDriveOnline({ interactive: true, showPrompt: true, reason: 'Bitte mit Google verbinden, damit dein Cloud-Backup wieder online ist.' });
        if (!connected) return;
        renderGoogleDriveSyncCard('Google Drive verbunden.');
        scheduleGoogleDriveRemoteWatch(4000);
        showToast('Google Drive verbunden', 'success', 2200);
    } catch (err) {
        renderGoogleDriveSyncCard(`Verbindung fehlgeschlagen: ${err.message}`);
        await appAlert('Google Drive Verbindung fehlgeschlagen: ' + err.message, {
            title: 'Verbindung fehlgeschlagen',
            type: 'warning'
        });
    }
}

async function disconnectGoogleDriveSync() {
    if (googleDriveMonitorState.busyAction) return;
    const confirmed = await appConfirm('Google Drive für dieses Gerät trennen? Deine lokalen Daten und vorhandene Cloud-Sicherungen bleiben erhalten.', {
        title: 'Google Drive trennen',
        type: 'warning',
        confirmText: 'Verbindung trennen'
    });
    if (!confirmed) return;
    const settings = getGoogleDriveSyncSettings();
    if (googleDriveAccessToken && window.google?.accounts?.oauth2?.revoke) {
        try { google.accounts.oauth2.revoke(googleDriveAccessToken, () => {}); } catch (err) {}
    }
    googleDriveAccessToken = '';
    googleDriveTokenExpiresAt = 0;
    clearTimeout(googleDriveSyncTimer);
    clearTimeout(googleDriveRemoteWatchTimer);
    googleDriveMonitorState.checking = false;
    googleDriveMonitorState.newerRemote = false;
    googleDriveMonitorState.message = 'Google Drive ist getrennt.';
    storeGoogleDriveSyncSettings({
        connectedEmail: '',
        autoSync: false,
        fileId: settings.fileId || '',
        lastSyncAt: settings.lastSyncAt || null,
        lastRestoreAt: settings.lastRestoreAt || null
    });
    renderGoogleDriveSyncCard('Google Drive Verbindung getrennt.');
}

function toggleGoogleDriveAutoSync(enabled) {
    storeGoogleDriveSyncSettings({ autoSync: enabled === true });
    renderGoogleDriveSyncCard(enabled ? 'Auto-Sync aktiviert.' : 'Auto-Sync deaktiviert.');
    if (enabled) {
        scheduleGoogleDriveAutoSync();
        scheduleGoogleDriveRemoteWatch(4000);
    } else {
        clearTimeout(googleDriveRemoteWatchTimer);
    }
}

function toggleGoogleDriveReconnectReminder(enabled) {
    setGoogleDriveReconnectReminder(enabled === true);
    if (enabled) {
        showToast('Cloud-Login-Erinnerung aktiviert', 'success', 2200);
    } else {
        showToast('Cloud-Login-Erinnerung deaktiviert', 'info', 2200);
    }
}

async function inspectGoogleDriveSyncNow() {
    try {
        if (!hasValidGoogleDriveToken()) await requestGoogleDriveAccessToken(true);
        const metadata = await fetchGoogleDriveBackupMetadata();
        const fileId = metadata?.id || '';
        const settings = getGoogleDriveSyncSettings();
        let message = 'Google Drive Verbindung geprüft.';
        if (fileId) {
            message += ` Backup gefunden.`;
            storeGoogleDriveSyncSettings({ fileId });
            googleDriveMonitorState.remoteModifiedAt = metadata?.modifiedTime || googleDriveMonitorState.remoteModifiedAt;
        } else {
            message += ' Es wurde noch kein Backup in deinem App-Speicher gefunden.';
        }
        renderGoogleDriveSyncCard(message);
        showToast(fileId ? 'Google Drive Backup gefunden' : 'Noch kein Google Drive Backup vorhanden', fileId ? 'success' : 'info', 2600);
    } catch (err) {
        renderGoogleDriveSyncCard(`Prüfung fehlgeschlagen: ${err.message}`);
        await appAlert('Google Drive Prüfung fehlgeschlagen: ' + err.message, {
            title: 'Cloud-Prüfung nicht möglich',
            type: 'warning'
        });
    }
}

async function tryRestoreGoogleDriveSession() {
    const settings = getGoogleDriveSyncSettings();
    if (!isGoogleDriveConfigured() || hasValidGoogleDriveToken() || (!settings.connectedEmail && !settings.autoSync)) return false;
    try {
        await requestGoogleDriveAccessToken(false);
        renderGoogleDriveSyncCard('Google Drive Verbindung für diese Sitzung automatisch erneuert.');
        scheduleGoogleDriveRemoteWatch(3000);
        return true;
    } catch (err) {
        renderGoogleDriveSyncCard('Bitte Google Drive Verbindung für diese Sitzung erneut öffnen.');
        return false;
    }
}

async function syncProjectToGoogleDriveNow() {
    if (googleDriveMonitorState.busyAction) return;
    googleDriveMonitorState.busyAction = 'upload';
    renderGoogleDriveSyncCard('Projekt wird in Google Drive gesichert ...');
    try {
        if (!await ensureGoogleDriveOnline({ interactive: true, showPrompt: true, reason: 'Zum Hochladen muss die Cloud-Verbindung aktiv sein.' })) return;
        await uploadProjectBackupToGoogleDrive('manual');
        renderGoogleDriveSyncCard('Projekt erfolgreich in Google Drive gesichert.');
        showToast('Projekt in Google Drive gesichert', 'success', 2400);
    } catch (err) {
        renderGoogleDriveSyncCard(`Upload fehlgeschlagen: ${err.message}`);
        await appAlert('Google Drive Upload fehlgeschlagen: ' + err.message, {
            title: 'Upload fehlgeschlagen',
            type: 'warning'
        });
    } finally {
        googleDriveMonitorState.busyAction = '';
        renderGoogleDriveSyncCard();
    }
}

async function restoreProjectFromGoogleDriveNow() {
    if (googleDriveMonitorState.busyAction) return;
    try {
        const confirmed = await appConfirm('Projektstand aus Google Drive laden und den lokalen Stand dieses Geräts ersetzen?', {
            title: 'Cloud-Stand wiederherstellen',
            type: 'warning',
            confirmText: 'Herunterladen und ersetzen'
        });
        if (!confirmed) return;
        googleDriveMonitorState.busyAction = 'restore';
        renderGoogleDriveSyncCard('Cloud-Stand wird geladen ...');
        if (!await ensureGoogleDriveOnline({ interactive: true, showPrompt: true, reason: 'Zum Herunterladen muss die Cloud-Verbindung aktiv sein.' })) return;
        await restoreProjectBackupFromGoogleDrive();
        renderGoogleDriveSyncCard('Projekt erfolgreich aus Google Drive wiederhergestellt.');
        showToast('Google Drive Backup geladen', 'success', 2400);
        selectTab('lager');
    } catch (err) {
        renderGoogleDriveSyncCard(`Wiederherstellung fehlgeschlagen: ${err.message}`);
        await appAlert('Google Drive Wiederherstellung fehlgeschlagen: ' + err.message, {
            title: 'Wiederherstellung fehlgeschlagen',
            type: 'warning'
        });
    } finally {
        googleDriveMonitorState.busyAction = '';
        renderGoogleDriveSyncCard();
    }
}

function renderGoogleDriveSyncCard(statusMessage = '') {
    const mount = document.getElementById('googleDriveSyncStatus');
    const settings = getGoogleDriveSyncSettings();
    const configured = isGoogleDriveConfigured();
    const sessionConnected = hasValidGoogleDriveToken();
    const connected = sessionConnected || !!settings.connectedEmail;
    const accountLabel = settings.connectedEmail || (sessionConnected ? 'verbunden' : '-');
    const status = statusMessage || getGoogleDriveSyncStatusMessage();
    const lastSyncLabel = settings.lastSyncAt ? formatWarehouseDate(settings.lastSyncAt) : 'noch nicht';
    const lastRestoreLabel = settings.lastRestoreAt ? formatWarehouseDate(settings.lastRestoreAt) : 'noch nicht';
    const backupKnown = !!settings.fileId;
    const remoteModifiedLabel = googleDriveMonitorState.remoteModifiedAt ? formatWarehouseDate(googleDriveMonitorState.remoteModifiedAt) : 'noch nicht';
    const busy = Boolean(googleDriveMonitorState.busyAction);
    const busyLabel = googleDriveMonitorState.busyAction === 'restore' ? 'Download läuft' : 'Upload läuft';
    if (mount) mount.innerHTML = `
        <div class="google-drive-status-shell" aria-busy="${busy}">
            <div class="google-drive-status-hero ${connected ? 'is-connected' : 'is-idle'}">
                <div>
                    <strong>${connected ? 'Google Drive verbunden' : 'Google Drive noch nicht verbunden'}</strong>
                    <small>${connected ? 'Dein Projekt kann in deinem privaten App-Speicher gesichert werden.' : 'Verbinde dein Google-Konto, um Backups und Wiederherstellung zu nutzen.'}</small>
                </div>
                <span class="google-drive-status-pill">${busy ? busyLabel : (connected ? 'verbunden' : 'getrennt')}</span>
            </div>
            <div class="google-drive-status-grid">
                <div class="google-drive-status-card">
                    <small>Konto</small>
                    <strong>${escapeHtml(accountLabel)}</strong>
                    <span>${connected ? 'Dein normales Drive bleibt unberührt' : 'Noch keine aktive Verbindung'}</span>
                </div>
                <div class="google-drive-status-card">
                    <small>Letzte Sicherung</small>
                    <strong>${escapeHtml(lastSyncLabel)}</strong>
                    <span>${backupKnown ? 'Ein Backup wurde bereits erkannt' : 'Noch kein Backup vorhanden'}</span>
                </div>
                <div class="google-drive-status-card">
                    <small>Letztes Laden</small>
                    <strong>${escapeHtml(lastRestoreLabel)}</strong>
                    <span>Zuletzt aus Google Drive auf dieses Gerät geladen</span>
                </div>
                <div class="google-drive-status-card">
                    <small>Cloud-Stand</small>
                    <strong>${escapeHtml(remoteModifiedLabel)}</strong>
                    <span>${googleDriveMonitorState.newerRemote ? 'In der Cloud liegt ein neuerer Stand' : 'Zuletzt erkannter Stand in Google Drive'}</span>
                </div>
            </div>
            <div class="google-drive-status-note">
                <strong>Wichtig:</strong> Deine Backups liegen im geschützten App-Speicher von Google Drive und sind im normalen Drive-Dateibereich nicht sichtbar.
            </div>
            <details class="google-drive-diagnostics">
                <summary>Hilfe bei Problemen</summary>
                <div class="google-drive-diagnostics-body">
                    <div class="tool-result">
                        <div class="tool-row">
                            <span><strong>Status</strong><small>Kurze Zusammenfassung der aktuellen Verbindung.</small></span>
                            <span>${escapeHtml(status)}</span>
                        </div>
                        <div class="tool-row">
                            <span><strong>Aktive Verbindung</strong><small>Gilt nur für diese Browser-Sitzung.</small></span>
                            <span>${sessionConnected ? 'ja' : 'nein'}</span>
                        </div>
                        <div class="tool-row">
                            <span><strong>Backup gefunden</strong><small>Wird erkannt, sobald ein Backup geladen oder gespeichert wurde.</small></span>
                            <span>${backupKnown ? 'ja' : 'nein'}</span>
                        </div>
                        <div class="tool-row">
                            <span><strong>Cloud-Prüfung</strong><small>Automatisch im Hintergrund, solange Auto-Sync aktiv ist.</small></span>
                            <span>${escapeHtml(googleDriveMonitorState.message || 'Noch keine Cloud-Prüfung erfolgt.')}</span>
                        </div>
                    </div>
                    <div class="google-drive-diagnostics-actions">
                        <button onclick="inspectGoogleDriveSyncNow()" class="btn-secondary btn-animated">Verbindung prüfen</button>
                        <button onclick="checkGoogleDriveRemoteChanges({ silent: false, autoRestore: false })" class="btn-secondary btn-animated">Cloud-Stand prüfen</button>
                    </div>
                </div>
            </details>
        </div>
    `;
    const autoEl = document.getElementById('googleDriveAutoSync');
    if (autoEl) autoEl.checked = settings.autoSync === true;
    const reminderEl = document.getElementById('googleDriveReconnectReminder');
    if (reminderEl) reminderEl.checked = settings.remindReconnect !== false;
    const connectBtn = document.getElementById('googleDriveConnectBtn');
    const syncBtn = document.getElementById('googleDriveSyncBtn');
    const restoreBtn = document.getElementById('googleDriveRestoreBtn');
    const disconnectBtn = document.getElementById('googleDriveDisconnectBtn');
    if (connectBtn) {
        connectBtn.hidden = connected;
        connectBtn.disabled = busy;
    }
    if (disconnectBtn) {
        disconnectBtn.hidden = !connected;
        disconnectBtn.disabled = busy;
    }
    if (syncBtn) {
        syncBtn.disabled = busy || !connected || !configured;
        syncBtn.classList.toggle('is-disabled-soft', busy || !connected || !configured);
    }
    if (restoreBtn) {
        restoreBtn.disabled = busy || !connected || !configured;
        restoreBtn.classList.toggle('is-disabled-soft', busy || !connected || !configured);
    }
    renderGoogleDriveHeaderStatus();
}

Object.assign(window, {
    connectGoogleDriveSync,
    disconnectGoogleDriveSync,
    toggleGoogleDriveAutoSync,
    inspectGoogleDriveSyncNow,
    syncProjectToGoogleDriveNow,
    restoreProjectFromGoogleDriveNow,
    renderGoogleDriveSyncCard,
    openGoogleDriveSyncSettings,
    checkGoogleDriveRemoteChanges,
    toggleGoogleDriveReconnectReminder,
    toggleCloudQuickSyncMenu,
    closeCloudQuickSyncMenu,
    runCloudQuickAction,
    reconnectGoogleDriveFromPrompt,
    disableGoogleDriveReconnectPrompt
});

async function restoreLocalSnapshot(snapshotId, ask = true) {
    const snapshots = await idbGetAllSnapshots();
    const snapshot = snapshots.find(entry => entry.id === snapshotId) || null;
    if (!snapshot || !snapshot.payload) {
        await appAlert('Dieser Wiederherstellungspunkt wurde nicht gefunden.', {
            title: 'Sicherung nicht gefunden',
            type: 'warning'
        });
        return;
    }
    const summary = `${formatWarehouseDate(snapshot.createdAt)} · ${getSnapshotReasonLabel(snapshot.reason)} · ${getSnapshotWarehouseLabel(snapshot)}`;
    if (ask) {
        const confirmed = await appConfirm(`Diesen Wiederherstellungspunkt wiederherstellen?\n\n${summary}\n\nDer aktuelle Stand dieses Geräts wird ersetzt.`, {
            title: 'Sicherungsstand wiederherstellen',
            type: 'warning',
            confirmText: 'Stand wiederherstellen'
        });
        if (!confirmed) return;
    }
    appState = migrateToWarehouseState(snapshot.payload);
    activeWarehouseId = appState.activeWarehouseId || Object.keys(appState.warehouses || {})[0] || 'main';
    activeAquariumId = appState.activeAquariumId || Object.keys(appState.aquariums || {})[0] || 'aquarium-main';
    const active = getActiveWarehouse();
    if (active) db = normalizeWarehouseData(active.data);
    overlayActiveAquariumData();
    await persistAppStateNow('restore-snapshot', true);
    applyTheme(db.theme || 'default', false);
    renderCurrentWarehouseViews();
    renderStorageSecurityStatus();
    showToast('Wiederherstellungspunkt geladen', 'success', 2800);
}

async function restoreLatestLocalSnapshot() {
    const latest = await getLatestStoredSnapshot();
    if (!latest || !latest.payload) {
        await appAlert('Es wurde noch kein Wiederherstellungspunkt gefunden.', {
            title: 'Noch keine Sicherung',
            type: 'info'
        });
        return;
    }
    await restoreLocalSnapshot(latest.id, true);
}

async function createManualRecoveryPoint() {
    saveDB(false);
    await persistAppStateNow('manual-snapshot', true);
    showToast('Wiederherstellungspunkt gespeichert', 'success', 2200);
}

async function deleteLocalSnapshot(snapshotId) {
    const snapshots = await idbGetAllSnapshots();
    const snapshot = snapshots.find(entry => entry.id === snapshotId) || null;
    if (!snapshot) return;
    const confirmed = await appConfirm(`Diesen Sicherungspunkt löschen?\n\n${formatWarehouseDate(snapshot.createdAt)} · ${getSnapshotReasonLabel(snapshot.reason)}`, {
        title: 'Sicherungspunkt löschen',
        type: 'danger',
        confirmText: 'Sicherung löschen'
    });
    if (!confirmed) return;
    await idbDelete(APP_STORAGE_SNAPSHOT_STORE, snapshotId);
    const latest = await getLatestStoredSnapshot();
    latestSnapshotAt = latest?.createdAt || null;
    await idbPut(APP_STORAGE_STATE_STORE, APP_STORAGE_META_KEY, {
        key: APP_STORAGE_META_KEY,
        lastSavedAt: latestPersistAt || null,
        lastSnapshotAt: latestSnapshotAt,
        schema: APP_STORAGE_DB_VERSION
    });
    renderStorageSecurityStatus();
    showToast('Sicherungspunkt gelöscht', 'info', 2200);
}

async function clearLocalSnapshots() {
    const confirmed = await appConfirm('Alle lokalen Wiederherstellungspunkte löschen? Der aktuelle Datenstand bleibt erhalten.', {
        title: 'Alle Sicherungspunkte löschen',
        type: 'danger',
        confirmText: 'Alle Sicherungen löschen'
    });
    if (!confirmed) return;
    const snapshots = await idbGetAllSnapshots();
    for (const entry of snapshots) {
        await idbDelete(APP_STORAGE_SNAPSHOT_STORE, entry.id);
    }
    latestSnapshotAt = null;
    await idbPut(APP_STORAGE_STATE_STORE, APP_STORAGE_META_KEY, {
        key: APP_STORAGE_META_KEY,
        lastSavedAt: latestPersistAt || null,
        lastSnapshotAt: null,
        schema: APP_STORAGE_DB_VERSION
    });
    renderStorageSecurityStatus();
    showToast('Wiederherstellungspunkte gelöscht', 'info', 2200);
}

async function renderStorageSecurityStatus() {
    const mount = document.getElementById('storageSecurityStatus');
    if (!mount) return;
    if (!canUseIndexedDb()) {
        mount.innerHTML = `
            <div class="storage-safety-status-shell">
                <div class="storage-safety-hero is-warning">
                    <div>
                        <strong>Speicherung nicht vollständig verfügbar</strong>
                        <small>Dieser Browser unterstützt die sichere lokale Speicherung nicht zuverlässig.</small>
                    </div>
                    <span class="storage-safety-pill is-warning">Prüfen</span>
                </div>
                <div class="storage-safety-grid">
                    <div class="storage-safety-status-card">
                        <small>Automatisches Speichern</small>
                        <strong>nicht bereit</strong>
                        <span>Bitte einen aktuellen Browser nutzen.</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    const meta = await getAppStorageMeta();
    const snapshots = await idbGetAllSnapshots();
    const latestSnapshot = snapshots.length
        ? snapshots.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0]
        : null;
    const sortedSnapshots = snapshots.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const autosaveText = meta?.lastSavedAt ? formatWarehouseDate(meta.lastSavedAt) : (latestPersistAt ? formatWarehouseDate(latestPersistAt) : 'noch nicht');
    const snapshotText = latestSnapshot?.createdAt ? formatWarehouseDate(latestSnapshot.createdAt) : 'noch keiner';
    const autosaveReady = Boolean(meta?.lastSavedAt || latestPersistAt);
    const snapshotTimeline = sortedSnapshots.length
        ? `
            <details class="storage-snapshot-details">
                <summary>Wiederherstellungspunkte anzeigen (${sortedSnapshots.length})</summary>
                <div class="storage-snapshot-list">
                    ${sortedSnapshots.map(snapshot => `
                        <div class="storage-snapshot-item">
                            <div class="storage-snapshot-copy">
                                <div class="storage-snapshot-head">
                                    <strong>${escapeHtml(formatWarehouseDate(snapshot.createdAt))}</strong>
                                    <span>${escapeHtml(getSnapshotRelativeLabel(snapshot.createdAt))}</span>
                                </div>
                                <small>${escapeHtml(getSnapshotReasonLabel(snapshot.reason))} · ${escapeHtml(getSnapshotWarehouseLabel(snapshot))}</small>
                            </div>
                            <div class="storage-snapshot-actions">
                                <button class="btn-secondary btn-animated" onclick="restoreLocalSnapshot('${snapshot.id}')">Wiederherstellen</button>
                                <button class="btn-out btn-animated" onclick="deleteLocalSnapshot('${snapshot.id}')">Löschen</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </details>
        `
        : `
            <div class="storage-snapshot-empty">
                <strong>Noch keine Wiederherstellungspunkte</strong>
                <span>Erstelle einen manuellen Sicherungspunkt oder arbeite weiter, damit automatische Punkte entstehen.</span>
            </div>
        `;
    mount.innerHTML = `
        <div class="storage-safety-status-shell">
            <div class="storage-safety-hero ${autosaveReady ? 'is-ready' : ''}">
                <div>
                    <strong>${autosaveReady ? 'Deine Daten werden automatisch gespeichert' : 'Die automatische Speicherung wird vorbereitet'}</strong>
                    <small>${autosaveReady ? 'Änderungen bleiben auf diesem Gerät erhalten.' : 'Sobald du mit der App arbeitest, wird der Speicherstatus hier sichtbar.'}</small>
                </div>
                <span class="storage-safety-pill ${autosaveReady ? 'is-ready' : ''}">${autosaveReady ? 'Aktiv' : 'Wartet'}</span>
            </div>
            <div class="storage-safety-grid">
                <div class="storage-safety-status-card">
                    <small>Speicherort</small>
                    <strong>Nur dieses Gerät</strong>
                    <span>Ohne Cloud bleiben deine Daten lokal im Browser.</span>
                </div>
                <div class="storage-safety-status-card">
                    <small>Letzte automatische Speicherung</small>
                    <strong>${escapeHtml(autosaveText)}</strong>
                    <span>Wird bei Änderungen selbstständig aktualisiert.</span>
                </div>
                <div class="storage-safety-status-card">
                    <small>Sicherungspunkte</small>
                    <strong>${snapshots.length}</strong>
                    <span>Letzter Punkt: ${escapeHtml(snapshotText)}</span>
                </div>
            </div>
            ${snapshotTimeline}
        </div>
    `;
}

Object.assign(window, {
    restoreLatestLocalSnapshot,
    restoreLocalSnapshot,
    deleteLocalSnapshot,
    createManualRecoveryPoint,
    clearLocalSnapshots
});

function getMenuOrder() {
    try {
        const parsed = JSON.parse(localStorage.getItem(MENU_ORDER_KEY) || '[]');
        let valid = Array.isArray(parsed) ? parsed.filter(id => DEFAULT_MENU_ORDER.includes(id)) : [];
        if (!valid.includes('uebersicht')) valid = ['uebersicht', ...valid];
        if (!valid.includes('korallen')) {
            const logIndex = valid.indexOf('log');
            if (logIndex >= 0) valid.splice(logIndex + 1, 0, 'korallen');
            else valid.push('korallen');
        }
        return normalizeMenuOrder(valid);
    } catch (err) {
        return normalizeMenuOrder(DEFAULT_MENU_ORDER);
    }
}

function getDefaultMobileQuickTabs() {
    return ['uebersicht', 'lager', 'tools', 'logbuch'];
}

function getHiddenMenuTabs() {
    try {
        const parsed = JSON.parse(localStorage.getItem(HIDDEN_MENU_TABS_KEY) || '[]');
        const valid = Array.isArray(parsed) ? parsed.filter(id => DEFAULT_MENU_ORDER.includes(id) && !ALWAYS_VISIBLE_TABS.has(id)) : [];
        return [...new Set(valid)];
    } catch (err) {
        return [];
    }
}

function isMenuTabHidden(tabId) {
    if (ALWAYS_VISIBLE_TABS.has(tabId)) return false;
    return getHiddenMenuTabs().includes(tabId);
}

function getVisibleMenuOrder() {
    return getMenuOrder().filter(tabId => !isMenuTabHidden(tabId));
}

function getFirstVisibleTab() {
    return getVisibleMenuOrder()[0] || 'einstellungen';
}

function toggleMenuTabVisibility(tabId, hidden) {
    if (!DEFAULT_MENU_ORDER.includes(tabId) || ALWAYS_VISIBLE_TABS.has(tabId)) return;
    const hiddenTabs = getHiddenMenuTabs();
    const next = hidden
        ? [...new Set([...hiddenTabs, tabId])]
        : hiddenTabs.filter(id => id !== tabId);
    localStorage.setItem(HIDDEN_MENU_TABS_KEY, JSON.stringify(next));

    const quickTabs = getMobileQuickTabs().filter(id => !next.includes(id));
    saveMobileQuickTabs(quickTabs);
    applyMenuOrder();
    renderMenuOrderSettings();

    if (isMenuTabHidden(getActiveTabId())) {
        showTab(getFirstVisibleTab());
    }
}

function getMobileQuickTabs() {
    try {
        const parsed = JSON.parse(localStorage.getItem(MOBILE_QUICK_TABS_KEY) || '[]');
        const cleaned = Array.isArray(parsed) ? parsed.filter(id => DEFAULT_MENU_ORDER.includes(id) && !isMenuTabHidden(id)) : [];
        const unique = [];
        cleaned.forEach(id => {
            if (!unique.includes(id) && unique.length < 4) unique.push(id);
        });
        const fallback = getDefaultMobileQuickTabs();
        fallback.forEach(id => {
            if (!unique.includes(id) && unique.length < 4 && !isMenuTabHidden(id)) unique.push(id);
        });
        return unique.slice(0, 4);
    } catch (err) {
        return getDefaultMobileQuickTabs().filter(id => !isMenuTabHidden(id));
    }
}

function saveMobileQuickTabs(tabs) {
    const valid = Array.isArray(tabs) ? tabs.filter(id => DEFAULT_MENU_ORDER.includes(id) && !isMenuTabHidden(id)) : [];
    const unique = [];
    valid.forEach(id => {
        if (!unique.includes(id) && unique.length < 4) unique.push(id);
    });
    const fallback = getDefaultMobileQuickTabs();
    fallback.forEach(id => {
        if (!unique.includes(id) && unique.length < 4 && !isMenuTabHidden(id)) unique.push(id);
    });
    localStorage.setItem(MOBILE_QUICK_TABS_KEY, JSON.stringify(unique.slice(0, 4)));
    renderMobileBottomNav();
    renderMenuOrderSettings();
}

function updateMobileQuickTab(slotIndex, tabId) {
    const tabs = getMobileQuickTabs();
    if (!DEFAULT_MENU_ORDER.includes(tabId) || isMenuTabHidden(tabId)) return;
    const next = [...tabs];
    const existingIndex = next.indexOf(tabId);
    if (existingIndex >= 0 && existingIndex !== slotIndex) {
        [next[existingIndex], next[slotIndex]] = [next[slotIndex], next[existingIndex]];
    } else {
        next[slotIndex] = tabId;
    }
    saveMobileQuickTabs(next);
}

function resetMobileQuickTabs() {
    localStorage.removeItem(MOBILE_QUICK_TABS_KEY);
    renderMobileBottomNav();
    renderMenuOrderSettings();
}

function saveMenuOrder(order) {
    const valid = Array.isArray(order) ? order.filter(id => DEFAULT_MENU_ORDER.includes(id)) : DEFAULT_MENU_ORDER;
    const normalized = normalizeMenuOrder(valid);
    localStorage.setItem(MENU_ORDER_KEY, JSON.stringify(normalized));
    applyMenuOrder();
    renderMenuOrderSettings();
}

function moveMenuItem(tabId, direction) {
    const order = getMenuOrder();
    const index = order.indexOf(tabId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return;
    [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
    saveMenuOrder(order);
}

function resetMenuOrder() {
    localStorage.removeItem(MENU_ORDER_KEY);
    applyMenuOrder();
    renderMenuOrderSettings();
}

function applyMenuOrder() {
    const order = getMenuOrder();
    const hiddenTabs = getHiddenMenuTabs();
    const nav = document.querySelector('.nav-links');
    if (nav) {
        order.forEach(tabId => {
            const button = document.getElementById('tab-' + tabId);
            if (!button) return;
            const label = TAB_LABELS[tabId] || tabId;
            button.innerHTML = `${getTabIconMarkup(tabId)}<span class="nav-label">${escapeHtml(label)}</span>`;
            button.dataset.tab = tabId;
            button.setAttribute('aria-label', label);
            button.hidden = hiddenTabs.includes(tabId);
            if (!button.hidden) nav.appendChild(button);
        });
    }
    renderMobileBottomNav(order);
    const activeTab = getActiveTabId();
    document.querySelectorAll('.mobile-bottom-nav button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
}

function renderMobileBottomNav(order = getMenuOrder()) {
    const nav = document.querySelector('.mobile-bottom-nav');
    if (!nav) return;
    const quickTabs = getMobileQuickTabs();
    nav.innerHTML = quickTabs.map(tabId => `
        <button type="button" onclick="selectTab('${tabId}')" data-tab="${tabId}" aria-label="${escapeHtml(TAB_LABELS[tabId] || tabId)}">
            ${getTabIconMarkup(tabId)}<span class="mobile-nav-label">${escapeHtml(TAB_LABELS[tabId] || tabId)}</span>
        </button>
    `).join('') + `<button type="button" onclick="toggleMenu()" data-tab="mehr" aria-label="Weitere Bereiche öffnen">${getMoreIconMarkup()}<span class="mobile-nav-label">Mehr</span></button>`;
}

function renderLegacyDomainBanner() {
    const banner = document.getElementById('legacy-domain-banner');
    if (!banner) return;
    const host = String(window.location.hostname || '').toLowerCase();
    const isLegacyHost = host === 'xsiimonox.github.io' || host.endsWith('.github.io');
    banner.hidden = !isLegacyHost;
}

function renderMenuOrderSettings() {
    const container = document.getElementById('menu-order-settings');
    if (!container) return;
    const order = getMenuOrder();
    const quickTabs = getMobileQuickTabs();
    const hiddenTabs = getHiddenMenuTabs();
    const selectableTabs = DEFAULT_MENU_ORDER.filter(id => !isMenuTabHidden(id));
    container.innerHTML = `
        <div class="mobile-quick-tabs-settings">
            <div class="mobile-quick-tabs-head">
                <strong>Mobiler Schnellzugriff</strong>
                <small>Lege selbst fest, welche 4 Bereiche unten am Handy direkt sichtbar sind.</small>
            </div>
            <div class="mobile-quick-tabs-grid">
                ${quickTabs.map((tabId, index) => `
                    <label class="mobile-quick-tab-slot">
                        <span>Slot ${index + 1}</span>
                        <select onchange="updateMobileQuickTab(${index}, this.value)">
                            ${selectableTabs.map(optionId => `<option value="${optionId}" ${optionId === tabId ? 'selected' : ''}>${TAB_LABELS[optionId] || optionId}</option>`).join('')}
                        </select>
                    </label>
                `).join('')}
            </div>
            <button type="button" class="btn-secondary btn-animated" onclick="resetMobileQuickTabs()">Mobilen Schnellzugriff zurücksetzen</button>
        </div>
        <div class="menu-order-list menu-visibility-list">
            ${DEFAULT_MENU_ORDER.map(tabId => `
                <label class="menu-order-row">
                    <span><strong>${TAB_LABELS[tabId] || tabId}</strong><small>${ALWAYS_VISIBLE_TABS.has(tabId) ? 'Immer sichtbar' : (hiddenTabs.includes(tabId) ? 'Ausgeblendet' : 'Sichtbar')}</small></span>
                    <div>
                        <input type="checkbox" ${hiddenTabs.includes(tabId) ? '' : 'checked'} ${ALWAYS_VISIBLE_TABS.has(tabId) ? 'disabled' : ''} onchange="toggleMenuTabVisibility('${tabId}', !this.checked)">
                    </div>
                </label>
            `).join('')}
        </div>
        <div class="menu-order-list">
            ${order.map((tabId, index) => `
                <div class="menu-order-row">
                    <span><strong>${index + 1}. ${TAB_LABELS[tabId] || tabId}</strong><small>Hauptmenü</small></span>
                    <div>
                        <button type="button" onclick="moveMenuItem('${tabId}', -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button type="button" onclick="moveMenuItem('${tabId}', 1)" ${index === order.length - 1 ? 'disabled' : ''}>↓</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <button type="button" class="btn-secondary btn-animated" onclick="resetMenuOrder()">Standard-Reihenfolge wiederherstellen</button>
    `;
}

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
        settings: {
            forecastWeeks: 4,
            cursorStyle: 'apple',
            cursorEmoji: '🪸',
            localDevices: [],
            ...(source.settings || {})
        },
        notifications: source.notifications || { enabled: false, lastAlertSignature: '', lastSentAt: 0 },
        alerts: source.alerts || { dismissed: {}, disabled: {} },
        customProducts: source.customProducts || [],
        customContainers: source.customContainers || {},
        hiddenProducts: source.hiddenProducts || {},
        shopLinks: source.shopLinks || {},
        productPresets: source.productPresets || {},
        crSeaWaterPresets: source.crSeaWaterPresets || {},
        customSeaTracePresets: source.customSeaTracePresets || {},
        favoriteProducts: source.favoriteProducts || {},
        implementationLog: source.implementationLog || source.dosePlanArchive || [],
        logBookCategories: source.logBookCategories || ['Technik', 'Wartung', 'Versorgung', 'Nährstoffkontrolle', 'Wasserwechsel', 'Korallenbesatz', 'Fischbesatz', 'Sonstiges'],
        logBookEntries: source.logBookEntries || [],
        aquariumTodos: source.aquariumTodos || [],
        dosingContainers: source.dosingContainers || [],
        measurementTypes: source.measurementTypes || [
            { id: 'KH', label: 'KH', unit: 'dKH' },
            { id: 'CA', label: 'CA', unit: 'mg/l' },
            { id: 'MG', label: 'MG', unit: 'mg/l' },
            { id: 'PO4', label: 'PO4', unit: 'mg/l' },
            { id: 'NO3', label: 'NO3', unit: 'mg/l' }
        ],
        measurementEntries: source.measurementEntries || [],
        feedNutrientLog: source.feedNutrientLog || [],
        osmoseTank: source.osmoseTank || { capacityLiters: 50, currentLiters: 50, warnDays: 2, usageLog: [], lastAlertSignature: '', lastAlertAt: 0 },
        traceDraft: source.traceDraft || {},
        testCorrections: source.testCorrections || {},
        majorCorrectionSettings: source.majorCorrectionSettings || { tankLiters: 100, strengths: { KH: 0.05, Ca: 1 } },
        psuCorrectionOffset: source.psuCorrectionOffset || 0,
        toolSettings: source.toolSettings || { lastSection: '', favorites: [] },
        dashboardSettings: source.dashboardSettings || {
            widgets: { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true },
            range: '30',
            pinnedMeasurements: ['KH', 'CA', 'PO4']
        },
        coralCatalog: source.coralCatalog || [],
        coralTransfers: source.coralTransfers || [],
        warehouseEvents: source.warehouseEvents || [],
        localUpdatedAt: source.localUpdatedAt || null
    };
}

function cloneSerializable(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function createAquariumId() {
    return 'aquarium-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}

function createAquariumData(source = {}) {
    return {
        implementationLog: cloneSerializable(source.implementationLog || source.dosePlanArchive || []),
        logBookCategories: cloneSerializable(source.logBookCategories || ['Technik', 'Wartung', 'Versorgung', 'Nährstoffkontrolle', 'Wasserwechsel', 'Korallenbesatz', 'Fischbesatz', 'Sonstiges']),
        logBookEntries: cloneSerializable(source.logBookEntries || []),
        aquariumTodos: cloneSerializable(source.aquariumTodos || []),
        dosingContainers: cloneSerializable(source.dosingContainers || []),
        measurementTypes: cloneSerializable(source.measurementTypes || [
            { id: 'KH', label: 'KH', unit: 'dKH' },
            { id: 'CA', label: 'CA', unit: 'mg/l' },
            { id: 'MG', label: 'MG', unit: 'mg/l' },
            { id: 'PO4', label: 'PO4', unit: 'mg/l' },
            { id: 'NO3', label: 'NO3', unit: 'mg/l' }
        ]),
        measurementEntries: cloneSerializable(source.measurementEntries || []),
        feedNutrientLog: cloneSerializable(source.feedNutrientLog || []),
        osmoseTank: cloneSerializable(source.osmoseTank || { capacityLiters: 50, currentLiters: 50, warnDays: 2, usageLog: [], lastAlertSignature: '', lastAlertAt: 0 }),
        traceDraft: cloneSerializable(source.traceDraft || {}),
        testCorrections: cloneSerializable(source.testCorrections || {}),
        majorCorrectionSettings: cloneSerializable(source.majorCorrectionSettings || { tankLiters: 100, strengths: { KH: 0.05, Ca: 1 } }),
        psuCorrectionOffset: source.psuCorrectionOffset || 0,
        toolSettings: cloneSerializable(source.toolSettings || { lastSection: '', favorites: [] }),
        crSeaWaterPresets: cloneSerializable(source.crSeaWaterPresets || {}),
        customSeaTracePresets: cloneSerializable(source.customSeaTracePresets || {}),
        dashboardSettings: cloneSerializable(source.dashboardSettings || {
            widgets: { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true },
            range: '30',
            pinnedMeasurements: ['KH', 'CA', 'PO4']
        }),
        coralCatalog: cloneSerializable(source.coralCatalog || []),
        coralTransfers: cloneSerializable(source.coralTransfers || []),
        localUpdatedAt: source.localUpdatedAt || null
    };
}

function normalizeAquariumData(data) {
    return createAquariumData(data || {});
}

function createAquariumRecord(name, data = {}) {
    return {
        id: createAquariumId(),
        name: name || 'Aquarium',
        createdAt: new Date().toISOString(),
        data: createAquariumData(data)
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
        activeAquariumId: 'aquarium-main',
        pendingDeletedRemoteIds: [],
        communityMapProfileDraft: {},
        warehouses: { main: record },
        aquariums: {
            'aquarium-main': {
                id: 'aquarium-main',
                name: 'Hauptaquarium',
                createdAt: new Date().toISOString(),
                data: createAquariumData(parsed || {})
            }
        }
    };
}

function getActiveWarehouse() {
    if (!appState || !appState.warehouses) return null;
    return appState.warehouses[activeWarehouseId] || Object.values(appState.warehouses)[0] || null;
}

function getActiveAquarium() {
    if (!appState || !appState.aquariums) return null;
    return appState.aquariums[activeAquariumId] || Object.values(appState.aquariums)[0] || null;
}

function syncActiveAquariumDataFromDb(markDirty = true) {
    const aquarium = getActiveAquarium();
    if (!aquarium) return;
    if (!aquarium.data) aquarium.data = createAquariumData();
    if (markDirty) aquarium.data.localUpdatedAt = new Date().toISOString();
    AQUARIUM_FIELD_KEYS.forEach(key => {
        aquarium.data[key] = cloneSerializable(db[key]);
    });
}

function overlayActiveAquariumData() {
    const aquarium = getActiveAquarium();
    if (!aquarium) return;
    aquarium.data = normalizeAquariumData(aquarium.data);
    AQUARIUM_FIELD_KEYS.forEach(key => {
        db[key] = cloneSerializable(aquarium.data[key]);
    });
}

function normalizeWarehouseData(data) {
    db = createWarehouseData(data || {});
    if (!db.settings.forecastWeeks) db.settings.forecastWeeks = 4;
    if (!db.settings.cursorStyle) db.settings.cursorStyle = 'apple';
    if (!db.settings.cursorEmoji) db.settings.cursorEmoji = '🪸';
    if (!Array.isArray(db.settings.localDevices)) db.settings.localDevices = [];
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
    if (!db.customSeaTracePresets) db.customSeaTracePresets = {};
    if (!db.favoriteProducts) db.favoriteProducts = {};
    if (!db.implementationLog) db.implementationLog = db.dosePlanArchive || [];
    if (!db.logBookCategories) db.logBookCategories = ['Technik', 'Wartung', 'Versorgung', 'Nährstoffkontrolle', 'Wasserwechsel', 'Korallenbesatz', 'Fischbesatz', 'Sonstiges'];
    if (!db.logBookEntries) db.logBookEntries = [];
    if (!db.aquariumTodos) db.aquariumTodos = [];
    if (!db.dosingContainers) db.dosingContainers = [];
    if (!db.measurementTypes) db.measurementTypes = [
        { id: 'KH', label: 'KH', unit: 'dKH' },
        { id: 'CA', label: 'CA', unit: 'mg/l' },
        { id: 'MG', label: 'MG', unit: 'mg/l' },
        { id: 'PO4', label: 'PO4', unit: 'mg/l' },
        { id: 'NO3', label: 'NO3', unit: 'mg/l' }
    ];
    if (!db.measurementEntries) db.measurementEntries = [];
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
    if (!db.dashboardSettings) db.dashboardSettings = { widgets: { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true }, range: '30', pinnedMeasurements: ['KH', 'CA', 'PO4'] };
    if (!db.dashboardSettings.widgets) db.dashboardSettings.widgets = { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true };
    if (!Array.isArray(db.dashboardSettings.pinnedMeasurements) || db.dashboardSettings.pinnedMeasurements.length === 0) db.dashboardSettings.pinnedMeasurements = ['KH', 'CA', 'PO4'];
    if (!db.dashboardSettings.range) db.dashboardSettings.range = '30';
    if (!db.coralCatalog) db.coralCatalog = [];
    if (!db.coralTransfers) db.coralTransfers = [];
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

async function initDB() {
    let parsed = await loadPersistedAppState();
    appState = migrateToWarehouseState(parsed);
    if (!Array.isArray(appState.pendingDeletedRemoteIds)) appState.pendingDeletedRemoteIds = [];
    if (!appState.communityMapProfileDraft || typeof appState.communityMapProfileDraft !== 'object') appState.communityMapProfileDraft = {};
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

    const firstWarehouseData = Object.values(appState.warehouses)[0]?.data || parsed || {};
    if (!appState.aquariums || Object.keys(appState.aquariums).length === 0) {
        const aquariumRecord = createAquariumRecord('Hauptaquarium', firstWarehouseData);
        aquariumRecord.id = 'aquarium-main';
        appState.aquariums = { 'aquarium-main': aquariumRecord };
    }
    Object.entries(appState.aquariums).forEach(([id, aquarium]) => {
        aquarium.id = id;
        if (!aquarium.name) aquarium.name = 'Aquarium';
        if (!aquarium.createdAt) aquarium.createdAt = new Date().toISOString();
        aquarium.data = normalizeAquariumData(aquarium.data || firstWarehouseData || {});
    });

    activeWarehouseId = appState.activeWarehouseId || Object.keys(appState.warehouses)[0];
    if (!appState.warehouses[activeWarehouseId]) activeWarehouseId = Object.keys(appState.warehouses)[0];
    appState.activeWarehouseId = activeWarehouseId;
    activeAquariumId = appState.activeAquariumId || Object.keys(appState.aquariums)[0];
    if (!appState.aquariums[activeAquariumId]) activeAquariumId = Object.keys(appState.aquariums)[0];
    appState.activeAquariumId = activeAquariumId;

    const warehouse = getActiveWarehouse();
    warehouse.data = normalizeWarehouseData(warehouse.data);
    overlayActiveAquariumData();
    
    // Geladenes Design direkt beim Start anwenden
    applyTheme(db.theme, false);
    appBootstrapComplete = true;
    await persistAppStateNow(parsed ? 'init-load' : 'init-empty', true);
    await removeLegacyLocalDbCopies();
    updateWarehouseUI();
}

function saveDB(markDirty = true) {
    try {
        if (!appState) appState = migrateToWarehouseState(db);
        syncActiveAquariumDataFromDb(markDirty);
        const warehouse = getActiveWarehouse();
        if (warehouse) {
            if (markDirty) db.localUpdatedAt = new Date().toISOString();
            warehouse.data = db;
            warehouse.localUpdatedAt = db.localUpdatedAt;
        }
        appState.activeWarehouseId = activeWarehouseId;
        appState.activeAquariumId = activeAquariumId;
        updateWarehouseUI();
        queuePersistAppState(markDirty ? 'save' : 'save-passive', markDirty);
        scheduleGoogleDriveAutoSync();
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

function renderImplementationLog() {
    const container = document.getElementById('implementationLogResult');
    if (!container) return;
    const entries = db.implementationLog || [];
    if (!entries.length) {
        container.innerHTML = '<p class="hint">Noch keine Umsetzung dokumentiert.</p>';
        return;
    }
    container.innerHTML = `
        <div class="tool-result">
            ${entries.slice(0, 8).map(entry => `
                <div class="tool-row">
                    <span><strong>${escapeHtml(entry.name || entry.type || 'Eintrag')}</strong><small>${formatWarehouseDate(entry.at)} · ${escapeHtml(entry.note || '')}</small></span>
                    <span>${escapeHtml(String(entry.amount || '-'))}</span>
                </div>
            `).join('')}
        </div>
    `;
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
    queuePersistAppState('shared-owner-visibility', false);
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
    if (el) {
        el.innerText = message;
        el.dataset.type = type;
    }
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
    if (window.location.protocol === 'file:') return 'Cloud Login nur auf localhost oder echter Web-URL nutzen. file:// ist fuer Supabase-Auth unzuverlaessig.';
    return settings.autoSync ? 'Supabase bereit · Auto-Sync aktiv' : 'Supabase bereit · Auto-Sync aus';
}

async function renderSupabaseSyncSettings() {
    if (!CLOUD_SYNC_ENABLED) {
        updateAuthState(null);
        updateSyncStatus(CLOUD_SYNC_MAINTENANCE_MESSAGE, 'warn');
        const autoEl = document.getElementById('supabaseAutoSync');
        if (autoEl) autoEl.checked = false;
        const friends = document.getElementById('sync-friends-list');
        if (friends) friends.innerHTML = '<p class="hint">Cloud-Funktionen sind aktuell deaktiviert.</p>';
        const diagnostics = document.getElementById('supabase-diagnostics-result');
        if (diagnostics) diagnostics.innerHTML = '';
        return;
    }
    const settings = getSupabaseSettings();
    const autoEl = document.getElementById('supabaseAutoSync');
    const autoRow = document.getElementById('syncAutoRow');
    if (autoEl) autoEl.checked = settings.autoSync;
    if (autoRow) autoRow.classList.toggle('sync-auto-active', settings.autoSync);
    renderOtpCooldownState();

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

function getOtpHintElement() {
    return document.getElementById('supabaseOtpHint');
}

function setOtpHint(message) {
    const el = getOtpHintElement();
    if (el) el.innerText = message;
}

function renderOtpCooldownState() {
    const button = document.getElementById('supabaseOtpRequestBtn');
    if (!button) return;
    const remainingMs = otpCooldownUntil - Date.now();
    if (remainingMs > 0) {
        const remainingSeconds = Math.ceil(remainingMs / 1000);
        button.disabled = true;
        button.innerText = `Neuer Code in ${remainingSeconds}s`;
    } else {
        button.disabled = false;
        button.innerText = 'Code anfordern';
        otpCooldownUntil = 0;
        if (otpCooldownTimer) {
            clearInterval(otpCooldownTimer);
            otpCooldownTimer = null;
        }
    }
}

function startOtpCooldown(seconds = 60) {
    otpCooldownUntil = Date.now() + (seconds * 1000);
    renderOtpCooldownState();
    if (otpCooldownTimer) clearInterval(otpCooldownTimer);
    otpCooldownTimer = setInterval(renderOtpCooldownState, 1000);
}

function formatSupabaseOtpError(err) {
    const candidates = [
        err?.message,
        err?.error_description,
        err?.error,
        err?.msg,
        err?.description,
        err?.details,
        err?.name
    ].filter(value => typeof value === 'string' && value.trim());
    let message = candidates[0] || '';
    if (!message && err && typeof err === 'object') {
        try {
            const plainObject = {};
            Object.getOwnPropertyNames(err).forEach(key => {
                plainObject[key] = err[key];
            });
            const json = JSON.stringify(plainObject);
            if (json && json !== '{}') message = json;
        } catch (serializationError) {}
    }
    if (!message) {
        message = typeof err === 'string' ? err : '';
    }
    if (!message) {
        message = 'Supabase hat einen leeren Fehler zurueckgegeben. Bitte pruefe in Supabase, ob E-Mail-OTP aktiviert ist, dein SMTP korrekt gespeichert wurde und das OTP-Template den Platzhalter {{ .Token }} nutzt.';
    }
    if (/rate limit/i.test(message)) {
        return 'Zu viele Code-Mails angefordert. Bitte kurz warten und dann erneut versuchen.';
    }
    if (/smtp|mailer|email provider/i.test(message)) {
        return 'Der E-Mail-Versand ist in Supabase noch nicht sauber konfiguriert. Bitte SMTP-Einstellungen und E-Mail-Provider pruefen.';
    }
    if (/otp|one-time|email login|provider.+disabled/i.test(message)) {
        return 'E-Mail-OTP scheint in Supabase noch nicht vollstaendig aktiviert zu sein. Bitte den E-Mail-Login in Auth pruefen.';
    }
    if (/not authorized|address not authorized/i.test(message)) {
        return 'Diese E-Mail-Adresse darf aktuell nicht angeschrieben werden. Bitte SMTP/Domain pruefen oder eine andere Adresse testen.';
    }
    if (/invalid login credentials|token/i.test(message)) {
        return 'Der Code ist ungueltig oder abgelaufen. Bitte einen neuen Code anfordern.';
    }
    return message;
}

async function requestSupabaseOtp() {
    try {
        if (!ensureCloudSyncEnabled('Code-Anforderung')) return;
        if (window.location.protocol === 'file:') {
            const message = 'Cloud Login per E-Mail-Code bitte ueber localhost testen, nicht ueber file://. Oeffne die App z. B. unter http://127.0.0.1:8111/index.html';
            updateSyncStatus(message, 'warn');
            setOtpHint('Bitte auf localhost wechseln und dort den Code anfordern.');
            return alert(message);
        }
        saveSupabaseSettings();
        const client = await getSupabaseClient();
        const email = (document.getElementById('supabaseEmail')?.value || '').trim().toLowerCase();
        if (!email || !email.includes('@')) return alert('Bitte eine gueltige E-Mail eintragen.');
        const { error } = await client.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true
            }
        });
        if (error) throw error;
        startOtpCooldown(60);
        updateSyncStatus('Code wurde per E-Mail angefordert. Bitte Postfach und Spam-Ordner pruefen.', 'ok');
        setOtpHint('Den 6-stelligen Code aus der Mail hier eingeben und bestaetigen.');
    } catch (err) {
        console.error('Supabase OTP request failed:', err);
        const message = formatSupabaseOtpError(err);
        updateSyncStatus(message, 'warn');
        alert('Code-Anforderung fehlgeschlagen: ' + message);
    }
}

async function verifySupabaseOtp() {
    try {
        if (!ensureCloudSyncEnabled('Code-Bestaetigung')) return;
        if (window.location.protocol === 'file:') {
            const message = 'Die Code-Bestaetigung bitte ueber localhost ausfuehren, nicht ueber file://.';
            updateSyncStatus(message, 'warn');
            setOtpHint('Bitte auf localhost wechseln und dort den OTP-Code bestaetigen.');
            return alert(message);
        }
        saveSupabaseSettings();
        const client = await getSupabaseClient();
        const email = (document.getElementById('supabaseEmail')?.value || '').trim().toLowerCase();
        const token = (document.getElementById('supabaseOtpCode')?.value || '').trim();
        if (!email || !email.includes('@')) return alert('Bitte eine gueltige E-Mail eintragen.');
        if (!token || token.length < 6) return alert('Bitte den 6-stelligen Code eingeben.');
        const { data, error } = await client.auth.verifyOtp({
            email,
            token,
            type: 'email'
        });
        if (error) throw error;
        document.getElementById('supabaseOtpCode').value = '';
        updateAuthState(data?.user || { email });
        updateSyncStatus('Eingeloggt per E-Mail-Code.', 'ok');
        setOtpHint('Code bestaetigt. Du bist jetzt eingeloggt.');
        await syncPullWarehouses(false);
        renderCommunityMapCard();
    } catch (err) {
        console.error('Supabase OTP verify failed:', err);
        const message = formatSupabaseOtpError(err);
        updateSyncStatus(message, 'warn');
        alert('Code-Bestaetigung fehlgeschlagen: ' + message);
    }
}

async function supabaseSignOut() {
    try {
        if (!ensureCloudSyncEnabled('Cloud Logout')) return;
        const client = await getSupabaseClient();
        await client.auth.signOut();
        updateAuthState(null);
        updateSyncStatus('Ausgeloggt. Lokale Daten bleiben auf diesem Gerät erhalten.', 'info');
        setOtpHint('Code anfordern und danach den 6-stelligen Code eingeben.');
        renderCommunityMapCard();
    } catch (err) {
        alert('Logout fehlgeschlagen: ' + err.message);
    }
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
    if (!ensureCloudSyncEnabled('Sync Diagnose')) return;
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

function isWarehouseReadOnlyView(warehouse = getActiveWarehouse()) {
    return !canWriteWarehouse(warehouse);
}

function requireWarehouseWriteAccess(actionLabel = 'Diese Aktion') {
    if (!isWarehouseReadOnlyView()) return true;
    showToast(`${actionLabel} ist im Nur-Lesen-Lager nicht erlaubt.`, 'warning', 3600);
    return false;
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
    if (!ensureCloudSyncEnabled(showAlert ? 'Daten Upload' : '')) return;
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
        queuePersistAppState('cloud-push', false);
        updateWarehouseUI();
        const skipText = skippedReadOnly ? ` · ${skippedReadOnly} Nur-Lesen-Lager übersprungen` : '';
        const deleteText = deleted ? ` · ${deleted} gelöschte Lager entfernt` : '';
        updateSyncStatus(`Daten Upload abgeschlossen: ${pushed} Lager synchronisiert.${deleteText}${skipText}`, 'ok');
        addWarehouseEvent('cloud', `Daten Upload: ${pushed} Lager synchronisiert${deleted ? `, ${deleted} gelöscht` : ''}`);
        queuePersistAppState('cloud-push', false);
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

function hasUnsyncedWritableWarehouseChanges() {
    return Object.values(appState?.warehouses || {}).some(warehouse => {
        if (!warehouse.remoteId || !canWriteWarehouse(warehouse)) return false;
        const localTime = new Date(warehouse.localUpdatedAt || warehouse.data?.localUpdatedAt || 0).getTime();
        const lastSync = new Date(warehouse.lastSyncAt || 0).getTime();
        return localTime > lastSync;
    });
}

function getWarehousePullConflicts(rows = []) {
    return rows.filter(row => {
        const local = getLocalWarehouseByRemoteId(row.id);
        if (!local || !local.remoteId) return false;
        const cloudTime = new Date(row.updated_at || 0).getTime();
        const lastSync = new Date(local.lastSyncAt || 0).getTime();
        const localTime = new Date(local.localUpdatedAt || local.data?.localUpdatedAt || 0).getTime();
        return cloudTime > lastSync && localTime > lastSync;
    });
}

async function syncPullWarehouses(showAlert = true) {
    if (!ensureCloudSyncEnabled(showAlert ? 'Daten Download' : '')) return;
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) {
            updateSyncStatus('Bitte zuerst einloggen.', 'warn');
            if (showAlert) alert('Bitte zuerst bei Supabase einloggen.');
            return;
        }
        const hasRemoteLocalChanges = hasUnsyncedWritableWarehouseChanges();
        const hasPendingDeletes = Array.isArray(appState?.pendingDeletedRemoteIds) && appState.pendingDeletedRemoteIds.length > 0;
        if (hasRemoteLocalChanges || hasPendingDeletes) {
            await syncPushAllWarehouses(false);
        }
        syncIsPulling = true;
        const { data: rows, error } = await client.rpc('list_accessible_warehouses');
        if (error) throw error;
        const sortedRows = (rows || []).slice().sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
        const conflicts = getWarehousePullConflicts(sortedRows);
        if (conflicts.length > 0 && showAlert) {
            const names = conflicts.map(row => row.name || 'Lager').join(', ');
            if (!confirm(`Cloud-Konflikt erkannt bei: ${names}\n\nDie Cloud und dieses Gerät wurden seit dem letzten Sync geändert. Daten Download überschreibt den lokalen Stand mit der Cloud-Version. Fortfahren?`)) {
                updateSyncStatus('Daten Download abgebrochen: Cloud-Konflikt erkannt.', 'warn');
                return;
            }
            addWarehouseEvent('conflict', `Cloud-Konflikt bestätigt: ${names}`);
        }
        const skippedConflictIds = new Set();
        if (conflicts.length > 0 && !showAlert) {
            conflicts.forEach(row => skippedConflictIds.add(row.id));
            updateSyncStatus(`Daten Download teilweise übersprungen: ${conflicts.length} lokale Änderung(en) geschützt.`, 'warn');
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
            if (skippedConflictIds.has(row.id) && existing) return;
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
        queuePersistAppState('cloud-pull', false);
        const lagerTab = document.getElementById('lager');
        if (lagerTab) lagerTab.innerHTML = '';
        renderCurrentWarehouseViews();
        if (WAREHOUSE_WRITE_TAB_IDS.has(getActiveTabId()) && isWarehouseReadOnlyView()) showTab('lager');
        const sharedText = loadedShared ? ` · ${loadedShared} geteilte Lager` : '';
        const conflictText = skippedConflictIds.size ? ` · ${skippedConflictIds.size} Konflikt(e) lokal behalten` : '';
        updateSyncStatus(`Daten Download abgeschlossen: ${loaded} Lager geladen.${sharedText}${conflictText}`, skippedConflictIds.size ? 'warn' : 'ok');
        addWarehouseEvent('cloud', `Daten Download: ${loaded} Lager geladen${loadedShared ? `, ${loadedShared} geteilt` : ''}`);
        queuePersistAppState('cloud-pull', false);
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

async function autoSyncWarehousesOnStartup() {
    if (startupSyncAttempted) return;
    startupSyncAttempted = true;
    try {
        if (!CLOUD_SYNC_ENABLED) return;
        const settings = getSupabaseSettings();
        if (!settings.url || !settings.anonKey) return;
        const { user } = await getSupabaseUser();
        if (!user) return;
        await syncPullWarehouses(false);
    } catch (err) {
        updateSyncStatus('Automatischer Start-Sync fehlgeschlagen: ' + err.message, 'warn');
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
    if (!ensureCloudSyncEnabled('Freigabe')) return;
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
        queuePersistAppState('friend-add', false);
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
        queuePersistAppState('friend-remove', false);
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
        queuePersistAppState('friend-role', false);
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

function getCommunityMapDraft() {
    if (!appState) appState = migrateToWarehouseState(db);
    if (!appState.communityMapProfileDraft || typeof appState.communityMapProfileDraft !== 'object') {
        appState.communityMapProfileDraft = {};
    }
    return appState.communityMapProfileDraft;
}

function persistCommunityMapDraft(patch = {}) {
    const draft = getCommunityMapDraft();
    Object.assign(draft, patch || {});
    queuePersistAppState('friend-list', false);
}

function normalizeCommunityCoordinate(value, min, max) {
    const parsed = parseFloat(value);
    if (!Number.isFinite(parsed)) return null;
    const clamped = Math.min(max, Math.max(min, parsed));
    return Math.round(clamped / COMMUNITY_MAP_GRID_STEP) * COMMUNITY_MAP_GRID_STEP;
}

function getCommunityMapPoint(profile) {
    if (!profile) return null;
    const lat = normalizeCommunityCoordinate(profile.approx_lat, -85, 85);
    const lng = normalizeCommunityCoordinate(profile.approx_lng, -180, 180);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
}

function formatCommunityCoordinate(point) {
    if (!point) return 'kein Punkt gesetzt';
    return `${point.lat.toFixed(1)}°, ${point.lng.toFixed(1)}°`;
}

function computeCommunityDistanceKm(a, b) {
    if (!a || !b) return null;
    const toRad = value => value * Math.PI / 180;
    const r = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const hav = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * r * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
}

function formatCommunityDistance(distanceKm) {
    if (!Number.isFinite(distanceKm)) return 'Distanz unbekannt';
    if (distanceKm < 10) return `${distanceKm.toFixed(1)} km entfernt`;
    if (distanceKm < 100) return `${distanceKm.toFixed(0)} km entfernt`;
    return `${Math.round(distanceKm / 5) * 5} km entfernt`;
}

function buildCommunityMapSvg(profiles, ownUserId = null) {
    const members = profiles.filter(profile => getCommunityMapPoint(profile));
    const width = 980;
    const height = 360;
    const paddingLeft = 72;
    const paddingRight = 26;
    const paddingTop = 26;
    const paddingBottom = 42;
    const fallbackBounds = { minLat: 35, maxLat: 61, minLng: -12, maxLng: 28 };
    const coords = members.map(profile => getCommunityMapPoint(profile));
    const latValues = coords.map(point => point.lat);
    const lngValues = coords.map(point => point.lng);
    const dynamicBounds = coords.length
        ? {
            minLat: Math.min(...latValues) - 3,
            maxLat: Math.max(...latValues) + 3,
            minLng: Math.min(...lngValues) - 4,
            maxLng: Math.max(...lngValues) + 4
        }
        : fallbackBounds;
    const minLat = Math.min(dynamicBounds.minLat, fallbackBounds.minLat);
    const maxLat = Math.max(dynamicBounds.maxLat, fallbackBounds.maxLat);
    const minLng = Math.min(dynamicBounds.minLng, fallbackBounds.minLng);
    const maxLng = Math.max(dynamicBounds.maxLng, fallbackBounds.maxLng);
    const usableWidth = width - paddingLeft - paddingRight;
    const usableHeight = height - paddingTop - paddingBottom;
    const project = point => ({
        x: paddingLeft + ((point.lng - minLng) / (maxLng - minLng || 1)) * usableWidth,
        y: paddingTop + (1 - ((point.lat - minLat) / (maxLat - minLat || 1))) * usableHeight
    });
    const gridRows = 4;
    const gridCols = 5;
    const regionLabels = [
        { text: 'Atlantik', lat: 46, lng: -8 },
        { text: 'DACH', lat: 49.5, lng: 10.5 },
        { text: 'Adria', lat: 44, lng: 15.5 },
        { text: 'Skandinavien', lat: 58, lng: 14 }
    ];
    return `
        <svg class="community-map-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Community Karte mit ungefähren Standorten">
            <defs>
                <linearGradient id="communityMapBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.08)"></stop>
                    <stop offset="100%" stop-color="rgba(255,255,255,0.02)"></stop>
                </linearGradient>
                <radialGradient id="communityPinGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(191, 90, 242, 0.45)"></stop>
                    <stop offset="100%" stop-color="rgba(191, 90, 242, 0)"></stop>
                </radialGradient>
            </defs>
            <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="24" fill="url(#communityMapBg)" class="community-map-surface"></rect>
            ${Array.from({ length: gridRows + 1 }, (_, index) => {
                const y = paddingTop + (usableHeight / gridRows) * index;
                return `<line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" class="community-map-grid"></line>`;
            }).join('')}
            ${Array.from({ length: gridCols + 1 }, (_, index) => {
                const x = paddingLeft + (usableWidth / gridCols) * index;
                return `<line x1="${x}" y1="${paddingTop}" x2="${x}" y2="${height - paddingBottom}" class="community-map-grid"></line>`;
            }).join('')}
            ${regionLabels.map(label => {
                const p = project(label);
                return `<text x="${p.x}" y="${p.y}" class="community-map-region">${escapeHtml(label.text)}</text>`;
            }).join('')}
            <text x="${paddingLeft}" y="${height - 14}" class="community-map-caption">Punkte sind absichtlich gerundet und zeigen nur ungefähre Regionen.</text>
            ${members.map(profile => {
                const point = project(getCommunityMapPoint(profile));
                const own = profile.user_id === ownUserId;
                const label = escapeHtml(profile.display_name || profile.region_label || 'Community');
                return `
                    <g class="community-map-pin ${own ? 'own' : ''} ${communityUiState.selectedProfileId === profile.user_id ? 'active' : ''}" onclick="focusCommunityProfile('${profile.user_id}')">
                        <circle cx="${point.x}" cy="${point.y}" r="${own ? 18 : 15}" class="community-map-pin-glow"></circle>
                        <circle cx="${point.x}" cy="${point.y}" r="${own ? 8 : 6.5}" class="community-map-pin-core"></circle>
                        <circle cx="${point.x}" cy="${point.y}" r="${own ? 11 : 9}" class="community-map-pin-ring"></circle>
                        <text x="${point.x}" y="${point.y - 16}" class="community-map-pin-label">${label}</text>
                    </g>
                `;
            }).join('')}
        </svg>
    `;
}

function focusCommunityProfile(userId) {
    communityUiState.selectedProfileId = userId || null;
    renderCommunityMapCard();
    setTimeout(() => {
        document.getElementById('communityMemberList')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
}

function fillCommunityMapForm(profile = null) {
    const draft = getCommunityMapDraft();
    const point = getCommunityMapPoint(profile || draft);
    const displayName = profile?.display_name || draft.display_name || '';
    const regionLabel = profile?.region_label || draft.region_label || '';
    const contactEmail = profile?.contact_email || draft.contact_email || '';
    const visible = profile ? profile.is_visible === true : draft.is_visible === true;
    const contactEnabled = profile ? profile.contact_enabled === true : draft.contact_enabled === true;
    const displayNameEl = document.getElementById('communityDisplayName');
    const regionEl = document.getElementById('communityRegionLabel');
    const visibleEl = document.getElementById('communityVisible');
    const contactEnabledEl = document.getElementById('communityContactEnabled');
    const contactEmailEl = document.getElementById('communityContactEmail');
    const latEl = document.getElementById('communityLatitude');
    const lngEl = document.getElementById('communityLongitude');
    const summaryEl = document.getElementById('communityLocationSummary');
    if (displayNameEl) displayNameEl.value = displayName;
    if (regionEl) regionEl.value = regionLabel;
    if (visibleEl) visibleEl.checked = visible;
    if (contactEnabledEl) contactEnabledEl.checked = contactEnabled;
    if (contactEmailEl) contactEmailEl.value = contactEmail;
    if (latEl) latEl.value = point ? point.lat.toFixed(1) : '';
    if (lngEl) lngEl.value = point ? point.lng.toFixed(1) : '';
    if (summaryEl) summaryEl.innerHTML = point
        ? `<strong>Gerundeter Punkt:</strong> ${formatCommunityCoordinate(point)}`
        : '<strong>Noch kein Punkt gesetzt.</strong> Nutze am besten die Geräte-Ortung und speichere nur die grobe Region.';
}

function syncCommunityMapDraftFromForm() {
    persistCommunityMapDraft({
        display_name: document.getElementById('communityDisplayName')?.value || '',
        region_label: document.getElementById('communityRegionLabel')?.value || '',
        contact_email: document.getElementById('communityContactEmail')?.value || '',
        is_visible: document.getElementById('communityVisible')?.checked === true,
        contact_enabled: document.getElementById('communityContactEnabled')?.checked === true,
        approx_lat: document.getElementById('communityLatitude')?.value || '',
        approx_lng: document.getElementById('communityLongitude')?.value || ''
    });
}

function updateCommunityLocationSummary() {
    syncCommunityMapDraftFromForm();
    fillCommunityMapForm(getCommunityMapDraft());
}

function isCommunitySchemaMissingError(err) {
    const message = String(err && err.message ? err.message : err || '');
    return /community_profiles|community_contact_requests|relation .* does not exist|schema cache/i.test(message);
}

async function useApproxCommunityLocation() {
    if (!navigator.geolocation) {
        alert('Dieses Gerät stellt keine Standort-Funktion bereit.');
        return;
    }
    const status = document.getElementById('communityMapStatus');
    if (status) status.innerText = 'Standort wird ungefähr übernommen...';
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = normalizeCommunityCoordinate(position.coords.latitude, -85, 85);
        const lng = normalizeCommunityCoordinate(position.coords.longitude, -180, 180);
        const latEl = document.getElementById('communityLatitude');
        const lngEl = document.getElementById('communityLongitude');
        if (latEl) latEl.value = lat.toFixed(1);
        if (lngEl) lngEl.value = lng.toFixed(1);
        updateCommunityLocationSummary();
        if (status) status.innerText = 'Standort übernommen und auf ca. 0,1° gerundet.';
        showToast('Community Standort grob gesetzt', 'success');
    }, (error) => {
        if (status) status.innerText = 'Standort konnte nicht übernommen werden.';
        alert('Standort konnte nicht gelesen werden: ' + (error.message || 'Unbekannter Fehler'));
    }, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
    });
}

async function saveCommunityProfile() {
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) return alert('Bitte zuerst im Cloud Login anmelden.');
        const displayName = (document.getElementById('communityDisplayName')?.value || '').trim();
        const regionLabel = (document.getElementById('communityRegionLabel')?.value || '').trim();
        const contactEmail = (document.getElementById('communityContactEmail')?.value || '').trim();
        const isVisible = document.getElementById('communityVisible')?.checked === true;
        const contactEnabled = document.getElementById('communityContactEnabled')?.checked === true;
        const approxLat = normalizeCommunityCoordinate(document.getElementById('communityLatitude')?.value, -85, 85);
        const approxLng = normalizeCommunityCoordinate(document.getElementById('communityLongitude')?.value, -180, 180);
        if (!displayName) return alert('Bitte einen Anzeigenamen eintragen.');
        if (!regionLabel) return alert('Bitte eine grobe Region eintragen, z.B. "Raum Köln".');
        if (isVisible && (!Number.isFinite(approxLat) || !Number.isFinite(approxLng))) {
            return alert('Für die sichtbare Community-Karte wird ein grob gerundeter Punkt benötigt.');
        }
        const payload = {
            user_id: user.id,
            display_name: displayName,
            region_label: regionLabel,
            approx_lat: Number.isFinite(approxLat) ? approxLat : null,
            approx_lng: Number.isFinite(approxLng) ? approxLng : null,
            is_visible: isVisible,
            contact_enabled: contactEnabled,
            contact_email: contactEnabled && contactEmail ? contactEmail : null
        };
        const { error } = await client.from('community_profiles').upsert(payload, { onConflict: 'user_id' });
        if (error) throw error;
        persistCommunityMapDraft(payload);
        showToast('Community Profil gespeichert', 'success');
        await renderCommunityMapCard();
    } catch (err) {
        if (isCommunitySchemaMissingError(err)) {
            alert('Community Map ist noch nicht in Supabase eingerichtet. Bitte die aktualisierte supabase-sync.sql einmal im SQL Editor ausführen.');
            return;
        }
        alert('Community Profil konnte nicht gespeichert werden: ' + err.message);
    }
}

async function hideCommunityProfile() {
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) return alert('Bitte zuerst einloggen.');
        const { error } = await client.from('community_profiles').upsert({
            user_id: user.id,
            display_name: document.getElementById('communityDisplayName')?.value || 'Community',
            region_label: document.getElementById('communityRegionLabel')?.value || 'Privat',
            is_visible: false,
            contact_enabled: false,
            contact_email: null,
            approx_lat: null,
            approx_lng: null
        }, { onConflict: 'user_id' });
        if (error) throw error;
        persistCommunityMapDraft({
            is_visible: false,
            contact_enabled: false,
            approx_lat: '',
            approx_lng: ''
        });
        showToast('Community Profil ausgeblendet', 'success');
        await renderCommunityMapCard();
    } catch (err) {
        alert('Community Profil konnte nicht ausgeblendet werden: ' + err.message);
    }
}

async function sendCommunityContactRequest() {
    try {
        const { client, user } = await getSupabaseUser();
        if (!user) return alert('Bitte zuerst einloggen.');
        const recipientUserId = document.getElementById('communityContactTarget')?.value || '';
        const message = (document.getElementById('communityContactMessage')?.value || '').trim();
        if (!recipientUserId) return alert('Bitte zuerst eine Person auswählen.');
        if (!message) return alert('Bitte eine kurze Nachricht eintragen.');
        const { error } = await client.from('community_contact_requests').insert({
            recipient_user_id: recipientUserId,
            message
        });
        if (error) throw error;
        document.getElementById('communityContactMessage').value = '';
        showToast('Kontaktanfrage gesendet', 'success');
        await renderCommunityMapCard();
    } catch (err) {
        if (isCommunitySchemaMissingError(err)) {
            alert('Community Map ist noch nicht in Supabase eingerichtet. Bitte die aktualisierte supabase-sync.sql einmal im SQL Editor ausführen.');
            return;
        }
        alert('Kontaktanfrage konnte nicht gesendet werden: ' + err.message);
    }
}

async function updateCommunityContactRequestStatus(id, status) {
    try {
        const { client } = await getSupabaseUser();
        const { error } = await client.from('community_contact_requests').update({ status }).eq('id', id);
        if (error) throw error;
        await renderCommunityMapCard();
    } catch (err) {
        alert('Kontaktanfrage konnte nicht aktualisiert werden: ' + err.message);
    }
}

async function renderCommunityMapCard() {
    const container = document.getElementById('communityMapCard');
    if (!container) return;
    if (communityMapLoading) return;
    communityMapLoading = true;
    container.innerHTML = '<p class="hint">Community Map wird geladen...</p>';
    try {
        if (!CLOUD_SYNC_ENABLED) {
            container.innerHTML = '<p class="hint">Community Map ist zusammen mit Cloud Login & Share voruebergehend deaktiviert.</p>';
            return;
        }
        const settings = getSupabaseSettings();
        if (!settings.url || !settings.anonKey) {
            container.innerHTML = '<p class="hint">Community Map ist an deinen Cloud Login gekoppelt. Bitte zuerst bei "Cloud Login & Share" anmelden.</p>';
            return;
        }
        const { client, user } = await getSupabaseUser();
        if (!user) {
            const draft = getCommunityMapDraft();
            container.innerHTML = `
                <div class="community-map-card-shell">
                    <div class="community-map-privacy">
                        <strong>Community Map mit Datenschutz-Fokus</strong>
                        <p class="hint">Es werden nur grob gerundete Regionen geteilt. Die Kontaktaufnahme läuft nicht öffentlich über die Karte.</p>
                    </div>
                    <div class="community-map-login-hint">
                        <strong>Cloud Login erforderlich</strong>
                        <p class="hint">Melde dich an, damit du dein Community-Profil speichern, andere Teilnehmer sehen und Kontaktanfragen verwalten kannst.</p>
                        <div class="community-map-draft">
                            <small>Letzter lokaler Entwurf: ${escapeHtml(draft.display_name || 'noch leer')}</small>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const [{ data: ownRows, error: ownError }, { data: visibleRows, error: visibleError }, { data: requestRows, error: requestError }] = await Promise.all([
            client.from('community_profiles').select('*').eq('user_id', user.id).limit(1),
            client.from('community_profiles').select('*').eq('is_visible', true).order('updated_at', { ascending: false }),
            client.from('community_contact_requests').select('*').order('created_at', { ascending: false }).limit(30)
        ]);
        if (ownError) throw ownError;
        if (visibleError) throw visibleError;
        if (requestError) throw requestError;

        const ownProfile = ownRows && ownRows[0] ? ownRows[0] : null;
        const ownPoint = getCommunityMapPoint(ownProfile);
        const mergedProfiles = new Map();
        (visibleRows || []).forEach(profile => mergedProfiles.set(profile.user_id, profile));
        if (ownProfile) mergedProfiles.set(ownProfile.user_id, ownProfile);
        const profiles = Array.from(mergedProfiles.values())
            .map(profile => {
                const point = getCommunityMapPoint(profile);
                const distanceKm = ownPoint && point && profile.user_id !== user.id ? computeCommunityDistanceKm(ownPoint, point) : null;
                return { ...profile, point, distanceKm };
            })
            .sort((a, b) => {
                if (a.user_id === user.id) return -1;
                if (b.user_id === user.id) return 1;
                if (a.distanceKm === null && b.distanceKm === null) return (a.display_name || '').localeCompare(b.display_name || '');
                if (a.distanceKm === null) return 1;
                if (b.distanceKm === null) return -1;
                return a.distanceKm - b.distanceKm;
            });

        if (!communityUiState.selectedProfileId || !profiles.some(profile => profile.user_id === communityUiState.selectedProfileId)) {
            communityUiState.selectedProfileId = profiles.find(profile => profile.user_id !== user.id)?.user_id || ownProfile?.user_id || null;
        }
        const selectedProfile = profiles.find(profile => profile.user_id === communityUiState.selectedProfileId) || null;
        const contactTargets = profiles.filter(profile => profile.user_id !== user.id && profile.contact_enabled);
        const incomingRequests = (requestRows || []).filter(row => row.recipient_user_id === user.id);
        const outgoingRequests = (requestRows || []).filter(row => row.sender_user_id === user.id);
        const mapSvg = buildCommunityMapSvg(profiles.filter(profile => profile.is_visible), user.id);

        container.innerHTML = `
            <div class="community-map-card-shell">
                <div class="community-map-privacy">
                    <strong>Community Map Beta</strong>
                    <p class="hint">Datenschutz zuerst: Die Karte zeigt nur grob gerundete Regionen. Keine öffentliche Mail-Adresse, keine exakten Punkte.</p>
                </div>
                <div class="community-map-layout">
                    <div class="community-map-form">
                        <div class="tool-grid">
                            <div class="input-group">
                                <label>Anzeigename:</label>
                                <input type="text" id="communityDisplayName" placeholder="z.B. Simon / OSCI Köln" oninput="syncCommunityMapDraftFromForm()">
                            </div>
                            <div class="input-group">
                                <label>Grobe Region:</label>
                                <input type="text" id="communityRegionLabel" placeholder="z.B. Raum Köln" oninput="syncCommunityMapDraftFromForm()">
                            </div>
                            <div class="input-group">
                                <label style="display:flex; align-items:center; gap:8px;">
                                    <input type="checkbox" id="communityVisible" onchange="syncCommunityMapDraftFromForm()" style="width:18px; height:18px; margin:0;">
                                    Auf Karte sichtbar
                                </label>
                            </div>
                            <div class="input-group">
                                <label style="display:flex; align-items:center; gap:8px;">
                                    <input type="checkbox" id="communityContactEnabled" onchange="syncCommunityMapDraftFromForm()" style="width:18px; height:18px; margin:0;">
                                    Kontaktanfragen erlauben
                                </label>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Kontakt-Mail für Antworten:</label>
                            <input type="email" id="communityContactEmail" placeholder="optional, wenn du Kontaktanfragen beantworten willst" oninput="syncCommunityMapDraftFromForm()">
                        </div>
                        <div class="community-map-location-box">
                            <div id="communityLocationSummary" class="tool-result"></div>
                            <div class="btn-group" style="flex-wrap:wrap;">
                                <button type="button" class="btn-secondary btn-animated" onclick="useApproxCommunityLocation()">Standort grob vom Gerät übernehmen</button>
                                <button type="button" class="btn-primary btn-animated" onclick="saveCommunityProfile()">Profil speichern</button>
                                <button type="button" class="btn-out btn-animated" onclick="hideCommunityProfile()">Aus Karte entfernen</button>
                            </div>
                            <details class="community-map-manual">
                                <summary>Manuell setzen</summary>
                                <div class="tool-grid">
                                    <div class="input-group">
                                        <label>Breitengrad (gerundet):</label>
                                        <input type="number" id="communityLatitude" step="0.1" placeholder="z.B. 50.9" oninput="updateCommunityLocationSummary()">
                                    </div>
                                    <div class="input-group">
                                        <label>Längengrad (gerundet):</label>
                                        <input type="number" id="communityLongitude" step="0.1" placeholder="z.B. 6.9" oninput="updateCommunityLocationSummary()">
                                    </div>
                                </div>
                            </details>
                            <div id="communityMapStatus" class="hint">Empfohlen: Standort automatisch grob übernehmen und nur die Region freigeben.</div>
                        </div>
                    </div>
                    <div class="community-map-visual">
                        ${mapSvg}
                    </div>
                </div>

                <div class="community-member-list" id="communityMemberList">
                    ${profiles.length ? profiles.map(profile => `
                        <div class="community-member-row ${selectedProfile?.user_id === profile.user_id ? 'active' : ''}">
                            <button type="button" class="community-member-main" onclick="focusCommunityProfile('${profile.user_id}')">
                                <strong>${escapeHtml(profile.display_name || 'Community')}</strong>
                                <small>${escapeHtml(profile.region_label || 'Region offen gelassen')} · ${profile.user_id === user.id ? 'dein Eintrag' : (profile.distanceKm !== null ? formatCommunityDistance(profile.distanceKm) : 'ungefähre Region')}</small>
                            </button>
                            <div class="community-member-meta">
                                <span>${profile.contact_enabled ? 'Kontakt anfragbar' : 'ohne Kontakt'}</span>
                                ${profile.user_id === user.id ? '<span class="community-own-badge">Du</span>' : ''}
                            </div>
                        </div>
                    `).join('') : '<p class="hint">Noch keine sichtbaren Community-Einträge vorhanden.</p>'}
                </div>

                <div class="community-map-request-grid">
                    <div class="community-map-request-card">
                        <strong>Kontaktanfrage senden</strong>
                        <div class="input-group">
                            <label>Person:</label>
                            <select id="communityContactTarget">
                                <option value="">Bitte wählen ...</option>
                                ${contactTargets.map(profile => `<option value="${profile.user_id}" ${selectedProfile?.user_id === profile.user_id ? 'selected' : ''}>${escapeHtml(profile.display_name || profile.region_label || 'Community')} · ${escapeHtml(profile.region_label || '')}</option>`).join('')}
                            </select>
                        </div>
                        <div class="input-group">
                            <label>Nachricht:</label>
                            <textarea id="communityContactMessage" placeholder="Hallo, ich komme aus derselben Region und würde mich gern austauschen."></textarea>
                        </div>
                        <button type="button" class="btn-secondary btn-animated" onclick="sendCommunityContactRequest()">Kontaktanfrage senden</button>
                    </div>
                    <div class="community-map-request-card">
                        <strong>Eingehende Anfragen</strong>
                        <div class="community-request-list">
                            ${incomingRequests.length ? incomingRequests.map(request => `
                                <div class="community-request-row">
                                    <div>
                                        <strong>${escapeHtml(request.sender_display_name || request.sender_email || 'Kontakt')}</strong>
                                        <small>${formatWarehouseDate(request.created_at)} · ${escapeHtml(request.sender_email || 'ohne Mail')}</small>
                                        <p>${escapeHtml(request.message || '')}</p>
                                    </div>
                                    <div class="community-request-actions">
                                        ${request.sender_email ? `<a href="mailto:${escapeHtml(request.sender_email)}?subject=${encodeURIComponent('OSCI Motion Community')}" class="btn-secondary">Mail öffnen</a>` : ''}
                                        <button type="button" class="btn-out btn-animated" onclick="updateCommunityContactRequestStatus('${request.id}', 'closed')">Erledigt</button>
                                    </div>
                                </div>
                            `).join('') : '<p class="hint">Noch keine eingehenden Kontaktanfragen.</p>'}
                        </div>
                    </div>
                </div>

                <details class="community-map-outbox">
                    <summary>Gesendete Anfragen (${outgoingRequests.length})</summary>
                    <div class="community-request-list">
                        ${outgoingRequests.length ? outgoingRequests.map(request => `
                            <div class="community-request-row compact">
                                <div>
                                    <strong>Status: ${escapeHtml(request.status || 'neu')}</strong>
                                    <small>${formatWarehouseDate(request.created_at)}</small>
                                    <p>${escapeHtml(request.message || '')}</p>
                                </div>
                            </div>
                        `).join('') : '<p class="hint">Noch keine ausgehenden Kontaktanfragen.</p>'}
                    </div>
                </details>
            </div>
        `;
        fillCommunityMapForm(ownProfile);
        const select = document.getElementById('communityContactTarget');
        if (select && selectedProfile && selectedProfile.user_id !== user.id && selectedProfile.contact_enabled) {
            select.value = selectedProfile.user_id;
        }
    } catch (err) {
        if (isCommunitySchemaMissingError(err)) {
            container.innerHTML = '<p class="hint">Community Map wartet noch auf die Datenbank-Erweiterung. Bitte die neue <code>supabase-sync.sql</code> im Supabase SQL Editor ausführen.</p>';
            return;
        }
        container.innerHTML = `<p class="hint">Community Map konnte nicht geladen werden: ${escapeHtml(err.message || String(err))}</p>`;
    } finally {
        communityMapLoading = false;
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
    const activeWarehouseName = document.getElementById('activeWarehouseName');
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
        if (activeWarehouseName) activeWarehouseName.innerText = active.name;
        if (backupInfo) backupInfo.innerText = `Aktives Lager: ${active.name} · ${info} · Lokales Auto-Save: ${latestPersistAt ? formatWarehouseDate(latestPersistAt) : 'läuft'}`;
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
    renderStorageSecurityStatus();
}

function renderCurrentWarehouseViews() {
    renderDashboard();
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
    renderLocalDeviceSettings();
    renderNachbestellen();
    renderSupabaseSyncSettings();
    applyCursorSettings();
    renderAquariumWorkspacePanels();
    renderLogBook();
    renderCoralCatalog();
    renderDosingContainers();
    initBulkProductSelect();
    updateNotificationStatus();
    updateTabAccessState();
    clearCRPdfImport();
}

function getDashboardNextTodo() {
    const now = Date.now();
    return (db.aquariumTodos || [])
        .filter(todo => !todo.done && todo.dueAt)
        .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))
        .map(todo => ({
            ...todo,
            dueTime: new Date(todo.dueAt).getTime(),
            isDue: new Date(todo.dueAt).getTime() <= now
        }))[0] || null;
}

function getDashboardSettings() {
    if (!db.dashboardSettings) {
        db.dashboardSettings = {
            widgets: { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true },
            range: '30',
            pinnedMeasurements: ['KH', 'CA', 'PO4']
        };
    }
    if (!db.dashboardSettings.widgets) db.dashboardSettings.widgets = { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true };
    if (!Array.isArray(db.dashboardSettings.pinnedMeasurements)) db.dashboardSettings.pinnedMeasurements = ['KH', 'CA', 'PO4'];
    if (!db.dashboardSettings.range) db.dashboardSettings.range = '30';
    return db.dashboardSettings;
}

let dashboardEditDraft = null;

function cloneDashboardSettings(settings = getDashboardSettings()) {
    return {
        widgets: { ...settings.widgets },
        range: settings.range,
        pinnedMeasurements: [...settings.pinnedMeasurements]
    };
}

function getDashboardRenderSettings() {
    return dashboardEditDraft || getDashboardSettings();
}

function startDashboardEdit() {
    dashboardEditDraft = cloneDashboardSettings();
    renderDashboard();
}

function cancelDashboardEdit() {
    dashboardEditDraft = null;
    renderDashboard();
}

function resetDashboardEdit() {
    dashboardEditDraft = {
        widgets: { stock: true, todos: true, tests: true, osmose: true, dosing: true, measurements: true, logs: true, corals: true },
        range: '30',
        pinnedMeasurements: ['KH', 'CA', 'PO4']
    };
    renderDashboard();
}

function applyDashboardEdit() {
    if (!dashboardEditDraft) return;
    db.dashboardSettings = cloneDashboardSettings(dashboardEditDraft);
    dashboardEditDraft = null;
    saveDB(false);
    renderDashboard();
    showToast('Dashboard-Einstellungen gespeichert.', 'success');
}

function toggleDashboardWidget(widgetKey, checked) {
    const settings = getDashboardRenderSettings();
    settings.widgets[widgetKey] = checked !== false;
    if (dashboardEditDraft) {
        renderDashboard();
        return;
    }
    saveDB(false);
    renderDashboard();
}

function setDashboardRange(value) {
    const settings = getDashboardRenderSettings();
    settings.range = value || '30';
    if (dashboardEditDraft) {
        renderDashboard();
        return;
    }
    saveDB(false);
    renderDashboard();
}

function toggleDashboardMeasurementPin(typeId, checked) {
    const settings = getDashboardRenderSettings();
    const set = new Set(settings.pinnedMeasurements || []);
    if (checked) set.add(typeId);
    else set.delete(typeId);
    settings.pinnedMeasurements = Array.from(set).slice(0, 6);
    if (dashboardEditDraft) {
        renderDashboard();
        return;
    }
    saveDB(false);
    renderDashboard();
}

function getMeasurementEntriesForRange(typeId, rangeValue = '30') {
    const allEntries = getMeasurementEntries()
        .filter(entry => entry.typeId === typeId)
        .slice()
        .sort((a, b) => new Date(a.at) - new Date(b.at));
    if (rangeValue === 'all') return allEntries;
    const days = parseInt(rangeValue, 10);
    if (!days) return allEntries;
    const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
    return allEntries.filter(entry => new Date(entry.at).getTime() >= threshold);
}

function getLastMeasurementAt() {
    const entries = getMeasurementEntries().slice().sort((a, b) => new Date(b.at) - new Date(a.at));
    return entries[0]?.at || null;
}

function getRecentLogBookEntry() {
    return (db.logBookEntries || []).slice().sort((a, b) => new Date(b.at || b.createdAt || 0) - new Date(a.at || a.createdAt || 0))[0] || null;
}

function getDashboardMeasurementSummary(typeId, rangeValue) {
    const entries = getMeasurementEntriesForRange(typeId, rangeValue);
    if (!entries.length) return null;
    const latest = entries[entries.length - 1];
    const first = entries[0];
    const delta = latest.value - first.value;
    const spanDays = Math.max(1 / 24, (new Date(latest.at) - new Date(first.at)) / (24 * 60 * 60 * 1000));
    const dailyTrend = entries.length > 1 ? delta / spanDays : 0;
    return {
        entries,
        latest,
        first,
        delta,
        dailyTrend,
        unit: getMeasurementUnit(typeId),
        meta: getMeasurementTypeById(typeId)
    };
}

function openDetailsAncestors(element) {
    let current = element?.closest ? element.closest('details') : null;
    while (current) {
        current.open = true;
        current = current.parentElement?.closest ? current.parentElement.closest('details') : null;
    }
}

function focusDashboardTarget(target, { selector = '', focus = true, delay = 140 } = {}) {
    setTimeout(() => {
        const element = selector ? document.querySelector(selector) : null;
        if (!element) return;
        openDetailsAncestors(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (focus && typeof element.focus === 'function') element.focus();
    }, delay);
}

function openDashboardDestination(target, payload = '') {
    switch (target) {
        case 'stock':
        case 'products':
            selectTab('lager');
            break;
        case 'todos':
            selectTab('logbuch');
            focusDashboardTarget(target, { selector: '#todoTitle' });
            break;
        case 'measurement':
            selectTab('logbuch');
            setTimeout(() => {
                if (payload) {
                    const typeSelect = document.getElementById('measurementType');
                    if (typeSelect) {
                        typeSelect.value = payload;
                        renderMeasurementTracker();
                    }
                }
            }, 110);
            focusDashboardTarget(target, { selector: '#measurementValue' });
            break;
        case 'measurement-list':
            selectTab('logbuch');
            setTimeout(() => {
                if (payload) {
                    const typeSelect = document.getElementById('measurementType');
                    if (typeSelect) {
                        typeSelect.value = payload;
                        renderMeasurementTracker();
                    }
                }
            }, 110);
            focusDashboardTarget(target, { selector: '#measurementTracker', focus: false });
            break;
        case 'logbook-entry':
            selectTab('logbuch');
            setTimeout(() => {
                const documentDetails = document.querySelector('.logbook-document-card .logbook-card-details');
                const listDetails = document.querySelector('.logbook-document-card .logbook-list-details');
                if (documentDetails) documentDetails.open = true;
                if (listDetails) listDetails.open = true;
                const list = document.getElementById('log-book-list');
                if (list) {
                    list.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 140);
            break;
        case 'protocol':
            selectTab('log');
            break;
        case 'osmose':
            selectTab('tools');
            setTimeout(() => openToolFavorite('osmosetank-verwaltung'), 90);
            focusDashboardTarget(target, { selector: '#osmoseTankCurrent' });
            break;
        case 'dosing':
            selectTab('logbuch');
            focusDashboardTarget(target, { selector: '#doseContainerName' });
            break;
        case 'corals':
            selectTab('korallen');
            break;
        default:
            selectTab('uebersicht');
            break;
    }
}

function createDashboardMeasurementChart(summary) {
    if (!summary || !summary.entries.length) return '<div class="dashboard-chart-empty">Noch keine Messwerte</div>';
    const entries = summary.entries;
    const values = entries.map(entry => entry.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const spread = Math.max(0.001, max - min);
    const width = 300;
    const height = 96;
    const paddingX = 8;
    const paddingY = 10;
    const points = entries.map((entry, index) => {
        const x = entries.length === 1 ? width / 2 : paddingX + ((width - paddingX * 2) * index) / (entries.length - 1);
        const y = paddingY + (height - paddingY * 2) - (((entry.value - min) / spread) * (height - paddingY * 2));
        return { x, y };
    });
    const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
    const floor = height - paddingY;
    const area = `${line} L ${points[points.length - 1].x.toFixed(2)} ${floor} L ${points[0].x.toFixed(2)} ${floor} Z`;
    const latest = points[points.length - 1];
    return `
        <svg class="dashboard-trend-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Messwert Verlauf">
            <path d="${area}" class="dashboard-chart-area"></path>
            <path d="${line}" class="dashboard-chart-line"></path>
            <circle cx="${latest.x}" cy="${latest.y}" r="5.5" fill="var(--primary)"></circle>
            <circle cx="${latest.x}" cy="${latest.y}" r="11" class="dashboard-chart-focus"></circle>
        </svg>
    `;
}

function renderDashboard() {
    const container = document.getElementById('uebersicht');
    if (!container) return;
    const warehouse = getActiveWarehouse();
    const aquarium = getActiveAquarium();
    const settings = getDashboardRenderSettings();
    const isEditing = Boolean(dashboardEditDraft);
    container.classList.toggle('dashboard-edit-active', isEditing);
    const alerts = getStockAlerts();
    const dueTodos = (db.aquariumTodos || []).filter(todo => !todo.done && todo.dueAt && new Date(todo.dueAt).getTime() <= Date.now());
    const nextTodo = getDashboardNextTodo();
    const lastLog = (db.logs || []).slice().reverse()[0];
    const recentLogBookEntry = getRecentLogBookEntry();
    const lastMeasurementAt = getLastMeasurementAt();
    const coralCount = (db.coralCatalog || []).length;
    const osmose = db.osmoseTank || { currentLiters: 0, capacityLiters: 0 };
    const dosingCritical = (db.dosingContainers || []).filter(entry => {
        const capacity = parseFloat(entry.capacityMl) || 0;
        const current = parseFloat(entry.currentMl) || 0;
        return capacity > 0 && current / capacity <= 0.25;
    });
    const pinnedMeasurements = (settings.pinnedMeasurements || []).filter(typeId => getMeasurementEntriesForRange(typeId, settings.range).length > 0);
    const lastLogText = lastLog
        ? `${lastLog.action === 'out' ? 'Ausgelagert' : 'Eingelagert'}: ${lastLog.item} · ${formatItemAmount(lastLog.item, lastLog.amount)}`
        : 'Noch keine Buchung';
    const activeProducts = Object.keys(catalog).reduce((sum, cat) => {
        return sum + Object.keys(catalog[cat]).filter(item => !isProductHidden(item)).length;
    }, 0);
    const criticalRows = alerts.slice(0, 4).map(alert => `
        <button type="button" class="dashboard-list-row" onclick="openDashboardDestination('stock'); setTimeout(() => focusProductInLager(${jsArg(alert.item)}), 80)">
            <span><strong>${escapeHtml(alert.item)}</strong><small>${escapeHtml(alert.cat)} · ${formatItemAmount(alert.item, alert.stock)}</small></span>
            <em>${alert.weeksLeft === null ? 'prüfen' : `${alert.weeksLeft.toFixed(1)} Wochen`}</em>
        </button>
    `).join('');
    const pinnedMeasurementCards = pinnedMeasurements.map(typeId => {
        const summary = getDashboardMeasurementSummary(typeId, settings.range);
        if (!summary) return '';
        return `
            <button type="button" class="dashboard-measurement-card dashboard-widget dashboard-widget--chart" onclick="openDashboardDestination('measurement-list', '${typeId}')" ${isEditing ? 'disabled' : ''}>
                <div class="dashboard-measurement-head">
                    <strong>${escapeHtml(summary.meta?.label || typeId)}</strong>
                    <small>${summary.latest.value.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(summary.unit)}</small>
                </div>
                ${createDashboardMeasurementChart(summary)}
                <div class="dashboard-measurement-meta">
                    <span>${summary.dailyTrend >= 0 ? '+' : ''}${summary.dailyTrend.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(summary.unit)}/Tag</span>
                    <span>${formatWarehouseDate(summary.latest.at)}</span>
                </div>
            </button>
        `;
    }).join('');
    const measurementChooser = getMeasurementTypes().map(type => `
        <label class="dashboard-chip-toggle">
            <input type="checkbox" ${settings.pinnedMeasurements.includes(type.id) ? 'checked' : ''} onchange="toggleDashboardMeasurementPin('${type.id}', this.checked)">
            <span>${escapeHtml(type.label)}</span>
        </label>
    `).join('');
    const onboarding = db.onboardingDone ? '' : `
        <section class="dashboard-onboarding dashboard-attention" aria-label="Ersteinrichtung">
            <div>
                <strong>Ersteinrichtung</strong>
                <p>Prüfe Lagername, Aquariumgröße, sichtbare Produkte, Warnschwellen und sichere deine wichtigsten Bereiche für den Alltag.</p>
            </div>
            <div>
                <button type="button" class="btn btn-secondary" onclick="selectTab('lager')">Produkte prüfen</button>
                <button type="button" class="btn btn-secondary" onclick="selectTab('einstellungen')">Einstellungen</button>
                <button type="button" class="btn btn-primary" onclick="finishOnboarding()">Erledigt</button>
            </div>
        </section>
    `;
    container.innerHTML = `
        <section class="dashboard-hero dashboard-page-head">
            <div>
                <small>Übersicht</small>
                <h2>${escapeHtml(aquarium?.name || 'Aquarium')}</h2>
                <p><strong>${escapeHtml(warehouse?.name || 'Lager')}</strong> · ${escapeHtml(getWarehouseAccessLabel(warehouse))}</p>
            </div>
            <div class="dashboard-hero-actions">
                <button type="button" onclick="triggerRefresh()" class="btn btn-secondary dashboard-refresh">Aktualisieren</button>
                <button type="button" onclick="startDashboardEdit()" class="btn btn-secondary dashboard-refresh" ${isEditing ? 'disabled' : ''}>Anpassen</button>
            </div>
        </section>

        ${alerts.length || dueTodos.length ? `
        <section class="dashboard-attention dashboard-status-line" aria-label="Benötigt Aufmerksamkeit">
            <strong>Benötigt Aufmerksamkeit</strong>
            <span>${alerts.length} Bestandswarnung(en)</span>
            <span>${dueTodos.length} fällige ToDo(s)</span>
        </section>` : ''}

        ${onboarding}

        <div class="card aquarium-workspace-panel dashboard-aquarium-panel" id="dashboardAquariumPanel"></div>

        <section class="dashboard-grid" aria-label="Schnellübersicht">
            <button type="button" class="dashboard-tile dashboard-widget dashboard-widget--metric ${alerts.length ? 'warn' : 'ok'}" onclick="openDashboardDestination('stock')" ${isEditing ? 'disabled' : ''}>
                <span>Bestand</span><strong><b>${alerts.length}</b></strong><small>${alerts.length ? 'Warnung(en)' : 'Keine Warnung'}</small>
            </button>
            <button type="button" class="dashboard-tile dashboard-widget dashboard-widget--metric ${dueTodos.length ? 'warn' : 'ok'}" onclick="openDashboardDestination('todos')" ${isEditing ? 'disabled' : ''}>
                <span>ToDos</span><strong><b>${dueTodos.length}</b></strong><small>${dueTodos.length ? 'Fällig' : 'Nichts fällig'}</small>
            </button>
            <button type="button" class="dashboard-tile dashboard-widget dashboard-widget--status" onclick="openDashboardDestination('measurement')" ${isEditing ? 'disabled' : ''}>
                <span>Wassertest</span><strong>${lastMeasurementAt ? formatWarehouseDate(lastMeasurementAt) : 'offen'}</strong><small>${lastMeasurementAt ? 'zuletzt erfasst' : 'noch kein Eintrag'}</small>
            </button>
            <button type="button" class="dashboard-tile dashboard-widget dashboard-widget--metric" onclick="openDashboardDestination('corals')" ${isEditing ? 'disabled' : ''}>
                <span>Korallen</span><strong>${coralCount}</strong><small>Bestand dokumentiert</small>
            </button>
            <button type="button" class="dashboard-tile dashboard-widget dashboard-widget--metric" onclick="openDashboardDestination('osmose')" ${isEditing ? 'disabled' : ''}>
                <span>Osmose</span><strong><b>${(parseFloat(osmose.currentLiters) || 0).toFixed(1)}</b> <i>L</i></strong><small>von ${(parseFloat(osmose.capacityLiters) || 0).toFixed(1)} L</small>
            </button>
            <button type="button" class="dashboard-tile dashboard-widget dashboard-widget--metric" onclick="openDashboardDestination('products')" ${isEditing ? 'disabled' : ''}>
                <span>Produkte</span><strong>${activeProducts}</strong><small>sichtbar</small>
            </button>
        </section>

        <section class="dashboard-actions dashboard-widget dashboard-widget--action" aria-label="Schnellaktionen">
            <button type="button" class="btn btn-primary" onclick="openSmartStockModal('in')" ${isEditing ? 'disabled' : ''}>Einlagern</button>
            <button type="button" class="btn btn-secondary" onclick="openSmartStockModal('out')" ${isEditing ? 'disabled' : ''}>Auslagern</button>
            <button type="button" class="btn btn-secondary" onclick="selectTab('lager')" ${isEditing ? 'disabled' : ''}>Lager öffnen</button>
            <button type="button" class="btn btn-secondary" onclick="selectTab('tools')" ${isEditing ? 'disabled' : ''}>Tools</button>
            <button type="button" class="btn btn-secondary" onclick="selectTab('korallen')" ${isEditing ? 'disabled' : ''}>Korallen</button>
        </section>

        ${isEditing ? `<section class="dashboard-config dashboard-edit-mode" aria-label="Dashboard bearbeiten">
            <div class="dashboard-config-card">
                <div class="dashboard-edit-banner">
                    <span><strong>Bearbeitungsmodus</strong><small>Änderungen werden erst mit „Übernehmen“ gespeichert.</small></span>
                    <span class="status-badge status-badge--info">Entwurf</span>
                </div>
                <div class="dashboard-config-body">
                    <h3>Widgets anzeigen</h3>
                    <div class="dashboard-widget-grid">
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.stock ? 'checked' : ''} onchange="toggleDashboardWidget('stock', this.checked)"><span>Bestand</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.todos ? 'checked' : ''} onchange="toggleDashboardWidget('todos', this.checked)"><span>ToDos</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.tests ? 'checked' : ''} onchange="toggleDashboardWidget('tests', this.checked)"><span>Wassertests</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.osmose ? 'checked' : ''} onchange="toggleDashboardWidget('osmose', this.checked)"><span>Osmose</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.dosing ? 'checked' : ''} onchange="toggleDashboardWidget('dosing', this.checked)"><span>Vorratsbehälter</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.measurements ? 'checked' : ''} onchange="toggleDashboardWidget('measurements', this.checked)"><span>Diagramme</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.logs ? 'checked' : ''} onchange="toggleDashboardWidget('logs', this.checked)"><span>Letzte Aktionen</span></label>
                        <label class="dashboard-chip-toggle"><input type="checkbox" ${settings.widgets.corals ? 'checked' : ''} onchange="toggleDashboardWidget('corals', this.checked)"><span>Korallen</span></label>
                    </div>
                    <div class="tool-grid">
                        <div class="input-group">
                            <label for="dashboardRangeSelect">Diagramm-Zeitraum</label>
                            <select id="dashboardRangeSelect" onchange="setDashboardRange(this.value)">
                                <option value="14" ${settings.range === '14' ? 'selected' : ''}>14 Tage</option>
                                <option value="30" ${settings.range === '30' ? 'selected' : ''}>30 Tage</option>
                                <option value="90" ${settings.range === '90' ? 'selected' : ''}>90 Tage</option>
                                <option value="365" ${settings.range === '365' ? 'selected' : ''}>1 Jahr</option>
                                <option value="all" ${settings.range === 'all' ? 'selected' : ''}>Alles</option>
                            </select>
                        </div>
                    </div>
                    <div class="dashboard-widget-grid">
                        ${measurementChooser}
                    </div>
                    <div class="dashboard-edit-actions">
                        <button type="button" class="btn btn-secondary" onclick="cancelDashboardEdit()">Abbrechen</button>
                        <button type="button" class="btn btn-secondary" onclick="resetDashboardEdit()">Zurücksetzen</button>
                        <button type="button" class="btn btn-primary" onclick="applyDashboardEdit()">Übernehmen</button>
                    </div>
                </div>
            </div>
        </section>` : ''}

        <section class="dashboard-panels" aria-label="Dashboard-Widgets">
            ${settings.widgets.stock ? `
            <article class="dashboard-panel dashboard-widget dashboard-widget--list ${alerts.length ? 'dashboard-widget--warning' : ''}">
                <div class="dashboard-widget-head"><h3>Kritische Produkte</h3><span class="status-badge ${alerts.length ? 'status-badge--danger' : 'status-badge--success'}">${alerts.length ? `${alerts.length} offen` : 'Keine Warnung'}</span></div>
                ${criticalRows || '<div class="empty-state dashboard-empty-state"><strong class="empty-state-title">Alles im grünen Bereich</strong><p class="empty-state-text">Keine kritischen Lagerwaren im aktuellen Warnzeitraum.</p></div>'}
            </article>` : ''}
            ${settings.widgets.todos ? `
            <article class="dashboard-panel dashboard-widget dashboard-widget--status">
                <div class="dashboard-widget-head"><h3>Nächste Aufgabe</h3>${nextTodo?.isDue ? '<span class="status-badge status-badge--warning">Fällig</span>' : ''}</div>
                ${nextTodo ? `
                    <div class="dashboard-next">
                        <strong>${escapeHtml(nextTodo.title)}</strong>
                        <small>${escapeHtml(nextTodo.category || 'Wartung')} · ${formatWarehouseDate(nextTodo.dueAt)}</small>
                        <div class="dashboard-widget-actions"><button type="button" class="btn btn-secondary" onclick="completeAquariumTodo('${nextTodo.id}')">Erledigt</button><button type="button" class="btn btn-secondary" onclick="openDashboardDestination('todos')">Öffnen</button></div>
                    </div>
                ` : '<div class="empty-state dashboard-empty-state"><strong class="empty-state-title">Keine ToDos geplant</strong><p class="empty-state-text">Neue Aufgaben kannst du im Logbuch anlegen.</p></div>'}
            </article>` : ''}
            ${settings.widgets.logs ? `
            <article class="dashboard-panel dashboard-widget dashboard-widget--list">
                <div class="dashboard-widget-head"><h3>Letzte Buchung</h3></div>
                <p class="hint">${escapeHtml(lastLogText)}</p>
                <div class="dashboard-subtle-list">
                    <span>Letztes Logbuch:</span>
                    <strong>${recentLogBookEntry ? escapeHtml(recentLogBookEntry.title || recentLogBookEntry.category) : 'Noch kein Eintrag'}</strong>
                    <small>${recentLogBookEntry ? formatWarehouseDate(recentLogBookEntry.at || recentLogBookEntry.createdAt) : ''}</small>
                </div>
                <div class="dashboard-widget-actions"><button type="button" class="btn btn-secondary" onclick="openDashboardDestination('protocol')">Protokoll</button><button type="button" class="btn btn-secondary" onclick="openDashboardDestination('logbook-entry')">Logbuch</button></div>
            </article>` : ''}
            ${settings.widgets.osmose ? `
            <article class="dashboard-panel dashboard-widget dashboard-widget--status">
                <div class="dashboard-widget-head"><h3>Osmosevorrat</h3></div>
                <p class="hint">${(parseFloat(osmose.currentLiters) || 0).toFixed(1)} von ${(parseFloat(osmose.capacityLiters) || 0).toFixed(1)} Litern verfügbar.</p>
                <progress class="dashboard-progress" max="100" value="${Math.max(0, Math.min(100, ((parseFloat(osmose.currentLiters) || 0) / Math.max(1, parseFloat(osmose.capacityLiters) || 1)) * 100))}" aria-label="Osmosefüllstand in Prozent"></progress>
                <button type="button" class="btn btn-secondary dashboard-widget-open" onclick="openDashboardDestination('osmose')">Osmosetank öffnen</button>
            </article>` : ''}
            ${settings.widgets.dosing ? `
            <article class="dashboard-panel dashboard-widget dashboard-widget--list">
                <div class="dashboard-widget-head"><h3>Vorratsbehälter</h3>${dosingCritical.length ? `<span class="status-badge status-badge--warning">${dosingCritical.length} knapp</span>` : '<span class="status-badge status-badge--success">Stabil</span>'}</div>
                ${dosingCritical.length ? dosingCritical.slice(0, 3).map(entry => `
                    <div class="dashboard-subtle-list">
                        <strong>${escapeHtml(entry.name || 'Behälter')}</strong>
                        <small>${(parseFloat(entry.currentMl) || 0).toFixed(0)} / ${(parseFloat(entry.capacityMl) || 0).toFixed(0)} ml</small>
                    </div>
                `).join('') : '<p class="hint">Aktuell kein Behälter im kritischen Bereich.</p>'}
                <button type="button" class="btn btn-secondary dashboard-widget-open" onclick="openDashboardDestination('dosing')">Behälter öffnen</button>
            </article>` : ''}
            ${settings.widgets.corals ? `
            <article class="dashboard-panel dashboard-widget dashboard-widget--status">
                <div class="dashboard-widget-head"><h3>Korallen im Fokus</h3></div>
                <p class="hint">${coralCount ? `${coralCount} Korallen gespeichert und durchsuchbar.` : 'Noch keine Korallen angelegt.'}</p>
                <button type="button" class="btn btn-secondary dashboard-widget-open" onclick="openDashboardDestination('corals')">${coralCount ? 'Korallen öffnen' : 'Erste Koralle anlegen'}</button>
            </article>` : ''}
        </section>

        ${settings.widgets.measurements ? `
        <section class="dashboard-measurements-grid">
            ${pinnedMeasurementCards || '<div class="dashboard-panel dashboard-widget dashboard-widget--wide empty-state"><strong class="empty-state-title">Noch keine Diagramme</strong><p class="empty-state-text">Wähle im Bearbeitungsmodus Messwerte aus oder trage zuerst Messungen im Logbuch ein.</p></div>'}
        </section>` : ''}
    `;
    renderAquariumWorkspacePanels();
}

function finishOnboarding() {
    db.onboardingDone = true;
    saveDB();
    renderDashboard();
}

function getCoralCatalog() {
    if (!db.coralCatalog || !Array.isArray(db.coralCatalog)) db.coralCatalog = [];
    return db.coralCatalog;
}

function getCoralTransfers() {
    if (!db.coralTransfers || !Array.isArray(db.coralTransfers)) db.coralTransfers = [];
    return db.coralTransfers;
}

function getCoralById(id) {
    return getCoralCatalog().find(entry => entry.id === id) || null;
}

function normalizeCoralStatus(status) {
    const value = (status || '').toLowerCase();
    if (value === 'frag') return 'ableger';
    if (value === 'beobachten' || value === 'stabil' || value === 'wachsend') return 'bestand';
    if (CORAL_STATUS_OPTIONS.some(option => option.value === value)) return value;
    return 'bestand';
}

function getCoralStatusLabel(status) {
    return CORAL_STATUS_OPTIONS.find(option => option.value === status)?.label || 'Bestandskoralle';
}

function getCoralDisplayName(coral = {}) {
    return coral.name || coral.tradeName || coral.scientificName || coral.species || 'Koralle';
}

function getCoralOptionalDisplayName(coral = null) {
    if (!coral) return '-';
    return getCoralDisplayName(coral);
}

function getCoralPhotoList(coral = null) {
    if (!coral) return [];
    if (Array.isArray(coral.photoGallery) && coral.photoGallery.length) return coral.photoGallery.filter(Boolean);
    if (coral.photoDataUrl) return [coral.photoDataUrl];
    return [];
}

function getMotherCoralOptions(currentId = '') {
    return getCoralCatalog()
        .filter(entry => entry.id !== currentId)
        .sort((a, b) => getCoralDisplayName(a).localeCompare(getCoralDisplayName(b), 'de'));
}

function renderMotherCoralOptions(selectedId = '', currentId = '') {
    const select = document.getElementById('coralMotherId');
    if (!select) return;
    const options = getMotherCoralOptions(currentId);
    select.innerHTML = [
        '<option value="">Keine Mutterkoralle zugewiesen</option>',
        ...options.map(entry => `<option value="${escapeHtml(entry.id)}">${escapeHtml(getCoralDisplayName(entry))}</option>`)
    ].join('');
    select.value = selectedId || '';
}

function updateCoralMotherFieldVisibility() {
    const wrapper = document.getElementById('coralMotherField');
    const select = document.getElementById('coralStatus');
    const status = normalizeCoralStatus(select?.value || '');
    if (!wrapper) return;
    wrapper.classList.toggle('is-hidden', status !== 'ableger');
}

function getCoralFormData() {
    const scientificName = (document.getElementById('coralScientificName')?.value || '').trim();
    const tradeName = (document.getElementById('coralTradeName')?.value || '').trim();
    return {
        name: tradeName || scientificName || 'Koralle',
        scientificName,
        genus: (document.getElementById('coralGenus')?.value || '').trim(),
        speciesName: (document.getElementById('coralSpeciesName')?.value || '').trim(),
        species: scientificName,
        coralType: document.getElementById('coralType')?.value || '',
        tradeName,
        status: normalizeCoralStatus('bestand'),
        motherCoralId: '',
        addedAt: '',
        growthForm: document.getElementById('coralGrowthForm')?.value || '',
        color: (document.getElementById('coralColor')?.value || '').trim(),
        note: ''
    };
}

function applyCoralFormData(data = {}) {
    const map = {
        coralScientificName: data.scientificName || '',
        coralGenus: data.genus || '',
        coralSpeciesName: data.speciesName || '',
        coralType: data.coralType || '',
        coralTradeName: data.tradeName || '',
        coralGrowthForm: data.growthForm || '',
        coralColor: data.color || ''
    };
    Object.entries(map).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    });
}

function resetCoralForm() {
    coralUiState.editingId = null;
    coralUiState.pendingPhotos = [];
    coralUiState.photosCleared = false;
    ['coralScientificName', 'coralGenus', 'coralSpeciesName', 'coralTradeName', 'coralColor', 'coralSearch'].forEach(id => {
        const el = document.getElementById(id);
        if (el && id !== 'coralSearch') el.value = '';
    });
    const defaultSelects = {
        coralType: '',
        coralGrowthForm: ''
    };
    Object.entries(defaultSelects).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    });
    ['coralPhotoLibraryInput', 'coralPhotoCameraInput'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const preview = document.getElementById('coralPhotoPreview');
    if (preview) preview.innerHTML = '<span>Noch kein Foto gewählt</span>';
    updateCoralFormMode();
}

function updateCoralFormMode() {
    const title = document.getElementById('coralFormTitle');
    const saveButton = document.getElementById('coralSaveButton');
    const status = document.getElementById('coralFormStatus');
    const editing = Boolean(coralUiState.editingId);
    if (title) title.innerText = editing ? 'Koralle bearbeiten' : 'Koralle anlegen';
    if (saveButton) saveButton.innerText = editing ? 'Änderungen speichern' : 'Koralle speichern';
    if (status) status.innerHTML = editing
        ? '<span class="status-badge status-warning">Bearbeitungsmodus</span><span>Abbrechen setzt das Formular ohne Speicherung zurück.</span>'
        : '<span class="status-badge status-neutral">Neuer Eintrag</span>';
}

function renderCoralPhotoPreview(dataUrl = '') {
    const preview = document.getElementById('coralPhotoPreview');
    if (!preview) return;
    const photos = Array.isArray(dataUrl) ? dataUrl : (dataUrl ? [dataUrl] : []);
    preview.innerHTML = photos.length
        ? photos.map((url, index) => `<img src="${url}" alt="Korallenfoto ${index + 1}">`).join('')
        : '<span>Noch kein Foto gewählt</span>';
}

function handleCoralPhotoSelection(event) {
    const files = Array.from(event?.target?.files || []).filter(Boolean);
    if (!files.length) return;
    Promise.all(files.map(file => new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
    }))).then(results => {
        const newPhotos = results.filter(Boolean);
        if (newPhotos.length) coralUiState.photosCleared = false;
        coralUiState.pendingPhotos = [...coralUiState.pendingPhotos, ...newPhotos];
        renderCoralPhotoPreview(coralUiState.pendingPhotos);
    });
}

function clearCoralPhoto() {
    if (!coralUiState.pendingPhotos.length) return;
    if (!confirm('Alle ausgewählten Korallenbilder aus diesem Eintrag entfernen?')) return;
    coralUiState.pendingPhotos = [];
    coralUiState.photosCleared = true;
    renderCoralPhotoPreview([]);
    ['coralPhotoLibraryInput', 'coralPhotoCameraInput'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
}

function saveCoralEntry() {
    const form = getCoralFormData();
    if (!form.scientificName && !form.tradeName) return alert('Bitte gib mindestens einen wissenschaftlichen Namen oder einen Handelsnamen ein.');
    const target = coralUiState.editingId ? getCoralById(coralUiState.editingId) : null;
    const photoGallery = coralUiState.photosCleared
        ? []
        : (coralUiState.pendingPhotos.length ? [...coralUiState.pendingPhotos] : getCoralPhotoList(target));
    const photo = photoGallery[0] || '';
    if (target) {
        Object.assign(target, {
            ...form,
            photoGallery,
            photoDataUrl: photo,
            updatedAt: new Date().toISOString()
        });
        showToast('Koralle aktualisiert', 'success', 2200);
    } else {
        getCoralCatalog().unshift({
            id: createWarehouseId(),
            ...form,
            photoGallery,
            photoDataUrl: photo,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastSeenAt: null
        });
        showToast('Koralle angelegt', 'success', 2200);
    }
    saveDB();
    resetCoralForm();
    renderCoralCatalog();
    renderDashboard();
}

function editCoralEntry(id) {
    const coral = getCoralById(id);
    if (!coral) return;
    coralUiState.editingId = id;
    coralUiState.pendingPhotos = getCoralPhotoList(coral);
    coralUiState.photosCleared = false;
    applyCoralFormData(coral);
    renderCoralPhotoPreview(coralUiState.pendingPhotos);
    updateCoralFormMode();
    document.getElementById('coralScientificName')?.focus();
}

function archiveCoralTransfer(id) {
    const coral = getCoralById(id);
    if (!coral) return;
    const recipientName = (prompt(`An wen wurde "${getCoralDisplayName(coral)}" abgegeben?`, '') || '').trim();
    if (!recipientName) return;
    const recipientContact = (prompt('Kontaktmöglichkeit (optional):', '') || '').trim();
    const transferNote = (prompt('Notiz zur Abgabe (optional):', '') || '').trim();
    getCoralTransfers().unshift({
        id: createWarehouseId(),
        coralId: coral.id,
        coralSnapshot: cloneSerializable(coral),
        recipientName,
        recipientContact,
        note: transferNote,
        transferredAt: new Date().toISOString()
    });
    db.coralCatalog = getCoralCatalog().filter(entry => entry.id !== id);
    if (coralUiState.editingId === id) resetCoralForm();
    saveDB();
    renderCoralCatalog();
    renderDashboard();
    showToast('Koralle als Abgabe archiviert', 'success', 2400);
}

function deleteCoralEntry(id) {
    const coral = getCoralById(id);
    if (!coral) return;
    const choice = prompt(
        `Was möchtest du mit "${getCoralDisplayName(coral)}" machen?\n\n1 = endgültig löschen\n2 = als Abgabe archivieren\n\nNummer eingeben:`,
        '2'
    );
    if (choice === null) return;
    if (choice.trim() === '2') {
        archiveCoralTransfer(id);
        return;
    }
    if (choice.trim() !== '1') return;
    if (!confirm(`Koralle "${getCoralDisplayName(coral)}" endgültig löschen?`)) return;
    db.coralCatalog = getCoralCatalog().filter(entry => entry.id !== id);
    if (coralUiState.editingId === id) resetCoralForm();
    saveDB();
    renderCoralCatalog();
    renderDashboard();
}

function renderCoralTransfers() {
    const transfersList = document.getElementById('coralTransferList');
    if (!transfersList) return;
    const transfers = getCoralTransfers().slice().sort((a, b) => new Date(b.transferredAt || 0) - new Date(a.transferredAt || 0));
    transfersList.innerHTML = transfers.length
        ? transfers.map(entry => `
            <article class="coral-transfer-card">
                <div class="coral-transfer-head">
                    <strong>${escapeHtml(getCoralDisplayName(entry.coralSnapshot || {}))}</strong>
                    <small>${formatWarehouseDate(entry.transferredAt)}</small>
                </div>
                <div class="coral-meta-grid">
                    <span><strong>An</strong><small>${escapeHtml(entry.recipientName || '-')}</small></span>
                    <span><strong>Kontakt</strong><small>${escapeHtml(entry.recipientContact || '-')}</small></span>
                    <span><strong>Typ</strong><small>${escapeHtml(entry.coralSnapshot?.coralType || entry.coralSnapshot?.species || '-')}</small></span>
                </div>
                <p class="hint">${escapeHtml(entry.note || 'Keine weitere Notiz gespeichert.')}</p>
            </article>
        `).join('')
        : '<div class="coral-empty-state"><strong>Noch keine Abgaben</strong><p>Abgegebene Korallen bleiben hier mit Empfänger und Kontakt nachvollziehbar.</p></div>';
}

function renderCoralCatalog() {
    renderAquariumWorkspacePanels();
    const list = document.getElementById('coralCatalogList');
    const stats = document.getElementById('coralLibraryStats');
    if (!list) return;
    const search = (document.getElementById('coralSearch')?.value || '').trim().toLowerCase();
    const statusFilter = document.getElementById('coralStatusFilter')?.value || 'all';
    const filterStatus = document.getElementById('coralFilterStatus');
    const corals = getCoralCatalog()
        .map(entry => ({ ...entry, status: normalizeCoralStatus(entry.status || 'bestand') }))
        .filter(entry => statusFilter === 'all' || entry.status === statusFilter)
        .filter(entry => {
            if (!search) return true;
            return [entry.name, entry.species, entry.color, entry.tradeName, entry.scientificName, entry.genus, entry.speciesName].join(' ').toLowerCase().includes(search);
        })
        .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
    if (!coralUiState.editingId && !coralUiState.pendingPhotos.length) renderCoralPhotoPreview([]);
    updateCoralFormMode();
    if (stats) {
        stats.innerHTML = `
            <span><strong>${getCoralCatalog().length}</strong><small>gesamt</small></span>
            <span><strong>${getCoralCatalog().filter(entry => normalizeCoralStatus(entry.status || 'bestand') === 'ableger').length}</strong><small>Ableger</small></span>
            <span><strong>${getCoralTransfers().length}</strong><small>abgegeben</small></span>
        `;
    }
    if (filterStatus) {
        const active = [search ? `Suche „${search}“` : '', statusFilter !== 'all' ? getCoralStatusLabel(statusFilter) : ''].filter(Boolean);
        filterStatus.innerHTML = `<span><strong>${corals.length}</strong> ${corals.length === 1 ? 'Koralle' : 'Korallen'}</span>${active.length ? `<span class="status-badge status-info">${active.map(escapeHtml).join(' · ')}</span>` : '<span class="status-badge status-neutral">Gesamter Bestand</span>'}`;
    }
    renderCoralTransfers();
    if (!corals.length) {
        const filtered = Boolean(search) || statusFilter !== 'all';
        list.innerHTML = `<div class="coral-empty-state" role="status"><strong>${filtered ? 'Keine passenden Korallen' : 'Noch keine Korallen'}</strong><p>${filtered ? 'Passe Suche oder Statusfilter an.' : 'Lege die erste Koralle an und dokumentiere deinen Bestand.'}</p>${filtered ? '<button type="button" class="btn-secondary" onclick="resetCoralFilters()">Filter zurücksetzen</button>' : ''}</div>`;
        return;
    }
    list.innerHTML = corals.map(coral => `
        <article class="coral-card ${coralUiState.editingId === coral.id ? 'active' : ''}">
            <div class="coral-card-media">
                ${getCoralPhotoList(coral)[0] ? `<img src="${getCoralPhotoList(coral)[0]}" alt="${escapeHtml(coral.name)}">` : '<div class="coral-card-placeholder">Kein Foto</div>'}
            </div>
            <div class="coral-card-body">
                <div class="coral-card-head">
                    <div>
                        <h4>${escapeHtml(coral.name)}</h4>
                        <small>${escapeHtml(coral.scientificName || coral.tradeName || 'Art nicht eingetragen')}</small>
                    </div>
                    <span class="coral-status-badge coral-status-${escapeHtml(coral.status || 'bestand')}">${escapeHtml(getCoralStatusLabel(coral.status || 'bestand'))}</span>
                </div>
                <div class="coral-meta-grid">
                    ${coral.genus ? `<span><strong>Gattung</strong><small>${escapeHtml(coral.genus)}</small></span>` : ''}
                    ${coral.speciesName ? `<span><strong>Art</strong><small>${escapeHtml(coral.speciesName)}</small></span>` : ''}
                    ${coral.coralType ? `<span><strong>Typ</strong><small>${escapeHtml(coral.coralType)}</small></span>` : ''}
                    ${coral.growthForm ? `<span><strong>Wuchsform</strong><small>${escapeHtml(coral.growthForm)}</small></span>` : ''}
                    ${coral.color ? `<span><strong>Farbe</strong><small>${escapeHtml(coral.color)}</small></span>` : ''}
                    <span><strong>Fotos</strong><small>${getCoralPhotoList(coral).length || 0}</small></span>
                </div>
                <div class="btn-group coral-card-actions">
                    <button class="btn-secondary btn-animated" onclick="editCoralEntry('${coral.id}')">Bearbeiten</button>
                    <button class="btn-out btn-animated" onclick="deleteCoralEntry('${coral.id}')">Abgeben / Löschen</button>
                </div>
            </div>
        </article>
    `).join('');
}

function resetCoralFilters() {
    const search = document.getElementById('coralSearch');
    const status = document.getElementById('coralStatusFilter');
    if (search) search.value = '';
    if (status) status.value = 'all';
    renderCoralCatalog();
}

function openQuickActionMenu() {
    const activeTab = getActiveTabId();
    const actions = [
        { label: 'Einlagern', run: () => openSmartStockModal('in') },
        { label: 'Auslagern', run: () => openSmartStockModal('out') },
        { label: 'Neuer Log', run: () => selectTab('logbuch') },
        { label: 'Tool öffnen', run: () => selectTab('tools') }
    ];
    if (activeTab === 'logbuch') actions.unshift({ label: 'Neue ToDo', run: () => { selectTab('logbuch'); document.getElementById('todoTitle')?.focus(); } });
    const choice = prompt(`Schnellaktion:\n${actions.map((action, index) => `${index + 1}. ${action.label}`).join('\n')}\n\nNummer eingeben:`, '1');
    if (choice === null) return;
    const selected = actions[(parseInt(choice, 10) || 1) - 1];
    if (selected) selected.run();
}

function openSmartStockModal(action) {
    if (!requireWarehouseWriteAccess(action === 'in' ? 'Einlagern' : 'Auslagern')) return;
    const visibleItems = [];
    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            if (!isProductHidden(item)) visibleItems.push({ cat, item });
        }
    }
    const term = prompt(`${action === 'in' ? 'Einlagern' : 'Auslagern'}: Produktname suchen`, '');
    if (term === null) return;
    const query = term.trim().toLowerCase();
    const matches = visibleItems.filter(entry => entry.item.toLowerCase().includes(query)).slice(0, 8);
    if (matches.length === 0) return alert('Kein passendes Produkt gefunden.');
    const selectedIndex = matches.length === 1 ? 0 : (parseInt(prompt(matches.map((entry, index) => `${index + 1}. ${entry.item}`).join('\n') + '\n\nNummer auswählen:', '1'), 10) || 1) - 1;
    const selected = matches[selectedIndex];
    if (selected) openModal(selected.cat, selected.item, action);
}

function focusProductInLager(item) {
    const input = document.getElementById('searchInput');
    if (input) input.value = item;
    filterLager();
    document.getElementById('lager-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function switchWarehouse(id) {
    if (!appState || !appState.warehouses || !appState.warehouses[id] || id === activeWarehouseId) {
        updateWarehouseUI();
        return;
    }

    const current = getActiveWarehouse();
    if (current) current.data = db;
    syncActiveAquariumDataFromDb(false);
    dashboardEditDraft = null;
    activeWarehouseId = id;
    appState.activeWarehouseId = id;
    const next = getActiveWarehouse();
    next.data = normalizeWarehouseData(next.data);
    db = next.data;
    overlayActiveAquariumData();
    applyTheme(db.theme || 'default', false);
    saveDB(false);
    renderCurrentWarehouseViews();
    if (WAREHOUSE_WRITE_TAB_IDS.has(getActiveTabId()) && isWarehouseReadOnlyView()) showTab('lager');
}

function switchAquarium(id) {
    if (!appState || !appState.aquariums || !appState.aquariums[id] || id === activeAquariumId) {
        renderAquariumWorkspacePanels();
        return;
    }
    syncActiveAquariumDataFromDb();
    dashboardEditDraft = null;
    activeAquariumId = id;
    appState.activeAquariumId = id;
    overlayActiveAquariumData();
    saveDB(false);
    renderCurrentWarehouseViews();
}

function createAquarium() {
    const name = prompt('Name für das neue Aquarium:', `Aquarium ${Object.keys(appState.aquariums || {}).length + 1}`);
    if (!name || !name.trim()) return;
    const record = createAquariumRecord(name.trim(), db);
    appState.aquariums[record.id] = record;
    switchAquarium(record.id);
}

function renameAquarium() {
    const aquarium = getActiveAquarium();
    if (!aquarium) return;
    const name = prompt('Neuer Name für dieses Aquarium:', aquarium.name);
    if (!name || !name.trim()) return;
    aquarium.name = name.trim();
    saveDB(false);
    renderAquariumWorkspacePanels();
}

function deleteAquarium() {
    const aquarium = getActiveAquarium();
    if (!aquarium) return;
    const ids = Object.keys(appState.aquariums || {});
    if (ids.length <= 1) return alert('Es muss mindestens ein Aquarium vorhanden bleiben.');
    if (!confirm(`Aquarium "${aquarium.name}" wirklich löschen? Logbuch, Messwerte, ToDos und Tool-Daten dieses Aquariums werden entfernt.`)) return;
    delete appState.aquariums[aquarium.id];
    activeAquariumId = Object.keys(appState.aquariums)[0];
    appState.activeAquariumId = activeAquariumId;
    overlayActiveAquariumData();
    saveDB(false);
    renderCurrentWarehouseViews();
}

async function createWarehouse() {
    const name = await appPrompt('Lege einen eindeutigen Namen für das neue Lager fest.', `Lager ${Object.keys(appState.warehouses || {}).length + 1}`, {
        title: 'Neues Lager',
        label: 'Lagername',
        required: true,
        confirmText: 'Lager erstellen'
    });
    if (!name || !name.trim()) return;
    const record = createWarehouseRecord(name.trim(), { theme: db.theme, settings: { forecastWeeks: (db.settings && db.settings.forecastWeeks) || 4 } });
    appState.warehouses[record.id] = record;
    switchWarehouse(record.id);
}

async function renameWarehouse() {
    const warehouse = getActiveWarehouse();
    if (!warehouse) return;
    if (warehouse.isShared || warehouse.readOnly) {
        await appAlert('Geteilte Lager können lokal nicht umbenannt werden.', { title: 'Nur Ansicht', type: 'warning' });
        return;
    }
    const name = await appPrompt(`Du benennst das aktive Lager „${warehouse.name}“ um.`, warehouse.name, {
        title: 'Lager umbenennen',
        label: 'Neuer Lagername',
        required: true,
        confirmText: 'Namen übernehmen'
    });
    if (!name || !name.trim()) return;
    warehouse.name = name.trim();
    saveDB();
}

async function deleteWarehouse() {
    const warehouse = getActiveWarehouse();
    if (!warehouse) return;
    if (warehouse.isShared || warehouse.readOnly) {
        await appAlert('Geteilte Lager können hier nicht gelöscht werden.', { title: 'Nur Ansicht', type: 'warning' });
        return;
    }
    const ids = Object.keys(appState.warehouses || {});
    if (ids.length <= 1) {
        await appAlert('Es muss mindestens ein Lager vorhanden bleiben.', { title: 'Lager bleibt erhalten', type: 'warning' });
        return;
    }
    const confirmed = await appConfirm(`Lager „${warehouse.name}“ wirklich löschen? Bestand, Statistik, Protokoll und Einstellungen dieses Lagers werden entfernt.`, {
        title: 'Lager löschen',
        type: 'danger',
        confirmText: 'Lager löschen'
    });
    if (!confirmed) return;
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

function renderAquariumWorkspacePanels() {
    const aquarium = getActiveAquarium();
    const options = Object.values(appState?.aquariums || {}).map(entry => `
        <option value="${entry.id}" ${entry.id === activeAquariumId ? 'selected' : ''}>${escapeHtml(entry.name)}</option>
    `).join('');
    const panelHtml = (selectId) => `
        <div class="aquarium-workspace-head">
            <div>
                <span>Aktives Aquarium</span>
                <strong>${escapeHtml(aquarium?.name || 'Aquarium')}</strong>
            </div>
            <div class="aquarium-workspace-actions">
                <button type="button" onclick="createAquarium()">Neu</button>
                <button type="button" onclick="renameAquarium()">Umbenennen</button>
                <button type="button" onclick="deleteAquarium()">Löschen</button>
            </div>
        </div>
        <div class="aquarium-workspace-select">
            <select id="${selectId}" onchange="switchAquarium(this.value)" aria-label="Aquarium wechseln">${options}</select>
            <small>Tools, Logbuch, ToDos und Messwerte folgen dem Aquarium und nicht dem Lager.</small>
        </div>
    `;
    const toolsPanel = document.getElementById('toolsAquariumPanel');
    const logbookPanel = document.getElementById('logbookAquariumPanel');
    const coralPanel = document.getElementById('coralAquariumPanel');
    const dashboardPanel = document.getElementById('dashboardAquariumPanel');
    if (toolsPanel) toolsPanel.innerHTML = panelHtml('toolsAquariumSelect');
    if (logbookPanel) logbookPanel.innerHTML = panelHtml('logbookAquariumSelect');
    if (coralPanel) coralPanel.innerHTML = panelHtml('coralAquariumSelect');
    if (dashboardPanel) dashboardPanel.innerHTML = panelHtml('dashboardAquariumSelect');
}

function updateTabAccessState() {
    const restricted = isWarehouseReadOnlyView();
    WAREHOUSE_WRITE_TAB_IDS.forEach(tabId => {
        const button = document.getElementById('tab-' + tabId);
        if (button) {
            button.disabled = restricted;
            button.classList.toggle('nav-tab-disabled', restricted);
            button.title = restricted ? 'In diesem geteilten Lager nur mit Schreibzugriff verfügbar' : '';
        }
        document.querySelectorAll(`.mobile-bottom-nav button[data-tab="${tabId}"]`).forEach(btn => {
            btn.disabled = restricted;
            btn.classList.toggle('nav-tab-disabled', restricted);
        });
    });
}

let menuScrollLockY = 0;
const activeScrollLocks = new Set();

function syncBodyScrollLock() {
    const shouldLock = activeScrollLocks.size > 0;
    if (shouldLock) {
        if (!document.body.classList.contains('scroll-locked')) {
            menuScrollLockY = window.scrollY || window.pageYOffset || 0;
            document.body.classList.add('scroll-locked');
            document.body.style.position = 'fixed';
            document.body.style.top = `-${menuScrollLockY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
        }
        return;
    }
    if (!document.body.classList.contains('scroll-locked')) return;
    document.body.classList.remove('scroll-locked');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, menuScrollLockY || 0);
}

function acquireBodyScrollLock(lockId) {
    if (!lockId) return;
    activeScrollLocks.add(lockId);
    syncBodyScrollLock();
}

function releaseBodyScrollLock(lockId) {
    if (!lockId) return;
    activeScrollLocks.delete(lockId);
    syncBodyScrollLock();
}

function setMenuOpenState(isOpen) {
    const nav = document.getElementById('main-nav');
    const backdrop = document.getElementById('menu-backdrop');
    if (!nav || !backdrop) return;
    const toggle = document.querySelector('.menu-toggle');
    if (toggle) {
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    }

    if (isOpen) {
        nav.classList.add('open');
        backdrop.classList.add('open');
        document.body.classList.add('menu-open');
        acquireBodyScrollLock('menu');
        return;
    }

    nav.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
    releaseBodyScrollLock('menu');
}

// --- UI / MENÜ STEUERUNG ---
function toggleMenu() {
    const isOpen = document.getElementById('main-nav')?.classList.contains('open');
    setMenuOpenState(!isOpen);
}

function selectTab(tabId) {
    if (isMenuTabHidden(tabId)) {
        tabId = getFirstVisibleTab();
    }
    showTab(tabId);
    setMenuOpenState(false);
}

function showTab(tabId) {
    if (isMenuTabHidden(tabId)) {
        tabId = getFirstVisibleTab();
    }
    if (WAREHOUSE_WRITE_TAB_IDS.has(tabId) && isWarehouseReadOnlyView()) {
        showToast('Dieses geteilte Lager ist nur lesbar. Für diesen Bereich brauchst du Schreibzugriff.', 'warning', 3600);
        tabId = 'lager';
    }
    applyMenuOrder();
    const targetTab = document.getElementById(tabId);
    const targetBtn = document.getElementById('tab-' + tabId);
    if (!targetTab || !targetBtn) tabId = 'lager';

    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-links button').forEach(el => {
        el.classList.remove('active');
        el.removeAttribute('aria-current');
    });
    
    const resolvedTab = document.getElementById(tabId);
    const resolvedBtn = document.getElementById('tab-' + tabId);
    if (resolvedTab && resolvedBtn) {
        // Re-trigger the slide-in animation by briefly removing the class
        resolvedTab.style.animation = 'none';
        resolvedTab.offsetHeight; // Force reflow
        resolvedTab.style.animation = '';
        resolvedTab.classList.add('active');
        resolvedBtn.classList.add('active');
        resolvedBtn.setAttribute('aria-current', 'page');
    }
    document.querySelectorAll('.mobile-bottom-nav button').forEach(btn => {
        const isActive = btn.dataset.tab === tabId;
        btn.classList.toggle('active', isActive);
        if (isActive) btn.setAttribute('aria-current', 'page');
        else btn.removeAttribute('aria-current');
    });
    const activePageTitle = document.getElementById('activePageTitle');
    if (activePageTitle) activePageTitle.textContent = TAB_LABELS[tabId] || tabId;
    const header = document.getElementById('appHeader');
    if (header) header.classList.toggle('warehouse-tools-hidden', tabId !== 'lager');
    document.body.dataset.activeTab = tabId;
    db.lastTab = tabId;
    try { localStorage.setItem(LAST_TAB_KEY, tabId); } catch(e) {}
    try {
        const nextHash = '#' + encodeURIComponent(tabId);
        if (window.location.hash !== nextHash) history.replaceState(null, '', nextHash);
    } catch(e) {}
    saveDB(false);
    
    if(tabId === 'uebersicht') renderDashboard();
    if(tabId === 'lager') renderLager();
    if(tabId === 'cr-export') {
        syncCRPreferredUnitUI();
        setupPriority4CalculatorUI();
    }
    if(tabId === 'statistik') renderStats();
    if(tabId === 'trace-export') {
        renderTraceExportInputs();
        renderTraceCalculator();
        setupPriority4CalculatorUI();
    }
    if(tabId === 'log') renderLogs();
    if(tabId === 'masseneingang') {
        initBulkProductSelect();
        renderBulkCart();
    }
    if(tabId === 'nachbestellen') renderNachbestellen();
    if(tabId === 'tools') initTools();
    if(tabId === 'logbuch') renderLogBook();
    if(tabId === 'korallen') renderCoralCatalog();
    if(tabId === 'einstellungen') {
        setupSettingsAccordions();
        updateNotificationStatus();
        renderCustomProductSettings();
        renderCustomContainers();
        renderProductVisibilitySettings();
        renderShopLinkSettings();
        renderProductPresets();
        renderSupabaseSyncSettings();
        renderMenuOrderSettings();
        renderLocalDeviceSettings();
        renderWavePumpDemoSettings();
    }
    scheduleTextFitPass();
}

const TEXT_FIT_SELECTOR = [
    'button:not(.btn-icon):not(.close-menu)',
    '.btn',
    '.btn-primary',
    '.btn-secondary',
    '.btn-cancel',
    '.btn-danger',
    '.btn-warning',
    '.btn-ghost',
    '.btn-in',
    '.btn-out',
    '.nav-links button',
    '.mobile-bottom-nav button',
    '.tool-section-summary strong',
    '.tool-section-summary small',
    '.tool-tile-card h3',
    '.tool-compact-card h3',
    '.tool-row > span:first-child',
    '.dashboard-tile > span',
    '.dashboard-tile > strong',
    '.dashboard-list-row strong',
    '.inventory-card h4',
    '.inventory-product-copy strong',
    '.settings-group-nav button',
    '.settings-row-actions button',
    '.coral-card-head strong',
    '.protocol-entry-head strong'
].join(',');

let textFitFrame = 0;
let textFitObserver = null;

function getTextFitMinimumScale(element) {
    if (element.matches('.mobile-bottom-nav button, .nav-links button')) return 0.64;
    if (element.matches('.tool-tile-card h3, .tool-compact-card h3')) return 0.68;
    if (element.matches('button, .btn, .btn-primary, .btn-secondary, .btn-cancel, .btn-danger, .btn-warning, .btn-ghost, .btn-in, .btn-out')) return 0.7;
    return 0.72;
}

function fitTextElement(element) {
    if (!element || !element.isConnected) return;
    const rect = element.getBoundingClientRect();
    if (rect.width < 12 || rect.height < 8) return;

    element.classList.add('text-fit-overflow');
    element.style.setProperty('--text-fit-scale', '1');

    const availableWidth = Math.max(1, element.clientWidth - 2);
    const contentWidth = element.scrollWidth;
    if (contentWidth <= availableWidth + 1) return;

    const minScale = getTextFitMinimumScale(element);
    const fittedScale = Math.max(minScale, Math.min(1, availableWidth / contentWidth));
    element.style.setProperty('--text-fit-scale', fittedScale.toFixed(3));
}

function runTextFitPass(root = document) {
    const scope = root instanceof Element || root === document ? root : document;
    scope.querySelectorAll(TEXT_FIT_SELECTOR).forEach(fitTextElement);
}

function scheduleTextFitPass(root = document) {
    if (textFitFrame) cancelAnimationFrame(textFitFrame);
    textFitFrame = requestAnimationFrame(() => {
        textFitFrame = 0;
        runTextFitPass(root);
    });
}

function initTextFitGuard() {
    scheduleTextFitPass();
    window.addEventListener('resize', () => scheduleTextFitPass(), { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(scheduleTextFitPass, 180), { passive: true });
    if ('MutationObserver' in window) {
        textFitObserver = new MutationObserver(() => scheduleTextFitPass());
        textFitObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
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
    settings.querySelectorAll(':scope > .card, .settings-group-label').forEach(el => {
        el.hidden = false;
    });
}

function getSettingsMeta(title) {
    const normalized = String(title || '').toLowerCase();
    if (/google drive|sync|cloud|teilen|freunde/.test(normalized)) return { group: 'Cloud', hint: 'Google Drive und geräteübergreifende Sicherung', keywords: 'google drive sync cloud upload download wiederherstellen' };
    if (/datenspeicher|sicherung|backup|export|import/.test(normalized)) return { group: 'Sicherung', hint: 'Lokale Sicherungen, Import und Export', keywords: 'sicherung backup export import wiederherstellen datei lokal' };
    if (/menü|navigation|schnellzugriff/.test(normalized)) return { group: 'Navigation', hint: 'Menü, Sichtbarkeit und Schnellzugriff', keywords: 'menü navigation schnellzugriff reihenfolge sichtbar ausblenden' };
    if (/wave|pumpe|pumpensteuerung|lokale geräte|esp32|home assistant|dev/.test(normalized)) return { group: 'Entwicklung', hint: 'ESP32, lokale Geräte und Demo-Bereiche', keywords: 'wave pumpe pumpensteuerung esp32 home assistant dev demo lokal' };
    if (/app|system|update|problem|bug|unterstützen|support/.test(normalized)) return { group: 'Allgemein', hint: 'App, Updates und Hilfe', keywords: 'app system update version bug problem mail unterstützen paypal coffee' };
    if (/benachrichtigung/.test(normalized)) return { group: 'Hinweise', hint: 'Warnungen und Erinnerungen', keywords: 'benachrichtigung warnung push alarm prognose warnzeitraum' };
    if (/behälter|tara|produkte ausblenden|geteilte lager/.test(normalized)) return { group: 'Lager', hint: 'Lageransicht, Behälter und Sichtbarkeit', keywords: 'lager behälter tara leergewicht ausblenden einblenden sichtbarkeit produkte geteilte lager' };
    if (/eigene produkte|produktlisten|preset|shop-links/.test(normalized)) return { group: 'Produkte', hint: 'Eigene Produkte, Listen und Links', keywords: 'produkt eigene waren preset produktlisten shop link größe dichte stück gramm ml' };
    if (/design|effekte|aussehen|farbschema/.test(normalized)) return { group: 'Aussehen', hint: 'Farben, Stil und Animationen', keywords: 'design theme farbe badman light girl mint effekt animation disco aussehen' };
    if (/reset|löschen/.test(normalized)) return { group: 'Zurücksetzen', hint: 'Daten gezielt löschen', keywords: 'reset löschen statistik protokoll lagerbestand daten' };
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
    const groupOrder = ['Allgemein', 'Aussehen', 'Navigation', 'Hinweise', 'Lager', 'Produkte', 'Cloud', 'Sicherung', 'Entwicklung', 'Zurücksetzen', 'Weitere'];
    const cards = Array.from(settings.querySelectorAll(':scope > .card'));
    cards.sort((a, b) => {
        const aIndex = groupOrder.indexOf(a.dataset.settingsGroup || 'Weitere');
        const bIndex = groupOrder.indexOf(b.dataset.settingsGroup || 'Weitere');
        return (aIndex < 0 ? groupOrder.length : aIndex) - (bIndex < 0 ? groupOrder.length : bIndex);
    }).forEach(card => settings.appendChild(card));
    const seen = new Set();
    settings.querySelectorAll(':scope > .card').forEach(card => {
        card.style.display = '';
        const group = card.dataset.settingsGroup || 'Weitere';
        if (seen.has(group)) return;
        seen.add(group);
        const label = document.createElement('div');
        label.className = 'settings-group-label';
        label.dataset.settingsGroupLabel = group;
        label.id = `settings-group-${normalizeSettingsGroupId(group)}`;
        label.innerHTML = `<span>${group}</span>`;
        settings.insertBefore(label, card);
    });
}

function normalizeSettingsGroupId(group) {
    return String(group || 'weitere').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// --- DESIGN / THEME STEUERUNG ---
function applyTheme(themeName, shouldSave = true) {
    // Alle alten Design-Klassen vom Body entfernen
    document.body.classList.remove('theme-girl', 'theme-mint', 'theme-badman', 'theme-light');
    
    if (themeName !== 'default') {
        document.body.classList.add('theme-' + themeName);
    }
    
    db.theme = themeName;
    try {
        localStorage.setItem('reeftools_theme_v1', themeName);
    } catch (error) {
        // The app theme still works when browser storage is unavailable.
    }
    document.querySelectorAll('.app-footer a[href^="impressum.html"], .app-footer a[href^="privacy.html"]').forEach(link => {
        const page = link.getAttribute('href').split('?')[0];
        link.setAttribute('href', `${page}?theme=${encodeURIComponent(themeName)}`);
    });
    if (shouldSave) saveDB();
    
    // Dropdown-Auswahl im Menü synchronisieren, falls geladen
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = themeName;
}

function getLegalModalThemeParam() {
    return encodeURIComponent(db.theme || 'default');
}

function openLegalModal(page = 'impressum') {
    const modal = document.getElementById('legalModal');
    const frame = document.getElementById('legalModalFrame');
    const title = document.getElementById('legalModalTitle');
    if (!modal || !frame || !title) return;

    const normalized = page === 'privacy' ? 'privacy' : 'impressum';
    const pageFile = normalized === 'privacy' ? 'privacy.html' : 'impressum.html';
    title.textContent = normalized === 'privacy' ? 'Datenschutzerklärung' : 'Impressum';
    frame.src = `${pageFile}?theme=${getLegalModalThemeParam()}&embed=app-modal`;
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    acquireBodyScrollLock('legal-modal');
    window.setTimeout(() => modal.querySelector('.legal-modal-close')?.focus(), 0);
}

function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    const frame = document.getElementById('legalModalFrame');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    if (frame) frame.src = 'about:blank';
    releaseBodyScrollLock('legal-modal');
}

document.addEventListener('click', event => {
    const legalLink = event.target?.closest?.('[data-legal-page]');
    if (!legalLink) return;
    event.preventDefault();
    openLegalModal(legalLink.dataset.legalPage);
});

const cursorStyleOptions = new Set(['apple', 'glow', 'dot', 'crosshair', 'emoji', 'system']);

function getCursorSettings() {
    if (!db.settings) db.settings = {};
    const style = cursorStyleOptions.has(db.settings.cursorStyle) ? db.settings.cursorStyle : 'apple';
    const emoji = String(db.settings.cursorEmoji || '🪸').trim().slice(0, 4) || '🪸';
    return { style, emoji };
}

function applyCursorSettings() {
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('customCursorDot');
    const select = document.getElementById('cursorStyleSelect');
    const emojiInput = document.getElementById('cursorEmojiInput');
    const emojiPalette = document.getElementById('cursorEmojiPalette');
    const preview = document.getElementById('cursorSettingsPreview');
    if (!cursor || !dot) return;

    const { style, emoji } = getCursorSettings();
    document.body.classList.remove('cursor-style-apple', 'cursor-style-glow', 'cursor-style-dot', 'cursor-style-crosshair', 'cursor-style-emoji', 'cursor-style-system');
    document.body.classList.add(`cursor-style-${style}`);
    document.body.classList.toggle('custom-cursor-enabled', style !== 'system');
    cursor.textContent = style === 'emoji' ? emoji : '';
    dot.textContent = '';
    if (select) select.value = style;
    if (emojiInput) {
        emojiInput.value = emoji;
        emojiInput.disabled = style !== 'emoji';
    }
    if (emojiPalette) {
        emojiPalette.hidden = style !== 'emoji';
        emojiPalette.querySelectorAll('button').forEach(button => {
            const active = button.textContent.trim() === emoji;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }
    if (preview) {
        preview.dataset.style = style;
        preview.textContent = style === 'emoji' ? emoji : style === 'crosshair' ? '⌖' : style === 'dot' ? '•' : '';
    }
}

function updateCursorSettings() {
    if (!db.settings) db.settings = {};
    const style = document.getElementById('cursorStyleSelect')?.value || 'apple';
    const emoji = document.getElementById('cursorEmojiInput')?.value || '🪸';
    db.settings.cursorStyle = cursorStyleOptions.has(style) ? style : 'apple';
    db.settings.cursorEmoji = String(emoji).trim().slice(0, 4) || '🪸';
    applyCursorSettings();
    saveDB(false);
}

function selectCursorEmoji(emoji) {
    const input = document.getElementById('cursorEmojiInput');
    if (input) input.value = emoji;
    if (!db.settings) db.settings = {};
    db.settings.cursorStyle = 'emoji';
    db.settings.cursorEmoji = String(emoji || '🪸').trim().slice(0, 4) || '🪸';
    applyCursorSettings();
    saveDB(false);
}

let localDeviceSettingsUnlocked = false;
let activeLocalDeviceId = '';
let wavePumpDemoUnlocked = false;

function getLocalDeviceSettings() {
    if (!db.settings) db.settings = {};
    if (!Array.isArray(db.settings.localDevices)) db.settings.localDevices = [];
    return db.settings.localDevices;
}

function normalizeLocalDeviceUrl(rawValue) {
    let value = String(rawValue || '').trim();
    if (!value) return '';
    if (!/^https?:\/\//i.test(value)) value = `http://${value}`;
    try {
        const url = new URL(value);
        if (!['http:', 'https:'].includes(url.protocol)) return '';
        return url.href;
    } catch (error) {
        return '';
    }
}

function isAllowedLocalDeviceUrl(urlValue) {
    try {
        const url = new URL(urlValue);
        const host = url.hostname.toLowerCase();
        if (host === 'localhost' || host.endsWith('.local')) return true;
        const parts = host.split('.').map(part => Number(part));
        if (parts.length !== 4 || parts.some(part => !Number.isInteger(part) || part < 0 || part > 255)) return false;
        if (parts[0] === 10) return true;
        if (parts[0] === 127) return true;
        if (parts[0] === 169 && parts[1] === 254) return true;
        if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
        if (parts[0] === 192 && parts[1] === 168) return true;
        return false;
    } catch (error) {
        return false;
    }
}

function getLocalDeviceEmbedHint(device) {
    if (!device) return '';
    try {
        const pageProtocol = window.location.protocol;
        const deviceProtocol = new URL(device.url).protocol;
        if (pageProtocol === 'https:' && deviceProtocol === 'http:') {
            return 'Diese App läuft über HTTPS, dein lokales Gerät aber über HTTP. Viele Browser blockieren diese Mischung. Teste lokal über HTTP oder gib dem Gerät HTTPS.';
        }
    } catch (error) {}
    return 'Wenn nach dem Laden nichts sichtbar ist, blockiert das Zielgerät wahrscheinlich iframe-Einbettung. Home Assistant macht das standardmäßig oft aus Sicherheitsgründen.';
}

function markLocalDeviceFrameLoaded(id) {
    if (id && id !== activeLocalDeviceId) return;
    const status = document.getElementById('localDeviceFrameStatus');
    if (!status) return;
    status.innerHTML = `
        <strong>Live-Ansicht geladen</strong>
        <span>Wenn der Bereich trotzdem leer bleibt, blockiert das Gerät die Darstellung innerhalb anderer Webseiten.</span>
    `;
    status.dataset.state = 'loaded';
}

function scheduleLocalDeviceFrameCheck(id) {
    window.setTimeout(() => {
        if (id && id !== activeLocalDeviceId) return;
        const status = document.getElementById('localDeviceFrameStatus');
        if (!status || status.dataset.state === 'loaded') return;
        status.innerHTML = `
            <strong>Live-Ansicht braucht ungewöhnlich lange</strong>
            <span>Externes Öffnen funktioniert dann meist trotzdem. Für Home Assistant ggf. X-Frame-Options deaktivieren; für ESP32 später keine Frame-Blocker senden.</span>
        `;
        status.dataset.state = 'warn';
    }, 4500);
}

function renderLocalDeviceSettings(activeId = '') {
    const container = document.getElementById('localDeviceSettings');
    if (!container) return;
    const devices = getLocalDeviceSettings();
    if (!localDeviceSettingsUnlocked) {
        container.innerHTML = `
            <div class="dev-lock-card">
                <p class="hint">Dieser Bereich ist für lokale Entwicklungsgeräte geschützt.</p>
                <div class="local-device-unlock-row">
                    <input type="password" id="localDevicePassword" placeholder="Passwort" autocomplete="off" onkeydown="if(event.key==='Enter') unlockLocalDeviceSettings()">
                    <button type="button" class="btn-secondary btn-animated" onclick="unlockLocalDeviceSettings()">Entsperren</button>
                </div>
                <p class="hint">Hinweis: Das schützt nur vor versehentlichem Öffnen in der App. Es ist keine echte Zugriffskontrolle für dein Netzwerkgerät.</p>
            </div>
        `;
        return;
    }

    if (activeId) activeLocalDeviceId = activeId;
    const activeDevice = devices.find(device => device.id === activeLocalDeviceId) || devices[0] || null;
    if (activeDevice) activeLocalDeviceId = activeDevice.id;
    container.innerHTML = `
        <div class="local-device-settings">
            <div class="sync-maintenance-banner local-device-warning">
                <strong>Nur lokale Geräte</strong>
                <span>Erlaubt sind private IPs wie 192.168.x.x, 10.x.x.x, 172.16-31.x.x, localhost oder .local-Adressen. Externe Webseiten werden blockiert.</span>
            </div>
            <div class="local-device-form">
                <div class="input-group">
                    <label for="localDeviceName">Name:</label>
                    <input type="text" id="localDeviceName" placeholder="z.B. Home Assistant oder ESP32 Pumpe">
                </div>
                <div class="input-group">
                    <label for="localDeviceUrl">Lokale URL oder IP:</label>
                    <input type="text" id="localDeviceUrl" placeholder="z.B. 192.168.178.50:8123 oder http://esp32-pumpe.local">
                </div>
                <button type="button" class="btn-primary btn-animated" onclick="addLocalDevice()">Gerät speichern</button>
            </div>
            <div class="local-device-list">
                ${devices.length ? devices.map(device => `
                    <article class="local-device-row ${activeDevice && activeDevice.id === device.id ? 'is-active' : ''}">
                        <span>
                            <strong>${escapeHtml(device.name)}</strong>
                            <small>${escapeHtml(device.url)}</small>
                        </span>
                        <div class="settings-row-actions">
                            <button type="button" class="btn-secondary" onclick='renderLocalDeviceSettings(${jsArg(device.id)})'>Anzeigen</button>
                            <a class="btn-secondary" href="${escapeHtml(device.url)}" target="_blank" rel="noopener noreferrer">Extern öffnen</a>
                            <button type="button" class="btn-out" onclick='deleteLocalDevice(${jsArg(device.id)})'>Löschen</button>
                        </div>
                    </article>
                `).join('') : '<p class="hint settings-empty-state">Noch kein lokales Gerät hinterlegt.</p>'}
            </div>
            <div class="local-device-viewer">
                ${activeDevice ? `
                    <div class="local-device-viewer-head">
                        <span><strong>${escapeHtml(activeDevice.name)}</strong><small>${escapeHtml(activeDevice.url)}</small></span>
                        <a href="${escapeHtml(activeDevice.url)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">In neuem Tab öffnen</a>
                    </div>
                    <div class="local-device-frame-status" id="localDeviceFrameStatus" data-state="loading">
                        <strong>Live-Ansicht wird geladen</strong>
                        <span>${escapeHtml(getLocalDeviceEmbedHint(activeDevice))}</span>
                    </div>
                    <iframe id="localDeviceFrame" src="${escapeHtml(activeDevice.url)}" title="${escapeHtml(activeDevice.name)}" loading="eager" referrerpolicy="no-referrer" allow="fullscreen; clipboard-read; clipboard-write" onload='markLocalDeviceFrameLoaded(${jsArg(activeDevice.id)})'></iframe>
                    <p class="hint">Für ESP32-Webinterfaces später wichtig: keine Header wie <code>X-Frame-Options: DENY</code>, <code>X-Frame-Options: SAMEORIGIN</code> oder strenge <code>frame-ancestors</code> senden.</p>
                ` : ''}
            </div>
        </div>
    `;
    if (activeDevice) scheduleLocalDeviceFrameCheck(activeDevice.id);
}

function renderWavePumpDemoSettings() {
    const container = document.getElementById('wavePumpDemoSettings');
    if (!container) return;

    if (!wavePumpDemoUnlocked) {
        container.innerHTML = `
            <div class="dev-lock-card wave-demo-lock-card">
                <p class="hint">Dieser Demo-Bereich ist geschützt, damit normale Nutzer nicht aus Versehen in die Entwicklungsansicht geraten.</p>
                <div class="local-device-unlock-row">
                    <input type="password" id="wavePumpDemoPassword" placeholder="Passwort" autocomplete="off" onkeydown="if(event.key==='Enter') unlockWavePumpDemo()">
                    <button type="button" class="btn-secondary btn-animated" onclick="unlockWavePumpDemo()">Entsperren</button>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="wave-demo-settings">
            <div class="sync-maintenance-banner wave-demo-warning">
                <strong>Demo-Modus</strong>
                <span>Diese Vorschau läuft nur im Browser und schaltet keine echte Hardware. Sie ist als UI- und Bedienkonzept für die spätere ESP32-Integration gedacht.</span>
            </div>
            <div class="wave-demo-actions">
                <button type="button" class="btn-secondary btn-animated" onclick="lockWavePumpDemo()">Demo sperren</button>
                <a class="btn-secondary" href="wave/demo.html" target="_blank" rel="noopener noreferrer">In neuem Tab öffnen</a>
            </div>
            <div class="wave-demo-frame-wrap">
                <iframe class="wave-demo-frame" src="wave/demo.html" title="Wave Pumpensteuerung Demo" loading="eager" referrerpolicy="no-referrer"></iframe>
            </div>
        </div>
    `;
}

function unlockWavePumpDemo() {
    const input = document.getElementById('wavePumpDemoPassword');
    if ((input?.value || '').trim() !== 'WAVE') {
        showToast('Falsches WAVE-Passwort', 'warning');
        return;
    }
    wavePumpDemoUnlocked = true;
    renderWavePumpDemoSettings();
    showToast('Wave Demo entsperrt', 'success');
}

function lockWavePumpDemo() {
    wavePumpDemoUnlocked = false;
    renderWavePumpDemoSettings();
}

function unlockLocalDeviceSettings() {
    const input = document.getElementById('localDevicePassword');
    if ((input?.value || '').trim() !== 'DEV') {
        showToast('Falsches DEV-Passwort', 'warning');
        return;
    }
    localDeviceSettingsUnlocked = true;
    renderLocalDeviceSettings();
}

function addLocalDevice() {
    const nameInput = document.getElementById('localDeviceName');
    const urlInput = document.getElementById('localDeviceUrl');
    const name = String(nameInput?.value || '').trim() || 'Lokales Gerät';
    const url = normalizeLocalDeviceUrl(urlInput?.value || '');
    if (!url || !isAllowedLocalDeviceUrl(url)) {
        appAlert('Bitte trage eine gültige lokale Adresse ein, zum Beispiel 192.168.178.50:8123, http://10.0.0.20 oder esp32-pumpe.local.', { title: 'Lokale Adresse prüfen', type: 'warning' });
        return;
    }
    const devices = getLocalDeviceSettings();
    const existing = devices.find(device => device.url === url);
    if (existing) {
        existing.name = name;
        existing.updatedAt = new Date().toISOString();
    } else {
        devices.push({
            id: 'device-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
            name,
            url,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    saveDB();
    renderLocalDeviceSettings(existing ? existing.id : devices[devices.length - 1].id);
    showToast('Lokales Gerät gespeichert', 'success');
}

async function deleteLocalDevice(id) {
    const devices = getLocalDeviceSettings();
    const device = devices.find(entry => entry.id === id);
    if (!device) return;
    const confirmed = await appConfirm(`Lokales Gerät „${device.name}“ entfernen?`, { title: 'Gerät löschen', type: 'warning' });
    if (!confirmed) return;
    db.settings.localDevices = devices.filter(entry => entry.id !== id);
    if (activeLocalDeviceId === id) activeLocalDeviceId = '';
    saveDB();
    renderLocalDeviceSettings();
    showToast('Lokales Gerät gelöscht', 'success');
}

// --- AUTOMATISCHES CACHE LEEREN & FORCE UPDATE ---
function getCurrentAppVersion() {
    return document.querySelector('.version-badge')?.innerText?.trim() || '';
}

const appUpdateState = {
    supported: typeof window !== 'undefined' ? (window.location.protocol !== 'file:') : true,
    checking: false,
    available: false,
    latestVersion: '',
    lastCheckedAt: null,
    message: '',
    autoUpdateTimer: null
};

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
    if (text) {
        text.innerText = latestVersion && /^v[0-9.]+$/i.test(String(latestVersion))
            ? `Installiert: ${current} · Neu: ${latestVersion}`
            : 'Eine neuere App-Version kann geladen werden.';
    }
    banner.hidden = false;
    appUpdateState.available = true;
    appUpdateState.latestVersion = latestVersion || appUpdateState.latestVersion || '';
    appUpdateState.message = latestVersion
        ? `Neue Version erkannt: ${latestVersion}`
        : 'Neue Version erkannt.';
    appUpdateState.lastCheckedAt = new Date().toISOString();
    renderAppUpdateStatus();
    if (!appUpdateState.autoUpdateTimer) {
        showToast('Neue Version erkannt. Die App aktualisiert sich gleich automatisch.', 'info', 3200);
        appUpdateState.autoUpdateTimer = setTimeout(() => {
            appUpdateState.autoUpdateTimer = null;
            forceUpdateApp(false);
        }, 3500);
    }
}

function hideUpdateBanner() {
    const banner = document.getElementById('update-banner');
    if (banner) banner.hidden = true;
    appUpdateState.available = false;
    if (appUpdateState.autoUpdateTimer) {
        clearTimeout(appUpdateState.autoUpdateTimer);
        appUpdateState.autoUpdateTimer = null;
    }
    renderAppUpdateStatus();
}

async function checkForAppUpdate(showIfCurrent = false) {
    if (!appUpdateState.supported) {
        appUpdateState.checking = false;
        appUpdateState.message = 'Datei-Modus erkannt. Automatische Update-Prüfung bitte über localhost oder online nutzen.';
        renderAppUpdateStatus();
        if (showIfCurrent) showToast('Update-Prüfung im Datei-Modus eingeschränkt.', 'warning');
        return;
    }
    appUpdateState.checking = true;
    appUpdateState.message = 'Prüfe auf neue Versionen ...';
    renderAppUpdateStatus();
    try {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) await registration.update();
            } catch (err) {}
        }
        const response = await fetch(`version.json?check=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        const latest = data?.version || '';
        const current = getCurrentAppVersion();
        appUpdateState.lastCheckedAt = new Date().toISOString();
        appUpdateState.latestVersion = latest || current;
        if (latest && current && compareVersionLabels(latest, current) > 0) {
            showUpdateBanner(latest);
        } else {
            hideUpdateBanner();
            appUpdateState.message = current
                ? `Aktuell installiert: ${current}`
                : 'App ist aktuell.';
            if (showIfCurrent) showToast('Du nutzt bereits die aktuelle Version.', 'success');
        }
    } catch (err) {
        appUpdateState.message = 'Versionsprüfung gerade nicht möglich.';
        if (showIfCurrent) showToast('Versionsprüfung gerade nicht möglich.', 'warning');
    } finally {
        appUpdateState.checking = false;
        renderAppUpdateStatus();
    }
}

function initLiveUpdateChecks() {
    const runCheck = () => checkForAppUpdate(false);
    const runCloudRefresh = (showPrompt = false) => refreshGoogleDrivePresence(showPrompt).catch(() => {});
    window.addEventListener('focus', runCheck);
    window.addEventListener('focus', () => runCloudRefresh(true));
    window.addEventListener('online', runCheck);
    window.addEventListener('online', () => runCloudRefresh(true));
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            runCheck();
            runCloudRefresh(true);
        }
    });
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.addEventListener('updatefound', () => {
                const worker = registration.installing;
                if (!worker) return;
                worker.addEventListener('statechange', () => {
                    if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner('neue Version');
                    }
                });
            });
        }).catch(() => {});
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            checkForAppUpdate(false);
        });
    }
}

async function forceUpdateApp(ask = true) {
    const confirmed = !ask || await appConfirm('Dabei wird der interne Zwischenspeicher geleert und die neueste App-Version geladen. Deine Bestandsdaten bleiben erhalten.', {
        title: 'App-Update laden',
        type: 'warning',
        confirmText: 'Update laden'
    });
    if (confirmed) {
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
        const url = new URL(window.location.href);
        url.searchParams.set('refresh', String(Date.now()));
        window.location.replace(url.toString());
    }
}

function renderAppUpdateStatus() {
    const mount = document.getElementById('appUpdateStatus');
    if (!mount) return;
    const current = getCurrentAppVersion() || 'unbekannt';
    const checked = appUpdateState.lastCheckedAt ? formatWarehouseDate(appUpdateState.lastCheckedAt) : 'noch nicht';
    if (!appUpdateState.supported) {
        mount.innerHTML = `
            <div class="storage-safety-status-shell">
                <div class="storage-safety-hero is-warning">
                    <div>
                        <strong>Update-Prüfung hier eingeschränkt</strong>
                        <small>Du hast die App direkt per Datei geöffnet. Bitte nutze localhost oder die Online-Version für zuverlässige Updates.</small>
                    </div>
                    <span class="storage-safety-pill is-warning">Datei-Modus</span>
                </div>
                <div class="storage-safety-grid">
                    <div class="storage-safety-status-card">
                        <small>Installierte Version</small>
                        <strong>${escapeHtml(current)}</strong>
                        <span>Lokale Datei ohne sichere Update-Erkennung.</span>
                    </div>
                    <div class="storage-safety-status-card">
                        <small>Letzte Prüfung</small>
                        <strong>${escapeHtml(checked)}</strong>
                        <span>Bitte per localhost oder Domain testen.</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    const stateLabel = appUpdateState.available ? 'Update verfügbar' : (appUpdateState.checking ? 'Prüfung läuft' : 'Aktuell');
    const stateClass = appUpdateState.available ? 'is-warning' : (appUpdateState.checking ? '' : 'is-ready');
    const hint = appUpdateState.message || (appUpdateState.available
        ? 'Eine neue Version steht bereit.'
        : 'Die App prüft automatisch weiter im Hintergrund.');
    mount.innerHTML = `
        <div class="storage-safety-status-shell">
            <div class="storage-safety-hero ${stateClass}">
                <div>
                    <strong>${escapeHtml(stateLabel)}</strong>
                    <small>${escapeHtml(hint)}</small>
                </div>
                <span class="storage-safety-pill ${stateClass}">${escapeHtml(stateLabel)}</span>
            </div>
            <div class="storage-safety-grid">
                <div class="storage-safety-status-card">
                    <small>Installierte Version</small>
                    <strong>${escapeHtml(current)}</strong>
                    <span>${appUpdateState.latestVersion && appUpdateState.latestVersion !== current ? `Neu erkannt: ${escapeHtml(appUpdateState.latestVersion)}` : 'Kein neuer Stand erkannt.'}</span>
                </div>
                <div class="storage-safety-status-card">
                    <small>Letzte Prüfung</small>
                    <strong>${escapeHtml(checked)}</strong>
                    <span>Prüft beim Öffnen, bei Rückkehr und regelmäßig automatisch.</span>
                </div>
            </div>
        </div>
    `;
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

    applyCursorSettings();
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

function convertInputToStoredAmountAllowZero(itemName, inputUnit, amount, useTara = false, containerValue = null) {
    const numericAmount = parseFloat(amount);
    if (Number.isNaN(numericAmount)) return null;
    if (numericAmount === 0) return 0;
    return convertInputToStoredAmount(itemName, inputUnit, numericAmount, useTara, containerValue);
}

function formatConvertedInputPreview(itemName, inputUnit, amount, useTara = false, containerValue = null) {
    const converted = convertInputToStoredAmount(itemName, inputUnit, amount, useTara, containerValue);
    if (converted === null) return '';
    return `≈ ${formatItemAmount(itemName, converted)}`;
}

function formatBidirectionalMassVolumePreview(itemName, inputUnit, amount, useTara = false, containerValue = null) {
    if (inputUnit === 'st') return '';
    let value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return '';
    const factor = densityFactors[itemName] || 1.0;
    if (inputUnit === 'g' && useTara) value -= getAllContainers()[containerValue] || 0;
    if (value <= 0) return 'Tara ist größer als die Eingabe';
    if (inputUnit === 'ml') return `≈ ${(value * factor).toFixed(2)} g`;
    if (inputUnit === 'g') return `≈ ${(value / factor).toFixed(2)} ml`;
    return '';
}

function formatInventoryDeltaPreview(itemName, currentAmount, nextAmount) {
    return `${formatItemAmount(itemName, currentAmount)} -> ${formatItemAmount(itemName, nextAmount)}`;
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
        perDay: 0,
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
        list.innerHTML = '<p class="hint settings-empty-state">Noch keine eigenen Produkte angelegt.</p>';
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
                <strong>${escapeHtml(product.name)}</strong>
                <small>${escapeHtml(product.cat)} · ${escapeHtml(displaySizes)} · Dichte ${escapeHtml(product.density || 1)}</small>
            </span>
            <div class="settings-row-actions">
                <button type="button" class="btn-secondary" onclick="editCustomProduct(${index})">Bearbeiten</button>
                <button type="button" class="btn-out" onclick="deleteCustomProduct(${index})">Löschen</button>
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

async function deleteCustomProduct(index) {
    const product = db.customProducts && db.customProducts[index];
    if (!product) return;
    const confirmed = await appConfirm(`${product.name} wirklich löschen? Bestehende Lager- und Statistikdaten für dieses Produkt werden entfernt.`, {
        title: 'Eigenes Produkt löschen',
        type: 'danger',
        confirmText: 'Produkt löschen'
    });
    if (!confirmed) return;

    db.customProducts.splice(index, 1);
    if (db.inventory[product.cat]) delete db.inventory[product.cat][product.name];
    if (db.stats) delete db.stats[product.name];
    if (db.thresholds) delete db.thresholds[product.name];
    if (db.alerts && db.alerts.dismissed) delete db.alerts.dismissed[product.name];
    if (db.alerts && db.alerts.disabled) delete db.alerts.disabled[product.name];
    delete densityFactors[product.name];
    saveDB();
    resetCatalogToBase();
    applyCustomProductsToCatalog();
    renderCustomProductSettings();
    renderProductVisibilitySettings();
    renderLager();
    initBulkProductSelect();
    showToast('Eigenes Produkt gelöscht', 'success', 2200);
}

function renderCustomContainers() {
    const list = document.getElementById('custom-containers-list');
    if (!list) return;
    const entries = Object.entries(db.customContainers || {});
    if (entries.length === 0) {
        list.innerHTML = '<p class="hint settings-empty-state">Noch keine eigenen Behälter angelegt.</p>';
        return;
    }
    list.innerHTML = entries.map(([name, weight]) => `
        <div class="custom-product-row">
            <span><strong>${escapeHtml(name)}</strong><small>Leergewicht: ${parseFloat(weight).toFixed(1)} g</small></span>
            <div class="settings-row-actions">
                <button type="button" class="btn-secondary" onclick='editCustomContainer(${jsArg(name)})'>Bearbeiten</button>
                <button type="button" class="btn-out" onclick='deleteCustomContainer(${jsArg(name)})'>Löschen</button>
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

async function deleteCustomContainer(name) {
    if (!db.customContainers || db.customContainers[name] === undefined) return;
    const confirmed = await appConfirm(`Behälter "${name}" löschen? Das gespeicherte Tara-Gewicht wird entfernt.`, {
        title: 'Tara-Behälter löschen',
        type: 'danger',
        confirmText: 'Behälter löschen'
    });
    if (!confirmed) return;
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

async function setThreshold(item) {
    let current = db.thresholds[item] || 0;
    const unitLabel = getUnitLabel(getItemUnit(item));
    let val = await appPrompt(`Fällt der Bestand auf oder unter diesen Wert, wird die Karte als Warnung markiert. Aktuell: ${current} ${unitLabel}.`, current, {
        title: `Warnschwelle für ${item}`,
        label: `Warnschwelle in ${unitLabel}`,
        inputType: 'number',
        confirmText: 'Warnschwelle speichern'
    });
    
    if (val !== null) {
        let parsed = parseFloat(val);
        if (!isNaN(parsed) && parsed >= 0) {
            db.thresholds[item] = parsed;
            saveDB();
            filterLager(); // Aktualisiert die UI sofort
            checkAndNotifyStockAlerts('manual');
        } else {
            await appAlert('Bitte eine gültige Zahl eingeben.', { title: 'Ungültige Warnschwelle', type: 'warning' });
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
    const recentLogs = (db.logs || [])
        .filter(log => log.item === item)
        .slice(-3)
        .reverse()
        .map(log => `<li>${log.action === 'out' ? '-' : '+'}${formatItemAmount(item, log.amount)} · ${new Date(getLogTime(log) || Date.now()).toLocaleDateString('de-DE')}</li>`)
        .join('');
    const latestLog = (db.logs || []).filter(log => log.item === item).slice(-1)[0] || null;
    let crossHint = "";
    if (item === "Fluor (F)" && stock === 0) {
        let nafStock = (db.inventory["C&R Produkte"] && db.inventory["C&R Produkte"]["Natriumfluorid (NaF)"]) || 0;
        crossHint = `<span class="cross-hint">Leer. Alternativ NaF prüfen: ${nafStock.toFixed(1)} ml</span>`;
    } else if (item === "Natriumfluorid (NaF)" && stock === 0) {
        let fStock = (db.inventory["Anionen"] && db.inventory["Anionen"]["Fluor (F)"]) || 0;
        crossHint = `<span class="cross-hint">Leer. Alternativ Fluor prüfen: ${fStock.toFixed(1)} ml</span>`;
    }
    const readOnlyView = isWarehouseReadOnlyView();
    const warehouse = getActiveWarehouse();
    const statusKey = stock <= 0 ? 'empty' : (warningClass ? 'warning' : 'ok');
    const statusLabel = stock <= 0 ? 'Leer' : (warningClass ? 'Warnung' : 'Ausreichend');
    const thresholdText = threshold > 0 ? formatItemAmount(item, threshold) : 'Nicht gesetzt';
    return `
        <article class="card inventory-card ${warningClass}" data-name="${escapeHtml(item)}" data-category="${escapeHtml(cat)}" data-stock-status="${statusKey}">
            <header class="inventory-card-head">
                <div class="inventory-product-copy">
                    <span class="inventory-category">${escapeHtml(cat)}</span>
                    <h3>${escapeHtml(item)}</h3>
                </div>
                <div class="inventory-card-tools">
                    <button type="button" class="threshold-btn favorite-btn ${favorite ? 'active' : ''}" onclick='toggleFavoriteProduct(${jsArg(item)})' title="Favorit umschalten" aria-label="${favorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}">${favorite ? '★' : '☆'}</button>
                    <button type="button" class="threshold-btn" onclick='setThreshold(${jsArg(item)})' title="Warnschwelle setzen" aria-label="Warnschwelle für ${escapeHtml(item)} setzen">Limit</button>
                </div>
            </header>
            <div class="inventory-stock-row">
                <div class="inventory-stock-value">
                    <span class="stock">${formatItemAmount(item, stock)}</span>
                    ${showMassSubline ? `<small>${stockG} g</small>` : ''}
                </div>
                <span class="inventory-status status-badge status-badge--${statusKey === 'ok' ? 'success' : (statusKey === 'warning' ? 'warning' : 'danger')}">${statusLabel}</span>
            </div>
            ${crossHint}
            <dl class="inventory-facts">
                <div><dt>Reichweite</dt><dd>${reachText}</dd></div>
                <div><dt>Warnschwelle</dt><dd>${thresholdText}</dd></div>
                <div><dt>Lager</dt><dd>${escapeHtml(warehouse?.name || 'Lager')}</dd></div>
                <div><dt>Letzte Änderung</dt><dd>${latestLog ? formatWarehouseDate(getLogTime(latestLog)) : 'Noch keine Buchung'}</dd></div>
            </dl>
            <div class="inventory-hints">${prognosisHint}${thresholdHint}${disabledHint}</div>
            <details class="product-history">
                <summary>Verlauf & Prognose</summary>
                <div>
                    <span>Verbrauch: ${metrics.perDay ? `${formatItemAmount(item, metrics.perDay * 7, 2)} / Woche` : 'noch keine Daten'}</span>
                    <span>Reichweite: ${reachText}</span>
                    <ul>${recentLogs || '<li>Noch keine Buchungen</li>'}</ul>
                </div>
            </details>
            <div class="btn-group inventory-card-actions">
                ${readOnlyView
                    ? '<button class="btn btn-secondary" type="button" disabled>Nur Ansicht</button>'
                    : `<button type="button" class="btn btn-primary btn-in btn-animated" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "in")'>Einlagern</button>
                <button type="button" class="btn btn-secondary btn-out btn-animated" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "out")'>Auslagern</button>`}
            </div>
        </article>
    `;
}

// --- RENDER FUNKTIONEN ---
function renderLager() {
    const container = document.getElementById('lager');
    if (!container) return;
    const hasLagerShell = Boolean(
        container.querySelector('#searchInput') &&
        container.querySelector('#categoryFilter') &&
        container.querySelector('#lager-container')
    );

    // Such- und Filterfeld gezielt im Lager-Tab aufbauen, falls die Struktur fehlt
    if (!hasLagerShell) {
        const categoryOptions = Object.keys(catalog)
            .map(cat => `<option value="${cat}">${cat}</option>`)
            .join('');
        container.innerHTML = `
            <section class="warehouse-page-head">
                <div>
                    <small>Lagerverwaltung</small>
                    <h2>Lagerbestand</h2>
                    <p>Alle Buchungen wirken auf <strong id="activeWarehouseName">das aktive Lager</strong>.</p>
                    <div class="osci-system-note">Dieser Lagerbereich ist auf das OSCI Motion Versorgungssystem, C&amp;R und Trace-Produkte abgestimmt.</div>
                </div>
                <div class="warehouse-head-actions">
                    <button type="button" class="btn btn-primary" onclick="openSmartStockModal('in')">Einlagern</button>
                    <button type="button" class="btn btn-secondary" onclick="openSmartStockModal('out')">Auslagern</button>
                </div>
            </section>
            <section class="warehouse-control-card">
                <div class="warehouse-control-head">
                    <div>
                        <span>Aktives Lager</span>
                        <strong>Lager auswählen und verwalten</strong>
                    </div>
                    <div class="warehouse-access-badge" id="warehouseAccessBadge">Eigenes Lager</div>
                </div>
                <div class="warehouse-switcher">
                    <select id="warehouseSelect" onchange="switchWarehouse(this.value)" aria-label="Lager wechseln"></select>
                    <button type="button" onclick="createWarehouse()" title="Neues Lager erstellen" aria-label="Neues Lager erstellen">Neu</button>
                    <button type="button" onclick="renameWarehouse()" title="Aktuelles Lager umbenennen" aria-label="Aktuelles Lager umbenennen">✎</button>
                    <button type="button" class="warehouse-delete-button" onclick="deleteWarehouse()" title="Aktuelles Lager löschen" aria-label="Aktuelles Lager löschen">×</button>
                </div>
                <div class="warehouse-meta" id="warehouseMeta">Lager wird geladen ...</div>
            </section>
            <section class="warehouse-filter-panel" aria-label="Lager durchsuchen und filtern">
                <div class="lager-toolbar">
                    <div class="toolbar-field">
                        <label for="searchInput">Suche</label>
                        <input type="search" id="searchInput" class="search-input" aria-label="Lagerbestand durchsuchen" placeholder="Produkt suchen" oninput="filterLager()">
                    </div>
                    <div class="toolbar-divider"></div>
                    <div class="toolbar-field">
                        <label for="categoryFilter">Kategorie</label>
                        <select id="categoryFilter" class="filter-select" aria-label="Lager nach Kategorie filtern" onchange="filterLager()">
                            <option value="all">Alle Kategorien</option>
                            ${categoryOptions}
                        </select>
                    </div>
                </div>
                <div class="warehouse-filter-foot">
                    <div class="lager-filter-chips" aria-label="Schnellfilter">
                        <button type="button" class="active" data-filter="all" aria-pressed="true" onclick="setLagerQuickFilter('all')">Alle</button>
                        <button type="button" data-filter="low" aria-pressed="false" onclick="setLagerQuickFilter('low')">Knapp</button>
                        <button type="button" data-filter="favorites" aria-pressed="false" onclick="setLagerQuickFilter('favorites')">Favoriten</button>
                    </div>
                    <div class="warehouse-filter-result">
                        <span id="lager-result-count" aria-live="polite">Bestand wird geladen</span>
                        <button type="button" id="lager-filter-reset" class="btn btn-ghost" onclick="resetLagerFilters()" hidden>Filter zurücksetzen</button>
                    </div>
                </div>
            </section>
            <div id="stock-alerts"></div>
            <div id="lager-container"></div>
            <div id="lager-empty-state" class="empty-state warehouse-empty-state" hidden>
                <strong class="empty-state-title">Keine Produkte gefunden</strong>
                <p class="empty-state-text">Passe Suche oder Filter an, um wieder Produkte anzuzeigen.</p>
                <button type="button" class="btn btn-secondary" onclick="resetLagerFilters()">Filter zurücksetzen</button>
            </div>
        `;
        updateWarehouseUI();
    }
    filterLager();
}

let lagerQuickFilter = 'all';

function setLagerQuickFilter(filter) {
    lagerQuickFilter = filter || 'all';
    document.querySelectorAll('.lager-filter-chips button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === lagerQuickFilter);
        btn.setAttribute('aria-pressed', btn.dataset.filter === lagerQuickFilter ? 'true' : 'false');
    });
    filterLager();
}

function resetLagerFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    setLagerQuickFilter('all');
}

function filterLager() {
    const listContainer = document.getElementById('lager-container');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const alertsContainer = document.getElementById('stock-alerts');
    const resultCount = document.getElementById('lager-result-count');
    const emptyState = document.getElementById('lager-empty-state');
    const resetButton = document.getElementById('lager-filter-reset');
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const alertItems = new Set(getStockAlerts().map(alert => alert.item));
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    renderStockAlerts(alertsContainer);

    const favoriteRows = [];
    const matchedItems = new Set();
    for (let cat in catalog) {
        for (let item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            if (!isFavoriteProduct(item)) continue;
            if (lagerQuickFilter === 'low' && !alertItems.has(item)) continue;
            if (selectedCategory !== 'all' && selectedCategory !== cat) continue;
            if (!item.toLowerCase().includes(term)) continue;
            favoriteRows.push(renderProductCard(cat, item));
            matchedItems.add(`${cat}\u0000${item}`);
        }
    }
    if (lagerQuickFilter === 'all' && favoriteRows.length > 0) {
        listContainer.innerHTML += `<section class="inventory-category-section"><h2 class="category-title">Favoriten</h2><div class="inventory-card-grid">${favoriteRows.join('')}</div></section>`;
    }
    
    for (let cat in catalog) {
        if (selectedCategory !== 'all' && selectedCategory !== cat) continue;

        let catHTML = '';
        let hasItems = false;
        
        for (let item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            if (lagerQuickFilter === 'favorites' && !isFavoriteProduct(item)) continue;
            if (lagerQuickFilter === 'low' && !alertItems.has(item)) continue;
            if (item.toLowerCase().includes(term)) {
                hasItems = true;
                catHTML += renderProductCard(cat, item);
                matchedItems.add(`${cat}\u0000${item}`);
            }
        }
        if (hasItems) {
            listContainer.innerHTML += `<section class="inventory-category-section"><h2 class="category-title">${escapeHtml(cat)}</h2><div class="inventory-card-grid">${catHTML}</div></section>`;
        }
    }
    const matchCount = matchedItems.size;
    const filtersActive = Boolean(term || selectedCategory !== 'all' || lagerQuickFilter !== 'all');
    if (resultCount) resultCount.textContent = `${matchCount} ${matchCount === 1 ? 'Produkt' : 'Produkte'}`;
    if (resetButton) resetButton.hidden = !filtersActive;
    if (emptyState) emptyState.hidden = matchCount !== 0;
    listContainer.hidden = matchCount === 0;
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
            let id = getTraceInputId('kat', item);
            const value = db.traceDraft[item] || '';
            return `
            <div class="trace-grid">
                <label for="${id}">${item}</label>
                <input type="number" step="0.01" min="0" placeholder="0.00" id="${id}" value="${value}" oninput="updateTraceDraft('${id}', ${jsArg(item)})">
                <div class="trace-unit-stack">
                    <span class="unit-label">ml</span>
                    <span id="${id}-g" class="trace-gram-value">${((parseFloat(value) || 0) * (densityFactors[item] || 1)).toFixed(2)} g</span>
                </div>
            </div>
        `}).join('');
    }
    if (anContainer) {
        anContainer.innerHTML = mixDefinitions.anionen.map(item => {
            let id = getTraceInputId('an', item);
            const value = db.traceDraft[item] || '';
            return `
            <div class="trace-grid">
                <label for="${id}">${item}</label>
                <input type="number" step="0.01" min="0" placeholder="0.00" id="${id}" value="${value}" oninput="updateTraceDraft('${id}', ${jsArg(item)})">
                <div class="trace-unit-stack">
                    <span class="unit-label">ml</span>
                    <span id="${id}-g" class="trace-gram-value">${((parseFloat(value) || 0) * (densityFactors[item] || 1)).toFixed(2)} g</span>
                </div>
            </div>
        `}).join('');
    }
    Object.keys(db.traceDraft || {}).forEach(item => {
        const typ = mixDefinitions.kationen.includes(item) ? 'kat' : 'an';
        calcTraceGrams(getTraceInputId(typ, item), item);
    });
    [...mixDefinitions.kationen, ...mixDefinitions.anionen].forEach(item => {
        const prefix = mixDefinitions.kationen.includes(item) ? 'kat' : 'an';
        const input = document.getElementById(getTraceInputId(prefix, item));
        if (!input || input.dataset.traceBound === 'true') return;
        input.dataset.traceBound = 'true';
        input.addEventListener('input', () => updateTraceDraft(getTraceInputId(prefix, item), item));
        input.addEventListener('change', () => updateTraceDraft(getTraceInputId(prefix, item), item));
    });
}

function getTraceInputId(prefix, itemName) {
    return `mix-${prefix}-` + String(itemName)
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}

function getTraceInputElement(prefix, itemName) {
    const canonicalId = getTraceInputId(prefix, itemName);
    const legacyId = `mix-${prefix}-` + String(itemName).replace(/[^a-zA-Z]/g, '');
    return document.getElementById(canonicalId) || document.getElementById(legacyId);
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

window.updateTraceDraft = updateTraceDraft;

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

function parseReefManagerExportMeta(text) {
    const source = String(text || '');
    const readDecimal = pattern => {
        const match = source.match(pattern);
        return match ? traceCalcNumber(match[1], null) : null;
    };
    const rawDate = source.match(/Datum:\s*([0-9]{1,2})[.\-/]([0-9]{1,2})[.\-/]([0-9]{2,4})/i);
    const mixtureDate = rawDate
        ? `${String(rawDate[3]).padStart(4, '20')}-${String(rawDate[2]).padStart(2, '0')}-${String(rawDate[1]).padStart(2, '0')}`
        : getTodayDateInputValue();
    const weeks = readDecimal(/Laufzeit:\s*([0-9]+(?:[,.][0-9]+)?)\s*Wochen?/i);
    const days = readDecimal(/Laufzeit:\s*([0-9]+(?:[,.][0-9]+)?)\s*Tage?/i);
    return {
        mixtureDate,
        runtimeDays: days !== null ? Math.max(1, Math.round(days)) : (weeks !== null ? Math.max(1, Math.round(weeks * 7)) : null),
        dailyDoseMl: readDecimal(/Tägl\.\s*Dosierung:\s*([0-9]+(?:[,.][0-9]+)?)/i),
        totalMl: readDecimal(/Gesamtmenge:\s*([0-9]+(?:[,.][0-9]+)?)/i),
        elementMl: readDecimal(/Elementanteil:\s*([0-9]+(?:[,.][0-9]+)?)/i),
        osmoseMl: readDecimal(/Osmosewasser:\s*([0-9]+(?:[,.][0-9]+)?)/i)
    };
}

function getStoredReefManagerTraceImport() {
    const stored = db.reefManagerTraceImport;
    if (!stored || !Array.isArray(stored.rows) || !stored.rows.length) return null;
    return stored;
}

function previewReefManagerImport(text = '') {
    const preview = document.getElementById('reef-manager-import-preview');
    if (!preview) return;
    const rows = parseReefManagerExport(text);
    const meta = parseReefManagerExportMeta(text);
    if (rows.length === 0) {
        const stored = getStoredReefManagerTraceImport();
        if (!stored) {
            preview.innerHTML = 'Noch kein gültiger Reef Manager Export importiert.';
            return;
        }
        if (stored.text) {
            previewReefManagerImport(stored.text);
            return;
        }
        preview.innerHTML = `
            <div class="tool-result">
                ${stored.rows.map(row => `
                    <div class="tool-row">
                        <span><strong>${escapeHtml(row.item)}</strong><small>${row.type === 'kation' ? 'Kation' : 'Anion'} · ${escapeHtml(row.symbol)}</small></span>
                        <span>${traceCalcFormatMl(row.amount)}</span>
                    </div>
                `).join('')}
            </div>
        `;
        return;
    }
    preview.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Importdaten</strong><small>${formatTraceDateInput(meta.mixtureDate)} · ${meta.runtimeDays || '-'} Tage · ${meta.dailyDoseMl !== null ? traceCalcFormatMl(meta.dailyDoseMl) + ' täglich' : 'Tagesdosierung offen'}</small></span>
                <span>${meta.totalMl !== null ? traceCalcFormatMl(meta.totalMl) : `${rows.length} Werte`}</span>
            </div>
            ${rows.map(row => `
                <div class="tool-row">
                    <span><strong>${escapeHtml(row.item)}</strong><small>${row.type === 'kation' ? 'Kation' : 'Anion'} · ${escapeHtml(row.symbol)}</small></span>
                    <span>${row.amount.toFixed(2)} ml</span>
                </div>
            `).join('')}
        </div>
    `;
}

function importReefManagerTraceText(text) {
    const rows = parseReefManagerExport(text);
    if (rows.length === 0) return alert('Keine gültigen Anionen/Kationen-Mengen erkannt.');
    const meta = parseReefManagerExportMeta(text);
    if (!db.traceDraft) db.traceDraft = {};
    rows.forEach(row => {
        db.traceDraft[row.item] = String(row.amount.toFixed(2));
    });
    db.reefManagerTraceImport = {
        text: String(text || ''),
        rows: rows.map(row => ({ ...row })),
        meta,
        importedAt: Date.now()
    };
    saveDB(false);
    renderTraceExportInputs();
    rows.forEach(row => calcTraceGrams(getTraceInputId(row.type === 'kation' ? 'kat' : 'an', row.item), row.item));
    previewReefManagerImport(text);
    showToast(`${rows.length} Reef Manager Wert(e) übernommen`, 'success');
}

async function importReefManagerTraceFromClipboard() {
    let text = '';
    try {
        if (navigator.clipboard && navigator.clipboard.readText) {
            text = await navigator.clipboard.readText();
        }
    } catch (err) {
        text = '';
    }
    if (!text) {
        text = prompt('Reef Manager Export einfügen:') || '';
    }
    if (!text.trim()) return;
    importReefManagerTraceText(text);
}

function clearReefManagerImport() {
    if (!confirm('Importierte Trace-Werte zurücksetzen?')) return;
    db.traceDraft = {};
    delete db.reefManagerTraceImport;
    saveDB(false);
    renderTraceExportInputs();
    previewReefManagerImport('');
}

function addReefManagerImportToTraceHistory() {
    const stored = getStoredReefManagerTraceImport();
    if (!stored) {
        alert('Bitte zuerst einen Reef Manager Export importieren.');
        return;
    }
    const state = ensureTraceCalculatorState();
    const currentConfig = getTraceCalculatorConfigFromUi();
    const meta = stored.meta || parseReefManagerExportMeta(stored.text || '');
    const tankLitersInput = document.getElementById('reefManagerAquariumLiters');
    const tankLiters = traceCalcNumber(tankLitersInput?.value, null);
    if (tankLiters === null || tankLiters <= 0) {
        alert('Bitte gib das Aquariumvolumen für diesen Reef-Manager-Import in Litern an. Der Export enthält diese Angabe nicht.');
        tankLitersInput?.focus();
        return;
    }
    const validation = getTraceCalculatorIcpValidation();
    if (!validation.valid) {
        showTraceCalculatorIcpValidationError(validation.invalid);
        return;
    }
    const config = {
        ...currentConfig,
        tankLiters,
        days: meta.runtimeDays || currentConfig.days,
        dailyDoseMl: meta.dailyDoseMl || currentConfig.dailyDoseMl
    };
    const amounts = stored.rows.reduce((acc, row) => {
        acc[row.item] = traceCalcRound(row.amount);
        return acc;
    }, {});
    const grams = Object.fromEntries(Object.entries(amounts).map(([item, amount]) => [item, traceCalcElementGrams(item, amount)]));
    const entry = normalizeTraceCalculatorHistoryEntry({
        id: createWarehouseId(),
        source: 'reefManager',
        includeInCalculation: true,
        createdAt: Date.now(),
        mixtureDate: meta.mixtureDate || getTodayDateInputValue(),
        config,
        icp: { ...state.icp },
        amounts,
        grams,
        totals: getTraceTotalsFromAmounts(amounts, config),
        reefManagerMeta: meta
    });
    state.history.push(entry);
    pruneTraceCalculatorHistory();
    state.config = config;
    state.currentMixtureDate = entry.mixtureDate;
    db.traceDraft = Object.fromEntries(Object.entries(amounts).map(([item, amount]) => [item, amount.toFixed(2)]));
    saveDB();
    document.querySelectorAll('[id^="traceCalc"]').forEach(el => {
        if (el && el.dataset) delete el.dataset.traceCalcSynced;
    });
    const icpContainer = document.getElementById('traceCalcIcpInputs');
    if (icpContainer) delete icpContainer.dataset.traceCalcReady;
    renderTraceExportInputs();
    renderTraceCalculator();
    showToast('Reef Manager Import zur Historie hinzugefügt', 'success');
}

function ensureTraceCalculatorState() {
    if (!db.traceCalculator || typeof db.traceCalculator !== 'object') db.traceCalculator = {};
    if (!db.traceCalculator.config) {
        db.traceCalculator.config = {
            tankLiters: 500,
            interval: 'monthly',
            stocking: 'normal',
            days: 40,
            dailyDoseMl: 5,
            bottleMaxMl: 450
        };
    }
    if (!db.traceCalculator.currentMixtureDate) db.traceCalculator.currentMixtureDate = getTodayDateInputValue();
    if (!db.traceCalculator.icp || typeof db.traceCalculator.icp !== 'object') db.traceCalculator.icp = {};
    if (!Array.isArray(db.traceCalculator.history)) db.traceCalculator.history = [];
    return db.traceCalculator;
}

function getTodayDateInputValue() {
    const now = new Date();
    const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 10);
}

function traceCalcNumber(value, fallback = 0) {
    const parsed = parseFloat(String(value ?? '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : fallback;
}

function traceCalcRound(value) {
    const step = traceCalculatorRules.roundingMl;
    return Math.max(0, Math.round((Number(value) || 0) / step) * step);
}

function traceCalcRoundWithinDoseLimit(value, previousAmount, maximumChange) {
    const step = traceCalculatorRules.roundingMl;
    const previous = Math.max(0, Number(previousAmount) || 0);
    const lowerLimit = Math.max(0, previous * (1 - maximumChange));
    const upperLimit = previous * (1 + maximumChange);
    let rounded = traceCalcRound(value);
    if (rounded > upperLimit + 0.000001) {
        rounded = Math.floor((upperLimit + 0.000001) / step) * step;
    }
    if (rounded < lowerLimit - 0.000001) {
        rounded = Math.ceil((lowerLimit - 0.000001) / step) * step;
    }
    return traceCalcRound(rounded);
}

function traceCalcFormatMl(value) {
    return `${traceCalcRound(value).toFixed(2).replace('.', ',')} ml`;
}

function traceCalcFormatG(value) {
    return `${traceCalcRound(value).toFixed(2).replace('.', ',')} g`;
}

function traceCalcFormatMlG(ml, grams) {
    return `${traceCalcFormatMl(ml)} / ${traceCalcFormatG(grams)}`;
}

function traceCalcElementGrams(item, ml) {
    return traceCalcRound((Number(ml) || 0) * (densityFactors[item] || 1));
}

function traceCalcFormatValue(value, digits = 1) {
    if (value === null || value === undefined || value === '') return '-';
    const parsed = traceCalcNumber(value, null);
    if (parsed === null) return '-';
    return parsed.toLocaleString('de-DE', { maximumFractionDigits: digits });
}

function traceCalcFormatRawMl(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '-';
    return `${number.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ml`;
}

function formatTraceDateInput(value) {
    if (!value) return '-';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return date.toLocaleDateString('de-DE');
}

function formatTraceMixtureDate(entry) {
    return entry?.mixtureDate
        ? formatTraceDateInput(entry.mixtureDate)
        : new Date(entry?.createdAt || Date.now()).toLocaleDateString('de-DE');
}

function formatTraceShortDateFromTime(time) {
    const date = new Date(time);
    if (!Number.isFinite(date.getTime())) return '-';
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

function getTraceHistoryTotalGrams(entry, group) {
    const saved = traceCalcNumber(entry?.totals?.[group]?.volumeG, null);
    if (saved !== null) return saved;
    const groupItems = traceCalculatorElements.filter(element => element.group === group).map(element => element.item);
    const elementsG = groupItems.reduce((sum, item) => {
        const grams = traceCalcNumber(entry?.grams?.[item], null);
        const amount = traceCalcNumber(entry?.amounts?.[item], 0);
        return sum + (grams !== null ? grams : traceCalcElementGrams(item, amount));
    }, 0);
    const volumeMl = traceCalcNumber(entry?.totals?.[group]?.volumeMl, 0);
    const elementsMl = groupItems.reduce((sum, item) => sum + traceCalcNumber(entry?.amounts?.[item], 0), 0);
    return traceCalcRound(elementsG + Math.max(0, volumeMl - elementsMl));
}

function normalizeTraceCalculatorHistoryEntry(entry) {
    if (!entry || typeof entry !== 'object') return entry;
    if (!entry.id) entry.id = createWarehouseId();
    if (!entry.createdAt) entry.createdAt = Date.now();
    if (entry.includeInCalculation === undefined) entry.includeInCalculation = true;
    if (!entry.amounts || typeof entry.amounts !== 'object') entry.amounts = {};
    if (!entry.grams || typeof entry.grams !== 'object') entry.grams = {};
    if (!entry.config || typeof entry.config !== 'object') entry.config = {};
    if (!entry.totals || typeof entry.totals !== 'object') {
        entry.totals = getTraceTotalsFromAmounts(entry.amounts, entry.config);
    }
    return entry;
}

function getTraceHistorySortTime(entry) {
    if (entry?.mixtureDate) {
        const mixtureTime = new Date(`${entry.mixtureDate}T00:00:00`).getTime();
        if (Number.isFinite(mixtureTime)) return mixtureTime;
    }
    const createdTime = Number(entry?.createdAt);
    return Number.isFinite(createdTime) ? createdTime : 0;
}

function sortTraceHistoryByDate(history, direction = 'asc') {
    const multiplier = direction === 'desc' ? -1 : 1;
    return [...(Array.isArray(history) ? history : [])].sort((a, b) => {
        const dateDiff = getTraceHistorySortTime(a) - getTraceHistorySortTime(b);
        if (dateDiff !== 0) return dateDiff * multiplier;
        const createdDiff = (Number(a?.createdAt) || 0) - (Number(b?.createdAt) || 0);
        return createdDiff * multiplier;
    });
}

function isTraceStartMixture(entry) {
    return entry?.isStartMixture === true || entry?.source === 'traceStartMixture';
}

function getTraceCalculatorAnalysisHistory(limit = 5) {
    return getTraceCalculatorHistoryEntries({ calculationOnly: true, sort: 'asc' })
        .filter(hasTraceCalculatorIcpValues)
        .slice(-limit);
}

function getTraceCalculatorRecipeBasisHistory(limit = 5) {
    return getTraceCalculatorHistoryEntries({ calculationOnly: true, sort: 'asc' })
        .filter(entry => hasTraceCalculatorIcpValues(entry) || isTraceStartMixture(entry))
        .slice(-limit);
}

function getTraceCalculatorCalculationHistory(limit = 5) {
    return getTraceCalculatorAnalysisHistory(limit);
}

function pruneTraceCalculatorHistory(maxEntries = 60) {
    const state = ensureTraceCalculatorState();
    if (state.history.length <= maxEntries) return;
    state.history = sortTraceHistoryByDate(state.history, 'asc').slice(-maxEntries);
}

function getTraceCalculatorHistoryEntries({ calculationOnly = false, sort = 'asc' } = {}) {
    const state = ensureTraceCalculatorState();
    state.history.forEach(normalizeTraceCalculatorHistoryEntry);
    const entries = state.history.filter(entry => !calculationOnly || entry.includeInCalculation !== false);
    return sortTraceHistoryByDate(entries, sort);
}

function getTraceTotalsFromAmounts(amounts = {}, config = {}) {
    const plannedVolume = traceCalcRound(
        traceCalcNumber(config.dailyDoseMl, traceCalculatorBase.dailyDoseMl)
        * traceCalcNumber(config.days, traceCalculatorBase.days)
    );
    return ['kationen', 'anionen'].reduce((acc, group) => {
        const groupItems = traceCalculatorElements.filter(element => element.group === group).map(element => element.item);
        const elementsMl = groupItems.reduce((sum, item) => sum + traceCalcNumber(amounts[item], 0), 0);
        const elementsG = groupItems.reduce((sum, item) => sum + traceCalcElementGrams(item, traceCalcNumber(amounts[item], 0)), 0);
        acc[group] = {
            elementsMl: traceCalcRound(elementsMl),
            elementsG: traceCalcRound(elementsG),
            osmoseMl: traceCalcRound(Math.max(0, plannedVolume - elementsMl)),
            osmoseG: traceCalcRound(Math.max(0, plannedVolume - elementsMl)),
            volumeMl: traceCalcRound(plannedVolume),
            volumeG: traceCalcRound(elementsG + Math.max(0, plannedVolume - elementsMl))
        };
        return acc;
    }, {});
}

function getTraceHistoryEntrySummary(entry) {
    if (isTraceStartMixture(entry)) return 'Startmischung';
    if (entry?.source === 'reefManager') return 'Reef Manager Import';
    return entry?.inventoryBooking ? 'Gespeichert & ausgelagert' : 'Manuell gespeichert';
}

function getTraceHistoryEntryStatus(entry) {
    if (entry?.includeInCalculation === false && !isTraceStartMixture(entry)) {
        return { className: 'ignored', label: 'Ignoriert', note: 'fließt nicht ein' };
    }
    if (isTraceStartMixture(entry)) {
        return { className: 'start', label: 'Startmischung', note: 'ohne ICP-Bewertung' };
    }
    if (hasTraceCalculatorIcpValues(entry)) {
        return { className: 'icp', label: 'Mit ICP', note: 'berechnungsfähig' };
    }
    return { className: 'missing', label: 'Ohne ICP', note: 'nicht berechnungsfähig' };
}

function getTraceCalculatorConfigFromUi() {
    const state = ensureTraceCalculatorState();
    const saved = state.config;
    const dateValue = document.getElementById('traceCalcMixtureDate')?.value || state.currentMixtureDate || getTodayDateInputValue();
    const readConfigNumber = (id, fallback, minimum) => {
        const input = document.getElementById(id);
        if (!input) return Math.max(minimum, traceCalcNumber(fallback, minimum));
        const raw = String(input.value ?? '').trim();
        if (raw === '') return Math.max(minimum, traceCalcNumber(fallback, minimum));
        return Math.max(minimum, traceCalcNumber(raw, fallback));
    };
    state.currentMixtureDate = dateValue;
    const config = {
        tankLiters: readConfigNumber('traceCalcTankLiters', saved.tankLiters || 500, 1),
        interval: document.getElementById('traceCalcInterval')?.value || saved.interval || 'monthly',
        stocking: document.getElementById('traceCalcStocking')?.value || saved.stocking || 'normal',
        days: readConfigNumber('traceCalcDays', saved.days || 40, 1),
        dailyDoseMl: readConfigNumber('traceCalcDailyDose', saved.dailyDoseMl || 5, 0.01),
        bottleMaxMl: readConfigNumber('traceCalcBottleMax', saved.bottleMaxMl || 450, 0.01)
    };
    state.config = config;
    return config;
}

function syncTraceCalculatorConfigUi() {
    const state = ensureTraceCalculatorState();
    const config = state.config;
    const setters = [
        ['traceCalcTankLiters', config.tankLiters],
        ['traceCalcInterval', config.interval],
        ['traceCalcStocking', config.stocking],
        ['traceCalcDays', config.days],
        ['traceCalcDailyDose', config.dailyDoseMl],
        ['traceCalcBottleMax', config.bottleMaxMl],
        ['traceCalcMixtureDate', state.currentMixtureDate || getTodayDateInputValue()]
    ];
    setters.forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el && el.dataset.traceCalcSynced !== 'true') {
            el.value = value;
            el.dataset.traceCalcSynced = 'true';
        }
    });
}

function getTraceCalculatorScale(config) {
    return (config.tankLiters / traceCalculatorBase.liters) * (config.days / traceCalculatorBase.days);
}

function getTraceCalculatorBaseRecipe(config) {
    const scale = getTraceCalculatorScale(config);
    return traceCalculatorElements.reduce((recipe, element) => {
        recipe[element.item] = traceCalcRound(element[config.stocking === 'weak' ? 'weak' : 'normal'] * scale);
        return recipe;
    }, {});
}

function getTraceCalculatorLatestHistory() {
    const history = getTraceCalculatorRecipeBasisHistory();
    return history.length ? history[history.length - 1] : null;
}

function getTraceCalculatorStartingRecipe(config) {
    const latest = getTraceCalculatorLatestHistory();
    if (!latest || !latest.amounts || !latest.config) return getTraceCalculatorBaseRecipe(config);
    const oldScale = getTraceCalculatorScale(latest.config || config) || 1;
    const newScale = getTraceCalculatorScale(config) || 1;
    return traceCalculatorElements.reduce((recipe, element) => {
        const latestAmount = traceCalcNumber(latest.amounts[element.item], null);
        if (latestAmount === null) {
            recipe[element.item] = getTraceCalculatorBaseRecipe(config)[element.item] || 0;
        } else {
            recipe[element.item] = traceCalcRound((latestAmount / oldScale) * newScale);
        }
        return recipe;
    }, {});
}

function getTraceCalculatorAdjustment(element, measured, previousAmount, config) {
    const intervalRule = traceCalculatorIntervalRules[config.interval] || traceCalculatorIntervalRules.monthly;
    const maximumChange = intervalRule.maxDoseChange;
    if (measured === null || measured === undefined || measured === '') {
        return {
            amount: previousAmount,
            status: 'basis',
            label: 'kein ICP-Wert',
            note: 'Menge aus Basis/Verlauf übernommen.'
        };
    }

    const value = traceCalcNumber(measured, null);
    if (value === null) {
        return {
            amount: previousAmount,
            status: 'basis',
            label: 'kein ICP-Wert',
            note: 'Menge aus Basis/Verlauf übernommen.'
        };
    }

    if (value <= 0) {
        const amount = traceCalcRoundWithinDoseLimit(previousAmount * (1 + maximumChange), previousAmount, maximumChange);
        const actualChangePercent = previousAmount > 0 ? ((amount - previousAmount) / previousAmount) * 100 : 0;
        return {
            amount,
            status: 'low',
            label: 'unter Optimalwert',
            note: `Bei ${traceCalcFormatValue(value, 2)} ${element.unit} ist keine Quotientenrechnung möglich; maximal +${traceCalcRulePercent(maximumChange)} nach ${intervalRule.adjustmentLabel}-Regel, nach Rundung ${traceCalcFormatPercent(actualChangePercent)}. Manuell prüfen.`
        };
    }

    const targetFactor = element.optimal / value;
    const factor = Math.min(1 + maximumChange, Math.max(1 - maximumChange, targetFactor));
    const amount = traceCalcRoundWithinDoseLimit(previousAmount * factor, previousAmount, maximumChange);
    const targetChangePercent = (targetFactor - 1) * 100;
    const appliedChangePercent = (factor - 1) * 100;
    const actualChangePercent = previousAmount > 0 ? ((amount - previousAmount) / previousAmount) * 100 : 0;
    const wasLimited = Math.abs(targetFactor - factor) > 0.000001;
    const roundingNote = Math.abs(actualChangePercent - appliedChangePercent) > 0.05
        ? ` Nach 0,01-ml-Rundung tatsächlich ${traceCalcFormatPercent(actualChangePercent)}.`
        : '';
    const adjustmentNote = (wasLimited
        ? `Rechnerisch ${traceCalcFormatPercent(targetChangePercent)} bis zum Ziel; auf ${traceCalcFormatPercent(appliedChangePercent)} nach ${intervalRule.adjustmentLabel}-Regel begrenzt.`
        : `Proportionale Änderung um ${traceCalcFormatPercent(appliedChangePercent)} auf Ziel ${traceCalcFormatValue(element.optimal, 2)} ${element.unit}.`) + roundingNote;

    if (value < element.optimal) {
        return {
            amount,
            status: 'low',
            label: 'unter Optimalwert',
            note: adjustmentNote
        };
    }

    if (value > element.optimal) {
        return {
            amount,
            status: 'high',
            label: 'über Optimalwert',
            note: adjustmentNote
        };
    }

    return {
        amount,
        status: 'ok',
        label: 'Optimalwert erreicht',
        note: `ICP-Wert entspricht exakt dem Ziel ${traceCalcFormatValue(element.optimal, 2)} ${element.unit}; Menge beibehalten.`
    };
}

function calculateTraceRecipe(config = getTraceCalculatorConfigFromUi()) {
    const state = ensureTraceCalculatorState();
    const startingRecipe = getTraceCalculatorStartingRecipe(config);
    const rows = traceCalculatorElements.map(element => {
        const measured = state.icp[element.item];
        const previousAmount = startingRecipe[element.item] || 0;
        const adjustment = getTraceCalculatorAdjustment(element, measured, previousAmount, config);
        return {
            ...element,
            measured,
            previousAmount,
            amount: adjustment.amount,
            grams: traceCalcElementGrams(element.item, adjustment.amount),
            previousGrams: traceCalcElementGrams(element.item, previousAmount),
            status: adjustment.status,
            statusLabel: adjustment.label,
            note: adjustment.note
        };
    });
    const volumeMl = config.dailyDoseMl * config.days;
    const totals = ['kationen', 'anionen'].reduce((acc, group) => {
        const elementSum = rows
            .filter(row => row.group === group)
            .reduce((sum, row) => sum + row.amount, 0);
        acc[group] = {
            elementsMl: traceCalcRound(elementSum),
            elementsG: traceCalcRound(rows
                .filter(row => row.group === group)
                .reduce((sum, row) => sum + row.grams, 0)),
            osmoseMl: traceCalcRound(volumeMl - elementSum),
            osmoseG: traceCalcRound(volumeMl - elementSum),
            volumeMl: traceCalcRound(volumeMl),
            volumeG: traceCalcRound(rows
                .filter(row => row.group === group)
                .reduce((sum, row) => sum + row.grams, 0) + Math.max(0, volumeMl - elementSum))
        };
        return acc;
    }, {});
    return { config, rows, totals };
}

function renderTraceCalculatorIcpInputs() {
    const state = ensureTraceCalculatorState();
    const container = document.getElementById('traceCalcIcpInputs');
    if (!container) return;
    if (container.dataset.traceCalcReady === 'true' && container.querySelectorAll('input').length === traceCalculatorElements.length) return;
    const renderGroup = (group, title, symbol, description) => `
        <div class="trace-icp-group trace-icp-group-${group}">
            <div class="trace-icp-group-head">
                <span class="trace-group-symbol" aria-hidden="true">${symbol}</span>
                <span><strong>${title}</strong><small>${description}</small></span>
            </div>
            <div class="trace-icp-fields">
                ${traceCalculatorElements.filter(element => element.group === group).map(element => {
                    const id = `traceCalcIcp-${element.symbol}`;
                    const optimumId = `${id}-optimum`;
                    const value = state.icp[element.item] ?? '';
                    const name = element.item.replace(` (${element.symbol})`, '');
                    return `
                        <div class="trace-icp-input">
                            <label for="${id}">
                                <span class="trace-icp-element"><strong>${element.symbol}</strong><small>${escapeHtml(name)}</small></span>
                                <span class="trace-target-range">${traceCalcFormatValue(element.min, 2)}-${traceCalcFormatValue(element.max, 2)}</span>
                            </label>
                            <div class="trace-input-with-unit">
                                <input type="number" id="${id}" step="0.01" value="${escapeHtml(value)}" placeholder="${String(element.optimal).replace('.', ',')}" data-trace-calc-item="${escapeHtml(element.item)}" aria-describedby="${optimumId}">
                                <span>${element.unit}</span>
                            </div>
                            <small class="trace-optimum" id="${optimumId}">Optimal ${traceCalcFormatValue(element.optimal, 2)} ${element.unit}</small>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    container.innerHTML = renderGroup('kationen', 'Kationen K+', 'K+', '7 Spurenelemente') + renderGroup('anionen', 'Anionen A-', 'A-', '4 Spurenelemente');
    container.querySelectorAll('input[data-trace-calc-item]').forEach(input => {
        input.addEventListener('input', () => updateTraceCalculatorIcp(input.dataset.traceCalcItem, input.value));
    });
    container.dataset.traceCalcReady = 'true';
}

function getTraceCalculatorIcpValidation() {
    const state = ensureTraceCalculatorState();
    const invalid = traceCalculatorElements.filter(element => {
        const raw = state.icp?.[element.item];
        if (raw === null || raw === undefined || String(raw).trim() === '') return true;
        const value = traceCalcNumber(raw, null);
        return value === null || value < 0;
    });
    return {
        valid: invalid.length === 0,
        invalid
    };
}

function hasTraceCalculatorIcpValues(entry) {
    const icp = entry?.icp || {};
    return traceCalculatorElements.every(element => {
        const raw = icp[element.item];
        if (raw === null || raw === undefined || String(raw).trim() === '') return false;
        const value = traceCalcNumber(raw, null);
        return value !== null && value >= 0;
    });
}

function hasTraceCalculatorStartMixture() {
    const state = ensureTraceCalculatorState();
    return state.history.some(entry => {
        normalizeTraceCalculatorHistoryEntry(entry);
        return entry.isStartMixture === true || entry.source === 'traceStartMixture';
    });
}

function canCreateTraceStartMixtureWithoutIcp() {
    const state = ensureTraceCalculatorState();
    return state.history.length === 0 && !hasTraceCalculatorStartMixture();
}

function showTraceCalculatorIcpValidationError(invalid, { allowStartMixture = false } = {}) {
    const labels = invalid.map(element => element.symbol).join(', ');
    alert(
        `Bitte alle Kationen- und Anionen-ICP-Werte logisch ausfüllen.\n\n` +
        `Fehlt oder ungültig: ${labels}` +
        (allowStartMixture
            ? '\n\nAusnahme: Wenn dies deine allererste Trace-Mischung ist, kannst du sie als Startmischung ohne ICP speichern.'
            : '\n\nNur die allererste Startmischung darf ohne ICP gespeichert werden.')
    );
    const first = invalid[0];
    const input = first ? document.getElementById(`traceCalcIcp-${first.symbol}`) : null;
    if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function renderTraceRecipeTable(recipe, group) {
    const groupRows = recipe.rows.filter(row => row.group === group);
    const total = recipe.totals[group];
    const title = group === 'kationen' ? 'Kationen Mischung K+' : 'Anionen Mischung A-';
    const shortTitle = group === 'kationen' ? 'Kationen K+' : 'Anionen A-';
    const groupSymbol = group === 'kationen' ? 'K+' : 'A-';
    return `
        <section class="trace-recipe-block trace-recipe-block-${group}" aria-label="${title}">
            <div class="trace-recipe-head">
                <div class="trace-recipe-title">
                    <span class="trace-group-symbol" aria-hidden="true">${groupSymbol}</span>
                    <span><strong>${shortTitle}</strong><small>${groupRows.length} Elemente</small></span>
                </div>
                <div class="trace-recipe-total">
                    <small>Flasche gesamt</small>
                    <strong>${traceCalcFormatMl(total.volumeMl)}</strong>
                    <span>${traceCalcFormatG(total.volumeG)}</span>
                </div>
            </div>
            <div class="trace-recipe-totals" aria-label="${title} Zusammenfassung">
                <span><small>Trace-Elemente</small><strong>${traceCalcFormatMl(total.elementsMl)}</strong><em>${traceCalcFormatG(total.elementsG)}</em></span>
                <span><small>Osmosewasser</small><strong>${traceCalcFormatMl(total.osmoseMl)}</strong><em>${traceCalcFormatG(total.osmoseG)}</em></span>
            </div>
            <div class="trace-recipe-table">
                <div class="trace-recipe-table-head" aria-hidden="true">
                    <span>Element</span>
                    <span>ICP-Status</span>
                    <span>Neue Mischung</span>
                </div>
                ${groupRows.map(row => {
                    const amountChangePercent = row.previousAmount > 0
                        ? ((row.amount - row.previousAmount) / row.previousAmount) * 100
                        : null;
                    const amountChangeClass = amountChangePercent > 0.000001
                        ? 'trace-change-up'
                        : amountChangePercent < -0.000001
                            ? 'trace-change-down'
                            : 'trace-change-even';
                    return `
                    <div class="trace-recipe-row trace-status-${row.status}">
                        <span class="trace-recipe-element">
                            <span class="trace-recipe-symbol">${escapeHtml(row.symbol)}</span>
                            <span><strong>${escapeHtml(row.item.replace(` (${row.symbol})`, ''))}</strong><small>${escapeHtml(row.symbol)}</small></span>
                        </span>
                        <span class="trace-recipe-icp">
                            <strong class="trace-status-pill">${escapeHtml(row.statusLabel)}</strong>
                            <small>${traceCalcFormatValue(row.measured, 2)} ${row.unit}</small>
                        </span>
                        <span class="trace-recipe-amount">
                            <span><strong>${traceCalcFormatMl(row.amount)}</strong><small>${traceCalcFormatG(row.grams)}</small></span>
                            <em>Vorher ${traceCalcFormatMlG(row.previousAmount, row.previousGrams)}</em>
                            <em class="${amountChangeClass}">${traceCalcFormatPercent(amountChangePercent)}</em>
                        </span>
                    </div>
                    `;
                }).join('')}
            </div>
        </section>
    `;
}

function getTraceCalculatorHistoryAnalysis(history) {
    if (!Array.isArray(history) || history.length < 2) {
        return {
            summary: 'Für eine belastbare Analyse mindestens zwei gespeicherte ICP-Mischungen erfassen.',
            improved: 0,
            worsened: 0,
            stable: 0,
            rows: []
        };
    }
    const previous = history[history.length - 2];
    const latest = history[history.length - 1];
    const rows = traceCalculatorElements.map(element => {
        const before = traceCalcNumber(previous.icp?.[element.item], null);
        const after = traceCalcNumber(latest.icp?.[element.item], null);
        const prevAmount = traceCalcNumber(previous.amounts?.[element.item], null);
        const nextAmount = traceCalcNumber(latest.amounts?.[element.item], null);
        const valuePercent = before && after !== null ? ((after - before) / Math.abs(before)) * 100 : null;
        const amountPercent = prevAmount && nextAmount !== null ? ((nextAmount - prevAmount) / Math.abs(prevAmount)) * 100 : null;
        const beforeDistance = before === null ? null : Math.abs(before - element.optimal);
        const afterDistance = after === null ? null : Math.abs(after - element.optimal);
        const tolerance = traceCalculatorRules.historyDistanceTolerance;
        let trend = 'unknown';
        if (beforeDistance !== null && afterDistance !== null) {
            if (afterDistance < beforeDistance * (1 - tolerance)) trend = 'improved';
            else if (afterDistance > beforeDistance * (1 + tolerance)) trend = 'worsened';
            else trend = 'stable';
        }
        return { element, before, after, prevAmount, nextAmount, valuePercent, amountPercent, trend };
    });
    const improved = rows.filter(row => row.trend === 'improved').length;
    const worsened = rows.filter(row => row.trend === 'worsened').length;
    const stable = rows.filter(row => row.trend === 'stable').length;
    const known = improved + worsened + stable;
    let summary = 'Noch zu wenige vergleichbare ICP-Werte für eine klare Bewertung.';
    if (known > 0 && improved > worsened) summary = `${improved} Werte bewegen sich näher ans Optimum, ${worsened} entfernen sich. Die Anpassungen wirken insgesamt positiv.`;
    if (known > 0 && worsened > improved) summary = `${worsened} Werte entfernen sich vom Optimum, ${improved} verbessern sich. Die letzten Anpassungen sollten vorsichtig geprüft werden.`;
    if (known > 0 && worsened === improved) summary = `${improved} Werte verbessern sich und ${worsened} verschlechtern sich. Der Verlauf ist gemischt.`;
    return { summary, improved, worsened, stable, rows };
}

function traceCalcFormatPercent(value) {
    if (value === null || value === undefined || !Number.isFinite(value)) return '-';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;
}

function traceCalcRulePercent(value, digits = 0) {
    return `${(Number(value || 0) * 100).toLocaleString('de-DE', { maximumFractionDigits: digits })} %`;
}

function renderTraceCalculationGuideTable(rows, columns, className = '') {
    return `
        <div class="trace-guide-table-wrap">
            <table class="trace-guide-table ${className}">
                <thead><tr>${columns.map(column => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr></thead>
                <tbody>
                    ${rows.map(row => `
                        <tr>${columns.map(column => `<td data-label="${escapeHtml(column.label)}">${row[column.key] || '-'}</td>`).join('')}</tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderTraceCalculationGuideElementTable(group) {
    const rows = traceCalculatorElements
        .filter(element => element.group === group)
        .map(element => {
            const density = densityFactors[element.item] || 1;
            return {
                element: `<strong>${escapeHtml(element.symbol)}</strong><small>${escapeHtml(element.item.replace(` (${element.symbol})`, ''))}</small>`,
                target: `${traceCalcFormatValue(element.min, 2)} / ${traceCalcFormatValue(element.optimal, 2)} / ${traceCalcFormatValue(element.max, 2)} ${escapeHtml(element.unit)}`,
                density: `${traceCalcFormatValue(density, 3)} g/ml`,
                normal: `<strong>${traceCalcFormatMl(element.normal)}</strong><small>${traceCalcFormatG(traceCalcElementGrams(element.item, element.normal))}</small>`,
                weak: `<strong>${traceCalcFormatMl(element.weak)}</strong><small>${traceCalcFormatG(traceCalcElementGrams(element.item, element.weak))}</small>`
            };
        });
    return renderTraceCalculationGuideTable(rows, [
        { key: 'element', label: 'Element' },
        { key: 'target', label: 'Min / Ziel / Max' },
        { key: 'density', label: 'Dichte' },
        { key: 'normal', label: 'Start normal' },
        { key: 'weak', label: 'Start schwach' }
    ], `trace-guide-element-table trace-guide-element-table-${group}`);
}

function renderTraceCalculationGuide() {
    const config = getTraceCalculatorConfigFromUi();
    const recipe = calculateTraceRecipe(config);
    const latest = getTraceCalculatorLatestHistory();
    const intervalRule = traceCalculatorIntervalRules[config.interval] || traceCalculatorIntervalRules.monthly;
    const scale = getTraceCalculatorScale(config);
    const requiredVolume = traceCalcRound(config.dailyDoseMl * config.days);
    const basisLabel = latest
        ? `Letzte gespeicherte Mischung vom ${formatTraceMixtureDate(latest)}`
        : `Startrezept für Besatz „${config.stocking === 'weak' ? 'schwach' : 'normal'}“`;

    const currentRows = recipe.rows.map(row => {
        const change = row.previousAmount > 0
            ? ((row.amount - row.previousAmount) / row.previousAmount) * 100
            : null;
        const measured = row.measured === null || row.measured === undefined || row.measured === ''
            ? 'nicht eingetragen'
            : `${traceCalcFormatValue(row.measured, 2)} ${escapeHtml(row.unit)}`;
        return {
            element: `<strong>${escapeHtml(row.symbol)}</strong><small>${escapeHtml(row.item.replace(` (${row.symbol})`, ''))}</small>`,
            measured,
            rule: `<strong>${escapeHtml(row.statusLabel)}</strong><small>${escapeHtml(row.note)}</small>`,
            previous: `<strong>${traceCalcFormatMl(row.previousAmount)}</strong><small>${traceCalcFormatG(row.previousGrams)}</small>`,
            result: `<strong>${traceCalcFormatMl(row.amount)}</strong><small>${traceCalcFormatG(row.grams)}</small>`,
            change: traceCalcFormatPercent(change)
        };
    });
    const intervalRows = Object.values(traceCalculatorIntervalRules).map(rule => ({
        interval: escapeHtml(rule.adjustmentLabel),
        change: `±${traceCalcRulePercent(rule.maxDoseChange)}`
    }));

    return `
        <div class="trace-guide">
            <div class="trace-guide-warning">
                <strong>Nicht von OSCI verifiziert</strong>
                <span>Der Calculator ist eine regelbasierte Rechenhilfe, keine chemische Simulation. Jede Mischung vor dem Ansetzen manuell prüfen.</span>
            </div>
            <p class="trace-guide-intro">Diese Anleitung wird aus denselben aktiven Regeln, Sollwerten, Startrezepten und Dichtefaktoren erzeugt wie die Berechnung. Änderungen an diesen Rechenparametern erscheinen dadurch automatisch auch hier.</p>

            <div class="trace-guide-summary" aria-label="Aktuelle Berechnungsgrundlage">
                <span><small>Grundlage</small><strong>${escapeHtml(basisLabel)}</strong></span>
                <span><small>Skalierungsfaktor</small><strong>${traceCalcFormatValue(scale, 3)}</strong></span>
                <span><small>Ziel je Lösung</small><strong>K+ ${traceCalcFormatMlG(recipe.totals.kationen.volumeMl, recipe.totals.kationen.volumeG)}<br>A- ${traceCalcFormatMlG(recipe.totals.anionen.volumeMl, recipe.totals.anionen.volumeG)}</strong></span>
                <span><small>Ziel &amp; Intervallgrenze</small><strong>${escapeHtml(traceCalculatorRules.targetLabel)}<br>±${traceCalcRulePercent(intervalRule.maxDoseChange)}</strong></span>
            </div>

            <details class="trace-guide-section" open>
                <summary><span>Aktuelle Berechnung</span><small>${escapeHtml(intervalRule.label)} · ${traceCalcFormatValue(config.tankLiters, 2)} L · ${traceCalcFormatValue(config.days, 0)} Tage</small></summary>
                <div class="trace-guide-section-body">
                    <p>Für jedes Element zeigt die Tabelle den verwendeten Ausgangswert, die angewendete Regel und das gerundete Ergebnis. „Ausgang“ ist entweder das skalierte Startrezept oder die auf die neuen Becken- und Laufzeitdaten skalierte letzte Mischung.</p>
                    ${renderTraceCalculationGuideTable(currentRows, [
                        { key: 'element', label: 'Element' },
                        { key: 'measured', label: 'ICP-Wert' },
                        { key: 'rule', label: 'Angewendete Regel' },
                        { key: 'previous', label: 'Ausgang' },
                        { key: 'result', label: 'Ergebnis' },
                        { key: 'change', label: 'Änderung' }
                    ], 'trace-guide-current-table')}
                </div>
            </details>

            <details class="trace-guide-section">
                <summary><span>1. Ausgangsrezept und Skalierung</span><small>Woher die erste Menge kommt</small></summary>
                <div class="trace-guide-section-body">
                    <p><strong>Ohne Historie:</strong> Der Rechner verwendet das Startrezept für normalen oder schwachen Besatz. Diese Basis gilt für ${traceCalculatorBase.liters} L Aquarium und ${traceCalculatorBase.days} Tage Laufzeit.</p>
                    <p><code>Skalierungsfaktor = Aquariumvolumen / ${traceCalculatorBase.liters} × Laufzeit / ${traceCalculatorBase.days}</code></p>
                    <p><code>Ausgangsmenge = Startmenge × Skalierungsfaktor</code></p>
                    <p><strong>Mit Historie:</strong> Die aktuellste aktive Elementmenge nach Ansatzdatum wird zuerst durch ihren alten Skalierungsfaktor geteilt und anschließend mit dem neuen Faktor multipliziert. So wird die vorherige Rezeptur auf das aktuelle Aquarium und die aktuelle Laufzeit übertragen.</p>
                    <p><code>Neue Ausgangsmenge = letzte Menge / alter Faktor × neuer Faktor</code></p>
                    <p>Die Besatz-Auswahl wirkt auf das Startrezept. Sobald für ein Element eine gespeicherte Menge vorhanden ist, hat der Verlauf Vorrang. Jede berechnete Elementmenge wird auf ${traceCalcFormatMl(traceCalculatorRules.roundingMl)} gerundet.</p>
                </div>
            </details>

            <details class="trace-guide-section">
                <summary><span>2. ICP-Regeln für Erhöhung und Reduktion</span><small>Wann sich eine Menge ändert</small></summary>
                <div class="trace-guide-section-body">
                    <p><strong>Ziel ist bei jedem Element immer der exakte Optimalwert.</strong> Minimum und Maximum dienen nur zur Einordnung und Warnung. Sie bilden keinen Bereich mehr, in dem die Mischung unverändert bleibt.</p>
                    <p><strong>Copy-&amp;-Paste-Import:</strong> Aus jeder Zeile wird der erste Messwert direkt hinter dem Elementnamen übernommen. Bei <code>nwb</code> mit zwei Grenzwerten verwendet der Import deren arithmetischen Mittelwert; <code>nn</code> wird als 0 eingelesen. Die Übernahme erfolgt nur, wenn alle ${traceCalculatorElements.length} Elemente von Fluorid bis Zink erkannt wurden, damit keine alten Einzelwerte unbemerkt stehen bleiben.</p>
                    <p><strong>Kein ICP-Wert:</strong> Die Ausgangsmenge wird unverändert übernommen, weil keine Korrektur berechnet werden kann.</p>
                    <p><strong>Positiver ICP-Wert:</strong> Der Calculator nimmt eine lineare Beziehung zwischen eingesetzter Elementmenge und später gemessenem ICP-Wert an.</p>
                    <p><code>Ziel-Korrekturfaktor = Optimalwert / gemessener ICP-Wert</code><br><code>Erlaubter Faktor = Ziel-Korrekturfaktor begrenzt auf 1 ± Intervallgrenze</code><br><code>Neue Menge = Ausgangsmenge × erlaubter Faktor</code></p>
                    <p>Liegt der ICP-Wert <strong>unter</strong> dem Optimalwert, wird die Menge erhöht. Liegt er <strong>über</strong> dem Optimalwert, wird sie reduziert. Nur beim exakt erreichten Optimalwert bleibt sie unverändert. Der Optimalwert bleibt das Ziel, wird bei größeren Abweichungen aber kontrolliert über mehrere ICP-Intervalle angenähert.</p>
                    ${renderTraceCalculationGuideTable(intervalRows, [
                        { key: 'interval', label: 'ICP-Intervall' },
                        { key: 'change', label: 'Maximale Dosisänderung' }
                    ], 'trace-guide-rule-table')}
                    <p><strong>Beispiel bei 4 Wochen:</strong> Gemessen 2 bei Optimalwert 4 würde rechnerisch +100 % verlangen, wird aber auf +10 % begrenzt. Gemessen 8 bei Optimalwert 4 würde −50 % verlangen, wird auf −10 % begrenzt.</p>
                    <p><strong>ICP-Wert 0:</strong> Eine Division durch 0 ist nicht möglich. Deshalb verwendet der Calculator die maximale erlaubte Erhöhung des gewählten ICP-Intervalls und markiert die Zeile zusätzlich zur manuellen Prüfung.</p>
                    <p>Das Ergebnis wird auf ${traceCalcFormatMl(traceCalculatorRules.roundingMl)} gerundet. Die Rundung darf die Intervallgrenze niemals überschreiten: Bei sehr kleinen Mengen bleibt die Dosis deshalb gegebenenfalls unverändert, wenn der nächste 0,1-ml-Schritt bereits über der erlaubten Prozentänderung läge.</p>
                </div>
            </details>

            <details class="trace-guide-section">
                <summary><span>3. Sollwerte und Startmengen</span><small>Gemeinsame Datenbasis des Calculators</small></summary>
                <div class="trace-guide-section-body">
                    <p>Die mittlere Zahl ist bei jedem Element der verbindliche Korrektur-Zielwert. Minimum und Maximum sind nur Orientierung. Die Startmengen gelten jeweils für ${traceCalculatorBase.liters} L, ${traceCalculatorBase.days} Tage und ${traceCalcFormatMl(traceCalculatorBase.volumeMl)} Zielvolumen je Lösung. Die Grammwerte entstehen aus der hinterlegten Produktdichte und können deshalb vom Zahlenwert in ml abweichen.</p>
                    <h4>Kationen K+</h4>
                    ${renderTraceCalculationGuideElementTable('kationen')}
                    <h4>Anionen A-</h4>
                    ${renderTraceCalculationGuideElementTable('anionen')}
                </div>
            </details>

            <details class="trace-guide-section">
                <summary><span>4. Flaschenvolumen, Osmosewasser und Gramm</span><small>Wie die fertige Lösung entsteht</small></summary>
                <div class="trace-guide-section-body">
                    <p><code>Zielvolumen je Lösung = Tagesdosierung × Laufzeit</code></p>
                    <p>Aktuell: ${traceCalcFormatMl(config.dailyDoseMl)} × ${traceCalcFormatValue(config.days, 0)} Tage = <strong>${traceCalcFormatMl(requiredVolume)}</strong> Zielvolumen je Lösung. Fertige K+ Lösung: <strong>${traceCalcFormatMlG(recipe.totals.kationen.volumeMl, recipe.totals.kationen.volumeG)}</strong>. Fertige A- Lösung: <strong>${traceCalcFormatMlG(recipe.totals.anionen.volumeMl, recipe.totals.anionen.volumeG)}</strong>.</p>
                    <p><code>Osmosewasser = Zielvolumen − Summe aller Elementmengen</code></p>
                    <p>Kationen: Elemente ${traceCalcFormatMlG(recipe.totals.kationen.elementsMl, recipe.totals.kationen.elementsG)}, Osmosewasser ${traceCalcFormatMlG(recipe.totals.kationen.osmoseMl, recipe.totals.kationen.osmoseG)}.</p>
                    <p>Anionen: Elemente ${traceCalcFormatMlG(recipe.totals.anionen.elementsMl, recipe.totals.anionen.elementsG)}, Osmosewasser ${traceCalcFormatMlG(recipe.totals.anionen.osmoseMl, recipe.totals.anionen.osmoseG)}.</p>
                    <p>Element-Grammwerte werden mit <code>ml × Produktdichte</code> berechnet. Für Osmosewasser werden ${traceCalcFormatValue(traceCalculatorRules.osmoseDensityGPerMl, 2)} g/ml angesetzt. Das maximale Flaschenvolumen von ${traceCalcFormatMl(config.bottleMaxMl)} ist eine Prüfgrenze: Es erzeugt eine Warnung, kürzt das berechnete Rezept aber nicht automatisch.</p>
                </div>
            </details>

            <details class="trace-guide-section">
                <summary><span>5. Historie, Prozententwicklung und Auslagerung</span><small>Wie die Wirkung bewertet wird</small></summary>
                <div class="trace-guide-section-body">
                    <p>Die Berechnung und Analyse nutzen die 5 aktuellsten aktiven Mischungen nach Ansatzdatum. Für den direkten Vergleich werden daraus die zwei neuesten aktiven Mischungen verwendet. Für jedes Element wird der absolute Abstand zum Optimalwert vor und nach der Anpassung berechnet.</p>
                    <p>Eine Verbesserung wird erst ab mehr als ${traceCalcRulePercent(traceCalculatorRules.historyDistanceTolerance)} kleinerem Abstand gezählt. Mehr als ${traceCalcRulePercent(traceCalculatorRules.historyDistanceTolerance)} größerer Abstand gilt als Verschlechterung; alles dazwischen als stabil.</p>
                    <p><code>ICP-Entwicklung % = (neuer ICP-Wert − alter ICP-Wert) / |alter ICP-Wert| × 100</code><br><code>Mengenentwicklung % = (neue Menge − alte Menge) / |alte Menge| × 100</code></p>
                    <p>Die Verlaufsgrafen nutzen alle gespeicherten ICP-Werte je Element. Die durchgezogene Linie zeigt die Messwerte, die gestrichelte Linie die lineare Trendlinie, die graue Linie den Durchschnitt und die grüne Linie den Optimalwert.</p>
                    <p><strong>Speichern</strong> legt Rezept, ICP-Werte, Datum und Konfiguration in der Historie ab. <strong>Speichern &amp; Auslagern</strong> prüft zuerst alle benötigten Lagerbestände. Fehlt eine Ware, wird nichts gespeichert und nichts teilweise ausgelagert. Bei ausreichendem Bestand werden alle verwendeten Trace-Produkte im aktiven Lager abgezogen und einzeln protokolliert.</p>
                </div>
            </details>
        </div>
    `;
}

function openTraceCalculationGuide() {
    return appAlert('', {
        eyebrow: 'Transparente Rechenlogik',
        title: 'So berechnet der Trace Calculator',
        confirmText: 'Schließen',
        html: renderTraceCalculationGuide(),
        wide: true,
        allowEscape: true
    });
}

function renderTraceCalculatorHistoryAnalysis(history) {
    const analysis = getTraceCalculatorHistoryAnalysis(history);
    const trendLabel = {
        improved: 'besser',
        worsened: 'schlechter',
        stable: 'stabil',
        unknown: 'offen'
    };
    const rows = analysis.rows.filter(row => row.before !== null || row.after !== null || row.amountPercent !== null);
    return `
        <div class="trace-analysis-block">
            <div class="trace-analysis-summary">
                <span class="trace-analysis-good"><strong>${analysis.improved}</strong><small>näher am Optimum</small></span>
                <span class="trace-analysis-neutral"><strong>${analysis.stable}</strong><small>stabil</small></span>
                <span class="trace-analysis-bad"><strong>${analysis.worsened}</strong><small>weiter entfernt</small></span>
            </div>
            <p class="trace-analysis-copy">${escapeHtml(analysis.summary)}</p>
            ${rows.length ? `
                <details class="trace-analysis-details">
                    <summary>Entwicklung je Element <span>${rows.length}</span></summary>
                    <div class="trace-analysis-table">
                        ${rows.map(row => `
                            <div class="trace-analysis-row trace-trend-${row.trend}">
                                <span><strong>${escapeHtml(row.element.symbol)}</strong><small>${escapeHtml(trendLabel[row.trend] || 'offen')}</small></span>
                                <span><strong>${traceCalcFormatPercent(row.valuePercent)}</strong><small>ICP-Wert</small></span>
                                <span><strong>${traceCalcFormatPercent(row.amountPercent)}</strong><small>Mischung ml/g</small></span>
                                <span><strong>${traceCalcFormatValue(row.after, 2)} ${row.element.unit}</strong><small>aktuell</small></span>
                            </div>
                        `).join('')}
                    </div>
                </details>
            ` : ''}
        </div>
    `;
}

function getTraceHistoryEntryTime(entry, fallbackIndex = 0) {
    const dateValue = entry?.mixtureDate || entry?.createdAt || '';
    const date = entry?.mixtureDate
        ? new Date(`${entry.mixtureDate}T00:00:00`)
        : new Date(dateValue || Date.now());
    const time = date.getTime();
    return Number.isFinite(time) ? time : fallbackIndex;
}

function getTraceHistoryTrend(values) {
    if (!Array.isArray(values) || values.length < 2) return null;
    const n = values.length;
    const minX = Math.min(...values.map(point => point.x));
    const maxX = Math.max(...values.map(point => point.x));
    const xRange = maxX - minX || 1;
    const normalized = values.map(point => ({ ...point, nx: (point.x - minX) / xRange }));
    const meanX = normalized.reduce((sum, point) => sum + point.nx, 0) / n;
    const meanY = values.reduce((sum, point) => sum + point.value, 0) / n;
    const denominator = normalized.reduce((sum, point) => sum + ((point.nx - meanX) ** 2), 0);
    if (!denominator) return null;
    const slope = normalized.reduce((sum, point) => sum + ((point.nx - meanX) * (point.value - meanY)), 0) / denominator;
    const intercept = meanY - (slope * meanX);
    return {
        slope,
        start: intercept,
        end: intercept + slope
    };
}

function renderTraceHistoryElementChart(element, history) {
    const values = history
        .map((entry, index) => ({
            value: traceCalcNumber(entry.icp?.[element.item], null),
            time: getTraceHistoryEntryTime(entry, index),
            date: formatTraceMixtureDate(entry)
        }))
        .filter(point => point.value !== null)
        .sort((a, b) => a.time - b.time);

    if (!values.length) {
        return `
            <div class="trace-history-element-card trace-history-element-empty">
                <div class="trace-history-element-head">
                    <span><strong>${escapeHtml(element.symbol)}</strong><small>${escapeHtml(element.item.replace(` (${element.symbol})`, ''))}</small></span>
                    <em>kein Verlauf</em>
                </div>
                <p>Für dieses Element wurde noch kein ICP-Wert gespeichert.</p>
            </div>
        `;
    }

    const average = values.reduce((sum, point) => sum + point.value, 0) / values.length;
    const latest = values[values.length - 1];
    const trendInput = values.map(point => ({ ...point, x: point.time }));
    const trend = getTraceHistoryTrend(trendInput);
    const trendPercent = values.length > 1 && values[0].value !== 0
        ? ((latest.value - values[0].value) / Math.abs(values[0].value)) * 100
        : null;
    const chartValues = [
        ...values.map(point => point.value),
        element.optimal,
        average,
        trend?.start,
        trend?.end
    ].filter(value => value !== null && value !== undefined && Number.isFinite(value));
    const min = Math.min(...chartValues);
    const max = Math.max(...chartValues);
    const padding = Math.max((max - min) * 0.14, Math.abs(element.optimal || 1) * 0.04, 0.1);
    const chartMin = min - padding;
    const chartMax = max + padding;
    const range = chartMax - chartMin || 1;
    const minTime = Math.min(...values.map(point => point.time));
    const maxTime = Math.max(...values.map(point => point.time));
    const timeRange = maxTime - minTime || 1;
    const width = 320;
    const height = 150;
    const top = 14;
    const bottom = 34;
    const left = 40;
    const right = 16;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const xForTime = time => left + (values.length === 1 ? plotWidth / 2 : ((time - minTime) / timeRange) * plotWidth);
    const yForValue = value => top + ((chartMax - value) / range) * plotHeight;
    const chartPoints = values.map(point => ({
        ...point,
        x: xForTime(point.time),
        y: yForValue(point.value)
    }));
    const points = chartPoints.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
    const averageY = yForValue(average).toFixed(1);
    const optimalY = yForValue(element.optimal).toFixed(1);
    const yTicks = [chartMax, (chartMax + chartMin) / 2, chartMin];
    const xTicks = values.length === 1
        ? [{ x: xForTime(values[0].time), label: formatTraceShortDateFromTime(values[0].time) }]
        : [
            { x: left, label: formatTraceShortDateFromTime(minTime) },
            { x: left + plotWidth / 2, label: formatTraceShortDateFromTime(minTime + timeRange / 2) },
            { x: left + plotWidth, label: formatTraceShortDateFromTime(maxTime) }
        ];
    const trendLine = trend
        ? `<line class="trace-history-trend-line" x1="${left}" y1="${yForValue(trend.start).toFixed(1)}" x2="${width - right}" y2="${yForValue(trend.end).toFixed(1)}"></line>`
        : '';
    const valueDots = chartPoints.map(point => `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3.4"></circle>`).join('');
    const interactiveDots = chartPoints.map(point => `
        <button type="button" class="trace-history-point" style="left:${(point.x / width * 100).toFixed(3)}%; top:${(point.y / height * 100).toFixed(3)}%;" aria-label="${escapeHtml(point.date)}: ${traceCalcFormatValue(point.value, 2)} ${escapeHtml(element.unit)}">
            <span>${escapeHtml(point.date)}<strong>${traceCalcFormatValue(point.value, 2)} ${escapeHtml(element.unit)}</strong></span>
        </button>
    `).join('');
    const distanceToOptimal = latest.value - element.optimal;
    const distanceClass = Math.abs(distanceToOptimal) <= Math.abs(element.optimal) * 0.05 ? 'trace-history-distance-ok' : distanceToOptimal > 0 ? 'trace-history-distance-high' : 'trace-history-distance-low';
    const trendLabel = trend
        ? `${trend.slope >= 0 ? '+' : ''}${traceCalcFormatValue(trend.slope, 3)} ${element.unit}/Verlauf`
        : 'noch offen';

    return `
        <div class="trace-history-element-card">
            <div class="trace-history-element-head">
                <span><strong>${escapeHtml(element.symbol)}</strong><small>${escapeHtml(element.item.replace(` (${element.symbol})`, ''))}</small></span>
                <em>${values.length} Wert${values.length === 1 ? '' : 'e'}</em>
            </div>
            <div class="trace-history-chart-stage">
                <svg class="trace-history-element-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Verlauf ${escapeHtml(element.item)}">
                    <rect class="trace-history-plot-bg" x="${left}" y="${top}" width="${plotWidth}" height="${plotHeight}" rx="4"></rect>
                    ${yTicks.map(value => `<line class="trace-history-grid-line" x1="${left}" y1="${yForValue(value).toFixed(1)}" x2="${width - right}" y2="${yForValue(value).toFixed(1)}"></line>`).join('')}
                    ${xTicks.map(tick => `<line class="trace-history-grid-line trace-history-grid-line-x" x1="${tick.x.toFixed(1)}" y1="${top}" x2="${tick.x.toFixed(1)}" y2="${top + plotHeight}"></line>`).join('')}
                    <line class="trace-history-axis-line" x1="${left}" y1="${top}" x2="${left}" y2="${top + plotHeight}"></line>
                    <line class="trace-history-axis-line" x1="${left}" y1="${top + plotHeight}" x2="${width - right}" y2="${top + plotHeight}"></line>
                    ${yTicks.map(value => `<text class="trace-history-axis-text trace-history-axis-y" x="${left - 5}" y="${(yForValue(value) + 3).toFixed(1)}">${traceCalcFormatValue(value, 2)}</text>`).join('')}
                    ${xTicks.map(tick => `<text class="trace-history-axis-text trace-history-axis-x" x="${tick.x.toFixed(1)}" y="${height - 8}">${escapeHtml(tick.label)}</text>`).join('')}
                    <text class="trace-history-axis-title trace-history-axis-title-y" x="7" y="${top + plotHeight / 2}" transform="rotate(-90 7 ${top + plotHeight / 2})">${escapeHtml(element.unit)}</text>
                    <text class="trace-history-axis-title trace-history-axis-title-x" x="${left + plotWidth / 2}" y="${height - 1}">Zeit</text>
                    <line class="trace-history-optimal-line" x1="${left}" y1="${optimalY}" x2="${width - right}" y2="${optimalY}"></line>
                    <line class="trace-history-average-line" x1="${left}" y1="${averageY}" x2="${width - right}" y2="${averageY}"></line>
                    ${trendLine}
                    <polyline class="trace-history-value-line" points="${points}" fill="none"></polyline>
                    <g class="trace-history-value-points">${valueDots}</g>
                </svg>
                <div class="trace-history-point-layer">${interactiveDots}</div>
            </div>
            <div class="trace-history-element-stats">
                <span><small>Aktuell</small><strong>${traceCalcFormatValue(latest.value, 2)} ${escapeHtml(element.unit)}</strong></span>
                <span><small>Durchschnitt</small><strong>${traceCalcFormatValue(average, 2)} ${escapeHtml(element.unit)}</strong></span>
                <span><small>Trend</small><strong>${escapeHtml(trendLabel)}</strong></span>
                <span><small>Entwicklung</small><strong>${traceCalcFormatPercent(trendPercent)}</strong></span>
                <span class="${distanceClass}"><small>Abweichung Ziel</small><strong>${distanceToOptimal >= 0 ? '+' : ''}${traceCalcFormatValue(distanceToOptimal, 2)} ${escapeHtml(element.unit)}</strong></span>
            </div>
        </div>
    `;
}

function renderTraceCalculatorHistoryChart(history) {
    const hasValues = traceCalculatorElements.some(element => history.some(entry => traceCalcNumber(entry.icp?.[element.item], null) !== null));
    if (!hasValues) return '<p class="hint">Für Verlaufsgrafen gespeicherte ICP-Messwerte eintragen.</p>';
    return `
        <details class="trace-history-chart-wrap">
            <summary class="trace-history-chart-head">
                <strong>Verlauf je Element</strong>
                <small>Messwertkurve, Trendlinie, Durchschnitt und Optimalwert</small>
            </summary>
            <div class="trace-history-chart-legend" aria-hidden="true">
                <span class="trace-legend-value">ICP</span>
                <span class="trace-legend-trend">Trend</span>
                <span class="trace-legend-average">Durchschnitt</span>
                <span class="trace-legend-optimal">Optimal</span>
            </div>
            <div class="trace-history-chart">
                ${traceCalculatorElements.map(element => renderTraceHistoryElementChart(element, history)).join('')}
            </div>
        </details>
    `;
}

function renderTraceCalculatorHistory() {
    const container = document.getElementById('traceCalculatorHistory');
    if (!container) return;
    const state = ensureTraceCalculatorState();
    const history = getTraceCalculatorHistoryEntries({ sort: 'desc' });
    const activeHistoryAll = getTraceCalculatorHistoryEntries({ calculationOnly: true, sort: 'asc' });
    const calculationHistory = getTraceCalculatorAnalysisHistory();
    const basisHistory = getTraceCalculatorRecipeBasisHistory();
    const chartHistory = sortTraceHistoryByDate(history, 'asc');
    if (!history.length) {
        container.innerHTML = `
            <div class="card workflow-card trace-history-block trace-history-empty">
                <div class="trace-history-head">
                    <span><strong>Historie &amp; Analyse</strong><small>Vergleich der gespeicherten Mischungen</small></span>
                    <span class="trace-history-count">0 Mischungen</span>
                </div>
                <p>Nach dem ersten Speichern erscheinen hier Verlauf, prozentuale Entwicklung und die Wirkung der Anpassungen.</p>
            </div>
        `;
        return;
    }
    const latestRelevant = basisHistory[basisHistory.length - 1] || null;
    const ignoredCount = history.length - activeHistoryAll.length;
    const withIcpCount = activeHistoryAll.filter(hasTraceCalculatorIcpValues).length;
    const startCount = activeHistoryAll.filter(isTraceStartMixture).length;
    const calculationInfo = calculationHistory.length
        ? `${calculationHistory.length} aktuellste aktive mit ICP nach Datum`
        : startCount
            ? 'Startmischung als Ausgangsbasis, noch keine ICP-Analyse'
            : 'Keine aktiven Einträge';
    const analysisHint = startCount
        ? '<p class="hint">Die Startmischung dient als Ausgangsbasis. Für Analyse und automatische Bewertung braucht der nächste Eintrag vollständige ICP-Werte.</p>'
        : '<p class="hint">Alle Historien-Einträge sind deaktiviert oder enthalten keine vollständigen ICP-Werte. Der Rechner nutzt wieder das Basisrezept.</p>';
    container.innerHTML = `
        <div class="card workflow-card trace-history-block">
            <div class="trace-history-head">
                <span><strong>Historie &amp; Analyse</strong><small>${latestRelevant ? `Berechnung nutzt ${calculationInfo} · letzter Ansatz ${formatTraceMixtureDate(latestRelevant)}` : 'Kein aktiver Eintrag für die Berechnung'}</small></span>
                <span class="trace-history-count">${withIcpCount} mit ICP${startCount ? ` · ${startCount} Start` : ''}${ignoredCount ? ` · ${ignoredCount} ignoriert` : ''}</span>
            </div>
            <div class="trace-history-content">
                ${calculationHistory.length ? renderTraceCalculatorHistoryAnalysis(calculationHistory) : analysisHint}
                ${renderTraceCalculatorHistoryChart(chartHistory)}
                <div class="trace-history-list">
                    <div class="trace-history-list-head"><strong>Gespeicherte Mischungen</strong><small>Alle ${history.length} nach Ansatzdatum sortiert · Bearbeiten steuert, ob ein Eintrag einfließt</small></div>
                    ${history.map(entry => {
                        const status = getTraceHistoryEntryStatus(entry);
                        return `
                        <div class="trace-history-row ${entry.includeInCalculation === false ? 'trace-history-row-inactive' : ''}">
                            <span class="trace-history-date"><strong>${formatTraceMixtureDate(entry)}</strong><small>${traceCalcFormatValue(entry.config?.tankLiters, 2)} L · ${traceCalcFormatValue(entry.config?.days, 0)} Tage · ${escapeHtml(getTraceHistoryEntrySummary(entry))}</small></span>
                            <span class="trace-history-status trace-history-status-${status.className}"><strong>${escapeHtml(status.label)}</strong><small>${escapeHtml(status.note)}</small></span>
                            <span class="trace-history-mixture"><small>Kationen K+</small><strong>${traceCalcFormatMlG(entry.totals?.kationen?.volumeMl || 0, getTraceHistoryTotalGrams(entry, 'kationen'))}</strong></span>
                            <span class="trace-history-mixture"><small>Anionen A-</small><strong>${traceCalcFormatMlG(entry.totals?.anionen?.volumeMl || 0, getTraceHistoryTotalGrams(entry, 'anionen'))}</strong></span>
                            <div class="trace-history-actions">
                                <button type="button" class="btn-secondary" onclick='editTraceHistoryEntry(${jsArg(entry.id)})'>Bearbeiten</button>
                                <button type="button" class="btn-out" onclick='deleteTraceHistoryEntry(${jsArg(entry.id)})'>Löschen</button>
                            </div>
                        </div>
                    `;}).join('')}
                </div>
            </div>
        </div>
    `;
}

function recalculateTraceHistoryEntryTotals(entry) {
    entry.grams = Object.fromEntries(Object.entries(entry.amounts || {}).map(([item, amount]) => [item, traceCalcElementGrams(item, amount)]));
    entry.totals = getTraceTotalsFromAmounts(entry.amounts || {}, entry.config || {});
    return entry;
}

function toggleTraceHistoryCalculation(id) {
    const state = ensureTraceCalculatorState();
    const entry = state.history.find(item => item.id === id);
    if (!entry) return;
    normalizeTraceCalculatorHistoryEntry(entry);
    entry.includeInCalculation = entry.includeInCalculation === false;
    entry.updatedAt = Date.now();
    saveDB();
    renderTraceCalculator();
    const status = getTraceHistoryEntryStatus(entry);
    showToast(entry.includeInCalculation
        ? `${status.label}: Eintrag ist aktiv. Ohne vollständige ICP-Werte bleibt er von Analyse/Berechnung ausgeschlossen.`
        : 'Historien-Eintrag wird für die Trace-Berechnung ignoriert', 'info');
}

function getTraceHistoryAmountsText(entry, group = '') {
    return traceCalculatorElements
        .filter(element => !group || element.group === group)
        .filter(element => traceCalcNumber(entry.amounts?.[element.item], null) !== null)
        .map(element => `${element.symbol} ${traceCalcFormatRawMl(entry.amounts[element.item]).replace(' ml', '')}`)
        .join('\n');
}

function parseTraceHistoryAmountsText(text, group = '') {
    const amounts = {};
    String(text || '').split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        const match = trimmed.match(/^([A-Za-z]+)\s*[:=]?\s*([0-9]+(?:[,.][0-9]+)?)/);
        if (!match) return;
        const symbol = match[1].trim().toUpperCase();
        const element = traceCalculatorElements.find(item => item.symbol.toUpperCase() === symbol);
        if (!element || (group && element.group !== group)) return;
        const amount = traceCalcNumber(match[2], null);
        if (amount !== null) amounts[element.item] = traceCalcRound(amount);
    });
    return amounts;
}

function getTraceHistoryGroupTotalValue(entry, group, key) {
    return traceCalcNumber(entry?.totals?.[group]?.[key], null);
}

async function editTraceHistoryEntry(id) {
    const state = ensureTraceCalculatorState();
    const entry = state.history.find(item => item.id === id);
    if (!entry) return;
    normalizeTraceCalculatorHistoryEntry(entry);
    const values = await showAppDialog({
        kind: 'prompt',
        type: 'info',
        title: 'Trace-Historie bearbeiten',
        eyebrow: 'Historie & Analyse',
        message: 'Passe den Historien-Eintrag an. Nur Einträge mit „Ja“ fließen in die nächste Trace-Berechnung ein.',
        wide: true,
        confirmText: 'Speichern',
        cancelText: 'Abbrechen',
        fields: [
            {
                name: 'includeInCalculation',
                label: 'In weitere Trace-Berechnung einfließen lassen?',
                value: entry.includeInCalculation === false ? 'no' : 'yes',
                options: [
                    { value: 'yes', label: 'Ja, einbeziehen' },
                    { value: 'no', label: 'Nein, ignorieren' }
                ]
            },
            {
                name: 'mixtureDate',
                label: 'Ansatzdatum',
                type: 'date',
                value: entry.mixtureDate || getTodayDateInputValue(),
                required: true
            },
            {
                name: 'tankLiters',
                label: 'Aquariumvolumen in Litern',
                type: 'number',
                inputMode: 'decimal',
                value: String(entry.config?.tankLiters || state.config?.tankLiters || 500),
                required: true
            },
            {
                name: 'days',
                label: 'Laufzeit in Tagen',
                type: 'number',
                inputMode: 'numeric',
                value: String(entry.config?.days || state.config?.days || 40),
                required: true
            },
            {
                name: 'dailyDoseMl',
                label: 'Tagesdosierung je Lösung in ml',
                type: 'number',
                inputMode: 'decimal',
                value: String(entry.config?.dailyDoseMl || state.config?.dailyDoseMl || 5),
                required: true
            },
            {
                name: 'kationenVolumeMl',
                label: 'Kationen Gesamtvolumen K+ (ml)',
                type: 'number',
                inputMode: 'decimal',
                value: String(getTraceHistoryGroupTotalValue(entry, 'kationen', 'volumeMl') ?? ''),
                required: true
            },
            {
                name: 'kationenOsmoseMl',
                label: 'Kationen Osmoseanteil K+ (ml)',
                type: 'number',
                inputMode: 'decimal',
                value: String(getTraceHistoryGroupTotalValue(entry, 'kationen', 'osmoseMl') ?? ''),
                required: true
            },
            {
                name: 'anionenVolumeMl',
                label: 'Anionen Gesamtvolumen A- (ml)',
                type: 'number',
                inputMode: 'decimal',
                value: String(getTraceHistoryGroupTotalValue(entry, 'anionen', 'volumeMl') ?? ''),
                required: true
            },
            {
                name: 'anionenOsmoseMl',
                label: 'Anionen Osmoseanteil A- (ml)',
                type: 'number',
                inputMode: 'decimal',
                value: String(getTraceHistoryGroupTotalValue(entry, 'anionen', 'osmoseMl') ?? ''),
                required: true
            },
            {
                name: 'kationenAmounts',
                label: 'Kationen K+ Elementmengen',
                value: getTraceHistoryAmountsText(entry, 'kationen'),
                multiline: true,
                required: true,
                description: 'Eine Zeile pro Kation, z.B. Co 33,01'
            },
            {
                name: 'anionenAmounts',
                label: 'Anionen A- Elementmengen',
                value: getTraceHistoryAmountsText(entry, 'anionen'),
                multiline: true,
                required: true,
                description: 'Eine Zeile pro Anion, z.B. F 32,18'
            }
        ]
    });
    if (!values) return;
    const parsedAmounts = {
        ...parseTraceHistoryAmountsText(values.kationenAmounts, 'kationen'),
        ...parseTraceHistoryAmountsText(values.anionenAmounts, 'anionen')
    };
    if (!Object.keys(parsedAmounts).length) {
        await appAlert('Keine gültigen Elementmengen erkannt. Änderungen wurden nicht gespeichert.', { title: 'Bitte prüfen', type: 'warning' });
        return;
    }
    entry.includeInCalculation = values.includeInCalculation !== 'no';
    entry.mixtureDate = String(values.mixtureDate || '').trim() || entry.mixtureDate || getTodayDateInputValue();
    entry.config = {
        ...(entry.config || {}),
        tankLiters: Math.max(1, traceCalcNumber(values.tankLiters, entry.config?.tankLiters || 500)),
        days: Math.max(1, Math.round(traceCalcNumber(values.days, entry.config?.days || 40))),
        dailyDoseMl: Math.max(0.01, traceCalcNumber(values.dailyDoseMl, entry.config?.dailyDoseMl || 5))
    };
    entry.amounts = parsedAmounts;
    entry.updatedAt = Date.now();
    recalculateTraceHistoryEntryTotals(entry);
    const kationenVolumeMl = Math.max(0, traceCalcNumber(values.kationenVolumeMl, entry.totals?.kationen?.volumeMl || 0));
    const kationenOsmoseMl = Math.max(0, traceCalcNumber(values.kationenOsmoseMl, entry.totals?.kationen?.osmoseMl || 0));
    const anionenVolumeMl = Math.max(0, traceCalcNumber(values.anionenVolumeMl, entry.totals?.anionen?.volumeMl || 0));
    const anionenOsmoseMl = Math.max(0, traceCalcNumber(values.anionenOsmoseMl, entry.totals?.anionen?.osmoseMl || 0));
    const kationenItems = traceCalculatorElements.filter(element => element.group === 'kationen').map(element => element.item);
    const anionenItems = traceCalculatorElements.filter(element => element.group === 'anionen').map(element => element.item);
    const kationenElementsMl = kationenItems.reduce((sum, item) => sum + traceCalcNumber(entry.amounts[item], 0), 0);
    const anionenElementsMl = anionenItems.reduce((sum, item) => sum + traceCalcNumber(entry.amounts[item], 0), 0);
    const kationenElementsG = kationenItems.reduce((sum, item) => sum + traceCalcElementGrams(item, traceCalcNumber(entry.amounts[item], 0)), 0);
    const anionenElementsG = anionenItems.reduce((sum, item) => sum + traceCalcElementGrams(item, traceCalcNumber(entry.amounts[item], 0)), 0);
    entry.totals.kationen = {
        ...entry.totals.kationen,
        elementsMl: traceCalcRound(kationenElementsMl),
        elementsG: traceCalcRound(kationenElementsG),
        osmoseMl: traceCalcRound(kationenOsmoseMl),
        osmoseG: traceCalcRound(kationenOsmoseMl),
        volumeMl: traceCalcRound(kationenVolumeMl),
        volumeG: traceCalcRound(kationenElementsG + kationenOsmoseMl)
    };
    entry.totals.anionen = {
        ...entry.totals.anionen,
        elementsMl: traceCalcRound(anionenElementsMl),
        elementsG: traceCalcRound(anionenElementsG),
        osmoseMl: traceCalcRound(anionenOsmoseMl),
        osmoseG: traceCalcRound(anionenOsmoseMl),
        volumeMl: traceCalcRound(anionenVolumeMl),
        volumeG: traceCalcRound(anionenElementsG + anionenOsmoseMl)
    };
    saveDB();
    renderTraceExportInputs();
    renderTraceCalculator();
    showToast('Historien-Eintrag aktualisiert', 'success');
}

function deleteTraceHistoryEntry(id) {
    const state = ensureTraceCalculatorState();
    const entry = state.history.find(item => item.id === id);
    if (!entry) return;
    if (!confirm(`Historien-Eintrag vom ${formatTraceMixtureDate(entry)} löschen?`)) return;
    state.history = state.history.filter(item => item.id !== id);
    saveDB();
    renderTraceCalculator();
    showToast('Historien-Eintrag gelöscht', 'success');
}

function getTraceCalculatorConfigWarnings(config) {
    const plannedVolume = traceCalcRound(config.dailyDoseMl * config.days);
    if (plannedVolume <= config.bottleMaxMl) return [];
    const maxDailyDose = config.days > 0 ? config.bottleMaxMl / config.days : 0;
    const maxRuntime = config.dailyDoseMl > 0 ? Math.floor(config.bottleMaxMl / config.dailyDoseMl) : 0;
    return [
        `K+: ${traceCalcFormatMl(plannedVolume)} überschreitet ${traceCalcFormatMl(config.bottleMaxMl)} Flaschenvolumen.`,
        `A-: ${traceCalcFormatMl(plannedVolume)} überschreitet ${traceCalcFormatMl(config.bottleMaxMl)} Flaschenvolumen.`,
        `Vorschlag: Bei ${traceCalcFormatValue(config.days, 0)} Tagen und ${traceCalcFormatMl(config.bottleMaxMl)} Flaschenvolumen maximal ${traceCalcFormatRawMl(maxDailyDose)} pro Tag dosieren.`,
        `Alternative: Bei ${traceCalcFormatMl(config.dailyDoseMl)} pro Tag reicht ${traceCalcFormatMl(config.bottleMaxMl)} für maximal ${traceCalcFormatValue(maxRuntime, 0)} Tage.`
    ];
}

function renderTraceCalculatorConfigWarnings(config) {
    const container = document.getElementById('traceCalcConfigWarnings');
    if (!container) return;
    const warnings = getTraceCalculatorConfigWarnings(config);
    if (!warnings.length) {
        container.innerHTML = '';
        container.hidden = true;
        return;
    }
    container.hidden = false;
    container.innerHTML = `
        <div class="workflow-message workflow-message--error trace-plan-warning" role="alert">
            <strong>Bitte prüfen</strong>
            <span>${warnings.map(escapeHtml).join('<br>')}</span>
        </div>
    `;
}

function renderTraceCalculator() {
    const root = document.getElementById('traceCalculatorResult');
    if (!root) return;
    const state = ensureTraceCalculatorState();
    syncTraceCalculatorConfigUi();
    renderTraceCalculatorIcpInputs();
    const config = getTraceCalculatorConfigFromUi();
    const recipe = calculateTraceRecipe(config);
    state.latestRecipe = recipe;
    renderTraceCalculatorConfigWarnings(config);

    const warnings = [];
    ['kationen', 'anionen'].forEach(group => {
        const total = recipe.totals[group];
        const label = group === 'kationen' ? 'K+' : 'A-';
        if (total.osmoseMl < 0) warnings.push(`${label}: Elementmengen sind größer als das Zielvolumen.`);
    });

    const dailyKationenG = recipe.totals.kationen.volumeMl
        ? traceCalcRound(config.dailyDoseMl * recipe.totals.kationen.volumeG / recipe.totals.kationen.volumeMl)
        : traceCalcRound(config.dailyDoseMl);
    const dailyAnionenG = recipe.totals.anionen.volumeMl
        ? traceCalcRound(config.dailyDoseMl * recipe.totals.anionen.volumeG / recipe.totals.anionen.volumeMl)
        : traceCalcRound(config.dailyDoseMl);

    root.innerHTML = `
        <div class="trace-calculator-result">
            ${warnings.length ? `<div class="workflow-message workflow-message--error" role="alert"><strong>Bitte prüfen</strong><span>${warnings.map(escapeHtml).join('<br>')}</span></div>` : ''}
            <div class="trace-result-head">
                <span><small>Berechnung</small><strong>Rezeptvorschlag</strong><em>Ansatzdatum ${formatTraceDateInput(state.currentMixtureDate)}</em></span>
                <span class="trace-result-dose"><small>Täglich je Lösung</small><strong>${traceCalcFormatMl(config.dailyDoseMl)}</strong><em>K+ ${traceCalcFormatG(dailyKationenG)} · A- ${traceCalcFormatG(dailyAnionenG)}</em></span>
            </div>
            <div class="trace-summary-strip">
                <span class="trace-summary-kationen"><small>Kationen K+ gesamt</small><strong>${traceCalcFormatMl(recipe.totals.kationen.volumeMl)}</strong><em>${traceCalcFormatG(recipe.totals.kationen.volumeG)}</em></span>
                <span class="trace-summary-anionen"><small>Anionen A- gesamt</small><strong>${traceCalcFormatMl(recipe.totals.anionen.volumeMl)}</strong><em>${traceCalcFormatG(recipe.totals.anionen.volumeG)}</em></span>
                <span><small>Laufzeit</small><strong>${traceCalcFormatValue(config.days, 0)} Tage</strong><em>${traceCalcFormatValue(config.tankLiters, 2)} L Aquarium</em></span>
            </div>
            <div class="trace-recipe-split">
                ${renderTraceRecipeTable(recipe, 'kationen')}
                ${renderTraceRecipeTable(recipe, 'anionen')}
            </div>
        </div>
    `;
    renderTraceCalculatorHistory();
    saveDB(false);
}

function updateTraceCalculatorIcp(item, value) {
    const state = ensureTraceCalculatorState();
    if (String(value || '').trim() === '') delete state.icp[item];
    else state.icp[item] = String(value).replace(',', '.');
    renderTraceCalculator();
}

function parseTraceCalculatorIcpCell(cell) {
    const clean = String(cell || '')
        .replace(/[\*_`]/g, '')
        .replace(/\u00a0/g, ' ')
        .trim();
    if (!clean) return null;

    if (/^nn\b/i.test(clean)) {
        return { value: 0, method: 'nn' };
    }

    if (/\bnwb\b/i.test(clean)) {
        const range = clean.match(/\bnwb\b[^\d+-]*([+-]?\d+(?:[.,]\d+)?)\s*[-\u2013\u2014]\s*([+-]?\d+(?:[.,]\d+)?)/i);
        if (!range) return null;
        const minimum = Number(range[1].replace(',', '.'));
        const maximum = Number(range[2].replace(',', '.'));
        if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return null;
        return {
            value: (minimum + maximum) / 2,
            method: 'nwb',
            minimum,
            maximum
        };
    }

    const numeric = clean.match(/^[^\d+-]*([+-]?\d+(?:[.,]\d+)?)/);
    if (!numeric) return null;
    const value = Number(numeric[1].replace(',', '.'));
    return Number.isFinite(value) ? { value, method: 'numeric' } : null;
}

function parseTraceCalculatorIcpText(text) {
    const lines = String(text || '')
        .replace(/\r/g, '')
        .split('\n')
        .map(line => line.replace(/\u00a0/g, ' '));

    return traceCalculatorElements.reduce((parsed, element) => {
        const symbolPattern = new RegExp(`\\(${element.symbol}\\)`, 'i');
        const rowIndex = lines.findIndex(line => symbolPattern.test(line));
        if (rowIndex < 0) return parsed;

        const row = lines[rowIndex];
        const symbolMatch = row.match(symbolPattern);
        const remainder = symbolMatch
            ? row.slice((symbolMatch.index || 0) + symbolMatch[0].length)
            : '';
        const tabCells = remainder
            .split(/\t+/)
            .map(cell => cell.trim())
            .filter(Boolean);
        const measuredCell = tabCells[0] || remainder.trim() || String(lines[rowIndex + 1] || '').trim();
        const measurement = parseTraceCalculatorIcpCell(measuredCell);
        if (!measurement) return parsed;

        parsed.push({
            ...measurement,
            item: element.item,
            symbol: element.symbol,
            unit: element.unit
        });
        return parsed;
    }, []);
}

function setTraceCalculatorIcpImportStatus(type, title, details = '') {
    const status = document.getElementById('traceCalcIcpImportStatus');
    if (!status) return;
    status.className = `trace-icp-import-status trace-icp-import-status-${type}`;
    status.innerHTML = `<strong>${escapeHtml(title)}</strong>${details ? `<span>${escapeHtml(details)}</span>` : ''}`;
    status.hidden = false;
}

function importTraceCalculatorIcpText(sourceText) {
    const textarea = document.getElementById('traceCalcIcpPaste');
    const text = sourceText === undefined ? textarea?.value || '' : String(sourceText || '');
    const parsed = parseTraceCalculatorIcpText(text);
    const parsedItems = new Set(parsed.map(entry => entry.item));
    const missing = traceCalculatorElements.filter(element => !parsedItems.has(element.item));

    if (missing.length) {
        const missingLabels = missing.map(element => element.symbol).join(', ');
        setTraceCalculatorIcpImportStatus(
            'error',
            'ICP-Werte wurden nicht übernommen',
            `Erkannt: ${parsed.length} von ${traceCalculatorElements.length}. Nicht erkannt: ${missingLabels}. Bitte den vollständigen Bereich von Fluorid bis Zink erneut kopieren.`
        );
        return false;
    }

    const state = ensureTraceCalculatorState();
    parsed.forEach(entry => {
        state.icp[entry.item] = String(entry.value);
    });
    const inputContainer = document.getElementById('traceCalcIcpInputs');
    if (inputContainer) delete inputContainer.dataset.traceCalcReady;
    renderTraceCalculator();

    const values = parsed
        .map(entry => `${entry.symbol} ${traceCalcFormatValue(entry.value, 3)} ${entry.unit}`)
        .join(' · ');
    const conversions = parsed
        .filter(entry => entry.method !== 'numeric')
        .map(entry => entry.method === 'nn'
            ? `${entry.symbol}: nn = 0 ${entry.unit}`
            : `${entry.symbol}: nwb ${traceCalcFormatValue(entry.minimum, 3)}-${traceCalcFormatValue(entry.maximum, 3)} = Mittelwert ${traceCalcFormatValue(entry.value, 3)} ${entry.unit}`)
        .join(' · ');
    setTraceCalculatorIcpImportStatus(
        'success',
        `${parsed.length} ICP-Werte übernommen`,
        conversions ? `${values}. Umgerechnet: ${conversions}.` : values
    );
    showToast(`${parsed.length} ICP-Werte übernommen`, 'success');
    return true;
}

function handleTraceCalculatorIcpPaste(event) {
    const pastedText = event?.clipboardData?.getData('text/plain');
    if (!pastedText) {
        window.setTimeout(() => importTraceCalculatorIcpText(), 0);
        return;
    }
    event.preventDefault();
    const textarea = event.currentTarget || document.getElementById('traceCalcIcpPaste');
    if (textarea) textarea.value = pastedText;
    importTraceCalculatorIcpText(pastedText);
}

function clearTraceCalculatorIcpImport() {
    const textarea = document.getElementById('traceCalcIcpPaste');
    const status = document.getElementById('traceCalcIcpImportStatus');
    if (textarea) {
        textarea.value = '';
        textarea.focus();
    }
    if (status) {
        status.hidden = true;
        status.textContent = '';
        status.className = 'trace-icp-import-status';
    }
}

function loadTraceCalculatorFromLast() {
    const latest = getTraceCalculatorLatestHistory();
    if (!latest) {
        showToast('Noch keine gespeicherte Trace-Mischung vorhanden', 'info');
        return;
    }
    loadTraceCalculatorHistoryEntry(latest.id);
}

function loadTraceCalculatorHistoryEntry(id) {
    const state = ensureTraceCalculatorState();
    const entry = state.history.find(item => item.id === id);
    if (!entry) return;
    state.config = { ...state.config, ...(entry.config || {}) };
    state.currentMixtureDate = entry.mixtureDate || getTodayDateInputValue();
    state.icp = { ...(entry.icp || {}) };
    document.querySelectorAll('[id^="traceCalc"]').forEach(el => {
        if (el && el.dataset) delete el.dataset.traceCalcSynced;
    });
    const icpContainer = document.getElementById('traceCalcIcpInputs');
    if (icpContainer) delete icpContainer.dataset.traceCalcReady;
    renderTraceCalculator();
    showToast('Trace-Mischung geladen', 'success');
}

function createTraceCalculatorMixturePayload() {
    const state = ensureTraceCalculatorState();
    const validation = getTraceCalculatorIcpValidation();
    const canSaveAsStartMixture = !validation.valid && canCreateTraceStartMixtureWithoutIcp();
    if (!validation.valid && !canSaveAsStartMixture) {
        showTraceCalculatorIcpValidationError(validation.invalid);
        return null;
    }
    const recipe = calculateTraceRecipe(getTraceCalculatorConfigFromUi());
    const mixtureDate = document.getElementById('traceCalcMixtureDate')?.value || state.currentMixtureDate;
    if (!mixtureDate) {
        alert('Bitte das Datum der angesetzten Mischung angeben.');
        return null;
    }
    const amounts = recipe.rows.reduce((acc, row) => {
        acc[row.item] = row.amount;
        return acc;
    }, {});
    const grams = recipe.rows.reduce((acc, row) => {
        acc[row.item] = row.grams;
        return acc;
    }, {});
    const entry = {
        id: createWarehouseId(),
        source: canSaveAsStartMixture ? 'traceStartMixture' : 'traceCalculator',
        includeInCalculation: true,
        isStartMixture: canSaveAsStartMixture,
        createdAt: Date.now(),
        mixtureDate,
        config: { ...recipe.config },
        icp: canSaveAsStartMixture ? {} : { ...state.icp },
        amounts,
        grams,
        totals: recipe.totals
    };

    return { state, recipe, amounts, entry };
}

function commitTraceCalculatorMixture(payload) {
    if (!payload) return null;
    const { state, amounts, entry } = payload;
    state.history.push(normalizeTraceCalculatorHistoryEntry(entry));
    pruneTraceCalculatorHistory();
    db.traceDraft = Object.fromEntries(Object.entries(amounts).map(([item, amount]) => [item, amount.toFixed(2)]));
    return entry;
}

function refreshTraceCalculatorAfterSave() {
    saveDB();
    renderTraceExportInputs();
    renderTraceCalculator();
}

function saveTraceCalculatorMixture() {
    const payload = createTraceCalculatorMixturePayload();
    if (!payload) return null;
    const entry = commitTraceCalculatorMixture(payload);
    refreshTraceCalculatorAfterSave();
    showToast('Trace-Mischung gespeichert', 'success');
    return entry;
}

function saveAndBookTraceCalculatorMixture() {
    if (!requireWarehouseWriteAccess('Trace-Mischung speichern und auslagern')) return;
    const payload = createTraceCalculatorMixturePayload();
    if (!payload) return;

    const queue = payload.recipe.rows
        .filter(row => row.amount > 0)
        .map(row => ({
            cat: row.group === 'kationen' ? 'Kationen' : 'Anionen',
            item: row.item,
            amount: row.amount,
            grams: row.grams
        }));

    if (!queue.length) {
        alert('Die berechnete Mischung enthält keine Waren zum Auslagern.');
        return;
    }

    const shortages = queue.filter(position => {
        const stock = traceCalcNumber(db.inventory?.[position.cat]?.[position.item], 0);
        return stock + 0.0001 < position.amount;
    });

    if (shortages.length) {
        const details = shortages.map(position => {
            const stockMl = traceCalcNumber(db.inventory?.[position.cat]?.[position.item], 0);
            const stockG = traceCalcElementGrams(position.item, stockMl);
            return `${position.item}: benötigt ${traceCalcFormatMlG(position.amount, position.grams)}, verfügbar ${traceCalcFormatMlG(stockMl, stockG)}`;
        }).join('\n');
        alert(`Nicht genügend Lagerbestand. Es wurde nichts gespeichert oder ausgelagert.\n\n${details}`);
        return;
    }

    const kationenTotal = payload.recipe.totals.kationen;
    const anionenTotal = payload.recipe.totals.anionen;
    const confirmed = confirm(
        `Trace-Mischung speichern und ${queue.length} Warenpositionen auslagern?\n\n` +
        `Kationen: ${traceCalcFormatMlG(kationenTotal.elementsMl, kationenTotal.elementsG)}\n` +
        `Anionen: ${traceCalcFormatMlG(anionenTotal.elementsMl, anionenTotal.elementsG)}`
    );
    if (!confirmed) return;

    const logs = queue.map(position => {
        db.inventory[position.cat][position.item] -= position.amount;
        db.stats[position.item] = (db.stats[position.item] || 0) + position.amount;
        return addLog(position.cat, position.item, 'out', position.amount);
    });

    payload.entry.inventoryBooking = {
        warehouseId: activeWarehouseId,
        bookedAt: Date.now(),
        logIds: logs.map(log => log.id)
    };
    commitTraceCalculatorMixture(payload);
    refreshTraceCalculatorAfterSave();
    renderLager();
    checkAndNotifyStockAlerts();
    showToast(`Trace-Mischung gespeichert und ${queue.length} Warenpositionen ausgelagert`, 'success');
}

window.updateTraceCalculatorIcp = updateTraceCalculatorIcp;
window.importTraceCalculatorIcpText = importTraceCalculatorIcpText;
window.handleTraceCalculatorIcpPaste = handleTraceCalculatorIcpPaste;
window.clearTraceCalculatorIcpImport = clearTraceCalculatorIcpImport;
window.loadTraceCalculatorFromLast = loadTraceCalculatorFromLast;
window.loadTraceCalculatorHistoryEntry = loadTraceCalculatorHistoryEntry;
window.saveTraceCalculatorMixture = saveTraceCalculatorMixture;
window.saveAndBookTraceCalculatorMixture = saveAndBookTraceCalculatorMixture;
window.openTraceCalculationGuide = openTraceCalculationGuide;
window.addReefManagerImportToTraceHistory = addReefManagerImportToTraceHistory;
window.toggleTraceHistoryCalculation = toggleTraceHistoryCalculation;
window.editTraceHistoryEntry = editTraceHistoryEntry;
window.deleteTraceHistoryEntry = deleteTraceHistoryEntry;

function setupPriority4CalculatorUI() {
    const scopedSections = document.querySelectorAll(
        '#tools details[data-section-id="dosieren-und-messwerte"], ' +
        '#tools details[data-section-id="salinitaet-und-wasserwechsel"], ' +
        '#tools details[data-section-id="c-und-r-und-mischen"]'
    );
    scopedSections.forEach(section => {
        section.classList.add('calculator-section');
        section.querySelectorAll('.tool-compact-card').forEach(card => card.classList.add('calculator-card'));
        section.querySelectorAll('.tool-grid').forEach(grid => grid.classList.add('calculator-input-grid'));
        section.querySelectorAll('.btn-group').forEach(group => group.classList.add('calculator-actions'));
        section.querySelectorAll('input[type="number"]').forEach(input => {
            if (!input.hasAttribute('inputmode')) input.setAttribute('inputmode', 'decimal');
        });
    });

    [
        'majorCorrectionResult', 'consumptionResult', 'testCorrectionResult', 'nutritionResult',
        'salinityResult', 'simpleSalinityResult', 'specificGravityResult', 'saltCorrectionResult',
        'waterChangeResult', 'adsorberFlowResult', 'seaWaterMixResult', 'naclSolutionResult', 'macroRecipeResult'
        , 'traceCalculatorResult', 'traceCalculatorHistory'
    ].forEach(id => {
        const result = document.getElementById(id);
        if (!result) return;
        result.classList.add('calculator-result-region');
        result.setAttribute('aria-live', 'polite');
        result.setAttribute('aria-atomic', 'false');
    });
    [
        'hannaPhosphorusResult', 'salifertConverterResult'
    ].forEach(id => {
        const result = document.getElementById(id);
        if (!result) return;
        result.classList.add('calculator-result-region');
        result.setAttribute('aria-live', 'polite');
        result.setAttribute('aria-atomic', 'false');
    });

    const warehouseName = getActiveWarehouse()?.name || 'Lager';
    ['crActiveWarehouseName', 'traceActiveWarehouseName'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = warehouseName;
    });
}

function initTools() {
    renderAquariumWorkspacePanels();
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
    syncCustomCRLockUI();
    if (isCustomCRUnlocked()) {
        renderCustomCrLimitsMatrix();
        renderCustomCrPlannerMatrix();
        renderCustomCRPlanner();
        renderSavedCustomCrPlans();
    }
    renderNaclSolutionCalculator();
    syncMajorCorrectionInputsFromSettings(true);
    renderMajorCorrectionCalculator();
    renderConsumptionCalculator();
    renderTestCorrectionTool();
    renderHannaPhosphorusConverter();
    populateSalifertSyringeSelect();
    renderSalifertConverter();
    renderWaterChangeCalculator();
    renderAdsorberFlowCalculator();
    renderSaltCorrectionCalculator();
    renderFeedNutrientLog();
    renderFlowCalculator();
    renderOsmoseTank();
    renderDosingContainers();
    renderPsuCorrectionSettings();
    renderSangokaiAssistant();
    renderImplementationLog();
    renderCommunityMapCard();
    updateSalinityCalculator();
    updateSimpleSalinityConverter();
    setupToolTiles();
    setupToolSections();
    renderToolFavorites();
    setupPriority4CalculatorUI();
}

function getToolSettings() {
    if (!db.toolSettings) db.toolSettings = { lastSection: '', favorites: [] };
    if (!Array.isArray(db.toolSettings.favorites)) db.toolSettings.favorites = [];
    if (!db.toolSettings.lastSection) db.toolSettings.lastSection = '';
    return db.toolSettings;
}

function isCustomCRUnlocked() {
    return localStorage.getItem(CUSTOM_CR_UNLOCK_KEY) === 'true';
}

function syncCustomCRLockUI() {
    const lockState = document.getElementById('customCrLockState');
    const protectedContent = document.getElementById('customCrProtectedContent');
    const unlocked = isCustomCRUnlocked();
    if (lockState) lockState.hidden = unlocked;
    if (protectedContent) protectedContent.hidden = !unlocked;
}

function unlockCustomCRTool() {
    const input = document.getElementById('customCrPasswordInput');
    const value = (input?.value || '').trim();
    if (value !== CUSTOM_CR_PASSWORD) {
        showToast('Falsches Passwort', 'warning', 2600);
        if (input) input.value = '';
        return;
    }
    localStorage.setItem(CUSTOM_CR_UNLOCK_KEY, 'true');
    if (input) input.value = '';
    syncCustomCRLockUI();
    renderCustomCrLimitsMatrix();
    renderCustomCrPlannerMatrix();
    renderCustomCRPlanner();
    renderSavedCustomCrPlans();
    showToast('C&R Tool entsperrt', 'success', 2200);
}

function lockCustomCRTool() {
    localStorage.removeItem(CUSTOM_CR_UNLOCK_KEY);
    syncCustomCRLockUI();
    showToast('C&R Tool gesperrt', 'info', 2200);
}

function slugifyToolTitle(title) {
    return (title || '')
        .toLowerCase()
        .replace(/&/g, ' und ')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'tool';
}

function getToolCardTitle(card) {
    return card?.querySelector('h3')?.childNodes?.[0]?.textContent?.trim() || card?.querySelector('h3')?.textContent?.trim() || '';
}

function getToolTileVisual(toolId, title = '') {
    const map = {
        'kh-ca-korrektur': { icon: 'KH', subtitle: 'Zielwerte anpassen' },
        'verbrauch-pro-tag': { icon: '24', subtitle: 'Tagesverbrauch rechnen' },
        'test-korrekturfaktor': { icon: 'IC', subtitle: 'Tests abgleichen' },
        'hanna-phosphor-zu-phosphat': { icon: 'PO', subtitle: 'P zu PO4 rechnen' },
        'salifert-umrechner': { icon: 'Sa', subtitle: 'Spritzenwert waehlen' },
        'nutrition-rechner': { icon: 'N', subtitle: 'Naehrstoffe dosieren' },
        'trace-calculator': { icon: 'Tr', subtitle: 'ICP Rezept planen' },
        'salzgehalt-rechner': { icon: 'PS', subtitle: 'PSU und Dichte pruefen' },
        'salz-korrektur': { icon: 'SG', subtitle: 'Salz angleichen' },
        'wasserwechsel-effekt': { icon: 'WW', subtitle: 'Wasserwechsel planen' },
        'adsorber-durchfluss': { icon: 'AD', subtitle: 'Adsorber langsam fahren' },
        'meerwasser-aus-c-und-r-anmischen': { icon: 'MW', subtitle: 'Meerwasser mischen' },
        'c-und-r-natriumchlorid-aus-nacl-pulver': { icon: 'Na', subtitle: 'NaCl Loesung ansetzen' },
        'makro-elemente-anmischen': { icon: 'ME', subtitle: 'Makros vorbereiten' },
        'sangokai-a-z-assistent': { icon: 'AZ', subtitle: 'PDF Wissen suchen' },
        'hilfreiche-quellen': { icon: 'Q', subtitle: 'Links und Wissen' }
    };
    return map[toolId] || { icon: (title || 'T').slice(0, 2).toUpperCase(), subtitle: 'Tool oeffnen' };
}

function setupToolTiles() {
    const settings = getToolSettings();
    document.querySelectorAll('#tools .tool-compact-card').forEach(card => {
        const title = card.querySelector('h3');
        if (!title) return;
        const toolTitle = getToolCardTitle(card);
        const toolId = card.dataset.toolId || slugifyToolTitle(toolTitle);
        const visual = getToolTileVisual(toolId, toolTitle);
        card.dataset.toolId = toolId;
        card.dataset.toolIcon = visual.icon;
        card.dataset.toolSearch = `${toolTitle} ${card.querySelector('.hint')?.textContent || ''}`.toLowerCase();
        const hint = card.querySelector('.hint');
        if (hint && !hint.dataset.originalText) {
            hint.dataset.originalText = hint.textContent.trim();
        }
        if (hint) {
            hint.dataset.tileSubtitle = visual.subtitle;
        }
        if (card.dataset.tileReady !== 'true') {
            card.dataset.tileReady = 'true';
            card.classList.add('tool-tile-card');
            title.setAttribute('role', 'button');
            title.setAttribute('tabindex', '0');
            const favButton = title.querySelector('.tool-inline-fav');
            if (favButton) {
                favButton.addEventListener('click', event => toggleToolFavoriteFromButton(event, favButton.dataset.toolId));
                favButton.addEventListener('pointerdown', event => event.stopPropagation());
            }
            title.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleToolTile(card);
                }
            });
        }
        applyToolReviewBadge(card, toolTitle);
        card.classList.add('tool-tile-collapsed');
        title.setAttribute('aria-expanded', 'false');
    });
}

function updateInlineToolFavoriteButtons() {
    const settings = getToolSettings();
    document.querySelectorAll('#tools .tool-inline-fav').forEach(button => {
        const active = settings.favorites.includes(button.dataset.toolId);
        button.classList.toggle('active', active);
        button.textContent = active ? '★ Fav' : '☆ Fav';
        button.setAttribute('aria-pressed', String(active));
    });
}

function applyToolReviewBadge(card, title) {
    if (card.querySelector('.tool-experimental-badge')) return;
    const needsReview = /korrektur|salz|wasserwechsel|spindel|psu/i.test(title);
    if (!needsReview) return;
    const hint = card.querySelector('.hint');
    if (!hint) return;
    hint.insertAdjacentHTML('beforebegin', '<span class="tool-experimental-badge">Bitte Ergebnis prüfen</span>');
}

function setupToolSections() {
    document.querySelectorAll('#tools .tool-section').forEach(section => {
        const title = section.querySelector('.tool-section-summary strong')?.textContent?.trim() || `section-${index}`;
        const sectionId = section.dataset.sectionId || slugifyToolTitle(title);
        section.dataset.sectionId = sectionId;
        const summaryText = section.querySelector('.tool-section-summary small');
        if (summaryText) {
            summaryText.dataset.baseText = summaryText.dataset.baseText || summaryText.textContent.trim();
            summaryText.textContent = summaryText.dataset.baseText;
        }
        if (section.dataset.sectionReady !== 'true') {
            section.dataset.sectionReady = 'true';
            section.addEventListener('toggle', () => {
                if (section.open) {
                    getToolSettings().lastSection = sectionId;
                    saveDB(false);
                }
            });
        }
        section.open = false;
    });
}

function getToolFavoriteOptions() {
    return Array.from(document.querySelectorAll('#tools .tool-compact-card')).map(card => ({
        id: card.dataset.toolId,
        title: getToolCardTitle(card)
    })).filter(option => option.id && option.title);
}

function renderToolFavorites() {
    const settings = getToolSettings();
    const options = getToolFavoriteOptions();
    const optionMap = new Map(options.map(option => [option.id, option]));
    settings.favorites = settings.favorites.filter(id => optionMap.has(id));

    const list = document.getElementById('toolFavoritesList');
    if (list) {
        list.innerHTML = settings.favorites.length
            ? settings.favorites.map(id => {
                const option = optionMap.get(id);
                return `
                    <div class="tool-favorite-item">
                        <button type="button" class="tool-favorite-open" onclick="openToolFavorite('${id}')">★ ${option.title}</button>
                        <button type="button" class="tool-favorite-remove" onclick="removeToolFavorite('${id}')" aria-label="${option.title} entfernen">×</button>
                    </div>
                `;
            }).join('')
            : '<span class="tools-favorites-empty">Noch keine Favoriten ausgewählt.</span>';
    }
    updateInlineToolFavoriteButtons();
}

function toggleToolFavoriteFromButton(event, toolId) {
    event.preventDefault();
    event.stopPropagation();
    if (!toolId) return;
    const settings = getToolSettings();
    if (settings.favorites.includes(toolId)) settings.favorites = settings.favorites.filter(id => id !== toolId);
    else settings.favorites.push(toolId);
    saveDB();
    renderToolFavorites();
}

function removeToolFavorite(toolId) {
    const settings = getToolSettings();
    settings.favorites = settings.favorites.filter(id => id !== toolId);
    saveDB();
    renderToolFavorites();
}

function openToolFavorite(toolId) {
    const card = document.querySelector(`#tools .tool-compact-card[data-tool-id="${toolId}"]`);
    if (!card) return;
    const section = card.closest('.tool-section');
    if (section) openToolSection(section.dataset.sectionId || '');
    document.querySelectorAll('#tools .tool-card-hidden').forEach(el => el.classList.remove('tool-card-hidden'));
    document.querySelectorAll('#tools .tool-section-hidden').forEach(el => el.classList.remove('tool-section-hidden'));
    const search = document.getElementById('toolSearchInput');
    if (search) search.value = '';
    if (card.classList.contains('tool-tile-collapsed')) toggleToolTile(card);
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function openToolSection(sectionId) {
    if (!sectionId) return;
    const section = document.querySelector(`#tools .tool-section[data-section-id="${sectionId}"]`);
    if (!section) return;
    document.querySelectorAll('#tools .tool-card-hidden').forEach(el => el.classList.remove('tool-card-hidden'));
    document.querySelectorAll('#tools .tool-section-hidden').forEach(el => el.classList.remove('tool-section-hidden'));
    const search = document.getElementById('toolSearchInput');
    if (search) search.value = '';
    section.open = true;
    getToolSettings().lastSection = section.dataset.sectionId || '';
    saveDB(false);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

Object.assign(window, {
    toggleToolFavoriteFromButton,
    removeToolFavorite,
    openToolFavorite,
    openToolSection,
    filterTools
});

function filterTools(query = '') {
    const normalized = query.trim().toLowerCase();
    document.querySelectorAll('#tools .tool-section').forEach(section => {
        let matchesInSection = 0;
        section.querySelectorAll('.tool-compact-card').forEach(card => {
            const matches = !normalized || (card.dataset.toolSearch || '').includes(normalized);
            card.classList.toggle('tool-card-hidden', !matches);
            if (matches) matchesInSection += 1;
        });
        section.classList.toggle('tool-section-hidden', normalized && matchesInSection === 0);
        if (normalized && matchesInSection > 0) section.open = true;
    });
}

function toggleToolTile(card) {
    const willOpen = card.classList.contains('tool-tile-collapsed');
    const section = card.closest('.tool-section');
    section?.querySelectorAll('.tool-tile-card').forEach(other => {
        if (other !== card) {
            other.classList.add('tool-tile-collapsed');
            other.querySelector('h3')?.setAttribute('aria-expanded', 'false');
        }
    });
    card.classList.toggle('tool-tile-collapsed', !willOpen);
    card.querySelector('h3')?.setAttribute('aria-expanded', String(willOpen));
}

const SANGOKAI_SEARCH_STOPWORDS = new Set([
    'aber', 'alle', 'als', 'also', 'am', 'an', 'auch', 'auf', 'aus', 'bei', 'bis', 'da',
    'das', 'dass', 'dem', 'den', 'der', 'des', 'die', 'dies', 'diese', 'dieser', 'doch',
    'durch', 'ein', 'eine', 'einem', 'einen', 'einer', 'er', 'es', 'fuer', 'gegen', 'gibt',
    'habe', 'haben', 'hat', 'im', 'in', 'ist', 'ja', 'kann', 'mit', 'nach', 'nicht', 'noch',
    'nur', 'oder', 'sich', 'sind', 'soll', 'sollte', 'um', 'und', 'von', 'was', 'wenn',
    'wer', 'wie', 'wir', 'wird', 'wo', 'zu', 'zum', 'zur', 'ich', 'mein', 'meine', 'meinem',
    'meinen', 'man', 'mir', 'dir', 'bitte', 'mal', 'thema', 'gehalt'
]);

const SANGOKAI_TERM_CORRECTIONS = {
    calium: 'calcium',
    kalzium: 'calcium',
    kalcium: 'calcium',
    calzium: 'calcium',
    phosphatwert: 'phosphat',
    nitratwert: 'nitrat',
    salz: 'salzgehalt',
    salinität: 'salinitaet',
    dino: 'dinoflagellaten',
    cyano: 'cyanobakterien',
    cyanos: 'cyanobakterien',
    abschäumer: 'abschaeumer',
    eiweißabschäumer: 'eiweissabschaeumer'
};

const SANGOKAI_SEARCH_SYNONYMS = {
    po4: ['phosphat', 'phosphor'],
    phosphat: ['po4', 'phosphor'],
    no3: ['nitrat', 'stickstoff'],
    nitrat: ['no3', 'stickstoff'],
    kh: ['karbonathaerte', 'alkalinitaet'],
    karbonathaerte: ['kh', 'alkalinitaet'],
    alkalinitaet: ['kh', 'karbonathaerte'],
    salinitaet: ['salzgehalt', 'psu'],
    salzgehalt: ['salinitaet', 'psu'],
    psu: ['salinitaet', 'salzgehalt'],
    cyanos: ['cyanobakterien'],
    cyanobakterien: ['cyanos', 'cyanobakterie'],
    dinos: ['dinoflagellaten'],
    dinoflagellaten: ['dinos', 'zooxanthellen'],
    led: ['beleuchtung', 'lampe', 'licht'],
    t5: ['beleuchtung', 'lampe', 'licht'],
    abschaeumer: ['eiweissabschaeumer', 'skimmer'],
    eiweissabschaeumer: ['abschaeumer', 'skimmer'],
    aktivkohle: ['kohle', 'filterkohle'],
    iod: ['jod'],
    jod: ['iod'],
    ca: ['calcium', 'calciumgehalt'],
    calcium: ['ca', 'calciumgehalt', 'calciumdefizit'],
    calium: ['calcium', 'ca', 'calciumgehalt', 'calciumdefizit'],
    kalzium: ['calcium', 'ca', 'calciumgehalt', 'calciumdefizit'],
    magnesium: ['mg', 'magnesiumgehalt'],
    mg: ['magnesium', 'magnesiumgehalt'],
    strontium: ['sr', 'strontiumgehalt'],
    sr: ['strontium', 'strontiumgehalt'],
    bor: ['b', 'borgehalt'],
    fluor: ['f', 'fluorid', 'fluorgehalt'],
    kalium: ['k', 'kaliumgehalt'],
    brom: ['br', 'bromgehalt'],
    erhoehen: ['erhoehung', 'anheben', 'anhebung', 'ausgleichen', 'ausgeglichen', 'defizit'],
    erhoehung: ['erhoehen', 'anheben', 'anhebung', 'ausgleichen', 'defizit'],
    anheben: ['erhoehen', 'erhoehung', 'anhebung', 'ausgleichen', 'defizit'],
    anhebung: ['erhoehen', 'erhoehung', 'anheben', 'ausgleichen', 'defizit'],
    senken: ['absenken', 'reduktion', 'verringern'],
    reduzieren: ['senken', 'absenken', 'verringern'],
    schnell: ['innerhalb', 'zeit', 'stunden', 'einzeldosierung', 'einzeldosierungen'],
    dosieren: ['dosierung', 'einzeldosierung', 'einzeldosierungen', 'zufuehren'],
    dosis: ['dosierung', 'einzeldosierung', 'zufuehren'],
    mangel: ['defizit', 'mangelsituation'],
    defizit: ['mangel', 'ausgleichen', 'ausgeglichen'],
    zielwert: ['referenzwert', 'referenzbereich', 'sollwert'],
    optimal: ['referenzbereich', 'referenzwert', 'empfohlen'],
    problem: ['kritisch', 'ursache', 'problemfall'],
    plagen: ['plage', 'cyanobakterien', 'dinoflagellaten'],
    algen: ['mikroalgen', 'makroalgen'],
    aktivkohlefilterung: ['aktivkohle', 'kohle']
};

const SANGOKAI_INTENT_RULES = [
    {
        id: 'timing',
        label: 'Zeit / Geschwindigkeit',
        query: /\b(schnell|langsam|zeit|wie lange|stunden|tage|innerhalb|tempo|rasch)\b/,
        terms: ['innerhalb', 'stunden', 'tage', 'zeit', 'einzeldosierung', 'einzeldosierungen', 'schnell', 'langsam']
    },
    {
        id: 'dose',
        label: 'Dosierung / Anwendung',
        query: /\b(dosieren|dosis|zugeben|anwenden|menge|ml|mg|einzeldosierung|ausgleichen|angleichen|erhoehen|senken|anheben)\b/,
        terms: ['dosierung', 'dosis', 'zufuehren', 'einzeldosierung', 'einzeldosierungen', 'mg', 'ml', 'ausgleichen', 'erhoehung']
    },
    {
        id: 'target',
        label: 'Zielwert / Referenzbereich',
        query: /\b(wert|zielwert|optimal|referenz|bereich|soll|hoch|niedrig|liegen)\b/,
        terms: ['referenzwert', 'referenzbereich', 'sollte', 'liegen', 'empfohlen', 'kritischer', 'bereich']
    },
    {
        id: 'cause',
        label: 'Ursache / Erklärung',
        query: /\b(warum|wieso|ursache|grund|kommt|entsteht|entstehen|passiert)\b/,
        terms: ['ursache', 'dadurch', 'weil', 'grund', 'problem', 'entsteht', 'entstehen', 'hintergrund']
    },
    {
        id: 'risk',
        label: 'Risiko / Warnung',
        query: /\b(gefahr|risk|risiko|kritisch|problem|schaden|schlimm|warnung|giftig|toxisch)\b/,
        terms: ['kritisch', 'problem', 'gefahr', 'schaden', 'unguenstig', 'warnung', 'verhindern']
    }
];

const SANGOKAI_SUBJECT_HINTS = [
    ['calcium', ['calcium', 'calciumgehalt', 'calciumdefizit', 'ca']],
    ['karbonathärte', ['karbonathaerte', 'alkalinitaet', 'kh']],
    ['magnesium', ['magnesium', 'magnesiumgehalt', 'mg']],
    ['phosphat', ['phosphat', 'phosphor', 'po4']],
    ['nitrat', ['nitrat', 'stickstoff', 'no3']],
    ['salinität', ['salinitaet', 'salzgehalt', 'psu', 'dichte']],
    ['iod', ['iod', 'jod']],
    ['bor', ['bor', 'borgehalt']],
    ['strontium', ['strontium', 'strontiumgehalt', 'sr']],
    ['fluor', ['fluor', 'fluorid', 'fluorgehalt']],
    ['kalium', ['kalium', 'kaliumgehalt']],
    ['cyanobakterien', ['cyanobakterien', 'cyanos', 'cyanobakterie']],
    ['dinoflagellaten', ['dinoflagellaten', 'dinos']],
    ['aktivkohle', ['aktivkohle', 'kohle', 'filterkohle']],
    ['beleuchtung', ['beleuchtung', 'licht', 'led', 't5']]
];

function normalizeSangokaiText(value = '') {
    return String(value)
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeSangokaiToken(term = '') {
    const normalized = normalizeSangokaiText(term);
    return SANGOKAI_TERM_CORRECTIONS[normalized] || normalized;
}

function hasSangokaiAliasMatch(alias, profileTerms, baseTerms, normalizedQuery) {
    if (!alias) return false;
    if (alias.length <= 2) return baseTerms.includes(alias);
    if (profileTerms.includes(alias)) return true;
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^| )${escaped}( |$)`).test(normalizedQuery);
}

function getSangokaiQuestionProfile(query) {
    const normalizedQuery = normalizeSangokaiText(query)
        .split(' ')
        .map(normalizeSangokaiToken)
        .join(' ');
    const baseTerms = normalizedQuery
        .split(' ')
        .map(term => term.trim())
        .filter(term => term.length > 1 && !SANGOKAI_SEARCH_STOPWORDS.has(term));
    const expanded = new Set(baseTerms);
    baseTerms.forEach(term => {
        (SANGOKAI_SEARCH_SYNONYMS[term] || []).forEach(alias => expanded.add(alias));
    });
    const intents = SANGOKAI_INTENT_RULES
        .filter(rule => rule.query.test(normalizedQuery))
        .map(rule => {
            rule.terms.forEach(term => expanded.add(term));
            return rule;
        });
    const terms = Array.from(new Set(Array.from(expanded).map(normalizeSangokaiToken).filter(Boolean)));
    const subjectMatches = SANGOKAI_SUBJECT_HINTS
        .filter(([, aliases]) => aliases.some(alias => hasSangokaiAliasMatch(alias, terms, baseTerms, normalizedQuery)))
        .map(([label, aliases]) => ({ label, aliases }));
    return { query, normalizedQuery, baseTerms, terms, intents, subjectMatches };
}

function getSangokaiQueryTerms(query) {
    return getSangokaiQuestionProfile(query).terms;
}

function countSangokaiTermHits(normalizedText, terms) {
    return terms.reduce((sum, term) => {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matches = normalizedText.match(new RegExp(`(^| )${escaped}`, 'g'));
        return sum + (matches ? matches.length : 0);
    }, 0);
}

function getSangokaiIntentBoost(normalizedChunk, profile) {
    let boost = 0;
    const normalizedQuery = profile.normalizedQuery;
    const asksCalcium = /\b(ca|calcium|calium|kalzium)\b/.test(normalizedQuery);
    const asksIncrease = /\b(erhoehen|erhoehung|anheben|anhebung|ausgleichen|defizit)\b/.test(normalizedQuery);
    const asksTiming = /\b(schnell|zeit|stunden|tage|langsam|rasch)\b/.test(normalizedQuery);
    const asksDeficit = /\b(defizit|ausgleichen|ausgleich|angleichen)\b/.test(normalizedQuery);
    const asksCause = profile.intents.some(intent => intent.id === 'cause');
    const asksCyano = /\b(cyanobakterien|cyanos|cyanobakterie)\b/.test(normalizedQuery);
    if (asksCalcium && normalizedChunk.includes('calcium')) boost += 6;
    if (asksCalcium && normalizedChunk.includes('calciumdefizit')) boost += 14;
    if (asksCalcium && asksDeficit && normalizedChunk.includes('calciumdefizit')) boost += 22;
    if (asksIncrease && /\b(ausgeglichen|ausgleichen|erhoehung|defizit)\b/.test(normalizedChunk)) boost += 8;
    if (asksTiming && /\b(innerhalb|stunden|12 24|einzeldosierungen|pro 2 stunden)\b/.test(normalizedChunk)) boost += 12;
    if (asksCalcium && asksIncrease && asksTiming && /calciumdefizit.*12 24.*einzeldosierungen/.test(normalizedChunk)) boost += 28;
    if (asksCause && /\b(ursache|hintergrund|entstehen|entsteht|entstehung|hervorrufen|verursachen|fuehren|wachstum|ausbreitung)\b/.test(normalizedChunk)) boost += 10;
    if (asksCause && asksCyano && /cyanobakterien.*(wachstum|entstehen|hervorrufen|problem|ausbreitung)|(?:wachstum|entstehen|hervorrufen|problem|ausbreitung).*cyanobakterien/.test(normalizedChunk)) boost += 18;
    profile.intents.forEach(intent => {
        const hits = intent.terms.filter(term => normalizedChunk.includes(term)).length;
        boost += hits * 5;
    });
    return boost;
}

function scoreSangokaiChunk(chunk, profile) {
    const normalized = chunk._normalized || (chunk._normalized = normalizeSangokaiText(chunk.t));
    const exact = profile.normalizedQuery;
    const terms = profile.terms;
    let score = 0;
    if (exact.length > 2 && normalized.includes(exact)) score += 12 + Math.min(18, exact.length / 3);
    terms.forEach(term => {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matches = normalized.match(new RegExp(`(^| )${escaped}`, 'g'));
        if (matches) score += matches.length * (term.length > 4 ? 4 : 2);
    });
    const uniqueMatches = terms.filter(term => normalized.includes(term)).length;
    score += uniqueMatches * uniqueMatches;
    const subjectHits = profile.subjectMatches.reduce((sum, subject) => {
        return sum + (subject.aliases.some(alias => normalized.includes(alias)) ? 1 : 0);
    }, 0);
    if (profile.subjectMatches.length && !subjectHits) score *= 0.28;
    if (subjectHits) score += subjectHits * 12;
    score += getSangokaiIntentBoost(normalized, profile);
    return score;
}

function scoreSangokaiSentence(sentence, match, profile, index = 0) {
    const normalized = normalizeSangokaiText(sentence);
    const termHits = countSangokaiTermHits(normalized, profile.terms);
    const uniqueHits = profile.terms.filter(term => normalized.includes(term)).length;
    const subjectHits = profile.subjectMatches.reduce((sum, subject) => {
        return sum + (subject.aliases.some(alias => normalized.includes(alias)) ? 1 : 0);
    }, 0);
    const intentHits = profile.intents.reduce((sum, intent) => {
        return sum + intent.terms.filter(term => normalized.includes(term)).length;
    }, 0);
    let score = termHits * 3 + uniqueHits * uniqueHits + subjectHits * 12 + intentHits * 5 + (match.score * 0.18);
    if (/\d/.test(sentence) && profile.intents.some(intent => ['timing', 'dose', 'target'].includes(intent.id))) score += 10;
    if (/\b(sollte|empfohlen|wichtig|notwendig|kritisch|unproblematisch|defizit|innerhalb)\b/.test(normalized)) score += 5;
    if (profile.intents.some(intent => intent.id === 'cause')) {
        if (/\b(durch|dadurch|weil|ursache|hintergrund|entstehen|entsteht|entstehung|hervorrufen|verursachen|fuehrt|fuehren|wachstum|ausbreitung)\b/.test(normalized)) score += 12;
        if (subjectHits && /\b(wachstum|entstehen|hervorrufen|verursachen|fuehren|problematisch|abhaengig)\b/.test(normalized)) score += 10;
        if (/\b(sollte|empfehlung|verzicht|verzichten|verringert|zurueck genommen)\b/.test(normalized)) score -= 5;
    }
    if (index === 0 && subjectHits) score += 2;
    if (profile.subjectMatches.length && !subjectHits) score *= 0.45;
    if (sentence.length < 42) score *= 0.55;
    return score;
}

function searchSangokaiKnowledge(query, limit = 8) {
    const data = window.SANGOKAI_AZ_DATA;
    if (!data?.chunks?.length) return { profile: getSangokaiQuestionProfile(query), terms: [], matches: [] };
    const profile = getSangokaiQuestionProfile(query);
    if (!profile.terms.length) return { profile, terms: profile.terms, matches: [] };
    const matches = data.chunks
        .map(chunk => ({ chunk, score: scoreSangokaiChunk(chunk, profile) }))
        .filter(match => match.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    return { profile, terms: profile.terms, matches };
}

function splitSangokaiSentences(text = '') {
    return text
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ0-9])/)
        .map(sentence => sentence.trim())
        .filter(Boolean);
}

function buildSangokaiAnswer(matches, profile) {
    const candidates = [];
    const seen = new Set();
    matches.slice(0, 6).forEach(match => {
        splitSangokaiSentences(match.chunk.t).forEach((sentence, index) => {
            const normalized = normalizeSangokaiText(sentence);
            const key = normalized.slice(0, 90);
            if (seen.has(key) || sentence.length <= 35) return;
            const score = scoreSangokaiSentence(sentence, match, profile, index);
            if (score < 8) return;
            seen.add(key);
            candidates.push({
                sentence,
                page: match.chunk.p,
                score,
                hitCount: profile.terms.filter(term => normalized.includes(term)).length
            });
        });
    });
    const sorted = candidates.sort((a, b) => b.score - a.score);
    const wantsTiming = profile.intents.some(intent => intent.id === 'timing');
    const wantsCause = profile.intents.some(intent => intent.id === 'cause');
    const focused = sorted.filter(item => {
        const normalized = normalizeSangokaiText(item.sentence);
        if (wantsTiming) return /\b(innerhalb|stunden|tage|schnell|schnellstmoeglich|einzeldosierung|einzeldosierungen|pro 2 stunden|defizit)\b/.test(normalized);
        if (wantsCause) return /\b(durch|dadurch|weil|ursache|hintergrund|entstehen|entsteht|entstehung|hervorrufen|verursachen|fuehrt|fuehren|wachstum|abhaengig)\b/.test(normalized);
        return true;
    });
    return (focused.length ? focused : sorted).slice(0, 4);
}

function formatSangokaiSnippet(text, profile) {
    const best = splitSangokaiSentences(text)
        .map(sentence => ({
            sentence,
            hits: scoreSangokaiSentence(sentence, { chunk: { t: text }, score: 0 }, profile)
        }))
        .sort((a, b) => b.hits - a.hits)[0]?.sentence || text;
    return best.length > 320 ? `${best.slice(0, 317).trim()}...` : best;
}

function getSangokaiConfidence(matches, answerSentences, profile) {
    const bestScore = matches[0]?.score || 0;
    const bestAnswer = answerSentences[0]?.score || 0;
    const hasSubject = !profile.subjectMatches.length || answerSentences.some(item => {
        const normalized = normalizeSangokaiText(item.sentence);
        return profile.subjectMatches.some(subject => subject.aliases.some(alias => normalized.includes(alias)));
    });
    if (bestScore >= 55 && bestAnswer >= 28 && hasSubject) return 'high';
    if (bestScore >= 24 && bestAnswer >= 16) return 'medium';
    return 'low';
}

function getSangokaiAssistantSummary(profile, confidence) {
    const subjects = profile.subjectMatches.map(subject => subject.label).slice(0, 3);
    const intents = profile.intents.map(intent => intent.label).slice(0, 2);
    if (confidence === 'low') return 'Keine belastbare Antwortstelle gefunden';
    const parts = [];
    if (subjects.length) parts.push(subjects.join(', '));
    if (intents.length) parts.push(intents.join(' + '));
    return parts.length ? `Erkannt: ${parts.join(' · ')}` : 'Passende Stellen im PDF gefunden';
}

function renderSangokaiAssistant(force = false) {
    const result = document.getElementById('sangokaiSearchResult');
    const input = document.getElementById('sangokaiSearchInput');
    const sourceLabel = document.getElementById('sangokaiSourceLabel');
    if (!result || !input) return;
    if (sourceLabel && window.SANGOKAI_AZ_DATA?.source) sourceLabel.textContent = `Quelle: ${window.SANGOKAI_AZ_DATA.source}`;
    const query = input.value.trim();
    if (!query) {
        result.innerHTML = '<p class="hint">Stelle eine Frage oder suche nach einem Begriff. Die Antwort wird nur aus dem eingebauten Sangokai A-Z PDF gebildet.</p>';
        return;
    }
    if (query.length < 3 && !force) {
        result.innerHTML = '<p class="hint">Bitte mindestens drei Zeichen eingeben.</p>';
        return;
    }
    const { profile, matches } = searchSangokaiKnowledge(query, 8);
    const answerSentences = buildSangokaiAnswer(matches, profile);
    const confidence = getSangokaiConfidence(matches, answerSentences, profile);
    if (confidence === 'low' || !profile.terms.length) {
        const fallbackMatches = matches.slice(0, 3);
        result.innerHTML = `
            <div class="sangokai-answer sangokai-answer-empty">
                <strong>Nicht belastbar im Dokument gefunden.</strong>
                <p>Im Sangokai A-Z PDF habe ich zu „${escapeHtml(query)}“ keine ausreichend klare Antwortstelle gefunden. Ich erfinde dazu keine Antwort.</p>
                ${fallbackMatches.length ? '<small>Ähnliche Treffer sind unten aufgeführt, bitte fachlich prüfen.</small>' : '<small>Versuche einen konkreteren Begriff, z.B. Element, Symptom oder Maßnahme.</small>'}
            </div>
            ${fallbackMatches.length ? `<div class="sangokai-match-list">
                ${fallbackMatches.map(match => `
                    <details class="sangokai-match">
                        <summary><span>Seite ${match.chunk.p}</span><small>ähnlich</small></summary>
                        <p>${escapeHtml(formatSangokaiSnippet(match.chunk.t, profile))}</p>
                    </details>
                `).join('')}
            </div>` : ''}
        `;
        return;
    }
    const answerHtml = answerSentences.length
        ? answerSentences.map(item => `<p>${escapeHtml(item.sentence)} <small>Seite ${item.page}</small></p>`).join('')
        : '<p>Es gibt Treffer im Dokument, aber keine kurze eindeutige Antwortstelle. Bitte prüfe die Treffer unten.</p>';
    result.innerHTML = `
        <div class="sangokai-answer" data-confidence="${confidence}">
            <div class="sangokai-answer-kicker">
                <span>${confidence === 'high' ? 'Sehr passend' : 'Passende Hinweise'}</span>
                <small>${escapeHtml(getSangokaiAssistantSummary(profile, confidence))}</small>
            </div>
            <strong>Antwort aus dem Sangokai A-Z PDF</strong>
            ${answerHtml}
        </div>
        <div class="sangokai-match-list">
            ${matches.slice(0, 4).map(match => `
                <details class="sangokai-match">
                    <summary><span>Seite ${match.chunk.p}</span><small>Treffer ${Math.round(match.score)}</small></summary>
                    <p>${escapeHtml(formatSangokaiSnippet(match.chunk.t, profile))}</p>
                </details>
            `).join('')}
        </div>
    `;
}

function handleSangokaiSearchKey(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    renderSangokaiAssistant(true);
}

Object.assign(window, {
    renderSangokaiAssistant,
    handleSangokaiSearchKey
});

document.addEventListener('click', event => {
    if (event.target.closest?.('.tool-inline-fav')) return;
    const title = event.target.closest?.('#tools .tool-tile-card > h3');
    const collapsedCard = event.target.closest?.('#tools .tool-tile-card.tool-tile-collapsed');
    const card = title?.closest('.tool-tile-card') || collapsedCard;
    if (!card) return;
    event.preventDefault();
    toggleToolTile(card);
});

document.addEventListener('click', event => {
    const insideQuickSync = event.target.closest?.('.header-sync-actions-wrap');
    if (!insideQuickSync) closeCloudQuickSyncMenu();
    if (!event.target.closest?.('.salifert-select')) closeSalifertDropdowns();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeSalifertDropdowns();
});

const majorCorrectionDefaultSettings = { tankLiters: 100, strengths: { KH: 0.05, Ca: 1 } };

function clampTestSyringeValue(value) {
    if (!Number.isFinite(value)) return null;
    return Math.max(0, Math.min(1, value));
}

function interpolateTestScale(value, points) {
    if (!Number.isFinite(value) || !Array.isArray(points) || points.length === 0) return null;
    const sorted = points.slice().sort((a, b) => a.ml - b.ml);
    if (value <= sorted[0].ml) return sorted[0].value;
    const last = sorted[sorted.length - 1];
    if (value >= last.ml) return last.value;
    for (let index = 1; index < sorted.length; index += 1) {
        const previous = sorted[index - 1];
        const next = sorted[index];
        if (value <= next.ml) {
            const span = next.ml - previous.ml;
            const ratio = span ? (value - previous.ml) / span : 0;
            return previous.value + ((next.value - previous.value) * ratio);
        }
    }
    return last.value;
}

function renderHannaPhosphorusConverter() {
    const result = document.getElementById('hannaPhosphorusResult');
    if (!result) return;
    const phosphorus = parseFloat(document.getElementById('hannaPhosphorusInput')?.value);
    if (!Number.isFinite(phosphorus) || phosphorus < 0) {
        result.innerHTML = '<p class="hint">Bitte den Phosphor-Wert des Hanna Checkers eintragen.</p>';
        return;
    }
    const phosphate = phosphorus * 3.066 / 1000;
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Phosphat PO4</strong><small>Formel: P × 3,066 ÷ 1000</small></span>
                <span>${phosphate.toFixed(4)} mg/l</span>
            </div>
            <div class="tool-row">
                <span><strong>Gerundet</strong><small>Praxiswert für Logbuch und Dosierung.</small></span>
                <span>${phosphate.toFixed(3)} mg/l</span>
            </div>
        </div>
    `;
}

const salifertKhPoints = [
    { ml: 0.00, value: 15.7 },
    { ml: 0.02, value: 15.3 },
    { ml: 0.20, value: 12.5 },
    { ml: 0.40, value: 9.3 },
    { ml: 0.98, value: 0 }
];

const salifertConverterState = {
    type: 'calcium',
    typeLabel: 'Calcium',
    syringe: '0.20',
    syringeLabel: '0,20 ml'
};

function getSalifertDropdownElements(kind) {
    if (kind === 'type') {
        return {
            button: document.getElementById('salifertConverterTypeButton'),
            label: document.getElementById('salifertConverterTypeLabel'),
            menu: document.getElementById('salifertConverterTypeMenu')
        };
    }
    return {
        button: document.getElementById('salifertSyringeValueButton'),
        label: document.getElementById('salifertSyringeValueLabel'),
        menu: document.getElementById('salifertSyringeValueMenu')
    };
}

function closeSalifertDropdowns(exceptKind = '') {
    ['type', 'syringe'].forEach(kind => {
        if (kind === exceptKind) return;
        const { button, menu } = getSalifertDropdownElements(kind);
        if (menu) menu.hidden = true;
        if (button) button.setAttribute('aria-expanded', 'false');
    });
}

function toggleSalifertDropdown(event, kind) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const { button, menu } = getSalifertDropdownElements(kind);
    if (!button || !menu) return;
    const willOpen = menu.hidden;
    closeSalifertDropdowns(kind);
    menu.hidden = !willOpen;
    button.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) {
        const selected = menu.querySelector('[aria-selected="true"]');
        selected?.scrollIntoView({ block: 'nearest' });
    }
}

function updateSalifertDropdownLabels() {
    const typeElements = getSalifertDropdownElements('type');
    const syringeElements = getSalifertDropdownElements('syringe');
    if (typeElements.label) typeElements.label.textContent = salifertConverterState.typeLabel;
    if (syringeElements.label) syringeElements.label.textContent = salifertConverterState.syringeLabel;
    typeElements.menu?.querySelectorAll('button[data-value]').forEach(button => {
        button.setAttribute('aria-selected', String(button.dataset.value === salifertConverterState.type));
    });
    syringeElements.menu?.querySelectorAll('button[data-value]').forEach(button => {
        button.setAttribute('aria-selected', String(button.dataset.value === salifertConverterState.syringe));
    });
}

function selectSalifertOption(event, kind, value, label) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (kind === 'type') {
        salifertConverterState.type = value;
        salifertConverterState.typeLabel = label;
    } else {
        salifertConverterState.syringe = value;
        salifertConverterState.syringeLabel = label;
    }
    closeSalifertDropdowns();
    updateSalifertDropdownLabels();
    renderSalifertConverter();
}

function populateSalifertSyringeSelect() {
    const menu = document.getElementById('salifertSyringeValueMenu');
    if (!menu || menu.children.length > 0) {
        updateSalifertDropdownLabels();
        return;
    }
    const options = [];
    for (let value = 0; value <= 100; value += 1) {
        const ml = value / 100;
        const optionValue = ml.toFixed(2);
        const label = `${optionValue.replace('.', ',')} ml`;
        options.push(`<button type="button" role="option" data-value="${optionValue}" aria-selected="${optionValue === salifertConverterState.syringe ? 'true' : 'false'}" onclick="selectSalifertOption(event, 'syringe', '${optionValue}', '${label}')">${label}</button>`);
    }
    menu.innerHTML = options.join('');
    updateSalifertDropdownLabels();
}

function renderSalifertConverter() {
    populateSalifertSyringeSelect();
    const result = document.getElementById('salifertConverterResult');
    if (!result) return;
    const type = salifertConverterState.type || 'calcium';
    const rawSyringe = parseFloat(salifertConverterState.syringe);
    const syringe = clampTestSyringeValue(rawSyringe);
    if (syringe === null) {
        result.innerHTML = '<p class="hint">Bitte den Restinhalt der Spritze auswählen.</p>';
        return;
    }
    if (type === 'kh') {
        const dkh = Math.max(0, interpolateTestScale(syringe, salifertKhPoints) || 0);
        result.innerHTML = `
            <div class="tool-result">
                <div class="tool-row">
                    <span><strong>KH</strong><small>Zwischenwerte per linearer Interpolation aus deiner Skala.</small></span>
                    <span>${dkh.toFixed(2)} dKH</span>
                </div>
                <div class="tool-row">
                    <span><strong>KH gerundet</strong><small>Praxiswert für Messwerte.</small></span>
                    <span>${dkh.toFixed(1)} dKH</span>
                </div>
            </div>
        `;
        return;
    }
    const ppm = Math.max(0, 500 - (syringe * 500));
    const mgL = ppm * 1.023;
    result.innerHTML = `
        <div class="tool-result">
            <div class="tool-row">
                <span><strong>Salifert Anzeige</strong><small>Linear: 0,00 ml = 500 ppm, 1,00 ml = 0 ppm.</small></span>
                <span>${ppm.toFixed(0)} ppm</span>
            </div>
            <div class="tool-row">
                <span><strong>Calcium</strong><small>Umrechnung ppm × 1,023 für Meerwasser.</small></span>
                <span>${mgL.toFixed(1)} mg/l</span>
            </div>
            <div class="tool-row">
                <span><strong>Gerundet</strong><small>Praxiswert für Messwerte.</small></span>
                <span>${Math.round(mgL)} mg/l</span>
            </div>
        </div>
    `;
}

function renderSalifertCalciumConverter() {
    salifertConverterState.type = 'calcium';
    salifertConverterState.typeLabel = 'Calcium';
    updateSalifertDropdownLabels();
    renderSalifertConverter();
}

function renderSalifertKhConverter() {
    salifertConverterState.type = 'kh';
    salifertConverterState.typeLabel = 'KH / Alkalinität';
    updateSalifertDropdownLabels();
    renderSalifertConverter();
}

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

function getAdsorberAdvice(target) {
    const advice = {
        po4: {
            targetLabel: 'Phosphat (PO4) senken',
            primary: 'Adsorber auf Eisenbasis',
            type: 'Eisenhydroxid, Eisenoxidhydrat oder GFO',
            suitability: 'Sehr gut geeignet und meist die Standardwahl zur Phosphatreduktion.',
            alternatives: 'Aluminiumbasis kann ebenfalls PO4 binden, eher gezielt und zeitlich begrenzt einsetzen.',
            notes: [
                'Zunächst unterdosiert starten und PO4 regelmäßig kontrollieren.',
                'PO4 nicht zu schnell oder zu stark absenken.',
                'Material ruhig halten und nicht verwirbeln, damit möglichst wenig Abrieb entsteht.'
            ]
        },
        silicate: {
            targetLabel: 'Silikat / Kieselsäure senken',
            primary: 'Adsorber auf Eisenbasis',
            type: 'Eisenhydroxid, Eisenoxidhydrat oder GFO',
            suitability: 'Gut geeignet, bindet aber bevorzugt auch Phosphat. Daher langsam und kontrolliert fahren.',
            alternatives: 'Aluminiumbasis kann Silikat ebenfalls binden, sollte aber wegen möglichem Aluminium-Eintrag eher kurzzeitig genutzt werden.',
            notes: [
                'Durchfluss bewusst langsam einstellen, damit der Adsorber nicht unnötig mit anderen Stoffen belegt wird.',
                'PO4 parallel messen, weil es oft schneller sinkt als Silikat.',
                'Eintrag von Silikat möglichst an der Quelle stoppen, sonst läuft der Adsorber nur hinterher.'
            ]
        },
        yellowing: {
            targetLabel: 'Gelbstoffe oder Gerüche entfernen',
            primary: 'Aktivkohle',
            type: 'Kokos-, Holz- oder Steinkohle',
            suitability: 'Sehr gut geeignet für klareres Wasser, Gerüche und gelbliche Verfärbung.',
            alternatives: 'Eisen- und Aluminiumadsorber sind dafür nicht die richtige Hauptwahl.',
            notes: [
                'Kohle vor dem Einsatz gründlich spülen, damit kein Kohlenstaub ins Aquarium gelangt.',
                'Nicht abrupt zu viel einsetzen, weil klareres Wasser die Lichtintensität für Korallen erhöht.',
                'Nach Medikamenteneinsatz Aktivkohle gezielt und zeitlich begrenzt verwenden.'
            ]
        },
        organics: {
            targetLabel: 'Organische Belastung / Korallengifte reduzieren',
            primary: 'Aktivkohle',
            type: 'Kokos-, Holz- oder Steinkohle',
            suitability: 'Geeignet für organische Verbindungen, Korallengifte und allgemeine Wasserklärung.',
            alternatives: 'Adsorber auf Eisen- oder Aluminiumbasis sind primär für Phosphat/Silikat gedacht.',
            notes: [
                'Langsam starten, besonders bei empfindlichen Korallen.',
                'Kohlenstaub vermeiden und Material vor dem Einsatz spülen.',
                'Lichtanpassung beachten, weil das Wasser nach Einsatz deutlich klarer werden kann.'
            ]
        },
        medication: {
            targetLabel: 'Medikamentenreste entfernen',
            primary: 'Aktivkohle',
            type: 'Kokos-, Holz- oder Steinkohle',
            suitability: 'Gezielt nach Behandlungen geeignet, um Medikamentenreste und organische Rückstände zu entfernen.',
            alternatives: 'PO4-/Silikatadsorber sind dafür nicht als Hauptmittel gedacht.',
            notes: [
                'Erst einsetzen, wenn die Behandlung beendet ist.',
                'Kohle danach wieder entfernen oder wechseln.',
                'Herstellerhinweise des Medikaments beachten.'
            ]
        }
    };
    return advice[target] || advice.po4;
}

function renderAdsorberAdvice(advice) {
    return `
        <div class="adsorber-advice">
            <div class="adsorber-advice-head">
                <span><small>Ziel</small><strong>${escapeHtml(advice.targetLabel)}</strong></span>
                <span><small>Empfehlung</small><strong>${escapeHtml(advice.primary)}</strong></span>
            </div>
            <div class="adsorber-advice-grid">
                <div>
                    <strong>Typ</strong>
                    <p>${escapeHtml(advice.type)}</p>
                </div>
                <div>
                    <strong>Eignung</strong>
                    <p>${escapeHtml(advice.suitability)}</p>
                </div>
                <div>
                    <strong>Alternative</strong>
                    <p>${escapeHtml(advice.alternatives)}</p>
                </div>
            </div>
            <ul>
                ${advice.notes.map(note => `<li>${escapeHtml(note)}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderAdsorberFlowCalculator() {
    const result = document.getElementById('adsorberFlowResult');
    if (!result) return;
    const targetSubstance = document.getElementById('adsorberTargetSubstance')?.value || 'po4';
    const advice = getAdsorberAdvice(targetSubstance);
    const tank = Math.max(0, parseFloat(document.getElementById('adsorberTankLiters')?.value) || 0);
    const hours = Math.max(1, parseFloat(document.getElementById('adsorberTargetHours')?.value) || 48);
    const primeMinutes = Math.max(1, parseFloat(document.getElementById('adsorberPrimeMinutes')?.value) || 1);
    if (!tank) {
        result.innerHTML = '<p class="hint">Bitte Aquariumvolumen eintragen.</p>';
        return;
    }

    const litersPerHour = tank / hours;
    const mlPerMinute = litersPerHour * 1000 / 60;
    const controlVolumeMl = mlPerMinute * primeMinutes;
    const days = hours / 24;
    const reductionLabel = hours === 48
        ? 'theoretisch etwa 50 % alle 2 Tage'
        : `theoretisch etwa 50 % alle ${hours.toFixed(0)} Stunden`;

    result.innerHTML = `
        <div class="tool-result adsorber-flow-result">
            ${renderAdsorberAdvice(advice)}
            <div class="tool-row">
                <span><strong>Empfohlener Durchsatz</strong><small>${tank.toFixed(1)} L in ${hours.toFixed(0)} h durch den Adsorber</small></span>
                <span>${litersPerHour.toFixed(2)} L/h</span>
            </div>
            <div class="tool-row">
                <span><strong>Feineinstellung</strong><small>Praktischer Wert zum Einstellen am Schlauch / Ablauf</small></span>
                <span>${mlPerMinute.toFixed(0)} ml/min</span>
            </div>
            <div class="tool-row">
                <span><strong>Theoretische Reduktion</strong><small>Bei gestopptem Eintrag und idealer Durchmischung</small></span>
                <span>${reductionLabel}</span>
            </div>
            <div class="tool-row">
                <span><strong>Kontrollmessung</strong><small>Auffangmenge in ${primeMinutes.toFixed(0)} min bei dieser Einstellung</small></span>
                <span>${controlVolumeMl.toFixed(0)} ml</span>
            </div>
            <div class="adsorber-guidance">
                <strong>Empfohlene Nutzung</strong>
                <ul>
                    <li><strong>Durchströmung:</strong> von oben nach unten, damit das Material ruhig im Filterbett liegt.</li>
                    <li><strong>Kein Wirbelbett:</strong> Bewegung kann Abrieb erzeugen und gebundene Stoffe wieder ins Aquarium bringen.</li>
                    <li><strong>Langsamer Durchfluss:</strong> Ziel ist ein komplettes Aquariumvolumen in etwa ${hours.toFixed(0)} Stunden.</li>
                    <li><strong>Kontrolle:</strong> Ablaufwasser ${primeMinutes.toFixed(0)} min auffangen und mit dem berechneten Kontrollwert vergleichen.</li>
                    <li><strong>Hinweis:</strong> Zu hoher Durchfluss kann den Adsorber mit Stoffen belasten, die du nicht gezielt entfernen möchtest.</li>
                </ul>
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

function formatDuration(minutes) {
    const safe = Math.max(0, Math.round(minutes));
    const h = Math.floor(safe / 60);
    const m = safe % 60;
    return `${h} h ${String(m).padStart(2, '0')} min`;
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
            ${recentRows ? `<div class="osmose-history">${recentRows}</div>` : ''}
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

function getDosingContainers() {
    if (!db.dosingContainers) db.dosingContainers = [];
    return db.dosingContainers;
}

function getDosingDailyUsage(container) {
    const usage = Math.max(0, parseFloat(container.usage) || 0);
    return container.usageUnit === 'hour' ? usage * 24 : usage;
}

function calculateDosingCurrentFromWeight(weight, tare, density, capacity) {
    const net = Math.max(0, (parseFloat(weight) || 0) - (parseFloat(tare) || 0));
    const ml = net / Math.max(0.0001, parseFloat(density) || 1);
    return Math.min(Math.max(0, ml), Math.max(0, parseFloat(capacity) || ml));
}

function saveDosingContainer() {
    const name = (document.getElementById('doseContainerName')?.value || '').trim();
    const capacity = Math.max(0, parseFloat(document.getElementById('doseContainerCapacity')?.value) || 0);
    const tare = Math.max(0, parseFloat(document.getElementById('doseContainerTare')?.value) || 0);
    const density = Math.max(0.0001, parseFloat(document.getElementById('doseContainerDensity')?.value) || 1);
    const weightRaw = document.getElementById('doseContainerWeight')?.value;
    const manualCurrent = Math.max(0, parseFloat(document.getElementById('doseContainerCurrent')?.value) || 0);
    const current = weightRaw ? calculateDosingCurrentFromWeight(weightRaw, tare, density, capacity) : Math.min(manualCurrent, capacity || manualCurrent);
    const usage = Math.max(0, parseFloat(document.getElementById('doseContainerUsage')?.value) || 0);
    const usageUnit = document.getElementById('doseContainerUsageUnit')?.value === 'hour' ? 'hour' : 'day';
    const warnHours = Math.max(0, parseFloat(document.getElementById('doseContainerWarnHours')?.value) || 0);
    if (!name || !capacity) return alert('Bitte Name und Volumen eintragen.');
    const containers = getDosingContainers();
    const existing = containers.find(item => item.name.toLowerCase() === name.toLowerCase());
    const payload = {
        id: existing?.id || createWarehouseId(),
        name,
        capacityMl: capacity,
        currentMl: current,
        tareG: tare,
        density,
        usage,
        usageUnit,
        warnHours,
        lastFilledAt: existing?.lastFilledAt || null,
        lastAlertAt: existing?.lastAlertAt || 0,
        updatedAt: new Date().toISOString()
    };
    if (existing) Object.assign(existing, payload);
    else containers.unshift(payload);
    saveDB();
    renderDosingContainers();
    showToast('Vorratsbehälter gespeichert', 'success');
}

function fillDosingContainer(id) {
    const container = getDosingContainers().find(item => item.id === id);
    if (!container) return;
    container.currentMl = parseFloat(container.capacityMl) || 0;
    container.lastFilledAt = new Date().toISOString();
    container.lastAlertAt = 0;
    addWarehouseEvent('dose', `Vorratsbehälter gefüllt: ${container.name}`);
    saveDB();
    renderDosingContainers();
    showToast(`${container.name} aufgefüllt`, 'success');
}

function fillSelectedDosingContainer() {
    const first = getDosingContainers()[0];
    if (!first) return alert('Bitte zuerst einen Vorratsbehälter speichern.');
    fillDosingContainer(first.id);
}

function editDosingContainer(id) {
    const container = getDosingContainers().find(item => item.id === id);
    if (!container) return;
    const map = {
        doseContainerName: container.name,
        doseContainerCapacity: container.capacityMl,
        doseContainerTare: container.tareG,
        doseContainerCurrent: container.currentMl,
        doseContainerDensity: container.density,
        doseContainerUsage: container.usage,
        doseContainerUsageUnit: container.usageUnit || 'day',
        doseContainerWarnHours: container.warnHours
    };
    Object.entries(map).forEach(([idKey, value]) => {
        const el = document.getElementById(idKey);
        if (el) el.value = value ?? '';
    });
    document.getElementById('doseContainerName')?.focus();
}

function deleteDosingContainer(id) {
    if (!confirm('Vorratsbehälter löschen?')) return;
    db.dosingContainers = getDosingContainers().filter(item => item.id !== id);
    saveDB();
    renderDosingContainers();
}

function renderDosingContainers() {
    const result = document.getElementById('dosingContainerResult');
    if (!result) return;
    const containers = getDosingContainers();
    if (containers.length === 0) {
        result.innerHTML = '<p class="hint">Noch keine Vorratsbehälter angelegt.</p>';
        return;
    }
    const now = Date.now();
    result.innerHTML = `
        <div class="dosing-container-list">
            ${containers.map(container => {
                const capacity = parseFloat(container.capacityMl) || 0;
                const current = Math.max(0, Math.min(parseFloat(container.currentMl) || 0, capacity || parseFloat(container.currentMl) || 0));
                const daily = getDosingDailyUsage(container);
                const hoursLeft = daily > 0 ? current / daily * 24 : null;
                const percent = capacity > 0 ? Math.max(0, Math.min(100, current / capacity * 100)) : 0;
                const warn = hoursLeft !== null && hoursLeft <= (parseFloat(container.warnHours) || 0);
                return `
                    <div class="dosing-container-row ${warn ? 'warning' : ''}">
                        <div>
                            <strong>${escapeHtml(container.name)}</strong>
                            <small>${current.toFixed(1)} / ${capacity.toFixed(1)} ml · ${daily.toFixed(2)} ml/Tag · leer in ${hoursLeft === null ? 'unbekannt' : formatDuration(hoursLeft * 60)}</small>
                            <progress class="mini-progress" value="${percent}" max="100" aria-label="Füllstand ${escapeHtml(container.name)}: ${percent.toFixed(0)} Prozent">${percent.toFixed(0)}%</progress>
                            <small>Letzte Füllung: ${container.lastFilledAt ? formatWarehouseDate(container.lastFilledAt) : 'noch nie'}${warn ? ' · Warnbereich erreicht' : ''}</small>
                        </div>
                        <div class="logbook-actions">
                            <button onclick="fillDosingContainer('${container.id}')">Auffüllen</button>
                            <button onclick="editDosingContainer('${container.id}')">Bearbeiten</button>
                            <button onclick="deleteDosingContainer('${container.id}')" class="btn-out">Löschen</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function checkDosingContainerReminders(trigger = 'auto') {
    if (!db || !db.notifications || !db.notifications.enabled) return;
    let changed = false;
    const now = Date.now();
    getDosingContainers().forEach(container => {
        const daily = getDosingDailyUsage(container);
        const current = parseFloat(container.currentMl) || 0;
        if (daily <= 0) return;
        const hoursLeft = current / daily * 24;
        const warnHours = parseFloat(container.warnHours) || 0;
        if (hoursLeft > warnHours) return;
        if (trigger !== 'manual' && container.lastAlertAt && now - container.lastAlertAt < 24 * 60 * 60 * 1000) return;
        const title = 'Vorratsbehälter bald leer';
        const body = `${container.name}: noch ca. ${current.toFixed(1)} ml, reicht etwa ${formatDuration(hoursLeft * 60)}.`;
        if (db.notifications.inAppOnly || !supportsNotifications() || Notification.permission !== 'granted') showToast(`${title}: ${body}`, 'warning', 6500);
        else showLocalNotification(title, body);
        container.lastAlertAt = now;
        changed = true;
    });
    if (changed) saveDB(false);
}

function renderNutritionCalculator() {
    const result = document.getElementById('nutritionResult');
    if (!result) return;
    const adviceResult = document.getElementById('nutritionAdviceResult');
    const element = document.getElementById('nutritionElement')?.value || 'Nitrat';
    const rule = nutritionDoseRules[element] || nutritionDoseRules.Nitrat;
    const label = document.getElementById('nutritionTargetLabel');
    if (label) label.innerText = rule.isDirectDose ? 'Startdosierung' : rule.targetLabel.replace(':', '');
    const unit = document.getElementById('nutritionTargetUnit');
    if (unit) unit.innerText = rule.isDirectDose ? '0,2-2,0 ml/100 L/Tag' : 'mg/l';
    const no3Status = document.getElementById('nutritionNo3Status')?.value || 'high';
    const po4Status = document.getElementById('nutritionPo4Status')?.value || 'high';
    const advice = getNutritionAdvice(no3Status, po4Status);
    if (adviceResult) adviceResult.innerHTML = renderNutritionAdvice(advice);
    const targetInput = document.getElementById('nutritionIncrease');
    if (targetInput) {
        targetInput.disabled = false;
        targetInput.readOnly = false;
        targetInput.closest('.input-group')?.classList.toggle('nutrition-carbon-dose', Boolean(rule.isDirectDose));
        if (rule.isDirectDose) {
            targetInput.min = String(rule.recommendedMin);
            targetInput.max = String(rule.recommendedMax);
            targetInput.step = '0.1';
            const current = parseFloat(targetInput.value);
            targetInput.value = clampNutritionCarbonDose(Number.isFinite(current) ? current : getNutritionCarbonStartDose(no3Status, po4Status)).toFixed(1);
        } else {
            targetInput.min = '0';
            targetInput.removeAttribute('max');
            targetInput.step = '0.01';
        }
    }
    const liters = Math.max(0, parseFloat(document.getElementById('nutritionTankLiters')?.value) || 0);
    const targetChange = Math.max(0, parseFloat(document.getElementById('nutritionIncrease')?.value) || 0);
    const days = Math.max(1, parseInt(document.getElementById('nutritionPlanDays')?.value, 10) || 1);
    if (!liters || !targetChange) {
        result.innerHTML = `
            <p class="hint">Trage ${rule.isDirectDose ? 'die Aquariumgröße ein und wähle eine Kohlenstoff-Dosierung zwischen 0,2 und 2,0 ml pro 100 L/Tag.' : 'Aquariumgröße und gewünschte Zieländerung ein.'}</p>
        `;
        return;
    }
    const totalMl = rule.isDirectDose
        ? (liters / 100) * targetChange
        : (liters / 100) * (targetChange / rule.primaryChange) * rule.mlPer100L;
    const dailyMl = totalMl / days;
    const resolved = resolveRecipeItem({ item: rule.product });
    const stock = resolved ? ((db.inventory[resolved.cat] && db.inventory[resolved.cat][resolved.item]) || 0) : null;
    const stockHint = resolved ? `${stock < totalMl ? 'Bestand reicht nicht · ' : ''}Bestand: ${formatItemAmount(resolved.item, stock)}` : 'nicht lagergeführt';
    const missingClass = resolved && stock < totalMl ? ' missing' : '';
    const planRows = Array.from({ length: days }, (_, index) => `
        <label class="dose-plan-row">
            <input type="checkbox">
            <span>Tag ${index + 1}</span>
            <strong>${dailyMl.toFixed(2)} ml</strong>
        </label>
    `).join('');
    const basisText = rule.isDirectDose
        ? `Wählbare Dosierung im Herstellerbereich: ${rule.recommendedMin.toFixed(1)}-${rule.recommendedMax.toFixed(1)} ml pro 100 L/Tag · langsam starten mit ${rule.startMin.toFixed(2)}-${rule.startMax.toFixed(2)} ml pro 100 L`
        : `1 ml pro 100 L ${rule.action} ${rule.primary} um ${rule.primaryChange} mg/l`;
    result.innerHTML = `
        <div class="tool-result nutrition-dose-result">
            <div class="tool-row nutrition-total-row${missingClass}">
                <span><strong>${rule.product}</strong><small>${rule.isDirectDose ? `gewählte Dosierung ${targetChange} ml pro 100 L/Tag` : `${rule.primary} ${rule.action} um ${targetChange} mg/l`} · ${stockHint}</small></span>
                <span><strong>${totalMl.toFixed(2)} ml</strong><small>gesamt</small></span>
            </div>
            <div class="tool-row">
                <span><strong>Dosierbasis</strong><small>${basisText}</small></span>
                <span><strong>${dailyMl.toFixed(2)} ml</strong><small>pro Tag</small></span>
            </div>
            ${renderNutritionSafetyNotes(element)}
            <div class="dose-plan">${planRows}</div>
        </div>
        <div class="tool-action-row calculator-actions">
            <button class="btn-primary btn-animated booking-action" onclick="bookNutritionDose()">Aus Lager auslagern</button>
        </div>
    `;
}

function bookNutritionDose() {
    const element = document.getElementById('nutritionElement')?.value || 'Nitrat';
    const rule = nutritionDoseRules[element] || nutritionDoseRules.Nitrat;
    const liters = Math.max(0, parseFloat(document.getElementById('nutritionTankLiters')?.value) || 0);
    const targetChange = Math.max(0, parseFloat(document.getElementById('nutritionIncrease')?.value) || 0);
    const totalMl = rule.isDirectDose
        ? (liters / 100) * targetChange
        : (liters / 100) * (targetChange / rule.primaryChange) * rule.mlPer100L;
    const resolved = resolveRecipeItem({ item: rule.product });
    if (!resolved) return alert(`${rule.product} ist nicht lagergeführt.`);
    if (!totalMl) return alert(`Bitte erst ${rule.isDirectDose ? 'die Aquariumgröße eintragen.' : 'Aquariumgröße und Zieländerung eintragen.'}`);
    if (!confirm(`${totalMl.toFixed(2)} ml ${rule.product} auslagern?`)) return;
    executeQueueWithConflictHandling([{ ...resolved, amount: totalMl }], 0);
}

function getNutritionCarbonStartDose(no3Status, po4Status) {
    if (no3Status === 'ok' && po4Status === 'ok') return 0.2;
    return 0.2;
}

function clampNutritionCarbonDose(value) {
    const min = nutritionDoseRules.Kohlenstoff.recommendedMin;
    const max = nutritionDoseRules.Kohlenstoff.recommendedMax;
    return Math.max(min, Math.min(max, Math.round((Number(value) || min) * 10) / 10));
}

function getNutritionAdvice(no3Status, po4Status) {
    const highLowKey = `${no3Status}-${po4Status}`;
    const map = {
        'high-high': {
            title: 'Empfehlung: C',
            products: ['Kohlenstoff (C)'],
            text: 'Nitrat und Phosphat sind erhöht. Kohlenstoff kann die biologische Nährstoffreduktion unterstützen. Langsam starten und NO3/PO4 regelmäßig messen.'
        },
        'low-high': {
            title: 'Empfehlung: C + N',
            products: ['Kohlenstoff (C)', 'Stickstoff (N)'],
            text: 'Nitrat ist niedrig, Phosphat erhöht. Kohlenstoff kann PO4 senken, Stickstoff kann helfen, N nicht weiter zu limitieren.'
        },
        'low-low': {
            title: 'Empfehlung: N + P',
            products: ['Stickstoff (N)', 'Phosphor (P)'],
            text: 'Nitrat und Phosphat sind niedrig. N und P vorsichtig anheben, PO4 nicht unter 0,04 mg/l fallen lassen.'
        },
        'high-low': {
            title: 'Empfehlung: C + P',
            products: ['Kohlenstoff (C)', 'Phosphor (P)'],
            text: 'Nitrat ist erhöht, Phosphat niedrig. Kohlenstoff kann NO3 langfristig senken; Phosphat kann parallel dosiert werden, um eine PO4-Limitierung zu vermeiden.'
        }
    };
    return map[highLowKey] || {
        title: 'Ein Wert liegt im Zielbereich',
        products: [],
        text: 'Wenn einer der Werte im Zielbereich liegt, vorsichtig vorgehen und die konkrete Entwicklung über mehrere Messungen bewerten.'
    };
}

function renderNutritionAdvice(advice) {
    const products = advice.products.length ? advice.products.join(' + ') : 'Messwerte beobachten';
    return `
        <div class="nutrition-advice-card">
            <span class="nutrition-advice-kicker">Vorschlag</span>
            <strong>${escapeHtml(advice.title)}</strong>
            <p>${escapeHtml(advice.text)}</p>
            <div class="nutrition-advice-products">${escapeHtml(products)}</div>
        </div>
    `;
}

function renderNutritionSafetyNotes(element) {
    const notes = {
        Kohlenstoff: [
            'Langsam beginnen: 0,10-0,25 ml pro 100 L/Tag.',
            'Bei Bakterienblüte Dosierung reduzieren oder aussetzen.',
            'Aus Erfahrung kann PO4 zuerst stärker sinken, NO3 oft erst nach längerer Einlaufphase.'
        ],
        Lanthan: [
            'PO4 nicht unter 0,04 mg/l senken.',
            'Vorzugsweise im Technikbecken mit mechanischem Filter vor dem Abschäumer dosieren.',
            'Bei Strudelwürmern vorsichtig sein, da absterbende Tiere Giftstoffe freisetzen können.'
        ],
        Phosphat: [
            'PO4 nicht unter 0,04 mg/l fallen lassen.',
            'Nach Dosierung kontrollieren und lieber in kleinen Schritten arbeiten.'
        ]
    };
    const list = notes[element];
    if (!list) return '';
    return `
        <div class="tool-row">
            <span><strong>Hinweise</strong><small>${list.map(escapeHtml).join(' · ')}</small></span>
            <span>prüfen</span>
        </div>
    `;
}

function getCustomCrPlannerState() {
    if (!db.customCrPlanner) {
        db.customCrPlanner = {
            tankLiters: customCrExampleState.tankLiters,
            currentPsu: customCrExampleState.currentPsu,
            targetPsu: customCrExampleState.targetPsu,
            current: { ...customCrExampleState.current },
            target: { ...customCrOptimalTargets },
            limits: JSON.parse(JSON.stringify(customCrDefaultStepLimits))
        };
    }
    if (!db.customCrPlanner.current) db.customCrPlanner.current = { ...customCrExampleState.current };
    if (!db.customCrPlanner.target) db.customCrPlanner.target = { ...customCrOptimalTargets };
    if (!db.customCrPlanner.limits || typeof db.customCrPlanner.limits !== 'object') {
        db.customCrPlanner.limits = JSON.parse(JSON.stringify(customCrDefaultStepLimits));
    }
    Object.entries(customCrDefaultStepLimits).forEach(([key, value]) => {
        if (!db.customCrPlanner.limits[key]) db.customCrPlanner.limits[key] = { ...value };
        if (!Number.isFinite(parseFloat(db.customCrPlanner.limits[key].up))) db.customCrPlanner.limits[key].up = value.up;
        if (!Number.isFinite(parseFloat(db.customCrPlanner.limits[key].down))) db.customCrPlanner.limits[key].down = value.down;
    });
    if (!db.customCrPlanner.tankLiters) db.customCrPlanner.tankLiters = customCrExampleState.tankLiters;
    if (!db.customCrPlanner.currentPsu) db.customCrPlanner.currentPsu = customCrExampleState.currentPsu;
    if (!db.customCrPlanner.targetPsu) db.customCrPlanner.targetPsu = customCrProxyReferencePsu;
    return db.customCrPlanner;
}

function getCustomCrPlans() {
    if (!Array.isArray(db.customCrPlans)) db.customCrPlans = [];
    return db.customCrPlans;
}

function createCustomCrPlanId() {
    return `custom-cr-plan-${createRemoteWarehouseId()}`;
}

function getCustomCrLimitsForSolver(limits) {
    const source = limits || getCustomCrPlannerState().limits || {};
    const normalized = {};
    Object.entries(customCrDefaultStepLimits).forEach(([key, defaults]) => {
        const current = source[key] || {};
        normalized[key] = {
            up: Math.max(0, parseFloat(current.up) || defaults.up),
            down: Math.max(0, parseFloat(current.down) || defaults.down)
        };
    });
    return normalized;
}

function getCustomCrElementScale(key) {
    const entry = customCrElementDefinitions.find(item => item.key === key);
    return entry?.unit === 'mg/l' ? 'mg/l' : '';
}

function buildCustomCrStepTarget(current, target, currentPsu, targetPsu, limits) {
    const nextTarget = {};
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(current?.[entry.key]) || 0;
        const targetValue = parseFloat(target?.[entry.key]) || 0;
        const delta = targetValue - currentValue;
        const stepLimit = limits?.[entry.key] || customCrDefaultStepLimits[entry.key];
        const maxUp = Math.max(0, parseFloat(stepLimit?.up) || 0);
        const maxDown = Math.max(0, parseFloat(stepLimit?.down) || 0);
        if (delta > maxUp) nextTarget[entry.key] = currentValue + maxUp;
        else if (delta < -maxDown) nextTarget[entry.key] = currentValue - maxDown;
        else nextTarget[entry.key] = targetValue;
    });
    const psuLimit = limits?.PSU || customCrDefaultStepLimits.PSU;
    const psuDelta = (parseFloat(targetPsu) || 0) - (parseFloat(currentPsu) || 0);
    let nextTargetPsu = parseFloat(targetPsu) || 0;
    if (psuDelta > 0) nextTargetPsu = (parseFloat(currentPsu) || 0) + Math.min(psuDelta, Math.max(0, parseFloat(psuLimit?.up) || 0));
    else if (psuDelta < 0) nextTargetPsu = (parseFloat(currentPsu) || 0) - Math.min(Math.abs(psuDelta), Math.max(0, parseFloat(psuLimit?.down) || 0));
    return { target: nextTarget, targetPsu: nextTargetPsu };
}

function scaleCustomCrStepTarget(current, target, currentPsu, targetPsu, scale) {
    const scaled = {};
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(current?.[entry.key]) || 0;
        const targetValue = parseFloat(target?.[entry.key]) || 0;
        scaled[entry.key] = currentValue + ((targetValue - currentValue) * scale);
    });
    const startPsu = parseFloat(currentPsu) || 0;
    const endPsu = parseFloat(targetPsu) || 0;
    return {
        target: scaled,
        targetPsu: startPsu + ((endPsu - startPsu) * scale)
    };
}

function getCustomCrStepViolations(current, target, finalValues, currentPsu, finalPsu, limits) {
    const normalizedLimits = getCustomCrLimitsForSolver(limits);
    const violations = [];
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(current?.[entry.key]) || 0;
        const finalValue = parseFloat(finalValues?.[entry.key]) || 0;
        const targetValue = parseFloat(target?.[entry.key]) || 0;
        const movingUp = targetValue >= currentValue;
        const movingDown = targetValue <= currentValue;
        const delta = finalValue - currentValue;
        const limit = normalizedLimits[entry.key] || customCrDefaultStepLimits[entry.key];
        const maxUp = Math.max(0, parseFloat(limit?.up) || 0);
        const maxDown = Math.max(0, parseFloat(limit?.down) || 0);
        if (delta > maxUp + 0.0001) violations.push({ key: entry.key, delta, limit: maxUp, direction: 'up' });
        if (delta < (-maxDown - 0.0001)) violations.push({ key: entry.key, delta, limit: maxDown, direction: 'down' });
        if (movingUp && finalValue > targetValue + 0.0001) {
            violations.push({ key: entry.key, delta: finalValue - targetValue, limit: targetValue, direction: 'target-over' });
        }
        if (movingDown && finalValue < targetValue - 0.0001) {
            violations.push({ key: entry.key, delta: targetValue - finalValue, limit: targetValue, direction: 'target-under' });
        }
    });
    const psuDelta = (parseFloat(finalPsu) || 0) - (parseFloat(currentPsu) || 0);
    const psuLimit = normalizedLimits.PSU || customCrDefaultStepLimits.PSU;
    if (psuDelta > (parseFloat(psuLimit.up) || 0) + 0.0001) violations.push({ key: 'PSU', delta: psuDelta, limit: psuLimit.up, direction: 'up' });
    if (psuDelta < (-(parseFloat(psuLimit.down) || 0) - 0.0001)) violations.push({ key: 'PSU', delta: psuDelta, limit: psuLimit.down, direction: 'down' });
    return violations;
}

function solveSafeCustomCrStep(current, target, tankLiters, currentPsu, targetPsu, limits) {
    const baseStage = buildCustomCrStepTarget(current, target, currentPsu, targetPsu, limits);
    let low = 0;
    let high = 1;
    let best = null;

    for (let i = 0; i < 26; i += 1) {
        const scale = (low + high) / 2;
        const scaledStage = scaleCustomCrStepTarget(current, baseStage.target, currentPsu, baseStage.targetPsu, scale);
        const solution = solveCustomCRAdjustment(current, scaledStage.target, tankLiters, currentPsu, scaledStage.targetPsu);
        if (!solution) {
            high = scale;
            continue;
        }
        const violations = getCustomCrStepViolations(current, target, solution.finalValues, currentPsu, solution.estimatedPsu, limits);
        if (violations.length === 0) {
            best = {
                scale,
                stagedTarget: scaledStage.target,
                stagedTargetPsu: scaledStage.targetPsu,
                solution,
                violations
            };
            low = scale;
        } else {
            high = scale;
        }
    }

    if (best) return best;
    const fallbackScale = 0.01;
    const fallbackStage = scaleCustomCrStepTarget(current, baseStage.target, currentPsu, baseStage.targetPsu, fallbackScale);
    const fallbackSolution = solveCustomCRAdjustment(current, fallbackStage.target, tankLiters, currentPsu, fallbackStage.targetPsu);
    if (!fallbackSolution) return null;
    return {
        scale: fallbackScale,
        stagedTarget: fallbackStage.target,
        stagedTargetPsu: fallbackStage.targetPsu,
        solution: fallbackSolution,
        violations: getCustomCrStepViolations(current, target, fallbackSolution.finalValues, currentPsu, fallbackSolution.estimatedPsu, limits)
    };
}

function isCustomCrTargetReached(current, target, currentPsu, targetPsu) {
    const tolerance = {
        Na: 3,
        Mg: 1,
        Ca: 0.5,
        K: 0.5,
        Sr: 0.02,
        F: 0.01,
        Cl: 3,
        S: 0.5,
        Br: 0.05,
        B: 0.01,
        PSU: 0.01
    };
    const elementsDone = customCrElementDefinitions.every(entry => {
        const diff = Math.abs((parseFloat(current?.[entry.key]) || 0) - (parseFloat(target?.[entry.key]) || 0));
        return diff <= (tolerance[entry.key] || 0.01);
    });
    const psuDone = Math.abs((parseFloat(currentPsu) || 0) - (parseFloat(targetPsu) || 0)) <= tolerance.PSU;
    return elementsDone && psuDone;
}

function getCustomCrProgressDistance(current, target, currentPsu, targetPsu) {
    let sum = 0;
    customCrElementDefinitions.forEach(entry => {
        sum += Math.abs((parseFloat(current?.[entry.key]) || 0) - (parseFloat(target?.[entry.key]) || 0));
    });
    sum += Math.abs((parseFloat(currentPsu) || 0) - (parseFloat(targetPsu) || 0)) * 100;
    return sum;
}

function buildCustomCrPlan(current, target, tankLiters, currentPsu, targetPsu, limits) {
    const normalizedLimits = getCustomCrLimitsForSolver(limits);
    const steps = [];
    let stepCurrent = JSON.parse(JSON.stringify(current || {}));
    let stepCurrentPsu = Math.max(0, parseFloat(currentPsu) || 0);

    for (let index = 0; index < 12; index += 1) {
        if (isCustomCrTargetReached(stepCurrent, target, stepCurrentPsu, targetPsu)) break;
        const safeStep = solveSafeCustomCrStep(stepCurrent, target, tankLiters, stepCurrentPsu, targetPsu, normalizedLimits);
        const solution = safeStep?.solution;
        if (!solution || !safeStep) break;
        const stateDelta = getCustomCrProgressDistance(solution.finalValues, stepCurrent, solution.estimatedPsu, stepCurrentPsu);
        if (stateDelta <= 0.01) break;
        steps.push({
            id: `step-${index + 1}`,
            index: index + 1,
            current: JSON.parse(JSON.stringify(stepCurrent)),
            currentPsu: stepCurrentPsu,
            stagedTarget: JSON.parse(JSON.stringify(safeStep.stagedTarget)),
            stagedTargetPsu: safeStep.stagedTargetPsu,
            solution: JSON.parse(JSON.stringify(solution)),
            expectedAfter: JSON.parse(JSON.stringify(solution.finalValues)),
            expectedAfterPsu: solution.estimatedPsu,
            scale: safeStep.scale,
            violations: JSON.parse(JSON.stringify(safeStep.violations || [])),
            done: false,
            doneAt: null
        });
        stepCurrent = JSON.parse(JSON.stringify(solution.finalValues));
        stepCurrentPsu = solution.estimatedPsu;
    }

    const completed = isCustomCrTargetReached(stepCurrent, target, stepCurrentPsu, targetPsu);
    return {
        id: createCustomCrPlanId(),
        createdAt: new Date().toISOString(),
        tankLiters,
        startCurrent: JSON.parse(JSON.stringify(current || {})),
        startPsu: currentPsu,
        target: JSON.parse(JSON.stringify(target || {})),
        targetPsu,
        limits: JSON.parse(JSON.stringify(normalizedLimits)),
        steps,
        projectedFinal: JSON.parse(JSON.stringify(stepCurrent)),
        projectedFinalPsu: stepCurrentPsu,
        completed,
        status: completed ? 'ready' : 'partial'
    };
}

function getCustomCrPlanCompletion(plan) {
    const done = (plan?.steps || []).filter(step => step.done).length;
    const total = (plan?.steps || []).length;
    return { done, total };
}

function renderCustomCrLimitsMatrix() {
    if (!isCustomCRUnlocked()) return;
    const mount = document.getElementById('customCrLimitsMatrix');
    if (!mount) return;
    const planner = getCustomCrPlannerState();
    const limitRows = [
        ...customCrElementDefinitions.map(entry => ({ key: entry.key, label: entry.label, unit: entry.unit })),
        { key: 'PSU', label: 'PSU', unit: 'PSU' }
    ];
    mount.innerHTML = `
        <details class="custom-cr-limits-shell">
            <summary class="custom-cr-collapsible-head">
                <span>
                    <strong>Schritt-Limits pro C&amp;R Wasserwechsel</strong>
                    <small>Standardmäßig eingeklappt. Hier steuerst du die maximalen Tagesänderungen.</small>
                </span>
            </summary>
            <div class="custom-cr-limits-grid">
                <div class="custom-cr-limits-header">Wert</div>
                <div class="custom-cr-limits-header">Max. hoch</div>
                <div class="custom-cr-limits-header">Max. runter</div>
                ${limitRows.map(row => `
                    <div class="custom-cr-limits-label">
                        <strong>${row.label}</strong>
                        <small>${row.unit}</small>
                    </div>
                    <input type="number" id="customCrLimitUp-${row.key}" step="0.01" value="${planner.limits?.[row.key]?.up ?? customCrDefaultStepLimits[row.key].up}" oninput="renderCustomCRPlanner()">
                    <input type="number" id="customCrLimitDown-${row.key}" step="0.01" value="${planner.limits?.[row.key]?.down ?? customCrDefaultStepLimits[row.key].down}" oninput="renderCustomCRPlanner()">
                `).join('')}
            </div>
        </details>
    `;
}

function getCustomCrProxyPsu(values) {
    const total = customCrElementDefinitions.reduce((sum, entry) => sum + Math.max(0, parseFloat(values?.[entry.key]) || 0), 0);
    if (!total || !customCrProxyReferenceSum) return 0;
    return (total / customCrProxyReferenceSum) * customCrProxyReferencePsu;
}

function getCustomCrIonicSum(values) {
    return customCrElementDefinitions.reduce((sum, entry) => sum + Math.max(0, parseFloat(values?.[entry.key]) || 0), 0);
}

function estimateCustomCrFinalPsu(currentValues, finalValues, currentPsu) {
    const startPsu = Math.max(0, parseFloat(currentPsu) || 0);
    const currentSum = getCustomCrIonicSum(currentValues);
    const finalSum = getCustomCrIonicSum(finalValues);
    if (startPsu > 0 && currentSum > 0 && finalSum > 0) {
        return startPsu * (finalSum / currentSum);
    }
    return getCustomCrProxyPsu(finalValues);
}

function getCustomCrMassNeed(current, target, tankLiters, removalLiters) {
    return customCrElementDefinitions.map(entry => {
        const currentValue = parseFloat(current[entry.key]) || 0;
        const targetValue = parseFloat(target[entry.key]) || 0;
        return tankLiters * (targetValue - currentValue) + currentValue * removalLiters;
    });
}

function getCustomCrElementContributionPerMl(product, elementKey) {
    const doseMl = Math.max(0.0001, parseFloat(product?.doseMlPer100L) || 1);
    const increaseMgL = parseFloat(product?.increaseMgL?.[elementKey]) || 0;
    return (increaseMgL / doseMl) * 100;
}

function buildCustomCrCoefficientMatrix() {
    return customCrElementDefinitions.map(entry =>
        customCrProducts.map(product => getCustomCrElementContributionPerMl(product, entry.key))
    );
}

function getCustomCrAddedIonMassKg(amounts) {
    let totalMg = 0;
    customCrProducts.forEach((product, index) => {
        const amountMl = Math.max(0, parseFloat(amounts[index]) || 0);
        if (!amountMl) return;
        Object.keys(product.increaseMgL || {}).forEach(elementKey => {
            totalMg += getCustomCrElementContributionPerMl(product, elementKey) * amountMl;
        });
    });
    return totalMg / 1e6;
}

function estimateCustomCrPsuFromProducts(currentPsu, tankLiters, removalLiters, amounts) {
    const startPsu = Math.max(0, parseFloat(currentPsu) || 0);
    const tank = Math.max(0, parseFloat(tankLiters) || 0);
    if (!tank || !startPsu) return 0;
    const basePsuAfterRemoval = startPsu * Math.max(0, 1 - (Math.max(0, removalLiters) / tank));
    const additiveRise = customCrProducts.reduce((sum, product, index) => {
        const amountMl = Math.max(0, parseFloat(amounts[index]) || 0);
        const risePerMlPer100L = Math.max(0, parseFloat(product.psuRisePerMlPer100L) || 0);
        return sum + (amountMl * risePerMlPer100L * (100 / tank));
    }, 0);
    return basePsuAfterRemoval + additiveRise;
}

function estimateCustomCrPsuFromSaltMass(currentPsu, tankLiters, removalLiters, amounts) {
    return estimateCustomCrPsuFromProducts(currentPsu, tankLiters, removalLiters, amounts);
}

function solveCustomCrNnls(massNeed, warmStart = null) {
    const rows = customCrElementDefinitions.length;
    const cols = customCrProducts.length;
    const matrix = buildCustomCrCoefficientMatrix();
    const prediction = new Array(rows).fill(0);
    const amounts = new Array(cols).fill(0);
    if (Array.isArray(warmStart)) {
        warmStart.forEach((value, index) => {
            const next = Math.max(0, parseFloat(value) || 0);
            amounts[index] = next;
            for (let row = 0; row < rows; row += 1) prediction[row] += matrix[row][index] * next;
        });
    }
    const columnNorms = customCrProducts.map((_, col) => {
        let norm = 0;
        for (let row = 0; row < rows; row += 1) norm += matrix[row][col] * matrix[row][col];
        return norm || 1;
    });
    for (let iteration = 0; iteration < 320; iteration += 1) {
        let maxChange = 0;
        for (let col = 0; col < cols; col += 1) {
            let numerator = 0;
            for (let row = 0; row < rows; row += 1) {
                const coeff = matrix[row][col];
                if (!coeff) continue;
                numerator += coeff * (massNeed[row] - prediction[row] + coeff * amounts[col]);
            }
            const next = Math.max(0, numerator / columnNorms[col]);
            const delta = next - amounts[col];
            if (!delta) continue;
            amounts[col] = next;
            maxChange = Math.max(maxChange, Math.abs(delta));
            for (let row = 0; row < rows; row += 1) prediction[row] += matrix[row][col] * delta;
        }
        if (maxChange < 0.0001) break;
    }
    return { amounts, prediction };
}

function createCustomCrNeedMap(current, target, tankLiters, removalLiters) {
    const map = {};
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(current[entry.key]) || 0;
        const targetValue = parseFloat(target[entry.key]) || 0;
        map[entry.key] = Math.max(0, tankLiters * (targetValue - currentValue) + currentValue * removalLiters);
    });
    return map;
}

function applyCustomCrDoseToNeedMap(needMap, productKey, amountMl) {
    if (!amountMl || amountMl <= 0) return;
    const product = customCrProducts.find(entry => entry.key === productKey);
    if (!product) return;
    Object.keys(product.increaseMgL || {}).forEach(elementKey => {
        needMap[elementKey] = Math.max(0, (needMap[elementKey] || 0) - (getCustomCrElementContributionPerMl(product, elementKey) * amountMl));
    });
}

function getCustomCrBaseRemovalLiters(current, target, tankLiters, currentPsu, targetPsu) {
    let removal = 0;
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(current[entry.key]) || 0;
        const targetValue = parseFloat(target[entry.key]) || 0;
        if (currentValue > targetValue && currentValue > 0) {
            removal = Math.max(removal, tankLiters * (1 - (targetValue / currentValue)));
        }
    });
    if (currentPsu > 0 && targetPsu > 0 && targetPsu < currentPsu) {
        removal = Math.max(removal, tankLiters * (1 - (targetPsu / currentPsu)));
    }
    return Math.max(0, removal);
}

function getCustomCrDirectionalTargetPenalty(current, target, finalValues, finalPsu, targetPsu) {
    const penaltyScales = { Na: 50, Mg: 10, Ca: 5, K: 5, Sr: 0.2, F: 0.05, Cl: 60, S: 8, Br: 1, B: 0.1, PSU: 0.1 };
    let penalty = 0;
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(current?.[entry.key]) || 0;
        const targetValue = parseFloat(target?.[entry.key]) || 0;
        const finalValue = parseFloat(finalValues?.[entry.key]) || 0;
        const scale = penaltyScales[entry.key] || 1;
        const diff = finalValue - targetValue;
        penalty += Math.pow(diff / scale, 2);
        if (targetValue >= currentValue && finalValue > targetValue) {
            penalty += Math.pow((finalValue - targetValue) / scale, 2) * 400;
        }
        if (targetValue <= currentValue && finalValue < targetValue) {
            penalty += Math.pow((targetValue - finalValue) / scale, 2) * 400;
        }
    });
    const psuScale = penaltyScales.PSU;
    const psuDiff = (parseFloat(finalPsu) || 0) - (parseFloat(targetPsu) || 0);
    penalty += Math.pow(psuDiff / psuScale, 2) * 2.2;
    return penalty;
}

function finalizeCustomCrValues(current, tankLiters, removalLiters, additions, extraDilutionLiters = 0) {
    const finalMass = {};
    customCrElementDefinitions.forEach(entry => {
        finalMass[entry.key] = (parseFloat(current[entry.key]) || 0) * Math.max(0, tankLiters - removalLiters);
    });
    customCrProducts.forEach((product, index) => {
        const amountMl = Math.max(0, parseFloat(additions[index]) || 0);
        if (!amountMl) return;
        Object.keys(product.increaseMgL || {}).forEach(elementKey => {
            finalMass[elementKey] += getCustomCrElementContributionPerMl(product, elementKey) * amountMl;
        });
    });
    const dilutionFactor = extraDilutionLiters > 0 ? Math.max(0, 1 - (extraDilutionLiters / tankLiters)) : 1;
    const finalValues = {};
    customCrElementDefinitions.forEach(entry => {
        finalValues[entry.key] = (finalMass[entry.key] / tankLiters) * dilutionFactor;
    });
    return finalValues;
}

function estimateCustomCrPsuAfterAdditionalDilution(basePsu, extraDilutionLiters, tankLiters) {
    if (!basePsu || !extraDilutionLiters || !tankLiters) return basePsu;
    return basePsu * Math.max(0, 1 - (extraDilutionLiters / tankLiters));
}

function scoreCustomCrSolution(solution, targetPsu) {
    if (!solution) return Number.POSITIVE_INFINITY;
    const scales = { Na: 50, Mg: 10, Ca: 5, K: 5, Sr: 0.2, F: 0.05, Cl: 60, S: 8, Br: 1, B: 0.1 };
    let score = 0;
    customCrElementDefinitions.forEach(entry => {
        const scale = scales[entry.key] || Math.max(1, (solution.target[entry.key] || 1) * 0.01);
        const diff = (solution.finalValues[entry.key] || 0) - (solution.target[entry.key] || 0);
        score += Math.pow(diff / scale, 2);
    });
    score += Math.pow(Math.max(0, -solution.roLiters) * 50, 2);
    score += Math.pow(Math.max(0, solution.totalAdditiveLiters - solution.removalLiters) * 50, 2);
    score += solution.totalAdditiveLiters * 0.15 + solution.removalLiters * 0.015;
    if (targetPsu > 0) score += Math.pow((solution.estimatedPsu - targetPsu) * 1.6, 2);
    return score;
}

function buildCustomCrSolution(current, target, tankLiters, removalLiters, nnlsResult, currentPsu, targetPsu) {
    const additions = {};
    let totalAdditiveMl = 0;
    customCrProducts.forEach((product, index) => {
        const amount = Math.max(0, nnlsResult.amounts[index] || 0);
        additions[product.item] = amount;
        totalAdditiveMl += amount;
    });
    const totalAdditiveLiters = totalAdditiveMl / 1000;
    const roLiters = removalLiters - totalAdditiveLiters;
    const finalValues = {};
    customCrElementDefinitions.forEach((entry, rowIndex) => {
        const remainingMass = (parseFloat(current[entry.key]) || 0) * Math.max(0, tankLiters - removalLiters);
        const finalMass = remainingMass + (nnlsResult.prediction[rowIndex] || 0);
        finalValues[entry.key] = tankLiters > 0 ? finalMass / tankLiters : 0;
    });
    return {
        current,
        target,
        removalLiters,
        roLiters,
        additions,
        totalAdditiveLiters,
        finalValues,
        estimatedPsu: currentPsu > 0
            ? estimateCustomCrPsuFromSaltMass(currentPsu, tankLiters, removalLiters, nnlsResult.amounts)
            : getCustomCrProxyPsu(finalValues),
        score: 0
    };
}

function solveCustomCRAdjustmentWithRemoval(current, target, tankLiters, currentPsu, targetPsu, removalLiters) {
    if (!tankLiters) return null;
    const needMap = createCustomCrNeedMap(current, target, tankLiters, removalLiters);
    const additionsMap = Object.fromEntries(customCrProducts.map(product => [product.item, 0]));
    const noteParts = [];

    const applyByPrimaryNeed = (productKey, primaryElement) => {
        const product = customCrProducts.find(entry => entry.key === productKey);
        if (!product) return 0;
        const primaryPerMl = getCustomCrElementContributionPerMl(product, primaryElement);
        if (!primaryPerMl) return 0;
        const amountMl = Math.max(0, (needMap[primaryElement] || 0) / primaryPerMl);
        additionsMap[product.item] += amountMl;
        applyCustomCrDoseToNeedMap(needMap, productKey, amountMl);
        return amountMl;
    };

    const primaryProducts = [
        ['B', 'B'],
        ['NaF', 'F'],
        ['SrCl2', 'Sr'],
        ['CaCl2', 'Ca'],
        ['KBr', 'Br']
    ];
    primaryProducts.forEach(([productKey, primaryElement]) => applyByPrimaryNeed(productKey, primaryElement));

    if ((needMap.Mg || 0) > 0) {
        const mgso4 = customCrProducts.find(entry => entry.key === 'MgSO4');
        const mgso4ByMg = (needMap.Mg || 0) / getCustomCrElementContributionPerMl(mgso4, 'Mg');
        const mgso4ByS = (needMap.S || 0) > 0 ? (needMap.S / getCustomCrElementContributionPerMl(mgso4, 'S')) : mgso4ByMg;
        const mgso4Amount = Math.max(0, Math.min(mgso4ByMg, mgso4ByS));
        additionsMap[mgso4.item] += mgso4Amount;
        applyCustomCrDoseToNeedMap(needMap, 'MgSO4', mgso4Amount);
        if ((needMap.Mg || 0) > 0) applyByPrimaryNeed('MgCl2', 'Mg');
    }

    if ((needMap.K || 0) > 0) {
        const shouldPreferKCl = (needMap.Cl || 0) >= (needMap.S || 0) || (targetPsu > 0 && currentPsu > 0 && targetPsu >= currentPsu);
        if (!shouldPreferKCl && (needMap.S || 0) > 0) {
            const k2so4 = customCrProducts.find(entry => entry.key === 'K2SO4');
            const k2so4ByK = (needMap.K || 0) / getCustomCrElementContributionPerMl(k2so4, 'K');
            const k2so4ByS = (needMap.S || 0) / getCustomCrElementContributionPerMl(k2so4, 'S');
            const k2so4Amount = Math.max(0, Math.min(k2so4ByK, k2so4ByS));
            additionsMap[k2so4.item] += k2so4Amount;
            applyCustomCrDoseToNeedMap(needMap, 'K2SO4', k2so4Amount);
        }
        if ((needMap.K || 0) > 0) applyByPrimaryNeed('KCl', 'K');
    }

    if ((needMap.S || 0) > 0 && (needMap.Na || 0) > 0) {
        const na2so4 = customCrProducts.find(entry => entry.key === 'Na2SO4');
        const na2so4ByS = (needMap.S || 0) / getCustomCrElementContributionPerMl(na2so4, 'S');
        const na2so4ByNa = (needMap.Na || 0) / getCustomCrElementContributionPerMl(na2so4, 'Na');
        const na2so4Amount = Math.max(0, Math.min(na2so4ByS, na2so4ByNa));
        additionsMap[na2so4.item] += na2so4Amount;
        applyCustomCrDoseToNeedMap(needMap, 'Na2SO4', na2so4Amount);
    }

    if ((needMap.Na || 0) > 0 || (needMap.Cl || 0) > 0) {
        const nacl = customCrProducts.find(entry => entry.key === 'NaCl');
        const naNeedAmount = (needMap.Na || 0) > 0 ? ((needMap.Na || 0) / getCustomCrElementContributionPerMl(nacl, 'Na')) : 0;
        const clNeedAmount = (needMap.Cl || 0) > 0 ? ((needMap.Cl || 0) / getCustomCrElementContributionPerMl(nacl, 'Cl')) : 0;
        const naclAmount = Math.max(naNeedAmount, clNeedAmount);
        additionsMap[nacl.item] += naclAmount;
        applyCustomCrDoseToNeedMap(needMap, 'NaCl', naclAmount);
    }

    let additions = customCrProducts.map(product => additionsMap[product.item] || 0);
    const basePsu = currentPsu > 0 ? estimateCustomCrPsuFromSaltMass(currentPsu, tankLiters, removalLiters, additions) : 0;
    let extraNaClMl = 0;
    let extraDilutionLiters = 0;

    if (currentPsu > 0 && targetPsu > 0 && targetPsu > basePsu + 0.01) {
        let low = 0;
        let high = 6000;
        const naclIndex = customCrProducts.findIndex(product => product.key === 'NaCl');
        for (let i = 0; i < 42; i += 1) {
            const mid = (low + high) / 2;
            const test = additions.slice();
            test[naclIndex] += mid;
            const psu = estimateCustomCrPsuFromSaltMass(currentPsu, tankLiters, removalLiters, test);
            if (psu < targetPsu) low = mid;
            else high = mid;
        }
        extraNaClMl = (low + high) / 2;
        additions[naclIndex] += extraNaClMl;
        noteParts.push(`PSU-Korrektur ueber NaCl: +${extraNaClMl.toFixed(2)} ml.`);
    } else if (currentPsu > 0 && targetPsu > 0 && basePsu > targetPsu + 0.01) {
        let low = 0;
        let high = tankLiters * 0.2;
        for (let i = 0; i < 36; i += 1) {
            const mid = (low + high) / 2;
            const psu = estimateCustomCrPsuAfterAdditionalDilution(basePsu, mid, tankLiters);
            if (psu > targetPsu) low = mid;
            else high = mid;
        }
        extraDilutionLiters = (low + high) / 2;
        noteParts.push(`PSU-Korrektur ueber zusaetzliche RO-Verduennung: ${extraDilutionLiters.toFixed(2)} L.`);
    }

    const totalAdditiveLiters = additions.reduce((sum, value) => sum + Math.max(0, value || 0), 0) / 1000;
    const finalValues = finalizeCustomCrValues(current, tankLiters, removalLiters, additions, extraDilutionLiters);
    const estimatedPsu = currentPsu > 0
        ? (extraDilutionLiters > 0
            ? estimateCustomCrPsuAfterAdditionalDilution(basePsu, extraDilutionLiters, tankLiters)
            : estimateCustomCrPsuFromSaltMass(currentPsu, tankLiters, removalLiters, additions))
        : getCustomCrProxyPsu(finalValues);
    const roLiters = Math.max(0, removalLiters - totalAdditiveLiters + extraDilutionLiters);
    const solution = {
        current,
        target,
        removalLiters: removalLiters + extraDilutionLiters,
        roLiters,
        additions: Object.fromEntries(customCrProducts.map((product, index) => [product.item, additions[index] || 0])),
        totalAdditiveLiters,
        finalValues,
        estimatedPsu,
        score: 0,
        note: noteParts.join(' '),
        extraNaClMl,
        extraDilutionLiters,
        basePsu
    };
    solution.score = scoreCustomCrSolution(solution, targetPsu);
    return solution;
}

function solveCustomCRAdjustment(current, target, tankLiters, currentPsu, targetPsu) {
    if (!tankLiters) return null;
    const baseRemovalLiters = getCustomCrBaseRemovalLiters(current, target, tankLiters, currentPsu, targetPsu);
    const candidates = new Set([Math.max(0, baseRemovalLiters)]);
    const candidateSteps = [0, 0.01, 0.02, 0.035, 0.05, 0.075, 0.1, 0.13, 0.16, 0.2, 0.24, 0.28, 0.33, 0.38];
    candidateSteps.forEach(stepFraction => {
        candidates.add(Math.min(tankLiters * 0.55, baseRemovalLiters + (tankLiters * stepFraction)));
    });
    if (baseRemovalLiters > 0) {
        [1.05, 1.1, 1.15, 1.2, 1.3, 1.4, 1.5].forEach(factor => {
            candidates.add(Math.min(tankLiters * 0.55, baseRemovalLiters * factor));
        });
    }

    let best = null;
    const targetDistanceScale = Math.max(1, tankLiters * 0.0015);
    [...candidates]
        .filter(value => Number.isFinite(value) && value >= 0 && value <= tankLiters * 0.55)
        .sort((a, b) => a - b)
        .forEach(removalLiters => {
            const solution = solveCustomCRAdjustmentWithRemoval(current, target, tankLiters, currentPsu, targetPsu, removalLiters);
            if (!solution) return;
            const directionalPenalty = getCustomCrDirectionalTargetPenalty(current, target, solution.finalValues, solution.estimatedPsu, targetPsu);
            const finalScore = directionalPenalty + (solution.removalLiters / targetDistanceScale);
            solution.optimizerMeta = {
                baseRemovalLiters,
                optimizedRemovalLiters: removalLiters,
                directionalPenalty
            };
            if (!best || finalScore < best.finalScore - 0.0001 || (Math.abs(finalScore - best.finalScore) <= 0.0001 && solution.removalLiters < best.solution.removalLiters)) {
                best = { solution, finalScore };
            }
        });

    if (!best) return solveCustomCRAdjustmentWithRemoval(current, target, tankLiters, currentPsu, targetPsu, baseRemovalLiters);
    if (best.solution.optimizerMeta && best.solution.optimizerMeta.optimizedRemovalLiters > best.solution.optimizerMeta.baseRemovalLiters + 0.25) {
        const addedRemoval = best.solution.optimizerMeta.optimizedRemovalLiters - best.solution.optimizerMeta.baseRemovalLiters;
        best.solution.note = `${best.solution.note ? `${best.solution.note} ` : ''}Optimiert fuer weniger Gesamtschritte: +${addedRemoval.toFixed(2)} L extra Wasserwechsel, damit Na, Cl und PSU sauberer ins Ziel laufen.`.trim();
    }
    return best.solution;
}

function renderCustomCrPlannerMatrix() {
    if (!isCustomCRUnlocked()) return;
    const planner = getCustomCrPlannerState();
    const mount = document.getElementById('customCrPlannerMatrix');
    if (!mount) return;
    mount.innerHTML = `
        <div class="custom-cr-matrix-headline">
            <strong>Ist- und Zielwerte</strong>
            <small>Hier trägst du die gemessenen Werte und die gewünschten Zielwerte ein.</small>
        </div>
        <div class="custom-cr-matrix">
            <div class="custom-cr-matrix-header">Element</div>
            <div class="custom-cr-matrix-header">Ist</div>
            <div class="custom-cr-matrix-header">Ziel</div>
            ${customCrElementDefinitions.map(entry => `
                <div class="custom-cr-matrix-label">
                    <strong>${entry.label}</strong>
                    <small>${entry.unit}</small>
                </div>
                <input type="number" id="customCrCurrent-${entry.key}" step="0.01" value="${planner.current[entry.key] ?? ''}" oninput="renderCustomCRPlanner()">
                <input type="number" id="customCrTarget-${entry.key}" step="0.01" value="${planner.target[entry.key] ?? ''}" oninput="renderCustomCRPlanner()">
            `).join('')}
        </div>
    `;
}

function syncCustomCrPlannerFromInputs() {
    const planner = getCustomCrPlannerState();
    planner.tankLiters = Math.max(0, parseFloat(document.getElementById('customCrTankLiters')?.value) || planner.tankLiters || 0);
    planner.currentPsu = Math.max(0, parseFloat(document.getElementById('customCrCurrentPsu')?.value) || planner.currentPsu || 0);
    planner.targetPsu = Math.max(0, parseFloat(document.getElementById('customCrTargetPsu')?.value) || planner.targetPsu || 0);
    customCrElementDefinitions.forEach(entry => {
        const currentValue = parseFloat(document.getElementById(`customCrCurrent-${entry.key}`)?.value);
        const targetValue = parseFloat(document.getElementById(`customCrTarget-${entry.key}`)?.value);
        if (!planner.current) planner.current = {};
        if (!planner.target) planner.target = {};
        planner.current[entry.key] = Number.isFinite(currentValue) ? currentValue : 0;
        planner.target[entry.key] = Number.isFinite(targetValue) ? targetValue : 0;
    });
    planner.limits = planner.limits || JSON.parse(JSON.stringify(customCrDefaultStepLimits));
    Object.keys(customCrDefaultStepLimits).forEach(key => {
        const upValue = parseFloat(document.getElementById(`customCrLimitUp-${key}`)?.value);
        const downValue = parseFloat(document.getElementById(`customCrLimitDown-${key}`)?.value);
        planner.limits[key] = {
            up: Number.isFinite(upValue) ? Math.max(0, upValue) : customCrDefaultStepLimits[key].up,
            down: Number.isFinite(downValue) ? Math.max(0, downValue) : customCrDefaultStepLimits[key].down
        };
    });
    saveDB(false);
    return planner;
}

function bindCustomCrRealtimeInputs() {
    const root = document.getElementById('customCrProtectedContent');
    if (!root || root.dataset.realtimeBound === 'true') return;
    const refresh = event => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement) && !(target instanceof HTMLTextAreaElement)) return;
        if (!target.id || !target.id.startsWith('customCr')) return;
        requestAnimationFrame(() => renderCustomCRPlanner());
    };
    root.addEventListener('input', refresh);
    root.addEventListener('change', refresh);
    root.dataset.realtimeBound = 'true';
}

function renderCustomCRPlanner() {
    if (!isCustomCRUnlocked()) return;
    bindCustomCrRealtimeInputs();
    const planner = getCustomCrPlannerState();
    if (!document.getElementById('customCrLimitsMatrix')?.children.length) renderCustomCrLimitsMatrix();
    if (!document.getElementById('customCrPlannerMatrix')?.children.length) renderCustomCrPlannerMatrix();
    const syncedPlanner = syncCustomCrPlannerFromInputs();
    const result = document.getElementById('customCrPlannerResult');
    if (!result) return;
    const currentDisplayPsu = syncedPlanner.currentPsu > 0 ? syncedPlanner.currentPsu : getCustomCrProxyPsu(syncedPlanner.current);
    if (!syncedPlanner.tankLiters) {
        result.innerHTML = '<p class="hint">Bitte zuerst die Aquariumgröße eintragen.</p>';
        return;
    }
    const solution = solveCustomCRAdjustment(syncedPlanner.current, syncedPlanner.target, syncedPlanner.tankLiters, syncedPlanner.currentPsu, syncedPlanner.targetPsu);
    const plan = buildCustomCrPlan(syncedPlanner.current, syncedPlanner.target, syncedPlanner.tankLiters, syncedPlanner.currentPsu, syncedPlanner.targetPsu, syncedPlanner.limits);
    if (!solution) {
        result.innerHTML = '<p class="hint">Aus diesen Werten konnte kein sinnvoller Ausgleich berechnet werden.</p>';
        return;
    }
    const primaryStep = plan.steps[0] || null;
    const primarySolution = primaryStep?.solution || solution;
    const primaryAfterValues = primaryStep?.expectedAfter || solution.finalValues;
    const primaryAfterPsu = primaryStep?.expectedAfterPsu || solution.estimatedPsu;
    const displayedCurrentPsu = primaryStep?.currentPsu ?? currentDisplayPsu;
    const activeProductRows = customCrProducts
        .map(product => {
            const amount = primarySolution.additions[product.item] || 0;
            if (amount <= 0.01) return '';
            const resolved = resolveRecipeItem({ item: product.item });
            const stock = resolved ? ((db.inventory[resolved.cat] && db.inventory[resolved.cat][resolved.item]) || 0) : null;
            const missing = resolved && stock < amount;
            const grams = amount * (densityFactors[product.item] || 1);
            return `
                <div class="custom-cr-product-line ${missing ? 'missing' : ''}">
                    <strong>${product.key}</strong>
                    <span>${amount.toFixed(2)} ml</span>
                    <small>${grams.toFixed(1)} g${resolved ? ` · Bestand ${formatItemAmount(product.item, stock)}` : ''}</small>
                </div>
            `;
        })
        .filter(Boolean)
        .join('');
    const beforeAfterRows = customCrElementDefinitions.map(entry => `
        <div class="custom-cr-delta-pill">
            <strong>${entry.label}</strong>
            <span>${(syncedPlanner.current[entry.key] || 0).toFixed(2)} → ${(primaryAfterValues[entry.key] || 0).toFixed(2)}</span>
            <small>${((primaryAfterValues[entry.key] || 0) - (syncedPlanner.current[entry.key] || 0)).toFixed(2)} ${entry.unit} · Ziel ${(syncedPlanner.target[entry.key] || 0).toFixed(2)}</small>
        </div>
    `).join('');
    const remainingRows = customCrElementDefinitions
        .map(entry => {
            const remaining = (syncedPlanner.target[entry.key] || 0) - (primaryAfterValues[entry.key] || 0);
            return {
                key: entry.key,
                label: entry.label,
                unit: entry.unit,
                remaining
            };
        })
        .filter(entry => Math.abs(entry.remaining) > 0.01)
        .sort((a, b) => Math.abs(b.remaining) - Math.abs(a.remaining))
        .slice(0, 4)
        .map(entry => `
            <div class="custom-cr-remaining-chip">
                <strong>${entry.label}</strong>
                <span>${entry.remaining > 0 ? '+' : ''}${entry.remaining.toFixed(2)} ${entry.unit}</span>
            </div>
        `)
        .join('');
    const planSummary = plan.steps.map(step => `
        <div class="custom-cr-plan-step-card">
            <div class="custom-cr-plan-chip">
                <strong>Schritt ${step.index}</strong>
                <span>${step.solution.removalLiters.toFixed(2)} L WW · ${Math.max(0, step.solution.roLiters).toFixed(2)} L RO</span>
                <small>PSU ${step.currentPsu.toFixed(2)} → ${step.expectedAfterPsu.toFixed(2)}${step.scale < 0.999 ? ` · Sicherheitsfaktor ${(step.scale * 100).toFixed(0)}%` : ''}</small>
            </div>
            <div class="custom-cr-step-values-grid">
                ${customCrElementDefinitions.map(entry => `
                    <div class="custom-cr-step-value-pill">
                        <strong>${entry.label}</strong>
                        <span>${Number(step.current?.[entry.key] || 0).toFixed(2)} → ${Number(step.expectedAfter?.[entry.key] || 0).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    const statusText = !plan.completed && plan.steps.length >= 12
        ? 'Mehr als 12 Wasserwechsel nötig'
        : (plan.steps.length > 1 ? `${plan.steps.length} Wasserwechsel empfohlen` : '1 Wasserwechsel reicht aus');
    const scalingHint = primaryStep?.scale && primaryStep.scale < 0.999
        ? `Die Grenzwerte erzwingen fuer Schritt 1 aktuell nur ${(primaryStep.scale * 100).toFixed(0)}% der rechnerischen Zielbewegung.`
        : '';
    const limitingHint = primaryStep?.violations?.length
        ? `Begrenzender Faktor: ${primaryStep.violations.map(item => item.key).join(', ')}.`
        : '';
    const optimizerHint = primarySolution.optimizerMeta?.optimizedRemovalLiters > primarySolution.optimizerMeta?.baseRemovalLiters + 0.25
        ? `Der Rechner hat den Wasserwechsel bewusst auf ${primarySolution.optimizerMeta.optimizedRemovalLiters.toFixed(2)} L erhöht, damit weniger Gesamtschritte nötig werden.`
        : 'Der Rechner sucht automatisch den kleinsten noch sauberen Schritt und vergrößert ihn nur, wenn dadurch weniger Gesamtschritte nötig sind.';
    const planStatusCopy = plan.steps.length > 1
        ? `Mit deinen Limits sind aktuell ${plan.steps.length} Schritte der kürzeste saubere Plan.`
        : 'Mit deinen Limits reicht aktuell ein einziger C&R Wasserwechsel.';
    result.innerHTML = `
        <div class="tool-result custom-cr-result-shell">
            <div class="custom-cr-topline">
                <strong>${statusText}</strong>
                <span>${syncedPlanner.tankLiters.toFixed(0)} L Aquarium · Schritt 1 PSU ${displayedCurrentPsu.toFixed(2)} → ${primaryAfterPsu.toFixed(2)}</span>
            </div>
            <div class="custom-cr-overview-card">
                <div class="custom-cr-section-head">
                    <strong>Nächster sinnvoller Wasserwechsel</strong>
                    <small>${planStatusCopy}</small>
                </div>
                <div class="custom-cr-summary-grid">
                    <div class="custom-cr-metric">
                        <small>Wasser entnehmen</small>
                        <strong>${primarySolution.removalLiters.toFixed(2)} L</strong>
                        <span>Gesamt für Schritt 1</span>
                    </div>
                    <div class="custom-cr-metric">
                        <small>RO nachfüllen</small>
                        <strong>${Math.max(0, primarySolution.roLiters).toFixed(2)} L</strong>
                        <span>Reinstwasser-Zugabe</span>
                    </div>
                    <div class="custom-cr-metric">
                        <small>C&amp;R zugeben</small>
                        <strong>${primarySolution.totalAdditiveLiters.toFixed(2)} L</strong>
                        <span>Produkte zusammen</span>
                    </div>
                    <div class="custom-cr-metric">
                        <small>PSU danach</small>
                        <strong>${primaryAfterPsu.toFixed(2)}</strong>
                        <span>Ziel ${syncedPlanner.targetPsu.toFixed(2)} PSU</span>
                    </div>
                </div>
            </div>
            <div class="custom-cr-summary-grid">
                <div class="custom-cr-metric">
                    <small>Start</small>
                    <strong>${displayedCurrentPsu.toFixed(2)} PSU</strong>
                    <span>Vor dem nächsten Schritt</span>
                </div>
                ${primarySolution.basePsu ? `
                    <div class="custom-cr-metric">
                        <small>Basis-PSU</small>
                        <strong>${primarySolution.basePsu.toFixed(2)}</strong>
                        <span>Vor Feinkorrektur</span>
                    </div>
                ` : ''}
                <div class="custom-cr-metric">
                    <small>Optimierung</small>
                    <strong>${primarySolution.optimizerMeta?.optimizedRemovalLiters?.toFixed(2) || primarySolution.removalLiters.toFixed(2)} L</strong>
                    <span>${optimizerHint}</span>
                </div>
            </div>

            <div class="custom-cr-section">
                <div class="custom-cr-section-head">
                    <strong>Produkte für Schritt 1</strong>
                    <small>Nur Mengen, die in diesem Schritt wirklich gebraucht werden.</small>
                </div>
                <div class="custom-cr-product-grid">
                    ${activeProductRows || '<p class="hint">Für diesen Schritt werden keine Produkte benötigt.</p>'}
                </div>
            </div>

            <details class="custom-cr-section" open>
                <div class="custom-cr-section-head">
                    <strong>Vorher → Nachher in Schritt 1</strong>
                    <small>Kein Wert darf über sein Ziel hinausschießen.</small>
                </div>
                <div class="custom-cr-delta-grid">
                    ${beforeAfterRows}
                </div>
            </details>

            ${remainingRows ? `
                <div class="custom-cr-section">
                    <div class="custom-cr-section-head">
                        <strong>Danach noch offen</strong>
                        <small>Das sind die größten Restdifferenzen nach Schritt 1.</small>
                    </div>
                    <div class="custom-cr-remaining-grid">
                        ${remainingRows}
                    </div>
                </div>
            ` : ''}

            <details class="custom-cr-section">
                <div class="custom-cr-section-head">
                    <strong>Gesamter Plan</strong>
                    <small>${plan.steps.length > 1 ? `Mit deinen Limits werden ${plan.steps.length} C&R Wasserwechsel empfohlen.` : 'Mit deinen Limits reicht aktuell ein Schritt aus.'}</small>
                </div>
                <div class="custom-cr-plan-grid">
                    ${planSummary || '<p class="hint">Noch kein Schritt ableitbar.</p>'}
                </div>
            </details>
        </div>
        <div class="tool-action-row">
            <button class="btn-danger btn-animated" onclick="bookCustomCRAdjustment()">C&amp;R Produkte auslagern</button>
            <button class="btn-secondary btn-animated" onclick="saveCustomCrPlan()">Plan speichern</button>
        </div>
        <p class="hint" style="margin-top:10px;">${primarySolution.note ? `${escapeHtml(primarySolution.note)} ` : ''}${scalingHint ? `${escapeHtml(scalingHint)} ` : ''}${limitingHint ? `${escapeHtml(limitingHint)} ` : ''}Hinweis: Wenn die PSU gezielt ueber NaCl korrigiert wird, steigen vor allem Na und Cl gegenueber dem reinen Elementziel mit an. Genau dafuer ist die zusaetzliche PSU-Korrektur gedacht.</p>
    `;
    renderSavedCustomCrPlans();
}

function loadCustomCRExample() {
    db.customCrPlanner = {
        tankLiters: customCrExampleState.tankLiters,
        currentPsu: customCrExampleState.currentPsu,
        targetPsu: customCrExampleState.targetPsu,
        current: { ...customCrExampleState.current },
        target: { ...customCrExampleState.target },
        limits: JSON.parse(JSON.stringify(customCrDefaultStepLimits))
    };
    saveDB();
    const tankEl = document.getElementById('customCrTankLiters');
    const currentPsuEl = document.getElementById('customCrCurrentPsu');
    const psuEl = document.getElementById('customCrTargetPsu');
    if (tankEl) tankEl.value = customCrExampleState.tankLiters;
    if (currentPsuEl) currentPsuEl.value = customCrExampleState.currentPsu;
    if (psuEl) psuEl.value = customCrExampleState.targetPsu;
    renderCustomCrLimitsMatrix();
    renderCustomCrPlannerMatrix();
    renderCustomCRPlanner();
}

function loadCustomCROptimalTargets() {
    const planner = getCustomCrPlannerState();
    planner.target = { ...customCrOptimalTargets };
    planner.targetPsu = customCrProxyReferencePsu;
    saveDB();
    const psuEl = document.getElementById('customCrTargetPsu');
    if (psuEl) psuEl.value = customCrProxyReferencePsu;
    renderCustomCrLimitsMatrix();
    renderCustomCrPlannerMatrix();
    renderCustomCRPlanner();
}

function saveCustomCrPlan() {
    const planner = syncCustomCrPlannerFromInputs();
    const plan = buildCustomCrPlan(planner.current, planner.target, planner.tankLiters, planner.currentPsu, planner.targetPsu, planner.limits);
    if (!plan.steps.length) {
        showToast('Kein speicherbarer C&R Plan gefunden', 'error');
        return;
    }
    const plans = getCustomCrPlans();
    plans.unshift(plan);
    db.customCrPlans = plans.slice(0, 12);
    saveDB();
    renderSavedCustomCrPlans();
    showToast(`C&R Plan mit ${plan.steps.length} Schritt(en) gespeichert`, 'success');
}

function deleteCustomCrPlan(planId) {
    db.customCrPlans = getCustomCrPlans().filter(plan => plan.id !== planId);
    saveDB();
    renderSavedCustomCrPlans();
}

function getCustomCrPlanById(planId) {
    return getCustomCrPlans().find(plan => plan.id === planId) || null;
}

function queueCustomCrPlanStep(planId, stepId) {
    const plan = getCustomCrPlanById(planId);
    const step = plan?.steps?.find(entry => entry.id === stepId);
    if (!plan || !step) return;
    const queue = customCrProducts
        .map(product => {
            const resolved = resolveRecipeItem({ item: product.item });
            if (!resolved) return null;
            const amount = step.solution.additions[product.item] || 0;
            return amount > 0 ? { ...resolved, amount } : null;
        })
        .filter(Boolean);
    if (!queue.length) return alert('Dieser Schritt enthält keine lagergeführten Mengen.');
    if (!confirm(`Schritt ${step.index} wirklich auslagern? Ergebnis bitte vorher prüfen.`)) return;
    executeQueueWithConflictHandling(queue, 0);
}

function toggleCustomCrPlanStepDone(planId, stepId) {
    const plan = getCustomCrPlanById(planId);
    const step = plan?.steps?.find(entry => entry.id === stepId);
    if (!plan || !step) return;
    step.done = !step.done;
    step.doneAt = step.done ? new Date().toISOString() : null;
    saveDB();
    renderSavedCustomCrPlans();
}

function renderSavedCustomCrPlans() {
    if (!isCustomCRUnlocked()) return;
    const mount = document.getElementById('customCrSavedPlans');
    if (!mount) return;
    const plans = getCustomCrPlans();
    if (!plans.length) {
        mount.innerHTML = `
            <div class="custom-cr-section" style="margin-top:14px;">
                <div class="custom-cr-section-head">
                    <strong>Gespeicherte C&amp;R Pläne</strong>
                    <small>Noch nichts gespeichert.</small>
                </div>
            </div>
        `;
        return;
    }
    mount.innerHTML = `
        <div class="custom-cr-section" style="margin-top:14px;">
            <div class="custom-cr-section-head">
                <strong>Gespeicherte C&amp;R Pläne</strong>
                <small>Mehrstufige Pläne mit Erledigt-Status und Zielvorschau.</small>
            </div>
            <div class="custom-cr-saved-plans">
                ${plans.map(plan => {
                    const progress = getCustomCrPlanCompletion(plan);
                    return `
                        <details class="custom-cr-saved-plan">
                            <summary>
                                <span>
                                    <strong>${progress.total} Schritt(e)</strong>
                                    <small>${formatWarehouseDate(plan.createdAt)} · ${plan.tankLiters.toFixed(0)} L · ${progress.done}/${progress.total} erledigt</small>
                                </span>
                                <span class="custom-cr-plan-target">PSU ${Number(plan.startPsu || 0).toFixed(2)} → ${Number(plan.projectedFinalPsu || 0).toFixed(2)}</span>
                            </summary>
                            <div class="custom-cr-saved-plan-body">
                                <div class="custom-cr-delta-grid">
                                    ${customCrElementDefinitions.map(entry => `
                                        <div class="custom-cr-delta-pill">
                                            <strong>${entry.label}</strong>
                                            <span>${Number(plan.startCurrent?.[entry.key] || 0).toFixed(2)} → ${Number(plan.projectedFinal?.[entry.key] || 0).toFixed(2)}</span>
                                            <small>Ziel ${Number(plan.target?.[entry.key] || 0).toFixed(2)} ${entry.unit}</small>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="custom-cr-step-list">
                                    ${plan.steps.map(step => `
                                        <div class="custom-cr-step-card ${step.done ? 'done' : ''}">
                                            <div class="custom-cr-step-head">
                                                <div>
                                                    <strong>Schritt ${step.index}</strong>
                                                    <small>WW ${step.solution.removalLiters.toFixed(2)} L · RO ${Math.max(0, step.solution.roLiters).toFixed(2)} L · PSU ${step.currentPsu.toFixed(2)} → ${step.expectedAfterPsu.toFixed(2)}</small>
                                                </div>
                                                <label class="custom-cr-check">
                                                    <input type="checkbox" ${step.done ? 'checked' : ''} onchange="toggleCustomCrPlanStepDone('${plan.id}','${step.id}')">
                                                    <span>Erledigt</span>
                                                </label>
                                            </div>
                                            <div class="custom-cr-step-values-grid">
                                                ${customCrElementDefinitions.map(entry => `
                                                    <div class="custom-cr-step-value-pill">
                                                        <strong>${entry.label}</strong>
                                                        <span>${Number(step.current?.[entry.key] || 0).toFixed(2)} → ${Number(step.expectedAfter?.[entry.key] || 0).toFixed(2)}</span>
                                                    </div>
                                                `).join('')}
                                            </div>
                                            <div class="custom-cr-step-products">
                                                ${customCrProducts.map(product => {
                                                    const amount = step.solution.additions[product.item] || 0;
                                                    if (amount <= 0) return '';
                                                    return `<span>${product.key}: ${amount.toFixed(2)} ml</span>`;
                                                }).join('') || '<span>Keine Produkte</span>'}
                                            </div>
                                            <div class="custom-cr-step-actions">
                                                <button class="btn-secondary btn-animated" onclick="queueCustomCrPlanStep('${plan.id}','${step.id}')">Diesen Schritt auslagern</button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="tool-action-row">
                                    <button class="btn-out btn-animated" onclick="deleteCustomCrPlan('${plan.id}')">Plan löschen</button>
                                </div>
                            </div>
                        </details>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function bookCustomCRAdjustment() {
    const planner = getCustomCrPlannerState();
    const plan = buildCustomCrPlan(planner.current, planner.target, planner.tankLiters, planner.currentPsu, planner.targetPsu, planner.limits);
    const primaryStep = plan.steps[0];
    const solution = primaryStep?.solution || solveCustomCRAdjustment(planner.current, planner.target, planner.tankLiters, planner.currentPsu, planner.targetPsu);
    if (!solution) return alert('Kein berechenbarer C&R Ausgleich vorhanden.');
    const queue = customCrProducts
        .map(product => {
            const resolved = resolveRecipeItem({ item: product.item });
            if (!resolved) return null;
            const amount = solution.additions[product.item] || 0;
            return amount > 0 ? { ...resolved, amount } : null;
        })
        .filter(Boolean);
    if (!queue.length) return alert('Dieser Ausgleich enthält keine lagergeführten Mengen.');
    const stepLabel = plan.steps.length > 1 ? `Schritt 1 von ${plan.steps.length}` : 'diesen Ausgleich';
    if (!confirm(`C&R ${stepLabel} für ${planner.tankLiters.toFixed(0)} L auslagern? Ergebnis bitte vorher prüfen.`)) return;
    executeQueueWithConflictHandling(queue, 0);
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
                    <small>${resolved ? `${missing ? 'Bestand reicht nicht · ' : ''}Bestand: ${formatItemAmount(resolved.item, stock)} · Dichte ${density.toFixed(3)} g/ml` : 'nicht lagergeführt · ca. 1.000 g/ml'}</small>
                </span>
                <span>${amountLabel}</span>
            </div>
        `;
    }).join('');
    result.innerHTML = `
        <div class="tool-result">${rows}</div>
        <div class="tool-action-row calculator-actions">
            <button class="btn-primary btn-animated booking-action" onclick="bookSeaWaterMix()">Lagergeführte Zutaten auslagern</button>
        </div>
    `;
}

async function saveSeaWaterPreset() {
    const liters = Math.max(0, parseFloat(document.getElementById('seaWaterLiters')?.value) || 0);
    if (!liters) {
        await appAlert('Bitte erst eine Meerwassermenge eintragen.', {
            title: 'Menge fehlt',
            type: 'warning'
        });
        return;
    }
    const name = await appPrompt('Unter diesem Namen findest du die Meerwassermenge später wieder.', `${liters} L Meerwasser`, {
        title: 'Meerwasser-Preset speichern',
        label: 'Preset-Name',
        required: true,
        confirmText: 'Preset speichern'
    });
    if (!name || !name.trim()) return;
    if (!db.crSeaWaterPresets) db.crSeaWaterPresets = {};
    db.crSeaWaterPresets[name.trim()] = liters;
    saveDB();
    renderSeaWaterPresetSelect();
    showToast(`Preset "${name.trim()}" gespeichert`, 'success', 2600);
}

function loadSeaWaterPreset(name) {
    if (!name || !db.crSeaWaterPresets || !db.crSeaWaterPresets[name]) return;
    const input = document.getElementById('seaWaterLiters');
    if (input) input.value = db.crSeaWaterPresets[name];
    renderSeaWaterMix();
}

async function deleteSeaWaterPreset() {
    const select = document.getElementById('seaWaterPresetSelect');
    const name = select?.value || '';
    if (!name) {
        await appAlert('Bitte zuerst ein Preset auswählen.', {
            title: 'Kein Preset ausgewählt',
            type: 'info'
        });
        return;
    }
    const confirmed = await appConfirm(`Preset "${name}" löschen?`, {
        title: 'Meerwasser-Preset löschen',
        type: 'danger',
        confirmText: 'Preset löschen'
    });
    if (!confirmed) return;
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
        const density = entry.item ? (densityFactors[entry.item] || 1) : 1;
        const grams = amount * density;
        const amountLabel = entry.unit === 'ml' && entry.item
            ? `${amount.toFixed(1)} ml · ${grams.toFixed(1)} g`
            : `${amount.toFixed(1)} ${entry.unit}`;
        return `
            <div class="tool-row ${missing ? 'missing' : ''}">
                <span>
                    <strong>${entry.item || entry.label}</strong>
                    <small>${resolved ? `${missing ? 'Bestand reicht nicht · ' : ''}Bestand: ${formatItemAmount(resolved.item, stock)}${entry.unit === 'ml' && entry.item ? ` · Dichte ${density.toFixed(3)} g/ml` : ''}` : 'nicht lagergeführt'}</small>
                </span>
                <span>${amountLabel}</span>
            </div>
        `;
    }).join('');
    result.innerHTML = `
        <div class="tool-result">${rows}</div>
        <div class="tool-action-row calculator-actions">
            <button class="btn-primary btn-animated booking-action" onclick="bookMacroRecipe()">Lagergeführte Zutaten auslagern</button>
        </div>
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

function getMeasurementTypes() {
    if (!db.measurementTypes || !Array.isArray(db.measurementTypes) || db.measurementTypes.length === 0) {
        db.measurementTypes = [
            { id: 'KH', label: 'KH', unit: 'dKH' },
            { id: 'CA', label: 'CA', unit: 'mg/l' },
            { id: 'MG', label: 'MG', unit: 'mg/l' },
            { id: 'PO4', label: 'PO4', unit: 'mg/l' },
            { id: 'NO3', label: 'NO3', unit: 'mg/l' }
        ];
    }
    return db.measurementTypes;
}

function getMeasurementEntries() {
    if (!db.measurementEntries || !Array.isArray(db.measurementEntries)) db.measurementEntries = [];
    return db.measurementEntries;
}

function normalizeMeasurementTypeId(value) {
    return String(value || '')
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '_')
        .replace(/[^A-Z0-9_]/g, '') || `TYPE_${Date.now()}`;
}

function getMeasurementTypeById(typeId) {
    return getMeasurementTypes().find(type => type.id === typeId) || getMeasurementTypes()[0];
}

function getSelectedMeasurementTypeId() {
    const select = document.getElementById('measurementType');
    const first = getMeasurementTypes()[0];
    return select?.value || first?.id || 'KH';
}

function getMeasurementUnit(typeId) {
    return getMeasurementTypeById(typeId)?.unit || '';
}

function saveMeasurementEntry(editId = null) {
    const targetEditId = editId || measurementUiState.editingEntryId || null;
    const typeId = getSelectedMeasurementTypeId();
    const valueRaw = parseFloat(document.getElementById('measurementValue')?.value);
    const dateValue = document.getElementById('measurementDate')?.value;
    const note = (document.getElementById('measurementNote')?.value || '').trim();
    if (!Number.isFinite(valueRaw)) return alert('Bitte einen gültigen Messwert eintragen.');
    const at = dateValue ? new Date(dateValue).toISOString() : new Date().toISOString();
    if (targetEditId) {
        const entry = getMeasurementEntries().find(item => item.id === targetEditId);
        if (!entry) return;
        Object.assign(entry, {
            typeId,
            value: valueRaw,
            at,
            note,
            updatedAt: new Date().toISOString()
        });
    } else {
        getMeasurementEntries().unshift({
            id: createWarehouseId(),
            typeId,
            value: valueRaw,
            at,
            note,
            createdAt: new Date().toISOString()
        });
    }
    measurementUiState.selectedEntryId = targetEditId || getMeasurementEntries()[0]?.id || null;
    measurementUiState.editingEntryId = null;
    saveDB();
    const valueInput = document.getElementById('measurementValue');
    const dateInput = document.getElementById('measurementDate');
    const noteInput = document.getElementById('measurementNote');
    if (valueInput) valueInput.value = '';
    if (noteInput) noteInput.value = '';
    if (dateInput) dateInput.value = formatDateTimeLocal();
    renderMeasurementTracker();
}

function addMeasurementType() {
    const label = (prompt('Name der Messwert-Art:', '') || '').trim();
    if (!label) return;
    const unit = (prompt('Einheit für diesen Wert:', 'mg/l') || '').trim();
    const id = normalizeMeasurementTypeId(label);
    if (getMeasurementTypes().some(type => type.id === id || type.label.toLowerCase() === label.toLowerCase())) {
        return alert('Diese Messwert-Art existiert bereits.');
    }
    getMeasurementTypes().push({ id, label, unit: unit || 'mg/l' });
    saveDB();
    renderMeasurementTracker(id);
}

function editMeasurementType(typeId) {
    const type = getMeasurementTypeById(typeId);
    if (!type) return;
    const nextLabel = (prompt('Name der Messwert-Art:', type.label) || '').trim();
    if (!nextLabel) return;
    const nextUnit = (prompt('Einheit:', type.unit || '') || '').trim();
    type.label = nextLabel;
    type.unit = nextUnit;
    saveDB();
    renderMeasurementTracker(type.id);
}

function deleteMeasurementType(typeId) {
    const type = getMeasurementTypeById(typeId);
    if (!type) return;
    const protectedTypes = ['KH', 'CA', 'MG', 'PO4', 'NO3'];
    if (protectedTypes.includes(type.id)) {
        return alert('Die Standard-Messwert-Arten bleiben erhalten.');
    }
    if (!confirm(`Messwert-Art "${type.label}" inklusive aller Messungen löschen?`)) return;
    db.measurementTypes = getMeasurementTypes().filter(item => item.id !== typeId);
    db.measurementEntries = getMeasurementEntries().filter(entry => entry.typeId !== typeId);
    if (measurementUiState.selectedEntryId && !db.measurementEntries.some(entry => entry.id === measurementUiState.selectedEntryId)) {
        measurementUiState.selectedEntryId = null;
    }
    saveDB();
    renderMeasurementTracker();
}

function editMeasurementEntry(entryId) {
    const entry = getMeasurementEntries().find(item => item.id === entryId);
    if (!entry) return;
    const typeSelect = document.getElementById('measurementType');
    const valueInput = document.getElementById('measurementValue');
    const dateInput = document.getElementById('measurementDate');
    const noteInput = document.getElementById('measurementNote');
    if (typeSelect) typeSelect.value = entry.typeId;
    if (valueInput) valueInput.value = String(entry.value);
    if (dateInput) dateInput.value = formatDateTimeLocal(entry.at);
    if (noteInput) noteInput.value = entry.note || '';
    measurementUiState.selectedEntryId = entry.id;
    measurementUiState.editingEntryId = entry.id;
    const details = document.getElementById('measurementDetails');
    if (details) details.open = true;
    renderMeasurementTracker(entry.typeId);
}

function cancelMeasurementEdit() {
    measurementUiState.editingEntryId = null;
    const valueInput = document.getElementById('measurementValue');
    const dateInput = document.getElementById('measurementDate');
    const noteInput = document.getElementById('measurementNote');
    if (valueInput) valueInput.value = '';
    if (noteInput) noteInput.value = '';
    if (dateInput) dateInput.value = formatDateTimeLocal();
    renderMeasurementTracker();
}

function deleteMeasurementEntry(entryId) {
    if (!confirm('Messwert löschen?')) return;
    db.measurementEntries = getMeasurementEntries().filter(entry => entry.id !== entryId);
    if (measurementUiState.selectedEntryId === entryId) measurementUiState.selectedEntryId = null;
    if (measurementUiState.editingEntryId === entryId) measurementUiState.editingEntryId = null;
    saveDB();
    renderMeasurementTracker();
}

function selectMeasurementEntry(entryId) {
    measurementUiState.selectedEntryId = entryId;
    renderMeasurementTracker();
}

function renderMeasurementTracker(forceTypeId = null) {
    const container = document.getElementById('measurementTracker');
    const typeSelect = document.getElementById('measurementType');
    const rangeSelect = document.getElementById('measurementRange');
    const dateInput = document.getElementById('measurementDate');
    const saveButton = document.getElementById('measurementSaveButton');
    const cancelButton = document.getElementById('measurementCancelButton');
    if (!container || !typeSelect || !rangeSelect) return;

    if (saveButton) saveButton.innerText = measurementUiState.editingEntryId ? 'Änderungen speichern' : 'Messwert speichern';
    if (cancelButton) cancelButton.classList.toggle('is-hidden', !measurementUiState.editingEntryId);

    const types = getMeasurementTypes();
    const currentType = forceTypeId || typeSelect.value || types[0]?.id || 'KH';
    typeSelect.innerHTML = types.map(type => `<option value="${type.id}">${escapeHtml(type.label)}${type.unit ? ` (${escapeHtml(type.unit)})` : ''}</option>`).join('');
    typeSelect.value = currentType;
    if (dateInput && !dateInput.value) dateInput.value = formatDateTimeLocal();

    const unit = getMeasurementUnit(currentType);
    const rangeValue = rangeSelect.value || '30';
    const allEntries = getMeasurementEntries()
        .filter(entry => entry.typeId === currentType)
        .slice()
        .sort((a, b) => new Date(a.at) - new Date(b.at));

    const now = Date.now();
    const rangeDays = rangeValue === 'all' ? null : parseInt(rangeValue, 10);
    const visibleEntries = allEntries.filter(entry => {
        if (!rangeDays) return true;
        return now - new Date(entry.at).getTime() <= rangeDays * 24 * 60 * 60 * 1000;
    });

    if (!measurementUiState.selectedEntryId || !visibleEntries.some(entry => entry.id === measurementUiState.selectedEntryId)) {
        measurementUiState.selectedEntryId = visibleEntries[visibleEntries.length - 1]?.id || allEntries[allEntries.length - 1]?.id || null;
    }

    const selectedEntry = visibleEntries.find(entry => entry.id === measurementUiState.selectedEntryId)
        || allEntries.find(entry => entry.id === measurementUiState.selectedEntryId)
        || visibleEntries[visibleEntries.length - 1]
        || null;

    const latest = visibleEntries[visibleEntries.length - 1] || null;
    const first = visibleEntries[0] || null;
    const valueDelta = latest && first ? latest.value - first.value : 0;
    const percentDelta = first && Math.abs(first.value) > 0.000001 ? (valueDelta / first.value) * 100 : 0;
    const spanDays = latest && first ? Math.max(1 / 24, (new Date(latest.at) - new Date(first.at)) / (24 * 60 * 60 * 1000)) : 0;
    const dailyTrend = spanDays ? valueDelta / spanDays : 0;
    const forecastDays = 7;
    const forecastValue = latest ? latest.value + dailyTrend * forecastDays : null;
    const avg = visibleEntries.length ? visibleEntries.reduce((sum, entry) => sum + entry.value, 0) / visibleEntries.length : 0;
    const deviationAbs = latest ? latest.value - avg : 0;
    const deviationPct = avg ? (deviationAbs / avg) * 100 : 0;

    if (visibleEntries.length === 0) {
        const currentTypeMeta = getMeasurementTypeById(currentType);
        container.innerHTML = `
            <div class="measurement-empty" role="status">
                <strong>${escapeHtml(currentTypeMeta?.label || currentType)}</strong>
                <p class="hint">Noch keine Messwerte gespeichert. Trage den ersten Wert ein, dann erscheint hier automatisch der Verlauf.</p>
                <div class="measurement-type-actions">
                    <button class="btn-secondary btn-animated" onclick="editMeasurementType('${currentType}')">Messwert-Art bearbeiten</button>
                    <button class="btn-out btn-animated" onclick="deleteMeasurementType('${currentType}')">Messwert-Art löschen</button>
                </div>
            </div>
        `;
        return;
    }

    const values = visibleEntries.map(entry => entry.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const spread = Math.max(0.001, maxValue - minValue);
    const isCompactMeasurementView = window.innerWidth <= 640;
    const chartWidth = isCompactMeasurementView ? 420 : 680;
    const chartHeight = isCompactMeasurementView ? 290 : 250;
    const paddingLeft = isCompactMeasurementView ? 46 : 64;
    const paddingRight = isCompactMeasurementView ? 14 : 20;
    const paddingTop = isCompactMeasurementView ? 16 : 18;
    const paddingBottom = isCompactMeasurementView ? 42 : 34;
    const usableWidth = chartWidth - paddingLeft - paddingRight;
    const usableHeight = chartHeight - paddingTop - paddingBottom;
    const points = visibleEntries.map((entry, index) => {
        const x = visibleEntries.length === 1
            ? chartWidth / 2
            : paddingLeft + (usableWidth * index) / (visibleEntries.length - 1);
        const y = paddingTop + usableHeight - (((entry.value - minValue) / spread) * usableHeight);
        return { ...entry, x, y };
    });
    const pathD = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
    const chartFloor = chartHeight - paddingBottom;
    const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(2)} ${chartFloor.toFixed(2)} L ${points[0].x.toFixed(2)} ${chartFloor.toFixed(2)} Z`;
    const selectedDetail = selectedEntry || latest;
    const rangeLabel = rangeValue === 'all' ? 'gesamter Verlauf' : `${rangeValue} Tage`;
    const typeMeta = getMeasurementTypeById(currentType);
    const selectedPoint = points.find(point => point.id === selectedDetail?.id) || points[points.length - 1];
    const xLabelIndexes = isCompactMeasurementView
        ? new Set([0, points.length - 1])
        : new Set([0, points.length - 1, Math.round((points.length - 1) / 2)]);
    const yMarkers = [
        { value: maxValue, y: paddingTop },
        { value: minValue + spread / 2, y: paddingTop + usableHeight / 2 },
        { value: minValue, y: chartFloor }
    ];

    container.innerHTML = `
        <div class="measurement-panel">
            <div class="measurement-stats">
                <div>
                    <strong>${latest.value.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}</strong>
                    <span>Aktueller Wert</span>
                </div>
                <div>
                    <strong>${dailyTrend >= 0 ? '+' : ''}${dailyTrend.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}/Tag</strong>
                    <span>Trend in ${escapeHtml(rangeLabel)}</span>
                </div>
                <div>
                    <strong>${forecastValue === null ? '-' : `${forecastValue.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}`}</strong>
                    <span>Prognose in 7 Tagen</span>
                </div>
                <div>
                    <strong>${deviationAbs >= 0 ? '+' : ''}${deviationAbs.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)} / ${deviationPct >= 0 ? '+' : ''}${deviationPct.toFixed(1)}%</strong>
                    <span>Abweichung vom Mittelwert</span>
                </div>
            </div>
            <div class="measurement-chart-card">
                <div class="measurement-chart-head">
                    <div>
                        <strong>${escapeHtml(typeMeta.label)}</strong>
                        <small>${visibleEntries.length} Messung(en) im gewählten Zeitraum</small>
                    </div>
                    <div class="measurement-type-actions">
                        <button class="btn-secondary btn-animated" onclick="editMeasurementType('${currentType}')">Art bearbeiten</button>
                        <button class="btn-out btn-animated" onclick="deleteMeasurementType('${currentType}')">Art löschen</button>
                    </div>
                </div>
                <div class="measurement-chart-scroll" tabindex="0" aria-label="Diagramm horizontal ansehen">
                <svg class="measurement-chart ${isCompactMeasurementView ? 'compact' : ''}" viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Verlauf ${escapeHtml(typeMeta.label)} in ${escapeHtml(unit)}">
                    <defs>
                        <linearGradient id="measurementFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.32"></stop>
                            <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.02"></stop>
                        </linearGradient>
                        <linearGradient id="measurementLineGlow" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="var(--secondary)" stop-opacity="0.9"></stop>
                            <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.95"></stop>
                        </linearGradient>
                    </defs>
                    ${yMarkers.map(marker => `
                        <line x1="${paddingLeft}" y1="${marker.y}" x2="${chartWidth - paddingRight}" y2="${marker.y}" class="measurement-grid-line"></line>
                        <text x="${paddingLeft - 10}" y="${marker.y + 4}" text-anchor="end" class="measurement-y-label">${marker.value.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}</text>
                    `).join('')}
                    <line x1="${paddingLeft}" y1="${chartFloor}" x2="${chartWidth - paddingRight}" y2="${chartFloor}" class="measurement-axis"></line>
                    <line x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${chartFloor}" class="measurement-axis"></line>
                    <line x1="${selectedPoint.x}" y1="${paddingTop}" x2="${selectedPoint.x}" y2="${chartFloor}" class="measurement-focus-line"></line>
                    <path d="${areaD}" class="measurement-area"></path>
                    <path d="${pathD}" class="measurement-line"></path>
                    ${points.map(point => `
                        <g class="measurement-point-group ${selectedDetail?.id === point.id ? 'active' : ''}" role="button" tabindex="0" aria-label="${escapeHtml(typeMeta.label)} ${point.value.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}, ${escapeHtml(formatWarehouseDate(point.at))}" onclick="selectMeasurementEntry('${point.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectMeasurementEntry('${point.id}');}">
                            <circle cx="${point.x}" cy="${point.y}" r="${selectedDetail?.id === point.id ? 14 : 11}" class="measurement-point-hit"></circle>
                            <circle cx="${point.x}" cy="${point.y}" r="${selectedDetail?.id === point.id ? 15 : 11}" class="measurement-point-halo"></circle>
                            <circle cx="${point.x}" cy="${point.y}" r="${selectedDetail?.id === point.id ? 8.6 : 6.5}" class="measurement-point-ring"></circle>
                            <circle cx="${point.x}" cy="${point.y}" r="${selectedDetail?.id === point.id ? 5.4 : 4.2}" class="measurement-point"></circle>
                        </g>
                    `).join('')}
                    ${points.filter((_, index) => xLabelIndexes.has(index)).map(point => `
                        <text x="${point.x}" y="${chartHeight - 10}" text-anchor="middle" class="measurement-label">${escapeHtml(new Date(point.at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }))}</text>
                    `).join('')}
                </svg>
                </div>
                <div class="measurement-chart-meta">
                    <span>Min: ${minValue.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}</span>
                    <span>Mittel: ${avg.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}</span>
                    <span>Max: ${maxValue.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}</span>
                </div>
            </div>
            <div class="measurement-detail-card">
                <strong>Ausgewählte Messung</strong>
                <small>${selectedDetail ? formatWarehouseDate(selectedDetail.at) : '-'}</small>
                <div class="measurement-detail-value">${selectedDetail ? `${selectedDetail.value.toFixed(3).replace(/\.?0+$/, '')} ${unit}` : '-'}</div>
                <p>${selectedDetail?.note ? escapeHtml(selectedDetail.note) : 'Keine zusätzliche Notiz gespeichert.'}</p>
                ${selectedDetail ? `
                    <div class="measurement-detail-actions">
                        <button onclick="editMeasurementEntry('${selectedDetail.id}')">Eintrag laden</button>
                        <button onclick="deleteMeasurementEntry('${selectedDetail.id}')" class="btn-out">Löschen</button>
                    </div>
                ` : ''}
            </div>
            <div class="measurement-list">
                ${(visibleEntries.slice().reverse().slice(0, 8)).map(entry => `
                    <div class="measurement-list-row ${selectedDetail?.id === entry.id ? 'active' : ''}">
                        <button class="measurement-list-button" onclick="selectMeasurementEntry('${entry.id}')">
                            <strong>${entry.value.toFixed(3).replace(/\.?0+$/, '')} ${escapeHtml(unit)}</strong>
                            <small>${formatWarehouseDate(entry.at)}${entry.note ? ` · ${escapeHtml(entry.note)}` : ''}</small>
                        </button>
                        <div class="logbook-actions">
                            <button onclick="editMeasurementEntry('${entry.id}')">Laden</button>
                            <button onclick="deleteMeasurementEntry('${entry.id}')" class="btn-out">Löschen</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${measurementUiState.editingEntryId ? '<p class="measurement-editing-status" role="status">Bearbeitungsmodus aktiv. Änderungen überschreiben ausschließlich den geladenen Messwert.</p>' : ''}
        </div>
    `;
}

function openLogBookEntryForm() {
    const details = document.getElementById('logBookEntryDetails');
    if (details) details.open = true;
    document.getElementById('logBookTitle')?.focus();
}

function cancelLogBookEdit() {
    logBookUiState.editingEntryId = null;
    const title = document.getElementById('logBookTitle');
    const note = document.getElementById('logBookNote');
    const date = document.getElementById('logBookDate');
    if (title) title.value = '';
    if (note) note.value = '';
    if (date) date.value = formatDateTimeLocal();
    updateLogBookFormMode();
}

function updateLogBookFormMode() {
    const saveButton = document.getElementById('logBookSaveButton');
    const cancelButton = document.getElementById('logBookCancelButton');
    if (saveButton) saveButton.innerText = logBookUiState.editingEntryId ? 'Änderungen speichern' : 'Log speichern';
    if (cancelButton) cancelButton.classList.toggle('is-hidden', !logBookUiState.editingEntryId);
}

function resetLogBookFilters() {
    const search = document.getElementById('logBookSearch');
    const category = document.getElementById('logBookFilterCategory');
    if (search) search.value = '';
    if (category) category.value = 'all';
    renderLogBookEntries();
}

function renderLogBook() {
    renderAquariumWorkspacePanels();
    ensureLogBookDefaults();
    const categorySelect = document.getElementById('logBookCategory');
    const todoCategory = document.getElementById('todoCategory');
    const measurementType = document.getElementById('measurementType');
    const measurementRange = document.getElementById('measurementRange');
    const measurementDate = document.getElementById('measurementDate');
    const filterSelect = document.getElementById('logBookFilterCategory');
    const dateInput = document.getElementById('logBookDate');
    const dueInput = document.getElementById('todoDueAt');
    const entryCount = document.getElementById('logBookEntryCount');
    const openCount = document.getElementById('todoOpenCount');
    const dueCount = document.getElementById('todoDueCount');
    const options = db.logBookCategories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
    if (categorySelect) categorySelect.innerHTML = options;
    if (todoCategory) todoCategory.innerHTML = options;
    if (filterSelect) {
        const currentFilter = filterSelect.value || 'all';
        filterSelect.innerHTML = `<option value="all">Alle Kategorien</option>${options}`;
        filterSelect.value = (currentFilter === 'all' || db.logBookCategories.includes(currentFilter)) ? currentFilter : 'all';
    }
    if (measurementType) {
        const currentType = measurementType.value || getMeasurementTypes()[0]?.id || 'KH';
        measurementType.innerHTML = getMeasurementTypes().map(type => `<option value="${type.id}">${escapeHtml(type.label)}${type.unit ? ` (${escapeHtml(type.unit)})` : ''}</option>`).join('');
        measurementType.value = getMeasurementTypes().some(type => type.id === currentType) ? currentType : (getMeasurementTypes()[0]?.id || 'KH');
    }
    if (measurementRange && !measurementRange.value) measurementRange.value = '30';
    if (measurementDate && !measurementDate.value) measurementDate.value = formatDateTimeLocal();
    if (dateInput && !dateInput.value) dateInput.value = formatDateTimeLocal();
    if (dueInput && !dueInput.value) dueInput.value = formatDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    const todos = db.aquariumTodos || [];
    const now = Date.now();
    if (entryCount) entryCount.innerText = String((db.logBookEntries || []).length);
    if (openCount) openCount.innerText = String(todos.filter(todo => !todo.done).length);
    if (dueCount) dueCount.innerText = String(todos.filter(todo => !todo.done && todo.dueAt && new Date(todo.dueAt).getTime() <= now).length);
    updateLogBookFormMode();
    updateTodoIntervalLabel();
    renderLogBookCategories();
    renderLogBookEntries();
    renderAquariumTodos();
    renderMeasurementTracker();
    renderDosingContainers();
    renderOsmoseTank();
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
    const targetEditId = editId || logBookUiState.editingEntryId || null;
    if (targetEditId) {
        const entry = db.logBookEntries.find(item => item.id === targetEditId);
        if (!entry) return;
        Object.assign(entry, { category, title, note, at, updatedAt: new Date().toISOString() });
    } else {
        db.logBookEntries.unshift({ id: createWarehouseId(), category, title: title || category, note, at, createdAt: new Date().toISOString() });
    }
    logBookUiState.editingEntryId = null;
    saveDB();
    if (titleEl) titleEl.value = '';
    if (noteEl) noteEl.value = '';
    if (dateEl) dateEl.value = formatDateTimeLocal();
    renderLogBook();
}

function editLogBookEntry(id) {
    const entry = (db.logBookEntries || []).find(item => item.id === id);
    if (!entry) return;
    const details = document.getElementById('logBookEntryDetails');
    const category = document.getElementById('logBookCategory');
    const title = document.getElementById('logBookTitle');
    const note = document.getElementById('logBookNote');
    const date = document.getElementById('logBookDate');
    if (details) details.open = true;
    if (category) category.value = db.logBookCategories.includes(entry.category) ? entry.category : 'Sonstiges';
    if (title) title.value = entry.title || '';
    if (note) note.value = entry.note || '';
    if (date) date.value = formatDateTimeLocal(entry.at);
    logBookUiState.editingEntryId = entry.id;
    updateLogBookFormMode();
    title?.focus();
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
    const filter = document.getElementById('logBookFilterCategory')?.value || 'all';
    const search = (document.getElementById('logBookSearch')?.value || '').trim().toLocaleLowerCase('de-DE');
    const status = document.getElementById('logBookFilterStatus');
    const entries = (db.logBookEntries || [])
        .filter(entry => filter === 'all' || (entry.category || 'Sonstiges') === filter)
        .filter(entry => {
            if (!search) return true;
            return [entry.title, entry.note, entry.category]
                .some(value => String(value || '').toLocaleLowerCase('de-DE').includes(search));
        })
        .slice(0, 80);
    const activeFilters = [filter !== 'all' ? filter : '', search ? `„${search}“` : ''].filter(Boolean);
    if (status) {
        status.innerHTML = `<span><strong>${entries.length}</strong> ${entries.length === 1 ? 'Eintrag' : 'Einträge'}</span>${activeFilters.length ? `<span class="status-badge status-info">Filter: ${activeFilters.map(escapeHtml).join(' · ')}</span>` : '<span class="status-badge status-neutral">Alle Einträge</span>'}`;
    }
    if (entries.length === 0) {
        const hasFilters = filter !== 'all' || Boolean(search);
        container.innerHTML = `
            <div class="logbook-empty-state" role="status">
                <strong>${hasFilters ? 'Keine passenden Einträge' : 'Noch keine Logbuch-Einträge'}</strong>
                <p>${hasFilters ? 'Passe Suche oder Kategorie an, um andere Einträge zu sehen.' : 'Dokumentiere die erste Maßnahme, Messung oder Beobachtung.'}</p>
                ${hasFilters ? '<button type="button" class="btn-secondary" onclick="resetLogBookFilters()">Filter zurücksetzen</button>' : '<button type="button" class="btn-primary" onclick="openLogBookEntryForm()">Ersten Eintrag anlegen</button>'}
            </div>`;
        return;
    }
    container.innerHTML = entries.map(entry => `
        <article class="logbook-entry">
            <div class="logbook-entry-content">
                <div class="logbook-entry-meta">
                    <time datetime="${escapeHtml(entry.at || '')}">${formatWarehouseDate(entry.at)}</time>
                    <span class="status-badge status-info">${escapeHtml(entry.category || 'Sonstiges')}</span>
                </div>
                <strong>${escapeHtml(entry.title || entry.category)}</strong>
                ${entry.note ? `<details class="logbook-entry-note"><summary>Notiz anzeigen</summary><p>${escapeHtml(entry.note)}</p></details>` : ''}
            </div>
            <div class="logbook-actions">
                <button onclick="editLogBookEntry('${entry.id}')" aria-label="${escapeHtml(entry.title || entry.category)} bearbeiten">Bearbeiten</button>
                <button onclick="deleteLogBookEntry('${entry.id}')" class="btn-out" aria-label="${escapeHtml(entry.title || entry.category)} löschen">Löschen</button>
            </div>
        </article>
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
    renderLogBook();
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
    renderLogBook();
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
    renderLogBook();
}

function toggleTodoNotification(id) {
    const todo = (db.aquariumTodos || []).find(item => item.id === id);
    if (!todo) return;
    todo.notifyEnabled = todo.notifyEnabled === false;
    todo.remindedAt = null;
    saveDB();
    renderLogBook();
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
    renderLogBook();
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
        container.innerHTML = '<div class="logbook-empty-state" role="status"><strong>Keine ToDos geplant</strong><p>Neue Aufgaben erscheinen hier nach Fälligkeit sortiert.</p></div>';
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
                <div class="todo-row-content">
                    <div class="todo-status-line"><span class="status-badge status-${state === 'due' ? 'danger' : state === 'done' ? 'success' : 'neutral'}">${label}</span><span class="status-badge status-neutral">${escapeHtml(todo.category || 'Wartung')}</span></div>
                    <strong>${escapeHtml(todo.title)}</strong>
                    <small>Intervall: ${todo.intervalDays ? `alle ${todo.intervalDays} Tage` : 'einmalig'} · Erinnerung ${notify ? 'an' : 'aus'}</small>
                    <small>Zuletzt erledigt: ${todo.lastDoneAt ? formatWarehouseDate(todo.lastDoneAt) : 'noch nie'} · Wieder anstehend: ${formatWarehouseDate(todo.dueAt)}</small>
                </div>
                <div class="logbook-actions">
                    <button onclick="completeAquariumTodo('${todo.id}')" aria-label="${escapeHtml(todo.title)} als erledigt markieren">Erledigt</button>
                    <button onclick="snoozeAquariumTodo('${todo.id}')" aria-label="${escapeHtml(todo.title)} später erinnern">Erinnern in...</button>
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

function clampNumber(value, min, max, fallback) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}

function pureWaterDensityKgM3(tempC) {
    const t = parseFloat(tempC) || 0;
    return 999.842594
        + (6.793952e-2 * t)
        - (9.095290e-3 * Math.pow(t, 2))
        + (1.001685e-4 * Math.pow(t, 3))
        - (1.120083e-6 * Math.pow(t, 4))
        + (6.536332e-9 * Math.pow(t, 5));
}

function seawaterDensityKgM3(psu, tempC) {
    const s = Math.max(0, parseFloat(psu) || 0);
    const t = parseFloat(tempC) || 0;
    const rhoW = pureWaterDensityKgM3(t);
    const a = 0.824493
        - (4.0899e-3 * t)
        + (7.6438e-5 * Math.pow(t, 2))
        - (8.2467e-7 * Math.pow(t, 3))
        + (5.3875e-9 * Math.pow(t, 4));
    const b = -5.72466e-3
        + (1.0227e-4 * t)
        - (1.6546e-6 * Math.pow(t, 2));
    const c = 4.8314e-4;
    return rhoW + (a * s) + (b * Math.pow(s, 1.5)) + (c * Math.pow(s, 2));
}

function densityKgLFromPsuTemp(psu, tempC) {
    return seawaterDensityKgM3(psu, tempC) / 1000;
}

function psuFromDensityTemp(densityKgL, tempC) {
    const density = Math.max(0.9, parseFloat(densityKgL) || 0);
    let low = 0;
    let high = 50;
    for (let i = 0; i < 42; i += 1) {
        const mid = (low + high) / 2;
        const candidate = densityKgLFromPsuTemp(mid, tempC);
        if (candidate < density) low = mid;
        else high = mid;
    }
    return (low + high) / 2;
}

function psuFromConductivityTemp(conductivity, tempC) {
    const c = Math.max(0, parseFloat(conductivity) || 0);
    const t = parseFloat(tempC) || 25;
    const R = c / 42.914;
    const rt = 0.6766097
        + (2.00564e-2 * t)
        + (1.104259e-4 * Math.pow(t, 2))
        - (6.9698e-7 * Math.pow(t, 3))
        + (1.0031e-9 * Math.pow(t, 4));
    const Rt = R / rt;
    const rootRt = Math.sqrt(Math.max(Rt, 0));
    const a = [0.0080, -0.1692, 25.3851, 14.0941, -7.0261, 2.7081];
    const b = [0.0005, -0.0056, -0.0066, -0.0375, 0.0636, -0.0144];
    const deltaT = (t - 15) / (1 + 0.0162 * (t - 15));
    const salinity = a[0]
        + (a[1] * rootRt)
        + (a[2] * Rt)
        + (a[3] * Rt * rootRt)
        + (a[4] * Math.pow(Rt, 2))
        + (a[5] * Math.pow(Rt, 2) * rootRt)
        + deltaT * (
            b[0]
            + (b[1] * rootRt)
            + (b[2] * Rt)
            + (b[3] * Rt * rootRt)
            + (b[4] * Math.pow(Rt, 2))
            + (b[5] * Math.pow(Rt, 2) * rootRt)
        );
    return Math.max(0, salinity);
}

function conductivityFromPsuTemp(psu, tempC) {
    const target = Math.max(0, parseFloat(psu) || 0);
    let low = 0;
    let high = 80;
    for (let i = 0; i < 40; i += 1) {
        const mid = (low + high) / 2;
        const candidate = psuFromConductivityTemp(mid, tempC);
        if (candidate < target) low = mid;
        else high = mid;
    }
    return (low + high) / 2;
}

function densityKgLFromSpecificGravity(sg, tempC) {
    const specificGravity = Math.max(0.9, parseFloat(sg) || 0);
    return specificGravity * (pureWaterDensityKgM3(tempC) / 1000);
}

function specificGravityFromDensityKgL(densityKgL, tempC) {
    const density = Math.max(0.9, parseFloat(densityKgL) || 0);
    return density / (pureWaterDensityKgM3(tempC) / 1000);
}

function getSalinityMethodConfig(method) {
    if (method === 'specificGravity') {
        return {
            label: 'Specific Gravity',
            min: 1.0150,
            max: 1.0350,
            step: 0.0001,
            fallback: 1.0233
        };
    }
    if (method === 'conductivity') {
        return {
            label: 'Leitwert (mS/cm)',
            min: 35,
            max: 65,
            step: 0.01,
            fallback: 53.06
        };
    }
    return {
        label: 'Dichte abgelesen (kg/l)',
        min: 1.0150,
        max: 1.0350,
        step: 0.0001,
        fallback: 1.0233
    };
}

function updateSalinityCalculator(source = '') {
    const methodEl = document.getElementById('salinityMethod');
    const densityEl = document.getElementById('salinityDensity');
    const tempEl = document.getElementById('salinityTemp');
    const densityNumberEl = document.getElementById('salinityDensityNumber');
    const tempNumberEl = document.getElementById('salinityTempNumber');
    const measurementLabelEl = document.getElementById('salinityMeasurementLabel');
    const result = document.getElementById('salinityResult');
    if (!densityEl || !tempEl || !result) return;

    const method = methodEl?.value || 'density';
    const methodConfig = getSalinityMethodConfig(method);
    densityEl.min = String(methodConfig.min);
    densityEl.max = String(methodConfig.max);
    densityEl.step = String(methodConfig.step);
    if (densityNumberEl) {
        densityNumberEl.min = String(methodConfig.min);
        densityNumberEl.max = String(methodConfig.max);
        densityNumberEl.step = String(methodConfig.step);
    }
    if (measurementLabelEl) measurementLabelEl.innerText = methodConfig.label;

    const densityMin = parseFloat(densityEl.min) || methodConfig.min;
    const densityMax = parseFloat(densityEl.max) || methodConfig.max;
    const tempMin = parseFloat(tempEl.min) || 15;
    const tempMax = parseFloat(tempEl.max) || 32;

    const densitySource = source === 'densityNumber' && densityNumberEl ? densityNumberEl.value : densityEl.value;
    const tempSource = source === 'tempNumber' && tempNumberEl ? tempNumberEl.value : tempEl.value;
    const density = clampNumber(densitySource, densityMin, densityMax, methodConfig.fallback);
    const temp = clampNumber(tempSource, tempMin, tempMax, 25);

    const measurementDecimals = method === 'conductivity' ? 2 : 4;
    densityEl.value = density.toFixed(measurementDecimals);
    tempEl.value = temp.toFixed(1);
    if (densityNumberEl && source !== 'densityNumber') densityNumberEl.value = density.toFixed(measurementDecimals);
    if (tempNumberEl && source !== 'tempNumber') tempNumberEl.value = temp.toFixed(1);

    const offset = parseFloat(db.psuCorrectionOffset) || 0;
    let rawPsu = 0;
    let measuredDensity = 0;
    if (method === 'specificGravity') {
        measuredDensity = densityKgLFromSpecificGravity(density, temp);
        rawPsu = psuFromDensityTemp(measuredDensity, temp);
    } else if (method === 'conductivity') {
        rawPsu = psuFromConductivityTemp(density, temp);
        measuredDensity = densityKgLFromPsuTemp(rawPsu, temp);
    } else {
        measuredDensity = density;
        rawPsu = psuFromDensityTemp(density, temp);
    }
    const psu = rawPsu + offset;
    const densityAt25 = densityKgLFromPsuTemp(psu, 25);
    const densityAtTemp = densityKgLFromPsuTemp(psu, temp);
    const sgAtTemp = specificGravityFromDensityKgL(densityAtTemp, temp);
    const conductivity = conductivityFromPsuTemp(psu, temp);
    result.innerHTML = `
        <div class="salinity-value">${psu.toFixed(1)} PSU</div>
        <div class="tool-row">
            <span><strong>Rohwert</strong><small>Vor gespeicherter PSU-Korrektur</small></span>
            <span>${rawPsu.toFixed(2)} PSU</span>
        </div>
        <div class="tool-row">
            <span><strong>Dichte @ ${temp.toFixed(1)} °C</strong><small>Aus der gewählten Messmethode</small></span>
            <span>${densityAtTemp.toFixed(4)} kg/l</span>
        </div>
        <div class="tool-row">
            <span><strong>Dichte @ 25 °C</strong><small>Temperaturkorrigierte Referenz</small></span>
            <span>${densityAt25.toFixed(4)} kg/l</span>
        </div>
        <div class="tool-row">
            <span><strong>Specific Gravity</strong><small>Bezugsdichte bei ${temp.toFixed(1)} °C</small></span>
            <span>${sgAtTemp.toFixed(4)}</span>
        </div>
        <div class="tool-row">
            <span><strong>Leitwert</strong><small>Äquivalenter Leitwert bei ${temp.toFixed(1)} °C</small></span>
            <span>${conductivity.toFixed(2)} mS/cm</span>
        </div>
        <small>${offset ? `Gespeicherte PSU-Korrektur ${offset > 0 ? '+' : ''}${offset.toFixed(1)} wurde angewendet.` : 'Keine zusätzliche PSU-Korrektur gespeichert.'}</small>
    `;
    renderPsuCorrectionSettings();
}

function updateSimpleSalinityConverter(source = 'psu') {
    const psuInput = document.getElementById('simplePsuInput');
    const densityInput = document.getElementById('simpleDensityInput');
    const result = document.getElementById('simpleSalinityResult');
    const sgInput = document.getElementById('specificGravityInput');
    const sgTempInput = document.getElementById('specificGravityTempInput');
    const sgResult = document.getElementById('specificGravityResult');
    if (!psuInput || !densityInput || !result) return;

    let psu = parseFloat(psuInput.value);
    let density = parseFloat(densityInput.value);

    const offset = parseFloat(db.psuCorrectionOffset) || 0;

    if (source === 'psu' && !isNaN(psu)) {
        density = densityKgLFromPsuTemp(Math.max(0, psu - offset), 25);
        densityInput.value = density.toFixed(4);
    } else if (source === 'density' && !isNaN(density)) {
        psu = psuFromDensityTemp(density, 25) + offset;
        psuInput.value = psu.toFixed(1);
    }

    if (isNaN(psu) && isNaN(density)) {
        result.innerText = '';
    } else {
        const densityText = isNaN(density) ? '-' : `${density.toFixed(4)} kg/l`;
        const psuText = isNaN(psu) ? '-' : `${psu.toFixed(1)} PSU`;
        result.innerHTML = `Dichte: <strong>${densityText}</strong><br>Salinität: <strong>${psuText}</strong><br><small>Bei 25 °C Referenz${offset ? ` · PSU-Korrektur ${offset > 0 ? '+' : ''}${offset.toFixed(1)}` : ''}.</small>`;
    }

    if (sgInput && sgTempInput && sgResult) {
        const sg = parseFloat(sgInput.value);
        const sgTemp = clampNumber(sgTempInput.value, 15, 32, 25);
        if (!isNaN(sg)) {
            const sgDensity = densityKgLFromSpecificGravity(sg, sgTemp);
            const sgRawPsu = psuFromDensityTemp(sgDensity, sgTemp);
            const sgPsu = sgRawPsu + offset;
            const sgDensity25 = densityKgLFromPsuTemp(sgPsu, 25);
            sgResult.innerHTML = `
                <div class="tool-row">
                    <span><strong>Specific Gravity → PSU</strong><small>Bei ${sgTemp.toFixed(1)} °C gemessen</small></span>
                    <span>${sgPsu.toFixed(2)} PSU</span>
                </div>
                <div class="tool-row">
                    <span><strong>Dichte @ ${sgTemp.toFixed(1)} °C</strong><small>Aus Specific Gravity abgeleitet</small></span>
                    <span>${sgDensity.toFixed(4)} kg/l</span>
                </div>
                <div class="tool-row">
                    <span><strong>Dichte @ 25 °C</strong><small>Temperaturkorrigierte Referenz</small></span>
                    <span>${sgDensity25.toFixed(4)} kg/l</span>
                </div>
            `;
        } else {
            sgResult.innerText = '';
        }
    }
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
                <article class="stat-block usage-stat-card">
                    <div class="usage-stat-head">
                        <h4>${escapeHtml(item)}</h4>
                        ${showMassSubline ? `<span>${getGrams(item, totalConsumed)} g gesamt</span>` : ''}
                    </div>
                    <div class="usage-stat-total">Gesamtverbrauch <strong>${formatItemAmount(item, totalConsumed)}</strong></div>
                    <progress class="usage-stat-progress" value="${widthPct}" max="100" aria-label="Relativer Gesamtverbrauch ${escapeHtml(item)}"></progress>
                    <div class="stat-grid usage-period-grid">
                        <div><strong>${formatItemAmount(item, perWeek)}</strong>${showMassSubline ? `<small>${getGrams(item, perWeek)} g / Woche</small>` : '<small>pro Woche</small>'}</div>
                        <div><strong>${formatItemAmount(item, perMonth)}</strong>${showMassSubline ? `<small>${getGrams(item, perMonth)} g / Monat</small>` : '<small>pro Monat</small>'}</div>
                        <div><strong>${formatItemAmount(item, perYear)}</strong>${showMassSubline ? `<small>${getGrams(item, perYear)} g / Jahr</small>` : '<small>pro Jahr</small>'}</div>
                    </div>
                    <div class="prognose-badge" role="status"><strong>Prognose</strong><span>${escapeHtml(prognosisText)}</span></div>
                </article>
            `;
        }
    }
    container.innerHTML = content || '<div class="section-empty-state" role="status"><strong>Noch keine Verbrauchsdaten</strong><p>Nach Auslagerungen erscheinen hier Verbrauch und Prognose.</p></div>';
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
    
    const search = (document.getElementById('protocolSearch')?.value || '').trim().toLowerCase();
    const actionFilter = document.getElementById('protocolActionFilter')?.value || 'all';
    const filterStatus = document.getElementById('protocolFilterStatus');

    if (!db.logs || db.logs.length === 0) {
        container.innerHTML = '<div class="section-empty-state" role="status"><strong>Noch keine Aktionen</strong><p>Ein- und Auslagerungen erscheinen automatisch in diesem Protokoll.</p></div>';
        if (filterStatus) filterStatus.innerHTML = '<span><strong>0</strong> Einträge</span><span class="status-badge status-neutral">Gesamtes Protokoll</span>';
        return;
    }

    const sortedLogs = db.logs
        .map((log, originalIndex) => ({ log, originalIndex }))
        .reverse()
        .filter(({ log }) => actionFilter === 'all' || log.action === actionFilter)
        .filter(({ log }) => !search || [log.item, log.cat, log.action].join(' ').toLowerCase().includes(search));

    if (filterStatus) {
        const active = [search ? `Suche „${search}“` : '', actionFilter === 'in' ? 'Eingelagert' : actionFilter === 'out' ? 'Ausgelagert' : ''].filter(Boolean);
        filterStatus.innerHTML = `<span><strong>${sortedLogs.length}</strong> ${sortedLogs.length === 1 ? 'Eintrag' : 'Einträge'}</span>${active.length ? `<span class="status-badge status-info">${active.map(escapeHtml).join(' · ')}</span>` : '<span class="status-badge status-neutral">Gesamtes Protokoll</span>'}`;
    }

    if (!sortedLogs.length) {
        container.innerHTML = '<div class="section-empty-state" role="status"><strong>Keine passenden Aktionen</strong><p>Ändere die Suche oder setze die Filter zurück.</p><button type="button" class="btn-secondary" onclick="resetProtocolFilters()">Filter zurücksetzen</button></div>';
        return;
    }

    let logHTML = sortedLogs.map(({ log, originalIndex }) => {
        let isOut = log.action === 'out';
        let sign = isOut ? '-' : '+';
        let actionText = isOut ? 'Ausgelagert' : 'Eingelagert';
        
        // Umrechnung in Gramm für das Protokoll
        let gAmount = getGrams(log.item, log.amount);
        let showMassSubline = itemUsesVolume(log.item);
        
        return `
            <article class="log-item protocol-entry ${log.action}">
                <div class="protocol-entry-main">
                    <div class="protocol-entry-head"><strong>${escapeHtml(log.item)}</strong><span class="status-badge ${isOut ? 'status-warning' : 'status-success'}">${actionText}</span></div>
                    <div class="log-date">${new Date(getLogTime(log) || Date.now()).toLocaleString()}</div>
                </div>
                <div class="protocol-entry-value">
                    <strong>${sign}${formatItemAmount(log.item, log.amount)}</strong>
                    ${showMassSubline ? `<small>${sign}${gAmount} g</small>` : ''}
                    <button type="button" class="protocol-undo-button" onclick="undoLog(${originalIndex})" aria-label="${escapeHtml(actionText)} von ${escapeHtml(log.item)} rückgängig machen">Rückgängig</button>
                </div>
            </article>
        `;
    }).join('');
    
    container.innerHTML = logHTML;
}

function resetProtocolFilters() {
    const search = document.getElementById('protocolSearch');
    const action = document.getElementById('protocolActionFilter');
    if (search) search.value = '';
    if (action) action.value = 'all';
    renderLogs();
}

// --- MODAL & EINGABELOGIK ---
function openModal(cat, item, action) {
    if (!requireWarehouseWriteAccess(action === 'in' ? 'Einlagern' : 'Auslagern')) return;
    stockModalReturnFocus = document.activeElement;
    currentAction = { cat, item, action };
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const currentStock = (db.inventory[cat] && db.inventory[cat][item]) || 0;
    const unitOptions = itemUsesPieces(item)
        ? '<option value="st">Stück</option>'
        : (getItemUnit(item) === 'g'
            ? '<option value="g">Gramm (g)</option><option value="ml">Milliliter (ml)</option>'
            : '<option value="ml">Milliliter (ml)</option><option value="g">Gramm (g)</option>');
    document.getElementById('modal-title').innerText = action === 'in' ? `${item} einlagern` : `${item} auslagern`;
    
    modalBody.innerHTML = `
        <div class="input-group">
            <label>Einheit auswählen:</label>
            <select id="unitSelect" onchange="toggleContainerOptions(); updateLiveConversion();">
                ${unitOptions}
            </select>
        </div>
        
        <div id="containerSection" class="modal-container-options" hidden>
            <label class="modal-checkbox-label">
                <input type="checkbox" id="useContainer" onchange="toggleContainerOptions(); updateLiveConversion();"> 
                Behälter-Gewicht (Tara) abziehen
                <button type="button" class="mini-help" onclick="showHelp('tara')" aria-label="Tara Hilfe">?</button>
            </label>
            <select id="containerSelect" onchange="updateLiveConversion();" hidden>
                ${Object.entries(getAllContainers()).map(([c, weight]) => `<option value="${c}">${c} (wiegt ${weight}g)</option>`).join('')}
            </select>
        </div>

        <div class="input-group modal-field-group">
            <label>Menge eingeben:</label>
            <input type="number" step="0.01" id="amount" placeholder="Wert eintragen" oninput="updateLiveConversion()">
            <div id="liveConversion" class="modal-live-conversion" aria-live="polite"></div>
        </div>
        ${action === 'out' ? `
            <div class="input-group modal-field-group">
                <label>Neuer Lagerbestand (optional):</label>
                <input type="number" step="0.01" id="targetAmount" placeholder="z.B. 80" oninput="updateLiveConversion()">
                <div id="targetStockPreview" class="modal-stock-preview" aria-live="polite"></div>
            </div>
        ` : ''}
        <div class="tool-result modal-current-stock">
            <strong>Aktueller Bestand</strong><br>
            <span id="currentStockText">${formatItemAmount(item, currentStock)}</span>
        </div>
        ${action === 'out'
            ? `<div class="btn-group modal-action-group">
                    <button class="btn-primary btn-animated" onclick="executeAction('log')">Auslagerung buchen</button>
                    <button class="btn-secondary btn-animated" onclick="executeAction('correct')">Nur Bestand korrigieren</button>
               </div>
               <p class="hint modal-action-hint">Wenn du den neuen Lagerbestand einträgst, kannst du wählen, ob nur korrigiert oder die Differenz als Auslagerung protokolliert werden soll.</p>`
            : `<button class="btn-primary btn-animated modal-action-submit" onclick="executeAction('log')">Buchung ausführen</button>`
        }
    `;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    acquireBodyScrollLock('modal');
    enhanceFormAccessibility(modalBody);
    updateLiveConversion();
    window.setTimeout(() => document.getElementById('amount')?.focus(), 0);
}

function toggleContainerOptions() {
    const isGram = document.getElementById('unitSelect').value === 'g';
    const isChecked = document.getElementById('useContainer').checked;
    document.getElementById('containerSection').hidden = !isGram;
    document.getElementById('containerSelect').hidden = !(isGram && isChecked);
}

function updateLiveConversion() {
    const amountInput = document.getElementById('amount');
    const liveDiv = document.getElementById('liveConversion');
    if (!amountInput || !liveDiv || !currentAction) return;

    let rawAmount = parseFloat(amountInput.value);
    let unit = document.getElementById('unitSelect').value;
    const useTara = unit === 'g' && document.getElementById('useContainer') && document.getElementById('useContainer').checked;
    const containerValue = document.getElementById('containerSelect') ? document.getElementById('containerSelect').value : null;
    const targetPreview = document.getElementById('targetStockPreview');
    if (isNaN(rawAmount) || rawAmount <= 0) {
        liveDiv.innerText = '';
    } else {
        const preview = formatBidirectionalMassVolumePreview(currentAction.item, unit, rawAmount, useTara, containerValue);
        liveDiv.innerText = preview;
        liveDiv.style.color = preview.includes('Tara') ? 'var(--danger)' : 'var(--secondary)';
    }

    if (targetPreview && currentAction.action === 'out') {
        const targetRaw = document.getElementById('targetAmount')?.value;
        const currentStock = (db.inventory[currentAction.cat] && db.inventory[currentAction.cat][currentAction.item]) || 0;
        if (targetRaw === '' || targetRaw === null || targetRaw === undefined) {
            targetPreview.innerText = '';
        } else {
            const targetStored = convertInputToStoredAmountAllowZero(currentAction.item, unit, targetRaw, useTara, containerValue);
            if (targetStored === null || targetStored < 0) {
                targetPreview.innerText = 'Neuer Lagerstand ungueltig';
                targetPreview.style.color = 'var(--danger)';
            } else {
                const delta = currentStock - targetStored;
                targetPreview.innerText = `${formatInventoryDeltaPreview(currentAction.item, currentStock, targetStored)}${delta !== 0 ? ` · Delta ${delta > 0 ? '-' : '+'}${formatItemAmount(currentAction.item, Math.abs(delta))}` : ''}`;
                targetPreview.style.color = delta < 0 ? 'var(--warning)' : 'var(--text-muted)';
            }
        }
    }
}


// Hier wird sichergestellt, dass beim manuellen Öffnen der Einstellungen das Dropdown synchron ist
document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect && db.theme) themeSelect.value = db.theme;
    const forecastSelect = document.getElementById('forecastWeeks');
    if(forecastSelect) forecastSelect.value = String((db.settings && db.settings.forecastWeeks) || 4);
    applyCursorSettings();
    renderLocalDeviceSettings();
    syncCRPreferredUnitUI();
    toggleCustomProductUnitFields();
    initBulkProductSelect();
    renderOtpCooldownState();
    setTimeout(() => autoSyncWarehousesOnStartup(), 900);
});

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    releaseBodyScrollLock('modal');
    const returnFocus = stockModalReturnFocus;
    stockModalReturnFocus = null;
    window.setTimeout(() => {
        if (returnFocus && returnFocus.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus();
    }, 0);
}

function showHelp(topic) {
    const texts = {
        tara: 'Tara bedeutet: Du wiegst den vollen Behälter, wählst den passenden leeren Behälter aus und die App zieht dessen Leergewicht automatisch ab.'
    };
    appAlert(texts[topic] || 'Für dieses Feld gibt es noch keinen Hilfetext.', {
        title: 'Tara richtig verwenden',
        type: 'info'
    });
}

function executeAction(mode = 'log') {
    if (!requireWarehouseWriteAccess('Diese Lagerbuchung')) return;
    let rawAmount = parseFloat(document.getElementById('amount').value);
    let unit = document.getElementById('unitSelect').value;
    let { cat, item, action } = currentAction;

    const useTara = unit === 'g' && document.getElementById('useContainer') && document.getElementById('useContainer').checked;
    const containerValue = document.getElementById('containerSelect') ? document.getElementById('containerSelect').value : null;

    if (action === 'in') {
                if (isNaN(rawAmount) || rawAmount <= 0) return alert("Bitte eine gültige Menge eingeben.");
                let finalMl = convertInputToStoredAmount(item, unit, rawAmount, useTara, containerValue);
                if (finalMl === null || finalMl <= 0) return alert("Fehler: Nach Abzug des Behälters bleibt keine Restmenge übrig.");
                db.inventory[cat][item] += finalMl;
                const log = addLog(cat, item, 'in', finalMl);
                saveDB();
                closeModal();
                renderLager();
                showBookingUndoToast(log);
                checkAndNotifyStockAlerts();
            } 
    else {
        let stock = db.inventory[cat][item] || 0;
        const targetAmountValue = document.getElementById('targetAmount')?.value;
        const hasTargetAmount = targetAmountValue !== undefined && targetAmountValue !== null && String(targetAmountValue).trim() !== '';

        if (hasTargetAmount) {
            const targetStored = convertInputToStoredAmountAllowZero(item, unit, targetAmountValue, useTara, containerValue);
            if (targetStored === null || targetStored < 0) return alert("Bitte einen gültigen neuen Lagerbestand eingeben.");
            if (mode === 'correct') {
                db.inventory[cat][item] = targetStored;
                saveDB();
                closeModal();
                renderLager();
                showToast(`${item}: Lagerbestand auf ${formatItemAmount(item, targetStored)} korrigiert`, 'success');
                checkAndNotifyStockAlerts();
                return;
            }
            if (targetStored > stock) {
                return alert("Der neue Lagerbestand liegt über dem aktuellen Bestand. Bitte dafür 'Nur Bestand korrigieren' nutzen.");
            }
            rawAmount = stock - targetStored;
            if (rawAmount === 0) {
                closeModal();
                showToast('Kein Unterschied zwischen altem und neuem Lagerbestand', 'info');
                return;
            }
        } else {
            if (mode === 'correct') {
                return alert("Für eine reine Korrektur bitte zuerst den neuen Lagerbestand eintragen.");
            }
            if (isNaN(rawAmount) || rawAmount <= 0) return alert("Bitte eine gültige Menge eingeben.");
        }

        let finalMl = convertInputToStoredAmount(item, unit, rawAmount, useTara, containerValue);
        if (finalMl === null || finalMl <= 0) return alert("Fehler: Nach Abzug des Behälters bleibt keine Restmenge übrig.");

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
                const log = addLog(cat, item, 'out', stock);
                saveDB();
                closeModal();
                renderLager();
                showBookingUndoToast(log);
                checkAndNotifyStockAlerts();
            });
            return;
        }
        db.inventory[cat][item] -= finalMl;
        db.stats[item] += finalMl;
        const log = addLog(cat, item, 'out', finalMl);
        saveDB();
        closeModal();
        renderLager();
        showBookingUndoToast(log);
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
    acquireBodyScrollLock('modal');
}

function addLog(cat, item, action, amount) {
    if(!db.logs) db.logs = [];
    const now = Date.now();
    const log = { id: createWarehouseId(), cat, item, action, amount, timestamp: now, time: now };
    db.logs.push(log);
    if (db.logs.length > 200) db.logs.shift();
    return log;
}

function showBookingUndoToast(log) {
    if (!log) return;
    pushUndoAction({
        undo: () => {
            const index = (db.logs || []).findIndex(entry => entry.id === log.id);
            if (index >= 0) undoLog(index, true);
        }
    });
    const text = `${log.action === 'out' ? 'Ausgelagert' : 'Eingelagert'}: ${log.item} · ${formatItemAmount(log.item, log.amount)}`;
    showUndoToast(text);
}

function undoLog(index, silent = false) {
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
    if (!silent) alert("Aktion erfolgreich rückgängig gemacht!");
    renderLager();
    renderLogs();
    renderDashboard();
}

// --- QUEUE & LISTEN VERARBEITUNG ---
function getCRPreferredUnit() {
    const saved = db && db.settings ? db.settings.crPreferredUnit : null;
    return saved === 'g' ? 'g' : 'ml';
}

function syncCRPreferredUnitUI() {
    const select = document.getElementById('crPreferredUnit');
    if (select) select.value = getCRPreferredUnit();
}

function updateCRPreferredUnit(value) {
    if (!db.settings) db.settings = {};
    db.settings.crPreferredUnit = value === 'g' ? 'g' : 'ml';
    saveDB(false);
    syncCRPreferredUnitUI();
    previewCRPaste();
    renderCRPdfAdjustments();
}

function formatCRAmountValue(value, unit) {
    return `${Number(value || 0).toFixed(2)} ${unit}`;
}

function formatCRPreferredAmountHtml(itemName, amountMl) {
    const density = densityFactors[itemName] || 1.0;
    const amountG = amountMl * density;
    const preferred = getCRPreferredUnit();
    const primaryValue = preferred === 'g' ? amountG : amountMl;
    const primaryUnit = preferred === 'g' ? 'g' : 'ml';
    const secondaryValue = preferred === 'g' ? amountMl : amountG;
    const secondaryUnit = preferred === 'g' ? 'ml' : 'g';
    const primaryText = formatCRAmountValue(primaryValue, primaryUnit);
    const secondaryText = formatCRAmountValue(secondaryValue, secondaryUnit);
    return {
        html: `<strong class="cr-primary-unit">${primaryText}</strong><small class="cr-secondary-unit">(${secondaryText})</small>`,
        plain: `${primaryText} (${secondaryText})`
    };
}

function previewCRPaste() {
    const pasteArea = document.getElementById('cr-paste-area');
    const previewContainer = document.getElementById('cr-preview-container');
    const previewList = document.getElementById('cr-preview-list');
    
    if (!pasteArea || !previewContainer || !previewList) return;

    const text = pasteArea.value;
    const matches = text.match(/([\d.]+)\s*ml/g);

    if (!text.trim()) {
        previewContainer.hidden = true;
        return;
    }

    if (!matches || matches.length < crOrder.length) {
        previewContainer.hidden = false;
        previewList.innerHTML = '<div class="workflow-message workflow-message--error" role="alert"><strong>Eingabe unvollständig</strong><span>Format unvollständig oder ungültig. Bitte ganze Zeile einfügen.</span></div>';
        return;
    }

    let html = '<div class="cr-preview-list">';
    for (let i = 0; i < crOrder.length; i++) {
        let amountMl = parseFloat(matches[i].replace(/[^\d.]/g, ''));
        let itemName = crOrder[i].name;
        let cat = crOrder[i].cat;
        let currentStock = (db.inventory[cat] && db.inventory[cat][itemName]) || 0;
        
        if (amountMl > 0) {
            let stockWarning = '';
            const newStock = Math.max(0, currentStock - amountMl);
            const newStockDisplay = formatCRPreferredAmountHtml(itemName, newStock);
            if (currentStock < amountMl) {
                const missingDisplay = formatCRPreferredAmountHtml(itemName, amountMl - currentStock);
                const stockDisplay = formatCRPreferredAmountHtml(itemName, currentStock);
                stockWarning = `<span class="cr-stock-warning"><strong>Bestand reicht nicht</strong> · Fehlt: ${missingDisplay.plain} (Bestand: ${stockDisplay.plain})</span>`;
            }
            html += `
                <div class="cr-preview-row ${currentStock < amountMl ? 'missing' : ''}">
                    <span class="cr-preview-product"><strong>${itemName}</strong>${stockWarning}</span>
                    <span class="cr-preview-amount">
                        ${formatCRPreferredAmountHtml(itemName, amountMl).html}
                        <small>Neuer Bestand: ${newStockDisplay.plain}</small>
                    </span>
                </div>
            `;
        }
    }
    html += '</div>';

    previewList.innerHTML = html;
    previewContainer.hidden = false;
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
    if (!CR_PDF_IMPORT_ENABLED) {
        crPdfAdjustments = [];
        results.innerHTML = '';
        if (status) status.innerText = CR_PDF_MAINTENANCE_MESSAGE;
        return;
    }

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
            const newStock = Math.max(0, stock - entry.amount);
            const amountDisplay = formatCRPreferredAmountHtml(entry.item, entry.amount);
            const stockDisplay = formatCRPreferredAmountHtml(entry.item, stock);
            const newStockDisplay = formatCRPreferredAmountHtml(entry.item, newStock);
            const missingDisplay = isMissing ? formatCRPreferredAmountHtml(entry.item, entry.amount - stock) : null;
            return `
                <div class="cr-adjustment-row ${isMissing ? 'missing' : ''} ${!isNeeded ? 'empty' : ''}">
                    <div>
                        <strong>${escapeHtml(entry.item)}</strong>
                        <small>Bestand: ${stockDisplay.plain} · Neu: ${newStockDisplay.plain}</small>
                    </div>
                    <div class="cr-adjustment-amount">
                        ${amountDisplay.html}
                        <small>${isMissing ? `Fehlt: ${missingDisplay.plain}` : '&nbsp;'}</small>
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
    if (!CR_PDF_IMPORT_ENABLED) {
        crPdfAdjustments = [];
        setCRPdfStatus(CR_PDF_MAINTENANCE_MESSAGE);
        const results = document.getElementById('cr-pdf-results');
        if (results) results.innerHTML = '';
        return;
    }
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
    if (!CR_PDF_IMPORT_ENABLED) {
        crPdfAdjustments = [];
        if (textarea) textarea.value = '';
        if (status) status.innerText = CR_PDF_MAINTENANCE_MESSAGE;
        renderCRPdfAdjustments();
        return;
    }
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
    if (status) status.innerText = CR_PDF_IMPORT_ENABLED ? 'Noch keine PDF geladen.' : CR_PDF_MAINTENANCE_MESSAGE;
    if (results) results.innerHTML = '';
}

function exportCRAdjustment(index) {
    if (!CR_PDF_IMPORT_ENABLED) {
        setCRPdfStatus(CR_PDF_MAINTENANCE_MESSAGE);
        alert(CR_PDF_MAINTENANCE_MESSAGE);
        return;
    }
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
    let prefix = typ === 'kationen' ? 'kat' : 'an';
    let catName = typ === 'kationen' ? 'Kationen' : 'Anionen';
    let queue = [];
    
    for (let item of mixDefinitions[typ]) {
        let inputEl = getTraceInputElement(prefix, item);
        let amount = inputEl ? parseFloat(inputEl.value) : 0;
        if (amount > 0) queue.push({ cat: catName, item, amount });
    }
    if (queue.length === 0) return alert("Trage mindestens bei einem Element eine Menge ein.");
    executeQueueWithConflictHandling(queue, 0);
}

function executeQueueWithConflictHandling(queue, index) {
    if (!requireWarehouseWriteAccess('Diese Lagerbuchung')) return;
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
    const payload = buildProjectBackupPayload();
    saveDB();

    let blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `OSCI_Backup_${payload.exportedAt.split('T')[0]}.json`;
    a.click();
    showToast('Projekt-Backup exportiert', 'success', 2200);
}

function exportWarehouseInventoryTxt() {
    const warehouse = getActiveWarehouse();
    const text = buildWarehouseInventoryShareText();
    const exportedAtLocal = new Date().toISOString();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `OSCI_Lagerbestand_${(warehouse?.name || 'Lager').replace(/[^\w.-]+/g, '_')}_${exportedAtLocal.split('T')[0]}.txt`;
    a.click();
    showToast('Lagerbestand als TXT exportiert', 'success', 2200);
}

function buildWarehouseInventoryRows() {
    const rows = [];
    for (const cat in catalog) {
        for (const item in catalog[cat]) {
            if (isProductHidden(item)) continue;
            const stock = db.inventory[cat] && db.inventory[cat][item] ? db.inventory[cat][item] : 0;
            if (stock <= 0) continue;
            const threshold = (db.thresholds && db.thresholds[item]) || 0;
            const low = threshold > 0 && stock <= threshold;
            rows.push({
                cat,
                item,
                stock,
                threshold,
                low
            });
        }
    }
    return rows.sort((a, b) => a.cat.localeCompare(b.cat, 'de') || a.item.localeCompare(b.item, 'de'));
}

function buildWarehouseInventoryPdfDocument() {
    const warehouse = getActiveWarehouse();
    const rows = buildWarehouseInventoryRows();
    const totalItems = rows.length;
    const lowCount = rows.filter(row => row.low).length;
    const htmlRows = rows.length
        ? rows.map(row => `
            <tr>
                <td>${escapeHtml(row.cat)}</td>
                <td>${escapeHtml(row.item)}</td>
                <td>${escapeHtml(formatItemAmount(row.item, row.stock))}</td>
                <td>${row.threshold > 0 ? escapeHtml(formatItemAmount(row.item, row.threshold)) : '-'}</td>
                <td class="${row.low ? 'danger' : 'ok'}">${row.low ? 'Niedrig' : 'OK'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="5" style="text-align:center;color:#666;">Keine Artikel mit Bestand vorhanden.</td></tr>';

    return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Lagerbestand ${escapeHtml(warehouse ? warehouse.name : 'Lager')}</title>
            <style>
                body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:28px;color:#111;background:#fff}
                h1{margin:0 0 4px;font-size:24px}
                .meta{color:#666;margin-bottom:10px}
                .summary{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0 22px}
                .pill{border:1px solid #d9dee6;border-radius:14px;padding:10px 12px;min-width:140px;background:#f8fafc}
                .pill strong{display:block;font-size:18px;color:#111}
                .pill span{display:block;font-size:12px;color:#666;margin-top:2px}
                table{width:100%;border-collapse:collapse;font-size:12px}
                th,td{text-align:left;border-bottom:1px solid #ddd;padding:8px;vertical-align:middle}
                th{background:#f3f5f7}
                .danger{color:#b91c1c;font-weight:700}
                .ok{color:#166534;font-weight:700}
                .actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
                button{padding:10px 14px;border-radius:10px;border:1px solid #d1d5db;background:#111;color:#fff;font:inherit;cursor:pointer}
                button.secondary{background:#fff;color:#111}
                @media print{button{display:none}.actions{display:none}body{margin:18px}}
            </style>
        </head>
        <body>
            <div class="actions">
                <button onclick="window.print()">Als PDF sichern / drucken</button>
            </div>
            <h1>Lagerbestand</h1>
            <div class="meta">${escapeHtml(warehouse ? warehouse.name : 'Lager')} · ${new Date().toLocaleString('de-DE')}</div>
            <div class="summary">
                <div class="pill"><strong>${totalItems}</strong><span>Artikel mit Bestand</span></div>
                <div class="pill"><strong>${lowCount}</strong><span>Unter Warnschwelle</span></div>
            </div>
            <table>
                <thead><tr><th>Kategorie</th><th>Produkt</th><th>Bestand</th><th>Warnschwelle</th><th>Status</th></tr></thead>
                <tbody>${htmlRows}</tbody>
            </table>
        </body>
        </html>
    `;
}

function exportWarehouseInventoryPdf() {
    const report = window.open('', '_blank');
    if (!report) return alert('Popup wurde blockiert. Bitte Popups für diese App erlauben.');
    report.document.write(buildWarehouseInventoryPdfDocument());
    report.document.close();
}

function emailWarehouseInventory() {
    const settings = getGoogleDriveSyncSettings ? getGoogleDriveSyncSettings() : { connectedEmail: '' };
    const suggested = settings?.connectedEmail || '';
    const target = (prompt('An welche E-Mail-Adresse soll der Lagerstand gesendet werden?', suggested) || '').trim();
    if (!target) return;
    const warehouse = getActiveWarehouse();
    const subject = encodeURIComponent(`Lagerbestand ${warehouse ? warehouse.name : ''}`.trim());
    const body = encodeURIComponent(`${buildWarehouseInventoryShareText()}\n\nHinweis: Für ein PDF bitte zusätzlich den PDF-Export in der App nutzen.`);
    window.location.href = `mailto:${encodeURIComponent(target)}?subject=${subject}&body=${body}`;
}

function normalizeInventoryTextToken(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/\u00a0/g, ' ')
        .replace(/[()]/g, '')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function buildInventoryItemLookup() {
    const lookup = new Map();
    const register = (name, cat) => {
        const token = normalizeInventoryTextToken(name);
        if (token && !lookup.has(token)) lookup.set(token, { item: name, cat });
    };
    for (const cat in catalog) {
        for (const item in catalog[cat]) {
            register(item, cat);
        }
    }
    (db.customProducts || []).forEach(product => {
        const cat = product.category || product.cat || 'Eigene Produkte';
        register(product.name, cat);
    });
    return lookup;
}

function parseLegacyWarehouseInventoryText(text) {
    const lines = String(text || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const lookup = buildInventoryItemLookup();
    const entries = [];

    for (const line of lines) {
        if (/^lagerbestand\s*:/i.test(line) || /^stand\s*:/i.test(line)) continue;
        if (!line.includes(':')) continue;

        const cleaned = line.replace(/^[\-•*]\s*/, '');
        const match = cleaned.match(/^(.+?)\s*:\s*([-+]?\d+(?:[.,]\d+)?)\s*(ml|g|stueck|stück|st)?$/i);
        if (!match) continue;

        const rawName = match[1].trim();
        const rawAmount = parseFloat(match[2].replace(',', '.'));
        const rawUnit = (match[3] || '').toLowerCase();
        if (!rawName || !Number.isFinite(rawAmount) || rawAmount < 0) continue;

        const found = lookup.get(normalizeInventoryTextToken(rawName));
        if (!found) continue;

        let importUnit = 'ml';
        if (rawUnit === 'g') importUnit = 'g';
        else if (rawUnit === 'st' || rawUnit === 'stueck' || rawUnit === 'stück') importUnit = 'st';
        else if (rawUnit === 'ml') importUnit = 'ml';
        else importUnit = getItemUnit(found.item);

        const storedAmount = convertInputToStoredAmount(found.item, importUnit, rawAmount, false, null);
        if (storedAmount === null || !Number.isFinite(storedAmount)) continue;

        entries.push({
            cat: found.cat,
            item: found.item,
            amount: storedAmount
        });
    }

    return entries;
}

function importLegacyWarehouseInventoryText(text, sourceName = 'TXT-Bestand') {
    const entries = parseLegacyWarehouseInventoryText(text);
    if (!entries.length) {
        alert('Keine bekannten Lagerartikel im TXT-Format erkannt.');
        return false;
    }
    const warehouse = getActiveWarehouse();
    if (!confirm(`TXT-Lagerbestand "${sourceName}" in das aktuell ausgewählte Lager "${warehouse.name}" importieren? Dieses Lager wird dabei überschrieben.`)) {
        return false;
    }

    for (const cat in db.inventory) {
        for (const item in db.inventory[cat]) {
            db.inventory[cat][item] = 0;
        }
    }
    entries.forEach(entry => {
        if (!db.inventory[entry.cat]) db.inventory[entry.cat] = {};
        db.inventory[entry.cat][entry.item] = entry.amount;
    });

    warehouse.data = db;
    warehouse.lastImportAt = new Date().toISOString();
    saveDB();
    renderCurrentWarehouseViews();
    renderStorageSecurityStatus();
    alert(`TXT-Lagerbestand in "${warehouse.name}" geladen!`);
    selectTab('lager');
    checkAndNotifyStockAlerts();
    return true;
}

function importData() {
    let file = document.getElementById('importFile').files[0];
    if (!file) return alert("Bitte wähle eine Backup-Datei aus.");
    let reader = new FileReader();
    reader.onload = e => {
        const rawText = typeof e.target.result === 'string' ? e.target.result : '';
        try {
            let parsed = JSON.parse(rawText);
            const isProjectBackup = parsed && parsed.type === 'osci_project_backup' && parsed.data;
            const importPayload = isProjectBackup ? parsed.data : (parsed && parsed.type === 'osci_warehouse_backup' ? parsed.data : parsed);
            const sourceName = parsed && (parsed.warehouseName || parsed.app) ? (parsed.warehouseName || parsed.app) : 'Backup';
            if (isProjectBackup && importPayload && importPayload.warehouses && importPayload.aquariums) {
                if (!confirm(`Projekt-Backup "${sourceName}" komplett wiederherstellen? Der aktuelle Stand dieses Geräts wird dadurch ersetzt.`)) return;
                appState = migrateToWarehouseState(importPayload);
                activeWarehouseId = importPayload.activeWarehouseId || appState.activeWarehouseId || Object.keys(appState.warehouses || {})[0] || 'main';
                activeAquariumId = importPayload.activeAquariumId || appState.activeAquariumId || Object.keys(appState.aquariums || {})[0] || 'aquarium-main';
                appState.activeWarehouseId = activeWarehouseId;
                appState.activeAquariumId = activeAquariumId;
                const active = getActiveWarehouse();
                if (active) db = normalizeWarehouseData(active.data);
                overlayActiveAquariumData();
                persistSequence = persistSequence.then(() => persistAppStateNow('import-project', true));
                applyTheme(db.theme || 'default', false);
                renderCurrentWarehouseViews();
                renderStorageSecurityStatus();
                alert('Projekt-Backup erfolgreich geladen!');
                selectTab('lager');
                checkAndNotifyStockAlerts();
                return;
            }
            if(importPayload && importPayload.inventory) {
                const warehouse = getActiveWarehouse();
                if (!confirm(`Backup "${sourceName}" in das aktuell ausgewählte Lager "${warehouse.name}" importieren? Dieses Lager wird dadurch ersetzt.`)) return;
                db = normalizeWarehouseData(importPayload);
                warehouse.data = db;
                warehouse.lastImportAt = new Date().toISOString();
                saveDB();
                applyTheme(db.theme || 'default', false);
                renderCurrentWarehouseViews();
                renderStorageSecurityStatus();
                alert(`Backup in "${warehouse.name}" geladen!`);
                selectTab('lager');
                checkAndNotifyStockAlerts();
            } 
            else alert("Ungültiges Backup-Format.");
        } catch(err) {
            const fileName = file.name || 'TXT-Bestand';
            if (/\.(txt)$/i.test(fileName) || /lagerbestand\s*:|^\s*-\s*.+:\s*[-+]?\d+/im.test(rawText)) {
                if (importLegacyWarehouseInventoryText(rawText, fileName)) return;
            }
            alert("Fehler beim Lesen der Datei.");
        }
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
let bulkBookingInProgress = false;

function initBulkProductSelect() {
    const select = document.getElementById('bulkProductSelect');
    if (!select) return;
    
    select.innerHTML = '';
    const warehouseName = document.getElementById('bulkActiveWarehouseName');
    const activeWarehouse = getActiveWarehouse();
    if (warehouseName) warehouseName.innerText = activeWarehouse ? activeWarehouse.name : 'Kein Lager gewählt';
    
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
    label.className = 'bulk-quick-label';
    container.appendChild(label);
    
    let btnGroup = document.createElement('div');
    btnGroup.className = 'bulk-quick-actions';
    
    sizes.forEach(size => {
        let btn = document.createElement('button');
        btn.className = "btn-secondary bulk-quick-button";
        btn.type = "button";
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
    section.classList.toggle('is-hidden', unit !== 'g');
    if (unit !== 'g') {
        const cb = document.getElementById('bulkUseTara');
        if (cb) cb.checked = false;
        const sel = document.getElementById('bulkContainerSelect');
        if (sel) sel.classList.add('is-hidden');
        const label = document.getElementById('bulkContainerSelectLabel');
        if (label) label.hidden = true;
    }
    updateBulkTaraPreview();
}

function toggleBulkTaraSelect() {
    const isChecked = document.getElementById('bulkUseTara').checked;
    const sel = document.getElementById('bulkContainerSelect');
    if (sel) sel.classList.toggle('is-hidden', !isChecked);
    const label = document.getElementById('bulkContainerSelectLabel');
    if (label) label.hidden = !isChecked;
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
            preview.innerHTML = `<span class="bulk-tara-error">Tara (${taraG} g) ist größer oder gleich der Eingabe.</span>`;
        } else {
            preview.innerHTML = `Tara: −${taraG} g <span aria-hidden="true">→</span> Netto: <strong class="bulk-tara-success">${netG.toFixed(1)} g</strong>`;
        }
    } else {
        preview.innerText = `Tara: ${taraG} g werden abgezogen.`;
    }
}

function addToBulkCart() {
    if (!requireWarehouseWriteAccess('Wareneingang')) return;
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
    const cartCount = document.getElementById('bulkCartCount');
    if (!listDiv || !submitBtn) return;
    if (cartCount) cartCount.innerText = `${bulkCart.length} ${bulkCart.length === 1 ? 'Position' : 'Positionen'}`;
    
    if (bulkCart.length === 0) {
        listDiv.innerHTML = '<div class="section-empty-state compact" role="status"><strong>Noch keine Positionen</strong><p>Wähle oben Produkt, Menge und Einheit aus.</p></div>';
        submitBtn.classList.add('is-hidden');
        return;
    }
    
    submitBtn.classList.remove('is-hidden');
    listDiv.innerHTML = bulkCart.map((entry, index) => `
        <article class="bulk-cart-row">
            <div class="bulk-cart-product">
                <strong>${escapeHtml(entry.item)}</strong>
                <small>${escapeHtml(entry.cat)}</small>
            </div>
            <div class="bulk-cart-value">
                <strong>${formatItemAmount(entry.item, entry.ml)}</strong>
                <button type="button" class="bulk-cart-remove" onclick="removeFromBulkCart(${index})" aria-label="${escapeHtml(entry.item)} aus der Zusammenfassung entfernen">Entfernen</button>
            </div>
        </article>
    `).join('');
}

function submitBulkCart() {
    if (!requireWarehouseWriteAccess('Wareneingang')) return;
    if (bulkCart.length === 0 || bulkBookingInProgress) return;
    
    if (!confirm(`${bulkCart.length} Positionen jetzt final in das Lager einbuchen?`)) return;
    bulkBookingInProgress = true;
    const submitBtn = document.getElementById('btnSubmitBulk');
    if (submitBtn) submitBtn.disabled = true;
    try {
        bulkCart.forEach(entry => {
            db.inventory[entry.cat][entry.item] = (db.inventory[entry.cat][entry.item] || 0) + entry.ml;
            addLog(entry.cat, entry.item, 'in', entry.ml);
        });
        saveDB();
        bulkCart = [];
        renderBulkCart();
        renderLager();
        checkAndNotifyStockAlerts();
        alert("Wareneingang erfolgreich verbucht!");
        showTab('lager');
    } finally {
        bulkBookingInProgress = false;
        if (submitBtn) submitBtn.disabled = false;
    }
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
            if (isLow) suggestedItems.add(item);

            catRows += `
                <div class="shop-order-row ${isLow ? 'is-low' : 'is-ok'}">
                    <input type="checkbox" id="${checkId}" data-item="${item}" aria-label="${escapeHtml(item)} zum Shop-Warenkorb hinzufügen"
                        data-selected-url="${defaultUrl}"
                        onchange="updateShopCartBtn()" class="shop-order-check">
                    <div class="shop-order-product">
                        <strong>${escapeHtml(item)}</strong>
                        <small>Bestand: ${formatItemAmount(item, stock)}${isLow ? ' · Nachbestellung prüfen' : ''}</small>
                    </div>
                    <div class="shop-size-options" aria-label="Gebindegröße für ${escapeHtml(item)}">${sizeBtns}</div>
                </div>
            `;
        });
        html += `<section class="shop-order-section"><h3>${escapeHtml(cat)}</h3>${catRows}</section>`;
    }

    if (!html) {
        html = '<div class="section-empty-state" role="status"><strong>Keine Nachbestellungen verfügbar</strong><p>Für sichtbare Produkte sind noch keine Shop-Links konfiguriert.</p></div>';
    } else if (suggestedItems.size > 0) {
        html = `
            <div class="alert-summary reorder-suggestion" role="status">
                <div><strong>Bestellvorschlag</strong><span>${suggestedItems.size} kritische ${suggestedItems.size === 1 ? 'Ware' : 'Waren'} erkannt.</span></div>
                <button type="button" class="btn-secondary" onclick="selectSuggestedShopItems()">Vorschlag markieren</button>
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
    btn.classList.toggle('is-hidden', checked.length === 0);
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
    const row = btn.closest('.shop-order-row');
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
        html += `<section class="shop-link-category"><h4>${escapeHtml(cat)}</h4>`;
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
                    <div class="shop-link-size-row">
                        <span>${escapeHtml(label)}</span>
                        <input type="text" id="${escapeHtml(inputId)}" data-item="${escapeHtml(item)}" data-size="${escapeHtml(size)}" aria-label="Shop-Link für ${escapeHtml(item)}, ${escapeHtml(label)}"
                            value="${escapeHtml(currentUrl)}" placeholder="https://osci-motion.de/product/...">
                        ${currentUrl ? `<a href="${escapeHtml(currentUrl)}" target="_blank" rel="noopener" aria-label="Shop-Link für ${escapeHtml(item)} testen" title="Link testen">Öffnen</a>` : ''}
                    </div>`;
            }).join('');

            html += `
                <div class="shop-link-product">
                    <strong>${escapeHtml(item)}</strong>
                    ${sizeRows}
                </div>`;
        });
        html += '</section>';
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

async function resetShopLinksToPreset() {
    const confirmed = await appConfirm('Alle eigenen Shop-Link-Änderungen zurücksetzen? Das Preset wird wiederhergestellt.', {
        title: 'Shop-Links zurücksetzen',
        type: 'warning',
        confirmText: 'Zurücksetzen'
    });
    if (!confirmed) return;
    db.shopLinks = {};
    saveDB();
    renderShopLinkSettings();
    alert('Preset wiederhergestellt.');
}

// --- PRODUKT-PRESETS ---

async function saveProductPreset() {
    const nameEl = document.getElementById('presetNameInput');
    const name = nameEl ? nameEl.value.trim() : '';
    if (!name) return alert('Bitte einen Preset-Namen eingeben.');
    if (!db.customProducts || db.customProducts.length === 0) return alert('Keine eigenen Produkte vorhanden zum Speichern.');

    if (!db.productPresets) db.productPresets = {};
    if (db.productPresets[name]) {
        const confirmed = await appConfirm(`Preset "${name}" existiert bereits. Die gespeicherte Produktliste wird ersetzt.`, {
            title: 'Preset überschreiben',
            type: 'warning',
            confirmText: 'Preset überschreiben'
        });
        if (!confirmed) return;
    }
    db.productPresets[name] = JSON.parse(JSON.stringify(db.customProducts));
    saveDB();
    if (nameEl) nameEl.value = '';
    renderProductPresets();
    alert(`Preset "${name}" mit ${db.customProducts.length} Produkt(en) gespeichert.`);
}

async function loadProductPreset(name) {
    const preset = db.productPresets && db.productPresets[name];
    if (!preset) return;
    const confirmed = await appConfirm(`Preset "${name}" laden? Dies überschreibt alle aktuellen eigenen Produkte (${(db.customProducts || []).length} Stk).`, {
        title: 'Produktliste laden',
        type: 'warning',
        confirmText: 'Preset laden'
    });
    if (!confirmed) return;

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

async function deleteProductPreset(name) {
    if (name === OSCI_SHOP_PRESET_NAME) return alert('Das Standard-Preset kann nicht gelöscht werden.');
    const confirmed = await appConfirm(`Preset "${name}" wirklich löschen?`, {
        title: 'Preset löschen',
        type: 'danger',
        confirmText: 'Preset löschen'
    });
    if (!confirmed) return;
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
            ? `<span class="settings-preset-badge">Standard</span>`
            : '';
        const actionBtn = isBuiltIn
            ? `<button type="button" onclick='loadProductPreset(${jsArg(name)})' class="btn-secondary btn-animated">Laden</button>`
            : `<button type="button" onclick='loadProductPreset(${jsArg(name)})' class="btn-secondary btn-animated">Laden</button>
               <button type="button" onclick='deleteProductPreset(${jsArg(name)})' class="btn-out btn-animated">Löschen</button>`;

        return `
            <div class="settings-preset-card${isBuiltIn ? ' is-built-in' : ''}">
                <div class="settings-preset-copy">
                    <strong>${escapeHtml(name)}${badge}</strong>
                    <small>${count} Produkt(e): ${escapeHtml(items)}</small>
                </div>
                <div class="settings-row-actions">
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
        container.setAttribute('aria-label', 'Mitteilungen');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-relevant', 'additions');
        document.body.appendChild(container);
    }

    const normalizedType = ['success', 'error', 'info', 'warning'].includes(type) ? type : 'info';
    const icons = { success: '✓', error: '!', info: 'i', warning: '!' };
    const toast = document.createElement('div');
    toast.className = `toast ${normalizedType}`;
    toast.setAttribute('role', normalizedType === 'error' ? 'alert' : 'status');

    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = icons[normalizedType];

    const messageNode = document.createElement('span');
    messageNode.className = 'toast-message';
    messageNode.textContent = String(message ?? '');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'toast-close';
    closeButton.setAttribute('aria-label', 'Mitteilung schließen');
    closeButton.textContent = '×';

    let removeTimer = null;
    const removeToast = () => {
        if (!toast.isConnected || toast.classList.contains('removing')) return;
        toast.classList.add('removing');
        window.setTimeout(() => toast.remove(), 300);
    };
    closeButton.addEventListener('click', removeToast);
    toast.append(icon, messageNode, closeButton);
    container.appendChild(toast);

    while (container.children.length > 4) container.firstElementChild?.remove();

    const visibleDuration = normalizedType === 'error'
        ? Math.max(Number(duration) || 0, 6500)
        : Math.max(Number(duration) || 0, 1800);
    const startTimer = () => { removeTimer = window.setTimeout(removeToast, visibleDuration); };
    const stopTimer = () => { if (removeTimer) window.clearTimeout(removeTimer); };
    toast.addEventListener('mouseenter', stopTimer);
    toast.addEventListener('mouseleave', startTimer);
    toast.addEventListener('focusin', stopTimer);
    toast.addEventListener('focusout', startTimer);
    startTimer();
}

// ==========================================================================
// ACCESSIBLE APP DIALOGS
// ==========================================================================
let appDialogState = null;
let stockModalReturnFocus = null;

function getDialogFocusableElements(panel) {
    if (!panel) return [];
    return Array.from(panel.querySelectorAll(
        'button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], summary, [tabindex]:not([tabindex="-1"])'
    )).filter(element => !element.hidden && element.offsetParent !== null);
}

function closeAppDialog(result = null) {
    const dialog = document.getElementById('appDialog');
    if (!dialog || !appDialogState) return;
    const { resolve, returnFocus } = appDialogState;
    appDialogState = null;
    dialog.classList.remove('is-open', 'is-warning', 'is-danger', 'is-success', 'is-wide');
    dialog.hidden = true;
    dialog.setAttribute('aria-hidden', 'true');
    releaseBodyScrollLock('app-dialog');
    resolve(result);
    window.setTimeout(() => {
        if (returnFocus && returnFocus.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus();
    }, 0);
}

function readAppDialogValue() {
    const fields = Array.from(document.querySelectorAll('#appDialogFields [data-dialog-field]'));
    if (!fields.length) return true;
    const values = {};
    for (const field of fields) {
        const value = field.type === 'checkbox' ? field.checked : field.value;
        if (field.required && String(value).trim() === '') {
            field.setAttribute('aria-invalid', 'true');
            field.focus();
            const error = document.getElementById('appDialogError');
            if (error) {
                error.textContent = 'Bitte fülle das markierte Pflichtfeld aus.';
                error.hidden = false;
            }
            return undefined;
        }
        field.removeAttribute('aria-invalid');
        values[field.dataset.dialogField] = value;
    }
    return fields.length === 1 ? values[fields[0].dataset.dialogField] : values;
}

function showAppDialog(options = {}) {
    const dialog = document.getElementById('appDialog');
    if (!dialog) return Promise.resolve(options.kind === 'confirm' ? false : null);
    if (appDialogState) closeAppDialog(null);

    const kind = options.kind || 'alert';
    const type = ['info', 'warning', 'danger', 'success'].includes(options.type) ? options.type : 'info';
    const title = options.title || (type === 'danger' ? 'Aktion bestätigen' : type === 'warning' ? 'Bitte prüfen' : 'Hinweis');
    const fields = Array.isArray(options.fields) ? options.fields : [];
    const normalizedFields = options.input ? [{ name: 'value', ...options.input }] : fields;

    document.getElementById('appDialogEyebrow').textContent = options.eyebrow || (type === 'danger' ? 'Wichtige Aktion' : type === 'warning' ? 'Achtung' : 'Information');
    document.getElementById('appDialogTitle').textContent = title;
    const description = document.getElementById('appDialogDescription');
    if (options.html !== undefined && options.html !== null) description.innerHTML = String(options.html);
    else description.textContent = String(options.message || '');
    const status = document.getElementById('appDialogStatus');
    status.textContent = type === 'success' ? '✓' : type === 'info' ? 'i' : '!';

    const fieldsMount = document.getElementById('appDialogFields');
    fieldsMount.replaceChildren();
    normalizedFields.forEach((field, index) => {
        const fieldId = `appDialogField${index}`;
        const wrapper = document.createElement('div');
        wrapper.className = 'form-field';
        const label = document.createElement('label');
        label.htmlFor = fieldId;
        label.textContent = field.label || 'Eingabe';
        let control;
        if (Array.isArray(field.options)) {
            control = document.createElement('select');
            field.options.forEach(option => {
                const optionElement = document.createElement('option');
                const optionValue = typeof option === 'object' ? option.value : option;
                optionElement.value = String(optionValue);
                optionElement.textContent = String(typeof option === 'object' ? option.label : option);
                control.appendChild(optionElement);
            });
        } else if (field.multiline) {
            control = document.createElement('textarea');
        } else {
            control = document.createElement('input');
            control.type = field.type || 'text';
        }
        control.id = fieldId;
        control.dataset.dialogField = field.name || `field${index}`;
        control.value = field.value ?? '';
        control.placeholder = field.placeholder || '';
        control.required = field.required === true;
        if (field.autocomplete) control.autocomplete = field.autocomplete;
        if (field.inputMode) control.inputMode = field.inputMode;
        wrapper.append(label, control);
        if (field.description) {
            const description = document.createElement('small');
            description.className = 'field-description';
            description.textContent = field.description;
            wrapper.insertBefore(description, control);
        }
        fieldsMount.appendChild(wrapper);
    });

    const error = document.getElementById('appDialogError');
    error.hidden = true;
    error.textContent = '';
    const cancelButton = document.getElementById('appDialogCancel');
    const confirmButton = document.getElementById('appDialogConfirm');
    const needsCancel = kind !== 'alert';
    cancelButton.hidden = !needsCancel;
    cancelButton.textContent = options.cancelText || 'Abbrechen';
    confirmButton.textContent = options.confirmText || (kind === 'alert' ? 'OK' : 'Bestätigen');
    confirmButton.className = `btn ${type === 'danger' ? 'btn-danger' : type === 'warning' ? 'btn-warning' : 'btn-primary'}`;

    dialog.classList.toggle('is-warning', type === 'warning');
    dialog.classList.toggle('is-danger', type === 'danger');
    dialog.classList.toggle('is-success', type === 'success');
    dialog.classList.toggle('is-wide', options.wide === true);
    dialog.hidden = false;
    dialog.setAttribute('aria-hidden', 'false');
    dialog.classList.add('is-open');
    acquireBodyScrollLock('app-dialog');

    return new Promise(resolve => {
        appDialogState = {
            resolve,
            kind,
            allowEscape: options.allowEscape !== false,
            closeOnBackdrop: options.closeOnBackdrop === true,
            returnFocus: document.activeElement
        };
        cancelButton.onclick = () => closeAppDialog(kind === 'confirm' ? false : null);
        confirmButton.onclick = () => {
            const value = readAppDialogValue();
            if (value === undefined) return;
            closeAppDialog(kind === 'confirm' ? true : value);
        };
        window.setTimeout(() => {
            const firstField = fieldsMount.querySelector('[data-dialog-field]');
            (firstField || confirmButton).focus();
            if (firstField && typeof firstField.select === 'function') firstField.select();
        }, 0);
    });
}

function appAlert(message, options = {}) {
    return showAppDialog({ ...options, kind: 'alert', message });
}

function appConfirm(message, options = {}) {
    return showAppDialog({ ...options, kind: 'confirm', message });
}

function appPrompt(message, defaultValue = '', options = {}) {
    return showAppDialog({
        ...options,
        kind: 'prompt',
        message,
        input: {
            name: 'value',
            label: options.label || 'Eingabe',
            value: defaultValue,
            placeholder: options.placeholder || '',
            required: options.required === true,
            type: options.inputType || 'text'
        }
    });
}

document.addEventListener('keydown', event => {
    const appDialog = document.getElementById('appDialog');
    const stockModal = document.getElementById('modal');
    const legalModal = document.getElementById('legalModal');
    const activeDialog = appDialogState
        ? appDialog
        : (legalModal?.classList.contains('is-open') ? legalModal : (stockModal?.style.display === 'flex' ? stockModal : null));
    if (!activeDialog) return;
    if (event.key === 'Escape') {
        if (appDialogState && appDialogState.allowEscape) {
            event.preventDefault();
            closeAppDialog(appDialogState.kind === 'confirm' ? false : null);
        } else if (legalModal?.classList.contains('is-open')) {
            event.preventDefault();
            closeLegalModal();
        } else if (!appDialogState && stockModal?.style.display === 'flex') {
            event.preventDefault();
            closeModal();
        }
        return;
    }
    if (event.key !== 'Tab') return;
    const panel = activeDialog.querySelector('.app-dialog-panel, .modal-content, .legal-modal-panel');
    const focusable = getDialogFocusableElements(panel);
    if (!focusable.length) {
        event.preventDefault();
        panel?.focus();
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

document.addEventListener('click', event => {
    if (event.target?.id === 'appDialog' && appDialogState?.closeOnBackdrop) {
        closeAppDialog(appDialogState.kind === 'confirm' ? false : null);
    }
    if (event.target?.id === 'legalModal') {
        closeLegalModal();
    }
});

function enhanceFormAccessibility(root = document) {
    let linked = 0;
    root.querySelectorAll('label:not([for])').forEach(label => {
        if (label.querySelector('input, select, textarea')) return;
        const candidate = label.nextElementSibling;
        if (!candidate || !candidate.matches('input[id], select[id], textarea[id]')) return;
        label.htmlFor = candidate.id;
        linked += 1;
    });
    root.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
        field.setAttribute('aria-required', 'true');
    });
    return linked;
}

function setFieldError(fieldId, message = '') {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const errorId = `${fieldId}Error`;
    let error = document.getElementById(errorId);
    if (message) {
        if (!error) {
            error = document.createElement('p');
            error.id = errorId;
            error.className = 'field-message field-message-error';
            error.setAttribute('role', 'alert');
            field.insertAdjacentElement('afterend', error);
        }
        error.textContent = message;
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorId);
    } else {
        field.removeAttribute('aria-invalid');
        if (field.getAttribute('aria-describedby') === errorId) field.removeAttribute('aria-describedby');
        error?.remove();
    }
}

Object.assign(window, { showAppDialog, appAlert, appConfirm, appPrompt, closeAppDialog, closeLegalModal, openLegalModal, unlockWavePumpDemo, lockWavePumpDemo, renderWavePumpDemoSettings, setFieldError, enhanceFormAccessibility });
enhanceFormAccessibility(document);
document.addEventListener('DOMContentLoaded', () => enhanceFormAccessibility(document));
window.setTimeout(() => enhanceFormAccessibility(document), 500);

// ==========================================================================
// 📭 EMPTY STATE HELPER
// ==========================================================================
function createEmptyState(icon, title, text, action = null) {
    return `
        <div class="empty-state" role="status">
            ${icon ? `<div class="empty-state-icon" aria-hidden="true">${icon}</div>` : ''}
            <div class="empty-state-title">${title}</div>
            <div class="empty-state-text">${text}</div>
            ${action ? `<div class="state-action">${action}</div>` : ''}
        </div>
    `;
}

function createErrorState(title, text, action = null) {
    return `<div class="error-state" role="alert">
        <div class="state-icon" aria-hidden="true">!</div>
        <div class="state-title">${title}</div>
        <div class="state-description">${text}</div>
        ${action ? `<div class="state-action">${action}</div>` : ''}
    </div>`;
}

function createLoadingState(title = 'Wird geladen', text = 'Bitte einen Moment warten.') {
    return `<div class="loading-state" role="status" aria-live="polite">
        <div class="state-icon" aria-hidden="true"></div>
        <div class="state-title">${title}</div>
        <div class="state-description">${text}</div>
    </div>`;
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
    // Number keys follow the personal menu order
    if (!e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const order = getMenuOrder();
        const tabMap = {};
        order.slice(0, 9).forEach((tabId, index) => {
            tabMap[String(index + 1)] = tabId;
        });
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
async function bootstrapApplication() {
    await initDB();
    renderLegacyDomainBanner();
    let startupTab = db.lastTab || 'uebersicht';
    try { startupTab = localStorage.getItem(LAST_TAB_KEY) || startupTab; } catch(e) {}
    if (window.location.hash) {
        const hashTab = decodeURIComponent(window.location.hash.slice(1));
        if (APP_TAB_IDS.includes(hashTab)) startupTab = hashTab;
    }
    if (isMenuTabHidden(startupTab)) startupTab = getFirstVisibleTab();
    showTab(startupTab);
    updateNotificationStatus();
    renderStorageSecurityStatus();
    renderAppUpdateStatus();
    renderGoogleDriveSyncCard();
    renderGoogleDriveHeaderStatus();
    setTimeout(() => {
        tryRestoreGoogleDriveSession();
    }, 500);
    initCustomCursor();
    initTextFitGuard();
    initLiveUpdateChecks();
    setTimeout(checkForAppUpdate, 2500);
    setTimeout(() => refreshGoogleDrivePresence(false), 3200);
    setTimeout(() => checkGoogleDriveRemoteChanges({ silent: true, autoRestore: true }), 4000);
    setInterval(checkForAppUpdate, 30 * 60 * 1000);
    setInterval(() => refreshGoogleDrivePresence(false), 10 * 60 * 1000);
    setInterval(() => checkGoogleDriveRemoteChanges({ silent: true, autoRestore: true }), 5 * 60 * 1000);
    setTimeout(() => checkAndNotifyStockAlerts('startup'), 1000);
    setTimeout(checkTodoReminders, 1500);
    setTimeout(() => checkOsmoseTankReminder('startup'), 2000);
    setTimeout(() => checkDosingContainerReminders('startup'), 2300);
    setInterval(checkTodoReminders, 60 * 1000);
    setInterval(checkOsmoseTankReminder, 60 * 60 * 1000);
    setInterval(checkDosingContainerReminders, 60 * 60 * 1000);
}

bootstrapApplication().catch(err => {
    console.error('App bootstrap failed:', err);
    alert('Die App konnte nicht sicher gestartet werden. Bitte die Seite neu laden.');
});

window.addEventListener('hashchange', () => {
    const hashTab = decodeURIComponent(window.location.hash.slice(1));
    if (APP_TAB_IDS.includes(hashTab)) showTab(isMenuTabHidden(hashTab) ? getFirstVisibleTab() : hashTab);
});

window.addEventListener('pagehide', () => {
    if (!appBootstrapComplete) return;
    saveDB(false);
    flushPendingPersistence('pagehide', false);
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'hidden' || !appBootstrapComplete) return;
    saveDB(false);
    flushPendingPersistence('visibility-hidden', false);
});

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
let isPullRefreshing = false;
const PULL_REFRESH_THRESHOLD = 86;
const PULL_REFRESH_MAX = 170;

function shouldIgnorePullToRefreshTarget(target) {
    return Boolean(target && target.closest(
        'input, textarea, select, button, a, summary, label, .modal, .nav-menu, .update-banner'
    ));
}

function setPullToRefreshIndicator(progress, refreshing = false) {
    const indicator = document.getElementById('pullToRefreshIndicator');
    if (!indicator) return;
    const clamped = Math.max(0, Math.min(progress, 1));
    indicator.classList.toggle('visible', clamped > 0 || refreshing);
    indicator.classList.toggle('refreshing', refreshing);
    if (!refreshing) {
        const offset = -84 + (84 * clamped);
        const scale = 0.86 + (0.14 * clamped);
        indicator.style.transform = `translateX(-50%) translateY(${offset}px) scale(${scale})`;
        indicator.style.opacity = String(clamped);
    } else {
        indicator.style.transform = '';
        indicator.style.opacity = '';
    }
}

function refreshVisibleViewAfterPull() {
    const activeTab = getActiveTabId();
    if (activeTab === 'lager') renderLager();
    if (activeTab === 'statistik') renderStats();
    if (activeTab === 'trace-export') renderTraceExportInputs();
    if (activeTab === 'log') renderLogs();
    if (activeTab === 'nachbestellen') renderNachbestellen();
    if (activeTab === 'tools') initTools();
    if (activeTab === 'logbuch') renderLogBook();
    if (activeTab === 'einstellungen') {
        renderCustomProductSettings();
        renderCustomContainers();
        renderProductVisibilitySettings();
        renderSharedOwnerVisibilitySettings();
        renderCloudShareOverview();
        renderWarehouseEventLog();
        renderSupabaseSyncSettings();
    }
    updateWarehouseUI();
}

document.addEventListener('touchstart', (e) => {
    if (isPullRefreshing || e.touches.length !== 1 || shouldIgnorePullToRefreshTarget(e.target)) return;
    if (window.scrollY <= 0) {
        pullStartY = e.touches[0].clientY;
        isPulling = true;
        pullDistance = 0;
    }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!isPulling || isPullRefreshing || e.touches.length !== 1) return;
    pullDistance = e.touches[0].clientY - pullStartY;
    if (pullDistance > 0 && window.scrollY <= 0) {
        const easedDistance = Math.min(pullDistance, PULL_REFRESH_MAX);
        const progress = easedDistance / PULL_REFRESH_THRESHOLD;
        e.preventDefault();
        document.body.style.transform = `translateY(${Math.min(easedDistance * 0.22, 34)}px)`;
        setPullToRefreshIndicator(progress);
    }
}, { passive: false });

document.addEventListener('touchend', () => {
    if (!isPulling) return;
    if (pullDistance >= PULL_REFRESH_THRESHOLD) {
        triggerRefresh();
    } else {
        setPullToRefreshIndicator(0);
    }
    document.body.style.transform = '';
    isPulling = false;
    pullDistance = 0;
}, { passive: true });

document.addEventListener('touchcancel', () => {
    document.body.style.transform = '';
    setPullToRefreshIndicator(0);
    isPulling = false;
    pullDistance = 0;
}, { passive: true });

async function triggerRefresh() {
    if (isPullRefreshing) return;
    isPullRefreshing = true;
    setPullToRefreshIndicator(1, true);
    showToast('Aktualisiere Lager & Version...', 'info', 2200);
    hapticFeedback();
    let syncOk = true;
    try {
        await syncPullWarehouses(false);
    } catch (err) {
        syncOk = false;
        updateSyncStatus('Daten Download fehlgeschlagen: ' + err.message, 'warn');
    }
    try {
        await checkForAppUpdate(false);
    } catch (err) {}
    refreshVisibleViewAfterPull();
    launchConfetti(36);
    setTimeout(() => {
        showToast(syncOk ? 'Aktualisiert!' : 'Lokal aktualisiert. Cloud-Download prüfen.', syncOk ? 'success' : 'warning', 2600);
    }, 250);
    setTimeout(() => {
        isPullRefreshing = false;
        setPullToRefreshIndicator(0);
    }, 650);
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
    
    const tabs = getMenuOrder();
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
    preview.setAttribute('role', 'dialog');
    preview.setAttribute('aria-modal', 'true');
    preview.setAttribute('aria-label', `Schnellansicht ${item}`);
    preview.innerHTML = `
        <div class="quick-preview-header">
            <h3>${escapeHtml(item)}</h3>
            <button class="quick-preview-close" onclick="closeQuickPreview()" aria-label="Schnellansicht schließen">&times;</button>
        </div>
        <div class="quick-preview-stockline">
            <span class="stock">${escapeHtml(formatItemAmount(item, stock))}</span>
            <span>${escapeHtml(category)}</span>
        </div>
        <div class="quick-preview-metrics">
            <div>
                <small>Warnschwelle</small>
                <strong>${escapeHtml(threshold)} ${escapeHtml(getUnitLabel(getItemUnit(item)))}</strong>
            </div>
            <div>
                <small>Reichweite</small>
                <strong>${escapeHtml(weeksLeft !== null ? weeksLeft + ' Wochen' : '—')}</strong>
            </div>
        </div>
        <div class="quick-preview-actions">
            <button class="btn-in btn-animated" data-quick-action="in">Einlagern</button>
            <button class="btn-out btn-animated" data-quick-action="out">Auslagern</button>
        </div>
    `;
    preview.querySelectorAll('[data-quick-action]').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.quickAction;
            closeQuickPreview();
            openModalForItem(item, category, action);
        });
    });
    
    document.body.appendChild(backdrop);
    document.body.appendChild(preview);
    acquireBodyScrollLock('quick-preview');
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
    releaseBodyScrollLock('quick-preview');
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
