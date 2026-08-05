import type { WealthView } from "@/lib/data/types";
import { OverviewCard } from "./components/overview-card";
import { StrategyCard } from "./components/strategy-card";

type PatrimonioViewProps = {
  data: WealthView;
};

export function PatrimonioView({ data }: PatrimonioViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="flex flex-col gap-5 sm:gap-6">
        <OverviewCard data={data} />
        <StrategyCard strategy={data.strategy} />
      </div>
    </div>
  );
}
