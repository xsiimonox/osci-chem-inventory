(function () {
    'use strict';

    const DEG = Math.PI / 180;

    function num(value, fallback = 0) {
        const parsed = Number(String(value ?? '').replace(',', '.'));
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function normalizeVector(vector) {
        const length = Math.hypot(vector.x, vector.y, vector.z) || 1;
        return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
    }

    function directionFromTilt(tiltXDeg = 0, tiltYDeg = 0) {
        const tx = num(tiltXDeg) * DEG;
        const ty = num(tiltYDeg) * DEG;
        return normalizeVector({
            x: Math.sin(tx),
            y: Math.sin(ty),
            z: Math.cos(tx) * Math.cos(ty)
        });
    }

    function beamExponent(beamAngleDeg = 90) {
        const halfAngle = clamp(num(beamAngleDeg, 90) / 2, 1, 89) * DEG;
        const cosine = Math.cos(halfAngle);
        return Math.log(0.5) / Math.log(cosine);
    }

    function rotateOffset(offset, tiltXDeg = 0, tiltYDeg = 0, yawDeg = 0) {
        const tx = num(tiltXDeg) * DEG;
        const ty = num(tiltYDeg) * DEG;
        const yaw = num(yawDeg) * DEG;
        let x = offset.x;
        let y = offset.y;
        let z = offset.z || 0;

        const x0 = x * Math.cos(yaw) - y * Math.sin(yaw);
        const y0 = x * Math.sin(yaw) + y * Math.cos(yaw);
        x = x0;
        y = y0;

        const y1 = y * Math.cos(tx) - z * Math.sin(tx);
        const z1 = y * Math.sin(tx) + z * Math.cos(tx);
        y = y1;
        z = z1;

        const x1 = x * Math.cos(ty) + z * Math.sin(ty);
        const z2 = -x * Math.sin(ty) + z * Math.cos(ty);
        x = x1;
        z = z2;

        return { x, y, z };
    }

    function getGroupScale(group, dimPercent) {
        const refPar = num(group.parRef ?? 0, 0);
        const refDistance = Math.max(1, num(group.refDistanceCm ?? 40, 40));
        const refDim = Math.max(1, num(group.refDimPercent ?? 100, 100));
        const watt = Math.max(0.01, num(group.watt, 1));
        const dimRatio = clamp(num(dimPercent, 100) / refDim, 0, 2);
        if (refPar > 0) return (refPar * refDistance * refDistance / watt) * dimRatio;
        return 18 * dimRatio;
    }

    function groupWorldPosition(lamp, group) {
        const offset = rotateOffset({
            x: num(group.x, 0),
            y: num(group.y, 0),
            z: 0
        }, lamp.tiltXDeg, lamp.tiltYDeg, lamp.rotationDeg);
        return {
            x: num(lamp.x, 0) + offset.x,
            y: num(lamp.y, 0) + offset.y,
            z: -Math.max(0, num(lamp.heightCm, 25)) + offset.z
        };
    }

    function contributionAtPoint(point, lamp, group, absorptionK) {
        const source = groupWorldPosition(lamp, group);
        const vector = {
            x: point.x - source.x,
            y: point.y - source.y,
            z: point.z - source.z
        };
        const pointDistance = Math.max(1, Math.hypot(vector.x, vector.y, vector.z));
        const sourceWidth = Math.max(0.5, num(group.sourceWidthCm ?? group.sourceDiameterCm ?? 6, 6));
        const sourceDepth = Math.max(0.5, num(group.sourceDepthCm ?? group.sourceDiameterCm ?? group.sourceWidthCm ?? 6, 6));
        const sourceRadius = Math.sqrt(sourceWidth * sourceDepth) / 2;
        const distance = Math.max(1, Math.hypot(pointDistance, sourceRadius));
        const toTarget = normalizeVector(vector);
        const axis = directionFromTilt(lamp.tiltXDeg, lamp.tiltYDeg);
        const cosTheta = clamp(axis.x * toTarget.x + axis.y * toTarget.y + axis.z * toTarget.z, 0, 1);
        if (cosTheta <= 0) return 0;
        const exponent = beamExponent(group.beamAngleDeg);
        const scale = getGroupScale(group, lamp.dimPercent);
        const watt = Math.max(0, num(group.watt, 0));
        const airDistance = Math.max(0, -source.z);
        const waterDistance = Math.max(0, distance - airDistance);
        const absorption = Math.exp(-Math.max(0, num(absorptionK, 0)) * waterDistance);
        return scale * watt * Math.pow(cosTheta, exponent) / (distance * distance) * absorption;
    }

    function parAtPoint(point, setup) {
        const lamps = Array.isArray(setup.lamps) ? setup.lamps : [];
        const absorptionK = num(setup.tank?.absorptionK, 0.006);
        return lamps.reduce((sum, lamp) => {
            const groups = Array.isArray(lamp.groups) ? lamp.groups : [];
            return sum + groups.reduce((lampSum, group) => lampSum + contributionAtPoint(point, lamp, group, absorptionK), 0);
        }, 0);
    }

    function buildGrid(setup, mode = 'top') {
        const tank = setup.tank || {};
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const height = Math.max(10, num(tank.waterHeightCm, 55));
        const resolution = clamp(num(tank.resolutionCm, 10), 5, 25);
        const rows = [];
        const values = [];
        let max = 1;
        let min = Infinity;

        const axisSamples = (maximum, step) => {
            const samples = [];
            for (let value = 0; value < maximum; value += step) samples.push(value);
            if (!samples.length || Math.abs(samples[samples.length - 1] - maximum) > 0.01) samples.push(maximum);
            return samples;
        };
        const xSamples = axisSamples(length, resolution);

        if (mode === 'side') {
            const y = width / 2;
            const zSamples = axisSamples(height, resolution);
            zSamples.forEach(z => {
                const row = [];
                xSamples.forEach(x => {
                    const value = parAtPoint({ x, y, z }, setup);
                    row.push(value);
                    values.push(value);
                    max = Math.max(max, value);
                    min = Math.min(min, value);
                });
                rows.push(row);
            });
            return { mode, rows, values, min: Number.isFinite(min) ? min : 0, max, xMax: length, yMax: height };
        }

        const z = clamp(num(tank.sliceDepthCm, height * 0.55), 0, height);
        const ySamples = axisSamples(width, resolution);
        ySamples.forEach(y => {
            const row = [];
            xSamples.forEach(x => {
                const value = parAtPoint({ x, y, z }, setup);
                row.push(value);
                values.push(value);
                max = Math.max(max, value);
                min = Math.min(min, value);
            });
            rows.push(row);
        });
        return { mode, rows, values, min: Number.isFinite(min) ? min : 0, max, xMax: length, yMax: width, depth: z };
    }

    function evaluateCorals(setup) {
        const corals = Array.isArray(setup.corals) ? setup.corals : [];
        return corals.map(coral => {
            const par = parAtPoint({ x: num(coral.x), y: num(coral.y), z: num(coral.z) }, setup);
            const min = num(coral.minPar, 80);
            const max = num(coral.maxPar, 220);
            const status = par < min ? 'low' : par > max ? 'high' : 'ok';
            const distance = status === 'low' ? min - par : status === 'high' ? par - max : 0;
            return { ...coral, par, minPar: min, maxPar: max, status, distance };
        });
    }

    function percentile(sortedValues, fraction) {
        if (!sortedValues.length) return 0;
        const position = clamp(fraction, 0, 1) * (sortedValues.length - 1);
        const lower = Math.floor(position);
        const upper = Math.ceil(position);
        if (lower === upper) return sortedValues[lower];
        const weight = position - lower;
        return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
    }

    function analyzeGrid(grid) {
        const values = Array.isArray(grid?.values) ? grid.values.filter(Number.isFinite) : [];
        if (!values.length) {
            return { avg: 0, min: 0, max: 0, p10: 0, p50: 0, p90: 0, cv: 1, uniformityPercent: 0, coveragePercent: 0, qualityPercent: 0 };
        }
        const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
        const variance = values.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / values.length;
        const sorted = [...values].sort((a, b) => a - b);
        const p10 = percentile(sorted, 0.1);
        const p50 = percentile(sorted, 0.5);
        const p90 = percentile(sorted, 0.9);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const cv = avg > 0.000001 ? Math.sqrt(variance) / avg : 1;
        const uniformity = p90 > 0.000001 ? clamp(p10 / p90, 0, 1) : 0;
        const covered = avg > 0.000001
            ? values.filter(value => value >= avg * 0.55 && value <= avg * 1.6).length / values.length
            : 0;
        const minRatio = avg > 0.000001 ? clamp(min / avg, 0, 1) : 0;
        const quality = clamp(uniformity * 0.55 + covered * 0.3 + minRatio * 0.15, 0, 1);
        return {
            avg,
            min,
            max,
            p10,
            p50,
            p90,
            cv,
            uniformityPercent: uniformity * 100,
            coveragePercent: covered * 100,
            qualityPercent: quality * 100
        };
    }

    function buildOptimizationGrid(setup, depthCm) {
        const tank = setup.tank || {};
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const step = clamp(Math.min(5, Math.min(length, width) / 14), 2.5, 5);
        return buildGrid({
            ...setup,
            tank: { ...tank, resolutionCm: step, sliceDepthCm: depthCm }
        }, 'top');
    }

    function lampOverlapPenalty(lamps) {
        let penalty = 0;
        for (let first = 0; first < lamps.length; first += 1) {
            const a = lamps[first];
            const aExtents = lampHalfExtents(a);
            for (let second = first + 1; second < lamps.length; second += 1) {
                const b = lamps[second];
                const bExtents = lampHalfExtents(b);
                const overlapX = aExtents.halfX + bExtents.halfX - Math.abs(num(a.x) - num(b.x));
                const overlapY = aExtents.halfY + bExtents.halfY - Math.abs(num(a.y) - num(b.y));
                if (overlapX <= 0 || overlapY <= 0) continue;
                const overlapArea = overlapX * overlapY;
                const smallerArea = Math.max(1, Math.min(aExtents.halfX * aExtents.halfY * 4, bExtents.halfX * bExtents.halfY * 4));
                penalty += (overlapArea / smallerArea) * 10;
            }
        }
        return penalty;
    }

    function scoreSetup(setup) {
        const tank = setup.tank || {};
        const waterHeight = Math.max(10, num(tank.waterHeightCm, 55));
        const selectedDepth = clamp(num(tank.sliceDepthCm, waterHeight * 0.55), 0, waterHeight);
        const depths = [selectedDepth, waterHeight * 0.2, waterHeight * 0.55, waterHeight * 0.9]
            .filter((depth, index, all) => all.findIndex(item => Math.abs(item - depth) < 1) === index);
        let weightedScore = 0;
        let totalWeight = 0;
        depths.forEach(depth => {
            const metrics = analyzeGrid(buildOptimizationGrid(setup, depth));
            const avg = Math.max(0.000001, metrics.avg);
            const p10Ratio = clamp(metrics.p10 / avg, 0, 1);
            const minRatio = clamp(metrics.min / avg, 0, 1);
            const hotspotRatio = Math.max(0, metrics.p90 / avg - 1.35);
            const planeScore = metrics.cv * 2.4 + (1 - p10Ratio) * 3.2 + (1 - minRatio) * 1.15 + hotspotRatio * 1.6 + (1 - metrics.coveragePercent / 100) * 2.6;
            const weight = Math.abs(depth - selectedDepth) < 1 ? 2 : 1;
            weightedScore += planeScore * weight;
            totalWeight += weight;
        });
        const lamps = Array.isArray(setup.lamps) ? setup.lamps : [];
        const invalidPenalty = lamps.reduce((sum, lamp) => sum + (lampFitsTank(lamp, tank) ? 0 : 1000), 0);
        return weightedScore / Math.max(1, totalWeight) + lampOverlapPenalty(lamps) + invalidPenalty;
    }

    function suggestSingleLampPosition(setup) {
        const baseLamp = (setup.lamps || [])[0];
        if (!baseLamp) return null;
        const tank = setup.tank || {};
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const step = clamp(num(tank.optimizerStepCm, 5), 5, 40);
        let best = null;
        for (let x = step / 2; x <= length; x += step) {
            for (let y = step / 2; y <= width; y += step) {
                const candidate = {
                    ...setup,
                    lamps: [{ ...baseLamp, x, y }]
                };
                const score = scoreSetup(candidate);
                if (!best || score < best.score) best = { x, y, score, setup: candidate };
            }
        }
        return best;
    }

    function cloneLamp(baseLamp, index, x, y) {
        return {
            ...baseLamp,
            name: index === 0 ? (baseLamp.name || 'LED') : `${baseLamp.name || 'LED'} ${index + 1}`,
            x,
            y,
            groups: Array.isArray(baseLamp.groups) ? baseLamp.groups.map(group => ({ ...group })) : []
        };
    }

    function lampHalfExtents(lamp, rotationDeg = lamp.rotationDeg) {
        const lampLength = Math.max(1, num(lamp.lengthCm, 45));
        const lampWidth = Math.max(1, num(lamp.widthCm, 22));
        const angle = Math.abs(num(rotationDeg, 0) % 180) * DEG;
        const halfX = Math.abs(Math.cos(angle)) * lampLength / 2 + Math.abs(Math.sin(angle)) * lampWidth / 2;
        const halfY = Math.abs(Math.sin(angle)) * lampLength / 2 + Math.abs(Math.cos(angle)) * lampWidth / 2;
        return { halfX, halfY };
    }

    function lampFitsTank(lamp, tank, rotationDeg = lamp.rotationDeg) {
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const extents = lampHalfExtents(lamp, rotationDeg);
        return extents.halfX * 2 <= length + 0.01 && extents.halfY * 2 <= width + 0.01;
    }

    function clampLampInsideTank(lamp, tank) {
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        let rotationDeg = num(lamp.rotationDeg, 0);
        if (!lampFitsTank(lamp, tank, rotationDeg)) {
            const fittingRotation = [0, 90, 180, 270].find(rotation => lampFitsTank(lamp, tank, rotation));
            if (fittingRotation !== undefined) rotationDeg = fittingRotation;
        }
        const extents = lampHalfExtents(lamp, rotationDeg);
        const fits = extents.halfX * 2 <= length + 0.01 && extents.halfY * 2 <= width + 0.01;
        const minX = Math.min(length / 2, extents.halfX);
        const maxX = Math.max(minX, length - extents.halfX);
        const minY = Math.min(width / 2, extents.halfY);
        const maxY = Math.max(minY, width - extents.halfY);
        return {
            ...lamp,
            rotationDeg,
            x: Number(clamp(num(lamp.x, length / 2), minX, maxX).toFixed(1)),
            y: Number(clamp(num(lamp.y, width / 2), minY, maxY).toFixed(1)),
            placementInvalid: !fits
        };
    }

    function createDistributedLayoutForLamps(setup, lamps) {
        const tank = setup.tank || {};
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const count = lamps.length;
        const rows = count > 3 && width >= 55 ? 2 : 1;
        const cols = Math.ceil(count / rows);
        const placed = lamps.map((lamp, index) => {
            const row = rows === 1 ? 0 : Math.floor(index / cols);
            const col = index % cols;
            const x = cols === 1 ? length / 2 : (length * (col + 1)) / (cols + 1);
            const y = rows === 1 ? width / 2 : (width * (row + 1)) / (rows + 1);
            return clampLampInsideTank({ ...lamp, x, y }, tank);
        });
        return { ...setup, lamps: placed };
    }

    function createDistributedLayout(setup, count) {
        const baseLamp = (setup.lamps || [])[0];
        if (!baseLamp) return null;
        const tank = setup.tank || {};
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const lampLength = Math.max(8, num(baseLamp.lengthCm, 45));
        const lampWidth = Math.max(8, num(baseLamp.widthCm, 22));
        const safeX = Math.min(length / 2, lampLength / 2 + 6);
        const safeY = Math.min(width / 2, lampWidth / 2 + 6);
        const lamps = [];
        const rows = count > 3 && width >= 55 ? 2 : 1;
        const cols = Math.ceil(count / rows);
        for (let index = 0; index < count; index += 1) {
            const row = rows === 1 ? 0 : Math.floor(index / cols);
            const col = index % cols;
            const xMin = safeX;
            const xMax = Math.max(xMin, length - safeX);
            const yMin = safeY;
            const yMax = Math.max(yMin, width - safeY);
            const x = cols === 1 ? length / 2 : xMin + ((xMax - xMin) * col / Math.max(1, cols - 1));
            const y = rows === 1 ? width / 2 : yMin + ((yMax - yMin) * row / Math.max(1, rows - 1));
            lamps.push(clampLampInsideTank(cloneLamp(baseLamp, index, Number(x.toFixed(1)), Number(y.toFixed(1))), tank));
        }
        return { ...setup, lamps };
    }

    function suggestLampLayout(setup, minCount = 1, maxCount = 4) {
        const start = clamp(Math.round(num(minCount, 1)), 1, 8);
        const end = clamp(Math.round(num(maxCount, 4)), start, 8);
        const options = [];
        for (let count = start; count <= end; count += 1) {
            const candidate = createDistributedLayout(setup, count);
            if (!candidate) continue;
            const optimized = suggestOptimalLampAlignment(candidate, { quick: true });
            if (!optimized || optimized.error) continue;
            const metrics = analyzeGrid(buildGrid(optimized.setup, 'top'));
            const result = { count, score: optimized.score, quality: metrics.qualityPercent, setup: optimized.setup };
            options.push(result);
        }
        if (!options.length) return null;
        const bestQuality = Math.max(...options.map(option => option.quality));
        const nearBest = options.filter(option => option.quality >= bestQuality - 3).sort((a, b) => a.count - b.count);
        const best = nearBest[0] || [...options].sort((a, b) => b.quality - a.quality)[0];
        return { ...best, options };
    }

    function createGridSeed(setup, lamps, rowCount) {
        const tank = setup.tank || {};
        const length = Math.max(10, num(tank.lengthCm, 120));
        const width = Math.max(10, num(tank.widthCm, 60));
        const rows = clamp(Math.round(rowCount), 1, Math.min(3, lamps.length));
        const columns = Math.ceil(lamps.length / rows);
        const placed = lamps.map((lamp, index) => {
            const row = Math.floor(index / columns);
            const column = index % columns;
            return clampLampInsideTank({
                ...lamp,
                x: length * (column + 1) / (Math.min(columns, lamps.length - row * columns) + 1),
                y: width * (row + 1) / (rows + 1)
            }, tank);
        });
        return { ...setup, lamps: placed };
    }

    function getFittingRotations(lamp, tank) {
        const values = [num(lamp.rotationDeg, 0), 0, 90, 180, 270]
            .map(value => ((value % 360) + 360) % 360)
            .filter((value, index, all) => all.indexOf(value) === index);
        return values.filter(rotation => lampFitsTank(lamp, tank, rotation));
    }

    function optimizeSeed(seed, quick = false) {
        const tank = seed.tank || {};
        const minDimension = Math.min(Math.max(10, num(tank.lengthCm, 120)), Math.max(10, num(tank.widthCm, 60)));
        const steps = quick
            ? [Math.max(5, minDimension / 7), 3]
            : [Math.max(8, minDimension / 5), Math.max(4, minDimension / 10), 2];
        let lamps = seed.lamps.map(lamp => clampLampInsideTank(lamp, tank));
        let score = scoreSetup({ ...seed, lamps });
        steps.forEach(step => {
            lamps.forEach((lamp, lampIndex) => {
                let bestLamp = lamp;
                let bestScore = score;
                const rotations = getFittingRotations(lamp, tank);
                rotations.forEach(rotationDeg => {
                    [-step, 0, step].forEach(offsetX => {
                        [-step, 0, step].forEach(offsetY => {
                            const candidateLamp = clampLampInsideTank({
                                ...lamp,
                                x: num(lamp.x) + offsetX,
                                y: num(lamp.y) + offsetY,
                                rotationDeg
                            }, tank);
                            const candidateLamps = lamps.map((current, index) => index === lampIndex ? candidateLamp : current);
                            const candidateScore = scoreSetup({ ...seed, lamps: candidateLamps });
                            if (candidateScore + 0.000001 < bestScore) {
                                bestScore = candidateScore;
                                bestLamp = candidateLamp;
                            }
                        });
                    });
                });
                lamps[lampIndex] = bestLamp;
                score = bestScore;
            });
        });
        return { setup: { ...seed, lamps }, score };
    }

    function suggestOptimalLampAlignment(setup, options = {}) {
        const lamps = Array.isArray(setup.lamps) ? setup.lamps : [];
        if (!lamps.length) return null;
        const tank = setup.tank || {};
        const impossibleIndex = lamps.findIndex(lamp => getFittingRotations(lamp, tank).length === 0);
        if (impossibleIndex >= 0) {
            return { error: 'lamp-too-large', lampIndex: impossibleIndex, setup };
        }
        const seeds = [
            { ...setup, lamps: lamps.map(lamp => clampLampInsideTank(lamp, tank)) },
            createDistributedLayoutForLamps(setup, lamps),
            createGridSeed(setup, lamps, 1),
            createGridSeed(setup, lamps, Math.min(2, lamps.length)),
            createGridSeed(setup, lamps, Math.min(3, lamps.length))
        ].filter(Boolean);
        let best = null;
        seeds.slice(0, options.quick ? 2 : seeds.length).forEach(seed => {
            const optimized = optimizeSeed(seed, Boolean(options.quick));
            if (!best || optimized.score < best.score) best = optimized;
        });
        return best;
    }

    function simulate(setup) {
        const normalized = {
            tank: setup.tank || {},
            lamps: Array.isArray(setup.lamps) ? setup.lamps : [],
            corals: Array.isArray(setup.corals) ? setup.corals : []
        };
        const top = buildGrid(normalized, 'top');
        return {
            top,
            side: buildGrid(normalized, 'side'),
            corals: evaluateCorals(normalized),
            score: scoreSetup(normalized),
            coverage: analyzeGrid(top),
            placementValid: normalized.lamps.every(lamp => lampFitsTank(lamp, normalized.tank))
        };
    }

    window.ReefLightingSim = {
        simulate,
        parAtPoint,
        suggestSingleLampPosition,
        suggestLampLayout,
        suggestOptimalLampAlignment,
        clampLampInsideTank,
        lampFitsTank,
        analyzeGrid,
        scoreSetup,
        _internals: { beamExponent, directionFromTilt }
    };
})();
