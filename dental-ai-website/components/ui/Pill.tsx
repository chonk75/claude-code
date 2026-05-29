import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "mint" | "solid" | "outline" | "amber" | "gray";

const tones: Record<Tone, string> = {
  mint: "bg-mint text-lime-ink border border-lime/30",
  solid: "bg-forest text-white",
  outline: "border border-line text-muted bg-surface",
  amber: "bg-amber/15 text-amber border border-amber/30",
  gray: "bg-ink/[0.06] text-muted border border-line",
};

/**
 * Small status / metric / data pill — the detail that makes cards feel alive.
 * Use `mono` for `key = value` data chips and status codes (BOOKED, QUALIFIED).
 */
export default function Pill({
  children,
  tone = "mint",
  mono = false,
  check = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  mono?: boolean;
  check?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium",
        mono && "font-mono uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {check && <Check className="h-3 w-3" strokeWidth={3} />}
      {children}
    </span>
  );
}
