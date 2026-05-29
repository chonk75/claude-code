import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { brand, contact } from "@/lib/config";
import Squiggle from "@/components/ui/Squiggle";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Voice Agents", href: "/#demos" },
      { label: "Chat Agents", href: "/#chat" },
      { label: "Patient Recall", href: "/#agents" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Save Money & Time", href: "/roi" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: `Talk to ${contact.salesName}`,
    links: [
      { label: `Call ${contact.phoneDisplay}`, href: contact.telLink },
      { label: "Text us", href: contact.smsLink },
      { label: "WhatsApp", href: contact.whatsappLink },
      { label: contact.email, href: `mailto:${contact.email}` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="grain relative mt-24 overflow-hidden bg-forest text-white/80">
      {/* lime wash at the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 120%, rgba(124,223,19,0.28), transparent 70%)",
        }}
      />
      <div className="container-x relative z-10 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Squiggle className="h-6 w-12 text-lime" strokeWidth={6} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {brand.subtitle}
            </p>
            <a
              href={contact.telLink}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-lime hover:underline"
            >
              <Phone className="h-4 w-4" /> {contact.phoneDisplay}
            </a>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-base font-bold text-lime">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const ext = /^(https?:|tel:|sms:|mailto:)/.test(l.href);
                  const cls =
                    "text-sm text-white/70 transition-colors hover:text-white";
                  return (
                    <li key={l.label}>
                      {ext ? (
                        <a href={l.href} className={cls}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={cls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-2 sm:flex-row sm:items-center">
          <input
            type="email"
            placeholder="Enter your email…"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <a
            href={contact.telLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 text-sm font-semibold text-forest-deep transition hover:brightness-105"
          >
            Request a demo <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
              All systems operational
            </span>
            <a href={contact.whatsappLink} className="inline-flex items-center gap-1.5 hover:text-white">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} {brand.name}. Never miss another call.
          </p>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="pointer-events-none select-none px-4 text-center">
        <span className="font-display text-[22vw] font-bold leading-none tracking-[-0.04em] text-white/[0.04]">
          {brand.name.replace(" AI", "")}
        </span>
      </div>
    </footer>
  );
}
