import { updateBarriguitas } from "@/lib/data/store/barriguitas-store";
import type { PortfolioSnapshot } from "@/lib/data/types/portfolio";
import type { StrategyDistribution } from "@/lib/data/types/editable";
import type { BarriguitasWealthData } from "@/lib/data/store/types";
import { formatShortDate, daysSince } from "@/lib/data/utils/dates";
import { isValidDistributionSum } from "@/lib/services/wealth-allocation.service";

export type PortfolioUpdateInput = {
  updatedAt: string;
  distribution: StrategyDistribution;
};

export function updatePortfolioSnapshot(input: PortfolioUpdateInput): boolean {
  if (!isValidDistributionSum(input.distribution)) {
    return false;
  }

  updateBarriguitas((current) => ({
    ...current,
    wealth: {
      ...current.wealth,
      portfolioSnapshot: {
        updatedAt: input.updatedAt,
        distribution: { ...input.distribution },
      },
    },
  }));

  return true;
}

export function formatSnapshotDateLabel(updatedAt: string): string {
  return formatShortDate(new Date(`${updatedAt}T12:00:00`));
}

/** Etiqueta discreta de antigüedad — null si la actualización es reciente. */
export function formatSnapshotAgeLabel(
  updatedAt: string,
  referenceDate: Date = new Date(),
): string | null {
  const days = daysSince(new Date(`${updatedAt}T12:00:00`), referenceDate);

  if (days < 45) {
    return null;
  }

  const months = Math.max(1, Math.round(days / 30));

  if (months === 1) {
    return "Última actualización: hace 1 mes.";
  }

  return `Última actualización: hace ${months} meses.`;
}

export function buildDistributionSummary(
  wealth: BarriguitasWealthData,
  distribution: StrategyDistribution,
): string {
  const { assets } = wealth.strategy;
  const parts: string[] = [];

  if (distribution.acwi > 0) {
    parts.push(`${distribution.acwi} % ${assets.acwi.label}`);
  }

  if (distribution.oro > 0) {
    parts.push(`${distribution.oro} % ${assets.oro.label}`);
  }

  if (distribution.momentum > 0) {
    parts.push(`${distribution.momentum} % ${assets.momentum.label}`);
  }

  return parts.join(" · ");
}

export function getDefaultPortfolioUpdateInput(
  wealth: BarriguitasWealthData,
): PortfolioUpdateInput {
  return {
    updatedAt: wealth.portfolioSnapshot.updatedAt,
    distribution: { ...wealth.portfolioSnapshot.distribution },
  };
}

export function sumDistributionPercentages(
  distribution: StrategyDistribution,
): number {
  return distribution.acwi + distribution.oro + distribution.momentum;
}
