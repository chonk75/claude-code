"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PhoneMissed, Clock, TrendingUp, Sparkles } from "lucide-react";
import Section from "@/components/ui/Section";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import { brand, contact, roiDefaults } from "@/lib/config";
import { usd, cn } from "@/lib/utils";

/* Smoothly eases a displayed number toward its target whenever the target
   changes — gives the KPIs a polished "catch-up" feel while dragging. */
function useEased(target: number, dur = 480) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  const raf = useRef(0);
  useEffect(() => {
    from.current = val;
    const start = performance.now();
    cancelAnimationFrame(raf.current);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(from.current + (target - from.current) * e);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

/* ── Premium slider ───────────────────────────────────────── */
function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="mono-label">{label}</span>
        <Pill tone="mint" mono>
          {value}
          {suffix}
        </Pill>
      </div>
      <div className="relative mt-3 h-5">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-lime"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-range absolute inset-0 w-full cursor-pointer appearance-none bg-transparent"
          aria-label={label}
        />
      </div>
    </div>
  );
}

const MONTHS = 12;

/* Catmull-Rom → cubic bezier. `tension` < 1 makes the curve looser / curvier
   (controls how far the bezier handles reach). */
function smoothPath(points: number[][], tension = 0.5): string {
  if (points.length < 2) return "";
  const p = points;
  const k = (1 - tension) * 2 + 1; // handle length factor (smaller tension → curvier)
  const f = 6 / k;
  let d = `M ${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / f;
    const c1y = p1[1] + (p2[1] - p0[1]) / f;
    const c2x = p2[0] - (p3[0] - p1[0]) / f;
    const c2y = p2[1] - (p3[1] - p1[1]) / f;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/* Explosive growth curve: climbs from the very start (linear lift-off) and
   keeps accelerating into a steep surge at the end — no dead-flat section.
   (Endpoint = 1 = true yearly total.) */
const growthFrac = (m: number) => {
  const t = m / MONTHS;
  return 0.2 * t + 0.8 * Math.pow(t, 3.6);
};

export default function ROICalculator() {
  const [missed, setMissed] = useState(roiDefaults.missedCallsDefault);
  const [value, setValue] = useState(roiDefaults.avgAppointmentValue);
  const [minutes, setMinutes] = useState(roiDefaults.minutesPerCall);
  const [hover, setHover] = useState<number | null>(null);

  const recovery = roiDefaults.revaRecoveryRate;
  const residual = 1 - recovery;

  // Money
  const lostPerMonth = missed * value;
  const lostPerYear = lostPerMonth * MONTHS;
  const savedPerYear = lostPerYear * recovery;
  const revaCostYear = roiDefaults.revaMonthlyPrice * MONTHS;
  const netGain = savedPerYear - revaCostYear;
  const roiX = revaCostYear > 0 ? savedPerYear / revaCostYear : 0;

  // Time
  const minutesPerMonth = missed * minutes;
  const hoursPerYear = (minutesPerMonth * MONTHS) / 60;
  const workDays = hoursPerYear / 8;

  // Eased display values
  const dLostYear = useEased(lostPerYear);
  const dSavedYear = useEased(savedPerYear);
  const dHours = useEased(hoursPerYear);
  const dRoi = useEased(roiX);
  const dLostMonth = useEased(lostPerMonth);
  const dNet = useEased(netGain);

  /* ── Chart geometry ── */
  const W = 720;
  const H = 340;
  const padL = 6;
  const padR = 6;
  const padT = 12;
  const padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const bottom = padT + innerH;

  // Scale the axis so the curve explodes right up to the top of the chart.
  const yMax = Math.max(lostPerYear * 1.02, 1000);
  const x = (m: number) => padL + (innerW * m) / MONTHS;
  const y = (v: number) => padT + innerH * (1 - Math.min(1, v / yMax));
  // Smooth exponential climb — flat start, sweeping up to near-vertical.
  // Endpoint at month 12 stays the true yearly total.
  const lossAt = (m: number) => lostPerYear * growthFrac(m);
  const revaAt = (m: number) => lostPerYear * residual * growthFrac(m);

  // sample more densely so the curve is silky-smooth
  const STEPS = 48;
  const lossPts = Array.from({ length: STEPS + 1 }, (_, i) => {
    const m = (i / STEPS) * MONTHS;
    return [x(m), y(lossAt(m))];
  });
  const revaPts = Array.from({ length: STEPS + 1 }, (_, i) => {
    const m = (i / STEPS) * MONTHS;
    return [x(m), y(revaAt(m))];
  });

  const T = 0.5;
  const lossLine = smoothPath(lossPts, T);
  const revaLine = smoothPath(revaPts, T);
  // savings area = the smooth loss curve (top) flowing back along the reva curve
  const savingsArea =
    lossLine + " " + smoothPath([...revaPts].reverse(), T).replace(/^M/, "L") + " Z";
  // residual loss area (under the reva curve)
  const residualArea = `${revaLine} L ${x(MONTHS).toFixed(1)} ${bottom.toFixed(1)} L ${x(0).toFixed(1)} ${bottom.toFixed(1)} Z`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    yv: bottom - innerH * f,
    label: usd(yMax * f).replace("$", "$"),
  }));

  const hoverData =
    hover != null
      ? { month: hover, lost: lossAt(hover), saved: lossAt(hover) - revaAt(hover) }
      : null;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    const m = Math.round(frac * MONTHS);
    setHover(Math.max(1, Math.min(MONTHS, m)));
  }

  return (
    <Section
      id="roi"
      index="03"
      label="ROI CALCULATOR"
      title={
        <>
          See exactly how much you&apos;re{" "}
          <span className="text-lime-ink">losing</span>.
        </>
      }
      intro="Drag the sliders to match your practice. The graph climbs with every missed call — and shows what Reva puts back."
    >
      <style>{`
        .roi-range::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:20px; height:20px; border-radius:9999px; background:#163a22; border:3px solid #7cdf13; box-shadow:0 2px 8px rgba(15,44,26,.35); cursor:pointer; }
        .roi-range::-moz-range-thumb{ width:20px; height:20px; border-radius:9999px; background:#163a22; border:3px solid #7cdf13; cursor:pointer; }
      `}</style>

      <div className="mt-12 card overflow-hidden">
        {/* dashboard header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-soft px-5 py-3.5 dotted-tight">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
            Missed-call ROI · live
          </span>
          <span className="mono-label">{brand.name} dashboard</span>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr]">
          {/* ── Controls ── */}
          <div className="space-y-7 border-b border-line p-6 lg:border-b-0 lg:border-r">
            <span className="mono-label">Your practice numbers</span>

            <Slider
              label="Missed calls / month"
              value={missed}
              min={0}
              max={60}
              suffix=" calls"
              onChange={setMissed}
            />

            {/* typed appointment value */}
            <div>
              <span className="mono-label">Average appointment value</span>
              <div className="mt-3 flex items-center rounded-xl border border-line bg-surface focus-within:ring-2 focus-within:ring-lime">
                <span className="pl-3 font-display text-lg font-bold text-muted">$</span>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={value}
                  onChange={(e) => setValue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-transparent px-2 py-2.5 font-display text-lg font-bold text-ink focus:outline-none"
                  aria-label="Average appointment value"
                />
                <span className="pr-3 text-xs text-muted">/ visit</span>
              </div>
            </div>

            <Slider
              label="Minutes per call"
              value={minutes}
              min={1}
              max={15}
              suffix=" min"
              onChange={setMinutes}
            />

            <div className="rounded-xl border border-line bg-mint p-3">
              <p className="mono-label !text-lime-ink">time on the phone</p>
              <p className="mt-1 text-sm text-ink">
                <span className="font-display text-lg font-bold">{minutesPerMonth}</span> min /
                month chasing missed calls
              </p>
            </div>
          </div>

          {/* ── Chart + KPIs ── */}
          <div className="p-6">
            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi
                icon={<PhoneMissed className="h-3.5 w-3.5" />}
                label="Lost / year"
                value={usd(dLostYear)}
                tone="loss"
                sub={`${usd(dLostMonth)}/mo`}
              />
              <Kpi
                icon={<Sparkles className="h-3.5 w-3.5" />}
                label="Reva saves / yr"
                value={usd(dSavedYear)}
                tone="save"
                sub={`net ${usd(dNet)}`}
              />
              <Kpi
                icon={<Clock className="h-3.5 w-3.5" />}
                label="Hours lost / yr"
                value={`${dHours.toFixed(0)}h`}
                tone="neutral"
                sub={`≈ ${workDays.toFixed(1)} work days`}
              />
              <Kpi
                icon={<TrendingUp className="h-3.5 w-3.5" />}
                label="Return"
                value={`${dRoi.toFixed(0)}×`}
                tone="save"
                sub="on Reva's cost"
              />
            </div>

            {/* legend */}
            <div className="mt-6 flex items-center gap-5 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-lime/60" /> You keep this with {brand.agentName}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-0 w-4 border-t-2 border-dashed border-ink/50" /> Lost without {brand.agentName}
              </span>
            </div>

            {/* chart */}
            <div
              className="relative mt-3"
              onMouseMove={onMove}
              onMouseLeave={() => setHover(null)}
            >
              <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none">
                <defs>
                  <linearGradient id="saveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7cdf13" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#7cdf13" stopOpacity="0.08" />
                  </linearGradient>
                </defs>

                {/* gridlines + y ticks */}
                {ticks.map((t, i) => (
                  <g key={i}>
                    <line
                      x1={padL}
                      x2={W - padR}
                      y1={t.yv}
                      y2={t.yv}
                      stroke="rgba(15,44,26,0.08)"
                      strokeDasharray="3 5"
                    />
                    <text x={padL + 2} y={t.yv - 4} className="fill-sage" style={{ font: "600 10px var(--font-mono)" }}>
                      {t.label}
                    </text>
                  </g>
                ))}

                {/* residual loss (faint, under Reva line) */}
                <motion.path
                  d={residualArea}
                  fill="rgba(224,133,46,0.10)"
                  initial={false}
                  animate={{ d: residualArea }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* savings area */}
                <motion.path
                  d={savingsArea}
                  fill="url(#saveGrad)"
                  initial={false}
                  animate={{ d: savingsArea }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* loss line (dashed ceiling) */}
                <motion.path
                  d={lossLine}
                  fill="none"
                  stroke="#163a22"
                  strokeOpacity={0.55}
                  strokeWidth={2.5}
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: lossLine }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* reva line (solid lime) */}
                <motion.path
                  d={revaLine}
                  fill="none"
                  stroke="#3f7a08"
                  strokeWidth={3}
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: revaLine }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* endpoint marker on loss line */}
                <motion.circle
                  r={5}
                  fill="#163a22"
                  initial={false}
                  animate={{ cx: x(MONTHS), cy: y(lossAt(MONTHS)) }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* hover guide */}
                {hover != null && (
                  <g>
                    <line
                      x1={x(hover)}
                      x2={x(hover)}
                      y1={padT}
                      y2={bottom}
                      stroke="rgba(15,44,26,0.25)"
                    />
                    <circle cx={x(hover)} cy={y(lossAt(hover))} r={4} fill="#163a22" />
                    <circle cx={x(hover)} cy={y(revaAt(hover))} r={4} fill="#3f7a08" />
                  </g>
                )}

                {/* month labels */}
                {[0, 3, 6, 9, 12].map((m) => (
                  <text
                    key={m}
                    x={x(m)}
                    y={H - 6}
                    textAnchor={m === 0 ? "start" : m === 12 ? "end" : "middle"}
                    className="fill-sage"
                    style={{ font: "600 10px var(--font-mono)" }}
                  >
                    {m === 0 ? "now" : `M${m}`}
                  </text>
                ))}
              </svg>

              {/* hover tooltip */}
              {hoverData && (
                <div
                  className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-xl border border-line bg-surface px-3 py-2 text-xs shadow-lg"
                  style={{ left: `${(x(hoverData.month) / W) * 100}%` }}
                >
                  <p className="mono-label !text-[0.6rem]">Month {hoverData.month}</p>
                  <p className="mt-1 text-ink">
                    Lost: <span className="font-semibold">{usd(hoverData.lost)}</span>
                  </p>
                  <p className="text-lime-ink">
                    Saved: <span className="font-semibold">{usd(hoverData.saved)}</span>
                  </p>
                </div>
              )}
            </div>

            {/* comparison + CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-bg-soft px-4 py-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted">
                  Front-desk hire{" "}
                  <span className="font-mono text-ink line-through">
                    {usd(roiDefaults.receptionistMonthlyCost)}/mo
                  </span>
                </span>
                <span className="text-sage">vs</span>
                <span className="text-muted">
                  {brand.agentName}{" "}
                  <span className="font-mono font-semibold text-lime-ink">
                    {usd(roiDefaults.revaMonthlyPrice)}/mo
                  </span>
                </span>
              </div>
              <Button href={contact.telLink} size="sm" arrow>
                Get my exact numbers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Kpi({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone: "loss" | "save" | "neutral";
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="flex items-center gap-1.5 text-sage">
        {icon}
        <span className="mono-label !text-[0.6rem]">{label}</span>
      </div>
      <p
        className={cn(
          "mt-1.5 font-display text-2xl font-bold leading-none",
          tone === "loss" && "text-amber",
          tone === "save" && "text-lime-ink",
          tone === "neutral" && "text-ink"
        )}
      >
        {value}
      </p>
      <p className="mt-1 truncate text-[0.7rem] text-muted">{sub}</p>
    </div>
  );
}
