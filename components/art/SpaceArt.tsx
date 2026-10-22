import { seeded } from "@/lib/geometry";
import { useSvgId } from "@/lib/use-svg-id";
import { artA11y, type ArtProps } from "./types";

const rand = seeded(42);
const STARS = Array.from({ length: 46 }, () => ({
  x: Math.round(rand() * 400),
  y: Math.round(rand() * 330),
  r: Math.round((0.6 + rand() * 1.8) * 10) / 10,
  o: Math.round((0.35 + rand() * 0.65) * 100) / 100,
}));

const SPARKLE = "M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10 Z";

/** Original illustration: a little rocket heading for a sleepy, smiling moon. */
export function SpaceArt({ label, clean = false, ...props }: ArtProps) {
  const id = useSvgId();
  const u = (n: string) => `url(#${id}-${n})`;

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" {...artA11y(label)} {...props}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#080E30" />
          <stop offset="0.55" stopColor="#1A1F5C" />
          <stop offset="1" stopColor="#40308A" />
        </linearGradient>
        <radialGradient id={`${id}-nebula`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7C6CFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#7C6CFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-moon`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#FFFBEA" />
          <stop offset="0.65" stopColor="#F6E3A6" />
          <stop offset="1" stopColor="#DDBC72" />
        </radialGradient>
        <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#FFF4C7" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFF4C7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-earth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={`${id}-flame`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF4A3" />
          <stop offset="0.45" stopColor="#FDBA35" />
          <stop offset="1" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-earth-clip`}>
          <ellipse cx="200" cy="560" rx="360" ry="220" />
        </clipPath>
      </defs>

      <rect width="400" height="400" fill={u("sky")} />
      <ellipse cx="96" cy="130" rx="150" ry="100" fill={u("nebula")} />
      <ellipse cx="330" cy="300" rx="120" ry="80" fill={u("nebula")} opacity="0.6" />

      <g fill="#FFFFFF">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
        ))}
      </g>
      {!clean && (
        <g fill="#FFFFFF">
          <path d={SPARKLE} transform="translate(64 64) scale(0.9)" />
          <path d={SPARKLE} transform="translate(182 46) scale(0.55)" opacity="0.8" />
          <path d={SPARKLE} transform="translate(360 238) scale(0.7)" opacity="0.9" />
        </g>
      )}

      {/* moon */}
      <g transform="translate(284 122)">
        <circle r="98" fill={u("halo")} />
        <circle r="66" fill={u("moon")} />
        <g fill="#D9BC7A" opacity="0.6">
          <circle cx="-26" cy="-26" r="11" />
          <circle cx="30" cy="-30" r="7" />
          <circle cx="34" cy="28" r="9" />
          <circle cx="-38" cy="20" r="5" />
        </g>
        <g stroke="#7A5A22" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M-24 2 q7 -7 14 0" />
          <path d="M8 0 q7 -7 14 0" />
          <path d="M-9 16 q9 9 18 0" />
        </g>
        <ellipse cx="-28" cy="14" rx="7" ry="4" fill="#FF9FA6" opacity="0.55" />
        <ellipse cx="26" cy="12" rx="7" ry="4" fill="#FF9FA6" opacity="0.55" />
      </g>

      {/* earth horizon */}
      <ellipse cx="200" cy="560" rx="378" ry="236" fill="#60A5FA" opacity="0.18" />
      <ellipse cx="200" cy="560" rx="360" ry="220" fill={u("earth")} />
      <g clipPath={u("earth-clip")} fill="#34D399" opacity="0.75">
        <path d="M40 360 C80 340 130 350 150 372 C170 394 120 410 80 404 C44 398 20 378 40 360 Z" />
        <path d="M250 352 C290 338 340 346 352 366 C362 386 320 396 290 390 C262 384 230 364 250 352 Z" />
      </g>
      <ellipse cx="200" cy="560" rx="360" ry="220" fill="none" stroke="#BFDBFE" strokeOpacity="0.7" strokeWidth="4" />

      {/* exhaust trail */}
      <path
        d="M-6 402 C40 362 86 318 128 284"
        stroke="#FFFFFF"
        strokeOpacity="0.4"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="0 20"
        fill="none"
      />
      <g fill="#FFFFFF" opacity="0.5">
        <circle cx="112" cy="300" r="12" />
        <circle cx="98" cy="312" r="8" />
        <circle cx="122" cy="314" r="7" />
      </g>

      {/* rocket */}
      <g transform="translate(160 240) rotate(42)">
        <path d="M-13 44 Q0 104 13 44 Z" fill={u("flame")} />
        <path d="M-7 44 Q0 74 7 44 Z" fill="#FFFBD1" />
        <path d="M-18 18 L-36 46 L-14 40 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 18 L36 46 L14 40 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 -58 C23 -38 25 6 18 44 L-18 44 C-25 6 -23 -38 0 -58 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M0 -58 C10 -49 15 -40 18 -30 L-18 -30 C-15 -40 -10 -49 0 -58 Z" fill="#2563EB" />
        <rect x="-21" y="22" width="42" height="7" fill="#E2E8F0" />
        <circle cx="0" cy="-6" r="12" fill="#0B1120" stroke="#93C5FD" strokeWidth="4.5" />
        <path d="M-5 -11 q4 -4 9 -2" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M-14 44 L0 50 L14 44" stroke="#2563EB" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <path d="M0 18 L0 44" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
