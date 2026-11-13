import type { TodaySummary } from "@/lib/data/types";
import { getAppData } from "@/lib/data/providers/local";
import {
  getAttentionSubtitle,
  getFamilyNames,
  getTimeBasedGreeting,
  resolveTodayAttentionState,
} from "./greeting.service";

export function getTodaySummary(
  referenceDate: Date = new Date(),
): TodaySummary {
  const { today } = getAppData();
  const attentionState = resolveTodayAttentionState();
  const greeting = getTimeBasedGreeting(referenceDate);

  return {
    greeting: greeting.message,
    names: getFamilyNames(),
    attentionIntro: getAttentionSubtitle(attentionState),
    attentionState,
    items: [
      {
        icon: today.nosotrosAttention.icon,
        title: today.nosotrosAttention.title,
        subtitle: today.nosotrosAttention.subtitleTemplate,
      },
      ...today.attentionItems.map((item) => ({ ...item })),
    ],
  };
}
