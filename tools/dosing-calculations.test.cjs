const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateDoseAdjustment, calculateConcentrationSolution, calculatePowderSolution, solutionStrength } = require('../assets/js/dosing-calculations.js');

const kh = { id: 'kh', element: 'KH', name: 'KH-Lösung', referenceMl: 10, referenceLiters: 100, increase: 0.5 };
const ca = { id: 'ca', element: 'Ca', name: 'Ca-Lösung', referenceMl: 10, referenceLiters: 100, increase: 11 };
const sample = (at, value, dose, solution = kh, extra = {}) => ({ at, value, doseMlPerDay: dose, solution, volumeLiters: 100, ...extra });
const measurements = [sample('2026-10-01T12:00:00Z', 7.5, 10), sample('2026-10-03T12:00:00Z', 7.3, 10)];
const calculate = (overrides = {}) => calculateDoseAdjustment({
    product: 'kh', solution: kh, volumeLiters: 100, measurements,
    targetValue: 7.5, targetDays: 10, maxChangePercent: 10, ...overrides
});
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

test('Verbrauch berücksichtigt laufende Dosierung; der nächste Wert bleibt im Prozentlimit', () => {
    const result = calculate();
    near(result.consumptionPerDay, 0.6);
    near(result.uncappedDoseMl, 12.4);
    near(result.nextDoseMl, 11);
    near(result.doseChangePercent, 10);
});

test('Herstellerunabhängige Calcium-Lösung erhält keinen erfundenen Ca-2-Zusatz', () => {
    const result = calculate({ product: 'ca', solution: ca, targetValue: 420, mode: 'immediate-stabilize',
        measurements: [sample('2026-10-01', 400, 10, ca), sample('2026-10-03', 398, 10, ca)] });
    near(result.consumptionPerDay, 12);
    near(result.correctionMl, 20);
    assert.equal(result.pairedCorrectionMl, null);
    assert.equal(result.pairedDoseMl, null);
});

test('Ungleich lange Intervalle verwenden ihre jeweilige Lösungskonzentration', () => {
    const strong = { ...kh, id: 'strong', increase: 1 };
    const result = calculate({ solution: strong, targetValue: 6.85, mode: 'immediate-stabilize', measurements: [
        sample('2026-10-01', 7, 10), sample('2026-10-02', 6.9, 10), sample('2026-10-04', 6.85, 5, strong)
    ] });
    near(result.consumptionPerDay, 0.55);
    near(result.nextDoseMl, 5.5);
    assert.equal(result.intervalDays, 3);
});

test('Einmalzugaben werden nicht als geringerer Verbrauch fehlinterpretiert', () => {
    const result = calculate({ targetValue: 8.5, measurements: [
        sample('2026-10-01', 7.5, 10), sample('2026-10-03', 8.5, 10, kh, { correctionMl: 20 })
    ] });
    near(result.consumptionPerDay, 0.5);
    near(result.nextDoseMl, 10);
});

test('Ein Lösungswechsel rechnet die Prozentbasis auf die neue Konzentration um', () => {
    const weak = { ...kh, id: 'weak', increase: 0.25 };
    const result = calculate({ targetValue: 7.5, measurements: [
        sample('2026-10-01', 7.5, 10, weak), sample('2026-10-03', 7.5, 10, weak)
    ] });
    near(result.currentDoseMl, 5);
    near(result.nextDoseMl, 5);
    assert.equal(result.convertedDose, true);
});

test('Ein anderes aktuelles Aquariumvolumen überschreibt keine historischen Intervalle', () => {
    const result = calculate({ volumeLiters: 200, targetValue: 7.3, mode: 'immediate-stabilize', maxChangePercent: 100 });
    near(result.consumptionPerDay, 0.6);
    near(result.currentDoseMl, 20);
    near(result.nextDoseMl, 24);
});

test('Sofortausgleich und schrittweise Annäherung werden getrennt berechnet', () => {
    const gradual = calculate({ maxChangePercent: 100 });
    const immediate = calculate({ mode: 'immediate-stabilize', maxChangePercent: 100 });
    near(gradual.nextDoseMl, 12.4);
    assert.equal(gradual.correctionMl, null);
    near(immediate.nextDoseMl, 12);
    near(immediate.correctionMl, 4);
});

test('Eigene Referenzwerte werden unabhängig vom Referenzvolumen normalisiert', () => {
    near(solutionStrength({ ...kh, referenceMl: 40, referenceLiters: 400 }, 'kh'), 0.05);
    near(solutionStrength(ca, 'ca'), 1.1);
});

test('Pulverlösung benötigt das fertige Endvolumen und die richtige Hydratform', () => {
    const input = { product: 'kh', powderGrams: 420, molarMass: 84.0066, equivalents: 1 };
    assert.throws(() => calculatePowderSolution({ ...input, finalVolumeMl: '' }), /Lösungsvolumen/);
    const five = calculatePowderSolution({ ...input, finalVolumeMl: 5000 });
    const six = calculatePowderSolution({ ...input, finalVolumeMl: 6000 });
    near(five.increase / six.increase, 1.2);
    const calcium = calculatePowderSolution({ product: 'ca', powderGrams: 358, finalVolumeMl: 5200, elementFraction: 40.078 / 147.014 });
    near(calcium.increase, 358 / 5200 * (40.078 / 147.014) * 10);
    assert.throws(() => calculatePowderSolution({ product: 'ca', powderGrams: 358, finalVolumeMl: 5200 }), /Massenanteil/);
});

test('Wirkstoffkonzentrationen werden aus elementarem Calcium oder Alkalinität berechnet', () => {
    near(calculateConcentrationSolution({ product: 'ca', concentration: '100' }).increase, 1);
    near(calculateConcentrationSolution({ product: 'kh', concentration: '0,8925' }).increase, 0.025);
    near(calculateConcentrationSolution({ product: 'kh', concentration: '1' }).increase, 1 / 35.7);
    for (const concentration of ['', 0, -1, 'invalid', Infinity]) {
        assert.throws(() => calculateConcentrationSolution({ product: 'ca', concentration }));
    }
    assert.throws(() => calculateConcentrationSolution({ product: 'mg', concentration: 1 }), /Unbekannter/);
});

test('Eigene Pulveransätze berücksichtigen Reinheit und Hydratform', () => {
    const recipe = { product: 'ca', powderGrams: 367, finalVolumeMl: 1000, elementFraction: 40.078 / 147.014 };
    const pure = calculatePowderSolution(recipe);
    const diluted = calculatePowderSolution({ ...recipe, purityPercent: 95 });
    near(pure.increase, 367 * (40.078 / 147.014) / 100);
    near(diluted.increase, pure.increase * 0.95);
    near(calculateConcentrationSolution({ product: 'ca', concentration: 367 * 40.078 / 147.014 }).increase, pure.increase);
    const anhydrous = calculatePowderSolution({ ...recipe, elementFraction: 40.078 / 110.984 });
    assert.ok(anhydrous.increase > pure.increase);
    for (const purityPercent of ['', 0, -1, 101, Infinity]) {
        assert.throws(() => calculatePowderSolution({ ...recipe, purityPercent }));
    }
});

test('Carbonat und Hydrogencarbonat liefern die richtigen Alkalinitätsäquivalente', () => {
    const bicarbonate = calculatePowderSolution({ product: 'kh', powderGrams: 84.0066,
        finalVolumeMl: 1000, molarMass: 84.0066, equivalents: 1 });
    const carbonate = calculatePowderSolution({ product: 'kh', powderGrams: 105.9888,
        finalVolumeMl: 1000, molarMass: 105.9888, equivalents: 2 });
    near(bicarbonate.increase, 1 / 35.7);
    near(carbonate.increase, 2 / 35.7);
});

test('Leere oder unpassende Daten ergeben keine scheinbar gültigen Dosierwerte', () => {
    assert.throws(() => calculate({ solution: ca }), /passt nicht/);
    assert.throws(() => calculate({ volumeLiters: 0 }), /größer/);
    assert.throws(() => calculate({ maxChangePercent: 101 }), /100/);
    assert.throws(() => calculate({ targetValue: '' }), /fehlt/);
    assert.throws(() => calculate({ measurements: [] }), /zwei/);
    assert.throws(() => calculate({ measurements: [measurements[0], { ...measurements[1], value: '' }] }), /fehlt/);
    assert.throws(() => calculate({ measurements: [measurements[0], { ...measurements[1], solution: null }] }), /passt nicht/);
    assert.throws(() => calculate({ measurements: [measurements[0], { ...measurements[1], at: measurements[0].at }] }), /Zeitpunkte/);
    assert.throws(() => calculate({ measurements: [measurements[0], { ...measurements[1], at: 'invalid' }] }), /Zeitpunkte/);
    assert.throws(() => calculate({ measurements: [measurements[0], { ...measurements[1], doseMlPerDay: '' }] }), /fehlt/);
});

test('Null-Dosis, Null-Prozentlimit und Absenkung des Ziels werden explizit behandelt', () => {
    near(calculate({ maxChangePercent: 0 }).nextDoseMl, 10);
    const zero = [sample('2026-10-01', 7.5, 0), sample('2026-10-03', 7.3, 0)];
    assert.throws(() => calculate({ measurements: zero }), /0 ml/);
    assert.ok(calculate({ targetValue: 6, maxChangePercent: 100 }).nextDoseMl < 10);
    assert.throws(() => calculate({ targetValue: 6, mode: 'immediate-stabilize' }), /mindestens/);
});

test('Negative rechnerische Verbräuche werden als nicht belastbar markiert', () => {
    const result = calculate({ measurements: [sample('2026-10-01', 7, 10), sample('2026-10-03', 9, 10)] });
    assert.equal(result.negativeConsumption, true);
});

test('Referenzmatrix für OSCI, Fauna, SANGOKAI und Balling bei drei Aquariumvolumen', () => {
    const solutions = [
        { product: 'kh', solution: { ...kh, id: 'osci-kh-tag' } },
        { product: 'kh', solution: { ...kh, id: 'osci-kh-nacht', increase: 1 } },
        { product: 'kh', solution: { ...kh, id: 'fauna-kh' } },
        { product: 'kh', solution: { ...kh, id: 'sangokai-kh', referenceMl: 40, increase: 1 } },
        { product: 'ca', solution: { ...ca, id: 'osci-ca', referenceMl: 1, increase: 1 } },
        { product: 'ca', solution: { ...ca, id: 'fauna-ca' } },
        { product: 'ca', solution: { ...ca, id: 'sangokai-ca', referenceMl: 2.5, increase: 1, pairedProductName: 'Ca-2' } },
        { product: 'ca', solution: { ...ca, id: 'custom-calcium-solution', increase: 10 } }
    ];
    for (const { product, solution } of solutions) {
        for (const volumeLiters of [100, 770, 1000]) {
            const before = product === 'kh' ? 7.5 : 420;
            const decrease = product === 'kh' ? 0.5 : 4;
            const effect = solution.increase / solution.referenceMl * 100 / volumeLiters;
            const result = calculate({ product, solution, volumeLiters, targetValue: before,
                maxChangePercent: 100, measurements: [
                    sample('2026-10-01', before, 10, solution, { volumeLiters }),
                    sample('2026-10-03', before - decrease, 10, solution, { volumeLiters })
                ] });
            near(result.consumptionPerDay, 10 * effect + decrease / 2);
            near(result.uncappedDoseMl, 10 + (decrease / 2 + decrease / 10) / effect);
            near(result.nextDoseMl, Math.min(20, result.uncappedDoseMl));
        }
    }
});
