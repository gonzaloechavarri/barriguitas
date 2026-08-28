import type { StrategyDistribution } from "@/lib/data/types/editable";
import type { PortfolioSnapshot } from "@/lib/data/types/portfolio";
import type { BarriguitasWealthData } from "@/lib/data/store/types";
import { calculateDeviationFromCurrent } from "@/lib/services/wealth.utils";

export const STRATEGY_ASSET_KEYS = ["acwi", "oro", "nasdaq"] as const;

export type StrategyAssetKey = (typeof STRATEGY_ASSET_KEYS)[number];

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

export function sumStrategyDistribution(
  distribution: StrategyDistribution,
): number {
  return distribution.acwi + distribution.oro + distribution.nasdaq;
}

function otherAssetKeys(key: StrategyAssetKey): StrategyAssetKey[] {
  return STRATEGY_ASSET_KEYS.filter((assetKey) => assetKey !== key);
}

/** Activo donante: mayor peso entre los demás (orden fijo en empates). */
export function pickAllocationDonorKey(
  distribution: StrategyDistribution,
  key: StrategyAssetKey,
): StrategyAssetKey | null {
  let donor: StrategyAssetKey | null = null;

  for (const assetKey of otherAssetKeys(key)) {
    if (distribution[assetKey] <= 0) {
      continue;
    }

    if (
      donor === null ||
      distribution[assetKey] > distribution[donor]
    ) {
      donor = assetKey;
    }
  }

  return donor;
}

/** Activo receptor: menor peso entre los demás (orden fijo en empates). */
export function pickAllocationRecipientKey(
  distribution: StrategyDistribution,
  key: StrategyAssetKey,
): StrategyAssetKey | null {
  let recipient: StrategyAssetKey | null = null;

  for (const assetKey of otherAssetKeys(key)) {
    if (
      recipient === null ||
      distribution[assetKey] < distribution[recipient]
    ) {
      recipient = assetKey;
    }
  }

  return recipient;
}

/** Permite sumar 1 % si el activo no está al 100 % y hay otro con margen para ceder. */
export function canIncreaseAllocation(
  distribution: StrategyDistribution,
  key: StrategyAssetKey,
): boolean {
  return distribution[key] < 100 && pickAllocationDonorKey(distribution, key) !== null;
}

/** Permite restar 1 % si el activo tiene peso y hay otro que pueda recibirlo. */
export function canDecreaseAllocation(
  distribution: StrategyDistribution,
  key: StrategyAssetKey,
): boolean {
  return distribution[key] > 0 && pickAllocationRecipientKey(distribution, key) !== null;
}

/** Ajusta un activo ±1 % redistribuyendo el punto en otro activo para mantener 100 %. */
export function adjustStrategyAllocation(
  distribution: StrategyDistribution,
  key: StrategyAssetKey,
  delta: 1 | -1,
): StrategyDistribution | null {
  if (delta > 0) {
    const donor = pickAllocationDonorKey(distribution, key);

    if (!canIncreaseAllocation(distribution, key) || !donor) {
      return null;
    }

    return {
      ...distribution,
      [key]: distribution[key] + 1,
      [donor]: distribution[donor] - 1,
    };
  }

  const recipient = pickAllocationRecipientKey(distribution, key);

  if (!canDecreaseAllocation(distribution, key) || !recipient) {
    return null;
  }

  return {
    ...distribution,
    [key]: distribution[key] - 1,
    [recipient]: distribution[recipient] + 1,
  };
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
