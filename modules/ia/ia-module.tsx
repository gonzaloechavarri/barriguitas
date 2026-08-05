"use client";

import { useCallback } from "react";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { getCopilotView } from "@/lib/services";
import { IaView } from "./ia-view";

export function IaModule() {
  const loadView = useCallback(() => getCopilotView(), []);
  const view = useAsyncData(loadView);

  return (
    <div
      className={`motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        view ? "opacity-100" : "opacity-0"
      }`}
    >
      {view ? <IaView view={view} /> : null}
    </div>
  );
}
