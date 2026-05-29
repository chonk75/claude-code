"use client";

import { useState, useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { animate } from "motion/react";
import { cn, usd } from "@/lib/utils";
import { contact, roiDefaults } from "@/lib/config";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";

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
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label">{label}</span>
        <Pill tone="mint" mono>{format(value)}</Pill>
      </div>
      <div className="relative">
        {/* track background */}
        <div className="relative h-2 rounded-full bg-line overflow-hidden">
          {/* filled portion */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-lime transition-all duration-100"
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
          style={{ accentColor: "var(--color-lime)" }}
        />
        {/* thumb */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-lime shadow-[0_2px_10px_rgba(124,223,19,0.5)] ring-2 ring-lime/40 transition-all duration-100"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between font-mono text-[0.7rem] uppercase tracking-wider text-sage">
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
  delta,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  dim?: boolean;
  delta?: string;
}) {
  const animVal = useAnimatedValue(value);
  return (
    <div className={cn("space-y-1.5", dim && "opacity-60")}>
      <p className="mono-label">{label}</p>
      <p className="font-display text-3xl font-bold text-ink leading-none">
        {prefix}
        {animVal.toLocaleString()}
        {suffix}
      </p>
      {delta && (
        <Pill tone="mint" mono>{delta}</Pill>
      )}
    </div>
  );
}

function BigUsdStat({
  label,
  value,
  large = false,
  delta,
}: {
  label: string;
  value: number;
  large?: boolean;
  delta?: string;
}) {
  const animVal = useAnimatedValue(value);
  return (
    <div className="space-y-1.5">
      <p className="mono-label">{label}</p>
      <p
        className={cn(
          "font-display font-bold text-ink leading-none",
          large ? "text-5xl md:text-6xl" : "text-3xl"
        )}
      >
        {usd(animVal)}
      </p>
      {delta && (
        <Pill tone="mint" mono>{delta}</Pill>
      )}
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
      index="03"
      label="ROI CALCULATOR"
      title={
        <>
          See exactly how much{" "}
          <em className="font-serif not-italic text-lime-ink">you&apos;re losing</em>
        </>
      }
      intro="Adjust the sliders to match your practice. Reva turns missed calls into booked appointments — the numbers update live."
    >
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ── Left: sliders ─────────────────────────────────────────── */}
        <Reveal>
          <div className="card p-8 space-y-8 dotted-tight">
            {/* Panel header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-mint flex items-center justify-center border border-lime/30">
                  <Phone className="h-4 w-4 text-lime-ink" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink uppercase tracking-wide">
                  Your Practice Numbers
                </h3>
              </div>
              {/* LIVE indicator */}
              <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-lime-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
                Live
              </span>
            </div>

            <div className="h-px bg-line-soft" />

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
            <div className="pt-4 border-t border-line-soft">
              <p className="mono-label mb-2">Industry averages</p>
              <p className="text-xs text-muted leading-relaxed">
                5–15 missed calls/month · 30–40% conversion rate ·{" "}
                {usd(roiDefaults.avgPatientValue)} avg patient value
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Right: results ────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <div className="rounded-3xl overflow-hidden border border-forest/20">
            {/* Dark forest header with yearly loss */}
            <div className="relative bg-forest grain px-8 pt-8 pb-7">
              <div className="flex items-center justify-between mb-4">
                <p className="mono-label text-sage/80">
                  Revenue you&apos;re losing every year
                </p>
                <Pill tone="solid" mono>
                  <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot inline-block" />
                  Live calc
                </Pill>
              </div>
              <YearlyLostNumber value={roi.lostYearly} />
              <p className="mt-2 text-sm text-sage/60">
                Based on {missedCalls} missed calls/mo at {conversionPct}% conversion
              </p>
            </div>

            {/* Stats grid on white */}
            <div className="bg-surface px-8 py-7 space-y-6">
              {/* 2×2 grid */}
              <div className="grid grid-cols-2 gap-6">
                <BigUsdStat
                  label="Lost per month"
                  value={roi.lostMonthly}
                  delta="↓ monthly gap"
                />
                <BigUsdStat
                  label="Reva recovers / mo"
                  value={roi.recoveredMonthly}
                  delta="↑ 90% recovery"
                />
                <BigUsdStat
                  label="Net gain after Reva"
                  value={roi.netMonthly}
                  delta="after $499/mo"
                />
                <div className="space-y-1.5">
                  <p className="mono-label">Return on investment</p>
                  <p className="font-display text-3xl font-bold text-ink leading-none">
                    {Math.round(roiMultipleDisplay)}×
                  </p>
                  <Pill tone="mint" mono>62× return</Pill>
                </div>
              </div>

              <div className="h-px bg-line-soft" />

              {/* Comparison strip */}
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-bg-soft border border-line px-5 py-4">
                <div className="space-y-0.5">
                  <p className="mono-label">Front-desk receptionist</p>
                  <p className="font-display font-semibold text-ink text-lg">
                    {usd(roiDefaults.receptionistMonthlyCost)}
                    <span className="font-normal text-muted text-sm"> / mo</span>
                  </p>
                </div>
                <div className="h-8 w-px bg-line" />
                <div className="text-right space-y-0.5">
                  <p className="mono-label">Reva costs</p>
                  <p className="font-display font-semibold text-lime-ink text-lg">
                    {usd(roiDefaults.revaMonthlyPrice)}
                    <span className="font-normal text-muted text-sm"> / mo</span>
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button
                href={contact.telLink}
                size="lg"
                className="w-full"
                arrow
              >
                Get my exact numbers — talk to {contact.salesName}
              </Button>
              <p className="text-center mono-label text-sage/70">
                Free · No commitment · 15-min call
              </p>
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
    <p className="font-display text-6xl md:text-7xl font-bold text-white leading-none">
      <span className="text-lime">{usd(animVal)}</span>
      <span className="text-2xl text-sage/60 font-normal ml-2">/yr</span>
    </p>
  );
}
