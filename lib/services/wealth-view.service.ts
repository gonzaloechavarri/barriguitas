import type { WealthView } from "@/lib/data/types";
import { getWealthData } from "@/lib/data/providers/local";
import { formatDeviation, resolveWealthAllocation } from "@/lib/services/wealth-allocation.service";
import {
  buildDistributionSummary,
  formatSnapshotAgeLabel,
  formatSnapshotDateLabel,
} from "@/lib/services/wealth-snapshot.service";

const STRATEGY_ASSET_KEYS = ["acwi", "oro", "nasdaq"] as const;

/** Construye la vista de Ahorro a partir de la distribución guardada. */
export function buildWealthView(): WealthView {
  const wealth = getWealthData();
  const { assets, target } = wealth.strategy;
  const allocation = resolveWealthAllocation(wealth);
  const { current } = allocation;

  return {
    cardTitle: wealth.cardTitle,
    subtitle: wealth.subtitle,
    portfolio: {
      cardTitle: "Cartera",
      distributionSummary: buildDistributionSummary(wealth, current),
      lastUpdatedLabel: formatSnapshotDateLabel(wealth.portfolioSnapshot.updatedAt),
      ageLabel: formatSnapshotAgeLabel(wealth.portfolioSnapshot.updatedAt),
      updateActionLabel: "Actualizar cartera",
    },
    strategy: {
      cardTitle: wealth.strategy.cardTitle,
      allocationsLabel: "Cartera actual",
      allocations: STRATEGY_ASSET_KEYS.map((key) => ({
        icon: assets[key].icon,
        label: assets[key].label,
        percentage: `${current[key]} %`,
      })),
      target: STRATEGY_ASSET_KEYS.map((key) => ({
        icon: assets[key].icon,
        label: assets[key].label,
        percentage: `${target[key]} %`,
      })),
      statusMessage: wealth.strategy.transitionMessage,
      deviation: formatDeviation(allocation.maxDeviation),
      isInTransition: !allocation.isAligned,
    },
  };
}
