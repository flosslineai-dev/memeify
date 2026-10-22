import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Memeify prelaunch website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="October 2026">
      <p>
        These terms cover your use of the Memeify prelaunch website. Memeify is still in development, and full Terms of
        Service for the product will be published before it launches.
      </p>
      <h2>Prelaunch website</h2>
      <p>
        This site describes a product that is not live yet. Demos, token cards and animations are illustrative and use
        sample data. No tokens are created, minted, sold or launched through this website.
      </p>
      <h2>No financial advice</h2>
      <p>
        Nothing on this site is financial, investment, tax or legal advice. Crypto assets are highly volatile and carry
        significant risk, including the loss of the full amount you put in.
      </p>
      <h2>Planned features</h2>
      <p>
        Integrations with X and TikTok and launches on Solana are planned and may change. Memeify is not affiliated with,
        endorsed by or sponsored by X Corp. or TikTok.
      </p>
      <h2>Content</h2>
      <p>
        The Memeify name, mascot and artwork on this site are original to Memeify. Please don’t use them in a way that
        suggests endorsement.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Reach us on <a href={siteConfig.links.x} target="_blank" rel="noopener noreferrer">X</a>.
      </p>
    </LegalPage>
  );
}
