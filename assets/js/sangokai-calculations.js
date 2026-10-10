(function (root) {
    const rules = {
        kh: {
            id: 'sangokai-balance-kh-v1',
            productVersion: 'laut aktueller Herstellerseite',
            verifiedAt: '2026-10-08',
            mlPer100LitersPerDkh: 40,
            sourceUrl: 'https://sangokai.org/?page_id=5163'
        },
        ca: {
            id: 'sangokai-balance-ca1-v1',
            productVersion: 'laut aktueller Herstellerseite',
            verifiedAt: '2026-10-08',
            mlPer100LitersPerMgL: 2.5,
            pairedProductName: 'sango chem-balance Ca-2',
            sourceUrl: 'https://sangokai.org/?page_id=5133',
            pairedSourceUrl: 'https://sangokai.org/?page_id=5144'
        },
        dilution: {
            verifiedAt: '2026-10-08',
            sourceUrl: 'https://sangokai.org/?page_id=5802',
            khProductUrl: 'https://sangokai.org/sangokai-shop/?product=sango-chem-balance-kh',
            ca1ProductUrl: 'https://sangokai.org/sangokai-shop/?product=sango-chem-balance-ca-1-1000-ml',
            ca2ProductUrl: 'https://sangokai.org/sangokai-shop/?product=sango-chem-balance-ca-2-1000-ml'
        }
    };

    function positiveNumber(value, label) {
        if (String(value ?? '').trim() === '') throw new Error(`${label} fehlt.`);
        const number = Number(String(value ?? '').replace(',', '.'));
        if (!Number.isFinite(number) || number <= 0) throw new Error(`${label} muss größer als 0 sein.`);
        return number;
    }

    function calculateBalanceQuantity({ product, volumeLiters, currentValue, targetValue }) {
        const volume = positiveNumber(volumeLiters, 'Aquariumvolumen');
        if (String(currentValue ?? '').trim() === '') throw new Error('Der Istwert fehlt.');
        if (String(targetValue ?? '').trim() === '') throw new Error('Der Zielwert fehlt.');
        const current = Number(String(currentValue).replace(',', '.'));
        const target = Number(String(targetValue).replace(',', '.'));
        if (!Number.isFinite(current) || current < 0) throw new Error('Der Istwert muss eine gültige Zahl ab 0 sein.');
        if (!Number.isFinite(target) || target < 0) throw new Error('Der Zielwert muss eine gültige Zahl ab 0 sein.');
        if (target < current) throw new Error('Diese Produktwirkung berechnet eine Erhöhung. Der Zielwert muss mindestens dem Istwert entsprechen.');

        const increase = target - current;
        if (product === 'kh') return { product, rule: rules.kh, increase, primaryMl: increase * volume / 100 * rules.kh.mlPer100LitersPerDkh, pairedMl: null };
        if (product === 'ca') {
            const amount = increase * volume / 100 * rules.ca.mlPer100LitersPerMgL;
            return { product, rule: rules.ca, increase, primaryMl: amount, pairedMl: amount };
        }
        throw new Error('Unbekannte BALANCE-Berechnung.');
    }

    function calculateBalanceWorkingSolution({ finalVolumeMl, concentrateFactor, product = 'ca-1', packages = 1 }) {
        if (product === 'kh') {
            const count = positiveNumber(packages, 'Anzahl der KH-Gebinde');
            if (!Number.isInteger(count)) throw new Error('Für BALANCE KH bitte ganze Gebinde ansetzen.');
            return {
                product,
                packageCount: count,
                packageSizeMl: 1000,
                finalVolumeMl: count * 10000,
                powderLabel: `${count} vollständige(s) 1000-mL-Gebinde`,
                waterInstruction: `Pulver vollständig auflösen und mit Osmosewasser auf insgesamt ${count * 10} L auffüllen.`,
                rule: rules.dilution
            };
        }
        const finalVolume = positiveNumber(finalVolumeMl, 'Zielvolumen');
        const factor = positiveNumber(concentrateFactor, 'Verdünnungsfaktor');
        if (factor < 1) throw new Error('Der Verdünnungsfaktor muss mindestens 1 sein.');
        const concentrateMl = finalVolume / factor;
        if (!['ca-1', 'ca-2'].includes(product)) throw new Error('Unbekanntes BALANCE-Produkt.');
        return { product, finalVolumeMl: finalVolume, concentrateMl, waterMl: finalVolume - concentrateMl, rule: rules.dilution };
    }

    function calculateBalanceDoseAdjustment({ product, volumeLiters, measurements, targetValue, targetDays, maxChangePercent, mode = 'gradual' }) {
        const calculator = root.DosingCalculations || (typeof require === 'function' ? require('./dosing-calculations.js') : null);
        if (!calculator) throw new Error('Der Tagesdosis-Rechner konnte nicht geladen werden.');
        const solution = {
            id: `sangokai-${product}`, element: product === 'kh' ? 'KH' : 'Ca',
            referenceMl: product === 'kh' ? rules.kh.mlPer100LitersPerDkh : rules.ca.mlPer100LitersPerMgL,
            referenceLiters: 100, increase: 1,
            pairedProductName: product === 'ca' ? rules.ca.pairedProductName : null
        };
        return calculator.calculateDoseAdjustment({
            product, volumeLiters, solution, targetValue, targetDays, maxChangePercent, mode,
            measurements: Array.isArray(measurements) ? measurements.map(entry => ({ ...entry, solution: entry.solution || solution })) : measurements
        });
    }

    const api = { rules, calculateBalanceQuantity, calculateBalanceWorkingSolution, calculateBalanceDoseAdjustment };
    root.SangokaiCalculations = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
