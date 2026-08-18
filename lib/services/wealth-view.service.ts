import type { WealthView } from "@/lib/data/types";
import { getWealthData } from "@/lib/data/providers/local";
import { calculateDeviationFromCurrent } from "@/lib/services/wealth.utils";
import type { WealthPerformance } from "@/lib/services/portfolio/portfolio.service";
import { formatDeviation } from "@/lib/services/portfolio/portfolio.utils";

/** Construye la vista de Ahorro a partir de la cartera de inversión. */
const STRATEGY_ASSET_KEYS = ["acwi", "oro", "momentum"] as const;

export function buildWealthView(performance: WealthPerformance): WealthView {
  const wealth = getWealthData();
  const { assets, target } = wealth.strategy;
  const { currentDistribution } = wealth;
  const maxDeviation = calculateDeviationFromCurrent(
    currentDistribution,
    target,
  );

  return {
    cardTitle: wealth.cardTitle,
    subtitle: wealth.subtitle,
    performance: [
      { label: "Última sesión", change: performance.lastSession },
      { label: "30 días", change: performance.days30 },
      { label: "Este año", change: performance.yearToDate },
      {
        label: "Últimos 5 años",
        change: performance.fiveYears,
      },
    ],
    strategy: {
      cardTitle: wealth.strategy.cardTitle,
      allocations: STRATEGY_ASSET_KEYS.map((key) => ({
        icon: assets[key].icon,
        label: assets[key].label,
        percentage: `${currentDistribution[key]} %`,
      })),
      target: STRATEGY_ASSET_KEYS.map((key) => ({
        icon: assets[key].icon,
        label: assets[key].label,
        percentage: `${target[key]} %`,
      })),
      statusMessage: wealth.strategy.transitionMessage,
      deviation: formatDeviation(maxDeviation),
      isInTransition: true,
    },
  };
}
