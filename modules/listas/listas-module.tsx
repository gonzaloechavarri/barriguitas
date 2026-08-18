"use client";

import { useState } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { ListDetailView } from "./list-detail-view";
import { ListasView } from "./listas-view";

export function ListasModule() {
  const { lists } = useBarriguitasStore();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const selectedList = lists.lists.find((list) => list.id === selectedListId);

  if (selectedList) {
    return (
      <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
        <ListDetailView
          list={selectedList}
          onBack={() => setSelectedListId(null)}
        />
      </div>
    );
  }

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <ListasView
        lists={lists.lists}
        onSelectList={setSelectedListId}
      />
    </div>
  );
}
