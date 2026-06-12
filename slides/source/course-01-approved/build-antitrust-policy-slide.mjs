import path from 'path';
import { createRequire } from 'module';

const root = process.env.CLONE_ROOT || path.resolve('.');
const nodeModules = 'C:/Users/TR4_1950X/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/pptxgenjs@4.0.1/node_modules/pptxgenjs';
const require = createRequire(`${nodeModules}/package.json`);
const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.defineLayout({ name: 'COURSE', width: 13.333, height: 7.5 });
pptx.layout = 'COURSE';
pptx.author = 'Ian Burton Price';
pptx.company = 'MIAMI REALTORS + RWorld education';
pptx.subject = 'MIAMI REALTORS Antitrust Policy slide';
pptx.title = 'MIAMI REALTORS Antitrust Policy';
pptx.lang = 'en-US';
pptx.theme = { headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'en-US' };
pptx.layout = 'COURSE';
pptx.margin = 0;

const policyGraphic = path.join(root, 'assets', 'brand', 'MIAMI-REALTORS-Antitrust-Policy-Slide-2025.jpg');
const qrGraphic = path.join(root, 'assets', 'brand', 'miami-realtors-antitrust-qr.png');
const miamiLogo = path.join(root, 'assets', 'brand', 'miami-realtors-logo-color.png');
const out = path.join(root, 'slides', 'miami-realtors-antitrust-policy-slide.pptx');

const slide = pptx.addSlide();
slide.background = { color: '0B213B' };
slide.addImage({ path: policyGraphic, x: 0, y: 0, w: 13.333, h: 7.5 });
if (typeof slide.addNotes === 'function') {
  slide.addNotes('Display this Antitrust Policy slide before any substantive course content, as required by MIAMI REALTORS.');
}

const C = {
  navy: '16324F',
  ink: '102033',
  teal: '008F8F',
  blue: '2F80ED',
  coral: 'F45B69',
  gold: 'F2B84B',
  gray: '52606D',
  line: 'D8E6E8',
  paper: 'F7FAFC',
  white: 'FFFFFF',
  sky: 'EAF7F7'
};

const policyEnglish = 'The MIAMI Association of REALTORS® adheres to a strict policy of compliance with both federal and state antitrust laws. As such, any discussions or activities with potential anti-trust implications, including but not limited to commission price fixing, market allocation, customer allocation, bid rigging, or boycotts, are strictly prohibited. MIAMI REALTORS® strongly endorses a competitive marketplace, ensuring that competitors have the freedom to engage in business without artificial restrictions on competition.';
const policySpanish = 'La Asociación de REALTORS® de MIAMI se adhiere a una estricta política de cumplimiento con las leyes antimonopolio federales y estatales. Como tal, cualquier discusión o actividad con posibles implicaciones antimonopolio, incluyendo pero no limitándose a la fijación de precios de comisiones, la asignación de mercados, la asignación de clientes, la manipulación de ofertas o los boicots, están estrictamente prohibidas. MIAMI REALTORS® apoya firmemente un mercado competitivo asegurándose que competidores tengan la libertad de participar en negocios sin restricciones artificiales a la competencia.';

const custom = pptx.addSlide();
custom.background = { color: C.paper };

// Course-deck visual chrome.
custom.addShape(pptx.ShapeType.arc, { x: -0.8, y: 6.35, w: 1.7, h: 1.7, adjustPoint: 0.25, line: { color: 'FFF4D9', transparency: 10, width: 1.5 }, adjustPoint: 0.18 });
custom.addShape(pptx.ShapeType.rect, { x: 0.72, y: 0.48, w: 0.14, h: 0.3, fill: { color: C.teal }, line: { color: C.teal } });
custom.addText('MIAMI REALTORS POLICY', { x: 0.94, y: 0.49, w: 2.4, h: 0.2, fontFace: 'Aptos', fontSize: 8.8, bold: true, color: C.teal, margin: 0 });
custom.addShape(pptx.ShapeType.rect, { x: 10.2, y: 0.56, w: 0.26, h: 0.06, fill: { color: C.teal }, line: { color: C.teal } });
custom.addShape(pptx.ShapeType.rect, { x: 10.58, y: 0.56, w: 0.26, h: 0.06, fill: { color: C.blue }, line: { color: C.blue } });
custom.addShape(pptx.ShapeType.rect, { x: 10.96, y: 0.56, w: 0.26, h: 0.06, fill: { color: C.coral }, line: { color: C.coral } });
custom.addShape(pptx.ShapeType.rect, { x: 11.34, y: 0.56, w: 0.26, h: 0.06, fill: { color: C.gold }, line: { color: C.gold } });

custom.addText('Antitrust Policy', { x: 0.72, y: 1.02, w: 5.2, h: 0.48, fontFace: 'Aptos Display', fontSize: 30, bold: true, color: C.ink, margin: 0 });
custom.addText('Display before any substantive course content.', { x: 0.74, y: 1.56, w: 5.4, h: 0.24, fontFace: 'Aptos', fontSize: 10.5, color: C.gray, margin: 0 });

custom.addImage({ path: miamiLogo, x: 9.18, y: 0.98, w: 2.72, h: 0.86 });

custom.addShape(pptx.ShapeType.rect, { x: 0.72, y: 2.12, w: 5.78, h: 3.34, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 } });
custom.addShape(pptx.ShapeType.rect, { x: 6.83, y: 2.12, w: 5.78, h: 3.34, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 1 } });
custom.addShape(pptx.ShapeType.rect, { x: 0.72, y: 2.12, w: 0.09, h: 3.34, fill: { color: C.teal }, line: { color: C.teal } });
custom.addShape(pptx.ShapeType.rect, { x: 6.83, y: 2.12, w: 0.09, h: 3.34, fill: { color: C.blue }, line: { color: C.blue } });

custom.addText('Policy', { x: 1.02, y: 2.42, w: 1.2, h: 0.25, fontFace: 'Aptos Display', fontSize: 13, bold: true, color: C.navy, margin: 0 });
custom.addText(policyEnglish, { x: 1.02, y: 2.84, w: 5.03, h: 2.12, fontFace: 'Aptos', fontSize: 12.0, breakLine: false, fit: 'shrink', color: C.ink, margin: 0.02 });

custom.addText('Política', { x: 7.13, y: 2.42, w: 1.4, h: 0.25, fontFace: 'Aptos Display', fontSize: 13, bold: true, color: C.navy, margin: 0 });
custom.addText(policySpanish, { x: 7.13, y: 2.84, w: 5.03, h: 2.12, fontFace: 'Aptos', fontSize: 11.1, breakLine: false, fit: 'shrink', color: C.ink, margin: 0.02 });

custom.addShape(pptx.ShapeType.rect, { x: 0.72, y: 5.78, w: 11.88, h: 0.92, rectRadius: 0.08, fill: { color: C.sky }, line: { color: C.line, width: 1 } });
custom.addImage({ path: qrGraphic, x: 0.98, y: 5.93, w: 0.64, h: 0.64 });
custom.addText('Scan Here to KNOW THE FACTS', { x: 1.82, y: 5.98, w: 3.2, h: 0.2, fontFace: 'Aptos Display', fontSize: 14, bold: true, color: C.navy, margin: 0 });
custom.addText('MiamiRealtors/Facts', { x: 1.82, y: 6.28, w: 2.5, h: 0.16, fontFace: 'Aptos', fontSize: 9.8, color: C.gray, margin: 0 });
custom.addText('Avoid discussion of commissions, market allocation, customer allocation, bid rigging, boycotts, or any activity that may restrict competition.', { x: 5.05, y: 6.0, w: 6.8, h: 0.36, fontFace: 'Aptos', fontSize: 10.2, bold: true, color: C.ink, fit: 'shrink', margin: 0 });

custom.addShape(pptx.ShapeType.line, { x: 0.55, y: 7.1, w: 12.25, h: 0, line: { color: C.line, width: 0.6 } });
custom.addText('Approved REALTOR® education course | MIAMI REALTORS® + RWorld members', { x: 0.55, y: 7.22, w: 4.7, h: 0.12, fontFace: 'Aptos', fontSize: 6.8, color: C.gray, margin: 0 });
custom.addText('2/2', { x: 12.46, y: 7.22, w: 0.32, h: 0.12, fontFace: 'Aptos', fontSize: 6.8, color: C.gray, margin: 0, align: 'right' });

if (typeof custom.addNotes === 'function') {
  custom.addNotes('Custom course-theme version of the MIAMI Antitrust Policy slide. Display before any substantive course content if using this version.');
}

await pptx.writeFile({ fileName: out });
console.log(JSON.stringify({ pptxPath: out, slideCount: 2 }, null, 2));
