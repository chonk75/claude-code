import type { Metadata } from "next";
import {
  Clock,
  CalendarCheck,
  BadgeDollarSign,
  Mic,
  TrendingUp,
  Phone,
  ChevronRight,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
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
  tag,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
  tag: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className="card p-8 flex flex-col gap-5 h-full hover:-translate-y-1 transition-transform duration-300">
        {/* Mono step number */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-5xl font-bold leading-none text-lime select-none tracking-tight">
            {number}
          </span>
          <Pill tone="mint" mono>{tag}</Pill>
        </div>
        <div className="border-t border-line pt-5">
          <h3 className="font-display text-xl font-bold text-ink mb-3 leading-snug">
            {title}
          </h3>
          <p className="text-muted leading-relaxed text-sm">{body}</p>
        </div>
        <div className="mt-auto flex items-center gap-1.5 text-lime-ink">
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="font-mono text-[0.68rem] uppercase tracking-widest">
            Step {number}
          </span>
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
  stat,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
  stat?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-5 items-start group">
        <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-mint border border-lime/20 flex items-center justify-center text-lime-ink group-hover:bg-mint-2 transition-colors duration-200">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-display font-bold text-ink text-base">{title}</h4>
            {stat && (
              <Pill tone="mint" mono>{stat}</Pill>
            )}
          </div>
          <p className="text-muted leading-relaxed text-sm">{body}</p>
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
      tag: "Setup",
      title: "We learn your clinic",
      body: "We map your services, schedule, insurance policies, and FAQs into Reva's knowledge base. The setup takes days — not months — and we handle everything from start to finish.",
    },
    {
      number: "02",
      tag: "Live",
      title: "Reva answers every call & message",
      body: `${brand.agentName} picks up in under a second, 24 / 7. She answers questions, handles after-hours callers, and routes urgent cases — all in a calm, professional voice that sounds like your best receptionist.`,
    },
    {
      number: "03",
      tag: "Growth",
      title: "Booked appointments roll in",
      body: "Reva drops confirmed appointments straight into your scheduling software. You log in to a fuller calendar — no voicemail inbox to chase, no revenue walking out the door.",
    },
  ];

  const values = [
    {
      icon: <Clock size={20} />,
      title: "Always on — even at 2 am",
      body: "Patients don't call on a schedule. Reva answers every ring, every text, and every chat — nights, weekends, and holidays included.",
      stat: "24 / 7",
    },
    {
      icon: <Mic size={20} />,
      title: "Sounds genuinely human",
      body: "Not a robotic IVR menu. Reva holds natural, flowing conversations so patients feel heard and never frustrated.",
      stat: "Natural AI",
    },
    {
      icon: <CalendarCheck size={20} />,
      title: "Books directly into your software",
      body: "No middlemen. Appointments land in your practice management system in real time — confirmed, with reminders sent automatically.",
      stat: "Real-time",
    },
    {
      icon: <BadgeDollarSign size={20} />,
      title: "A fraction of the cost",
      body: "A full-time receptionist costs $3,000+ per month. Reva handles the same call volume for a flat monthly rate — and never calls in sick.",
      stat: "vs. $3,200 / mo",
    },
  ];

  return (
    <>
      {/* ── Hero intro ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bg dotted pt-32 pb-24 md:pb-32">
        {/* Soft radial wash */}
        <div className="wash absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="container-x relative z-10">
          {/* Top mono label */}
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="mono-label">About {brand.name}</span>
              <span className="h-px flex-1 border-t border-dashed border-line max-w-[80px]" />
              <Pill tone="mint" mono>Our Mission</Pill>
            </div>
          </Reveal>

          <div className="max-w-3xl">
            <Reveal delay={0.06}>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold tracking-[-0.02em] leading-[0.98] text-ink text-balance mb-8">
                Every missed call is{" "}
                <span className="text-lime-ink italic font-serif">
                  money walking out the door.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-6">
                The average dental clinic misses 5 – 15 calls per month. At{" "}
                <strong className="text-ink font-semibold">$1,200+</strong> in
                lifetime patient value, that&apos;s up to{" "}
                <strong className="text-ink font-semibold">
                  $18,000 in lost revenue
                </strong>{" "}
                every single month — vanishing to voicemail while your team is
                busy chairside. {brand.name} was built to fix that, permanently.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                {brand.agentName} is an AI receptionist trained specifically for
                dental clinics. She answers every call and message instantly,
                books appointments directly into your scheduling software, and
                handles after-hours inquiries — so you capture every patient, not
                just the ones who happen to call between 9 and 5.
              </p>
            </Reveal>

            {/* Quick-stat strip */}
            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-3">
                <Pill tone="mint" mono check>5 – 15 missed calls / mo</Pill>
                <Pill tone="amber" mono>Up to $18k lost / mo</Pill>
                <Pill tone="solid" mono>Reva fixes this</Pill>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <Section
        id="how-it-works"
        index="01"
        label="HOW IT WORKS"
        title={
          <>
            Live in days.{" "}
            <span className="text-lime-ink">Running for years.</span>
          </>
        }
        intro="Three steps stand between you and a fully-staffed AI front desk. We handle the entire setup — you just watch the bookings arrive."
      >
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} {...step} delay={i * 0.08} />
          ))}
        </div>

        {/* Connector caption */}
        <Reveal delay={0.3}>
          <p className="mt-8 text-center">
            <span className="mono-label">
              Typical onboarding: 3 – 5 business days &mdash; then Reva is live
            </span>
          </p>
        </Reveal>
      </Section>

      {/* ── Values / Why Reva ───────────────────────────────── */}
      <Section
        id="why-reva"
        index="02"
        label="WHY REVA"
        title={
          <>
            Built for the realities of{" "}
            <span className="text-lime-ink">running a dental clinic.</span>
          </>
        }
        intro="Patients want fast, friendly answers. You want a full schedule. Reva delivers both — without the hiring headaches."
        className="bg-bg-soft"
      >
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
          {values.map((v, i) => (
            <ValueRow key={v.title} {...v} delay={i * 0.07} />
          ))}
        </div>

        {/* Stat callout card */}
        <Reveal delay={0.3}>
          <div className="mt-16 card p-8 md:p-10 max-w-4xl">
            <div className="flex items-start gap-3 mb-6">
              <TrendingUp size={20} className="text-lime-ink flex-shrink-0 mt-0.5" />
              <span className="mono-label text-lime-ink">Recovery metrics</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl font-bold text-ink">
                  <AnimatedNumber value={8} suffix=" – 12" />
                </span>
                <span className="mono-label">new bookings / mo recovered</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl font-bold text-ink">
                  <AnimatedNumber value={1200} prefix="$" />
                </span>
                <span className="mono-label">avg patient lifetime value</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl font-bold text-ink">
                  <AnimatedNumber value={24} suffix=" / 7" />
                </span>
                <span className="mono-label">availability, every day</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl font-bold text-ink">
                  &lt; <AnimatedNumber value={1} suffix="s" />
                </span>
                <span className="mono-label">pickup time on every call</span>
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <p className="font-serif italic text-lg text-muted leading-relaxed max-w-2xl">
                &ldquo;Clinics using {brand.agentName} recover an average of{" "}
                <span className="text-ink font-semibold not-italic">
                  8 – 12 new bookings
                </span>{" "}
                per month they were previously losing to voicemail.&rdquo;
              </p>
              <p className="mt-2 mono-label">
                Based on typical missed-call rates &amp; new-patient conversion
                for dental practices.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Mission / CTA ───────────────────────────────────── */}
      <Section
        id="mission"
        index="03"
        label="OUR MISSION"
        title={
          <>
            Dental clinics deserve a{" "}
            <span className="text-lime-ink">front desk that never sleeps.</span>
          </>
        }
        center
        className="pb-32"
      >
        <Reveal delay={0.1}>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-2xl mx-auto text-center">
            We started {brand.name} because great dental care was being lost to
            bad phone coverage. Our mission is simple: make sure every patient
            who reaches out — at any hour — gets a warm, helpful response and a
            confirmed appointment. No more voicemail. No more revenue leaks.
          </p>
        </Reveal>

        {/* Serif pull-quote */}
        <Reveal delay={0.15}>
          <div className="mt-10 max-w-xl mx-auto border-l-2 border-lime pl-5 text-left">
            <p className="font-serif italic text-lg text-ink leading-relaxed">
              &ldquo;Every patient who reaches out deserves a real answer —
              not a voicemail.&rdquo;
            </p>
            <p className="mt-2 mono-label">— {brand.name} founding principle</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button href={contact.telLink} size="lg" arrow>
              <Phone size={18} />
              Talk to {contact.salesName}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              See how we work
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-5 mono-label text-center">
            Call or text {contact.salesName} directly &mdash;{" "}
            <a
              href={contact.telLink}
              className="text-lime-ink hover:underline underline-offset-4 not-italic normal-case font-sans text-sm font-medium"
            >
              {contact.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
