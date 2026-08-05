"use client";

import { useCallback } from "react";
import type { WealthView } from "@/lib/data/types";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { PatrimonioView } from "./patrimonio-view";

async function fetchWealthView(): Promise<WealthView> {
  const response = await fetch("/api/patrimonio");

  if (!response.ok) {
    throw new Error("No se pudo obtener el ahorro.");
  }

  return response.json() as Promise<WealthView>;
}

export function PatrimonioModule() {
  const loadWealth = useCallback(() => fetchWealthView(), []);
  const wealth = useAsyncData(loadWealth);

  return (
    <div
      className={`motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        wealth ? "opacity-100" : "opacity-0"
      }`}
    >
      {wealth ? <PatrimonioView data={wealth} /> : null}
    </div>
  );
}
