"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { PhoneMissed, Clock, TrendingUp, Sparkles, DollarSign } from "lucide-react";
import Section from "@/components/ui/Section";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import { brand, contact, roiDefaults } from "@/lib/config";
import { usd, cn } from "@/lib/utils";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

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

/* Catmull-Rom → cubic bezier. Lower tension = curvier. */
function smoothPath(points: number[][], tension = 0.5): string {
  if (points.length < 2) return "";
  const p = points;
  const k = (1 - tension) * 2 + 1;
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

/* Explosive growth shape — climbs from the start, surges at the end. */
const growthFrac = (m: number) => {
  const t = m / MONTHS;
  return 0.2 * t + 0.8 * Math.pow(t, 3.6);
};

/* ───────────────────────────────────────────────────────────
   Reusable growth chart. `heightFrac` (0–1) drives how TALL the
   curve climbs, so dragging a slider literally moves it up/down.
   ─────────────────────────────────────────────────────────── */
const STEPS = 48;
const W = 560;
const H = 220;
const padL = 8;
const padR = 8;
const padT = 16;
const padB = 24;
const innerW = W - padL - padR;
const innerH = H - padT - padB;
const bottom = padT + innerH;

const x = (m: number) => padL + (innerW * m) / MONTHS;
const SPRING = { stiffness: 130, damping: 22, mass: 0.5 };

function GrowthChart({
  total,
  recovery,
  heightFrac,
  fmt,
}: {
  total: number;
  recovery: number;
  heightFrac: number;
  fmt: (n: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const residual = 1 - recovery;

  // Springs that continuously track the targets → the curve follows the
  // slider buttery-smooth instead of jumping in steps.
  const tSpring = useSpring(total, SPRING);
  const hSpring = useSpring(heightFrac, SPRING);

  // Geometry derived live from the springs (recomputed every animation frame).
  const calc = (t: number, h: number) => {
    const yMax = t > 0 ? t / clamp(h, 0.04, 0.98) : 1;
    const yv = (v: number) => padT + innerH * (1 - Math.min(1, v / yMax));
    const loss: number[][] = [];
    const reva: number[][] = [];
    for (let i = 0; i <= STEPS; i++) {
      const m = (i / STEPS) * MONTHS;
      const g = growthFrac(m);
      loss.push([x(m), yv(t * g)]);
      reva.push([x(m), yv(t * residual * g)]);
    }
    return { loss, reva };
  };

  const lossLine = useTransform([tSpring, hSpring], ([t, h]: number[]) => smoothPath(calc(t, h).loss));
  const revaLine = useTransform([tSpring, hSpring], ([t, h]: number[]) => smoothPath(calc(t, h).reva));
  const savingsArea = useTransform([tSpring, hSpring], ([t, h]: number[]) => {
    const { loss, reva } = calc(t, h);
    return smoothPath(loss) + " " + smoothPath([...reva].reverse()).replace(/^M/, "L") + " Z";
  });
  const residualArea = useTransform([tSpring, hSpring], ([t, h]: number[]) => {
    const { reva } = calc(t, h);
    return `${smoothPath(reva)} L ${x(MONTHS).toFixed(1)} ${bottom.toFixed(1)} L ${x(0).toFixed(1)} ${bottom.toFixed(1)} Z`;
  });
  const dotCy = useTransform([tSpring, hSpring], ([t, h]: number[]) => calc(t, h).loss[STEPS][1]);

  // Static helpers for ticks / hover (target values — labels can update in steps)
  const yMax = total > 0 ? total / clamp(heightFrac, 0.04, 0.98) : 1;
  const yv = (v: number) => padT + innerH * (1 - Math.min(1, v / yMax));
  const lossAt = (m: number) => total * growthFrac(m);
  const revaAt = (m: number) => total * residual * growthFrac(m);
  const ticks = [0, 0.5, 1].map((f) => ({ yy: bottom - innerH * f, label: fmt(yMax * f) }));
  const gid = `g-${fmt(1).replace(/[^a-z]/gi, "")}`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const m = Math.round(((e.clientX - r.left) / r.width) * MONTHS);
    setHover(clamp(m, 1, MONTHS));
  }

  return (
    <div className="relative" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7cdf13" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7cdf13" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={t.yy} y2={t.yy} stroke="rgba(15,44,26,0.08)" strokeDasharray="3 5" />
            <text x={padL + 2} y={t.yy - 4} className="fill-sage" style={{ font: "600 9px var(--font-mono)" }}>
              {t.label}
            </text>
          </g>
        ))}

        <motion.path d={residualArea} fill="rgba(224,133,46,0.10)" />
        <motion.path d={savingsArea} fill={`url(#${gid})`} />
        <motion.path d={lossLine} fill="none" stroke="#163a22" strokeOpacity={0.5} strokeWidth={2.5} strokeDasharray="6 5" strokeLinecap="round" />
        <motion.path d={revaLine} fill="none" stroke="#3f7a08" strokeWidth={3} strokeLinecap="round" />
        <motion.circle cx={x(MONTHS)} cy={dotCy} r={4.5} fill="#163a22" />

        {hover != null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={padT} y2={bottom} stroke="rgba(15,44,26,0.25)" />
            <circle cx={x(hover)} cy={yv(lossAt(hover))} r={3.5} fill="#163a22" />
            <circle cx={x(hover)} cy={yv(revaAt(hover))} r={3.5} fill="#3f7a08" />
          </g>
        )}

        {[0, 6, 12].map((m) => (
          <text key={m} x={x(m)} y={H - 6} textAnchor={m === 0 ? "start" : m === 12 ? "end" : "middle"} className="fill-sage" style={{ font: "600 9px var(--font-mono)" }}>
            {m === 0 ? "now" : `M${m}`}
          </text>
        ))}
      </svg>

      {hover != null && (
        <div
          className="pointer-events-none absolute top-1 z-10 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[0.7rem] shadow-lg"
          style={{ left: `${(x(hover) / W) * 100}%` }}
        >
          <p className="mono-label !text-[0.55rem]">Month {hover}</p>
          <p className="text-ink">Lost: <span className="font-semibold">{fmt(lossAt(hover))}</span></p>
          <p className="text-lime-ink">Saved: <span className="font-semibold">{fmt(lossAt(hover) - revaAt(hover))}</span></p>
        </div>
      )}
    </div>
  );
}

function fmtHours(n: number) {
  return `${Math.round(n)}h`;
}

function MiniKpi({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "loss" | "save" }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2">
      <div className="flex items-center gap-1.5 text-sage">
        {icon}
        <span className="mono-label !text-[0.58rem]">{label}</span>
      </div>
      <p className={cn("mt-0.5 font-display text-xl font-bold leading-none", tone === "loss" ? "text-amber" : "text-lime-ink")}>
        {value}
      </p>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-2 flex items-center gap-4 text-[0.7rem] text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm bg-lime/60" /> Saved with {brand.agentName}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block h-0 w-4 border-t-2 border-dashed border-ink/50" /> Lost without
      </span>
    </div>
  );
}

export default function ROICalculator() {
  const [missed, setMissed] = useState(roiDefaults.missedCallsDefault);
  const [value, setValue] = useState(roiDefaults.avgAppointmentValue);
  const [minutes, setMinutes] = useState(roiDefaults.minutesPerCall);

  const recovery = roiDefaults.revaRecoveryRate;

  // Money
  const lostPerMonth = missed * value;
  const lostPerYear = lostPerMonth * MONTHS;
  const savedPerYear = lostPerYear * recovery;
  const revaCostYear = roiDefaults.revaMonthlyPrice * MONTHS;
  const roiX = revaCostYear > 0 ? savedPerYear / revaCostYear : 0;

  // Time
  const minutesPerMonth = missed * minutes;
  const hoursPerYear = (minutesPerMonth * MONTHS) / 60;
  const hoursSavedPerYear = hoursPerYear * recovery;
  const workDays = hoursPerYear / 8;

  // Curve heights are driven directly by the sliders → the graphs move.
  const moneyHeight = clamp(0.16 + 0.8 * (missed / 60), 0.06, 0.96);
  const timeHeight = clamp(0.16 + 0.8 * (minutes / 15), 0.06, 0.96);

  // Eased KPI displays
  const dLostYear = useEased(lostPerYear);
  const dSavedYear = useEased(savedPerYear);
  const dHours = useEased(hoursPerYear);
  const dHoursSaved = useEased(hoursSavedPerYear);
  const dRoi = useEased(roiX);

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
      intro="Drag the sliders to match your practice — the graphs climb with every missed call and minute, and show what Reva puts back."
    >
      <style>{`
        .roi-range::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:20px; height:20px; border-radius:9999px; background:#163a22; border:3px solid #7cdf13; box-shadow:0 2px 8px rgba(15,44,26,.35); cursor:pointer; }
        .roi-range::-moz-range-thumb{ width:20px; height:20px; border-radius:9999px; background:#163a22; border:3px solid #7cdf13; cursor:pointer; }
      `}</style>

      <div className="mt-12 card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-soft px-5 py-3.5 dotted-tight">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
            Missed-call ROI · live
          </span>
          <span className="mono-label">{brand.name} dashboard</span>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr]">
          {/* Controls */}
          <div className="space-y-7 border-b border-line p-6 lg:border-b-0 lg:border-r">
            <span className="mono-label">Your practice numbers</span>

            <Slider label="Missed calls / month" value={missed} min={0} max={60} suffix=" calls" onChange={setMissed} />

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

            <Slider label="Minutes per call" value={minutes} min={1} max={15} suffix=" min" onChange={setMinutes} />

            <div className="rounded-xl border border-line bg-mint p-3">
              <p className="mono-label !text-lime-ink">return on investment</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                {dRoi.toFixed(0)}× <span className="text-sm font-medium text-muted">on Reva&apos;s cost</span>
              </p>
            </div>
          </div>

          {/* Two charts */}
          <div className="divide-y divide-line">
            {/* Graph 1 — calls & money */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="mono-label">Calls → Revenue</span>
                <div className="grid grid-cols-2 gap-2">
                  <MiniKpi icon={<PhoneMissed className="h-3.5 w-3.5" />} label="Lost / yr" value={usd(dLostYear)} tone="loss" />
                  <MiniKpi icon={<DollarSign className="h-3.5 w-3.5" />} label="Reva saves / yr" value={usd(dSavedYear)} tone="save" />
                </div>
              </div>
              <div className="mt-4">
                <GrowthChart total={lostPerYear} recovery={recovery} heightFrac={moneyHeight} fmt={usd} />
                <Legend />
              </div>
            </div>

            {/* Graph 2 — minutes & time */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="mono-label">Minutes → Time</span>
                <div className="grid grid-cols-2 gap-2">
                  <MiniKpi icon={<Clock className="h-3.5 w-3.5" />} label="Hours lost / yr" value={fmtHours(dHours)} tone="loss" />
                  <MiniKpi icon={<Sparkles className="h-3.5 w-3.5" />} label="Reva saves / yr" value={fmtHours(dHoursSaved)} tone="save" />
                </div>
              </div>
              <div className="mt-4">
                <GrowthChart total={hoursPerYear} recovery={recovery} heightFrac={timeHeight} fmt={fmtHours} />
                <Legend />
              </div>
              <p className="mt-3 text-xs text-muted">
                That&apos;s about{" "}
                <span className="font-semibold text-ink">{workDays.toFixed(1)} full work days</span> a year your
                front desk spends on missed calls.
              </p>
            </div>
          </div>
        </div>

        {/* comparison + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-bg-soft px-5 py-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 text-lime-ink">
              <TrendingUp className="h-4 w-4" />
              <span className="font-mono font-semibold">{dRoi.toFixed(0)}× return</span>
            </span>
            <span className="text-muted">
              Front desk{" "}
              <span className="font-mono text-ink line-through">{usd(roiDefaults.receptionistMonthlyCost)}/mo</span>
              {" "}vs Reva{" "}
              <span className="font-mono font-semibold text-lime-ink">{usd(roiDefaults.revaMonthlyPrice)}/mo</span>
            </span>
          </div>
          <Button href={contact.telLink} size="sm" arrow>
            Get my exact numbers
          </Button>
        </div>
      </div>
    </Section>
  );
}
