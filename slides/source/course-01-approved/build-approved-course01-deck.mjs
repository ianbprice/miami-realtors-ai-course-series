import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const root = process.env.CLONE_ROOT || path.resolve('.');
const brandAssets = {
  miami: path.join(root, 'assets', 'brand', 'miami-realtors-logo-color.png'),
  rworld: path.join(root, 'assets', 'brand', 'rworld-official-logo-color.png'),
  combined: path.join(root, 'assets', 'brand', 'miami-realtors-rworld-combined-logo.png')
};
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
  ['cover','APPROVED REALTOR EDUCATION COURSE','AI for Real Estate Sales','From Confusion to Daily Use','For MIAMI REALTORS + RWorld members','Welcome attendees. Set expectations: practical, non-technical, compliance-aware, and vendor-neutral.'],
  ['bullets','INSTRUCTOR','Today is about practical AI workflows you can actually use',['Ian Burton Price brings real estate sales, lead follow-up, and AI workflow experience to the classroom.','We will focus on messages, notes, follow-up, listing prep, appointment prep, and daily productivity.','The class is taught as a live workshop: short concepts, real estate examples, and hands-on practice.','Questions are welcome throughout, especially when a workflow needs to fit your brokerage or market.'],'Keep the instructor context brief. Mention GoHouse.ai only as professional background, not as a product pitch.'],
  ['bio','ABOUT THE INSTRUCTOR','About the Instructor','Ian Burton Price','REALTOR | Dalton Wade Real Estate Group\nV.P. of Growth and Partnerships | GoHouse.ai',['Ian works at the intersection of real estate, AI, lead follow-up, and practical business systems.','His focus is helping real estate professionals use technology responsibly to improve communication, prioritize follow-up, prepare for client conversations, and build more consistent daily workflows.'],['This class is vendor-neutral. GoHouse.ai is part of Ian\'s professional background; no GoHouse.ai product is required for the course.'],'Ian Burton Price is a REALTOR with Dalton Wade Real Estate Group and serves as V.P. of Growth and Partnerships at GoHouse.ai. His work focuses on practical AI adoption, buyer-intent intelligence, lead follow-up, agent productivity, and business development within the real estate industry.\n\nIan brings experience across real estate sales, online lead generation, call systems, CRM-adjacent workflows, automation, and client communication systems. His teaching approach is practical and workflow-driven, helping agents understand how AI can support everyday tasks such as follow-up, listing preparation, client updates, appointment preparation, and business operations.\n\nRather than treating AI as a replacement for professional judgment, Ian emphasizes responsible use, human review, privacy awareness, Fair Housing sensitivity, and brokerage compliance.'],
  ['bullets','COURSE PROMISE','By the end, AI should feel useful in your normal sales day',['Draft clearer emails, texts, listing copy, and client updates.','Personalize buyer and seller communication using better context.','Prepare for appointments, objections, and follow-up conversations.','Build one simple daily AI workflow for productivity and consistency.','Recognize basic risks involving accuracy, privacy, Fair Housing, and overreliance.'],'These are the approved learning objectives, rewritten for a live workshop slide. The formal objectives remain preserved in the syllabus.'],
  ['agenda','SESSION MAP','The two-hour path',[['10m','Reality check'],['18m','Strengths + risks'],['22m','Client communication'],['18m','Lead follow-up'],['17m','Listings + marketing'],['17m','Appointment prep'],['13m','Workflow + guardrails'],['5m','Prompt practice / wrap-up']],'Use this timing as the approved two-hour path. The segments total 120 minutes. Exercises may expand or compress slightly, but keep the overall class within two hours.'],
  ['bullets','WHY NOW','AI matters because speed and consistency shape client experience',['Consumers expect quick, clear responses across text, email, phone, and web inquiries.','Most agents have more follow-up tasks than hours in the day.','AI reduces blank-page time for common communication and prep tasks.','The advantage is not one impressive prompt. It is using AI repeatably on work that already happens.'],'Tie to texts, emails, listing notes, showing feedback, and CRM updates.'],
  ['compare','SHIFT','Move from random prompts to repeatable business assistance',['Random AI use','One-off prompts','Generic output','No saved process'],['Repeatable workflow','Known use case','Context-rich prompt','Reviewed reusable output'],'Contrast a vague social post prompt with a repeatable workflow.'],
  ['activity','DISCUSSION','Where would 20 saved minutes matter most this week?','Pick one task you delay because it is repetitive, awkward, or annoying.',['Seller update after low activity','Follow-up after a showing','Open house recap','CRM note cleanup','Social caption from listing facts'],'Ask attendees to write down one task for later exercises.'],
  ['compare','AI BASICS','A plain-English way to think about AI',['Good at','Drafting','Rewriting','Summarizing','Brainstorming','Organizing','Role-play'],['Not safe for','Guaranteeing facts','Legal advice','Local market certainty','MLS rule interpretation','Fair Housing judgment','Final decisions'],'Explain that AI predicts useful language; it does not verify your facts.'],
  ['bullets','TOOL CHECK','Before you use an AI tool',['Check brokerage policy before using client or transaction information','Avoid pasting private client details into public AI tools','Use verified property, MLS, and market data','Review every message before sending','Keep AI as a drafting assistant, not the final authority'],'Explain that agents should treat AI like a public communication channel unless their brokerage has approved the tool, settings, and data-handling process. Do not paste client names, phone numbers, emails, financial details, motivation, medical or family circumstances, lockbox or access information, seller strategy, or confidential negotiation context into public AI tools.'],
  ['matrix','REVIEW LENS','Four questions before using AI output with a client',[['Is it true?','Verify property facts, stats, dates, and claims.'],['Is it allowed?','Check brokerage, MLS, advertising, and communication rules.'],['Is it fair?','Avoid protected-class language, steering, or discriminatory targeting.'],['Is it yours?','Edit for your voice, judgment, and client relationship.']],'Use this review lens throughout the course.'],
  ['exercise','PRACTICE','Practice: Spot the Risk','Review this AI-generated sentence:','"This quiet family neighborhood is perfect for young professionals and has the best schools in the area."',['What could create risk?','What facts need verification?','How could it be rewritten safely?'],'Connect this directly to the review lens. "Family neighborhood" can create Fair Housing risk. "Young professionals" can imply demographic targeting. "Best schools" needs verification and may create risk if used carelessly. "Quiet" may be subjective. Safer rewrite: "This home offers convenient access to nearby parks, dining, and local amenities. Buyers are encouraged to review school information and neighborhood details using their own preferred sources."'],
  ['beforeafter','BEFORE / AFTER','The fix is better instructions, not just better wording','Write a listing description for a nice house in Coral Gables.','Using only the verified facts below, draft a warm 130-word listing description. Avoid Fair Housing risk, school claims, or invented features. Facts: 3 bedrooms, 2 baths, updated kitchen, covered patio, 2-car garage, near parks and dining.','Better prompts reduce risk by giving AI facts, tone, boundaries, and review rules.','Show that the prompt provides facts, tone, constraints, and review boundaries.'],
  ['formula','PROMPT FORMULA','Use the real estate prompt formula',[['Role','You are helping me as a real estate professional'],['Task','Draft a text / email / script / checklist'],['Context','Client situation, property, timeline, concern'],['Tone','Warm, concise, direct, educational'],['Constraints','Avoid claims, private data, Fair Housing risk'],['Goal','Reply, next step, clarity, appointment']],'Reference this formula repeatedly.'],
  ['example','BUYER EXAMPLE','Apply the formula to a real client communication moment','A buyer toured two condos, liked one, but is worried about monthly payment.','I know the monthly payment is the big question. I can send a quick side-by-side with estimated HOA, taxes, and payment ranges so you can compare without guessing. Would that be helpful before we decide whether to see similar options?','Now apply the formula to a real client communication moment.','Point out empathy, value, and easy next question. Avoid lender-specific promises.'],
  ['example','SELLER EXAMPLE','Seller update: honest without sounding negative','A listing had showings but no offers this week.','We had three showings this week and the consistent feedback was positive on condition, with some hesitation around pricing compared with recent nearby options. My recommendation is that we review the newest activity together and decide whether a small adjustment would improve our position.','Emphasize no panic, no blame, no invented stats.'],
  ['exercise','ACTIVITY','Improve this follow-up message','Original message:','"Just checking in to see if you are still interested."',['Give the lead a reason to reply','Ask one specific question','Keep it under 45 words'],'The phrase "just checking in" is the teaching target. Sample text version: "Hi [Name], I saw you were looking at 2-bedroom condos. Are you still focused on that area, or would it help if I sent a few similar options with updated availability?" Sample email version: "Hi [Name], I wanted to follow up with something useful rather than just check in. Are you still comparing 2-bedroom condos, or has your search shifted to a different area, price range, or timeline?"'],
  ['prompts','PROMPTS','Reusable communication prompts',['Rewrite this text so it sounds warm, concise, and natural for a REALTOR: [draft]','Create a buyer follow-up email based on these call notes: [notes]. Ask one clear next-step question.','Draft a seller update after a quiet week. Be honest, professional, and solution-oriented.','Give me three tone options: concise, reassuring, and more direct.'],'Encourage attendees to save prompts that work.'],
  ['bullets','LEAD REALITY','Most follow-up fails because it is generic, late, or stops too soon',['Many leads arrive with limited context, whether they come from portals, IDX, open houses, referrals, social media, sign calls, or past database activity.','Speed matters, but fast and generic still feels automated.','Different lead sources need different first responses because the relationship context is different.','Useful follow-up gives the person a reason to continue the conversation.'],'Use examples: portal, IDX, open house, valuation lead, old database contact, referral, social media lead, and sign call.'],
  ['compare','CRM VS AI','CRM templates are static. AI-assisted drafts adapt to context.',['CRM template','Saved message','Same wording','Fast but generic'],['AI-assisted draft','Source + context','Situation-aware wording','Agent-reviewed before sending'],'The distinction is important: AI should not auto-send. The agent provides context, reviews the output, edits it, and decides what gets sent.'],
  ['workflow','WORKFLOW','Lead note to next-best message',['Capture source, context, and recent activity','Identify likely intent without assuming certainty','Choose the best channel','Draft one useful message','Review for accuracy and tone','Send and log next step'],'Do not imply AI should auto-send without human review. Different lead sources need different first responses because the relationship context is different.'],
  ['example2','SAMPLE LEAD','Property inquiry response that does more than answer "available?"','Lead asked: "Is the condo on Brickell still available?"','Weak: "Yes, it is available. Let me know if you want to see it."\n\nBetter: "I can verify the latest status for you. Are you focused only on Brickell, or would similar buildings with strong amenities also be worth sending over?"','Emphasize that availability must be verified. This is a sample lead created for classroom safety.'],
  ['exercise','ACTIVITY','Build a first-response set','Sample lead: A buyer asks about a 2-bedroom condo and leaves no timeline.','CRM templates repeat a saved message. AI helps adapt the message to the situation, then you review it before sending.', ['Draft a text message','Draft a short email','Draft a voicemail opener','Add one appointment-oriented next step'],'Have attendees work in pairs or individually. Sample text: "Hi [Name], I saw your inquiry about a 2-bedroom condo. Are you mainly trying to confirm availability, compare similar options, or schedule a time to see it?" Sample email: "Hi [Name], thanks for reaching out about the 2-bedroom condo. I can verify the latest status and send a few similar options if you are open to comparing. Are you looking for something soon, or are you still in the early research stage?" Sample voicemail opener: "Hi [Name], this is Ian. I saw your inquiry about the 2-bedroom condo and wanted to help you confirm the next best step. I will also send a quick message so you can reply when convenient."'],
  ['matrix','MEASURE','Track whether AI is improving follow-up quality',[['Response rate','Are more leads replying?'],['Contact rate','Are conversations starting?'],['Appointment rate','Are replies becoming meetings?'],['Appointments / 100 leads','Is the source becoming more useful?']],'Keep measurement simple. Add appointments per 100 leads as an optional metric for teams or brokers.'],
  ['bullets','LISTING PREP','Start with verified facts and instruct AI not to invent missing details',['Property features and improvements','Showing feedback and buyer questions','Seller goals and timing','Factual neighborhood context','Desired tone and format'],'Warn against asking AI to invent descriptions from an address. MLS information still requires human review because MLS data is entered by people and can contain mistakes.'],
  ['beforeafter','LISTING COPY','From bullet points to polished marketing copy','3 bedrooms / 2 bathrooms\nUpdated kitchen\nCovered patio\n2-car garage\nNearby dining, parks, and everyday amenities','This 3-bedroom, 2-bath home pairs practical everyday function with inviting outdoor space. Highlights include an updated kitchen, covered patio, and 2-car garage, with convenient access to nearby dining, parks, and everyday amenities. The description stays focused on verified features while giving the listing a clearer, more polished presentation.','Better copy adds warmth without inventing facts.','Show useful copy without protected-class language, exaggerated claims, or unsupported details.'],
  ['grid','SOURCE FACTS','One clean fact block can create consistent marketing assets',[['Source facts','Verified details kept in the chat'],['Listing copy','Polished narrative'],['Open house invite','Short event copy'],['Social post','Caption + hook'],['Video script','30-second talking points'],['Seller update','Activity summary']],'Teach agents to preserve a clean source facts block manually in the same chat or notes. Do not claim AI memory is reliable by itself.'],
  ['exercise','ACTIVITY','Practice: Turn one fact set into three assets','Use only verified facts. Do not invent features.','Now try the same process with three high-use formats.', ['One listing paragraph','One 35-word social caption','One open house invite'],'Remind attendees that MLS, brokerage, and advertising rules still apply. Sample verified property fact set: 3 bedrooms; 2 bathrooms; updated kitchen; covered patio; 2-car garage; near dining, parks, and everyday conveniences; open house Saturday, 12 PM to 2 PM. Do not mention schools, demographics, safety, or anything not verified.'],
  ['bullets','APPOINTMENT PREP','AI helps you rehearse, organize, and simplify',['Build buyer consultation and listing appointment agendas.','Create discovery questions from client context.','Practice common objections before the live conversation.','Explain market conditions in plain language, with verified facts.','Prepare follow-up after the appointment.'],'The value is preparation and clarity, not replacing experience.'],
  ['quote','ROLE-PLAY','Seller wants to overprice','Role-play as a seller who believes their home is worth more than recent comparable sales. Push back realistically. After each of my responses, tell me what was clear, what sounded defensive, and what I should try next.','Let the room identify better language for pricing conversations.'],
  ['quote','ROLE-PLAY','Buyer wants to wait for rates to drop','Use AI to practice the conversation without making predictions or giving financial advice. Prompt: Act as a cautious buyer who wants to wait for rates to drop. Help me respond in a way that is educational, not pushy. Challenge any claims that sound too certain.','Clarify that this is an objection-practice example, not a rate prediction slide. Avoid rate predictions and financial advice. Suggest lender involvement for specifics.'],
  ['exercise','ACTIVITY','Create an appointment prep brief','Choose buyer consultation or listing appointment.','', ['Draft a 5-part agenda','Add 5 discovery questions','Add 3 likely objections','Draft a follow-up email template'],'This exercise creates a usable takeaway. Sample buyer consultation agenda: 1. Search goals and timeline. 2. Budget and financing status. 3. Preferred areas and property types. 4. Must-haves versus flexible items. 5. Next steps and communication plan. Discovery questions: What is prompting the move? What would make a home worth seeing immediately? What are you trying to avoid? How soon would you want to act if the right property appeared? Who else should be part of the decision? Likely objections: "I want to wait for rates to drop." "I am not sure where I want to live." "I do not want to feel pressured." Follow-up email: "Thank you for taking the time to talk today. Based on our conversation, I will focus on [property type], [area], and [key criteria]. I will send options that match those priorities and flag anything that may be worth discussing quickly."'],
  ['timeline','DAILY RHYTHM','A simple daily AI workflow',[['Morning','Prioritize tasks and prepare calls'],['Midday','Draft follow-up and client updates'],['Afternoon','Create listing/content drafts'],['End of day','Summarize notes and next steps']],'Small repeated usage beats one dramatic demo.'],
  ['bullets','GUARDRAILS','Responsible AI use in a real estate business',['Protect private client information.','Do not paste confidential data without authorization and safeguards.','Review all output before use.','Follow brokerage policies, MLS rules, and advertising requirements.','Avoid discriminatory targeting or language.','Use AI to support professional judgment, not replace it.'],'Some AI assistants can summarize, remind, or prepare routine updates, but agents should confirm tool permissions and privacy settings first. Some tools allow saved instructions, privacy settings, project-level instructions, or workflow guardrails. These can help, but they do not replace brokerage policy, human review, or compliance judgment.'],
  ['table','BROKERAGE + MLS','When in doubt, slow down and verify',[['Private data','Remove names, contact info, financial details, and sensitive context before using public tools.'],['Advertising','Review claims, disclosures, brokerage rules, and platform requirements.'],['MLS','Follow MLS rules for listing data, remarks, photos, and public display.'],['Consumer communication','Keep records, respect opt-outs, and do not automate beyond policy.']],'AI can help draft and organize communication, but agents should follow brokerage policy, MLS rules, advertising rules, opt-out requirements, and applicable communication laws before automating texts, emails, or calls. Do not imply AI should auto-send messages without human review and policy approval.'],
  ['exercise','ACTIVITY','Build your daily AI workflow','Pick one task in each part of the day.','', ['Morning task','Midday follow-up task','Afternoon marketing/client update task','End-of-day CRM or notes task'],'Ask attendees to write one workflow they will actually use.'],
  ['prompts','STARTER LIBRARY','Five prompts to save before you leave',['Draft a client message from these notes: [notes]. Make it concise, warm, and specific.','Create three versions of this follow-up: text, email, and voicemail.','Review this message for accuracy, Fair Housing risk, and claims I should verify.','Turn these verified listing facts into a listing paragraph, social caption, and open house invite.','Role-play as [buyer/seller type] and help me practice responding professionally.'],'Use one chat per client, property, or workflow when context matters. Use separate chats when topics, clients, or confidential contexts should not mix. Encourage attendees to customize the bracketed fields.'],
  ['workflow','SAVE CONTEXT','Make the workflow repeatable',['Save the best prompt','Save the verified fact block','Save the final reviewed version','Note what worked','Reuse as a template next time'],'To make AI output repeatable, save the prompt, the verified fact block, the tone instruction, the final reviewed version, and the reason it worked.'],
  ['takeaways','KEY TAKEAWAYS','What should change after today',['Use AI on repeatable sales tasks, not vague experiments','Give AI role, task, context, tone, constraints, and goal','Review every output before a client sees it','Protect private data and follow brokerage policy','Build one daily workflow before adding more tools'],'Summary slide. Keep it actionable.'],
  ['workflow','FINAL ACTION','Your one-week implementation plan',['Choose one workflow','Write one reusable prompt','Use it three times','Save what worked','Review before using with clients'], 'This course provides general education, not legal, financial, brokerage, MLS, or Fair Housing advice. Point attendees to brokerage AI policies, Fair Housing and advertising guidance, MLS rules, and appropriate professionals when needed. Close on action, not a generic thank-you slide.']
];

function addNotes(slide, text) {
  if (typeof slide.addNotes === 'function') slide.addNotes(text || 'Use this slide to connect the approved topic to practical REALTOR workflows.');
}

function footer(slide, i) {
  slide.addShape(deck.ShapeType.line, { x: 0.55, y: 7.08, w: 12.25, h: 0, line: { color: C.line, width: 0.75 } });
  slide.addText('Approved REALTOR education course | MIAMI REALTORS + RWorld members', { x: 0.55, y: 7.18, w: 7.8, h: 0.18, fontFace: 'Aptos', fontSize: 7.2, color: C.gray, margin: 0 });
  slide.addText(`${i}/${slides.length}`, { x: 11.95, y: 7.18, w: 0.8, h: 0.18, fontFace: 'Aptos', fontSize: 7.2, color: C.gray, align: 'right', margin: 0 });
}

function addBackdrop(slide, variant = 0) {
  const palette = [C.sky, C.paleGold, C.paleCoral, C.lavender, C.mint];
  const color = palette[variant % palette.length];
  slide.addShape(deck.ShapeType.arc, { x: 10.7, y: -0.55, w: 3.15, h: 3.15, adjustPoint: 0.16, line: { color, width: 2 }, fill: { color: C.white, transparency: 100 } });
  slide.addShape(deck.ShapeType.arc, { x: -0.8, y: 5.85, w: 2.25, h: 2.25, adjustPoint: 0.22, line: { color, width: 2 }, fill: { color: C.white, transparency: 100 } });
}

function accentFor(i) {
  return [C.teal, C.blue, C.coral, C.gold, C.green][i % 5];
}

function addSignalBars(slide, i) {
  const colors = [C.teal, C.blue, C.coral, C.gold];
  colors.forEach((color, idx) => {
    slide.addShape(deck.ShapeType.rect, {
      x: 10.15 + idx * 0.38,
      y: 0.54,
      w: 0.24,
      h: 0.08 + ((idx + i) % 3) * 0.045,
      fill: { color, transparency: 8 },
      line: { color, transparency: 100 }
    });
  });
}

function addWorkshopPill(slide, text, x, y, color = C.teal) {
  slide.addShape(deck.ShapeType.roundRect, { x, y, w: 1.72, h: 0.34, rectRadius: 0.04, fill: { color }, line: { color } });
  slide.addText(text, { x: x + 0.14, y: y + 0.095, w: 1.42, h: 0.1, fontSize: 7.2, bold: true, color: C.white, align: 'center', margin: 0, fit: 'shrink' });
}

function miniIcon(slide, x, y, label, color = C.teal) {
  slide.addShape(deck.ShapeType.roundRect, { x, y, w: 0.54, h: 0.54, rectRadius: 0.08, fill: { color }, line: { color } });
  slide.addText(label, { x: x + 0.05, y: y + 0.15, w: 0.44, h: 0.14, fontSize: 8.5, bold: true, color: C.white, align: 'center', margin: 0 });
}

function spotlightCard(slide, heading, body, variant = 0) {
  const fills = [C.sky, C.paleGold, C.paleCoral, C.lavender, C.mint];
  slide.addShape(deck.ShapeType.rect, { x: 8.18, y: 1.9, w: 0.1, h: 3.25, fill: { color: accentFor(variant) }, line: { color: accentFor(variant) } });
  box(slide, 8.32, 2.0, 3.55, 3.05, fills[variant % fills.length], variant === 2 ? 'F5C8C5' : 'BFDADC');
  slide.addText(heading, { x: 8.62, y: 2.35, w: 2.85, h: 0.58, fontSize: 17.5, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
  slide.addText(body, { x: 8.62, y: 3.22, w: 2.75, h: 1.05, fontSize: 12.2, color: C.ink, margin: 0.04, fit: 'shrink' });
  slide.addShape(deck.ShapeType.line, { x: 8.62, y: 4.55, w: 1.2, h: 0, line: { color: variant === 2 ? C.coral : C.teal, width: 3 } });
}

function courseCue(title) {
  const cues = [
    ['Approved learning objectives', 'What this class builds', 'A practical AI workflow for real estate sales, not a technical certification.'],
    ['By the end, AI should feel usable', 'Use it where work repeats', 'Start with messages, notes, follow-up, and prep before chasing new tools.'],
    ['AI matters because', 'Speed plus judgment', 'AI can reduce blank-page time; the agent still owns accuracy and relationship quality.'],
    ['Most follow-up fails', 'Useful beats frequent', 'Better follow-up gives the lead a reason to respond and a clear next step.'],
    ['AI is useful when', 'Facts first', 'Feed AI verified property facts. Do not ask it to invent listing details.'],
    ['AI helps you rehearse', 'Practice before pressure', 'Role-play makes client conversations clearer and less reactive.'],
    ['Responsible AI use', 'Review before use', 'Private data, brokerage policy, MLS rules, advertising, and Fair Housing still apply.'],
    ['Recommended resources', 'Keep sources close', 'Use authoritative local rules and broker guidance when the answer matters.'],
    ['AI supports your work', 'Professional judgment stays in the loop', 'Verify, review, and follow applicable rules before using AI output.']
  ];
  const match = cues.find(([needle]) => title.startsWith(needle));
  return match ? { heading: match[1], body: match[2] } : { heading: 'Workshop point', body: 'Connect the idea to a real client, lead, listing, or daily workflow.' };
}

function drawNetwork(slide, x, y, w, h, color = C.teal) {
  const pts = [
    [x + 0.35, y + 0.65], [x + 1.45, y + 0.25], [x + 2.65, y + 0.8],
    [x + 0.95, y + 1.65], [x + 2.2, y + 1.85], [x + 3.15, y + 1.35]
  ];
  const lineBetween = (p1, p2) => {
    const lx = Math.min(p1[0], p2[0]);
    const ly = Math.min(p1[1], p2[1]);
    const lw = Math.abs(p2[0] - p1[0]);
    const lh = Math.abs(p2[1] - p1[1]);
    slide.addShape(deck.ShapeType.line, { x: lx, y: ly, w: Math.max(lw, 0.01), h: Math.max(lh, 0.01), line: { color: 'BFDADC', width: 1.3 } });
  };
  [[0,1],[1,2],[0,3],[1,3],[2,4],[3,4],[4,5],[2,5]].forEach(([a,b]) => {
    lineBetween(pts[a], pts[b]);
  });
  pts.forEach((p, idx) => {
    slide.addShape(deck.ShapeType.ellipse, { x: p[0]-0.09, y: p[1]-0.09, w: 0.18, h: 0.18, fill: { color: idx === 1 ? C.coral : color }, line: { color: C.white, width: 1 } });
  });
}

function drawChat(slide, x, y, w, h) {
  box(slide, x, y, w * 0.82, 0.55, C.white, 'C9DFE5');
  slide.addText('Client context', { x: x + 0.22, y: y + 0.17, w: w * 0.65, h: 0.12, fontSize: 8.5, bold: true, color: C.gray, margin: 0 });
  box(slide, x + 0.38, y + 0.85, w * 0.88, 0.72, C.sky, 'BFDADC');
  slide.addText('AI draft', { x: x + 0.62, y: y + 1.1, w: w * 0.5, h: 0.12, fontSize: 9, bold: true, color: C.teal, margin: 0 });
  box(slide, x + 0.05, y + 1.92, w * 0.95, 0.72, C.mint, 'BBDCC9');
  slide.addText('Agent review', { x: x + 0.32, y: y + 2.18, w: w * 0.62, h: 0.12, fontSize: 9, bold: true, color: C.green, margin: 0 });
}

function drawChecklist(slide, x, y, w, h) {
  box(slide, x, y, w, h, C.white, 'C9DFE5');
  ['Private', 'Verified', 'Compliant', 'Reviewed'].forEach((label, idx) => {
    const yy = y + 0.38 + idx * 0.48;
    slide.addShape(deck.ShapeType.roundRect, { x: x + 0.32, y: yy, w: 0.24, h: 0.24, rectRadius: 0.03, fill: { color: idx < 3 ? C.teal : C.gold }, line: { color: idx < 3 ? C.teal : C.gold } });
    slide.addText(label, { x: x + 0.75, y: yy + 0.03, w: w - 1.0, h: 0.12, fontSize: 10.5, bold: true, color: C.ink, margin: 0 });
  });
}

function drawDoc(slide, x, y, w, h) {
  box(slide, x, y, w, h, C.white, 'C9DFE5');
  slide.addShape(deck.ShapeType.rect, { x: x + 0.35, y: y + 0.45, w: w - 0.7, h: 0.16, fill: { color: C.navy }, line: { color: C.navy } });
  [0.95, 1.32, 1.69].forEach((off, idx) => {
    slide.addShape(deck.ShapeType.rect, { x: x + 0.35, y: y + off, w: w - (idx === 2 ? 1.4 : 0.95), h: 0.08, fill: { color: idx === 1 ? 'BFDADC' : C.line }, line: { color: idx === 1 ? 'BFDADC' : C.line } });
  });
  slide.addShape(deck.ShapeType.line, { x: x + 0.35, y: y + 2.25, w: w - 0.8, h: 0, line: { color: C.coral, width: 3 } });
}

function drawCalendar(slide, x, y, w, h) {
  box(slide, x, y, w, h, C.white, 'C9DFE5');
  slide.addShape(deck.ShapeType.rect, { x, y, w, h: 0.5, fill: { color: C.navy }, line: { color: C.navy } });
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const fill = (r === 1 && c === 1) || (r === 2 && c === 3) ? C.sky : C.paper;
      slide.addShape(deck.ShapeType.roundRect, { x: x + 0.38 + c * 0.72, y: y + 0.82 + r * 0.48, w: 0.46, h: 0.26, rectRadius: 0.02, fill: { color: fill }, line: { color: C.line, width: 0.5 } });
    }
  }
}

function contextVisual(slide, kickerText, titleText, variant = 0) {
  const fill = [C.sky, C.paleGold, C.mint, C.lavender, C.paleCoral][variant % 5];
  slide.addShape(deck.ShapeType.rect, { x: 8.28, y: 1.84, w: 0.1, h: 3.6, fill: { color: accentFor(variant) }, line: { color: accentFor(variant) } });
  box(slide, 8.48, 1.95, 3.35, 3.35, fill, 'C9DFE5');
  const key = `${kickerText} ${titleText}`.toLowerCase();
  let label = 'Repeatable workflow';
  if (key.includes('lead') || key.includes('communication') || key.includes('follow')) {
    drawChat(slide, 8.85, 2.38, 2.65, 2.35);
    label = key.includes('lead') ? 'Context before cadence' : 'Human-reviewed message';
  } else if (key.includes('guard') || key.includes('tool') || key.includes('responsible')) {
    drawChecklist(slide, 8.9, 2.35, 2.7, 2.4);
    label = key.includes('tool') ? 'Privacy first' : 'Review before use';
  } else if (key.includes('listing') || key.includes('fact') || key.includes('resource')) {
    drawDoc(slide, 8.92, 2.33, 2.65, 2.42);
    label = 'Facts before polish';
  } else if (key.includes('daily') || key.includes('workflow') || key.includes('appointment')) {
    drawCalendar(slide, 8.88, 2.35, 2.72, 2.35);
    label = key.includes('appointment') ? 'Practice before pressure' : 'Small daily rhythm';
  } else {
    drawNetwork(slide, 8.78, 2.36, 2.8, 2.2, accentFor(variant));
  }
  slide.addText(label, { x: 8.82, y: 5.58, w: 2.8, h: 0.22, fontSize: 10.5, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
}

function addOfficialLogoRail(slide, x, y, scale = 1) {
  if (!fs.existsSync(brandAssets.combined)) return;
  const logoW = 5.32 * scale;
  const logoH = 0.8 * scale;
  slide.addShape(deck.ShapeType.roundRect, {
    x: x - 0.16, y: y - 0.12, w: logoW + 0.32, h: logoH + 0.24,
    rectRadius: 0.04,
    fill: { color: C.white, transparency: 3 },
    line: { color: 'D7E4EA', transparency: 25, width: 0.6 }
  });
  slide.addImage({ path: brandAssets.combined, x, y, w: logoW, h: logoH });
}

function kicker(slide, text, color=C.teal) {
  slide.addShape(deck.ShapeType.rect, { x: 0.72, y: 0.48, w: 0.12, h: 0.28, fill: { color }, line: { color } });
  slide.addText(text, { x: 0.92, y: 0.47, w: 5.4, h: 0.25, fontFace: 'Aptos', fontSize: 8.8, bold: true, color, margin: 0, fit: 'shrink' });
}

function title(slide, text, subtitle) {
  slide.addText(text, { x: 0.72, y: 0.86, w: 11.4, h: 0.7, fontFace: 'Aptos Display', fontSize: text.length > 64 ? 24 : 30, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
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
  addSignalBars(slide, i);
  kicker(slide, k); title(slide, t, typeof a === 'string' && !Array.isArray(b) ? undefined : null);

  if (type === 'bullets') {
    bulletText(slide, a, 0.95, 2.0, 7.05, 4.3, t.startsWith('By the end') ? 15.2 : 17.2);
    contextVisual(slide, k, t, i);
  } else if (type === 'agenda') {
    slide.addText('120 minutes: concept -> example -> practice -> takeaway', { x: 0.86, y: 1.58, w: 5.8, h: 0.22, fontSize: 10.5, bold: true, color: C.gray, margin: 0 });
    a.forEach((s, idx) => {
      const x = 0.85 + (idx % 4) * 3.05, y = 2.0 + Math.floor(idx / 4) * 1.7;
      slide.addShape(deck.ShapeType.line, { x, y: y + 0.76, w: 2.35, h: 0, line: { color: idx < 4 ? C.line : 'E7D9B6', width: 1 } });
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
    addWorkshopPill(slide, type === 'activity' ? 'DISCUSS' : 'PRACTICE', 0.95, 1.66, type === 'activity' ? C.blue : C.gold);
    slide.addShape(deck.ShapeType.rect, { x: 0.9, y: 1.98, w: 5.92, h: 0.12, fill: { color: type === 'activity' ? C.blue : C.gold }, line: { color: type === 'activity' ? C.blue : C.gold } });
    box(slide, 0.95, 2.05, 5.8, 2.8, C.white);
    slide.addText(a, { x: 1.25, y: 2.3, w: 5.1, h: 0.35, fontSize: 14, color: C.gray, margin: 0, fit: 'shrink' });
    if (quoteText) slide.addText(String(quoteText).replace(/^"|"$/g, ''), { x: 1.25, y: 2.82, w: 5.1, h: 1.25, fontSize: 17, bold: true, color: C.navy, margin: 0.03, fit: 'shrink' });
    slide.addText('Workshop canvas', { x: 1.25, y: 4.38, w: 2.4, h: 0.2, fontSize: 9.5, color: C.teal, bold: true, margin: 0 });
    slide.addShape(deck.ShapeType.rect, { x: 7.05, y: 1.98, w: 0.14, h: 2.95, fill: { color: C.green }, line: { color: C.green } });
    box(slide, 7.2, 1.98, 4.6, 2.95, C.mint, 'BBDCC9');
    bulletText(slide, taskList, 7.5, 2.35, 3.85, 2.0, 15);
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
    const bridge = spec.length > 6 ? c : '';
    if (bridge) slide.addText(bridge, { x: 0.95, y: 1.62, w: 10.7, h: 0.26, fontSize: 12.5, bold: true, color: C.gray, margin: 0, fit: 'shrink' });
    [['Before', a, C.paleCoral], ['After', b, C.sky]].forEach((part, idx) => {
      const x = idx === 0 ? 0.95 : 6.65;
      box(slide, x, 2.0, 5.1, 3.4, part[2]);
      slide.addText(part[0], { x: x+0.28, y: 2.28, w: 1.5, h: 0.22, fontSize: 10, bold: true, color: idx ? C.teal : C.coral, margin: 0 });
      slide.addText(part[1], { x: x+0.3, y: 2.75, w: 4.45, h: 2.0, fontSize: idx ? 14.0 : 13.6, color: C.ink, margin: 0.03, fit: 'shrink', breakLine: false });
    });
  } else if (type === 'formula') {
    a.forEach((p, idx) => {
      const x = 0.82 + (idx % 3) * 4.02, y = 2.0 + Math.floor(idx / 3) * 1.45;
      box(slide, x, y, 3.55, 1.05, C.white);
      slide.addText(p[0], { x: x+0.24, y: y+0.18, w: 1.4, h: 0.2, fontSize: 9.5, bold: true, color: C.teal, margin: 0 });
      slide.addText(p[1], { x: x+0.24, y: y+0.48, w: 3.0, h: 0.28, fontSize: 11.5, color: C.ink, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'example' || type === 'example2') {
    const bridge = spec.length > 6 ? c : '';
    if (bridge) slide.addText(bridge, { x: 0.95, y: 1.62, w: 10.7, h: 0.26, fontSize: 12.5, bold: true, color: C.gray, margin: 0, fit: 'shrink' });
    box(slide, 0.95, 2.0, 3.35, 3.25, C.white);
    slide.addShape(deck.ShapeType.roundRect, { x: 1.25, y: 2.32, w: 2.75, h: 1.15, rectRadius: 0.12, fill: { color: C.lavender }, line: { color: 'D8DDF4' } });
    slide.addText(a, { x: 1.45, y: 2.6, w: 2.35, h: 0.75, fontSize: 13.3, bold: true, color: C.navy, margin: 0.03, fit: 'shrink' });
    slide.addText('Client context', { x: 1.25, y: 4.08, w: 1.5, h: 0.2, fontSize: 9.5, bold: true, color: C.teal, margin: 0 });
    box(slide, 5.0, 2.0, 6.65, 3.25, C.sky);
    slide.addShape(deck.ShapeType.roundRect, { x: 5.35, y: 2.42, w: 5.95, h: 1.75, rectRadius: 0.12, fill: { color: C.white }, line: { color: 'CFE5E8' } });
    slide.addText(b, { x: 5.65, y: 2.68, w: 5.35, h: 1.35, fontSize: 13.8, color: C.ink, margin: 0.03, fit: 'shrink', breakLine: false });
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
    slide.addText(`"${a}"`, { x: 1.45, y: 2.4, w: 9.0, h: 1.35, fontSize: 18, italic: true, color: C.white, margin: 0.03, fit: 'shrink' });
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
      slide.addText(r[0], { x: 1.22, y: y+0.18, w: 2.2, h: 0.18, fontSize: 10.3, bold: true, color: C.teal, margin: 0, fit: 'shrink' });
      slide.addText(r[1], { x: 3.62, y: y+0.14, w: 7.25, h: 0.24, fontSize: 11.3, color: C.ink, margin: 0, fit: 'shrink' });
    });
  } else if (type === 'takeaways') {
    bulletText(slide, a, 1.0, 2.05, 9.8, 3.2, 17);
  } else if (type === 'bio') {
    const personName = spec[3];
    const personTitle = spec[4];
    const bioBullets = spec[5];
    const goHouseBullets = spec[6];
    box(slide, 0.95, 2.0, 5.25, 3.85, C.white);
    slide.addText('Instructor', { x: 1.28, y: 2.28, w: 1.4, h: 0.18, fontSize: 9.5, bold: true, color: C.teal, margin: 0 });
    slide.addText(personName, { x: 1.28, y: 2.62, w: 4.55, h: 0.38, fontSize: 22, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
    slide.addText(personTitle, { x: 1.28, y: 3.08, w: 4.55, h: 0.3, fontSize: 12.8, color: C.gray, margin: 0, fit: 'shrink' });
    slide.addShape(deck.ShapeType.line, { x: 1.28, y: 3.6, w: 1.35, h: 0, line: { color: C.coral, width: 3 } });
    bulletText(slide, bioBullets, 1.28, 3.92, 4.45, 1.1, 11.7);
    slide.addShape(deck.ShapeType.rect, { x: 6.75, y: 1.9, w: 0.14, h: 4.0, fill: { color: C.teal }, line: { color: C.teal } });
    box(slide, 6.9, 2.0, 4.85, 3.85, C.sky, 'BFDADC');
    slide.addText('Teaching Focus', { x: 7.25, y: 2.33, w: 3.0, h: 0.38, fontSize: 22, bold: true, color: C.navy, margin: 0 });
    slide.addText('Practical, vendor-neutral AI workflows', { x: 7.25, y: 2.85, w: 3.9, h: 0.22, fontSize: 10.5, bold: true, color: C.teal, margin: 0 });
    bulletText(slide, goHouseBullets, 7.25, 3.38, 4.0, 1.45, 11.7);
    slide.addText('Instructor context, not a product requirement', { x: 7.25, y: 5.25, w: 3.5, h: 0.18, fontSize: 9.5, bold: true, color: C.green, margin: 0 });
  } else if (type === 'closing') {
    slide.addText(a, { x: 0.76, y: 2.95, w: 7.5, h: 0.38, fontSize: 16, color: C.gray, margin: 0 });
    slide.addShape(deck.ShapeType.line, { x: 0.76, y: 3.58, w: 2.0, h: 0, line: { color: C.coral, width: 4 } });
    slide.addText('Thank you', { x: 0.76, y: 4.1, w: 3.0, h: 0.35, fontSize: 22, bold: true, color: C.navy, margin: 0 });
    addOfficialLogoRail(slide, 7.05, 4.02, 0.72);
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
    slide.addShape(deck.ShapeType.arc, { x: 8.9, y: -0.55, w: 4.8, h: 4.8, adjustPoint: 0.18, line: { color: '5FBDBD', transparency: 28, width: 2 }, fill: { color: C.navy, transparency: 100 } });
    slide.addShape(deck.ShapeType.rect, { x: 11.84, y: 0, w: 0.22, h: 7.5, fill: { color: C.teal, transparency: 25 }, line: { color: C.teal, transparency: 100 } });
    slide.addShape(deck.ShapeType.rect, { x: 12.12, y: 0, w: 0.1, h: 7.5, fill: { color: C.gold, transparency: 12 }, line: { color: C.gold, transparency: 100 } });
    slide.addShape(deck.ShapeType.roundRect, { x: 8.0, y: 2.25, w: 2.95, h: 2.85, rectRadius: 0.06, fill: { color: '1E4768', transparency: 18 }, line: { color: '5FBDBD', transparency: 35, width: 1 } });
    drawNetwork(slide, 8.25, 2.72, 2.5, 1.85, C.teal);
    slide.addText('AI workflow', { x: 8.42, y: 4.46, w: 2.05, h: 0.18, fontSize: 10.5, bold: true, color: 'D7EDEE', align: 'center', margin: 0 });
    slide.addText(k, { x: 0.8, y: 0.75, w: 6.8, h: 0.25, fontSize: 10.5, bold: true, color: C.gold, margin: 0 });
    slide.addText(t, { x: 0.78, y: 1.65, w: 9.8, h: 0.85, fontFace: 'Aptos Display', fontSize: 42, bold: true, color: C.white, margin: 0, fit: 'shrink' });
    slide.addText(a, { x: 0.82, y: 2.56, w: 8.7, h: 0.45, fontSize: 22, color: 'D7EDEE', margin: 0 });
    slide.addShape(deck.ShapeType.line, { x: 0.82, y: 3.34, w: 2.2, h: 0, line: { color: C.coral, width: 4 } });
    addWorkshopPill(slide, 'LIVE WORKSHOP', 0.82, 3.66, C.teal);
    slide.addText('Presented by Ian Burton Price | GoHouse.ai', { x: 2.72, y: 3.72, w: 4.4, h: 0.16, fontSize: 10.3, bold: true, color: 'D7EDEE', margin: 0 });
    addOfficialLogoRail(slide, 0.82, 4.72, 0.82);
    slide.addText(b, { x: 0.82, y: 5.95, w: 6.8, h: 0.28, fontSize: 12, color: 'D7EDEE', margin: 0 });
    slide.addText('Practical AI Training for Real Estate Professionals', { x: 0.82, y: 6.3, w: 5.4, h: 0.22, fontSize: 9.5, color: 'AFC8CF', margin: 0 });
    addNotes(slide, c);
  } else if (type === 'section') {
    const slide = deck.addSlide();
    slide.background = { color: C.dark };
    const sectionNum = slides.slice(0, i).filter(s => s[0] === 'section').length;
    slide.addShape(deck.ShapeType.rect, { x: 0, y: 0, w: 0.32, h: 7.5, fill: { color: accentFor(sectionNum) }, line: { color: accentFor(sectionNum) } });
    slide.addShape(deck.ShapeType.rect, { x: 10.85, y: 0, w: 2.48, h: 7.5, fill: { color: '102B43', transparency: 10 }, line: { color: '102B43', transparency: 100 } });
    slide.addText(String(sectionNum).padStart(2, '0'), { x: 8.3, y: 1.15, w: 3.8, h: 1.1, fontFace: 'Aptos Display', fontSize: 78, bold: true, color: '28465D', margin: 0, align: 'right' });
    slide.addText(k, { x: 0.82, y: 0.9, w: 4.2, h: 0.28, fontSize: 11, bold: true, color: C.gold, margin: 0 });
    slide.addText(t, { x: 0.78, y: 2.0, w: 9.4, h: 0.9, fontFace: 'Aptos Display', fontSize: 34, bold: true, color: C.white, margin: 0, fit: 'shrink' });
    slide.addText(a, { x: 0.82, y: 3.12, w: 8.4, h: 0.45, fontSize: 16, color: 'DCEEEF', margin: 0, fit: 'shrink' });
    slide.addShape(deck.ShapeType.line, { x: 0.82, y: 4.0, w: 2.0, h: 0, line: { color: C.coral, width: 4 } });
    slide.addText('Orientation for the next classroom section', { x: 0.82, y: 4.42, w: 4.6, h: 0.25, fontSize: 10.5, bold: true, color: '9DB8C8', margin: 0 });
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
  `# Course 01 Approved Instructor Deck Outline\n\nSource: \`pdfs/syllabi/01-ai-for-real-estate-sales-syllabus.pdf\`\n\nOrganization reference used in deck: \`MIAMI REALTORS + RWorld\`.\n\nSlide count: ${slides.length}\n\n` +
  slides.map((s, i) => `## ${String(i + 1).padStart(2, '0')}. ${s[2]}\n\n- Kicker: ${s[1]}\n- Layout type: ${s[0]}\n- Speaker note: ${s[s.length - 1] || 'Section transition or classroom discussion.'}`).join('\n\n') + '\n', 'utf8');
fs.writeFileSync(path.join(srcDir, 'course-01-approved-assumptions.md'),
`# Course 01 Approved Deck Assumptions

- The approved source is \`pdfs/syllabi/01-ai-for-real-estate-sales-syllabus.pdf\`.
- The course is a 2-hour live instructor-led class with optional hands-on prompt work.
- Audience includes Florida REALTORS, especially MIAMI REALTORS + RWorld members, plus brokers, team leaders, and real estate professionals.
- The deck preserves the approved title and learning objectives while expanding the teaching content for live delivery.
- The deck uses synthetic real estate examples only.
- The user-provided combined MIAMI REALTORS + RWorld logo is used conservatively on the title slide.
- The deck does not invent alternate board branding or use an unverified organization name.
- GoHouse.ai does not appear as course branding or a product pitch.
- Compliance content is framed as general education and reminders, not legal advice.
- AI tools should support professional judgment, not replace it.
`, 'utf8');
fs.writeFileSync(path.join(srcDir, 'course-01-approved-assets.md'),
`# Recommended Image/Icon Assets

Assets used in the PPTX:

- Native editable PowerPoint shapes, lines, and text boxes.
- User-provided combined MIAMI REALTORS + RWorld logo asset.
- Legacy separate logo files remain in assets/brand for reference but are not used in this deck.

Recommended optional future assets, if approved/provided:

- Association-approved combined logo or final merger branding file, if the board provides updated assets.
- Instructor headshot, if desired for the intro slide.
- Association-approved event/course branding guidance.
- Public-safe generic real estate classroom photo or local skyline image if rights are confirmed.

Current deck avoids invented brand marks and uses only approved logo source files.
`, 'utf8');
fs.writeFileSync(path.join(srcDir, 'course-01-approved-organization-note.md'),
`# Organization Naming Note

The deck references \`MIAMI REALTORS + RWorld\` and \`MIAMI REALTORS + RWorld members\`.

Reasoning:

- The user stated that MIAMI REALTORS and RWorld completed a merger in May 2026.
- The final long-term public brand name may still be in transition.
- The deck therefore avoids overcommitting to an uncertain renamed entity.
- The deck does not use \`Miami and South Florida Realtors\` as a primary name.
- The user-provided combined MIAMI REALTORS + RWorld logo is used on the title slide.
- The deck does not invent alternate board branding.

This is intentionally conservative and suitable for an approved REALTOR education course while branding remains in transition.
`, 'utf8');

console.log(JSON.stringify({ pptxPath, slideCount: slides.length }, null, 2));
