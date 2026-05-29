import { Check, Phone, Sparkles, Building2, Zap } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { usd } from "@/lib/utils";
import { roiDefaults, contact } from "@/lib/config";

/* ── Data ─────────────────────────────────────────────────────── */
const doneForYouFeatures = [
  "Unlimited inbound calls answered 24/7",
  "Appointment booking inside your PMS",
  "Insurance & FAQ handling — trained on your clinic",
  "Web chat + SMS / WhatsApp agent included",
  "White-glove onboarding & voice customisation",
  "Live in days, not weeks",
  "Monthly performance reports",
];

const customFeatures = [
  "Everything in Done-For-You",
  "Multi-location deployment",
  "Custom voice & personality per location",
  "Dedicated account manager",
  "Priority support & SLA",
  "Volume pricing available",
];

/* ── Card: Done-For-You (featured) ───────────────────────────── */
function FeaturedCard() {
  return (
    <Reveal delay={0.1}>
      {/* Gradient border wrapper */}
      <div className="relative rounded-2xl p-px bg-gradient-to-br from-cyan/50 via-accent/40 to-accent-2/50">
        {/* Outer glow */}
        <div
          className="absolute -inset-px rounded-2xl blur-2xl bg-gradient-to-br from-cyan/15 via-accent/10 to-accent-2/15"
          aria-hidden
        />

        <div className="relative rounded-[15px] bg-ink-2/90 backdrop-blur-sm overflow-hidden">
          {/* Top cyan stripe */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />

          {/* Popular badge */}
          <div className="flex items-center justify-between px-8 pt-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
              <Zap size={11} />
              Most Popular
            </span>
            <Sparkles size={16} className="text-accent/60" />
          </div>

          <div className="px-8 pt-5 pb-8">
            <h3 className="font-display text-2xl font-semibold text-paper">Done-For-You</h3>
            <p className="mt-1 text-slate text-sm">Everything set up, trained on your clinic, live in days.</p>

            {/* Price */}
            <div className="mt-6 flex items-end gap-1.5">
              <span className="font-display text-5xl font-bold text-paper">
                {usd(roiDefaults.revaMonthlyPrice)}
              </span>
              <span className="mb-1.5 text-slate text-sm">/&nbsp;month</span>
            </div>

            {/* Month-to-month reassurance */}
            <p className="mt-2 text-xs text-slate/70">
              Month-to-month — no long-term commitment required.
            </p>

            {/* Savings callout */}
            <div className="mt-5 rounded-xl bg-white/4 border border-white/8 px-4 py-3 flex items-center gap-3">
              <span className="text-xs text-slate leading-snug">
                A full-time receptionist costs{" "}
                <span className="text-paper font-medium line-through decoration-red-400">
                  ~{usd(roiDefaults.receptionistMonthlyCost)}/mo
                </span>
                {" "}— save over{" "}
                <span className="text-cyan font-semibold">
                  {usd(roiDefaults.receptionistMonthlyCost - roiDefaults.revaMonthlyPrice)} every month
                </span>
              </span>
            </div>

            {/* CTA */}
            <Button href={contact.telLink} size="lg" className="mt-7 w-full justify-center">
              <Phone size={16} />
              Talk to {contact.salesName}
            </Button>

            {/* Features */}
            <ul className="mt-8 space-y-3 border-t border-white/8 pt-7">
              {doneForYouFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/10 shadow-[0_0_6px_1px_rgba(34,211,238,0.2)]">
                    <Check size={11} className="text-cyan" strokeWidth={3} />
                  </span>
                  <span className="text-paper/80 text-sm leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Card: Custom / Multi-location ───────────────────────────── */
function CustomCard() {
  return (
    <Reveal delay={0.2}>
      <div className={cn(
        "relative h-full rounded-2xl border border-white/8 bg-ink-2/60 p-8",
        "backdrop-blur-sm flex flex-col"
      )}>
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center gap-2.5 mb-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
            <Building2 size={16} className="text-accent" />
          </span>
          <h3 className="font-display text-2xl font-semibold text-paper">Custom / Multi-location</h3>
        </div>
        <p className="text-slate text-sm">For dental groups, DSOs, or practices with unique needs.</p>

        {/* Price */}
        <div className="mt-6 flex items-end gap-1.5">
          <span className="font-display text-4xl font-bold text-paper">Let&apos;s talk</span>
        </div>
        <p className="mt-2 text-xs text-slate/70">Volume pricing tailored to your group.</p>

        {/* CTA */}
        <Button
          href={contact.telLink}
          size="lg"
          variant="outline"
          className="mt-7 w-full justify-center"
        >
          <Phone size={16} />
          Talk to {contact.salesName}
        </Button>

        {/* Features */}
        <ul className="mt-8 space-y-3 border-t border-white/8 pt-7 flex-1">
          {customFeatures.map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Check size={11} className="text-accent" strokeWidth={3} />
              </span>
              <span className="text-paper/80 text-sm leading-snug">{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={
        <>
          Straightforward pricing,{" "}
          <span className="text-gradient">serious ROI</span>
        </>
      }
      intro={`Replace a ${usd(roiDefaults.receptionistMonthlyCost)}/mo receptionist with an AI that works harder, never calls in sick, and costs a fraction of the price.`}
      center
    >
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-start">
        <FeaturedCard />
        <CustomCard />
      </div>
    </Section>
  );
}
