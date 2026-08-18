"use client";

import { useState } from "react";
import { useSharedLists } from "@/lib/hooks/use-shared-lists";
import { CreateListSheet } from "./components/create-list-sheet";
import { ListDetailView } from "./list-detail-view";
import { ListasView } from "./listas-view";

export function ListasModule() {
  const {
    lists,
    status,
    syncError,
    createList,
    deleteList,
    addListItem,
    toggleListItem,
  } = useSharedLists();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  const selectedList = lists.find((list) => list.id === selectedListId);

  if (selectedList) {
    return (
      <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
        <ListDetailView
          list={selectedList}
          syncError={syncError}
          onBack={() => setSelectedListId(null)}
          onDeleteList={async (listId) => {
            await deleteList(listId);
            setSelectedListId(null);
          }}
          onAddItem={(text) => addListItem(selectedList.id, text)}
          onToggleItem={(itemId) => toggleListItem(selectedList.id, itemId)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
        <ListasView
          lists={lists}
          status={status}
          syncError={syncError}
          onSelectList={setSelectedListId}
          onNewList={() => setShowCreateSheet(true)}
        />
      </div>

      <CreateListSheet
        open={showCreateSheet}
        onClose={() => setShowCreateSheet(false)}
        onCreate={async (name, icon) => {
          await createList(name, icon);
        }}
      />
    </>
  );
}
