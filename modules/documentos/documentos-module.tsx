"use client";

import { useMemo } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { getTodaySummary } from "@/lib/services";
import { DocumentosView } from "./documentos-view";

export function DocumentosModule() {
  const snapshot = useBarriguitasStore();
  const summary = useMemo(() => getTodaySummary(), [snapshot]);

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <DocumentosView summary={summary} />
    </div>
  );
}
