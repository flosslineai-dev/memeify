import { Mascot } from "@/components/brand/Mascot";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
      <Mascot mood="wow" arms className="h-32 w-32" />
      <p className="mt-8 font-mono text-[13px] uppercase tracking-[0.14em] text-brand">404</p>
      <h1 className="mt-3 text-balance text-5xl font-semibold tracking-[-0.045em] text-ink">This post got deleted.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The page you’re looking for doesn’t exist. The good memes are back home.</p>
      <ButtonLink href="/" className="mt-8">
        Back to Memeify
      </ButtonLink>
    </main>
  );
}
