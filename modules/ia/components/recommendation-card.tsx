import type { CopilotRecommendation } from "@/lib/data/types";
import {
  CardTitle,
  GlassCard,
} from "@/modules/nosotros/components/glass-card";

type RecommendationCardProps = {
  recommendation: CopilotRecommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <GlassCard className="p-8 sm:p-10" delay={80}>
      <CardTitle icon="🤖">Copiloto</CardTitle>

      <p className="mt-10 text-lg font-light leading-relaxed tracking-[-0.01em] text-white/75 sm:mt-12 sm:text-xl">
        <span className="flex items-start gap-2.5">
          {recommendation.icon ? (
            <span
              className="text-base opacity-50 sm:text-lg"
              role="img"
              aria-hidden
            >
              {recommendation.icon}
            </span>
          ) : null}
          <span>{recommendation.title}</span>
        </span>
      </p>

      <p className="mt-4 text-xs font-light leading-relaxed tracking-[-0.01em] text-white/30">
        {recommendation.subtitle}
      </p>
    </GlassCard>
  );
}
