import type { ModuleHeader } from "@/lib/data/types";
import { getAppData } from "@/lib/data/providers/local";
import type { ModuleId } from "@/lib/modules/types";
import { getCopilotModuleHeader } from "./copilot";

export function getModuleHeader(
  moduleId: ModuleId,
  _referenceDate: Date = new Date(),
): ModuleHeader {
  if (moduleId === "ia") {
    return { message: getCopilotModuleHeader() };
  }

  if (moduleId === "documentos") {
    return { message: "" };
  }

  const { moduleHeaders } = getAppData();

  return {
    message: moduleHeaders[moduleId],
  };
}
