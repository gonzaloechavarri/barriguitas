"use client";

import { pressTextControlClasses } from "@/components/motion/press-motion";
import type { SharedList } from "@/lib/data/types/lists";
import type { SharedListsStatus } from "@/lib/hooks/use-shared-lists";
import { ListCard } from "./components/list-card";

type ListasViewProps = {
  lists: SharedList[];
  status: SharedListsStatus;
  syncError: string | null;
  onSelectList: (listId: string) => void;
  onNewList: () => void;
};

function syncStatusMessage(status: SharedListsStatus, syncError: string | null) {
  if (syncError) {
    return syncError;
  }

  if (status === "loading") {
    return "Sincronizando listas…";
  }

  if (status === "offline") {
    return "Sin conexión. Mostrando el último estado conocido.";
  }

  return null;
}

export function ListasView({
  lists,
  status,
  syncError,
  onSelectList,
  onNewList,
}: ListasViewProps) {
  const message = syncStatusMessage(status, syncError);

  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-medium tracking-[-0.03em] text-white/90">
          Listas
        </h2>
        {message ? (
          <p className="mt-2 text-sm font-light tracking-[-0.01em] text-white/35">
            {message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {lists.map((list, index) => (
          <ListCard
            key={list.id}
            list={list}
            delay={80 + index * 80}
            onSelect={() => onSelectList(list.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNewList}
          disabled={status === "loading" || status === "error"}
          className={`text-sm font-light tracking-[-0.01em] text-white/40 disabled:opacity-30 touch-manipulation ${pressTextControlClasses}`}
        >
          + Nueva lista
        </button>
      </div>
    </div>
  );
}
