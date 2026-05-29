"use client";

import { useState, useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { animate } from "motion/react";
import { cn, usd } from "@/lib/utils";
import { contact, roiDefaults } from "@/lib/config";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function computeROI(
  missedCalls: number,
  avgValue: number,
  conversionPct: number
) {
  const conversion = conversionPct / 100;
  const lostMonthly = missedCalls * conversion * avgValue;
  const lostYearly = lostMonthly * 12;
  const recoveredMonthly = lostMonthly * 0.9;
  const recoveredYearly = recoveredMonthly * 12;
  const netMonthly = recoveredMonthly - roiDefaults.revaMonthlyPrice;
  const roiMultiple =
    roiDefaults.revaMonthlyPrice > 0
      ? recoveredMonthly / roiDefaults.revaMonthlyPrice
      : 0;
  return { lostMonthly, lostYearly, recoveredMonthly, recoveredYearly, netMonthly, roiMultiple };
}

/* ─── animated number hook ────────────────────────────────────────────────── */

function useAnimatedValue(target: number, duration = 0.6) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    const controls = animate(from, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [target, duration]);

  return display;
}

/* ─── slider component ────────────────────────────────────────────────────── */

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate">{label}</span>
        <span className="font-display text-lg font-semibold text-gradient">
          {format(value)}
        </span>
      </div>
      <div className="relative">
        {/* track background */}
        <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
          {/* filled portion */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan via-accent to-accent-2 transition-all duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        {/* thumb */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-gradient-to-br from-cyan to-accent shadow-[0_0_12px_var(--color-accent)] ring-2 ring-accent/30 transition-all duration-100"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate/50">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/* ─── big stat in results panel ───────────────────────────────────────────── */

function BigStat({
  label,
  value,
  prefix = "",
  suffix = "",
  dim = false,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  dim?: boolean;
}) {
  const animVal = useAnimatedValue(value);
  return (
    <div className={cn("space-y-1", dim && "opacity-60")}>
      <p className="text-xs font-medium uppercase tracking-widest text-slate">
        {label}
      </p>
      <p className="font-display text-3xl font-bold text-gradient leading-none">
        {prefix}
        {animVal.toLocaleString()}
        {suffix}
      </p>
    </div>
  );
}

function BigUsdStat({
  label,
  value,
  large = false,
}: {
  label: string;
  value: number;
  large?: boolean;
}) {
  const animVal = useAnimatedValue(value);
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-widest text-slate">
        {label}
      </p>
      <p
        className={cn(
          "font-display font-bold text-gradient leading-none",
          large ? "text-5xl md:text-6xl" : "text-3xl"
        )}
      >
        {usd(animVal)}
      </p>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────────────── */

export default function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(10);
  const [avgValue, setAvgValue] = useState(roiDefaults.avgPatientValue);
  const [conversionPct, setConversionPct] = useState(
    Math.round(roiDefaults.newPatientConversion * 100)
  );

  const roi = computeROI(missedCalls, avgValue, conversionPct);

  const roiMultipleDisplay = useAnimatedValue(
    Math.round(roi.roiMultiple * 10) / 10
  );

  return (
    <Section
      id="roi-calculator"
      eyebrow="ROI Calculator"
      title={
        <>
          See exactly how much{" "}
          <span className="text-gradient">you&apos;re losing</span>
        </>
      }
      intro="Adjust the sliders to match your practice. Reva turns missed calls into booked appointments — the numbers update live."
    >
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ── Left: sliders ─────────────────────────────────────────── */}
        <Reveal>
          <div className="glass rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan/20 to-accent/20 flex items-center justify-center">
                <Phone className="h-4 w-4 text-cyan" />
              </div>
              <h3 className="font-display text-lg font-semibold text-paper">
                Your practice numbers
              </h3>
            </div>

            <Slider
              label="Missed calls per month"
              value={missedCalls}
              min={0}
              max={40}
              step={1}
              format={(v) => `${v} calls`}
              onChange={setMissedCalls}
            />

            <Slider
              label="Average new-patient value"
              value={avgValue}
              min={300}
              max={3000}
              step={100}
              format={(v) => usd(v)}
              onChange={setAvgValue}
            />

            <Slider
              label="% of missed callers who'd book"
              value={conversionPct}
              min={10}
              max={80}
              step={1}
              format={(v) => `${v}%`}
              onChange={setConversionPct}
            />

            {/* quick reference */}
            <p className="text-xs text-slate/60 leading-relaxed pt-2 border-t border-white/5">
              Industry avg: 5–15 missed calls/month · 30–40% conversion rate ·{" "}
              {usd(roiDefaults.avgPatientValue)} avg patient value
            </p>
          </div>
        </Reveal>

        {/* ── Right: results ────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* gradient glow backdrop */}
            <div className="absolute inset-0 aurora opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-cyan/5 pointer-events-none" />
            <div className="glass relative rounded-3xl p-8 space-y-6">
              {/* headline: yearly loss */}
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-widest text-slate">
                  Revenue you&apos;re losing every year
                </p>
                <YearlyLostNumber value={roi.lostYearly} />
              </div>

              <div className="h-px bg-white/8" />

              {/* grid of stats */}
              <div className="grid grid-cols-2 gap-6">
                <BigUsdStat label="Lost per month" value={roi.lostMonthly} />
                <BigUsdStat
                  label="Reva recovers / mo"
                  value={roi.recoveredMonthly}
                />
                <BigUsdStat
                  label="Net gain after Reva"
                  value={roi.netMonthly}
                />
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-slate">
                    Return on investment
                  </p>
                  <p className="font-display text-3xl font-bold text-gradient leading-none">
                    {Math.round(roiMultipleDisplay)}×
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/8" />

              {/* vs receptionist */}
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-5 py-4">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate/70 uppercase tracking-wider">
                    vs. a front-desk receptionist
                  </p>
                  <p className="font-display font-semibold text-paper">
                    {usd(roiDefaults.receptionistMonthlyCost)}
                    <span className="font-normal text-slate text-sm">
                      {" "}
                      / mo
                    </span>
                  </p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-xs text-slate/70 uppercase tracking-wider">
                    Reva costs
                  </p>
                  <p className="font-display font-semibold text-cyan">
                    {usd(roiDefaults.revaMonthlyPrice)}
                    <span className="font-normal text-slate text-sm">
                      {" "}
                      / mo
                    </span>
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button
                href={contact.telLink}
                size="lg"
                className="w-full"
              >
                <Phone className="h-4 w-4" />
                Get my exact numbers — talk to {contact.salesName}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ─── huge yearly number with count-up ───────────────────────────────────── */

function YearlyLostNumber({ value }: { value: number }) {
  const animVal = useAnimatedValue(value, 0.7);
  return (
    <p className="font-display text-6xl md:text-7xl font-bold text-gradient leading-none">
      {usd(animVal)}
      <span className="text-2xl text-slate/60 font-normal ml-2">/yr</span>
    </p>
  );
}
