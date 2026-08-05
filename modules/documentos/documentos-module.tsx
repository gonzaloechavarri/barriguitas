"use client";

import { useCallback } from "react";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { getTodaySummary } from "@/lib/services";
import { DocumentosView } from "./documentos-view";

export function DocumentosModule() {
  const loadSummary = useCallback(() => getTodaySummary(), []);
  const summary = useAsyncData(loadSummary);

  return (
    <div
      className={`motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        summary ? "opacity-100" : "opacity-0"
      }`}
    >
      {summary ? <DocumentosView summary={summary} /> : null}
    </div>
  );
}
