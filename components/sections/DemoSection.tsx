import { Demo } from "@/components/demo/Demo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function DemoSection() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(180deg,transparent,#F1F5F9_18%,#F1F5F9_82%,transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="demo-title"
          eyebrow="Interactive demo"
          title="Try the magic."
          description="Pick a post, write a comment and watch Memeify build a token preview. This is a simulation using sample data — nothing leaves your browser."
        />
        <Reveal className="mt-14 sm:mt-16" y={40}>
          <Demo />
        </Reveal>
      </div>
    </section>
  );
}
