import type { BarriguitasOverrides, BarriguitasSnapshot } from "./types";
import { createDefaultSnapshot } from "./types";

export function mergeSnapshot(
  overrides: BarriguitasOverrides | null,
): BarriguitasSnapshot {
  const defaults = createDefaultSnapshot();

  if (!overrides) {
    return defaults;
  }

  return {
    couple: {
      ...defaults.couple,
      wedding: {
        ...defaults.couple.wedding,
        ...overrides.couple?.wedding,
      },
      nextTrip: {
        ...defaults.couple.nextTrip,
        ...overrides.couple?.nextTrip,
      },
      milestones: overrides.couple?.milestones ?? defaults.couple.milestones,
    },
    house: {
      ...defaults.house,
      cuidado: {
        ...defaults.house.cuidado,
        ...overrides.house?.cuidado,
      },
    },
    wealth: {
      ...defaults.wealth,
      strategy: {
        ...defaults.wealth.strategy,
        target: {
          ...defaults.wealth.strategy.target,
          ...overrides.wealth?.strategy?.target,
        },
      },
      currentDistribution:
        overrides.wealth?.currentDistribution ??
        defaults.wealth.currentDistribution,
    },
    app: defaults.app,
  };
}

export function extractOverrides(
  snapshot: BarriguitasSnapshot,
): BarriguitasOverrides {
  return {
    couple: {
      wedding: snapshot.couple.wedding,
      nextTrip: snapshot.couple.nextTrip,
      milestones: snapshot.couple.milestones,
    },
    house: {
      cuidado: {
        lastCleaningAt: snapshot.house.cuidado.lastCleaningAt,
      },
    },
    wealth: {
      strategy: {
        target: snapshot.wealth.strategy.target,
      },
      currentDistribution: snapshot.wealth.currentDistribution,
    },
  };
}
