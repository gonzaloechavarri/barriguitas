import type {
  AttentionLevel,
  CopilotState,
  SmartGreeting,
  TodayAttentionState,
} from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { getCopilotTasks } from "./copilot.service";
import { resolveCopilotState } from "./copilot.utils";

const TIME_GREETINGS = {
  morning: "Buenos días ☀️",
  afternoon: "Buenas tardes 🌿",
  evening: "Buenas noches 🌙",
} as const;

const ATTENTION_SUBTITLES: Record<AttentionLevel, string> = {
  calm: "Todo está bajo control.",
  one: "Hoy solo hay una cosa que merece vuestra atención.",
  several: "Hoy hay varias cosas que merece la pena revisar.",
};

function resolveGreetingPeriod(
  hour: number,
): SmartGreeting["period"] {
  if (hour >= 6 && hour <= 12) return "morning";
  if (hour >= 13 && hour <= 19) return "afternoon";
  return "evening";
}

export function getFamilyNames(): string {
  const members = [...getFamilyConfig().members];

  if (members.length === 0) return "";
  if (members.length === 1) return members[0];
  if (members.length === 2) return `${members[0]} y ${members[1]}`;

  return `${members.slice(0, -1).join(", ")} y ${members[members.length - 1]}`;
}

export function getTimeBasedGreeting(
  referenceDate: Date = new Date(),
): SmartGreeting {
  const period = resolveGreetingPeriod(referenceDate.getHours());

  return {
    message: TIME_GREETINGS[period],
    period,
  };
}

export function getAttentionSubtitle(state: TodayAttentionState): string {
  return ATTENTION_SUBTITLES[state.level];
}

function pickRotatingMessage(
  messages: readonly string[],
  referenceDate: Date,
): string {
  if (messages.length === 0) return "";
  if (messages.length === 1) return messages[0];

  const dayIndex = Math.floor(
    Date.UTC(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate(),
    ) / 86_400_000,
  );

  return messages[dayIndex % messages.length];
}

function resolveHeaderMessagePool(state: CopilotState): readonly string[] {
  const { headerMessages } = getFamilyConfig().today;

  if (state === "action") return headerMessages.action;
  if (state === "celebrate") return headerMessages.celebrate;

  return headerMessages.calm;
}

/**
 * Encabezado superior de la pantalla Hoy.
 * Rota mensajes tranquilos según el estado global de Barriguitas.
 */
export async function getTodayHeaderMessage(
  referenceDate: Date = new Date(),
): Promise<string> {
  const config = getFamilyConfig();
  const tasks = await getCopilotTasks();
  const { state } = resolveCopilotState(
    tasks,
    config.copilot.celebrate.active,
  );

  return pickRotatingMessage(
    resolveHeaderMessagePool(state),
    referenceDate,
  );
}

/**
 * Resuelve el estado de atención del día.
 * Por ahora lee un valor estático de config.
 * En el futuro agregará señales reales de cada módulo.
 */
export async function resolveTodayAttentionState(): Promise<TodayAttentionState> {
  const config = getFamilyConfig();

  return {
    level: config.today.attentionState,
    signals: [],
  };
}

export function deriveAttentionLevel(
  signals: TodayAttentionState["signals"],
): AttentionLevel {
  const importantCount = signals.filter(
    (signal) => signal.priority === "important",
  ).length;

  if (importantCount === 0) return "calm";
  if (importantCount === 1) return "one";
  return "several";
}
