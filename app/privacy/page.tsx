import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Memeify prelaunch website handles your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="October 2026">
      <p>
        This notice covers the Memeify prelaunch website. A full Privacy Policy for the product will be published before
        Memeify launches.
      </p>
      <h2>What this site collects</h2>
      <p>
        This site does not use analytics, advertising trackers or tracking cookies. The interactive demo runs entirely in
        your browser: the comments and tickers you type are not sent anywhere.
      </p>
      <h2>Waitlist</h2>
      <p>
        When the waitlist is open, the email address you submit is sent to our waitlist provider and used only to tell
        you about Memeify’s launch. Until then, the form tells you that nothing was saved, and it isn’t.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us to delete your email from the waitlist at any time by contacting us on{" "}
        <a href={siteConfig.links.x} target="_blank" rel="noopener noreferrer">X</a>.
      </p>
    </LegalPage>
  );
}
