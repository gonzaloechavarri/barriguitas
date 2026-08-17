"use client";

import { useCallback, useMemo } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import type { WealthPerformance } from "@/lib/services/portfolio/portfolio.service";
import { buildWealthView } from "@/lib/services/wealth-view.service";
import { PatrimonioView } from "./patrimonio-view";

async function fetchWealthPerformance(): Promise<WealthPerformance> {
  const response = await fetch("/api/patrimonio");

  if (!response.ok) {
    throw new Error("No se pudo obtener el ahorro.");
  }

  return response.json() as Promise<WealthPerformance>;
}

export function PatrimonioModule() {
  const snapshot = useBarriguitasStore();
  const loadPerformance = useCallback(() => fetchWealthPerformance(), []);
  const performance = useAsyncData(loadPerformance);
  const view = useMemo(
    () => (performance ? buildWealthView(performance) : null),
    [snapshot, performance],
  );

  return (
    <div
      className={`motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        view ? "opacity-100" : "opacity-0"
      }`}
    >
      {view ? <PatrimonioView data={view} /> : null}
    </div>
  );
}
