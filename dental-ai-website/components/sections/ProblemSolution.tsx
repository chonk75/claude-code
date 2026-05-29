import { X, Check, PhoneMissed, Clock, Users, DollarSign, Moon, Phone, CalendarCheck, ShieldCheck, TrendingUp, Gem } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { usd } from "@/lib/utils";
import { roiDefaults } from "@/lib/config";

/* ── Data ─────────────────────────────────────────────────────── */
const pains = [
  { icon: PhoneMissed, text: "Missed calls go straight to voicemail" },
  { icon: Users,       text: "Patients call a competitor and book there instead" },
  { icon: Users,       text: "Receptionist overwhelmed at the front desk" },
  { icon: Moon,        text: "Zero coverage after hours, weekends, or holidays" },
  { icon: DollarSign,  text: `${usd(roiDefaults.receptionistMonthlyCost)}/mo in salary, benefits & turnover` },
];

const wins = [
  { icon: Phone,        text: "Answers every call instantly — 24/7, 365 days a year" },
  { icon: CalendarCheck, text: "Books appointments in real time, no hold time" },
  { icon: ShieldCheck,  text: "Handles insurance questions with clinic-trained answers" },
  { icon: TrendingUp,   text: "Recovers the revenue you're silently losing to voicemail" },
  { icon: Gem,          text: `A fraction of the cost — starting at ${usd(roiDefaults.revaMonthlyPrice)}/mo` },
];

/* ── Sub-components ───────────────────────────────────────────── */
function PainRow({ icon: Icon, text }: { icon: typeof PhoneMissed; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
        <X size={13} className="text-red-400" strokeWidth={2.5} />
      </span>
      <span className="text-slate text-sm leading-relaxed">{text}</span>
    </li>
  );
}

function WinRow({ icon: Icon, text }: { icon: typeof Phone; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan/10 shadow-[0_0_8px_0px_rgba(34,211,238,0.3)]">
        <Check size={13} className="text-cyan" strokeWidth={2.5} />
      </span>
      <span className="text-paper/90 text-sm leading-relaxed">{text}</span>
    </li>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function ProblemSolution() {
  return (
    <Section
      eyebrow="The Problem"
      title={
        <>
          What your clinic loses every day{" "}
          <span className="text-gradient">without Reva</span>
        </>
      }
      intro="Every unanswered call is a patient — and revenue — walking out the door. Here's the before and after."
    >
      <Reveal delay={0.15}>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl">

          {/* ── Without Reva ── */}
          <div className={cn(
            "relative rounded-2xl border border-white/8 bg-ink-2/60 p-8",
            "backdrop-blur-sm"
          )}>
            {/* Dim red top stripe */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10">
                <PhoneMissed size={16} className="text-red-400" />
              </span>
              <h3 className="font-display text-lg font-semibold text-paper/70">Without Reva</h3>
            </div>

            <ul className="space-y-4">
              {pains.map((p) => (
                <PainRow key={p.text} icon={p.icon} text={p.text} />
              ))}
            </ul>
          </div>

          {/* ── With Reva ── */}
          <div className={cn(
            "relative rounded-2xl p-px",
            "bg-gradient-to-br from-cyan/40 via-accent/30 to-accent-2/40"
          )}>
            {/* Outer glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan/10 via-accent/5 to-accent-2/10 blur-xl" aria-hidden />

            <div className={cn(
              "relative h-full rounded-[15px] bg-ink-2/80 p-8 backdrop-blur-sm",
              "shadow-[0_0_40px_-8px_rgba(34,211,238,0.15)]"
            )}>
              {/* Cyan top stripe */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-[15px] bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

              <div className="mb-6 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/15 shadow-[0_0_12px_2px_rgba(34,211,238,0.25)]">
                  <Clock size={16} className="text-cyan" />
                </span>
                <h3 className="font-display text-lg font-semibold text-paper">With Reva</h3>
                <span className="ml-auto text-xs font-medium text-cyan/80 bg-cyan/10 rounded-full px-2.5 py-0.5">24 / 7</span>
              </div>

              <ul className="space-y-4">
                {wins.map((w) => (
                  <WinRow key={w.text} icon={w.icon} text={w.text} />
                ))}
              </ul>
            </div>
          </div>

        </div>
      </Reveal>
    </Section>
  );
}
