import type { AgendaData } from "@/lib/data/types";
import { getAppData } from "@/lib/data/providers/local";

export async function getAgenda(): Promise<AgendaData> {
  const { modules } = getAppData();

  return {
    icon: modules.agenda.icon,
    title: modules.agenda.title,
    description: modules.agenda.description,
  };
}
