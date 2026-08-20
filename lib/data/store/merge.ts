import type { BarriguitasOverrides, BarriguitasSnapshot } from "./types";
import { createDefaultSnapshot } from "./types";
import { normalizePortfolioSnapshot } from "@/lib/services/wealth-allocation.service";

function migrateWealthTarget(
  defaults: BarriguitasSnapshot["wealth"]["strategy"]["target"],
  overrides?: Record<string, number>,
) {
  const merged = {
    ...defaults,
    ...overrides,
  } as Record<string, number>;

  return {
    acwi: merged.acwi ?? defaults.acwi,
    oro: merged.oro ?? defaults.oro,
    nasdaq: merged.nasdaq ?? merged.momentum ?? defaults.nasdaq,
  };
}

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
        target: migrateWealthTarget(
          defaults.wealth.strategy.target,
          overrides.wealth?.strategy?.target as Record<string, number> | undefined,
        ),
      },
      portfolioSnapshot: normalizePortfolioSnapshot(
        overrides.wealth?.portfolioSnapshot,
        defaults.wealth.portfolioSnapshot,
      ),
    },
    // Listas viven en Supabase — el snapshot local solo conserva demo estática.
    lists: defaults.lists,
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
      portfolioSnapshot: snapshot.wealth.portfolioSnapshot,
    },
  };
}
