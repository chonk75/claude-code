import type { Metadata } from "next";
import {
  Clock,
  Brain,
  CalendarCheck,
  BadgeDollarSign,
  Phone,
  BookOpen,
  Mic,
  TrendingUp,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { brand, contact } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
};

/* ── "How it works" step card ───────────────────────────────── */
function StepCard({
  number,
  title,
  body,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="glass rounded-3xl p-8 flex flex-col gap-5 h-full border border-white/10 hover:border-white/20 transition-colors duration-300">
        {/* Gradient step number */}
        <span className="font-display text-6xl font-semibold leading-none text-gradient select-none">
          {number}
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-paper mb-2">
            {title}
          </h3>
          <p className="text-slate leading-relaxed">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ── "Why Reva" value row ───────────────────────────────────── */
function ValueRow({
  icon,
  title,
  body,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-5 items-start">
        <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center text-cyan">
          {icon}
        </div>
        <div>
          <h4 className="font-display font-semibold text-paper mb-1">{title}</h4>
          <p className="text-slate leading-relaxed text-sm">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function AboutPage() {
  const steps = [
    {
      number: "01",
      title: "We learn your clinic",
      body: "We map your services, schedule, insurance policies, and FAQs into Reva's knowledge base. The setup takes days — not months — and we handle everything.",
    },
    {
      number: "02",
      title: "Reva answers every call & message",
      body: `${brand.agentName} picks up in under a second, 24 / 7. She answers questions, handles after-hours callers, and routes urgent cases — all in a calm, professional voice that sounds like your best receptionist.`,
    },
    {
      number: "03",
      title: "You watch bookings roll in",
      body: "Reva drops confirmed appointments straight into your scheduling software. You log in to a fuller calendar — no voicemail inbox to chase, no revenue walking out the door.",
    },
  ];

  const values = [
    {
      icon: <Clock size={20} />,
      title: "Always on — even at 2 am",
      body: "Patients don't call on a schedule. Reva answers every ring, every text, and every chat — nights, weekends, and holidays included.",
    },
    {
      icon: <Mic size={20} />,
      title: "Sounds genuinely human",
      body: "Not a robotic IVR menu. Reva holds natural, flowing conversations so patients feel heard and never frustrated.",
    },
    {
      icon: <CalendarCheck size={20} />,
      title: "Books directly into your software",
      body: "No middlemen. Appointments land in your practice management system in real time — confirmed, with reminders sent automatically.",
    },
    {
      icon: <BadgeDollarSign size={20} />,
      title: "A fraction of the cost",
      body: "A full-time receptionist costs $3,000+ per month. Reva handles the same call volume for a flat monthly rate — and never calls in sick.",
    },
  ];

  return (
    <>
      {/* ── Hero intro ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-24 md:pb-32">
        {/* Background aurora */}
        <div className="aurora absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />

        <div className="container-x relative z-10 max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              About {brand.name}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-paper text-balance mb-8">
              Every missed call is{" "}
              <span className="text-gradient">money walking out the door.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-slate text-lg md:text-xl leading-relaxed max-w-2xl">
              The average dental clinic misses 5 – 15 calls per month. At $1,200+
              in lifetime patient value, that's up to{" "}
              <span className="text-paper font-semibold">$18,000 in lost revenue</span>{" "}
              every single month — vanishing to voicemail while your team is busy
              chairside. {brand.name} was built to fix that, permanently.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 text-slate text-lg leading-relaxed max-w-2xl">
              {brand.agentName} is an AI receptionist trained specifically for
              dental clinics. She answers every call and message instantly, books
              appointments directly into your scheduling software, and handles
              after-hours inquiries — so you capture every patient, not just the
              ones who happen to call between 9 and 5.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <Section
        id="how-it-works"
        eyebrow="How It Works"
        title={
          <>
            Live in days.{" "}
            <span className="text-gradient">Running for years.</span>
          </>
        }
        intro="Three steps stand between you and a fully-staffed AI front desk."
      >
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} {...step} delay={i * 0.08} />
          ))}
        </div>
      </Section>

      {/* ── Values / Why Reva ───────────────────────────────── */}
      <Section
        id="why-reva"
        eyebrow="Why Reva AI"
        title={
          <>
            Built for the realities of{" "}
            <span className="text-gradient">running a dental clinic.</span>
          </>
        }
        intro="Patients want fast, friendly answers. You want a full schedule. Reva delivers both — without the hiring headaches."
        className="bg-ink-2"
      >
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
          {values.map((v, i) => (
            <ValueRow key={v.title} {...v} delay={i * 0.07} />
          ))}
        </div>

        {/* Decorative stat callout */}
        <Reveal delay={0.3}>
          <div className="mt-16 glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center border border-white/10 max-w-4xl glow">
            <div className="flex-shrink-0">
              <TrendingUp size={36} className="text-cyan" />
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-semibold text-paper leading-snug">
                Clinics using {brand.agentName} recover an average of{" "}
                <span className="text-gradient">8 – 12 new bookings</span> per
                month they were previously losing.
              </p>
              <p className="mt-2 text-slate text-sm">
                Based on typical missed-call rates and new-patient conversion for
                dental practices.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Mission / CTA ───────────────────────────────────── */}
      <Section
        id="mission"
        eyebrow="Our Mission"
        title={
          <>
            Dental clinics deserve a{" "}
            <span className="text-gradient">front desk that never sleeps.</span>
          </>
        }
        center
        className="pb-32"
      >
        <Reveal delay={0.1}>
          <p className="mt-6 text-slate text-lg leading-relaxed max-w-2xl mx-auto text-center">
            We started {brand.name} because great dental care was being lost to
            bad phone coverage. Our mission is simple: make sure every patient who
            reaches out — at any hour — gets a warm, helpful response and a
            confirmed appointment. No more voicemail. No more revenue leaks.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button href={contact.telLink} size="lg">
              <Phone size={18} />
              Talk to {contact.salesName}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              <BookOpen size={16} />
              See how we work
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-5 text-slate text-sm text-center">
            Call or text {contact.salesName} directly at{" "}
            <a
              href={contact.telLink}
              className="text-cyan hover:underline font-medium"
            >
              {contact.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
