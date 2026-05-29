"use client";

import { motion } from "motion/react";
import { Phone, Play, Check, Clock, CalendarCheck } from "lucide-react";
import { brand, contact } from "@/lib/config";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import Waveform from "@/components/ui/Waveform";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Squiggle from "@/components/ui/Squiggle";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const leads = [
  { dot: "bg-lime", status: "BOOKED", tone: "mint" as const, name: "Sarah M.", note: "Cleaning · Fri 9:00 AM", chip: "+$340" },
  { dot: "bg-lime", status: "QUALIFIED", tone: "mint" as const, name: "David R.", note: "Asked about Invisalign", chip: "Score 91" },
  { dot: "bg-sage", status: "RECOVERED", tone: "gray" as const, name: "After-hours call", note: "Reva booked at 9:14 PM", chip: "+$1,200" },
];

export default function Hero() {
  return (
    <section className="dotted relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="wash pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — copy */}
          <div>
            <motion.div variants={fade} initial="hidden" animate="show" custom={0}>
              <span className="mono-label inline-flex items-center gap-2">
                <Squiggle className="h-3.5 w-7 text-sage" strokeWidth={6} />
                AI receptionist for dental clinics
              </span>
            </motion.div>

            <motion.h1
              variants={fade}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-ink md:text-7xl"
            >
              Every call answered.
              <br />
              Every patient{" "}
              <span className="relative whitespace-nowrap">
                booked.
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-lime"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8c40-6 158-6 196 0"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
            >
              {brand.subtitle}
            </motion.p>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href={contact.telLink} size="lg" arrow>
                <Phone className="h-4 w-4" />
                Talk to {contact.salesName}
              </Button>
              <Button href="#demos" size="lg" variant="link">
                <Play className="h-4 w-4" /> Hear a live call
              </Button>
            </motion.div>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
            >
              {[
                { icon: Clock, t: "Answers in under 60 seconds" },
                { icon: CalendarCheck, t: "Books directly into your calendar" },
                { icon: Check, t: "24/7 — nights, weekends, lunch" },
              ].map(({ icon: Icon, t }) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-lime-ink" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — live product card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* floating accent — mono chip */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-10 z-20 hidden sm:block"
            >
              <Pill tone="solid" mono check>
                next_step = book
              </Pill>
            </motion.div>

            {/* floating accent — serif quote */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 bottom-16 z-20 hidden max-w-[12rem] rounded-2xl border border-line bg-surface px-4 py-3 shadow-lg sm:block"
            >
              <p className="font-serif text-lg italic leading-snug text-ink">
                “Can I come in this Friday?”
              </p>
              <span className="mono-label mt-1 block !text-[0.6rem]">patient · 9:14 pm</span>
            </motion.div>

            <div className="card relative overflow-hidden p-5 shadow-[0_30px_80px_-30px_rgba(15,44,26,0.4)]">
              {/* header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
                  Live · updated just now
                </span>
                <span className="mono-label">today</span>
              </div>

              {/* stat tiles */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-bg-soft">
                {[
                  { label: "Calls today", el: <AnimatedNumber value={1284} />, delta: "+12%" },
                  { label: "Booked", el: <AnimatedNumber value={72} suffix="%" />, delta: "+4 pts" },
                  { label: "Recovered", el: <AnimatedNumber value={4.2} decimals={1} prefix="$" suffix="K" />, delta: "+$1.8K" },
                ].map((s) => (
                  <div key={s.label} className="px-3 py-3">
                    <p className="text-[0.7rem] text-muted">{s.label}</p>
                    <p className="mt-1 font-display text-xl font-bold text-ink">{s.el}</p>
                    <Pill tone="mint" className="mt-1.5 !px-1.5 !py-0.5 !text-[0.65rem]">
                      {s.delta}
                    </Pill>
                  </div>
                ))}
              </div>

              {/* lead list */}
              <div className="mt-3 space-y-2">
                {leads.map((l, i) => (
                  <motion.div
                    key={l.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.18, duration: 0.5 }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${l.dot}`} />
                    <Pill tone={l.tone} mono className="!py-0.5">
                      {l.status}
                    </Pill>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{l.name}</p>
                      <p className="truncate text-xs text-muted">{l.note}</p>
                    </div>
                    <span className="font-mono text-xs font-medium text-lime-ink">{l.chip}</span>
                  </motion.div>
                ))}
              </div>

              {/* on-call strip */}
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-mint px-3 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-lime">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-ink">{brand.agentName} is on a call</p>
                  <p className="text-[0.7rem] text-muted">New patient · booking a cleaning</p>
                </div>
                <Waveform bars={18} className="h-7" barClassName="bg-forest/60" />
                <span className="font-mono text-xs text-muted">00:42</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
