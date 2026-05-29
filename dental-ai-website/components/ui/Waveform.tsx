"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Animated audio waveform — small, tasteful motion used in the hero,
 * voice demos and the assistant. `active` makes the bars dance.
 */
export default function Waveform({
  bars = 28,
  active = true,
  className,
  barClassName,
}: {
  bars?: number;
  active?: boolean;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const base = 0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75;
        return (
          <motion.span
            key={i}
            className={cn("w-[3px] rounded-full bg-forest/70", barClassName)}
            initial={{ scaleY: base }}
            animate={
              active
                ? { scaleY: [base, base * 0.4 + 0.2, Math.min(1, base + 0.3), base] }
                : { scaleY: base * 0.5 }
            }
            transition={
              active
                ? {
                    duration: 1.1 + (i % 5) * 0.18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.06,
                  }
                : { duration: 0.3 }
            }
            style={{ height: 28, originY: 1 }}
          />
        );
      })}
    </div>
  );
}
