import type { CopilotObservation, CopilotRecommendation } from "@/lib/data/types";
import { ObservationsBlock } from "./components/observations-block";
import { RecommendationCard } from "./components/recommendation-card";

type IaViewProps = {
  recommendation: CopilotRecommendation;
  observations: CopilotObservation[];
};

export function IaView({ recommendation, observations }: IaViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <RecommendationCard recommendation={recommendation} />
      <ObservationsBlock observations={observations} />
    </div>
  );
}
