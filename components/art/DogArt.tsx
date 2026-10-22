import { useSvgId } from "@/lib/use-svg-id";
import { artA11y, type ArtProps } from "./types";

const EAR =
  "M150 128 C120 112 84 126 74 168 C64 206 54 246 60 286 C52 304 50 326 64 340 C72 356 92 358 100 346 C110 362 132 360 138 342 C146 326 138 308 142 292 C146 268 140 244 136 222 C132 196 138 168 150 150 Z";

const BLAZE =
  "M200 116 C192 116 188 128 188 146 C188 164 184 180 178 194 C170 210 148 222 140 246 C132 276 158 300 200 302 C242 300 268 276 260 246 C252 222 230 210 222 194 C216 180 212 164 212 146 C212 128 208 116 200 116 Z";

/** Original illustration: a fluffy chestnut-and-white puppy looking up at the camera. */
export function DogArt(props: ArtProps) {
  return <DogArtSvg id={useSvgId()} {...props} />;
}

/** Hook-free renderer, so the art can also be serialized for OG images. */
export function DogArtSvg({ id, label, clean: _clean, ...props }: ArtProps & { id: string }) {
  const u = (n: string) => `url(#${id}-${n})`;

  const ear = (
    <>
      <path d={EAR} fill={u("ear")} />
      <path d="M146 140 C132 170 128 200 134 230" stroke="#6E3414" strokeOpacity="0.45" strokeWidth="5" strokeLinecap="round" fill="none" />
      <g stroke="#6E3414" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M96 196 q-11 14 0 28" />
        <path d="M120 236 q-11 14 0 28" />
        <path d="M84 256 q-10 13 0 26" />
        <path d="M108 288 q-10 13 0 26" />
        <path d="M78 312 q-8 10 0 20" />
        <path d="M126 318 q-8 10 0 20" />
      </g>
      <path d="M96 150 C86 168 82 186 82 206" stroke="#F2B27A" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" fill="none" />
    </>
  );

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" {...artA11y(label)} {...props}>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.42" cy="0.32" r="0.85">
          <stop offset="0" stopColor="#FDEBDD" />
          <stop offset="0.55" stopColor="#F2CBB0" />
          <stop offset="1" stopColor="#D79E7C" />
        </radialGradient>
        <linearGradient id={`${id}-fur`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D88D4D" />
          <stop offset="1" stopColor="#A4562A" />
        </linearGradient>
        <linearGradient id={`${id}-ear`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#C97A3A" />
          <stop offset="0.6" stopColor="#A85A27" />
          <stop offset="1" stopColor="#7A3A17" />
        </linearGradient>
        <linearGradient id={`${id}-white`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1E2D3" />
        </linearGradient>
        <radialGradient id={`${id}-eye`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#5E3721" />
          <stop offset="0.5" stopColor="#1E110A" />
          <stop offset="1" stopColor="#080403" />
        </radialGradient>
      </defs>

      {/* warm tiled floor */}
      <rect width="400" height="400" fill={u("bg")} />
      <g stroke="#BF8866" strokeOpacity="0.35" strokeWidth="3" fill="none">
        <path d="M-10 330 L410 268" />
        <path d="M70 -10 L4 410" />
        <path d="M356 -10 L402 410" />
      </g>
      <ellipse cx="110" cy="70" rx="170" ry="100" fill="#FFFFFF" opacity="0.22" />
      <ellipse cx="200" cy="396" rx="160" ry="28" fill="#94593B" opacity="0.18" />

      {/* chest */}
      <path d="M64 410 C72 344 128 300 200 298 C272 300 328 344 336 410 Z" fill={u("white")} />
      <path d="M166 312 q8 10 16 2 q8 10 16 0 q8 10 16 2" stroke="#E2CFBD" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* head */}
      <ellipse cx="200" cy="196" rx="86" ry="82" fill={u("fur")} />
      <ellipse cx="200" cy="140" rx="54" ry="20" fill="#FFFFFF" opacity="0.12" />

      {/* ears */}
      {ear}
      <g transform="matrix(-1 0 0 1 400 0)">{ear}</g>

      {/* white blaze and muzzle */}
      <path d={BLAZE} fill={u("white")} />
      <path d="M194 122 q6 -8 12 0" stroke="#E9D6C4" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* paws */}
      {[160, 240].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="388" rx="30" ry="20" fill={u("white")} stroke="#E4CFBC" strokeWidth="2" />
          <path d={`M${cx - 10} 380 v10 M${cx} 377 v12 M${cx + 10} 380 v10`} stroke="#D5BDA8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}

      {/* blush */}
      <ellipse cx="152" cy="240" rx="13" ry="7" fill="#FF9DAA" opacity="0.32" />
      <ellipse cx="248" cy="240" rx="13" ry="7" fill="#FF9DAA" opacity="0.32" />

      {/* eyes */}
      {[163, 237].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx - 2} cy="174" rx="8" ry="4.5" fill="#EFB07A" opacity="0.65" />
          <circle cx={cx} cy="200" r="20.5" fill="#5B2E15" opacity="0.6" />
          <circle cx={cx} cy="200" r="18" fill={u("eye")} />
          <circle cx={cx - 6} cy="193" r="6.2" fill="#FFFFFF" />
          <circle cx={cx + 6.5} cy="207" r="2.7" fill="#FFFFFF" opacity="0.85" />
        </g>
      ))}

      {/* nose */}
      <path d="M183 242 C183 231 217 231 217 242 C217 254 207 262 200 262 C193 262 183 254 183 242 Z" fill="#22171A" />
      <ellipse cx="194" cy="239" rx="6.5" ry="3.2" fill="#FFFFFF" opacity="0.5" />

      {/* mouth + tongue */}
      <path d="M193 277 C193 294 207 294 207 277 C204 280 196 280 193 277 Z" fill="#FF7E93" />
      <path d="M200 280 v8" stroke="#E25E7A" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M200 262 L200 270 M200 270 C195 279 185 280 179 273 M200 270 C205 279 215 280 221 273"
        stroke="#47332E"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="#CDB09C">
        <circle cx="178" cy="262" r="1.8" />
        <circle cx="170" cy="270" r="1.8" />
        <circle cx="222" cy="262" r="1.8" />
        <circle cx="230" cy="270" r="1.8" />
      </g>
    </svg>
  );
}
