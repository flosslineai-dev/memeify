import { MENTION } from "./site";

export type ArtKind = "dog" | "cat" | "space";
export type ThemeKey = "amber" | "violet" | "blue" | "emerald" | "rose";

export type Theme = {
  light: string;
  mid: string;
  deep: string;
  glow: string;
  soft: string;
};

export const THEMES: Record<ThemeKey, Theme> = {
  amber: { light: "#FDE68A", mid: "#F59E0B", deep: "#B45309", glow: "rgba(245,158,11,0.45)", soft: "#FFF6E5" },
  violet: { light: "#E9D5FF", mid: "#A855F7", deep: "#6D28D9", glow: "rgba(168,85,247,0.45)", soft: "#F5EEFF" },
  blue: { light: "#BFDBFE", mid: "#3B82F6", deep: "#1E40AF", glow: "rgba(59,130,246,0.5)", soft: "#EEF4FF" },
  emerald: { light: "#A7F3D0", mid: "#10B981", deep: "#047857", glow: "rgba(16,185,129,0.45)", soft: "#ECFDF5" },
  rose: { light: "#FECDD3", mid: "#F43F5E", deep: "#BE123C", glow: "rgba(244,63,94,0.45)", soft: "#FFF1F3" },
};

export const THEME_ORDER: ThemeKey[] = ["blue", "amber", "violet", "emerald", "rose"];

export type Person = {
  name: string;
  handle: string;
  colors: [string, string];
  verified?: boolean;
};

export const PEOPLE = {
  alex: { name: "Alex", handle: "alexbuilds", colors: ["#60A5FA", "#2563EB"], verified: true },
  maya: { name: "Maya", handle: "mayamakes", colors: ["#F472B6", "#A855F7"] },
  nina: { name: "Nina", handle: "purrfectnina", colors: ["#FBBF24", "#F97316"], verified: true },
  sam: { name: "Sam", handle: "samscrolls", colors: ["#34D399", "#0EA5E9"] },
  orbit: { name: "Orbit Daily", handle: "orbitdaily", colors: ["#818CF8", "#312E81"], verified: true },
  leo: { name: "Leo", handle: "leo_lol", colors: ["#FB7185", "#F59E0B"] },
  you: { name: "You", handle: "you", colors: ["#94A3B8", "#475569"] },
} satisfies Record<string, Person>;

export type PostStats = { replies: string; reposts: string; likes: string; views: string };

export type Example = {
  id: string;
  art: ArtKind;
  theme: ThemeKey;
  name: string;
  ticker: string;
  tagline: string;
  label: string;
  post: { author: Person; time: string; text: string; stats: PostStats };
  comment: { author: Person; text: string };
};

export const EXAMPLES: Example[] = [
  {
    id: "doggo",
    art: "dog",
    theme: "amber",
    name: "DOGGO",
    ticker: "DOGGO",
    tagline: "Just a dog. Now a meme coin.",
    label: "Cute dog photo",
    post: {
      author: PEOPLE.alex,
      time: "2m",
      text: "the face he makes when I say “one more photo”",
      stats: { replies: "12", reposts: "4", likes: "98", views: "2.4K" },
    },
    comment: { author: PEOPLE.maya, text: `${MENTION} make this $DOGGO` },
  },
  {
    id: "meow",
    art: "cat",
    theme: "violet",
    name: "MEOW",
    ticker: "MEOW",
    tagline: "Heard the treat bag. Became a coin.",
    label: "Funny cat meme",
    post: {
      author: PEOPLE.nina,
      time: "14m",
      text: "she heard it from three rooms away",
      stats: { replies: "341", reposts: "1.2K", likes: "9.8K", views: "210K" },
    },
    comment: { author: PEOPLE.sam, text: `${MENTION} launch $MEOW` },
  },
  {
    id: "moon",
    art: "space",
    theme: "blue",
    name: "MOON",
    ticker: "MOON",
    tagline: "Named by the crowd. Ready for orbit.",
    label: "Space-themed viral post",
    post: {
      author: PEOPLE.orbit,
      time: "1h",
      text: "we’re going to the moon. literally.",
      stats: { replies: "88", reposts: "640", likes: "5.1K", views: "96K" },
    },
    comment: { author: PEOPLE.leo, text: `${MENTION} make this $MOON` },
  },
];

export const ART_DEFAULT_THEME: Record<ArtKind, ThemeKey> = {
  dog: "amber",
  cat: "violet",
  space: "blue",
};

export const ART_LABELS: Record<ArtKind, string> = {
  dog: "Dog photo",
  cat: "Cat meme",
  space: "Space post",
};

export const TAGLINES: Record<ArtKind, string[]> = {
  dog: ["Just a dog. Now a meme coin.", "One more photo. One more coin.", "Good boy energy, minted by the timeline."],
  cat: ["Heard the treat bag. Became a coin.", "Zero sleep. Infinite chaos.", "Knocked it off the table and onto the timeline."],
  space: ["Named by the crowd. Ready for orbit.", "We said moon. We meant it.", "One small post, one giant meme."],
};

const MENTION_RE = new RegExp(`(^|\\s)${MENTION}\\b`, "i");

/** Pulls the Memeify mention and a `$TICKER` out of a free-text comment. */
export function parseComment(text: string) {
  const mention = MENTION_RE.test(text);
  const match = text.match(/\$([A-Za-z][A-Za-z0-9]{1,9})(?![A-Za-z0-9])/);
  return { mention, ticker: match ? match[1].toUpperCase() : null };
}
