import { Phone, MessageSquare, CalendarClock, Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ── Data ─────────────────────────────────────────────────────── */
type Agent = {
  icon: ReactNode;
  gradient: string;
  glowColor: string;
  title: string;
  description: string;
  features: string[];
};

const agents: Agent[] = [
  {
    icon: <Phone size={22} />,
    gradient: "from-cyan to-accent",
    glowColor: "rgba(34,211,238,0.25)",
    title: "Voice Receptionist",
    description:
      "Answers every inbound call instantly — day, night, weekend, holiday. Reva sounds human, stays patient, and never puts a caller on hold.",
    features: [
      "Answers & qualifies callers in under 1 second",
      "Books appointments directly in your PMS",
      "Handles after-hours & overflow calls seamlessly",
    ],
  },
  {
    icon: <MessageSquare size={22} />,
    gradient: "from-accent to-accent-2",
    glowColor: "rgba(99,102,241,0.25)",
    title: "Chat & WhatsApp Agent",
    description:
      "Replies instantly on your website live-chat, SMS, and WhatsApp — capturing leads the moment they reach out, even at 2 a.m.",
    features: [
      "Web chat widget set up in minutes",
      "WhatsApp & SMS inbound handling",
      "Converts inquiries into booked appointments",
    ],
  },
  {
    icon: <CalendarClock size={22} />,
    gradient: "from-accent-2 to-cyan",
    glowColor: "rgba(139,92,246,0.25)",
    title: "Patient Recall Agent",
    description:
      "Automatically re-engages lapsed patients via text or voice — filling your schedule with patients who already know and trust your clinic.",
    features: [
      "Targets patients overdue for recall or hygiene",
      "Personalised outreach cadence (call → text → follow-up)",
      "Fills last-minute cancellation slots automatically",
    ],
  },
];

/* ── Card ─────────────────────────────────────────────────────── */
function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <Reveal delay={0.1 + index * 0.08}>
      <div
        className={cn(
          "group relative flex flex-col gap-6 rounded-2xl border border-white/8 bg-ink-2/60 p-8",
          "backdrop-blur-sm transition-all duration-500",
          "hover:-translate-y-1.5 hover:border-white/15",
          "hover:shadow-[0_24px_60px_-12px_var(--card-glow,rgba(99,102,241,0.2))]"
        )}
        style={{ "--card-glow": agent.glowColor } as React.CSSProperties}
      >
        {/* Top stripe */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent to-transparent",
            "via-white/20 group-hover:via-white/40 transition-all duration-500"
          )}
        />

        {/* Icon tile */}
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl text-white",
            "bg-gradient-to-br shadow-lg",
            agent.gradient
          )}
          style={{
            boxShadow: `0 8px 24px -4px ${agent.glowColor}`,
          }}
        >
          {agent.icon}
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-semibold text-paper">
            {agent.title}
          </h3>
          <p className="text-slate text-sm leading-relaxed">{agent.description}</p>
        </div>

        {/* Feature bullets */}
        <ul className="mt-auto space-y-2.5 border-t border-white/8 pt-6">
          {agent.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-cyan/10">
                <Check size={10} className="text-cyan" strokeWidth={3} />
              </span>
              <span className="text-paper/75 text-sm leading-snug">{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function AgentTypes() {
  return (
    <Section
      eyebrow="What We Build"
      title={
        <>
          Three AI agents,{" "}
          <span className="text-gradient">one front desk that never sleeps</span>
        </>
      }
      intro="Reva AI deploys the right agent for every touchpoint — phone, text, or web — so your clinic captures every opportunity around the clock."
    >
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {agents.map((agent, i) => (
          <AgentCard key={agent.title} agent={agent} index={i} />
        ))}
      </div>
    </Section>
  );
}
