# Reeftools.de Benutzerhandbuch

Stand: v3.0.2

Diese Anleitung erklärt die wichtigsten Funktionen von Reeftools.de und wie du sie im Alltag rund um ein Meerwasseraquarium nutzt. Die App ist vor allem für das OSCI Motion Versorgungssystem, Lagerverwaltung, C&R, Trace-Mischungen, Messwerte, Logbuch und praktische Rechner gedacht.

Wichtig: Alle Rechner und Empfehlungen sind Hilfen zur Planung. Prüfe kritische Dosierungen, Messwerte und Wasserwechsel immer fachlich selbst gegen. Für die Richtigkeit der Berechnungen wird keine Haftung übernommen.

---

## Grundprinzip

Reeftools.de speichert deine Daten zuerst lokal auf deinem Gerät. Dazu gehören Lagerbestände, Logbuch, Messwerte, Todos, Korallen, Einstellungen und Sicherungen.

Optional kannst du Google Drive Sync aktivieren. Dann wird dein komplettes Projekt in deinem eigenen Google-Konto gesichert. Die Datei liegt im geschützten App-Speicher von Google Drive und ist im normalen Drive-Dateibereich nicht sichtbar.

Die App ist als PWA nutzbar. Du kannst sie also auf dem Handy zum Home-Bildschirm hinzufügen.

---

## Hauptmenü

Die Standardbereiche der App sind:

- Übersicht
- Lager
- C&R
- Trace
- Tools
- Logbuch
- Statistik
- Protokoll
- Korallen
- Wareneingang
- Nachbestellen
- Einstellungen

In den Einstellungen kannst du die Menü-Reihenfolge ändern und einzelne Menüpunkte ausblenden. Die mobile Schnellnavigation unten richtet sich nach deiner gewählten Reihenfolge.

---

## Übersicht

Die Übersicht ist dein Dashboard.

Sie zeigt wichtige Informationen wie:

- kritische Lagerbestände
- nächste Aufgabe
- letzte Buchung
- Osmosevorrat
- Vorratsbehälter
- Korallen im Fokus
- Messwertgrafen

Viele Kacheln sind anklickbar. Wenn du eine Kachel anklickst, landest du direkt im passenden Bereich, z. B. Lager, Logbuch, Messwerte oder Korallen.

Nutze die Übersicht, wenn du schnell sehen willst, ob etwas Aufmerksamkeit braucht.

---

## Lager

Der Lagerbereich verwaltet deine Produkte und Bestände.

Du kannst:

- Produkte einlagern
- Produkte auslagern
- Lagerbestand korrigieren
- Gramm und Milliliter live umrechnen
- Tara bzw. Leergewicht von Behältern abziehen
- mehrere Lager anlegen
- zwischen Lagern wechseln
- Lagerbestand als TXT, CSV oder PDF exportieren
- alten TXT-Lagerbestand wieder importieren
- Lagerbestand per Teilen-Funktion oder E-Mail weitergeben

### Einlagern

Beim Einlagern gibst du Produkt, Einheit und Menge ein. Bei Produkten mit hinterlegter Dichte zeigt die App ml und g live umgerechnet an.

Wenn du eigene Behälter mit Leergewicht angelegt hast, kannst du beim Wiegen das Tara-Gewicht abziehen lassen.

### Auslagern

Beim Auslagern kannst du entweder eine verbrauchte Menge eingeben oder einen neuen Zielbestand setzen.

Beispiel:

- Bestand vorher: 100 ml
- neuer gewogener Bestand: 80 ml

Dann kann die App daraus 20 ml Verbrauch ableiten. Du kannst wählen, ob es nur eine Korrektur sein soll oder ob es als Auslagerung mit Protokolleintrag gespeichert wird.

### Prognosen

Prognosen werden aus Auslagerungen berechnet. Für eine sinnvolle Prognose braucht die App mindestens zwei Entnahmen, weil erst dann ein Verbrauch über Zeit erkennbar ist.

---

## C&R

Der C&R Bereich ist für OSCI Motion Custom & Repair Produkte gedacht.

Du kannst eine C&R-Liste einfügen und die benötigten Produkte aus dem Lager auslagern.

Die App zeigt:

- benötigte Menge je Produkt
- bevorzugte Einheit zuerst, ml oder g
- andere Einheit kleiner in Klammern
- Bestand und fehlende Produkte
- neuer Lagerstand nach Auslagerung

Der frühere PDF-Import ist deaktiviert, weil PDF-Analysen fehleranfällig sein können. Wenn du Werte importierst oder übernimmst, solltest du sie immer manuell prüfen.

---

## Trace

Der Trace Bereich ist für Kationen K+ und Anionen A- Mischungen gedacht.

Er besteht aus:

- Trace Calculator
- Kationen Mischung
- Anionen Mischung
- Reef Manager Import
- Historie & Analyse

### Trace Calculator

Der Trace Calculator berechnet neue K+ und A- Mischungen auf Basis von:

- Aquariumvolumen
- Analyseintervall
- Besatz
- Laufzeit
- Tagesdosierung je Lösung
- maximalem Flaschenvolumen
- Ansatzdatum
- ICP-Werten
- Historie vorheriger Mischungen

### ICP-Werte

ICP-Werte sind ab der zweiten Mischung Pflicht.

Nur die allererste Startmischung darf ohne ICP gespeichert werden. Sie wird dann klar als Startmischung markiert und dient nur als Ausgangsbasis.

Normale Mischungen und Reef-Manager-Importe können nur verarbeitet werden, wenn alle 11 Trace-ICP-Werte vollständig vorhanden sind.

### Startmischung

Die Startmischung ist die erste gespeicherte Mischung ohne ICP-Werte.

Sie wird markiert als:

Startmischung - ohne ICP-Bewertung

Sie wird nicht zur Bewertung genutzt, ob eine Anpassung funktioniert hat. Dafür braucht die App spätere ICP-Werte.

### Reef Manager Import

Du kannst einen Reef Manager Mischungsexport aus der Zwischenablage importieren.

Wichtig:

- Der Reef Manager Export enthält kein Aquariumvolumen.
- Das Aquariumvolumen muss manuell ergänzt werden.
- Die zugehörigen ICP-Werte müssen im Trace Calculator eingetragen sein.
- Erst dann kann der Import zur Historie hinzugefügt werden.

### Historie & Analyse

Die Historie zeigt alle gespeicherten Mischungen nach Ansatzdatum sortiert.

Status in der Historie:

- Mit ICP: kann für Analyse und Berechnung genutzt werden
- Startmischung: Ausgangsbasis ohne ICP-Bewertung
- Ohne ICP: nicht berechnungsfähig
- Ignoriert: sichtbar, aber nicht aktiv

Für die Berechnung nutzt die App die 5 aktuellsten aktiven Einträge mit ICP nach Datum. Alle anderen bleiben sichtbar.

### Kationen und Anionen auslagern

Du kannst K+ und A- Mischungen einzeln auslagern. Die App prüft vorher den Bestand. Wenn nicht genug vorhanden ist, wird keine Teilbuchung durchgeführt.

---

## Tools

Die Tools sind in Kategorien sortiert. Die Kategorien sind einklappbar, damit die Seite auch auf dem Handy übersichtlich bleibt.

### Dosieren & Messwerte

#### KH / Ca Korrektur

Berechnet, wie viel eines Produktes dosiert werden muss, um KH oder Calcium von einem aktuellen Wert auf einen Zielwert zu bringen.

Du kannst Produktwirkung und Aquariumgröße speichern.

#### Verbrauch pro Tag

Berechnet aus zwei Messungen den täglichen Verbrauch oder die tägliche Abnahme.

Beispiel:

- KH vorher: 8,0
- KH nachher: 7,7
- Tage dazwischen: 3

Die App berechnet daraus die Veränderung pro Tag und pro Woche.

#### Test Korrekturfaktor

Hilft, Heimtests mit Referenzlösung oder ICP abzugleichen.

Beispiel:

- dein Test zeigt KH 7,6
- Referenz sagt KH 8,0

Die App speichert daraus einen Korrekturfaktor und zeigt zukünftige Messwerte korrigiert an.

#### Hanna Phosphor zu Phosphat

Rechnet Hanna Phosphor Checker Werte in Phosphat PO4 um.

#### Salifert Umrechner

Rechnet Salifert Calcium- und KH-Spritzenwerte aus einem auswählbaren Restinhalt um.

#### Nutrition Rechner

Für Nutrition Elements:

- Stickstoff N
- Phosphor P
- Lanthan La
- Kohlenstoff C

Der Rechner hat zwei Bereiche:

Berater:

- Nitrat hoch + Phosphat hoch = C
- Nitrat niedrig + Phosphat hoch = C + N
- Nitrat niedrig + Phosphat niedrig = N + P
- Nitrat hoch + Phosphat niedrig = C + P

Einfacher Rechner:

- Aquariumgröße eingeben
- Produkt auswählen
- gewünschte Änderung eingeben
- Dosierplan erstellen
- optional aus dem Lager auslagern

Kohlenstoff C wird als Tagesdosis im Bereich 0,2 bis 2,0 ml pro 100 L gewählt.

### Salinität & Wasserwechsel

#### Salzgehalt Rechner

Berechnet Zusammenhang zwischen Dichte, Temperatur, PSU, Specific Gravity und Leitwert. Ein gespeicherter Korrekturfaktor kann berücksichtigt werden.

#### Salzgehalt Korrigieren

Hilft, eine gewünschte PSU-Anpassung zu planen. Langsam angleichen und nachmessen.

#### Wasserwechsel Effekt

Zeigt, welcher Wert nach einem Wasserwechsel rechnerisch zu erwarten ist.

#### Adsorber Durchfluss

Berechnet langsamen Durchfluss für Adsorber.

Grundidee:

- Adsorption findet an Oberflächen statt.
- Zu schneller Durchfluss kann unerwünschte Stoffe mitbelasten.
- Für gezielte Entfernung kann ein langsamer Durchfluss sinnvoll sein.
- Beispiel: Aquariumvolumen in 48 Stunden durch den Adsorber.

Der Berater erklärt außerdem typische Adsorberarten:

- Eisenbasis: Phosphat und Silikat
- Aluminiumbasis: Phosphat und Silikat, vorsichtig und produktbezogen
- Aktivkohle: organische Stoffe, Gelbstoffe, Gerüche, Medikamentenreste

Fluorid wurde bewusst nicht als allgemeine Auswahl für Adsorberberatung aufgenommen, weil eine gezielte Fluoridsenkung im Meerwasser nicht pauschal empfohlen werden sollte.

### Mischen & Lösungen

#### Meerwasser aus C&R anmischen

Skaliert das C&R Meerwasser-Rezept auf deine gewünschte Menge.

Die App zeigt:

- Osmosewasser
- C&R Produkte
- ml und g
- Lagerbestand
- Auslagerungsfunktion

Hinweis zu Spurenelementen:

Das angesetzte natürliche Meerwasser enthält nahezu keine Spurenelemente. Du kannst wie gewohnt K+ und A- hinzugeben.

Dosierung:

1 ml je Spurenelementlösung auf 100 L Meerwasser.

#### C&R Natriumchlorid aus NaCl Pulver

Rechner zum Ansetzen von flüssigem C&R Natriumchlorid aus NaCl Pulver und Osmosewasser.

Grundlage:

- 10 L C&R Natriumchlorid
- 3,05 kg NaCl Pulver
- 8,86 L Osmosewasser

#### Makro-Elemente anmischen

Rezeptrechner für Makro-Elemente:

- KH-Tag
- KH-Nacht
- Calcium
- Magnesium

Bei Calcium und Magnesium werden C&R Bestandteile zusätzlich in Gramm angezeigt.

### Sangokai A-Z

#### Sangokai A-Z Assistent

Durchsucht lokal die eingebauten Sangokai A-Z Daten und versucht, zu frei formulierten Fragen passende Stellen zu finden.

Der Assistent ist eine Testversion und noch nicht ausgereift. Antworten bitte immer mit der Originalquelle gegenprüfen.

#### Sangokai A-Z Link

Öffnet die externe Sangokai A-Z Quelle.

### Ressourcen

Enthält hilfreiche Links:

- OSCI Motion Anleitungen
- OSCI Tools
- Meerwasser Lexikon
- Sangokai A-Z
- Buchtipps

---

## Logbuch

Das Logbuch ist aquariumbezogen, nicht lagerbezogen.

Du kannst mehrere Aquarien anlegen und für jedes Aquarium eigene Daten führen.

### Messwerte

Du kannst Messwerte tracken, z. B.:

- KH
- Calcium
- Magnesium
- PO4
- NO3

Weitere Messwerttypen können hinzugefügt werden.

Die App erstellt Grafen mit:

- Verlauf
- Zeitraum
- Trend
- Prognose
- Abweichung in Einheit und Prozent
- anklickbaren Messpunkten

### Log-Einträge

Du kannst Einträge dokumentieren, z. B.:

- Technik
- Wartung
- Versorgung
- Nährstoffkontrolle
- Wasserwechsel
- Korallenbesatz
- Fischbesatz

Kategorien kannst du selbst anlegen, bearbeiten und löschen.

Log-Einträge können bearbeitet und gelöscht werden. Außerdem kannst du nach Kategorien filtern.

### Todos

Du kannst Aufgaben anlegen mit:

- Titel
- Kategorie
- Fälligkeitsdatum
- Intervall
- Erinnerung ein oder aus

Du kannst Aufgaben abhaken, bearbeiten, löschen oder verschieben.

Wenn du eine Aufgabe erledigst, startet der neue Intervall ab dem Ausführungsdatum.

Du kannst auch eintragen, dass eine Aufgabe gestern oder an einem anderen Datum erledigt wurde.

### Osmosetank

Du kannst deinen Osmosetank verwalten:

- Tankgröße
- aktueller Füllstand
- Verbrauch
- Restdauer
- Warnung x Tage vor leerem Tank

### Vorratsbehälter

Für direkt am Aquarium angeschlossene Behälter:

- individuelles Volumen
- Leergewicht
- aktuelle Füllmenge per Wiegen
- Verbrauch pro Tag oder pro Stunde
- Restlaufzeit
- Warnung vor leerem Behälter
- wiederholte Erinnerung alle 24 Stunden, bis aufgefüllt wird

---

## Korallen

Der Korallenbereich ist ein einfacher Korallenkatalog.

Du kannst Korallen dokumentieren mit:

- wissenschaftlichem Namen
- Gattung
- Art
- Handelsname
- Korallentyp
- Wuchsform
- Farbe
- Fotos

Außerdem möglich:

- Korallen suchen
- Korallen filtern
- Korallen bearbeiten
- Korallen löschen
- Ableger einer Mutterkoralle zuweisen
- Korallen abgeben
- abgegebene Korallen mit Empfänger und Kontakt archivieren

NFC-Funktionen wurden entfernt. Die Datenbank für Korallen bleibt bestehen.

---

## Statistik

Die Statistik ist lagerbezogen.

Sie zeigt:

- Verbrauchsentwicklung
- Prognosen
- aktuelle Bestände
- Hinweise, wann Produkte nachbestellt werden sollten

Du kannst außerdem einen PDF-Bericht der Verbräuche erzeugen.

---

## Protokoll

Das Protokoll ist lagerbezogen.

Es zeigt chronologisch:

- Einlagerungen
- Auslagerungen
- Korrekturen
- C&R Buchungen
- Trace Buchungen
- sonstige Lageraktionen

Das Protokoll hilft, später nachzuvollziehen, wann welcher Bestand verändert wurde.

---

## Wareneingang

Wareneingang ist für schnelles Einlagern mehrerer Produkte gedacht.

Du kannst:

- Produkt wählen
- Größe und Einheit angeben
- Tara/Behälter berücksichtigen
- mehrere Positionen sammeln
- alles zusammen einlagern

Das ist praktisch nach einer Bestellung.

---

## Nachbestellen

Der Nachbestellen-Bereich zeigt Produkte, die knapp werden oder nachbestellt werden sollten.

Wenn Shop-Links hinterlegt sind, kannst du Produkte direkt öffnen.

In den Einstellungen kannst du Shop-Links pro Produkt und Größe speichern.

---

## Einstellungen

Die Einstellungen sind gruppiert und einklappbar.

### Datenspeicher & Sicherung

Zeigt, ob lokale Speicherung aktiv ist. Du kannst Sicherungspunkte erstellen und wiederherstellen.

### Backup & Export

Hier kannst du:

- Projekt-Backup exportieren
- TXT exportieren
- PDF exportieren
- CSV exportieren
- Lagerbestand teilen
- Lagerbestand per Mail senden
- Backup oder alten TXT-Lagerbestand importieren

### Google Drive Sync

Google Drive Sync sichert dein komplettes Projekt in deinem eigenen Google-Konto.

Funktionen:

- mit Google verbinden
- manuell hochladen
- Cloud-Stand herunterladen
- Auto-Sync aktivieren
- automatische Login-Erinnerung aktivieren oder deaktivieren
- Verbindung trennen

Cloud Status oben:

- rot: offline
- grün: online und synchron
- gelb: online, aber lokale Änderung noch nicht synchronisiert

Wenn du auf Cloud Status klickst, springt die App direkt zum Google Drive Sync Bereich und öffnet ihn.

### Lokale Geräte einbinden

DEV-Bereich für Tests mit lokalen IP-Adressen, z. B. ESP32 oder Home Assistant.

Dieser Bereich ist mit Passwort geschützt.

Hinweis: Externe Webinterfaces können nur eingebettet werden, wenn der Browser und das Zielgerät das erlauben. Manche Seiten blockieren iframe-Einbettung aus Sicherheitsgründen.

### Wave Pumpensteuerung Demo

Geschützter Demo-Bereich für eine geplante ESP32-Strömungspumpensteuerung.

Die Demo ist lokal nutzbar und speichert Testdaten im Browser.

### App-Updates

Die App prüft automatisch auf neue Versionen. Zusätzlich gibt es eine manuelle Update-/Cache-Funktion.

### Benachrichtigungen

Hier steuerst du:

- Push-Benachrichtigungen
- In-App Hinweise
- Warnzeitraum
- Produkte, für die Warnungen deaktiviert werden sollen

### Menü anpassen

Du kannst:

- Reihenfolge der Menüpunkte ändern
- Menüpunkte ausblenden
- mobile Schnellnavigation indirekt beeinflussen

### Eigene Produkte

Du kannst eigene Produkte anlegen:

- Name
- Kategorie
- Einheit
- Behältergrößen
- Dichte

Bei Einheit Stück werden Behältergröße und Dichte ausgegraut, weil sie dort keinen Sinn ergeben.

### Behälter & Tara

Hier legst du eigene Behälter mit Leergewicht an.

Diese stehen dann beim Wiegen und Einlagern zur Verfügung.

### Produktlisten speichern

Du kannst eigene Produktlisten als Preset speichern und später wieder laden.

### Produkte ausblenden

Ausgeblendete Produkte verschwinden aus:

- Lagerlisten
- Wareneingang
- Nachbestellen
- Warnungen

### Shop-Links

Shop-Links können pro Produkt und Größe hinterlegt werden.

### Design & Effekte

Hier steuerst du:

- Design/Farbschema
- Badman Design
- Cursor Design
- Emoji-Cursor
- Animationen und Effekte

Auf Touch-Geräten bleibt automatisch der normale Touch-Modus aktiv.

### Projekt unterstützen

Öffnet PayPal und Buy Me a Coffee Links.

Wenn du oben auf Projekt unterstützen klickst, springt die App direkt zu diesem Bereich und öffnet ihn.

### Problem melden

Erstellt eine E-Mail an:

simon@asbach.tech

Die App fügt technische Infos wie Browser, Seite, Design und Zeitpunkt hinzu. Lagerbestände werden nicht automatisch eingefügt.

### Daten-Reset

Einzelne Bereiche können gezielt zurückgesetzt werden.

Vorsicht: Reset-Funktionen löschen Daten dauerhaft aus dem lokalen Projektstand.

---

## Cloud Sync richtig nutzen

1. Öffne Einstellungen.
2. Öffne Google Drive Sync.
3. Klicke Mit Google verbinden.
4. Erlaube den Zugriff.
5. Aktiviere Automatisch synchronisieren.
6. Lade manuell einmal hoch.

Danach speichert die App Änderungen automatisch, solange die Google-Sitzung aktiv ist.

Wenn die Sitzung abgelaufen ist:

- Cloud Status wird rot.
- Die App verhindert Login-Schleifen.
- Du kannst manuell auf Cloud Status klicken und dich erneut anmelden.

---

## Backup-Empfehlung

Auch mit Google Drive Sync ist ein regelmäßiger manueller Export sinnvoll.

Empfohlen:

- vor größeren Änderungen Projekt-Backup erstellen
- gelegentlich TXT oder PDF Export für Lagerbestand sichern
- nach wichtigen Importen Sicherungspunkt erstellen

---

## Mobile Bedienung

Auf dem Handy gibt es:

- untere Schnellnavigation
- einklappbare Bereiche
- Pull-to-Refresh
- optimierte Kacheln und Karten
- Touch-freundliche Eingabefelder

Wenn du im Menü Mehr öffnest, scrollt das Menü selbst und nicht die Seite dahinter.

---

## Rechtliches

Im Footer bzw. in den rechtlichen Links findest du:

- Impressum
- Datenschutzerklärung

Diese werden als Popup innerhalb der App geöffnet.

---

## Typische Arbeitsabläufe

### Neuer Nutzer

1. Lagerbestand eintragen oder importieren.
2. Aquarium im Logbuch anlegen.
3. Benachrichtigungen aktivieren.
4. Google Drive Sync einrichten.
5. Erste Sicherung erstellen.

### Nach einer Bestellung

1. Wareneingang öffnen.
2. Produkte eintragen.
3. Tara bei Bedarf wählen.
4. Alles einlagern.
5. Lager prüfen.

### C&R Wasserwechsel vorbereiten

1. C&R öffnen.
2. Werte/Liste einfügen.
3. Einheit wählen.
4. Bestände prüfen.
5. Auslagern.
6. Protokoll kontrollieren.

### Trace Mischung erstellen

1. Trace öffnen.
2. Aquariumvolumen und Laufzeit prüfen.
3. ICP-Werte eintragen.
4. Rezept prüfen.
5. Speichern oder Speichern & Auslagern.
6. Historie kontrollieren.

### Regelmäßige Aquarium-Pflege

1. Messwerte im Logbuch eintragen.
2. Todo abhaken oder neu terminieren.
3. Osmosetank und Vorratsbehälter prüfen.
4. Auffälligkeiten dokumentieren.
5. Übersicht kontrollieren.

---

## Fehler melden

Wenn etwas nicht funktioniert:

1. Einstellungen öffnen.
2. Problem melden öffnen.
3. Kurz beschreiben, was passiert ist.
4. E-Mail absenden.

Hilfreich sind:

- Was wolltest du tun?
- Was ist passiert?
- Auf welchem Gerät?
- Browser oder PWA?
- Welche Seite war offen?

---

## Hinweise zu experimentellen Funktionen

Einige Funktionen sind experimentell oder in Entwicklung, z. B.:

- Trace Calculator
- Sangokai A-Z Assistent
- lokale Geräte Einbindung
- Wave Demo
- einzelne Berechnungen in Tools

Bitte Ergebnisse kritisch prüfen und bei wichtigen Entscheidungen gegen Herstellerangaben, Fachliteratur oder Laborwerte validieren.

