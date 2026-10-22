"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ImageIcon, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, MemeifyAvatar, RichText } from "@/components/ui/Social";
import { cn } from "@/lib/cn";
import { PEOPLE } from "@/lib/samples";
import { MENTION } from "@/lib/site";
import { usePhaseLoop } from "@/lib/use-phase-loop";

const TEXT = `${MENTION} launch $PEPE`;
const TYPE_MS = 75;
// typing → detected → sent → rest
const DURATIONS = [TEXT.length * TYPE_MS + 300, 1700, 1300, 500] as const;

/** Step 2 artwork: a reply composer with @mention autocomplete and ticker detection. */
export function TagComposerArt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion() ?? false;
  const loopPhase = usePhaseLoop(DURATIONS, inView && !reduce);
  const [typed, setTyped] = useState(0);

  const phase = reduce ? 1 : loopPhase;
  const shown = reduce ? TEXT.length : phase === 0 ? typed : phase === 1 ? TEXT.length : 0;

  useEffect(() => {
    if (reduce) return;
    if (loopPhase === 0) {
      let i = 0;
      const id = window.setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= TEXT.length) window.clearInterval(id);
      }, TYPE_MS);
      return () => window.clearInterval(id);
    }
    if (loopPhase === 2) {
      const id = window.setTimeout(() => setTyped(0), 100);
      return () => window.clearTimeout(id);
    }
  }, [loopPhase, reduce]);

  const suggesting = phase === 0 && shown > 0 && shown <= MENTION.length;
  const detected = phase === 1;

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-dots opacity-60 fade-radial" />

      {/* sent comment flies up */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: -78, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-[13px] text-ink shadow-[0_14px_30px_-12px_rgba(37,99,235,0.6)] ring-1 ring-brand/30"
          >
            <RichText text={TEXT} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[290px]">
        <div
          className={cn(
            "rounded-2xl bg-white p-3.5 ring-1 transition-shadow duration-500",
            detected
              ? "shadow-[0_0_0_4px_rgba(37,99,235,0.12),0_20px_40px_-20px_rgba(37,99,235,0.6)] ring-brand/40"
              : "shadow-[0_20px_40px_-22px_rgba(15,23,42,0.4)] ring-slate-900/[0.07]",
          )}
        >
          <p className="text-[11px] text-slate-500">
            Replying to <span className="text-brand">@alexbuilds</span>
          </p>
          <div className="mt-2 flex items-start gap-2.5">
            <Avatar person={PEOPLE.maya} size={28} className="ring-0" />
            <p className="min-h-[24px] pt-0.5 text-[15px] text-ink">
              {shown === 0 && phase !== 0 ? (
                <span className="text-slate-400">Post your reply</span>
              ) : (
                <RichText text={TEXT.slice(0, shown)} />
              )}
              {phase === 0 && <span className="caret text-brand" />}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
            <div className="flex gap-2 text-brand-300">
              <ImageIcon className="h-4 w-4" />
              <Smile className="h-4 w-4" />
            </div>
            <span
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all duration-300",
                detected ? "scale-105 bg-brand shadow-[0_6px_16px_-6px_rgba(37,99,235,0.9)]" : "bg-brand/50",
              )}
            >
              Reply
            </span>
          </div>
        </div>

        {/* @mention autocomplete */}
        <AnimatePresence>
          {suggesting && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute left-8 top-[88px] z-10 w-[220px] rounded-xl bg-white p-1.5 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.08]"
            >
              <div className="flex items-center gap-2.5 rounded-lg bg-brand-50 p-2">
                <MemeifyAvatar size={30} className="ring-0" />
                <div className="min-w-0 leading-tight">
                  <p className="text-[13px] font-semibold text-ink">Memeify</p>
                  <p className="truncate text-[11px] text-slate-500">{MENTION} · posts → coins</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* detection chips */}
        <AnimatePresence>
          {detected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-11 right-0 flex gap-1.5"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-slate-900/[0.07]">
                <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} /> {MENTION}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.9)]">
                <Check className="h-3 w-3" strokeWidth={3} /> $PEPE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
