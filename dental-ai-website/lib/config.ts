/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH  —  edit everything about your brand here.
 *  Change the brand name, phone number, links, copy numbers, etc. in ONE place
 *  and it updates across the whole website.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  /** Your agency / product name. Shows in the navbar, footer, page titles. */
  name: "Reva AI",
  /** Short product descriptor used in the logo lockup. */
  product: "AI Receptionist",
  /** The persona name of the AI voice/chat agent demoed on the site. */
  agentName: "Reva",
  /** One-line value proposition. */
  tagline: "The AI receptionist that never misses a call.",
  /** Longer supporting sentence used under hero headlines. */
  subtitle:
    "Reva answers every call and message for your dental clinic 24/7 — books appointments, answers questions, and recovers the patients you're losing to voicemail.",
  domain: "reva.ai", // display only — change to your real domain
};

/**
 * CONTACT — only Aiden's number is ever shown publicly.
 * The founder's personal number is intentionally NOT included anywhere.
 */
export const contact = {
  /** Aiden handles all sales / inbound. This is the ONLY number shown. */
  salesName: "Aiden",
  salesRole: "Head of Sales",
  /** Pretty version shown to humans. */
  phoneDisplay: "+1 (949) 397-8560",
  /** E.164 digits only — used to build the click-to-call / SMS / WhatsApp links. */
  phoneE164: "+19493978560",
  /** Click-to-call link (works on mobile + desktop dialers). */
  get telLink() {
    return `tel:${this.phoneE164}`;
  },
  /** Click-to-text (SMS) link. */
  get smsLink() {
    return `sms:${this.phoneE164}`;
  },
  /** Click-to-WhatsApp link. */
  get whatsappLink() {
    return `https://wa.me/${this.phoneE164.replace("+", "")}`;
  },
  /** General booking / contact email (change to your real one). */
  email: "hello@reva.ai",
};

/** Team — founder's personal phone is deliberately omitted. */
export const team = [
  {
    name: "Aiden",
    role: "Head of Sales & Partnerships",
    bio: "Aiden helps dental clinics map out exactly how many calls — and how much revenue — they're losing today, then gets Reva live in days. He's your single point of contact for demos, pricing, and onboarding.",
    // Aiden is the public contact — call / text buttons point to his number.
    showContact: true,
    initials: "AI",
    accent: "cyan" as const,
  },
  {
    name: "Yona", // ← change to your name
    role: "Founder & AI Engineer",
    bio: "Builds and trains every voice and chat agent end-to-end — the conversation design, the dental knowledge base, the booking integrations, and the infrastructure that keeps Reva reliable on every call.",
    // Founder's number is private and never displayed.
    showContact: false,
    initials: "YO",
    accent: "violet" as const,
  },
];

/**
 * NAVIGATION — the tabs requested:
 * Landing, About, Save Money & Time (ROI), Contact, Team
 */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Save Money & Time", href: "/roi" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/**
 * ROI ASSUMPTIONS — tune these to your real market data.
 * Used by the interactive ROI calculator + the stats sections.
 */
export const roiDefaults = {
  missedCallsPerMonthLow: 5,
  missedCallsPerMonthHigh: 15,
  /** Average lifetime value of a new dental patient. */
  avgPatientValue: 1200,
  /** Share of missed callers who are new patients that would have booked. */
  newPatientConversion: 0.35,
  /** Typical front-desk receptionist fully-loaded monthly cost. */
  receptionistMonthlyCost: 3200,
  /** Reva monthly price (display only — change to your real pricing). */
  revaMonthlyPrice: 499,

  /* ── Interactive ROI dashboard defaults (the live graph) ── */
  /** Missed calls per month (draggable). */
  missedCallsDefault: 15,
  /** Average value of a booked appointment ($, typeable). */
  avgAppointmentValue: 250,
  /** Average length of a phone call in minutes (draggable). */
  minutesPerCall: 3,
  /** Share of missed calls Reva recovers (0–1). */
  revaRecoveryRate: 0.92,
};


/**
 * DEMO SLOTS — drop your real ElevenLabs ("11") call recordings here later.
 * Leave `audioSrc` empty to show a styled "Demo coming soon" placeholder.
 * When you have the file, put it in /public/demos/ and set audioSrc.
 */
export const voiceDemos = [
  {
    id: "new-patient",
    title: "New patient — booking a cleaning",
    clinic: "Bright Smile Dental",
    description:
      "A first-time caller asks about availability. Reva checks the schedule, books the appointment, and texts a confirmation.",
    duration: "1:24",
    audioSrc: "", // e.g. "/demos/new-patient.mp3"
    accent: "cyan" as const,
  },
  {
    id: "after-hours",
    title: "After-hours emergency",
    clinic: "Lakeside Family Dentistry",
    description:
      "It's 9pm. A patient calls with tooth pain. Reva triages, offers the next emergency slot, and flags it for the morning.",
    duration: "1:58",
    audioSrc: "",
    accent: "violet" as const,
  },
  {
    id: "insurance",
    title: "Insurance & pricing question",
    clinic: "Downtown Dental Co.",
    description:
      "A caller asks whether their insurance is accepted and what a crown costs. Reva answers accurately and books a consult.",
    duration: "2:11",
    audioSrc: "",
    accent: "blue" as const,
  },
];

/** External design / brand inspiration (for your reference, not shown). */
export const inspiration = [
  "https://cuberto.com/",
  "https://landio.framer.website/",
  "https://www.arini.ai/",
];
