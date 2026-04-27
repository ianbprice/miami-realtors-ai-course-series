"""Generate the first three Miami Realtors AI course teaching kits.

The local shell in this Codex workspace can write to the user temp directory but
not reliably into the repo directory. This script therefore writes artifacts to
the temp directory by default and prints a manifest of generated files.

Run:
  python slides/source/build_first_three_kits.py

Outputs:
  PPTX decks, student PDFs, instructor PDFs, and contact-sheet PNG previews.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


REPO_ROOT = Path(__file__).resolve().parents[2]
NODE = Path(
    r"C:\Users\TR4_1950X\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
)
NODE_MODULES = Path(
    r"C:\Users\TR4_1950X\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules"
)

OUT_ROOT = Path(tempfile.gettempdir()) / "miami-realtors-ai-course-series-output"

THEME = {
    "navy": "16324F",
    "teal": "00A6A6",
    "coral": "FF6B5F",
    "gold": "F2B84B",
    "sky": "EAF7F7",
    "sand": "FFF8ED",
    "ink": "102033",
    "muted": "52606D",
    "white": "FFFFFF",
}


@dataclass
class Module:
    title: str
    minutes: int
    big_idea: str
    framework: list[str]
    demo: str
    exercise: str
    notes: str


@dataclass
class Course:
    number: int
    slug: str
    title: str
    promise: str
    audience: str
    objectives: list[str]
    modules: list[Module]
    prompts: list[str]
    checklist: list[str]
    action_plan: list[str]


def m(
    title: str,
    minutes: int,
    big_idea: str,
    framework: list[str],
    demo: str,
    exercise: str,
    notes: str,
) -> Module:
    return Module(title, minutes, big_idea, framework, demo, exercise, notes)


COURSES: list[Course] = [
    Course(
        1,
        "course-01-ai-for-real-estate-sales",
        "AI for Real Estate Sales: From Confusion to Daily Use",
        "Turn AI from a confusing novelty into a practical daily sales assistant.",
        "Realtors who are curious about AI but not yet using it consistently.",
        [
            "Explain what AI can and cannot do in real estate sales.",
            "Draft better client emails, texts, listing copy, and updates.",
            "Prepare for buyer/seller appointments and common objections.",
            "Build a simple daily AI workflow.",
            "Use AI safely with privacy, accuracy, and Fair Housing guardrails.",
        ],
        [
            m(
                "Welcome and AI Reality Check",
                10,
                "AI is useful when agents give it a job, context, and review.",
                [
                    "Not magic: drafting, organizing, rewriting, role-play.",
                    "Not a replacement: broker judgment, legal advice, local expertise.",
                    "Best first move: give AI one annoying repeatable task.",
                ],
                "Show a rough buyer-call note becoming a polished follow-up.",
                "Ask attendees to name one task they avoid every week.",
                "Open with permission to be practical. Joke lightly that AI has confidence issues.",
            ),
            m(
                "What AI Can and Cannot Do",
                20,
                "AI accelerates thinking; it does not verify reality.",
                [
                    "Good at language, structure, options, summaries, and role-play.",
                    "Risky with facts, legal claims, market stats, and property details.",
                    "Human review is part of the workflow, not an optional step.",
                ],
                "Compare a generic AI listing description with a revised version.",
                "Circle risky claims in an AI-generated property description.",
                "Reinforce that the agent's license and judgment stay in the loop.",
            ),
            m(
                "AI for Client Communication",
                25,
                "Better context creates messages that sound more like the agent.",
                [
                    "Audience: buyer, seller, lead, past client.",
                    "Context: situation, property, timeline, concern.",
                    "Tone: warm, concise, professional, direct.",
                    "Goal: reply, clarity, appointment, next step.",
                ],
                "Draft a seller update after a quiet week of showings.",
                "Rewrite a robotic text into a natural agent voice.",
                "Keep the live demo short. The win is showing before/after quality.",
            ),
            m(
                "AI for Lead Follow-Up",
                20,
                "Lead follow-up improves when it is fast, specific, and useful.",
                [
                    "Reference what the lead actually did or asked.",
                    "Ask one easy question.",
                    "Offer value before asking for a meeting.",
                    "Save reusable prompts for common lead types.",
                ],
                "Create a response to a synthetic property inquiry lead.",
                "Write a follow-up for a buyer who went silent.",
                "Mention that tools like GoHouse.ai can support lead context, then move on.",
            ),
            m(
                "AI for Listings, Sellers, and Marketing",
                20,
                "AI turns raw property details into usable marketing drafts.",
                [
                    "Listing descriptions from verified bullet points.",
                    "Open house invitations and email announcements.",
                    "Seller-facing activity summaries.",
                    "Social captions with different tones.",
                ],
                "Turn five property facts into a listing description and three captions.",
                "Create a seller-facing summary from showing feedback.",
                "Warn against invented features. Facts first, polish second.",
            ),
            m(
                "AI for Appointment Prep",
                20,
                "AI can help agents practice before the real conversation.",
                [
                    "Buyer consultation agendas.",
                    "Listing appointment talking points.",
                    "Objection role-play.",
                    "Plain-English market explanations.",
                ],
                "Role-play a seller who wants to overprice.",
                "Build a checklist for a first-time buyer consultation.",
                "Make this interactive. Let the room choose the objection.",
            ),
            m(
                "Daily AI Workflow",
                20,
                "AI sticks when it is attached to the day, not treated as homework.",
                [
                    "Morning: prioritize and prep.",
                    "Midday: draft follow-up.",
                    "Afternoon: content or client updates.",
                    "End of day: summarize notes and next steps.",
                ],
                "Build a sample day plan from a fictional agent task list.",
                "Each attendee chooses a daily AI habit.",
                "This is the behavioral close. Keep it simple and repeatable.",
            ),
            m(
                "Safe and Professional AI Use",
                15,
                "The safest AI workflow is private, verified, compliant, and human.",
                [
                    "Do not paste sensitive client data into public tools.",
                    "Verify facts, stats, and property details.",
                    "Avoid Fair Housing risk in marketing language.",
                    "Keep the agent voice and final review.",
                ],
                "Review a risky generated neighborhood blurb.",
                "Create a personal AI safety checklist.",
                "End with confidence, not fear. Safety makes AI more usable.",
            ),
        ],
        [
            "You are helping me as a Realtor draft a [message type] for [audience]. Context: [facts]. Tone: [tone]. Goal: [next step].",
            "Rewrite this so it sounds like a helpful local Realtor, not a corporate robot: [paste draft].",
            "Create three versions: concise text, warm email, and phone script.",
            "Review this for factual claims, Fair Housing risk, and anything I should verify before sending.",
        ],
        [
            "Remove sensitive client information before prompting.",
            "Provide verified facts and avoid asking AI to invent details.",
            "Give AI audience, context, tone, format, and goal.",
            "Review before sending anything to a client.",
            "Save prompts that work.",
        ],
        [
            "Pick one repetitive communication task.",
            "Write one reusable prompt for it.",
            "Use it three times this week.",
            "Save the best output as a template.",
        ],
    ),
    Course(
        2,
        "course-02-ai-lead-conversion",
        "AI Lead Conversion: How to Turn More Online Leads Into Appointments",
        "Use AI to turn internet lead activity into real conversations and appointments.",
        "Realtors who receive portal, IDX, website, open house, ad, or CRM leads.",
        [
            "Explain why online leads often fail to convert.",
            "Write stronger first responses for different lead types.",
            "Identify intent signals that suggest urgency.",
            "Move from answering questions to setting appointments.",
            "Practice objections with AI role-play.",
        ],
        [
            m(
                "The Online Lead Problem",
                15,
                "Most leads do not fail because they are fake; they fail because follow-up is generic.",
                [
                    "Low context.",
                    "Weak timing.",
                    "Too many copy-paste messages.",
                    "Agents give up before the lead is ready.",
                ],
                "Compare a generic first response with a better appointment-oriented version.",
                "Rewrite 'Is this available?' into a conversation starter.",
                "Use the midnight condo click joke if the room is warm.",
            ),
            m(
                "Speed-to-Lead Is Not Enough",
                20,
                "Fast matters, but fast and generic still feels automated.",
                [
                    "Acknowledge what they asked.",
                    "Answer only what is verified.",
                    "Ask one low-friction next question.",
                    "Create a path to call, showing, or consultation.",
                ],
                "Respond to a no-message IDX registration lead.",
                "Create a fast text, email, and voicemail for one lead.",
                "Make speed-to-lead feel tactical, not abstract.",
            ),
            m(
                "Lead Types and Response Strategy",
                20,
                "Different leads deserve different first moves.",
                [
                    "Portal buyer lead.",
                    "IDX registration.",
                    "Property inquiry.",
                    "Home valuation lead.",
                    "Relocation or open house lead.",
                ],
                "Match five lead types to five first-response styles.",
                "Have attendees choose the strongest first question for each lead.",
                "The point: segmentation can happen before a formal campaign.",
            ),
            m(
                "AI for First Contact Scripts",
                20,
                "AI can draft the message set so agents can focus on the conversation.",
                [
                    "Text: short and specific.",
                    "Email: useful and contextual.",
                    "Voicemail: quick reason for the call.",
                    "Follow-up: one question, one next step.",
                ],
                "Build a text, email, voicemail, and call opener from one lead note.",
                "Edit the outputs to sound less salesy.",
                "Keep examples short enough to read on a phone.",
            ),
            m(
                "Intent Signals and Prioritization",
                20,
                "AI can summarize clues, but the agent decides who gets attention first.",
                [
                    "Repeat visits.",
                    "Saved homes.",
                    "Showing requests.",
                    "Payment or financing questions.",
                    "Timeline and relocation language.",
                ],
                "Rank three synthetic leads from hot to long-term.",
                "Ask attendees what signal they trust most.",
                "Tie this lightly to CRM/website workflows without pitching software.",
            ),
            m(
                "Turning Replies Into Appointments",
                20,
                "The appointment ask should feel like the natural next helpful step.",
                [
                    "Soft ask: 'Would it be helpful if...'",
                    "Direct ask: 'The best next step is...'",
                    "Consultation ask.",
                    "Showing ask.",
                    "Phone-call ask.",
                ],
                "Turn an information-only chat into an appointment request.",
                "Practice three appointment asks in different tones.",
                "This is the core money slide. Spend time here.",
            ),
            m(
                "AI Role-Play and Objection Handling",
                20,
                "Practice makes agents calmer when real leads push back.",
                [
                    "I'm just looking.",
                    "I already have an agent.",
                    "I'm not ready yet.",
                    "I don't want to be contacted.",
                    "I'm waiting for rates to drop.",
                ],
                "Ask AI to play the reluctant buyer and score the response.",
                "Pair up or do room-wide objection practice.",
                "Keep the role-play friendly. Nobody likes being roasted by a laptop.",
            ),
            m(
                "Measurement and Improvement",
                15,
                "What gets measured gets coached.",
                [
                    "Response rate.",
                    "Contact rate.",
                    "Appointment rate.",
                    "Time-to-first-response.",
                    "Follow-up attempts.",
                ],
                "Create a simple weekly lead conversion scorecard.",
                "Pick one metric to improve next week.",
                "End with practical accountability, not a dashboard lecture.",
            ),
        ],
        [
            "Create a first-response text for a [lead type]. Context: [lead activity]. Goal: start a conversation and move toward [appointment type].",
            "Create a voicemail and matching text for this lead: [lead note]. Keep both brief and human.",
            "Analyze these CRM notes and identify urgency, likely motivation, and best next message: [notes].",
            "Role-play as a reluctant buyer lead. Push back realistically, then score my response.",
        ],
        [
            "Respond quickly, but use the lead's context.",
            "Ask one simple question.",
            "Do not claim facts you have not verified.",
            "Move toward a next step without forcing it.",
            "Track response, contact, and appointment rates.",
        ],
        [
            "Pick one lead source.",
            "Write a first-response prompt for that source.",
            "Build text, email, voicemail, and call opener versions.",
            "Track appointment conversion for one week.",
        ],
    ),
    Course(
        3,
        "course-03-online-lead-response-and-nurture",
        "AI for Online Lead Response and Nurture Campaigns",
        "Build follow-up systems that stay useful long after the first response.",
        "Realtors who want better structure after online leads enter the database.",
        [
            "Create first-response scripts for different lead types.",
            "Segment leads before assigning nurture campaigns.",
            "Build 7-day and 30-day nurture sequences.",
            "Re-engage old leads without sounding awkward.",
            "Personalize follow-up using behavior and context.",
        ],
        [
            m(
                "After the Lead Comes In",
                15,
                "The gap between lead generation and conversion is usually the follow-up system.",
                [
                    "First response is only the first move.",
                    "Just checking in is not a strategy.",
                    "Useful follow-up earns the next reply.",
                    "Campaigns should point toward appointments.",
                ],
                "Rewrite a weak check-in into a useful message.",
                "List reasons a lead would actually reply.",
                "Use the 'no one thanks you for checking in' line.",
            ),
            m(
                "First Response Framework",
                20,
                "A strong first response acknowledges, helps, asks, and opens the path.",
                [
                    "Acknowledge the inquiry.",
                    "Provide useful context.",
                    "Ask one simple question.",
                    "Point toward call, showing, or consultation.",
                ],
                "Create first responses for property, registration, valuation, and relocation leads.",
                "Choose the best question for each lead type.",
                "Keep scripts concise. Long first messages often reduce replies.",
            ),
            m(
                "Segment Before You Nurture",
                20,
                "The wrong campaign can make a good lead feel unseen.",
                [
                    "Lead source.",
                    "Buyer vs seller.",
                    "Timeline.",
                    "Location and price range.",
                    "Engagement level.",
                ],
                "Sort a synthetic lead list into active, warm, long-term, cold, and reactivation.",
                "Ask what data their CRM already captures.",
                "This bridges manual agent work and future automation.",
            ),
            m(
                "Build a 7-Day New Lead Campaign",
                20,
                "The first week should vary the reason to reply.",
                [
                    "Day 0: answer and ask.",
                    "Day 1: helpful context.",
                    "Day 2: question-based follow-up.",
                    "Day 4: property or resource.",
                    "Day 7: appointment-oriented follow-up.",
                ],
                "Build a 7-day sequence for a buyer who asked about one property.",
                "Make every touch feel different.",
                "Emphasize channel mix: text, email, call, optional video.",
            ),
            m(
                "Build a 30-Day Buyer Nurture",
                20,
                "Longer nurture should educate, observe, and invite action.",
                [
                    "Weekly value messages.",
                    "New listing alerts.",
                    "Market context.",
                    "Financing reminders.",
                    "Soft appointment asks.",
                ],
                "Create a 30-day buyer campaign for a South Florida search lead.",
                "Add one behavior trigger to the campaign.",
                "Keep neighborhood claims compliant and factual.",
            ),
            m(
                "Build a Seller Lead Nurture",
                20,
                "Seller nurture should build confidence before asking for the appointment.",
                [
                    "Home valuation follow-up.",
                    "Seller education.",
                    "Comparable sales context.",
                    "Pre-listing prep.",
                    "Timing and pricing conversations.",
                ],
                "Create a 30-day campaign for a homeowner who requested a valuation.",
                "Write a message that asks about timing without pressure.",
                "Avoid pretending AI has appraised the home.",
            ),
            m(
                "Re-Engage Old Leads",
                15,
                "Old leads need a fresh reason to reply, not guilt.",
                [
                    "Market update hook.",
                    "Property-specific hook.",
                    "Seasonal hook.",
                    "New resource hook.",
                    "Simple status question.",
                ],
                "Write reactivation messages for three stale lead scenarios.",
                "Remove anything that sounds like blame.",
                "This is usually a favorite exercise because everyone has old leads.",
            ),
            m(
                "Behavior-Based Follow-Up",
                10,
                "Behavior gives the campaign its next useful reason to exist.",
                [
                    "Viewed multiple homes.",
                    "Returned to website.",
                    "Saved a property.",
                    "Asked about payment or timing.",
                    "Viewed price reductions.",
                ],
                "Create a follow-up for a lead who returned three times in a week.",
                "Choose one behavior trigger to implement first.",
                "Tie lightly to systems that capture online behavior.",
            ),
        ],
        [
            "Create a 7-day follow-up sequence for a [lead type]. Mix text, email, and call prompts. Avoid repeating the same message.",
            "Segment these leads into active, warm, long-term, cold, and reactivation groups: [lead list].",
            "Write a 30-day nurture campaign for a buyer interested in [area/property type] but not ready yet.",
            "Rewrite this reactivation message so it sounds useful and not awkward: [message].",
        ],
        [
            "Do not send every lead the same campaign.",
            "Make each touch useful and specific.",
            "Vary channel, reason, and call to action.",
            "Respect opt-outs and communication rules.",
            "Measure replies and appointments, not just sends.",
        ],
        [
            "Choose one lead segment.",
            "Build a 7-day campaign.",
            "Add one 30-day extension.",
            "Write three reactivation messages.",
            "Review campaign performance after two weeks.",
        ],
    ),
]


def ensure_output_dirs() -> dict[str, Path]:
    if OUT_ROOT.exists():
        shutil.rmtree(OUT_ROOT)
    dirs = {
        "slides": OUT_ROOT / "slides",
        "student": OUT_ROOT / "pdfs" / "student",
        "instructor": OUT_ROOT / "pdfs" / "instructor",
        "preview": OUT_ROOT / "slides" / "previews",
        "source": OUT_ROOT / "slides" / "source",
    }
    for path in dirs.values():
        path.mkdir(parents=True, exist_ok=True)
    return dirs


def build_slide_specs(course: Course) -> list[dict]:
    total_minutes = sum(module.minutes for module in course.modules)
    slides: list[dict] = [
        {
            "kind": "cover",
            "title": course.title,
            "subtitle": "Miami Realtors AI Course Series",
            "bullets": [course.promise, f"Audience: {course.audience}"],
            "notes": "Welcome the room, set the practical tone, and frame the class as useful even for agents who do not consider themselves technical.",
        },
        {
            "kind": "promise",
            "title": "The Promise",
            "subtitle": course.promise,
            "bullets": [
                "Practical examples, not theory.",
                "Reusable prompts and workflows.",
                "Professional judgment stays in the driver's seat.",
            ],
            "notes": "Tell attendees they do not need to master every AI tool. The win is leaving with repeatable workflows.",
        },
        {
            "kind": "map",
            "title": "Today at a Glance",
            "subtitle": f"Built for a 2-hour class; core modules total about {total_minutes} minutes plus exercises and discussion.",
            "bullets": [module.title for module in course.modules],
            "notes": "Preview the path so attendees know the class will stay concrete and paced.",
        },
        {
            "kind": "safety",
            "title": "Professional Guardrails",
            "subtitle": "AI helps draft and organize. You still verify, edit, and decide.",
            "bullets": [
                "Protect client privacy.",
                "Verify facts before sending.",
                "Avoid Fair Housing risk.",
                "Do not outsource licensed judgment.",
            ],
            "notes": "Set this expectation early so the rest of the class can be practical without sounding reckless.",
        },
    ]
    for idx, module in enumerate(course.modules, 1):
        slides.extend(
            [
                {
                    "kind": "section",
                    "title": f"{idx}. {module.title}",
                    "subtitle": f"{module.minutes} minutes",
                    "bullets": [module.big_idea],
                    "notes": module.notes,
                },
                {
                    "kind": "idea",
                    "title": module.big_idea,
                    "subtitle": module.title,
                    "bullets": module.framework[:3],
                    "notes": f"Talk track: {module.notes}",
                },
                {
                    "kind": "framework",
                    "title": "Framework",
                    "subtitle": module.title,
                    "bullets": module.framework,
                    "notes": "Walk through the framework quickly, then move to the demo. The framework should feel usable, not academic.",
                },
                {
                    "kind": "exercise",
                    "title": "Live Practice",
                    "subtitle": module.demo,
                    "bullets": [module.exercise, "Debrief: what improved, what still needs human review?"],
                    "notes": "Facilitate the exercise. Invite one example from the room if time allows. Keep the output short and client-safe.",
                },
            ]
        )
    slides.extend(
        [
            {
                "kind": "takeaways",
                "title": "What to Take Back to Your Business",
                "subtitle": "Pick one workflow and make it repeatable.",
                "bullets": course.checklist,
                "notes": "Use this slide to transition from learning into implementation.",
            },
            {
                "kind": "action",
                "title": "Your 7-Day Action Plan",
                "subtitle": "Small, specific, and actually doable.",
                "bullets": course.action_plan,
                "notes": "Have attendees write down one action before leaving. This is the close.",
            },
        ]
    )
    return slides


def write_pptx_builder(dirs: dict[str, Path], courses_payload: list[dict]) -> Path:
    js_path = dirs["source"] / "build_decks.mjs"
    data_path = dirs["source"] / "deck_data.json"
    data_path.write_text(json.dumps(courses_payload, indent=2), encoding="utf-8")
    js_path.write_text(
        r"""
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pptxgen = require('pptxgenjs');

const dataPath = process.argv[2];
const outputDir = process.argv[3];
const courses = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const theme = {
  navy: '16324F',
  teal: '00A6A6',
  coral: 'FF6B5F',
  gold: 'F2B84B',
  sky: 'EAF7F7',
  sand: 'FFF8ED',
  ink: '102033',
  muted: '52606D',
  white: 'FFFFFF',
};

function addFooter(deck, slide, courseNumber, slideNumber) {
  slide.addShape(deck.ShapeType.line, { x: 0.55, y: 7.1, w: 12.25, h: 0, line: { color: 'D8E6E8', width: 1 } });
  slide.addText('Miami Realtors AI Course Series', {
    x: 0.55, y: 7.22, w: 5.8, h: 0.18,
    fontFace: 'Aptos', fontSize: 7.5, color: theme.muted, margin: 0,
  });
  slide.addText(`Course ${courseNumber} / ${slideNumber}`, {
    x: 11.4, y: 7.22, w: 1.35, h: 0.18,
    fontFace: 'Aptos', fontSize: 7.5, color: theme.muted, align: 'right', margin: 0,
  });
}

function safeLines(items, max = 6) {
  return (items || []).slice(0, max).map((b) => ({ text: b, options: { bullet: { indent: 16 }, hanging: 4 } }));
}

function addTitle(slide, title, subtitle, color = theme.ink) {
  slide.addText(title, {
    x: 0.72, y: 0.55, w: 10.6, h: 0.78,
    fontFace: 'Aptos Display', fontSize: title.length > 70 ? 25 : 31,
    bold: true, color, breakLine: false,
    fit: 'shrink', margin: 0.02,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.75, y: 1.36, w: 9.7, h: 0.34,
      fontFace: 'Aptos', fontSize: 13.5, color: theme.muted,
      fit: 'shrink', margin: 0,
    });
  }
}

function addBullets(slide, bullets, x = 0.92, y = 2.0, w = 7.15, h = 3.9, size = 19) {
  slide.addText(safeLines(bullets), {
    x, y, w, h,
    fontFace: 'Aptos', fontSize: size, color: theme.ink,
    breakLine: false, fit: 'shrink',
    paraSpaceAfterPt: 8,
    valign: 'top',
    margin: 0.02,
  });
}

function addAccent(deck, slide, color = theme.teal) {
  slide.addShape(deck.ShapeType.rect, { x: 0, y: 0, w: 0.16, h: 7.5, fill: { color }, line: { color } });
  slide.addShape(deck.ShapeType.arc, { x: 11.6, y: -0.35, w: 2.1, h: 2.1, adjustPoint: 0.14, line: { color: 'D5F1F1', transparency: 20, width: 2 }, fill: { color: 'FFFFFF', transparency: 100 } });
}

function addMiniDiagram(deck, slide, kind) {
  const labels = {
    framework: ['Context', 'Prompt', 'Review', 'Send'],
    exercise: ['Try', 'Edit', 'Debrief', 'Save'],
    safety: ['Private', 'Verified', 'Compliant', 'Human'],
    map: ['Learn', 'Demo', 'Practice', 'Apply'],
  }[kind] || ['Think', 'Draft', 'Refine', 'Use'];
  const colors = [theme.teal, theme.gold, theme.coral, theme.navy];
  labels.forEach((label, i) => {
    const x = 8.55 + i * 0.93;
    slide.addShape(deck.ShapeType.ellipse, { x, y: 2.43, w: 0.62, h: 0.62, fill: { color: colors[i] }, line: { color: colors[i] } });
    slide.addText(String(i + 1), { x, y: 2.56, w: 0.62, h: 0.18, fontSize: 11, bold: true, color: theme.white, align: 'center', margin: 0 });
    slide.addText(label, { x: x - 0.2, y: 3.18, w: 1.02, h: 0.35, fontSize: 8.8, color: theme.ink, align: 'center', fit: 'shrink', margin: 0 });
  });
  slide.addShape(deck.ShapeType.line, { x: 9.15, y: 2.74, w: 2.24, h: 0, line: { color: 'B7CFD3', width: 1.2, beginArrowType: 'none', endArrowType: 'triangle' } });
}

function addPromptBlock(deck, slide, text, y = 4.92) {
  slide.addShape(deck.ShapeType.roundRect, {
    x: 0.86, y, w: 11.15, h: 1.34,
    rectRadius: 0.07,
    fill: { color: 'F7FBFB' },
    line: { color: 'D8E6E8', width: 1 },
  });
  slide.addText(text, {
    x: 1.1, y: y + 0.18, w: 10.65, h: 0.92,
    fontFace: 'Aptos', fontSize: 13.2, color: theme.ink,
    italic: true, fit: 'shrink', margin: 0,
  });
}

function buildSlide(pptx, course, spec, index) {
  const slide = pptx.addSlide();
  slide.background = { color: index % 8 === 0 ? theme.sand : theme.white };
  addAccent(pptx, slide, spec.kind === 'section' ? theme.coral : theme.teal);

  if (spec.kind === 'cover') {
    slide.background = { color: theme.sky };
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: theme.sky }, line: { color: theme.sky } });
    slide.addShape(pptx.ShapeType.arc, { x: 8.65, y: -0.6, w: 4.7, h: 4.7, adjustPoint: 0.18, line: { color: 'A6DEDE', width: 2 }, fill: { color: theme.sky, transparency: 100 } });
    slide.addText('Miami Realtors AI Course Series', { x: 0.82, y: 0.72, w: 8.5, h: 0.28, fontSize: 11, color: theme.teal, bold: true, margin: 0 });
    slide.addText(course.title, { x: 0.78, y: 1.62, w: 10.7, h: 1.55, fontFace: 'Aptos Display', fontSize: 38, bold: true, color: theme.navy, fit: 'shrink', margin: 0.02 });
    slide.addText(course.promise, { x: 0.84, y: 3.38, w: 8.8, h: 0.54, fontSize: 17, color: theme.ink, fit: 'shrink', margin: 0 });
    slide.addText('Instructor: Ian Burton Price', { x: 0.84, y: 5.9, w: 4.4, h: 0.25, fontSize: 10.5, color: theme.muted, margin: 0 });
    slide.addText('Neutral education materials; synthetic examples only', { x: 0.84, y: 6.22, w: 5.8, h: 0.22, fontSize: 9.5, color: theme.muted, margin: 0 });
  } else if (spec.kind === 'section') {
    slide.background = { color: theme.navy };
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: theme.navy }, line: { color: theme.navy } });
    slide.addText(spec.subtitle || '', { x: 0.82, y: 1.0, w: 2.2, h: 0.3, fontSize: 12, color: theme.gold, bold: true, margin: 0 });
    slide.addText(spec.title, { x: 0.78, y: 2.0, w: 10.8, h: 1.05, fontFace: 'Aptos Display', fontSize: 38, bold: true, color: theme.white, fit: 'shrink', margin: 0.02 });
    slide.addText(spec.bullets?.[0] || '', { x: 0.84, y: 3.35, w: 9.2, h: 0.58, fontSize: 18, color: 'DCEEEF', fit: 'shrink', margin: 0 });
    slide.addShape(pptx.ShapeType.line, { x: 0.84, y: 4.28, w: 2.2, h: 0, line: { color: theme.coral, width: 4 } });
  } else {
    addTitle(slide, spec.title, spec.subtitle);
    addBullets(slide, spec.bullets, 0.93, 2.08, spec.kind === 'map' ? 9.5 : 7.25, 3.7, spec.kind === 'map' ? 15.8 : 18.2);
    if (['framework', 'exercise', 'safety', 'map'].includes(spec.kind)) addMiniDiagram(pptx, slide, spec.kind);
    if (spec.kind === 'exercise') addPromptBlock(pptx, slide, 'Practice prompt: give AI the role, task, context, tone, format, and goal.');
    if (spec.kind === 'action') addPromptBlock(pptx, slide, 'Commit to one repeatable workflow before adding another tool.');
  }

  if (spec.notes && typeof slide.addNotes === 'function') {
    slide.addNotes(`Teaching notes: ${spec.notes}`);
  }
  if (spec.kind !== 'cover' && spec.kind !== 'section') addFooter(pptx, slide, course.number, index);
}

for (const course of courses) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Ian Burton Price';
  pptx.company = 'Miami Realtors AI Course Series';
  pptx.subject = course.title;
  pptx.title = course.title;
  pptx.lang = 'en-US';
  pptx.theme = {
    headFontFace: 'Aptos Display',
    bodyFontFace: 'Aptos',
    lang: 'en-US',
  };
  course.slides.forEach((slide, idx) => buildSlide(pptx, course, slide, idx + 1));
  const out = path.join(outputDir, `${course.slug}.pptx`);
  await pptx.writeFile({ fileName: out });
  console.log(out);
}
""".strip(),
        encoding="utf-8",
    )
    return js_path


def make_course_payload(course: Course) -> dict:
    slides = build_slide_specs(course)
    return {
        "number": course.number,
        "slug": course.slug,
        "title": course.title,
        "promise": course.promise,
        "audience": course.audience,
        "objectives": course.objectives,
        "slides": slides,
        "prompts": course.prompts,
        "checklist": course.checklist,
        "action_plan": course.action_plan,
    }


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "CourseTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=colors.HexColor("#16324F"),
            spaceAfter=14,
        ),
        "h1": ParagraphStyle(
            "Heading",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#16324F"),
            spaceBefore=12,
            spaceAfter=6,
        ),
        "h2": ParagraphStyle(
            "Subheading",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=colors.HexColor("#00A6A6"),
            spaceBefore=8,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=13,
            textColor=colors.HexColor("#102033"),
            spaceAfter=5,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=colors.HexColor("#52606D"),
        ),
        "prompt": ParagraphStyle(
            "Prompt",
            parent=base["BodyText"],
            fontName="Courier",
            fontSize=7.8,
            leading=10,
            textColor=colors.HexColor("#102033"),
            backColor=colors.HexColor("#EAF7F7"),
            borderPadding=5,
            spaceAfter=8,
        ),
    }


def para(text: str, style: ParagraphStyle) -> Paragraph:
    safe = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\n", "<br/>")
    )
    return Paragraph(safe, style)


def bullet_list(items: list[str], style: ParagraphStyle) -> list[Paragraph]:
    return [para(f"- {item}", style) for item in items]


def add_header_footer(canvas, doc, title: str):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D8E6E8"))
    canvas.line(0.6 * inch, 0.55 * inch, 7.9 * inch, 0.55 * inch)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#52606D"))
    canvas.drawString(0.6 * inch, 0.35 * inch, "Miami Realtors AI Course Series")
    canvas.drawRightString(7.9 * inch, 0.35 * inch, f"{title} - Page {doc.page}")
    canvas.restoreState()


def build_student_pdf(course: Course, slides: list[dict], out_path: Path):
    st = styles()
    story = [
        para(course.title, st["title"]),
        para(course.promise, st["body"]),
        para(f"Audience: {course.audience}", st["small"]),
        para("Learning Objectives", st["h1"]),
        *bullet_list(course.objectives, st["body"]),
        para("Core Frameworks", st["h1"]),
    ]
    rows = [["Module", "Key Idea", "Practice"]]
    for module in course.modules:
        rows.append([module.title, module.big_idea, module.exercise])
    table = Table(rows, colWidths=[1.65 * inch, 2.75 * inch, 2.65 * inch], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#16324F")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D8E6E8")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 7.4),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F7FBFB")]),
            ]
        )
    )
    story.extend([table, Spacer(1, 0.15 * inch), para("Reusable Prompts", st["h1"])])
    for prompt in course.prompts:
        story.append(para(prompt, st["prompt"]))
    story.extend([para("Professional Checklist", st["h1"]), *bullet_list(course.checklist, st["body"])])
    story.extend([para("7-Day Action Plan", st["h1"]), *bullet_list(course.action_plan, st["body"])])
    story.extend(
        [
            para("Safety Reminder", st["h1"]),
            para(
                "Use synthetic examples in class. Do not paste sensitive client data into public AI tools. Verify facts, avoid Fair Housing risk, and keep human review in the workflow.",
                st["body"],
            ),
        ]
    )
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=letter,
        rightMargin=0.6 * inch,
        leftMargin=0.6 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.68 * inch,
    )
    doc.build(
        story,
        onFirstPage=lambda canvas, doc: add_header_footer(canvas, doc, "Student Handout"),
        onLaterPages=lambda canvas, doc: add_header_footer(canvas, doc, "Student Handout"),
    )


def build_instructor_pdf(course: Course, slides: list[dict], out_path: Path):
    st = styles()
    story = [
        para(f"Instructor Guide: {course.title}", st["title"]),
        para(course.promise, st["body"]),
        para("Teaching Posture", st["h1"]),
        para(
            "Keep the class practical, warm, and lightly funny. Use AI as an assistant, not a replacement for professional judgment. GoHouse.ai should remain minimal and contextual.",
            st["body"],
        ),
        para("Timing Overview", st["h1"]),
    ]
    timing_rows = [["Module", "Minutes", "Teaching Focus"]]
    for module in course.modules:
        timing_rows.append([module.title, str(module.minutes), module.big_idea])
    timing = Table(timing_rows, colWidths=[2.1 * inch, 0.65 * inch, 4.35 * inch], repeatRows=1)
    timing.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#16324F")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D8E6E8")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 7.8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.extend([timing, PageBreak(), para("Slide-by-Slide Teaching Notes", st["h1"])])
    for idx, slide in enumerate(slides, 1):
        story.append(para(f"Slide {idx}: {slide['title']}", st["h2"]))
        if slide.get("subtitle"):
            story.append(para(f"Purpose: {slide['subtitle']}", st["body"]))
        if slide.get("bullets"):
            story.extend(bullet_list(slide["bullets"], st["body"]))
        story.append(para(f"Talk track: {slide.get('notes', 'Use this slide to reinforce the course promise.')}", st["small"]))
        if idx % 8 == 0:
            story.append(Spacer(1, 0.08 * inch))
    story.extend(
        [
            PageBreak(),
            para("Facilitation Notes", st["h1"]),
            para("Ask for volunteer examples, but keep all live examples synthetic or anonymized.", st["body"]),
            para("For demos, paste only fictional lead notes, property facts, or client situations.", st["body"]),
            para("When AI produces a weak answer, treat that as useful: show how better context and review improve it.", st["body"]),
            para("Close by having each agent write one workflow they will use in the next seven days.", st["body"]),
        ]
    )
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=letter,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.68 * inch,
    )
    doc.build(
        story,
        onFirstPage=lambda canvas, doc: add_header_footer(canvas, doc, "Instructor Guide"),
        onLaterPages=lambda canvas, doc: add_header_footer(canvas, doc, "Instructor Guide"),
    )


def get_font(size: int, bold: bool = False):
    candidates = [
        r"C:\Windows\Fonts\aptosdisplay-bold.ttf" if bold else r"C:\Windows\Fonts\aptos.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def draw_wrapped(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], font, fill, width_chars: int, line_gap: int = 8):
    x, y = xy
    for line in wrap(text, width_chars):
        draw.text((x, y), line, font=font, fill=fill)
        y += font.size + line_gap
    return y


def make_contact_sheet(course: Course, slides: list[dict], out_path: Path):
    thumb_w, thumb_h = 360, 202
    cols = 3
    rows = (len(slides) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w, rows * thumb_h), "white")
    title_font = get_font(18, True)
    small_font = get_font(10, False)
    number_font = get_font(12, True)
    for i, slide in enumerate(slides):
        x = (i % cols) * thumb_w
        y = (i // cols) * thumb_h
        bg = "#EAF7F7" if slide["kind"] == "cover" else "#16324F" if slide["kind"] == "section" else "#FFFFFF"
        im = Image.new("RGB", (thumb_w - 10, thumb_h - 10), bg)
        d = ImageDraw.Draw(im)
        accent = "#FF6B5F" if slide["kind"] == "section" else "#00A6A6"
        d.rectangle((0, 0, 6, thumb_h), fill=accent)
        text_color = "#FFFFFF" if slide["kind"] == "section" else "#102033"
        d.text((18, 14), f"{i+1}", font=number_font, fill=accent if slide["kind"] != "section" else "#F2B84B")
        draw_wrapped(d, slide["title"], (18, 42), title_font, text_color, 30, 4)
        if slide.get("subtitle"):
            draw_wrapped(d, slide["subtitle"], (18, 122), small_font, "#52606D" if slide["kind"] != "section" else "#DCEEEF", 46, 2)
        sheet.paste(im, (x + 5, y + 5))
    sheet.save(out_path, "PNG", optimize=True)


def build():
    dirs = ensure_output_dirs()
    payloads = [make_course_payload(course) for course in COURSES]
    js_path = write_pptx_builder(dirs, payloads)
    env = os.environ.copy()
    env["NODE_PATH"] = str(NODE_MODULES)
    subprocess.run(
        [str(NODE), str(js_path), str(dirs["source"] / "deck_data.json"), str(dirs["slides"])],
        check=True,
        cwd=str(OUT_ROOT),
        env=env,
    )
    manifest = []
    for course, payload in zip(COURSES, payloads):
        slides = payload["slides"]
        student_pdf = dirs["student"] / f"{course.slug}-student-handout.pdf"
        instructor_pdf = dirs["instructor"] / f"{course.slug}-instructor-guide.pdf"
        preview_png = dirs["preview"] / f"{course.slug}-preview.png"
        build_student_pdf(course, slides, student_pdf)
        build_instructor_pdf(course, slides, instructor_pdf)
        make_contact_sheet(course, slides, preview_png)
        for path in [
            dirs["slides"] / f"{course.slug}.pptx",
            student_pdf,
            instructor_pdf,
            preview_png,
        ]:
            manifest.append(
                {
                    "path": str(path),
                    "size": path.stat().st_size,
                    "repo_path": str(path.relative_to(OUT_ROOT)).replace("\\", "/"),
                }
            )
    manifest_path = OUT_ROOT / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps({"output_root": str(OUT_ROOT), "manifest": str(manifest_path), "files": manifest}, indent=2))


if __name__ == "__main__":
    build()
