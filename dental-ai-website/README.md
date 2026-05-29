# Reva AI — Dental AI Receptionist website

A premium, 3D, interactive marketing site for an agency that sells AI **voice**
and **chat** receptionists to dental clinics. Built with Next.js + React Three
Fiber + Tailwind, designed in the spirit of cuberto / landio / arini.ai.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build / preview:

```bash
npm run build
npm run start
```

## ✏️ Everything you'll want to change lives in ONE file

Open **`lib/config.ts`**:

- **Brand** — name, tagline, the AI persona name ("Reva").
- **Contact** — `phoneDisplay` / `phoneE164`. This is **Aiden's number and the
  only number shown anywhere on the site**. The founder's number is never
  displayed. The click-to-call / SMS / WhatsApp links are generated from this
  automatically:
  - Call → `tel:+19493978560`
  - Text → `sms:+19493978560`
  - WhatsApp → `https://wa.me/19493978560`
- **Team** — Aiden has `showContact: true` (his call/text/WhatsApp buttons
  show). The founder has `showContact: false` (no number, no buttons).
- **ROI numbers** — `roiDefaults` powers the calculator and the stats.
- **Voice demos** — the `voiceDemos` array (see below).

## 🎙️ Adding your ElevenLabs voice-call demos

The homepage has three "Hear Reva on a real call" cards. They currently show a
polished **"Demo coming soon"** state. To make one play:

1. Drop the recording into `public/demos/`, e.g. `public/demos/new-patient.mp3`.
2. In `lib/config.ts`, set that demo's `audioSrc: "/demos/new-patient.mp3"`.

The card automatically turns into a working audio player. (See
`public/demos/README.md`.)

## 💬 The "Ask Reva" assistant

The floating button (bottom-right) opens an AI Q&A assistant. It works out of the
box using a built-in dental knowledge base in `app/api/ask/route.ts` — no API key
needed. To upgrade it to a real LLM, follow the comment at the top of that file
(install `@anthropic-ai/sdk`, set `ANTHROPIC_API_KEY`, swap the answer function).

## 🧩 The chat demos

`components/sections/ChatDemos.tsx` holds three WhatsApp-style scripted
conversations (Website Receptionist, WhatsApp/SMS Agent, Patient Recall Agent).
Edit the `conversations` array there to change clinics, scripts, or add a fourth.

## Pages

`/` (landing) · `/about` · `/roi` (Save Money & Time) · `/team` · `/contact`

## Deploy

This is a standard Next.js app — deploy to **Vercel** (recommended) or any Node
host. On Vercel: import the repo, set the root directory to `dental-ai-website`,
and deploy. No env vars are required for the default build.
