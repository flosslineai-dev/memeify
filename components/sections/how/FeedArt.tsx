import { Heart, MessageCircle, MousePointer2, Repeat2 } from "lucide-react";
import { PostArt } from "@/components/art/PostArt";
import { Sparkle } from "@/components/brand/Doodles";
import { Avatar } from "@/components/ui/Social";
import { PEOPLE, type ArtKind, type Person } from "@/lib/samples";

type FeedItem = { person: Person; text: string; art?: ArtKind; likes: string };

const FEED: FeedItem[] = [
  { person: PEOPLE.alex, text: "the face he makes when I say “one more photo”", art: "dog", likes: "98" },
  { person: PEOPLE.sam, text: "POV: the group chat at 2am", likes: "3.1K" },
  { person: PEOPLE.nina, text: "she heard it from three rooms away", art: "cat", likes: "9.8K" },
  { person: PEOPLE.leo, text: "this is the funniest thing on the internet today and I will not elaborate", likes: "640" },
  { person: PEOPLE.orbit, text: "we’re going to the moon. literally.", art: "space", likes: "5.1K" },
];

function MiniPost({ item }: { item: FeedItem }) {
  return (
    <div className="pb-3">
      <div className="rounded-2xl bg-white p-3 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.06]">
        <div className="flex items-center gap-2">
          <Avatar person={item.person} size={22} className="ring-1" />
          <span className="text-[11px] font-semibold text-ink">{item.person.name}</span>
          <span className="text-[11px] text-slate-400">@{item.person.handle}</span>
        </div>
        <p className="mt-1.5 text-[12px] leading-snug text-ink-2">{item.text}</p>
        {item.art && (
          <div className="relative mt-2 h-[76px] overflow-hidden rounded-xl">
            <PostArt kind={item.art} className="absolute inset-0 h-full w-full" />
          </div>
        )}
        <div className="mt-2 flex gap-4 text-[10px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3 w-3" /> 12
          </span>
          <span className="inline-flex items-center gap-1">
            <Repeat2 className="h-3 w-3" /> 40
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="h-3 w-3" /> {item.likes}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Step 1 artwork: an endlessly scrolling feed passing under a "meme spotted" viewfinder. */
export function FeedArt() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0 overflow-hidden fade-y">
        <div className="mx-auto w-[78%] max-w-[260px] animate-marquee-y">
          {[...FEED, ...FEED].map((item, i) => (
            <MiniPost key={i} item={item} />
          ))}
        </div>
      </div>

      {/* viewfinder */}
      <div className="absolute inset-x-[9%] top-1/2 h-[46%] -translate-y-1/2 rounded-[20px] bg-brand/[0.04] shadow-[0_0_0_1px_rgba(37,99,235,0.25)]">
        <span className="absolute -left-px -top-px h-5 w-5 rounded-tl-[20px] border-l-[3px] border-t-[3px] border-brand" />
        <span className="absolute -right-px -top-px h-5 w-5 rounded-tr-[20px] border-r-[3px] border-t-[3px] border-brand" />
        <span className="absolute -bottom-px -left-px h-5 w-5 rounded-bl-[20px] border-b-[3px] border-l-[3px] border-brand" />
        <span className="absolute -bottom-px -right-px h-5 w-5 rounded-br-[20px] border-b-[3px] border-r-[3px] border-brand" />
        <span className="absolute -top-3.5 left-4 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.9)]">
          <Sparkle className="h-3 w-3" /> meme spotted
        </span>
        <MousePointer2 className="absolute -bottom-4 right-6 h-7 w-7 animate-float fill-ink text-white drop-shadow-md" />
      </div>
    </div>
  );
}
