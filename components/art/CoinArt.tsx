import type { ArtKind, ThemeKey } from "@/lib/samples";
import { THEMES } from "@/lib/samples";
import { useSvgId } from "@/lib/use-svg-id";
import { cn } from "@/lib/cn";
import { PostArt } from "./PostArt";

type CoinArtProps = {
  art: ArtKind;
  theme: ThemeKey;
  ticker: string;
  className?: string;
  label?: string;
};

/** A minted-looking coin emblem: metallic rim, engraved ticker ring and the post art inside. */
export function CoinArt({ art, theme, ticker, className, label }: CoinArtProps) {
  const id = useSvgId();
  const t = THEMES[theme];
  const ring = `$${ticker} ✦ MEMEIFY ✦ `.repeat(3);

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("overflow-visible", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <defs>
        <linearGradient id={`${id}-rim`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor={t.light} />
          <stop offset="0.45" stopColor={t.mid} />
          <stop offset="1" stopColor={t.deep} />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="100" cy="100" r="77" />
        </clipPath>
        <path id={`${id}-ring`} d="M100 100 m-87 0 a87 87 0 1 1 174 0 a87 87 0 1 1 -174 0" />
      </defs>

      {/* coin thickness */}
      <circle cx="100" cy="106" r="96" fill={t.deep} />
      <circle cx="100" cy="100" r="96" fill={`url(#${id}-rim)`} />
      <circle cx="100" cy="100" r="95" fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.5" />
      <text
        fill="#FFFFFF"
        fillOpacity="0.92"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="2"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
      >
        <textPath href={`#${id}-ring`} textLength="540" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      <circle cx="100" cy="100" r="80" fill={t.deep} />
      <g clipPath={`url(#${id}-clip)`}>
        <PostArt kind={art} clean x="23" y="23" width="154" height="154" />
      </g>
      <circle cx="100" cy="100" r="77.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2.5" />
      <path d="M38 78 A64 64 0 0 1 150 42 A80 80 0 0 0 38 78 Z" fill={`url(#${id}-gloss)`} opacity="0.9" />
      <ellipse cx="62" cy="52" rx="14" ry="6" transform="rotate(-35 62 52)" fill="#FFFFFF" opacity="0.35" />
    </svg>
  );
}
