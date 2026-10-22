import { ArrowDown, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/Social";
import { FeedArt } from "./how/FeedArt";
import { StepsTrack } from "./how/StepsTrack";
import { TagComposerArt } from "./how/TagComposerArt";
import { TransformArt } from "./how/TransformArt";

type Step = {
  title: string;
  body: ReactNode;
  art: ReactNode;
  tint: string;
};

const STEPS: Step[] = [
  {
    title: "Find Your Meme",
    body: "Discover a funny social post, viral image, video, or internet moment.",
    art: <FeedArt />,
    tint: "bg-[linear-gradient(180deg,#F1F5F9,#EAF0FB)]",
  },
  {
    title: "Tag Memeify",
    body: (
      <>
        Mention @memeify and specify a token ticker. For example:{" "}
        <span className="whitespace-nowrap rounded-lg bg-white px-1.5 py-0.5 text-ink ring-1 ring-slate-200">
          <RichText text="@memeify launch $PEPE" />
        </span>
      </>
    ),
    art: <TagComposerArt />,
    tint: "bg-[linear-gradient(180deg,#EEF4FF,#F4F0FF)]",
  },
  {
    title: "Watch It Come to Life",
    body: "Memeify generates artwork, metadata, and a launch-ready token concept. Complete any required launch confirmation to mint.",
    art: <TransformArt />,
    tint: "bg-[linear-gradient(180deg,#F4F0FF,#EEF4FF)]",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title="Three steps. Infinite possibilities."
          description="No dashboards, no forms, no smart-contract know-how. Memeify lives right where the jokes already are."
        />

        <div className="mt-16 sm:mt-20">
          <StepsTrack />
          <ol className="grid gap-8 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.12} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-[30px] bg-white p-3 ring-1 ring-slate-900/[0.06] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-36px_rgba(15,23,42,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_40px_80px_-36px_rgba(37,99,235,0.35)]">
                    <div className={`relative h-[268px] overflow-hidden rounded-[22px] ${step.tint}`}>{step.art}</div>
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                      <span className="font-mono text-[12px] font-medium tracking-[0.12em] text-brand">STEP 0{i + 1}</span>
                      <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-ink">{step.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </article>
                </Reveal>

                {i < STEPS.length - 1 && (
                  <>
                    <span
                      aria-hidden
                      className="absolute -right-[38px] top-[124px] z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] ring-1 ring-slate-900/[0.06] lg:flex"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span
                      aria-hidden
                      className="absolute -bottom-[38px] left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-brand shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] ring-1 ring-slate-900/[0.06] lg:hidden"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
