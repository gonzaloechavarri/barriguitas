import type { CopilotRecommendation, CopilotState } from "@/lib/data/types";
import {
  getCoupleData,
  getHouseData,
  getWealthData,
} from "@/lib/data/providers/local";
import { getMilestones } from "./milestones.service";

export type { CopilotRecommendation };

type CopilotSignalSource = "nosotros" | "casa" | "ahorro" | "agenda";

type CopilotSignal = {
  source: CopilotSignalSource;
  icon: string;
  title: string;
  subtitle: string;
  priority: number;
};

type SignalCollector = () => CopilotSignal[];

/** Hitos pendientes de Nosotros. */
function collectCoupleSignals(): CopilotSignal[] {
  const { copilot } = getCoupleData();

  return getMilestones().map((milestone) => ({
    source: "nosotros",
    icon: copilot.icon,
    title: milestone.title,
    subtitle: copilot.subtitle,
    priority: milestone.priority,
  }));
}

/** Señales futuras de Villa Barriguita. */
function collectHouseSignals(): CopilotSignal[] {
  getHouseData();
  return [];
}

/** Señales futuras de Ahorro. */
function collectWealthSignals(): CopilotSignal[] {
  getWealthData();
  return [];
}

/** Señales futuras de Agenda. */
function collectAgendaSignals(): CopilotSignal[] {
  return [];
}

const SIGNAL_COLLECTORS: SignalCollector[] = [
  collectCoupleSignals,
  collectHouseSignals,
  collectWealthSignals,
  collectAgendaSignals,
];

function collectSignals(): CopilotSignal[] {
  return SIGNAL_COLLECTORS.flatMap((collect) => collect()).sort(
    (a, b) => a.priority - b.priority,
  );
}

function resolveTopSignal(): CopilotSignal | null {
  const signals = collectSignals();
  return signals[0] ?? null;
}

function resolveCalmRecommendation(): CopilotRecommendation {
  const { calm } = getCoupleData().copilot;

  return {
    icon: "",
    title: calm.title,
    subtitle: calm.subtitle,
    priority: 0,
  };
}

/**
 * Decide qué debe mostrar el Copiloto.
 * Interpreta el estado actual de Barriguitas sin inventar información.
 */
export function getCopilotRecommendation(): CopilotRecommendation {
  const topSignal = resolveTopSignal();

  if (!topSignal) {
    return resolveCalmRecommendation();
  }

  return {
    icon: topSignal.icon,
    title: topSignal.title,
    subtitle: topSignal.subtitle,
    priority: topSignal.priority,
  };
}

/** Encabezado del módulo Copiloto en el shell. */
export function getCopilotModuleHeader(): string {
  const { shell } = getCoupleData().copilot;

  return resolveTopSignal() ? shell.actionHeader : shell.calmHeader;
}

/** Estado global para mensajes contextuales en otras pantallas. */
export function getCopilotState(): CopilotState {
  return resolveTopSignal() ? "action" : "calm";
}
