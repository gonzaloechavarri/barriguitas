import type { AgendaData } from "@/lib/data/types";

/** @deprecated Módulo Agenda retirado — stub conservado por compatibilidad interna. */
export async function getAgenda(): Promise<AgendaData> {
  return {
    icon: "📅",
    title: "Agenda",
    description: "Organización y alivio de carga mental",
  };
}
