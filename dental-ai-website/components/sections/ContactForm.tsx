"use client";

import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { contact } from "@/lib/config";

type FormState = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  clinic: "",
  email: "",
  phone: "",
  message: "",
};

/* ── Shared input classes ───────────────────────────────────── */
const inputBase =
  "w-full rounded-xl bg-surface border border-line px-4 py-3 text-ink placeholder:text-muted/50 text-sm leading-relaxed " +
  "focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent " +
  "transition-colors duration-200 hover:border-ink/20";

/* ── Field wrapper ──────────────────────────────────────────── */
function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="mono-label flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-sage/60 normal-case tracking-normal font-sans text-[0.7rem] not-uppercase">
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // TODO: wire to your backend / email service / CRM
    // e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800); // Simulated async delay — remove when wired to real endpoint
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="card p-8 md:p-10 flex flex-col items-center text-center gap-6 min-h-[420px] justify-center bg-mint dotted-tight">
        <div className="w-16 h-16 rounded-full bg-mint-2 border border-lime/40 flex items-center justify-center">
          <CheckCircle size={30} className="text-lime-ink" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink mb-2">
            Message received!
          </h3>
          <p className="text-muted leading-relaxed max-w-sm">
            Thanks — {contact.salesName} will reach out shortly. Prefer to talk
            now?{" "}
            <a
              href={contact.telLink}
              className="text-lime-ink font-medium hover:underline"
            >
              Call {contact.phoneDisplay}
            </a>
          </p>
        </div>
        <Button
          href={contact.telLink}
          size="sm"
          variant="outline"
          className="mt-2"
        >
          <Phone size={14} />
          Call {contact.salesName} now
        </Button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="card p-8 md:p-10 bg-surface">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Send us a message
          </h2>
          {/* "we reply fast" indicator */}
          <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-lime-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
            We reply fast
          </span>
        </div>
        <p className="text-muted text-sm leading-relaxed">
          Fill in the form and {contact.salesName} will get back to you within
          the hour during business hours.
        </p>
      </div>

      <div className="h-px bg-line-soft mb-7" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Your name">
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              className={inputBase}
            />
          </Field>

          <Field label="Clinic name">
            <input
              required
              type="text"
              name="clinic"
              autoComplete="organization"
              placeholder="Bright Smile Dental"
              value={form.clinic}
              onChange={handleChange}
              className={inputBase}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Email">
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="jane@yourpractice.com"
              value={form.email}
              onChange={handleChange}
              className={inputBase}
            />
          </Field>

          <Field label="Phone" optional>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={handleChange}
              className={inputBase}
            />
          </Field>
        </div>

        <Field label="Message">
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Tell us a bit about your practice and what you're hoping Reva can help with…"
            value={form.message}
            onChange={handleChange}
            className={`${inputBase} resize-none`}
          />
        </Field>

        {/* Footer details row */}
        <div className="flex items-center gap-2 pt-1">
          <Pill tone="mint" mono check>Replies within 1 hr</Pill>
          <Pill tone="gray" mono>No spam</Pill>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-1"
          disabled={loading}
          arrow={!loading}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>

        <p className="text-muted/70 text-xs text-center">
          Or call / text {contact.salesName} directly at{" "}
          <a href={contact.telLink} className="text-ink hover:text-lime-ink transition-colors font-medium">
            {contact.phoneDisplay}
          </a>
        </p>
      </form>
    </div>
  );
}
