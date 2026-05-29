import type { Metadata } from "next";
import { Clock, PhoneCall, CalendarCheck, Coffee } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import StatsBand from "@/components/sections/StatsBand";
import ROICalculator from "@/components/sections/ROICalculator";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import { contact } from "@/lib/config";

export const metadata: Metadata = {
  title: "Save Money & Time",
  description:
    "See how much revenue your dental clinic loses to missed calls — and how much time and money Reva gives back.",
};

const timeWins = [
  {
    icon: PhoneCall,
    title: "Every call answered",
    body: "No more voicemail. Reva picks up on the first ring, day or night, even when ten lines are ringing at once.",
  },
  {
    icon: CalendarCheck,
    title: "Appointments booked for you",
    body: "Reva checks the schedule, books, reschedules, and texts confirmations — your front desk never touches it.",
  },
  {
    icon: Coffee,
    title: "A calmer front desk",
    body: "Your team stops juggling the phone and focuses on the patients in the chair in front of them.",
  },
  {
    icon: Clock,
    title: "Hours back every week",
    body: "The average practice spends 15+ hours a week on the phone. Reva hands most of that time back.",
  },
];

export default function ROIPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden pt-36 pb-12">
        <div className="aurora pointer-events-none absolute inset-0 -z-10 opacity-60" />
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
        <div className="container-x max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Save Money &amp; Time
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              The math on missed calls is{" "}
              <span className="text-gradient">brutal</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              Every missed call is a patient who books somewhere else. Here&apos;s
              what that quietly costs a dental clinic each month — and how much
              Reva puts back in your pocket while handing your team their time
              back.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* The interactive calculator */}
      <Section
        eyebrow="ROI Calculator"
        center
        title={
          <>
            Find <span className="text-gradient">your</span> number
          </>
        }
        intro="Adjust the sliders to match your practice. This updates live."
      >
        <div className="mt-12">
          <ROICalculator />
        </div>
      </Section>

      {/* Time saved */}
      <Section
        eyebrow="Time Back"
        title={
          <>
            It&apos;s not just money — it&apos;s{" "}
            <span className="text-gradient">hours back</span> every week
          </>
        }
        intro="Reva quietly removes the single biggest interruption at the front desk: the phone."
      >
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {timeWins.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="glass h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan via-accent to-accent-2 text-white">
                  <w.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProblemSolution />
      <Pricing />

      {/* Mid CTA */}
      <Section center>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              Want your exact numbers?
            </h2>
            <p className="mt-4 text-slate">
              Aiden will pull your real missed-call data and show you the
              recovery in minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href={contact.telLink} size="lg">
                <PhoneCall className="h-5 w-5" />
                Talk to {contact.salesName} · {contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTA />
    </>
  );
}
