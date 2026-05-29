import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Squiggle from "./Squiggle";

/**
 * Standard section with the thoughtly-style header:
 * a dashed divider, a [01] index + squiggle on the left, a monospace
 * label on the right, then a big display heading + optional intro.
 */
export default function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className,
  divider = true,
  center = false,
}: {
  id?: string;
  index?: string;
  label?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  divider?: boolean;
  center?: boolean;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container-x">
        {divider && (
          <div className="mb-8 h-px w-full border-t border-dashed border-line" />
        )}

        {(index || label) && (
          <Reveal>
            <div className="mb-7 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sage">
                <Squiggle className="h-4 w-9" strokeWidth={5} />
                {index && (
                  <span className="mono-label !tracking-[0.1em]">[{index}]</span>
                )}
              </span>
              {label && <span className="mono-label text-right">{label}</span>}
            </div>
          </Reveal>
        )}

        {(title || intro) && (
          <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
            {title && (
              <Reveal delay={0.05}>
                <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.98] tracking-[-0.02em] text-ink text-balance">
                  {title}
                </h2>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted">
                  {intro}
                </p>
              </Reveal>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
