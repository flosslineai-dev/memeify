"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Circle, CircleCheck, LoaderCircle, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CoinArt } from "@/components/art/CoinArt";
import { Sparkle } from "@/components/brand/Doodles";
import { Mascot } from "@/components/brand/Mascot";
import { CommentBubble, MemeifyAvatar, SocialPost } from "@/components/ui/Social";
import { GlowShell, TokenCard } from "@/components/ui/TokenCard";
import { cn } from "@/lib/cn";
import { EXAMPLES } from "@/lib/samples";
import { MENTION } from "@/lib/site";

const EX = EXAMPLES[0];
const COMMENT = EX.comment.text;
const STEPS = ["Reading the post", "Generating artwork", "Writing token metadata", "Building the preview"];

type Phase = 0 | 1 | 2 | 3 | 4;

/** The hero product film: post → comment → processing → token card, on a loop. */
export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion() ?? false;

  const [phase, setPhase] = useState<Phase>(0);
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  // With reduced motion we show the finished state until the visitor presses replay.
  const showFinal = reduce && cycle === 0;
  const p: Phase = showFinal ? 4 : phase;
  const shownTyped = showFinal ? COMMENT.length : typed;
  const shownStep = showFinal ? STEPS.length : step;

  useEffect(() => {
    if (showFinal || paused || !inView) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    at(0, () => {
      setPhase(0);
      setTyped(0);
      setStep(0);
    });
    at(700, () => setPhase(1));
    for (let i = 1; i <= COMMENT.length; i++) at(800 + i * 55, () => setTyped(i));
    at(2550, () => setPhase(2));
    at(3300, () => setPhase(3));
    STEPS.forEach((_, i) => at(3900 + i * 600, () => setStep(i + 1)));
    at(6200, () => setPhase(4));
    if (!reduce) at(11800, () => setCycle((c) => c + 1));

    return () => timers.forEach(clearTimeout);
  }, [showFinal, paused, inView, cycle, reduce]);

  const { scrollY } = useScroll();
  const floatA = useTransform(scrollY, [0, 600], [0, -70]);
  const floatB = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px] pb-2">
      <p className="sr-only">
        Animated example: Maya replies to Alex’s dog photo with “{COMMENT}”, and Memeify turns
        the post into a DOGGO token preview with the status Preview Ready.
      </p>

      {/* ambient glow + floating coins */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent)]" />
      <motion.div aria-hidden style={{ y: floatA }} className="absolute -left-14 top-[30%] hidden lg:block">
        <CoinArt art="cat" theme="violet" ticker="MEOW" className="h-16 w-16 -rotate-12 animate-float drop-shadow-[0_14px_20px_rgba(76,29,149,0.35)]" />
      </motion.div>
      <motion.div aria-hidden style={{ y: floatB }} className="absolute -right-8 -top-6 hidden lg:block">
        <CoinArt art="space" theme="blue" ticker="MOON" className="h-12 w-12 rotate-12 animate-float-late drop-shadow-[0_14px_20px_rgba(30,64,175,0.35)]" />
      </motion.div>

      {/* the post */}
      <motion.div
        className="relative ml-auto w-[93%] origin-top-right"
        animate={{ scale: p >= 3 ? 0.975 : 1, opacity: p >= 4 ? 0.92 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <SocialPost
          author={EX.post.author}
          time={EX.post.time}
          text={EX.post.text}
          art={EX.art}
          stats={EX.post.stats}
          aspect="aspect-[2/1]"
          className="sm:rotate-[1.25deg]"
        />
      </motion.div>

      {/* the comment */}
      <div className="relative z-10 -mt-8 min-h-[106px] w-[90%] sm:min-h-[86px] sm:w-[78%]">
        <AnimatePresence>
          {p >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <CommentBubble
                author={EX.comment.author}
                text={COMMENT}
                typed={shownTyped}
                caret={p === 1}
                replyingTo={EX.post.author.handle}
                glow={p === 2 || p === 3}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* hand-drawn connector */}
      <div aria-hidden className="relative h-0">
        <svg viewBox="0 0 60 110" className="absolute -top-3 left-0 h-[96px] w-[52px] text-brand" fill="none">
          <motion.path
            d="M30 4 C2 34 4 78 46 100"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: p >= 2 ? 1 : 0, opacity: p >= 2 ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          <motion.path
            d="M30 98 L47 101 L42 85"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ opacity: p >= 2 ? 1 : 0 }}
            transition={{ delay: p >= 2 ? 0.55 : 0, duration: 0.2 }}
          />
        </svg>
      </div>

      {/* the result slot */}
      <div className="relative ml-auto mt-3 h-[218px] w-[92%]" style={{ perspective: 1200 }}>
        <AnimatePresence initial={false}>
          {p < 3 && (
            <motion.div
              key="wait"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
            >
              <WaitingSlot detected={p === 2} />
            </motion.div>
          )}
          {p === 3 && (
            <motion.div
              key="processing"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)", transition: { duration: 0.35 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProcessingPanel step={shownStep} />
            </motion.div>
          )}
          {p === 4 && (
            <motion.div
              key="card"
              className="absolute inset-0"
              initial={{ opacity: 0, y: 26, scale: 0.9, rotateX: 18 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <TokenCard {...EX} layout="row" shine className="h-full" />
              {!showFinal && <Burst />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => (reduce ? setCycle((c) => c + 1) : setPaused((v) => !v))}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:bg-white hover:text-ink"
        >
          {reduce ? (
            <RotateCcw className="h-3.5 w-3.5" />
          ) : paused ? (
            <Play className="h-3.5 w-3.5" />
          ) : (
            <Pause className="h-3.5 w-3.5" />
          )}
          {reduce ? "Replay animation" : paused ? "Play animation" : "Pause animation"}
        </button>
      </div>
    </div>
  );
}

function WaitingSlot({ detected }: { detected: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-3 rounded-[28px] border-2 border-dashed px-6 text-center transition-colors duration-500",
        detected ? "border-brand/50 bg-brand-50/80" : "border-slate-300/80 bg-white/50",
      )}
    >
      <Mascot mood={detected ? "wow" : "wink"} className="h-14 w-14" />
      <div>
        <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
          {detected ? "Mention detected" : "Waiting for a mention…"}
        </p>
        <p className="mt-0.5 text-[13px] text-muted">
          {detected ? (
            <>
              Ticker <span className="font-semibold text-brand">$DOGGO</span> · warming up
            </>
          ) : (
            `Tag ${MENTION} with a $TICKER`
          )}
        </p>
      </div>
    </div>
  );
}

function ProcessingPanel({ step }: { step: number }) {
  const pct = Math.round((step / STEPS.length) * 100);
  return (
    <GlowShell className="h-full">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-brand opacity-50 blur-3xl" />
      <div className="relative flex h-full flex-col p-4">
        <div className="flex items-center gap-3">
          <span className="relative">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
            <MemeifyAvatar size={38} className="relative ring-night" />
          </span>
          <div className="leading-tight">
            <p className="text-[14px] font-semibold">Memeify is cooking</p>
            <p className="font-mono text-[11px] text-slate-400">$DOGGO · from @alexbuilds</p>
          </div>
          <span className="ml-auto font-mono text-[12px] tabular-nums text-brand-300">{pct}%</span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s} className="flex items-center gap-2 text-[13px]">
                {done ? (
                  <CircleCheck className="h-4 w-4 text-emerald-400" />
                ) : active ? (
                  <LoaderCircle className="h-4 w-4 animate-spin text-brand-300" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-600" />
                )}
                <span className={cn(done ? "text-slate-300" : active ? "text-white" : "text-slate-500")}>{s}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand to-iris"
            initial={{ width: "4%" }}
            animate={{ width: `${Math.max(pct, 4)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </GlowShell>
  );
}

const BURST = [
  [-120, -70],
  [-60, -110],
  [20, -120],
  [110, -80],
  [140, -10],
  [-140, 10],
  [80, 60],
  [-90, 70],
];

function Burst() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-[18%] top-[45%]">
      {BURST.map(([x, y], i) => (
        <motion.span
          key={i}
          className={cn("absolute", i % 2 ? "text-brand-300" : "text-amber-300")}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x, y, scale: [0, 1.2, 0.6], opacity: [1, 1, 0] }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.08 + i * 0.02 }}
        >
          <Sparkle className={i % 3 ? "h-3 w-3" : "h-5 w-5"} />
        </motion.span>
      ))}
    </div>
  );
}
