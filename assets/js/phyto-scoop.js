(() => {
    const doseMgPerLiter = 2; // 200 mg per 100 L
    const calibratedMlPerGram = 2.45 / 1.5;
    const innerDiameterMm = 17.5;
    const wallMm = 1.5;
    const floorMm = 1.5;
    const innerCornerRadiusMm = 1.5;
    const maxOverallCupHeightMm = 20;
    const maxFillHeightMm = maxOverallCupHeightMm - floorMm;
    const handleLengthMm = 50;
    const handleWidthMm = 6;
    const handleHeightMm = 3;
    const innerRadiusMm = innerDiameterMm / 2;
    const fmt = (value, digits = 2) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: digits }).format(value);

    function roundedFloorVolume(heightMm, radiusMm, bowlRadiusMm) {
        const height = Math.max(0, Math.min(heightMm, radiusMm));
        if (!height) return 0;
        const steps = 64;
        const step = height / steps;
        const areaAt = y => {
            const curvedRadius = bowlRadiusMm - radiusMm
                + Math.sqrt(Math.max(0, radiusMm ** 2 - (y - radiusMm) ** 2));
            return Math.PI * curvedRadius ** 2;
        };
        let sum = areaAt(0) + areaAt(height);
        for (let i = 1; i < steps; i++) sum += (i % 2 ? 4 : 2) * areaAt(i * step);
        return sum * step / 3;
    }

    function volumeAtFillHeight(heightMm, bowlRadiusMm = innerRadiusMm) {
        const cornerRadius = Math.min(innerCornerRadiusMm, bowlRadiusMm);
        if (heightMm <= cornerRadius) return roundedFloorVolume(heightMm, heightMm, bowlRadiusMm);
        return roundedFloorVolume(cornerRadius, cornerRadius, bowlRadiusMm)
            + Math.PI * bowlRadiusMm ** 2 * (heightMm - cornerRadius);
    }

    const maxVolumePerScoopMm3 = volumeAtFillHeight(maxFillHeightMm);

    function fillHeightForVolume(volumeMm3, bowlRadiusMm = innerRadiusMm) {
        let low = 0, high = maxFillHeightMm;
        for (let i = 0; i < 52; i++) {
            const mid = (low + high) / 2;
            if (volumeAtFillHeight(mid, bowlRadiusMm) < volumeMm3) low = mid;
            else high = mid;
        }
        return (low + high) / 2;
    }

    function calculate(liters) {
        const massG = liters * doseMgPerLiter / 1000;
        const totalMl = massG * calibratedMlPerGram;
        const totalVolumeMm3 = totalMl * 1000;
        let scoopCount = Math.max(1, Math.ceil(totalVolumeMm3 / maxVolumePerScoopMm3));
        while (scoopCount * maxVolumePerScoopMm3 < totalVolumeMm3) scoopCount++;
        const perScoopVolumeMm3 = totalVolumeMm3 / scoopCount;
        let scoopInnerRadiusMm = innerRadiusMm;
        let fillHeight = fillHeightForVolume(perScoopVolumeMm3, scoopInnerRadiusMm);
        if (fillHeight < 5) {
            // Narrow the bowl while preserving the exact dose volume, so even small doses
            // fill to a readable and practical minimum depth.
            let low = 0, high = innerRadiusMm;
            for (let i = 0; i < 52; i++) {
                const mid = (low + high) / 2;
                if (volumeAtFillHeight(5, mid) < perScoopVolumeMm3) low = mid;
                else high = mid;
            }
            scoopInnerRadiusMm = (low + high) / 2;
            fillHeight = fillHeightForVolume(perScoopVolumeMm3, scoopInnerRadiusMm);
        }
        return { liters, massG, totalMl, scoopCount, fillHeight, innerRadiusMm: scoopInnerRadiusMm, cornerRadiusMm: Math.min(innerCornerRadiusMm, scoopInnerRadiusMm, fillHeight), outerCupHeight: fillHeight + floorMm, perScoopMl: totalMl / scoopCount, perScoopG: massG / scoopCount };
    }

    let scoopViewer = null;

    function mat4Perspective(fov, aspect, near, far) {
        const f = 1 / Math.tan(fov / 2);
        const out = new Float32Array(16);
        out[0] = f / aspect; out[5] = f;
        out[10] = (far + near) / (near - far); out[11] = -1;
        out[14] = (2 * far * near) / (near - far);
        return out;
    }

    function vec3Normalize(v) {
        const length = Math.hypot(v[0], v[1], v[2]) || 1;
        return [v[0] / length, v[1] / length, v[2] / length];
    }

    function vec3Cross(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    }

    function vec3Dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }

    function mat4LookAt(eye, target, up) {
        const z = vec3Normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
        const x = vec3Normalize(vec3Cross(up, z));
        const y = vec3Cross(z, x);
        return new Float32Array([
            x[0], y[0], z[0], 0,
            x[1], y[1], z[1], 0,
            x[2], y[2], z[2], 0,
            -vec3Dot(x, eye), -vec3Dot(y, eye), -vec3Dot(z, eye), 1
        ]);
    }

    function mat4Multiply(a, b) {
        const out = new Float32Array(16);
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                out[col * 4 + row] = a[row] * b[col * 4]
                    + a[4 + row] * b[col * 4 + 1]
                    + a[8 + row] * b[col * 4 + 2]
                    + a[12 + row] * b[col * 4 + 3];
            }
        }
        return out;
    }

    function compileShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            throw new Error('3D-Shader konnte nicht kompiliert werden.');
        }
        return shader;
    }

    function createScoopViewer(canvas, resetButton, fallback) {
        let gl;
        try { gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' }); }
        catch (_) { return null; }
        if (!gl) return null;

        const vertexSource = `attribute vec3 aPosition; attribute vec3 aNormal; uniform mat4 uMvp; varying float vLight; void main(){ gl_Position=uMvp*vec4(aPosition,1.0); vec3 n=normalize(aNormal); vec3 light=normalize(vec3(-0.35,-0.48,0.82)); vLight=0.48+0.62*max(dot(n,light),0.0); }`;
        const fragmentSource = `precision mediump float; varying float vLight; uniform vec3 uColor; uniform float uAlpha; void main(){ gl_FragColor=vec4(uColor*vLight,uAlpha); }`;
        let program, positionBuffer, normalBuffer, gridBuffer;
        try {
            const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
            const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
            program = gl.createProgram();
            gl.attachShader(program, vertexShader); gl.attachShader(program, fragmentShader); gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('3D-Programm konnte nicht verbunden werden.');
        } catch (_) { return null; }

        positionBuffer = gl.createBuffer(); normalBuffer = gl.createBuffer(); gridBuffer = gl.createBuffer();
        const state = { gl, canvas, program, positionBuffer, normalBuffer, gridBuffer, gridVertexCount: 0, vertexCount: 0, target: [0, 0, 0], modelRadius: 1, yaw: 0.35, pitch: 0.62, zoom: 1, fitDistance: 100, drag: null, pointers: new Map(), pinchDistance: 0 };

        function draw() {
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = Math.round(rect.width * dpr), height = Math.round(rect.height * dpr);
            if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
            gl.viewport(0, 0, width, height);
            gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
            gl.useProgram(program);
            const aspect = width / height;
            const fov = 42 * Math.PI / 180;
            const horizontalHalfFov = Math.atan(Math.tan(fov / 2) * aspect);
            const halfFov = Math.min(fov / 2, horizontalHalfFov);
            state.fitDistance = Math.max(30, state.modelRadius / Math.sin(halfFov) * 1.12);
            const distance = state.fitDistance * state.zoom;
            const cp = Math.cos(state.pitch);
            const eye = [state.target[0] + distance * Math.sin(state.yaw) * cp, state.target[1] - distance * Math.cos(state.yaw) * cp, state.target[2] + distance * Math.sin(state.pitch)];
            const view = mat4LookAt(eye, state.target, [0, 0, 1]);
            const projection = mat4Perspective(fov, aspect, 0.1, Math.max(1000, state.fitDistance * 5));
            const mvp = mat4Multiply(projection, view);
            gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uMvp'), false, mvp);
            const positionLocation = gl.getAttribLocation(program, 'aPosition');
            const normalLocation = gl.getAttribLocation(program, 'aNormal');
            const colorLocation = gl.getUniformLocation(program, 'uColor');
            const alphaLocation = gl.getUniformLocation(program, 'uAlpha');
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); gl.enableVertexAttribArray(positionLocation); gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); gl.enableVertexAttribArray(normalLocation); gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
            gl.uniform3f(colorLocation, 0.22, 0.78, 0.71); gl.uniform1f(alphaLocation, 1);
            gl.drawArrays(gl.TRIANGLES, 0, state.vertexCount);
            gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.uniform3f(colorLocation, 0.22, 0.52, 0.51); gl.uniform1f(alphaLocation, 0.52);
            gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer); gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
            gl.disableVertexAttribArray(normalLocation); gl.vertexAttrib3f(normalLocation, 0, 0, 1);
            gl.drawArrays(gl.LINES, 0, state.gridVertexCount); gl.disable(gl.BLEND);
        }

        function setModel(triangles) {
            const positions = [], normals = [];
            const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
            for (const [a, b, c] of triangles) {
                const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
                const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
                const normal = vec3Normalize(vec3Cross(u, v));
                for (const point of [a, b, c]) {
                    positions.push(...point); normals.push(...normal);
                    for (let axis = 0; axis < 3; axis++) { min[axis] = Math.min(min[axis], point[axis]); max[axis] = Math.max(max[axis], point[axis]); }
                }
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
            state.vertexCount = positions.length / 3;
            state.target = min.map((value, axis) => (value + max[axis]) / 2);
            state.modelRadius = Math.max(1, Math.hypot(...max.map((value, axis) => (value - min[axis]) / 2)));
            const pad = Math.max(8, state.modelRadius * 0.25);
            const x0 = Math.floor((min[0] - pad) / 10) * 10, x1 = Math.ceil((max[0] + pad) / 10) * 10;
            const y0 = Math.floor((min[1] - pad) / 10) * 10, y1 = Math.ceil((max[1] + pad) / 10) * 10;
            const gridPositions = [];
            for (let x = x0; x <= x1; x += 10) gridPositions.push(x, y0, -0.12, x, y1, -0.12);
            for (let y = y0; y <= y1; y += 10) gridPositions.push(x0, y, -0.12, x1, y, -0.12);
            gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridPositions), gl.STATIC_DRAW);
            state.gridVertexCount = gridPositions.length / 3;
            draw();
        }

        const pointerDistance = () => {
            const points = [...state.pointers.values()];
            return points.length < 2 ? 0 : Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        };
        canvas.addEventListener('pointerdown', event => {
            state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
            if (state.pointers.size === 1) state.drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
            else { state.drag = null; state.pinchDistance = pointerDistance(); }
            canvas.setPointerCapture(event.pointerId);
        });
        canvas.addEventListener('pointermove', event => {
            if (!state.pointers.has(event.pointerId)) return;
            state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
            if (state.pointers.size >= 2) {
                const nextDistance = pointerDistance();
                if (state.pinchDistance > 0 && nextDistance > 0) state.zoom = Math.max(0.62, Math.min(2.6, state.zoom * state.pinchDistance / nextDistance));
                state.pinchDistance = nextDistance;
            } else if (state.drag && state.drag.id === event.pointerId) {
                const dx = event.clientX - state.drag.x, dy = event.clientY - state.drag.y;
                state.drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
                state.yaw += dx * 0.009;
                state.pitch = Math.max(0.12, Math.min(1.42, state.pitch + dy * 0.008));
            }
            draw();
        });
        const endPointer = event => {
            state.pointers.delete(event.pointerId);
            const remaining = [...state.pointers.entries()][0];
            state.drag = remaining ? { id: remaining[0], ...remaining[1] } : null;
            state.pinchDistance = state.pointers.size >= 2 ? pointerDistance() : 0;
        };
        canvas.addEventListener('pointerup', endPointer); canvas.addEventListener('pointercancel', endPointer); canvas.addEventListener('lostpointercapture', endPointer);
        canvas.addEventListener('wheel', event => {
            event.preventDefault();
            state.zoom = Math.max(0.62, Math.min(2.6, state.zoom * (event.deltaY > 0 ? 1.08 : 0.92)));
            draw();
        }, { passive: false });
        canvas.addEventListener('dblclick', () => { state.yaw = 0.35; state.pitch = 0.62; state.zoom = 1; draw(); });
        resetButton?.addEventListener('click', () => { state.yaw = 0.35; state.pitch = 0.62; state.zoom = 1; draw(); });
        if (typeof ResizeObserver !== 'undefined') new ResizeObserver(draw).observe(canvas);
        else window.addEventListener('resize', draw);
        if (fallback) fallback.hidden = true;
        return { setModel };
    }

    let holderViewer = null;
    let holderTriangles = null;
    let holderModel = null;
    let holderModelDimensions = null;
    function decodeHolderTriangles(encoded) {
        if (!encoded) return [];
        const binary = atob(encoded);
        const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
        const view = new DataView(bytes.buffer);
        const triangles = [];
        for (let offset = 0; offset + 36 <= bytes.byteLength; offset += 36) {
            const point = start => [view.getFloat32(start, true), view.getFloat32(start + 4, true), view.getFloat32(start + 8, true)];
            triangles.push([point(offset), point(offset + 12), point(offset + 24)]);
        }
        return triangles;
    }

    function readHolderTriangles() {
        return decodeHolderTriangles(window.PHYTO_HOLDER_PREVIEW_DATA);
    }

    function triangleBounds(triangles) {
        const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
        triangles.forEach(triangle => triangle.forEach(point => point.forEach((value, axis) => {
            min[axis] = Math.min(min[axis], value);
            max[axis] = Math.max(max[axis], value);
        })));
        return { min, max };
    }

    function buildHolderModel(count) {
        if (!holderTriangles) holderTriangles = readHolderTriangles();
        if (!holderTriangles.length) return { triangles: [], dimensions: [0, 0, 0] };
        if (count === 1) return { triangles: holderTriangles, dimensions: meshDimensions(holderTriangles) };
        const sampleData = window.PHYTO_HOLDER_PREVIEW_SAMPLES?.[count];
        if (sampleData) {
            const sample = normalizeHolderMesh(decodeHolderTriangles(sampleData));
            return { triangles: sample, dimensions: meshDimensions(sample) };
        }
        return buildRadialHolderModel(count);
    }

    function meshDimensions(triangles) {
        const bounds = triangleBounds(triangles);
        return bounds.max.map((value, axis) => value - bounds.min[axis]);
    }

    function normalizeHolderMesh(triangles) {
        const bounds = triangleBounds(triangles);
        return triangles.map(triangle => triangle.map(point => point.map((value, axis) => value - bounds.min[axis])));
    }

    function roundedRectangleOutline(xMin, xMax, yMin, yMax, radius, stepsPerCorner = 8) {
        const corners = [
            [xMax - radius, yMin + radius, -Math.PI / 2],
            [xMax - radius, yMax - radius, 0],
            [xMin + radius, yMax - radius, Math.PI / 2],
            [xMin + radius, yMin + radius, Math.PI]
        ];
        const points = [];
        for (const [cx, cy, start] of corners) {
            for (let step = 0; step < stepsPerCorner; step++) {
                const angle = start + step / stepsPerCorner * Math.PI / 2;
                points.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
            }
        }
        return points;
    }

    function sampleArc(centerX, centerY, radius, startAngle, endAngle, segments = 16) {
        const points = [];
        for (let step = 0; step <= segments; step++) {
            const angle = startAngle + (endAngle - startAngle) * step / segments;
            points.push([centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)]);
        }
        return points;
    }

    function resampleOutline(points, sampleCount) {
        const clean = points.filter((point, index) => index === 0
            || Math.hypot(point[0] - points[index - 1][0], point[1] - points[index - 1][1]) > 1e-7);
        const lengths = clean.map((point, index) => {
            const next = clean[(index + 1) % clean.length];
            return Math.hypot(next[0] - point[0], next[1] - point[1]);
        });
        const perimeter = lengths.reduce((sum, length) => sum + length, 0);
        const sampled = [];
        let edge = 0, edgeStart = 0;
        for (let index = 0; index < sampleCount; index++) {
            const distance = perimeter * index / sampleCount;
            while (edge < lengths.length - 1 && edgeStart + lengths[edge] < distance) {
                edgeStart += lengths[edge++];
            }
            const ratio = lengths[edge] ? (distance - edgeStart) / lengths[edge] : 0;
            const start = clean[edge], end = clean[(edge + 1) % clean.length];
            sampled.push([start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio]);
        }
        return sampled;
    }

    function roundedShoulderedTabOutline(outerRingRadius, xMax, yMin, yMax, shoulderRadius = 6, tipSegments = 16) {
        // A true circular fillet tangent to the ring's outer circle and the arm's
        // straight side. This gives the requested 6 mm radius on both shoulders.
        const totalRadius = outerRingRadius + shoulderRadius;
        const upperCenterY = yMax + shoulderRadius;
        const lowerCenterY = yMin - shoulderRadius;
        const upperCenterX = Math.sqrt(totalRadius ** 2 - upperCenterY ** 2);
        const lowerCenterX = Math.sqrt(totalRadius ** 2 - lowerCenterY ** 2);
        const upperTipRadius = xMax - upperCenterX;
        const lowerTipRadius = xMax - lowerCenterX;
        const upperTangent = [outerRingRadius * upperCenterX / totalRadius, outerRingRadius * upperCenterY / totalRadius];
        const lowerTangent = [outerRingRadius * lowerCenterX / totalRadius, outerRingRadius * lowerCenterY / totalRadius];
        const upperShoulderStart = Math.atan2(upperTangent[1] - upperCenterY, upperTangent[0] - upperCenterX);
        const lowerShoulderStart = Math.atan2(lowerTangent[1] - lowerCenterY, lowerTangent[0] - lowerCenterX);
        const points = [
            ...sampleArc(lowerCenterX, yMin + lowerTipRadius, lowerTipRadius, -Math.PI / 2, 0, tipSegments),
            [xMax, yMax - upperTipRadius],
            ...sampleArc(upperCenterX, yMax - upperTipRadius, upperTipRadius, 0, Math.PI / 2, tipSegments),
            ...sampleArc(upperCenterX, upperCenterY, shoulderRadius, -Math.PI / 2, upperShoulderStart, tipSegments),
            lowerTangent,
            ...sampleArc(lowerCenterX, lowerCenterY, shoulderRadius, lowerShoulderStart, Math.PI / 2, tipSegments)
        ];
        return points;
    }

    function addExtrudedFrame(triangles, outer, inner, angle, zBottom = 0, zTop = 4) {
        const cosine = Math.cos(angle), sine = Math.sin(angle);
        const transform = ([x, y], z) => [x * cosine - y * sine, x * sine + y * cosine, z];
        const outerBottom = outer.map(point => transform(point, zBottom));
        const outerTop = outer.map(point => transform(point, zTop));
        const innerBottom = inner.map(point => transform(point, zBottom));
        const innerTop = inner.map(point => transform(point, zTop));
        for (let i = 0; i < outer.length; i++) {
            const next = (i + 1) % outer.length;
            const ob0 = outerBottom[i], ob1 = outerBottom[next], ot0 = outerTop[i], ot1 = outerTop[next];
            const ib0 = innerBottom[i], ib1 = innerBottom[next], it0 = innerTop[i], it1 = innerTop[next];
            triangles.push([ot0, ot1, it1], [ot0, it1, it0]);
            triangles.push([ob0, ib1, ob1], [ob0, ib0, ib1]);
            triangles.push([ob0, ob1, ot1], [ob0, ot1, ot0]);
            triangles.push([ib1, ib0, it0], [ib1, it0, it1]);
        }
    }

    function addAnnularRing(triangles, innerRadius, outerRadius, segments = 128) {
        const bottom = 0, top = 4;
        const point = (radius, angle, z) => [radius * Math.cos(angle), radius * Math.sin(angle), z];
        for (let i = 0; i < segments; i++) {
            const a0 = i * Math.PI * 2 / segments, a1 = (i + 1) * Math.PI * 2 / segments;
            const ob0 = point(outerRadius, a0, bottom), ob1 = point(outerRadius, a1, bottom);
            const ot0 = point(outerRadius, a0, top), ot1 = point(outerRadius, a1, top);
            const ib0 = point(innerRadius, a0, bottom), ib1 = point(innerRadius, a1, bottom);
            const it0 = point(innerRadius, a0, top), it1 = point(innerRadius, a1, top);
            triangles.push([ot0, ot1, it1], [ot0, it1, it0]);
            triangles.push([ob0, ib1, ob1], [ob0, ib0, ib1]);
            triangles.push([ob0, ob1, ot1], [ob0, ot1, ot0]);
            triangles.push([ib1, ib0, it0], [ib1, it0, it1]);
        }
    }

    function buildRadialHolderModel(count) {
        const triangles = [];
        addAnnularRing(triangles, 26.8, 28.8);
        // Match the reference STLs: 6 mm shoulder fillets on both sides of every
        // arm, plus the rounded outer tip and the slightly offset slot.
        const outerTab = resampleOutline(roundedShoulderedTabOutline(28.8, 35.626, -5.1, 5.5, 6.0), 96);
        const slot = resampleOutline(roundedRectangleOutline(30.126, 33.626, -3, 3.5, 0.25, 16), 96);
        const startAngle = Math.PI / 2;
        for (let i = 0; i < count; i++) {
            addExtrudedFrame(triangles, outerTab, slot, startAngle + i * Math.PI * 2 / count);
        }
        const normalized = normalizeHolderMesh(triangles);
        return { triangles: normalized, dimensions: meshDimensions(normalized) };
    }

    function updateHolder() {
        const input = document.getElementById('phytoHolderCount');
        const dimensions = document.getElementById('phytoHolderDimensions');
        const fileInfo = document.getElementById('phytoHolderFileInfo');
        const download = document.getElementById('phytoHolderDownload');
        const canvas = document.getElementById('phytoHolderCanvas');
        const fallback = document.getElementById('phytoHolder3dFallback');
        if (!input || !dimensions || !download) return;
        const count = Number(input.value);
        const valid = Number.isInteger(count) && count >= 1 && count <= 9;
        input.setCustomValidity(valid ? '' : 'Bitte eine ganze Zahl zwischen 1 und 9 wählen.');
        download.disabled = !valid;
        if (!valid) {
            dimensions.textContent = '1 bis 9 Plätze wählen';
            if (fileInfo) fileInfo.textContent = 'Bitte eine gültige Anzahl wählen.';
            return;
        }

        holderModel = buildHolderModel(count);
        holderModelDimensions = holderModel.dimensions;
        dimensions.textContent = `${fmt(holderModel.dimensions[0], 1)} × ${fmt(holderModel.dimensions[1], 1)} × ${fmt(holderModel.dimensions[2], 1)} mm`;
        if (fileInfo) fileInfo.textContent = `${count} ${count === 1 ? 'Löffelplatz' : 'Löffelplätze'} · STL · ${fmt((84 + holderModel.triangles.length * 50) / 1024, 0)} KB`;
        if (canvas && fallback) {
            if (!holderViewer) holderViewer = createScoopViewer(canvas, null, fallback);
            if (holderViewer) holderViewer.setModel(holderModel.triangles);
            else fallback.hidden = false;
        }
        download.onclick = () => downloadHolderStl(count, holderModel.triangles, holderModelDimensions);
    }

    function renderPreview(calc) {
        const canvas = document.getElementById('phytoScoopCanvas');
        const fallback = document.getElementById('phytoScoop3dFallback');
        if (!canvas || !fallback) return;
        if (!scoopViewer) scoopViewer = createScoopViewer(canvas, document.getElementById('phytoScoopResetView'), fallback);
        if (scoopViewer) scoopViewer.setModel(makeMesh(calc), calc);
        else fallback.hidden = false;
        updateHolder();
    }

    function update() {
        const input = document.getElementById('phytoScoopLiters');
        const result = document.getElementById('phytoScoopResult');
        const download = document.getElementById('phytoScoopDownload');
        if (!input || !result || !download) return;
        const liters = Number(input.value);
        const valid = Number.isFinite(liters) && liters >= 50 && liters <= Number.MAX_SAFE_INTEGER;
        input.setCustomValidity(valid ? '' : 'Bitte mindestens 50 Liter Aquariumvolumen eingeben.');
        download.disabled = !valid;
        if (!valid) {
            result.innerHTML = '<p class="phyto-scoop-error">Der PhytoDose-Rechner ist für Aquarien ab 50 Litern ausgelegt. Bitte gib mindestens 50 Liter ein.</p>';
            return;
        }
        const calc = calculate(liters);
        const scoopPhrase = calc.scoopCount === 1 ? '1 vollen PhytoDose-Löffel' : `${fmt(calc.scoopCount, 0)} volle PhytoDose-Löffel`;
        const splits = `<div class="phyto-scoop-split ${calc.scoopCount > 1 ? 'phyto-scoop-split--multiple' : ''}" role="status" aria-live="polite"><span class="phyto-scoop-split-count">${fmt(calc.scoopCount, 0)}×</span><span><strong>Du brauchst ${scoopPhrase}</strong><small>pro Anwendung</small></span></div>`;
        const adjustedDiameter = calc.innerRadiusMm * 2;
        const diameterNote = adjustedDiameter < innerDiameterMm - 0.01 ? ` · Innen-Ø ${fmt(adjustedDiameter, 1)} mm (für mind. 5 mm Füllhöhe angepasst)` : ` · Innen-Ø ${fmt(innerDiameterMm, 1)} mm`;
        result.innerHTML = `<div class="phyto-scoop-metrics"><div><span>PhytoCoral gesamt</span><strong>${fmt(calc.massG, 3)} g</strong></div><div><span>Gesamtvolumen</span><strong>${fmt(calc.totalMl, 3)} ml</strong></div></div>${splits}<p class="phyto-scoop-detail">Je Löffel: ${fmt(calc.perScoopG, 3)} g · ${fmt(calc.perScoopMl, 3)} ml · Becherhöhe ${fmt(calc.outerCupHeight, 1)} mm${diameterNote}</p>`;
        renderPreview(calc);
        download.onclick = () => downloadStl(calc);
    }

    function makeMesh(calc) {
        const triangles = [];
        const n = 96;
        const filletSteps = 16;
        const ri = calc.innerRadiusMm;
        const ro = ri + wallMm;
        const cornerRadius = calc.cornerRadiusMm;
        const floorRadius = ri - cornerRadius;
        const zTop = calc.outerCupHeight;
        const zInner = floorMm;
        const add = (a, b, c) => triangles.push([a, b, c]);
        const p = (r, angle, z) => [r * Math.cos(angle), r * Math.sin(angle), z];
        for (let i = 0; i < n; i++) {
            const a0 = i * Math.PI * 2 / n, a1 = (i + 1) * Math.PI * 2 / n;
            const o0 = p(ro, a0, 0), o1 = p(ro, a1, 0), ot0 = p(ro, a0, zTop), ot1 = p(ro, a1, zTop);
            const centerBottom = [0, 0, 0];
            add(o0, o1, ot1); add(o0, ot1, ot0); // outer wall
            add(centerBottom, o1, o0); // underside

            const wallStartZ = zInner + cornerRadius;
            const iw0 = p(ri, a0, wallStartZ), iw1 = p(ri, a1, wallStartZ);
            const it0 = p(ri, a0, zTop), it1 = p(ri, a1, zTop);
            if (zTop - wallStartZ > 1e-6) {
                add(iw0, it1, iw1); add(iw0, it0, it1); // inner wall faces into the bowl
            }
            const f0 = p(floorRadius, a0, zInner), f1 = p(floorRadius, a1, zInner);
            add([0, 0, zInner], f0, f1); // flat inside floor

            for (let j = 0; j < filletSteps; j++) {
                const t0 = -Math.PI / 2 + j * (Math.PI / 2) / filletSteps;
                const t1 = -Math.PI / 2 + (j + 1) * (Math.PI / 2) / filletSteps;
                const r0 = floorRadius + cornerRadius * Math.cos(t0);
                const r1 = floorRadius + cornerRadius * Math.cos(t1);
                const z0 = zInner + cornerRadius + cornerRadius * Math.sin(t0);
                const z1 = zInner + cornerRadius + cornerRadius * Math.sin(t1);
                const a = p(r0, a0, z0), b = p(r0, a1, z0), c = p(r1, a0, z1), d = p(r1, a1, z1);
                add(a, c, d); add(a, d, b); // rounded inner floor-to-wall transition
            }
            add(ot0, ot1, it1); add(ot0, it1, it0); // rim
        }
        // Rounded-end handle extrusion sits flush with the bowl bottom at z=0.
        const x0 = ro - 0.8, xEnd = ro + handleLengthMm, capRadius = handleWidthMm / 2;
        const capSteps = 24;
        const capsuleOutline = radius => {
            const capCenterX = xEnd - radius;
            const points = [[x0, -radius], [capCenterX, -radius]];
            for (let i = 1; i <= capSteps; i++) {
                const angle = -Math.PI / 2 + i * Math.PI / capSteps;
                points.push([capCenterX + radius * Math.cos(angle), radius * Math.sin(angle)]);
            }
            points.push([x0, radius]);
            return points;
        };
        const outline = capsuleOutline(capRadius);
        const topOutline = capsuleOutline(capRadius - 0.8);
        const bottom = outline.map(([x, y]) => [x, y, 0]);
        const mid = outline.map(([x, y]) => [x, y, handleHeightMm - 0.8]);
        const top = topOutline.map(([x, y]) => [x, y, handleHeightMm]);
        const centerX = topOutline.reduce((sum, point) => sum + point[0], 0) / topOutline.length;
        const centerTop = [centerX, 0, handleHeightMm];
        const centerBottomHandle = [outline.reduce((sum, point) => sum + point[0], 0) / outline.length, 0, 0];
        for (let i = 0; i < outline.length; i++) {
            const next = (i + 1) % outline.length;
            add(centerTop, top[i], top[next]);
            add(centerBottomHandle, bottom[next], bottom[i]);
            add(bottom[i], bottom[next], mid[next]); add(bottom[i], mid[next], mid[i]);
            add(mid[i], mid[next], top[next]); add(mid[i], top[next], top[i]);
        }
        return triangles;
    }

    function downloadStl(calc) {
        const triangles = makeMesh(calc);
        const buffer = new ArrayBuffer(84 + triangles.length * 50);
        const view = new DataView(buffer);
        const header = `PhytoDose ${calc.liters} L | ${calc.scoopCount} scoop(s) | ${fmt(calc.outerCupHeight, 2)} mm cup height`;
        for (let i = 0; i < 80; i++) view.setUint8(i, i < header.length ? header.charCodeAt(i) : 0);
        view.setUint32(80, triangles.length, true);
        let offset = 84;
        for (const tri of triangles) {
            const [a,b,c] = tri;
            const ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2], vx=c[0]-a[0], vy=c[1]-a[1], vz=c[2]-a[2];
            let nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
            const length=Math.hypot(nx,ny,nz)||1; nx/=length; ny/=length; nz/=length;
            [nx,ny,nz,...a,...b,...c].forEach(value => { view.setFloat32(offset, value, true); offset += 4; });
            view.setUint16(offset, 0, true); offset += 2;
        }
        const blob = new Blob([buffer], { type: 'model/stl' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `phytodose-messloeffel-${Math.round(calc.liters)}l-${calc.scoopCount}x.stl`;
        document.body.append(anchor); anchor.click(); anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function downloadHolderStl(count, triangles, dimensions) {
        if (!triangles.length) return;
        const buffer = new ArrayBuffer(84 + triangles.length * 50);
        const view = new DataView(buffer);
        const header = `PhytoDose holder ${count} slots | ${dimensions.map(value => fmt(value, 1)).join(' x ')} mm`;
        for (let i = 0; i < 80; i++) view.setUint8(i, i < header.length ? header.charCodeAt(i) : 0);
        view.setUint32(80, triangles.length, true);
        let offset = 84;
        for (const [a, b, c] of triangles) {
            const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
            const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
            let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
            const length = Math.hypot(nx, ny, nz) || 1;
            nx /= length; ny /= length; nz /= length;
            [nx, ny, nz, ...a, ...b, ...c].forEach(value => { view.setFloat32(offset, value, true); offset += 4; });
            view.setUint16(offset, 0, true); offset += 2;
        }
        const url = URL.createObjectURL(new Blob([buffer], { type: 'model/stl' }));
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `phytodose-loeffelhalter-${count}-plaetze.stl`;
        document.body.append(anchor); anchor.click(); anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById('phytoScoopLiters');
        if (!input) return;
        input.addEventListener('input', update);
        document.getElementById('phytoHolderCount')?.addEventListener('input', updateHolder);
        update();
    });
})();
