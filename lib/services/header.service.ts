import type { ModuleHeader } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { daysUntil } from "@/lib/data/utils";
import type { ModuleId } from "@/lib/modules/types";
import { getCopilotView } from "./copilot.service";
import { getTodayHeaderMessage } from "./greeting.service";

function resolveHeaderMessage(
  moduleId: ModuleId,
  template: string,
  referenceDate: Date,
): string {
  if (moduleId === "nosotros") {
    const config = getFamilyConfig();
    const days = daysUntil(config.wedding.date, referenceDate);
    return template.replace("{days}", String(days));
  }

  return template;
}

export async function getModuleHeader(
  moduleId: ModuleId,
  referenceDate: Date = new Date(),
): Promise<ModuleHeader> {
  if (moduleId === "ia") {
    const view = await getCopilotView();
    return { message: view.header };
  }

  if (moduleId === "documentos") {
    return { message: await getTodayHeaderMessage(referenceDate) };
  }

  const config = getFamilyConfig();
  const template = config.moduleHeaders[moduleId];

  return {
    message: resolveHeaderMessage(moduleId, template, referenceDate),
  };
}
