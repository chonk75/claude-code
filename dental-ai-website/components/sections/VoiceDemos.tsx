// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO PUBLISH A DEMO RECORDING
//  ─────────────────────────────────────────────────────────────────────────────
//  1. Drop your .mp3 or .wav file into /public/demos/
//     e.g. /public/demos/new-patient.mp3
//
//  2. Open lib/config.ts and find the matching item inside `voiceDemos`.
//
//  3. Set the `audioSrc` field to the public path:
//     audioSrc: "/demos/new-patient.mp3"
//
//  4. Save and deploy — the card will automatically switch from "Demo coming
//     soon" mode to a fully working audio player. No other code changes needed.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Pause, Phone, Play } from "lucide-react";
import { brand, contact, voiceDemos } from "@/lib/config";
import { cn } from "@/lib/utils";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

// ── Waveform bar heights (32 bars) — generated once, never changes ──────────
const BAR_HEIGHTS = [
  0.35, 0.55, 0.75, 0.50, 0.85, 0.60, 0.90, 0.45,
  0.70, 0.80, 0.40, 0.65, 0.95, 0.50, 0.75, 0.60,
  0.85, 0.45, 0.70, 0.55, 0.90, 0.40, 0.80, 0.65,
  0.50, 0.75, 0.60, 0.35, 0.85, 0.55, 0.70, 0.45,
] as const;

// Pre-computed "playing" scaleY keyframes per bar — deterministic, never changes
// (avoids calling Math.random() during render which violates React purity rules)
const BAR_PLAY_SCALES = BAR_HEIGHTS.map((_, i) => {
  const seed1 = ((i * 13 + 7) % 10) / 10; // 0.0–0.9
  const seed2 = ((i * 17 + 3) % 10) / 10;
  return [1, 0.4 + seed1 * 0.8, 0.6 + seed2 * 0.6, 1] as number[];
});

// ── Accent → CSS classes mapping ─────────────────────────────────────────────
const ACCENT_CONFIG = {
  cyan: {
    gradient: "from-cyan to-accent",
    glow: "shadow-[0_8px_32px_-8px_rgba(34,211,238,0.55)]",
    ring: "ring-cyan/40",
    bar: "bg-cyan",
    barActive: "bg-gradient-to-t from-cyan to-accent",
    badge: "border-cyan/30 text-cyan bg-cyan/10",
    progress: "from-cyan to-accent",
  },
  violet: {
    gradient: "from-accent to-accent-2",
    glow: "shadow-[0_8px_32px_-8px_rgba(139,92,246,0.55)]",
    ring: "ring-accent-2/40",
    bar: "bg-accent-2",
    barActive: "bg-gradient-to-t from-accent to-accent-2",
    badge: "border-accent-2/30 text-accent-2 bg-accent-2/10",
    progress: "from-accent to-accent-2",
  },
  blue: {
    gradient: "from-accent via-accent-2 to-cyan",
    glow: "shadow-[0_8px_32px_-8px_rgba(99,102,241,0.55)]",
    ring: "ring-accent/40",
    bar: "bg-accent",
    barActive: "bg-gradient-to-t from-accent via-accent-2 to-cyan",
    badge: "border-accent/30 text-accent bg-accent/10",
    progress: "from-accent via-accent-2 to-cyan",
  },
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Waveform component ────────────────────────────────────────────────────────
function Waveform({
  isPlaying,
  progress,
  accent,
  isComing,
}: {
  isPlaying: boolean;
  progress: number; // 0–1
  accent: keyof typeof ACCENT_CONFIG;
  isComing: boolean;
}) {
  const cfg = ACCENT_CONFIG[accent];
  const playedBars = Math.floor(progress * BAR_HEIGHTS.length);

  return (
    <div className="flex items-center justify-center gap-[3px] h-12 w-full">
      {BAR_HEIGHTS.map((baseH, i) => {
        const isPast = i < playedBars;
        const isCurrent = i === playedBars;

        return (
          <motion.span
            key={i}
            className={cn(
              "rounded-full w-[3px] origin-center",
              isComing
                ? "bg-white/15"
                : isPast
                ? cfg.barActive
                : cfg.bar + " opacity-40",
              isCurrent && !isComing && "opacity-90"
            )}
            style={{
              height: `${baseH * 100}%`,
            }}
            animate={
              isComing
                ? {
                    scaleY: [1, 1.15, 0.9, 1.05, 1],
                    opacity: [0.12, 0.2, 0.12, 0.18, 0.12],
                  }
                : isPlaying
                ? {
                    scaleY: BAR_PLAY_SCALES[i],
                  }
                : { scaleY: 1 }
            }
            transition={
              isComing
                ? {
                    duration: 2.8,
                    delay: (i % 8) * 0.18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : isPlaying
                ? {
                    duration: 0.45 + (i % 5) * 0.07,
                    delay: (i % 6) * 0.04,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}

// ── Individual call-player card ───────────────────────────────────────────────
function CallCard({
  demo,
  isPlaying,
  onPlayRequest,
  onStop,
}: {
  demo: (typeof voiceDemos)[number];
  isPlaying: boolean;
  onPlayRequest: () => void;
  onStop: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cfg = ACCENT_CONFIG[demo.accent];
  const hasAudio = demo.audioSrc !== "";
  const progress = duration > 0 ? currentTime / duration : 0;

  // ── Sync play / pause with the global "playing" state ───────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      // Mark loading via the promise callbacks (not synchronously in the body)
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, hasAudio]);

  const handleToggle = useCallback(() => {
    if (!hasAudio) return;
    if (isPlaying) {
      onStop();
    } else {
      onPlayRequest();
    }
  }, [hasAudio, isPlaying, onStop, onPlayRequest]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
      setIsLoading(false);
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleEnded = useCallback(() => {
    setCurrentTime(0);
    onStop();
  }, [onStop]);

  const handleScrub = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasAudio || !audioRef.current || duration === 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const clamped = Math.max(0, Math.min(1, ratio));
      audioRef.current.currentTime = clamped * duration;
      setCurrentTime(clamped * duration);
    },
    [hasAudio, duration]
  );

  const displayDuration = duration > 0 ? formatTime(duration) : demo.duration;
  const displayCurrent = formatTime(currentTime);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden",
        "transition-all duration-500 group",
        isPlaying && "glow"
      )}
    >
      {/* Subtle ambient glow behind card when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className={cn(
              "absolute inset-0 -z-10 rounded-3xl opacity-20",
              `bg-gradient-to-br ${cfg.gradient}`
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* ── Top row: avatar + clinic info ────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Circular gradient avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "h-12 w-12 rounded-full grid place-items-center",
              `bg-gradient-to-br ${cfg.gradient}`,
              cfg.glow
            )}
          >
            {isPlaying ? (
              <Mic className="h-5 w-5 text-white" />
            ) : (
              <Phone className="h-5 w-5 text-white" />
            )}
          </div>
          {/* Pulse ring when playing */}
          {isPlaying && (
            <span
              className={cn(
                "absolute inset-0 rounded-full ring-2",
                cfg.ring,
                "animate-pulse-ring"
              )}
            />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-paper leading-snug truncate">
            {demo.clinic}
          </p>
          <p className="text-xs text-slate mt-0.5">
            Incoming call · {demo.duration}
          </p>
        </div>

        {/* "Live" badge when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              Live
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Title & description ───────────────────────────────────────── */}
      <div>
        <h3 className="font-display text-base font-semibold text-paper leading-snug">
          {demo.title}
        </h3>
        <p className="mt-1.5 text-sm text-slate leading-relaxed">
          {demo.description}
        </p>
      </div>

      {/* ── Waveform ──────────────────────────────────────────────────── */}
      <Waveform
        isPlaying={isPlaying}
        progress={progress}
        accent={demo.accent}
        isComing={!hasAudio}
      />

      {/* ── Player controls ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {/* Progress bar */}
        <div
          role={hasAudio ? "slider" : undefined}
          aria-label="Seek"
          aria-valuenow={hasAudio ? Math.round(progress * 100) : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn(
            "h-1.5 w-full rounded-full bg-white/10 relative overflow-hidden",
            hasAudio ? "cursor-pointer" : "cursor-default"
          )}
          onClick={handleScrub}
        >
          <motion.div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
              cfg.progress
            )}
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Time + play button row */}
        <div className="flex items-center gap-3">
          {/* Time */}
          <span className="text-xs tabular-nums text-slate w-20">
            {hasAudio ? `${displayCurrent} / ${displayDuration}` : `0:00 / ${demo.duration}`}
          </span>

          {/* Play / pause button */}
          <button
            onClick={handleToggle}
            disabled={!hasAudio || isLoading}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={cn(
              "ml-auto relative h-11 w-11 rounded-full flex items-center justify-center flex-shrink-0",
              "transition-all duration-300",
              hasAudio
                ? cn(
                    `bg-gradient-to-br ${cfg.gradient}`,
                    cfg.glow,
                    "hover:scale-105 active:scale-95 text-white"
                  )
                : "bg-white/8 text-white/25 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <motion.span
                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 translate-x-px" />
            )}
          </button>
        </div>
      </div>

      {/* ── "Demo coming soon" overlay ────────────────────────────────── */}
      {!hasAudio && (
        <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-2 backdrop-blur-[1px]">
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold",
              cfg.badge
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            Demo coming soon
          </motion.div>
          <p className="text-[11px] text-slate/60 mt-1">
            Recording will appear here.
          </p>
        </div>
      )}

      {/* Hidden audio element */}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={demo.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onEnded={handleEnded}
          preload="metadata"
          className="hidden"
        />
      )}
    </motion.article>
  );
}

// ── Main section export ───────────────────────────────────────────────────────
export default function VoiceDemos() {
  // Only one card may play at a time — track by demo id or null
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayRequest = useCallback((id: string) => {
    setPlayingId(id);
  }, []);

  const handleStop = useCallback(() => {
    setPlayingId(null);
  }, []);

  // Memoised per-card handlers so references stay stable
  const handlers = useMemo(
    () =>
      voiceDemos.reduce(
        (acc, demo) => {
          acc[demo.id] = {
            onPlayRequest: () => handlePlayRequest(demo.id),
            onStop: handleStop,
          };
          return acc;
        },
        {} as Record<string, { onPlayRequest: () => void; onStop: () => void }>
      ),
    [handlePlayRequest, handleStop]
  );

  return (
    <Section
      id="demos"
      eyebrow="Live Demos"
      title={
        <>
          Hear <span className="text-gradient">{brand.agentName}</span> on a
          real call
        </>
      }
      intro={`Real conversations between ${brand.agentName} and patients — booking appointments, handling insurance questions, and triaging emergencies. Press play.`}
    >
      {/* Card grid */}
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {voiceDemos.map((demo) => (
          <CallCard
            key={demo.id}
            demo={demo}
            isPlaying={playingId === demo.id}
            onPlayRequest={handlers[demo.id].onPlayRequest}
            onStop={handlers[demo.id].onStop}
          />
        ))}
      </div>

      {/* CTA row */}
      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-slate text-sm">
            Want to hear {brand.agentName} handle{" "}
            <span className="text-paper font-medium">YOUR</span> front desk?
          </p>
          <Button href={contact.telLink} variant="outline" size="lg">
            <Phone className="h-4 w-4" />
            Call {contact.salesName} for a custom demo
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
