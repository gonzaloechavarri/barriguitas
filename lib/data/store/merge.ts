import type { BarriguitasOverrides, BarriguitasSnapshot } from "./types";
import { createDefaultSnapshot } from "./types";

export function mergeSnapshot(
  overrides: BarriguitasOverrides | null,
): BarriguitasSnapshot {
  void overrides;
  return createDefaultSnapshot();
}

export function extractOverrides(
  _snapshot: BarriguitasSnapshot,
): BarriguitasOverrides {
  return {};
}
