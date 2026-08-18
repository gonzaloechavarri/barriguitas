import type { BarriguitasOverrides, BarriguitasSnapshot } from "./types";
<<<<<<< Updated upstream
import { SERVER_SNAPSHOT, createDefaultSnapshot } from "./types";
=======
<<<<<<< HEAD
import { createDefaultSnapshot } from "./types";
>>>>>>> Stashed changes

export function mergeSnapshot(
  overrides: BarriguitasOverrides | null,
  base: BarriguitasSnapshot = SERVER_SNAPSHOT,
): BarriguitasSnapshot {
  if (!overrides) {
    return base;
  }

<<<<<<< Updated upstream
  const defaults = createDefaultSnapshot();

=======
=======
import { SERVER_SNAPSHOT, createDefaultSnapshot } from "./types";

export function mergeSnapshot(
  overrides: BarriguitasOverrides | null,
  base: BarriguitasSnapshot = SERVER_SNAPSHOT,
): BarriguitasSnapshot {
  if (!overrides) {
    return base;
  }

  const defaults = createDefaultSnapshot();

>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
