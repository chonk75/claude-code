import { cn } from "@/lib/utils";

/**
 * The brand "waveform" squiggle mark (thoughtly-style).
 * Used in the logo, section dividers, and as a small accent.
 */
export default function Squiggle({
  className,
  strokeWidth = 6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 72 28"
      fill="none"
      className={cn("h-5 w-auto", className)}
      aria-hidden="true"
    >
      <path
        d="M2 14c4-9 8-9 11 0s7 9 11 0 8-12 12 0 7 9 11 0 8-9 11 0"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
