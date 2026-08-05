import type { TodaySummary } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { daysUntil } from "@/lib/data/utils";
import { getWeddingData } from "./wedding.service";

export async function getTodaySummary(
  referenceDate: Date = new Date(),
): Promise<TodaySummary> {
  const config = getFamilyConfig();
  const wedding = await getWeddingData();
  const days = daysUntil(wedding.date, referenceDate);

  const nosotrosSubtitle = config.today.nosotrosAttention.subtitleTemplate.replace(
    "{days}",
    String(days),
  );

  return {
    greeting: `Buenos días, ${config.members.join(", ")}.`,
    attentionIntro: config.today.attentionIntro,
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
