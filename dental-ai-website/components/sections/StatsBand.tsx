"use client";

import { PhoneMissed, DollarSign, TrendingDown, Clock } from "lucide-react";
import { motion } from "motion/react";
import { usd } from "@/lib/utils";
import { roiDefaults } from "@/lib/config";
import Reveal from "@/components/ui/Reveal";

/* ─── data ────────────────────────────────────────────────────────────────── */

const stats = [
  {
    icon: PhoneMissed,
    value: "5–15",
    label: "calls a dental clinic misses every month",
    sub: "on average — more on weekends & evenings",
    iconColor: "text-red-400",
    glowColor: "hover:shadow-[0_0_40px_-10px_rgba(248,113,113,0.35)]",
    gradientFrom: "from-red-500/10",
  },
  {
    icon: DollarSign,
    value: `${usd(roiDefaults.avgPatientValue)}+`,
    label: "lifetime value of each new patient lost",
    sub: "treatments, referrals & recurring visits",
    iconColor: "text-cyan",
    glowColor: "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.35)]",
    gradientFrom: "from-cyan/10",
  },
  {
    icon: TrendingDown,
    value: "30%+",
    label: "of inbound calls go unanswered",
    sub: "at the average dental practice",
    iconColor: "text-accent-2",
    glowColor: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.35)]",
    gradientFrom: "from-accent-2/10",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Reva answers — every call, every hour",
    sub: "nights, weekends, lunch breaks, holidays",
    iconColor: "text-accent",
    glowColor: "hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.35)]",
    gradientFrom: "from-accent/10",
  },
] as const;

/* ─── single card ─────────────────────────────────────────────────────────── */

function StatCard({
  icon: Icon,
  value,
  label,
  sub,
  iconColor,
  glowColor,
  gradientFrom,
  delay,
}: (typeof stats)[number] & { delay: number }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "group relative glass rounded-2xl p-6 h-full overflow-hidden",
          "transition-shadow duration-300",
          glowColor,
        ].join(" ")}
      >
        {/* gradient wash on hover */}
        <div
          className={[
            "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
            gradientFrom,
          ].join(" ")}
        />

        {/* icon */}
        <div
          className={[
            "relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl",
            "bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300",
          ].join(" ")}
        >
          <Icon className={["h-5 w-5", iconColor].join(" ")} strokeWidth={1.75} />
        </div>

        {/* big number */}
        <p className="relative font-display text-4xl md:text-5xl font-bold text-gradient leading-none mb-3">
          {value}
        </p>

        {/* label */}
        <p className="relative text-sm font-medium text-paper/90 leading-snug mb-1.5">
          {label}
        </p>

        {/* sub */}
        <p className="relative text-xs text-slate/60 leading-relaxed">{sub}</p>
      </motion.div>
    </Reveal>
  );
}

/* ─── band ────────────────────────────────────────────────────────────────── */

export default function StatsBand() {
  return (
    <div className="container-x py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.value} {...stat} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}
