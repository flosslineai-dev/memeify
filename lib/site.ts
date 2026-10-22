const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const xHandle = "Memeifydotfun";

export const siteConfig = {
  name: "Memeify",
  tagline: "From Mention to Mint.",
  title: "Memeify — From Mention to Mint.",
  description:
    `Turn social posts into meme coins. Tag @${xHandle} on a post, choose a ticker, and Memeify generates the artwork, branding and a launch-ready token preview. Coming soon to X and TikTok.`,
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  xHandle,
  links: {
    x: `https://x.com/${xHandle}`,
  },
  // When set, the waitlist form POSTs `{ email }` here as JSON.
  // When unset, the form explains that signups are not open yet.
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT,
} as const;

/** The account people tag to summon Memeify, e.g. "@Memeifydotfun make this $DOGGO". */
export const MENTION = `@${xHandle}`;

export const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Demo", href: "/#demo" },
  { label: "Examples", href: "/#examples" },
  { label: "FAQ", href: "/#faq" },
] as const;
