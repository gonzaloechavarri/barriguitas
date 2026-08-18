import type { CopilotPortfolioSnapshot } from "./portfolio-types";

/** Histórico demo desactivado hasta contar con persistencia segura. */
export const DEMO_COPILOT_PORTFOLIO_SNAPSHOT: CopilotPortfolioSnapshot | null =
  null;

/** Desviación máxima (puntos porcentuales) para considerar la cartera "cerca" del objetivo. */
export const DEMO_PORTFOLIO_NEAR_TARGET_THRESHOLD = 2;

/** Cambio mínimo de peso para mencionar un shift entre snapshots. */
export const DEMO_PORTFOLIO_SHIFT_THRESHOLD = 1;
