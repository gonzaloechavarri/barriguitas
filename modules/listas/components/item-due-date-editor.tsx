"use client";

import { pressTextControlClasses } from "@/components/motion/press-motion";
import { ListDueDateInput } from "./list-due-date-input";

type ItemDueDateEditorProps = {
  dueDate: string | null;
  onSave: (dueDate: string | null) => void;
  onClose: () => void;
};

export function ItemDueDateEditor({
  dueDate,
  onSave,
  onClose,
}: ItemDueDateEditorProps) {
  function handleChange(isoValue: string) {
    if (isoValue) {
      onSave(isoValue);
      onClose();
    }
  }

  function handleRemove() {
    onSave(null);
    onClose();
  }

  return (
    <div className="ml-8 flex flex-wrap items-end gap-3 pb-1 pt-1 sm:ml-9">
      <ListDueDateInput value={dueDate ?? ""} onChange={handleChange} />

      {dueDate ? (
        <button
          type="button"
          onClick={handleRemove}
          className={`min-h-[2.75rem] rounded-full px-3 py-1.5 text-xs font-light tracking-[-0.01em] text-white/40 touch-manipulation sm:min-h-0 ${pressTextControlClasses}`}
        >
          Quitar fecha
        </button>
      ) : null}

      <button
        type="button"
        onClick={onClose}
        className={`min-h-[2.75rem] rounded-full px-3 py-1.5 text-xs font-light tracking-[-0.01em] text-white/30 touch-manipulation sm:min-h-0 ${pressTextControlClasses}`}
      >
        Cancelar
      </button>
    </div>
  );
}
