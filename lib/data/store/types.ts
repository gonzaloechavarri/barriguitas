import { familyConfig, type FamilyConfig } from "@/config/family";

export type BarriguitasOverrides = Record<string, unknown>;

export type BarriguitasSnapshot = {
  config: FamilyConfig;
};

/** Referencia única — nunca crear un snapshot nuevo por render. */
export const SERVER_SNAPSHOT: BarriguitasSnapshot = { config: familyConfig };

export function createDefaultSnapshot(): BarriguitasSnapshot {
  return SERVER_SNAPSHOT;
}
