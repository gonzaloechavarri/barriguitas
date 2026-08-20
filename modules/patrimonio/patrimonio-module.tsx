"use client";

import { useMemo, useState } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { buildWealthView } from "@/lib/services/wealth-view.service";
import { getDefaultPortfolioUpdateInput } from "@/lib/services/wealth-snapshot.service";
import { PatrimonioView } from "./patrimonio-view";

export function PatrimonioModule() {
  const snapshot = useBarriguitasStore();
  const [updateOpen, setUpdateOpen] = useState(false);
  const view = useMemo(() => buildWealthView(), [snapshot]);
  const updateDefaults = useMemo(
    () => getDefaultPortfolioUpdateInput(snapshot.wealth),
    [snapshot.wealth],
  );

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <PatrimonioView
        data={view}
        updateOpen={updateOpen}
        updateDefaults={updateDefaults}
        assetLabels={{
          acwi: snapshot.wealth.strategy.assets.acwi.label,
          oro: snapshot.wealth.strategy.assets.oro.label,
          nasdaq: snapshot.wealth.strategy.assets.nasdaq.label,
        }}
        onOpenUpdate={() => setUpdateOpen(true)}
        onCloseUpdate={() => setUpdateOpen(false)}
      />
    </div>
  );
}
