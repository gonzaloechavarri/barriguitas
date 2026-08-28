import type { WealthView } from "@/lib/data/types";
import type { StrategyDistribution } from "@/lib/data/types/editable";
import { FinancialPrinciplesCard } from "./components/financial-principles-card";
import { PortfolioSnapshotCard } from "./components/portfolio-snapshot-card";
import { StrategyCard } from "./components/strategy-card";

type PatrimonioViewProps = {
  data: WealthView;
  distribution: StrategyDistribution;
};

export function PatrimonioView({ data, distribution }: PatrimonioViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="flex flex-col gap-5 sm:gap-6">
        <PortfolioSnapshotCard portfolio={data.portfolio} />
        <StrategyCard strategy={data.strategy} distribution={distribution} />
        <FinancialPrinciplesCard />
      </div>
    </div>
  );
}
