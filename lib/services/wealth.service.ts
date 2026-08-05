import "server-only";

import type { WealthView } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import {
  formatPortfolioDeviation,
  getPortfolioSnapshot,
} from "@/lib/services/portfolio/portfolio.service";

export async function getWealthView(): Promise<WealthView> {
  const config = getFamilyConfig();
  const { patrimonio } = config;
  const snapshot = await getPortfolioSnapshot();

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
      allocations: [
        {
          icon: patrimonio.strategy.assets.acwi.icon,
          label: patrimonio.strategy.assets.acwi.label,
          percentage: `${snapshot.weights.acwi} %`,
        },
        {
          icon: patrimonio.strategy.assets.oro.icon,
          label: patrimonio.strategy.assets.oro.label,
          percentage: `${snapshot.weights.oro} %`,
        },
      ],
      target: [
        {
          icon: patrimonio.strategy.assets.acwi.icon,
          label: patrimonio.strategy.assets.acwi.label,
          percentage: `${patrimonio.strategy.target.acwi} %`,
        },
        {
          icon: patrimonio.strategy.assets.oro.icon,
          label: patrimonio.strategy.assets.oro.label,
          percentage: `${patrimonio.strategy.target.oro} %`,
        },
      ],
      statusMessage: snapshot.isAligned
        ? patrimonio.strategy.alignedMessage
        : patrimonio.strategy.driftMessage,
      deviation: formatPortfolioDeviation(snapshot.maxDeviation),
      isAligned: snapshot.isAligned,
    },
  };
}

/** @deprecated Usar getWealthView. */
export async function getWealthSummary(): Promise<WealthView> {
  return getWealthView();
}
