import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium tracking-[-0.01em]",
        tone === "light"
          ? "bg-white text-ink-2 ring-1 ring-inset ring-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
          : "bg-white/5 text-slate-300 ring-1 ring-inset ring-white/10",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_0_3px_rgba(37,99,235,0.18)]" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  id,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[64px]",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty text-lg leading-relaxed",
            tone === "light" ? "text-muted" : "text-slate-400",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
