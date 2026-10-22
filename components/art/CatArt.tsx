import { useSvgId } from "@/lib/use-svg-id";
import { artA11y, type ArtProps } from "./types";

const RAYS = Array.from({ length: 28 }, (_, i) => (i * 360) / 28);

const EAR_OUTER = "M110 186 L114 92 Q116 74 132 82 L188 128 Z";
const EAR_INNER = "M124 166 L126 108 Q128 98 136 104 L170 132 Z";

/** Original illustration: a wide-eyed tabby in classic top/bottom-caption meme format. */
export function CatArt({ label, clean = false, ...props }: ArtProps) {
  const id = useSvgId();
  const u = (n: string) => `url(#${id}-${n})`;

  const ear = (
    <>
      <path d={EAR_OUTER} fill="#F0974A" stroke="#F0974A" strokeWidth="10" strokeLinejoin="round" />
      <path d={EAR_INNER} fill="#FFB3B8" stroke="#FFB3B8" strokeWidth="4" strokeLinejoin="round" />
    </>
  );

  const eye = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy="212" r="35" fill={u("iris")} stroke="#3A2414" strokeWidth="3.5" />
      <circle cx={cx} cy="213" r="27" fill="#0D0912" />
      <circle cx={cx - 10} cy="201" r="9.5" fill="#FFFFFF" />
      <circle cx={cx + 10} cy="223" r="4" fill="#FFFFFF" opacity="0.85" />
    </g>
  );

  const whiskers = (
    <g stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round">
      <path d="M156 268 L86 252" />
      <path d="M156 276 L82 276" />
      <path d="M158 284 L90 302" />
    </g>
  );

  const caption = {
    fill: "#FFFFFF",
    stroke: "#000000",
    strokeWidth: 7,
    paintOrder: "stroke" as const,
    fontFamily: "Impact, 'Anton', 'Arial Black', sans-serif",
    fontWeight: 900,
    fontSize: 40,
    textAnchor: "middle" as const,
    lengthAdjust: "spacingAndGlyphs" as const,
  };

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" {...artA11y(label)} {...props}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4B3A91" />
          <stop offset="1" stopColor="#1F1A45" />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fur`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBBA6E" />
          <stop offset="1" stopColor="#EC853A" />
        </linearGradient>
        <radialGradient id={`${id}-iris`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ECFA92" />
          <stop offset="1" stopColor="#9CCB2E" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill={u("bg")} />
      {/* dramatic zoom lines */}
      <g stroke="#A99BFF" strokeOpacity="0.22" strokeWidth="10">
        {RAYS.map((deg, i) => (
          <line
            key={deg}
            x1="200"
            y1="215"
            x2="200"
            y2="-160"
            strokeWidth={i % 2 ? 4 : 12}
            transform={`rotate(${deg} 200 215)`}
          />
        ))}
      </g>
      <circle cx="200" cy="220" r="190" fill={u("spot")} />

      {/* shoulders */}
      <ellipse cx="200" cy="420" rx="150" ry="96" fill={u("fur")} />
      <ellipse cx="200" cy="350" rx="44" ry="26" fill="#FFF3E2" />

      {/* ears */}
      {ear}
      <g transform="matrix(-1 0 0 1 400 0)">{ear}</g>

      {/* head */}
      <path
        d="M200 118 C268 118 316 160 318 218 C320 270 280 314 200 316 C120 314 80 270 82 218 C84 160 132 118 200 118 Z"
        fill={u("fur")}
      />
      <path d="M86 236 l-18 4 l14 10 l-14 10 l22 2 Z" fill="#EE8A3E" />
      <path d="M314 236 l18 4 l-14 10 l14 10 l-22 2 Z" fill="#EE8A3E" />

      {/* tabby stripes */}
      <g stroke="#C9631F" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M200 126 L200 158" />
        <path d="M178 130 L183 154" />
        <path d="M222 130 L217 154" />
        <path d="M88 196 q18 4 30 14" />
        <path d="M86 220 q18 2 28 8" />
        <path d="M312 196 q-18 4 -30 14" />
        <path d="M314 220 q-18 2 -28 8" />
      </g>

      {/* muzzle */}
      <ellipse cx="183" cy="268" rx="25" ry="19" fill="#FFF3E2" />
      <ellipse cx="217" cy="268" rx="25" ry="19" fill="#FFF3E2" />
      <ellipse cx="200" cy="292" rx="20" ry="13" fill="#FFF3E2" />

      {eye(150)}
      {eye(250)}

      {/* nose + shocked mouth */}
      <path d="M190 250 L210 250 L200 261 Z" fill="#FF8FA3" stroke="#FF8FA3" strokeWidth="5" strokeLinejoin="round" />
      <path d="M200 262 v7" stroke="#5A2A33" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="200" cy="283" rx="9" ry="11" fill="#4A1426" />
      <ellipse cx="200" cy="289" rx="6" ry="4" fill="#FF7A93" />

      {whiskers}
      <g transform="matrix(-1 0 0 1 400 0)">{whiskers}</g>

      {!clean && (
        <g>
          <text x="200" y="96" textLength="296" {...caption}>
            WHEN YOU HEAR
          </text>
          <text x="200" y="332" textLength="296" {...caption}>
            THE TREAT BAG
          </text>
        </g>
      )}
    </svg>
  );
}
