import { Phone, MessageCircle, Clock, Zap, CalendarCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { contact, brand } from "@/lib/config";

/* ── Trust chips ──────────────────────────────────────────────── */
const trustChips = [
  { icon: <Clock size={11} strokeWidth={2.5} />, label: "24 / 7 coverage" },
  { icon: <Zap size={11} strokeWidth={2.5} />, label: "<60s response" },
  { icon: <CalendarCheck size={11} strokeWidth={2.5} />, label: "Books for you" },
];

/* ── Main ─────────────────────────────────────────────────────── */
export default function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        {/* Dark forest panel */}
        <div className="relative overflow-hidden rounded-[2rem] bg-forest grain">
          {/* Lime radial wash */}
          <div
            className="wash absolute inset-0 opacity-40"
            aria-hidden
          />

          {/* Faint dotted texture on top of wash */}
          <div
            className="dotted absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            aria-hidden
          />

          {/* Top hairline */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent"
            aria-hidden
          />
          {/* Bottom hairline */}
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            aria-hidden
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 md:py-28 gap-8">

            {/* Mono label */}
            <Reveal>
              <span className="font-mono text-[0.7rem] font-bold tracking-[0.22em] uppercase text-lime/80">
                READY?
              </span>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.07}>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-white max-w-3xl text-balance leading-[0.98]">
                Stop losing patients to voicemail.
              </h2>
            </Reveal>

            {/* Sub-line */}
            <Reveal delay={0.14}>
              <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                {brand.agentName} is live in days. Talk to {contact.salesName} now — he&apos;ll show
                you exactly how many calls and how much revenue you&apos;re losing today.
              </p>
            </Reveal>

            {/* Trust chips */}
            <Reveal delay={0.18}>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {trustChips.map((chip, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 font-mono text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-white/50"
                  >
                    <span className="text-lime">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* CTA buttons */}
            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button href={contact.telLink} size="lg" variant="lime" arrow>
                  <Phone size={18} />
                  Call {contact.salesName}&nbsp;·&nbsp;{contact.phoneDisplay}
                </Button>
                <Button
                  href={contact.whatsappLink}
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/40"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
              </div>
            </Reveal>

            {/* System status line */}
            <Reveal delay={0.3}>
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot inline-block"
                  aria-hidden
                />
                <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/35">
                  All systems operational
                </span>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
