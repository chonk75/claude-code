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
  { label: "Family Dentistry",  icon: <Smile    size={13} strokeWidth={1.75} /> },
  { label: "Orthodontics",      icon: <Brackets size={13} strokeWidth={1.75} /> },
  { label: "Pediatric Dental",  icon: <Baby     size={13} strokeWidth={1.75} /> },
  { label: "Cosmetic",          icon: <Sparkles size={13} strokeWidth={1.75} /> },
  { label: "Endodontics",       icon: <Activity size={13} strokeWidth={1.75} /> },
  { label: "Oral Surgery",      icon: <Scissors size={13} strokeWidth={1.75} /> },
  { label: "Periodontics",      icon: <Leaf     size={13} strokeWidth={1.75} /> },
  { label: "Implants",          icon: <Anchor   size={13} strokeWidth={1.75} /> },
  { label: "Emergency Dental",  icon: <Zap      size={13} strokeWidth={1.75} /> },
];

/* ── Marquee pill ─────────────────────────────────────────────── */

function SpecialtyPill({ label, icon }: Specialty) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-muted mx-2.5 select-none">
      <span className="text-sage">{icon}</span>
      {label}
    </span>
  );
}

/* ── Main (server component — pure CSS marquee) ───────────────── */

export default function LogoMarquee() {
  return (
    <div className="py-10 overflow-hidden border-y border-dashed border-line bg-bg-soft">
      {/* mono label */}
      <div className="container-x mb-6 flex items-center gap-3">
        <div className="h-px flex-1 border-t border-dashed border-line" />
        <p className="mono-label text-sage shrink-0">
          BUILT FOR EVERY KIND OF DENTAL PRACTICE
        </p>
        <div className="h-px flex-1 border-t border-dashed border-line" />
      </div>

      {/* marquee container */}
      <div className="relative" aria-hidden="true">
        {/* left fade mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg-soft) 0%, transparent 100%)",
          }}
        />
        {/* right fade mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg-soft) 0%, transparent 100%)",
          }}
        />

        {/* scrolling track — two copies for seamless loop */}
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {specialties.map((s) => (
            <SpecialtyPill key={`a-${s.label}`} {...s} />
          ))}
          {/* separator dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-line shrink-0 mx-2" />
          {specialties.map((s) => (
            <SpecialtyPill key={`b-${s.label}`} {...s} />
          ))}
          {/* separator dot (needed so the seamless loop closes cleanly) */}
          <span className="w-1.5 h-1.5 rounded-full bg-line shrink-0 mx-2" />
        </div>
      </div>
    </div>
  );
}
