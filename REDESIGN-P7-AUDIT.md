# Priorität 7 – Bestandsaufnahme und Testprotokoll

## Kritische Speicherverträge

- IndexedDB: `osci_motion_secure_store_v1`, Version 1
- Stores: `state`, `snapshots`
- Zustandskeys: `app_state`, `app_meta`
- Lokale Konfiguration: `osci_google_drive_sync_v1`, `osci_menu_order_v1`, `osci_mobile_quick_tabs_v1`, `osci_hidden_menu_tabs_v1`, letzter aktiver Tab und bestehende UI-Keys
- Google Drive: `osci-motion-project-backup.json` im `appDataFolder`, Payload `osci_project_backup`, Version 2
- Projekt-, Lager-, TXT-, PDF- und CSV-Exportformate wurden nicht verändert.

## Betroffene Oberflächen und Funktionen

- Einstellungsaufbau: `setupSettingsAccordions`, `getSettingsMeta`, `renderSettingsGroupLabels`, `renderSettingsGroupNavigation`, `filterSettingsGroup`
- Themes: `applyTheme`
- Navigation: `renderMenuOrderSettings`, bestehende Menü-/Schnellzugriffsfunktionen
- Produkte/Tara/Presets: `renderCustomProductSettings`, `renderCustomContainers`, `renderProductPresets`, `renderShopLinkSettings`
- Drive: `renderGoogleDriveSyncCard`, `syncProjectToGoogleDriveNow`, `restoreProjectFromGoogleDriveNow`, `disconnectGoogleDriveSync`
- Lokale Sicherungen: `renderStorageSecurityStatus`, `createManualRecoveryPoint`, `restoreLocalSnapshot`, `deleteLocalSnapshot`, `clearLocalSnapshots`
- Update: `renderAppUpdateStatus`, `forceUpdateApp`

## Dialoge und destruktive Aktionen

Auf den vorhandenen App-Dialog migriert wurden: Drive trennen, Update laden, eigenes Produkt löschen, Tara-Behälter löschen, Shop-Links zurücksetzen, Preset überschreiben/laden/löschen. Lokale Sicherungsdialoge waren bereits migriert. Fachlich komplexe synchrone Import-, Lager-, Rechner- und Reset-Abläufe blieben bewusst unangetastet.

## Tests Priorität 7

- Alle zehn Einstellungsfilter öffnen und aktive Gruppe prüfen: bestanden
- Alle Einstellungsakkordeons beim Laden geschlossen: bestanden
- Dark, Light, Girl, Mint und BADMAN wechseln und nach Reload prüfen: bestanden
- Menüreihenfolge, Sichtbarkeit und mobile Schnellziele ändern/zurücksetzen: bestanden
- Eigenes Produkt mit langem Namen anlegen, Löschabbruch und Löschung: bestanden
- Tara-Dezimalwert anlegen, Löschabbruch, Löschung und Reload: bestanden
- Lokalen Sicherungspunkt erstellen, Wiederherstellung abbrechen und gezielt wiederherstellen: bestanden
- Drive nicht verbunden: eindeutiger Status, Upload/Download deaktiviert, keine Tokenanzeige: bestanden
- Update-Dialog öffnen und abbrechen: bestanden
- Mobile Einstellungen 390 × 844: kein horizontaler Seitenüberlauf, Gruppen horizontal scrollbar, alle Karten geschlossen

## Gefundener und behobener Fehler

Beim Löschen eigener Produkte konnte ein unmittelbar folgender Reload das verzögerte Speichern überholen. Der Reload wurde durch direkte, funktional gleichwertige Neudarstellung von Katalog, Produktliste, Sichtbarkeit und Lager ersetzt. Persistenz und Löschung wurden anschließend erneut geprüft.

## Nicht real ausführbare Tests

Eine echte Google-OAuth-/Drive-Sitzung wurde nicht ausgelöst, um keine externen Kontoaktionen mit Testdaten vorzunehmen. Getestet wurden Offline-/nicht-verbunden-Zustand, deaktivierte Aktionen, Statusdarstellung und Doppelausführungsschutz im Codepfad.
