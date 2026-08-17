import { getFamilyConfig } from "@/lib/data/providers/local";

const STORAGE_KEY = "barriguitas:casa";

type CasaStorage = {
  limpiezaExteriorCompletedAt?: string;
};

function getDefaultCompletedAt(defaultDaysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - defaultDaysAgo);
  return date;
}

export function getLastCleaningDate(defaultDaysAgo: number): Date {
  if (typeof window === "undefined") {
    return getDefaultCompletedAt(defaultDaysAgo);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultCompletedAt(defaultDaysAgo);

    const parsed = JSON.parse(raw) as CasaStorage;
    if (!parsed.limpiezaExteriorCompletedAt) {
      return getDefaultCompletedAt(defaultDaysAgo);
    }

    return new Date(parsed.limpiezaExteriorCompletedAt);
  } catch {
    return getDefaultCompletedAt(defaultDaysAgo);
  }
}

export function getDaysSinceCleaning(
  referenceDate: Date = new Date(),
): number {
  const { defaultDaysAgo } = getFamilyConfig().casa.cuidado;
  const completedAt = getLastCleaningDate(defaultDaysAgo);
  const elapsedMs = Math.max(0, referenceDate.getTime() - completedAt.getTime());

  return Math.floor(elapsedMs / 86_400_000);
}

export function isHouseCaredFor(referenceDate: Date = new Date()): boolean {
  const { defaultDaysAgo } = getFamilyConfig().casa.cuidado;

  return getDaysSinceCleaning(referenceDate) <= defaultDaysAgo;
}
