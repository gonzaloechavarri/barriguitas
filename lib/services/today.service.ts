import type { TodaySummary } from "@/lib/data/types";
import { getAppData } from "@/lib/data/providers/local";
import { daysUntil } from "@/lib/data/utils";
import {
  getAttentionSubtitle,
  getFamilyNames,
  getTimeBasedGreeting,
  resolveTodayAttentionState,
} from "./greeting.service";
import { getWeddingData } from "./wedding.service";

export function getTodaySummary(
  referenceDate: Date = new Date(),
): TodaySummary {
  const { today } = getAppData();
  const wedding = getWeddingData();
  const days = daysUntil(wedding.date, referenceDate);
  const attentionState = resolveTodayAttentionState();
  const greeting = getTimeBasedGreeting(referenceDate);

  const nosotrosSubtitle = today.nosotrosAttention.subtitleTemplate.replace(
    "{days}",
    String(days),
  );

  return {
    greeting: greeting.message,
    names: getFamilyNames(),
    attentionIntro: getAttentionSubtitle(attentionState),
    attentionState,
    items: [
      {
        icon: today.nosotrosAttention.icon,
        title: today.nosotrosAttention.title,
        subtitle: nosotrosSubtitle,
      },
      ...today.attentionItems.map((item) => ({ ...item })),
    ],
  };
}
