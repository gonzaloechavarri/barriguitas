import type { FamilyConfig } from "@/config/family";
import { getBarriguitasSnapshot } from "@/lib/data/store/snapshot";

export function getFamilyConfig(): FamilyConfig {
  return getBarriguitasSnapshot().config;
}
