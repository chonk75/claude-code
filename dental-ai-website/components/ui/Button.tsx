"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "link" | "lime";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "rounded-2xl bg-forest text-white hover:bg-forest-deep shadow-[0_10px_30px_-12px_rgba(15,44,26,0.6)] hover:-translate-y-0.5",
  lime: "rounded-2xl bg-lime text-forest-deep hover:brightness-105 shadow-[0_10px_30px_-12px_rgba(124,223,19,0.8)] hover:-translate-y-0.5",
  outline:
    "rounded-2xl border border-line bg-surface/60 text-ink hover:border-ink/30 hover:bg-surface",
  link: "text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-lime",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** show a trailing arrow that nudges on hover */
  arrow?: boolean;
};
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className">;

export default function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children, arrow } = props;
  const isLink = variant === "link";
  const classes = cn(base, isLink ? "" : sizes[size], variants[variant], className);
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, arrow: _a, children: _ch, ...rest } = props;
    const external = /^(https?:|tel:|sms:|mailto:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...(rest as ComponentProps<"a">)}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, arrow: _a, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
