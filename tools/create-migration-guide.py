from pathlib import Path
from datetime import date
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Image, KeepTogether, HRFlowable
)
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from PIL import Image as PILImage

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "ReefTools_Umstieg_ReefManager_ICP_Trace_v3.4.159.pdf"
TMP = ROOT / "tmp" / "pdfs" / "migration-guide"
TMP.mkdir(parents=True, exist_ok=True)
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#071c26")
PANEL = colors.HexColor("#103642")
PANEL2 = colors.HexColor("#174753")
CYAN = colors.HexColor("#39c4d5")
MINT = colors.HexColor("#7ee3d5")
GOLD = colors.HexColor("#f5b84b")
INK = colors.HexColor("#edf7f8")
MUTED = colors.HexColor("#a9c3c8")
RED = colors.HexColor("#ff7c78")

try:
    pdfmetrics.registerFont(TTFont("DejaVu", "/System/Library/Fonts/Supplemental/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/System/Library/Fonts/Supplemental/DejaVuSans-Bold.ttf"))
    FONT = "DejaVu"
    BOLD = "DejaVu-Bold"
except Exception:
    FONT = "Helvetica"
    BOLD = "Helvetica-Bold"

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverTitle", fontName=BOLD, fontSize=28, leading=33, textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle(name="CoverSub", fontName=FONT, fontSize=13, leading=19, textColor=MUTED, spaceAfter=18))
styles.add(ParagraphStyle(name="H1x", fontName=BOLD, fontSize=21, leading=26, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="H2x", fontName=BOLD, fontSize=13.5, leading=18, textColor=CYAN, spaceBefore=10, spaceAfter=5))
styles.add(ParagraphStyle(name="Bodyx", fontName=FONT, fontSize=9.6, leading=14, textColor=INK, spaceAfter=6))
styles.add(ParagraphStyle(name="Smallx", fontName=FONT, fontSize=8, leading=11, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle(name="StepTitle", fontName=BOLD, fontSize=11, leading=14, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="StepBody", fontName=FONT, fontSize=8.9, leading=12.5, textColor=INK))
styles.add(ParagraphStyle(name="CenterSmall", parent=styles["Smallx"], alignment=TA_CENTER))
styles.add(ParagraphStyle(name="Callout", fontName=FONT, fontSize=9.2, leading=13, textColor=INK))

def P(text, style="Bodyx"):
    return Paragraph(text, styles[style])

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#245764"))
    canvas.setLineWidth(0.6)
    canvas.line(16 * mm, PAGE_H - 15 * mm, PAGE_W - 16 * mm, PAGE_H - 15 * mm)
    canvas.setFont(BOLD, 8)
    canvas.setFillColor(CYAN)
    canvas.drawString(16 * mm, PAGE_H - 11 * mm, "ReefTools")
    canvas.setFont(FONT, 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - 16 * mm, PAGE_H - 11 * mm, "Umstieg zu ICP + Trace · v3.4.159")
    canvas.setStrokeColor(colors.HexColor("#245764"))
    canvas.line(16 * mm, 14 * mm, PAGE_W - 16 * mm, 14 * mm)
    canvas.setFont(FONT, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 9 * mm, "Für die persönliche Dokumentation · Werte vor dem Ansetzen immer prüfen")
    canvas.drawRightString(PAGE_W - 16 * mm, 9 * mm, f"{doc.page}")
    canvas.restoreState()

def cover(canvas, doc):
    header_footer(canvas, doc)
    canvas.saveState()
    canvas.setFillColor(PANEL)
    canvas.roundRect(16 * mm, 46 * mm, PAGE_W - 32 * mm, 216 * mm, 8 * mm, fill=1, stroke=0)
    canvas.setFillColor(CYAN)
    canvas.circle(PAGE_W - 37 * mm, PAGE_H - 39 * mm, 14 * mm, fill=1, stroke=0)
    canvas.setFillColor(NAVY)
    canvas.setFont(BOLD, 20)
    canvas.drawCentredString(PAGE_W - 37 * mm, PAGE_H - 45 * mm, "ICP")
    canvas.restoreState()

def step_card(number, title, body):
    data = [[P(str(number), "StepTitle"), [P(title, "StepTitle"), P(body, "StepBody")]]]
    t = Table(data, colWidths=[12 * mm, 154 * mm], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), CYAN),
        ("TEXTCOLOR", (0, 0), (0, 0), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (0, 0), (0, 0), "CENTER"),
        ("LEFTPADDING", (0, 0), (0, 0), 0), ("RIGHTPADDING", (0, 0), (0, 0), 0),
        ("TOPPADDING", (0, 0), (0, 0), 7), ("BOTTOMPADDING", (0, 0), (0, 0), 7),
        ("BACKGROUND", (1, 0), (1, 0), PANEL),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#2b6472")),
        ("INNERGRID", (0, 0), (-1, -1), 0, PANEL),
        ("LEFTPADDING", (1, 0), (1, 0), 8), ("RIGHTPADDING", (1, 0), (1, 0), 8),
        ("TOPPADDING", (1, 0), (1, 0), 7), ("BOTTOMPADDING", (1, 0), (1, 0), 7),
    ]))
    return t

def callout(text, color=GOLD):
    t = Table([[P(text, "Callout")]], colWidths=[166 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PANEL2),
        ("BOX", (0, 0), (-1, -1), 1, color),
        ("LINEBEFORE", (0, 0), (0, 0), 4, color),
        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t

def crop_image(src, name, top, bottom, width=166 * mm):
    out = TMP / name
    with PILImage.open(src) as im:
        crop = im.crop((0, int(im.height * top), im.width, int(im.height * bottom)))
        crop.save(out)
    with PILImage.open(out) as im:
        aspect = im.height / im.width
    return Image(str(out), width=width, height=width * aspect)

trace_img = ROOT / "docs-assets" / "trace.png"
trace_top = crop_image(trace_img, "trace-top.png", 0.0, 0.39, 160 * mm)
trace_history = crop_image(trace_img, "trace-history.png", 0.39, 0.61, 160 * mm)

story = []
story += [Spacer(1, 30 * mm), P("Von Reef Manager zu ReefTools", "CoverTitle"), P("ICP-Werte, vergangene K+ / A- Mischungen und die nächste Trace-Rezeptur sauber zusammenführen.", "CoverSub"), Spacer(1, 8 * mm)]
story += [callout("Ziel: Jede Mischung erhält ihr echtes Ansatzdatum und kann mit der ICP verknüpft werden, die zu diesem Zeitpunkt den Messstand beschreibt.", CYAN), Spacer(1, 11 * mm)]
story += [P("Der empfohlene Ablauf", "H2x")]
story += [step_card(1, "ICP-Berichte importieren", "Im Bereich ICP die Labortabelle aus dem Browser kopieren und speichern. ReefTools übernimmt Probe- und Messdaten sowie die Elementwerte."), Spacer(1, 4 * mm)]
story += [step_card(2, "Historische Rezepte nachtragen", "Reef Manager-Rezepte importieren oder alte handschriftliche K+ / A- Mischungen über „Vergangene Mischung hinzufügen“ erfassen."), Spacer(1, 4 * mm)]
story += [step_card(3, "ICP zuordnen", "In Historie & Analyse den Eintrag bearbeiten, die passende gespeicherte ICP auswählen und „Ja, einbeziehen“ aktivieren."), Spacer(1, 4 * mm)]
story += [step_card(4, "Nächste Mischung berechnen", "Trace verwendet die zeitlich letzte berechnungsfähige Mischung und deren ICP als Ausgangspunkt. Die verwendete ICP wird im Rezeptvorschlag angezeigt."), Spacer(1, 8 * mm)]
story += [P("Wichtig", "H2x"), P("Eine Zuordnung ist nur sinnvoll, wenn das Ansatzdatum der Mischung und das Probenahmedatum der ICP zusammenpassen. ReefTools ersetzt keine fachliche Prüfung der Werte.", "Bodyx"), PageBreak()]

story += [P("1. ICP aus dem Labor übernehmen", "H1x"), P("Die ICP wird nur einmal im ICP-Bereich gespeichert. Danach kann Trace auf dieselbe Analyse zugreifen.", "Bodyx"), Spacer(1, 2 * mm)]
story += [step_card(1, "Laborseite öffnen", "Melde dich im OSCI-Laborportal an und öffne die Analyse. Markiere die sichtbare Tabelle von „Basiswerte“ bis zur letzten Elementzeile und kopiere sie."), Spacer(1, 4 * mm)]
story += [step_card(2, "Im ICP-Bereich einfügen", "Öffne in ReefTools den Bereich ICP und füge die kopierte Tabelle in das Feld für die OSCI-Lab-Tabelle ein. Nicht aus einem Screenshot kopieren."), Spacer(1, 4 * mm)]
story += [step_card(3, "Prüfen und speichern", "Prüfe Analyse-ID, Volumen und vor allem „Probe gezogen am“. Dieses Datum ordnet die Messung zeitlich ein. Speichere erst, wenn die Vorschau plausibel ist."), Spacer(1, 6 * mm)]
story += [callout("nn wird für Trace als 0 bewertet. Bei nwb verwendet ReefTools den oberen angegebenen Nachweisgrenzenwert und zeigt diese Umrechnung an.", GOLD), Spacer(1, 7 * mm)]
story += [P("So sieht der Trace-Bereich aus", "H2x"), trace_top, P("Die gespeicherte ICP wird später über „Gespeicherte ICP verwenden“ oder direkt bei der Historienmischung ausgewählt.", "Smallx"), PageBreak()]

story += [P("2. Mischungen aus Reef Manager übernehmen", "H1x"), P("Der Reef Manager-Import dient als Archiv und zur Dokumentation. Er wird erst dann für die Trace-Berechnung verwendet, wenn eine passende ICP zugeordnet wurde.", "Bodyx")]
story += [step_card(1, "Import nur als Archiv speichern", "Öffne Trace und den Bereich Reef Manager Import. Füge die Rezeptdaten ein, ergänze das Aquariumvolumen und wähle „Zur Historie hinzufügen“."), Spacer(1, 4 * mm)]
story += [step_card(2, "Historie öffnen", "Scrolle zu Historie & Analyse. Die Einträge werden nach Ansatzdatum sortiert. Ein Reef Manager-Eintrag ohne ICP bleibt als Archiv markiert und beeinflusst die nächste Berechnung nicht."), Spacer(1, 4 * mm)]
story += [step_card(3, "ICP zuordnen", "Klicke beim passenden Eintrag auf „Bearbeiten“. Wähle unter „Gespeicherte ICP zuordnen“ die ICP aus, die zum Ansatzzeitpunkt gehört."), Spacer(1, 4 * mm)]
story += [step_card(4, "Einbeziehung bestätigen", "Setze „In weitere Trace-Berechnung einfließen lassen?“ auf „Ja, einbeziehen“ und speichere. Der Status wechselt zu „Mit ICP“."), Spacer(1, 6 * mm)]
story += [callout("Wenn die ICP nicht vollständig ist, bleibt der Eintrag sichtbar, kann aber nicht vollständig als Berechnungsbasis dienen. Fehlende Trace-Werte müssen ergänzt werden.", RED), Spacer(1, 6 * mm)]
story += [trace_history, P("Die Historie zeigt, welche Einträge aktiv, ignoriert oder nur archiviert sind.", "Smallx"), PageBreak()]

story += [P("3. Mischungen von Hand nachtragen", "H1x"), P("Wenn alte Rezepte nur auf Papier, in einer Tabelle oder in Notizen vorliegen, kannst du sie ohne Reef Manager-Import erfassen.", "Bodyx")]
story += [step_card(1, "Vergangene Mischung hinzufügen", "Klicke in Historie & Analyse auf „Vergangene Mischung hinzufügen“. Das Formular ist auch für alte Mischungen gedacht."), Spacer(1, 4 * mm)]
story += [step_card(2, "Eckdaten eintragen", "Trage Ansatzdatum, Aquariumvolumen, Laufzeit und Tagesdosierung ein. Die Werte beschreiben den damaligen Ansatz, nicht den heutigen Zustand."), Spacer(1, 4 * mm)]
story += [step_card(3, "Kationen und Anionen getrennt erfassen", "Gib die bekannten Elementmengen zeilenweise ein, zum Beispiel „Co 33,01“ oder „F 32,18“. Gesamtvolumen und Osmoseanteil kannst du ergänzen, wenn sie bekannt sind."), Spacer(1, 4 * mm)]
story += [step_card(4, "Passende ICP auswählen", "Wähle optional eine gespeicherte ICP. Wenn keine ICP vorhanden ist, speichere den Eintrag als Archiv und ordne die Analyse später über „Bearbeiten“ zu."), Spacer(1, 6 * mm)]
story += [callout("Das Datum entscheidet über die Reihenfolge. Für die nächste Mischung wird die zeitlich letzte aktive Mischung mit vollständiger ICP herangezogen.", CYAN), Spacer(1, 7 * mm)]
story += [P("Empfohlene Datenqualität", "H2x"), P("Je genauer Rezept, Ansatzdatum, Laufzeit und ICP-Probenahme dokumentiert sind, desto nachvollziehbarer ist die Entwicklung. Unbekannte Mengen nicht schätzen - lieber leer lassen und später ergänzen.", "Bodyx"), PageBreak()]

story += [P("4. So entsteht die nächste Trace-Mischung", "H1x"), P("Trace berechnet nicht einfach aus der letzten importierten Datei. Es nutzt die zeitliche Historie und die Messwerte, die dem Rezept zugeordnet sind.", "Bodyx")]
story += [step_card(1, "Ausgangsmischung bestimmen", "Die letzte aktive Mischung wird nach Ansatzdatum gefunden. Ihre Mengen werden auf Aquariumvolumen und Laufzeit der neuen Berechnung übertragen."), Spacer(1, 4 * mm)]
story += [step_card(2, "ICP-Werte vergleichen", "Für jedes Trace-Element wird der ICP-Wert mit dem hinterlegten Optimalwert verglichen. Daraus entsteht eine proportionale Anpassung innerhalb der eingestellten Änderungsgrenzen."), Spacer(1, 4 * mm)]
story += [step_card(3, "Rezept prüfen", "Kontrolliere Kationen K+ und Anionen A- getrennt, Osmoseanteil, Flaschenvolumen und Tagesdosierung. Die App zeigt die verwendete ICP-Basis im Rezeptkopf an."), Spacer(1, 4 * mm)]
story += [step_card(4, "Speichern und erst danach auslagern", "Speichern dokumentiert den Ansatz. Speichern & Auslagern prüft zusätzlich den Lagerbestand und bucht die verwendeten Produkte. Bei fehlendem Bestand wird nichts teilweise gebucht."), Spacer(1, 7 * mm)]
story += [callout("Die Berechnung ist eine Entscheidungshilfe. Prüfe auffällige ICP-Werte, Produktkonzentrationen und die Plausibilität des fertigen Ansatzes immer selbst.", GOLD), Spacer(1, 9 * mm)]
story += [P("Schnelltest nach dem Umstieg", "H2x")]
check_rows = [[P("Prüfung", "StepTitle"), P("Erledigt", "StepTitle")], [P("Mindestens eine ICP im ICP-Bereich gespeichert", "Bodyx"), P("□", "CenterSmall")], [P("Alte Mischung mit richtigem Ansatzdatum erfasst", "Bodyx"), P("□", "CenterSmall")], [P("ICP der passenden Mischung zugeordnet", "Bodyx"), P("□", "CenterSmall")], [P("Status zeigt „Mit ICP“ und „Ja, einbeziehen“", "Bodyx"), P("□", "CenterSmall")], [P("Rezeptvorschlag zeigt die richtige ICP-Basis", "Bodyx"), P("□", "CenterSmall")]]
check = Table(check_rows, colWidths=[145 * mm, 21 * mm])
check.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), PANEL2), ("BACKGROUND", (0,1), (-1,-1), PANEL), ("BOX", (0,0), (-1,-1), .6, colors.HexColor("#2b6472")), ("INNERGRID", (0,0), (-1,-1), .3, colors.HexColor("#245764")), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("ALIGN", (1,0), (1,-1), "CENTER"), ("LEFTPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 6), ("BOTTOMPADDING", (0,0), (-1,-1), 6)]))
story += [check, Spacer(1, 10 * mm), P("Version v3.4.159 · erstellt für ReefTools", "Smallx")]

doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=22 * mm, rightMargin=22 * mm, topMargin=23 * mm, bottomMargin=21 * mm, title="ReefTools Umstieg von Reef Manager zu ICP und Trace")
doc.addPageTemplates([PageTemplate(id="normal", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")], onPage=header_footer), PageTemplate(id="cover", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="cover")], onPage=cover)])
story[0] = story[0]
doc.build(story)
print(OUT)
