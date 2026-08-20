import type { WeddingData } from "@/lib/services";
import { UpcomingEventsSection } from "./components/upcoming-events-section";
import { WeddingCard } from "./components/wedding-card";

type NosotrosViewProps = {
  weddingData: WeddingData;
};

export function NosotrosView({ weddingData }: NosotrosViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="flex flex-col gap-10 sm:gap-12">
        <WeddingCard data={weddingData} />
        <UpcomingEventsSection events={weddingData.upcomingEvents} />
      </div>
    </div>
  );
}
