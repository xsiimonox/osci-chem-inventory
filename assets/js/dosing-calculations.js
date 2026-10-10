(function (root) {
    function number(value, label, minimum = 0) {
        if (String(value ?? '').trim() === '') throw new Error(`${label} fehlt.`);
        const parsed = Number(String(value).replace(',', '.'));
        if (!Number.isFinite(parsed) || parsed < minimum) throw new Error(`${label} ist ungültig.`);
        return parsed;
    }

    function positive(value, label) {
        const parsed = number(value, label);
        if (parsed <= 0) throw new Error(`${label} muss größer als 0 sein.`);
        return parsed;
    }

    function solutionStrength(solution, product) {
        if (!solution || solution.element !== (product === 'kh' ? 'KH' : 'Ca')) {
            throw new Error('Die Lösung passt nicht zum Messwert.');
        }
        return positive(solution.increase, 'Produktwirkung')
            / positive(solution.referenceMl, 'Referenzmenge')
            * positive(solution.referenceLiters, 'Referenzvolumen') / 100;
    }

    function calculateConcentrationSolution({ product, concentration }) {
        const amount = positive(concentration, 'Wirkstoffkonzentration');
        if (!['kh', 'ca'].includes(product)) throw new Error('Unbekannter Messwert.');
        const increase = product === 'kh' ? amount / (100 * 0.357) : amount / 100;
        return { element: product === 'kh' ? 'KH' : 'Ca', referenceMl: 1, referenceLiters: 100,
            increase: positive(increase, 'Produktwirkung') };
    }

    function calculatePowderSolution({ product, powderGrams, finalVolumeMl, molarMass, equivalents, elementFraction, purityPercent = 100 }) {
        const purity = positive(purityPercent, 'Reinheit');
        if (purity > 100) throw new Error('Die Reinheit darf höchstens 100 % sein.');
        const grams = positive(powderGrams, 'Pulvermenge') * purity / 100;
        const volume = positive(finalVolumeMl, 'Fertiges Lösungsvolumen');
        let increase;
        if (product === 'kh') {
            const gramsPerLiterPerDkh = 0.357 * positive(molarMass, 'Molare Masse')
                / positive(equivalents, 'Äquivalente') / 1000;
            increase = (grams / volume) / (100 * gramsPerLiterPerDkh);
        } else if (product === 'ca') {
            const fraction = positive(elementFraction, 'Calcium-Massenanteil');
            if (fraction > 1) throw new Error('Der Calcium-Massenanteil darf höchstens 1 sein.');
            increase = grams / volume * fraction * 1000 / 100;
        } else {
            throw new Error('Unbekannter Messwert.');
        }
        return { element: product === 'kh' ? 'KH' : 'Ca', referenceMl: 1, referenceLiters: 100,
            increase: positive(increase, 'Produktwirkung') };
    }

    function calculateDoseAdjustment({ product, solution, volumeLiters, measurements, targetValue, targetDays, maxChangePercent, mode = 'gradual' }) {
        if (!['kh', 'ca'].includes(product)) throw new Error('Unbekannter Messwert.');
        const volume = positive(volumeLiters, 'Aquariumvolumen');
        const effectPerMl = solutionStrength(solution, product) * 100 / volume;
        const target = number(targetValue, 'Zielwert');
        const daysToTarget = positive(targetDays, 'Zeitraum bis zum Ziel');
        const maxChange = number(maxChangePercent, 'Änderungsmaximum');
        if (maxChange > 100) throw new Error('Das Änderungsmaximum muss zwischen 0 und 100 % liegen.');
        if (!['gradual', 'immediate-stabilize'].includes(mode)) throw new Error('Unbekannter Weg zum Zielwert.');
        if (!Array.isArray(measurements) || measurements.length < 2) throw new Error('Mindestens zwei Messungen werden benötigt.');

        const entries = measurements.slice().sort((a, b) => new Date(a.at) - new Date(b.at));
        let consumptionTotal = 0;
        let observedChangeTotal = 0;
        let intervalDays = 0;
        // Each interval uses the solution and tank volume recorded at its end.
        for (let index = 1; index < entries.length; index++) {
            const previous = entries[index - 1];
            const current = entries[index];
            const days = (new Date(current.at) - new Date(previous.at)) / 86400000;
            if (!Number.isFinite(days) || days <= 0) throw new Error('Die Messungen müssen unterschiedliche, gültige Zeitpunkte haben.');
            const before = number(previous.value, 'Messwert');
            const after = number(current.value, 'Messwert');
            const dose = number(current.doseMlPerDay, 'Tagesdosis');
            const additions = number(current.correctionMl ?? 0, 'Einmalzugaben');
            const recordedVolume = positive(current.volumeLiters ?? volume, 'Aquariumvolumen im Messzeitraum');
            const recordedEffect = solutionStrength(current.solution, product) * 100 / recordedVolume;
            consumptionTotal += (dose * days + additions) * recordedEffect - (after - before);
            observedChangeTotal += after - before;
            intervalDays += days;
        }

        const latest = entries[entries.length - 1];
        const latestValue = number(latest.value, 'Letzter Messwert');
        const latestEffect = solutionStrength(latest.solution, product) * 100
            / positive(latest.volumeLiters ?? volume, 'Aquariumvolumen im Messzeitraum');
        const currentDoseMl = number(latest.doseMlPerDay, 'Letzte Tagesdosis') * latestEffect / effectPerMl;
        const consumptionPerDay = consumptionTotal / intervalDays;
        const desiredChangePerDay = mode === 'gradual' ? (target - latestValue) / daysToTarget : 0;
        const uncappedDoseMl = Math.max(0, (consumptionPerDay + desiredChangePerDay) / effectPerMl);
        if (currentDoseMl === 0 && uncappedDoseMl > 0 && maxChange > 0) {
            throw new Error('Ein Prozentlimit kann eine Tagesdosis von 0 ml nicht erhöhen. Erfasse eine positive Ausgangsdosis.');
        }
        if (mode === 'immediate-stabilize' && target < latestValue) {
            throw new Error('Diese Produktwirkung berechnet eine Erhöhung. Der Zielwert muss mindestens dem Istwert entsprechen.');
        }
        const nextDoseMl = Math.min(currentDoseMl * (1 + maxChange / 100),
            Math.max(currentDoseMl * (1 - maxChange / 100), uncappedDoseMl));
        const correctionMl = mode === 'immediate-stabilize' ? (target - latestValue) / effectPerMl : null;
        return {
            product, mode, effectPerMl, consumptionPerDay, currentDoseMl, desiredChangePerDay,
            uncappedDoseMl, nextDoseMl, correctionMl,
            pairedCorrectionMl: correctionMl !== null && solution.pairedProductName ? correctionMl : null,
            pairedDoseMl: solution.pairedProductName ? nextDoseMl : null,
            measurementCount: entries.length, intervalDays,
            observedChangePerDay: observedChangeTotal / intervalDays,
            doseChangePercent: currentDoseMl > 0 ? (nextDoseMl - currentDoseMl) / currentDoseMl * 100 : 0,
            latestValue, targetValue: target, targetDays: daysToTarget, maxChangePercent: maxChange,
            negativeConsumption: consumptionPerDay < -0.000001,
            convertedDose: latest.solution.id !== solution.id || Math.abs(latestEffect - effectPerMl) > 0.0000001
        };
    }

    const api = { solutionStrength, calculateConcentrationSolution, calculatePowderSolution, calculateDoseAdjustment };
    root.DosingCalculations = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
