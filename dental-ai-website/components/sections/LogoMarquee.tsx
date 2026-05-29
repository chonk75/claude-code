import {
  Smile,
  Brackets,
  Baby,
  Sparkles,
  Activity,
  Scissors,
  Leaf,
  Anchor,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

/* ── Data ─────────────────────────────────────────────────────── */
type Specialty = { label: string; icon: ReactNode };

const specialties: Specialty[] = [
  { label: "Family Dentistry",  icon: <Smile   size={14} /> },
  { label: "Orthodontics",      icon: <Brackets size={14} /> },
  { label: "Pediatric Dental",  icon: <Baby    size={14} /> },
  { label: "Cosmetic",          icon: <Sparkles size={14} /> },
  { label: "Endodontics",       icon: <Activity size={14} /> },
  { label: "Oral Surgery",      icon: <Scissors size={14} /> },
  { label: "Periodontics",      icon: <Leaf    size={14} /> },
  { label: "Implants",          icon: <Anchor  size={14} /> },
  { label: "Emergency Dental",  icon: <Zap     size={14} /> },
];

/* ── Pill ─────────────────────────────────────────────────────── */
function Pill({ label, icon }: Specialty) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-2 text-sm font-medium text-paper/60 backdrop-blur-sm mx-3">
      <span className="text-cyan/60">{icon}</span>
      {label}
    </span>
  );
}

/* ── Main (server component — pure CSS marquee) ───────────────── */
export default function LogoMarquee() {
  return (
    <section className="py-14 overflow-hidden">
      {/* Label */}
      <p className="text-center text-xs font-medium tracking-widest uppercase text-slate/40 mb-8">
        Built for every kind of dental practice
      </p>

      {/* Marquee container */}
      <div
        className="relative"
        aria-hidden="true"
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-ink to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex animate-marquee items-center whitespace-nowrap">
          {/* Render the list twice so the loop is seamless */}
          {specialties.map((s) => (
            <Pill key={`a-${s.label}`} {...s} />
          ))}
          {specialties.map((s) => (
            <Pill key={`b-${s.label}`} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
