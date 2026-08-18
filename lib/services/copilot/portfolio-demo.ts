import type {
  CopilotPortfolio,
  CopilotPortfolioSnapshot,
} from "./portfolio-types";

/**
 * Cartera ficticia del Copiloto — SOLO DEMO.
 * No representa cartera, pesos ni valores reales.
 * Sustituir por fuente segura cuando exista persistencia privada.
 */
export const DEMO_COPILOT_PORTFOLIO: CopilotPortfolio = {
  isDemo: true,
  totalValue: 100_000,
  updatedAt: "2026-08-01",
  positions: [
    { id: "acwi", label: "ACWI", weight: 79 },
    { id: "oro", label: "Oro", weight: 21 },
  ],
  target: {
    acwi: 80,
    oro: 20,
  },
};

/** Histórico demo desactivado hasta contar con persistencia segura. */
export const DEMO_COPILOT_PORTFOLIO_SNAPSHOT: CopilotPortfolioSnapshot | null =
  null;

/** Desviación máxima (puntos porcentuales) para considerar la cartera "cerca" del objetivo. */
export const DEMO_PORTFOLIO_NEAR_TARGET_THRESHOLD = 2;

/** Cambio mínimo de peso para mencionar un shift entre snapshots. */
export const DEMO_PORTFOLIO_SHIFT_THRESHOLD = 1;
