import { Phone, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { contact, brand } from "@/lib/config";

/* ── Main ─────────────────────────────────────────────────────── */
export default function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          {/* Aurora glow layer */}
          <div className="aurora absolute inset-0 opacity-80" aria-hidden />

          {/* Grid overlay */}
          <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />

          {/* Radial vignette edges */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,15,0.85)_100%)]"
            aria-hidden
          />

          {/* Top & bottom edge glows */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 md:py-28 gap-8">
            {/* Eyebrow */}
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/6 border border-white/10 px-4 py-1.5 text-xs font-medium text-cyan tracking-wide uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-ring inline-block" />
                Ready when you are
              </span>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.07}>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-paper max-w-4xl text-balance leading-[1.06]">
                Stop losing patients{" "}
                <span className="text-gradient">to voicemail.</span>
              </h2>
            </Reveal>

            {/* Sub-line */}
            <Reveal delay={0.14}>
              <p className="text-slate text-lg md:text-xl max-w-xl leading-relaxed">
                {brand.agentName} is live in days. Talk to {contact.salesName} now — he&apos;ll show
                you exactly how many calls and how much revenue you&apos;re losing today.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal delay={0.21}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button href={contact.telLink} size="lg" variant="primary">
                  <Phone size={18} />
                  Call {contact.salesName}&nbsp;·&nbsp;{contact.phoneDisplay}
                </Button>
                <Button href={contact.whatsappLink} size="lg" variant="outline">
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
              </div>
            </Reveal>

            {/* Micro reassurance */}
            <Reveal delay={0.28}>
              <p className="text-slate/50 text-xs">
                No commitment · Month-to-month · Live in days
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
