"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XLogo } from "@/components/brand/Doodles";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500",
          solid
            ? "bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/[0.06] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Link href="/#top" aria-label="Memeify home" className="rounded-full">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-2 transition-colors hover:bg-slate-900/[0.04] hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={siteConfig.links.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Memeify on X (opens in a new tab)"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-slate-900/[0.05] sm:inline-flex"
          >
            <XLogo className="h-[18px] w-[18px]" />
          </a>
          <Link href="/#join" className={cn(buttonClasses("primary", "md"), "hidden h-10 px-4 text-[14px] sm:inline-flex")}>
            Join waitlist
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-slate-900/[0.05] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-[28px] bg-white/95 p-3 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.06] backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 text-lg font-medium tracking-[-0.02em] text-ink hover:bg-slate-50"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 p-1">
              <a
                href={siteConfig.links.x}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("secondary", "md")}
              >
                <XLogo /> Follow on X
              </a>
              <Link href="/#join" onClick={() => setOpen(false)} className={buttonClasses("primary", "md")}>
                Join waitlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
