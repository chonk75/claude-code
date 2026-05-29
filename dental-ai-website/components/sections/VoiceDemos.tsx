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
import Pill from "@/components/ui/Pill";
import WaveformPrimitive from "@/components/ui/Waveform";

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

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
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
        "card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden",
        "border border-line transition-all duration-300 group",
        "hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(22,58,34,0.14)]",
        isPlaying && "border-forest/40 shadow-[0_8px_32px_-8px_rgba(22,58,34,0.18)]"
      )}
    >
      {/* Subtle mint ambient when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-2xl bg-mint opacity-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* ── Top row: avatar + clinic info + status pill ───────────────── */}
      <div className="flex items-center gap-3">
        {/* Forest-green round avatar with lime icon */}
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "h-11 w-11 rounded-full grid place-items-center bg-forest",
              "shadow-[0_4px_16px_-4px_rgba(22,58,34,0.40)]"
            )}
          >
            {isPlaying ? (
              <Mic className="h-4.5 w-4.5 text-lime" />
            ) : (
              <Phone className="h-4.5 w-4.5 text-lime" />
            )}
          </div>
          {/* Pulse ring when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full ring-2 ring-forest/30 animate-pulse" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink leading-snug truncate">
            {demo.clinic}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sage mt-0.5">
            INCOMING · {demo.duration}
          </p>
        </div>

        {/* Status pill */}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="live"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
            >
              <Pill tone="mint" mono>
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot inline-block" />
                LIVE
              </Pill>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
            >
              <Pill tone="outline" mono>READY</Pill>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Title & description ───────────────────────────────────────── */}
      <div>
        <h3 className="font-display text-base font-bold text-ink leading-snug">
          {demo.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed">
          {demo.description}
        </p>
      </div>

      {/* ── Waveform — use the primitive, recolored to forest/lime ──────── */}
      <div className="h-12 flex items-center">
        <WaveformPrimitive
          bars={32}
          active={isPlaying && hasAudio}
          className="w-full justify-center"
          barClassName={cn(
            isPlaying && hasAudio
              ? "bg-lime"
              : "bg-forest/30"
          )}
        />
      </div>

      {/* ── Player controls ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5">
        {/* Progress bar */}
        <div
          role={hasAudio ? "slider" : undefined}
          aria-label="Seek"
          aria-valuenow={hasAudio ? Math.round(progress * 100) : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn(
            "h-1 w-full rounded-full bg-line relative overflow-hidden",
            hasAudio ? "cursor-pointer" : "cursor-default"
          )}
          onClick={handleScrub}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-lime"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Time + play button row */}
        <div className="flex items-center gap-3">
          {/* Timecode */}
          <span className="font-mono text-[10px] uppercase tracking-wider text-sage tabular-nums">
            {hasAudio ? `${displayCurrent} / ${displayDuration}` : `0:00 / ${demo.duration}`}
          </span>

          {/* Mono data tag */}
          <span className="font-mono text-[10px] uppercase tracking-wider text-sage/60">
            status = {hasAudio ? "ready" : "pending"}
          </span>

          {/* Play / pause button */}
          <button
            onClick={handleToggle}
            disabled={!hasAudio || isLoading}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={cn(
              "ml-auto relative h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
              "transition-all duration-300",
              hasAudio
                ? cn(
                    "bg-forest text-white",
                    "shadow-[0_4px_16px_-4px_rgba(22,58,34,0.50)]",
                    "hover:bg-lime hover:text-forest hover:shadow-[0_4px_16px_-4px_rgba(124,223,19,0.60)]",
                    "active:scale-95"
                  )
                : "bg-line text-muted cursor-not-allowed"
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

      {/* ── Bottom detail row ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2 border-t border-line-soft">
        <span className="font-mono text-[10px] uppercase tracking-widest text-sage/50">
          Reva AI
        </span>
        <Pill tone="gray" mono>
          {brand.agentName}
        </Pill>
      </div>

      {/* ── "Demo coming soon" overlay ────────────────────────────────── */}
      {!hasAudio && (
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2.5 bg-surface/80 backdrop-blur-[2px]">
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pill tone="outline" mono>
              <span className="h-1.5 w-1.5 rounded-full bg-sage/60 inline-block" />
              DEMO COMING SOON
            </Pill>
          </motion.div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted/50">
            Recording will appear here
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
      index="05"
      label="LIVE DEMOS"
      title={
        <>
          Hear <span className="text-lime-ink">{brand.agentName}</span> on a
          real call.
        </>
      }
      intro={`Real conversations between ${brand.agentName} and patients — booking appointments, handling insurance questions, and triaging emergencies. Press play.`}
    >
      {/* Card grid */}
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
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
          <p className="text-muted text-sm">
            Want to hear {brand.agentName} handle{" "}
            <span className="text-ink font-semibold">YOUR</span> front desk?
          </p>
          <Button href={contact.telLink} variant="primary" size="lg" arrow>
            <Phone className="h-4 w-4" />
            Call {contact.salesName} for a custom demo
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
