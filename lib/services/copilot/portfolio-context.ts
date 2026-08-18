import type { CopilotObservation } from "@/lib/data/types";
import {
  DEMO_COPILOT_PORTFOLIO,
  DEMO_COPILOT_PORTFOLIO_SNAPSHOT,
  DEMO_PORTFOLIO_NEAR_TARGET_THRESHOLD,
  DEMO_PORTFOLIO_SHIFT_THRESHOLD,
} from "./portfolio-demo";
import type {
  CopilotPortfolio,
  CopilotPortfolioPosition,
  CopilotPortfolioSnapshot,
  CopilotPortfolioWeightShift,
} from "./portfolio-types";

/**
 * Cartera conceptual del Copiloto.
 * Hoy devuelve datos demo; en el futuro puede leerse de una fuente segura.
 */
export function getCopilotPortfolio(): CopilotPortfolio {
  return DEMO_COPILOT_PORTFOLIO;
}

/**
 * Snapshot anterior de cartera.
 * Punto de extensión para persistencia segura — null mientras no exista histórico.
 */
export function getPreviousCopilotPortfolioSnapshot(): CopilotPortfolioSnapshot | null {
  return DEMO_COPILOT_PORTFOLIO_SNAPSHOT;
}

function calculateMaxDeviation(portfolio: CopilotPortfolio): number {
  return portfolio.positions.reduce((max, position) => {
    const targetWeight = portfolio.target[position.id] ?? 0;
    return Math.max(max, Math.abs(position.weight - targetWeight));
  }, 0);
}

export function comparePortfolioWeightShifts(
  current: CopilotPortfolioPosition[],
  previous: CopilotPortfolioPosition[],
): CopilotPortfolioWeightShift[] {
  const previousById = new Map(previous.map((position) => [position.id, position]));

  return current.map((position) => {
    const prior = previousById.get(position.id);
    return {
      id: position.id,
      label: position.label,
      delta: prior ? position.weight - prior.weight : 0,
    };
  });
}

function buildHistoricalPortfolioObservation(
  portfolio: CopilotPortfolio,
  previous: CopilotPortfolioSnapshot,
): CopilotObservation | null {
  const shifts = comparePortfolioWeightShifts(
    portfolio.positions,
    previous.positions,
  ).filter((shift) => Math.abs(shift.delta) >= DEMO_PORTFOLIO_SHIFT_THRESHOLD);

  if (shifts.length === 0) {
    return null;
  }

  const topShift = shifts.sort(
    (a, b) => Math.abs(b.delta) - Math.abs(a.delta),
  )[0];
  const direction = topShift.delta > 0 ? "mayor" : "menor";

  return {
    icon: "🌱",
    text: `${topShift.label} representa ahora una proporción ligeramente ${direction} de la cartera que en la última actualización.`,
    priority: 32,
  };
}

function buildTargetDeviationObservation(
  portfolio: CopilotPortfolio,
): CopilotObservation {
  const deviation = calculateMaxDeviation(portfolio);

  if (deviation <= DEMO_PORTFOLIO_NEAR_TARGET_THRESHOLD) {
    return {
      icon: "🌱",
      text: "La cartera está cerca de su distribución objetivo.",
      priority: 40,
    };
  }

  return {
    icon: "🌱",
    text: "La distribución actual se ha alejado ligeramente del objetivo.",
    priority: 38,
  };
}

/** Observación de cartera solo cuando requiere atención — sin consejos financieros. */
export function buildCopilotPortfolioObservationIfAttentionNeeded(): CopilotObservation | null {
  const portfolio = getCopilotPortfolio();
  const previous = getPreviousCopilotPortfolioSnapshot();

  if (previous) {
    const historical = buildHistoricalPortfolioObservation(portfolio, previous);
    if (historical) {
      return historical;
    }

    const hadDistributionChange = comparePortfolioWeightShifts(
      portfolio.positions,
      previous.positions,
    ).some((shift) => Math.abs(shift.delta) > 0);

    if (hadDistributionChange) {
      return {
        icon: "🌱",
        text: "Desde la última actualización, la distribución de la cartera ha cambiado.",
        priority: 34,
      };
    }
  }

  const deviation = calculateMaxDeviation(portfolio);
  if (deviation <= DEMO_PORTFOLIO_NEAR_TARGET_THRESHOLD) {
    return null;
  }

  return buildTargetDeviationObservation(portfolio);
}
