import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Standard page section with optional eyebrow + heading. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  center = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="container-x">
        {(eyebrow || title || intro) && (
          <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
            {eyebrow && (
              <Reveal>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  {eyebrow}
                </span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
                  {title}
                </h2>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg text-slate leading-relaxed">
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
