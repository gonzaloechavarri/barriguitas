import type { WeddingData } from "@/lib/services";
import { MilestonesCard } from "./components/milestones-card";
import { NextPlanCard } from "./components/next-plan-card";
import { WeddingCard } from "./components/wedding-card";

type NosotrosViewProps = {
  weddingData: WeddingData;
};

export function NosotrosView({ weddingData }: NosotrosViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="flex flex-col gap-5 sm:gap-6">
        <WeddingCard data={weddingData} />

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <MilestonesCard milestones={weddingData.milestones} />
          <NextPlanCard plan={weddingData.nextPlan} />
        </div>
      </div>
    </div>
  );
}
