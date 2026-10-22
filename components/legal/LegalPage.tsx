import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="relative px-4 pb-24 pt-36 sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <article className="mx-auto max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand">Last updated {updated}</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl">{title}</h1>
          <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-ink-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
