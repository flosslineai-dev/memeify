"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { PostArt } from "@/components/art/PostArt";
import { Mascot } from "@/components/brand/Mascot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CommentBubble, SocialPost } from "@/components/ui/Social";
import { TokenCard } from "@/components/ui/TokenCard";
import { cn } from "@/lib/cn";
import { EXAMPLES, THEMES } from "@/lib/samples";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Gallery() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ex = EXAMPLES[active];
  const theme = THEMES[ex.theme];

  const select = (i: number) => {
    const next = (i + EXAMPLES.length) % EXAMPLES.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") select(i + 1);
    else if (e.key === "ArrowLeft") select(i - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(EXAMPLES.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <section id="examples" aria-labelledby="gallery-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="gallery-title"
            align="left"
            eyebrow="From post to token"
            title="Every post has potential."
            description="A dog photo, a cat meme, a rocket. Same simple comment — three completely different coins."
          />

          <div
            role="tablist"
            aria-label="Choose an example"
            className="inline-flex w-full rounded-full bg-white p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/[0.07] sm:w-auto"
          >
            {EXAMPLES.map((e, i) => {
              const selected = i === active;
              return (
                <button
                  key={e.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${e.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${e.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(ev) => onKeyDown(ev, i)}
                  className={cn(
                    "relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-[14px] font-semibold transition-colors sm:flex-none sm:px-4",
                    selected ? "text-white" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="gallery-tab"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative h-6 w-6 overflow-hidden rounded-full ring-2 ring-white/80">
                    <PostArt kind={e.art} clean className="h-full w-full" />
                  </span>
                  <span className="relative">${e.ticker}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`panel-${ex.id}`}
          aria-labelledby={`tab-${ex.id}`}
          className="relative mt-12 overflow-hidden rounded-[40px] p-4 ring-1 ring-slate-900/[0.05] transition-[background] duration-700 sm:p-8 lg:p-12"
          style={{ background: `linear-gradient(135deg, ${theme.soft} 0%, #FFFFFF 50%, ${theme.soft} 100%)` }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50 fade-radial" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl transition-colors duration-700"
            style={{ background: theme.mid }}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={ex.id}
              className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mx-auto w-full max-w-[460px]"
              >
                <PanelLabel>Before · the post</PanelLabel>
                <SocialPost
                  author={ex.post.author}
                  time={ex.post.time}
                  text={ex.post.text}
                  art={ex.art}
                  stats={ex.post.stats}
                  aspect="aspect-[4/3]"
                />
                <CommentBubble
                  author={ex.comment.author}
                  text={ex.comment.text}
                  replyingTo={ex.post.author.handle}
                  className="relative z-10 -mt-3 ml-5 mr-8 sm:ml-10"
                  glow
                />
              </motion.div>

              <Connector />

              <motion.div
                initial={{ opacity: 0, x: 36, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                className="mx-auto w-full max-w-[440px]"
              >
                <PanelLabel>After · the token</PanelLabel>
                <TokenCard {...ex} layout="stack" shine />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PanelLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-muted">{children}</p>
  );
}

function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3 lg:flex-col">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-brand/50 lg:h-20 lg:w-px lg:bg-gradient-to-b" />
      <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-night shadow-[0_20px_40px_-12px_rgba(37,99,235,0.7)]">
        <span className="absolute -inset-2.5 animate-spin-slow rounded-full border border-dashed border-brand/40" />
        <Mascot mood="happy" className="h-11 w-11" />
      </div>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-brand/50 lg:h-20 lg:w-px lg:bg-gradient-to-t" />
    </div>
  );
}
