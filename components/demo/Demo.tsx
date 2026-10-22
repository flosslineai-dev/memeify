"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, CircleCheck, FlaskConical, LoaderCircle, RotateCcw, Shuffle, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { PostArt } from "@/components/art/PostArt";
import { Mascot } from "@/components/brand/Mascot";
import { buttonClasses } from "@/components/ui/Button";
import { Avatar, MemeifyAvatar, SocialPost } from "@/components/ui/Social";
import { TokenCard, type TokenCardData } from "@/components/ui/TokenCard";
import { cn } from "@/lib/cn";
import {
  ART_DEFAULT_THEME,
  ART_LABELS,
  EXAMPLES,
  PEOPLE,
  TAGLINES,
  THEME_ORDER,
  parseComment,
  type ArtKind,
} from "@/lib/samples";
import { MENTION } from "@/lib/site";

const ARTS: ArtKind[] = ["space", "dog", "cat"];
const QUICK_TICKERS = ["MOON", "DOGGO", "MEOW", "WAGMI", "LOL"];
const STEP_MS = 420;

const ANALYSIS: Record<ArtKind, { subject: string; vibe: string; palette: string }> = {
  dog: { subject: "puppy close-up", vibe: "wholesome", palette: "chestnut · cream" },
  cat: { subject: "tabby + caption", vibe: "chaotic", palette: "tangerine · violet" },
  space: { subject: "rocket + moon", vibe: "hopeful", palette: "indigo · gold" },
};

const postFor = (art: ArtKind) => EXAMPLES.find((e) => e.art === art)!;

function buildLog(art: ArtKind, ticker: string) {
  const a = ANALYSIS[art];
  return [
    `Reading sample post by @${postFor(art).post.author.handle}`,
    `Mention found · ticker $${ticker}`,
    `Subject: ${a.subject} · vibe: ${a.vibe}`,
    `Palette: ${a.palette}`,
    "Composing coin artwork",
    "Writing name, symbol & description",
  ];
}

function buildToken(art: ArtKind, ticker: string, variant: number): TokenCardData {
  const base = ART_DEFAULT_THEME[art];
  const themes = [base, ...THEME_ORDER.filter((t) => t !== base)];
  return {
    name: ticker,
    ticker,
    art,
    theme: themes[variant % themes.length],
    tagline: TAGLINES[art][variant % TAGLINES[art].length],
  };
}

function withTicker(comment: string, ticker: string) {
  if (/\$[A-Za-z0-9]+/.test(comment)) return comment.replace(/\$[A-Za-z0-9]+/, `$${ticker}`);
  return `${comment.trimEnd()} $${ticker}`;
}

type Status = "idle" | "processing" | "ready";

/** A fully local simulation of the Memeify flow — no network, wallet or chain involved. */
export function Demo() {
  const inputId = useId();
  const hintId = useId();
  const reduce = useReducedMotion() ?? false;

  const [art, setArt] = useState<ArtKind>("space");
  const [comment, setComment] = useState(`${MENTION} make this $MOON`);
  const [status, setStatus] = useState<Status>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [logDone, setLogDone] = useState(0);
  const [variant, setVariant] = useState(0);
  const [result, setResult] = useState<{ art: ArtKind; ticker: string } | null>(null);
  const [touched, setTouched] = useState(false);

  const timers = useRef<number[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const { mention, ticker } = parseComment(comment);
  const valid = mention && !!ticker;
  const example = postFor(art);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const generate = () => {
    setTouched(true);
    if (!valid || !ticker || status === "processing") return;
    clearTimers();
    const lines = buildLog(art, ticker);
    setLog(lines);
    setLogDone(0);
    setStatus("processing");
    setVariant(0);
    setResult({ art, ticker });

    if (window.matchMedia("(max-width: 1023px)").matches) {
      outputRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }

    lines.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setLogDone(i + 1), STEP_MS * (i + 1)));
    });
    timers.current.push(window.setTimeout(() => setStatus("ready"), STEP_MS * (lines.length + 1)));
  };

  const reset = () => {
    clearTimers();
    setStatus("idle");
    setResult(null);
    setLog([]);
    setLogDone(0);
  };

  const token = result ? buildToken(result.art, result.ticker, variant) : null;
  const hint = !mention
    ? `Mention ${MENTION} so it knows you’re talking to it.`
    : !ticker
      ? "Add a ticker that starts with $, like $MOON (2–10 letters or numbers)."
      : null;

  return (
    <div className="overflow-clip rounded-[36px] bg-white ring-1 ring-slate-900/[0.06] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_50px_100px_-50px_rgba(15,23,42,0.4)]">
      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        {/* ------------------------------ input side ------------------------------ */}
        <form
          className="flex flex-col gap-7 p-5 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            generate();
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[12px] font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
              <FlaskConical className="h-3.5 w-3.5" />
              Simulation · runs entirely in your browser
            </span>
          </div>

          <fieldset>
            <legend className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <StepDot n={1} /> Pick a post
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {ARTS.map((a) => (
                <label
                  key={a}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl ring-1 transition-all duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                    art === a
                      ? "ring-2 ring-brand shadow-[0_10px_30px_-12px_rgba(37,99,235,0.6)]"
                      : "ring-slate-900/[0.08] hover:ring-slate-900/20",
                  )}
                >
                  <input
                    type="radio"
                    name="demo-post"
                    value={a}
                    checked={art === a}
                    onChange={() => setArt(a)}
                    disabled={status === "processing"}
                    className="sr-only"
                  />
                  <div className="relative aspect-[4/3]">
                    <PostArt kind={a} clean className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 pb-1.5 pt-5 text-[12px] font-medium text-white">
                    {ART_LABELS[a]}
                  </span>
                  {art === a && (
                    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </label>
              ))}
            </div>
          </fieldset>

          <SocialPost
            author={example.post.author}
            time={example.post.time}
            text={example.post.text}
            art={art}
            aspect="aspect-[16/11]"
            compact
            className="shadow-[0_1px_1px_rgba(15,23,42,0.04),0_20px_40px_-28px_rgba(15,23,42,0.35)]"
          />

          <div>
            <label htmlFor={inputId} className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <StepDot n={2} /> Reply with a mention and a ticker
            </label>
            <div
              className={cn(
                "mt-3 flex items-center gap-3 rounded-2xl bg-white p-2 pl-3 ring-1 transition-shadow focus-within:ring-2",
                touched && !valid ? "ring-rose-300 focus-within:ring-rose-400" : "ring-slate-900/10 focus-within:ring-brand",
              )}
            >
              <Avatar person={PEOPLE.you} size={30} className="ring-0" />
              <input
                id={inputId}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setTouched(true);
                }}
                maxLength={80}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={touched && !valid}
                aria-describedby={hintId}
                placeholder={`${MENTION} make this $MOON`}
                className="h-10 min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[12px] text-muted">Try:</span>
              {QUICK_TICKERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setComment((c) => withTicker(parseComment(c).mention ? c : `${MENTION} make this ${c}`.trim(), t));
                    setTouched(true);
                  }}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[12px] font-semibold ring-1 ring-inset transition-colors",
                    ticker === t
                      ? "bg-brand text-white ring-brand"
                      : "bg-brand-50 text-brand ring-brand-100 hover:bg-brand-100",
                  )}
                >
                  ${t}
                </button>
              ))}
            </div>

            <div id={hintId} aria-live="polite" className="mt-3 flex flex-wrap gap-2 text-[12px]">
              <Detect ok={mention} label={`${MENTION} mention`} />
              <Detect ok={!!ticker} label={ticker ? `Ticker $${ticker}` : "Ticker"} />
              {touched && hint && <p className="w-full text-rose-600">{hint}</p>}
            </div>
          </div>

          <div className="mt-auto">
            <button type="submit" disabled={status === "processing"} className={cn(buttonClasses("brand", "lg"), "w-full")}>
              {status === "processing" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Generating preview…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Preview
                </>
              )}
            </button>
            <p className="mt-3 text-center text-[12px] text-muted">
              Uses local sample data only. No wallet, blockchain transaction or API call.
            </p>
          </div>
        </form>

        {/* ------------------------------ output side ------------------------------ */}
        <div ref={outputRef} className="relative scroll-mt-24 overflow-clip bg-night text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-night fade-radial opacity-80" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-iris/30 blur-3xl" />

          <div className="relative flex min-h-[620px] flex-col p-4 sm:p-6 lg:sticky lg:top-20 lg:min-h-[min(780px,calc(100svh-5rem))]">
            <div className="relative flex items-center justify-between">
              <div aria-hidden className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="font-mono text-[11px] tracking-[0.08em] text-slate-500">MEMEIFY · PREVIEW</span>
              <span className="rounded-full bg-amber-300/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200 ring-1 ring-inset ring-amber-300/25">
                Simulated
              </span>
            </div>

            <p className="sr-only" aria-live="polite">
              {status === "processing" ? "Generating preview…" : status === "ready" && token ? `Preview ready for $${token.ticker}.` : ""}
            </p>

            <div className="relative flex flex-1 items-center justify-center py-6">
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="flex max-w-xs flex-col items-center text-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-brand/30 blur-2xl" />
                      <Mascot mood="wink" arms wave className="relative h-28 w-28" />
                    </div>
                    <p className="mt-6 text-xl font-semibold tracking-[-0.02em]">Your token preview appears here</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-400">
                      Pick a post, tag {MENTION} with a ticker, then hit Generate Preview.
                    </p>
                    <div aria-hidden className="mt-8 h-24 w-64 rounded-3xl border-2 border-dashed border-white/10" />
                  </motion.div>
                )}

                {status === "processing" && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                    className="w-full max-w-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative">
                        <span className="absolute -inset-1 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(96,144,250,0.9),transparent_60%)]" />
                        <MemeifyAvatar size={44} className="relative ring-night" />
                      </span>
                      <div>
                        <p className="font-semibold">Memeify is cooking up ${result?.ticker}</p>
                        <p className="text-[13px] text-slate-400">This usually takes a moment.</p>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-2.5 font-mono text-[13px]">
                      {log.map((line, i) => (
                        <motion.li
                          key={line}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: i <= logDone ? 1 : 0, x: i <= logDone ? 0 : -8 }}
                          className="flex items-center gap-2.5"
                        >
                          {i < logDone ? (
                            <CircleCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                          ) : (
                            <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-brand-300" />
                          )}
                          <span className={i < logDone ? "text-slate-300" : "text-white"}>{line}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-7 overflow-hidden rounded-[24px] bg-white/[0.04] p-4 ring-1 ring-white/10">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white/[0.05]">
                        <div className="absolute inset-y-0 left-0 w-1/2 animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] ring-1 ring-white/10" />
                      </div>
                      <div className="mt-4 h-5 w-32 rounded-full bg-white/10" />
                      <div className="mt-2 h-3 w-20 rounded-full bg-white/[0.07]" />
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand to-iris"
                          initial={{ width: "3%" }}
                          animate={{ width: `${Math.max(3, (logDone / Math.max(log.length, 1)) * 100)}%` }}
                          transition={{ duration: 0.35 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === "ready" && token && result && (
                  <motion.div
                    key={`ready-${variant}`}
                    initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                    transition={{ type: "spring", stiffness: 170, damping: 20 }}
                    className="w-full max-w-md"
                  >
                    <TokenCard
                      {...token}
                      layout="stack"
                      shine
                      meta={[
                        { label: "Name", value: token.name },
                        { label: "Symbol", value: `$${token.ticker}` },
                        { label: "Source", value: `@${postFor(result.art).post.author.handle}` },
                        { label: "Status", value: "Simulated preview" },
                      ]}
                    />
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVariant((v) => v + 1)}
                        className={cn(buttonClasses("ghost-light", "md"), "flex-1")}
                      >
                        <Shuffle className="h-4 w-4" /> Regenerate
                      </button>
                      <button type="button" onClick={reset} className={cn(buttonClasses("ghost-light", "md"), "flex-1")}>
                        <RotateCcw className="h-4 w-4" /> Start over
                      </button>
                    </div>
                    <p className="mt-3 text-center text-[12px] text-slate-500">
                      Simulation only — nothing was minted, saved or sent.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-white">
      {n}
    </span>
  );
}

function Detect({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ring-1 ring-inset transition-colors",
        ok ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-50 text-slate-500 ring-slate-200",
      )}
    >
      {ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
      {label}
    </span>
  );
}
