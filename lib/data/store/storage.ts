import type { BarriguitasOverrides } from "./types";

const STORAGE_KEY = "barriguitas:data";
const LEGACY_CASA_KEY = "barriguitas:casa";

type LegacyCasaStorage = {
  limpiezaExteriorCompletedAt?: string;
};

export function readOverrides(): BarriguitasOverrides | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BarriguitasOverrides & {
        lists?: unknown;
        wealth?: BarriguitasOverrides["wealth"] & {
          currentDistribution?: unknown;
          holdings?: unknown;
        };
      };
      delete parsed.lists;
      if (parsed.wealth?.portfolioSnapshot) {
        const legacy = parsed.wealth.portfolioSnapshot as {
          holdings?: unknown;
        };
        if ("holdings" in legacy) {
          delete legacy.holdings;
        }
      }
      if (parsed.wealth) {
        delete parsed.wealth.currentDistribution;
        delete parsed.wealth.holdings;
      }
      return parsed;
    }

    return migrateLegacyCasaStorage();
  } catch {
    return null;
  }
}

export function writeOverrides(overrides: BarriguitasOverrides): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function migrateLegacyCasaStorage(): BarriguitasOverrides | null {
  try {
    const raw = window.localStorage.getItem(LEGACY_CASA_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as LegacyCasaStorage;
    if (!parsed.limpiezaExteriorCompletedAt) return null;

    const overrides: BarriguitasOverrides = {
      house: {
        cuidado: {
          lastCleaningAt: parsed.limpiezaExteriorCompletedAt,
        },
      },
    };

    writeOverrides(overrides);
    window.localStorage.removeItem(LEGACY_CASA_KEY);

    return overrides;
  } catch {
    return null;
  }
}
