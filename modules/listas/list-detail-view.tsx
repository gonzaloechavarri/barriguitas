"use client";

import { pressTextControlClasses } from "@/components/motion/press-motion";
import { addListItem, toggleListItem } from "@/lib/services/lists.service";
import type { SharedList } from "@/lib/data/types/lists";
import { AddItemControl } from "./components/add-item-control";
import { ListItemRow } from "./components/list-item-row";

type ListDetailViewProps = {
  list: SharedList;
  onBack: () => void;
};

export function ListDetailView({ list, onBack }: ListDetailViewProps) {
  const pendingItems = list.items.filter((item) => !item.completed);
  const completedItems = list.items.filter((item) => item.completed);

  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <button
        type="button"
        onClick={onBack}
        className={`mb-5 flex items-center gap-1.5 text-sm font-light tracking-[-0.01em] text-white/45 touch-manipulation ${pressTextControlClasses}`}
      >
        <span aria-hidden>←</span>
        Listas
      </button>

      <div className="mb-6 sm:mb-8">
        <h2 className="flex items-center gap-2.5 text-2xl font-medium tracking-[-0.03em] text-white/90">
          <span role="img" aria-hidden>
            {list.icon}
          </span>
          {list.name}
        </h2>
      </div>

      <div className="flex flex-col">
        {pendingItems.map((item) => (
          <ListItemRow
            key={item.id}
            item={item}
            onToggle={() => toggleListItem(list.id, item.id)}
          />
        ))}

        <AddItemControl onAdd={(text) => addListItem(list.id, text)} />

        {completedItems.length > 0 ? (
          <div className="mt-6 border-t border-white/[0.06] pt-4">
            {completedItems.map((item) => (
              <ListItemRow
                key={item.id}
                item={item}
                onToggle={() => toggleListItem(list.id, item.id)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
