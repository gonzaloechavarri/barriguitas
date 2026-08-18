import type { StrategyDistribution } from "@/lib/data/types/editable";

/**
 * Última distribución manual de la cartera.
 * Solo porcentajes — sin valores monetarios ni patrimonio.
 */
export type PortfolioSnapshot = {
  updatedAt: string;
  distribution: StrategyDistribution;
};
