import type { CopilotState, CopilotTask, CopilotTaskOrigin } from "@/lib/data/types";

const ORIGIN_ICONS: Record<CopilotTaskOrigin, string> = {
  wedding: "❤️",
  home: "🏡",
  finance: "🌱",
  agenda: "📅",
  system: "🤖",
};

export function getOriginIcon(origin: CopilotTaskOrigin): string {
  return ORIGIN_ICONS[origin];
}

export function resolveTopPendingTask(tasks: CopilotTask[]): CopilotTask | null {
  const pending = tasks.filter((task) => task.status === "pending");

  if (pending.length === 0) return null;

  return pending.reduce((top, task) =>
    task.priority < top.priority ? task : top,
  );
}

export function resolveCopilotState(
  tasks: CopilotTask[],
  celebrateActive: boolean,
): { state: CopilotState; task: CopilotTask | null } {
  if (celebrateActive) {
    return { state: "celebrate", task: null };
  }

  const topTask = resolveTopPendingTask(tasks);

  if (topTask) {
    return { state: "action", task: topTask };
  }

  return { state: "calm", task: null };
}
