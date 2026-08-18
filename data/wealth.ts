/**
 * Cartera de inversión de Ahorro.
 * Solo distribución porcentual — sin patrimonio ni valores monetarios.
 */
export const wealthData = {
  cardTitle: "Ahorro",
  subtitle: "La cartera sigue su camino.",
  strategy: {
    cardTitle: "Estrategia",
    target: { acwi: 85, oro: 10, momentum: 5 },
    deviationThreshold: 3,
    transitionMessage:
      "La estrategia está evolucionando hacia el nuevo objetivo.",
    assets: {
      acwi: { icon: "🌍", label: "Global" },
      oro: { icon: "🥇", label: "Oro" },
      momentum: { icon: "⚡", label: "Momentum" },
    },
  },
  /** Distribución demo — porcentajes ficticios. */
  portfolioSnapshot: {
    updatedAt: "2026-02-18",
    distribution: { acwi: 80, oro: 20, momentum: 0 },
  },
  rebalancePhilosophy: "contributions-only" as const,
  copilot: {
    icon: "🌱",
  },
} as const;

export type WealthData = typeof wealthData;
