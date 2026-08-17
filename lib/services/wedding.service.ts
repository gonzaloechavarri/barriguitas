import type { WeddingData } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { getMilestoneTitles } from "./milestones.service";

export async function getWeddingData(): Promise<WeddingData> {
  const config = getFamilyConfig();

  return {
    date: config.wedding.date,
    journeyStartDate: config.wedding.journeyStartDate,
    cardTitle: config.wedding.cardTitle,
    countdownLabel: config.wedding.countdownLabel,
    progressMessage: config.wedding.progressMessage,
    milestones: getMilestoneTitles(),
    nextPlan: {
      cardTitle: config.nextTrip.cardTitle,
      destination: config.nextTrip.destination,
      startDate: config.nextTrip.startDate,
    },
  };
}
