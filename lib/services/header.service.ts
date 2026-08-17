import type { ModuleHeader } from "@/lib/data/types";
import { getAppData, getCoupleData } from "@/lib/data/providers/local";
import { daysUntil } from "@/lib/data/utils";
import type { ModuleId } from "@/lib/modules/types";
import { getCopilotModuleHeader } from "./copilot";
import { getTodayHeaderMessage } from "./greeting.service";

function resolveHeaderMessage(
  moduleId: ModuleId,
  template: string,
  referenceDate: Date,
): string {
  if (moduleId === "nosotros") {
    const { wedding } = getCoupleData();
    const days = daysUntil(wedding.date, referenceDate);
    return template.replace("{days}", String(days));
  }

  return template;
}

export function getModuleHeader(
  moduleId: ModuleId,
  referenceDate: Date = new Date(),
): ModuleHeader {
  if (moduleId === "ia") {
    return { message: getCopilotModuleHeader() };
  }

  if (moduleId === "documentos") {
    return { message: getTodayHeaderMessage(referenceDate) };
  }

  const { moduleHeaders } = getAppData();
  const template = moduleHeaders[moduleId];

  return {
    message: resolveHeaderMessage(moduleId, template, referenceDate),
  };
}
