import { roundedStarPath } from "@/lib/geometry";
import { useSvgId } from "@/lib/use-svg-id";
import { cn } from "@/lib/cn";

export type MascotMood = "wink" | "happy" | "wow" | "focus";

const INK = "#0B1120";

/** Sparky's body: a chubby, slightly tilted five-point star. */
export const MASCOT_STAR = roundedStarPath({
  cx: 120,
  cy: 126,
  outer: 100,
  inner: 58,
  rotation: -96,
  tipRadius: 24,
  innerRadius: 13,
});

type MascotProps = {
  mood?: MascotMood;
  arms?: boolean;
  wave?: boolean;
  animated?: boolean;
  /** Accessible name. Omit for decorative usage. */
  title?: string;
  className?: string;
};

/**
 * Sparky — the Memeify mascot. A glossy electric-blue star with a
 * sticker outline, a wink and (optionally) tiny waving arms.
 */
export function Mascot(props: MascotProps) {
  return <MascotSvg id={useSvgId()} {...props} />;
}

/** Hook-free renderer, so the mascot can also be serialized for OG images. */
export function MascotSvg({
  id,
  mood = "wink",
  arms = false,
  wave = false,
  animated = true,
  title,
  className,
}: MascotProps & { id: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={cn("overflow-visible", className)}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0.15" y1="0.05" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="#7AA7FF" />
          <stop offset="0.45" stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#5B3DF5" />
        </linearGradient>
        <radialGradient id={`${id}-shine`} cx="0.36" cy="0.26" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className={animated ? "mascot-bob" : undefined}>
        {arms && (
          <g stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none">
            <g className={animated ? "mascot-wave-left" : undefined}>
              <path d="M66 150 C46 158 28 156 16 144" />
              <circle cx="11" cy="139" r="9" fill="#FFFFFF" strokeWidth="5" />
            </g>
            <g className={wave && animated ? "mascot-wave" : undefined}>
              <path d="M174 140 C196 138 212 124 220 104" />
              <circle cx="223" cy="96" r="9" fill="#FFFFFF" strokeWidth="5" />
            </g>
          </g>
        )}

        {/* extruded back layer for a sticker-like 3D feel */}
        <path
          d={MASCOT_STAR}
          transform="translate(5 8)"
          fill="#1B2A6B"
          stroke={INK}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d={MASCOT_STAR}
          fill={`url(#${id}-fill)`}
          stroke={INK}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path d={MASCOT_STAR} fill={`url(#${id}-shine)`} />
        <path
          d="M84 62 C92 52 104 46 114 46"
          stroke="#FFFFFF"
          strokeOpacity="0.75"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <g transform="rotate(-6 120 126)">
          <Face mood={mood} animated={animated} />
        </g>
      </g>
    </svg>
  );
}

function Face({ mood, animated }: { mood: MascotMood; animated: boolean }) {
  const blink = animated ? "mascot-blink" : undefined;
  const stroke = {
    stroke: INK,
    strokeWidth: 6,
    strokeLinecap: "round" as const,
    fill: "none",
  };

  return (
    <g>
      <ellipse cx="86" cy="138" rx="9" ry="5.5" fill="#FF8FB8" opacity="0.75" />
      <ellipse cx="154" cy="136" rx="9" ry="5.5" fill="#FF8FB8" opacity="0.75" />

      {mood === "wink" && (
        <>
          <g className={blink}>
            <ellipse cx="102" cy="118" rx="8" ry="10.5" fill={INK} />
            <circle cx="99.5" cy="113.5" r="2.8" fill="#FFFFFF" />
          </g>
          <path d="M128 120 q9 -9 18 0" {...stroke} />
          <path d="M104 137 q16 17 32 0" {...stroke} />
        </>
      )}

      {mood === "happy" && (
        <>
          <path d="M94 120 q8 -10 16 0" {...stroke} />
          <path d="M130 118 q8 -10 16 0" {...stroke} />
          <path
            d="M103 134 Q120 160 137 134 Z"
            fill={INK}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <ellipse cx="120" cy="143.5" rx="7" ry="3.6" fill="#FF7FA6" />
        </>
      )}

      {mood === "wow" && (
        <>
          <g className={blink}>
            <ellipse cx="102" cy="117" rx="8.5" ry="11" fill={INK} />
            <ellipse cx="138" cy="115" rx="8.5" ry="11" fill={INK} />
            <circle cx="99.5" cy="112" r="3" fill="#FFFFFF" />
            <circle cx="135.5" cy="110" r="3" fill="#FFFFFF" />
          </g>
          <ellipse cx="120" cy="143" rx="6.5" ry="8" fill={INK} />
        </>
      )}

      {mood === "focus" && (
        <>
          <path d="M92 102 l18 4" {...stroke} strokeWidth={5} />
          <path d="M130 104 l18 -4" {...stroke} strokeWidth={5} />
          <g className={blink}>
            <ellipse cx="104" cy="119" rx="7.5" ry="9.5" fill={INK} />
            <ellipse cx="140" cy="117" rx="7.5" ry="9.5" fill={INK} />
            <circle cx="106" cy="115" r="2.6" fill="#FFFFFF" />
            <circle cx="142" cy="113" r="2.6" fill="#FFFFFF" />
          </g>
          <path d="M110 140 q10 5 20 -1" {...stroke} />
        </>
      )}
    </g>
  );
}
