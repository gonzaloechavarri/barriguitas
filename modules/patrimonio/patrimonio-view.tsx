import type { WealthView } from "@/lib/data/types";
import type { PortfolioUpdateInput } from "@/lib/services/wealth-snapshot.service";
import { PortfolioSnapshotCard } from "./components/portfolio-snapshot-card";
import { StrategyCard } from "./components/strategy-card";
import { UpdatePortfolioSheet } from "./components/update-portfolio-sheet";

type PatrimonioViewProps = {
  data: WealthView;
  updateOpen: boolean;
  updateDefaults: PortfolioUpdateInput;
  assetLabels: {
    acwi: string;
    oro: string;
    momentum: string;
  };
  onOpenUpdate: () => void;
  onCloseUpdate: () => void;
};

export function PatrimonioView({
  data,
  updateOpen,
  updateDefaults,
  assetLabels,
  onOpenUpdate,
  onCloseUpdate,
}: PatrimonioViewProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
        <div className="flex flex-col gap-5 sm:gap-6">
          <PortfolioSnapshotCard
            portfolio={data.portfolio}
            onUpdate={onOpenUpdate}
          />
          <StrategyCard strategy={data.strategy} />
        </div>
      </div>

      <UpdatePortfolioSheet
        open={updateOpen}
        initialValues={updateDefaults}
        labels={assetLabels}
        onClose={onCloseUpdate}
      />
    </>
  );
}
