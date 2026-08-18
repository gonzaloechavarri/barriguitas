import type { WealthView } from "@/lib/data/types";
import { CardTitle, GlassCard } from "@/modules/nosotros/components/glass-card";

type PortfolioSnapshotCardProps = {
  portfolio: WealthView["portfolio"];
  onUpdate: () => void;
};

export function PortfolioSnapshotCard({
  portfolio,
  onUpdate,
}: PortfolioSnapshotCardProps) {
  return (
    <GlassCard className="p-6 sm:p-7" delay={80}>
      <CardTitle icon="🌱">{portfolio.cardTitle}</CardTitle>

      <p className="mt-8 text-[1.0625rem] font-light leading-snug tracking-[-0.02em] text-white/75 sm:text-lg">
        {portfolio.distributionSummary}
      </p>

      <div className="mt-10 border-t border-white/[0.05] pt-6">
        <p className="text-xs font-light tracking-[-0.01em] text-white/30">
          Última actualización
        </p>
        <p className="mt-2 text-xl font-light tracking-[-0.02em] text-white/85 sm:text-[1.375rem]">
          {portfolio.lastUpdatedLabel}
        </p>
        {portfolio.ageLabel ? (
          <p className="mt-2 text-xs font-light tracking-[-0.01em] text-white/35">
            {portfolio.ageLabel}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onUpdate}
        className="mt-8 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm font-light tracking-[-0.01em] text-white/75 transition-colors hover:border-white/[0.12] hover:bg-white/[0.06] touch-manipulation"
      >
        {portfolio.updateActionLabel}
      </button>
    </GlassCard>
  );
}
