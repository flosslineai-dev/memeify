"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Sparkle } from "@/components/brand/Doodles";
import { RichText } from "@/components/ui/Social";
import { MiniTokenCard } from "@/components/ui/TokenCard";
import { MENTION } from "@/lib/site";
import { usePhaseLoop } from "@/lib/use-phase-loop";

// comment → spark → token card
const DURATIONS = [1500, 750, 3400] as const;

/** Step 3 artwork: a comment collapses into a spark and blooms into a token card. */
export function TransformArt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion() ?? false;
  const loopPhase = usePhaseLoop(DURATIONS, inView && !reduce);
  const phase = reduce ? 2 : loopPhase;

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(37,99,235,0.14),transparent)]" />
      <svg viewBox="0 0 300 220" className="absolute inset-0 h-full w-full text-brand/25" fill="none">
        <circle cx="150" cy="110" r="70" stroke="currentColor" strokeDasharray="3 7" />
        <circle cx="150" cy="110" r="104" stroke="currentColor" strokeDasharray="3 9" />
      </svg>

      <AnimatePresence mode="popLayout">
        {phase === 0 && (
          <motion.div
            key="comment"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[14px] text-ink shadow-[0_16px_40px_-16px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/[0.07]"
          >
            <RichText text={`${MENTION} make this $MOON`} />
          </motion.div>
        )}
        {phase === 1 && (
          <motion.div
            key="spark"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: [0.2, 1.2, 1], rotate: 90 }}
            exit={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 0.55 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#93b4fd_28%,#2563eb_62%,#4c1d95)] text-white shadow-[0_0_60px_10px_rgba(37,99,235,0.55)]"
          >
            <Sparkle className="h-7 w-7" />
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.6, rotate: -8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, rotate: -2, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 190, damping: 17 }}
          >
            <MiniTokenCard name="MOON" ticker="MOON" art="space" theme="blue" />
          </motion.div>
        )}
      </AnimatePresence>

      <Sparkle className="absolute left-[16%] top-[20%] h-4 w-4 animate-twinkle text-brand" />
      <Sparkle className="absolute bottom-[18%] right-[14%] h-3 w-3 animate-twinkle text-iris [animation-delay:-1.4s]" />
      <Sparkle className="absolute right-[22%] top-[14%] h-2.5 w-2.5 animate-twinkle text-amber-400 [animation-delay:-0.7s]" />
    </div>
  );
}
