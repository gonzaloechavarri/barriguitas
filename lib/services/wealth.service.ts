import "server-only";

import type { WealthView } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import {
  formatPortfolioDeviation,
  getPortfolioSnapshot,
} from "@/lib/services/portfolio/portfolio.service";

const STRATEGY_ASSET_KEYS = ["acwi", "oro", "momentum"] as const;

export async function getWealthView(): Promise<WealthView> {
  const config = getFamilyConfig();
  const { patrimonio } = config;
  const snapshot = await getPortfolioSnapshot();
  const { assets, target } = patrimonio.strategy;

  return {
    cardTitle: patrimonio.cardTitle,
    subtitle: patrimonio.subtitle,
    performance: [
      { label: "Última sesión", change: snapshot.performance.lastSession },
      { label: "30 días", change: snapshot.performance.days30 },
      { label: "Este año", change: snapshot.performance.yearToDate },
      {
        label: "Últimos 5 años",
        change: snapshot.performance.fiveYears,
      },
    ],
    strategy: {
      cardTitle: patrimonio.strategy.cardTitle,
      allocations: STRATEGY_ASSET_KEYS.map((key) => ({
        icon: assets[key].icon,
        label: assets[key].label,
        percentage: `${snapshot.weights[key]} %`,
      })),
      target: STRATEGY_ASSET_KEYS.map((key) => ({
        icon: assets[key].icon,
        label: assets[key].label,
        percentage: `${target[key]} %`,
      })),
      statusMessage: patrimonio.strategy.transitionMessage,
      deviation: formatPortfolioDeviation(snapshot.maxDeviation),
      isInTransition: snapshot.isInTransition,
    },
  };
}

/** @deprecated Usar getWealthView. */
export async function getWealthSummary(): Promise<WealthView> {
  return getWealthView();
}
