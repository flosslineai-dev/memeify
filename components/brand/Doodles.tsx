import { cn } from "@/lib/cn";

/** Three hand-drawn "emanation" dashes — Memeify's signature accent. */
export function SparkMarks({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      className={cn("h-8 w-8 text-brand", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <path d="M6 11 L15 4" />
      <path d="M8 21 L21 20" />
      <path d="M6 31 L15 37" />
    </svg>
  );
}

/** Four-point sparkle used for magic moments. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-5 w-5", className)}>
      <path
        d="M12 2C12.8 8.2 15.8 11.2 22 12C15.8 12.8 12.8 15.8 12 22C11.2 15.8 8.2 12.8 2 12C8.2 11.2 11.2 8.2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Loose brush underline, like a marker swipe. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("text-brand", className)}
      fill="none"
    >
      <path
        d="M4 16 C70 6 170 4 296 12"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn curved arrow. */
export function CurvyArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 120"
      aria-hidden
      className={cn("text-brand", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M44 6 C10 30 6 82 56 110" />
      <path d="M38 108 L57 111 L52 92" />
    </svg>
  );
}

/** The X logo, used only for "Follow on X" links. */
export function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
