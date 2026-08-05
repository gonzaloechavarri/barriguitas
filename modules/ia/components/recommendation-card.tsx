import type { CopilotView } from "@/lib/services";
import {
  CardTitle,
  GlassCard,
} from "@/modules/nosotros/components/glass-card";

type RecommendationCardProps = {
  view: CopilotView;
};

export function RecommendationCard({ view }: RecommendationCardProps) {
  return (
    <GlassCard className="p-8 sm:p-10" delay={80}>
      <CardTitle icon="🤖">Copiloto</CardTitle>

      <p className="mt-10 text-lg font-light leading-relaxed tracking-[-0.01em] text-white/75 sm:mt-12 sm:text-xl">
        {view.originIcon ? (
          <span className="flex items-start gap-2.5">
            <span
              className="text-base opacity-50 sm:text-lg"
              role="img"
              aria-hidden
            >
              {view.originIcon}
            </span>
            <span>{view.content}</span>
          </span>
        ) : (
          view.content
        )}
      </p>

      <p className="mt-4 text-xs font-light leading-relaxed tracking-[-0.01em] text-white/30">
        {view.subtext}
      </p>
    </GlassCard>
  );
}
