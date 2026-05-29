import type { Metadata } from "next";
import { Phone, MessageSquare, MessageCircle, Wrench } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { team, contact } from "@/lib/config";

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
  const isCyan = member.accent === "cyan";

  /* Avatar gradient: cyan→accent for cyan members, accent→accent-2 for violet */
  const avatarGradient = isCyan
    ? "from-cyan via-accent to-accent"
    : "from-accent via-accent-2 to-accent-2";

  /* Subtle card border tint */
  const borderGlow = isCyan
    ? "hover:border-cyan/30"
    : "hover:border-accent-2/30";

  return (
    <Reveal delay={delay}>
      <div
        className={`glass rounded-3xl p-8 md:p-10 flex flex-col gap-8 border border-white/10 transition-colors duration-300 ${borderGlow} h-full`}
      >
        {/* Avatar + name row */}
        <div className="flex items-center gap-6">
          {/* Circular gradient avatar */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center shadow-[0_0_30px_-6px] ${isCyan ? "shadow-cyan/50" : "shadow-accent-2/50"}`}
            >
              <span className="font-display text-2xl font-bold text-white tracking-wide select-none">
                {member.initials}
              </span>
            </div>
            {/* Pulse ring for Aiden */}
            {member.showContact && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan border-2 border-ink flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
            )}
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-paper">
              {member.name}
            </h3>
            <p className="text-cyan text-sm font-medium mt-0.5">{member.role}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate leading-relaxed flex-1">{member.bio}</p>

        {/* Contact actions — only for members with showContact === true */}
        {member.showContact ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Button href={contact.telLink} size="sm">
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
            <p className="text-slate text-xs">
              Direct line:{" "}
              <a
                href={contact.telLink}
                className="text-cyan font-medium hover:underline"
              >
                {contact.phoneDisplay}
              </a>
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate text-sm">
            <Wrench size={14} className="text-accent-2 flex-shrink-0" />
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
        eyebrow="The Team"
        title={
          <>
            Small team.{" "}
            <span className="text-gradient">Serious results.</span>
          </>
        }
        intro="Two people obsessing over one problem: making sure dental clinics never lose a patient to a missed call again."
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
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────────── */}
      <section className="py-20 bg-ink-2 border-t border-white/5">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between max-w-4xl">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">
                  Want to get started?{" "}
                  <span className="text-gradient">{contact.salesName}&apos;s your guy.</span>
                </h2>
                <p className="mt-3 text-slate text-lg leading-relaxed max-w-lg">
                  Book a quick call with {contact.salesName} — he&apos;ll show you exactly
                  how many calls your clinic is missing and get {" "}
                  Reva live in days.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0 items-start md:items-end">
                <Button href={contact.telLink} size="lg">
                  <Phone size={18} />
                  Call {contact.salesName}
                </Button>
                <p className="text-slate text-xs text-left md:text-right">
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
