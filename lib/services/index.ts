export { getAgenda } from "./agenda.service";
export {
  getCopilotObservations,
  getCopilotRecommendation,
  getCopilotModuleHeader,
  getCopilotState,
} from "./copilot";
export {
  deriveAttentionLevel,
  getAttentionSubtitle,
  getFamilyNames,
  getTimeBasedGreeting,
  resolveTodayAttentionState,
} from "./greeting.service";
export { getModuleHeader } from "./header.service";
export { getTodaySummary } from "./today.service";
export { getMilestoneTitles, getMilestones, getTopMilestone } from "./milestones.service";
export { getWeddingData } from "./wedding.service";

export type {
  AgendaData,
  AttentionItem,
  AttentionLevel,
  CopilotObservation,
  CopilotRecommendation,
  CopilotState,
  ModuleAttentionSignal,
  ModuleHeader,
  ModuleViewData,
  SmartGreeting,
  TodayAttentionState,
  TodaySummary,
  WealthView,
  WeddingData,
} from "@/lib/data/types";
