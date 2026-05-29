import Link from "next/link";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { brand, contact, navLinks } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + CTA */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan via-accent to-accent-2 font-display text-lg font-bold text-white">
                R
              </span>
              <span className="font-display text-lg font-semibold">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">
              {brand.subtitle}
            </p>
            <a
              href={contact.telLink}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan hover:underline"
            >
              <Phone className="h-4 w-4" />
              {contact.phoneDisplay}
            </a>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate">
              Pages
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — Aiden only */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate">
              Talk to {contact.salesName}
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={contact.telLink}
                  className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-cyan" /> Call {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-cyan" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contact.email ? `mailto:${contact.email}` : "#"}
                  className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-cyan" /> {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate md:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>Built for dental clinics that never want to miss another call.</p>
        </div>
      </div>
    </footer>
  );
}
