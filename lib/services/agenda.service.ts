import type { AgendaData } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";

export async function getAgenda(): Promise<AgendaData> {
  const config = getFamilyConfig();

  return {
    icon: config.modules.agenda.icon,
    title: config.modules.agenda.title,
    description: config.modules.agenda.description,
  };
}
