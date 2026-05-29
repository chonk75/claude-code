import { NextResponse } from "next/server";
import { brand, contact, roiDefaults } from "@/lib/config";
import { usd } from "@/lib/utils";

/**
 * "Ask Reva" backend.
 *
 * Out of the box this uses a lightweight, dependency-free knowledge base so the
 * assistant works immediately with no API key. To upgrade to a real LLM:
 *   1. npm i @anthropic-ai/sdk
 *   2. set ANTHROPIC_API_KEY in your env
 *   3. replace `answerFromKnowledge(...)` with a call to the model, passing
 *      `knowledge` below as system context.
 */

const lost =
  roiDefaults.missedCallsPerMonthHigh *
  roiDefaults.avgPatientValue *
  roiDefaults.newPatientConversion;

const knowledge: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["price", "pricing", "cost", "how much", "fee", "month"],
    answer: `${brand.name} starts at ${usd(
      roiDefaults.revaMonthlyPrice
    )}/month — a fraction of the ${usd(
      roiDefaults.receptionistMonthlyCost
    )}/month a full-time front-desk hire costs. The best next step is a quick call with ${
      contact.salesName
    } at ${contact.phoneDisplay} to size it to your clinic.`,
  },
  {
    keywords: ["miss", "missed", "calls", "voicemail", "lose", "losing", "roi"],
    answer: `The average dental clinic misses ${roiDefaults.missedCallsPerMonthLow}–${roiDefaults.missedCallsPerMonthHigh} calls a month — and a missed call from a new patient is roughly ${usd(
      roiDefaults.avgPatientValue
    )} in lifetime value walking to a competitor. That can be ${usd(
      lost
    )}+ lost every month. ${brand.agentName} answers every call 24/7 so that revenue stays in your chair.`,
  },
  {
    keywords: ["voice", "call", "phone", "receptionist", "answer"],
    answer: `${brand.agentName} is an AI voice receptionist that answers your phone 24/7 — books and reschedules appointments, answers insurance and pricing questions, triages emergencies, and texts confirmations. It sounds natural and never puts a patient on hold. Try the voice demos on the homepage.`,
  },
  {
    keywords: ["chat", "text", "whatsapp", "sms", "message", "website"],
    answer: `Yes — ${brand.name} also answers chats. We deploy three chat agents: a Website Receptionist, an SMS/WhatsApp agent, and a Patient Recall agent that re-books lapsed patients. You can see live WhatsApp-style demos on the homepage.`,
  },
  {
    keywords: ["book", "appointment", "schedule", "calendar", "integrat"],
    answer: `${brand.agentName} books directly into your scheduling system and sends the patient a text confirmation. We support common dental PMS / calendar tools — ${contact.salesName} can confirm your specific setup on a quick call.`,
  },
  {
    keywords: ["demo", "try", "example", "hear", "listen"],
    answer: `There are live voice demos and WhatsApp-style chat demos on the homepage. Want a demo tailored to your clinic? Call or text ${contact.salesName} at ${contact.phoneDisplay}.`,
  },
  {
    keywords: ["team", "who", "founder", "aiden", "build"],
    answer: `${contact.salesName} handles sales, demos and onboarding (${contact.phoneDisplay}). The founder builds and trains every voice and chat agent end-to-end. See the Team page for more.`,
  },
  {
    keywords: ["contact", "talk", "reach", "human", "sales", "buy", "start"],
    answer: `The fastest way to get started is to talk to ${contact.salesName}: call ${contact.phoneDisplay}, or message on WhatsApp. He'll map your missed-call revenue and get ${brand.agentName} live in days.`,
  },
];

function answerFromKnowledge(question: string): string {
  const q = question.toLowerCase();
  let best: { score: number; answer: string } | null = null;
  for (const item of knowledge) {
    const score = item.keywords.reduce(
      (s, k) => (q.includes(k) ? s + 1 : s),
      0
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: item.answer };
    }
  }
  if (best) return best.answer;
  return `Great question! I'm ${brand.agentName}, the AI receptionist for ${brand.name}. I can tell you how we recover missed-call revenue, pricing, voice and chat demos, booking, and integrations. For anything specific to your clinic, the quickest path is ${contact.salesName} at ${contact.phoneDisplay}.`;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }
    const reply = answerFromKnowledge(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
