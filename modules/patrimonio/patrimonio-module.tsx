"use client";

import { useCallback } from "react";
import { ModuleShell } from "@/components/modules/module-shell";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { getWealthSummary } from "@/lib/services";

export function PatrimonioModule() {
  const loadWealth = useCallback(() => getWealthSummary(), []);
  const wealth = useAsyncData(loadWealth);

  if (!wealth) {
    return null;
  }

  return (
    <ModuleShell
      icon={wealth.icon}
      title={wealth.title}
      description={wealth.description}
    />
  );
}
