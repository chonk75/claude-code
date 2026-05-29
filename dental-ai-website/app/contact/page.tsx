import type { Metadata } from "next";
import {
  Phone,
  MessageSquare,
  MessageCircle,
  Mail,
  Zap,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import { contact } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
};

/* ── Contact option card ────────────────────────────────────── */
type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  action: string;
  href: string;
  highlight?: boolean;
  delay: number;
};

function ContactCard({
  icon,
  label,
  description,
  action,
  href,
  highlight = false,
  delay,
}: ContactCardProps) {
  return (
    <Reveal delay={delay}>
      <a
        href={href}
        className={`group flex items-start gap-5 glass rounded-2xl p-6 border transition-all duration-300 ${
          highlight
            ? "border-cyan/30 hover:border-cyan/60 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.4)]"
            : "border-white/10 hover:border-white/25"
        }`}
      >
        {/* Icon bubble */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
            highlight
              ? "bg-cyan/15 text-cyan group-hover:bg-cyan/25"
              : "bg-white/8 text-slate group-hover:text-paper group-hover:bg-white/12"
          }`}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-semibold text-paper text-sm">
              {label}
            </span>
            {highlight && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-cyan bg-cyan/10 rounded-full px-2 py-0.5 border border-cyan/20">
                <Zap size={9} />
                Fastest
              </span>
            )}
          </div>
          <p className="text-slate text-xs leading-relaxed mb-2">
            {description}
          </p>
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              highlight
                ? "text-cyan group-hover:text-white"
                : "text-paper/70 group-hover:text-paper"
            }`}
          >
            {action}
          </span>
        </div>

        {/* Chevron */}
        <svg
          className="flex-shrink-0 w-4 h-4 text-slate/40 group-hover:text-slate/80 transition-colors mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </Reveal>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function ContactPage() {
  const contactOptions: ContactCardProps[] = [
    {
      icon: <Phone size={20} />,
      label: "Call Aiden",
      description:
        "The fastest way to get answers, see a live demo, or start your onboarding. Aiden picks up.",
      action: contact.phoneDisplay,
      href: contact.telLink,
      highlight: true,
      delay: 0.08,
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Text Aiden",
      description:
        "Prefer to text? Send Aiden a message and he'll reply within the hour.",
      action: `Text ${contact.phoneDisplay}`,
      href: contact.smsLink,
      highlight: true,
      delay: 0.14,
    },
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      description:
        "Chat on WhatsApp — great for voice notes, quick questions, or international contacts.",
      action: "Open WhatsApp chat",
      href: contact.whatsappLink,
      delay: 0.2,
    },
    {
      icon: <Mail size={20} />,
      label: "Email us",
      description:
        "For longer inquiries, partnership discussions, or if you prefer email.",
      action: contact.email,
      href: `mailto:${contact.email}`,
      delay: 0.26,
    },
  ];

  return (
    <div className="min-h-screen bg-ink pt-32 pb-24 md:pb-32 relative overflow-hidden">
      {/* Background */}
      <div className="aurora absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="container-x relative z-10">
        {/* Page header */}
        <div className="max-w-2xl mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Get in touch
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-paper text-balance leading-[1.05] mb-6">
              Let&apos;s get{" "}
              <span className="text-gradient">Reva answering your calls.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-slate text-lg leading-relaxed">
              The fastest way to get started is a quick call or text with{" "}
              {contact.salesName}. He&apos;ll walk you through exactly how many calls
              you&apos;re missing and have Reva live within days — no long contracts,
              no technical lift.
            </p>
          </Reveal>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── LEFT — direct contact options ─────────────── */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="mb-2">
                <h2 className="font-display text-xl font-semibold text-paper mb-1">
                  Talk to {contact.salesName}
                </h2>
                <p className="text-slate text-sm leading-relaxed">
                  {contact.salesName} is {contact.salesRole.toLowerCase()} — call or text
                  him directly for the fastest response.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-3">
              {contactOptions.map((opt) => (
                <ContactCard key={opt.label} {...opt} />
              ))}
            </div>

            {/* Availability note */}
            <Reveal delay={0.32}>
              <div className="glass rounded-2xl p-5 border border-white/8 flex items-start gap-4">
                <span className="relative flex-shrink-0 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan block" />
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border border-cyan/50" />
                </span>
                <div>
                  <p className="text-paper text-sm font-medium mb-0.5">
                    Typical response time: under 1 hour
                  </p>
                  <p className="text-slate text-xs leading-relaxed">
                    {contact.salesName} is available Mon – Sat, 8 am – 8 pm PT.
                    For urgent inquiries, call directly — he picks up.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — contact form ───────────────────────── */}
          <Reveal delay={0.1} y={32}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
