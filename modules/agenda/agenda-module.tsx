"use client";

import { useCallback } from "react";
import { ModuleShell } from "@/components/modules/module-shell";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { getAgenda } from "@/lib/services";

export function AgendaModule() {
  const loadAgenda = useCallback(() => getAgenda(), []);
  const agenda = useAsyncData(loadAgenda);

  if (!agenda) {
    return null;
  }

  return (
    <ModuleShell
      icon={agenda.icon}
      title={agenda.title}
      description={agenda.description}
    />
  );
}
