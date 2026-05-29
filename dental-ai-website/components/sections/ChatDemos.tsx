"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Phone,
  Video,
  CheckCheck,
  RefreshCw,
  MessageSquare,
  Bell,
  Globe,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { brand, contact } from "@/lib/config";

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────── */

type MessageFrom = "patient" | "agent";

interface ChatMessage {
  from: MessageFrom;
  text: string;
  time?: string;
}

interface AgentConversation {
  id: string;
  label: string;
  icon: React.ReactNode;
  clinic: string;
  clinicInitials: string;
  accentFrom: string;
  accentTo: string;
  messages: ChatMessage[];
}

/* ─────────────────────────────────────────────────────────────────────────
   CONVERSATIONS DATA
───────────────────────────────────────────────────────────────────────── */

const conversations: AgentConversation[] = [
  {
    id: "website",
    label: "Website Receptionist",
    icon: <Globe size={13} />,
    clinic: "Bright Smile Dental",
    clinicInitials: "BS",
    accentFrom: "#22d3ee",
    accentTo: "#6366f1",
    messages: [
      {
        from: "patient",
        text: "Hi! I'm looking to book a teeth cleaning. Is this the right place?",
        time: "10:02 AM",
      },
      {
        from: "agent",
        text: "Hi there! 👋 You've reached Bright Smile Dental — I'm Reva, the virtual receptionist. I'd be happy to help you book a cleaning! Are you a new or existing patient?",
        time: "10:02 AM",
      },
      {
        from: "patient",
        text: "New patient! Also, how much does a cleaning cost?",
        time: "10:03 AM",
      },
      {
        from: "agent",
        text: "Welcome! A routine cleaning for a new patient is $120–$150, and we accept most major insurance plans which can bring it down to a small copay. Do you have dental insurance?",
        time: "10:03 AM",
      },
      {
        from: "patient",
        text: "Yes, I have Delta Dental. When's the next available slot?",
        time: "10:04 AM",
      },
      {
        from: "agent",
        text: "Great — Delta Dental is accepted! We have openings this Thursday at 2:30 PM or Friday at 9:00 AM. Which works better for you?",
        time: "10:04 AM",
      },
      {
        from: "patient",
        text: "Friday at 9 AM works perfectly.",
        time: "10:05 AM",
      },
      {
        from: "agent",
        text: "Booked! ✅ Friday at 9:00 AM for a new patient cleaning. You'll get a confirmation text shortly. See you then — we're looking forward to meeting you! 😊",
        time: "10:05 AM",
      },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp / SMS Agent",
    icon: <MessageSquare size={13} />,
    clinic: "Lakeside Family Dentistry",
    clinicInitials: "LF",
    accentFrom: "#6366f1",
    accentTo: "#8b5cf6",
    messages: [
      {
        from: "patient",
        text: "Hey are you guys open on Saturdays?",
        time: "9:15 AM",
      },
      {
        from: "agent",
        text: "Hi! This is Reva from Lakeside Family Dentistry 😊 Yes, we're open Saturdays from 8 AM – 1 PM. Is there something I can help you book?",
        time: "9:15 AM",
      },
      {
        from: "patient",
        text: "Yeah I need a checkup. Do you take Cigna?",
        time: "9:17 AM",
      },
      {
        from: "agent",
        text: "Yes — Cigna is one of our accepted plans! A routine exam + X-rays is covered at 100% for in-network patients, so there's usually no out-of-pocket cost.",
        time: "9:17 AM",
      },
      {
        from: "patient",
        text: "Oh nice! Can I book this Saturday?",
        time: "9:18 AM",
      },
      {
        from: "agent",
        text: "Absolutely! We have 10:00 AM and 11:30 AM still open this Saturday. Which would you prefer?",
        time: "9:18 AM",
      },
      {
        from: "patient",
        text: "10am please",
        time: "9:19 AM",
      },
      {
        from: "agent",
        text: "Done! 📅 You're booked for Saturday at 10:00 AM. A confirmation will be sent to this number. We'll see you then — have a great day!",
        time: "9:19 AM",
      },
    ],
  },
  {
    id: "recall",
    label: "Patient Recall Agent",
    icon: <Bell size={13} />,
    clinic: "Downtown Dental Co.",
    clinicInitials: "DD",
    accentFrom: "#8b5cf6",
    accentTo: "#22d3ee",
    messages: [
      {
        from: "agent",
        text: "Hi Sarah! 👋 This is Reva from Downtown Dental Co. It's been about 7 months since your last cleaning — it's time to take care of that smile again!",
        time: "2:00 PM",
      },
      {
        from: "patient",
        text: "Oh wow, has it been that long already? Guess I should come in.",
        time: "2:04 PM",
      },
      {
        from: "agent",
        text: "It sneaks up on us! We'd love to have you back. We have a few openings this week — Tuesday at 3 PM or Thursday at 10 AM. Does either work for you?",
        time: "2:04 PM",
      },
      {
        from: "patient",
        text: "Thursday works. Is Dr. Miller still there?",
        time: "2:06 PM",
      },
      {
        from: "agent",
        text: "Yes — Dr. Miller is still with us and would love to see you again! 😊 I'll put you down for Thursday at 10:00 AM with Dr. Miller for a cleaning and exam.",
        time: "2:06 PM",
      },
      {
        from: "patient",
        text: "Perfect, sounds good!",
        time: "2:07 PM",
      },
      {
        from: "agent",
        text: "You're all set! 🦷 We'll send a reminder 24 hours before your appointment. Can't wait to see you Thursday — take care, Sarah!",
        time: "2:07 PM",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   TYPING INDICATOR
───────────────────────────────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-2 justify-start"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rounded-2xl rounded-bl-sm bg-white/10 border border-white/8 px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-slate"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MESSAGE BUBBLE
───────────────────────────────────────────────────────────────────────── */

interface BubbleProps {
  message: ChatMessage;
  accentFrom: string;
  accentTo: string;
}

function MessageBubble({ message, accentFrom, accentTo }: BubbleProps) {
  const isAgent = message.from === "agent";

  return (
    <motion.div
      className={cn("flex items-end gap-2 max-w-[82%]", isAgent ? "self-end flex-row-reverse" : "self-start")}
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
          isAgent
            ? "rounded-br-sm text-white"
            : "rounded-bl-sm bg-white/10 text-paper border border-white/8"
        )}
        style={
          isAgent
            ? {
                background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
                boxShadow: `0 4px 20px -6px ${accentFrom}60`,
              }
            : undefined
        }
      >
        <p>{message.text}</p>
        {message.time && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-[10px]",
              isAgent ? "justify-end text-white/60" : "justify-end text-white/40"
            )}
          >
            <span>{message.time}</span>
            {isAgent && (
              <CheckCheck size={11} className="text-white/60" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PHONE MOCKUP — CHAT UI
───────────────────────────────────────────────────────────────────────── */

interface PhoneMockupProps {
  conversation: AgentConversation;
  visibleCount: number;
  showTyping: boolean;
}

function PhoneMockup({ conversation, visibleCount, showTyping }: PhoneMockupProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { clinic, clinicInitials, accentFrom, accentTo, messages } = conversation;

  useEffect(() => {
    // Scroll ONLY the inner messages list — never the page/window.
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [visibleCount, showTyping]);

  const visibleMessages = messages.slice(0, visibleCount);

  return (
    /* Device frame */
    <div
      className="relative mx-auto w-[300px] sm:w-[320px] rounded-[2.5rem] bg-[#0e1226] border-2 border-white/10 shadow-2xl shadow-accent/20 overflow-hidden"
      style={{
        boxShadow: "0 30px 80px -20px rgba(99,102,241,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Notch */}
      <div className="relative z-10 flex justify-center pt-2 pb-1 bg-[#090d1a]">
        <div className="w-24 h-5 rounded-full bg-black flex items-center justify-center gap-1.5 px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="flex-1 h-1 rounded-full bg-white/8" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#090d1a] flex items-center justify-between px-5 pb-1 text-[10px] text-white/40">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="w-3 h-1.5 rounded-sm border border-white/40 relative overflow-hidden">
            <span className="absolute inset-0 right-0.5 bg-white/60 rounded-sm" />
          </span>
        </div>
      </div>

      {/* Chat header */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 border-b border-white/8"
        style={{
          background: "linear-gradient(180deg, #0e1226 0%, #0b1020 100%)",
        }}
      >
        <ChevronLeft size={16} className="text-white/50 shrink-0" />

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-md"
          style={{
            background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
          }}
        >
          {clinicInitials}
        </div>

        {/* Clinic info */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-paper leading-tight truncate">{clinic}</p>
          <p className="flex items-center gap-1 text-[10px] text-slate leading-tight">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "#22c55e", boxShadow: "0 0 5px #22c55e" }}
            />
            <span className="italic">{brand.agentName} · online</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 text-white/40 shrink-0">
          <Phone size={14} />
          <Video size={14} />
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="relative flex flex-col gap-2.5 px-3 py-3 overflow-y-auto"
        style={{
          height: 380,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundColor: "#090d18",
        }}
      >
        {/* Date divider */}
        <div className="flex items-center justify-center">
          <span className="text-[10px] text-white/25 bg-white/5 rounded-full px-2.5 py-0.5">
            Today
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {visibleMessages.map((msg, idx) => (
            <MessageBubble
              key={`${conversation.id}-msg-${idx}`}
              message={msg}
              accentFrom={accentFrom}
              accentTo={accentTo}
            />
          ))}
          {showTyping && (
            <TypingIndicator key={`${conversation.id}-typing`} />
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="bg-[#0b0f1c] border-t border-white/8 flex items-center gap-2 px-3 py-2.5">
        <div className="flex-1 rounded-full bg-white/6 border border-white/8 px-3.5 py-1.5 text-[12px] text-white/25">
          Message…
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
        >
          <svg viewBox="0 0 20 20" fill="white" width="12" height="12">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TAB BUTTON
───────────────────────────────────────────────────────────────────────── */

interface TabButtonProps {
  conversation: AgentConversation;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ conversation, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
        isActive
          ? "text-white"
          : "text-slate hover:text-paper hover:bg-white/5"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="chat-tab-pill"
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${conversation.accentFrom}25, ${conversation.accentTo}25)`,
            border: `1px solid ${conversation.accentFrom}40`,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span
        className={cn(
          "relative z-10",
          isActive ? "text-cyan" : "text-slate"
        )}
        style={isActive ? { color: conversation.accentFrom } : undefined}
      >
        {conversation.icon}
      </span>
      <span className="relative z-10">{conversation.label}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION HOOK
───────────────────────────────────────────────────────────────────────── */

// Each message: agent messages have a typing delay before them
// patient messages appear immediately, then wait for next agent msg
const PATIENT_DELAY = 600;    // ms after prev message before patient msg appears
const TYPING_SHOW = 950;      // ms typing indicator is shown
const AGENT_INITIAL_WAIT = 300; // extra wait at start before first message

function useConversationPlayback(
  messages: ChatMessage[],
  conversationId: string,
  replayToken: number
) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    // Reset
    setVisibleCount(0);
    setShowTyping(false);
    clearAll();

    let accumulated = AGENT_INITIAL_WAIT;

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const capturedI = i;

      if (msg.from === "agent") {
        // Show typing indicator
        const showTypingAt = accumulated;
        const t1 = setTimeout(() => setShowTyping(true), showTypingAt);
        timeoutsRef.current.push(t1);

        // Reveal message, hide typing
        const revealAt = accumulated + TYPING_SHOW;
        const t2 = setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(capturedI + 1);
        }, revealAt);
        timeoutsRef.current.push(t2);

        accumulated = revealAt + PATIENT_DELAY;
      } else {
        // Patient message appears immediately after delay
        const revealAt = accumulated;
        const t = setTimeout(() => {
          setVisibleCount(capturedI + 1);
        }, revealAt);
        timeoutsRef.current.push(t);

        accumulated = revealAt + PATIENT_DELAY;
      }
    }

    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, replayToken]);

  return { visibleCount, showTyping };
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────── */

export default function ChatDemos() {
  const [activeId, setActiveId] = useState<string>(conversations[0].id);
  const [replayToken, setReplayToken] = useState(0);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const { visibleCount, showTyping } = useConversationPlayback(
    active.messages,
    active.id,
    replayToken
  );

  const handleTabChange = (id: string) => {
    if (id !== activeId) {
      setActiveId(id);
      setReplayToken((t) => t + 1);
    }
  };

  const handleReplay = () => {
    setReplayToken((t) => t + 1);
  };

  return (
    <Section
      id="chat-demos"
      eyebrow="Chat Agents"
      title={
        <>
          Three agents.{" "}
          <span className="text-gradient">Every message answered.</span>
        </>
      }
      intro="Reva replies on your website, WhatsApp, and SMS — and even re-books lapsed patients automatically. Watch a real conversation."
    >
      {/* Two-column layout */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Copy + Tabs ──────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:pr-6">
          {/* Tab switcher */}
          <div>
            <p className="text-xs font-medium text-slate uppercase tracking-widest mb-4">
              Choose an agent type
            </p>
            <div className="flex flex-col gap-2">
              {conversations.map((conv) => (
                <TabButton
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === activeId}
                  onClick={() => handleTabChange(conv.id)}
                />
              ))}
            </div>
          </div>

          {/* Active description card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="glass rounded-2xl p-5 border border-white/8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Clinic badge */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold text-white shrink-0 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${active.accentFrom}, ${active.accentTo})`,
                  }}
                >
                  {active.clinicInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-paper">{active.clinic}</p>
                  <p className="text-xs text-slate">{active.label}</p>
                </div>
              </div>

              {/* Feature bullets */}
              <ul className="space-y-2">
                {getFeatureBullets(active.id).map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate">
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: active.accentFrom }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Progress dots */}
              <div className="mt-5 flex items-center gap-2">
                {active.messages.map((_, i) => {
                  const revealed = i < visibleCount;
                  return (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: revealed ? 20 : 6,
                        background: revealed ? active.accentFrom : "rgba(255,255,255,0.12)",
                      }}
                    />
                  );
                })}
                <span className="ml-2 text-[11px] text-white/30">
                  {visibleCount}/{active.messages.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Replay */}
          <button
            onClick={handleReplay}
            className="group flex items-center gap-2 text-sm text-slate hover:text-paper transition-colors w-fit"
          >
            <RefreshCw
              size={13}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Replay conversation
          </button>

          {/* CTA */}
          <div className="pt-2 border-t border-white/8">
            <Button href={contact.whatsappLink} size="lg" variant="primary">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message {contact.salesName} on WhatsApp
            </Button>
            <p className="mt-2.5 text-xs text-slate">
              Ask about live demos, pricing, or getting {brand.agentName} set up for your clinic.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Phone Mockup ─────────────────────────────── */}
        <div className="flex flex-col items-center">
          {/* Glow halo */}
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-[3rem] blur-3xl opacity-40 scale-90"
              style={{
                background: `radial-gradient(ellipse at center, ${active.accentFrom}60, ${active.accentTo}40, transparent 70%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <PhoneMockup
                  conversation={active}
                  visibleCount={visibleCount}
                  showTyping={showTyping}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Agent tag below phone */}
          <motion.div
            className="mt-5 flex items-center gap-2 glass rounded-full px-4 py-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span className="text-xs text-slate">
              {brand.agentName} is responding · {active.clinic}
            </span>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────── */

function getFeatureBullets(id: string): string[] {
  switch (id) {
    case "website":
      return [
        "Greets visitors on your website chat widget 24/7",
        "Answers pricing and insurance questions instantly",
        "Books appointments directly into your calendar",
      ];
    case "whatsapp":
      return [
        "Responds to WhatsApp and SMS messages in seconds",
        "Confirms your opening hours and accepted insurance",
        "Converts casual inquiries into confirmed bookings",
      ];
    case "recall":
      return [
        "Automatically messages patients overdue for a visit",
        "Personalises outreach with the patient's last visit date",
        "Re-activates lapsed patients without staff effort",
      ];
    default:
      return [];
  }
}
