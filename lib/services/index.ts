export { getAgenda } from "./agenda.service";
export {
  getCopilotModuleHeader,
  getCopilotObservations,
  getCopilotRecommendation,
  getCopilotState,
} from "./copilot";
export {
  answerCopilotQuestion,
  buildCopilotBrief,
  buildCopilotContext,
  COPILOT_QUICK_QUESTIONS,
  hasCopilotFocus,
} from "./copilot/context.service";
export type {
  CopilotBrief,
  CopilotContext,
  CopilotQuickQuestion,
} from "./copilot/context.service";
export {
  deriveAttentionLevel,
  getAttentionSubtitle,
  getFamilyNames,
  getTimeBasedGreeting,
  resolveTodayAttentionState,
} from "./greeting.service";
export { getModuleHeader } from "./header.service";
export { buildHoySummary, hasHoyContent } from "./hoy.service";
export type { HoySummary, HoyTask } from "./hoy.service";
export { getCoupleEvents } from "./couple-events.service";
export type { CoupleEvent } from "./couple-events.service";
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
