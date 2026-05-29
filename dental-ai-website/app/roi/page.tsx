import type { Metadata } from "next";
import { Clock, PhoneCall, CalendarCheck, Coffee } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Squiggle from "@/components/ui/Squiggle";
import Pill from "@/components/ui/Pill";
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
  { icon: PhoneCall, label: "COVERAGE", title: "Every call answered", body: "No more voicemail. Reva picks up on the first ring, day or night, even when every line is ringing." },
  { icon: CalendarCheck, label: "BOOKING", title: "Appointments booked for you", body: "Reva checks the schedule, books, reschedules, and texts confirmations — your front desk never touches it." },
  { icon: Coffee, label: "FOCUS", title: "A calmer front desk", body: "Your team stops juggling the phone and focuses on the patient in the chair in front of them." },
  { icon: Clock, label: "TIME BACK", title: "Hours back every week", body: "The average practice spends 15+ hours a week on the phone. Reva hands most of that time back." },
];

export default function ROIPage() {
  return (
    <>
      {/* Intro */}
      <section className="dotted relative overflow-hidden pt-32 pb-8">
        <div className="wash pointer-events-none absolute inset-x-0 top-0 h-72" />
        <div className="container-x relative max-w-3xl">
          <Reveal>
            <span className="mono-label inline-flex items-center gap-2">
              <Squiggle className="h-3.5 w-7 text-sage" strokeWidth={6} />
              Save money &amp; time
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-ink md:text-7xl">
              What missed calls{" "}
              <span className="text-lime-ink">really cost</span> you.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
              Every missed call is a patient who books somewhere else. Here&apos;s
              what that quietly costs a dental clinic each month — and how much
              Reva puts back in your pocket while handing your team their time
              back.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill tone="mint" mono>5–15 calls missed / mo</Pill>
              <Pill tone="mint" mono>$1,200 per new patient</Pill>
              <Pill tone="outline" mono>updated live</Pill>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand />
      <ROICalculator />

      {/* Time saved */}
      <Section
        index="08"
        label="TIME BACK"
        title={
          <>
            It&apos;s not just money — it&apos;s{" "}
            <span className="text-lime-ink">hours back</span> every week.
          </>
        }
        intro="Reva quietly removes the single biggest interruption at the front desk: the phone."
      >
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {timeWins.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="card h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-lime">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <span className="mono-label">{w.label}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProblemSolution />
      <Pricing />

      {/* Mid CTA */}
      <Section index="09" label="NEXT STEP" center
        title={<>Want <span className="text-lime-ink">your</span> exact numbers?</>}
        intro="Aiden will pull your real missed-call data and show you the recovery in minutes.">
        <div className="mt-8 flex justify-center">
          <Button href={contact.telLink} size="lg" arrow>
            <PhoneCall className="h-5 w-5" />
            Talk to {contact.salesName} · {contact.phoneDisplay}
          </Button>
        </div>
      </Section>

      <CTA />
    </>
  );
}
