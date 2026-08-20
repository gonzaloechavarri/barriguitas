import type { StrategyDistribution } from "@/lib/data/types/editable";
import type { PortfolioSnapshot } from "@/lib/data/types/portfolio";
import type { BarriguitasWealthData } from "@/lib/data/store/types";
import { calculateDeviationFromCurrent } from "@/lib/services/wealth.utils";

export type WealthAllocation = {
  current: StrategyDistribution;
  maxDeviation: number;
  isAligned: boolean;
};

export function formatDeviation(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} %`;
}

function migrateStrategyDistribution(
  distribution: Record<string, number>,
): StrategyDistribution {
  return {
    acwi: distribution.acwi ?? 0,
    oro: distribution.oro ?? 0,
    nasdaq: distribution.nasdaq ?? distribution.momentum ?? 0,
  };
}

/** Distribución actual guardada en la última actualización manual. */
export function resolveWealthAllocation(
  wealth: BarriguitasWealthData,
): WealthAllocation {
  const current = { ...wealth.portfolioSnapshot.distribution };
  const maxDeviation = calculateDeviationFromCurrent(
    current,
    wealth.strategy.target,
  );

  return {
    current,
    maxDeviation,
    isAligned: maxDeviation <= wealth.strategy.deviationThreshold,
  };
}

export function isValidDistributionSum(distribution: StrategyDistribution): boolean {
  return distribution.acwi + distribution.oro + distribution.nasdaq === 100;
}

/** Convierte snapshots legacy con holdings monetarios a porcentajes. */
export function normalizePortfolioSnapshot(
  snapshot: unknown,
  fallback: PortfolioSnapshot,
): PortfolioSnapshot {
  if (!snapshot || typeof snapshot !== "object") {
    return fallback;
  }

  const candidate = snapshot as {
    updatedAt?: string;
    distribution?: StrategyDistribution;
    holdings?: Array<{ assetClass: string; value: number }>;
  };

  if (candidate.distribution) {
    const migrated = migrateStrategyDistribution(
      candidate.distribution as Record<string, number>,
    );

    if (isValidDistributionSum(migrated)) {
      return {
        updatedAt: candidate.updatedAt ?? fallback.updatedAt,
        distribution: migrated,
      };
    }
  }

  if (
    candidate.distribution &&
    isValidDistributionSum(candidate.distribution)
  ) {
    return {
      updatedAt: candidate.updatedAt ?? fallback.updatedAt,
      distribution: { ...candidate.distribution },
    };
  }

  if (candidate.holdings?.length) {
    const totals = { acwi: 0, oro: 0, nasdaq: 0 };

    for (const holding of candidate.holdings) {
      const key =
        holding.assetClass === "momentum" ? "nasdaq" : holding.assetClass;
      if (key in totals) {
        totals[key as keyof typeof totals] += holding.value;
      }
    }

    const total = totals.acwi + totals.oro + totals.nasdaq;

    if (total > 0) {
      const acwi = Math.round((totals.acwi / total) * 100);
      const oro = Math.round((totals.oro / total) * 100);

      return {
        updatedAt: candidate.updatedAt ?? fallback.updatedAt,
        distribution: {
          acwi,
          oro,
          nasdaq: 100 - acwi - oro,
        },
      };
    }
  }

  return fallback;
}
