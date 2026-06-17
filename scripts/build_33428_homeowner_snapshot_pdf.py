from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "33428-homeowner-snapshot.pdf"


class Rule(Flowable):
    def __init__(self, width, color):
        super().__init__()
        self.width = width
        self.color = color
        self.height = 1

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(1)
        self.canv.line(0, 0, self.width, 0)


def bullets(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=8) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=12,
        bulletFontSize=5,
        bulletColor=colors.HexColor("#167A72"),
    )


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=LETTER,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.42 * inch,
    )

    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=24,
        textColor=colors.HexColor("#123C46"),
        spaceAfter=3,
    )
    subtitle = ParagraphStyle(
        "Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=13,
        textColor=colors.HexColor("#167A72"),
        spaceAfter=7,
    )
    section = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=12,
        textColor=colors.HexColor("#123C46"),
        spaceBefore=5,
        spaceAfter=3,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.25,
        leading=10.1,
        textColor=colors.HexColor("#263238"),
        spaceAfter=4,
    )
    small = ParagraphStyle(
        "Small",
        parent=body,
        fontSize=7.15,
        leading=8.4,
        textColor=colors.HexColor("#455A64"),
    )
    cta_style = ParagraphStyle(
        "CTA",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=colors.white,
        alignment=1,
    )
    card_body = ParagraphStyle(
        "CardBody",
        parent=body,
        fontSize=7.55,
        leading=9.2,
    )

    story = []

    story.append(Paragraph("33428 Homeowner Snapshot", title))
    story.append(Paragraph("What West Boca owners should watch before selling", subtitle))
    story.append(Rule(7.4 * inch, colors.HexColor("#167A72")))
    story.append(Spacer(1, 5))

    intro = (
        "33428 is not one-size-fits-all. A home near Timbers of Boca, Loggers Run, "
        "South County Regional Park, or the western Boca corridors can attract different "
        "buyer questions than a broad Boca headline would suggest. Ian Burton Price lives in West "
        "Boca and watches this pocket as both a local resident and a Realtor with Dalton "
        "Wade Real Estate Group."
    )
    story.append(Paragraph(intro, body))

    top_cards = [
        [
            Paragraph("<b>Buyers Tend To Notice</b>", section),
            bullets(
                [
                    "Roof age, insurance history, and major update documentation.",
                    "Impact protection, visible condition, light, layout, and move-in feel.",
                    "HOA fees, rules, reserves, application timing, and rental restrictions.",
                    "Pricing compared with nearby homes buyers are actually seeing.",
                ],
                card_body,
            ),
        ],
        [
            Paragraph("<b>Seller Prep Worth Checking</b>", section),
            bullets(
                [
                    "Pull permits and records for major improvements.",
                    "Gather HOA documents, fee details, rules, and timelines.",
                    "Review roof, water heater, HVAC, panel, and insurance-sensitive items.",
                    "Walk the home like a buyer: entry, light, smell, paint, floors, and curb appeal.",
                ],
                card_body,
            ),
        ],
    ]

    table = Table(top_cards, colWidths=[3.63 * inch, 3.63 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F4FAF8")),
                ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#CFE5DF")),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D9E7E4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 5))

    story.append(Paragraph("The 33428 Market Pulse Ian Burton Price Checks", section))
    story.append(
        Paragraph(
            "Current MLS numbers change weekly, so stale screenshots and national headlines "
            "can mislead. Before giving pricing advice, Ian Burton Price reviews active competition, recent "
            "sold homes, days on market, price reductions, buyer financing patterns, inspection "
            "friction, and insurance-related objections.",
            body,
        )
    )

    pulse = Table(
        [
            [
                Paragraph("<b>Active Competition</b><br/>What would your home compete against this week?", card_body),
                Paragraph("<b>Recent Solds</b><br/>Which nearby homes actually closed, and in what condition?", card_body),
                Paragraph("<b>Buyer Friction</b><br/>What questions could slow an offer, inspection, or approval?", card_body),
            ]
        ],
        colWidths=[2.4 * inch, 2.4 * inch, 2.4 * inch],
    )
    pulse.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FFF7E8")),
                ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#E7C785")),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#EAD9AF")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(pulse)
    story.append(Spacer(1, 7))

    cta = Table(
        [[Paragraph("Want a property-specific 33428 snapshot?", cta_style)]],
        colWidths=[7.36 * inch],
    )
    cta.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#123C46")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#123C46")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(cta)
    story.append(
        Paragraph(
            "Ian Burton Price can pull a quick read on your home, nearby competition, and what buyers are likely "
            "to compare it against. No pressure, no generic estimate, and no obligation to list.",
            body,
        )
    )

    footer = Table(
        [
            [
                Paragraph(
                    "<b>Ian Burton Price</b><br/>Dalton Wade Real Estate Group<br/>BocaSoldFast.com",
                    small,
                ),
                Paragraph(
                    "General information only. Not an appraisal, legal advice, insurance advice, lending advice, "
                    "or a guaranteed valuation. Verify MLS, HOA, insurance, and local facts before making decisions.",
                    small,
                ),
            ]
        ],
        colWidths=[2.3 * inch, 5.0 * inch],
    )
    footer.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(Spacer(1, 2))
    story.append(footer)

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
