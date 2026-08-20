import type { WeddingData } from "@/lib/data/types";
import { getCoupleData } from "@/lib/data/providers/local";
import { getCoupleEvents } from "./couple-events.service";

export function getWeddingData(): WeddingData {
  const { wedding, nextTrip } = getCoupleData();

  return {
    date: wedding.date,
    journeyStartDate: wedding.journeyStartDate,
    cardTitle: wedding.cardTitle,
    countdownLabel: wedding.countdownLabel,
    progressMessage: wedding.progressMessage,
    upcomingEvents: getCoupleEvents(),
    nextPlan: {
      cardTitle: nextTrip.cardTitle,
      destination: nextTrip.destination,
      startDate: nextTrip.startDate,
    },
  };
}
