import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const playwrightCandidates = [
  'playwright',
  `${process.env.HOME || ''}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`
].filter(Boolean);

let chromium;
for (const candidate of playwrightCandidates) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch (error) {}
}

if (!chromium) {
  console.error('Playwright ist nicht installiert.');
  process.exit(1);
}

const targetUrl = process.argv[2] || 'http://127.0.0.1:8202/index.html#trace-export';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
let page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));

await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(700);

const ids = {
  report: `audit-report-${Date.now()}`,
  entry: `audit-entry-${Date.now()}`
};

const setup = await page.evaluate(async ({ reportId, entryId }) => {
  selectTab('trace-export');
  const state = ensureTraceCalculatorState();
  const report = {
    id: reportId,
    name: 'Audit ICP',
    date: new Date().toISOString(),
    values: traceCalculatorElements.map((element, index) => ({
      key: element.item,
      name: element.item,
      symbol: element.symbol,
      value: index + 1
    }))
  };
  db.icpReports = [...(db.icpReports || []).filter(item => item.id !== reportId), report];
  state.history = state.history.filter(item => item.id !== entryId);
  state.history.push(normalizeTraceCalculatorHistoryEntry({
    id: entryId,
    source: 'manual-history',
    mixtureDate: getTodayDateInputValue(),
    includeInCalculation: true,
    config: { ...state.config, tankLiters: 500, days: 40, dailyDoseMl: 5 },
    amounts: Object.fromEntries(traceCalculatorElements.map(element => [element.item, 1])),
    icp: {},
    createdAt: Date.now()
  }));
  db.reefManagerAquariumLiters = '812.5';
  const assignment = setTraceIcpAssignment(entryId, reportId);
  saveDB(false);
  const persisted = await flushPendingPersistence('data-link-audit-link', false);
  return {
    assignmentOk: assignment.ok,
    persisted,
    linked: state.history.find(item => item.id === entryId)?.sourceIcpReportId === reportId,
    activeReport: state.selectedIcpReportId === reportId
  };
}, { reportId: ids.report, entryId: ids.entry });

await page.close();
page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(700);

const afterReload = await page.evaluate(({ reportId, entryId }) => {
  selectTab('trace-export');
  const state = ensureTraceCalculatorState();
  const entry = state.history.find(item => item.id === entryId);
  renderTraceCalculator();
  const details = document.querySelector('#traceCalculatorHistory details.trace-history-block');
  if (details) details.open = true;
  renderTraceCalculator();
  return {
    linked: entry?.sourceIcpReportId === reportId,
    activeReport: state.selectedIcpReportId === reportId,
    icpValueCount: entry ? Object.keys(entry.icp || {}).length : 0,
    aquariumLiters: db.reefManagerAquariumLiters,
    detailsStayedOpen: details ? document.querySelector('#traceCalculatorHistory details.trace-history-block')?.open === true : null
  };
}, { reportId: ids.report, entryId: ids.entry });

const removed = await page.evaluate(async ({ reportId, entryId }) => {
  const assignment = setTraceIcpAssignment(entryId, '');
  saveDB(false);
  const persisted = await flushPendingPersistence('data-link-audit-unlink', false);
  const state = ensureTraceCalculatorState();
  const entry = state.history.find(item => item.id === entryId);
  return {
    assignmentOk: assignment.ok,
    persisted,
    unlinked: entry?.sourceIcpReportId === '',
    mappingRemoved: !state.icpAssignments?.[reportId]
  };
}, { reportId: ids.report, entryId: ids.entry });

await page.close();
page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(700);
const afterUnlinkReload = await page.evaluate(({ reportId, entryId }) => {
  const state = ensureTraceCalculatorState();
  const entry = state.history.find(item => item.id === entryId);
  const result = {
    unlinked: entry?.sourceIcpReportId === '',
    mappingRemoved: !state.icpAssignments?.[reportId]
  };
  state.history = state.history.filter(item => item.id !== entryId);
  db.icpReports = (db.icpReports || []).filter(item => item.id !== reportId);
  syncStoredTraceIcpAssignments(state);
  saveDB(false);
  return result;
}, { reportId: ids.report, entryId: ids.entry });

const ok = setup.assignmentOk
  && setup.persisted
  && setup.linked
  && setup.activeReport
  && afterReload.linked
  && afterReload.activeReport
  && afterReload.icpValueCount === 11
  && String(afterReload.aquariumLiters) === '812.5'
  && afterReload.detailsStayedOpen !== false
  && removed.assignmentOk
  && removed.persisted
  && removed.unlinked
  && removed.mappingRemoved
  && afterUnlinkReload.unlinked
  && afterUnlinkReload.mappingRemoved
  && errors.length === 0;

console.log(JSON.stringify({ ok, setup, afterReload, removed, afterUnlinkReload, errors }, null, 2));
await browser.close();
process.exit(ok ? 0 : 1);
