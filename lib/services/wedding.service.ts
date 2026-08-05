import type { WeddingData } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";

export async function getWeddingData(): Promise<WeddingData> {
  const config = getFamilyConfig();

  return {
    date: config.wedding.date,
    journeyStartDate: config.wedding.journeyStartDate,
    cardTitle: config.wedding.cardTitle,
    countdownLabel: config.wedding.countdownLabel,
    progressMessage: config.wedding.progressMessage,
    milestones: [...config.milestones],
    nextPlan: {
      cardTitle: config.nextTrip.cardTitle,
      label: config.nextTrip.label,
      destination: config.nextTrip.destination,
      subtitle: config.nextTrip.subtitle,
    },
  };
}
