import type { TodaySummary } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { daysUntil } from "@/lib/data/utils";
import {
  getAttentionSubtitle,
  getFamilyNames,
  getTimeBasedGreeting,
  resolveTodayAttentionState,
} from "./greeting.service";
import { getWeddingData } from "./wedding.service";

export async function getTodaySummary(
  referenceDate: Date = new Date(),
): Promise<TodaySummary> {
  const config = getFamilyConfig();
  const wedding = await getWeddingData();
  const days = daysUntil(wedding.date, referenceDate);
  const attentionState = await resolveTodayAttentionState();
  const greeting = getTimeBasedGreeting(referenceDate);

  const nosotrosSubtitle = config.today.nosotrosAttention.subtitleTemplate.replace(
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
        icon: config.today.nosotrosAttention.icon,
        title: config.today.nosotrosAttention.title,
        subtitle: nosotrosSubtitle,
      },
      ...config.today.attentionItems.map((item) => ({ ...item })),
    ],
  };
}
