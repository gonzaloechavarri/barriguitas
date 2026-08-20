import { getCoupleData } from "@/lib/data/providers/local";

export type CoupleEvent = {
  id: string;
  title: string;
  icon: string;
  /** Fecha civil YYYY-MM-DD. */
  date: string;
  detail?: string;
};

/** Acontecimientos de pareja derivados de la configuración existente — sin duplicar datos. */
export function getCoupleEvents(): CoupleEvent[] {
  const { wedding, nextTrip } = getCoupleData();

  return [
    {
      id: "wedding",
      title: wedding.cardTitle,
      icon: "💍",
      date: wedding.date,
    },
    {
      id: "honeymoon",
      title: nextTrip.cardTitle,
      icon: "✈️",
      date: nextTrip.startDate,
      detail: nextTrip.destination,
    },
  ].sort((left, right) => left.date.localeCompare(right.date));
}
