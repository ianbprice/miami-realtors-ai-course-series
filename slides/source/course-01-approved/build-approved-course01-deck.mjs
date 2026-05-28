import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const root = process.env.CLONE_ROOT || path.resolve('.');
const nodeModules = 'C:/Users/TR4_1950X/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/pptxgenjs@4.0.1/node_modules/pptxgenjs';
const require = createRequire(`${nodeModules}/package.json`);
const pptxgen = require('pptxgenjs');

const C = {
  navy: '16324F', ink: '102033', teal: '008F8F', sky: 'EAF7F7', blue: '2F80ED',
  coral: 'F45B69', gold: 'F2B84B', green: '2E7D5B', gray: '52606D',
  line: 'D8E6E8', paper: 'F7FAFC', white: 'FFFFFF', dark: '0D1B2A',
  paleGold: 'FFF4D9', paleCoral: 'FFF0EF', lavender: 'F0F3FF', mint: 'E9F8F0'
};

const deck = new pptxgen();
deck.defineLayout({ name: 'COURSE', width: 13.333, height: 7.5 });
deck.layout = 'COURSE';
deck.author = 'Ian Burton Price';
deck.company = 'MIAMI REALTORS + RWorld education';
deck.subject = 'AI for Real Estate Sales approved REALTOR education course';
deck.title = 'AI for Real Estate Sales: From Confusion to Daily Use';
deck.lang = 'en-US';
deck.theme = { headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'en-US' };
const slides = [
  ['cover','APPROVED REALTOR EDUCATION COURSE','AI for Real Estate Sales','From Confusion to Daily Use','For MIAMI REALTORS® + RWorld members','Welcome attendees. Set expectations: practical, non-technical, compliance-aware.'],
  ['bullets','INSTRUCTOR','Today is about workflows, not software demos',['Instructor: Ian Burton Price','Brief context: real estate technology, online lead workflows, and practical AI adoption','No official logos or brand marks are used','Examples are synthetic and classroom-safe'],'Keep the bio brief. Mention GoHouse.ai only as professional context, not as a pitch.'],
  ['bullets','COURSE PROMISE','By the end, AI should feel usable in your normal sales day',['Draft clearer client messages','Follow up with more consistency','Prepare for buyer and seller conversations','Create listing and marketing drafts faster','Use AI with privacy, Fair Housing, and professional review in mind'],'Frame the course as a confidence-builder for busy professionals.'],
  ['bullets','APPROVED OBJECTIVES','Approved learning objectives',['Explain what AI can and cannot do in a real estate sales environment','Use AI to draft emails, text messages, listing copy, and client updates','Personalize buyer and seller communication with better context','Prepare for appointments, objections, and follow-up conversations','Build a simple daily AI workflow for productivity and consistency','Identify basic risks involving accuracy, privacy, Fair Housing, and overreliance'],'These objectives are preserved from the approved syllabus.'],
  ['agenda','SESSION MAP','The two-hour path',[['10m','Reality check'],['20m','Strengths + risks'],['25m','Client communication'],['20m','Lead follow-up'],['20m','Listings + marketing'],['20m','Appointment prep'],['20m','Workflow + guardrails'],['5m','Prompt practice']],'Use this to manage pacing. Exercises may expand or compress.'],
  ['section','SECTION 1','Welcome and AI Reality Check','AI is a practical assistant, not a replacement for licensed judgment.'],
  ['bullets','WHY NOW','AI matters because speed and consistency shape client experience',['Consumers expect quick, clear responses','Most agents have more follow-up tasks than hours','AI reduces blank-page time for common communication tasks','The advantage is not using AI once; it is using it repeatably'],'Tie to texts, emails, listing notes, showing feedback, and CRM updates.'],
  ['compare','SHIFT','Move from random prompts to repeatable business assistance',['Random AI use','One-off prompts','Generic output','No saved process'],['Repeatable workflow','Known use case','Context-rich prompt','Reviewed reusable output'],'Contrast a vague social post prompt with a repeatable workflow.'],
  ['activity','DISCUSSION','Where would 20 saved minutes matter most this week?','Pick one task you delay because it is repetitive, awkward, or annoying.',['Seller update after low activity','Follow-up after a showing','Open house recap','CRM note cleanup','Social caption from listing facts'],'Ask attendees to write down one task for later exercises.'],
  ['section','SECTION 2','What AI Is Good At - And Where It Gets Risky','Use AI for drafting and structure. Verify facts before clients see them.'],
  ['compare','AI BASICS','A plain-English way to think about AI',['Good at','Drafting','Rewriting','Summarizing','Brainstorming','Organizing','Role-play'],['Not safe for','Guaranteeing facts','Legal advice','Local market certainty','MLS rule interpretation','Fair Housing judgment','Final decisions'],'Explain that AI predicts useful language; it does not verify your facts.'],
  ['matrix','REVIEW LENS','Four questions before using AI output with a client',[['Is it true?','Verify property facts, stats, dates, and claims.'],['Is it allowed?','Check brokerage, MLS, advertising, and communication rules.'],['Is it fair?','Avoid protected-class language, steering, or discriminatory targeting.'],['Is it yours?','Edit for your voice, judgment, and client relationship.']],'Use this review lens throughout the course.'],
  ['exercise','ACTIVITY','Compliance risk check','Review this AI-generated sentence:','“This quiet family neighborhood is perfect for young professionals and has the best schools in the area.”',['What could create risk?','What facts need verification?','How could it be rewritten safely?'],'Discuss protected-class implications, school claims, and subjective neighborhood claims.'],
  ['beforeafter','BEFORE / AFTER','Better instruction creates safer output','Write a listing description for a nice house in Coral Gables.','Using only the verified facts below, draft a warm 130-word listing description. Avoid Fair Housing risk, school claims, or invented features. Facts: 3 bedrooms, 2 baths, updated kitchen, covered patio, 2-car garage, near parks and dining.','Show that the prompt provides facts, tone, constraints, and review boundaries.'],
  ['section','SECTION 3','AI for Client Communication','Better context creates messages that sound more like a professional agent.'],
  ['formula','PROMPT FORMULA','Use the Realtor prompt formula',[['Role','You are helping me as a REALTOR®'],['Task','Draft a text / email / script / checklist'],['Context','Client situation, property, timeline, concern'],['Tone','Warm, concise, direct, educational'],['Constraints','Avoid claims, private data, Fair Housing risk'],['Goal','Reply, next step, clarity, appointment']],'Reference this formula repeatedly.'],
  ['example','BUYER EXAMPLE','Buyer follow-up: clear, short, useful','A buyer toured two condos, liked one, but is worried about monthly payment.','I know the monthly payment is the big question. I can send a quick side-by-side with estimated HOA, taxes, and payment ranges so you can compare without guessing. Would that be helpful before we decide whether to see similar options?','Point out empathy, value, and easy next question. Avoid lender-specific promises.'],
  ['example','SELLER EXAMPLE','Seller update: honest without sounding negative','A listing had showings but no offers this week.','We had three showings this week and the consistent feedback was positive on condition, with some hesitation around pricing compared with recent nearby options. My recommendation is that we review the newest activity together and decide whether a small adjustment would improve our position.','Emphasize no panic, no blame, no invented stats.'],
  ['exercise','ACTIVITY','Improve this follow-up message','Original message:','“Just checking in to see if you are still interested.”',['Give the lead a reason to reply','Ask one specific question','Keep it under 45 words'],'The phrase “just checking in” is the teaching target.'],
  ['prompts','PROMPTS','Reusable communication prompts',['Rewrite this text so it sounds warm, concise, and natural for a REALTOR®: [draft]','Create a buyer follow-up email based on these call notes: [notes]. Ask one clear next-step question.','Draft a seller update after a quiet week. Be honest, professional, and solution-oriented.','Give me three tone options: concise, reassuring, and more direct.'],'Encourage attendees to save prompts that work.'],
  ['section','SECTION 4','AI for Lead Follow-Up','The goal is not more messages. The goal is better next steps.'],
  ['bullets','LEAD REALITY','Most follow-up fails because it is generic, late, or stops too soon',['Online leads often arrive with limited context','Speed matters, but fast and generic still feels automated','Different lead sources need different first responses','Useful follow-up creates a reason to continue the conversation'],'Use examples: portal, IDX, open house, valuation lead, old database contact.'],
  ['workflow','WORKFLOW','Lead note to next-best message',['Capture source + behavior','Identify likely intent','Choose channel','Draft one useful message','Review for accuracy + tone','Send and log next step'],'Do not imply AI should auto-send without human review.'],
  ['example2','SYNTHETIC LEAD','Property inquiry response that does more than answer “available?”','Lead asked: “Is the condo on Brickell still available?”','Weak: “Yes, it is available. Let me know if you want to see it.”\n\nBetter: “Yes, it appears available as of my latest check. Are you looking specifically in Brickell, or would similar buildings with strong amenities also be worth sending over?”','Emphasize that availability must be verified.'],
  ['exercise','ACTIVITY','Build a first-response set','Synthetic lead: Online buyer asks about a 2-bedroom condo and leaves no timeline.','', ['Draft a text message','Draft a short email','Draft a voicemail opener','Add one appointment-oriented next step'],'Have attendees work in pairs or individually.'],
  ['matrix','MEASURE','Track whether AI is improving follow-up quality',[['Response rate','Are more leads replying?'],['Contact rate','Are conversations starting?'],['Appointment rate','Are replies becoming meetings?'],['Time to response','Are first touches faster?']],'Keep measurement simple.'],
  ['section','SECTION 5','AI for Listings, Sellers, and Marketing','Facts first. Polish second. Human review always.'],
  ['bullets','LISTING PREP','AI is useful when you feed it verified property facts',['Property features and improvements','Showing feedback and buyer questions','Seller goals and timing','Factual neighborhood context','Desired tone and format'],'Warn against asking AI to invent descriptions from an address.'],
  ['beforeafter','LISTING COPY','From bullet points to polished marketing copy','3 bed / 2 bath\nUpdated kitchen\nCovered patio\n2-car garage\nClose to dining and parks','This 3-bedroom, 2-bath home offers an updated kitchen, practical everyday layout, covered patio space, and a 2-car garage. The location provides convenient access to nearby dining, parks, and local amenities while keeping the description focused on verified property features.','Show useful copy without protected-class or exaggerated claims.'],
  ['grid','MULTI-USE','One verified fact set can become multiple assets',[['Listing description','Polished narrative'],['Open house invite','Short event copy'],['Seller update','Activity summary'],['Social post','Caption + hook'],['Video script','30-second talking points'],['Newsletter blurb','Market-facing note']],'This is where AI saves time across repeated formats.'],
  ['exercise','ACTIVITY','Create three versions from one property fact set','Use only verified facts. Do not invent features.','', ['One listing paragraph','One 35-word social caption','One open house invite'],'Remind attendees that MLS, brokerage, and advertising rules still apply.'],
  ['section','SECTION 6','AI for Appointment Prep and Objection Practice','Practice the conversation before the client conversation.'],
  ['bullets','PREP','AI helps you rehearse, organize, and simplify',['Build buyer consultation and listing appointment agendas','Create discovery questions from client context','Practice common objections','Explain market conditions in plain language','Prepare follow-up after the appointment'],'The value is preparation and clarity, not replacing experience.'],
  ['quote','ROLE-PLAY','Seller wants to overprice','Role-play as a seller who believes their home is worth more than recent comparable sales. Push back realistically. After each of my responses, tell me what was clear, what sounded defensive, and what I should try next.','Let the room identify better language for pricing conversations.'],
  ['quote','ROLE-PLAY','Buyer wants to wait for rates to drop','Act as a cautious buyer who wants to wait for rates to drop. Help me practice a conversation that is educational, not pushy. Challenge any claims that sound too certain.','Avoid rate predictions and financial advice. Suggest lender involvement for specifics.'],
  ['exercise','ACTIVITY','Create an appointment prep brief','Choose buyer consultation or listing appointment.','', ['Draft a 5-part agenda','Add 5 discovery questions','Add 3 likely objections','Draft a follow-up email template'],'This exercise creates a usable takeaway.'],
  ['section','SECTION 7','Daily AI Workflow and Professional Guardrails','Attach AI to the day, not to a vague intention.'],
  ['timeline','DAILY RHYTHM','A simple daily AI workflow',[['Morning','Prioritize tasks and prepare calls'],['Midday','Draft follow-up and client updates'],['Afternoon','Create listing/content drafts'],['End of day','Summarize notes and next steps']],'Small repeated usage beats one dramatic demo.'],
  ['bullets','GUARDRAILS','Responsible AI use in a real estate business',['Protect private client information','Do not paste confidential data without authorization and safeguards','Review all output before use','Follow brokerage policies','Comply with Fair Housing requirements','Verify facts, MLS data, legal claims, and financial claims','Avoid discriminatory targeting or language','Use AI to support professional judgment, not replace it'],'Direct compliance reminder slide. Avoid legal advice.'],
  ['table','BROKERAGE + MLS','When in doubt, slow down and verify',[['Private data','Remove names, contact info, financial details, and sensitive context before using public tools.'],['Advertising','Review claims, disclosures, brokerage rules, and platform requirements.'],['MLS','Follow MLS rules for listing data, remarks, photos, and public display.'],['Consumer communication','Keep records, respect opt-outs, and do not automate beyond policy.']],'Position the course as serious education.'],
  ['exercise','ACTIVITY','Build your daily AI workflow','Pick one task in each part of the day.','', ['Morning task','Midday follow-up task','Afternoon marketing/client update task','End-of-day CRM or notes task'],'Ask attendees to write one workflow they will actually use.'],
  ['section','SECTION 8','Wrap-Up and Starter Prompt Practice','Leave with one repeatable workflow and a small prompt library.'],
  ['prompts','STARTER LIBRARY','Five prompts to save before you leave',['Draft a client message from these notes: [notes]. Make it concise, warm, and specific.','Create three versions of this follow-up: text, email, and voicemail.','Review this message for accuracy, Fair Housing risk, and claims I should verify.','Turn these verified listing facts into a listing paragraph, social caption, and open house invite.','Role-play as [buyer/seller type] and help me practice responding professionally.'],'Encourage attendees to customize placeholders.'],
  ['takeaways','KEY TAKEAWAYS','What should change after today',['Use AI on repeatable sales tasks, not vague experiments','Give AI role, task, context, tone, constraints, and goal','Review every output before a client sees it','Protect private data and follow brokerage policy','Build one daily workflow before adding more tools'],'Summary slide. Keep it actionable.'],
  ['workflow','NEXT STEPS','Your one-week implementation plan',['Choose one workflow','Write one reusable prompt','Use it three times','Save the best output','Refine after reviewing results'],'Ask each attendee to choose one workflow.'],
  ['bullets','RESOURCES','Recommended resources to keep nearby',['Your brokerage AI, advertising, and data policies','Fair Housing and advertising guidance from your brokerage or association','MLS rules and public remarks guidance','A personal prompt library saved in your notes or CRM workflow','A simple checklist: private, verified, compliant, human-reviewed'],'Point attendees to authoritative sources and broker guidance.'],
  ['bullets','FINAL REMINDER','AI supports your work. It does not replace your judgment.',['This course provides general education, not legal, financial, brokerage, MLS, or Fair Housing advice','Agents remain responsible for reviewing communications and following applicable rules','Use verified facts and approved data sources','When uncertain, consult your broker, MLS, attorney, lender, or appropriate professional'],'Close cleanly. Invite final questions.'],
  ['closing','THANK YOU','Questions and discussion','AI for Real Estate Sales: From Confusion to Daily Use','Use remaining time for questions, examples, and follow-up requests.']
];

function addNotes(slide, text) {
  if (typeof slide.addNotes === 'function') slide.addNotes(text || 'Use this slide to connect the approved topic to practical REALTOR workflows.');
}

function footer(slide, i) {
  slide.addShape(deck.ShapeType.line, { x: 0.55, y: 7.08, w: 12.25, h: 0, line: { color: C.line, width: 0.75 } });
  slide.addText('Approved REALTOR® education course | MIAMI REALTORS® + RWorld members', { x: 0.55, y: 7.18, w: 7.8, h: 0.18, fontFace: 'Aptos', fontSize: 7.2, color: C.gray, margin: 0 });
  slide.addText(`${i}/${slides.length}`, { x: 11.95, y: 7.18, w: 0.8, h: 0.18, fontFace: 'Aptos', fontSize: 7.2, color: C.gray, align: 'right', margin: 0 });
}

function addBackdrop(slide, variant = 0) {
  const palette = [C.sky, C.paleGold, C.paleCoral, C.lavender, C.mint];
  const color = palette[variant % palette.length];
  slide.addShape(deck.ShapeType.arc, { x: 10.7, y: -0.55, w: 3.15, h: 3.15, adjustPoint: 0.16, line: { color, width: 2 }, fill: { color: C.white, transparency: 100 } });
  slide.addShape(deck.ShapeType.arc, { x: -0.8, y: 5.85, w: 2.25, h: 2.25, adjustPoint: 0.22, line: { color, width: 2 }, fill: { color: C.white, transparency: 100 } });
}

function miniIcon(slide, x, y, label, color = C.teal) {
  slide.addShape(deck.ShapeType.roundRect, { x, y, w: 0.54, h: 0.54, rectRadius: 0.08, fill: { color }, line: { color } });
  slide.addText(label, { x: x + 0.05, y: y + 0.15, w: 0.44, h: 0.14, fontSize: 8.5, bold: true, color: C.white, align: 'center', margin: 0 });
}

function spotlightCard(slide, heading, body, variant = 0) {
  const fills = [C.sky, C.paleGold, C.paleCoral, C.lavender, C.mint];
  box(slide, 8.28, 2.0, 3.55, 3.05, fills[variant % fills.length], variant === 2 ? 'F5C8C5' : 'BFDADC');
  slide.addText(heading, { x: 8.62, y: 2.35, w: 2.85, h: 0.58, fontSize: 17.5, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
  slide.addText(body, { x: 8.62, y: 3.22, w: 2.75, h: 1.05, fontSize: 12.2, color: C.ink, margin: 0.04, fit: 'shrink' });
  slide.addShape(deck.ShapeType.line, { x: 8.62, y: 4.55, w: 1.2, h: 0, line: { color: variant === 2 ? C.coral : C.teal, width: 3 } });
}

function kicker(slide, text, color=C.teal) {
  slide.addShape(deck.ShapeType.rect, { x: 0.72, y: 0.48, w: 0.12, h: 0.28, fill: { color }, line: { color } });
  slide.addText(text, { x: 0.92, y: 0.47, w: 5.4, h: 0.25, fontFace: 'Aptos', fontSize: 8.8, bold: true, color, margin: 0, fit: 'shrink' });
}

function title(slide, text, subtitle) {
  slide.addText(text, { x: 0.72, y: 0.86, w: 11.4, h: 0.64, fontFace: 'Aptos Display', fontSize: text.length > 64 ? 23 : 28, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
  if (subtitle) slide.addText(subtitle, { x: 0.74, y: 1.55, w: 10.3, h: 0.32, fontFace: 'Aptos', fontSize: 12.8, color: C.gray, margin: 0, fit: 'shrink' });
}

function bulletText(slide, arr, x=0.95, y=2.05, w=6.8, h=3.7, size=16) {
  slide.addText(arr.map(t => ({ text: t, options: { bullet: { indent: 16 }, hanging: 4 } })), {
    x, y, w, h, fontFace: 'Aptos', fontSize: size, color: C.ink, breakLine: false,
    fit: 'shrink', paraSpaceAfterPt: 6, margin: 0.02, valign: 'top'
  });
}

function box(slide, x, y, w, h, fill=C.white, line=C.line) {
  slide.addShape(deck.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.06, fill: { color: fill }, line: { color: line, width: 0.8 } });
}

function dot(slide, x, y, text, color=C.teal) {
  slide.addShape(deck.ShapeType.ellipse, { x, y, w: 0.44, h: 0.44, fill: { color }, line: { color } });
  slide.addText(text, { x, y: y+0.1, w: 0.44, h: 0.16, fontSize: 8, bold: true, color: C.white, align: 'center', margin: 0 });
}

function normalSlide(spec, i) {
  const [type, k, t, a, b, c, note] = spec;
  const speakerNote = spec[spec.length - 1];
  const slide = deck.addSlide();
  slide.background = { color: C.paper };
  addBackdrop(slide, i);
  kicker(slide, k); title(slide, t, typeof a === 'string' && !Array.isArray(b) ? undefined : null);

  if (type === 'bullets') {
    bulletText(slide, a, 0.95, 2.05, 7.0, 4.0, t === 'Approved learning objectives' ? 14.4 : 16.5);
    const final = t.startsWith('AI supports');
    spotlightCard(slide, final ? 'Professional judgment stays in the loop.' : 'Practical course rule', final ? 'Verify, review, and follow applicable rules before using AI output.' : 'Use AI where it reduces friction, then review before clients see it.', final ? 2 : i);
    miniIcon(slide, 8.62, 4.78, final ? '!' : 'AI', final ? C.coral : C.teal);
  } else if (type === 'agenda') {
    a.forEach((s, idx) => {
      const x = 0.85 + (idx % 4) * 3.05, y = 2.0 + Math.floor(idx / 4) * 1.7;
      dot(slide, x, y, String(idx+1), [C.teal,C.blue,C.coral,C.gold][idx%4]);
      slide.addText(s[0], { x: x+0.58, y: y+0.02, w: 0.75, h: 0.18, fontSize: 9, bold: true, color: C.gray, margin: 0 });
      slide.addText(s[1], { x: x+0.58, y: y+0.34, w: 2.1, h: 0.35, fontSize: 15, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'compare') {
    [[a, C.paleCoral, C.coral], [b, C.sky, C.teal]].forEach((col, idx) => {
      const x = idx === 0 ? 0.95 : 6.75;
      box(slide, x, 2.0, 5.2, 3.75, col[1]);
      slide.addText(col[0][0], { x: x+0.32, y: 2.3, w: 4.3, h: 0.32, fontSize: 19, bold: true, color: C.navy, margin: 0 });
      bulletText(slide, col[0].slice(1), x+0.45, 2.9, 4.4, 2.3, 15);
    });
    slide.addShape(deck.ShapeType.chevron, { x: 6.18, y: 3.3, w: 0.48, h: 0.52, fill: { color: C.teal }, line: { color: C.teal } });
  } else if (type === 'activity' || type === 'exercise') {
    const taskList = Array.isArray(c) ? c : (Array.isArray(b) ? b : []);
    const quoteText = Array.isArray(b) ? '' : b;
    slide.addShape(deck.ShapeType.rect, { x: 0.9, y: 1.92, w: 5.92, h: 0.12, fill: { color: C.gold }, line: { color: C.gold } });
    box(slide, 0.95, 2.05, 5.8, 2.8, C.white);
    slide.addText(a, { x: 1.25, y: 2.3, w: 5.1, h: 0.35, fontSize: 14, color: C.gray, margin: 0, fit: 'shrink' });
    if (quoteText) slide.addText(String(quoteText).replace(/^“|”$/g, ''), { x: 1.25, y: 2.82, w: 5.1, h: 1.25, fontSize: 17, bold: true, color: C.navy, margin: 0.03, fit: 'shrink' });
    slide.addText('Workshop canvas', { x: 1.25, y: 4.38, w: 2.4, h: 0.2, fontSize: 9.5, color: C.teal, bold: true, margin: 0 });
    box(slide, 7.05, 1.98, 4.75, 2.95, C.mint, 'BBDCC9');
    bulletText(slide, taskList, 7.35, 2.35, 4.0, 2.0, 15);
    slide.addText('4-6 min', { x: 10.65, y: 4.45, w: 0.8, h: 0.22, fontSize: 9.5, bold: true, color: C.green, margin: 0 });
  } else if (type === 'matrix') {
    a.forEach((item, idx) => {
      const x = 0.95 + (idx % 2) * 5.75, y = 2.0 + Math.floor(idx / 2) * 1.55;
      box(slide, x, y, 5.0, 1.18, C.white);
      dot(slide, x+0.25, y+0.28, '?', [C.teal,C.blue,C.coral,C.green][idx]);
      slide.addText(item[0], { x: x+0.9, y: y+0.22, w: 3.8, h: 0.22, fontSize: 14.5, bold: true, color: C.navy, margin: 0 });
      slide.addText(item[1], { x: x+0.9, y: y+0.55, w: 3.8, h: 0.38, fontSize: 10.7, color: C.gray, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'beforeafter') {
    [['Before', a, C.paleCoral], ['After', b, C.sky]].forEach((part, idx) => {
      const x = idx === 0 ? 0.95 : 6.65;
      box(slide, x, 2.0, 5.1, 3.4, part[2]);
      slide.addText(part[0], { x: x+0.28, y: 2.28, w: 1.5, h: 0.22, fontSize: 10, bold: true, color: idx ? C.teal : C.coral, margin: 0 });
      slide.addText(part[1], { x: x+0.3, y: 2.75, w: 4.45, h: 2.0, fontSize: 13.4, color: C.ink, margin: 0.03, fit: 'shrink', breakLine: false });
    });
  } else if (type === 'formula') {
    a.forEach((p, idx) => {
      const x = 0.82 + (idx % 3) * 4.02, y = 2.0 + Math.floor(idx / 3) * 1.45;
      box(slide, x, y, 3.55, 1.05, C.white);
      slide.addText(p[0], { x: x+0.24, y: y+0.18, w: 1.4, h: 0.2, fontSize: 9.5, bold: true, color: C.teal, margin: 0 });
      slide.addText(p[1], { x: x+0.24, y: y+0.48, w: 3.0, h: 0.28, fontSize: 11.5, color: C.ink, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'example' || type === 'example2') {
    box(slide, 0.95, 2.0, 3.35, 3.25, C.white);
    slide.addShape(deck.ShapeType.roundRect, { x: 1.25, y: 2.32, w: 2.75, h: 1.15, rectRadius: 0.12, fill: { color: C.lavender }, line: { color: 'D8DDF4' } });
    slide.addText(a, { x: 1.45, y: 2.6, w: 2.35, h: 0.55, fontSize: 12.8, bold: true, color: C.navy, margin: 0.03, fit: 'shrink' });
    slide.addText('Client context', { x: 1.25, y: 4.08, w: 1.5, h: 0.2, fontSize: 9.5, bold: true, color: C.teal, margin: 0 });
    box(slide, 5.0, 2.0, 6.65, 3.25, C.sky);
    slide.addShape(deck.ShapeType.roundRect, { x: 5.35, y: 2.42, w: 5.95, h: 1.75, rectRadius: 0.12, fill: { color: C.white }, line: { color: 'CFE5E8' } });
    slide.addText(b, { x: 5.65, y: 2.72, w: 5.35, h: 1.15, fontSize: 13.2, color: C.ink, margin: 0.03, fit: 'shrink', breakLine: false });
    slide.addText('Agent-reviewed response', { x: 5.35, y: 4.52, w: 2.25, h: 0.2, fontSize: 9.5, bold: true, color: C.teal, margin: 0 });
  } else if (type === 'prompts') {
    a.forEach((p, idx) => {
      const y = 1.92 + idx * 0.68;
      box(slide, 0.95, y, 10.55, 0.52, idx % 2 ? C.white : C.sky, idx % 2 ? C.line : 'B8DDE0');
      dot(slide, 1.18, y+0.06, String(idx+1), [C.teal,C.blue,C.coral,C.green,C.gold][idx%5]);
      slide.addText(p, { x: 1.78, y: y+0.08, w: 9.25, h: 0.24, fontSize: 12.6, color: C.ink, margin: 0.02, fit: 'shrink' });
    });
  } else if (type === 'workflow') {
    a.forEach((st, idx) => {
      const x = 0.8 + idx * (a.length > 5 ? 1.9 : 2.25);
      dot(slide, x, 2.55 + (idx % 2) * 0.18, String(idx+1), [C.teal,C.blue,C.coral,C.green,C.gold,C.navy][idx%6]);
      if (idx < a.length - 1) slide.addShape(deck.ShapeType.line, { x: x+0.45, y: 2.77, w: 1.22, h: 0, line: { color: C.line, width: 1.4, endArrowType: 'triangle' } });
      slide.addText(st, { x: x-0.15, y: 3.25, w: 1.55, h: 0.7, fontSize: 11.5, bold: true, color: C.ink, align: 'center', margin: 0, fit: 'shrink' });
    });
  } else if (type === 'grid') {
    a.forEach((it, idx) => {
      const x = 0.85 + (idx % 3) * 3.95, y = 1.95 + Math.floor(idx / 3) * 1.48;
      box(slide, x, y, 3.45, 1.0, C.white);
      slide.addText(it[0], { x: x+0.25, y: y+0.18, w: 3.0, h: 0.2, fontSize: 13.2, bold: true, color: C.navy, margin: 0 });
      slide.addText(it[1], { x: x+0.25, y: y+0.53, w: 3.0, h: 0.2, fontSize: 10.5, color: C.gray, margin: 0 });
    });
  } else if (type === 'quote') {
    box(slide, 1.0, 2.0, 10.5, 2.55, C.dark, C.dark);
    slide.addShape(deck.ShapeType.arc, { x: 9.25, y: 1.75, w: 2.1, h: 2.1, adjustPoint: 0.18, line: { color: C.teal, width: 2 }, fill: { color: C.dark, transparency: 100 } });
    slide.addText(`“${a}”`, { x: 1.45, y: 2.4, w: 9.0, h: 1.35, fontSize: 18, italic: true, color: C.white, margin: 0.03, fit: 'shrink' });
  } else if (type === 'timeline') {
    a.forEach((it, idx) => {
      const x = 0.95 + idx * 2.85;
      box(slide, x, 2.1, 2.35, 2.6, [C.sky,C.white,C.paleGold,C.white][idx]);
      dot(slide, x+0.25, 2.4, String(idx+1), [C.teal,C.blue,C.gold,C.green][idx]);
      slide.addText(it[0], { x: x+0.25, y: 3.15, w: 1.85, h: 0.28, fontSize: 16, bold: true, color: C.navy, margin: 0 });
      slide.addText(it[1], { x: x+0.25, y: 3.6, w: 1.85, h: 0.55, fontSize: 11.5, color: C.gray, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'table') {
    a.forEach((r, idx) => {
      const y = 1.95 + idx * 0.92;
      box(slide, 0.95, y, 10.5, 0.66, C.white);
      slide.addText(r[0], { x: 1.22, y: y+0.18, w: 1.8, h: 0.18, fontSize: 10.5, bold: true, color: C.teal, margin: 0 });
      slide.addText(r[1], { x: 3.05, y: y+0.14, w: 7.9, h: 0.24, fontSize: 11.5, color: C.ink, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'takeaways') {
    bulletText(slide, a, 1.0, 2.05, 9.8, 3.2, 17);
  } else if (type === 'closing') {
    slide.addText(a, { x: 0.76, y: 2.95, w: 7.5, h: 0.38, fontSize: 16, color: C.gray, margin: 0 });
    slide.addShape(deck.ShapeType.line, { x: 0.76, y: 3.58, w: 2.0, h: 0, line: { color: C.coral, width: 4 } });
    slide.addText('Thank you', { x: 0.76, y: 4.1, w: 3.0, h: 0.35, fontSize: 22, bold: true, color: C.navy, margin: 0 });
  }
  footer(slide, i);
  addNotes(slide, speakerNote);
}

function addSlide(spec, i) {
  const [type, k, t, a, b, c, note] = spec;
  if (type === 'cover') {
    const slide = deck.addSlide();
    slide.background = { color: C.navy };
    slide.addShape(deck.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy }, line: { color: C.navy } });
    slide.addShape(deck.ShapeType.arc, { x: 8.7, y: -0.55, w: 4.8, h: 4.8, adjustPoint: 0.18, line: { color: '5FBDBD', transparency: 20, width: 2 }, fill: { color: C.navy, transparency: 100 } });
    slide.addText(k, { x: 0.8, y: 0.75, w: 6.8, h: 0.25, fontSize: 10.5, bold: true, color: C.gold, margin: 0 });
    slide.addText(t, { x: 0.78, y: 1.65, w: 9.8, h: 0.85, fontFace: 'Aptos Display', fontSize: 42, bold: true, color: C.white, margin: 0, fit: 'shrink' });
    slide.addText(a, { x: 0.82, y: 2.56, w: 8.7, h: 0.45, fontSize: 22, color: 'D7EDEE', margin: 0 });
    slide.addShape(deck.ShapeType.line, { x: 0.82, y: 3.34, w: 2.2, h: 0, line: { color: C.coral, width: 4 } });
    slide.addText(b, { x: 0.82, y: 5.95, w: 6.8, h: 0.28, fontSize: 12, color: 'D7EDEE', margin: 0 });
    slide.addText('Instructor-ready live training deck', { x: 0.82, y: 6.3, w: 4.8, h: 0.22, fontSize: 9.5, color: 'AFC8CF', margin: 0 });
    addNotes(slide, c);
  } else if (type === 'section') {
    const slide = deck.addSlide();
    slide.background = { color: C.dark };
    slide.addText(k, { x: 0.82, y: 0.9, w: 4.2, h: 0.28, fontSize: 11, bold: true, color: C.gold, margin: 0 });
    slide.addText(t, { x: 0.78, y: 2.0, w: 10.9, h: 0.85, fontFace: 'Aptos Display', fontSize: 34, bold: true, color: C.white, margin: 0, fit: 'shrink' });
    slide.addText(a, { x: 0.82, y: 3.12, w: 8.9, h: 0.45, fontSize: 16, color: 'DCEEEF', margin: 0, fit: 'shrink' });
    slide.addShape(deck.ShapeType.line, { x: 0.82, y: 4.0, w: 2.0, h: 0, line: { color: C.coral, width: 4 } });
    addNotes(slide, 'Transition into the next approved syllabus section. State the practical outcome before beginning the content.');
  } else {
    normalSlide(spec, i);
  }
}

slides.forEach((s, idx) => addSlide(s, idx + 1));

const pptxPath = process.env.PPTX_OUT || path.join(root, 'slides', 'course-01-ai-for-real-estate-sales-approved-instructor-deck.pptx');
await deck.writeFile({ fileName: pptxPath });

const srcDir = path.join(root, 'slides', 'source', 'course-01-approved');
fs.mkdirSync(srcDir, { recursive: true });
fs.writeFileSync(path.join(srcDir, 'course-01-approved-slide-outline.md'),
  `# Course 01 Approved Instructor Deck Outline\n\nSource: \`pdfs/syllabi/01-ai-for-real-estate-sales-syllabus.pdf\`\n\nOrganization reference used in deck: \`MIAMI REALTORS® + RWorld\`.\n\nSlide count: ${slides.length}\n\n` +
  slides.map((s, i) => `## ${String(i + 1).padStart(2, '0')}. ${s[2]}\n\n- Kicker: ${s[1]}\n- Layout type: ${s[0]}\n- Speaker note: ${s[s.length - 1] || 'Section transition or classroom discussion.'}`).join('\n\n') + '\n', 'utf8');
fs.writeFileSync(path.join(srcDir, 'course-01-approved-assumptions.md'),
`# Course 01 Approved Deck Assumptions

- The approved source is \`pdfs/syllabi/01-ai-for-real-estate-sales-syllabus.pdf\`.
- The course is a 2-hour live instructor-led class with optional hands-on prompt work.
- Audience includes Florida REALTORS®, especially MIAMI REALTORS® + RWorld members, plus brokers, team leaders, and real estate professionals.
- The deck preserves the approved title and learning objectives while expanding the teaching content for live delivery.
- The deck uses synthetic real estate examples only.
- No official MIAMI REALTORS®, RWorld, MLS, brokerage, portal, or vendor logos are used.
- GoHouse.ai appears only as brief instructor context in speaker notes, not as course branding or a product pitch.
- Compliance content is framed as general education and reminders, not legal advice.
- AI tools should support professional judgment, not replace it.
`, 'utf8');
fs.writeFileSync(path.join(srcDir, 'course-01-approved-assets.md'),
`# Recommended Image/Icon Assets

Assets used in the PPTX:

- Native editable PowerPoint shapes, lines, and text boxes.
- No external images.
- No official association logos or unverified brand marks.

Recommended optional future assets, if approved/provided:

- Official MIAMI REALTORS® + RWorld approved education/program mark.
- Instructor headshot, if desired for the intro slide.
- Association-approved event/course branding guidance.
- Public-safe generic real estate classroom photo or local skyline image if rights are confirmed.

Current deck intentionally avoids image dependencies so it remains open-source safe and easy to edit.
`, 'utf8');
fs.writeFileSync(path.join(srcDir, 'course-01-approved-organization-note.md'),
`# Organization Naming Note

The deck references \`MIAMI REALTORS® + RWorld\` and \`MIAMI REALTORS® + RWorld members\`.

Reasoning:

- The user stated that MIAMI REALTORS® and RWorld completed a merger in May 2026.
- The final long-term public brand name may still be in transition.
- The deck therefore avoids overcommitting to an uncertain renamed entity.
- The deck does not use \`Miami and South Florida Realtors\` as a primary name.
- No official logos are used.

This is intentionally conservative and suitable for an approved REALTOR® education course while branding remains in transition.
`, 'utf8');

console.log(JSON.stringify({ pptxPath, slideCount: slides.length }, null, 2));
