"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const LABELS = ["Find", "Tag", "Launch-ready"];

/** A scroll-linked progress line that lights up each step as you read down the page. */
export function StepsTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 25%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(v > 0.92 ? 3 : v > 0.45 ? 2 : v > 0.02 ? 1 : 0);
  });

  return (
    <div ref={ref} aria-hidden className="relative mx-auto mb-10 hidden max-w-6xl lg:block">
      <div className="relative mx-[16.66%] h-[2px] rounded-full bg-slate-200">
        <motion.div
          style={{ scaleX }}
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand via-brand-500 to-iris"
        />
      </div>
      <div className="absolute inset-x-0 -top-[15px] grid grid-cols-3">
        {LABELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold transition-all duration-500",
                reached > i
                  ? "bg-brand text-white shadow-[0_0_0_6px_rgba(37,99,235,0.14)]"
                  : "bg-white text-slate-400 ring-1 ring-slate-200",
              )}
            >
              {i + 1}
            </span>
            <span className={cn("text-[13px] font-medium transition-colors", reached > i ? "text-ink" : "text-slate-400")}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
