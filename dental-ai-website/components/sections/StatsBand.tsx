"use client";

import { PhoneMissed, DollarSign, TrendingDown, Clock, ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import { roiDefaults } from "@/lib/config";

/* ─── stat card data ──────────────────────────────────────────────────────── */

const stats = [
  {
    index: "01",
    monoLabel: "LEAD LOSS",
    icon: PhoneMissed,
    valueNode: (
      <span className="font-display text-5xl md:text-6xl font-bold text-ink leading-none tracking-tight">
        5–15
      </span>
    ),
    unit: "calls / mo",
    headline: "Missed calls per month",
    caption:
      "The average dental clinic misses 5–15 inbound calls monthly — more on weekends, lunch breaks, and after hours.",
    pill: { label: "HIGH RISK", tone: "amber" as const },
    borderAccent: "border-t-amber/60",
    mintBg: false,
  },
  {
    index: "02",
    monoLabel: "PATIENT VALUE",
    icon: DollarSign,
    valueNode: (
      <span className="font-display text-5xl md:text-6xl font-bold text-ink leading-none tracking-tight">
        <AnimatedNumber value={roiDefaults.avgPatientValue} prefix="$" />
        <span className="text-3xl text-muted">+</span>
      </span>
    ),
    unit: "lifetime value",
    headline: "Lost per unanswered call",
    caption:
      "Each missed new patient represents over $1,200 in lifetime treatments, referrals, and recurring hygiene visits.",
    pill: { label: "PER PATIENT", tone: "mint" as const },
    borderAccent: "border-t-lime/50",
    mintBg: true,
  },
  {
    index: "03",
    monoLabel: "CALL DROP RATE",
    icon: TrendingDown,
    valueNode: (
      <span className="font-display text-5xl md:text-6xl font-bold text-ink leading-none tracking-tight">
        <AnimatedNumber value={30} suffix="%" />
        <span className="text-3xl text-muted">+</span>
      </span>
    ),
    unit: "unanswered",
    headline: "Of inbound calls go unanswered",
    caption:
      "Industry data shows nearly 1 in 3 calls at the average dental practice never reaches a live person or callback.",
    pill: { label: "INDUSTRY AVG", tone: "gray" as const },
    borderAccent: "border-t-amber/40",
    mintBg: false,
  },
  {
    index: "04",
    monoLabel: "REVA UPTIME",
    icon: Clock,
    valueNode: (
      <span className="font-display text-5xl md:text-6xl font-bold text-lime-ink leading-none tracking-tight">
        24/7
      </span>
    ),
    unit: "coverage",
    headline: "Reva answers every call",
    caption:
      "Nights, weekends, lunch breaks, holidays — Reva picks up instantly and books the appointment in real time.",
    pill: { label: "ALWAYS ON", tone: "mint" as const },
    borderAccent: "border-t-lime/70",
    mintBg: true,
  },
] as const;

/* ─── single card ─────────────────────────────────────────────────────────── */

function StatCard({
  index,
  monoLabel,
  icon: Icon,
  valueNode,
  unit,
  headline,
  caption,
  pill,
  borderAccent,
  mintBg,
  delay,
}: (typeof stats)[number] & { delay: number }) {
  return (
    <Reveal delay={delay}>
      <div
        className={[
          "card group relative flex flex-col gap-0 overflow-hidden",
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
          mintBg ? "bg-mint" : "bg-surface",
        ].join(" ")}
      >
        {/* top accent stripe */}
        <div className={["h-[3px] w-full border-t-2", borderAccent].join(" ")} />

        {/* dotted interior bg */}
        <div className="dotted-tight absolute inset-0 opacity-40 pointer-events-none rounded-3xl" />

        <div className="relative flex flex-col gap-4 p-6">
          {/* header row: mono index + label + icon */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="mono-label text-sage">[{index}]</span>
              <span className="mono-label text-ink/70">{monoLabel}</span>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface border border-line shadow-sm">
              <Icon size={16} className="text-muted" strokeWidth={1.75} />
            </span>
          </div>

          {/* hairline divider */}
          <div className="border-t border-dashed border-line" />

          {/* big number */}
          <div className="flex items-end gap-2.5">
            {valueNode}
          </div>

          {/* unit tag */}
          <div className="flex items-center gap-1.5 -mt-2">
            <ArrowRight size={11} className="text-sage" />
            <span className="mono-label !text-[0.65rem] text-sage">{unit}</span>
          </div>

          {/* headline */}
          <p className="font-display text-base font-semibold text-ink leading-snug">
            {headline}
          </p>

          {/* caption */}
          <p className="text-sm text-muted leading-relaxed">
            {caption}
          </p>

          {/* footer: pill */}
          <div className="pt-2 border-t border-line-soft flex items-center justify-between">
            <Pill tone={pill.tone} mono>{pill.label}</Pill>
            <span className="mono-label text-sage/60">REVA AI</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── section ─────────────────────────────────────────────────────────────── */

export default function StatsBand() {
  return (
    <Section
      index="01"
      label="THE PROBLEM, IN NUMBERS"
      title={
        <>
          The math on missed calls is{" "}
          <span className="text-lime-ink">brutal.</span>
        </>
      }
      intro="Every unanswered phone is a patient choosing your competitor. The numbers are hiding in plain sight — and they compound."
      id="stats"
    >
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.index} {...stat} delay={i * 0.08} />
        ))}
      </div>

      {/* bottom footnote row */}
      <Reveal delay={0.35}>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-dashed border-line pt-5">
          <span className="mono-label text-sage">SOURCE — DENTAL INDUSTRY BENCHMARKS 2024</span>
          <div className="ml-auto flex gap-2">
            <Pill tone="gray" mono>avg practice</Pill>
            <Pill tone="outline" mono>per location</Pill>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
