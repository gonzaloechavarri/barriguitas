import type { WealthSummary } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";

export async function getWealthSummary(): Promise<WealthSummary> {
  const config = getFamilyConfig();

  return {
    icon: config.modules.patrimonio.icon,
    title: config.modules.patrimonio.title,
    description: config.modules.patrimonio.description,
  };
}
