"use client";

import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
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
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-paper placeholder:text-slate/50 text-sm leading-relaxed " +
  "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent " +
  "transition-colors duration-200 hover:border-white/20";

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
      <label className="text-xs font-medium text-slate uppercase tracking-wider">
        {label}
        {optional && (
          <span className="ml-1.5 text-slate/50 normal-case tracking-normal">
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
      <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col items-center text-center gap-6 min-h-[420px] justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan to-accent flex items-center justify-center shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]">
          <CheckCircle size={30} className="text-white" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-paper mb-2">
            Message received!
          </h3>
          <p className="text-slate leading-relaxed max-w-sm">
            Thanks — {contact.salesName} will reach out shortly. Prefer to talk
            now?{" "}
            <a
              href={contact.telLink}
              className="text-cyan font-medium hover:underline"
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
    <div className="glass rounded-3xl p-8 md:p-10 border border-white/10">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-paper mb-2">
          Send us a message
        </h2>
        <p className="text-slate text-sm leading-relaxed">
          Fill in the form and {contact.salesName} will get back to you within
          the hour during business hours.
        </p>
      </div>

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

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          disabled={loading}
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

        <p className="text-slate/50 text-xs text-center">
          Or call / text {contact.salesName} directly at{" "}
          <a href={contact.telLink} className="text-slate hover:text-cyan transition-colors">
            {contact.phoneDisplay}
          </a>
        </p>
      </form>
    </div>
  );
}
