"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Heart, LoaderCircle } from "lucide-react";
import { useId, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import { CoinArt } from "@/components/art/CoinArt";
import { PostArt } from "@/components/art/PostArt";
import { Sparkle, XLogo } from "@/components/brand/Doodles";
import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ArtKind } from "@/lib/samples";
import { siteConfig } from "@/lib/site";

type FormState = "idle" | "invalid" | "loading" | "success" | "unavailable" | "error";

const MESSAGES: Record<Exclude<FormState, "idle" | "loading">, string> = {
  invalid: "Please enter a valid email address.",
  unavailable: `The waitlist isn’t open yet, so your email was not saved. Follow @${siteConfig.xHandle} on X to hear the moment it opens.`,
  success: "You’re on the list. We’ll be in touch before launch.",
  error: "Something went wrong and your email was not saved. Please try again.",
};

function useParallax(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return {
    x: useTransform(x, (v) => v * depth),
    y: useTransform(y, (v) => v * depth),
  };
}

export function FinalCTA() {
  const reduce = useReducedMotion() ?? false;
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const near = useParallax(px, py, 36);
  const mid = useParallax(px, py, 20);
  const far = useParallax(px, py, 10);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="join" aria-labelledby="join-title" className="relative px-3 py-16 sm:px-4 sm:py-24">
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] px-5 pb-16 pt-14 text-white sm:rounded-[48px] sm:px-10 sm:pb-20 sm:pt-16"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #4F86FF 0%, #2563EB 32%, #1E3FAE 66%, #2B1B7E 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-iris/50 blur-3xl" />

        {/* floating posts and coins */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div style={far} className="absolute left-[3%] top-[14%] hidden md:block">
            <FloatPost art="dog" likes="98" className="w-44 -rotate-[8deg] animate-float-slow" />
          </motion.div>
          <motion.div style={mid} className="absolute right-[4%] top-[10%] hidden md:block">
            <FloatPost art="cat" likes="9.8K" className="w-40 rotate-[7deg] animate-float-late" />
          </motion.div>
          <motion.div style={near} className="absolute bottom-[12%] left-[6%] hidden lg:block">
            <FloatPost art="space" likes="5.1K" className="w-36 rotate-[5deg] animate-float" />
          </motion.div>
          <motion.div style={near} className="absolute right-[9%] top-[48%] hidden sm:block">
            <CoinArt art="dog" theme="amber" ticker="DOGGO" className="h-20 w-20 rotate-12 animate-float-late drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]" />
          </motion.div>
          <motion.div style={mid} className="absolute bottom-[10%] right-[22%] hidden lg:block">
            <CoinArt art="space" theme="blue" ticker="MOON" className="h-14 w-14 -rotate-12 animate-float drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]" />
          </motion.div>
          <motion.div style={far} className="absolute left-[24%] top-[6%] hidden lg:block">
            <CoinArt art="cat" theme="violet" ticker="MEOW" className="h-12 w-12 rotate-6 animate-float-slow drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]" />
          </motion.div>
          <Sparkle className="absolute left-[16%] top-[52%] h-5 w-5 animate-twinkle text-white/80" />
          <Sparkle className="absolute right-[30%] top-[18%] h-4 w-4 animate-twinkle text-amber-200 [animation-delay:-1.3s]" />
          <Sparkle className="absolute bottom-[30%] right-[6%] h-3 w-3 animate-twinkle text-white/70 [animation-delay:-2.2s]" />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <MascotStage />

          <h2 id="join-title" className="mt-8 text-balance text-[40px] font-semibold leading-[1] tracking-[-0.05em] sm:text-6xl lg:text-[76px]">
            The internet creates moments. <span className="text-brand-200">Memeify makes them coins.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-brand-100/90 sm:text-xl">
            Be part of the next generation of social-native token creation.
          </p>

          <WaitlistForm />

          <ButtonLink
            href={siteConfig.links.x}
            external
            variant="ghost-light"
            className="mt-4"
            aria-label="Follow Memeify on X (opens in a new tab)"
          >
            <XLogo /> Follow on X
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function MascotStage() {
  const coins: { art: ArtKind; theme: "amber" | "violet" | "blue"; ticker: string }[] = [
    { art: "dog", theme: "amber", ticker: "DOGGO" },
    { art: "cat", theme: "violet", ticker: "MEOW" },
    { art: "space", theme: "blue", ticker: "MOON" },
  ];
  const [cheer, setCheer] = useState(false);

  return (
    <div
      className="relative flex h-[168px] w-[168px] items-center justify-center"
      onPointerEnter={() => setCheer(true)}
      onPointerLeave={() => setCheer(false)}
    >
      <div aria-hidden className="absolute inset-0 rounded-full border border-dashed border-white/30" />
      <div aria-hidden className="absolute inset-0 animate-spin-slow">
        {coins.map((c, i) => {
          const a = (i / coins.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={c.ticker}
              className="absolute"
              style={{ left: `${(50 + Math.cos(a) * 50).toFixed(2)}%`, top: `${(50 + Math.sin(a) * 50).toFixed(2)}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="block animate-[spin_24s_linear_infinite_reverse]">
                <CoinArt {...c} className="h-11 w-11 drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]" />
              </span>
            </span>
          );
        })}
      </div>
      <div aria-hidden className="absolute inset-6 rounded-full bg-white/20 blur-2xl" />
      <Mascot mood={cheer ? "wow" : "happy"} arms wave title="Sparky, the Memeify mascot, waving" className="relative h-28 w-28" />
      <AnimatePresence>
        {cheer && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            className="absolute -right-24 -top-1 whitespace-nowrap rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 font-hand text-[20px] leading-none text-ink shadow-lg"
          >
            psst… tag me!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatPost({ art, likes, className }: { art: ArtKind; likes: string; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white p-2 shadow-[0_24px_50px_-20px_rgba(10,20,60,0.6)]", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <PostArt kind={art} clean className="absolute inset-0 h-full w-full" />
      </div>
      <div className="flex items-center justify-between px-1 pb-0.5 pt-1.5 text-[11px] font-medium text-slate-500">
        <span className="font-semibold text-brand">@memeify</span>
        <span className="inline-flex items-center gap-1">
          <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> {likes}
        </span>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("invalid");
      return;
    }
    const endpoint = siteConfig.waitlistEndpoint;
    if (!endpoint) {
      setState("unavailable");
      return;
    }
    setState("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setState(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  };

  const message: ReactNode = state !== "idle" && state !== "loading" ? MESSAGES[state] : null;

  return (
    <form onSubmit={submit} noValidate className="mt-10 w-full max-w-lg">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 rounded-[28px] bg-white/10 p-2 ring-1 ring-white/25 backdrop-blur-md sm:flex-row sm:rounded-full">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "loading") setState("idle");
          }}
          aria-invalid={state === "invalid"}
          aria-describedby={`${id}-msg`}
          className="h-12 min-w-0 flex-1 rounded-full bg-white px-5 text-[16px] text-ink outline-none ring-brand-300 placeholder:text-slate-400 focus:ring-4"
        />
        <button type="submit" disabled={state === "loading"} className={cn(buttonClasses("primary", "lg"), "h-12 shrink-0")}>
          {state === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          Join the Waitlist
          {state !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        aria-live="polite"
        className={cn(
          "mx-auto mt-4 min-h-[1.5em] max-w-md text-[14px] leading-relaxed",
          state === "success" ? "text-emerald-200" : state === "invalid" || state === "error" ? "text-rose-200" : "text-brand-100",
        )}
      >
        {message}
      </p>
    </form>
  );
}
