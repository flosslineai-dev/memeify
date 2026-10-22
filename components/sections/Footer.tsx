import Link from "next/link";
import { XLogo } from "@/components/brand/Doodles";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Demo", href: "/#demo" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "X / Twitter", href: siteConfig.links.x, external: true },
      { label: "Community", href: "/#join" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const linkClass = "text-[15px] text-ink-2 transition-colors hover:text-brand";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/#top" aria-label="Memeify home" className="inline-block rounded-full">
              <Logo />
            </Link>
            <p className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-ink">{siteConfig.tagline}</p>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
              Social-native meme coin creation. Currently in development.
            </p>
            <ButtonLink
              href={siteConfig.links.x}
              external
              variant="secondary"
              size="md"
              className="mt-6"
              aria-label="Follow Memeify on X (opens in a new tab)"
            >
              <XLogo /> Follow @{siteConfig.xHandle}
            </ButtonLink>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"external" in l && l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {l.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={l.href} className={linkClass}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 rounded-3xl bg-surface p-5 text-[13px] leading-relaxed text-muted sm:p-6">
          <strong className="font-semibold text-ink-2">Disclaimer.</strong> Memeify is in development. Product visuals and
          demos on this site are illustrative, and features described as planned are not yet available. Crypto assets are
          highly volatile and carry significant financial risk, including the loss of the full amount you put in. Nothing
          on this site is financial, investment or legal advice. Memeify is not affiliated with, endorsed by or sponsored
          by X Corp. or TikTok.
        </div>

        <div className="mt-8 flex flex-col justify-between gap-2 text-[13px] text-muted sm:flex-row">
          <p>© 2026 Memeify. All rights reserved.</p>
          <p>Made for the timeline ✦</p>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none -mb-[4.5vw] select-none text-center text-[23vw] font-bold leading-[0.8] tracking-[-0.07em] text-slate-100"
      >
        Memeify
      </p>
    </footer>
  );
}
