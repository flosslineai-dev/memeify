"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Flame, Heart, Laugh } from "lucide-react";
import { useRef } from "react";
import { CoinArt } from "@/components/art/CoinArt";
import { PostArt } from "@/components/art/PostArt";
import { Sparkle } from "@/components/brand/Doodles";
import { Avatar, MemeifyAvatar, RichText } from "@/components/ui/Social";
import { cn } from "@/lib/cn";
import { PEOPLE } from "@/lib/samples";
import { MENTION } from "@/lib/site";
import { usePhaseLoop } from "@/lib/use-phase-loop";

/* -------------------------------------------------------------------------- */
/*  Social native — a conversation where the coin is born                      */
/* -------------------------------------------------------------------------- */

const CHAT_DURATIONS = [900, 1100, 1300, 2800, 600] as const;

export function SocialNativeArt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion() ?? false;
  const loop = usePhaseLoop(CHAT_DURATIONS, inView && !reduce);
  const shown = reduce ? 3 : loop === 4 ? 0 : loop;

  const bubble = "max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm";

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 flex flex-col justify-end gap-2 p-5 pb-6">
      <div className="absolute right-4 top-4 flex gap-1.5">
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-2 ring-1 ring-slate-900/[0.07]">
          X · planned
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-2 ring-1 ring-slate-900/[0.07]">
          TikTok · planned
        </span>
      </div>
      <AnimatePresence>
        {shown >= 1 && (
          <motion.div key="a" layout initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
            <Avatar person={PEOPLE.sam} size={26} className="ring-0" />
            <p className={cn(bubble, "rounded-bl-md bg-white text-ink ring-1 ring-slate-900/[0.06]")}>this cat is sending me 😭</p>
          </motion.div>
        )}
        {shown >= 2 && (
          <motion.div key="b" layout initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
            <Avatar person={PEOPLE.maya} size={26} className="ring-0" />
            <p className={cn(bubble, "rounded-bl-md bg-white text-ink ring-2 ring-brand/30")}>
              <RichText text={`${MENTION} make this $MEOW`} />
            </p>
          </motion.div>
        )}
        {shown >= 3 && (
          <motion.div key="c" layout initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="flex items-end justify-end gap-2">
            <div className={cn(bubble, "flex items-center gap-2.5 rounded-br-md bg-night text-white")}>
              <CoinArt art="cat" theme="violet" ticker="MEOW" className="h-8 w-8" />
              <span>
                <span className="font-semibold">$MEOW</span> preview ready <Sparkle className="inline h-3 w-3 text-brand-300" />
              </span>
            </div>
            <MemeifyAvatar size={26} className="ring-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  AI creativity — post in, coin art out                                      */
/* -------------------------------------------------------------------------- */

const PALETTE = ["#F7A75A", "#E8893A", "#4B3A91", "#ECFA92", "#FFF3E2"];

export function CreativityArt() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center gap-4 px-6">
      <div className="relative">
        <div className="relative h-[132px] w-[132px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/10">
          <PostArt kind="cat" clean className="h-full w-full" />
          <div className="absolute inset-x-0 top-0 h-full animate-[scan_2.6s_ease-in-out_infinite] bg-[linear-gradient(180deg,transparent_0%,rgba(96,144,250,0.0)_40%,rgba(96,144,250,0.55)_50%,transparent_51%)]" />
          <div className="absolute inset-0 bg-grid-night opacity-60" />
          <span className="absolute left-[18%] top-[30%] h-[42%] w-[64%] rounded-md border-2 border-brand-300/90" />
          <span className="absolute left-[18%] top-[22%] rounded bg-brand px-1 font-mono text-[8px] font-bold text-white">cat · 0.98</span>
        </div>
        <div className="mt-3 flex justify-center gap-1">
          {PALETTE.map((c) => (
            <span key={c} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 text-brand">
        <Sparkle className="h-4 w-4 animate-twinkle" />
        <ArrowRight className="h-5 w-5" />
      </div>

      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-iris/30 blur-2xl" />
        <CoinArt art="cat" theme="violet" ticker="MEOW" className="relative h-[136px] w-[136px] animate-float drop-shadow-[0_18px_24px_rgba(76,29,149,0.35)]" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Simple by design — the old way vs one comment                              */
/* -------------------------------------------------------------------------- */

export function SimpleArt() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center gap-4 px-5">
      <div className="relative w-[44%] max-w-[170px] -rotate-3 rounded-2xl bg-white p-3 opacity-80 shadow-sm ring-1 ring-slate-900/[0.06]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">The usual way</p>
        <div className="mt-2 space-y-1.5">
          {[70, 90, 55, 80, 65, 85].map((w, i) => (
            <div key={i} className="rounded-md bg-slate-100 p-1.5">
              <div className="h-1.5 rounded-full bg-slate-300/80" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[115%] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] rounded-full bg-rose-400/80" />
      </div>

      <div className="relative w-[52%] max-w-[210px] rotate-2">
        <p className="mb-2 text-center font-hand text-[22px] leading-none text-brand">just this →</p>
        <div className="rounded-2xl bg-white p-3 shadow-[0_18px_40px_-18px_rgba(37,99,235,0.6)] ring-2 ring-brand/30">
          <div className="flex items-center gap-2">
            <Avatar person={PEOPLE.leo} size={24} className="ring-0" />
            <p className="text-[13px] text-ink">
              <RichText text={`${MENTION} $LOL`} />
            </p>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              <Check className="h-3 w-3" strokeWidth={3} /> 1 step
            </span>
            <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Community driven — everyone orbiting the same moment                       */
/* -------------------------------------------------------------------------- */

const ORBIT = [PEOPLE.alex, PEOPLE.maya, PEOPLE.nina, PEOPLE.sam, PEOPLE.leo, PEOPLE.orbit];
const REACTIONS = [
  { Icon: Heart, x: "18%", delay: "0s", color: "text-rose-500" },
  { Icon: Flame, x: "78%", delay: "-1.2s", color: "text-orange-500" },
  { Icon: Laugh, x: "30%", delay: "-2.1s", color: "text-amber-500" },
  { Icon: Heart, x: "66%", delay: "-2.9s", color: "text-brand" },
];

export function CommunityArt() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative h-[210px] w-[210px]">
        <div className="absolute inset-0 rounded-full border border-dashed border-brand/30" />
        <div className="absolute inset-[34px] rounded-full border border-dashed border-brand/20" />
        <div className="absolute inset-0 animate-spin-slow">
          {ORBIT.map((p, i) => {
            const a = (i / ORBIT.length) * Math.PI * 2;
            return (
              <span
                key={p.handle}
                className="absolute"
                style={{ left: `${(50 + Math.cos(a) * 50).toFixed(2)}%`, top: `${(50 + Math.sin(a) * 50).toFixed(2)}%`, transform: "translate(-50%, -50%)" }}
              >
                <span className="block animate-[spin_24s_linear_infinite_reverse]">
                  <Avatar person={p} size={34} className="shadow-md" />
                </span>
              </span>
            );
          })}
        </div>
        <div className="absolute inset-0 m-auto h-[96px] w-[96px]">
          <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-xl" />
          <CoinArt art="dog" theme="amber" ticker="DOGGO" className="relative h-full w-full" />
        </div>
      </div>
      {REACTIONS.map(({ Icon, x, delay, color }, i) => (
        <span
          key={i}
          className="absolute bottom-2 animate-[rise-fade_3.6s_ease-out_infinite]"
          style={{ left: x, animationDelay: delay }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-900/[0.05]">
            <Icon className={cn("h-4 w-4", color)} fill="currentColor" />
          </span>
        </span>
      ))}
    </div>
  );
}
