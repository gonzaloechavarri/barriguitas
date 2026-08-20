import type { WeddingData } from "@/lib/services";
import { NextPlanCard } from "./components/next-plan-card";
import { WeddingCard } from "./components/wedding-card";

type NosotrosViewProps = {
  weddingData: WeddingData;
};

export function NosotrosView({ weddingData }: NosotrosViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4">
      <header className="mb-8 opacity-0 animate-content-enter sm:mb-10">
        <h1 className="flex items-center gap-2.5 text-[1.625rem] font-normal tracking-[-0.02em] text-white/92 sm:text-[1.75rem]">
          <span aria-hidden>❤️</span>
          Nosotros
        </h1>
        <p className="mt-2.5 text-[0.9375rem] font-light tracking-[-0.01em] text-white/38 sm:mt-3">
          Lo que se acerca en nuestra vida
        </p>
      </header>

      <div className="flex flex-col gap-5 sm:gap-6">
        <WeddingCard data={weddingData} />
        <NextPlanCard plan={weddingData.nextPlan} />
      </div>
    </div>
  );
}
