"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X, Send, Phone } from "lucide-react";
import { brand, contact } from "@/lib/config";

type Msg = { role: "user" | "agent"; text: string };

const suggestions = [
  "How much can I save?",
  "How does the voice agent work?",
  "What does it cost?",
  "Can it book appointments?",
];

export default function AskAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "agent",
      text: `Hi, I'm ${brand.agentName} 👋 — the AI receptionist for ${brand.name}. Ask me anything about how we recover missed calls, pricing, or demos.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "agent",
          text:
            data.reply ??
            `Let's get you to a human — call ${contact.salesName} at ${contact.phoneDisplay}.`,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "agent",
          text: `I'm having trouble connecting. Call ${contact.salesName} at ${contact.phoneDisplay} and he'll help right away.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-lime text-forest shadow-[0_16px_40px_-10px_rgba(124,223,19,0.7)]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask Reva"
      >
        {/* pulsing ring */}
        <span className="absolute inset-0 -z-10 rounded-full bg-lime animate-pulse-dot" />
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-forest px-4 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lime font-display font-bold text-forest-deep text-base shrink-0">
                {brand.agentName[0]}
              </span>
              <div className="leading-tight flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-white">
                  Ask {brand.agentName}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-sage/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot shrink-0" />
                  Online · replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="shrink-0 grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 bg-bg-soft dotted-tight">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-forest text-white"
                        : "rounded-bl-sm bg-surface border border-line text-ink shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-surface border border-line px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-sage"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink transition-colors hover:border-lime hover:text-lime-ink font-mono uppercase tracking-wider"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick-call strip */}
            <a
              href={contact.telLink}
              className="flex items-center justify-center gap-2 border-t border-line bg-mint py-2.5 text-xs font-mono uppercase tracking-wider text-lime-ink hover:bg-mint-2 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Prefer a human? Call {contact.salesName} · {contact.phoneDisplay}
            </a>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-surface p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${brand.agentName} anything…`}
                className="flex-1 rounded-full bg-bg-soft border border-line px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent transition-colors"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-white transition-all hover:bg-forest-deep disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
