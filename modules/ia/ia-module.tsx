"use client";

import { useMemo } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { getCopilotRecommendation } from "@/lib/services/copilot";
import { IaView } from "./ia-view";

export function IaModule() {
  const snapshot = useBarriguitasStore();
  const recommendation = useMemo(
    () => getCopilotRecommendation(),
    [snapshot],
  );

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <IaView recommendation={recommendation} />
    </div>
  );
}
