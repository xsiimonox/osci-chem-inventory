const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateBalanceQuantity, calculateBalanceWorkingSolution, calculateBalanceDoseAdjustment } = require('../assets/js/sangokai-calculations.js');

test('KH-Mengenberechnung skaliert linear mit Volumen und KH-Differenz', () => {
    assert.equal(calculateBalanceQuantity({ product: 'kh', volumeLiters: 100, currentValue: 7, targetValue: 7.5 }).primaryMl, 20);
    assert.equal(calculateBalanceQuantity({ product: 'kh', volumeLiters: 800, currentValue: 7, targetValue: 8 }).primaryMl, 320);
});

test('Ca-1 und Ca-2 werden nach offizieller Vorgabe mengenidentisch berechnet', () => {
    const result = calculateBalanceQuantity({ product: 'ca', volumeLiters: 500, currentValue: 400, targetValue: 420 });
    assert.equal(result.primaryMl, 250);
    assert.equal(result.pairedMl, 250);
});

test('negative Erhöhung, ungültiges Volumen und unbekanntes Produkt werden abgewiesen', () => {
    assert.throws(() => calculateBalanceQuantity({ product: 'ca', volumeLiters: 0, currentValue: 1, targetValue: 2 }));
    assert.throws(() => calculateBalanceQuantity({ product: 'kh', volumeLiters: 100, currentValue: 8, targetValue: 7 }));
    assert.throws(() => calculateBalanceQuantity({ product: 'mg', volumeLiters: 100, currentValue: 1, targetValue: 2 }));
});

test('Konzentrat-/Wassermenge für einen bekannten Verdünnungsfaktor', () => {
    const result = calculateBalanceWorkingSolution({ finalVolumeMl: 5000, concentrateFactor: 5 });
    assert.equal(result.finalVolumeMl, 5000);
    assert.equal(result.concentrateMl, 1000);
    assert.equal(result.waterMl, 4000);
});

test('BALANCE KH Pulver wird gebindeweise auf 10 L Gebrauchslösung angesetzt', () => {
    const onePackage = calculateBalanceWorkingSolution({ product: 'kh', packages: 1 });
    assert.equal(onePackage.finalVolumeMl, 10000);
    const twoPackages = calculateBalanceWorkingSolution({ product: 'kh', packages: 2 });
    assert.equal(twoPackages.finalVolumeMl, 20000);
    assert.throws(() => calculateBalanceWorkingSolution({ product: 'kh', packages: 0.5 }));
});

test('BALANCE Ca-1 und Ca-2 werden getrennt als 5-fach Konzentrate berechnet', () => {
    for (const product of ['ca-1', 'ca-2']) {
        const result = calculateBalanceWorkingSolution({ product, finalVolumeMl: 5000, concentrateFactor: 5 });
        assert.equal(result.concentrateMl, 1000);
        assert.equal(result.waterMl, 4000);
    }
});

test('Tagesverbrauch berücksichtigt die im KH-Messintervall dosierte Menge', () => {
    const result = calculateBalanceDoseAdjustment({
        product: 'kh', volumeLiters: 100, targetValue: 7.4, targetDays: 10, maxChangePercent: 10,
        measurements: [
            { at: '2026-10-01T12:00:00.000Z', value: 7, doseMlPerDay: 10 },
            { at: '2026-10-05T12:00:00.000Z', value: 7.2, doseMlPerDay: 10 }
        ]
    });
    assert.ok(Math.abs(result.consumptionPerDay - 0.2) < 1e-10);
    assert.ok(Math.abs(result.uncappedDoseMl - 8.8) < 1e-10);
    assert.ok(Math.abs(result.nextDoseMl - 9) < 1e-10);
    assert.ok(Math.abs(result.doseChangePercent + 10) < 1e-10);
});

test('Tagesverbrauch berücksichtigt die Ca-Dosis und liefert denselben stabilen Zielwert', () => {
    const result = calculateBalanceDoseAdjustment({
        product: 'ca', volumeLiters: 100, targetValue: 405, targetDays: 20, maxChangePercent: 10,
        measurements: [
            { at: '2026-10-01T12:00:00.000Z', value: 400, doseMlPerDay: 2 },
            { at: '2026-10-06T12:00:00.000Z', value: 401, doseMlPerDay: 2 }
        ]
    });
    assert.ok(Math.abs(result.consumptionPerDay - 0.6) < 1e-10);
    assert.ok(Math.abs(result.uncappedDoseMl - 2) < 1e-10);
    assert.ok(Math.abs(result.nextDoseMl - 2) < 1e-10);
});

test('Sofortausgleich trennt Einmalmenge und stabilisierende Tagesdosis', () => {
    const result = calculateBalanceDoseAdjustment({
        product: 'kh', volumeLiters: 100, targetValue: 7.5, targetDays: 10, maxChangePercent: 10,
        mode: 'immediate-stabilize',
        measurements: [
            { at: '2026-10-01T12:00:00.000Z', value: 7, doseMlPerDay: 10 },
            { at: '2026-10-05T12:00:00.000Z', value: 7.2, doseMlPerDay: 10 }
        ]
    });
    assert.ok(Math.abs(result.correctionMl - 12) < 1e-10);
    assert.equal(result.pairedCorrectionMl, null);
    assert.ok(Math.abs(result.uncappedDoseMl - 8) < 1e-10);
    assert.ok(Math.abs(result.nextDoseMl - 9) < 1e-10);
    assert.equal(result.desiredChangePerDay, 0);
});

test('Sofortausgleich Ca berechnet gleiche Einmalmengen für Ca-1 und Ca-2', () => {
    const result = calculateBalanceDoseAdjustment({
        product: 'ca', volumeLiters: 100, targetValue: 420, targetDays: 10, maxChangePercent: 100,
        mode: 'immediate-stabilize',
        measurements: [
            { at: '2026-10-01T12:00:00.000Z', value: 400, doseMlPerDay: 2 },
            { at: '2026-10-06T12:00:00.000Z', value: 401, doseMlPerDay: 2 }
        ]
    });
    assert.equal(result.correctionMl, 47.5);
    assert.equal(result.pairedCorrectionMl, 47.5);
});

test('Einmaliger Ausgleich wird abgelehnt, wenn der Sollwert unter dem Messwert liegt', () => {
    assert.throws(() => calculateBalanceDoseAdjustment({
        product: 'kh', volumeLiters: 100, targetValue: 7, targetDays: 10, maxChangePercent: 10,
        mode: 'immediate-stabilize',
        measurements: [
            { at: '2026-10-01T12:00:00.000Z', value: 7.5, doseMlPerDay: 10 },
            { at: '2026-10-05T12:00:00.000Z', value: 7.4, doseMlPerDay: 10 }
        ]
    }), /mindestens dem Istwert entsprechen/);
});

test('Dosierabgleich verlangt mindestens zwei Messungen und begrenzt Prozentänderungen', () => {
    assert.throws(() => calculateBalanceDoseAdjustment({ product: 'kh', volumeLiters: 100, targetValue: 7.5, targetDays: 7, maxChangePercent: 10, measurements: [] }));
    assert.throws(() => calculateBalanceDoseAdjustment({ product: 'kh', volumeLiters: 100, targetValue: 7.5, targetDays: 7, maxChangePercent: 10, measurements: [{ at: '2026-10-01', value: 7, doseMlPerDay: 10 }] }));
});
