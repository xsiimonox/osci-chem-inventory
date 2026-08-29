import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('exports/reeftools-logo-3d');
fs.mkdirSync(outDir, { recursive: true });

const TAU = Math.PI * 2;

function v(x, y, z) {
  return [x, y, z];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm(a) {
  const len = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / len, a[1] / len, a[2] / len];
}

function tri(a, b, c) {
  return { a, b, c };
}

function writeStl(name, triangles) {
  const lines = [`solid ${name}`];
  triangles.forEach(({ a, b, c }) => {
    const n = norm(cross(sub(b, a), sub(c, a)));
    lines.push(`  facet normal ${n[0]} ${n[1]} ${n[2]}`);
    lines.push('    outer loop');
    [a, b, c].forEach(p => lines.push(`      vertex ${p[0].toFixed(4)} ${p[1].toFixed(4)} ${p[2].toFixed(4)}`));
    lines.push('    endloop');
    lines.push('  endfacet');
  });
  lines.push(`endsolid ${name}`);
  fs.writeFileSync(path.join(outDir, `${name}.stl`), `${lines.join('\n')}\n`);
}

function roundedRect(cx, cy, w, h, r, segments = 10) {
  const pts = [];
  const corners = [
    [cx + w / 2 - r, cy + h / 2 - r, 0, Math.PI / 2],
    [cx - w / 2 + r, cy + h / 2 - r, Math.PI / 2, Math.PI],
    [cx - w / 2 + r, cy - h / 2 + r, Math.PI, Math.PI * 1.5],
    [cx + w / 2 - r, cy - h / 2 + r, Math.PI * 1.5, TAU],
  ];
  corners.forEach(([x, y, start, end]) => {
    for (let i = 0; i <= segments; i += 1) {
      const t = start + ((end - start) * i) / segments;
      pts.push([x + Math.cos(t) * r, y + Math.sin(t) * r]);
    }
  });
  return pts;
}

function capsule(x1, y1, x2, y2, radius, segments = 12) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  const pts = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = angle - Math.PI / 2 + (Math.PI * i) / segments;
    pts.push([x2 + Math.cos(t) * radius, y2 + Math.sin(t) * radius]);
  }
  for (let i = 0; i <= segments; i += 1) {
    const t = angle + Math.PI / 2 + (Math.PI * i) / segments;
    pts.push([x1 + Math.cos(t) * radius, y1 + Math.sin(t) * radius]);
  }
  return pts;
}

function ribbon(points, width) {
  const left = [];
  const right = [];
  points.forEach((p, i) => {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    left.push([p[0] + nx * width / 2, p[1] + ny * width / 2]);
    right.unshift([p[0] - nx * width / 2, p[1] - ny * width / 2]);
  });
  return [...left, ...right];
}

function bezier(p0, p1, p2, p3, steps = 42) {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const a = (1 - t) ** 3;
    const b = 3 * (1 - t) ** 2 * t;
    const c = 3 * (1 - t) * t ** 2;
    const d = t ** 3;
    pts.push([
      a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
      a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
    ]);
  }
  return pts;
}

function arc(cx, cy, radius, start, end, steps = 48) {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = start + ((end - start) * i) / steps;
    pts.push([cx + Math.cos(t) * radius, cy + Math.sin(t) * radius]);
  }
  return pts;
}

function extrude(poly, z0, z1) {
  const triangles = [];
  const n = poly.length;
  const centerBottom = [
    poly.reduce((sum, p) => sum + p[0], 0) / n,
    poly.reduce((sum, p) => sum + p[1], 0) / n,
    z0,
  ];
  const centerTop = [centerBottom[0], centerBottom[1], z1];
  for (let i = 0; i < n; i += 1) {
    const j = (i + 1) % n;
    const b0 = v(poly[i][0], poly[i][1], z0);
    const b1 = v(poly[j][0], poly[j][1], z0);
    const t0 = v(poly[i][0], poly[i][1], z1);
    const t1 = v(poly[j][0], poly[j][1], z1);
    triangles.push(tri(b0, b1, t1), tri(b0, t1, t0));
    triangles.push(tri(centerTop, t0, t1));
    triangles.push(tri(centerBottom, b1, b0));
  }
  return triangles;
}

function merge(...meshes) {
  return meshes.flat();
}

const base = extrude(roundedRect(0, 0, 92, 92, 16, 16), 0, 3.2);
const border = merge(
  extrude(ribbon(arc(0, 0, 39, Math.PI * 0.82, Math.PI * 1.98), 1.7), 3.25, 4.6),
  extrude(ribbon(arc(5, -4, 42, Math.PI * 0.08, Math.PI * 0.52), 1.5), 3.25, 4.6),
  extrude(ribbon(arc(12, -8, 40, Math.PI * 1.36, Math.PI * 1.78), 1.4), 3.25, 4.6),
);

const wavePath = bezier([-31, -16], [-8, -31], [23, -3], [43, -14], 54);
const wave = extrude(ribbon(wavePath, 7.5), 3.3, 6.2);
const waveShadow = extrude(ribbon(bezier([-25, -22], [0, -31], [26, -7], [39, -21], 40), 2.8), 3.25, 4.55);

const coralBranches = [
  [-7, -20, -3, 13, 3.2],
  [-6, -5, -20, 3, 2.7],
  [-13, 0, -29, 13, 2.9],
  [-16, 7, -31, 20, 2.8],
  [-8, 5, -3, 25, 2.9],
  [-1, 5, 13, 22, 2.8],
  [0, -7, 18, 2, 2.8],
  [0, -10, 23, -5, 2.7],
  [-12, -10, -27, -9, 2.9],
  [-19, -9, -31, -1, 2.8],
  [-5, 10, -14, 23, 2.6],
  [2, 12, 4, 28, 2.7],
  [3, 18, 13, 31, 2.6],
];
const coral = merge(...coralBranches.map(([x1, y1, x2, y2, r]) => extrude(capsule(x1, y1, x2, y2, r, 14), 3.35, 6.8)));

const tiles = [];
[-1, 0, 1].forEach(row => {
  [-1, 0, 1].forEach(col => {
    tiles.push(extrude(roundedRect(20 + col * 8.2, 18 - row * 8.2, 6.3, 6.3, 1.3, 5), 3.35, 5.6));
  });
});
const accentTile = extrude(roundedRect(11.8, 26.2, 7.3, 7.3, 1.5, 6), 3.4, 6.1);

writeStl('reeftools-logo-01-base-dark', base);
writeStl('reeftools-logo-02-cyan-coral-wave', merge(coral, wave));
writeStl('reeftools-logo-03-blue-shadow-arcs', merge(border, waveShadow));
writeStl('reeftools-logo-04-purple-accent-tile', accentTile);
writeStl('reeftools-logo-05-dark-blue-grid-tiles', merge(...tiles));

const readme = `# ReefTools Logo 3D Modell

Mehrfarbiger Druck als getrennte STL-Teile.

## Dateien

- reeftools-logo-01-base-dark.stl: dunkle Grundplatte
- reeftools-logo-02-cyan-coral-wave.stl: Koralle und Welle
- reeftools-logo-03-blue-shadow-arcs.stl: feine blaue Bögen/Schattenlinien
- reeftools-logo-04-purple-accent-tile.stl: violette Akzentkachel
- reeftools-logo-05-dark-blue-grid-tiles.stl: dunkle Kacheln rechts oben

## Slicer

Alle STL-Dateien gemeinsam importieren und als ein Objekt mit mehreren Teilen laden.
Danach jedem Teil eine eigene Farbe zuweisen.

Empfohlene Startwerte:

- Größe: ca. 92 x 92 mm
- Grundplatte: 3,2 mm
- erhabene Logo-Elemente: bis ca. 6,8 mm
- Düse: 0,4 mm oder feiner
- Schichthöhe: 0,16 bis 0,20 mm
- Top-Layer: mindestens 5
- Bügeln/Ironing optional für glatte Oberfläche

Hinweis: Das Modell ist eine druckbare, vereinfachte 3D-Interpretation des App-Icons. Es ist bewusst nicht als exakte fotorealistische Kopie gebaut, sondern als klare mehrfarbige Plakette.
`;
fs.writeFileSync(path.join(outDir, 'README.md'), readme);

console.log(`Created ${outDir}`);
