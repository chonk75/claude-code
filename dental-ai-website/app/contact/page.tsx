import type { Metadata } from "next";
import {
  Phone,
  MessageSquare,
  MessageCircle,
  Mail,
  ChevronRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/sections/ContactForm";
import { contact, brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
};

/* ── Contact option card ────────────────────────────────────── */
type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  detail: string;
  href: string;
  tag?: string;
  delay: number;
};

function ContactCard({
  icon,
  label,
  description,
  detail,
  href,
  tag,
  delay,
}: ContactCardProps) {
  return (
    <Reveal delay={delay}>
      <a
        href={href}
        className="group card flex items-start gap-5 p-6 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md block"
      >
        {/* Icon tile */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-white shadow-sm group-hover:bg-forest-deep transition-colors duration-200">
          {icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-display font-bold text-ink text-base">
              {label}
            </span>
            {tag && (
              <Pill tone="mint" mono>{tag}</Pill>
            )}
          </div>
          <p className="text-muted text-xs leading-relaxed mb-2">
            {description}
          </p>
          <span className="font-mono text-[0.72rem] uppercase tracking-widest text-lime-ink">
            {detail}
          </span>
        </div>

        {/* Arrow */}
        <ChevronRight className="flex-shrink-0 w-4 h-4 text-sage group-hover:text-ink group-hover:translate-x-0.5 transition-all mt-0.5" />
      </a>
    </Reveal>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function ContactPage() {
  const contactOptions: ContactCardProps[] = [
    {
      icon: <Phone size={20} />,
      label: `Call ${contact.salesName}`,
      description:
        "The fastest way to get answers, see a live demo, or kick off your onboarding. Aiden picks up every time — no assistant, no queue.",
      detail: contact.phoneDisplay,
      href: contact.telLink,
      tag: "FASTEST",
      delay: 0.08,
    },
    {
      icon: <MessageSquare size={20} />,
      label: `Text ${contact.salesName}`,
      description:
        "Prefer async? Send Aiden a message and he'll reply within the hour. Great for sharing details or asking quick questions.",
      detail: `Text ${contact.phoneDisplay}`,
      href: contact.smsLink,
      tag: "< 1 HR REPLY",
      delay: 0.14,
    },
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      description:
        "Chat on WhatsApp — perfect for voice notes, screenshots, or international contacts who prefer it.",
      detail: "Open WhatsApp chat",
      href: contact.whatsappLink,
      delay: 0.2,
    },
    {
      icon: <Mail size={20} />,
      label: "Email us",
      description:
        "For longer inquiries, partnership discussions, or if you just prefer email. We respond within one business day.",
      detail: contact.email,
      href: `mailto:${contact.email}`,
      delay: 0.26,
    },
  ];

  return (
    <div className="min-h-screen bg-bg dotted pt-32 pb-24 md:pb-32 relative overflow-hidden">
      {/* Soft radial wash */}
      <div className="wash absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="container-x relative z-10">
        {/* Page header */}
        <div className="max-w-2xl mb-16">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="mono-label">
                Talk to {contact.salesName}
              </span>
              <span className="h-px flex-1 border-t border-dashed border-line max-w-[80px]" />
              <Pill tone="mint" mono check>Response &lt; 1 hr</Pill>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-[-0.02em] text-ink text-balance leading-[0.98] mb-6">
              Let&apos;s get{" "}
              <span className="text-lime-ink italic font-serif">
                Reva answering your calls.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-muted text-lg leading-relaxed">
              The fastest way to get started is a quick call or text with{" "}
              {contact.salesName}. He&apos;ll walk you through exactly how many
              calls you&apos;re missing and have {brand.agentName} live within
              days — no long contracts, no technical lift.
            </p>
          </Reveal>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── LEFT — direct contact options ─────────────── */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <div className="mb-1">
                <p className="mono-label mb-1">
                  Talk directly to {contact.salesName}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {contact.salesName} is {contact.salesRole.toLowerCase()} and
                  your single point of contact — from demo to onboarding.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-3">
              {contactOptions.map((opt) => (
                <ContactCard key={opt.label} {...opt} />
              ))}
            </div>

            {/* Availability line with pulsing lime dot */}
            <Reveal delay={0.32}>
              <div className="card p-5 flex items-start gap-4">
                <span className="relative flex-shrink-0 mt-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-lime block animate-pulse-dot"
                    aria-label="Online"
                  />
                </span>
                <div>
                  <p className="text-ink text-sm font-semibold mb-0.5">
                    Typical response time: under 1 hour
                  </p>
                  <p className="text-muted text-xs leading-relaxed">
                    {contact.salesName} is available Mon – Sat, 8 am – 8 pm PT.
                    For urgent inquiries, call directly — he picks up.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill tone="mint" mono>Mon – Sat</Pill>
                    <Pill tone="mint" mono>8 am – 8 pm PT</Pill>
                    <Pill tone="gray" mono>Calls answered directly</Pill>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CTA quick-action */}
            <Reveal delay={0.38}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={contact.telLink} size="md" arrow>
                  <Phone size={16} />
                  Call {contact.salesName} now
                </Button>
                <Button href={contact.smsLink} variant="outline" size="md">
                  <MessageSquare size={16} />
                  Send a text
                </Button>
              </div>
              <p className="mt-3 mono-label">
                {contact.phoneDisplay}
              </p>
            </Reveal>
          </div>

          {/* ── RIGHT — contact form ───────────────────────── */}
          <Reveal delay={0.1} y={32}>
            <div className="flex flex-col gap-4">
              <div>
                <p className="mono-label mb-1">Or send us a message</p>
                <p className="text-muted text-sm leading-relaxed">
                  Prefer to write it out? Fill in the form and we&apos;ll get
                  back to you within one business day.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
