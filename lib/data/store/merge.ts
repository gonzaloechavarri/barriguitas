import { familyConfig, type FamilyConfig } from "@/config/family";
import type { BarriguitasOverrides, BarriguitasSnapshot } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  patch: Record<string, unknown>,
): T {
  const result = { ...base };

  for (const key of Object.keys(patch)) {
    const patchValue = patch[key];
    const baseValue = base[key];

    if (isPlainObject(patchValue) && isPlainObject(baseValue)) {
      result[key as keyof T] = deepMerge(
        baseValue as Record<string, unknown>,
        patchValue,
      ) as T[keyof T];
      continue;
    }

    if (patchValue !== undefined) {
      result[key as keyof T] = patchValue as T[keyof T];
    }
  }

  return result;
}

function diffValues(base: unknown, current: unknown): unknown {
  if (Object.is(base, current)) {
    return undefined;
  }

  if (Array.isArray(base) && Array.isArray(current)) {
    return Object.is(JSON.stringify(base), JSON.stringify(current))
      ? undefined
      : current;
  }

  if (isPlainObject(base) && isPlainObject(current)) {
    const patch: Record<string, unknown> = {};

    for (const key of new Set([...Object.keys(base), ...Object.keys(current)])) {
      const value = diffValues(base[key], current[key]);
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    return Object.keys(patch).length > 0 ? patch : undefined;
  }

  return current;
}

export function mergeSnapshot(
  overrides: BarriguitasOverrides | null,
  base: BarriguitasSnapshot,
): BarriguitasSnapshot {
  if (!overrides || Object.keys(overrides).length === 0) {
    return base;
  }

  const config = deepMerge(
    structuredClone(base.config) as Record<string, unknown>,
    overrides,
  ) as FamilyConfig;

  return { config };
}

export function extractOverrides(
  snapshot: BarriguitasSnapshot,
): BarriguitasOverrides {
  const patch = diffValues(familyConfig, snapshot.config);

  if (!isPlainObject(patch) || Object.keys(patch).length === 0) {
    return {};
  }

  return patch;
}
