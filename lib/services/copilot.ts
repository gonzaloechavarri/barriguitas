import type {
  CopilotObservation,
  CopilotRecommendation,
  CopilotState,
} from "@/lib/data/types";
import { readListsCache } from "@/lib/services/lists/cache";
import { normalizeSharedLists } from "@/lib/services/lists.service";
import {
  buildCopilotContext,
  buildCopilotObservations,
  hasCopilotFocus,
} from "./copilot/context.service";

export type { CopilotObservation, CopilotRecommendation };

function getCopilotLists() {
  const cached = readListsCache();
  if (!cached) {
    return [];
  }

  return normalizeSharedLists(cached.lists);
}

function getContextFromCache() {
  return buildCopilotContext(getCopilotLists());
}

/** Encabezado del módulo Copiloto en el shell. */
export function getCopilotModuleHeader(): string {
  const context = getContextFromCache();

  if (context.hoy.today.length > 0 || context.hoy.overdue.length > 0) {
    return "Hay cosas que merecen vuestra atención.";
  }

  if (context.upcomingEvents.length > 0) {
    return "Se acerca algo importante.";
  }

  return "Todo tranquilo por aquí.";
}

/** Estado global para mensajes contextuales en otras pantallas. */
export function getCopilotState(): CopilotState {
  return hasCopilotFocus(getContextFromCache()) ? "action" : "calm";
}

/** @deprecated Usar buildCopilotBrief con datos reales en el módulo IA. */
export function getCopilotRecommendation(): CopilotRecommendation {
  const context = getContextFromCache();

  if (!hasCopilotFocus(context)) {
    return {
      icon: "",
      title: "Todo tranquilo por aquí 🦦",
      subtitle: "No hay nada urgente ahora mismo.",
      priority: 0,
    };
  }

  const topToday = context.hoy.today[0]?.item.text;
  const topOverdue = context.hoy.overdue[0]?.item.text;
  const nextEvent = context.upcomingEvents[0];

  return {
    icon: "🤖",
    title: topToday ?? topOverdue ?? nextEvent?.title ?? "Revisad vuestras listas",
    subtitle: "Abrid Copiloto para ver el resumen completo.",
    priority: 1,
  };
}

/** Observaciones de alta confianza para el shell y otros consumidores. */
export function getCopilotObservations(): CopilotObservation[] {
  const lists = getCopilotLists();
  const context = buildCopilotContext(lists);
  return buildCopilotObservations(context, lists);
}
