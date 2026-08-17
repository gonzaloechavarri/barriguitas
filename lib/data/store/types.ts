import { familyConfig, type FamilyConfig } from "@/config/family";

export type BarriguitasOverrides = Record<string, unknown>;

export type BarriguitasSnapshot = {
  config: FamilyConfig;
};

export function createDefaultSnapshot(): BarriguitasSnapshot {
  return { config: familyConfig };
}
