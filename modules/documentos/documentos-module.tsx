"use client";

import { useMemo } from "react";
import { useSharedLists } from "@/lib/hooks/use-shared-lists";
import { useModuleNavigation } from "@/lib/navigation/module-context";
import { buildHoySummary } from "@/lib/services/hoy.service";
import { DocumentosView } from "./documentos-view";

export function DocumentosModule() {
  const { lists, status, syncError, toggleListItem } = useSharedLists();
  const { openList } = useModuleNavigation();

  const summary = useMemo(() => buildHoySummary(lists), [lists]);

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <DocumentosView
        summary={summary}
        status={status}
        syncError={syncError}
        onToggleTask={(task) => {
          void toggleListItem(task.listId, task.item.id);
        }}
        onOpenList={(task) => {
          openList(task.listId);
        }}
      />
    </div>
  );
}
