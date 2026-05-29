import {
  X,
  Check,
  PhoneMissed,
  Clock,
  Users,
  DollarSign,
  Moon,
  Phone,
  CalendarCheck,
  ShieldCheck,
  TrendingUp,
  Gem,
  AlertTriangle,
  Zap,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { usd } from "@/lib/utils";
import { roiDefaults, brand } from "@/lib/config";

/* ── Data ─────────────────────────────────────────────────────── */

const pains: { icon: typeof PhoneMissed; text: string; caption: string }[] = [
  {
    icon: PhoneMissed,
    text: "Missed calls go straight to voicemail",
    caption: "Patients hang up within 20 seconds — and rarely call back.",
  },
  {
    icon: Users,
    text: "Patients call a competitor and book there instead",
    caption: "The next dentist in search results gets the appointment.",
  },
  {
    icon: Users,
    text: "Receptionist overwhelmed at the front desk",
    caption: "Juggling check-ins, insurance, and calls simultaneously.",
  },
  {
    icon: Moon,
    text: "Zero coverage after hours, weekends, or holidays",
    caption: "Over 40% of booking intent happens outside office hours.",
  },
  {
    icon: DollarSign,
    text: `${usd(roiDefaults.receptionistMonthlyCost)}/mo in salary, benefits & turnover`,
    caption: "Plus training time, PTO, and unpredictable sick days.",
  },
];

const wins: { icon: typeof Phone; text: string; caption: string }[] = [
  {
    icon: Phone,
    text: "Answers every call instantly — 24/7, 365 days a year",
    caption: "No hold music. No voicemail. Real answers on the first ring.",
  },
  {
    icon: CalendarCheck,
    text: "Books appointments in real time, no hold time",
    caption: "Synced with your scheduler — slots fill while you sleep.",
  },
  {
    icon: ShieldCheck,
    text: "Handles insurance questions with clinic-trained answers",
    caption: "Custom-trained on your practice's plans, fees, and policies.",
  },
  {
    icon: TrendingUp,
    text: "Recovers the revenue you're silently losing to voicemail",
    caption: `Every recovered call is worth ${usd(roiDefaults.avgPatientValue)}+ in patient lifetime value.`,
  },
  {
    icon: Gem,
    text: `A fraction of the cost — starting at ${usd(roiDefaults.revaMonthlyPrice)}/mo`,
    caption: `That's ${usd(roiDefaults.receptionistMonthlyCost - roiDefaults.revaMonthlyPrice)}/mo less than a single full-time receptionist.`,
  },
];

/* ── Sub-components ───────────────────────────────────────────── */

function PainRow({
  icon: Icon,
  text,
  caption,
}: {
  icon: typeof PhoneMissed;
  text: string;
  caption: string;
}) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-line-soft last:border-0 group">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 border border-red-200">
        <X size={11} className="text-red-500" strokeWidth={3} />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-ink leading-snug">{text}</span>
        <span className="text-xs text-muted leading-relaxed">{caption}</span>
      </div>
    </li>
  );
}

function WinRow({
  icon: Icon,
  text,
  caption,
}: {
  icon: typeof Phone;
  text: string;
  caption: string;
}) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-lime/20 last:border-0 group">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface border border-lime/40 shadow-[0_0_8px_0px_rgba(124,223,19,0.25)]">
        <Check size={11} className="text-lime-ink" strokeWidth={3} />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-ink leading-snug">{text}</span>
        <span className="text-xs text-muted leading-relaxed">{caption}</span>
      </div>
    </li>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */

export default function ProblemSolution() {
  return (
    <Section
      index="02"
      label="BEFORE / AFTER"
      title={
        <>
          What your clinic loses every day{" "}
          <span className="text-lime-ink">without {brand.agentName}</span>
        </>
      }
      intro="Every unanswered call is a patient — and revenue — walking out the door. Here's the before and after, side by side."
      id="problem-solution"
    >
      <Reveal delay={0.15}>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl">

          {/* ── Without Reva ── */}
          <div className={cn(
            "card relative flex flex-col overflow-hidden bg-surface"
          )}>
            {/* top stripe */}
            <div className="h-[3px] bg-gradient-to-r from-red-400/70 via-red-300/50 to-transparent rounded-t-3xl" />

            {/* dotted bg */}
            <div className="dotted absolute inset-0 opacity-30 pointer-events-none rounded-3xl" />

            <div className="relative flex flex-col gap-5 p-6 md:p-7">
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 border border-red-200">
                    <PhoneMissed size={14} className="text-red-500" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="mono-label text-sage mb-0.5">SCENARIO A</p>
                    <h3 className="font-display text-base font-semibold text-ink leading-none">
                      Without {brand.agentName}
                    </h3>
                  </div>
                </div>
                <Pill tone="amber" mono>
                  <AlertTriangle size={10} strokeWidth={2.5} />
                  STATUS: AT RISK
                </Pill>
              </div>

              {/* hairline */}
              <div className="border-t border-dashed border-line" />

              {/* pain rows */}
              <ul className="flex flex-col">
                {pains.map((p) => (
                  <PainRow key={p.text} icon={p.icon} text={p.text} caption={p.caption} />
                ))}
              </ul>

              {/* footer stat */}
              <div className="pt-2 border-t border-line-soft flex flex-wrap items-center gap-2">
                <span className="mono-label text-sage">ESTIMATED MONTHLY LOSS</span>
                <div className="ml-auto flex gap-2 flex-wrap">
                  <Pill tone="amber" mono>Up to $18K+ revenue</Pill>
                  <Pill tone="gray" mono>per location</Pill>
                </div>
              </div>
            </div>
          </div>

          {/* ── With Reva ── */}
          <div className={cn(
            "card relative flex flex-col overflow-hidden bg-mint",
            "border-lime/40 shadow-[0_0_40px_-8px_rgba(124,223,19,0.18)]"
          )}>
            {/* top lime stripe */}
            <div className="h-[3px] bg-gradient-to-r from-lime/80 via-lime/50 to-transparent rounded-t-3xl" />

            {/* dotted bg */}
            <div className="dotted absolute inset-0 opacity-30 pointer-events-none rounded-3xl" />

            <div className="relative flex flex-col gap-5 p-6 md:p-7">
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface border border-lime/40 shadow-[0_0_10px_0px_rgba(124,223,19,0.3)]">
                    <Zap size={14} className="text-lime-ink" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="mono-label text-sage mb-0.5">SCENARIO B</p>
                    <h3 className="font-display text-base font-semibold text-ink leading-none">
                      With {brand.agentName}
                    </h3>
                  </div>
                </div>
                <Pill tone="mint" mono check>
                  LIVE 24/7
                </Pill>
              </div>

              {/* hairline */}
              <div className="border-t border-dashed border-lime/30" />

              {/* win rows */}
              <ul className="flex flex-col">
                {wins.map((w) => (
                  <WinRow key={w.text} icon={w.icon} text={w.text} caption={w.caption} />
                ))}
              </ul>

              {/* footer stat */}
              <div className="pt-2 border-t border-lime/20 flex flex-wrap items-center gap-2">
                <span className="mono-label text-sage">MONTHLY SAVINGS VS RECEPTIONIST</span>
                <div className="ml-auto flex gap-2 flex-wrap">
                  <Pill tone="mint" mono check>
                    {usd(roiDefaults.receptionistMonthlyCost - roiDefaults.revaMonthlyPrice)}/mo saved
                  </Pill>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Reveal>

      {/* bottom caption row */}
      <Reveal delay={0.3}>
        <div className="mt-5 max-w-5xl flex flex-wrap items-center gap-3 border-t border-dashed border-line pt-5">
          <p className="text-sm text-muted">
            <span className="font-medium text-ink">No lock-in.</span>{" "}
            Setup takes under 48 hours. Cancel any time.
          </p>
          <div className="ml-auto flex gap-2">
            <Pill tone="gray" mono>SOC 2 COMPLIANT</Pill>
            <Pill tone="outline" mono>HIPAA READY</Pill>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
