import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { CommunityArt, CreativityArt, SimpleArt, SocialNativeArt } from "./features/FeatureArt";
import { CommunityIcon, SimpleIcon, SocialIcon, SparkIcon } from "./features/FeatureIcons";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
  art: ReactNode;
  span: string;
  tint: string;
  iconTint: string;
};

const FEATURES: Feature[] = [
  {
    title: "Social Native",
    body: "Create where conversations already happen. No new app to learn — a reply is the whole interface.",
    icon: <SocialIcon />,
    art: <SocialNativeArt />,
    span: "lg:col-span-7",
    tint: "bg-[linear-gradient(160deg,#EEF4FF,#F8FAFC)]",
    iconTint: "bg-brand text-white",
  },
  {
    title: "AI-Powered Creativity",
    body: "Turn posts into unique token visuals. Memeify reads the subject, the vibe and the palette, then designs the coin.",
    icon: <SparkIcon />,
    art: <CreativityArt />,
    span: "lg:col-span-5",
    tint: "bg-[linear-gradient(160deg,#F5F0FF,#F8FAFC)]",
    iconTint: "bg-iris text-white",
  },
  {
    title: "Simple by Design",
    body: "No complicated creation process. One mention, one ticker, one preview to review.",
    icon: <SimpleIcon />,
    art: <SimpleArt />,
    span: "lg:col-span-5",
    tint: "bg-[linear-gradient(160deg,#F1F5F9,#FFFFFF)]",
    iconTint: "bg-ink text-white",
  },
  {
    title: "Community Driven",
    body: "Give internet communities an easy way to create around their favorite moments — together, in public, in real time.",
    icon: <CommunityIcon />,
    art: <CommunityArt />,
    span: "lg:col-span-7",
    tint: "bg-[linear-gradient(160deg,#FFF7E8,#F8FAFC)]",
    iconTint: "bg-amber-500 text-white",
  },
];

export function Features() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="why-title"
          eyebrow="Why Memeify?"
          title="Built for the speed of internet culture."
          description="Memes move in minutes. Memeify is designed so the people who spot the moment can be the ones who name it."
        />

        <div className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-2 lg:grid-cols-12">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.1} className={cn(f.span)}>
              <article className="group flex h-full flex-col rounded-[30px] bg-white p-3 ring-1 ring-slate-900/[0.06] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-40px_rgba(15,23,42,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_40px_80px_-40px_rgba(37,99,235,0.35)]">
                <div className={cn("relative h-[250px] overflow-hidden rounded-[22px]", f.tint)}>{f.art}</div>
                <div className="flex items-start gap-4 px-4 pb-4 pt-6">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-[0_8px_20px_-10px_rgba(15,23,42,0.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105",
                      f.iconTint,
                    )}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{f.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
