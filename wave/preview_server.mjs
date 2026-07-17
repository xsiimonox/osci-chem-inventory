import crypto from "node:crypto";
import http from "node:http";

const port = Number(process.env.PORT || 8765);
const safeMaxPercent = 70;

const modeCatalog = {
  constant: { label: "Konstant", min: 25, max: 45, intensity: 55, frequency: 0.03, phase: 0, duty: 50, randomness: 0, rampShape: "smooth" },
  pulse: { label: "Puls", min: 8, max: 68, intensity: 82, frequency: 0.22, phase: 180, duty: 42, randomness: 0, rampShape: "soft-square" },
  standingWave: { label: "Stehende Welle", min: 10, max: 64, intensity: 80, frequency: 0.18, phase: 180, duty: 38, randomness: 0, rampShape: "sine" },
  sine: { label: "Sinuswelle", min: 16, max: 62, intensity: 74, frequency: 0.11, phase: 180, duty: 50, randomness: 0, rampShape: "sine" },
  reefCrest: { label: "Reef Crest", min: 24, max: 70, intensity: 82, frequency: 0.1, phase: 115, duty: 50, randomness: 38, rampShape: "mixed" },
  lagoon: { label: "Lagune", min: 14, max: 42, intensity: 58, frequency: 0.025, phase: 70, duty: 50, randomness: 10, rampShape: "smooth" },
  gyre: { label: "Gyre", min: 10, max: 66, intensity: 82, frequency: 0.025, phase: 180, duty: 50, randomness: 0, rampShape: "smooth" },
  tidal: { label: "Gezeiten", min: 12, max: 54, intensity: 70, frequency: 0.008, phase: 180, duty: 50, randomness: 0, rampShape: "sine" },
  random: { label: "Kontrollierter Zufall", min: 16, max: 62, intensity: 72, frequency: 0.055, phase: 90, duty: 50, randomness: 58, rampShape: "smooth" },
  nutrient: { label: "Detritus Lift", min: 22, max: 70, intensity: 88, frequency: 0.16, phase: 145, duty: 34, randomness: 24, rampShape: "pulse" },
  night: { label: "Nacht", min: 6, max: 26, intensity: 45, frequency: 0.018, phase: 160, duty: 50, randomness: 4, rampShape: "smooth" },
  storm: { label: "Sturm", min: 22, max: 70, intensity: 94, frequency: 0.2, phase: 130, duty: 48, randomness: 72, rampShape: "mixed" },
  manual: { label: "Manuell", min: 0, max: 70, intensity: 50, frequency: 0.05, phase: 180, duty: 50, randomness: 0, rampShape: "manual" },
  pause: { label: "Pause", min: 0, max: 0, intensity: 0, frequency: 0.05, phase: 0, duty: 50, randomness: 0, rampShape: "pause" },
};

const state = {
  simulation: true,
  activeMode: "reefCrest",
  emergencyStop: false,
  scheduleEnabled: true,
  modeConfig: { ...modeCatalog.reefCrest },
  group: {
    enabled: true,
    strategy: "antiSync",
    masterPump: 0,
    slaveRatio: 0.78,
    balance: 0,
    phaseDeg: 180,
    sharedMinPercent: 0,
    sharedMaxPercent: 70,
  },
  pumps: [
    {
      id: 0,
      name: "Pumpe A",
      enabled: true,
      outputPercent: 0,
      targetPercent: 0,
      voltageV: 24,
      currentA: 0,
      powerW: 0,
      temperatureC: 28,
      manualPercent: 35,
      minPercent: 5,
      maxPercent: 70,
      startPercent: 18,
      startupRampPercentPerSec: 35,
      multiplier: 1,
      offsetPercent: 0,
      phaseOffsetDeg: 0,
      rampUpPercentPerSec: 18,
      rampDownPercentPerSec: 22,
      invertOutput: false,
      role: "master",
      position: "links",
      directionDeg: 0,
      maintenanceDueHours: 4000,
      runtimeHours: 0,
    },
    {
      id: 1,
      name: "Pumpe B",
      enabled: true,
      outputPercent: 0,
      targetPercent: 0,
      voltageV: 24,
      currentA: 0,
      powerW: 0,
      temperatureC: 28,
      manualPercent: 35,
      minPercent: 5,
      maxPercent: 70,
      startPercent: 18,
      startupRampPercentPerSec: 35,
      multiplier: 1,
      offsetPercent: 0,
      phaseOffsetDeg: 180,
      rampUpPercentPerSec: 18,
      rampDownPercentPerSec: 22,
      invertOutput: false,
      role: "slave",
      position: "rechts",
      directionDeg: 180,
      maintenanceDueHours: 4000,
      runtimeHours: 0,
    },
  ],
  presets: [
    { id: "gentle-lagoon", system: true, name: "Sanfte Lagune", mode: "lagoon", groupStrategy: "softSync", config: { ...modeCatalog.lagoon } },
    { id: "mixed-reef", system: true, name: "Gemischtes Riff", mode: "reefCrest", groupStrategy: "antiSync", config: { ...modeCatalog.reefCrest } },
    { id: "sps-crest", system: true, name: "SPS Reef Crest", mode: "reefCrest", groupStrategy: "cross", config: { ...modeCatalog.reefCrest, min: 30, max: 70, intensity: 92, randomness: 48 } },
    { id: "gyre-left", system: true, name: "Gyre Links", mode: "gyre", groupStrategy: "gyre", config: { ...modeCatalog.gyre, phase: 180 } },
    { id: "night-calm", system: true, name: "Nachtströmung", mode: "night", groupStrategy: "softSync", config: { ...modeCatalog.night } },
    { id: "detritus-lift", system: true, name: "Detritus Lift", mode: "nutrient", groupStrategy: "cross", config: { ...modeCatalog.nutrient } },
    { id: "pause", system: true, name: "Pause", mode: "pause", groupStrategy: "independent", config: { ...modeCatalog.pause } },
  ],
  schedule: [
    { id: "a1", pumpId: 0, enabled: true, start: "08:00", end: "10:00", presetId: "gentle-lagoon", intensity: 55, groupStrategy: "softSync" },
    { id: "a2", pumpId: 0, enabled: true, start: "10:00", end: "18:00", presetId: "mixed-reef", intensity: 82, groupStrategy: "antiSync" },
    { id: "a3", pumpId: 0, enabled: true, start: "18:00", end: "21:00", presetId: "gyre-left", intensity: 78, groupStrategy: "gyre" },
    { id: "a4", pumpId: 0, enabled: true, start: "21:00", end: "08:00", presetId: "night-calm", intensity: 38, groupStrategy: "softSync" },
    { id: "b1", pumpId: 1, enabled: true, start: "08:00", end: "10:00", presetId: "gentle-lagoon", intensity: 50, groupStrategy: "softSync" },
    { id: "b2", pumpId: 1, enabled: true, start: "10:00", end: "18:00", presetId: "mixed-reef", intensity: 76, groupStrategy: "antiSync" },
    { id: "b3", pumpId: 1, enabled: true, start: "18:00", end: "21:00", presetId: "gyre-left", intensity: 62, groupStrategy: "gyre" },
    { id: "b4", pumpId: 1, enabled: true, start: "21:00", end: "08:00", presetId: "night-calm", intensity: 34, groupStrategy: "softSync" },
  ],
  activeScheduleId: null,
};

const clients = new Set();
const randomTargets = [35, 35];
let lastRandomAtMs = 0;
let lastTickMs = Date.now();
let userPresetCounter = 1;

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function clampPercent(value) {
  return clamp(value, 0, safeMaxPercent);
}

function minutesOfDay(value) {
  const [hours, minutes] = String(value).split(":").map(Number);
  return clamp(hours, 0, 23) * 60 + clamp(minutes, 0, 59);
}

function isNowInSchedule(entry, now = new Date()) {
  const current = now.getHours() * 60 + now.getMinutes();
  const start = minutesOfDay(entry.start);
  const end = minutesOfDay(entry.end);
  if (start === end) return true;
  if (start < end) return current >= start && current < end;
  return current >= start || current < end;
}

function activeScheduleEntry(pumpId = null) {
  if (!state.scheduleEnabled) return null;
  const matches = state.schedule.filter((entry) => entry.enabled && (pumpId == null || entry.pumpId === pumpId) && isNowInSchedule(entry));
  return matches.length ? matches[matches.length - 1] : null;
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

function sine01(phase) {
  return Math.sin(phase * Math.PI * 2) * 0.5 + 0.5;
}

function pulse01(phase, dutyPercent) {
  const p = ((phase % 1) + 1) % 1;
  const duty = clamp(dutyPercent, 5, 95) / 100;
  const edge = Math.min(0.08, duty * 0.35);
  if (p < edge) return smoothstep(p / edge);
  if (p < duty - edge) return 1;
  if (p < duty) return 1 - smoothstep((p - duty + edge) / edge);
  return 0;
}

function waveValue(mode, phase, elapsedSeconds, config) {
  if (mode === "pulse" || mode === "standingWave") return pulse01(phase, config.duty);
  if (mode === "reefCrest") {
    const slow = sine01(phase * 0.6);
    const chop = sine01(phase * 5.2 + 0.2);
    const surge = Math.max(0, Math.sin(phase * Math.PI * 17.3 + 0.4)) ** 4;
    return clamp(slow * 0.42 + chop * 0.31 + surge * 0.36, 0, 1);
  }
  if (mode === "lagoon" || mode === "night") return clamp(0.48 + Math.sin(phase * Math.PI * 2) * 0.2 + Math.sin(elapsedSeconds * 0.025) * 0.1, 0, 1);
  if (mode === "nutrient") return clamp(0.24 + pulse01(phase * 1.6, config.duty) * 0.66 + sine01(phase * 3.5) * 0.12, 0, 1);
  if (mode === "storm") return clamp(0.22 + Math.abs(Math.sin(phase * Math.PI * 7)) * 0.45 + Math.max(0, Math.sin(phase * Math.PI * 23)) ** 3 * 0.36, 0, 1);
  if (mode === "tidal") return sine01(phase * 0.18);
  return sine01(phase);
}

function scheduleForPump(pumpId) {
  const entry = activeScheduleEntry(pumpId);
  if (!entry) return { mode: state.activeMode, config: state.modeConfig, groupStrategy: state.group.strategy };
  if (entry.presetId === "pause") {
    return {
      id: entry.id,
      label: `${entry.start}-${entry.end} Pause`,
      mode: "pause",
      config: { ...modeCatalog.pause },
      groupStrategy: "independent",
    };
  }
  const preset = state.presets.find((item) => item.id === entry.presetId);
  if (!preset) return { mode: state.activeMode, config: state.modeConfig, groupStrategy: state.group.strategy };
  return {
    id: entry.id,
    label: `${entry.start}-${entry.end}`,
    mode: preset.mode,
    config: { ...preset.config, intensity: entry.intensity },
    groupStrategy: entry.groupStrategy || preset.groupStrategy || state.group.strategy,
  };
}

function targetForPump(nowMs, pumpId, scheduled) {
  const elapsedSeconds = nowMs / 1000;
  const mode = scheduled.mode;
  const config = scheduled.config;
  const min = clampPercent(config.min);
  const max = clampPercent(config.max);
  const span = Math.max(0, max - min);
  const intensity = clamp(config.intensity, 0, 100) / 100;
  const phase = elapsedSeconds * clamp(config.frequency, 0.004, 0.5);
  const phaseOffset = clamp(config.phase, 0, 360) / 360;

  const pump = state.pumps[pumpId];
  if (mode === "pause") return 0;
  const pumpPhase = phase + clamp(pump.phaseOffsetDeg, 0, 360) / 360;
  if (mode === "manual") return pump.manualPercent;
  if (mode === "constant") return min + span * intensity;
  if (mode === "random") {
    const intervalMs = 800 + (1 - intensity) * 2200;
    if (nowMs - lastRandomAtMs > intervalMs) {
      lastRandomAtMs = nowMs;
      randomTargets[0] = min + span * (0.25 + Math.random() * 0.75) * intensity;
      randomTargets[1] = min + span * (0.25 + Math.random() * 0.75) * intensity;
    }
    return randomTargets[pumpId];
  }
  if (mode === "gyre") {
    const direction = Math.sin(phase * Math.PI * 2) >= 0 ? 1 : -1;
    const ramp = smoothstep(Math.abs(Math.sin(phase * Math.PI * 2)));
    const dominant = min + span * (0.35 + 0.65 * intensity) * ramp;
    const support = min + span * 0.16 * intensity;
    return (direction > 0 ? [dominant, support] : [support, dominant])[pumpId];
  }
  const effectivePhase = pumpId === 0 ? pumpPhase : pumpPhase + phaseOffset;
  return clampPercent(min + span * intensity * waveValue(mode, effectivePhase, elapsedSeconds, config));
}

function baseTargets(nowMs) {
  return state.pumps.map((pump) => targetForPump(nowMs, pump.id, scheduleForPump(pump.id)));
}

function applyGroup(base, strategy) {
  if (!state.group.enabled || strategy === "independent") return base;
  const master = state.group.masterPump;
  const slave = master === 0 ? 1 : 0;
  const result = [...base];
  if (strategy === "sync" || strategy === "softSync") {
    const avg = (base[0] + base[1]) / 2;
    result[0] = avg * (1 - state.group.balance / 100);
    result[1] = avg * (1 + state.group.balance / 100);
  }
  if (strategy === "antiSync" || strategy === "cross") {
    result[1] = state.modeConfig.min + (state.modeConfig.max - base[0]);
  }
  if (strategy === "masterSlave") {
    result[slave] = base[master] * state.group.slaveRatio;
  }
  if (strategy === "gyre") {
    result[0] = base[0];
    result[1] = base[1] * 0.85;
  }
  return result.map((value) => clamp(value, state.group.sharedMinPercent, state.group.sharedMaxPercent));
}

function finalizePumpTarget(index, value) {
  const pump = state.pumps[index];
  if (!pump.enabled || state.emergencyStop) return 0;
  if (value <= 0) return 0;
  let target = value;
  if (pump.invertOutput) target = safeMaxPercent - target;
  target = target * pump.multiplier + pump.offsetPercent;
  if (pump.outputPercent <= 0.1 && target > 0) {
    target = Math.max(target, pump.startPercent);
  }
  target = clamp(target, pump.minPercent, pump.maxPercent);
  return clampPercent(target);
}

function tick() {
  const nowMs = Date.now();
  const dt = Math.max(0.001, (nowMs - lastTickMs) / 1000);
  lastTickMs = nowMs;
  const scheduledA = scheduleForPump(0);
  const scheduledB = scheduleForPump(1);
  state.activeScheduleId = [scheduledA.id || null, scheduledB.id || null];
  const targets = applyGroup(baseTargets(nowMs), scheduledA.groupStrategy || scheduledB.groupStrategy || state.group.strategy);
  if (scheduledA.mode === "pause") targets[0] = 0;
  if (scheduledB.mode === "pause") targets[1] = 0;

  for (const [index, pump] of state.pumps.entries()) {
    pump.targetPercent = finalizePumpTarget(index, targets[index]);
    const isStarting = pump.outputPercent <= 0.1 && pump.targetPercent > 0;
    const rate = isStarting
      ? pump.startupRampPercentPerSec
      : pump.targetPercent > pump.outputPercent
        ? pump.rampUpPercentPerSec
        : pump.rampDownPercentPerSec;
    const maxStep = rate * dt;
    const delta = pump.targetPercent - pump.outputPercent;
    pump.outputPercent += Math.sign(delta) * Math.min(Math.abs(delta), maxStep);
    if (Math.abs(pump.targetPercent - pump.outputPercent) < 0.05) pump.outputPercent = pump.targetPercent;
    pump.actualRpm = pump.outputPercent * 45;
    pump.currentA = pump.outputPercent * 0.018;
    pump.powerW = pump.currentA * pump.voltageV;
    pump.temperatureC = 27.8 + pump.outputPercent * 0.09;
    pump.runtimeHours += pump.outputPercent > 0 ? dt / 3600 : 0;
  }
  broadcast(JSON.stringify(publicState()));
}

function publicState() {
  const effective = scheduleForPump(0);
  const activeScheduleLabels = state.pumps.map((pump) => {
    const scheduled = scheduleForPump(pump.id);
    return scheduled.id ? scheduled.label : "Manuell";
  });
  return {
    simulation: true,
    activeMode: state.activeMode,
    effectiveMode: effective.mode,
    modeLabel: modeCatalog[effective.mode]?.label || modeCatalog[state.activeMode].label,
    emergencyStop: state.emergencyStop,
    scheduleEnabled: state.scheduleEnabled,
    activeScheduleId: state.activeScheduleId,
    activeScheduleLabel: activeScheduleLabels.join(" / "),
    activeScheduleLabels,
    modeConfig: state.modeConfig,
    modeCatalog,
    group: state.group,
    pumps: state.pumps,
    presets: state.presets,
    schedule: state.schedule,
  };
}

function html() {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reef Flow Control</title>
  <style>
    :root {
      color-scheme: dark;
      --bg:#071013; --panel:#10191d; --panel2:#151f24; --field:#0b1518;
      --text:#eef7f8; --muted:#9fb2b8; --line:#26383e; --a:#4fd8c9; --b:#7fa8ff; --danger:#ff6868; --warn:#f2c76b;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body { margin:0; background:var(--bg); color:var(--text); }
    main { width:min(1500px, calc(100% - 28px)); margin:0 auto; padding:20px 0 90px; }
    header { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; margin-bottom:16px; }
    h1 { margin:0; font-size:clamp(1.35rem, 2vw, 2rem); font-weight:650; letter-spacing:0; }
    h2 { margin:0 0 12px; font-size:1rem; font-weight:620; }
    h3 { margin:0 0 10px; font-size:.95rem; font-weight:620; }
    .sub { margin-top:6px; color:var(--muted); }
    .pill { display:inline-flex; align-items:center; gap:8px; padding:9px 13px; border:1px solid var(--line); border-radius:999px; background:var(--panel); color:var(--muted); white-space:nowrap; }
    .dot { width:9px; height:9px; border-radius:50%; background:var(--a); box-shadow:0 0 14px rgba(79,216,201,.75); }
    .layout { display:grid; grid-template-columns: minmax(0, 1fr) minmax(390px,.72fr); gap:16px; align-items:start; }
    .stack { display:grid; gap:16px; }
    .surface { border:1px solid var(--line); border-radius:8px; background:var(--panel); min-width:0; }
    .panel { padding:15px; }
    .metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; }
    .metric { border:1px solid var(--line); background:var(--panel2); border-radius:8px; padding:11px; min-width:0; }
    .metric span { display:block; color:var(--muted); font-size:.76rem; margin-bottom:7px; }
    .metric strong { display:block; font-size:clamp(1rem,1.35vw,1.35rem); font-weight:650; overflow-wrap:anywhere; }
    .bar { height:10px; border-radius:999px; background:#0a1114; overflow:hidden; margin-top:10px; border:1px solid var(--line); }
    .fill { height:100%; width:0%; background:var(--a); transition:width .18s linear; }
    .fill.b { background:var(--b); }
    .grid2 { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .grid3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
    .modes { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
    button { min-height:44px; border:1px solid var(--line); border-radius:8px; background:var(--panel2); color:var(--text); font:inherit; cursor:pointer; }
    button[aria-pressed="true"], button.primary { border-color:rgba(79,216,201,.65); background:#12302f; }
    button.danger { border-color:rgba(255,104,104,.6); background:#37181b; color:#ffe3e3; }
    input, select { width:100%; min-height:42px; border:1px solid var(--line); border-radius:8px; background:var(--field); color:var(--text); padding:0 10px; font:inherit; }
    input[type="range"] { padding:0; accent-color:var(--a); }
    label { display:flex; justify-content:space-between; gap:10px; color:var(--muted); font-size:.88rem; margin-bottom:7px; }
    .field label { display:block; margin:0; font-size:.78rem; }
    .field input, .field select { margin-top:6px; }
    output { color:var(--text); font-variant-numeric:tabular-nums; }
    .actions { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; margin-top:12px; }
    .pump-card, .row-card { border:1px solid var(--line); background:var(--panel2); border-radius:8px; padding:12px; }
    .pump-head { display:flex; justify-content:space-between; gap:10px; align-items:center; margin-bottom:12px; }
    .schedule-row { display:grid; grid-template-columns: 76px 76px 1fr 86px 1fr 44px; gap:8px; align-items:end; margin-bottom:8px; }
    .preset-row { display:grid; grid-template-columns:1fr auto auto; gap:8px; align-items:center; border:1px solid var(--line); border-radius:8px; padding:10px; background:var(--panel2); margin-bottom:8px; }
    .notice { display:none; margin-top:12px; padding:11px; border-radius:8px; border:1px solid rgba(255,104,104,.55); background:#37181b; color:#ffe3e3; }
    .notice.active { display:block; }
    .tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; }
    .tab-panel[hidden] { display:none; }
    .info { display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; min-height:22px; padding:0; border-radius:50%; font-size:.8rem; color:var(--muted); }
    .label-line { display:flex; align-items:center; justify-content:space-between; gap:8px; color:var(--muted); font-size:.88rem; margin-bottom:7px; }
    .pump-select { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; margin-bottom:12px; }
    @media (max-width:1100px){ .layout{grid-template-columns:1fr}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.modes{grid-template-columns:repeat(2,minmax(0,1fr))} }
    @media (max-width:720px){ main{width:min(100% - 20px,620px);padding-top:12px} header{flex-direction:column}.grid2,.grid3,.actions,.schedule-row{grid-template-columns:1fr}.modes{grid-template-columns:1fr} }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>Reef Flow Control</h1>
        <div class="sub">Maximal einstellbare virtuelle Pumpensteuerung ohne angeschlossene Pumpen.</div>
      </div>
      <div class="pill"><span class="dot"></span><span id="connection">Verbinde...</span></div>
    </header>

    <section class="layout">
      <div class="stack">
        <section class="surface panel">
          <h2>Live</h2>
          <div class="metrics">
            <div class="metric"><span>Aktiver Modus</span><strong id="liveMode">-</strong></div>
            <div class="metric"><span>Zeitplan</span><strong id="liveSchedule">-</strong></div>
            <div class="metric"><span>Pumpe A</span><strong id="liveA">0 %</strong><div class="bar"><div class="fill" id="barA"></div></div></div>
            <div class="metric"><span>Pumpe B</span><strong id="liveB">0 %</strong><div class="bar"><div class="fill b" id="barB"></div></div></div>
          </div>
          <div class="actions">
            <button class="primary" id="boost" type="button">Detritus Lift</button>
            <button id="feed" type="button">Fütterung</button>
            <button id="stop" type="button">Stop</button>
            <button class="danger" id="estop" type="button">Not-Aus</button>
          </div>
          <div class="notice" id="alarm">Not-Aus aktiv. Alle virtuellen Ausgänge sind auf 0 % begrenzt.</div>
        </section>

        <section class="surface panel">
          <h2>Modus wählen</h2>
          <div class="modes" id="modeButtons"></div>
        </section>

        <section class="surface panel">
          <h2>Modusparameter</h2>
          <div class="grid3">
            <div><div class="label-line"><span>Minimum <output id="minOut">0 %</output></span><button class="info" data-info="Untere Leistungsgrenze des Modus. Höhere Werte halten die Grundströmung stabiler, können aber ruhige Phasen reduzieren.">i</button></div><input id="min" type="range" min="0" max="70"></div>
            <div><div class="label-line"><span>Maximum <output id="maxOut">0 %</output></span><button class="info" data-info="Obere Leistungsgrenze des Modus. Begrenzt Spitzen und schützt Tiere sowie Pumpen vor zu hoher Strömung.">i</button></div><input id="max" type="range" min="0" max="70"></div>
            <div><div class="label-line"><span>Intensität <output id="intensityOut">0 %</output></span><button class="info" data-info="Skaliert den Modus innerhalb von Minimum und Maximum. Mehr Intensität bedeutet stärkere Strömungswechsel.">i</button></div><input id="intensity" type="range" min="0" max="100"></div>
            <div><div class="label-line"><span>Frequenz <output id="frequencyOut">0 Hz</output></span><button class="info" data-info="Geschwindigkeit der Wiederholungen. Niedrig wirkt ruhig und langsam, hoch erzeugt Puls- und Wellenbewegung.">i</button></div><input id="frequency" type="range" min="0.004" max="0.42" step="0.002"></div>
            <div><div class="label-line"><span>Phase <output id="phaseOut">0°</output></span><button class="info" data-info="Zeitliche Verschiebung zwischen Pumpen. 180° erzeugt gegenläufige Wechsel, 0° wirkt synchron.">i</button></div><input id="phase" type="range" min="0" max="360"></div>
            <div><div class="label-line"><span>Pulsbreite <output id="dutyOut">0 %</output></span><button class="info" data-info="Anteil der Zeit, in der ein Puls oben bleibt. Kurze Pulsbreite wirkt stoßartiger, lange breiter und ruhiger.">i</button></div><input id="duty" type="range" min="5" max="95"></div>
            <div><div class="label-line"><span>Zufall <output id="randomOut">0 %</output></span><button class="info" data-info="Fügt kontrollierte Variation hinzu. Erhöht Natürlichkeit, sollte aber nicht zu hektisch eingestellt werden.">i</button></div><input id="randomness" type="range" min="0" max="100"></div>
            <div class="field"><div class="label-line"><span>Rampenform</span><button class="info" data-info="Bestimmt, wie weich Übergänge im Modus verlaufen. Weiche Formen sind pumpenschonender und natürlicher.">i</button></div><select id="rampShape"><option value="smooth">Smooth</option><option value="sine">Sinus</option><option value="soft-square">Soft Square</option><option value="pulse">Pulse</option><option value="mixed">Mixed</option><option value="manual">Manual</option><option value="pause">Pause</option></select></div>
          </div>
        </section>

        <section class="surface panel">
          <h2>Pumpe bearbeiten</h2>
          <div class="pump-select" id="pumpSelect"></div>
          <div id="pumpEditors"></div>
        </section>
      </div>

      <div class="stack">
        <section class="surface panel">
          <h2>Gruppe</h2>
          <div class="grid2">
            <div class="field"><div class="label-line"><span>Gruppensteuerung</span><button class="info" data-info="Aktiviert Kopplung zwischen den Pumpen. Die Pumpen berücksichtigen dann die Leistung der jeweils anderen Pumpe.">i</button></div><select id="groupEnabled"><option value="true">Aktiv</option><option value="false">Inaktiv</option></select></div>
            <div class="field"><div class="label-line"><span>Strategie</span><button class="info" data-info="Legt fest, wie Pumpen zusammenarbeiten: synchron, gegenläufig, Master/Slave, Kreuzströmung oder Gyre.">i</button></div><select id="groupStrategy"><option value="independent">Unabhängig</option><option value="sync">Synchron</option><option value="softSync">Weich synchron</option><option value="antiSync">Gegenläufig</option><option value="cross">Kreuzströmung</option><option value="masterSlave">Master/Slave</option><option value="gyre">Gyre</option></select></div>
            <div class="field"><div class="label-line"><span>Master</span><button class="info" data-info="Die Master-Pumpe gibt bei Master/Slave den Verlauf vor. Die andere Pumpe folgt mit Faktor.">i</button></div><select id="masterPump"><option value="0">Pumpe A</option><option value="1">Pumpe B</option></select></div>
            <div><div class="label-line"><span>Slave Faktor <output id="slaveRatioOut">0.78</output></span><button class="info" data-info="Skaliert die Slave-Pumpe relativ zur Master-Pumpe. 0.75 bedeutet 75 % der Master-Leistung.">i</button></div><input id="slaveRatio" type="range" min="0" max="1.5" step="0.01"></div>
            <div><div class="label-line"><span>Balance <output id="groupBalanceOut">0 %</output></span><button class="info" data-info="Verschiebt die Gesamtleistung zwischen Pumpe A und B, ohne den Modus grundsätzlich zu ändern.">i</button></div><input id="groupBalance" type="range" min="-50" max="50"></div>
            <div><div class="label-line"><span>Gruppenlimit <output id="groupMaxOut">70 %</output></span><button class="info" data-info="Sicherheitslimit für gekoppelte Pumpen. Begrenzte Gruppe verhindert zu starke Gesamtströmung.">i</button></div><input id="groupMax" type="range" min="0" max="70"></div>
          </div>
        </section>

        <section class="surface panel">
          <h2>Presets</h2>
          <div class="grid2" style="margin-bottom:10px">
            <div class="field"><div class="label-line"><span>Name</span><button class="info" data-info="Name für ein eigenes Preset. Gespeichert werden Modus, Parameter und aktuelle Gruppenstrategie.">i</button></div><input id="presetName" value="Mein Preset"></div>
            <button id="savePreset" class="primary" type="button">Aktuellen Stand speichern</button>
          </div>
          <div id="presetList"></div>
        </section>

        <section class="surface panel">
          <h2>Zeitplan der ausgewählten Pumpe</h2>
          <div class="actions" style="grid-template-columns:1fr 1fr 1fr">
            <button id="toggleSchedule" type="button">Zeitplan aktiv</button>
            <button id="addSchedule" type="button">Eintrag hinzufügen</button>
            <button id="addPauseSchedule" type="button">Pause eintragen</button>
          </div>
          <div id="scheduleList" style="margin-top:12px"></div>
        </section>
      </div>
    </section>
  </main>

  <script>
    let model = null;
    let lastMessageAt = 0;
    let lastStructureKey = "";
    let selectedPumpId = 0;

    const qs = (id) => document.getElementById(id);
    const post = (path, body) => fetch(path, { method: "POST", headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });

    function buildModeButtons() {
      const target = qs("modeButtons");
      target.innerHTML = "";
      for (const [id, mode] of Object.entries(model.modeCatalog)) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = mode.label;
        button.dataset.mode = id;
        button.setAttribute("aria-pressed", String(id === (model.effectiveMode || model.activeMode)));
        button.addEventListener("click", () => post("/api/v1/mode", { mode: id }));
        target.append(button);
      }
    }

    function info(text) {
      return '<button class="info" data-info="' + text.replaceAll('"', "&quot;") + '">i</button>';
    }

    function pumpEditor(pump) {
      return \`
        <div class="pump-card">
          <div class="pump-head"><h3>\${pump.name}</h3><button type="button" data-pump-toggle="\${pump.id}" aria-pressed="\${pump.enabled}">\${pump.enabled ? "Aktiv" : "Aus"}</button></div>
          <div class="grid2">
            <div><div class="label-line"><span>Manuell <output>\${pump.manualPercent.toFixed(0)} %</output></span>\${info("Direkter Sollwert für diese Pumpe im manuellen Modus. Beeinflusst nur diese Pumpe.")}</div><input data-pump="\${pump.id}" data-key="manualPercent" type="range" min="0" max="70" value="\${pump.manualPercent}"></div>
            <div><div class="label-line"><span>Mindestleistung <output>\${pump.minPercent.toFixed(0)} %</output></span>\${info("Individuelle Untergrenze dieser Pumpe. Verhindert instabile oder zu schwache Strömung.")}</div><input data-pump="\${pump.id}" data-key="minPercent" type="range" min="0" max="70" value="\${pump.minPercent}"></div>
            <div><div class="label-line"><span>Maximalleistung <output>\${pump.maxPercent.toFixed(0)} %</output></span>\${info("Individuelle Obergrenze dieser Pumpe. Begrenzt diese Pumpe auch dann, wenn Modus oder Gruppe mehr anfordern.")}</div><input data-pump="\${pump.id}" data-key="maxPercent" type="range" min="0" max="70" value="\${pump.maxPercent}"></div>
            <div><div class="label-line"><span>Startleistung <output>\${pump.startPercent.toFixed(0)} %</output></span>\${info("Leistung, ab der die Pumpe sicher anlaufen soll. Wichtig für zuverlässigen Softstart.")}</div><input data-pump="\${pump.id}" data-key="startPercent" type="range" min="0" max="70" value="\${pump.startPercent}"></div>
            <div><div class="label-line"><span>Anlaufgeschwindigkeit <output>\${pump.startupRampPercentPerSec.toFixed(0)} %/s</output></span>\${info("Geschwindigkeit beim Start aus 0 %. Höher hilft beim sicheren Anlaufen, niedriger ist sanfter.")}</div><input data-pump="\${pump.id}" data-key="startupRampPercentPerSec" type="range" min="1" max="100" value="\${pump.startupRampPercentPerSec}"></div>
            <div><div class="label-line"><span>Multiplikator <output>\${pump.multiplier.toFixed(2)}</output></span>\${info("Skaliert alle Sollwerte dieser Pumpe. Gut zum Ausgleichen unterschiedlich starker Pumpen.")}</div><input data-pump="\${pump.id}" data-key="multiplier" type="range" min="0" max="1.5" step="0.01" value="\${pump.multiplier}"></div>
            <div><div class="label-line"><span>Offset <output>\${pump.offsetPercent.toFixed(0)} %</output></span>\${info("Addiert oder subtrahiert Leistung für diese Pumpe. Verschiebt die Strömungsbalance dauerhaft.")}</div><input data-pump="\${pump.id}" data-key="offsetPercent" type="range" min="-30" max="30" value="\${pump.offsetPercent}"></div>
            <div><div class="label-line"><span>Rampe hoch <output>\${pump.rampUpPercentPerSec.toFixed(0)} %/s</output></span>\${info("Maximale Beschleunigung. Niedriger ist pumpenschonender und erzeugt weichere Strömungswechsel.")}</div><input data-pump="\${pump.id}" data-key="rampUpPercentPerSec" type="range" min="1" max="70" value="\${pump.rampUpPercentPerSec}"></div>
            <div><div class="label-line"><span>Rampe runter <output>\${pump.rampDownPercentPerSec.toFixed(0)} %/s</output></span>\${info("Maximale Verzögerung. Niedriger verhindert abruptes Abfallen der Strömung.")}</div><input data-pump="\${pump.id}" data-key="rampDownPercentPerSec" type="range" min="1" max="70" value="\${pump.rampDownPercentPerSec}"></div>
            <div class="field"><div class="label-line"><span>Position</span>\${info("Beschreibt die Einbauposition. Später kann daraus eine bessere Visualisierung und Preset-Logik entstehen.")}</div><select data-pump="\${pump.id}" data-key="position"><option>links</option><option>rechts</option><option>vorne</option><option>hinten</option><option>oben</option><option>unten</option></select></div>
            <div><div class="label-line"><span>Richtung <output>\${pump.directionDeg.toFixed(0)}°</output></span>\${info("Ausrichtung der Pumpe in Grad. Hilft bei Gruppenlogik und späterer Strömungsvorschau.")}</div><input data-pump="\${pump.id}" data-key="directionDeg" type="range" min="0" max="359" value="\${pump.directionDeg}"></div>
          </div>
        </div>\`;
    }

    function renderPumpEditors() {
      qs("pumpSelect").innerHTML = model.pumps.map((pump) =>
        '<button type="button" data-select-pump="' + pump.id + '" aria-pressed="' + (pump.id === selectedPumpId) + '">' +
        pump.name + '<br>' + pump.outputPercent.toFixed(1) + ' %</button>'
      ).join("");
      qs("pumpEditors").innerHTML = pumpEditor(model.pumps[selectedPumpId]);
      for (const select of document.querySelectorAll("[data-key='position']")) {
        const pump = model.pumps[Number(select.dataset.pump)];
        select.value = pump.position;
      }
      document.querySelectorAll("[data-select-pump]").forEach((button) => {
        button.addEventListener("click", () => {
          selectedPumpId = Number(button.dataset.selectPump);
          lastStructureKey = "";
          renderState();
        });
      });
      document.querySelectorAll("[data-pump][data-key]").forEach((input) => {
        input.addEventListener("input", () => updatePump(input));
      });
      document.querySelectorAll("[data-pump-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
          const id = Number(button.dataset.pumpToggle);
          post("/api/v1/pump", { id, enabled: !model.pumps[id].enabled });
        });
      });
    }

    function updatePump(input) {
      const id = Number(input.dataset.pump);
      const key = input.dataset.key;
      const value = input.tagName === "SELECT" ? input.value : Number(input.value);
      post("/api/v1/pump", { id, [key]: value });
    }

    function renderPresets() {
      qs("presetList").innerHTML = model.presets.map((preset) => \`
        <div class="preset-row">
          <div><strong>\${preset.name}</strong><br><span style="color:var(--muted)">\${model.modeCatalog[preset.mode]?.label || preset.mode} · \${preset.groupStrategy}</span></div>
          <button type="button" data-preset-apply="\${preset.id}">Laden</button>
          <button type="button" data-preset-delete="\${preset.id}" \${preset.system ? "disabled" : ""}>Löschen</button>
        </div>\`).join("");
      document.querySelectorAll("[data-preset-apply]").forEach((button) => button.addEventListener("click", () => post("/api/v1/preset/apply", { id: button.dataset.presetApply })));
      document.querySelectorAll("[data-preset-delete]").forEach((button) => button.addEventListener("click", () => post("/api/v1/preset/delete", { id: button.dataset.presetDelete })));
    }

    function renderSchedule() {
      qs("toggleSchedule").textContent = model.scheduleEnabled ? "Zeitplan aktiv" : "Zeitplan aus";
      qs("toggleSchedule").classList.toggle("primary", model.scheduleEnabled);
      const selectedEntries = model.schedule.filter((entry) => entry.pumpId === selectedPumpId);
      qs("scheduleList").innerHTML = selectedEntries.map((entry) => \`
        <div class="schedule-row">
          <div class="field"><div class="label-line"><span>Start</span>\${info("Uhrzeit, ab der dieser Pumpen-Zeitplan aktiv wird.")}</div><input data-schedule="\${entry.id}" data-key="start" type="time" value="\${entry.start}"></div>
          <div class="field"><div class="label-line"><span>Ende</span>\${info("Uhrzeit, bis zu der dieser Eintrag läuft. Einträge dürfen über Mitternacht gehen.")}</div><input data-schedule="\${entry.id}" data-key="end" type="time" value="\${entry.end}"></div>
          <div class="field"><div class="label-line"><span>Aktion / Preset</span>\${info("Preset oder Pause, das nur für die ausgewählte Pumpe in diesem Zeitfenster verwendet wird. Pause fährt diese Pumpe kontrolliert auf 0 %.")}</div><select data-schedule="\${entry.id}" data-key="presetId">\${model.presets.map((p) => \`<option value="\${p.id}" \${p.id === entry.presetId ? "selected" : ""}>\${p.name}</option>\`).join("")}</select></div>
          <div class="field"><div class="label-line"><span>Intensität</span>\${info("Überschreibt die Intensität des Presets für diese Pumpe in diesem Zeitfenster.")}</div><input data-schedule="\${entry.id}" data-key="intensity" type="number" min="0" max="100" value="\${entry.intensity}"></div>
          <div class="field"><div class="label-line"><span>Gruppe</span>\${info("Gruppenverhalten während dieses Zeitfensters. So kann die Pumpe synchron oder gegenläufig arbeiten.")}</div><select data-schedule="\${entry.id}" data-key="groupStrategy"><option value="sync">Synchron</option><option value="softSync">Weich synchron</option><option value="antiSync">Gegenläufig</option><option value="cross">Kreuzströmung</option><option value="gyre">Gyre</option><option value="independent">Unabhängig</option></select></div>
          <button type="button" data-schedule-delete="\${entry.id}">×</button>
        </div>\`).join("");
      document.querySelectorAll("[data-schedule][data-key='groupStrategy']").forEach((select) => {
        const entry = model.schedule.find((item) => item.id === select.dataset.schedule);
        select.value = entry.groupStrategy;
      });
      document.querySelectorAll("[data-schedule][data-key]").forEach((input) => input.addEventListener("change", () => {
        const value = input.type === "number" ? Number(input.value) : input.value;
        post("/api/v1/schedule/update", { id: input.dataset.schedule, [input.dataset.key]: value });
      }));
      document.querySelectorAll("[data-schedule-delete]").forEach((button) => button.addEventListener("click", () => post("/api/v1/schedule/delete", { id: button.dataset.scheduleDelete })));
    }

    function renderState() {
      if (!model) return;
      qs("liveMode").textContent = model.modeLabel;
      qs("liveSchedule").textContent = model.activeScheduleLabel;
      qs("liveA").textContent = model.pumps[0].outputPercent.toFixed(1) + " %";
      qs("liveB").textContent = model.pumps[1].outputPercent.toFixed(1) + " %";
      qs("barA").style.width = model.pumps[0].outputPercent / 70 * 100 + "%";
      qs("barB").style.width = model.pumps[1].outputPercent / 70 * 100 + "%";
      qs("alarm").classList.toggle("active", model.emergencyStop);
      qs("estop").textContent = model.emergencyStop ? "Reset" : "Not-Aus";
      const structureKey = JSON.stringify({
        activeMode: model.effectiveMode || model.activeMode,
        modeCount: Object.keys(model.modeCatalog).length,
        pumpConfig: model.pumps.map((pump) => ({
          id: pump.id,
          enabled: pump.enabled,
          name: pump.name,
          minPercent: pump.minPercent,
          maxPercent: pump.maxPercent,
          position: pump.position,
          role: pump.role,
        })),
        presetIds: model.presets.map((preset) => preset.id),
        schedule: model.schedule,
        scheduleEnabled: model.scheduleEnabled,
        selectedPumpId,
      });
      if (structureKey !== lastStructureKey && !document.activeElement?.matches("input, select")) {
        lastStructureKey = structureKey;
        buildModeButtons();
        renderPumpEditors();
        renderPresets();
        renderSchedule();
      }

      const c = model.modeConfig;
      for (const [id, key] of [["min","min"],["max","max"],["intensity","intensity"],["frequency","frequency"],["phase","phase"],["duty","duty"],["randomness","randomness"]]) {
        if (document.activeElement !== qs(id)) qs(id).value = c[key];
      }
      qs("rampShape").value = c.rampShape;
      qs("minOut").textContent = c.min.toFixed(0) + " %";
      qs("maxOut").textContent = c.max.toFixed(0) + " %";
      qs("intensityOut").textContent = c.intensity.toFixed(0) + " %";
      qs("frequencyOut").textContent = c.frequency.toFixed(3).replace(/0$/, "") + " Hz";
      qs("phaseOut").textContent = c.phase.toFixed(0) + "°";
      qs("dutyOut").textContent = c.duty.toFixed(0) + " %";
      qs("randomOut").textContent = c.randomness.toFixed(0) + " %";

      qs("groupEnabled").value = String(model.group.enabled);
      qs("groupStrategy").value = model.group.strategy;
      qs("masterPump").value = String(model.group.masterPump);
      qs("slaveRatio").value = model.group.slaveRatio;
      qs("groupBalance").value = model.group.balance;
      qs("groupMax").value = model.group.sharedMaxPercent;
      qs("slaveRatioOut").textContent = model.group.slaveRatio.toFixed(2);
      qs("groupBalanceOut").textContent = model.group.balance.toFixed(0) + " %";
      qs("groupMaxOut").textContent = model.group.sharedMaxPercent.toFixed(0) + " %";
    }

    function bindStaticControls() {
      ["min","max","intensity","frequency","phase","duty","randomness","rampShape"].forEach((id) => {
        qs(id).addEventListener("input", () => post("/api/v1/config", {
          min: Number(qs("min").value),
          max: Number(qs("max").value),
          intensity: Number(qs("intensity").value),
          frequency: Number(qs("frequency").value),
          phase: Number(qs("phase").value),
          duty: Number(qs("duty").value),
          randomness: Number(qs("randomness").value),
          rampShape: qs("rampShape").value,
        }));
      });
      ["groupEnabled","groupStrategy","masterPump","slaveRatio","groupBalance","groupMax"].forEach((id) => {
        qs(id).addEventListener("input", () => post("/api/v1/group", {
          enabled: qs("groupEnabled").value === "true",
          strategy: qs("groupStrategy").value,
          masterPump: Number(qs("masterPump").value),
          slaveRatio: Number(qs("slaveRatio").value),
          balance: Number(qs("groupBalance").value),
          sharedMaxPercent: Number(qs("groupMax").value),
        }));
      });
      qs("boost").addEventListener("click", () => post("/api/v1/preset/apply", { id: "detritus-lift" }));
      qs("feed").addEventListener("click", () => post("/api/v1/preset/apply", { id: "night-calm" }));
      qs("stop").addEventListener("click", () => post("/api/v1/mode", { mode: "manual", pumpA: 0, pumpB: 0 }));
      qs("estop").addEventListener("click", () => post(model?.emergencyStop ? "/api/v1/emergency-reset" : "/api/v1/emergency-stop"));
      qs("savePreset").addEventListener("click", () => post("/api/v1/preset/save", { name: qs("presetName").value || "Preset" }));
      qs("toggleSchedule").addEventListener("click", () => post("/api/v1/schedule/toggle"));
      qs("addSchedule").addEventListener("click", () => post("/api/v1/schedule/add", { pumpId: selectedPumpId }));
      qs("addPauseSchedule").addEventListener("click", () => post("/api/v1/schedule/add", { pumpId: selectedPumpId, presetId: "pause", intensity: 0, groupStrategy: "independent" }));
      document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-info]");
        if (!button) return;
        alert(button.dataset.info);
      });
    }

    function connect() {
      const protocol = location.protocol === "https:" ? "wss:" : "ws:";
      const socket = new WebSocket(protocol + "//" + location.host + "/ws");
      socket.addEventListener("open", () => qs("connection").textContent = "Live verbunden");
      socket.addEventListener("close", () => { qs("connection").textContent = "Live lokal"; setTimeout(connect, 1200); });
      socket.addEventListener("message", (event) => { lastMessageAt = Date.now(); model = JSON.parse(event.data); renderState(); });
    }

    async function poll() {
      if (Date.now() - lastMessageAt < 1200) return;
      try {
        const response = await fetch("/api/v1/status", { cache: "no-store" });
        model = await response.json();
        qs("connection").textContent = "Live lokal";
        renderState();
      } catch {
        qs("connection").textContent = "Offline";
      }
    }

    bindStaticControls();
    connect();
    setInterval(poll, 700);
    poll();
  </script>
</body>
</html>`;
}

function sendJson(response, payload, status = 200) {
  response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12000) request.destroy();
    });
    request.on("end", () => resolve(body));
  });
}

async function readJson(request) {
  try {
    return JSON.parse((await readBody(request)) || "{}");
  } catch {
    return {};
  }
}

function applyMode(mode, body = {}) {
  const preset = modeCatalog[mode];
  if (!preset) return false;
  state.activeMode = mode;
  state.modeConfig = { ...preset };
  if (mode === "manual") {
    if (body.pumpA != null) state.pumps[0].manualPercent = clampPercent(Number(body.pumpA));
    if (body.pumpB != null) state.pumps[1].manualPercent = clampPercent(Number(body.pumpB));
  }
  return true;
}

function applyConfig(body) {
  const config = state.modeConfig;
  if ("min" in body) config.min = clampPercent(Number(body.min));
  if ("max" in body) config.max = clampPercent(Number(body.max));
  if (config.min > config.max) [config.min, config.max] = [config.max, config.min];
  if ("intensity" in body) config.intensity = clamp(Number(body.intensity), 0, 100);
  if ("frequency" in body) config.frequency = clamp(Number(body.frequency), 0.004, 0.5);
  if ("phase" in body) config.phase = clamp(Number(body.phase), 0, 360);
  if ("duty" in body) config.duty = clamp(Number(body.duty), 5, 95);
  if ("randomness" in body) config.randomness = clamp(Number(body.randomness), 0, 100);
  if ("rampShape" in body) config.rampShape = String(body.rampShape);
}

function applyGroupSettings(body) {
  if ("enabled" in body) state.group.enabled = Boolean(body.enabled);
  if ("strategy" in body) state.group.strategy = String(body.strategy);
  if ("masterPump" in body) state.group.masterPump = Number(body.masterPump) === 1 ? 1 : 0;
  if ("slaveRatio" in body) state.group.slaveRatio = clamp(Number(body.slaveRatio), 0, 1.5);
  if ("balance" in body) state.group.balance = clamp(Number(body.balance), -50, 50);
  if ("sharedMaxPercent" in body) state.group.sharedMaxPercent = clampPercent(Number(body.sharedMaxPercent));
}

function applyPump(body) {
  const pump = state.pumps[Number(body.id)];
  if (!pump) return false;
  const numericKeys = [
    "manualPercent",
    "minPercent",
    "maxPercent",
    "startPercent",
    "startupRampPercentPerSec",
    "multiplier",
    "offsetPercent",
    "phaseOffsetDeg",
    "rampUpPercentPerSec",
    "rampDownPercentPerSec",
    "directionDeg",
    "maintenanceDueHours",
  ];
  for (const key of numericKeys) {
    if (key in body) pump[key] = Number(body[key]);
  }
  if ("enabled" in body) pump.enabled = Boolean(body.enabled);
  if ("invertOutput" in body) pump.invertOutput = Boolean(body.invertOutput);
  if ("position" in body) pump.position = String(body.position);
  if ("role" in body) pump.role = String(body.role);
  pump.manualPercent = clampPercent(pump.manualPercent);
  pump.minPercent = clampPercent(pump.minPercent);
  pump.maxPercent = clampPercent(pump.maxPercent);
  if (pump.minPercent > pump.maxPercent) [pump.minPercent, pump.maxPercent] = [pump.maxPercent, pump.minPercent];
  pump.startPercent = clampPercent(pump.startPercent);
  pump.startupRampPercentPerSec = clamp(pump.startupRampPercentPerSec, 1, 100);
  pump.multiplier = clamp(pump.multiplier, 0, 1.5);
  pump.offsetPercent = clamp(pump.offsetPercent, -30, 30);
  pump.rampUpPercentPerSec = clamp(pump.rampUpPercentPerSec, 1, 70);
  pump.rampDownPercentPerSec = clamp(pump.rampDownPercentPerSec, 1, 70);
  pump.directionDeg = ((Math.round(pump.directionDeg) % 360) + 360) % 360;
  return true;
}

function applyPreset(id) {
  const preset = state.presets.find((item) => item.id === id);
  if (!preset) return false;
  state.activeMode = preset.mode;
  state.modeConfig = { ...preset.config };
  state.group.strategy = preset.groupStrategy;
  return true;
}

function savePreset(name) {
  const id = `user-${Date.now()}-${userPresetCounter++}`;
  state.presets.push({
    id,
    system: false,
    name: String(name || "Preset").slice(0, 48),
    mode: state.activeMode,
    groupStrategy: state.group.strategy,
    config: { ...state.modeConfig },
  });
  return id;
}

function updateSchedule(body) {
  const entry = state.schedule.find((item) => item.id === body.id);
  if (!entry) return false;
  if ("start" in body) entry.start = String(body.start);
  if ("end" in body) entry.end = String(body.end);
  if ("presetId" in body) entry.presetId = String(body.presetId);
  if ("intensity" in body) entry.intensity = clamp(Number(body.intensity), 0, 100);
  if ("groupStrategy" in body) entry.groupStrategy = String(body.groupStrategy);
  if ("enabled" in body) entry.enabled = Boolean(body.enabled);
  return true;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (request.method === "GET" && ["/", "/flow-preview", "/reeftools/flow-preview"].includes(url.pathname)) {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(html());
    return;
  }
  if (request.method === "GET" && url.pathname === "/api/v1/status") {
    sendJson(response, publicState());
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/mode") {
    const body = await readJson(request);
    if (!applyMode(String(body.mode || ""), body)) {
      sendJson(response, { error: "unknown_mode" }, 400);
      return;
    }
    sendJson(response, { ok: true, state: publicState() });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/config") {
    applyConfig(await readJson(request));
    sendJson(response, { ok: true, config: state.modeConfig });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/group") {
    applyGroupSettings(await readJson(request));
    sendJson(response, { ok: true, group: state.group });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/pump") {
    if (!applyPump(await readJson(request))) {
      sendJson(response, { error: "unknown_pump" }, 404);
      return;
    }
    sendJson(response, { ok: true, pumps: state.pumps });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/preset/apply") {
    const body = await readJson(request);
    if (!applyPreset(String(body.id || ""))) {
      sendJson(response, { error: "unknown_preset" }, 404);
      return;
    }
    sendJson(response, { ok: true, state: publicState() });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/preset/save") {
    const body = await readJson(request);
    sendJson(response, { ok: true, id: savePreset(body.name) });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/preset/delete") {
    const body = await readJson(request);
    const preset = state.presets.find((item) => item.id === body.id);
    if (!preset || preset.system) {
      sendJson(response, { error: "preset_not_deletable" }, 400);
      return;
    }
    state.presets = state.presets.filter((item) => item.id !== body.id);
    sendJson(response, { ok: true });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/schedule/toggle") {
    state.scheduleEnabled = !state.scheduleEnabled;
    sendJson(response, { ok: true, scheduleEnabled: state.scheduleEnabled });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/schedule/add") {
    const body = await readJson(request);
    const id = `s${Date.now()}`;
    const presetId = state.presets.some((preset) => preset.id === body.presetId) ? String(body.presetId) : state.presets[0].id;
    state.schedule.push({
      id,
      pumpId: Number(body.pumpId) === 1 ? 1 : 0,
      enabled: true,
      start: "12:00",
      end: "13:00",
      presetId,
      intensity: presetId === "pause" ? 0 : clamp(Number(body.intensity ?? 60), 0, 100),
      groupStrategy: presetId === "pause" ? "independent" : String(body.groupStrategy || "sync"),
    });
    sendJson(response, { ok: true, id });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/schedule/update") {
    if (!updateSchedule(await readJson(request))) {
      sendJson(response, { error: "unknown_schedule_entry" }, 404);
      return;
    }
    sendJson(response, { ok: true, schedule: state.schedule });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/schedule/delete") {
    const body = await readJson(request);
    state.schedule = state.schedule.filter((entry) => entry.id !== body.id);
    sendJson(response, { ok: true });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/emergency-stop") {
    state.emergencyStop = true;
    sendJson(response, { ok: true });
    return;
  }
  if (request.method === "POST" && url.pathname === "/api/v1/emergency-reset") {
    state.emergencyStop = false;
    sendJson(response, { ok: true });
    return;
  }
  sendJson(response, { error: "not_found" }, 404);
});

server.on("upgrade", (request, socket) => {
  if (!String(request.url || "").startsWith("/ws")) {
    socket.destroy();
    return;
  }
  const key = request.headers["sec-websocket-key"];
  const accept = crypto.createHash("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
  socket.write(["HTTP/1.1 101 Switching Protocols", "Upgrade: websocket", "Connection: Upgrade", `Sec-WebSocket-Accept: ${accept}`, "", ""].join("\r\n"));
  clients.add(socket);
  socket.on("close", () => clients.delete(socket));
  socket.on("error", () => clients.delete(socket));
  sendFrame(socket, JSON.stringify(publicState()));
});

function sendFrame(socket, text) {
  const payload = Buffer.from(text);
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, payload.length]);
  } else {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(payload.length, 2);
  }
  socket.write(Buffer.concat([header, payload]));
}

function broadcast(text) {
  for (const client of [...clients]) {
    if (client.destroyed) {
      clients.delete(client);
      continue;
    }
    sendFrame(client, text);
  }
}

setInterval(tick, 200);

server.listen(port, "127.0.0.1", () => {
  console.log(`Reef Flow control running at http://127.0.0.1:${port}`);
});
