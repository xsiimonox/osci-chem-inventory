# ReefTools: schrittweise UI- und Code-Modernisierung

Update: Die erste Integration ist mit v3.5.1 umgesetzt. Die folgenden Ausschnitte
dokumentieren den ursprünglichen Entwurf; der ausgeführte UI-Code steht in
`assets/js/workspace-ui.js` und `assets/css/workspace-ui.css`.
Lagerdetails werden lazy erzeugt, Ansicht und optionale Kapazitäten lokal gespeichert,
Wizards behalten ihre Schritte und C&R-Entwürfe. Bestehende Buchungs- und
Zuordnungsfunktionen werden weiterverwendet. C&R meldet Abschluss erst nach dem
lokalen Persistenz-Flush. Persönliche Navigationsreihenfolgen bleiben erhalten.
Der verbleibende fachliche Code in `app.js` wurde nicht komplett in ES-Module zerlegt.
Die Beispiele verwenden Vanilla JavaScript und vorhandene APIs. Neue Hilfsfunktionen
werden zuerst im bestehenden Script integriert; echte ES-Module folgen nach Einführung
expliziter Daten- und Aktionsschnittstellen. Ein neues Framework ist nicht erforderlich.

## 1. Lager: leichte Karten und Details bei Bedarf

`filterLager()` baut derzeit bei jedem Filterwechsel alle Karten neu auf.
`renderProductCard()` berechnet dabei Reichweite, Verbrauch und Historie selbst bei
geschlossenem Detailbereich. Favoriten erscheinen zudem nochmals in ihrer Kategorie.

Für 33+ Artikel empfehle ich leichte Karten für alle Treffer und Lazy Rendering der
teuren Details. Das erhält Browsersuche, Tastaturbedienung und variable Kartenhöhen.
Eine echte virtuelle Liste wird erst bei mehreren hundert Artikeln sinnvoll; sie
braucht Höhenmessung, Fokusverwaltung und eine Alternative für Drucken/Browsersuche.
`content-visibility` allein reduziert Layoutarbeit, aber nicht die Zahl der DOM-Knoten.

### Toolbar: in `renderLager()` ergänzen

```html
<fieldset class="inventory-view-switch">
  <legend>Ansicht</legend>
  <label><input type="radio" name="inventoryView" value="compact" checked> Kompakt</label>
  <label><input type="radio" name="inventoryView" value="detail"> Details</label>
</fieldset>
```

### Leichte Karte: Alternative zu `renderProductCard()`

```js
function renderLeanProductCard(cat, item, warningItems) {
  const stock = Number(db.inventory[cat]?.[item] || 0);
  const threshold = Number(db.thresholds?.[item] || 0);
  const status = stock <= 0 ? 'empty'
    : threshold > 0 && stock <= threshold ? 'critical'
    : warningItems.has(item) ? 'warning' : 'optimal';
  const labels = {
    empty: 'Leer', critical: 'Kritisch', warning: 'Knapp', optimal: 'Ausreichend'
  };
  // Prozentfüllung nur mit einer fachlich definierten Kapazität anzeigen.
  // Ein Warnlimit ist keine Behälterkapazität.
  return `<article class="inventory-card inventory-card--lean"
      data-name="${escapeHtml(item)}" data-category="${escapeHtml(cat)}"
      data-stock-status="${status}">
    <h3>${escapeHtml(item)}</h3>
    <strong>${formatItemAmount(item, stock)}</strong>
    <span class="stock-status">${labels[status]}</span>
    <div class="inventory-card-actions">
      ${isWarehouseReadOnlyView() ? '<span>Nur Ansicht</span>' : `
        <button type="button" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "in")'>Einlagern</button>
        <button type="button" onclick='openModal(${jsArg(cat)}, ${jsArg(item)}, "out")'>Auslagern</button>`}
    </div>
    <details class="product-history" data-lazy-stock-details>
      <summary>Verlauf & Prognose</summary>
      <div data-details-body></div>
    </details>
  </article>`;
}

function mountLazyStockDetails(root) {
  root.querySelectorAll('[data-lazy-stock-details]').forEach(details => {
    const load = () => {
      if (!details.open) return;
      const item = details.closest('[data-name]').dataset.name;
      const metrics = getUsageMetrics(item);
      const body = details.querySelector('[data-details-body]');
      body.replaceChildren();
      const reach = document.createElement('p');
      reach.textContent = `Reichweite: ${formatWeeksLeft(item)}`;
      const usage = document.createElement('p');
      usage.textContent = metrics.perDay
        ? `Verbrauch: ${formatItemAmount(item, metrics.perDay * 7, 2)} / Woche`
        : 'Noch keine Verbrauchsdaten';
      body.append(reach, usage);
      // Weitere Historienzeilen hier erst beim Öffnen erzeugen.
    };
    details.addEventListener('toggle', load);
    if (details.open) load();
  });
}
```

In `filterLager()` die Treffer zunächst als Daten sammeln. `getStockAlerts()` einmal
pro Render auswerten. Favoriten entweder sortieren oder in separater Gruppe darstellen,
aber nicht doppelt rendern. Kategorie-HTML in einem Array sammeln und einmal zuweisen,
statt wiederholt `innerHTML +=` zu verwenden. Danach `mountLazyStockDetails()` aufrufen.
Bestehende Favoriten-/Limit-Aktionen im Detailbereich weiter verfügbar halten.

### Ansicht speichern und Such-Rendering bündeln

```js
const INVENTORY_VIEW_KEY = 'reeftools.inventory-view.v1';
function readInventoryView() {
  try { return localStorage.getItem(INVENTORY_VIEW_KEY) === 'detail' ? 'detail' : 'compact'; }
  catch { return 'compact'; }
}
function applyInventoryView(root, mode) {
  root.dataset.view = mode;
  root.querySelectorAll('[data-lazy-stock-details]').forEach(el => {
    el.open = mode === 'detail';
  });
}
// Nach jedem Lager-Render anwenden. Radio-Listener nur beim Erstellen der Shell binden.
function bindInventoryView(shell) {
  shell.querySelectorAll('[name="inventoryView"]').forEach(input => {
    input.checked = input.value === readInventoryView();
    input.addEventListener('change', () => {
      try { localStorage.setItem(INVENTORY_VIEW_KEY, input.value); }
      catch { /* Ansicht bleibt auch ohne Browser-Speicher bedienbar. */ }
      applyInventoryView(shell, input.value);
    });
  });
}
let inventoryFrame = 0;
function scheduleInventoryRender() {
  cancelAnimationFrame(inventoryFrame);
  inventoryFrame = requestAnimationFrame(filterLager);
}
// Im Suchfeld oninput="filterLager()" durch scheduleInventoryRender() ersetzen.
```

Bei Buchungen einzelne betroffene Karten aktualisieren; bei Lagerwechsel den gesamten
Bereich. Offene Details anhand Kategorie + Produktnamen sichern und wiederherstellen.
Die laufende Ansicht muss bei Änderung von Beständen auch bereits offene Details erneuern.

## 2. Einheitliche Statusfarben und responsive Karten

```css
:root {
  --stock-empty: #d94b60;
  --stock-critical: #c83d50;
  --stock-warning: #e0a52b;
  --stock-optimal: #20a67a;
}
.inventory-card[data-stock-status="empty"] { --stock-color: var(--stock-empty); }
.inventory-card[data-stock-status="critical"] { --stock-color: var(--stock-critical); }
.inventory-card[data-stock-status="warning"] { --stock-color: var(--stock-warning); }
.inventory-card[data-stock-status="optimal"] { --stock-color: var(--stock-optimal); }
.stock-status { border-inline-start: 4px solid var(--stock-color); padding-inline-start: 8px; }
.inventory-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 12px;
}
.inventory-card--lean { min-width: 0; padding: 12px; border-radius: 8px; }
.inventory-card--lean h3 { font-size: 16px; overflow-wrap: anywhere; }
.inventory-card-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.inventory-card-actions button { min-height: 44px; border-radius: 8px; }
.inventory-view-switch { display: flex; flex-wrap: wrap; gap: 12px; }
```

Statusfarben in Trace, Nachbestellung und Lager über dieselben semantischen Tokens
verwenden. Texte und Symbole bleiben erhalten: Farbe allein reicht nicht.
Kontrast pro Theme prüfen. Leer/Kritisch erhalten dieselbe Gefahrenfamilie.

Eine echte Füllstandsleiste nur hinzufügen, wenn eine Kapazität in derselben Einheit
wie der Bestand bekannt ist. Ohne Kapazität den absoluten Bestand zeigen. Beispiel:

```js
function renderStockBar(stock, capacity) {
  if (!Number.isFinite(capacity) || capacity <= 0) return '';
  const fraction = Math.max(0, Math.min(1, stock / capacity));
  return `<meter min="0" max="1" value="${fraction}"
    aria-label="Füllstand">${Math.round(fraction * 100)} %</meter>`;
}
```

## 3. C&R und Trace als separate Wizard-Views

Empfehlung: bestehende Tab-Views verwenden, kein großes Modal. Das vermeidet
verschachtelte Dialoge, mobile Tastaturprobleme und doppelte Feld-IDs.
Vorhandene Felder in Schritt-Panels verschieben, nicht kopieren.

| Workflow | Schritt 1 | Schritt 2 | Schritt 3 | Abschluss |
|---|---|---|---|---|
| C&R | Rezept einfügen | Erkennung prüfen | Lager/Ersatzprodukte prüfen | Auslagern |
| Trace | ICP/Startlösung wählen | Volumen/Laufzeit | Rezept und Grenzen prüfen | Speichern/Auslagern |

Historie außerhalb des Wizards behalten. Experteneinstellungen als eigenen
aufklappbaren Bereich anbieten. Neue Eingaben als Entwurf getrennt vom gebuchten
Bestand speichern. Vor-/Zurück-Navigation darf keine Lagerbuchung auslösen.

### Wiederverwendbarer Controller

```html
<section data-wizard aria-label="C&R Auslagerung">
  <p data-step-status role="status" aria-live="polite"></p>
  <section data-step><h3 tabindex="-1">Rezept</h3><!-- bestehende Eingaben --></section>
  <section data-step hidden><h3 tabindex="-1">Prüfung</h3><!-- bestehende Vorschau --></section>
  <section data-step hidden><h3 tabindex="-1">Bestand</h3><!-- Bestandsprüfung --></section>
  <p data-step-error role="alert"></p>
  <button type="button" data-back>Zurück</button>
  <button type="button" data-next>Weiter</button>
</section>
```

```js
function mountWizard(root, { validate, commit, finalLabel = 'Speichern' }) {
  const panels = [...root.querySelectorAll('[data-step]')];
  const back = root.querySelector('[data-back]');
  const next = root.querySelector('[data-next]');
  const error = root.querySelector('[data-step-error]');
  let step = 0, busy = false;
  function show(focus = true) {
    panels.forEach((panel, i) => { panel.hidden = i !== step; });
    back.disabled = busy || step === 0;
    next.disabled = busy;
    next.textContent = step === panels.length - 1 ? finalLabel : 'Weiter';
    root.querySelector('[data-step-status]').textContent = `Schritt ${step + 1} von ${panels.length}`;
    if (focus) panels[step].querySelector('h3')?.focus();
  }
  const previous = () => { if (!busy && step > 0) { step--; error.textContent = ''; show(); } };
  const advance = async () => {
    if (busy) return;
    busy = true; error.textContent = ''; show(false);
    try {
      const message = await validate(step);
      if (message) { error.textContent = message; return; }
      if (step < panels.length - 1) { step++; show(); }
      else {
        const result = await commit();
        if (result?.ok !== true) throw new Error(result?.message || 'Vorgang noch nicht abgeschlossen.');
        root.dispatchEvent(new CustomEvent('wizard-complete', { detail: result }));
      }
    } catch (err) { error.textContent = err.message || 'Speichern fehlgeschlagen.'; }
    finally { busy = false; show(false); }
  };
  back.addEventListener('click', previous);
  next.addEventListener('click', advance);
  show(false);
  return () => {
    back.removeEventListener('click', previous);
    next.removeEventListener('click', advance);
  };
}
```

Integration: `previewCRPaste()` und `parseCRPasteAmounts()` weiterverwenden.
Vor dem letzten Schritt Quelle erneut parsen und Bestände erneut prüfen.
`processCRPaste()` startet aktuell eine Konflikt-Queue und liefert keinen verlässlichen
Erfolgswert. Vor dem Anschluss an `commit()` muss die Queue eine Promise mit explizitem
Ergebnis liefern: erst nach allen Buchungen und erfolgreicher lokaler Speicherung
`{ ok: true }`, bei Abbruch `{ ok: false, message: ... }`. Nicht sofort Erfolg melden.

Trace verwendet weiterhin `calculateTraceRecipe()` und die bestehende
ICP-Zuordnungslogik. Keine zweite Zuordnungstabelle einführen. Entwürfe mit Aquarium-
und Lager-ID versehen; bei Kontextwechsel nicht im falschen Lager buchen.
Speicherfehler anzeigen und den Entwurf offen halten. Nach erfolgreicher Buchung
gegen Doppelklick und erneutes Auslösen desselben Auftrags absichern.

## 4. ICP: Erkennung und Berechenbarkeit getrennt anzeigen

`previewIcpImport()` zeigt bereits Gesamtzahl, numerische Werte und Warnungen.
Zusätzlich die elf für OSCI Trace relevanten Elemente zählen; andere ICP-Werte bleiben
in der bestehenden Vorschau sichtbar. "11/11 erkannt" heißt nicht automatisch,
dass alle Werte numerisch berechenbar sind. Doppelte Symbole gesondert warnen.

```js
function renderTraceMatchFeedback(rows) {
  const symbols = traceCalculatorElements.map(element => element.symbol);
  const matches = symbols.map(symbol => ({
    symbol,
    row: getTraceIcpValueFromReport({ values: rows }, { symbol })
  }));
  const recognized = matches.filter(match => match.row).length;
  const numeric = matches.filter(match => Number.isFinite(match.row?.value)).length;
  const missing = matches.filter(match => !match.row).map(match => match.symbol);
  const complete = numeric === symbols.length;
  return `<div class="icp-match-feedback" role="status" aria-live="polite"
      data-stock-status="${complete ? 'optimal' : 'warning'}">
    <strong>${complete ? '&#10003; ' : ''}${recognized}/11 Trace-Elemente erkannt</strong>
    <span>${numeric}/11 numerisch auswertbar</span>
    ${missing.length ? `<span>Fehlend: ${missing.join(', ')}</span>` : ''}
  </div>`;
}
// In previewIcpImport(), nach Analyse und vor der gruppierten Vorschau:
// ${renderTraceMatchFeedback(rows)}
```

Die Symbolmenge stammt direkt aus `traceCalculatorElements` und wird nicht doppelt
gepflegt: Co, Ni, Fe, Mn, Cu, Cr, Zn, F, I, V und Se.
Qualitative Angaben wie "nn" nicht eigenständig in Null umwandeln: vorhandene
Parserregeln erhalten. Das Speichern einer teilweise erkannten ICP bleibt möglich;
die Freigabe für Berechnungen erfolgt separat nach den vorhandenen fachlichen Regeln.

## 5. Mobile Navigation und sekundäre Funktionen

Eine fixe Bottom-Bar existiert bereits. Ihre bestehenden Icons, Aktivmarkierung und
Feature-/Sichtbarkeitsregeln weiterverwenden. Neue Standardreihenfolge:

```js
// In getDefaultMobileQuickTabs() als neue Standardliste verwenden:
return ['lager', 'trace-export', 'icp', 'tools'];
```

Gespeicherte persönliche Reihenfolgen nicht beim Start überschreiben.
"Mehr" bleibt als fünfter Zugang für Logbuch, Korallen und weitere Bereiche.
Das Hamburger-Menü in zwei Gruppen trennen: "Arbeitsbereiche" und
"Verwaltung & Hilfe". Bestehende Export- und Hilfefunktionen dort verlinken;
`applyMenuOrder()` so anpassen, dass es Buttons in ihre jeweilige Gruppe sortiert
und nicht wieder in einen einzigen Container hängt.

```css
@media (max-width: 767px) {
  .mobile-bottom-nav {
    position: fixed;
    inset: auto 0 0;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding-bottom: env(safe-area-inset-bottom);
  }
  .mobile-bottom-nav button { min-width: 0; min-height: 48px; border-radius: 8px; }
  .mobile-nav-label { white-space: normal; font-size: 12px; }
}
```

Diese Regeln in den bestehenden Mobile-Block integrieren, nicht als weitere
Override-Schicht ans CSS-Ende hängen. Dort existieren bereits zahlreiche konkurrierende
Bottom-Bar-Regeln. Vorher je Theme die wirksamen Regeln prüfen und zusammenführen.
Content-Abstand, Safe-Area, Tastatur und Dialog-Z-Index gemeinsam kontrollieren.

## 6. Modulgrenzen und Integrationsreihenfolge

Zielmodule nach Einführung von expliziten Schnittstellen:

- `domain/inventory`: Bestände, Umrechnungen, Warnungen; keine DOM-Zugriffe.
- `domain/icp`: Parsing und Messwerte; keine Buchungen.
- `domain/trace`: Berechnung und zentrale Zuordnungsregeln.
- `storage`: einzige Schreibstelle für persistente Fachdaten.
- `ui/inventory`, `ui/wizard`, `ui/navigation`: Darstellung und Benutzeraktionen.

UI-Präferenzen wie Ansicht dürfen lokal separat gespeichert werden. ICP-Verknüpfungen,
Bestände und historische Rezepturen bleiben im bestehenden zentralen Datenmodell.
Beim Modulwechsel Inline-Handler durch Event-Delegation ersetzen; `type="module"`
macht Funktionen nicht automatisch global verfügbar. Erst nach Migration aller
Aufrufer bisherige globale Funktionen entfernen. Neue Dateien im Service-Worker-Cache
registrieren und beim Release die Version gemeinsam erhöhen.

Empfohlene Schritte: leichte Lagerkarten und Lazy Details; dann Ansicht und Farben;
danach Navigation und ICP-Feedback; zuletzt Wizard-Controller und Buchungs-Queue.
Jeden Schritt separat veröffentlichen und mit echten Importbeispielen kontrollieren.

## 7. Abnahme

Die Integration wurde mit Browser-Klicktests, Reloads, einer C&R-Testbuchung,
ICP-Verknüpfungs- und Berechnungsregressionen geprüft. Mobile und Desktop-Smoke-Tests
sind erfolgreich. Bei 33 Karten sank die Anzahl der Elemente im Lagercontainer von
1172 auf 506 (rund 57 % weniger). Das ist eine DOM-Messung, kein Beleg für eine
bestimmte Geschwindigkeitsverbesserung auf echten Mobilgeräten.
Zusätzlicher Test: `tools/workspace-ui-audit.mjs`.

- 33+ Artikel, Filter, Favoriten, leeres Lager und schreibgeschützte Freigabe prüfen.
- DOM-Knoten und Renderzeit vor/nach Änderung auf demselben Mobilgerät messen.
- Suchfeld, Fokus und geöffnete Details nach Buchungen/Filtern erhalten.
- Navigation bei 320, 390, 768 und 1440 Pixeln sowie je Theme prüfen.
- Vollständige, unvollständige, qualitative und doppelte ICP-Werte importieren.
- Zuordnung hinzufügen/ändern/entfernen, Reload und Offline-Speicherung prüfen.
- Wizard vor/zurück/abbrechen, Lagerwechsel, Speicherfehler und Doppelklick simulieren.
- C&R-Ersatzstoffe, knappe Bestände und abgebrochene Konflikt-Queues prüfen.
- Vorhandene `smoke-test.mjs`, `data-link-audit.mjs` und `calculation-audit.mjs`
  nach jeder fachlich relevanten Integration ausführen.
