import type { WeddingData } from "@/lib/services";
import { CardTitle, GlassCard } from "./glass-card";

type NextPlanCardProps = {
  plan: WeddingData["nextPlan"];
};

export function NextPlanCard({ plan }: NextPlanCardProps) {
  return (
    <GlassCard className="flex flex-col p-6 sm:p-7" delay={240}>
      <CardTitle icon="✈️">{plan.cardTitle}</CardTitle>

      <div className="mt-10 sm:mt-12">
        <p className="flex items-center gap-2 text-base font-light tracking-[-0.01em] text-white/55">
          <span role="img" aria-hidden>
            🚄
          </span>
          {plan.label}
        </p>

        <p className="mt-2 text-xl font-light leading-snug tracking-[-0.02em] text-white/80 sm:text-[1.375rem]">
          {plan.destination}
        </p>

        <p className="mt-4 text-xs font-light leading-relaxed tracking-[-0.01em] text-white/30">
          {plan.subtitle}
        </p>
      </div>
    </GlassCard>
  );
}
