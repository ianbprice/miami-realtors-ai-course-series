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