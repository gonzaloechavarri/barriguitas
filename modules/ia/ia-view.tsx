import type { CopilotRecommendation } from "@/lib/data/types";
import { RecommendationCard } from "./components/recommendation-card";

type IaViewProps = {
  recommendation: CopilotRecommendation;
};

export function IaView({ recommendation }: IaViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <RecommendationCard recommendation={recommendation} />
    </div>
  );
}
