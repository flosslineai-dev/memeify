import { Globe, Send } from "lucide-react";
import type { ReactNode } from "react";
import { CoinArt } from "@/components/art/CoinArt";
import { ART_DESCRIPTIONS, PostArt } from "@/components/art/PostArt";
import { Sparkle, XLogo } from "@/components/brand/Doodles";
import { Mascot } from "@/components/brand/Mascot";
import { cn } from "@/lib/cn";
import { THEMES, type ArtKind, type ThemeKey } from "@/lib/samples";

export type TokenCardData = {
  name: string;
  ticker: string;
  tagline: string;
  art: ArtKind;
  theme: ThemeKey;
};

type TokenCardProps = TokenCardData & {
  status?: string;
  layout?: "row" | "stack";
  shine?: boolean;
  className?: string;
  meta?: { label: string; value: ReactNode }[];
  footer?: ReactNode;
  showLinks?: boolean;
};

export function StatusPill({ children, tone = "ready" }: { children: ReactNode; tone?: "ready" | "pending" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ring-1 ring-inset",
        tone === "ready"
          ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25"
          : "bg-amber-400/10 text-amber-200 ring-amber-300/25",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full animate-pulse-soft",
          tone === "ready" ? "bg-emerald-400" : "bg-amber-300",
        )}
      />
      {children}
    </span>
  );
}

function LinkChips({ compact }: { compact?: boolean }) {
  const chip = cn(
    "inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] font-medium text-slate-200 ring-1 ring-inset ring-white/10",
    compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[12px]",
  );
  return (
    <div aria-hidden className="flex flex-wrap items-center gap-1.5">
      <span className={chip}>
        <Globe className="h-3.5 w-3.5" />
        Website
      </span>
      <span className={chip}>
        <XLogo className="h-3 w-3" />
        Twitter
      </span>
      <span className={chip}>
        <Send className="h-3.5 w-3.5" />
        Telegram
      </span>
    </div>
  );
}

function Rays({ className }: { className?: string }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden className={className}>
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d="M0 0 L-9 -140 L9 -140 Z" fill="#FFFFFF" transform={`rotate(${(i * 360) / 14})`} />
      ))}
    </svg>
  );
}

/** Gradient-bordered shell shared by every dark token surface. */
export function GlowShell({
  children,
  className,
  glow = "rgba(37,99,235,0.55)",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[28px] bg-[linear-gradient(140deg,rgba(124,165,255,0.85),rgba(255,255,255,0.07)_38%,rgba(255,255,255,0.05)_62%,rgba(139,92,246,0.7))] p-px",
        className,
      )}
      style={{ boxShadow: `0 30px 80px -28px ${glow}, 0 0 0 1px rgba(11,17,32,0.04)` }}
    >
      <div className="relative h-full overflow-hidden rounded-[27px] bg-night text-white">{children}</div>
    </div>
  );
}

/** The signature Memeify output: a premium meme coin preview card. */
export function TokenCard({
  name,
  ticker,
  tagline,
  art,
  theme,
  status = "Preview Ready",
  layout = "row",
  shine = false,
  className,
  meta,
  footer,
  showLinks = true,
}: TokenCardProps) {
  const t = THEMES[theme];

  if (layout === "row") {
    return (
      <GlowShell className={className} glow={t.glow}>
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full opacity-70 blur-3xl" style={{ background: t.mid }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-night fade-radial opacity-70" />
        {shine && (
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/[0.13] to-transparent" />
        )}
        <div className="relative flex h-full flex-col justify-between gap-3 p-4">
          <div className="flex gap-4">
            <div className="relative w-[32%] max-w-[140px] shrink-0">
              <div className="aspect-square overflow-hidden rounded-2xl ring-1 ring-white/15">
                <PostArt kind={art} clean label={ART_DESCRIPTIONS[art]} className="h-full w-full" />
              </div>
              <CoinArt art={art} theme={theme} ticker={ticker} className="absolute -bottom-2 -right-3 h-11 w-11 drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5 sm:pr-10">
              <StatusPill>{status}</StatusPill>
              <h3 className="mt-2 truncate text-[30px] font-bold leading-none tracking-[-0.045em] sm:text-[34px]">{name}</h3>
              <p className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-slate-400">${ticker}</p>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-slate-300">{tagline}</p>
            </div>
            <Mascot animated={false} className="absolute right-3 top-3 hidden h-9 w-9 rotate-12 sm:block" />
          </div>
          {showLinks && <LinkChips compact />}
        </div>
      </GlowShell>
    );
  }

  return (
    <GlowShell className={className} glow={t.glow}>
      {shine && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      )}
      <div className="relative p-4 sm:p-5">
        <div
          className="relative aspect-[16/11] overflow-hidden rounded-[20px] ring-1 ring-white/10"
          style={{ background: `radial-gradient(120% 90% at 50% 40%, ${t.mid} 0%, ${t.deep} 48%, #0B1120 100%)` }}
        >
          <Rays className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.09]" />
          <div aria-hidden className="absolute inset-0 bg-grid-night opacity-50 fade-radial" />
          <Sparkle className="absolute left-[14%] top-[18%] h-4 w-4 animate-twinkle text-white" />
          <Sparkle className="absolute right-[18%] top-[28%] h-3 w-3 animate-twinkle text-white [animation-delay:-1.2s]" />
          <Sparkle className="absolute bottom-[18%] left-[22%] h-3 w-3 animate-twinkle text-white [animation-delay:-2s]" />
          <CoinArt
            art={art}
            theme={theme}
            ticker={ticker}
            label={`${name} coin artwork`}
            className="absolute left-1/2 top-1/2 h-[68%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)]"
          />
          <div className="absolute left-3 top-3">
            <StatusPill>{status}</StatusPill>
          </div>
          <Mascot animated={false} className="absolute right-3 top-3 h-9 w-9 rotate-12" />
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[34px] font-bold leading-none tracking-[-0.045em] sm:text-[40px]">{name}</h3>
            <p className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-slate-400">${ticker}</p>
          </div>
          <span className="mb-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-inset ring-white/10">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]" />
            Solana · planned
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-snug text-slate-300">{tagline}</p>

        {meta && (
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
            {meta.map((m) => (
              <div key={m.label} className="bg-night px-3.5 py-2.5">
                <dt className="text-[11px] uppercase tracking-[0.08em] text-slate-500">{m.label}</dt>
                <dd className="mt-0.5 truncate text-[13px] font-medium text-slate-200">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {showLinks && (
          <div className="mt-4">
            <LinkChips />
          </div>
        )}
        {footer}
      </div>
    </GlowShell>
  );
}

/** Compact token chip-card used inside small illustrations. */
export function MiniTokenCard({
  name,
  ticker,
  art,
  theme,
  className,
  status = "Preview Ready",
}: Omit<TokenCardData, "tagline"> & { className?: string; status?: string }) {
  const t = THEMES[theme];
  return (
    <GlowShell className={cn("w-[236px]", className)} glow={t.glow}>
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-60 blur-2xl" style={{ background: t.mid }} />
      <div className="relative flex items-center gap-3 p-3">
        <CoinArt art={art} theme={theme} ticker={ticker} className="h-14 w-14 shrink-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
        <div className="min-w-0">
          <p className="truncate text-[22px] font-bold leading-none tracking-[-0.04em]">{name}</p>
          <p className="mt-0.5 text-[13px] font-semibold text-slate-400">${ticker}</p>
          <div className="mt-1.5 scale-90 origin-left">
            <StatusPill>{status}</StatusPill>
          </div>
        </div>
      </div>
    </GlowShell>
  );
}
