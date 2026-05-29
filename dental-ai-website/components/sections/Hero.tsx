"use client";

import { motion } from "motion/react";
import { Phone, Play, Zap, Clock, PhoneCall, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import HeroScene from "@/components/three/HeroScene";
import { brand, contact } from "@/lib/config";

/* ── Stat pill ─────────────────────────────────────────────── */
type StatItem = { icon: React.ReactNode; label: string; value: string };

function StatBadge({ icon, label, value }: StatItem) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-cyan">{icon}</span>
      <span className="font-semibold text-paper">{value}</span>
      <span className="text-slate">{label}</span>
    </span>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Hero() {
  const stats: StatItem[] = [
    {
      icon: <Clock size={13} />,
      value: "24 / 7",
      label: "answering",
    },
    {
      icon: <PhoneCall size={13} />,
      value: "<1s",
      label: "pickup",
    },
    {
      icon: <TrendingUp size={13} />,
      value: "5–15",
      label: "extra bookings / mo",
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-ink">
      {/* ── Aurora background blob ── */}
      <div
        className="aurora absolute inset-0 opacity-70"
        aria-hidden="true"
      />

      {/* ── Grid overlay ── */}
      <div
        className="bg-grid absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      {/* ── Bottom fade to page bg ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-24 lg:py-32">
          {/* ─── Left column ─────────────────────────────────── */}
          <div className="flex flex-col gap-8 lg:pr-8">
            {/* Eyebrow pill */}
            <Reveal delay={0}>
              <motion.div
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-medium text-paper/90 w-fit"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Zap size={14} className="text-cyan" />
                <span>AI Receptionist for Dental Clinics</span>
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-ring inline-block" />
              </motion.div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.08}>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.04] text-paper">
                The AI receptionist that{" "}
                <span className="block mt-1">
                  <span className="text-gradient">never misses a call.</span>
                </span>
              </h1>
            </Reveal>

            {/* Sub-headline */}
            <Reveal delay={0.16}>
              <p className="text-slate text-lg md:text-xl leading-relaxed max-w-xl">
                {brand.subtitle}
              </p>
            </Reveal>

            {/* CTA row */}
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-3 items-center">
                <Button href={contact.telLink} size="lg" variant="primary">
                  <Phone size={18} />
                  Talk to {contact.salesName}
                </Button>
                <Button href="#demos" size="lg" variant="outline">
                  <Play size={16} className="fill-current" />
                  Hear a live call
                </Button>
              </div>
            </Reveal>

            {/* Trust stats */}
            <Reveal delay={0.32}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {stats.map((s, i) => (
                  <span key={s.value} className="inline-flex items-center gap-2">
                    <StatBadge {...s} />
                    {i < stats.length - 1 && (
                      <span className="text-white/15 select-none" aria-hidden>·</span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ─── Right column — 3-D orb ──────────────────────── */}
          <Reveal delay={0.1} y={40} className="order-first lg:order-last">
            <div className="relative h-[360px] md:h-[480px] lg:h-[560px] w-full">
              {/* Subtle ring glow behind canvas */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <motion.div
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full border border-accent/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-52 h-52 md:w-72 md:h-72 rounded-full border border-cyan/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Floating label badge */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-4 lg:translate-x-0 z-20 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-accent shadow-[0_0_12px_2px_rgba(34,211,238,0.4)]">
                  <PhoneCall size={14} className="text-white" />
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border border-cyan/50" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs text-slate">Currently handling</p>
                  <p className="text-sm font-semibold text-paper">{brand.agentName} is live</p>
                </div>
              </motion.div>

              {/* Three.js canvas */}
              <HeroScene />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
