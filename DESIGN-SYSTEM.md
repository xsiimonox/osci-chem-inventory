# Reef Lab - Design-System (v3.6.0)

## Struktur

- `assets/css/design-system.css` besitzt die gemeinsamen Design-Tokens, Themes,
  Komponenten und deren Hover-, Active-, Focus-, Disabled- und Selected-Zustaende.
- `assets/css/style.css` behaelt Feature-Layouts, Sichtbarkeit, Diagramme und
  die Geometrie der vorhandenen Werkzeuge.
- `assets/css/workspace-ui.css` enthaelt Layouts fuer Lagerlisten und Wizards.
- `assets/js/workspace-ui.js` gruppiert die Navigation und misst die Header-Hoehe.
  Die Messung verwendet eine eigene Variable, damit keine Rueckkopplung mit
  der Mindesthoehe des Headers entsteht.
- `assets/js/theme.js` ist die gemeinsame Darstellungsebene des bestehenden
  Theme-Systems. Auch Nebenseiten nutzen dessen Modus und eigene Akzentfarben.
  Speicherung und Benutzerpraeferenzen bleiben im vorhandenen App-Modul.
- Alle HTML-Seiten laden das gemeinsame System zuletzt. Auch die Wave-Demo
  verwendet dessen Tokens und Bedienelemente.

## Gemeinsame Sprache

Graphit und Weissgrau bilden neutrale Flaechen. Mint markiert Aktionen und die
aktive Navigation. Gruen steht fuer Erfolg/ausreichenden Bestand, Gelb fuer
Warnungen, Rot fuer Fehler/leeren oder kritischen Bestand. Farben in Diagrammen
und den Lichtsimulationen bleiben fachliche Kennzeichnungen.

Bestehende Theme-IDs und gespeicherte Benutzerauswahlen bleiben kompatibel:
`default` (Graphit), `light` (Hell), `girl` (Rose), `mint` und `badman` (Koralle).
Eigene Farben aendern Akzente, nicht die neutralen Hintergrundflaechen. Die
Schriftfarbe auf eigenen Primaerfarben wird anhand der Helligkeit gewaehlt.
Auch der Hover-Akzent wird in die Richtung angepasst, die den Textkontrast erhaelt.

- Flaechen: `--app-bg`, `--surface-card`, `--surface-raised`, `--surface-overlay`.
- Text: `--text-primary`, `--text-secondary`, `--font-*`.
- Akzente: `--accent`, `--accent-strong`, `--accent-contrast`.
- Zustaende: `--status-success`, `--status-warning`, `--status-danger`.
- Abstaende: `--space-1` bis `--space-7` (4, 8, 12, 16, 24, 32, 48 px).
- Ecken: 8 px fuer Controls und wiederholte Karten, 4 px fuer kleine Labels.
- Schatten: nur fuer schwebende Dialoge, Menues und Meldungen.

## Komponenten

```html
<section class="workflow-card">
  <h2>Arbeitsbereich</h2>
  <div class="input-group">
    <label for="amount">Menge</label>
    <input id="amount" type="number" inputmode="decimal">
  </div>
  <div class="btn-group">
    <button type="button" class="btn-primary">Speichern</button>
    <button type="button" class="btn-secondary">Abbrechen</button>
  </div>
</section>
```

`btn-primary` bezeichnet die Hauptaktion, `btn-secondary` eine Nebenaktion,
`btn-danger` eine destruktive Aktion. Auslagern ist eine normale Aktion, kein
Fehlerzustand. Labels und native Formfelder behalten ihre vorhandene Semantik.
Die bestehenden Dialoge verwenden dieselben Controls und Tokens.

## App-Startseite

Die Uebersicht verwendet `dashboard-launcher` und die zentralen
`DASHBOARD_APPS`-Definitionen in `assets/js/app.js`. App-Kacheln oeffnen die
vorhandenen Bereiche ueber dieselbe Navigation und beachten deren Sichtbarkeit
und Schreibrechte. Suche und Gruppenfilter filtern die Einstiegskacheln.

`dashboard-app-tile`, die Statusfelder und `workspace-app-bar` teilen sich die
Feature-Farben aus dem Design-System. Helle Themes verwenden kontraststaerkere
Icon-Farben. Strukturierte Kacheltexte umbrechen statt der globalen Textskalierung.
Mobil stehen drei Kacheln nebeneinander, ab 700 px vier. Die Arbeitsbereiche
haben einen direkten Rueckweg zur Uebersicht. Bestehende Diagramme und
Dashboard-Einstellungen bleiben unter Weitere Einblicke erreichbar.

Seitenabschnitte sind ungerahmt und durch Abstand/Linien gegliedert. `card`
ist fuer einzelne wiederholte Eintraege oder tatsaechlich gerahmte Werkzeuge
gedacht. Keine neue Karte um eine bestehende Kartensammlung legen. Tabellen
duerfen einen eigenen horizontalen Scrollbereich besitzen.

Alle einklappbaren Abschnitte im Hauptbereich verwenden eingefasste
Ueberschriftsleisten mit 8-px-Ecken, durchgehendem Rahmen und abgesetztem
Hintergrund. Das gilt auch fuer Tool-Gruppen, Einstellungen und die gespeicherten
ICPs im leeren oder befuellten Zustand. Die OSCI-Workflows nutzen diese Sprache
auch fuer Methodenwahl und Arbeitsschritte. Beschriftungen und geoeffnete
Inhalte haben einheitliche 16-px-Innenabstaende. Informations- und Auswahlaktionen
richten auch ihr Grid/Flex-Inhaltsraster links aus, nicht nur den Text. Nummern,
Titel und Beschreibungen teilen dieselbe Inhaltskante. Der C&R-Eingabeeditor ist als
eigenstaendiges Werkzeug gerahmt; Seitenabschnitte bleiben ansonsten ungerahmt.

Desktop verwendet die linke Navigation; Tablet das bestehende Seitenmenue;
Smartphone eine feste, beschriftete Bottom-Navigation. Die konfigurierbaren
Schnellzugriffe und die bisherigen Einstellungen bleiben erhalten.

Die Lageruebersicht verwendet eine schmale, kategorisierte Produktliste. Jede
Zeile zeigt Produktname, Formel, Bestand und Status. Ein Pfeil oeffnet die
Buchungsaktionen und laedt Verlauf/Prognose erst fuer dieses Produkt. Ein- und
Auslagerung bleibt im geschlossenen Produkt ausgeblendet. Die Produktauswahl
fuer schnelle Buchungen folgt Suche, Kategorie und Schnellfilter und verwendet
die vorhandenen Buchungsdialoge. Sortierung und Produktauswahl bleiben lokal gespeichert.
Fuellstandsortierung nutzt den Anteil an der individuell hinterlegten Kapazitaet;
Produkte ohne Kapazitaet stehen zuletzt, statt unterschiedliche Einheiten zu
vergleichen. Die zuvor globale Kompakt-/Detailumschaltung entfaellt; Details
werden pro Produkt geoeffnet.

## Bereinigung

Zusaetzlich behobene Anzeigeprobleme:

- Doppelte horizontale Verschiebung durch alte Desktop-Sidebar-Regeln.
- Header-Hoehen-Rueckkopplung beim Wechsel zwischen Smartphone und Desktop.
- Alte Header-Animationen auf den Kopfzeilen von Produktkarten.
- Zu breite Trace-Felder und Historien-Aktionen auf schmalen Geraeten.
- Abgeschnittene Suchtreffer und negative Raender am Trace-Titel.
- Uneinheitliche Button-Ecken, dicht gepackte Einstellungen und verdeckte Inhalte
  durch das doppelte schwebende Demo-Label. Der Demo-Hinweis bleibt im Header sichtbar.
- Getrennte Theme-Behandlung von Hauptseite und Hilfe/Rechtlichem/Wave-Demo.
- Gesperrtes Zoomen auf den rechtlichen Seiten.
- Zentrierte Inhaltsraster trotz linksbuendiger Schrift in Trace-Schritten,
  C&R-Auswahl, Historien-Statusaktionen und Messwertlisten.
- Zu schmale Rasterspalten fuer die Lagerverwaltungs-Buttons.
- Eckige Tool-Gruppen und fehlende Hintergrund-/Rahmenabsetzung der ICP-Historie.

Die alten Styles wurden mit einem CSS-Parser migriert: rund 2.600 visuelle
Deklarationen tokenisiert/zentralisiert und ueber 200 widerspruechliche Chrome-Regeln
entfernt. Die grosse Feature-Datei wurde von rund 637 auf 508 kB reduziert.
Die gesonderten fachlichen Marker, Cursor-/Party-Effekte und Simulationen
wurden nicht durch generische Oberflaechenfarben ersetzt.

`tools/migrate-design-styles.py` dokumentiert die einmalige Migration. Nicht
als normalen Build-Schritt verwenden. Benoetigt `tinycss2`; ohne `--apply`
schreibt es keine Dateien.

## Verifikation

```sh
python3 -m http.server 8202
node tools/design-system-audit.mjs
node tools/smoke-test.mjs
node tools/smoke-test.mjs http://127.0.0.1:8202/index.html desktop
node tools/workspace-ui-audit.mjs
node tools/inventory-overview-audit.mjs
node tools/data-link-audit.mjs
node tools/calculation-audit.mjs
```

Die Tests benoetigen Playwright/Chromium und verwenden isolierte Browserprofile.
Der Design-Audit prueft 13 Bereiche bei 320, 390, 671, 768 und 1440 px, geoeffnete
Accordions und Tool-Karten, alle fuenf Themes, Button-Kontraste in normalen,
Hover- und gedrueckten Zustaenden, Such-/Lagerdialoge, Offline-Neuladen
auch nach Erstinstallation, Theme-Vererbung mit eigenen Farben sowie Hilfe,
Datenschutz, Impressum und Wave-Demo. Er prueft auch gemeinsame linke Inhaltskanten
und Controls, die ueber ihre unmittelbaren Container hinausragen. Zusaetzlich
werden Rahmen und Rundungen sichtbarer Karten sowie Hintergrundabsetzung aller
einklappbaren Ueberschriften geprueft. Leere Tool-/ICP-Profile werden bei 320,
671 und 1440 px separat getestet; insgesamt sind es 186 Pruefungen.
Report und Screenshots liegen standardmaessig
unter `/tmp/reeftools-design-audit`. `DESIGN_AUDIT_OUTPUT` aendert das Ziel.

`tools/refresh-guide-screenshots.mjs` aktualisiert die zehn Bilder der Anleitung
mit isolierten Demo-Daten. Es greift nicht auf das echte Browserprofil zu.

Automatisierte Layout-/Funktionstests und Screenshot-Kontrolle ersetzen keinen
Test auf jedem physischen iOS-/Android-Geraet. Google-Login und Cloud-Sync wurden
dabei nicht mit einem echten Konto ausgefuehrt; deren Business-Logik ist unveraendert.

## Release

`tools/bump-version.mjs` aktualisiert alle HTML-Asset-URLs, `version.json` und
den Service-Worker-Cache. `design-system.css` ist Teil des Offline-Caches.
Versionierte Asset-URLs verwenden offline die Kern-Dateien desselben Release-Caches,
damit die neuen Styles und das Theme-Modul bereits nach der ersten Installation laden.
Fuer den Rollout die geaenderten HTML-, CSS-, JS-, Manifest-, Service-Worker-
und Versionsdateien gemeinsam veroeffentlichen. Nutzerdaten/LocalStorage
muessen dafuer nicht geloescht werden.
