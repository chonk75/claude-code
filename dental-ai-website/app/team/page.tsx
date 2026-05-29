import type { Metadata } from "next";
import { Phone, MessageSquare, MessageCircle, Wrench } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { team, contact, brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Team",
};

/* ── Member card ────────────────────────────────────────────── */
function MemberCard({
  member,
  delay,
}: {
  member: (typeof team)[number];
  delay: number;
}) {
  /* Avatar colors: Aiden (index 0 / showContact) gets lime/forest; founder gets forest/sage */
  const isAiden = member.showContact;

  const avatarBg = isAiden
    ? "bg-gradient-to-br from-lime to-lime-ink"
    : "bg-gradient-to-br from-forest to-forest-deep";

  const avatarText = isAiden ? "text-forest-deep" : "text-white";

  return (
    <Reveal delay={delay}>
      <div className="card p-8 md:p-10 flex flex-col gap-8 h-full hover:-translate-y-1 transition-transform duration-300">
        {/* Avatar + name row */}
        <div className="flex items-center gap-6">
          {/* Circular avatar */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-20 h-20 rounded-full ${avatarBg} flex items-center justify-center shadow-lg`}
            >
              <span
                className={`font-display text-2xl font-bold ${avatarText} tracking-wide select-none`}
              >
                {member.initials}
              </span>
            </div>

            {/* Live indicator for Aiden */}
            {member.showContact && (
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-lime border-2 border-surface flex items-center justify-center animate-pulse-dot"
                aria-label="Available"
              />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-2xl font-bold text-ink leading-tight">
              {member.name}
            </h3>
            <p className="text-lime-ink text-sm font-medium mt-0.5 font-mono uppercase tracking-wider">
              {member.role}
            </p>
          </div>
        </div>

        {/* Detail tags */}
        <div className="flex flex-wrap gap-2">
          {isAiden ? (
            <>
              <Pill tone="mint" mono check>Sales & demos</Pill>
              <Pill tone="mint" mono check>Onboarding</Pill>
              <Pill tone="solid" mono>Your contact</Pill>
            </>
          ) : (
            <>
              <Pill tone="gray" mono>AI engineering</Pill>
              <Pill tone="gray" mono>Conversation design</Pill>
              <Pill tone="gray" mono>Infrastructure</Pill>
            </>
          )}
        </div>

        {/* Bio */}
        <p className="text-muted leading-relaxed text-sm flex-1">{member.bio}</p>

        {/* Divider */}
        <div className="border-t border-line" />

        {/* Contact actions — only for Aiden */}
        {member.showContact ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Button href={contact.telLink} size="sm" arrow>
                <Phone size={14} />
                Call {member.name}
              </Button>
              <Button href={contact.smsLink} variant="outline" size="sm">
                <MessageSquare size={14} />
                Text
              </Button>
              <Button href={contact.whatsappLink} variant="outline" size="sm">
                <MessageCircle size={14} />
                WhatsApp
              </Button>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-sage">
              Direct line:{" "}
              <a
                href={contact.telLink}
                className="text-lime-ink hover:underline underline-offset-4 normal-case font-sans text-sm font-medium tracking-normal"
              >
                {contact.phoneDisplay}
              </a>
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted text-sm">
            <Wrench size={14} className="text-sage flex-shrink-0" />
            <span>Building the agents behind the scenes.</span>
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <Section
        index="01"
        label="THE TEAM"
        title={
          <>
            Small team.{" "}
            <span className="text-lime-ink">Serious results.</span>
          </>
        }
        intro="Two people obsessing over one problem: making sure dental clinics never lose a patient to a missed call again. No fluff — just fast setup and real bookings."
        className="pt-32"
      />

      {/* ── Member cards ────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {team.map((member, i) => (
              <MemberCard key={member.name} member={member} delay={i * 0.1} />
            ))}
          </div>

          {/* Serif pull-quote beneath cards */}
          <Reveal delay={0.25}>
            <div className="mt-12 max-w-xl border-l-2 border-lime pl-5">
              <p className="font-serif italic text-lg text-muted leading-relaxed">
                &ldquo;We keep the team intentionally small so every clinic gets
                real attention — not a support ticket.&rdquo;
              </p>
              <p className="mt-2 mono-label">— {brand.name} team philosophy</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────────── */}
      <section className="relative bg-forest grain py-20 overflow-hidden">
        <div className="dotted-tight absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="container-x relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between max-w-4xl">
              <div>
                <p className="mono-label text-lime mb-3">Ready to stop missing calls?</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug">
                  {contact.salesName}&apos;s ready when you are.
                </h2>
                <p className="mt-3 text-white/70 text-base leading-relaxed max-w-lg">
                  Book a quick call with {contact.salesName} — he&apos;ll show you
                  exactly how many calls your clinic is missing and get Reva live
                  in days, no long contracts or technical setup required.
                </p>
                {/* Stats strip */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <Pill tone="mint" mono check>Setup in 3 – 5 days</Pill>
                  <Pill tone="mint" mono check>No long contracts</Pill>
                  <Pill tone="mint" mono check>No technical lift</Pill>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0 items-start md:items-end">
                <Button href={contact.telLink} variant="lime" size="lg" arrow>
                  <Phone size={18} />
                  Call {contact.salesName}
                </Button>
                <p className="mono-label text-white/50">
                  {contact.phoneDisplay}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
