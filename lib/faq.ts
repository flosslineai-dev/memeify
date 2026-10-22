import { siteConfig } from "./site";

export const FAQS = [
  {
    q: "What is Memeify?",
    a: "Memeify is a social-native platform, currently in development, that turns social media posts into meme coin launches. Mention @memeify on a post with a ticker, and Memeify prepares the artwork, branding and a token preview for you.",
  },
  {
    q: "How do I create a meme coin?",
    a: "Once Memeify is live, you’ll reply to a post with @memeify and a ticker — for example, “@memeify make this $DOGGO”. Memeify generates a token preview, and nothing launches until you review it and complete any required authorization and confirmation.",
  },
  {
    q: "Which social platforms will Memeify support?",
    a: "X and TikTok are the initial target platforms. Neither integration is live yet. Memeify is not affiliated with, endorsed by or sponsored by X or TikTok.",
  },
  {
    q: "Does Memeify create the artwork automatically?",
    a: "That’s the plan. Memeify is being designed to use AI to turn a post into coin artwork, a name and token metadata automatically, and you’ll see a preview before anything goes live. The artwork on this site is illustrative.",
  },
  {
    q: "Which blockchain will Memeify support?",
    a: "Solana is the planned blockchain, with launches handled through a supported Solana launch platform.",
  },
  {
    q: "Is Memeify free to use?",
    a: "Pricing hasn’t been announced yet. Any fees — including platform or network fees — will be shared clearly before launch.",
  },
  {
    q: "Do I need a crypto wallet?",
    a: "Launching a token on Solana is expected to require a compatible wallet so you can authorize and confirm the launch. Exact requirements will be published before launch. You don’t need a wallet to try the demo on this page.",
  },
  {
    q: "When will Memeify launch?",
    a: `There’s no public launch date yet. Follow @${siteConfig.xHandle} on X for announcements as they happen.`,
  },
] as const;
