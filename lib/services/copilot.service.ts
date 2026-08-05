import type { CopilotTask, CopilotView } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { getOriginIcon, resolveCopilotState, resolveTopPendingTask } from "./copilot.utils";

export { getOriginIcon, resolveCopilotState, resolveTopPendingTask } from "./copilot.utils";

export async function getCopilotTasks(): Promise<CopilotTask[]> {
  const config = getFamilyConfig();

  return config.copilot.tasks.map((task) => ({ ...task }));
}

/**
 * Resuelve la vista unificada del Copiloto.
 * Encabezado, contenido y subtexto siempre transmiten la misma idea.
 */
export async function getCopilotView(): Promise<CopilotView> {
  const config = getFamilyConfig();
  const tasks = await getCopilotTasks();
  const { state, task } = resolveCopilotState(
    tasks,
    config.copilot.celebrate.active,
  );

  if (state === "action" && task) {
    const actionCopy = config.copilot.copy.action;
    return {
      state,
      header: actionCopy.header,
      content: task.title,
      subtext: actionCopy.subtext,
      taskId: task.id,
      originIcon: getOriginIcon(task.origin),
    };
  }

  if (state === "calm") {
    const calmCopy = config.copilot.copy.calm;
    return {
      state,
      header: calmCopy.header,
      content: calmCopy.content,
      subtext: calmCopy.subtext,
    };
  }

  const celebrateCopy = config.copilot.copy.celebrate;
  return {
    state,
    header: celebrateCopy.header,
    content: celebrateCopy.content,
    subtext: celebrateCopy.subtext,
  };
}

/** @deprecated Usar getCopilotView. */
export async function getDailyRecommendation(): Promise<CopilotView> {
  return getCopilotView();
}
