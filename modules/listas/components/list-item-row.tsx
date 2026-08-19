"use client";

import { useState } from "react";
import type { SharedListItem } from "@/lib/data/types/lists";
import { ItemDueDateEditor, ItemDueDateLabel } from "./item-due-date-editor";

type ListItemRowProps = {
  item: SharedListItem;
  onToggle: () => void;
  onDueDateChange: (dueDate: string | null) => void;
};

export function ListItemRow({
  item,
  onToggle,
  onDueDateChange,
}: ListItemRowProps) {
  const [editingDate, setEditingDate] = useState(false);

  return (
    <div>
      <div className="group flex w-full items-center gap-3.5 rounded-2xl px-1 py-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={item.completed}
          aria-label={item.completed ? "Marcar pendiente" : "Marcar completado"}
          className="flex min-w-0 flex-1 items-center gap-3.5 text-left"
        >
          <span
            aria-hidden
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              item.completed
                ? "scale-100 border-emerald-400/35 bg-emerald-400/15"
                : "scale-100 border-white/15 bg-white/[0.02] motion-safe:group-active:scale-95"
            }`}
          >
            {item.completed ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-emerald-300/90"
              >
                <path
                  d="M2.5 6l2.5 2.5 4.5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </span>

          <span
            className={`min-w-0 flex-1 text-[0.9375rem] font-light tracking-[-0.01em] motion-safe:transition-[color,opacity,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              item.completed
                ? "translate-x-0 text-white/30 line-through decoration-white/20"
                : "text-white/75"
            }`}
          >
            {item.text}
          </span>
        </button>

        {item.dueDate != null && item.dueDate !== "" ? (
          <ItemDueDateLabel
            dueDate={item.dueDate}
            onEdit={() => setEditingDate(true)}
          />
        ) : null}
      </div>

      {editingDate ? (
        <ItemDueDateEditor
          dueDate={item.dueDate}
          onSave={onDueDateChange}
          onClose={() => setEditingDate(false)}
        />
      ) : null}
    </div>
  );
}
