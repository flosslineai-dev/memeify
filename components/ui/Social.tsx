import { BadgeCheck, ChartNoAxesColumn, Heart, MessageCircle, MoreHorizontal, Repeat2, Share } from "lucide-react";
import type { ReactNode } from "react";
import { PostArt, ART_DESCRIPTIONS } from "@/components/art/PostArt";
import { Mascot } from "@/components/brand/Mascot";
import { cn } from "@/lib/cn";
import type { ArtKind, Person, PostStats } from "@/lib/samples";

export function Avatar({ person, size = 40, className }: { person: Person; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white ring-2 ring-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(140deg, ${person.colors[0]}, ${person.colors[1]})`,
      }}
    >
      {person.name[0]}
    </span>
  );
}

export function MemeifyAvatar({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-night ring-2 ring-white", className)}
      style={{ width: size, height: size }}
    >
      <Mascot animated={false} className="h-[72%] w-[72%]" />
    </span>
  );
}

/** Highlights `@mentions` and `$TICKERS` inside a comment. */
export function RichText({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  const parts = text.split(/(@[A-Za-z0-9_]+|\$[A-Za-z0-9]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("@") && part.length > 1)
          return (
            <span key={i} className={cn("font-semibold", tone === "light" ? "text-brand" : "text-brand-300")}>
              {part}
            </span>
          );
        if (part.startsWith("$") && part.length > 1)
          return (
            <span
              key={i}
              className={cn(
                "rounded-md px-1 font-bold",
                tone === "light" ? "bg-brand-50 text-brand" : "bg-brand/20 text-brand-200",
              )}
            >
              {part}
            </span>
          );
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Stat({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

type SocialPostProps = {
  author: Person;
  time: string;
  text: ReactNode;
  art: ArtKind;
  stats?: PostStats;
  aspect?: string;
  className?: string;
  compact?: boolean;
  imageOverlay?: ReactNode;
  children?: ReactNode;
};

/** A platform-neutral social post mock with original artwork. */
export function SocialPost({
  author,
  time,
  text,
  art,
  stats,
  aspect = "aspect-[4/3]",
  className,
  compact = false,
  imageOverlay,
  children,
}: SocialPostProps) {
  return (
    <article
      aria-label={`Example post by ${author.name}`}
      className={cn(
        "rounded-[24px] bg-white text-left ring-1 ring-slate-900/[0.06] shadow-[0_1px_1px_rgba(15,23,42,0.04),0_24px_60px_-24px_rgba(15,23,42,0.28)]",
        compact ? "p-3.5" : "p-4 sm:p-5",
        className,
      )}
    >
      <header className="flex items-start gap-3">
        <Avatar person={author} size={compact ? 34 : 40} />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="truncate font-semibold text-ink">{author.name}</span>
            {author.verified && <BadgeCheck aria-hidden className="h-4 w-4 shrink-0 fill-brand text-white" />}
            <span className="truncate text-slate-500">
              @{author.handle} · {time}
            </span>
          </div>
          <p className={cn("mt-1 text-ink-2", compact ? "text-[14px]" : "text-[15px]")}>{text}</p>
        </div>
        <MoreHorizontal aria-hidden className="h-5 w-5 shrink-0 text-slate-400" />
      </header>

      <div className={cn("relative mt-3 overflow-hidden rounded-2xl ring-1 ring-slate-900/[0.06]", aspect)}>
        <PostArt kind={art} label={ART_DESCRIPTIONS[art]} className="absolute inset-0 h-full w-full" />
        {imageOverlay}
      </div>

      {stats && (
        <footer
          aria-hidden
          className={cn(
            "mt-3 flex items-center justify-between px-1 text-slate-500",
            compact ? "text-[12px]" : "text-[13px]",
          )}
        >
          <Stat icon={<MessageCircle className="h-4 w-4" />} value={stats.replies} />
          <Stat icon={<Repeat2 className="h-4 w-4" />} value={stats.reposts} />
          <Stat icon={<Heart className="h-4 w-4" />} value={stats.likes} />
          <Stat icon={<ChartNoAxesColumn className="h-4 w-4" />} value={stats.views} />
          <Share className="h-4 w-4" />
        </footer>
      )}
      {children}
    </article>
  );
}

type CommentBubbleProps = {
  author: Person;
  text: string;
  /** Number of characters revealed — used for typing animations. */
  typed?: number;
  caret?: boolean;
  replyingTo?: string;
  className?: string;
  glow?: boolean;
};

export function CommentBubble({
  author,
  text,
  typed,
  caret = false,
  replyingTo,
  className,
  glow = false,
}: CommentBubbleProps) {
  const shown = typed === undefined ? text : text.slice(0, typed);
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[20px] bg-white p-3.5 pr-5 ring-1 ring-slate-900/[0.07] shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)] transition-shadow duration-500",
        glow && "shadow-[0_0_0_4px_rgba(37,99,235,0.14),0_18px_50px_-14px_rgba(37,99,235,0.55)] ring-brand/40",
        className,
      )}
    >
      <Avatar person={author} size={34} />
      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="font-semibold text-ink">{author.name}</span>
          <span className="truncate text-slate-500">@{author.handle}</span>
        </div>
        {replyingTo && (
          <div className="mt-0.5 text-[12px] text-slate-500">
            Replying to <span className="text-brand">@{replyingTo}</span>
          </div>
        )}
        <p className="mt-1 min-h-[1.4em] text-[15px] text-ink">
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            <RichText text={shown} />
            {caret && <span className="caret text-brand" />}
          </span>
        </p>
      </div>
    </div>
  );
}
