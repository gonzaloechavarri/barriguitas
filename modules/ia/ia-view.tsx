import type { CopilotView } from "@/lib/services";
import { RecommendationCard } from "./components/recommendation-card";

type IaViewProps = {
  view: CopilotView;
};

export function IaView({ view }: IaViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <RecommendationCard view={view} />
    </div>
  );
}
