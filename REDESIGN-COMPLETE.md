# Redesign abgeschlossen – Prioritäten 1 bis 8

## Zusammenfassung

Das Redesign von Reef.Storage&Tools ist über alle acht Prioritäten abgeschlossen. Die vorhandene Fachlogik, Datenmodelle, Berechnungen, Rezepturen, Lagerprozesse, Import-/Exportformate und Google-Drive-Formate wurden in Priorität 7 und 8 nicht umgebaut. Der Schwerpunkt lag auf konsistenter Bedienung, verständlichen Zuständen, Responsive Design, Accessibility und Regressionstests.

## Umgesetzte Prioritäten

1. Design-Tokens, Grundtypografie, Flächen, Abstände, Radien, Schatten und Fokus
2. Buttons, Formulare, Statusdarstellung, Dialoge und Rückmeldungen
3. Dashboard, konfigurierbare Übersicht und direkte Weiterleitung in Quellbereiche
4. Rechner, Dosierung, Tool-Kategorien, Favoriten und Ergebnisdarstellung
5. Logbuch, ToDos, Messwerte, Diagramme, Osmose- und Vorratsverwaltung
6. Korallen, Statistik, Protokoll, Wareneingang und Nachbestellung
7. Einstellungen, Themes, Navigation, Produkte, Tara, Drive, Sicherung, Import/Export und Updates
8. Theme-, Accessibility-, Responsive-, PWA- und Regression-Abschlussprüfung

## Designsystem

Zentrale Tokens liegen in `style.css`: `--app-bg`, `--nav-bg`, `--surface-card`, `--surface-raised`, `--border-color`, `--text-primary`, `--text-secondary`, `--accent`, semantische Statusfarben, `--space-1` bis `--space-7`, drei Radien, Schatten, Safe-Area-Werte und Bewegungszeiten.

Wichtige Komponenten: Seitenköpfe, Karten, Status-Badges, App-Dialoge, Toasts, Formfelder, Tool-Ergebnisse, mobile Bottom-Navigation, mobile Mehr-Navigation, Einstellungsakkordeons, Gruppenfilter, lokale Sicherungskarten und Drive-Statuskarten.

## Navigation und Responsive Design

- Hauptansichten: Übersicht, Lager, C&R, Trace, Tools, Logbuch, Statistik, Protokoll, Korallen, Wareneingang, Nachbestellen, Einstellungen
- Persönliche Reihenfolge, Sichtbarkeit und vier mobile Schnellziele bleiben erhalten.
- Kerngrenzen: Mobil bis 767 px, Tablet bis 1023 px, Desktop ab 1024 px; zusätzliche Detailkorrekturen bei 390/430/600/820 px.
- Safe Areas, Bottom-Navigation, mobile Dialoge, lange Bezeichnungen und horizontale Überläufe wurden geprüft.

## Themes

Geprüft wurden Standard Dark, Light, Girl, Mint und BADMAN. Primär-/Sekundärtext und Akzent wurden auf den jeweiligen Kartenflächen geprüft. Akzentkontrast nach Abschluss: Dark 6,26:1, Light 5,69:1, Girl 5,23:1, Mint 7,72:1, BADMAN 5,05:1. BADMAN-Hinweistexte verwenden wieder die lesbare Theme-Sekundärfarbe.

## Priorität 7

- Einstellungen in filterbare Gruppen mit standardmäßig geschlossenen Akkordeons gegliedert
- aktive Gruppe sichtbar; mobile Gruppenleiste horizontal scrollbar
- Produkt-, Preset-, Tara- und Shop-Link-Listen als responsive Karten/Zeilen vereinheitlicht
- dynamische Produkt-, Preset-, Behälter- und Shop-Texte sicher ausgegeben
- Drive-Status ohne Tokenanzeige, mit sichtbarem Laufzustand und Doppelausführungsschutz
- Drive-Trennung, Update, Produkt-/Preset-/Tara-Löschung auf vorhandene App-Dialoge migriert
- lokale Sicherung, Wiederherstellung, Theme-Persistenz, Menü und Schnellzugriff getestet
- bestehender Reload-Wettlauf beim Löschen eigener Produkte behoben

Details: `REDESIGN-P7-AUDIT.md`.

## Priorität 8

- alle zwölf Ansichten über die vollständige Größenmatrix geprüft
- Theme-Kontrast und mobile Touch-Ziele nachgebessert
- Schnellansicht im Lager von visuellen Inline-Styles auf Komponentenklassen umgestellt
- Schnellansicht mit Dialogrolle, sicherer Textausgabe und beschriftetem Schließen-Button ergänzt
- Ressourcenüberschriften vereinheitlicht und Sangokai-Link auf geprüftes HTTPS umgestellt
- den parallel erneut eingebrachten Sangokai-Suchassistenten aus dem Priorität-8-Stand entfernt; der reine Ressourcenlink bleibt erhalten
- sichtbare App-Version, `version.json`, Asset-Version und Service-Worker-Cache abgeglichen
- defekten Projekt-Export (`exportedAt` nicht definiert) behoben

## Accessibility

- keine sichtbaren unbeschrifteten Inputs in der 132-Fälle-Matrix
- keine leeren sichtbaren Buttons und keine doppelten IDs
- Statusinformationen enthalten Text und sind nicht nur farblich codiert
- mobile Touch-Ziele für Header, Akkordeons, Lageraktionen und Links vergrößert
- App-Dialog: Fokus im Dialog, Escape schließt, Fokus kehrt zur auslösenden Aktion zurück
- `prefers-reduced-motion` wird in zentralen Animationen und neuen Zuständen berücksichtigt
- Live-Regionen für Status, Messwerte und dynamische Ergebnisse bleiben erhalten

## Datenintegrität

- IndexedDB: `osci_motion_secure_store_v1`, Version 1, unverändert
- Stores und Keys: `state`, `snapshots`, `app_state`, `app_meta`, unverändert
- Google Drive: `osci-motion-project-backup.json`, `osci_project_backup`, Version 2, unverändert
- Projekt-Backup, Lager-TXT, CSV, PDF und bestehende Importpfade behalten ihre Formate.
- Hashvergleich gegen die Zwischen-Sicherung bestätigt unveränderte Kernfunktionen für Backup-Payload, Drive Upload/Restore, Zustandsmigration, Normalisierung, Grammumrechnung, C&R-Löser und Import.
- Rezepturen, Einheiten, Rundungen, Prognoseformeln und Lagerkonfliktlogik wurden nicht geändert.

## Testübersicht

- 132 responsive Läufe: 12 Ansichten × 11 Größen, ohne Seitenüberlauf, falsche aktive Ansicht, doppelte ID oder sichtbare unbeschriftete Felder
- abschließender Frisch-Tab-Smoke-Test: 24 Läufe bei 320 × 568 und 1920 × 1080, keine Konsolenfehler
- Themes: Wechsel und Persistenz nach Reload für alle fünf Themes
- Menü: Reihenfolge, Ausblenden, Schnellziele, Zurücksetzen und Reload
- Produkte/Tara: lange Namen, Dezimalwerte, Abbruch, Löschen und Persistenz
- Sicherung: erstellen, abbrechen, gezielten Stand wiederherstellen
- Lager: Strontiumchlorid 0 → 100 → 80 ml; Protokoll +100 ml und −20 ml; Reload korrekt
- Trace: Cobalt 10 → 7,5 ml nach 2,5-ml-Auslagerung; kein Leermengenfehler
- Messwerte: anlegen, bearbeiten, Diagramm, Detailansicht, Reload
- Logbuch/ToDo: anlegen und Persistenz nach Reload
- Korallen: anlegen, bearbeiten, suchen und Persistenz nach Reload
- Rechner: Hanna 16 ppb → 0,0491 mg/l PO4; Salifert Calcium/KH für 0,20 ml geprüft
- Projekt-Backup: gültiger Download, Typ `osci_project_backup`, Version 2, Zeitstempel und Erfolgsmeldung
- Service Worker: Registrierung und vollständige Cache-Befüllung auf frischem Port beobachtet

Getestete Umgebung: Codex In-App Browser auf Chromium-Basis und lokaler HTTP-Server. Safari/WebKit war nicht verfügbar. Ein vollständig beobachtbarer Offline-Reload war wegen Abbruch der Browser-Testanbindung ohne laufenden Server nicht möglich; Cache-Befüllung und Fallback-Code wurden geprüft. Eine echte Google-OAuth-/Drive-Kontoaktion wurde bewusst nicht mit Testdaten ausgelöst; Offline-/getrennt-Zustand und Sperren wurden getestet.

## Dialoge und technische Altlasten

Verbleibend sind 119 native `alert`, 34 native `confirm` und 30 native `prompt` Aufrufe. Darunter sind deaktivierte Supabase-/Community-Pfade, fachlich kritische Lager-/Rechnerabläufe und mehrstufige Texteingaben. Sie wurden nicht global migriert, weil synchroner Kontrollfluss und Datenrisiko Vorrang vor kosmetischer Einheitlichkeit haben. Bereits vorhanden sind 15 `appAlert`, 15 `appConfirm` und 5 `appPrompt` Aufrufe.

`style.css` enthält weiterhin zahlreiche ältere Theme-Sonderregeln und 319 `!important`-Vorkommen. Eine aggressive automatische Bereinigung wurde bewusst vermieden. Die geprüften finalen Regeln stehen am Dateiende und stabilisieren die aktuellen Komponenten. Direkte Breiten/Höhen für Diagrammbalken und fachlich berechnete Grafiken bleiben absichtlich inline.

## Dateien und Sicherungen

Geänderte Hauptdateien: `index.html`, `app.js`, `style.css`, `sw.js`, `version.json`, `privacy.html`, `impressum.html`.

- Sicherung vor Priorität 7: `backups/redesign-priority7-8-before/`
- Sicherung nach Priorität 7: `backups/redesign-priority7-complete-before-priority8/`
- finale Sicherung nach Priorität 8: `backups/redesign-priority8-complete/`
- App-Version: v2.6.8
- Cache: `reef-storage-tools-cache-v268-p78-final`
- Lokale Testadresse: `http://127.0.0.1:8138/`

## Hinweise für weitere Änderungen

Vor Änderungen an Daten oder Synchronisierung zuerst eine Sicherung erstellen. IndexedDB-Version, persistierte Feldnamen, Backup-Version und Drive-Dateiformat nur mit explizitem Migrationsplan ändern. Die verbliebenen nativen Dialoge einzeln migrieren und jeden Abbruch-/Erfolgspfad separat testen. Alte Theme-Regeln nur entfernen, wenn Code-Suche und Browsermatrix ihre Nichtverwendung belegen.
