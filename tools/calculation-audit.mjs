import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const candidates = [
  'playwright',
  `${process.env.HOME || ''}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`
].filter(Boolean);

let chromium;
for (const candidate of candidates) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch (error) {}
}
if (!chromium) process.exit(1);

const targetUrl = process.argv[2] || 'http://127.0.0.1:8202/index.html#tools';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(600);

const result = await page.evaluate(() => {
  selectTab('tools');
  initToolSection('dosieren-und-messwerte', true);

  const hannaInput = document.getElementById('hannaPhosphorusInput');
  if (hannaInput) hannaInput.value = '16';
  renderHannaPhosphorusConverter();
  const hannaText = document.getElementById('hannaPhosphorusResult')?.textContent || '';

  initMajorCorrectionCalculator();
  const preset = document.getElementById('majorCorrectionPreset');
  const readPreset = id => {
    preset.value = id;
    selectMajorCorrectionPreset();
    return {
      current: Number(document.getElementById('majorCorrectionCurrent')?.value),
      target: Number(document.getElementById('majorCorrectionTarget')?.value),
      result: document.getElementById('majorCorrectionResult')?.textContent || ''
    };
  };

  const khTag = readPreset('osci-kh-tag');
  const khNight = readPreset('osci-kh-nacht');
  const calcium = readPreset('osci-calcium');
  const baseScale = getTraceCalculatorScale({ tankLiters: 500, days: 40 });
  const enlargedScale = getTraceCalculatorScale({ tankLiters: 800, days: 40 });
  const longerScale = getTraceCalculatorScale({ tankLiters: 500, days: 80 });

  return {
    hanna: hannaText.includes('0.0491 mg/l'),
    khTag,
    khNight,
    calcium,
    scales: { baseScale, enlargedScale, longerScale },
    noInvalidResults: !/\b(?:NaN|undefined)\b/.test(`${hannaText} ${khTag.result} ${khNight.result} ${calcium.result}`)
  };
});

const ok = result.hanna
  && result.khTag.current === 7
  && result.khTag.target === 7.5
  && result.khNight.current === 7
  && result.khNight.target === 7.5
  && result.calcium.current === 400
  && result.calcium.target === 420
  && result.scales.baseScale === 1
  && result.scales.enlargedScale === 1.6
  && result.scales.longerScale === 2
  && result.noInvalidResults
  && errors.length === 0;

console.log(JSON.stringify({ ok, result, errors }, null, 2));
await browser.close();
process.exit(ok ? 0 : 1);
