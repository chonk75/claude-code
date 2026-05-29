import { Phone, MessageSquare, CalendarClock, Check, Zap, Clock, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ── Data ─────────────────────────────────────────────────────── */
type Feature = { text: string; detail?: string };
type Agent = {
  index: string;
  icon: ReactNode;
  title: string;
  description: string;
  features: Feature[];
  pill: string;
  tag: string;
  stat: string;
  statLabel: string;
};

const agents: Agent[] = [
  {
    index: "01",
    icon: <Phone size={18} strokeWidth={2} />,
    title: "Voice Receptionist",
    description:
      "Answers every inbound call instantly — day, night, weekend, holiday. Reva sounds human, stays patient, and never puts a caller on hold.",
    features: [
      { text: "Answers & qualifies callers in under 1 second", detail: "sub-second pickup" },
      { text: "Books appointments directly in your PMS", detail: "no portal switch" },
      { text: "Handles after-hours & overflow calls seamlessly", detail: "24 / 7 / 365" },
    ],
    pill: "Live in days",
    tag: "VOICE",
    stat: "<1s",
    statLabel: "avg pickup time",
  },
  {
    index: "02",
    icon: <MessageSquare size={18} strokeWidth={2} />,
    title: "Chat & WhatsApp Agent",
    description:
      "Replies instantly on your website live-chat, SMS, and WhatsApp — capturing leads the moment they reach out, even at 2 a.m.",
    features: [
      { text: "Web chat widget set up in minutes", detail: "copy-paste install" },
      { text: "WhatsApp & SMS inbound handling", detail: "multi-channel" },
      { text: "Converts inquiries into booked appointments", detail: "auto-book" },
    ],
    pill: "Multi-channel",
    tag: "MESSAGING",
    stat: "3×",
    statLabel: "more leads captured",
  },
  {
    index: "03",
    icon: <CalendarClock size={18} strokeWidth={2} />,
    title: "Patient Recall Agent",
    description:
      "Automatically re-engages lapsed patients via text or voice — filling your schedule with patients who already know and trust your clinic.",
    features: [
      { text: "Targets patients overdue for recall or hygiene", detail: "smart segmentation" },
      { text: "Personalised outreach cadence (call → text → follow-up)", detail: "auto-sequence" },
      { text: "Fills last-minute cancellation slots automatically", detail: "real-time fill" },
    ],
    pill: "Auto-sequences",
    tag: "RECALL",
    stat: "40%",
    statLabel: "reactivation rate",
  },
];

/* ── Card ─────────────────────────────────────────────────────── */
function AgentCard({ agent, delay }: { agent: Agent; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div
        className={cn(
          "card group relative flex flex-col overflow-hidden p-0",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(15,44,26,0.15)]"
        )}
      >
        {/* Dotted top band */}
        <div className="dotted-tight h-12 w-full bg-mint border-b border-line-soft relative">
          {/* Index + tag in the band */}
          <div className="absolute inset-0 flex items-center justify-between px-5">
            <span className="font-mono text-[0.65rem] font-bold text-sage tracking-widest uppercase">
              [{agent.index}]
            </span>
            <span className="mono-label text-sage/80">{agent.tag}</span>
          </div>
        </div>

        {/* Main body */}
        <div className="flex flex-col gap-5 p-6 flex-1">
          {/* Icon tile + stat */}
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-lime shadow-[0_4px_12px_-2px_rgba(22,58,34,0.4)]">
              {agent.icon}
            </div>
            {/* Micro stat chip */}
            <div className="text-right">
              <div className="font-mono text-xl font-bold text-ink leading-none">{agent.stat}</div>
              <div className="mono-label mt-0.5 text-sage/70">{agent.statLabel}</div>
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-display text-xl font-bold text-ink leading-snug">
              {agent.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{agent.description}</p>
          </div>

          {/* Feature rows */}
          <ul className="mt-auto space-y-0 border-t border-line-soft pt-4">
            {agent.features.map((feat, i) => (
              <li
                key={feat.text}
                className={cn(
                  "flex items-start gap-2.5 py-2.5",
                  i < agent.features.length - 1 && "border-b border-line-soft"
                )}
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime/30">
                  <Check size={9} className="text-lime-ink" strokeWidth={3.5} />
                </span>
                <span className="flex-1 text-xs leading-snug text-muted">{feat.text}</span>
                {feat.detail && (
                  <span className="shrink-0 mono-label text-sage/60">{feat.detail}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
            <Pill tone="mint" mono check>
              {agent.pill}
            </Pill>
            <span className="flex items-center gap-1 mono-label text-sage/60 hover:text-lime-ink transition-colors cursor-pointer">
              learn more <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Uptime strip ─────────────────────────────────────────────── */
function UptimeStrip() {
  const items = [
    { icon: <Clock size={11} />, label: "24 / 7 / 365 coverage" },
    { icon: <Zap size={11} />, label: "Sub-second response" },
    { icon: <Check size={11} strokeWidth={3} />, label: "PMS-integrated booking" },
    { icon: <Phone size={11} />, label: "Unlimited concurrent calls" },
  ];
  return (
    <Reveal delay={0.35}>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 mono-label text-sage/80">
            <span className="text-lime-ink">{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function AgentTypes() {
  return (
    <Section
      id="agents"
      index="04"
      label="WHAT WE BUILD"
      title={
        <>
          Three agents,{" "}
          <span className="text-lime-ink">one front desk that never sleeps.</span>
        </>
      }
      intro="Reva AI deploys the right agent for every touchpoint — phone, text, or web — so your clinic captures every opportunity around the clock."
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {agents.map((agent, i) => (
          <AgentCard key={agent.title} agent={agent} delay={0.08 + i * 0.08} />
        ))}
      </div>
      <UptimeStrip />
    </Section>
  );
}
