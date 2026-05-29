import { Check, Phone, Building2, TrendingDown, ShieldCheck, Zap } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { usd } from "@/lib/utils";
import { roiDefaults, contact } from "@/lib/config";

/* ── Data ─────────────────────────────────────────────────────── */
const doneForYouFeatures = [
  { text: "Unlimited inbound calls answered 24/7", note: "no call caps" },
  { text: "Appointment booking inside your PMS", note: "direct integration" },
  { text: "Insurance & FAQ handling — trained on your clinic", note: "custom KB" },
  { text: "Web chat + SMS / WhatsApp agent included", note: "3 channels" },
  { text: "White-glove onboarding & voice customisation", note: "done for you" },
  { text: "Live in days, not weeks", note: "fast deploy" },
  { text: "Monthly performance reports", note: "full visibility" },
];

const customFeatures = [
  { text: "Everything in Done-For-You", note: "all features" },
  { text: "Multi-location deployment", note: "unlimited sites" },
  { text: "Custom voice & personality per location", note: "per-brand" },
  { text: "Dedicated account manager", note: "named contact" },
  { text: "Priority support & SLA", note: "guaranteed uptime" },
  { text: "Volume pricing available", note: "custom quote" },
];

const savings = roiDefaults.receptionistMonthlyCost - roiDefaults.revaMonthlyPrice;

/* ── Savings contrast strip ───────────────────────────────────── */
function SavingsStrip() {
  return (
    <div className="mt-2 rounded-xl border border-line bg-mint dotted-tight overflow-hidden">
      <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <TrendingDown size={15} className="shrink-0 text-lime-ink" />
        <p className="text-xs text-muted leading-snug flex-1">
          A full-time receptionist costs{" "}
          <span className="font-semibold text-ink line-through decoration-amber">
            ~{usd(roiDefaults.receptionistMonthlyCost)}/mo
          </span>
          {" "}— Reva costs{" "}
          <span className="font-semibold text-lime-ink">{usd(roiDefaults.revaMonthlyPrice)}/mo.</span>
        </p>
        <Pill tone="mint" mono>
          save {usd(savings)}/mo
        </Pill>
      </div>
    </div>
  );
}

/* ── Card: Done-For-You (featured) ───────────────────────────── */
function FeaturedCard() {
  return (
    <Reveal delay={0.1}>
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-[1.5rem]",
          "border-2 border-lime/40",
          "bg-surface shadow-[0_8px_40px_-8px_rgba(124,223,19,0.25)]"
        )}
      >
        {/* Top dotted band */}
        <div className="dotted-tight h-11 w-full bg-mint border-b border-lime/20 relative">
          <div className="absolute inset-0 flex items-center justify-between px-5">
            <Pill tone="mint" mono>
              Most popular
            </Pill>
            <span className="mono-label text-sage/70">DONE-FOR-YOU</span>
          </div>
        </div>

        <div className="flex flex-col gap-0 p-6 flex-1">
          {/* Title + tagline */}
          <div className="pb-5 border-b border-line-soft">
            <h3 className="font-display text-2xl font-bold text-ink">Done-For-You</h3>
            <p className="mt-1 text-sm text-muted">
              Everything set up, trained on your clinic, live in days.
            </p>
          </div>

          {/* Price row */}
          <div className="py-5 border-b border-line-soft flex items-end gap-2">
            <span className="font-display text-5xl font-extrabold text-ink leading-none">
              {usd(roiDefaults.revaMonthlyPrice)}
            </span>
            <div className="mb-1 flex flex-col gap-0.5">
              <span className="mono-label text-sage">per month</span>
              <span className="mono-label text-sage/60">USD · billed monthly</span>
            </div>
          </div>

          {/* Savings strip */}
          <div className="py-4 border-b border-line-soft">
            <SavingsStrip />
          </div>

          {/* CTA */}
          <div className="py-5 border-b border-line-soft">
            <Button href={contact.telLink} size="lg" variant="primary" arrow className="w-full justify-center">
              <Phone size={16} />
              Talk to {contact.salesName}
            </Button>
            <p className="mt-3 text-center mono-label text-sage/70">
              month-to-month · cancel anytime · no commitment
            </p>
          </div>

          {/* Feature checklist */}
          <ul className="pt-5 space-y-0 flex-1">
            {doneForYouFeatures.map((feat, i) => (
              <li
                key={feat.text}
                className={cn(
                  "flex items-start gap-3 py-2.5",
                  i < doneForYouFeatures.length - 1 && "border-b border-line-soft"
                )}
              >
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-lime/30">
                  <Check size={10} className="text-lime-ink" strokeWidth={3.5} />
                </span>
                <span className="flex-1 text-sm text-muted leading-snug">{feat.text}</span>
                <span className="shrink-0 mono-label text-sage/60">{feat.note}</span>
              </li>
            ))}
          </ul>

          {/* Footer trust */}
          <div className="mt-5 pt-4 border-t border-line-soft flex items-center gap-2">
            <ShieldCheck size={13} className="text-lime-ink" />
            <span className="mono-label text-sage/70">no lock-in · live in days · full support</span>
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
      <div className={cn("card relative flex flex-col overflow-hidden p-0")}>
        {/* Top dotted band */}
        <div className="dotted-tight h-11 w-full bg-bg-soft border-b border-line-soft relative">
          <div className="absolute inset-0 flex items-center justify-between px-5">
            <span className="flex items-center gap-1.5">
              <Building2 size={13} className="text-sage" />
              <span className="mono-label text-sage/80">ENTERPRISE</span>
            </span>
            <Pill tone="gray" mono>Custom quote</Pill>
          </div>
        </div>

        <div className="flex flex-col gap-0 p-6 flex-1">
          {/* Title */}
          <div className="pb-5 border-b border-line-soft">
            <h3 className="font-display text-2xl font-bold text-ink">Multi-location / Custom</h3>
            <p className="mt-1 text-sm text-muted">
              For dental groups, DSOs, or practices with unique needs.
            </p>
          </div>

          {/* Price row */}
          <div className="py-5 border-b border-line-soft flex items-end gap-2">
            <span className="font-display text-4xl font-bold text-ink leading-none">Let&apos;s talk</span>
          </div>

          {/* Volume note */}
          <div className="py-4 border-b border-line-soft">
            <div className="rounded-xl border border-line bg-bg-soft px-4 py-3 flex items-center gap-3">
              <Zap size={14} className="shrink-0 text-sage" />
              <p className="text-xs text-muted leading-snug">
                Volume pricing tailored to your group. Custom SLAs and dedicated support included.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="py-5 border-b border-line-soft">
            <Button
              href={contact.telLink}
              size="lg"
              variant="outline"
              arrow
              className="w-full justify-center"
            >
              <Phone size={16} />
              Talk to {contact.salesName}
            </Button>
            <p className="mt-3 text-center mono-label text-sage/70">
              flexible terms · dedicated account manager
            </p>
          </div>

          {/* Feature checklist */}
          <ul className="pt-5 space-y-0 flex-1">
            {customFeatures.map((feat, i) => (
              <li
                key={feat.text}
                className={cn(
                  "flex items-start gap-3 py-2.5",
                  i < customFeatures.length - 1 && "border-b border-line-soft"
                )}
              >
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-ink/[0.06]">
                  <Check size={10} className="text-muted" strokeWidth={3.5} />
                </span>
                <span className="flex-1 text-sm text-muted leading-snug">{feat.text}</span>
                <span className="shrink-0 mono-label text-sage/60">{feat.note}</span>
              </li>
            ))}
          </ul>

          {/* Footer trust */}
          <div className="mt-5 pt-4 border-t border-line-soft flex items-center gap-2">
            <ShieldCheck size={13} className="text-sage" />
            <span className="mono-label text-sage/70">enterprise SLA · custom integration · NDA available</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function Pricing() {
  return (
    <Section
      id="pricing"
      index="07"
      label="PRICING"
      title={
        <>
          Straightforward pricing,{" "}
          <span className="text-lime-ink">serious ROI.</span>
        </>
      }
      intro={`Replace a ${usd(roiDefaults.receptionistMonthlyCost)}/mo receptionist with an AI that works harder, never calls in sick, and costs a fraction of the price.`}
      center
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-start">
        <FeaturedCard />
        <CustomCard />
      </div>

      {/* Bottom reassurance row */}
      <Reveal delay={0.3}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {[
            { icon: <ShieldCheck size={11} />, text: "No long-term contract" },
            { icon: <Zap size={11} />, text: "Live in days" },
            { icon: <Check size={11} strokeWidth={3} />, text: "Month-to-month billing" },
            { icon: <Phone size={11} />, text: "Full setup included" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 mono-label text-sage/80">
              <span className="text-lime-ink">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
