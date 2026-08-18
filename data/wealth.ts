export const wealthData = {
  cardTitle: "Ahorro",
  subtitle: "La estrategia sigue su camino.",
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  /** Años de histórico para la métrica de largo plazo. */
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  performanceLookbackYears: 5,
  marketAssets: {
    acwi: {
      isin: "IE00B44Z5B48",
      yahooSymbol: "ISAC.L",
    },
    oro: {
      isin: "IE00B579F325",
      yahooSymbol: "SGLN.L",
    },
  },
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
  currentDistribution: { acwi: 81, oro: 19, momentum: 0 },
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  /** Posiciones internas — nunca se muestran en la interfaz. */
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  holdings: [
    { assetClass: "acwi", value: 280_246.36, source: "indexa" },
    { assetClass: "acwi", value: 22_397.4, source: "IE00B44Z5B48" },
    { assetClass: "oro", value: 69_447.02, source: "IE00B579F325" },
  ] as const,
<<<<<<< Updated upstream
  rebalancePhilosophy: "contributions-only" as const,

=======
<<<<<<< HEAD
  /** Futuro Copiloto: sugerir aportaciones, nunca ventas. */
  rebalancePhilosophy: "contributions-only" as const,

  /** Señales futuras para el Copiloto. */
=======
  rebalancePhilosophy: "contributions-only" as const,

>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  copilot: {
    icon: "🌱",
  },
} as const;

export type WealthData = typeof wealthData;
