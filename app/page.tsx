import { CurrentTime } from "@/components/current-time";
import { FeaturesGrid } from "@/components/features-grid";
import { Greeting } from "@/components/hero";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-atlas-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(255,255,255,0.04),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(120,120,120,0.04),transparent)]"
      />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8 sm:px-10 sm:py-10">
        <header className="flex items-center justify-between">
          <Logo />
          <CurrentTime />
        </header>

        <main className="flex flex-1 flex-col pt-20 sm:pt-24 lg:pt-28">
          <Greeting />

          <div className="mt-8 sm:mt-10">
            <FeaturesGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
