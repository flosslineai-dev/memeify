import { cn } from "@/lib/cn";
import { Mascot } from "./Mascot";

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Mascot className="h-9 w-9 -rotate-6" animated={false} />
      <span
        className={cn(
          "text-[22px] font-bold tracking-[-0.045em]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        Memeify
      </span>
    </span>
  );
}
