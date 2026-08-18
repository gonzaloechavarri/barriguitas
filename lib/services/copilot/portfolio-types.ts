/** Posición ponderada dentro de la cartera del Copiloto. */
export type CopilotPortfolioPosition = {
  id: string;
  label: string;
  /** Peso en porcentaje (0–100). */
  weight: number;
};

/** Distribución objetivo por identificador de posición. */
export type CopilotPortfolioTarget = Record<string, number>;

/**
 * Vista conceptual de cartera para el Copiloto.
 * Los datos demo no representan una cartera real.
 */
export type CopilotPortfolio = {
  isDemo: true;
  totalValue: number;
  positions: CopilotPortfolioPosition[];
  target: CopilotPortfolioTarget;
  updatedAt: string;
};

/**
 * Snapshot histórico de cartera para comparaciones futuras.
 * Preparado para persistencia segura — sin histórico real todavía.
 */
export type CopilotPortfolioSnapshot = {
  capturedAt: string;
  totalValue: number;
  positions: CopilotPortfolioPosition[];
};

export type CopilotPortfolioWeightShift = {
  id: string;
  label: string;
  delta: number;
};
