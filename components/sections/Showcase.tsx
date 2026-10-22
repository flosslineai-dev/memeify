"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type TargetAndTransition,
} from "motion/react";
import { Check, Heart, Rocket, ShieldCheck, Wallet } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { CoinArt } from "@/components/art/CoinArt";
import { Sparkle } from "@/components/brand/Doodles";
import { Mascot } from "@/components/brand/Mascot";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { CommentBubble, SocialPost } from "@/components/ui/Social";
import { TokenCard } from "@/components/ui/TokenCard";
import { cn } from "@/lib/cn";
import { EXAMPLES } from "@/lib/samples";

const EX = EXAMPLES[2];

const CHAPTERS = [
  { title: "Social content", body: "It starts with a moment worth sharing — a post the timeline can’t stop quoting." },
  { title: "@memeify mention", body: "Someone replies with @memeify and a ticker. That’s the whole request." },
  { title: "AI processing", body: "Memeify reads the post: the subject, the vibe and the colour palette." },
  { title: "Token artwork", body: "Original coin art is generated from the post itself — not a template." },
  { title: "Token preview", body: "Name, ticker, tagline and metadata, assembled into a preview to review." },
  { title: "Potential launch", body: "After authorization and confirmation, launch on Solana through a supported launch platform. Planned — not live yet." },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const T = { duration: 0.9, ease: EASE };

export function Showcase() {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(v * CHAPTERS.length))));
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * ((i + 0.5) / CHAPTERS.length), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="relative bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent opacity-[0.04]" />
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <Eyebrow tone="dark">Product film</Eyebrow>
          <h2 id="showcase-title" className="text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[64px]">
            From a moment <span className="text-slate-500">to a movement.</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-400">
            Scroll to watch a single post become a token — from the first laugh to a launch-ready preview.
          </p>
        </div>
      </div>

      <div ref={track} className="relative h-[460vh] lg:h-[540vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.22),transparent)]" />
            <div className="absolute inset-0 bg-grid-night fade-radial" />
          </div>

          <div className="relative mx-auto grid w-full max-w-7xl gap-5 px-4 pt-16 sm:px-6 lg:grid-cols-[340px_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-0">
            {/* chapters — desktop */}
            <nav aria-label="Showcase chapters" className="relative hidden lg:block">
              <div className="absolute bottom-3 left-[27px] top-3 w-px bg-white/10">
                <motion.div style={{ scaleY: bar }} className="h-full w-full origin-top bg-gradient-to-b from-brand-400 to-iris" />
              </div>
              <ol className="relative space-y-1">
                {CHAPTERS.map((c, i) => (
                  <li key={c.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === stage ? "step" : undefined}
                      className={cn(
                        "w-full rounded-2xl px-4 py-3 text-left transition-all duration-500",
                        i === stage ? "bg-white/[0.06] ring-1 ring-white/10" : "opacity-45 hover:opacity-80",
                      )}
                    >
                      <span className="flex items-center gap-3.5">
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] transition-colors duration-500",
                            i <= stage ? "bg-brand text-white" : "bg-night-3 text-slate-400 ring-1 ring-white/10",
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className="text-[16px] font-semibold tracking-[-0.02em]">{c.title}</span>
                      </span>
                      <AnimatePresence initial={false}>
                        {i === stage && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="block overflow-hidden"
                          >
                            <span className="block pl-[38px] pt-1.5 text-[14px] leading-relaxed text-slate-400">{c.body}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            {/* chapters — mobile */}
            <div className="lg:hidden" aria-live="polite">
              <div className="flex gap-1" aria-hidden>
                {CHAPTERS.map((c, i) => (
                  <span key={c.title} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= stage ? "bg-brand" : "bg-white/10")} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={stage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-3">
                  <p className="font-mono text-[12px] text-brand-300">
                    0{stage + 1} / 0{CHAPTERS.length}
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">{CHAPTERS[stage].title}</p>
                  <p className="mt-1 line-clamp-2 text-[14px] text-slate-400">{CHAPTERS[stage].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Stage stage={stage} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Stage({ stage: s }: { stage: number }) {
  const postState: TargetAndTransition =
    s <= 2
      ? { x: 0, scale: s === 1 ? 0.94 : 1, opacity: 1, filter: "blur(0px)" }
      : s === 3
        ? { x: "-58%", scale: 0.6, opacity: 0.25, filter: "blur(2px)" }
        : { x: "-80%", scale: 0.5, opacity: 0, filter: "blur(4px)" };

  return (
    <div aria-hidden className="relative mx-auto h-[min(620px,64svh)] w-full max-w-[680px] lg:h-[min(640px,78svh)]">
      {/* faint feed in the background */}
      <motion.div className="absolute inset-0" animate={{ opacity: s === 0 ? 1 : 0 }} transition={T}>
        <FeedGhost className="left-0 top-[8%] -rotate-6" />
        <FeedGhost className="right-0 top-[14%] rotate-6" />
        <FeedGhost className="bottom-[6%] left-[6%] rotate-3" />
        <FeedGhost className="bottom-[10%] right-[4%] -rotate-3" />
        <span className="absolute right-[16%] top-[44%] flex animate-float items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-rose-500 shadow-lg">
          <Heart className="h-3.5 w-3.5" fill="currentColor" /> 5.1K
        </span>
      </motion.div>

      {/* post + comment */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div layout animate={postState} transition={T} className="flex w-[290px] flex-col sm:w-[340px]">
          <SocialPost
            author={EX.post.author}
            time={EX.post.time}
            text={EX.post.text}
            art={EX.art}
            stats={s === 0 ? EX.post.stats : undefined}
            aspect="aspect-[4/3]"
            compact
            className="shadow-[0_40px_80px_-30px_rgba(37,99,235,0.6)]"
            imageOverlay={<ScanOverlay active={s === 2} />}
          />
          <AnimatePresence>
            {(s === 1 || s === 2) && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="relative z-10 -mt-6 ml-4 mr-6"
              >
                <CommentBubble
                  author={EX.comment.author}
                  text={EX.comment.text}
                  replyingTo={EX.post.author.handle}
                  glow
                />
                {s === 1 && (
                  <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white shadow-[0_0_0_6px_rgba(37,99,235,0.25)]">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
                    <Sparkle className="relative h-3.5 w-3.5" />
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* analysis chips */}
      <AnimatePresence>
        {s === 2 && (
          <motion.div className="absolute inset-0" initial="hidden" animate="show" exit="hidden">
            {[
              { text: "subject · rocket, moon", cls: "left-0 top-[12%] sm:-left-2" },
              { text: "vibe · hopeful", cls: "right-0 top-[22%] sm:-right-2" },
              { text: "palette", cls: "bottom-[22%] left-0 sm:-left-4", swatches: true },
              { text: "ticker · $MOON", cls: "bottom-[12%] right-0 sm:-right-4" },
            ].map((chip, i) => (
              <motion.span
                key={chip.text}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 8 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE } },
                }}
                className={cn(
                  "absolute z-20 inline-flex items-center gap-2 rounded-full bg-night-2/90 px-3 py-1.5 font-mono text-[11px] text-brand-200 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.8)] ring-1 ring-brand/40 backdrop-blur sm:text-[12px]",
                  chip.cls,
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
                {chip.text}
                {chip.swatches && (
                  <span className="flex gap-0.5">
                    {["#1A1F5C", "#40308A", "#F6E3A6", "#3B82F6"].map((c) => (
                      <span key={c} className="h-3 w-3 rounded-full ring-1 ring-white/30" style={{ background: c }} />
                    ))}
                  </span>
                )}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* coin artwork */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={
            s === 3
              ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
              : s < 3
                ? { opacity: 0, scale: 0.3, y: 0, rotate: -40 }
                : { opacity: 0, scale: 0.35, y: "-60%", rotate: 0 }
          }
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex items-center justify-center"
        >
          <svg viewBox="-100 -100 200 200" className="absolute h-[420px] w-[420px] animate-spin-slow opacity-[0.14] [mask-image:radial-gradient(closest-side,black_55%,transparent)] sm:h-[540px] sm:w-[540px]">
            {Array.from({ length: 28 }, (_, i) => (
              <path key={i} d="M0 0 L-2.6 -100 L2.6 -100 Z" fill="#BFD3FE" transform={`rotate(${(i * 360) / 28})`} />
            ))}
          </svg>
          <div className="absolute h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
          <CoinArt art="space" theme="blue" ticker="MOON" className="relative h-[220px] w-[220px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] sm:h-[260px] sm:w-[260px]" />
          <Sparkle className="absolute -left-6 top-4 h-6 w-6 animate-twinkle text-white" />
          <Sparkle className="absolute -right-4 bottom-8 h-4 w-4 animate-twinkle text-amber-200 [animation-delay:-1s]" />
          <Sparkle className="absolute -top-8 right-10 h-3 w-3 animate-twinkle text-brand-200 [animation-delay:-2s]" />
        </motion.div>
      </div>

      {/* token preview */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={
            s < 4
              ? { opacity: 0, y: 60, scale: 0.9, rotateX: 20 }
              : s === 4
                ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                : { opacity: 1, y: "-16%", scale: 0.86, rotateX: 0 }
          }
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformPerspective: 1200 }}
          className="w-[290px] sm:w-[340px]"
        >
          <TokenCard {...EX} layout="stack" shine={s >= 4} />
        </motion.div>
      </div>

      {/* launch confirmation */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <motion.div
          initial={false}
          animate={s === 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative w-[300px] sm:w-[380px]"
        >
          <Mascot mood="happy" arms wave className="absolute -top-14 right-3 h-16 w-16" />
          <div className="rounded-[24px] bg-night-2/95 p-4 shadow-[0_-20px_60px_-20px_rgba(37,99,235,0.6)] ring-1 ring-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-semibold">Ready to launch $MOON</p>
              <span className="rounded-full bg-amber-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200 ring-1 ring-inset ring-amber-300/25">
                Illustrative
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-[12px] sm:text-[13px]">
              <LaunchRow icon={<Check className="h-3.5 w-3.5" />} label="Artwork, name & ticker reviewed" />
              <LaunchRow icon={<Wallet className="h-3.5 w-3.5" />} label="Wallet authorization required" />
              <LaunchRow
                icon={<span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]" />}
                label="Solana · via a supported launch platform (planned)"
              />
            </ul>
            <span className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-brand text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(37,99,235,0.9)]">
              <Rocket className="h-4 w-4" /> Confirm launch
            </span>
            <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="h-3 w-3" /> Nothing launches without your confirmation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LaunchRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-slate-300">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-brand-300 ring-1 ring-white/10">
        {icon}
      </span>
      {label}
    </li>
  );
}

function ScanOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[#0B1120]/30" />
          <div className="absolute inset-0 bg-grid-night opacity-80" />
          <div className="absolute inset-x-0 top-0 h-full animate-[scan_2.2s_ease-in-out_infinite] bg-[linear-gradient(180deg,transparent_0%,transparent_45%,rgba(96,144,250,0.7)_50%,transparent_51%)]" />
          <motion.span
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute left-[54%] top-[6%] h-[44%] w-[38%] rounded-lg border-2 border-brand-300"
          >
            <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-brand px-1.5 font-mono text-[10px] font-bold">moon · 0.99</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute left-[22%] top-[40%] h-[36%] w-[28%] rounded-lg border-2 border-amber-300"
          >
            <span className="absolute -bottom-5 left-0 whitespace-nowrap rounded bg-amber-400 px-1.5 font-mono text-[10px] font-bold text-night">rocket · 0.97</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FeedGhost({ className }: { className?: string }) {
  return (
    <div className={cn("absolute hidden w-40 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10 backdrop-blur-sm sm:block", className)}>
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-white/15" />
        <span className="h-1.5 w-14 rounded-full bg-white/15" />
      </div>
      <div className="mt-2.5 h-14 rounded-xl bg-white/[0.07]" />
      <div className="mt-2 h-1.5 w-20 rounded-full bg-white/10" />
    </div>
  );
}
