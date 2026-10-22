# Memeify — prelaunch website

**From Mention to Mint.** Marketing site for Memeify, a social-native platform that turns social posts into meme coin launches: tag `@memeify` on a post, add a `$TICKER`, get a token preview.

This is a prelaunch site. Every demo, token card and animation uses local sample data, and nothing claims that integrations or launches are live.

## Stack

- Next.js 16 (App Router, Turbopack) and TypeScript
- Tailwind CSS v4 (design tokens live in `app/globals.css`)
- Motion for React (`motion/react`) for animation, with reduced-motion support throughout
- Lucide icons, Geist and Caveat fonts
- Hand-built inline SVG artwork: no stock photos and no external image assets

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build && npm start   # production build
npm run lint
```

## Configuration

| Setting | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | env | Canonical URL for metadata, OG images, sitemap and robots. Falls back to the Vercel production URL, then `http://localhost:3000`. |
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | env | Optional. When set, the waitlist form sends `{ "email": "..." }` as JSON in a POST request. When unset, the form tells visitors that the waitlist isn't open and that nothing was saved. |
| X / Twitter account | `lib/site.ts` → `xHandle`, `links.x` | The official account, [@Memeifydotfun](https://x.com/Memeifydotfun). Every "Follow on X" link and the FAQ, footer and waitlist copy read from here. |

## Project map

```
app/                    routes, metadata, OG/Twitter/Apple images, robots, sitemap, legal pages
components/brand/       Sparky the mascot, logo, doodle marks
components/art/         original SVG illustrations (dog, cat meme, space) and the coin emblem
components/ui/          buttons, reveal wrapper, social post, comment bubble, token cards
components/sections/    page sections: hero, how it works, gallery, features, showcase, FAQ, CTA, footer
components/demo/        the interactive "Try the magic" simulation
lib/                    site config, sample data, FAQ copy, helpers
```

## Notes

- **Mascot and art:** `MascotSvg` and `DogArtSvg` don't use hooks, so the OG image (`lib/og.tsx`) can serialize them without `react-dom/server`.
- **Motion:** the site honours `prefers-reduced-motion`. Looping animations stop, the hero shows its finished state with a replay button, and CSS animations collapse to their final frame.
- **iCloud Drive:** if this folder sits inside an iCloud-synced `~/Documents`, iCloud may upload `node_modules` and block file reads while it does, which can stall `next dev`. To fix it, move the project outside iCloud, or exclude the folder from sync with `mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules`.
