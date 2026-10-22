"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { XLogo } from "@/components/brand/Doodles";
import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { FAQS } from "@/lib/faq";
import { siteConfig } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="mt-5 text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[64px]">
            Questions, answered.
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
            Memeify is still being built. Here’s what we can say today — and what’s still planned.
          </p>
          <div className="mt-10 hidden items-center gap-5 lg:flex">
            <Mascot mood="happy" className="h-20 w-20" />
            <div>
              <p className="font-hand text-[26px] leading-none text-ink-2">still curious?</p>
              <ButtonLink href={siteConfig.links.x} external variant="secondary" size="md" className="mt-3">
                <XLogo /> Ask us on X
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-slate-200">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[18px] font-medium tracking-[-0.02em] text-ink sm:text-[20px]"
                  >
                    <span className="transition-colors group-hover:text-brand">{item.q}</span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300",
                        isOpen ? "rotate-45 bg-ink text-white ring-ink" : "text-ink ring-slate-200 group-hover:ring-slate-300",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="max-w-2xl pb-7 pr-12 text-[16px] leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
