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
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan via-accent to-accent-2 text-white shadow-[0_16px_40px_-10px_var(--color-accent)]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask Reva"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-accent animate-pulse-ring" />
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-accent/20 to-accent-2/20 px-4 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan to-accent-2 font-display font-bold text-white">
                {brand.agentName[0]}
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold">
                  Ask {brand.agentName}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · replies instantly
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-accent text-white"
                        : "rounded-bl-sm bg-white/8 text-paper"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white/8 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-slate"
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
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-paper/80 transition-colors hover:border-accent hover:text-white"
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
              className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/5 py-2 text-xs font-medium text-cyan hover:bg-white/10"
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
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${brand.agentName} anything…`}
                className="flex-1 rounded-full bg-white/8 px-4 py-2.5 text-sm text-paper placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white transition-opacity disabled:opacity-40"
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
