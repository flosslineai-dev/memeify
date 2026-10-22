import { ArrowDown, Check } from "lucide-react";
import { SparkMarks, Swoosh, XLogo } from "@/components/brand/Doodles";
import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { HeroStage } from "./HeroStage";

const POINTS = ["No forms or dashboards", "AI-generated coin art", "Preview before anything launches"];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-56 h-[760px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.2),transparent)]" />
        <div className="absolute -left-56 top-40 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.12),transparent)]" />
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-14 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="relative max-w-2xl">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5 text-[13px] font-medium text-ink-2 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-night">
                <Mascot animated={false} className="h-4 w-4" />
              </span>
              {siteConfig.tagline}
              <span className="h-3.5 w-px bg-slate-200" />
              <span className="text-brand">Prelaunch</span>
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-7 animate-rise text-balance text-[44px] font-semibold leading-[0.98] tracking-[-0.055em] text-ink [animation-delay:80ms] sm:text-6xl lg:text-[74px] xl:text-[80px]"
          >
            Your next meme coin starts with{" "}
            <span className="relative inline-block whitespace-nowrap">
              a comment.
              <Swoosh className="draw-in absolute -bottom-1.5 left-0 h-3 w-full sm:-bottom-3 sm:h-4" />
              <SparkMarks className="absolute -right-9 -top-4 h-8 w-8 sm:-right-12 sm:-top-5 sm:h-11 sm:w-11" />
            </span>
          </h1>

          <p className="mt-8 max-w-xl animate-rise text-pretty text-lg leading-relaxed text-muted [animation-delay:160ms] sm:text-xl">
            Turn social posts into meme coins. Just tag Memeify, choose a ticker, and let the internet do the rest.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="/#how-it-works">
              Explore How It Works
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </ButtonLink>
            <ButtonLink href={siteConfig.links.x} external variant="secondary" aria-label="Follow Memeify on X (opens in a new tab)">
              <XLogo />
              Follow on X
            </ButtonLink>
          </div>

          <ul className="mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-2.5 [animation-delay:320ms]">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[14px] text-ink-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <p aria-hidden className="absolute -bottom-16 right-6 hidden rotate-[-4deg] font-hand text-[26px] leading-none text-slate-500 xl:block">
            tag it. that’s it! ✦
          </p>
        </div>

        <div className="animate-rise [animation-delay:200ms]">
          <HeroStage />
        </div>
      </div>
    </section>
  );
}
