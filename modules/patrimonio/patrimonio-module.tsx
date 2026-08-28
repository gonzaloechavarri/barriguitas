"use client";

import { useMemo } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { buildWealthView } from "@/lib/services/wealth-view.service";
import { PatrimonioView } from "./patrimonio-view";

export function PatrimonioModule() {
  const snapshot = useBarriguitasStore();
  const view = useMemo(() => buildWealthView(), [snapshot]);
  const distribution = snapshot.wealth.portfolioSnapshot.distribution;

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <PatrimonioView data={view} distribution={distribution} />
    </div>
  );
}
