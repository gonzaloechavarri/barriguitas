import type { BarriguitasOverrides } from "./types";

const STORAGE_KEY = "barriguitas:data";

export function readOverrides(): BarriguitasOverrides | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as BarriguitasOverrides;
  } catch {
    return null;
  }
}

export function writeOverrides(overrides: BarriguitasOverrides): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}
