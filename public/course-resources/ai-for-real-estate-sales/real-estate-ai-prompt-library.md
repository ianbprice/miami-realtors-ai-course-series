# AI Prompt Library for Real Estate Agents

Course: AI for Real Estate Sales: From Confusion to Daily Use  
Recommended use: Copy a prompt, replace the placeholders, review the output, verify facts, and edit before sending.

## Prompt Formula

Use this structure when you need better output:

Role: Who should AI help as?  
Task: What should it create or improve?  
Context: What facts, notes, lead source, property details, or client situation matter?  
Audience: Who will receive it?  
Tone: How should it sound?  
Constraints: What should it avoid?  
Format: Text, email, voicemail, checklist, table, agenda, script, etc.  
Goal: What should the message or workflow accomplish?

Base prompt:

```text
You are helping me as a real estate professional. I need to create [TASK] for [AUDIENCE]. Here is the context: [CONTEXT]. The tone should be [TONE]. Avoid [CONSTRAINTS]. Format the result as [FORMAT]. The goal is [GOAL]. Do not invent missing facts. Flag anything I should verify before using this.
```

## 1. Lead Follow-Up

```text
Create a first-response message for a new [LEAD SOURCE] lead. Context: [LEAD NOTES]. They asked about [PROPERTY OR AREA]. Write one text message, one short email, and one voicemail opener. Keep the tone warm, concise, and appointment-oriented. Do not pressure them. Ask one simple next-step question.
```

```text
Review these lead notes and suggest the best next message: [CRM NOTES]. Identify the likely intent level, the missing information I should ask for, and one text message that gives the lead a reason to respond.
```

## 2. Buyer Consultation Prep

```text
Help me prepare for a buyer consultation. Buyer context: [BUYER GOAL], [PRICE RANGE], [AREAS], [TIMELINE], [FINANCING STATUS], [CONCERNS]. Create a short meeting agenda, five discovery questions, likely objections, and a follow-up message I can send after the appointment.
```

## 3. Seller Consultation Prep

```text
Help me prepare for a listing consultation. Seller context: [SELLER MOTIVATION], [TIMELINE], [PROPERTY DETAILS], [KNOWN UPDATES], [PRICING EXPECTATION], [CONCERNS]. Create a meeting agenda, discovery questions, talking points, and a follow-up email. Do not make pricing claims without verified comparable sales.
```

## 4. Listing Description Drafts

```text
Draft a listing description using only these verified facts: [PROPERTY FACT BLOCK]. Tone: [TONE]. Audience: [TARGET BUYER TYPE WITHOUT PROTECTED-CLASS LANGUAGE]. Do not invent features, school claims, neighborhood claims, square footage, views, upgrades, or amenities. Flag missing details I should verify.
```

## 5. Social Media Post Drafts

```text
Turn this verified property fact block into three social media captions: [PROPERTY FACT BLOCK]. Create one professional caption, one short casual caption, and one open-house caption. Avoid Fair Housing risk, unsupported claims, and exaggerated language.
```

## 6. Email Follow-Up

```text
Rewrite this email so it sounds like a helpful real estate agent, not an automated drip: [DRAFT EMAIL]. Keep it under [WORD COUNT] words, make it specific to [CLIENT OR LEAD CONTEXT], and end with one clear next-step question.
```

## 7. Text Message Follow-Up

```text
Create a short text message for [CLIENT NAME OR LEAD TYPE] based on this context: [CONTEXT]. Keep it natural, under 320 characters, and focused on one next step. Avoid sounding pushy or generic.
```

## 8. Open House Follow-Up

```text
Create follow-up messages for an open house visitor. Visitor notes: [NOTES]. Write a same-day text, a next-day email, and a short phone opener. The goal is to learn whether they are actively searching and whether a buyer consultation or showing makes sense.
```

## 9. Past Client Reactivation

```text
Write a warm reactivation message to a past client. Context: [PAST CLIENT CONTEXT], [LAST CONTACT], [LOCAL MARKET HOOK]. Keep it personal, useful, and low-pressure. Include one simple question that invites a reply.
```

## 10. Sphere Nurturing

```text
Create a monthly sphere email based on this topic: [TOPIC]. Audience: homeowners and local contacts. Tone: practical and conversational. Include one useful insight, one local prompt for conversation, and one soft offer to help. Avoid market predictions and unsupported claims.
```

## 11. Objection Handling

```text
Role-play as [BUYER OR SELLER] who says: "[OBJECTION]." Push back realistically. After each response I write, tell me what sounded clear, what sounded defensive, and how I can improve. Keep the advice compliant and avoid legal, financial, or predictive claims.
```

## 12. Daily Task Planning

```text
Help me prioritize my real estate work today. Here are my tasks: [TASK LIST]. Here are my active clients and leads: [SUMMARY]. Group the day into morning, midday, afternoon, and end-of-day. Identify three high-value follow-up actions and one task I can simplify with AI.
```

## 13. CRM Cleanup

```text
Turn these rough CRM notes into a clean summary and next step: [NOTES]. Format as: client goal, timeline, important context, last interaction, next best action, message draft, and facts to verify. Remove sensitive details that should not be shared externally.
```

## 14. Content Repurposing

```text
Repurpose this market update or client education note into three formats: [SOURCE CONTENT]. Create a short email, a social caption, and a 45-second video outline. Keep the facts unchanged and flag any claims that need verification.
```

## 15. Market Update Explanation

```text
Explain this market information in plain language for [BUYER/SELLER/PAST CLIENT]: [VERIFIED MARKET DATA]. Avoid predictions, legal advice, financial advice, and exaggerated claims. Include what this may mean generally and what should be reviewed with a qualified professional if needed.
```

## 16. Compliance Review Checklist

```text
Review this real estate message for risk before I use it: [DRAFT]. Check for unsupported facts, Fair Housing concerns, discriminatory language or targeting, confidential information, MLS or advertising issues, pricing or market overclaims, financial/legal advice, and tone problems. Return a table with risk, why it matters, and safer wording.
```

## Quick Review Before Use

- Did I remove private or confidential information before prompting?
- Did I provide verified facts instead of asking AI to guess?
- Did I review the result for accuracy and tone?
- Did I check Fair Housing, MLS, advertising, brokerage policy, and opt-out requirements where relevant?
- Does the final version sound like me on a good day?
