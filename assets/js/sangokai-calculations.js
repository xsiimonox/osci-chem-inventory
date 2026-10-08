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
        const volume = positiveNumber(volumeLiters, 'Aquariumvolumen');
        if (!['kh', 'ca'].includes(product)) throw new Error('Unbekannter BALANCE-Messwert.');
        if (!Array.isArray(measurements) || measurements.length < 2) throw new Error('Mindestens zwei Messungen werden benötigt.');
        if (String(targetValue ?? '').trim() === '') throw new Error('Der Zielwert fehlt.');
        if (String(maxChangePercent ?? '').trim() === '') throw new Error('Das Änderungsmaximum fehlt.');
        const target = Number(String(targetValue ?? '').replace(',', '.'));
        const daysToTarget = positiveNumber(targetDays, 'Zeitraum bis zum Ziel');
        const maxChange = Number(String(maxChangePercent ?? '').replace(',', '.'));
        if (!Number.isFinite(target) || target < 0) throw new Error('Bitte einen gültigen Zielwert ab 0 eintragen.');
        if (!Number.isFinite(maxChange) || maxChange < 0 || maxChange > 100) throw new Error('Das Änderungsmaximum muss zwischen 0 und 100 % liegen.');
        if (!['gradual', 'immediate-stabilize'].includes(mode)) throw new Error('Unbekannter Weg zum Zielwert.');

        const entries = measurements.slice().sort((a, b) => new Date(a.at) - new Date(b.at));
        const effectPerMl = product === 'kh' ? 100 / (40 * volume) : 100 / (2.5 * volume);
        let weightedConsumption = 0;
        let totalObservedChange = 0;
        let totalDays = 0;
        for (let index = 1; index < entries.length; index++) {
            const previous = entries[index - 1];
            const current = entries[index];
            const elapsedDays = (new Date(current.at) - new Date(previous.at)) / 86400000;
            const valueBefore = Number(previous.value);
            const valueAfter = Number(current.value);
            const intervalDose = Number(current.doseMlPerDay);
            if (!Number.isFinite(elapsedDays) || elapsedDays <= 0) throw new Error('Die Messungen müssen unterschiedliche, gültige Zeitpunkte haben.');
            if (![valueBefore, valueAfter, intervalDose].every(Number.isFinite) || valueBefore < 0 || valueAfter < 0 || intervalDose < 0) {
                throw new Error('Messwerte und Tagesdosis müssen gültige Zahlen ab 0 sein.');
            }
            const observedChangePerDay = (valueAfter - valueBefore) / elapsedDays;
            const consumptionPerDay = intervalDose * effectPerMl - observedChangePerDay;
            weightedConsumption += consumptionPerDay * elapsedDays;
            totalObservedChange += valueAfter - valueBefore;
            totalDays += elapsedDays;
        }

        const consumptionPerDay = weightedConsumption / totalDays;
        const latest = entries[entries.length - 1];
        const currentDoseMl = Number(latest.doseMlPerDay);
        if (!Number.isFinite(currentDoseMl) || currentDoseMl < 0) throw new Error('Die letzte Tagesdosis muss gültig und mindestens 0 sein.');
        const desiredChangePerDay = mode === 'gradual' ? (target - Number(latest.value)) / daysToTarget : 0;
        const uncappedDoseMl = Math.max(0, (consumptionPerDay + desiredChangePerDay) / effectPerMl);
        if (currentDoseMl === 0 && uncappedDoseMl > 0 && maxChange > 0) {
            throw new Error('Ein prozentuales Limit ist bei 0 ml/Tag nicht berechenbar. Erfasse zuerst eine positive Ausgangsdosis.');
        }
        const minimumDoseMl = currentDoseMl * (1 - maxChange / 100);
        const maximumDoseMl = currentDoseMl * (1 + maxChange / 100);
        const nextDoseMl = Math.min(maximumDoseMl, Math.max(minimumDoseMl, uncappedDoseMl));
        const correction = mode === 'immediate-stabilize'
            ? calculateBalanceQuantity({ product, volumeLiters: volume, currentValue: latest.value, targetValue: target })
            : null;
        return {
            product,
            mode,
            measurementCount: entries.length,
            intervalDays: totalDays,
            effectPerMl,
            consumptionPerDay,
            observedChangePerDay: totalObservedChange / totalDays,
            desiredChangePerDay,
            currentDoseMl,
            uncappedDoseMl,
            nextDoseMl,
            correctionMl: correction?.primaryMl ?? null,
            pairedCorrectionMl: correction?.pairedMl ?? null,
            doseChangePercent: currentDoseMl > 0 ? ((nextDoseMl - currentDoseMl) / currentDoseMl) * 100 : 0,
            targetValue: target,
            latestValue: Number(latest.value),
            targetDays: daysToTarget,
            maxChangePercent: maxChange
        };
    }

    const api = { rules, calculateBalanceQuantity, calculateBalanceWorkingSolution, calculateBalanceDoseAdjustment };
    root.SangokaiCalculations = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
